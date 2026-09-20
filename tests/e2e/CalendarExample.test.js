/**
 * E2E coverage for the standalone Calendar playground example
 * (/docs/examples/calendar). The playground embeds the same interactive
 * demo that lives on the CalendarView docs page, so these tests mirror
 * CalendarView.test.js's playground coverage at the example's URL: seeded
 * sprinkle, custom-event form, live holiday-feed fetch (through the
 * /api/holidays CORS proxy) with drag-locked chips, and the Persian locale
 * (RTL) rendering of the page chrome.
 */
import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

test.describe("calendar example page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/examples/calendar");
    await waitForHydration(page);
  });

  test("renders with seeded sandbox event and view switcher", async ({ page }) => {
    const demo = page.getByTestId("calendar-playground");
    await expect(demo).toBeVisible();
    await expect(demo.getByTestId("calendar-view-event-sb-1")).toBeVisible();
    await expect(demo.getByTestId("view-month")).toBeVisible();
    await expect(demo.getByTestId("view-week")).toBeVisible();
    await expect(demo.getByTestId("view-day")).toBeVisible();
  });

  test("sprinkle adds seeded events to the visible month", async ({ page }) => {
    const demo = page.getByTestId("calendar-playground");
    await demo.getByTestId("playground-sprinkle").click();
    // Seeded RNG: run 1 always produces the same 4 chips (ids sb-1-0..3).
    for (const i of [0, 1, 2, 3]) {
      await expect(demo.getByTestId(`calendar-view-event-sb-1-${i}`)).toBeVisible();
    }
    await demo.getByTestId("playground-sprinkle").click();
    await expect(demo.getByTestId("calendar-view-event-sb-2-0")).toBeVisible();
  });

  test("custom event form adds an event on the chosen day", async ({ page }) => {
    const demo = page.getByTestId("calendar-playground");
    await demo.locator("input[name='title']").fill("Dentist");
    await demo.locator("input[name='date']").fill("2026-09-24");
    await demo.getByTestId("playground-add").click();
    await expect(demo.getByText("Dentist")).toBeVisible();
  });

  test("holiday toggles fetch feeds, render chips, and lock dragging", async ({ page }) => {
    const demo = page.getByTestId("calendar-playground");
    await demo.getByTestId("playground-cal-en.usa").check();
    // Live public feed through /api/holidays: at least one US holiday
    // lands in the Sep 2026 grid.
    await expect
      .poll(async () => demo.locator("[data-testid^='calendar-view-event-']").count(), {
        timeout: 15000,
      })
      .toBeGreaterThan(0);
    // Holiday chips (calendarId-stamped) must be drag-locked.
    const holidayChip = demo
      .locator("[data-testid^='calendar-view-event-']")
      .filter({ hasText: /Day|Eve|Holiday/ })
      .first();
    await expect(holidayChip).toHaveAttribute("draggable", "false", { timeout: 15000 });
    // Sandbox chips stay draggable.
    await expect(demo.getByTestId("calendar-view-event-sb-1")).toHaveAttribute("draggable", "true");
    // Toggle off: holiday chips disappear, sandbox chips remain.
    await demo.getByTestId("playground-cal-en.usa").uncheck();
    await expect(holidayChip).toBeHidden();
    await expect(demo.getByTestId("calendar-view-event-sb-1")).toBeVisible();
  });

  test("renders in the fa locale with RTL chrome", async ({ page }) => {
    await page.goto("/docs/examples/calendar");
    await waitForHydration(page);
    await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
    await waitForHydration(page);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    // The seeded sandbox chip survives the reload the locale switch triggers.
    await expect(page.getByTestId("calendar-view-event-sb-1")).toBeVisible();
  });
});
