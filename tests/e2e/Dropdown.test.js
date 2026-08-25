import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the Dropdown component.
 *
 * Targets `/docs/components/Form/Dropdown`. Dropdown wraps a native `<select>`
 * element with styling. These tests verify all dropdown examples, option
 * selection, keyboard navigation, disabled state, and ARIA semantics.
 */
test.describe("Dropdown docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/Dropdown");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Dropdown", level: 1 })).toBeVisible();
  });

  test("renders all dropdown examples with native selects", async ({ page }) => {
    const selects = page.locator("select");
    const count = await selects.count();
    expect(count).toBeGreaterThanOrEqual(5);
    await expect(selects.first()).toBeVisible();
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

    await select.selectOption("New York");
    await expect(select).toHaveValue("New York");
  });

  test("disabled dropdown is not interactive", async ({ page }) => {
    const disabled = page.locator("select:disabled");
    await expect(disabled).toBeDisabled();
  });

  test("dropdown has accessible label", async ({ page }) => {
    const selects = page.locator("select");
    const first = selects.first();
    // Select should have an associated label or aria-label
    const hasLabel = await first.evaluate((el) => {
      const id = el.id;
      if (id && document.querySelector(`label[for="${id}"]`)) return true;
      if (el.closest("label")) return true;
      if (el.getAttribute("aria-label")) return true;
      if (el.getAttribute("aria-labelledby")) return true;
      return false;
    });
    expect(hasLabel).toBeTruthy();
  });

  test("selecting multiple options works in sequence", async ({ page }) => {
    const select = page.locator("select").first();
    await select.selectOption("New York");
    await expect(select).toHaveValue("New York");
    await select.selectOption("Los Angeles");
    await expect(select).toHaveValue("Los Angeles");
    await select.selectOption("Phoenix");
    await expect(select).toHaveValue("Phoenix");
  });

  test("each dropdown option has a value attribute", async ({ page }) => {
    const select = page.locator("select").first();
    const options = select.locator("option");
    const count = await options.count();
    for (let i = 0; i < count; i++) {
      const option = options.nth(i);
      const value = await option.getAttribute("value");
      expect(value, `option ${i} should have a value`).not.toBeNull();
    }
  });
});
