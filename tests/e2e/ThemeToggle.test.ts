import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the ThemeToggle component.
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

  test("renders multiple [data-twintrinsic-theme-toggle] rows", async ({
    page,
  }) => {
    const toggles = page.locator("[data-twintrinsic-theme-toggle]");
    expect(await toggles.count()).toBeGreaterThanOrEqual(1);
  });

  test("a single toggle has proper ARIA label + hidden checkbox", async ({
    page,
  }) => {
    const toggle = page.getByTestId("theme-basic");
    const button = toggle.locator(".tw-theme-toggle-button").first();
    await expect(button).toBeVisible();
    const checkbox = toggle.locator("input[type='checkbox']").first();
    await expect(checkbox).toBeAttached();
  });

  test("moon / sun icons are attached and toggle swaps state", async ({
    page,
  }) => {
    const toggle = page.getByTestId("theme-basic");
    const button = toggle.locator(".tw-theme-toggle-button").first();

    // Both icon elements exist in the DOM (visibility depends on CSS state).
    const moonIcon = button.locator(".tw-theme-toggle-icon-moon");
    const sunIcon = button.locator(".tw-theme-toggle-icon-sun");
    await expect(moonIcon).toBeAttached();
    await expect(sunIcon).toBeAttached();

    // Get the checked state before click.
    const checkbox = toggle.locator("input[type='checkbox']").first();
    const checkedBefore = await checkbox.isChecked();

    await button.click();

    // After clicking, the checked state should have toggled.
    const checkedAfter = await checkbox.isChecked();
    expect(checkedAfter).toBe(!checkedBefore);
  });
});
