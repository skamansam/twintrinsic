#!/usr/bin/env node
/**
 * Placeholder-test guard — fails when a test file contains a placeholder
 * assertion that verifies nothing.
 *
 * ## Why
 *
 * Placeholder tests (`expect(true).toBe(true)`, `expect(assertions)…`)
 * pass forever, report green coverage, and rot silently: the component
 * behind them can break with no signal. This repo accumulated 14 of them
 * ("renders element" suites that never rendered anything) before a sweep
 * replaced every one with real tests (see commit `b95a6a4`). This script
 * keeps them from coming back.
 *
 * ## Scope
 *
 * Every `*.test.*` / `*.spec.*` file under `tests/` — unit (jsdom) and
 * e2e (Playwright) alike, since both share the placeholder pattern.
 * Storybook interaction tests live in `stories/*.stories.svelte` and are
 * not scanned (no placeholder has ever lived there; extend the walk if
 * that changes).
 *
 * ## What counts as a placeholder
 *
 *   - `expect(true)` — the classic hollow assertion
 *   - `expect(assertions)` — the "went through the motions" count-only form
 *
 * Any `.toBe(true)` / `.toBeTruthy()` / … chained afterward is irrelevant:
 * the assertion target itself is constant, so nothing about the component
 * is verified.
 *
 * ## What is skipped
 *
 * Comments — `// expect(true)` in prose or a commented-out block must not
 * trip the guard. Block comments and line-start `//` comments are blanked
 * in place (newlines preserved, so reported line numbers stay accurate).
 *
 * ## Options
 *
 *   `--allow=tests/unit/Foo.test.ts` — suppress specific paths
 *   (comma-separated). Prefer writing a real test; the flag is an escape
 *   hatch for genuinely unavoidable cases (e.g. a test of this guard).
 *
 * Run: `pnpm check:placeholders`
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const TESTS_DIR = join(ROOT, "tests");

/** Files considered test files. */
const TEST_FILE_RE = /\.(test|spec)\.[cm]?[jt]sx?$/;

/**
 * Regions removed wholesale before scanning: block comments and line-start
 * `//` comments. Inline trailing comments are left alone — the code before
 * them is still scanned, which is what matters.
 */
const STRIP_REGIONS = [
  /\/\*[\s\S]*?\*\//g,
  /^[ \t]*\/\/[^\n]*/gm,
];

/** Placeholder assertion patterns. */
const PLACEHOLDER_RES = [
  /\bexpect\s*\(\s*true\s*\)/g,
  /\bexpect\s*\(\s*assertions\s*\)/g,
];

/**
 * Blank a matched region in place, preserving newlines so reported line
 * numbers stay accurate.
 * @param {string} source
 * @param {RegExp} regex
 * @returns {string}
 */
function stripInPlace(source, regex) {
  return source.replace(regex, (match) => match.replace(/[^\n]/g, " "));
}

/**
 * Recursively find test files under a directory.
 * @param {string} dir
 * @yields {string}
 */
async function* walkTests(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") continue;
      yield* walkTests(path);
      continue;
    }
    if (entry.isFile() && TEST_FILE_RE.test(entry.name)) yield path;
  }
}

/**
 * Find placeholder assertions in one test file's source.
 * @param {string} source
 * @returns {Array<{ line: number, snippet: string }>}
 */
function findPlaceholders(source) {
  let scanned = source;
  for (const region of STRIP_REGIONS) {
    scanned = stripInPlace(scanned, region);
  }

  /** @type {Array<{ line: number, snippet: string }>} */
  const found = [];
  const seenLines = new Set();

  for (const regex of PLACEHOLDER_RES) {
    for (const match of scanned.matchAll(regex)) {
      const line = source.slice(0, match.index).split("\n").length;
      if (seenLines.has(line)) continue;
      seenLines.add(line);
      found.push({
        line,
        snippet: (source.split("\n")[line - 1] ?? "").trim(),
      });
    }
  }

  return found;
}

/**
 * Main entry point.
 */
async function main() {
  const allowed = new Set(
    process.argv
      .find((arg) => arg.startsWith("--allow="))
      ?.slice("--allow=".length)
      .split(",")
      .map((entry) => entry.trim().replaceAll("/", sep))
      .filter(Boolean) ?? [],
  );

  /** @type {Map<string, Array<{ line: number, snippet: string }>>} */
  const byFile = new Map();
  let fileCount = 0;

  for await (const path of walkTests(TESTS_DIR)) {
    fileCount++;
    const source = await readFile(path, "utf-8");
    const found = findPlaceholders(source);
    if (found.length === 0) continue;
    if (allowed.has(relative(ROOT, path))) continue;
    byFile.set(relative(ROOT, path), found);
  }

  if (byFile.size > 0) {
    const total = [...byFile.values()].reduce((sum, list) => sum + list.length, 0);
    console.error(`\n✖ ${total} placeholder assertion(s) in ${byFile.size} test file(s):\n`);
    for (const [file, found] of byFile) {
      console.error(`  ${file}`);
      for (const { line, snippet } of found) {
        console.error(`    ${line}: ${snippet}`);
      }
      console.error("");
    }
    console.error(
      "Placeholder tests (expect(true), expect(assertions)) assert nothing\n" +
        "and rot silently — every test must render or invoke the component and\n" +
        "assert observable behavior. See tests/unit/Tab.test.ts for a minimal\n" +
        "example. If a placeholder is genuinely unavoidable, suppress it with\n" +
        "--allow=<path>.\n",
    );
    process.exit(1);
  }

  console.log(
    `✔ No placeholder assertions across ${fileCount} test file(s) under tests/.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
