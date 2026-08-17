import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the EventsTable utility component.
 *
 * Targets `/docs/components/EventsTable/EventsTable`. Both the auto-derived
 * (component module) and explicit-data examples render a semantic table of
 * events (Svelte 5 callback props).
 */
test.describe("EventsTable docs page", () => {
  test("auto-derived events render from a component module", async ({ page }) => {
    await page.goto("/docs/components/EventsTable/EventsTable");
    await waitForHydration(page);

    const example = page.getByTestId("eventstable-auto");
    const table = example.getByRole("table");
    await expect(table).toBeVisible();
    await expect(table.locator("thead th")).toContainText(["Event", "Type", "Description"]);
    // Only events that dispatch a CustomEvent are listed — Input dispatches oninput.
    await expect(table.getByText("oninput", { exact: true })).toBeVisible();
    await expect(table.getByText("{ value: string }", { exact: true })).toBeVisible();
  });

  test("explicit data hash renders the provided events", async ({ page }) => {
    await page.goto("/docs/components/EventsTable/EventsTable");
    await waitForHydration(page);

    const example = page.getByTestId("eventstable-explicit");
    const table = example.getByRole("table");
    await expect(table).toBeVisible();
    await expect(table.getByText("onchange", { exact: true })).toBeVisible();
    await expect(table.getByText("{ value: string }", { exact: true })).toBeVisible();
    await expect(table.getByText("Fired when the value changes", { exact: true })).toBeVisible();
  });
});
