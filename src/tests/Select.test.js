import { test, expect } from "@playwright/test"

test.describe("Select Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-select--default")
  })

  test("renders with default props", async ({ page }) => {
    const select = page.locator(".select")
    await expect(select).toBeVisible()

    const control = select.locator(".select-control")
    await expect(control).toBeVisible()

    const label = select.locator(".select-label-text")
    await expect(label).toHaveText("Country")

    const placeholder = select.locator(".select-placeholder")
    await expect(placeholder).toHaveText("Select a country...")
  })

  test("opens dropdown on click", async ({ page }) => {
    const select = page.locator(".select")
    const control = select.locator(".select-control")

    await control.click()

    const dropdown = select.locator(".select-dropdown")
    await expect(dropdown).toBeVisible()

    const options = dropdown.locator(".select-option")
    await expect(options).toHaveCount(10)
  })

  test("selects option on click", async ({ page }) => {
    const select = page.locator(".select")
    const control = select.locator(".select-control")

    await control.click()

    const options = select.locator(".select-option")
    await options.first().click()

    const value = select.locator(".select-text")
    await expect(value).toHaveText("United States")

    // Dropdown should close after selection
    const dropdown = select.locator(".select-dropdown")
    await expect(dropdown).not.toBeVisible()
  })

  test("handles multiple selection", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-select--multiple")

    const select = page.locator(".select")
    const control = select.locator(".select-control")

    await control.click()

    const options = select.locator(".select-option")

    // Select first option
    await options.first().click()
    await expect(select.locator(".select-text")).toHaveText("JavaScript")

    // Select second option
    await options.nth(1).click()
    await expect(select.locator(".select-text")).toHaveText("2 items selected")

    // Dropdown should stay open in multiple mode
    const dropdown = select.locator(".select-dropdown")
    await expect(dropdown).toBeVisible()
  })

  test("displays option groups", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-select--with-groups")

    const select = page.locator(".select")
    await select.locator(".select-control").click()

    const groups = select.locator(".select-group")
    await expect(groups).toHaveCount(3) // Frontend, Backend, Mobile

    const groupLabels = select.locator(".select-group-label")
    await expect(groupLabels.first()).toHaveText("Frontend")
  })

  test("handles search functionality", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-select--with-search")

    const select = page.locator(".select")
    await select.locator(".select-control").click()

    const searchInput = select.locator(".select-search input")
    await searchInput.fill("united")

    const options = select.locator(".select-option")
    await expect(options).toHaveCount(1)
    await expect(options.first()).toHaveText("United States")

    // Clear search
    await searchInput.fill("")
    await expect(options).toHaveCount(16)
  })

  test("shows required indicator", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-select--required")

    const select = page.locator(".select")
    const required = select.locator(".select-required")

    await expect(required).toBeVisible()
    await expect(required).toHaveText("*")

    const control = select.locator(".select-control")
    await expect(control).toHaveAttribute("aria-required", "true")
  })

  test("shows error state", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-select--with-error")

    const select = page.locator(".select")
    await expect(select).toHaveClass(/select-error/)

    const error = select.locator(".select-error-text")
    await expect(error).toBeVisible()
    await expect(error).toHaveText("Please select a country")

    const control = select.locator(".select-control")
    await expect(control).toHaveAttribute("aria-invalid", "true")

    // Error should be linked to control
    const errorId = await control.getAttribute("aria-describedby")
    await expect(error).toHaveAttribute("id", errorId)
  })

  test("handles disabled state", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-select--disabled")

    const select = page.locator(".select")
    await expect(select).toHaveClass(/select-disabled/)

    const control = select.locator(".select-control")
    await expect(control).toHaveAttribute("tabindex", "-1")

    // Try to open dropdown (should not work)
    await control.click()
    const dropdown = select.locator(".select-dropdown")
    await expect(dropdown).not.toBeVisible()
  })

  test("handles keyboard navigation", async ({ page }) => {
    const select = page.locator(".select")
    const control = select.locator(".select-control")

    // Focus control
    await control.focus()
    await expect(control).toBeFocused()

    // Open with Enter
    await page.keyboard.press("Enter")
    const dropdown = select.locator(".select-dropdown")
    await expect(dropdown).toBeVisible()

    // Navigate with arrow keys
    await page.keyboard.press("ArrowDown")
    const options = select.locator(".select-option")
    await expect(options.first()).toHaveClass(/select-option-focused/)

    await page.keyboard.press("ArrowDown")
    await expect(options.nth(1)).toHaveClass(/select-option-focused/)

    // Select with Enter
    await page.keyboard.press("Enter")
    await expect(select.locator(".select-text")).toHaveText("Canada")

    // Close with Escape
    await page.keyboard.press("Escape")
    await expect(dropdown).not.toBeVisible()
  })

  test("clears selection", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-select--with-value")

    const select = page.locator(".select")
    const clear = select.locator(".select-clear")

    // Initial value
    await expect(select.locator(".select-text")).toHaveText("United States")

    // Clear selection
    await clear.click()
    await expect(select.locator(".select-placeholder")).toBeVisible()
    await expect(select.locator(".select-placeholder")).toHaveText("Select a country...")
  })

  test("handles option focus scroll", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-select--with-search")

    const select = page.locator(".select")
    await select.locator(".select-control").click()

    // Press down arrow multiple times to scroll
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("ArrowDown")
    }

    // Check that focused option is visible
    const focusedOption = select.locator(".select-option-focused")
    await expect(focusedOption).toBeVisible()
  })
})
