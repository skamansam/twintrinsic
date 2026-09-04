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

  test("collapsible breadcrumb hides middle items behind an ellipsis", async ({ page }) => {
    const example = page.getByTestId("breadcrumb-collapsible");
    const items = example.locator(".breadcrumb-item");

    // With 5 items and maxVisibleItems={1}, the first and last items stay
    // visible while the middle entries are omitted from the DOM and replaced
    // by an ellipsis control (no .breadcrumb-item-hidden nodes are rendered
    // in the items-array form — hidden items are simply not output).
    await expect(items.first()).toContainText("Home");
    await expect(items.last()).toContainText("Breadcrumb");

    await expect(
      example.getByRole("button", { name: "Show hidden breadcrumb items" }),
    ).toBeVisible();

    // "Components" and "Navigation" are the collapsed middle items.
    await expect(items.filter({ hasText: "Components" })).toHaveCount(0);
    await expect(items.filter({ hasText: "Navigation" })).toHaveCount(0);
    await expect(items).toHaveCount(4); // Home · ellipsis · Docs · Breadcrumb
  });
});
