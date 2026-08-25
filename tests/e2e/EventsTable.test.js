import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Comprehensive docs-site tests for the EventsTable utility component.
 *
 * Targets `/docs/components/EventsTable/EventsTable`. EventsTable renders
 * auto-derived events/callback tables for component documentation.
 */
test.describe("EventsTable docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/EventsTable/EventsTable");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "EventsTable", level: 1 })).toBeVisible();
  });

  test("auto-derived demo renders events with known callbacks", async ({ page }) => {
    const auto = page.getByTestId("eventstable-auto");
    await expect(auto).toBeVisible();
    // Input's oninput callback should be listed
    await expect(auto.locator("code", { hasText: "oninput" })).toBeVisible();
  });

  test("events table has correct column structure", async ({ page }) => {
    const table = page.locator(".events-table, table").first();
    await expect(table).toBeVisible();
    const headerRow = table.locator("thead tr, tr").first();
    const headers = await headerRow.locator("th, td").allTextContents();
    const headerText = headers.join(" ").toLowerCase();
    expect(headerText).toMatch(/event|callback|name/);
  });

  test("events table lists event types", async ({ page }) => {
    const auto = page.getByTestId("eventstable-auto");
    await expect(auto).toBeVisible();
    // Should list event callback names
    const codeElements = auto.locator("code");
    const count = await codeElements.count();
    expect(count).toBeGreaterThan(0);
  });

  test("events table entries describe event details", async ({ page }) => {
    const table = page.locator(".events-table, table").first();
    await expect(table).toBeVisible();
    // The table should have at least one row
    const rows = table.locator("tbody tr, tr").filter({ has: page.locator("td") });
    expect(await rows.count()).toBeGreaterThan(0);
  });
});
