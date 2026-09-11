// Build `static/llms.txt` from the documentation site and component sources.
import { readFileSync, writeFileSync } from "node:fs"
import { readdir, stat } from "node:fs/promises"
import { join, relative } from "node:path"

const ROOT = process.cwd()
const OUTPUT = join(ROOT, "static", "llms.txt")
/** Base-locale messages, used to resolve `m.*()` calls in docs pages. */
const MESSAGES = JSON.parse(readFileSync(join(ROOT, "messages", "en.json"), "utf-8"))

/**
 * Recursively find files matching an extension.
 * @param {string} dir
 * @param {string} ext
 * @returns {AsyncGenerator<string>}
 */
async function* walk(dir, ext) {
	const entries = await readdir(dir, { withFileTypes: true })
	for (const entry of entries) {
		const path = join(dir, entry.name)
		if (entry.isDirectory()) {
			yield* walk(path, ext)
		} else if (entry.isFile() && path.endsWith(ext)) {
			yield path
		}
	}
}

/**
 * Remove inline Svelte script and style blocks from a source string.
 * @param {string} source
 * @returns {string}
 */
function stripBlocks(source) {
	return source
		.replace(/<script[\s\S]*?<\/script>/g, "")
		.replace(/<style[\s\S]*?<\/style>/g, "")
}

/**
 * Replace Paraglide `m.messageKey()` calls with the base-locale message text.
 *
 * Docs prose is translated at runtime, so the rendered page contains no
 * human-readable sentences — without this step every translated page would
 * contribute only its code and demo markup to `llms.txt`.
 * @param {string} source
 * @returns {string}
 */
/**
 * Normalise a message value for the plain-text digest: ICU unescapes doubled
 * apostrophes at runtime, and angle brackets must be entity-encoded so the
 * downstream tag stripper does not eat `<footer>`-style code spans.
 * @param {string} value
 * @returns {string}
 */
function normalizeMessage(value) {
	return value
		.replace(/''/g, "'")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
}

function resolveMessages(source) {
	const resolve = (match, key) => {
		const value = MESSAGES[key]
		return typeof value === "string" ? normalizeMessage(value) : match
	}
	// Consume the enclosing `{…}` first so the inserted text is not mistaken
	// for a Svelte expression by the brace stripper downstream.
	return source
		.replace(/\{\s*m\.([A-Za-z_$][\w$]*)\(\)\s*\}/g, resolve)
		.replace(/\bm\.([A-Za-z_$][\w$]*)\(\)/g, resolve)
}

/**
 * Remove balanced `{…}` groups (ICU placeholders and Svelte expressions).
 * Loops so nested groups collapse innermost-first.
 * @param {string} text
 * @returns {string}
 */
function stripBraces(text) {
	let previous
	let out = text
	do {
		previous = out
		out = out.replace(/\{[^{}]*\}/g, " ")
	} while (out !== previous)
	return out
}

/**
 * Extract the component JSDoc comment from an HTML/Svelte comment.
 * @param {string} source
 * @returns {string | undefined}
 */
function extractComponentComment(source) {
	const match = source.match(/<!--\s*\n?\s*@component([\s\S]*?)-->/)
	return match ? match[1].trim() : undefined
}

/**
 * Extract the `export const propsMetadata = [...]` array from Svelte module script.
 * @param {string} source
 * @returns {Array<{name: string, type: string, description?: string, default?: string, optional?: boolean}> | undefined}
 */
function extractPropsMetadata(source) {
	const match = source.match(/export\s+const\s+propsMetadata\s*=\s*(\[[\s\S]*?\]);/)
	if (!match) return undefined
	try {
		// `as const` may appear after the array literal; strip it
		const jsonLike = match[1].replace(/as\s+const\s*$/, "").trim()
		return JSON.parse(jsonLike)
	} catch {
		return undefined
	}
}

/**
 * Strip HTML tags from prose and collapse whitespace.
 * @param {string} html
 * @returns {string}
 */
function htmlToText(html) {
	return stripBraces(
		html
			.replace(/<!--[\s\S]*?-->/g, "")
			.replace(/<\/?[\w:-]+(?:\s+[^>]*)?>/g, " "),
	)
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
		.replace(/&amp;/g, "&")
		.replace(/\s+/g, " ")
		.trim()
}

/**
 * Format props metadata as readable lines.
 * @param {Array<Record<string, unknown>>} meta
 * @returns {string}
 */
function formatPropsMetadata(meta) {
	if (!Array.isArray(meta) || meta.length === 0) return ""
	return meta
		.map((prop) => {
			const parts = [
				`- \`${String(prop.name)}\` (${String(prop.type)})`,
				prop.description ? `${String(prop.description)}` : undefined,
				prop.default ? `default: \`${String(prop.default)}\`` : undefined,
				prop.optional ? "optional" : undefined,
			].filter(Boolean)
			return parts.join(" — ")
		})
		.join("\n")
}

/**
 * Build the component reference section.
 * @returns {AsyncGenerator<{name: string, text: string}>}
 */
async function* componentEntries() {
	for await (const path of walk(join(ROOT, "src", "lib", "components"), ".svelte")) {
		const source = readFileSync(path, "utf-8")
		const comment = extractComponentComment(source)
		const props = extractPropsMetadata(source)

		if (!comment && !props) continue

		const name = relative(join(ROOT, "src", "lib", "components"), path).replace(/\.svelte$/, "")
		const parts = []
		if (comment) parts.push(htmlToText(comment))
		if (props) {
			parts.push("### Props\n")
			parts.push(formatPropsMetadata(props))
		}

		yield { name, text: parts.join("\n\n").trim() }
	}
}

/**
 * Build the documentation page section.
 * @returns {AsyncGenerator<{name: string, text: string}>}
 */
async function* docPageEntries() {
	for await (const path of walk(join(ROOT, "src", "routes", "docs"), ".svelte")) {
		if (!path.endsWith("+page.svelte")) continue
		const source = readFileSync(path, "utf-8")
		const comment = extractComponentComment(source)
		const prose = resolveMessages(stripBlocks(source))
		const text = htmlToText(prose)
		if (!text && !comment) continue

		const route = relative(join(ROOT, "src", "routes", "docs"), path)
			.replace(/(?:^|\/)\+page\.svelte$/, "")
		const name = `/docs/${route}`
		const parts = []
		if (comment) parts.push(htmlToText(comment))
		if (text) parts.push(text)

		yield { name, text: parts.join("\n\n").trim() }
	}
}

/**
 * Main build step.
 */
async function build() {
	const header = `# Twintrinsic — LLMs.txt\n\nA machine-readable digest of the Twintrinsic Svelte component library documentation and API.\n\n## Component Reference\n`
	const componentParts = []
	for await (const entry of componentEntries()) {
		componentParts.push(`### ${entry.name}\n\n${entry.text}`)
	}

	const docsHeader = `## Documentation Pages\n`
	const docParts = []
	for await (const entry of docPageEntries()) {
		docParts.push(`### ${entry.name}\n\n${entry.text}`)
	}

	const body = [
		header,
		...componentParts,
		"",
		docsHeader,
		...docParts,
	].join("\n\n")

	writeFileSync(OUTPUT, body)
	console.log(`llms.txt written to ${OUTPUT} (${body.length} chars)`)
}

build().catch((err) => {
	console.error(err)
	process.exit(1)
})
