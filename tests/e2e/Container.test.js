import { test, expect } from "@playwright/test"

/**
 * E2E tests for the Container component, targeting the SvelteKit docs
 * site (http://localhost:5173) instead of Storybook. Selectors use the
 * `data-testid` attributes that the Container docs page exposes for
 * each example (basic, fluid, etc.).
 *
 * The previous Storybook URL pattern
 *   `http://localhost:6006/?path=/story/components-container--<variant>`
 * has been replaced with the single docs route that renders every
 * example on one page:
 *   `/docs/components/Container/Container`
 */
test.describe("Container Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Container/Container")
  })

  test("renders with default props (basic container)", async ({ page }) => {
    const basic = page.getByTestId("container-basic")
    await expect(basic).toBeVisible()

    // The default Container renders as <section> with `container mx-auto px-4 ...`
    const inner = basic.locator("section, main, article, div").first()
    await expect(inner).toBeVisible()
    const className = await inner.getAttribute("class")
    expect(className).toMatch(/container/)
  })

  test("renders as fluid container", async ({ page }) => {
    const fluid = page.getByTestId("container-fluid")
    await expect(fluid).toBeVisible()

    const inner = fluid.locator("section, main, article, div").first()
    const className = await inner.getAttribute("class")
    expect(className).toContain("w-full")
  })
})
