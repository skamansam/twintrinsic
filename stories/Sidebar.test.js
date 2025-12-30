import { test, expect } from "@playwright/test"
import { visit } from "@storybook/test"

test.describe("Sidebar Component", () => {
  test("renders expanded sidebar correctly", async ({ page }) => {
    await visit(page, "layout-sidebar--default")

    const sidebar = await page.getByRole("complementary")
    const content = await page.getByRole("region")

    await expect(sidebar).toBeVisible()
    await expect(content).toBeVisible()
    await expect(content).not.toHaveClass(/sidebar-collapsed/)
  })

  test("collapses and expands on toggle", async ({ page }) => {
    await visit(page, "layout-sidebar--default")

    const toggleButton = await page.getByRole("button")
    const content = await page.getByRole("region")

    // Initial state
    await expect(content).not.toHaveClass(/sidebar-collapsed/)

    // Click to collapse
    await toggleButton.click()
    await expect(content).toHaveClass(/sidebar-collapsed/)

    // Click to expand
    await toggleButton.click()
    await expect(content).not.toHaveClass(/sidebar-collapsed/)
  })

  test("renders in right position", async ({ page }) => {
    await visit(page, "layout-sidebar--right-sidebar")

    const sidebar = await page.getByRole("complementary")
    await expect(sidebar).toHaveClass(/sidebar-right/)
  })

  test("shows backdrop on mobile", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })

    await visit(page, "layout-sidebar--default")

    const sidebar = await page.getByRole("complementary")
    await expect(sidebar).toHaveClass(/sidebar-float-mobile/)

    // Check if backdrop appears when expanded
    const backdrop = await page.locator(".sidebar-backdrop")
    await expect(backdrop).toBeVisible()

    // Click backdrop to close
    await backdrop.click()
    await expect(backdrop).not.toBeVisible()
  })

  test("closes on escape key", async ({ page }) => {
    await visit(page, "layout-sidebar--default")

    const content = await page.getByRole("region")

    // Initial state
    await expect(content).not.toHaveClass(/sidebar-collapsed/)

    // Press escape
    await page.keyboard.press("Escape")
    await expect(content).toHaveClass(/sidebar-collapsed/)
  })

  test("respects disabled state", async ({ page }) => {
    await visit(page, "layout-sidebar--default", {
      args: { disabled: true },
    })

    const toggleButton = await page.getByRole("button")
    const content = await page.getByRole("region")

    // Initial state
    await expect(content).not.toHaveClass(/sidebar-collapsed/)
    await expect(toggleButton).toBeDisabled()

    // Try to click
    await toggleButton.click({ force: true })
    await expect(content).not.toHaveClass(/sidebar-collapsed/)

    // Try to press escape
    await page.keyboard.press("Escape")
    await expect(content).not.toHaveClass(/sidebar-collapsed/)
  })
})
