import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Skeleton component.
 *
 * Targets `/docs/components/Skeleton/Skeleton` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies `role="status"`,
 * `aria-label`, and multi-line text rendering.
 */
test.describe("Skeleton docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Skeleton/Skeleton");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Skeleton", level: 1 })).toBeVisible();
    await expect(page.getByTestId("skeleton-basic")).toBeVisible();
    await expect(page.getByTestId("skeleton-variants")).toBeVisible();
    await expect(page.getByTestId("skeleton-multi-line")).toBeVisible();
  });

  test("skeleton exposes status role and aria-label", async ({ page }) => {
    const basic = page.getByTestId("skeleton-basic");
    const skeleton = basic.locator('[role="status"]');
    await expect(skeleton).toBeVisible();
    await expect(skeleton).toHaveAttribute("aria-label", "Loading content");
  });

  test("renders all four variants", async ({ page }) => {
    const variants = page.getByTestId("skeleton-variants");
    await expect(variants.locator(".skeleton-rectangle")).toBeVisible();
    await expect(variants.locator(".skeleton-circle")).toBeVisible();
    await expect(variants.locator(".skeleton-rounded")).toBeVisible();
    await expect(variants.locator(".skeleton-text")).toBeVisible();
  });

  test("multi-line text renders the requested number of lines", async ({ page }) => {
    const multi = page.getByTestId("skeleton-multi-line");
    await expect(multi.locator(".skeleton-text")).toHaveCount(3);
  });

  test("static skeleton omits the animation class", async ({ page }) => {
    const staticSkeleton = page.getByTestId("skeleton-static");
    await expect(staticSkeleton.locator(".skeleton")).not.toHaveClass(/skeleton-animated/);
  });
});
