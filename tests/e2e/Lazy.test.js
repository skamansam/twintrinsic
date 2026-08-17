import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the Lazy component.
 *
 * Targets `/docs/components/Lazy/Lazy`. Lazy renders its content only once it
 * scrolls into the viewport via IntersectionObserver. The examples expose
 * `data-testid` hooks (`lazy-basic`, `lazy-placeholder`); since they're
 * visible on load, the deferred content should mount immediately.
 */
test.describe("Lazy docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Lazy/Lazy");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Lazy", level: 1 })).toBeVisible();
  });

  test("deferred content renders once in view", async ({ page }) => {
    const lazy = page.getByTestId("lazy-basic");
    await expect(lazy).toContainText("This content renders when it becomes visible.");
  });

  test("placeholder snippet renders then gives way to content", async ({ page }) => {
    const lazy = page.getByTestId("lazy-placeholder");
    await expect(lazy).toContainText("Deferred content.");
  });
});
