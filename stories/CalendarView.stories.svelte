<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, fireEvent, waitFor, within } from "storybook/test"
// The polyfill stands in for the browser's native Temporal global in the
// Storybook iframe — same shape as a consumer's install. The named import
// does NOT install the global, so pin it via the helper module (a plain
// `.js` import keeps the CSF static indexer happy).
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill"
import "./temporalGlobal.js"
import CalendarView from "$lib/components/CalendarView/CalendarView.svelte"
import { parseICal } from "$lib/helpers/parseICal.js"

const { Story } = defineMeta({
  title: "Form/CalendarView",
  component: CalendarView,
  tags: ["autodocs"],
  argTypes: {
    weekStart: { control: "radio", options: ["auto", 0, 1], description: "Day the week starts on; 'auto' derives from the locale" },
    weeks: { control: "number", description: "Number of grid rows (6 keeps the grid stable)" },
  },
  args: {},
})

/** Fixed visible month so story screenshots don't drift with the calendar. */
const SEPTEMBER = TemporalPolyfill.PlainDate.from("2026-09-01")

/** Two overlapping multi-day spans for the SubRowLanes story. */
const LANE_EVENTS = [
  { id: "lane-a", title: "Offsite", start: "2026-09-08", end: "2026-09-11", allDay: true, color: "#10b981" },
  { id: "lane-b", title: "Conference", start: "2026-09-09", end: "2026-09-12", allDay: true, color: "#6366f1" },
]

/** Google-export-shaped feed: one recurring standup, one all-day offsite, one tentative. */
const ICS_SAMPLE = `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART;TZID=Europe/Berlin:20260915T093000
DTEND;TZID=Europe/Berlin:20260915T100000
RRULE:FREQ=WEEKLY;BYDAY=TU;COUNT=10
UID:story-standup@google.com
STATUS:CONFIRMED
SUMMARY:Team standup
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260921
DTEND;VALUE=DATE:20260922
UID:story-offsite@google.com
STATUS:CONFIRMED
SUMMARY:Planning offsite
END:VEVENT
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20260918T130000
UID:story-lunch@google.com
STATUS:TENTATIVE
SUMMARY:Maybe lunch
END:VEVENT
END:VCALENDAR`

/** Parsed once at module scope — parseICal is pure text to events. */
const ICS_EVENTS = parseICal(ICS_SAMPLE)

/**
 * Two fake calendars sharing one standup (iCal UID dedup) — the milestone-4
 * grouping demo data. Unshared events (deep work, dentist) prove grouping
 * never merges distinct events.
 */
const GROUPING_EVENTS = [
  { id: "a-work-standup", uid: "standup@google.com", title: "Standup", start: "2026-09-15T09:30", color: "#10b981" },
  { id: "work-deep", title: "Deep work", start: "2026-09-16T14:00", color: "#6366f1" },
  { id: "z-personal-standup", uid: "standup@google.com", title: "Standup", start: "2026-09-15T09:30", color: "#f59e0b" },
  { id: "personal-dentist", title: "Dentist", start: "2026-09-17T11:00", color: "#ef4444" },
]
// Spread (not a literal `events=` attribute): CSF tooling treats a literal
// `events` attribute as event wiring, not a prop.
const GROUPING_PROPS = { events: GROUPING_EVENTS }

/** Toggle state for the GroupingToggle demo (shared story-file scope). */
let grouping = $state(false)

/** Sample events exercising color, icon, badge, and cancelled states. */
const EVENTS = [
  { id: "e1", start: "2026-09-08T10:00", title: "Design review", color: "#6366f1", icon: "palette" },
  { id: "e2", start: "2026-09-15T09:30", title: "Team standup", color: "#10b981" },
  { id: "e3", start: "2026-09-15", title: "Sprint planning", color: "#f59e0b", badge: "5" },
  { id: "e4", start: "2026-09-15T14:00", title: "1:1 with Sam", color: "#ef4444" },
  { id: "e5", start: "2026-09-21", title: "Release 2.0", color: "#0ea5e9", icon: "rocket" },
  { id: "e6", start: "2026-09-21T16:00", title: "Retro", color: "#8b5cf6" },
  { id: "e7", start: "2026-09-17", title: "Cancelled offsite", color: "#6b7280", status: "cancelled" },
]

/** Drag-to-edit fixture: a movable timed event plus a static all-day anchor. */
const DRAG_EVENTS = [
  { id: "drag1", title: "Planning session", start: "2026-09-15T10:00", color: "#6366f1" },
  { id: "drag2", title: "Team offsite", start: "2026-09-21", allDay: true, color: "#f59e0b" },
]

/** `oneventmove` payloads captured for the play (module fn reference survives the CSF transform; inline arrows don't). */
const MOVES = []
function captureMove(e) {
  MOVES.push(e.detail)
}

/** Connectivity fixture: an async mock standing in for a server-proxied feed (Google/Outlook/CalDAV). */
const CONNECTED_SOURCES = [
  {
    id: "work",
    name: "Work",
    color: "#10b981",
    fetchEvents: async () => [
      { id: "conn-standup-w", uid: "conn-standup@docs", title: "Standup", start: "2026-09-15T09:30" },
      { id: "conn-review", title: "Design review", start: "2026-09-16T14:00" },
    ],
  },
  {
    id: "family",
    name: "Family",
    color: "#f59e0b",
    fetchEvents: async () => [
      { id: "conn-standup-p", uid: "conn-standup@docs", title: "Standup", start: "2026-09-15T09:30" },
      { id: "conn-dentist", title: "Dentist", start: "2026-09-17T11:00" },
    ],
  },
]

/** Phase-2 RRULE fixture: the parser's raw rule expands to weekly occurrences. */
const RRULE_EVENTS = [
  { id: "rr", uid: "rr@docs", title: "Weekly sync", start: "2026-09-02T11:00", "data-rrule": "FREQ=WEEKLY;BYDAY=WE;COUNT=6", color: "#8b5cf6" },
]
/** Week/day-view fixture: two events in the target week, one outside. */
const VIEW_EVENTS = [
  { id: "wk-review", title: "Design review", start: "2026-09-16T14:00", color: "#6366f1" },
  { id: "wk-offsite", title: "Offsite", start: "2026-09-18", allDay: true, color: "#f59e0b" },
  { id: "wk-later", title: "Next month", start: "2026-10-05T09:00", color: "#10b981" },
]
/** Playground fixture: sandbox events + mock holiday feeds (no network). */
const SANDBOX_EVENTS = [
  { id: "sb-1", title: "Kickoff", start: "2026-09-03T10:00", color: "#10b981" },
  { id: "sb-2", title: "Retro", start: "2026-09-17T15:00", color: "#6366f1", icon: "tabler:users" },
]
const HOLIDAY_FEEDS = [
  {
    id: "en.usa#holiday@group.v.calendar.google.com",
    name: "US holidays",
    color: "#ef4444",
    fetchEvents: async () => [
      { id: "hol-labor", uid: "20260907_x@google.com", title: "Labor Day", start: "2026-09-07", allDay: true },
      { id: "hol-patriot", uid: "20260911_y@google.com", title: "Patriot Day", start: "2026-09-11", allDay: true },
    ],
  },
  {
    id: "en.christian#holiday@group.v.calendar.google.com",
    name: "Christian holidays",
    color: "#8b5cf6",
    fetchEvents: async () => [
      { id: "hol-advent", uid: "20261129_z@google.com", title: "Advent", start: "2026-11-29", allDay: true },
    ],
  },
]
/** Holidays (calendarId sources) are locked from drag-to-edit. */
const lockHolidays = (e) => !e.calendarId


</script>

<Story name="Default">
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>

<Story name="SundayWeekStart">
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} weekStart={0} />
    </div>
  {/snippet}
</Story>

<Story name="SelectedDate">
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} value={TemporalPolyfill.PlainDate.from("2026-09-21")} />
    </div>
  {/snippet}
</Story>

<Story
  name="KeyboardNavigation"
  play={async ({ canvas, step }) => {
    const grid = await canvas.findByRole("grid")
    const tabbable = () => grid.querySelector('[role="gridcell"] [tabindex="0"]')

    await step("ArrowRight moves cell focus by one day", async () => {
      expect(tabbable()?.textContent).toBe("1")
      await fireEvent.keyDown(grid, { key: "ArrowRight" })
      expect(tabbable()?.textContent).toBe("2")
    })

    await step("ArrowDown moves by one week", async () => {
      await fireEvent.keyDown(grid, { key: "ArrowDown" })
      expect(tabbable()?.textContent).toBe("9")
    })

    await step("Home/End jump to week start/end", async () => {
      await fireEvent.keyDown(grid, { key: "Home" })
      expect(tabbable()?.textContent).toBe("7")
      await fireEvent.keyDown(grid, { key: "End" })
      expect(tabbable()?.textContent).toBe("13")
    })

    await step("Enter selects the focused day", async () => {
      await fireEvent.keyDown(grid, { key: "Enter" })
      await waitFor(() => {
        expect(grid.querySelector('[aria-selected="true"]')).not.toBeNull()
      })
    })

    await step("PageDown pages to the next month with focus intact", async () => {
      await fireEvent.keyDown(grid, { key: "PageDown" })
      await waitFor(() => {
        expect(canvas.getByText("October 2026")).toBeInTheDocument()
      })
      expect(tabbable()).not.toBeNull()
    })
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>

<Story
  name="SelectionCallback"
  play={async ({ canvas }) => {
    const grid = await canvas.findByRole("grid")
    const day = canvas.getByTestId("calendar-view-day-2026-09-15")
    await fireEvent.click(day)
    await expect(day.closest('[role="gridcell"]')).toHaveAttribute("aria-selected", "true")
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView
        {...args}
        month={SEPTEMBER}
        ondateselect={(e) => console.log("selected", e.detail.date.toString())}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="Events"
  args={{ events: EVENTS, maxEventsPerCell: 2 }}
  play={async ({ canvas, step }) => {
    await step("chips render with color, icon, badge, and cancelled styling", async () => {
      await canvas.findByText("Design review")
      expect(canvas.getByText("Sprint planning")).toBeInTheDocument()
      expect(canvas.getByText("Team standup")).toBeInTheDocument()
      expect(canvas.getByText("Cancelled offsite")).toBeInTheDocument()
      // Badge renders inside its chip
      const planningChip = canvas.getByTestId("calendar-view-event-e3")
      expect(planningChip.textContent).toContain("5")
    })

    await step("overflow events collect behind +N more", async () => {
      // Sept 15 has 3 events; maxEventsPerCell=2 pushes "1:1 with Sam" over
      const more = canvas.getByTestId("calendar-view-more-2026-09-15")
      expect(more.textContent).toContain("+1")
      // The popover content lives in the DOM even when closed (hidden by
      // the UA popover stylesheet), so assert on visibility, not presence.
      const overflowChip = canvas.getByTestId("calendar-view-popover-event-e4")
      expect(overflowChip).not.toBeVisible()
      await fireEvent.click(more)
      await waitFor(() => {
        expect(canvas.getByTestId("calendar-view-popover-event-e4")).toBeVisible()
      })
    })
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>

<Story
  name="IcsImport"
  args={{ events: ICS_EVENTS }}
  play={async ({ canvas }) => {
    // Parsed events land on the grid: standup (timed), offsite (all-day),
    // and lunch (tentative). The standup carries the repeat marker.
    await canvas.findByText("Team standup")
    expect(canvas.getByText("Planning offsite")).toBeInTheDocument()
    expect(canvas.getByText("Maybe lunch")).toBeInTheDocument()
    // Recurring event's chip renders the repeat icon wrapper.
    const standupChip = canvas.getByTestId("calendar-view-event-story-standup@google.com")
    expect(standupChip.querySelector(".calendar-view-chip-icon")).not.toBeNull()
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>

<Story
  name="GroupingOff"
  args={{ events: GROUPING_EVENTS, grouping: false }}
  play={async ({ canvas }) => {
    // Grouping off: every calendar's copy of the standup renders separately.
    await canvas.findByTestId("calendar-view-event-a-work-standup")
    expect(canvas.getByTestId("calendar-view-event-z-personal-standup")).toBeInTheDocument()
    expect(canvas.queryByTestId("calendar-view-group-count-a-work-standup")).toBeNull()
    // Unshared events always render.
    expect(canvas.getByTestId("calendar-view-event-personal-dentist")).toBeInTheDocument()
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>

<Story
  name="GroupingOn"
  args={{ events: GROUPING_EVENTS, grouping: true }}
  play={async ({ canvas }) => {
    // Grouping on: the same-UID copies merge into one chip whose solid
    // badge shows the source count; per-source color dots render inside.
    await canvas.findByTestId("calendar-view-event-a-work-standup")
    const count = canvas.getByTestId("calendar-view-group-count-a-work-standup")
    expect(count.textContent).toBe("2")
    expect(canvas.queryByTestId("calendar-view-event-z-personal-standup")).toBeNull()
    const dots = canvas.getByTestId("calendar-view-event-a-work-standup").querySelectorAll(".calendar-view-chip-dot")
    expect(dots.length).toBe(2)
    // Unshared events never merge.
    expect(canvas.getByTestId("calendar-view-event-personal-dentist")).toBeInTheDocument()
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>

<Story
  name="DragToEdit"
  args={{ events: DRAG_EVENTS, dragEvents: true, oneventmove: captureMove }}
  play={async ({ canvas, step }) => {
    const chip = await canvas.findByTestId("calendar-view-event-drag1")
    expect(chip.getAttribute("draggable")).toBe("true")

    await step("drop on another cell fires oneventmove with from/to", async () => {
      const target = canvas.getByTestId("calendar-view-day-2026-09-18").closest("[data-day]")
      await fireEvent.dragStart(chip)
      await fireEvent.dragOver(target)
      expect(target).toHaveClass("calendar-view-droptarget")
      await fireEvent.drop(target)
      expect(MOVES.length).toBe(1)
      expect(MOVES[0].event.id).toBe("drag1")
      expect(MOVES[0].from.toString()).toBe("2026-09-15")
      expect(MOVES[0].to.toString()).toBe("2026-09-18")
      // Highlight clears after the drop.
      expect(target).not.toHaveClass("calendar-view-droptarget")
    })

    await step("keyboard arrows move the activated event (DnD alternative)", async () => {
      await fireEvent.click(chip)
      await fireEvent.keyDown(chip, { key: "ArrowRight" })
      expect(MOVES[MOVES.length - 1].to.toString()).toBe("2026-09-16")
    })
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>

<Story
  name="Connectivity"
  args={{ calendars: CONNECTED_SOURCES, grouping: true }}
  play={async ({ canvas }) => {
    // Remote events render after the async fetch resolves; the same-UID
    // standup copies from the two "calendars" merge into one grouped chip.
    await canvas.findByTestId("calendar-view-event-conn-review")
    expect(canvas.getByTestId("calendar-view-event-conn-dentist")).toBeInTheDocument()
    // Grouping: both copies share conn-standup@docs, so only the primary
    // chip remains ("conn-standup-p" — the id tiebreak sorts it first).
    expect(canvas.queryByTestId("calendar-view-event-conn-standup-w")).toBeNull()
    const count = canvas.getByTestId("calendar-view-group-count-conn-standup-p")
    expect(count.textContent).toBe("2")
    // The merged chip takes the primary's (family) color.
    const chip = canvas.getByTestId("calendar-view-event-conn-standup-p")
    expect(chip.style.getPropertyValue("--event-color")).toBe("#f59e0b")
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>

<Story
  name="Recurrence"
  args={{ events: RRULE_EVENTS, recurrence: true }}
  play={async ({ canvas }) => {
    // The base chip renders Sept 2; expansion adds Wednesdays
    // Sept 9, 16, 23, 30 and Oct 7 (COUNT=6 total with the base).
    await canvas.findByTestId("calendar-view-event-rr")
    for (const id of ["rr_0", "rr_1", "rr_2", "rr_3", "rr_4"]) {
      expect(canvas.getByTestId(`calendar-view-event-${id}`)).toBeInTheDocument()
    }
    const last = canvas.getByTestId("calendar-view-event-rr_4").closest("[data-day]")
    expect(last?.getAttribute("data-day")).toBe("2026-10-07")
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>\n
<Story name="WeekView" args={{ view: "week", events: VIEW_EVENTS }}
  play={async ({ canvas, canvasElement }) => {
    // Week view shows only the events inside Sep 13–19 (Sun-start).
    await canvas.findByTestId("calendar-view-event-wk-review")
    await canvas.findByTestId("calendar-view-event-wk-offsite")
    expect(canvas.queryByTestId("calendar-view-event-wk-later")).toBeNull()
    // Exactly one row of 7 days.
    const days = canvasElement.querySelectorAll("[data-testid^='calendar-view-day-2026']")
    expect(days.length).toBe(7)
  }}>
  {#snippet children(args)}
    <div style="min-height: 200px">
      <CalendarView {...args} month={TemporalPolyfill.PlainDate.from("2026-09-16")} />
    </div>
  {/snippet}
</Story>

<Story name="DayView" args={{ view: "day", events: [{ id: "day-ev", title: "Dentist", start: "2026-09-01T11:00" }] }}>
  {#snippet children(args)}
    <div style="min-height: 160px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>\n
<Story
  name="Playground"
  args={{
    events: SANDBOX_EVENTS,
    calendars: HOLIDAY_FEEDS,
    grouping: true,
    dragEvents: true,
    eventsDraggable: lockHolidays,
  }}
  play={async ({ canvas }) => {
    // Sandbox chips render; holiday chips arrive via the calendars contract.
    await canvas.findByTestId("calendar-view-event-sb-1")
    await canvas.findByTestId("calendar-view-event-hol-labor")
    // Holidays are drag-locked; sandbox events are draggable.
    expect(canvas.getByTestId("calendar-view-event-hol-labor").getAttribute("draggable")).toBe("false")
    expect(canvas.getByTestId("calendar-view-event-sb-1").getAttribute("draggable")).toBe("true")
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>

<!-- Sub-row lanes: two overlapping multi-day spans share the same days and
     render side by side in their assigned lanes (phase-2 close-out). -->
<Story
  name="SubRowLanes"
  args={{
    events: LANE_EVENTS,
    maxEventsPerCell: 3,
  }}
  play={async ({ canvas }) => {
    // Lane 1 vs lane 2 via inline grid-row placement (multi-day chips
    // render in every covered cell — queryAll and assert the first).
    expect(canvas.getAllByTestId("calendar-view-event-lane-a")[0].getAttribute("style")).toContain("grid-row: 1")
    expect(canvas.getAllByTestId("calendar-view-event-lane-b")[0].getAttribute("style")).toContain("grid-row: 2")
  }}
>
  {#snippet children(args)}
    <div style="min-height: 340px">
      <CalendarView {...args} month={SEPTEMBER} />
    </div>
  {/snippet}
</Story>
