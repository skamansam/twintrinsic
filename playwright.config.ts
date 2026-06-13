import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "tests/e2e",
  testMatch: "**/*.test.{js,ts}",
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
