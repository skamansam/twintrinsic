import { test, expect } from "@playwright/test"

test.describe("Checkbox Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-checkbox--default")
  })

  test("renders with default props", async ({ page }) => {
    const checkbox = page.locator(".checkbox-container")
    await expect(checkbox).toBeVisible()

    const label = checkbox.locator(".checkbox-label")
    await expect(label).toHaveText("Accept terms and conditions")

    const input = checkbox.locator('input[type="checkbox"]')
    await expect(input).not.toBeChecked()
  })

  test("handles check/uncheck", async ({ page }) => {
    const input = page.locator('input[type="checkbox"]')

    // Check
    await input.check()
    await expect(input).toBeChecked()

    // Uncheck
    await input.uncheck()
    await expect(input).not.toBeChecked()
  })

  test("shows description", async ({ page }) => {
    // Navigate to description variant
    await page.goto("http://localhost:6006/?path=/story/components-form-checkbox--with-description")

    const description = page.locator(".checkbox-description")
    await expect(description).toBeVisible()
    await expect(description).toHaveText("Receive updates about new features and announcements")
  })

  test("handles indeterminate state", async ({ page }) => {
    // Navigate to indeterminate variant
    await page.goto("http://localhost:6006/?path=/story/components-form-checkbox--indeterminate")

    const input = page.locator('input[type="checkbox"]')
    await expect(input).toHaveJSProperty("indeterminate", true)

    // Check that indeterminate icon is shown
    const control = page.locator(".checkbox-control")
    await expect(control.locator('path[d*="H6a1"]')).toBeVisible()

    // Click should clear indeterminate and set checked
    await input.click()
    await expect(input).toHaveJSProperty("indeterminate", false)
    await expect(input).toBeChecked()
  })

  test("shows required indicator", async ({ page }) => {
    // Navigate to required variant
    await page.goto("http://localhost:6006/?path=/story/components-form-checkbox--required")

    const input = page.locator('input[type="checkbox"]')
    await expect(input).toHaveAttribute("required", "")

    const requiredIndicator = page.locator(".checkbox-required")
    await expect(requiredIndicator).toBeVisible()
    await expect(requiredIndicator).toHaveText("*")
  })

  test("shows error state", async ({ page }) => {
    // Navigate to error variant
    await page.goto("http://localhost:6006/?path=/story/components-form-checkbox--with-error")

    const checkbox = page.locator(".checkbox")
    await expect(checkbox).toHaveClass(/checkbox-error/)

    const input = checkbox.locator("input")
    await expect(input).toHaveAttribute("aria-invalid", "true")

    const errorMessage = page.locator(".checkbox-error-text")
    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toHaveText("You must accept the privacy policy")

    // Error message should be linked to input
    const errorId = await input.getAttribute("aria-describedby")
    await expect(errorMessage).toHaveAttribute("id", errorId)
  })

  test("handles disabled state", async ({ page }) => {
    // Navigate to disabled variant
    await page.goto("http://localhost:6006/?path=/story/components-form-checkbox--disabled")

    const checkbox = page.locator(".checkbox")
    await expect(checkbox).toHaveClass(/checkbox-disabled/)

    const input = checkbox.locator("input")
    await expect(input).toBeDisabled()

    // Try to click (should not work)
    await input.click({ force: true })
    await expect(input).not.toBeChecked()
  })

  test("handles disabled checked state", async ({ page }) => {
    // Navigate to disabled checked variant
    await page.goto("http://localhost:6006/?path=/story/components-form-checkbox--disabled-checked")

    const input = page.locator('input[type="checkbox"]')
    await expect(input).toBeDisabled()
    await expect(input).toBeChecked()
  })

  test("handles value attribute", async ({ page }) => {
    // Navigate to value variant
    await page.goto("http://localhost:6006/?path=/story/components-form-checkbox--with-value")

    const input = page.locator('input[type="checkbox"]')
    await expect(input).toHaveAttribute("value", "option1")
  })

  test("handles checkbox group", async ({ page }) => {
    // Navigate to group variant
    await page.goto("http://localhost:6006/?path=/story/components-form-checkbox--group")

    const checkboxes = page.locator('input[type="checkbox"]')
    await expect(checkboxes).toHaveCount(3)

    // Check all boxes
    for (const checkbox of await checkboxes.all()) {
      await checkbox.check()
      await expect(checkbox).toBeChecked()
    }

    // Uncheck middle box
    await checkboxes.nth(1).uncheck()
    await expect(checkboxes.nth(0)).toBeChecked()
    await expect(checkboxes.nth(1)).not.toBeChecked()
    await expect(checkboxes.nth(2)).toBeChecked()
  })

  test("handles keyboard interaction", async ({ page }) => {
    const input = page.locator('input[type="checkbox"]')

    // Focus with Tab
    await page.keyboard.press("Tab")
    await expect(input).toBeFocused()

    // Toggle with Space
    await page.keyboard.press("Space")
    await expect(input).toBeChecked()

    await page.keyboard.press("Space")
    await expect(input).not.toBeChecked()
  })

  test("handles focus styles", async ({ page }) => {
    const checkbox = page.locator(".checkbox")
    const control = checkbox.locator(".checkbox-control")

    // Focus with keyboard
    await page.keyboard.press("Tab")
    await expect(control).toHaveClass(/ring-2/)

    // Blur
    await page.keyboard.press("Tab")
    await expect(control).not.toHaveClass(/ring-2/)
  })
})
