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

  test("first item is expanded by default", async ({ page }) => {
    const details = page.locator("details.accordion-item")
    await expect(details.nth(0)).toHaveAttribute("open", "")
  })

  test("only one item can be expanded at a time by default", async ({ page }) => {
    const details = page.locator("details.accordion-item")
    const summaries = page.locator("details.accordion-item > summary")

    // First item should already be open
    await expect(details.nth(0)).toHaveAttribute("open", "")

    // Click second item - first should close
    await summaries.nth(1).click()
    await expect(details.nth(1)).toHaveAttribute("open", "")
    await expect(details.nth(0)).not.toHaveAttribute("open", "")
  })

  test("allows multiple items to be expanded when allowMultiple=true", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-accordion--allow-multiple")

    const details = page.locator("details.accordion-item")
    const summaries = page.locator("details.accordion-item > summary")

    // Expand first item
    await summaries.nth(0).click()
    await expect(details.nth(0)).toHaveAttribute("open", "")

    // Expand second item - first should stay open
    await summaries.nth(1).click()
    await expect(details.nth(1)).toHaveAttribute("open", "")
    await expect(details.nth(0)).toHaveAttribute("open", "")
  })

  test("handles keyboard navigation with Enter key", async ({ page }) => {
    const summaries = page.locator("details.accordion-item > summary")
    const firstDetails = page.locator("details.accordion-item").nth(0)

    // Focus first summary
    await summaries.nth(0).focus()

    // Press Enter to expand
    await page.keyboard.press("Enter")
    await expect(firstDetails).toHaveAttribute("open", "")

    // Press Enter to collapse
    await page.keyboard.press("Enter")
    await expect(firstDetails).not.toHaveAttribute("open", "")
  })

  test("handles keyboard navigation with Space key", async ({ page }) => {
    const summaries = page.locator("details.accordion-item > summary")
    const firstDetails = page.locator("details.accordion-item").nth(0)

    // Focus first summary
    await summaries.nth(0).focus()

    // Press Space to expand
    await page.keyboard.press(" ")
    await expect(firstDetails).toHaveAttribute("open", "")

    // Press Space to collapse
    await page.keyboard.press(" ")
    await expect(firstDetails).not.toHaveAttribute("open", "")
  })

  test("respects disabled state on items", async ({ page }) => {
    const details = page.locator("details.accordion-item")

    // Disable first item
    await details.nth(0).evaluate((el) => {
      el.setAttribute("class", el.getAttribute("class") + " disabled")
    })

    // Try to click disabled item
    await details.nth(0).locator("summary").click()
    await expect(details.nth(0)).not.toHaveAttribute("open", "")
  })

  test("accordion without border", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/components-accordion--no-border")

    const accordion = page.locator(".accordion")
    await expect(accordion).not.toHaveClass(/border/)
  })
})
