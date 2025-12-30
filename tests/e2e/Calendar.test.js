import { test, expect } from "@playwright/test"

test.describe("Calendar Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-form-calendar--default")
  })

  test("renders with default props", async ({ page }) => {
    const calendar = page.locator(".calendar-container")
    await expect(calendar).toBeVisible()

    const input = calendar.locator("input")
    await expect(input).toHaveAttribute("placeholder", "Select Date")
  })

  test("opens calendar on input click", async ({ page }) => {
    const input = page.locator("input")
    await input.click()

    const calendar = page.locator(".calendar")
    await expect(calendar).toBeVisible()

    // Check calendar header
    const header = calendar.locator(".calendar-header")
    await expect(header).toContainText("April 2025")

    // Check day names
    const dayNames = page.locator("th")
    await expect(dayNames).toHaveCount(7)
    await expect(dayNames.first()).toHaveText("Su")
  })

  test("handles date selection", async ({ page }) => {
    const input = page.locator("input")
    await input.click()

    // Select a date
    const days = page.locator(".calendar-day button")
    await days.nth(15).click() // Click on the 15th

    // Calendar should close
    await expect(page.locator(".calendar")).not.toBeVisible()

    // Input should have selected date
    await expect(input).toHaveValue("04/15/2025")
  })

  test("handles date range selection", async ({ page }) => {
    // Navigate to range variant
    await page.goto("http://localhost:6006/?path=/story/components-form-calendar--date-range")

    const input = page.locator("input")
    await input.click()

    const days = page.locator(".calendar-day button")

    // Select start date
    await days.nth(10).click()
    await expect(page.locator(".calendar")).toBeVisible()

    // Select end date
    await days.nth(15).click()
    await expect(page.locator(".calendar")).not.toBeVisible()

    // Check input value
    await expect(input).toHaveValue("04/10/2025 - 04/15/2025")
  })

  test("handles min/max date restrictions", async ({ page }) => {
    // Navigate to min/max variant
    await page.goto("http://localhost:6006/?path=/story/components-form-calendar--with-min-max")

    const input = page.locator("input")
    await input.click()

    // Check disabled dates
    const disabledDays = page.locator(".calendar-day-disabled")
    await expect(disabledDays).toBeVisible()

    // Try to click disabled date
    const firstDisabled = disabledDays.first().locator("button")
    await expect(firstDisabled).toBeDisabled()
  })

  test("shows week numbers", async ({ page }) => {
    // Navigate to week numbers variant
    await page.goto(
      "http://localhost:6006/?path=/story/components-form-calendar--with-week-numbers"
    )

    const input = page.locator("input")
    await input.click()

    // Check week number column
    const weekNumbers = page.locator(".calendar-week")
    await expect(weekNumbers).toBeVisible()
    await expect(weekNumbers).toHaveCount(6) // 6 weeks shown
  })

  test("handles month navigation", async ({ page }) => {
    const input = page.locator("input")
    await input.click()

    const prevMonth = page.locator('button[aria-label="Previous month"]')
    const nextMonth = page.locator('button[aria-label="Next month"]')
    const header = page.locator(".calendar-title")

    // Navigate to previous month
    await prevMonth.click()
    await expect(header).toHaveText("March 2025")

    // Navigate to next month twice
    await nextMonth.click()
    await nextMonth.click()
    await expect(header).toHaveText("May 2025")
  })

  test("handles keyboard navigation", async ({ page }) => {
    const input = page.locator("input")
    await input.click()

    // Arrow keys should navigate days
    await page.keyboard.press("ArrowRight")
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("Enter")

    // Calendar should close with selected date
    await expect(page.locator(".calendar")).not.toBeVisible()
    await expect(input).not.toHaveValue("")
  })

  test("handles custom format", async ({ page }) => {
    // Navigate to custom format variant
    await page.goto("http://localhost:6006/?path=/story/components-form-calendar--custom-format")

    const input = page.locator("input")
    await input.click()

    // Select a date
    const days = page.locator(".calendar-day button")
    await days.nth(15).click()

    // Check formatted date
    await expect(input).toHaveValue("15/04/2025")
  })

  test("handles disabled state", async ({ page }) => {
    // Navigate to disabled variant
    await page.goto("http://localhost:6006/?path=/story/components-form-calendar--disabled")

    const input = page.locator("input")
    await expect(input).toBeDisabled()

    // Calendar should not open on click
    await input.click()
    await expect(page.locator(".calendar")).not.toBeVisible()
  })

  test("closes on outside click", async ({ page }) => {
    const input = page.locator("input")
    await input.click()

    // Calendar should be visible
    await expect(page.locator(".calendar")).toBeVisible()

    // Click outside
    await page.mouse.click(0, 0)

    // Calendar should close
    await expect(page.locator(".calendar")).not.toBeVisible()
  })

  test("closes on escape key", async ({ page }) => {
    const input = page.locator("input")
    await input.click()

    // Calendar should be visible
    await expect(page.locator(".calendar")).toBeVisible()

    // Press escape
    await page.keyboard.press("Escape")

    // Calendar should close
    await expect(page.locator(".calendar")).not.toBeVisible()
  })
})
