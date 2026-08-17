import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "tests/e2e",
  testMatch: "**/*.test.{js,ts}",
  // E2E tests now target the documentation site (SvelteKit preview at
  // port 5173) instead of Storybook. Each test file is responsible for
  // navigating to the appropriate `/docs/...` route for the component
  // it covers. `baseURL` MUST live under `use` (it is a test option,
  // not a top-level config field — a top-level `baseURL` is silently
  // ignored and every relative `page.goto("/...")` fails with
  // "Cannot navigate to invalid URL").
  webServer: [
    {
      command: "pnpm build && pnpm preview --port 5173",
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
  ],
  projects: [
    {
      name: "e2e",
      testDir: "tests/e2e",
      use: {
        baseURL: "http://localhost:5173",
        ...devices["chromium"],
      },
    },
  ],
})
