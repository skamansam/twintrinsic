import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the LocaleSwitcher docs page. The examples are
 * presentational (switching a locale triggers a full page reload, which is
 * covered by the DirToggle suite), so these assert rendering, native
 * labels, active state, and the select variant.
 */
test.describe("LocaleSwitcher docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/LocaleSwitcher/LocaleSwitcher");
    await waitForHydration(page);
  });

  test("renders the buttons example with self-named locales", async ({ page }) => {
    const example = page.getByTestId("locale-switcher-buttons");
    await expect(example.getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(example.getByRole("button", { name: "Español" })).toBeVisible();
    await expect(example.getByRole("button", { name: "فارسی" })).toBeVisible();
  });

  test("renders the select variant with all locales", async ({ page }) => {
    const select = page.getByTestId("locale-switcher-select").getByRole("combobox");
    await expect(select).toHaveValue("en");
    const options = select.locator("option");
    await expect(options).toHaveCount(3);
    await expect(select.locator("option").nth(1)).toHaveText("Español");
  });

  test("respects a custom locales list", async ({ page }) => {
    const example = page.getByTestId("locale-switcher-custom");
    await expect(example.getByRole("button", { name: "English" })).toBeVisible();
    await expect(example.getByRole("button", { name: "فارسی" })).toBeVisible();
    await expect(example.getByRole("button", { name: "Español" })).toHaveCount(0);
  });

  test("applies the custom accessible label", async ({ page }) => {
    const group = page
      .getByTestId("locale-switcher-label")
      .getByRole("group", { name: "Pick a language" });
    await expect(group).toBeVisible();
  });

  test("renders the Props and Events tables", async ({ page }) => {
    await expect(page.locator("h2", { hasText: "Props" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "Events" })).toBeVisible();
    // PropsTable renders the documented props
    await expect(page.getByRole("cell", { name: "locales" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "variant" })).toBeVisible();
    // EventsTable renders the change event
    await expect(page.locator(".event-name").first()).toContainText("onchange");
  });
});
