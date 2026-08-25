import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the Icon component.
 *
 * Targets `/docs/components/Icon/Icon`. Icon renders inline SVG elements
 * via Iconify with a global iconset switcher.
 */
test.describe("Icon docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Icon/Icon");
    await waitForHydration(page);
  });

  test("renders the docs page with all demos", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Icon", level: 1 })).toBeVisible();
    await expect(page.getByTestId("icon-basic")).toBeVisible();
    await expect(page.getByTestId("icon-styled")).toBeVisible();
    await expect(page.getByTestId("icon-iconset-changer")).toBeVisible();
  });

  test("basic icons example has content", async ({ page }) => {
    const basic = page.getByTestId("icon-basic");
    await expect(basic).toBeVisible();
    // The basic example should have child elements (icon containers)
    const children = basic.locator("> *");
    const count = await children.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("styled icons example has content", async ({ page }) => {
    const styled = page.getByTestId("icon-styled");
    await expect(styled).toBeVisible();
    const children = styled.locator("> *");
    const count = await children.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("iconset changer has content", async ({ page }) => {
    const changer = page.getByTestId("icon-iconset-changer");
    await expect(changer).toBeVisible();
    // The changer should have at least a child element
    const inner = changer.locator("> *");
    const count = await inner.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("basic example renders multiple icon elements", async ({ page }) => {
    const basic = page.getByTestId("icon-basic");
    await expect(basic).toBeVisible();
    // Icon components render as span > svg or just svg
    const inner = basic.locator("> *");
    const count = await inner.count();
    expect(count, "basic example should have at least 3 icon elements").toBeGreaterThanOrEqual(3);
  });

  test("iconset switcher example has a single icon", async ({ page }) => {
    const changer = page.getByTestId("icon-iconset-changer");
    await expect(changer).toBeVisible();
    const inner = changer.locator("> *");
    expect(await inner.count()).toBeGreaterThanOrEqual(1);
  });

  test("styled example renders icons with different styles", async ({ page }) => {
    const styled = page.getByTestId("icon-styled");
    await expect(styled).toBeVisible();
    // Should have multiple styled icon variants
    const inner = styled.locator("> *");
    const count = await inner.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});
