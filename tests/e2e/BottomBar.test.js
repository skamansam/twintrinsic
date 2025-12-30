import { test, expect } from "@playwright/test"

test.describe("BottomBar Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-bottombar--default")
  })

  test("renders with default props", async ({ page }) => {
    const bottombar = page.locator(".bottombar-container")
    await expect(bottombar).toBeVisible()

    // Check default height
    const style = await bottombar.getAttribute("style")
    expect(style).toContain("--bottombar-height: 16rem")

    // Check expanded state
    const content = bottombar.locator('[role="region"]')
    await expect(content).toBeVisible()
  })

  test("toggles expansion state", async ({ page }) => {
    const bottombar = page.locator(".bottombar-container")
    const header = bottombar.locator("button")

    // Initial expanded state
    await expect(bottombar.locator(".bottombar")).toHaveClass(/bottombar-expanded/)

    // Click to collapse
    await header.click()
    await expect(bottombar.locator(".bottombar")).toHaveClass(/bottombar-collapsed/)

    // Click to expand
    await header.click()
    await expect(bottombar.locator(".bottombar")).toHaveClass(/bottombar-expanded/)
  })

  test("handles keyboard navigation", async ({ page }) => {
    const bottombar = page.locator(".bottombar-container")
    const header = bottombar.locator("button")

    // Focus header
    await header.focus()

    // Press Enter to collapse
    await page.keyboard.press("Enter")
    await expect(bottombar.locator(".bottombar")).toHaveClass(/bottombar-collapsed/)

    // Press Space to expand
    await page.keyboard.press("Space")
    await expect(bottombar.locator(".bottombar")).toHaveClass(/bottombar-expanded/)

    // Press Escape to collapse
    await page.keyboard.press("Escape")
    await expect(bottombar.locator(".bottombar")).toHaveClass(/bottombar-collapsed/)
  })

  test("shows backdrop on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    const bottombar = page.locator(".bottombar-container")
    const header = bottombar.locator("button")

    // Expand bottombar
    await header.click()

    // Check backdrop
    const backdrop = page.locator(".bottombar-backdrop")
    await expect(backdrop).toBeVisible()

    // Click backdrop to collapse
    await backdrop.click()
    await expect(bottombar.locator(".bottombar")).toHaveClass(/bottombar-collapsed/)
    await expect(backdrop).not.toBeVisible()
  })

  test("respects disabled state", async ({ page }) => {
    // Navigate to disabled variant
    await page.goto("http://localhost:6006/?path=/story/components-bottombar--disabled")

    const bottombar = page.locator(".bottombar-container")
    const header = bottombar.locator("button")

    await expect(header).toBeDisabled()

    // Try to click - should not toggle
    await header.click({ force: true })
    await expect(bottombar.locator(".bottombar")).toHaveClass(/bottombar-expanded/)

    // Try keyboard - should not toggle
    await page.keyboard.press("Escape")
    await expect(bottombar.locator(".bottombar")).toHaveClass(/bottombar-expanded/)
  })

  test("handles docked mode", async ({ page }) => {
    // Navigate to docked variant
    await page.goto("http://localhost:6006/?path=/story/components-bottombar--docked")

    const bottombar = page.locator(".bottombar-container")
    await expect(bottombar).toHaveClass(/bottombar-docked/)
    await expect(bottombar.locator(".bottombar")).toHaveClass(/fixed/)
  })
})
