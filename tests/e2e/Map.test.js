import { expect, test } from "@playwright/test";

test.describe("Map", () => {
  test("should render the map container", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-map--default");
    const mapContainer = page.locator(".h-full.w-full");
    await expect(mapContainer).toBeVisible();
  });

  test("should render with custom center and zoom", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-map--custom-center");
    const mapContainer = page.locator(".h-full.w-full");
    await expect(mapContainer).toBeVisible();
  });

  test("should render with different tile layer", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-map--custom-tile-layer");
    const mapContainer = page.locator(".h-full.w-full");
    await expect(mapContainer).toBeVisible();
  });

  test("should render with zoom controls disabled", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-map--no-zoom-control");
    const mapContainer = page.locator(".h-full.w-full");
    await expect(mapContainer).toBeVisible();
  });

  test("should render with attribution control disabled", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=components-map--no-attribution");
    const mapContainer = page.locator(".h-full.w-full");
    await expect(mapContainer).toBeVisible();
  });
});
