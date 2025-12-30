import { test, expect } from "@playwright/test"

test.describe("Panel Component", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Panel story in Storybook
    await page.goto("http://localhost:6006/?path=/story/components-panel--default")
  })

  test("renders with default props", async ({ page }) => {
    const panel = page.locator(".panel")
    await expect(panel).toBeVisible()
    await expect(panel).toHaveClass(/border border-border/)

    // Check header button
    const header = panel.locator("button")
    await expect(header).toBeVisible()
    await expect(header).toHaveAttribute("aria-expanded", "true")

    // Check content
    const content = panel.locator('[role="region"]')
    await expect(content).toBeVisible()
  })

  test("toggles content on click", async ({ page }) => {
    const panel = page.locator(".panel")
    const header = panel.locator("button")
    const content = panel.locator('[role="region"]')

    // Initial state
    await expect(content).toBeVisible()
    await expect(header).toHaveAttribute("aria-expanded", "true")

    // Click to collapse
    await header.click()
    await expect(content).not.toBeVisible()
    await expect(header).toHaveAttribute("aria-expanded", "false")

    // Click to expand
    await header.click()
    await expect(content).toBeVisible()
    await expect(header).toHaveAttribute("aria-expanded", "true")
  })

  test("handles keyboard navigation", async ({ page }) => {
    const panel = page.locator(".panel")
    const header = panel.locator("button")
    const content = panel.locator('[role="region"]')

    // Focus the header
    await header.focus()

    // Press Enter to collapse
    await page.keyboard.press("Enter")
    await expect(content).not.toBeVisible()
    await expect(header).toHaveAttribute("aria-expanded", "false")

    // Press Space to expand
    await page.keyboard.press("Space")
    await expect(content).toBeVisible()
    await expect(header).toHaveAttribute("aria-expanded", "true")
  })

  test("respects disabled state", async ({ page }) => {
    // Navigate to disabled variant
    await page.goto("http://localhost:6006/?path=/story/components-panel--disabled")

    const panel = page.locator(".panel")
    const header = panel.locator("button")

    await expect(panel).toHaveClass(/disabled/)
    await expect(header).toBeDisabled()

    // Try to click - should not toggle
    await header.click({ force: true })
    await expect(panel.locator('[role="region"]')).toBeVisible()
  })
})
