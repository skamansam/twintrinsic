import { test, expect } from "@playwright/test"
import { visit } from "@storybook/test"

test.describe("BottomBar Component", () => {
  test("renders expanded bottom bar correctly", async ({ page }) => {
    await visit(page, "layout-bottom-bar--default")

    const bottomBar = await page.getByRole("complementary")
    const content = await page.getByRole("region")

    await expect(bottomBar).toBeVisible()
    await expect(content).toBeVisible()
    await expect(content).not.toHaveClass(/bottombar-collapsed/)
  })

  test("collapses and expands on toggle", async ({ page }) => {
    await visit(page, "layout-bottom-bar--default")

    const toggleButton = await page.getByRole("button")
    const content = await page.getByRole("region")

    // Initial state
    await expect(content).not.toHaveClass(/bottombar-collapsed/)

    // Click to collapse
    await toggleButton.click()
    await expect(content).toHaveClass(/bottombar-collapsed/)

    // Click to expand
    await toggleButton.click()
    await expect(content).not.toHaveClass(/bottombar-collapsed/)
  })

  test("shows backdrop on mobile", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })

    await visit(page, "layout-bottom-bar--default")

    const bottomBar = await page.getByRole("complementary")
    await expect(bottomBar).toHaveClass(/bottombar-float-mobile/)

    // Check if backdrop appears when expanded
    const backdrop = await page.locator(".bottombar-backdrop")
    await expect(backdrop).toBeVisible()

    // Click backdrop to close
    await backdrop.click()
    await expect(backdrop).not.toBeVisible()
  })

  test("closes on escape key", async ({ page }) => {
    await visit(page, "layout-bottom-bar--default")

    const content = await page.getByRole("region")

    // Initial state
    await expect(content).not.toHaveClass(/bottombar-collapsed/)

    // Press escape
    await page.keyboard.press("Escape")
    await expect(content).toHaveClass(/bottombar-collapsed/)
  })

  test("respects disabled state", async ({ page }) => {
    await visit(page, "layout-bottom-bar--default", {
      args: { disabled: true },
    })

    const toggleButton = await page.getByRole("button")
    const content = await page.getByRole("region")

    // Initial state
    await expect(content).not.toHaveClass(/bottombar-collapsed/)
    await expect(toggleButton).toBeDisabled()

    // Try to click
    await toggleButton.click({ force: true })
    await expect(content).not.toHaveClass(/bottombar-collapsed/)

    // Try to press escape
    await page.keyboard.press("Escape")
    await expect(content).not.toHaveClass(/bottombar-collapsed/)
  })

  test("docks to viewport when specified", async ({ page }) => {
    await visit(page, "layout-bottom-bar--docked")

    const bottomBar = await page.getByRole("complementary")
    await expect(bottomBar).toHaveClass(/bottombar-docked/)
  })
})
