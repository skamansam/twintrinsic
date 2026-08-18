import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the Table component.
 *
 * Targets `/docs/components/Table/Table`. Each demo exposes a `data-testid`
 * wrapper (`table-basic`, `table-striped`, ...) around a semantic `<table>`.
 */
test.describe("Table docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Table/Table");
    await waitForHydration(page);
  });

  test("renders the docs page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Table", level: 1 })).toBeVisible();
  });

  test("basic table renders headers and rows", async ({ page }) => {
    const demo = page.getByTestId("table-basic");
    const table = demo.locator("table");
    await expect(table).toBeVisible();
    for (const header of ["Name", "Email", "Role"]) {
      await expect(table.getByRole("columnheader", { name: header })).toBeVisible();
    }
    await expect(table.getByText("Sarah Chen", { exact: true })).toBeVisible();
    await expect(table.getByText("priya.patel@acme.io", { exact: true })).toBeVisible();
  });

  test("striped table renders its content", async ({ page }) => {
    const demo = page.getByTestId("table-striped");
    await expect(demo.locator("table")).toBeVisible();
    await expect(demo.getByText("Laptop", { exact: true })).toBeVisible();
    await expect(demo.getByText("$999", { exact: true })).toBeVisible();
  });

  test("bordered table renders its content", async ({ page }) => {
    const demo = page.getByTestId("table-bordered");
    await expect(demo.locator("table")).toBeVisible();
    await expect(demo.getByText("Responsive", { exact: true })).toBeVisible();
    await expect(demo.getByText("Semantic HTML with ARIA support", { exact: true })).toBeVisible();
  });

  test("hoverable table renders its content", async ({ page }) => {
    const demo = page.getByTestId("table-hoverable");
    await expect(demo.getByText("Migrate billing API", { exact: true })).toBeVisible();
    await expect(demo.getByText("In Progress", { exact: true })).toBeVisible();
  });

  test("compact table renders its content", async ({ page }) => {
    const demo = page.getByTestId("table-compact");
    await expect(demo.getByText("Enterprise", { exact: true })).toBeVisible();
    await expect(demo.getByText("Inactive", { exact: true })).toBeVisible();
  });
});
