import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the Map component.
 *
 * Targets `/docs/components/Map/Map`. Map renders Leaflet map containers
 * with various configurations. Focuses on container presence, control
 * visibility, and semantic structure rather than pixel-perfect tile data.
 */
test.describe("Map docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Map/Map");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Map", level: 1 })).toBeVisible();
  });

  test("renders all live map examples", async ({ page }) => {
    for (const id of ["map-basic", "map-tile-layer", "map-no-controls"]) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });

  test("each example mounts a leaflet container with non-zero size", async ({ page }) => {
    for (const id of ["map-basic", "map-tile-layer", "map-no-controls"]) {
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

  test("basic map has zoom controls by default", async ({ page }) => {
    const map = page.getByTestId("map-basic").locator(".leaflet-container");
    await expect(map.locator(".leaflet-control-zoom")).toBeVisible();
  });

  test("no-controls map hides zoom controls", async ({ page }) => {
    const map = page.getByTestId("map-no-controls").locator(".leaflet-container");
    await expect(map.locator(".leaflet-control-zoom")).toBeHidden();
  });

  test("map container has semantic structure", async ({ page }) => {
    const map = page.getByTestId("map-basic").locator(".leaflet-container");
    await expect(map).toBeVisible();
    // Leaflet container should have pane elements inside
    const panes = map.locator(".leaflet-pane");
    const count = await panes.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("tile layer map has map pane structure", async ({ page }) => {
    const map = page.getByTestId("map-tile-layer").locator(".leaflet-container");
    await expect(map).toBeVisible();
    // Leaflet renders panes inside the container
    const panes = map.locator(".leaflet-pane");
    const count = await panes.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
