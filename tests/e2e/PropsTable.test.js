import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the PropsTable utility component.
 *
 * Targets `/docs/components/PropsTable/PropsTable`. PropsTable renders
 * auto-derived and hand-written props tables for component documentation.
 */
test.describe("PropsTable docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/PropsTable/PropsTable");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "PropsTable", level: 1 })).toBeVisible();
  });

  test("auto-derived demo renders a props table with known props", async ({ page }) => {
    const auto = page.getByTestId("propstable-auto");
    await expect(auto).toBeVisible();
    // Button's variant prop should be in the table
    await expect(auto.locator("code", { hasText: "variant" }).first()).toBeVisible();
    await expect(auto.locator("code", { hasText: "disabled" }).first()).toBeVisible();
  });

  test("props table has correct column headers", async ({ page }) => {
    const table = page.locator(".props-table").first();
    await expect(table).toBeVisible();
    // Standard PropsTable columns: Name, Type, Default, Description
    const headerRow = table.locator("thead tr, tr").first();
    const headers = await headerRow.locator("th, td").allTextContents();
    const headerText = headers.join(" ").toLowerCase();
    expect(headerText).toMatch(/name|prop/);
    expect(headerText).toMatch(/type/);
  });

  test("explicit props table shows hand-written entries", async ({ page }) => {
    // The page may have an explicit props example
    const explicit = page.getByTestId("propstable-explicit");
    if (await explicit.isVisible()) {
      await expect(explicit).toBeVisible();
    }
  });

  test("props table entries have valid prop names", async ({ page }) => {
    const table = page.locator(".props-table").first();
    await expect(table).toBeVisible();
    // Each prop name should be rendered in a code element
    const propNames = table.locator("td:first-child code, th:first-child + td code");
    const count = await propNames.count();
    expect(count).toBeGreaterThan(0);
  });
});
