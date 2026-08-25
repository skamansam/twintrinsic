import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the Masonry component.
 *
 * Targets `/docs/components/Masonry/Masonry`. Masonry renders a
 * responsive masonry grid layout that arranges items into columns
 * based on available width.
 */
test.describe("Masonry docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Masonry/Masonry");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Masonry", level: 1 })).toBeVisible();
  });

  test("renders all live examples", async ({ page }) => {
    await expect(page.getByTestId("masonry-responsive")).toBeVisible();
    await expect(page.getByTestId("masonry-fixed-width")).toBeVisible();
  });

  test("responsive masonry renders a grid with items", async ({ page }) => {
    const demo = page.getByTestId("masonry-responsive");
    await expect(demo).toBeVisible();
    // Check that it renders content items
    const text = await demo.textContent();
    expect(text).toBeTruthy();
    expect(text.length).toBeGreaterThan(50);
  });

  test("fixed-width masonry renders its items", async ({ page }) => {
    const demo = page.getByTestId("masonry-fixed-width");
    await expect(demo).toBeVisible();
    const text = await demo.textContent();
    expect(text).toBeTruthy();
  });

  test("masonry items have visible content", async ({ page }) => {
    const demo = page.getByTestId("masonry-responsive");
    // The masonry should contain text content
    const text = await demo.textContent();
    expect(text).toBeTruthy();
    expect(text.length).toBeGreaterThan(10);
  });

  test("masonry container has non-zero dimensions", async ({ page }) => {
    const demo = page.getByTestId("masonry-responsive");
    const box = await demo.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    }
  });

  test("fixed-width masonry has non-zero dimensions", async ({ page }) => {
    const demo = page.getByTestId("masonry-fixed-width");
    const box = await demo.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    }
  });
});
