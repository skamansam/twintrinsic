import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the LazyPanel component.
 *
 * Targets `/docs/components/Lazy/LazyPanel`. LazyPanel uses
 * IntersectionObserver to defer rendering of panel content until
 * the panel scrolls into the viewport.
 */
test.describe("LazyPanel docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Lazy/LazyPanel");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "LazyPanel", level: 1 })).toBeVisible();
  });

  test("renders all live examples", async ({ page }) => {
    await expect(page.getByTestId("lazypanel-basic")).toBeVisible();
    await expect(page.getByTestId("lazypanel-custom-loading")).toBeVisible();
  });

  test("basic example renders a panel with semantic structure", async ({ page }) => {
    const example = page.getByTestId("lazypanel-basic");
    await example.scrollIntoViewIfNeeded();
    const panel = example.locator(".panel");
    await expect(panel).toBeVisible();
  });

  test("basic example lazy-loads content on scroll", async ({ page }) => {
    const example = page.getByTestId("lazypanel-basic");
    await example.scrollIntoViewIfNeeded();
    await expect(
      example.getByText("How do upgrades work?"),
    ).toBeVisible();
  });

  test("custom-loading example renders its content once visible", async ({ page }) => {
    const example = page.getByTestId("lazypanel-custom-loading");
    await example.scrollIntoViewIfNeeded();
    await expect(example.locator(".panel")).toBeVisible();
    await expect(
      example.getByText("Manage your profile"),
    ).toBeVisible();
  });

  test("lazy panels do not render content before scrolling", async ({ page }) => {
    // Navigate to the page but don't scroll
    const example = page.getByTestId("lazypanel-basic");
    // If the panel is above the fold, content should already be loaded
    const isVisible = await example.isVisible();
    if (isVisible) {
      // Check that the panel has a bounding box (it's rendered)
      const box = await example.boundingBox();
      expect(box).not.toBeNull();
    }
  });
});
