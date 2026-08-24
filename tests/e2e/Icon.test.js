import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Icon component.
 *
 * Targets `/docs/components/Icon/Icon` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies the global iconset
 * switcher renders the current iconset and that demo icons render as SVG.
 */
test.describe("Icon docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Icon/Icon");
    await waitForHydration(page);
  });

  test("renders the docs page with the iconset switcher and demos", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Icon", level: 1 })).toBeVisible();
    await expect(page.getByTestId("icon-iconset-changer")).toBeVisible();
    await expect(page.getByTestId("icon-basic")).toBeVisible();
    await expect(page.getByTestId("icon-styled")).toBeVisible();
  });

  test("shows the default tabler iconset", async ({ page }) => {
    const changer = page.getByTestId("icon-iconset-changer");
    await expect(changer.locator("svg").first()).toBeAttached();
  });

  test("demo icons render as inline SVG elements", async ({ page }) => {
    const basic = page.getByTestId("icon-basic");
    // Iconify icons are inline SVGs; with an offline/CDN-fallback they still
    // emit an <svg> element, so assert on the element rather than the glyph.
    await expect(basic.locator("svg").first()).toBeAttached();
  });
});
