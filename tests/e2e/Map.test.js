import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the Map component.
 *
 * Leaflet tile rendering is flaky in headless browsers, so per the
 * E2E migration plan § 9.5 we only assert that each live example on
 * the docs page mounts a leaflet map container with a non-zero
 * bounding box — no tile pixel data is checked. Component-level
 * behavior (custom center/zoom, tile layers, zoom/attribution
 * controls) is covered by the Storybook vitest suite
 * (`pnpm test:storybook`).
 */
test.describe("Map docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Map/Map");
    await waitForHydration(page);
  });

  test("renders the docs page with all live map examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Map", level: 1 })).toBeVisible();
    for (const id of [
      "map-basic",
      "map-tile-layer",
      "map-no-controls",
    ]) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });

  test("each example mounts a leaflet container with size", async ({ page }) => {
    const ids = [
      "map-basic",
      "map-tile-layer",
      "map-no-controls",
    ];
    for (const id of ids) {
      const container = page.getByTestId(id).locator(".leaflet-container");
      await expect(container).toBeVisible();
      const box = await container.boundingBox();
      expect(box, `${id} map should have a non-zero bounding box`).not.toBeNull();
      if (box) {
        expect(box.width).toBeGreaterThan(0);
        expect(box.height).toBeGreaterThan(0);
      }
    }
  });
});
