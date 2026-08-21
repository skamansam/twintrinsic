#!/usr/bin/env node
/**
 * generate-icon-manifest.mjs
 *
 * Scans all .svelte and .ts files in src/ for Icon component usage
 * and generates a JSON manifest mapping icon names to their Iconify data.
 *
 * Usage:
 *   node scripts/generate-icon-manifest.mjs
 *
 * Output: static/icon-manifest.json
 *
 * The manifest can be imported by the app and passed to `preloadManifest()`
 * so all icons render instantly without API fetches.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const SRC_DIR = join(import.meta.dirname, '..', 'src')
const OUTPUT = join(import.meta.dirname, '..', 'static', 'icon-manifest.json')

/**
 * Recursively find all .svelte and .ts files
 */
function findFiles(dir, exts = ['.svelte', '.ts', '.js']) {
  const results = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      results.push(...findFiles(full, exts))
    } else if (exts.some(ext => entry.name.endsWith(ext))) {
      results.push(full)
    }
  }
  return results
}

/**
 * Extract icon names from source code
 */
function extractIconNames(source) {
  const names = new Set()
  const patterns = [
    /\bname=["']([a-z][a-z0-9-]*:[a-z][a-z0-9-]*(?:-[a-z0-9]+)*)["']/gi,
    /\bicon=["']([a-z][a-z0-9-]*:[a-z][a-z0-9-]*(?:-[a-z0-9]+)*)["']/gi,
  ]
  for (const pattern of patterns) {
    let match
    while ((match = pattern.exec(source)) !== null) {
      names.add(match[1])
    }
  }
  return [...names]
}

// Scan all source files
const files = findFiles(SRC_DIR)
const allIcons = new Set()

for (const file of files) {
  const source = readFileSync(file, 'utf-8')
  for (const name of extractIconNames(source)) {
    allIcons.add(name)
  }
}

console.log(`Found ${allIcons.size} unique icons across ${files.length} files:`)
for (const name of [...allIcons].sort()) {
  console.log(`  ${name}`)
}

// Write the manifest (just the icon names — actual data is fetched at runtime
// or bundled via @iconify-icons/* packages at build time)
const manifest = {
  _generated: new Date().toISOString(),
  _count: allIcons.size,
  icons: [...allIcons].sort(),
}

writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\nManifest written to ${relative(process.cwd(), OUTPUT)}`)
