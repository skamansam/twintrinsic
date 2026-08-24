import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke tests for the AutoComplete component.
 *
 * Component-level behavior (keyboard navigation, loading/empty states,
 * force-selection, custom filters) is covered by the Storybook vitest
 * suite (`pnpm test:storybook`).
 *
 * These tests verify the docs landing page renders the live examples
 * (`data-testid="autocomplete-*"` hooks) and that basic typing →
 * suggestions → selection still works on the page.
 */
test.describe("AutoComplete docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/AutoComplete");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "AutoComplete", level: 1 })).toBeVisible();
    await expect(page.getByTestId("autocomplete-basic")).toBeVisible();
    await expect(page.getByTestId("autocomplete-multiple")).toBeVisible();
  });

  test("shows suggestions while typing and selects with Enter", async ({ page }) => {
    const example = page.getByTestId("autocomplete-basic");
    const input = example.locator(".autocomplete input");

    await input.fill("uni");
    const suggestions = example.locator(".autocomplete-suggestions");
    await expect(suggestions).toBeVisible();

    const items = suggestions.locator(".autocomplete-item");
    await expect(items).toHaveCount(2);
    await expect(items.first()).toContainText("United");

    await input.press("ArrowDown");
    await input.press("Enter");
    await expect(suggestions).not.toBeVisible();
    await expect(input).toHaveValue("United States");
  });

  test("shows empty results message for unmatched input", async ({ page }) => {
    const example = page.getByTestId("autocomplete-basic");
    const input = example.locator(".autocomplete input");

    await input.fill("xyz");
    const message = example.locator(".autocomplete-message");
    await expect(message).toBeVisible();
    await expect(message).toHaveText("No results found");
  });

  test("multiple selection renders removable chips", async ({ page }) => {
    const example = page.getByTestId("autocomplete-multiple");
    const input = example.locator(".autocomplete input");

    await input.fill("united");
    await example.locator(".autocomplete-item").first().click();

    const chips = example.locator(".autocomplete-chip");
    await expect(chips).toHaveCount(1);
    await expect(chips.first()).toContainText("United");

    await chips.first().locator("button").click();
    await expect(example.locator(".autocomplete-chip")).toHaveCount(0);
  });

  test.skip("custom template example renders avatars", async ({ page }) => {
    // Skipped: custom template placeholder has no live demo yet
  });
});
