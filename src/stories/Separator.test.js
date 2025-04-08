import { test, expect } from "@playwright/test"
import { visit } from "@storybook/test"

test.describe("Separator Component", () => {
  test("renders horizontal separator correctly", async ({ page }) => {
    await visit(page, "layout-separator--default")

    const separator = await page.getByRole("separator")
    await expect(separator).toBeVisible()
    await expect(separator).toHaveAttribute("aria-orientation", "horizontal")
  })

  test("renders vertical separator correctly", async ({ page }) => {
    await visit(page, "layout-separator--vertical")

    const separator = await page.getByRole("separator")
    await expect(separator).toBeVisible()
    await expect(separator).toHaveAttribute("aria-orientation", "vertical")
  })

  test("displays content when provided", async ({ page }) => {
    await visit(page, "layout-separator--with-text")

    const separator = await page.getByRole("separator")
    await expect(separator).toContainText("or")
    await expect(separator).toHaveAttribute("role", "separator")
  })

  test("applies color variants correctly", async ({ page }) => {
    await visit(page, "layout-separator--colors")

    const separators = await page.getByRole("separator").all()
    expect(separators).toHaveLength(5)

    // Check each color variant has the correct class
    const colorClasses = [
      "border-border",
      "border-primary-200",
      "border-success/30",
      "border-warning/30",
      "border-error/30",
    ]
    for (let i = 0; i < separators.length; i++) {
      await expect(separators[i]).toHaveClass(new RegExp(colorClasses[i]))
    }
  })

  test("supports custom aria-label", async ({ page }) => {
    await visit(page, "layout-separator--default", {
      args: { ariaLabel: "Custom separator label" },
    })

    const separator = await page.getByRole("separator")
    await expect(separator).toHaveAttribute("aria-label", "Custom separator label")
  })
})
