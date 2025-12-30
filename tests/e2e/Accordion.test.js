import { test, expect } from "@playwright/test"

test.describe("Accordion Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-panel-accordion--default")
  })

  test("renders accordion with multiple panels", async ({ page }) => {
    const accordion = page.locator(".accordion")
    await expect(accordion).toBeVisible()

    const panels = accordion.locator(".panel")
    await expect(panels).toHaveCount(3)

    // Check headers
    await expect(panels.nth(0).locator("text=Section 1")).toBeVisible()
    await expect(panels.nth(1).locator("text=Section 2")).toBeVisible()
    await expect(panels.nth(2).locator("text=Section 3")).toBeVisible()
  })

  test("only one panel can be expanded at a time by default", async ({ page }) => {
    const panels = page.locator(".panel")

    // Click first panel
    await panels.nth(0).locator("button").click()
    await expect(panels.nth(0).locator('[role="region"]')).toBeVisible()

    // Click second panel
    await panels.nth(1).locator("button").click()
    await expect(panels.nth(1).locator('[role="region"]')).toBeVisible()
    await expect(panels.nth(0).locator('[role="region"]')).not.toBeVisible()
  })

  test("allows multiple panels to be expanded when multiple=true", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-panel-accordion--multiple")

    const panels = page.locator(".panel")

    // Expand first panel
    await panels.nth(0).locator("button").click()
    await expect(panels.nth(0).locator('[role="region"]')).toBeVisible()

    // Expand second panel
    await panels.nth(1).locator("button").click()
    await expect(panels.nth(1).locator('[role="region"]')).toBeVisible()
    await expect(panels.nth(0).locator('[role="region"]')).toBeVisible()
  })

  test("handles keyboard navigation", async ({ page }) => {
    const panels = page.locator(".panel")
    const firstHeader = panels.nth(0).locator("button")

    // Focus first header
    await firstHeader.focus()

    // Press Enter to expand
    await page.keyboard.press("Enter")
    await expect(panels.nth(0).locator('[role="region"]')).toBeVisible()

    // Press Space to collapse
    await page.keyboard.press("Space")
    await expect(panels.nth(0).locator('[role="region"]')).not.toBeVisible()
  })

  test("respects disabled state", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-panel-accordion--disabled")

    const panels = page.locator(".panel")

    // Try to click disabled panel
    await panels.nth(0).locator("button").click()
    await expect(panels.nth(0).locator('[role="region"]')).not.toBeVisible()

    // Check disabled styling
    await expect(panels.nth(0)).toHaveClass(/disabled/)
  })
})
