import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "tests",
  testMatch: "**/*.test.{js,ts}",
  webServer: [
    {
      command: "pnpm storybook",
      port: 6006,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "pnpm build && pnpm preview",
      port: 4173,
      reuseExistingServer: !process.env.CI,
    },
  ],
  projects: [
    {
      name: "unit",
      testDir: "tests/unit",
      use: { ...devices["chromium"] },
    },
    {
      name: "e2e",
      testDir: "tests/e2e",
      use: { ...devices["chromium"] },
    },
  ],
})
