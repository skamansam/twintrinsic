import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "tests/e2e",
  testMatch: "**/*.test.{js,ts}",
  // E2E tests now target the documentation site (SvelteKit preview at
  // port 5173) instead of Storybook. Each test file is responsible for
  // navigating to the appropriate `/docs/...` route for the component
  // it covers.
  baseURL: "http://localhost:5173",
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
      use: { ...devices["chromium"] },
    },
  ],
})
