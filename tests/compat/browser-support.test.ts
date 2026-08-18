import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { features } from "./features.mjs";

/**
 * Records, per browser engine, whether each Tier 0 platform API from
 * docs/plans/HTML_SEMANTIC_REPLACEMENT_PLAN.md (Part 1.5) is supported.
 *
 * This does not test any Twintrinsic component — it is a pure
 * feature-detection probe run against a blank page in each of the
 * `compat-chromium`, `compat-firefox`, and `compat-webkit` Playwright
 * projects (see playwright.config.ts).
 *
 * Each project writes its own JSON file to `test-results/compat/`.
 * `pnpm test:compat:merge` (scripts/merge-browser-compat.mjs) combines
 * those files into `static/browser-compat.json`, which the docs site
 * fetches at runtime to render a compatibility matrix
 * (`$lib/components/CompatibilityMatrix/CompatibilityMatrix.svelte`).
 */
test("records Tier 0 platform API support", async ({ page }, testInfo) => {
  await page.goto("about:blank");

  /** @type {Record<string, boolean>} */
  const results: Record<string, boolean> = {};
  for (const feature of features) {
    results[feature.name] = await page.evaluate(feature.check);
  }

  const outDir = path.join(process.cwd(), "test-results", "compat");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${testInfo.project.name}.json`);
  fs.writeFileSync(
    outFile,
    JSON.stringify({ project: testInfo.project.name, results }, null, 2),
  );

  // Sanity check: every feature must resolve to a boolean, never throw/undefined.
  for (const value of Object.values(results)) {
    expect(typeof value).toBe("boolean");
  }
});
