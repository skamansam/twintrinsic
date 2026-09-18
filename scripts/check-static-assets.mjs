#!/usr/bin/env node
/**
 * Docs static-asset guard — fails when a docs demo references a root-relative
 * static asset that does not exist under `static/`.
 *
 * ## Why
 *
 * SvelteKit serves everything in `static/` at the site root, but nothing
 * forces a demo's hard-coded asset URL (e.g. `bg-[url('/banner.jpg')]`,
 * `<img src="/logo.svg">`, an `AppHeader` brand logo) to actually exist.
 * Broken references surface only as 404s in the browser console — easy to
 * miss in review. This script catches them in CI instead. It exists because
 * several demos shipped with dead asset URLs (Leaflet marker icons, AppHeader
 * logos, a shopping-example banner) that e2e runs only found incidentally.
 *
 * ## Scope
 *
 * Every `.svelte` file under `src/routes/docs` (demo pages, example pages,
 * and the docs layout). Bundler-imported assets (`import img from "./x.png"`,
 * hashed by Vite at build time) are deliberately NOT scanned — only
 * root-relative string references that bypass the bundler and must resolve
 * under `static/` at runtime.
 *
 * ## What counts as a reference
 *
 *   - Any quoted string literal resolving to `/path/file.<ext>` (so
 *     `src="/logo.svg"` and Tailwind's `bg-[url('/banner.jpg')]` both match)
 *   - `srcset="..."` candidates
 *   - CSS `url(/path/file.ext)` forms, quoted or bare
 *
 * Extensions cover images, media, fonts, and misc binary/data files.
 * Dynamic paths (containing `${…}`) are skipped — they cannot be verified
 * statically.
 *
 * ## What is skipped
 *
 *   - `<script>` / `<style>` comments and HTML comments
 *   - `<CodeBlock>` (its children *are* the reader-facing code sample)
 *   - the `code={…}` sample attribute of `<ExampleTabs>` — but NOT its
 *     children, which are the *live rendered demo* and do fetch assets
 *   - `<pre>` and inline `<code>` — reader-facing samples, same rule as
 *     `check-i18n`
 *
 * ## Options
 *
 *   `--ignore=/banner.jpg,/x.png` — suppress specific paths (comma-separated).
 *   Prefer fixing the demo or adding the asset; the flag is an escape hatch
 *   for references that are intentionally illustrative.
 *   `--list` — print every reference found (even resolving ones).
 *
 * Run: `pnpm check:assets`
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const DOCS_DIR = join(ROOT, "src", "routes", "docs");
const STATIC_DIR = join(ROOT, "static");

/** File extensions treated as static-asset references. */
const ASSET_EXT_RE =
  /\.(png|jpe?g|gif|svg|webp|avif|ico|bmp|mp4|webm|mp3|wav|ogg|flac|woff2?|ttf|otf|eot|json|txt|pdf|wasm|xml|csv)$/i;

/**
 * Regions removed wholesale before scanning: reader-facing code samples and
 * comments. `<ExampleTabs>` is NOT removed wholesale — its children are the
 * live rendered demo whose assets really load; only its `code={…}` sample
 * attribute is blanked (below).
 */
const STRIP_REGIONS = [
  /<CodeBlock\b[^>]*\/>/g,
  /<CodeBlock\b[^>]*>[\s\S]*?<\/CodeBlock>/g,
  /<pre\b[^>]*>[\s\S]*?<\/pre>/g,
  /<code\b[^>]*>[\s\S]*?<\/code>/g,
  /<!--[\s\S]*?-->/g,
];

/**
 * Reader-facing sample code passed as a `code={`…`}` prop (e.g. to
 * `<ExampleTabs>`). Lazily matched to the closing backtick-right-brace; a
 * nested template literal inside the sample ends the match early, which
 * only ever widens the *unscanned* gap — never silently skips a live demo.
 */
const CODE_PROP_RE = /\bcode=\{\s*`[\s\S]*?`\s*\}/g;

const SCRIPT_REGION_RE = /<script\b[^>]*>[\s\S]*?<\/script>/g;
const STYLE_REGION_RE = /<style\b[^>]*>[\s\S]*?<\/style>/g;

/** Any quoted string literal — filtered down to asset-looking paths later. */
const QUOTED_RE = /(["'])([^"'\n]{1,400})\1/g;
const SRCSET_RE = /\bsrcset\s*=\s*(["'])([^"']+)\1/g;
const CSS_URL_RE = /\burl\(\s*(["']?)(\/[^)'"\s]+)\1\s*\)/g;

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
 * Blank JS comments inside a `<script>` region (asset URLs in string
 * literals must survive, so only line-start `//` and block comments go).
 * @param {string} code
 * @returns {string}
 */
function blankJsComments(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, (match) => match.replace(/[^\n]/g, " "))
    .replace(/^[ \t]*\/\/[^\n]*/gm, (match) => match.replace(/[^\n]/g, " "));
}

/**
 * Blank CSS comments inside a `<style>` region.
 * @param {string} code
 * @returns {string}
 */
function blankCssComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, (match) => match.replace(/[^\n]/g, " "));
}

/**
 * Strip one candidate down to a bare root-relative path, or null if it is
 * not a statically verifiable asset reference.
 * @param {string} raw
 * @returns {string | null}
 */
function toAssetPath(raw) {
  const path = raw.split(/[?#]/)[0];
  if (!path.startsWith("/") || path.startsWith("//")) return null;
  // Dynamic template-literal fragments cannot be verified statically.
  if (path.includes("${")) return null;
  if (!ASSET_EXT_RE.test(path)) return null;
  return path;
}

/**
 * Recursively find every `.svelte` file under a directory.
 * @param {string} dir
 * @yields {string}
 */
async function* walkSvelte(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkSvelte(path);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".svelte")) yield path;
  }
}

/**
 * Collect asset references from one file's source.
 * @param {string} source
 * @returns {Array<{ path: string, line: number }>}
 */
function findReferences(source) {
  // Strip comments from live-code regions first, then blank sample regions.
  let scanned = source
    .replace(SCRIPT_REGION_RE, blankJsComments)
    .replace(STYLE_REGION_RE, blankCssComments);
  for (const region of STRIP_REGIONS) {
    scanned = stripInPlace(scanned, region);
  }
  scanned = stripInPlace(scanned, CODE_PROP_RE);

  /** @type {Array<{ path: string, line: number }>} */
  const references = [];
  const record = (matchIndex, raw) => {
    const path = toAssetPath(raw);
    if (!path) return;
    const line = source.slice(0, matchIndex).split("\n").length;
    references.push({ path, line });
  };

  for (const match of scanned.matchAll(QUOTED_RE)) record(match.index, match[2]);
  for (const match of scanned.matchAll(CSS_URL_RE)) record(match.index, match[2]);
  for (const match of scanned.matchAll(SRCSET_RE)) {
    // `srcset="/a.png 1x, /b.png 2x"` — split into individual candidates.
    for (const candidate of match[2].split(/[\s,]+/)) {
      record(match.index, candidate);
    }
  }

  return references;
}

/**
 * Main entry point.
 */
async function main() {
  const ignored = new Set(
    process.argv
      .find((arg) => arg.startsWith("--ignore="))
      ?.slice("--ignore=".length)
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean) ?? [],
  );

  /** @type {Map<string, Array<{ file: string, line: number }>>} */
  const byPath = new Map();

  for await (const path of walkSvelte(DOCS_DIR)) {
    const source = readFileSync(path, "utf-8");
    for (const { path: assetPath, line } of findReferences(source)) {
      if (ignored.has(assetPath)) continue;
      const bucket = byPath.get(assetPath) ?? [];
      const occurrence = { file: relative(ROOT, path), line };
      // Overlapping regexes (quoted + url()) can hit the same spot twice.
      if (
        !bucket.some((entry) => entry.file === occurrence.file && entry.line === occurrence.line)
      ) {
        bucket.push(occurrence);
        byPath.set(assetPath, bucket);
      }
    }
  }

  /** @type {Array<{ path: string, occurrences: Array<{ file: string, line: number }> }>} */
  const missing = [];
  for (const [assetPath, occurrences] of byPath) {
    const fsPath = join(STATIC_DIR, assetPath.slice(1));
    const exists = existsSync(fsPath) && statSync(fsPath).isFile();
    if (!exists) missing.push({ path: assetPath, occurrences });
  }

  if (missing.length > 0) {
    console.error(`\n✖ ${missing.length} missing static asset(s) referenced by docs demos:\n`);
    for (const { path, occurrences } of missing) {
      console.error(`  ${path}  — expected at static/${path.slice(1)}`);
      for (const { file, line } of occurrences) {
        console.error(`    ${file}:${line}`);
      }
      console.error("");
    }
    console.error(
      "Demos are served from static/ at the site root. Either add the asset\n" +
        "under static/, point the demo at an existing file, or — if the\n" +
        "reference exists only in a reader-facing code sample — move it inside\n" +
        "<CodeBlock>, <ExampleTabs>, <pre>, or <code>, which this check skips.\n" +
        "Use --ignore=/path.png to suppress a false positive.\n",
    );
    process.exit(1);
  }

  const total = [...byPath.values()].reduce((sum, list) => sum + list.length, 0);
  console.log(`✔ All ${total} static-asset reference(s) across docs demos resolve under static/.`);
  if (process.argv.includes("--list")) {
    for (const [assetPath, occurrences] of byPath) {
      console.log(`\n  ${assetPath}`);
      for (const { file, line } of occurrences) {
        console.log(`    ${file}:${line}`);
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
