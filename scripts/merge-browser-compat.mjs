#!/usr/bin/env node
/**
 * Merges the per-project JSON files written by tests/compat/browser-support.test.ts
 * (one per Playwright project: compat-chromium, compat-firefox, compat-webkit)
 * into a single `static/browser-compat.json` consumed by
 * `$lib/components/CompatibilityMatrix/CompatibilityMatrix.svelte` at runtime.
 *
 * Usage: `node scripts/merge-browser-compat.mjs` (run after `pnpm test:compat`).
 */
import fs from "node:fs";
import path from "node:path";

const projectToBrowser = {
  "compat-chromium": "chromium",
  "compat-firefox": "firefox",
  "compat-webkit": "webkit",
};

const inputDir = path.join(process.cwd(), "test-results", "compat");
const outputFile = path.join(process.cwd(), "static", "browser-compat.json");

/**
 * Read and parse every per-project result file.
 *
 * @returns {Array<{ project: string, results: Record<string, boolean> }>}
 */
function readResultFiles() {
  if (!fs.existsSync(inputDir)) {
    throw new Error(
      `No compat results found at ${inputDir}. Run \`pnpm test:compat\` first.`,
    );
  }
  return fs
    .readdirSync(inputDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(inputDir, file), "utf-8")));
}

/**
 * Combine per-project results into a single feature -> browser -> boolean map.
 *
 * @param {Array<{ project: string, results: Record<string, boolean> }>} files
 * @returns {{ generatedAt: string, browsers: string[], features: Record<string, Record<string, boolean>> }}
 */
function mergeResults(files) {
  const browsers = [];
  /** @type {Record<string, Record<string, boolean>>} */
  const featureMap = {};

  for (const { project, results } of files) {
    const browser = projectToBrowser[project] ?? project;
    if (!browsers.includes(browser)) browsers.push(browser);

    for (const [featureName, supported] of Object.entries(results)) {
      featureMap[featureName] ??= {};
      featureMap[featureName][browser] = supported;
    }
  }

  return { generatedAt: new Date().toISOString(), browsers, features: featureMap };
}

const merged = mergeResults(readResultFiles());
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`Wrote ${Object.keys(merged.features).length} features for [${merged.browsers.join(", ")}] to ${outputFile}`);
