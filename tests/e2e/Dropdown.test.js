import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the Dropdown component.
 *
 * Targets `/docs/components/Form/Dropdown`. Dropdown is a thin wrapper around
 * Select (itself a native `<select>`), so these tests verify the native select
 * controls render and work, including option selection and the disabled state.
 */
test.describe("Dropdown docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Dropdown");
    await waitForHydration(page);
  });

  test("renders the docs page with native select controls", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Dropdown", level: 1 })).toBeVisible();
    // Each example renders a native <select>.
    await expect(page.locator("select")).toHaveCount(11);
  });

  test("basic dropdown shows placeholder and options", async ({ page }) => {
    const select = page.locator("select").first();
    await expect(select.locator("option").first()).toHaveText("Select a city");
    for (const city of ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]) {
      await expect(select.locator("option", { hasText: city })).toHaveCount(1);
    }
  });

  test("selecting an option updates the value", async ({ page }) => {
    const select = page.locator("select").first();
    await select.selectOption("Chicago");
    await expect(select).toHaveValue("Chicago");
  });

  test("disabled dropdown is not interactive", async ({ page }) => {
    await expect(page.locator("select:disabled")).toBeDisabled();
  });
});
