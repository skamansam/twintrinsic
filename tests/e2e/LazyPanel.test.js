import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the LazyPanel component.
 *
 * The live examples live on `/docs/components/Lazy/LazyPanel` (the
 * `Panel/LazyPanel` docs page is documentation-only). Component-level
 * behavior (intersection-observer thresholds, custom loading) is
 * covered by the Storybook vitest suite (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="lazypanel-*"` hooks) and that the lazily-loaded
 * content appears once the panel is visible.
 */
test.describe("LazyPanel docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Lazy/LazyPanel");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "LazyPanel", level: 1 })).toBeVisible();
    await expect(page.getByTestId("lazypanel-basic")).toBeVisible();
    await expect(page.getByTestId("lazypanel-custom-loading")).toBeVisible();
  });

  test("basic example renders a panel and lazy-loads its content", async ({ page }) => {
    const example = page.getByTestId("lazypanel-basic");
    // The IntersectionObserver only swaps in the content once the
    // panel scrolls into the viewport
    await example.scrollIntoViewIfNeeded();
    await expect(example.locator(".panel")).toBeVisible();
    await expect(
      example.getByText("How do upgrades work? Upgrades take effect immediately and are prorated."),
    ).toBeVisible();
  });

  test("custom-loading example renders its content once visible", async ({ page }) => {
    const example = page.getByTestId("lazypanel-custom-loading");
    await example.scrollIntoViewIfNeeded();
    await expect(example.locator(".panel")).toBeVisible();
    await expect(example.getByText("Manage your profile, notifications, and security preferences.")).toBeVisible();
  });
});
