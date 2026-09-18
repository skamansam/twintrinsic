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
    for (const demo of [
      "calendarview-basic",
      "calendarview-fixed",
      "calendarview-selected",
      "calendarview-weekstart",
      "calendarview-keyboard",
    ]) {
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
    // CSS.escape: crypto.randomUUID() ids can start with a digit, which a
    // bare `#...` selector rejects.
    await expect(page.locator(`[id="${labelledBy}"]`)).toHaveText("September 2026");
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

  test("keyboard navigation moves the single tabbable cell and selects with Enter", async ({
    page,
  }) => {
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
    // Scope to visible <code> elements: the title-row badge tooltip also
    // mentions the polyfill package but stays hidden until hover.
    const polyfillCode = page
      .locator("article")
      .locator("code:visible")
      .filter({ hasText: "@js-temporal/polyfill" })
      .first();
    await expect(polyfillCode).toBeVisible();
    await expect(
      page.locator("article").locator("code:visible").filter({ hasText: "Temporal" }).first(),
    ).toBeVisible();
  });
});

test.describe("CalendarView milestone close-out", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/CalendarView");
    await waitForHydration(page);
  });

  test("grouping toggle merges and unmerges shared events live", async ({ page }) => {
    const demo = page.getByTestId("calendarview-grouping");
    // Off: every calendar's copy of the standup renders separately.
    await expect(demo.getByTestId("calendar-view-event-work-standup")).toBeVisible();
    await expect(demo.getByTestId("calendar-view-event-personal-standup")).toBeVisible();
    await demo.getByRole("checkbox").check();
    // On: one merged chip with the source-count badge; the second copy is
    // gone. The merged chip keeps the primary's id — the id tiebreak sorts
    // "personal-standup" first.
    await expect(demo.getByTestId("calendar-view-event-work-standup")).toHaveCount(0);
    await expect(demo.getByTestId("calendar-view-group-count-personal-standup")).toHaveText("2");
    // Unshared events are never merged.
    await expect(demo.getByTestId("calendar-view-event-personal-dentist")).toBeVisible();
    // Toggling back restores both copies.
    await demo.getByRole("checkbox").uncheck();
    await expect(demo.getByTestId("calendar-view-event-personal-standup")).toBeVisible();
  });

  test("drag-to-edit keyboard alternative reschedules the consumer-owned event", async ({
    page,
  }) => {
    const demo = page.getByTestId("calendarview-drag");
    const chip = demo.getByTestId("calendar-view-event-d1");
    await expect(chip).toHaveAttribute("draggable", "true");
    // Activate the chip, then arrow-key reschedule it one day forward. The
    // demo page owns state and rewrites the event's start, so the chip
    // re-renders inside the next day's cell.
    await chip.click();
    await chip.press("ArrowRight");
    await expect(
      demo.locator('[data-day="2026-09-16"]').locator('[data-testid="calendar-view-event-d1"]'),
    ).toHaveCount(1);
    await expect(
      demo.locator('[data-day="2026-09-15"]').locator('[data-testid="calendar-view-event-d1"]'),
    ).toHaveCount(0);
  });

  test("connectivity demo fetches both sources and groups the shared standup", async ({ page }) => {
    const demo = page.getByTestId("calendarview-connect");
    // Async fetch → chips appear once both sources resolve.
    await expect(demo.getByTestId("calendar-view-event-conn-review")).toBeVisible({
      timeout: 5000,
    });
    await expect(demo.getByTestId("calendar-view-event-conn-dentist")).toBeVisible();
    // The same-UID standup merges across the two calendars with a count of 2.
    await expect(demo.getByTestId("calendar-view-group-count-conn-standup-g")).toHaveText("2");
    // No error banner: both mock sources resolved.
    await expect(demo.getByTestId("calendar-view-connect-errors")).toHaveCount(0);
  });

  test("ics import demo renders parsed events including the recurring marker", async ({ page }) => {
    const demo = page.getByTestId("calendarview-ics");
    // recurrence expands the RRULE: the standup renders on Sep 15, 22, 29 and Oct 6
    await expect(demo.getByText("Team standup").first()).toBeVisible();
    await expect(demo.locator('[data-testid^="calendar-view-event-docs-standup"]')).toHaveCount(4);
    await expect(demo.getByText("Planning offsite").first()).toBeVisible();
    await expect(demo.getByText("Maybe lunch")).toBeVisible();
    // The recurring standup (RRULE) renders the repeat-icon marker; the
    // all-day offsite is not recurring and correctly has none.
    const standupChip = demo.locator('[data-testid^="calendar-view-event-docs-standup"]');
    await expect(standupChip.locator(".calendar-view-chip-icon").first()).toBeVisible();
  });

  test("browser-API badges sit beside the title and the heading stays clean", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "CalendarView", level: 1 })).toHaveText(
      "CalendarView",
    );
    const badges = page.locator(".browser-api-badges a");
    await expect(badges).toHaveCount(3);
    await expect(badges.filter({ hasText: "Temporal" })).toBeVisible();
    await expect(badges.filter({ hasText: "Popover" })).toBeVisible();
    await expect(badges.filter({ hasText: "Drag and Drop" })).toBeVisible();
  });
});

test.describe("CalendarView views + playground (11.4)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/components/Form/CalendarView");
    await waitForHydration(page);
  });

  test("view switcher reflows the same events across month/week/day", async ({ page }) => {
    const demo = page.getByTestId("calendarview-views");
    // Month view: 42 cells, both events visible.
    await expect(demo.locator("[data-testid^='calendar-view-day-2026']")).toHaveCount(42);
    await expect(demo.getByText("Design review")).toBeVisible();
    // Week view: 7 cells. The demo starts on Sep 1 (week of Aug 30), so
    // page forward to the week containing the Sep 16 event first.
    await demo.getByTestId("view-week").click();
    await expect(demo.locator("[data-testid^='calendar-view-day-2026']")).toHaveCount(7);
    for (let i = 0; i < 5 && !(await demo.getByText("Design review").isVisible()); i++) {
      await demo.getByTestId("calendar-view-next").click();
    }
    await expect(demo.getByText("Design review")).toBeVisible();
    // Day view: 1 cell; navigate it to Sep 16 and the review appears there.
    await demo.getByTestId("view-day").click();
    await expect(demo.locator("[data-testid^='calendar-view-day-2026']")).toHaveCount(1);
    // The demo binds month; page forward until the cell is Sep 16.
    for (
      let i = 0;
      i < 20 && !(await demo.getByTestId("calendar-view-day-2026-09-16").isVisible());
      i++
    ) {
      await demo.getByTestId("calendar-view-next").click();
    }
    await expect(demo.getByTestId("calendar-view-day-2026-09-16")).toBeVisible();
    await expect(demo.getByText("Design review")).toBeVisible();
    await expect(demo.getByText("Offsite")).toBeHidden();
  });

  test("playground sprinkle adds seeded events to the visible month", async ({ page }) => {
    const demo = page.getByTestId("calendarview-playground");
    await demo.getByTestId("playground-sprinkle").click();
    // Seeded RNG: run 1 always produces the same 4 chips (ids sb-1-0..3).
    await expect(demo.getByTestId("calendar-view-event-sb-1-0")).toBeVisible();
    for (const i of [1, 2, 3]) {
      await expect(demo.getByTestId(`calendar-view-event-sb-1-${i}`)).toBeVisible();
    }
    await demo.getByTestId("playground-sprinkle").click();
    await expect(demo.getByTestId("calendar-view-event-sb-2-0")).toBeVisible();
  });

  test("playground custom event form adds an event on the chosen day", async ({ page }) => {
    const demo = page.getByTestId("calendarview-playground");
    await demo.locator("input[name='title']").fill("Dentist");
    await demo.locator("input[name='date']").fill("2026-09-24");
    await demo.getByTestId("playground-add").click();
    await expect(demo.getByText("Dentist")).toBeVisible();
    await expect(demo.getByTestId("calendar-view-event-")).toBeHidden(); // sanity: no empty ids
  });

  test("playground holiday toggles fetch feeds, render chips, and lock dragging", async ({
    page,
  }) => {
    const demo = page.getByTestId("calendarview-playground");
    await demo.getByTestId("playground-cal-en.usa").check();
    // Live public feed: at least one US holiday lands in the Sep 2026 grid.
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
});
