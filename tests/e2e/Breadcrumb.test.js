import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Breadcrumb component.
 *
 * Targets `/docs/components/Breadcrumb/Breadcrumb` and scopes selectors through
 * the `data-testid` hooks each example block exposes. Verifies semantic
 * `<nav>`/`<ol>` structure, `aria-current="page"` on the trailing item, and
 * collapsible behavior.
 */
test.describe("Breadcrumb docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Breadcrumb/Breadcrumb");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Breadcrumb", level: 1 })).toBeVisible();
    await expect(page.getByTestId("breadcrumb-basic")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-custom-separator")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-with-icons")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-collapsible")).toBeVisible();
  });

  test("renders a nav landmark with an accessible label", async ({ page }) => {
    const nav = page.getByTestId("breadcrumb-basic").getByRole("navigation");
    await expect(nav).toHaveAttribute("aria-label", "Breadcrumb");
    await expect(nav.locator("ol")).toBeVisible();
  });

  test("trailing item is marked aria-current=page", async ({ page }) => {
    const example = page.getByTestId("breadcrumb-basic");
    const items = example.locator(".breadcrumb-item");
    await expect(items).toHaveCount(3);
    // Links render for the first two items; the last is the current page.
    await expect(items.nth(0).locator("a")).toBeVisible();
    await expect(items.nth(2)).toHaveAttribute("aria-current", "page");
    await expect(items.nth(2).locator("a")).toHaveCount(0);
  });

  test("custom separator renders the configured character", async ({ page }) => {
    const example = page.getByTestId("breadcrumb-custom-separator");
    await expect(example.locator(".breadcrumb-separator").first()).toHaveText("›");
  });

  test("collapsible breadcrumb hides middle items", async ({ page }) => {
    const example = page.getByTestId("breadcrumb-collapsible");
    const items = example.locator(".breadcrumb-item");

    // With maxVisibleItems={1}, the first and last items stay visible while
    // at least one middle item is hidden.
    await expect(items.first()).toBeVisible();
    await expect(items.last()).toBeVisible();
    const hidden = await example.locator(".breadcrumb-item-hidden").count();
    expect(hidden).toBeGreaterThan(0);
  });
});
