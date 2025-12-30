import { test, expect } from "@playwright/test"

test.describe("Input Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-input--default")
  })

  test("renders with default props", async ({ page }) => {
    const container = page.locator(".form-input-container")
    await expect(container).toBeVisible()

    const label = container.locator("label")
    await expect(label).toHaveText("Username")

    const input = container.locator("input")
    await expect(input).toHaveAttribute("type", "text")
    await expect(input).toHaveAttribute("placeholder", "Enter username")
  })

  test("handles input value changes", async ({ page }) => {
    const input = page.locator(".form-input")

    await input.type("test user")
    await expect(input).toHaveValue("test user")

    await input.fill("")
    await expect(input).toHaveValue("")
  })

  test("handles floating labels", async ({ page }) => {
    // Navigate to floating label variant
    await page.goto("http://localhost:6006/?path=/story/components-form-input--floating-label")

    const container = page.locator(".form-input-container")
    const label = container.locator("label")
    const input = container.locator("input")

    // Initial state
    await expect(container).toHaveClass(/form-input-floating/)
    await expect(label).not.toHaveClass(/form-input-label-float/)

    // Focus state
    await input.focus()
    await expect(label).toHaveClass(/form-input-label-float/)

    // With value
    await input.type("test@example.com")
    await input.blur()
    await expect(label).toHaveClass(/form-input-label-float/)

    // Clear value
    await input.fill("")
    await input.blur()
    await expect(label).not.toHaveClass(/form-input-label-float/)
  })

  test("displays error state", async ({ page }) => {
    // Navigate to error variant
    await page.goto("http://localhost:6006/?path=/story/components-form-input--with-error")

    const container = page.locator(".form-input-container")
    const input = container.locator("input")
    const errorText = container.locator(".form-input-error-text")

    // Check error state
    await expect(container).toHaveClass(/form-input-error/)
    await expect(input).toHaveAttribute("aria-invalid", "true")

    // Error message appears after interaction
    await input.click()
    await input.blur()
    await expect(errorText).toBeVisible()
    await expect(errorText).toHaveText("Please enter a valid email address")
  })

  test("handles icons and icon clicks", async ({ page }) => {
    // Navigate to icons variant
    await page.goto("http://localhost:6006/?path=/story/components-form-input--with-icons")

    const container = page.locator(".form-input-container")
    const input = container.locator("input")
    const leftIcon = container.locator(".form-input-icon-left")
    const rightIcon = container.locator(".form-input-icon-right")

    await expect(leftIcon).toBeVisible()
    await expect(rightIcon).toBeVisible()

    // Check input padding for icons
    await expect(input).toHaveClass(/form-input-left-icon/)
    await expect(input).toHaveClass(/form-input-right-icon/)

    // Click icons
    await leftIcon.click()
    await rightIcon.click()
  })

  test("handles input masking", async ({ page }) => {
    // Navigate to mask variant
    await page.goto("http://localhost:6006/?path=/story/components-form-input--with-mask")

    const input = page.locator(".form-input")

    // Type unformatted number
    await input.type("5555555555")
    await expect(input).toHaveValue("(555) 555-5555")

    // Type with formatting
    await input.fill("")
    await input.type("(444) 444-4444")
    await expect(input).toHaveValue("(444) 444-4444")
  })

  test("handles disabled state", async ({ page }) => {
    // Navigate to disabled variant
    await page.goto("http://localhost:6006/?path=/story/components-form-input--disabled")

    const container = page.locator(".form-input-container")
    const input = container.locator("input")

    await expect(container).toHaveClass(/form-input-disabled/)
    await expect(input).toBeDisabled()
  })

  test("handles readonly state", async ({ page }) => {
    // Navigate to readonly variant
    await page.goto("http://localhost:6006/?path=/story/components-form-input--readonly")

    const input = page.locator(".form-input")

    await expect(input).toHaveAttribute("readonly", "")
    await expect(input).toHaveValue("sk_test_123456789")

    // Try to modify (should not work)
    await input.type("test")
    await expect(input).toHaveValue("sk_test_123456789")
  })

  test("handles required state", async ({ page }) => {
    // Navigate to required variant
    await page.goto("http://localhost:6006/?path=/story/components-form-input--required")

    const container = page.locator(".form-input-container")
    const input = container.locator("input")
    const requiredIndicator = container.locator(".form-input-required")

    await expect(input).toHaveAttribute("required", "")
    await expect(requiredIndicator).toBeVisible()
    await expect(requiredIndicator).toHaveText("*")
  })

  test("displays help text", async ({ page }) => {
    // Navigate to help text variant
    await page.goto("http://localhost:6006/?path=/story/components-form-input--with-help-text")

    const container = page.locator(".form-input-container")
    const input = container.locator("input")
    const helpText = container.locator(".form-input-description")

    // Help text appears after interaction
    await input.click()
    await input.blur()
    await expect(helpText).toBeVisible()
    await expect(helpText).toHaveText("Password must be at least 8 characters long")
  })
})
