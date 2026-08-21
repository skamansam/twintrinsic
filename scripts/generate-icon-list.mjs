#!/usr/bin/env node
/**
 * Icon preload list generator.
 *
 * Scans every component under `src/lib/components` for icon names that are
 * actually rendered by the library itself — literal `<Icon name="...">`
 * usages plus default values assigned to icon-shaped props (e.g. Rating's
 * `icon = "tabler:star-filled"`) — and writes the deduplicated, sorted list
 * into the generated block of `src/lib/stores/iconPreload.ts`.
 *
 * This is a best-effort static scan: dynamic icon names supplied entirely by
 * consumers at runtime (e.g. `<Icon name={item.icon}>` fed from a `menu`
 * prop) can't be discovered this way and must be added to a consumer's own
 * preload list by hand — see the "Preloading Icons" section of the Icon
 * docs page.
 *
 * Usage: `pnpm run generate:icons`
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")
const COMPONENTS_DIR = join(ROOT, "src/lib/components")
const OUTPUT_FILE = join(ROOT, "src/lib/stores/iconPreload.ts")

const DEFAULT_ICONSET = "tabler"
const START_MARKER = "// AUTO-GENERATED-ICONS-START — do not edit by hand, run `pnpm run generate:icons`"
const END_MARKER = "// AUTO-GENERATED-ICONS-END"

/** Recursively collect every `.svelte` file under a directory. */
function collectSvelteFiles(dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stats = statSync(fullPath)
    if (stats.isDirectory()) {
      files.push(...collectSvelteFiles(fullPath))
      continue
    }
    if (entry.endsWith(".svelte")) files.push(fullPath)
  }
  return files
}

/** Normalize a raw icon name to a fully-qualified "iconset:name" identifier. */
function qualify(name) {
  return name.includes(":") ? name : `${DEFAULT_ICONSET}:${name}`
}

/** Extract literal icon names referenced in a single component's source. */
function extractIconNames(source) {
  const names = new Set()

  // <Icon name="..."> / <Icon ... name="..." ...>
  for (const match of source.matchAll(/<Icon\b[^>]*\bname=["']([a-zA-Z0-9:_-]+)["']/g)) {
    names.add(match[1])
  }

  // Default values assigned to icon-shaped props, e.g. `icon = "tabler:star-filled"`
  for (const match of source.matchAll(/\b(?:icon|emptyIcon|defaultIcon|filledIcon)\s+=\s+["']([a-zA-Z0-9:_-]+)["']/g)) {
    names.add(match[1])
  }

  return names
}

function main() {
  const files = collectSvelteFiles(COMPONENTS_DIR)
  const allNames = new Set()

  for (const file of files) {
    const source = readFileSync(file, "utf-8")
    for (const name of extractIconNames(source)) {
      allNames.add(qualify(name))
    }
  }

  const sortedNames = [...allNames].sort()

  const existing = readFileSync(OUTPUT_FILE, "utf-8")
  const startIndex = existing.indexOf(START_MARKER)
  const endIndex = existing.indexOf(END_MARKER)

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Could not find generated block markers in ${OUTPUT_FILE}`)
  }

  const generatedBlock = `${START_MARKER}\n${sortedNames.map((name) => `  "${name}",`).join("\n")}\n  ${END_MARKER}`

  const updated =
    existing.slice(0, startIndex) + generatedBlock + existing.slice(endIndex + END_MARKER.length)

  writeFileSync(OUTPUT_FILE, updated)

  console.log(`Wrote ${sortedNames.length} icon(s) to ${OUTPUT_FILE.replace(`${ROOT}/`, "")}`)
}

main()
