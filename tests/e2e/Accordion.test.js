import { expect, test } from "@playwright/test"

test.describe("Accordion Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-accordion--default")
  })

  test("renders accordion container", async ({ page }) => {
    const accordion = page.locator(".accordion")
    await expect(accordion).toBeVisible()
  })

  test("accordion has border by default", async ({ page }) => {
    const accordion = page.locator(".accordion")
    await expect(accordion).toHaveClass(/border/)
  })

  test("only one item can be expanded at a time by default", async ({ page }) => {
    const items = page.locator(".accordion-item")
    const buttons = page.locator(".accordion-item button")

    // Click first item
    await buttons.nth(0).click()
    await expect(items.nth(0).locator('[role="region"]')).toBeVisible()

    // Click second item - first should close
    await buttons.nth(1).click()
    await expect(items.nth(1).locator('[role="region"]')).toBeVisible()
    await expect(items.nth(0).locator('[role="region"]')).not.toBeVisible()
  })

  test("allows multiple items to be expanded when allowMultiple=true", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-accordion--allow-multiple")

    const items = page.locator(".accordion-item")
    const buttons = page.locator(".accordion-item button")

    // Expand first item
    await buttons.nth(0).click()
    await expect(items.nth(0).locator('[role="region"]')).toBeVisible()

    // Expand second item - first should stay open
    await buttons.nth(1).click()
    await expect(items.nth(1).locator('[role="region"]')).toBeVisible()
    await expect(items.nth(0).locator('[role="region"]')).toBeVisible()
  })

  test("handles keyboard navigation with Enter key", async ({ page }) => {
    const buttons = page.locator(".accordion-item button")
    const firstItem = page.locator(".accordion-item").nth(0)

    // Focus first button
    await buttons.nth(0).focus()

    // Press Enter to expand
    await page.keyboard.press("Enter")
    await expect(firstItem.locator('[role="region"]')).toBeVisible()

    // Press Enter to collapse
    await page.keyboard.press("Enter")
    await expect(firstItem.locator('[role="region"]')).not.toBeVisible()
  })

  test("handles keyboard navigation with Space key", async ({ page }) => {
    const buttons = page.locator(".accordion-item button")
    const firstItem = page.locator(".accordion-item").nth(0)

    // Focus first button
    await buttons.nth(0).focus()

    // Press Space to expand
    await page.keyboard.press(" ")
    await expect(firstItem.locator('[role="region"]')).toBeVisible()

    // Press Space to collapse
    await page.keyboard.press(" ")
    await expect(firstItem.locator('[role="region"]')).not.toBeVisible()
  })

  test("respects disabled state on items", async ({ page }) => {
    const items = page.locator(".accordion-item")
    const buttons = page.locator(".accordion-item button")

    // Disable first item
    await buttons.nth(0).evaluate((el) => {
      el.setAttribute("disabled", "true")
    })

    // Try to click disabled button
    await buttons.nth(0).click()
    await expect(items.nth(0).locator('[role="region"]')).not.toBeVisible()
  })

  test("applies aria attributes correctly", async ({ page }) => {
    const buttons = page.locator(".accordion-item button")
    const firstButton = buttons.nth(0)

    // Check aria-expanded is false initially
    await expect(firstButton).toHaveAttribute("aria-expanded", "false")

    // Click to expand
    await firstButton.click()
    await expect(firstButton).toHaveAttribute("aria-expanded", "true")
  })

  test("accordion without border", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-accordion--no-border")

    const accordion = page.locator(".accordion")
    await expect(accordion).not.toHaveClass(/border/)
  })
})
