import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  testMatch: "**/*.test.{js,ts}",
  // Debugging artifacts: on failure, keep a screenshot, a video of the run,
  // and the Playwright trace (open with `npx playwright show-trace
  // test-results/<...>/trace.zip`). Artifacts land in `test-results/`,
  // which is gitignored. `retry` stays off — these are smokes against a
  // locally built site, where a failure is actionable on first sight.
  use: {
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  // E2E tests target the documentation site (SvelteKit preview). The port
  // lives in the user-assigned 8020–8070 band so it cannot collide with
  // other dev servers on this machine (a `dnanything` vite dev server
  // repeatedly squatted on 5173 and `reuseExistingServer` silently adopted
  // it, serving the wrong app to every test). Each test file is responsible
  // for navigating to the appropriate `/docs/...` route for the component
  // it covers. `baseURL` MUST live under `use` (it is a test option,
  // not a top-level config field — a top-level `baseURL` is silently
  // ignored and every relative `page.goto("/...")` fails with
  // "Cannot navigate to invalid URL").
  webServer: [
    {
      command: "pnpm build && pnpm preview --port 8042",
      port: 8042,
      reuseExistingServer: !process.env.CI,
    },
  ],
  projects: [
    {
      name: "e2e",
      testDir: "tests/e2e",
      use: {
        baseURL: "http://localhost:8042",
        ...devices["chromium"],
      },
    },
    // Cross-browser feature-detection probes (Part 1.5 of
    // docs/plans/HTML_SEMANTIC_REPLACEMENT_PLAN.md). These do not exercise
    // component behavior — they just record which Tier 0 platform APIs are
    // supported in each engine so the docs site can render a compatibility
    // matrix. See tests/compat/README.md and scripts/merge-browser-compat.mjs.
    {
      name: "compat-chromium",
      testDir: "tests/compat",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "compat-firefox",
      testDir: "tests/compat",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "compat-webkit",
      testDir: "tests/compat",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
