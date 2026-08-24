import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Tabs component.
 *
 * Targets `/docs/components/Tabs/Tabs` and scopes selectors through the
 * `data-testid` hooks each example block exposes. Verifies the WAI-ARIA
 * tabs pattern: `role="tablist"` / `role="tab"` / `role="tabpanel"`,
 * `aria-selected` state, panel visibility, and keyboard navigation.
 */
test.describe("Tabs docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Tabs/Tabs");
    await waitForHydration(page);
  });

  test("renders the docs page with all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Tabs", level: 1 })).toBeVisible();
    await expect(page.getByTestId("tabs-basic")).toBeVisible();
    await expect(page.getByTestId("tabs-variants")).toBeVisible();
  });

  test("basic tabs expose the tablist/tab/tabpanel roles", async ({ page }) => {
    const example = page.getByTestId("tabs-basic");
    await expect(example.getByRole("tablist")).toBeVisible();
    await expect(example.getByRole("tab")).toHaveCount(3);
    await expect(example.locator('[role="tabpanel"]')).toHaveCount(3);
  });

  test("first tab is selected and its panel is visible by default", async ({ page }) => {
    const example = page.getByTestId("tabs-basic");
    const tabs = example.getByRole("tab");
    const panels = example.locator('[role="tabpanel"]');

    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await expect(panels.nth(0)).toBeVisible();
    await expect(panels.nth(0)).toContainText("Manage your payment method");
    await expect(panels.nth(1)).toBeHidden();
  });

  test("clicking a tab switches the selected tab and panel", async ({ page }) => {
    const example = page.getByTestId("tabs-basic");
    const tabs = example.getByRole("tab");
    const panels = example.locator('[role="tabpanel"]');

    await tabs.nth(2).click();

    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "false");
    await expect(panels.nth(2)).toBeVisible();
    await expect(panels.nth(2)).toContainText("Track API calls");
    await expect(panels.nth(0)).toBeHidden();
  });

  test("ArrowRight moves focus and selection to the next tab", async ({ page }) => {
    const example = page.getByTestId("tabs-basic");
    const tabs = example.getByRole("tab");

    await tabs.nth(0).focus();
    await page.keyboard.press("ArrowRight");

    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(1)).toBeFocused();
  });

  test("ArrowLeft wraps to the last tab", async ({ page }) => {
    const example = page.getByTestId("tabs-basic");
    const tabs = example.getByRole("tab");

    await tabs.nth(0).focus();
    await page.keyboard.press("ArrowLeft");

    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(2)).toBeFocused();
  });

  test("Home and End jump to the first and last tabs", async ({ page }) => {
    const example = page.getByTestId("tabs-basic");
    const tabs = example.getByRole("tab");

    await tabs.nth(1).focus();
    await page.keyboard.press("End");
    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");

    await page.keyboard.press("Home");
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
  });

  test("each variant group renders a tablist", async ({ page }) => {
    const example = page.getByTestId("tabs-variants");
    await expect(example.getByRole("tablist")).toHaveCount(2);
  });
});
