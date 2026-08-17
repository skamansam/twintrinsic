import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the Masonry component.
 *
 * Targets `/docs/components/Masonry/Masonry`. Each demo exposes a
 * `data-testid` wrapper and renders a `role="grid"` container with its items
 * laid out in columns.
 */
test.describe("Masonry docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Masonry/Masonry");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Masonry", level: 1 })).toBeVisible();
  });

  test("basic masonry renders a grid with all items", async ({ page }) => {
    const demo = page.getByTestId("masonry-basic");
    await expect(demo.getByRole("grid")).toBeVisible();
    for (let itemIndex = 1; itemIndex <= 6; itemIndex++) {
      await expect(demo.getByText(`Item ${itemIndex}`, { exact: true })).toBeVisible();
    }
  });

  test("responsive masonry renders all eight items", async ({ page }) => {
    const demo = page.getByTestId("masonry-responsive");
    await expect(demo.getByRole("grid")).toBeVisible();
    for (let itemIndex = 1; itemIndex <= 8; itemIndex++) {
      await expect(demo.getByText(`Item ${itemIndex}`, { exact: true })).toBeVisible();
    }
  });

  test("fixed-width masonry renders its items", async ({ page }) => {
    const demo = page.getByTestId("masonry-fixed-width");
    await expect(demo.getByRole("grid")).toBeVisible();
    await expect(demo.getByText("Item 1", { exact: true })).toBeVisible();
    await expect(demo.getByText("Item 6", { exact: true })).toBeVisible();
  });
});
