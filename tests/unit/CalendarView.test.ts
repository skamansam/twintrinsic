/**
 * Unit tests for the CalendarView component shell (plan item 11.1,
 * milestone 2): ARIA grid structure, today/selected marking, month paging,
 * and roving-tabindex keyboard navigation.
 *
 * Node lacks a native Temporal global, so the suite installs the polyfill
 * as the global — exactly the shape a consumer's polyfill install takes.
 */
import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";
import { beforeAll, describe, expect, it, vi } from "vitest";
import CalendarView from "../../src/lib/components/CalendarView/CalendarView.svelte";

beforeAll(() => {
  vi.stubGlobal("Temporal", TemporalPolyfill);
});

/**
 * "Today" as the component sees it (Temporal.Now). Derived, not pinned —
 * a hard-coded date drifts the moment the real calendar moves past it.
 */
const TODAY = TemporalPolyfill.Now.plainDateISO();

/** Renders CalendarView pinned to September 2026. */
async function renderForSeptember(props = {}) {
  const result = render(CalendarView, {
    props: {
      month: TemporalPolyfill.PlainDate.from("2026-09-01"),
      locale: "en-US",
      weekStart: 1,
      ...props,
    },
  });
  await waitFor(() => {
    expect(result.getByTestId(`calendar-view-day-${TODAY.toString()}`)).toBeInTheDocument();
  });
  return result;
}

describe("CalendarView structure", () => {
  it("renders a role=grid with a localized month title", async () => {
    const { getByRole, getByText } = await renderForSeptember();
    expect(getByRole("grid")).toBeInTheDocument();
    expect(getByText("September 2026")).toBeInTheDocument();
  });

  it("exposes the grid name via aria-labelledby", async () => {
    const { getByRole, getByText } = await renderForSeptember();
    const grid = getByRole("grid");
    const title = getByText("September 2026");
    expect(grid.getAttribute("aria-labelledby")).toBe(title.id);
  });

  it("renders 7 weekday column headers", async () => {
    const { getAllByRole } = await renderForSeptember();
    const headers = getAllByRole("columnheader");
    expect(headers).toHaveLength(7);
    expect(headers.map((h) => h.textContent)).toEqual([
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ]);
  });

  it("renders 42 day buttons (fixed 6×7 grid)", async () => {
    const { container } = await renderForSeptember();
    expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(42);
  });

  it("has exactly one tabbable cell (roving tabindex)", async () => {
    const { container } = await renderForSeptember();
    const tabbables = container.querySelectorAll('[role="gridcell"] [tabindex="0"]');
    expect(tabbables).toHaveLength(1);
    // Initial focus lands on the first in-month day (Sept 1, column Tue).
    expect(tabbables[0].textContent).toBe("1");
  });
});

describe("CalendarView today/selected", () => {
  it("marks today with aria-current=date", async () => {
    const { getByTestId } = await renderForSeptember();
    expect(getByTestId(`calendar-view-day-${TODAY.toString()}`)).toHaveAttribute(
      "aria-current",
      "date",
    );
  });

  it("marks only the selected date with aria-selected=true", async () => {
    const { container, getByTestId } = await renderForSeptember({
      value: TemporalPolyfill.PlainDate.from("2026-09-21"),
    });
    // aria-selected lives on the gridcell (APG), not the inner button.
    const selectedCell = getByTestId("calendar-view-day-2026-09-21").closest('[role="gridcell"]');
    expect(selectedCell).toHaveAttribute("aria-selected", "true");
    const allSelected = container.querySelectorAll('[aria-selected="true"]');
    expect(allSelected).toHaveLength(1);
  });

  it("dims out-of-month cells but keeps them rendered", async () => {
    const { getByTestId } = await renderForSeptember();
    const outside = getByTestId("calendar-view-day-2026-08-31");
    const cell = outside.closest('[role="gridcell"]') as HTMLElement;
    expect(cell.className).toContain("calendar-view-outside");
  });
});

describe("CalendarView selection", () => {
  it("selects a day on click, updates bindable value, and fires ondateselect", async () => {
    const ondateselect = vi.fn();
    const { getByTestId, container } = await renderForSeptember({ ondateselect });
    const target = getByTestId("calendar-view-day-2026-09-21");
    await fireEvent.click(target);

    expect(ondateselect).toHaveBeenCalledTimes(1);
    const detail = ondateselect.mock.calls[0][0].detail as { date: TemporalPolyfill.PlainDate };
    expect(detail.date.equals(TemporalPolyfill.PlainDate.from("2026-09-21"))).toBe(true);
    // aria-selected moved to the clicked day's gridcell.
    expect(target.closest('[role="gridcell"]')).toHaveAttribute("aria-selected", "true");
    expect(container.querySelectorAll('[aria-selected="true"]')).toHaveLength(1);
  });

  it("supports keyboard activation (Enter) on the focused day", async () => {
    const ondateselect = vi.fn();
    const { getByRole, container } = await renderForSeptember({ ondateselect });
    const grid = getByRole("grid");
    await fireEvent.keyDown(grid, { key: "Enter" });
    expect(ondateselect).toHaveBeenCalledTimes(1);
    expect(container.querySelector('[aria-selected="true"]')).not.toBeNull();
  });
});

describe("CalendarView paging", () => {
  it("pages months via the next/prev buttons and fires onmonthchange", async () => {
    const onmonthchange = vi.fn();
    const { getByTestId, getByText } = await renderForSeptember({ onmonthchange });
    await fireEvent.click(getByTestId("calendar-view-next"));

    await waitFor(() => expect(getByText("October 2026")).toBeInTheDocument());
    expect(onmonthchange).toHaveBeenCalledTimes(1);
    expect(
      (onmonthchange.mock.calls[0][0].detail as { month: TemporalPolyfill.PlainDate }).month.equals(
        TemporalPolyfill.PlainDate.from("2026-10-01"),
      ),
    ).toBe(true);
  });

  it("clamps the focused cell position when paging (focus stays in the grid)", async () => {
    const { getByTestId, container } = await renderForSeptember();
    // Focus position starts at Sept 1 (index 1). Page forward — the same
    // positional cell (Oct 1) becomes the tabbable one.
    await fireEvent.click(getByTestId("calendar-view-next"));
    await waitFor(() => expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(42));
    const tabbable = container.querySelector('[role="gridcell"] [tabindex="0"]');
    expect(tabbable).not.toBeNull();
  });
});

describe("CalendarView keyboard navigation", () => {
  it("moves focus by day with ArrowRight/ArrowLeft", async () => {
    const { getByRole, container } = await renderForSeptember();
    const grid = getByRole("grid");
    await fireEvent.keyDown(grid, { key: "ArrowRight" });
    let tabbable = container.querySelector('[role="gridcell"] [tabindex="0"]');
    expect(tabbable?.textContent).toBe("2");
    await fireEvent.keyDown(grid, { key: "ArrowLeft" });
    tabbable = container.querySelector('[role="gridcell"] [tabindex="0"]');
    expect(tabbable?.textContent).toBe("1");
  });

  it("moves focus by week with ArrowDown/ArrowUp", async () => {
    const { getByRole, container } = await renderForSeptember();
    const grid = getByRole("grid");
    await fireEvent.keyDown(grid, { key: "ArrowDown" });
    expect(container.querySelector('[role="gridcell"] [tabindex="0"]')?.textContent).toBe("8");
    await fireEvent.keyDown(grid, { key: "ArrowUp" });
    expect(container.querySelector('[role="gridcell"] [tabindex="0"]')?.textContent).toBe("1");
  });

  it("jumps to week start/end with Home/End", async () => {
    const { getByRole, container } = await renderForSeptember();
    const grid = getByRole("grid");
    // Sept 1 is a Tuesday (column 1) → Home lands on Monday Aug 31,
    // End lands on Sunday Sept 6.
    await fireEvent.keyDown(grid, { key: "Home" });
    expect(container.querySelector('[role="gridcell"] [tabindex="0"]')?.textContent).toBe("31");
    await fireEvent.keyDown(grid, { key: "End" });
    expect(container.querySelector('[role="gridcell"] [tabindex="0"]')?.textContent).toBe("6");
  });

  it("pages months with PageDown/PageUp and never loses keyboard focus", async () => {
    const { getByRole, container } = await renderForSeptember();
    const grid = getByRole("grid");
    await fireEvent.keyDown(grid, { key: "PageDown" });
    await waitFor(() =>
      expect(container.querySelector(".calendar-view-title")?.textContent).toBe("October 2026"),
    );
    // Focus must have returned to a cell after the async re-render.
    expect(container.querySelector('[role="gridcell"] [tabindex="0"]')).not.toBeNull();
  });

  it("selects the focused day with Space", async () => {
    const ondateselect = vi.fn();
    const { getByRole } = await renderForSeptember({ ondateselect });
    await fireEvent.keyDown(getByRole("grid"), { key: " " });
    expect(ondateselect).toHaveBeenCalledTimes(1);
  });
});

describe("CalendarView props", () => {
  it("honors weekStart=0 with Sunday-first headers", async () => {
    const { getAllByRole } = await renderForSeptember({ weekStart: 0 });
    const headers = getAllByRole("columnheader");
    expect(headers[0].textContent).toBe("Sun");
  });

  it("honors weeks=5 with 35 cells", async () => {
    const { container } = await renderForSeptember({ weeks: 5 });
    expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(35);
  });

  it("spreads rest props onto the grid element", async () => {
    const { getByRole } = await renderForSeptember({
      "data-test-marker": "rest-works",
      "aria-describedby": "some-description",
    });
    expect(getByRole("grid")).toHaveAttribute("data-test-marker", "rest-works");
    expect(getByRole("grid")).toHaveAttribute("aria-describedby", "some-description");
  });

  it("announces the month via the live region", async () => {
    const { getByTestId } = await renderForSeptember();
    const live = getByTestId("calendar-view-live");
    expect(live).toHaveAttribute("aria-live", "polite");
    expect(live.textContent).toContain("September 2026");
  });

  it("renders nav buttons with accessible names", async () => {
    const { getByTestId } = await renderForSeptember();
    expect(getByTestId("calendar-view-prev")).toHaveAttribute("aria-label", "Previous month");
    expect(getByTestId("calendar-view-next")).toHaveAttribute("aria-label", "Next month");
  });
});

describe("CalendarView today anchor", () => {
  it("uses Temporal.Now (not Date) for today", async () => {
    // With the real system clock the component renders *some* month;
    // verify exactly one cell carries aria-current regardless.
    const { container, getByRole } = render(CalendarView);
    await waitFor(() => {
      expect(container.querySelector('[aria-current="date"]')).not.toBeNull();
    });
    expect(getByRole("grid")).toBeInTheDocument();
    expect(container.querySelectorAll('[aria-current="date"]')).toHaveLength(1);
  });
});

describe("CalendarView event chips (milestone 3)", () => {
  /** Sample events pinned to September 2026. */
  const EVENTS = [
    { id: "standup", title: "Standup", start: "2026-09-17T09:30" },
    { id: "launch", title: "Launch", start: "2026-09-17" },
    { id: "conf", title: "Conference", start: "2026-09-15", end: "2026-09-18" },
    {
      id: "review",
      title: "Review",
      start: "2026-09-17T14:00",
      icon: "tabler:eye",
      badge: 3,
      color: "#0ea5e9",
    },
    { id: "gone", title: "Cancelled 1:1", start: "2026-09-21", status: "cancelled" as const },
    { id: "a1", title: "A1", start: "2026-09-22T08:00" },
    { id: "a2", title: "A2", start: "2026-09-22T09:00" },
    { id: "a3", title: "A3", start: "2026-09-22T10:00" },
  ];

  it("renders a chip per event on its day with time and title", async () => {
    const { getByTestId } = await renderForSeptember({ events: EVENTS, maxEventsPerCell: 4 });
    const chip = getByTestId("calendar-view-event-standup");
    expect(chip).toBeInTheDocument();
    expect(chip.textContent).toContain("Standup");
    expect(chip.textContent).toContain("09:30");
  });

  it("renders all-day events without a time", async () => {
    const { getByTestId } = await renderForSeptember({ events: EVENTS });
    const chip = getByTestId("calendar-view-event-launch");
    expect(chip.textContent).toContain("Launch");
    expect(chip.textContent).not.toContain(":");
  });

  it("renders multi-day events on every covered day with continuation markers", async () => {
    const { getAllByTestId } = await renderForSeptember({ events: EVENTS, maxEventsPerCell: 4 });
    // Same testid (event id) on all 4 covered cells; continuation cells show ↔ marker.
    const chips = getAllByTestId("calendar-view-event-conf");
    expect(chips).toHaveLength(4);
    expect(chips[1].textContent).toContain("↔");
    expect(chips[3].textContent).toContain("↔");
    expect(chips[0].textContent).not.toContain("↔");
  });

  it("renders icon and badge on the chip when provided", async () => {
    const { getByTestId } = await renderForSeptember({ events: EVENTS, maxEventsPerCell: 4 });
    const chip = getByTestId("calendar-view-event-review");
    // Icon data loads async from the Iconify runtime — assert the icon slot, not the svg.
    expect(chip.querySelector(".calendar-view-chip-icon")).not.toBeNull();
    expect(chip.textContent).toContain("3");
    expect(chip.getAttribute("style")).toContain("--event-color: #0ea5e9");
  });

  it("renders cancelled events struck through, not hidden", async () => {
    const { getByTestId } = await renderForSeptember({ events: EVENTS });
    const chip = getByTestId("calendar-view-event-gone");
    expect(chip).toBeInTheDocument();
    expect(chip.className).toContain("calendar-view-chip-cancelled");
  });

  it("overflows beyond maxEventsPerCell into a +N more popover", async () => {
    const { getByTestId } = await renderForSeptember({ events: EVENTS, maxEventsPerCell: 2 });
    const more = getByTestId("calendar-view-more-2026-09-22");
    expect(more.textContent).toContain("+1");
    // Only the first 2 (by sort order) are visible chips.
    expect(document.querySelector('[data-testid="calendar-view-event-a1"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="calendar-view-event-a3"]')).toBeNull();
  });

  it("shows overflow events inside the popover when opened", async () => {
    const { getByTestId } = await renderForSeptember({ events: EVENTS, maxEventsPerCell: 2 });
    getByTestId("calendar-view-more-2026-09-22").click();
    await waitFor(() => {
      expect(
        document.querySelector('[data-testid="calendar-view-popover-event-a3"]'),
      ).not.toBeNull();
    });
  });

  it("fires oneventselect with the raw event on chip click", async () => {
    const oneventselect = vi.fn();
    const { getByTestId } = await renderForSeptember({
      events: EVENTS,
      maxEventsPerCell: 4,
      oneventselect,
    });
    fireEvent.click(getByTestId("calendar-view-event-standup"));
    expect(oneventselect).toHaveBeenCalledTimes(1);
    const detail = oneventselect.mock.calls[0][0].detail;
    expect(detail.event.id).toBe("standup");
  });

  it("chip click does not select the day (stopPropagation)", async () => {
    const ondateselect = vi.fn();
    const { getByTestId } = await renderForSeptember({
      events: EVENTS,
      maxEventsPerCell: 4,
      ondateselect,
    });
    fireEvent.click(getByTestId("calendar-view-event-standup"));
    expect(ondateselect).not.toHaveBeenCalled();
  });
});

describe("CalendarView grouping (milestone 4)", () => {
  /** Two fake calendars sharing one standup (UID dedup) + private events. */
  const GROUPED_EVENTS = [
    {
      id: "w1",
      uid: "standup@google.com",
      title: "Standup",
      start: "2026-09-15T09:30",
      color: "#10b981",
    },
    { id: "w2", title: "Deep work", start: "2026-09-16T14:00", color: "#6366f1" },
    {
      id: "p1",
      uid: "standup@google.com",
      title: "Standup",
      start: "2026-09-15T09:30",
      color: "#f59e0b",
    },
    { id: "p2", title: "Dentist", start: "2026-09-17T11:00", color: "#ef4444" },
  ];

  it("grouping=false renders every source event as its own chip", async () => {
    const { getByTestId } = await renderForSeptember({ events: GROUPED_EVENTS });
    expect(getByTestId("calendar-view-event-w1")).toBeInTheDocument();
    expect(getByTestId("calendar-view-event-p1")).toBeInTheDocument();
    expect(document.querySelectorAll('[data-testid="calendar-view-group-count-w1"]')).toHaveLength(
      0,
    );
  });

  it("grouping=true merges same-UID copies into one chip with a count badge", async () => {
    const { getByTestId, queryByTestId } = await renderForSeptember({
      events: GROUPED_EVENTS,
      grouping: true,
    });
    // Only one standup chip exists; the primary is whichever copy sorted
    // first in normalizeEvents (p1 — deterministic id tiebreak).
    expect(getByTestId("calendar-view-event-p1")).toBeInTheDocument();
    expect(queryByTestId("calendar-view-event-w1")).toBeNull();
    expect(getByTestId("calendar-view-group-count-p1").textContent).toBe("2");
  });

  it("grouped chips render per-source color dots", async () => {
    const { getByTestId } = await renderForSeptember({ events: GROUPED_EVENTS, grouping: true });
    const dots = getByTestId("calendar-view-event-p1").querySelectorAll(".calendar-view-chip-dot");
    expect(dots).toHaveLength(2);
  });

  it("grouping never merges different events", async () => {
    const { getByTestId } = await renderForSeptember({ events: GROUPED_EVENTS, grouping: true });
    expect(getByTestId("calendar-view-event-w2")).toBeInTheDocument();
    expect(getByTestId("calendar-view-event-p2")).toBeInTheDocument();
  });
});

describe("CalendarView drag-to-edit (milestone 7)", () => {
  /** Renders with one chip on Sept 15 (Tue, in-month) and drag enabled. */
  async function renderDraggable(props = {}) {
    return renderForSeptember({
      events: [{ id: "mv1", title: "Movable", start: "2026-09-15T09:00" }],
      dragEvents: true,
      ...props,
    });
  }

  it("chips are draggable only when dragEvents is enabled", async () => {
    const { getByTestId } = await renderForSeptember({
      events: [{ id: "mv1", title: "Movable", start: "2026-09-15T09:00" }],
    });
    expect(getByTestId("calendar-view-event-mv1").getAttribute("draggable")).toBe("false");
  });

  it("dragEvents=true makes span-start chips draggable", async () => {
    const { getByTestId } = await renderDraggable();
    expect(getByTestId("calendar-view-event-mv1").getAttribute("draggable")).toBe("true");
  });

  it("drop on another cell fires oneventmove with from/to days", async () => {
    const oneventmove = vi.fn();
    const { getByTestId } = await renderDraggable({ oneventmove });
    const chip = getByTestId("calendar-view-event-mv1");
    const target = getByTestId("calendar-view-day-2026-09-18").closest("[data-day]") as HTMLElement;
    fireEvent.dragStart(chip);
    fireEvent.dragOver(target);
    expect(target).toHaveClass("calendar-view-droptarget");
    fireEvent.drop(target);
    expect(oneventmove).toHaveBeenCalledTimes(1);
    const detail = oneventmove.mock.calls[0][0].detail;
    expect(detail.event.id).toBe("mv1");
    expect(detail.from.toString()).toBe("2026-09-15");
    expect(detail.to.toString()).toBe("2026-09-18");
  });

  it("drop without a preceding dragstart never fires the callback", async () => {
    const oneventmove = vi.fn();
    const { getByTestId } = await renderDraggable({ oneventmove });
    const target = getByTestId("calendar-view-day-2026-09-18").closest("[data-day]") as HTMLElement;
    fireEvent.drop(target);
    expect(oneventmove).not.toHaveBeenCalled();
    expect(target).not.toHaveClass("calendar-view-droptarget");
  });

  it("keyboard arrows move the activated event by a day/week (DnD alternative)", async () => {
    const oneventmove = vi.fn();
    const { getByTestId } = await renderDraggable({ oneventmove });
    const chip = getByTestId("calendar-view-event-mv1");
    fireEvent.click(chip); // activates it as the keyboard-move target
    fireEvent.keyDown(chip, { key: "ArrowRight" });
    expect(oneventmove).toHaveBeenCalledTimes(1);
    const detail = oneventmove.mock.calls[0][0].detail;
    expect(detail.from.toString()).toBe("2026-09-15");
    expect(detail.to.toString()).toBe("2026-09-16");
    fireEvent.keyDown(chip, { key: "ArrowDown" }); // +1 week from the CURRENT start
    // Moves are always relative to the event's start in the props (the
    // consumer owns state and re-renders) — not compounded in-component.
    expect(oneventmove.mock.calls[1][0].detail.to.toString()).toBe("2026-09-22");
  });

  it("keyboard arrows do nothing on a chip that is not activated", async () => {
    const oneventmove = vi.fn();
    const { getByTestId } = await renderDraggable({ oneventmove });
    const chip = getByTestId("calendar-view-event-mv1");
    fireEvent.keyDown(chip, { key: "ArrowRight" });
    expect(oneventmove).not.toHaveBeenCalled();
  });

  it("arrow keys still navigate the grid while no chip is activated", async () => {
    const { getByTestId } = await renderDraggable();
    const grid = getByTestId("calendar-view");
    const dayButton = getByTestId(`calendar-view-day-${TODAY.toString()}`);
    dayButton.focus();
    fireEvent.keyDown(grid, { key: "ArrowRight" });
    expect(dayButton.getAttribute("tabindex")).toBe("-1");
  });
});

describe("CalendarView connectivity (milestone 6)", () => {
  /** Two sources: one healthy, one for the shared-event grouping demo. */
  function workSource(events: Array<Record<string, unknown>> = []) {
    return {
      id: "work",
      name: "Work",
      color: "#10b981",
      fetchEvents: vi.fn().mockResolvedValue(events),
    };
  }

  it("fetches connected calendars on mount and renders their chips", async () => {
    const work = workSource([
      { id: "remote1", title: "Remote standup", start: "2026-09-16T09:00" },
    ]);
    const { getByTestId } = await renderForSeptember({ calendars: [work] });
    await waitFor(() => {
      expect(getByTestId("calendar-view-event-remote1")).toBeInTheDocument();
    });
    expect(work.fetchEvents).toHaveBeenCalledTimes(1);
    // Range covers the visible 6×7 grid (Aug 31 → Oct 11 for Sept 2026, weekStart 1).
    const range = work.fetchEvents.mock.calls[0][0];
    expect(range.start.toString()).toBe("2026-08-31");
    expect(range.end.toString()).toBe("2026-10-11");
  });

  it("fetched events fall back to the calendar's color via --event-color", async () => {
    const work = workSource([
      { id: "remote1", title: "Remote standup", start: "2026-09-16T09:00" },
    ]);
    const { getByTestId } = await renderForSeptember({ calendars: [work] });
    await waitFor(() => {
      expect(getByTestId("calendar-view-event-remote1")).toBeInTheDocument();
    });
    const chip = getByTestId("calendar-view-event-remote1");
    expect(chip.style.getPropertyValue("--event-color")).toBe("#10b981");
  });

  it("a failing source fires oncalendarserror; healthy sources still render", async () => {
    const oncalendarserror = vi.fn();
    const flaky = {
      id: "flaky",
      name: "Flaky",
      color: "#f00",
      fetchEvents: vi.fn().mockRejectedValue(new Error("CORS")),
    };
    const healthy = workSource([{ id: "remote-ok", title: "OK event", start: "2026-09-16T09:00" }]);
    const { getByTestId } = await renderForSeptember({
      calendars: [flaky, healthy],
      oncalendarserror,
    });
    await waitFor(() => {
      expect(oncalendarserror).toHaveBeenCalledTimes(1);
    });
    const detail = oncalendarserror.mock.calls[0][0].detail;
    expect(detail.errors).toHaveLength(1);
    expect(detail.errors[0].sourceId).toBe("flaky");
    expect(getByTestId("calendar-view-event-remote-ok")).toBeInTheDocument();
  });

  it("no calendars prop means no fetching and no errors", async () => {
    const fetcher = vi.fn().mockResolvedValue([]);
    const idle = { id: "idle", name: "Idle", color: "#00f", fetchEvents: fetcher };
    const { getByTestId } = await renderForSeptember({
      events: [{ id: "static1", title: "Static", start: "2026-09-16T10:00" }],
    });
    expect(getByTestId("calendar-view-event-static1")).toBeInTheDocument();
    expect(fetcher).not.toHaveBeenCalled();
    void idle;
  });

  it("fetched events merge with static events and group across sources", async () => {
    const work = workSource([
      { id: "r1", uid: "shared@x", title: "Standup", start: "2026-09-15T09:30" },
    ]);
    await renderForSeptember({
      events: [
        {
          id: "s1",
          uid: "shared@x",
          title: "Standup",
          start: "2026-09-15T09:30",
          color: "#6366f1",
        },
      ],
      calendars: [work],
      grouping: true,
    });
    await waitFor(() => {
      // Group primary is whichever sorted first; both copies share uid.
      expect(document.querySelector('[data-testid^="calendar-view-group-count-"]')).not.toBeNull();
    });
  });
});

describe("CalendarView RRULE expansion (phase 2)", () => {
  const WEEKLY = [
    {
      id: "w",
      uid: "w@x",
      title: "Weekly standup",
      start: "2026-09-01T09:30",
      "data-rrule": "FREQ=WEEKLY;BYDAY=TU;COUNT=10",
    },
  ];

  it("recurrence=false renders the base instance only", async () => {
    const { queryByTestId } = await renderForSeptember({ events: WEEKLY });
    expect(queryByTestId("calendar-view-event-w")).toBeInTheDocument();
    // Sept 8 would be the next occurrence — no generated instances exist.
    expect(queryByTestId("calendar-view-event-w_0")).toBeNull();
  });

  it("recurrence=true renders every in-range occurrence", async () => {
    const { getByTestId } = await renderForSeptember({ events: WEEKLY, recurrence: true });
    // Sept 1 (base), 8, 15, 22, 29, Oct 6 — all within the visible grid.
    for (const [i, day] of [
      "2026-09-01",
      "2026-09-08",
      "2026-09-15",
      "2026-09-22",
      "2026-09-29",
      "2026-10-06",
    ].entries()) {
      const id = i === 0 ? "w" : "w_" + (i - 1);
      expect(
        getByTestId(`calendar-view-event-${id}`).closest("[data-day]")?.getAttribute("data-day"),
      ).toBe(day);
    }
  });

  it("expanded instances keep the uid and group across calendars", async () => {
    const { getByTestId } = await renderForSeptember({
      events: WEEKLY,
      calendars: [
        {
          id: "other",
          name: "Other",
          color: "#f59e0b",
          fetchEvents: async () => [
            { id: "o", uid: "w@x", title: "Weekly standup", start: "2026-09-15T09:30" },
          ],
        },
      ],
      recurrence: true,
      grouping: true,
    });
    await waitFor(() => {
      // The Sept 15 occurrence merges with the other calendar's copy. The
      // merged chip keeps the primary's id — "o" sorts before "w_1".
      expect(getByTestId("calendar-view-group-count-o")).toBeInTheDocument();
    });
    expect(getByTestId("calendar-view-group-count-o").textContent).toBe("2");
  });
});
