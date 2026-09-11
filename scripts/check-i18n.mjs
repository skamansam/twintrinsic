#!/usr/bin/env node
/**
 * Docs i18n guard — fails when a documentation page still contains
 * untranslated prose.
 *
 * ## Why
 *
 * Documentation prose is translated at runtime through Paraglide (`m.foo()`),
 * so a page that mixes `m()` calls with hard-coded English sentences renders
 * half-translated in every locale. This script catches those stragglers in CI
 * instead of relying on a reviewer to spot them.
 *
 * ## Scope
 *
 * Only pages that have opted into i18n (they import `m` from
 * `$lib/paraglide/messages.js`) are checked. Pages that have not opted in are
 * reported as the remaining backlog — the sweep is incremental and flagging
 * ~100 untouched pages on day one would make the check useless.
 *
 * ## What counts as untranslated prose
 *
 * Text that renders to a human and is *not* produced by `m()`. The scan skips
 * the places where English is intentional:
 *
 *   - `<script>` / `<style>` blocks and HTML comments
 *   - `<CodeBlock>` and `<ExampleTabs>` (demo markup + code samples)
 *   - `<pre>`, `<code>`, `<kbd>` inline code
 *   - `<a>` link text (source citations, related-component links)
 *   - `<strong>` / `<em>` label runs (product names, proper nouns)
 *   - `{#snippet …}` blocks (signatures and demo labels)
 *   - `{…}` Svelte expressions, including every `m()` call
 *
 * Whatever is left is prose. It is flagged when it contains an English
 * function word ("and", "the", "with", …) or two or more lowercase words —
 * the shape of a sentence rather than a single identifier.
 *
 * Run: `pnpm check:i18n`
 */
import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const DOCS_DIR = join(ROOT, "src", "routes", "docs");

/** Import that marks a page as participating in i18n. */
const I18N_IMPORT = /paraglide\/messages/;

/** Tags whose text content is candidate prose. */
const PROSE_TAGS = new Set([
  "p",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "td",
  "th",
  "caption",
  "summary",
  "dt",
  "dd",
  "figcaption",
  "blockquote",
]);

/** English function words — presence means "this is a sentence". */
const STOPWORDS = new Set([
  "and",
  "the",
  "for",
  "with",
  "that",
  "this",
  "these",
  "those",
  "from",
  "into",
  "onto",
  "over",
  "under",
  "about",
  "after",
  "before",
  "between",
  "your",
  "you",
  "are",
  "was",
  "were",
  "will",
  "would",
  "should",
  "could",
  "can",
  "not",
  "but",
  "when",
  "while",
  "where",
  "which",
  "whose",
  "how",
  "why",
  "what",
  "who",
  "use",
  "uses",
  "using",
  "used",
  "must",
  "may",
  "make",
  "makes",
  "made",
  "has",
  "have",
  "had",
  "its",
  "their",
  "there",
  "then",
  "than",
  "also",
  "only",
  "each",
  "every",
  "all",
  "any",
  "some",
  "both",
  "more",
  "most",
  "less",
  "least",
  "other",
  "another",
  "such",
  "same",
  "own",
  "very",
  "just",
  "even",
  "still",
  "because",
  "however",
  "instead",
  "without",
  "within",
  "through",
  "across",
  "along",
  "around",
]);

/**
 * Regions removed wholesale before scanning: code, demos, links, labels.
 * Order matters — paired blocks are removed before their outer wrappers.
 */
const STRIP_REGIONS = [
  /<script\b[\s\S]*?<\/script>/g,
  /<style\b[\s\S]*?<\/style>/g,
  /<!--[\s\S]*?-->/g,
  /<CodeBlock\b[^>]*\/>/g,
  /<CodeBlock\b[^>]*>[\s\S]*?<\/CodeBlock>/g,
  /<ExampleTabs\b[^>]*\/>/g,
  /<ExampleTabs\b[^>]*>[\s\S]*?<\/ExampleTabs>/g,
  /<pre\b[^>]*>[\s\S]*?<\/pre>/g,
  /<code\b[^>]*>[\s\S]*?<\/code>/g,
  /<kbd\b[^>]*>[\s\S]*?<\/kbd>/g,
  /<a\b[^>]*>[\s\S]*?<\/a>/g,
  /<strong\b[^>]*>[\s\S]*?<\/strong>/g,
  /<em\b[^>]*>[\s\S]*?<\/em>/g,
  /\{#snippet\b[\s\S]*?\{\/snippet\}/g,
];

/** Match a tag or a run of text. Svelte expressions are blanked beforehand. */
const TOKEN_RE = /<[^>]*>|[^<{]+/g;

/** Named + numeric HTML entities → characters. */
const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

/**
 * Blank out every balanced `{…}` Svelte expression, preserving newlines so
 * reported line numbers stay accurate. Expressions are translated (`m()`) or
 * code — never candidate prose — and their braces may nest.
 * @param {string} source
 * @returns {string}
 */
function blankExpressions(source) {
  let out = "";
  let depth = 0;
  for (const char of source) {
    if (char === "{") {
      depth++;
      out += " ";
      continue;
    }
    if (char === "}") {
      if (depth > 0) depth--;
      out += " ";
      continue;
    }
    if (depth > 0) {
      out += char === "\n" ? "\n" : " ";
      continue;
    }
    out += char;
  }
  return out;
}

/**
 * Decode the HTML entities that appear in docs markup.
 * @param {string} text
 * @returns {string}
 */
function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => NAMED_ENTITIES[name.toLowerCase()] ?? match);
}

/**
 * Does a literal text run look like an untranslated English sentence?
 * @param {string} literal
 * @returns {boolean}
 */
function isUntranslatedProse(literal) {
  const text = decodeEntities(literal);
  const words = text.match(/[A-Za-z][A-Za-z'’-]*/g) ?? [];
  if (words.length === 0) return false;
  if (words.some((word) => STOPWORDS.has(word.toLowerCase()))) return true;
  const lowercaseWords = words.filter((word) => /^[a-z][a-z'’-]{2,}$/.test(word));
  return lowercaseWords.length >= 2;
}

/**
 * Recursively find every `+page.svelte` under the docs directory.
 * @param {string} dir
 * @yields {string}
 */
async function* walkPages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkPages(path);
      continue;
    }
    if (entry.isFile() && entry.name === "+page.svelte") yield path;
  }
}

/**
 * Find untranslated prose in one page source.
 * @param {string} source
 * @returns {Array<{ line: number, text: string }>}
 */
function findUntranslatedProse(source) {
  let scanned = source;
  // Blank each region in place, keeping its newlines so line numbers survive.
  for (const region of STRIP_REGIONS) {
    scanned = scanned.replace(region, (match) => match.replace(/[^\n]/g, " "));
  }
  scanned = blankExpressions(scanned);

  /** @type {string[]} */
  const stack = [];
  /** @type {Array<{ line: number, text: string }>} */
  const findings = [];

  for (const match of scanned.matchAll(TOKEN_RE)) {
    const token = match[0];

    if (token.startsWith("<")) {
      const tag = token.match(/^<\s*(\/?)\s*([a-zA-Z][\w:-]*)/);
      if (!tag) continue;
      const [, closing, rawName] = tag;
      const name = rawName.toLowerCase();
      if (!PROSE_TAGS.has(name) || token.endsWith("/>")) continue;
      if (closing) {
        const index = stack.lastIndexOf(name);
        if (index !== -1) stack.length = index;
      } else {
        stack.push(name);
      }
      continue;
    }

    if (stack.length === 0) continue;
    if (!isUntranslatedProse(token)) continue;

    const line = source.slice(0, match.index).split("\n").length;
    findings.push({ line, text: token.replace(/\s+/g, " ").trim() });
  }

  return findings;
}

/**
 * Main entry point.
 */
async function main() {
  /** @type {Array<{ page: string, line: number, text: string }>} */
  const failures = [];
  /** @type {string[]} */
  const pending = [];
  let translated = 0;

  for await (const path of walkPages(DOCS_DIR)) {
    const relativePath = relative(ROOT, path);
    const source = readFileSync(path, "utf-8");
    if (!I18N_IMPORT.test(source)) {
      pending.push(relativePath);
      continue;
    }
    translated++;
    for (const finding of findUntranslatedProse(source)) {
      failures.push({ page: relativePath, ...finding });
    }
  }

  if (failures.length > 0) {
    console.error(`\n✖ Untranslated prose found in ${failures.length} location(s):\n`);
    for (const { page, line, text } of failures) {
      console.error(`  ${page}:${line}`);
      console.error(`    ${text.length > 120 ? `${text.slice(0, 117)}…` : text}\n`);
    }
    console.error(
      "Wrap each string in a Paraglide message (add the key to messages/{en,es,fa}.json)\n" +
        "or, if it is intentional English (an identifier, brand, or code token),\n" +
        "move it inside <code>, <strong>, an <a> label, or a snippet.\n",
    );
    process.exit(1);
  }

  const total = translated + pending.length;
  console.log(`✔ No untranslated prose in the ${translated} i18n-enabled docs page(s).`);
  console.log(`  Backlog: ${pending.length} of ${total} docs pages not yet i18n-enabled.`);
  if (pending.length > 0 && process.argv.includes("--list")) {
    console.log("\nPending pages:");
    for (const page of pending) console.log(`  - ${page}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
