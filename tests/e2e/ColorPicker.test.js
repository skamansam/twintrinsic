import { test, expect } from "@playwright/test"

test.describe("ColorPicker Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-colorpicker--default")
  })

  test("renders with default props", async ({ page }) => {
    const colorPicker = page.locator(".color-picker")
    await expect(colorPicker).toBeVisible()

    const input = colorPicker.locator("input")
    await expect(input).toHaveValue("#000000")

    const label = colorPicker.locator("label")
    await expect(label).toHaveText("Color")
  })

  test("opens color picker on click", async ({ page }) => {
    const colorPicker = page.locator(".color-picker")
    const input = colorPicker.locator("input")

    await input.click()

    const popup = colorPicker.locator(".color-picker-popup")
    await expect(popup).toBeVisible()

    // Check for color wheel
    const wheel = popup.locator(".color-wheel")
    await expect(wheel).toBeVisible()

    // Check for lightness slider
    const lightnessSlider = popup.locator('input[type="range"]').first()
    await expect(lightnessSlider).toBeVisible()
  })

  test("closes color picker on outside click", async ({ page }) => {
    const colorPicker = page.locator(".color-picker")
    const input = colorPicker.locator("input")

    await input.click()
    await expect(colorPicker.locator(".color-picker-popup")).toBeVisible()

    await page.mouse.click(0, 0)
    await expect(colorPicker.locator(".color-picker-popup")).not.toBeVisible()
  })

  test("handles color wheel interaction", async ({ page }) => {
    // Navigate to the RGB format story for easier color value checking
    await page.goto("http://localhost:6006/?path=/story/components-form-colorpicker--rgb-format")

    const colorPicker = page.locator(".color-picker")
    await colorPicker.locator("input").click()

    const wheel = colorPicker.locator(".color-wheel")
    const rect = await wheel.boundingBox()

    // Click center of wheel (should be gray)
    await page.mouse.click(rect.x + rect.width / 2, rect.y + rect.height / 2)

    // Click right edge of wheel (should be red)
    await page.mouse.click(rect.x + rect.width, rect.y + rect.height / 2)

    const input = colorPicker.locator("input")
    await expect(input).toHaveValue(/rgb\(255,\s*\d+,\s*\d+\)/)
  })

  test("handles lightness slider", async ({ page }) => {
    const colorPicker = page.locator(".color-picker")
    await colorPicker.locator("input").click()

    const lightnessSlider = colorPicker.locator('input[type="range"]').first()

    // Set to 0% (black)
    await lightnessSlider.fill("0")
    await expect(colorPicker.locator(".color-swatch")).toHaveCSS(
      "background-color",
      /rgba\(0,\s*0,\s*0,\s*1\)/
    )

    // Set to 100% (white)
    await lightnessSlider.fill("100")
    await expect(colorPicker.locator(".color-swatch")).toHaveCSS(
      "background-color",
      /rgba\(255,\s*255,\s*255,\s*1\)/
    )
  })

  test("handles alpha slider", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-colorpicker--rgba-format")

    const colorPicker = page.locator(".color-picker")
    await colorPicker.locator("input").click()

    const alphaSlider = colorPicker.locator('input[type="range"]').nth(1)
    await expect(alphaSlider).toBeVisible()

    // Set to 50%
    await alphaSlider.fill("50")
    await expect(colorPicker.locator("input")).toHaveValue(/rgba\(\d+,\s*\d+,\s*\d+,\s*0\.5\)/)
  })

  test("handles different color formats", async ({ page }) => {
    // Test HEX format
    await page.goto("http://localhost:6006/?path=/story/components-form-colorpicker--default")
    let input = page.locator(".color-picker input")
    await expect(input).toHaveValue(/#[0-9A-F]{6}/i)

    // Test RGB format
    await page.goto("http://localhost:6006/?path=/story/components-form-colorpicker--rgb-format")
    input = page.locator(".color-picker input")
    await expect(input).toHaveValue(/rgb\(\d+,\s*\d+,\s*\d+\)/)

    // Test RGBA format
    await page.goto("http://localhost:6006/?path=/story/components-form-colorpicker--rgba-format")
    input = page.locator(".color-picker input")
    await expect(input).toHaveValue(/rgba\(\d+,\s*\d+,\s*\d+,\s*[0-9.]+\)/)

    // Test HSL format
    await page.goto("http://localhost:6006/?path=/story/components-form-colorpicker--hsl-format")
    input = page.locator(".color-picker input")
    await expect(input).toHaveValue(/hsl\(\d+,\s*\d+%,\s*\d+%\)/)
  })

  test("handles direct input", async ({ page }) => {
    const colorPicker = page.locator(".color-picker")
    const input = colorPicker.locator("input")

    // Test hex input
    await input.fill("#ff0000")
    await input.press("Enter")
    await expect(colorPicker.locator(".color-swatch")).toHaveCSS(
      "background-color",
      /rgba\(255,\s*0,\s*0,\s*1\)/
    )

    // Test rgb input
    await input.fill("rgb(0, 255, 0)")
    await input.press("Enter")
    await expect(colorPicker.locator(".color-swatch")).toHaveCSS(
      "background-color",
      /rgba\(0,\s*255,\s*0,\s*1\)/
    )
  })

  test("shows error state", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-colorpicker--with-error")

    const colorPicker = page.locator(".color-picker")
    const error = colorPicker.locator(".error-message")

    await expect(error).toBeVisible()
    await expect(error).toHaveText("Please select a valid color")

    const input = colorPicker.locator("input")
    await expect(input).toHaveAttribute("aria-invalid", "true")
  })

  test("handles disabled state", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-colorpicker--disabled")

    const colorPicker = page.locator(".color-picker")
    const input = colorPicker.locator("input")

    await expect(input).toBeDisabled()

    // Try to open picker (should not work)
    await input.click({ force: true })
    await expect(colorPicker.locator(".color-picker-popup")).not.toBeVisible()
  })

  test("handles keyboard navigation", async ({ page }) => {
    const colorPicker = page.locator(".color-picker")
    const input = colorPicker.locator("input")

    // Focus input
    await input.focus()
    await expect(input).toBeFocused()

    // Open picker with Enter
    await page.keyboard.press("Enter")
    await expect(colorPicker.locator(".color-picker-popup")).toBeVisible()

    // Tab to lightness slider
    await page.keyboard.press("Tab")
    const lightnessSlider = colorPicker.locator('input[type="range"]').first()
    await expect(lightnessSlider).toBeFocused()

    // Close with Escape
    await page.keyboard.press("Escape")
    await expect(colorPicker.locator(".color-picker-popup")).not.toBeVisible()
  })
})
