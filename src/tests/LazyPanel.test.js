import { test, expect } from "@playwright/test"

test.describe("LazyPanel Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-panel-lazypanel--default")
  })

  test("shows loading state initially", async ({ page }) => {
    const panel = page.locator(".panel")
    await expect(panel).toBeVisible()
    const content = panel.locator("text=Loading...")
    await expect(content).toBeVisible()
  })

  test("loads content when visible", async ({ page }) => {
    const panel = page.locator(".panel")
    await expect(panel).toBeVisible()

    // Wait for content to load
    await expect(panel.locator("text=This content was loaded lazily")).toBeVisible()

    // Loading state should be gone
    const loading = panel.locator("text=Loading...")
    await expect(loading).not.toBeVisible()
  })

  test("handles custom loading state", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/components-panel-lazypanel--with-custom-loading"
    )

    const panel = page.locator(".panel")
    await expect(panel).toBeVisible()

    // Should show custom loading spinner
    const spinner = panel.locator(".animate-spin")
    await expect(spinner).toBeVisible()

    // Wait for content to load
    await expect(panel.locator("text=Content loaded!")).toBeVisible()

    // Spinner should be gone
    await expect(spinner).not.toBeVisible()
  })

  test("loads multiple panels as they become visible", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/components-panel-lazypanel--multiple-with-scroll"
    )

    // First panel should be visible and loaded
    const firstPanel = page.locator(".panel").first()
    await expect(firstPanel.locator("text=Content for panel 1")).toBeVisible()

    // Last panel should be loading
    const lastPanel = page.locator(".panel").last()
    await expect(lastPanel.locator("text=Loading panel 5")).toBeVisible()

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Last panel should now be loaded
    await expect(lastPanel.locator("text=Content for panel 5")).toBeVisible()
  })
})
