import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for Lazy.
 *
 * Targets `/docs/components/Lazy/Lazy`. Lazy renders its content only once it
 * scrolls into the viewport via IntersectionObserver. The examples expose
 * `data-testid` hooks (`lazy-basic`, `lazy-placeholder`).
 */
test.describe("Lazy docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Lazy/Lazy");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Lazy", level: 1 }),
    ).toBeVisible();
  });

  test("deferred content renders once in view", async ({ page }) => {
    const lazy = page.getByTestId("lazy-basic");
    await lazy.scrollIntoViewIfNeeded();
    await expect(lazy).toContainText("Monthly revenue chart");
  });

  test("placeholder snippet renders then gives way to content", async ({
    page,
  }) => {
    const lazy = page.getByTestId("lazy-placeholder");

    // The example sits below the fold, so the placeholder shows first.
    await expect(lazy).toContainText("Loading chart…");

    // Scrolling into view fires IntersectionObserver, which swaps content.
    await lazy.scrollIntoViewIfNeeded();
    await expect(lazy).toContainText("Live analytics widget");
  });

  test("lazy panel container is visible before content loads", async ({
    page,
  }) => {
    const lazy = page.getByTestId("lazy-basic");
    await expect(lazy).toBeVisible();
  });

  test("content is not visible before scroll (placeholder state)", async ({
    page,
  }) => {
    const lazy = page.getByTestId("lazy-placeholder");
    // Before scrolling, the placeholder should be shown.
    await expect(lazy).toContainText("Loading chart…");
    await expect(lazy).not.toContainText("Live analytics widget");
  });

  test("lazy loading does not break keyboard accessibility", async ({
    page,
  }) => {
    const lazy = page.getByTestId("lazy-basic");
    await lazy.scrollIntoViewIfNeeded();
    await expect(lazy).toContainText("Monthly revenue chart");
    // Content should still be visible and accessible after loading.
    await expect(lazy).toBeVisible();
  });
});
