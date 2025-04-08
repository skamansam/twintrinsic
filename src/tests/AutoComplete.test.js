import { test, expect } from "@playwright/test"

test.describe("AutoComplete Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-autocomplete--default")
  })

  test("renders with default props", async ({ page }) => {
    const autocomplete = page.locator(".autocomplete")
    await expect(autocomplete).toBeVisible()

    const input = autocomplete.locator("input")
    await expect(input).toHaveAttribute("placeholder", "Select a country")
  })

  test("shows suggestions on input", async ({ page }) => {
    const input = page.locator("input")
    await input.type("uni")

    const suggestions = page.locator(".autocomplete-suggestions")
    await expect(suggestions).toBeVisible()

    const items = suggestions.locator(".autocomplete-item")
    await expect(items).toHaveCount(2) // United States, United Kingdom

    // Check highlighting
    const firstItem = items.first()
    await expect(firstItem).toContainText("United")
    await expect(firstItem.locator("mark")).toContainText("Uni")
  })

  test("handles keyboard navigation", async ({ page }) => {
    const input = page.locator("input")
    await input.type("a")

    // Arrow down to first item
    await page.keyboard.press("ArrowDown")
    const items = page.locator(".autocomplete-item")
    await expect(items.first()).toHaveClass(/autocomplete-item-highlighted/)

    // Arrow down to second item
    await page.keyboard.press("ArrowDown")
    await expect(items.nth(1)).toHaveClass(/autocomplete-item-highlighted/)

    // Arrow up back to first item
    await page.keyboard.press("ArrowUp")
    await expect(items.first()).toHaveClass(/autocomplete-item-highlighted/)

    // Press Enter to select
    await page.keyboard.press("Enter")
    await expect(input).toHaveValue("Australia")
    await expect(page.locator(".autocomplete-suggestions")).not.toBeVisible()
  })

  test("handles multiple selection", async ({ page }) => {
    // Navigate to multiple variant
    await page.goto("http://localhost:6006/?path=/story/components-form-autocomplete--multiple")

    const input = page.locator("input")

    // Select first item
    await input.type("united")
    await page.locator(".autocomplete-item").first().click()

    // Check chip
    const chips = page.locator(".autocomplete-chip")
    await expect(chips).toHaveCount(1)
    await expect(chips.first()).toContainText("United States")

    // Select second item
    await input.type("can")
    await page.locator(".autocomplete-item").first().click()
    await expect(chips).toHaveCount(2)

    // Remove first item
    await chips.first().locator("button").click()
    await expect(chips).toHaveCount(1)
  })

  test("handles custom template", async ({ page }) => {
    // Navigate to custom template variant
    await page.goto(
      "http://localhost:6006/?path=/story/components-form-autocomplete--custom-template"
    )

    const input = page.locator("input")
    await input.type("j")

    const items = page.locator(".autocomplete-item")

    // Check custom template elements
    const firstItem = items.first()
    await expect(firstItem.locator("img")).toBeVisible()
    await expect(firstItem.locator("span")).toContainText("John")
  })

  test("handles minimum length requirement", async ({ page }) => {
    // Navigate to min length variant
    await page.goto(
      "http://localhost:6006/?path=/story/components-form-autocomplete--with-min-length"
    )

    const input = page.locator("input")

    // Type single character
    await input.type("a")
    await expect(page.locator(".autocomplete-suggestions")).not.toBeVisible()

    // Type second character
    await input.type("u")
    await expect(page.locator(".autocomplete-suggestions")).toBeVisible()
  })

  test("handles loading state", async ({ page }) => {
    // Navigate to loading variant
    await page.goto("http://localhost:6006/?path=/story/components-form-autocomplete--loading")

    const input = page.locator("input")
    await input.type("a")

    const loading = page.locator(".autocomplete-message")
    await expect(loading).toBeVisible()
    await expect(loading).toHaveText("Loading...")
  })

  test("handles empty results", async ({ page }) => {
    const input = page.locator("input")
    await input.type("xyz")

    const empty = page.locator(".autocomplete-message")
    await expect(empty).toBeVisible()
    await expect(empty).toHaveText("No results found")
  })

  test("handles force selection", async ({ page }) => {
    // Navigate to force selection variant
    await page.goto(
      "http://localhost:6006/?path=/story/components-form-autocomplete--force-selection"
    )

    const input = page.locator("input")

    // Type and blur without selecting
    await input.type("united")
    await input.evaluate((e) => e.blur())

    // Input should be cleared
    await expect(input).toHaveValue("")
  })

  test("handles disabled state", async ({ page }) => {
    // Navigate to disabled variant
    await page.goto("http://localhost:6006/?path=/story/components-form-autocomplete--disabled")

    const input = page.locator("input")
    await expect(input).toBeDisabled()

    // Try to type (should not work)
    await input.type("test")
    await expect(input).not.toHaveValue("test")
  })

  test("handles custom filter", async ({ page }) => {
    // Navigate to custom filter variant
    await page.goto(
      "http://localhost:6006/?path=/story/components-form-autocomplete--custom-filter"
    )

    const input = page.locator("input")
    await input.type("un")

    const items = page.locator(".autocomplete-item")

    // Should only show items starting with "un"
    await expect(items).toHaveCount(2) // United States, United Kingdom
    await expect(items).not.toContainText("Australia") // Should not match
  })
})
