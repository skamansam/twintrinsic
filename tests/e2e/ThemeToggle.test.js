import { test, expect } from "@playwright/test"

test.describe("ThemeToggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("?path=/story/components-themetoggle--default")
  })

  test("should toggle theme when clicked", async ({ page }) => {
    // Get initial theme
    const initialTheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    )

    // Click the toggle
    const toggle = page.locator("button.theme-toggle")
    await toggle.click()

    // Check if theme changed
    const newTheme = await page.evaluate(() => document.documentElement.getAttribute("data-theme"))
    expect(newTheme).not.toBe(initialTheme)
    expect(["light", "dark"]).toContain(newTheme)
  })

  test("should be keyboard accessible", async ({ page }) => {
    const toggle = page.locator("button.theme-toggle")

    // Focus the toggle
    await toggle.focus()

    // Press space to activate
    await page.keyboard.press("Space")

    // Check if theme changed
    const theme = await page.evaluate(() => document.documentElement.getAttribute("data-theme"))
    expect(["light", "dark"]).toContain(theme)
  })

  test("should have proper ARIA labels", async ({ page }) => {
    const toggle = page.locator("button.theme-toggle")

    // Check initial aria-label
    const initialLabel = await toggle.getAttribute("aria-label")
    expect(initialLabel).toMatch(/Switch to (light|dark) theme/)

    // Click and check updated label
    await toggle.click()
    const newLabel = await toggle.getAttribute("aria-label")
    expect(newLabel).toMatch(/Switch to (light|dark) theme/)
    expect(newLabel).not.toBe(initialLabel)
  })

  test("should persist theme selection", async ({ page }) => {
    // Click toggle to change theme
    const toggle = page.locator("button.theme-toggle")
    await toggle.click()

    // Get selected theme
    const selectedTheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    )

    // Reload page
    await page.reload()

    // Check if theme persisted
    const persistedTheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    )
    expect(persistedTheme).toBe(selectedTheme)
  })
})
