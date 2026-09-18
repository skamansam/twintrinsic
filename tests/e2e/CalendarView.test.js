import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site tests for the CalendarView component (plan item 11.1).
 *
 * CalendarView renders a full month grid on the native Temporal API with
 * APG grid semantics. The docs demos are pinned to September 2026 so the
 * assertions are stable regardless of when they run.
 */
test.describe("CalendarView docs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/CalendarView");
    await waitForHydration(page);
  });

  test("renders the docs page with the h1 and all live examples", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "CalendarView", level: 1 })).toBeVisible();
    for (const demo of ["calendarview-basic", "calendarview-fixed", "calendarview-selected", "calendarview-weekstart", "calendarview-keyboard"]) {
      await expect(page.getByTestId(demo)).toBeVisible();
    }
  });

  test("fixed-month demo shows the September 2026 grid", async ({ page }) => {
    const demo = page.getByTestId("calendarview-fixed");
    // Role query: the sr-only live region also contains the month title.
    await expect(demo.getByRole("heading", { name: "September 2026" })).toBeVisible();
    // 42 gridcells: the fixed 6×7 grid.
    await expect(demo.getByRole("grid").locator('[role="gridcell"]')).toHaveCount(42);
  });

  test("grid is named by its month title and has 7 weekday headers", async ({ page }) => {
    const grid = page.getByTestId("calendarview-fixed").getByRole("grid");
    const headers = grid.getByRole("columnheader");
    await expect(headers).toHaveCount(7);
    const labelledBy = await grid.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    await expect(page.locator(`#${labelledBy}`)).toHaveText("September 2026");
  });

  test("today is marked with aria-current=date exactly once", async ({ page }) => {
    const grid = page.getByTestId("calendarview-fixed").getByRole("grid");
    await expect(grid.locator('[aria-current="date"]')).toHaveCount(1);
  });

  test("selected demo marks September 21 via aria-selected on its gridcell", async ({ page }) => {
    const grid = page.getByTestId("calendarview-selected").getByRole("grid");
    const cell = grid.locator('[data-testid="calendar-view-day-2026-09-21"]').locator("xpath=..");
    await expect(cell).toHaveAttribute("aria-selected", "true");
    await expect(grid.locator('[aria-selected="true"]')).toHaveCount(1);
  });

  test("weekStart=0 demo starts the header row on Sunday", async ({ page }) => {
    const grid = page.getByTestId("calendarview-weekstart").getByRole("grid");
    await expect(grid.getByRole("columnheader").first()).toHaveText("Sun");
  });

  test("clicking a day selects it and moves aria-selected", async ({ page }) => {
    const grid = page.getByTestId("calendarview-fixed").getByRole("grid");
    const day = grid.locator('[data-testid="calendar-view-day-2026-09-15"]');
    await day.click();
    await expect(day.locator("xpath=..")).toHaveAttribute("aria-selected", "true");
  });

  test("next-month button pages the grid to October and back", async ({ page }) => {
    const demo = page.getByTestId("calendarview-fixed");
    await demo.getByTestId("calendar-view-next").click();
    await expect(demo.getByRole("heading", { name: "October 2026" })).toBeVisible();
    await demo.getByTestId("calendar-view-prev").click();
    await expect(demo.getByRole("heading", { name: "September 2026" })).toBeVisible();
  });

  test("keyboard navigation moves the single tabbable cell and selects with Enter", async ({ page }) => {
    const demo = page.getByTestId("calendarview-fixed");
    const grid = demo.getByRole("grid");
    await grid.locator('[role="gridcell"] [tabindex="0"]').focus();

    await page.keyboard.press("ArrowRight");
    await expect(grid.locator('[role="gridcell"] [tabindex="0"]')).toHaveText("2");
    await page.keyboard.press("ArrowDown");
    await expect(grid.locator('[role="gridcell"] [tabindex="0"]')).toHaveText("9");
    await page.keyboard.press("Home");
    await expect(grid.locator('[role="gridcell"] [tabindex="0"]')).toHaveText("7");
    await page.keyboard.press("End");
    await expect(grid.locator('[role="gridcell"] [tabindex="0"]')).toHaveText("13");

    await page.keyboard.press("Enter");
    await expect(grid.locator('[aria-selected="true"]')).toHaveCount(1);
  });

  test("PageDown pages months from the keyboard with focus retained", async ({ page }) => {
    const demo = page.getByTestId("calendarview-fixed");
    const grid = demo.getByRole("grid");
    await grid.locator('[role="gridcell"] [tabindex="0"]').focus();
    await page.keyboard.press("PageDown");
    await expect(demo.getByRole("heading", { name: "October 2026" })).toBeVisible();
    // Focus must be back inside the grid after the async re-render.
    await expect(grid.locator('[role="gridcell"] [tabindex="0"]')).toBeVisible();
  });

  test("browser support section names Temporal and the polyfill", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Browser support" })).toBeVisible();
    const section = page.locator("article");
    await expect(section.getByText("@js-temporal/polyfill").first()).toBeVisible();
  });
});
