import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site interaction + accessibility tests for the DataTable component.
 *
 * Targets `/docs/components/DataTable/DataTable`. Each demo exposes a
 * `data-testid` wrapper (`datatable-basic`, `datatable-sortable`, ...) around
 * a semantic `<table>`. Verifies rendering, sorting, pagination, filtering,
 * loading, and empty states.
 */
test.describe("DataTable docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/DataTable/DataTable");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "DataTable", level: 1 })).toBeVisible();
  });

  test("basic table renders all five users", async ({ page }) => {
    const demo = page.getByTestId("datatable-basic");
    await expect(demo.locator("table")).toBeVisible();
    for (const name of [
      "Sarah Chen",
      "Marcus Webb",
      "Priya Patel",
      "Diego Ramírez",
      "Emma Lindqvist",
    ]) {
      await expect(demo.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test("sortable headers announce sort state via aria-sort", async ({ page }) => {
    const demo = page.getByTestId("datatable-sortable");
    const nameHeader = demo.getByRole("columnheader", { name: "Name" });
    await nameHeader.click();
    await expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
    await nameHeader.click();
    await expect(nameHeader).toHaveAttribute("aria-sort", "descending");
  });

  test("filter input narrows the rows", async ({ page }) => {
    const demo = page.getByTestId("datatable-sortable");
    const filter = demo.getByLabel("Filter by Name");
    // The filter input listens to `change`, which fires on Enter/blur.
    await filter.fill("Marcus");
    await filter.press("Enter");
    await expect(demo.getByText("Marcus Webb", { exact: true })).toBeVisible();
    await expect(demo.getByText("Sarah Chen", { exact: true })).toHaveCount(0);
  });

  test("pagination shows page controls and advances pages", async ({ page }) => {
    const demo = page.getByTestId("datatable-pagination");
    await expect(demo.getByText("Showing 1 to 2 of 5 entries")).toBeVisible();
    await demo.getByRole("button", { name: "Next page" }).click();
    await expect(demo.getByText("Showing 3 to 4 of 5 entries")).toBeVisible();
    await demo.getByRole("button", { name: "Previous page" }).click();
    await expect(demo.getByText("Showing 1 to 2 of 5 entries")).toBeVisible();
  });

  test("selectable rows expose row checkboxes", async ({ page }) => {
    const demo = page.getByTestId("datatable-selectable");
    await expect(demo.getByRole("checkbox", { name: "Select all rows" })).toBeVisible();
    await expect(demo.getByRole("checkbox", { name: "Select row 1" })).toBeVisible();
    await demo.getByRole("checkbox", { name: "Select row 1" }).check();
    await expect(demo.getByRole("checkbox", { name: "Select row 1" })).toBeChecked();
  });

  test("loading state shows the loading indicator", async ({ page }) => {
    const demo = page.getByTestId("datatable-loading");
    await expect(demo.getByText("Loading...")).toBeVisible();
  });

  test("empty state shows the empty message", async ({ page }) => {
    const demo = page.getByTestId("datatable-empty");
    await expect(demo.getByText("No users found")).toBeVisible();
  });

  test("custom templates format cell content", async ({ page }) => {
    const demo = page.getByTestId("datatable-templates");
    // The price template prefixes with "$" (toFixed, no thousands separator)
    // and the stock template appends " units".
    await expect(demo.getByText("$1299.99", { exact: true })).toBeVisible();
    await expect(demo.getByText("120 units", { exact: true })).toBeVisible();
  });
});
