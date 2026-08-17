import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the Metrics family.
 *
 * Targets the dashboard examples page (`/docs/components/Metrics/examples`)
 * and a representative chart page (LineChart) to verify the metric
 * components render their data-driven content.
 */
test.describe("Metrics docs", () => {
  test("examples dashboard renders metric cards and charts", async ({ page }) => {
    await page.goto("/docs/components/Metrics/examples");
    await waitForHydration(page);

    await expect(page.getByRole("heading", { name: "Dashboard Examples", level: 1 })).toBeVisible();

    // Key metrics section: stat cards with labels/values.
    await expect(page.getByText("Total Revenue", { exact: true })).toBeVisible();
    await expect(page.getByText("$124,532.89", { exact: true })).toBeVisible();
    await expect(page.getByText("Total Orders", { exact: true })).toBeVisible();

    // KPI progress cards.
    await expect(page.getByText("Q4 Sales Target", { exact: true })).toBeVisible();

    // Charts render SVG elements with their titles.
    await expect(page.getByText("Monthly Sales by Product", { exact: true })).toBeVisible();
    await expect(page.getByText("Traffic by Device Type (Stacked)", { exact: true })).toBeVisible();
    // The donut chart title renders inside its aria-labelledby SVG.
    await expect(
      page.getByLabel("Donut chart visualization").getByRole("heading", {
        name: "Conversion Sources",
      }),
    ).toBeVisible();

    // Gauges and progress metrics.
    await expect(page.getByText("Performance Score", { exact: true })).toBeVisible();
    await expect(page.getByText("CPU Usage", { exact: true })).toBeVisible();
    await expect(page.getByText("Memory Usage", { exact: true })).toBeVisible();
  });

  test("LineChart docs page renders a chart with its legend", async ({ page }) => {
    await page.goto("/docs/components/Metrics/LineChart");
    await waitForHydration(page);

    await expect(page.getByRole("heading", { name: "LineChart", level: 1 })).toBeVisible();
    // Single-series chart title.
    await expect(page.getByText("Weekly Sales", { exact: true })).toBeVisible();
    // Legend labels from the series.
    await expect(page.getByText("Product A", { exact: true })).toBeVisible();
    await expect(page.getByText("Product B", { exact: true })).toBeVisible();
  });
});
