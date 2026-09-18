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
