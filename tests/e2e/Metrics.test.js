import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the Metrics family.
 *
 * Covers the dashboard examples page, the LineChart page, and every
 * individual chart/KPI sub-page. Each example wrapper on the chart pages
 * exposes a `data-testid` (metrics-{slug}); chart titles render as `<h3>`
 * headings inside those wrappers.
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

  test("AreaChart page renders single and stacked charts", async ({ page }) => {
    await page.goto("/docs/components/Metrics/AreaChart");
    await waitForHydration(page);

    const single = page.getByTestId("metrics-single-series-areachart");
    await expect(single.getByRole("heading", { name: "Website Traffic" })).toBeVisible();
    await expect(single.locator("svg")).toBeVisible();

    const stacked = page.getByTestId("metrics-stacked-areachart");
    await expect(
      stacked.getByRole("heading", { name: "Traffic by Device (Stacked)" }),
    ).toBeVisible();
    // Legend labels from the series.
    await expect(stacked.getByText("Desktop", { exact: true })).toBeVisible();
    await expect(stacked.getByText("Mobile", { exact: true })).toBeVisible();
  });

  test("BarChart page renders single and multi-series charts", async ({ page }) => {
    await page.goto("/docs/components/Metrics/BarChart");
    await waitForHydration(page);

    const single = page.getByTestId("metrics-single-series-barchart");
    await expect(single.getByRole("heading", { name: "Monthly Revenue" })).toBeVisible();
    await expect(single.locator("svg")).toBeVisible();

    const multi = page.getByTestId("metrics-multiple-series-barchart");
    await expect(multi.getByRole("heading", { name: "Quarterly Comparison" })).toBeVisible();
    await expect(multi.getByText("Q1", { exact: true })).toBeVisible();
    await expect(multi.getByText("Q2", { exact: true })).toBeVisible();
  });

  test("DonutChart page renders basic, titled, and custom-color charts", async ({ page }) => {
    await page.goto("/docs/components/Metrics/DonutChart");
    await waitForHydration(page);

    await expect(page.getByTestId("metrics-basic-donutchart").locator("svg")).toBeVisible();
    await expect(
      page
        .getByTestId("metrics-with-title-and-legend")
        .getByRole("heading", { name: "Market Share" }),
    ).toBeVisible();
    await expect(
      page.getByTestId("metrics-custom-colors").getByRole("heading", { name: "Custom Colors" }),
    ).toBeVisible();
    // Segment labels render in the legend with their percentages.
    await expect(
      page
        .getByTestId("metrics-with-title-and-legend")
        .getByText("Product A (30.0%)", { exact: true }),
    ).toBeVisible();
  });

  test("GaugeChart page renders gauges with their labels", async ({ page }) => {
    await page.goto("/docs/components/Metrics/GaugeChart");
    await waitForHydration(page);

    await expect(
      page
        .getByTestId("metrics-basic-gaugechart")
        .getByRole("heading", { name: "Performance Score" }),
    ).toBeVisible();
    await expect(
      page
        .getByTestId("metrics-with-tic-marks")
        .getByRole("heading", { name: "Customer Satisfaction" }),
    ).toBeVisible();
    await expect(
      page.getByTestId("metrics-with-color-zones").getByRole("heading", {
        name: "Walmart's Customer Satisfaction Score",
      }),
    ).toBeVisible();
    await expect(
      page.getByTestId("metrics-full-circle-gauge").getByRole("heading", { name: "System Health" }),
    ).toBeVisible();
  });

  test("HorizontalBarChart page renders browser usage chart", async ({ page }) => {
    await page.goto("/docs/components/Metrics/HorizontalBarChart");
    await waitForHydration(page);

    const example = page.getByTestId("metrics-basic-horizontalbarchart");
    await expect(example.getByRole("heading", { name: "Browser Usage" })).toBeVisible();
    for (const browser of ["Chrome", "Firefox", "Safari", "Edge", "Other"]) {
      await expect(example.getByText(browser, { exact: true })).toBeVisible();
    }
  });

  test("KPICard page renders the KPI card", async ({ page }) => {
    await page.goto("/docs/components/Metrics/KPICard");
    await waitForHydration(page);

    const example = page.getByTestId("metrics-basic-kpicard");
    await expect(example.getByText("Q4 Sales Target", { exact: true })).toBeVisible();
    await expect(example.getByText("95000", { exact: true })).toBeVisible();
    // The target renders inside a "Target: …" line.
    await expect(example.getByText(/Target: 100000/)).toBeVisible();
  });

  test("MetricGrid page renders a grid of stat cards", async ({ page }) => {
    await page.goto("/docs/components/Metrics/MetricGrid");
    await waitForHydration(page);

    const example = page.getByTestId("metrics-basic-metricgrid");
    for (const [label, value] of [
      ["Total Revenue", "$45,231.89"],
      ["Total Users", "2,543"],
      ["Conversion Rate", "4.8%"],
      ["Active Sessions", "542"],
    ]) {
      await expect(example.getByText(label, { exact: true })).toBeVisible();
      await expect(example.getByText(value, { exact: true })).toBeVisible();
    }
  });

  test("MetricTrend page renders a sparkline", async ({ page }) => {
    await page.goto("/docs/components/Metrics/MetricTrend");
    await waitForHydration(page);

    const example = page.getByTestId("metrics-basic-metrictrend");
    await expect(example.getByText("Sales Trend", { exact: true })).toBeVisible();
    await expect(example.locator("svg")).toBeVisible();
  });

  test("PieChart page renders basic and titled charts", async ({ page }) => {
    await page.goto("/docs/components/Metrics/PieChart");
    await waitForHydration(page);

    await expect(page.getByTestId("metrics-basic-piechart").locator("svg")).toBeVisible();
    const titled = page.getByTestId("metrics-with-title-and-legend");
    await expect(titled.getByRole("heading", { name: "Browser Market Share" })).toBeVisible();
    // Legend labels render with their percentages.
    await expect(titled.getByText("Chrome (35.0%)", { exact: true })).toBeVisible();
    await expect(titled.getByText("Firefox (25.0%)", { exact: true })).toBeVisible();
  });

  test("ProgressMetric page renders labeled progress bars", async ({ page }) => {
    await page.goto("/docs/components/Metrics/ProgressMetric");
    await waitForHydration(page);

    const example = page.getByTestId("metrics-basic-progressmetric");
    await expect(example.getByText("CPU Usage", { exact: true })).toBeVisible();
    await expect(example.locator("[role='progressbar']")).toBeVisible();
  });

  test("StatsCard page renders cards with and without trend", async ({ page }) => {
    await page.goto("/docs/components/Metrics/StatsCard");
    await waitForHydration(page);

    const basic = page.getByTestId("metrics-basic-statscard");
    await expect(basic.getByText("Total Revenue", { exact: true })).toBeVisible();
    await expect(basic.getByText("$124,532.89", { exact: true })).toBeVisible();

    const trend = page.getByTestId("metrics-with-trend-indicator");
    await expect(trend.getByText("Total Users", { exact: true })).toBeVisible();
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
