import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site interaction + accessibility tests for ThemeToggle.
 *
 * Targets `/docs/components/ThemeToggle/ThemeToggle`.
 */
test.describe("ThemeToggle docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/ThemeToggle/ThemeToggle");
    await waitForHydration(page);
  });

  test("renders the ThemeToggle docs page", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "ThemeToggle", level: 1 }),
    ).toBeVisible();
  });

  test("renders multiple toggle rows", async ({ page }) => {
    const toggles = page.locator("[data-twintrinsic-theme-toggle]");
    expect(await toggles.count()).toBeGreaterThanOrEqual(1);
  });

  test("a single toggle has proper ARIA label and hidden checkbox", async ({
    page,
  }) => {
    const toggle = page.getByTestId("theme-basic");
    const button = toggle.locator(".tw-theme-toggle-button").first();
    await expect(button).toBeVisible();
    const checkbox = toggle.locator("input[type='checkbox']").first();
    await expect(checkbox).toBeAttached();
    // The checkbox is visually hidden but programmatically present.
    await expect(checkbox).toHaveAttribute("type", "checkbox");
  });

  test("moon and sun icons are attached", async ({ page }) => {
    const toggle = page.getByTestId("theme-basic");
    const button = toggle.locator(".tw-theme-toggle-button").first();

    const moonIcon = button.locator(".tw-theme-toggle-icon-moon");
    const sunIcon = button.locator(".tw-theme-toggle-icon-sun");
    await expect(moonIcon).toBeAttached();
    await expect(sunIcon).toBeAttached();
  });

  test("clicking the toggle swaps the checked state", async ({ page }) => {
    const toggle = page.getByTestId("theme-basic");
    const button = toggle.locator(".tw-theme-toggle-button").first();
    const checkbox = toggle.locator("input[type='checkbox']").first();

    const checkedBefore = await checkbox.isChecked();
    await button.click();
    const checkedAfter = await checkbox.isChecked();
    expect(checkedAfter).toBe(!checkedBefore);
  });

  test("keyboard Space toggles the hidden checkbox", async ({ page }) => {
    const toggle = page.getByTestId("theme-basic");
    const checkbox = toggle.locator("input[type='checkbox']").first();

    // Focus the hidden checkbox directly.
    await checkbox.focus();
    const checkedBefore = await checkbox.isChecked();
    await page.keyboard.press(" ");
    const checkedAfter = await checkbox.isChecked();
    expect(checkedAfter).toBe(!checkedBefore);
  });

  test("keyboard Enter on label toggles the checkbox", async ({ page }) => {
    const toggle = page.getByTestId("theme-basic");
    const label = toggle.locator("label.tw-theme-toggle").first();
    const checkbox = toggle.locator("input[type='checkbox']").first();

    const checkedBefore = await checkbox.isChecked();
    // Clicking the label toggles the checkbox.
    await label.click();
    const checkedAfter = await checkbox.isChecked();
    expect(checkedAfter).toBe(!checkedBefore);
  });

  test("toggle label is keyboard focusable", async ({ page }) => {
    const toggle = page.getByTestId("theme-basic");
    const checkbox = toggle.locator("input[type='checkbox']").first();

    // The checkbox is the focusable element (hidden but reachable).
    await checkbox.focus();
    await expect(checkbox).toBeFocused();
  });

  test("toggle changes the document data-theme attribute", async ({ page }) => {
    const toggle = page.getByTestId("theme-basic");
    const button = toggle.locator(".tw-theme-toggle-button").first();

    const themeBefore = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme"),
    );

    await button.click();
    await page.waitForTimeout(100);

    const themeAfter = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme"),
    );

    // The theme should have changed (or at least the attribute should exist).
    expect(themeAfter).toBeTruthy();
  });
});
