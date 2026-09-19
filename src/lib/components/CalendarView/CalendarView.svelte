<!--
@component
CalendarView - A full calendar view built on the native Temporal API.

Renders a month grid (6 weeks × 7 days) with ARIA grid semantics, roving
-tabindex keyboard navigation, and month paging. Supports event chips
(`events`), cross-calendar grouping (`grouping`), `.ics` import via the
`parseICal` helper, and drag-to-edit rescheduling (`dragEvents` + the
`oneventmove` callback, native HTML Drag and Drop API with a keyboard
alternative — see docs/plans/CALENDARVIEW_DESIGN.md).

Requires native Temporal (Chrome/Edge 131+). Consumers targeting older
browsers can install `@js-temporal/polyfill` themselves (first import of
their app entry) — Twintrinsic ships no polyfill.

Usage:
```svelte
<CalendarView bind:value={selectedDate} />  <CalendarView
    month={visibleMonth}
    onmonthchange={(e) => console.log(e.detail.month)}
    weekStart={0}
/>

<CalendarView
  events={events}
  dragEvents
  oneventmove={(e) => console.log(e.detail.event.id, e.detail.to)}
/>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "value", type: "Temporal.PlainDate | null", description: "The selected date (`PlainDate | null`), bindable", default: "$bindable(null)", optional: true },
  { name: "month", type: "Temporal.PlainDate", description: "The visible month (any date in it), bindable", default: "$bindable(undefined)", optional: true },
  { name: "weekStart", type: "WeekStart | \"auto\"", description: "Day the week starts on; `\"auto\"` derives from the locale", default: "\"auto\"", optional: true },
  { name: "locale", type: "string", description: "BCP 47 locale tag (defaults to the runtime locale)", optional: true },
  { name: "weeks", type: "number", description: "Number of grid rows (6 keeps the grid stable between months)", default: "6", optional: true },
  { name: "view", type: '"month" | "week" | "day"', description: "Which period the grid shows: month (6\u00d77), week (1\u00d77 containing `month`), or day (single cell)", default: '"month"', optional: true },
  { name: "eventsDraggable", type: "(event: CalendarViewEvent) => boolean", description: "Per-event override: set `draggable: false` to exclude a single event from drag-to-edit (e.g. read-only holiday feeds)", optional: true },
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for the grid element", default: "crypto.randomUUID()", optional: true },
  { name: "onmonthchange", type: "(event: CustomEvent<{ month: Temporal.PlainDate }>) => void", description: "Fires after the visible period changes (month paging in month view; ±7 days in week view; ±1 day in day view)", optional: true, eventDetail: "{ month: Temporal.PlainDate }" },
  { name: "ondateselect", type: "(event: CustomEvent<{ date: Temporal.PlainDate }>) => void", description: "Fires when a day is selected via pointer or keyboard", optional: true, eventDetail: "{ date: Temporal.PlainDate }" },
  { name: "oneventselect", type: "(event: CustomEvent<{ event: CalendarViewEvent }>) => void", description: "Fires when an event chip is activated (pointer or keyboard)", optional: true, eventDetail: "{ event: CalendarViewEvent }" },
  { name: "oneventmove", type: "(event: CustomEvent<EventMoveDetail>) => void", description: "Fires on drag-to-edit drop (HTML DnD) or a keyboard move — the consumer owns state and re-renders from the new `start`", optional: true, eventDetail: "EventMoveDetail" },
  { name: "dragEvents", type: "boolean", description: "Enable drag-to-edit via the native HTML Drag and Drop API (desktop pointer only; keyboard alternative provided)", default: "false", optional: true },
  { name: "calendars", type: "CalendarSource[]", description: "Connected calendars (M6 contract): each supplies fetchEvents for the visible range; results merge with `events`", default: "[]", optional: true },
  { name: "oncalendarserror", type: "(event: CustomEvent<CalendarsErrorDetail>) => void", description: "Fires when a connected calendar fails to fetch; other sources still render", optional: true, eventDetail: "CalendarsErrorDetail" },
  { name: "events", type: "CalendarViewEvent[]", description: "Events to render as chips in the day cells (ISO strings accepted)", default: "[]", optional: true },
  { name: "grouping", type: "boolean", description: "Merge the same event across calendars into one chip with a source-count badge (dedup by iCal UID, then title+day+time)", default: "false", optional: true },
  { name: "maxEventsPerCell", type: "number", description: "Max chips shown per cell before the \"+N more\" popover (default 2)", default: "2", optional: true },
  { name: "eventContent", type: "Snippet<[CalendarViewEvent]>", description: "Custom chip content; receives the raw event (see `CalendarViewEvent`)", optional: true },
  { name: "recurrence", type: "boolean", description: "Expand RRULE-carrying events (e.g. from parseICal) into range-capped occurrences; off renders base instances only", default: "false", optional: true },
];
</script>

<script lang="ts">
/**
 * @component
 * CalendarView - A full calendar view built on the native Temporal API.
 *
 * Accessibility follows the WAI-ARIA APG "Grid" pattern: the grid root has
 * `role="grid"`, weeks are `role="row"`, day cells are `role="gridcell"`
 * (with an inner `role="button"` carrying `aria-selected` / `aria-current`),
 * and exactly one cell is tabbable at a time (roving tabindex). Arrow keys
 * move focus by day/week, Home/End jump within the week, PageUp/PageDown
 * page months.
 *
 * Requires native Temporal (Chrome/Edge 131+). No polyfill is shipped —
 * see the component docs page's Browser support note for the consumer
 * opt-in. All date math lives in `src/lib/helpers/calendarGrid.ts`.
 */
import { tick } from "svelte"
import Icon from "../Icon/Icon.svelte"
import { buildMonthGrid, buildWeekGrid, monthTitle, resolveWeekStart, weekdayHeaders, type WeekStart } from "../../helpers/calendarGrid.js"
import { eventsForDay, normalizeEvents, type CalendarViewEvent, type EventMoveDetail, type NormalizedEvent } from "../../helpers/eventNormalize.js"
import { computeWeekLanes } from "../../helpers/eventLanes.js"
import { connectCalendars, type CalendarSource, type CalendarsErrorDetail } from "../../helpers/connectCalendars.js"
import { expandRecurrences } from "../../helpers/rruleExpand.js"
import { groupEvents, sourceColors, sourceCount, type GroupedEvent } from "../../helpers/eventGroup.js"
import type { Snippet } from "svelte"

interface Props {
  /** Additional props passed through to the root element */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
  /** HTML id for the grid element */
  id?: string
  /** The selected date (`PlainDate | null`), bindable */
  value?: Temporal.PlainDate | null
  /** The visible month (any date in it), bindable */
  month?: Temporal.PlainDate
  /** Day the week starts on; `"auto"` derives from the locale */
  weekStart?: WeekStart | "auto"
  /** BCP 47 locale tag (defaults to the runtime locale) */
  locale?: string
  /** Number of grid rows (6 keeps the grid stable between months) */
  weeks?: number
  /** Which period the grid shows: month (6×7), week (1×7 containing `month`), or day (single cell) */
  view?: "month" | "week" | "day"
  /** Events to render as chips in the day cells (ISO strings accepted) */
  events?: CalendarViewEvent[]
  /** Merge the same event across calendars into one chip with a source-count badge (dedup by iCal UID, then title+day+time) */
  grouping?: boolean
  /** Max chips shown per cell before the "+N more" popover (default 2) */
  maxEventsPerCell?: number
  /** Additional CSS classes */
  class?: string
  /** Fires after the visible period changes (month paging in month view; ±7 days in week view; ±1 day in day view) */
  onmonthchange?: (event: CustomEvent<{ month: Temporal.PlainDate }>) => void
  /** Fires when a day is selected via pointer or keyboard */
  ondateselect?: (event: CustomEvent<{ date: Temporal.PlainDate }>) => void
  /** Fires when an event chip is activated (pointer or keyboard) */
  oneventselect?: (event: CustomEvent<{ event: CalendarViewEvent }>) => void
  /** Fires on drag-to-edit drop (HTML DnD) or a keyboard move — the consumer owns state and re-renders from the new `start` */
  oneventmove?: (event: CustomEvent<EventMoveDetail>) => void
  /** Enable drag-to-edit via the native HTML Drag and Drop API (desktop pointer only; keyboard alternative provided) */
  dragEvents?: boolean
  /** Per-event override: set `draggable: false` to exclude a single event from drag-to-edit (e.g. read-only holiday feeds) */
  eventsDraggable?: (event: CalendarViewEvent) => boolean
  /** Connected calendars (M6 contract): each supplies fetchEvents for the visible range; results merge with `events` */
  calendars?: CalendarSource[]
  /** Expand RRULE-carrying events (e.g. from parseICal) into range-capped occurrences; off renders base instances only */
  recurrence?: boolean
  /** Fires when a connected calendar fails to fetch; other sources still render */
  oncalendarserror?: (event: CustomEvent<CalendarsErrorDetail>) => void
  /** Custom chip content; receives the raw event (see `CalendarViewEvent`) */
  eventContent?: Snippet<[CalendarViewEvent]>
}

let {
  id = crypto.randomUUID(),
  value = $bindable(null),
  month = $bindable(undefined),
  weekStart = "auto",
  locale = undefined,
  weeks = 6,
  view = "month",
  events = [],
  grouping = false,
  maxEventsPerCell = 2,
  class: className = "",
  onmonthchange,
  ondateselect,
  oneventselect,
  oneventmove,
  dragEvents = false,
  eventsDraggable,
  calendars = [],
  recurrence = false,
  oncalendarserror,
  eventContent,
  ...restProps
}: Props = $props()

/** Runtime accessor for the Temporal global (types via src/lib/temporal.d.ts). */
function temporal(): typeof Temporal {
  return (globalThis as { Temporal: typeof Temporal }).Temporal
}

/**
 * The visible month, initialized lazily to today so the component renders
 * even before Temporal polyfill consumers install their global.
 */
const effectiveMonth = $derived.by(() => {
  if (month) return month
  return temporal().Now.plainDateISO()
})

/** Effective first day of the week (resolves "auto" against the locale). */
const effectiveWeekStart = $derived(resolveWeekStart(weekStart, locale))

/**
 * The 6×7 month grid, a 1×7 week row, or a single day cell, per `view`.
 * Week/day grids reuse the month grid's day-keyed chip, drag, and popover
 * machinery — only the shape of the array changes.
 */
const grid = $derived.by(() => {
  if (view === "week") return buildWeekGrid(effectiveMonth, { weekStart: effectiveWeekStart, locale })
  if (view === "day") return [effectiveMonth]
  return buildMonthGrid(effectiveMonth, { weekStart: effectiveWeekStart, weeks, locale })
})

/** Localized weekday header labels, grid-column order. */
const headers = $derived(weekdayHeaders(effectiveWeekStart, locale))

/** Localized title: "September 2026" in month view, "Sep 14 – 20, 2026" in week view, localized full date in day view. */
const title = $derived.by(() => {
  const tag = locale ?? (typeof navigator !== "undefined" ? navigator.language : "en")
  if (view === "day") return effectiveMonth.toLocaleString(tag, { dateStyle: "full" })
  if (view === "week") {
    const start = grid[0]
    const end = grid[grid.length - 1]
    if (start.month === end.month && start.year === end.year) {
      return `${start.toLocaleString(tag, { month: "short", day: "numeric" })} – ${end.day}, ${end.year}`
    }
    return `${start.toLocaleString(tag, { month: "short", day: "numeric" })} – ${end.toLocaleString(tag, { month: "short", day: "numeric" })}${start.year !== end.year ? `, ${end.year}` : ""}`
  }
  return monthTitle(effectiveMonth, locale)
})

/** Split into weeks for role="row" rendering (1 row in week/day view). */
const rows = $derived(
  Array.from({ length: Math.ceil(grid.length / 7) }, (_, w) => grid.slice(w * 7, w * 7 + 7)),
)

/** Today as a PlainDate — marked with aria-current="date", never `new Date()`. */
const today = $derived(temporal().Now.plainDateISO())

/** Index of the focused cell (roving tabindex). Starts on today/first in-month cell. */
let focusedIndex = $state(0)

/**
 * Move the initial focus target to the first in-month cell (or the 1st)
 * once the grid content is known.
 */
$effect(() => {
  const firstInMonth = grid.findIndex((d) => d.month === effectiveMonth.month && d.year === effectiveMonth.year)
  focusedIndex = firstInMonth === -1 ? 0 : firstInMonth
})

/** The currently focused date. */
const focusedDate = $derived(grid[focusedIndex] ?? grid[0])

/** Reference to the grid element for returning focus after month paging. */
let gridElement: HTMLTableElement | undefined = $state()

/**
 * Steps the visible period forward or backward by the amount matching the
 * current `view` (±1 month / ±7 days / ±1 day), notifies the consumer, and
 * restores focus to the same positional cell in the new grid.
 * @param months - Signed number of months to move by (1 / -1)
 */
async function pageMonths(months: number): Promise<void> {
  const step = view === "week" ? { weeks: months } : view === "day" ? { days: months } : { months }
  const next = effectiveMonth.add(step)
  month = next
  focusedIndex = Math.min(focusedIndex, grid.length - 1)
  onmonthchange?.(new CustomEvent("monthchange", { detail: { month: next } }))
  await tick()
  // Re-focus the same positional cell so keyboard paging never drops focus.
  gridElement?.querySelector<HTMLElement>('[role="gridcell"] [tabindex="0"]')?.focus()
}

/**
 * Moves cell focus by the given day deltas (rows are 7 days).
 * @param days - Signed day delta from the current focus
 */
function moveFocus(days: number): void {
  const next = focusedIndex + days
  if (next >= 0 && next < grid.length) {
    focusedIndex = next
    return
  }
  // Ran off the grid edge — step the period and keep the focus position.
  void pageMonths(days > 0 ? 1 : -1)
}

/**
 * Handles keyboard activation of a focused day cell.
 * @param event - The DOM keyboard event on the grid
 */
function handleKeydown(event: KeyboardEvent): void {
  switch (event.key) {
    case "ArrowRight": moveFocus(1); break
    case "ArrowLeft": moveFocus(-1); break
    case "ArrowDown": moveFocus(7); break
    case "ArrowUp": moveFocus(-7); break
    case "Home": focusedIndex = focusedIndex - (focusedIndex % 7); break
    case "End": focusedIndex = focusedIndex - (focusedIndex % 7) + 6; break
    case "PageUp": void pageMonths(-1); break
    case "PageDown": void pageMonths(1); break
    case "Enter":
    case " ": {
      selectDate(focusedDate)
      break
    }
    default: return
  }
  event.preventDefault()
}

/**
 * Selects a date and notifies the consumer.
 * @param date - The PlainDate to select
 */
function selectDate(date: Temporal.PlainDate): void {
  value = date
  ondateselect?.(new CustomEvent("dateselect", { detail: { date } }))
}

/** True when both dates fall on the same ISO day. */
function isSameDay(a: Temporal.PlainDate, b: Temporal.PlainDate): boolean {
  return a.equals(b)
}

/** Accessible name for the grid (referenced via aria-labelledby). */
const labelId = $derived(`${id}-title`)

/** Roving tabindex: the focused cell is the only tabbable one. */
const cellTabIndex = (i: number): -1 | 0 => (i === focusedIndex ? 0 : -1)

/** Events fetched from connected `calendars` (merged with static `events`). */
let remoteEvents = $state<CalendarViewEvent[]>([])

/**
 * Connectivity lifecycle: fetches every connected calendar for the visible
 * grid range whenever the sources or the visible month change. Only the
 * latest round's results land (stale responses discarded), and per-source
 * failures surface via `oncalendarserror` without blanking the calendar.
 */
$effect(() => {
  const sources = calendars
  if (sources.length === 0) {
    remoteEvents = []
    return
  }
  const range = { start: grid[0], end: grid[grid.length - 1] }
  const run = ++calendarsRun
  connectCalendars(sources, range).then(({ events: fetched, errors }) => {
    if (run !== calendarsRun) return
    remoteEvents = fetched
    if (errors.length > 0) {
      oncalendarserror?.(new CustomEvent("calendarserror", { detail: { errors } satisfies CalendarsErrorDetail }))
    }
  })
})

/** Monotonic counter discarding stale connectivity rounds. */
let calendarsRun = 0

/**
 * Event pipeline: static `events` + fetched `calendars` events merge, then
 * recurring events expand into range-capped occurrences (`expandRecurrences`
 * reads the raw `data-rrule` parseICal attaches). Instances normalize into
 * day spans and — when `grouping` is on — merge same-real-world-event copies
 * into GroupedEvents. Instances keep their `uid`, so a recurring event still
 * groups across calendars on every occurrence.
 */
const normalized = $derived.by(() => {
  const raw = [...events, ...remoteEvents]
  const expanded = recurrence
    ? expandRecurrences(raw, { start: grid[0], end: grid[grid.length - 1] })
    : raw
  return grouping ? groupEvents(normalizeEvents(expanded)) : normalizeEvents(expanded)
})

/**
 * Sub-row lanes for multi-day spans (phase 2): per-week lane maps plus
 * the grid-wide lane count, so overlapping spans render side by side and
 * lanes stay aligned across the week row.
 */
const weekLanes = $derived(computeWeekLanes(rows, normalized))

/**
 * Looks up the events covering a grid day, split into visible chips and
 * overflow for the "+N more" popover.
 * @param day - The grid cell day
 * @returns Visible chips and the overflowed remainder
 */
function chipsFor(day: Temporal.PlainDate): { visible: NormalizedEvent[]; overflow: NormalizedEvent[] } {
  const dayEvents = eventsForDay(normalized, day)
  const visible = dayEvents.slice(0, maxEventsPerCell)
  return { visible, overflow: dayEvents.slice(maxEventsPerCell) }
}

/**
 * True when this cell is the first day of the event's span — continuation
 * cells render a compact marker instead of the full chip.
 * @param ne - The normalized event
 * @param day - The cell being rendered
 */
function isSpanStart(ne: NormalizedEvent, day: Temporal.PlainDate): boolean {
  return ne.startDay.equals(day)
}

/**
 * CSS grid placement for a lane-assigned chip: its lane row, spanning
 * the fixed slot row plus the flexible row below (see the
 * `.calendar-view-chips` styles for the lane track model). Empty string
 * for single-day chips, which stay in the normal stacked auto flow.
 * @param weekIndex - Index of the week row the cell is in
 * @param ne - The normalized event being rendered
 * @returns A `grid-row` style fragment, or ""
 */
function chipLaneStyle(weekIndex: number, ne: NormalizedEvent): string {
  const lane = weekLanes.maps[weekIndex]?.get(ne.event.id)
  if (lane === undefined) return ""
  return `grid-row: ${lane} / span 2;`
}

/**
 * Builds the chip's accessible name: title, time, and markers per the APG.
 * @param ne - The normalized event
 * @returns Accessible description, e.g. "Standup, 9:00"
 */
function chipLabel(ne: NormalizedEvent): string {
  const parts = [ne.event.title]
  if (ne.startTime) parts.push(ne.startTime)
  if (ne.event.badge !== undefined) parts.push(String(ne.event.badge))
  if (sourceCount(ne) > 1) parts.push(`shared on ${sourceCount(ne)} calendars`)
  if (ne.cancelled) parts.push("cancelled")
  return parts.join(", ")
}

/** Id of the most recently activated event (keyboard-move target). */
let selectedEventId = $state<string | undefined>(undefined)

/**
 * Notifies the consumer that an event chip was activated and marks it as
 * the keyboard-move target (arrow keys then reschedule it, when enabled).
 * @param ne - The activated event
 */
function selectEvent(ne: NormalizedEvent): void {
  selectedEventId = ne.event.id
  oneventselect?.(new CustomEvent("eventselect", { detail: { event: ne.event } }))
}

/**
 * Keyboard drag alternative on a focused chip: once activated (Enter/Space
 * selects it), arrow keys reschedule it by day/week. DnD is pointer-only,
 * so this must exist — the pointer path can never be the only one.
 * @param ne - The chip's event
 * @param e - The keyboard event on the chip button
 */
function handleChipKeydown(ne: NormalizedEvent, e: KeyboardEvent): void {
  if (e.key === "Escape") {
    selectedEventId = undefined
    return
  }
  if (!dragEvents || selectedEventId !== ne.event.id) return
  if (eventsDraggable && !eventsDraggable(ne.event)) return
  const deltas: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }
  const delta = deltas[e.key]
  if (delta === undefined) return
  e.preventDefault()
  e.stopPropagation()
  moveEventByDays(ne, delta)
}

/** Id of the event being dragged (HTML DnD data transfer), if any. */
let draggingId = $state<string | undefined>(undefined)

/** ISO day string of the cell currently hovered as a drop target, if any. */
let dragOverDay = $state<string | undefined>(undefined)

/**
 * Starts a chip drag (HTML DnD). Only enabled when `dragEvents` is set and
 * the chip is its span's start cell (continuation markers are not movable).
 * @param ne - The event being dragged
 * @param isStart - Whether this chip is the span's first day
 * @param e - The dragstart event
 */
function handleDragStart(ne: NormalizedEvent, isStart: boolean, e: DragEvent): void {
  if (!dragEvents || !isStart) return
  if (eventsDraggable && !eventsDraggable(ne.event)) return
  draggingId = ne.event.id
  e.dataTransfer?.setData("text/plain", ne.event.id)
  if (e.dataTransfer) e.dataTransfer.effectAllowed = "move"
}

/**
 * Resolves the PlainDate a drop-target cell represents (grid cells carry
 * `data-day` so the lookup never depends on DOM structure).
 * @param target - The event target or one of its ancestors
 * @returns The cell's date, or undefined outside the grid
 */
function dayFromCell(target: EventTarget | null): Temporal.PlainDate | undefined {
  const cell = (target as HTMLElement | null)?.closest?.("[data-day]")
  const iso = cell?.getAttribute("data-day")
  return iso ? temporal().PlainDate.from(iso) : undefined
}

/**
 * Highlights the hovered drop cell (dragover must be cancelled to allow a
 * drop per the HTML DnD spec).
 * @param e - The dragover event on a day cell
 */
function handleDragOver(e: DragEvent): void {
  if (!draggingId) return
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = "move"
  dragOverDay = dayFromCell(e.target)?.toString()
}

/**
 * Accepts the drop: resolves the target day and fires `oneventmove` so the
 * consumer updates the event's `start` (the component never owns state).
 * @param e - The drop event on a day cell
 */
function handleDrop(e: DragEvent): void {
  const to = dayFromCell(e.target)
  const id = draggingId
  draggingId = undefined
  dragOverDay = undefined
  if (!to || !id) return
  const ne = normalized.find((n) => n.event.id === id)
  if (!ne) return
  fireMove(ne, to)
}

/**
 * Fires the `eventmove` callback with the event's current start day.
 * @param ne - The normalized event being moved
 * @param to - The new start day
 */
function fireMove(ne: NormalizedEvent, to: Temporal.PlainDate): void {
  oneventmove?.(new CustomEvent("eventmove", { detail: { event: ne.event, from: ne.startDay, to } satisfies EventMoveDetail }))
}

/**
 * Keyboard drag alternative: moves the most recently activated event by a
 * signed day delta (never the only editing path — DnD is pointer-only).
 * @param ne - The event to move
 * @param days - Signed day delta
 */
function moveEventByDays(ne: NormalizedEvent, days: number): void {
  fireMove(ne, ne.startDay.add({ days }))
}

/**
 * Resolves the chip color: the event's own color wins, then falls back to
 * the primary token via CSS custom property (dynamic data, not a theme
 * token — the one sanctioned inline style per design §6).
 * @param ne - The normalized event
 * @returns The CSS value for --event-color
 */
function chipColor(ne: NormalizedEvent): string {
  return ne.event.color ?? "var(--color-primary)"
}
</script>

<div class="calendar-view {className}" data-testid="calendar-view">
  <div class="calendar-view-header">
    <button
      type="button"
      class="calendar-view-nav"
      data-testid="calendar-view-prev"
      aria-label={view === "month" ? "Previous month" : view === "week" ? "Previous week" : "Previous day"}
      onclick={() => pageMonths(-1)}
    >
      <Icon name="tabler:chevron-left" class="w-4 h-4" />
    </button>
    <h2 id={labelId} class="calendar-view-title" aria-live="polite">{title}</h2>
    <button
      type="button"
      class="calendar-view-nav"
      data-testid="calendar-view-next"
      aria-label={view === "month" ? "Next month" : view === "week" ? "Next week" : "Next day"}
      onclick={() => pageMonths(1)}
    >
      <Icon name="tabler:chevron-right" class="w-4 h-4" />
    </button>
  </div>

  <table
    {...restProps}
    {id}
    class="calendar-view-grid"
    role="grid"
    aria-labelledby={labelId}
    bind:this={gridElement}
    onkeydown={handleKeydown}
  >
    <thead>
      <tr>
        {#each headers as label (label)}
          <th scope="col" role="columnheader" class="calendar-view-weekday" abbr={label}>{label}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as week, w (week[0].toString())}
        {@const weekIndex = w}
        <tr>
          {#each week as day, d (day.toString())}
            {@const index = w * 7 + d}
            {@const inMonth = day.month === effectiveMonth.month && day.year === effectiveMonth.year}
            {@const selected = value !== null && isSameDay(day, value)}
            {@const isToday = isSameDay(day, today)}
            <td
              role="gridcell"
              class="calendar-view-cell"
              class:calendar-view-outside={!inMonth}
              class:calendar-view-selected={selected}
              class:calendar-view-droptarget={dragOverDay === day.toString()}
              aria-selected={selected}
              data-day={day.toString()}
              ondragover={handleDragOver}
              ondragleave={() => {
                if (dragOverDay === day.toString()) dragOverDay = undefined
              }}
              ondrop={handleDrop}
            >
              <button
                type="button"
                tabindex={cellTabIndex(index)}
                class="calendar-view-day"
                aria-current={isToday ? "date" : undefined}
                onclick={() => selectDate(day)}
                data-testid={`calendar-view-day-${day.toString()}`}
              >
                {day.day}
              </button>
              <div class="calendar-view-cellbody" style={`--lane-count: ${weekLanes.count};`}>
              {#if chipsFor(day).visible.length > 0 || chipsFor(day).overflow.length > 0}
                {@const chips = chipsFor(day)}
                <div class="calendar-view-chips">
                  {#each chips.visible as ne (ne.event.id)}
                    {@const start = isSpanStart(ne, day)}
                    <button
                      type="button"
                      class="calendar-view-chip"
                      class:calendar-view-chip-cancelled={ne.cancelled}
                      class:calendar-view-chip-continuation={!start}
                      class:calendar-view-chip-dragging={draggingId === ne.event.id}
                      class:calendar-view-chip-movable={dragEvents && start && selectedEventId === ne.event.id}
                      style={`--event-color: ${chipColor(ne)}; ${chipLaneStyle(w, ne)}`}
                      aria-label={chipLabel(ne)}
                      title={ne.event.title}
                      draggable={dragEvents && start && (eventsDraggable?.(ne.event) ?? true)}
                      data-testid={`calendar-view-event-${ne.event.id}`}
                      onclick={(e) => {
                        e.stopPropagation()
                        selectEvent(ne)
                      }}
                      ondragstart={(e) => handleDragStart(ne, start, e)}
                      ondragend={() => {
                        draggingId = undefined
                        dragOverDay = undefined
                      }}
                      onkeydown={(e) => handleChipKeydown(ne, e)}
                    >
                      {#if eventContent}
                        {@render eventContent(ne.event)}
                      {:else}
                        {#if start}
                          {#if ne.event.icon || ne.event.recurring}
                            <span class="calendar-view-chip-icon"><Icon name={ne.event.icon ?? "repeat"} /></span>
                          {/if}
                          {#if !ne.allDay && ne.startTime}
                            <span class="calendar-view-chip-time">{ne.startTime}</span>
                          {/if}
                          <span class="calendar-view-chip-title" class:line-through={ne.cancelled}>{ne.event.title}</span>
                          {#if ne.event.badge !== undefined}
                            <span class="calendar-view-chip-badge">{ne.event.badge}</span>
                          {/if}
                          {#if sourceCount(ne) > 1}
                            <span class="calendar-view-chip-dots" aria-hidden="true">
                              {#each sourceColors(ne) as dotColor, di (di)}
                                <span class="calendar-view-chip-dot" style="--dot-color: {dotColor}"></span>
                              {/each}
                            </span>
                            <span class="calendar-view-chip-badge calendar-view-chip-badge-count" data-testid={`calendar-view-group-count-${ne.event.id}`}>{sourceCount(ne)}</span>
                          {/if}
                        {:else}
                          <span class="calendar-view-chip-title">↔ {ne.event.title}</span>
                        {/if}
                      {/if}
                    </button>
                  {/each}
                  {#if chips.overflow.length > 0}
                    <button
                      type="button"
                      popoverTarget={`${id}-more-${day.toString()}`}
                      class="calendar-view-more"
                      data-testid={`calendar-view-more-${day.toString()}`}
                    >
                      +{chips.overflow.length}
                    </button>
                    <div
                      popover="auto"
                      id={`${id}-more-${day.toString()}`}
                      class="calendar-view-popover"
                    >
                      <ul class="calendar-view-popover-list">
                        {#each chips.overflow as ne (ne.event.id)}
                          <li>
                            <button
                              type="button"
                              class="calendar-view-chip"
                              class:calendar-view-chip-cancelled={ne.cancelled}
                              style="--event-color: {chipColor(ne)}"
                              data-testid={`calendar-view-popover-event-${ne.event.id}`}
                              onclick={() => selectEvent(ne)}
                            >
                              {#if ne.event.icon || ne.event.recurring}
                                <span class="calendar-view-chip-icon"><Icon name={ne.event.icon ?? "repeat"} /></span>
                              {/if}
                              {#if !ne.allDay && ne.startTime}
                                <span class="calendar-view-chip-time">{ne.startTime}</span>
                              {/if}
                              <span class="calendar-view-chip-title">{ne.event.title}</span>
                              {#if sourceCount(ne) > 1}
                                <span class="calendar-view-chip-dots" aria-hidden="true">
                                  {#each sourceColors(ne) as dotColor, di (di)}
                                    <span class="calendar-view-chip-dot" style="--dot-color: {dotColor}"></span>
                                  {/each}
                                </span>
                                <span class="calendar-view-chip-badge calendar-view-chip-badge-count" data-testid={`calendar-view-group-count-${ne.event.id}`}>{sourceCount(ne)}</span>
                              {/if}
                            </button>
                          </li>
                        {/each}
                      </ul>
                    </div>
                  {/if}
                </div>
              {/if}
              </div>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  <span class="sr-only" aria-live="polite" data-testid="calendar-view-live">
    {title}, {focusedDate.toString()}
  </span>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .calendar-view {
    @apply w-full max-w-sm inline-block;
  }

  .calendar-view-header {
    @apply flex items-center justify-between mb-2;
  }

  .calendar-view-title {
    @apply text-sm font-semibold text-text dark:text-text;
  }

  .calendar-view-nav {
    @apply p-1 rounded text-muted dark:text-muted hover:bg-surface dark:hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary;
  }

  .calendar-view-grid {
    @apply w-full border-collapse;
  }

  .calendar-view-weekday {
    @apply text-xs font-medium text-muted dark:text-muted text-center py-1;
  }

  .calendar-view-cell {
    @apply text-center p-0;
  }

  .calendar-view-outside .calendar-view-day {
    @apply text-muted dark:text-muted opacity-40;
  }

  .calendar-view-selected {
    @apply bg-primary-100 dark:bg-primary-900;
  }

  .calendar-view-day {
    @apply w-9 h-9 rounded-full text-sm text-text dark:text-text hover:bg-surface dark:hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary;
  }

  .calendar-view-selected .calendar-view-day {
    @apply font-semibold;
  }

  /* Per-cell body: the day number flows normally; the chips area below
   * reserves `--lane-count` uniform slot rows so multi-day lanes align
   * horizontally across the week row (single-day chips pack after them). */
  .calendar-view-cellbody {
    @apply flex flex-col;
    min-height: calc(20px * var(--lane-count, 0) + var(--lane-count, 0) * 1px);
  }

  /* Chips area: a CSS grid whose first N rows are the lane tracks
   * (20px each), followed by one auto row where non-lane (single-day)
   * chips stack. Lane chips are placed with inline `grid-row`. */
  .calendar-view-chips {
    @apply grid items-start gap-px px-0.5 pb-0.5;
    grid-template-rows: repeat(var(--lane-count, 0), 20px) auto;
    grid-auto-flow: row;
  }

  .calendar-view-chip {
    @apply flex items-center gap-1 min-w-0 w-full text-start text-[10px] leading-tight rounded px-1 py-0.5
      bg-(--event-color)/15 text-text dark:text-text hover:bg-(--event-color)/25
      focus:outline-none focus-visible:ring-2 focus-visible:ring-(--event-color);
    border-inline-start: 2px solid var(--event-color);
  }

  .calendar-view-chip-icon {
    @apply w-3 h-3 shrink-0 text-(--event-color);
  }

  .calendar-view-chip-time {
    @apply shrink-0 tabular-nums text-muted dark:text-muted;
  }

  .calendar-view-chip-title {
    @apply truncate;
  }

  .calendar-view-chip-badge {
    @apply shrink-0 text-[9px] font-semibold rounded-full bg-(--event-color)/30 px-1;
  }

  /* Source-count badge on grouped chips — solid event color for contrast with the event's own badge. */
  .calendar-view-chip-badge-count {
    @apply bg-(--event-color) text-white;
  }

  /* Per-source color-dot cluster (decorative; the count badge carries the meaning). */
  .calendar-view-chip-dots {
    @apply shrink-0 flex items-center;
  }

  .calendar-view-chip-dot {
    @apply w-1.5 h-1.5 rounded-full;
    background: var(--dot-color);
    margin-inline-start: -3px;
  }

  .calendar-view-chip-cancelled {
    @apply opacity-60;
  }

  /* Drop-target highlight during an active drag (HTML DnD). */
  .calendar-view-droptarget {
    @apply ring-2 ring-inset ring-primary;
  }

  /* The chip currently being dragged. */
  .calendar-view-chip-dragging {
    @apply opacity-40;
  }

  /* The activated chip arrow keys will move (keyboard drag alternative). */
  .calendar-view-chip-movable {
    @apply cursor-move;
  }

  .calendar-view-chip-continuation {
    @apply italic text-muted dark:text-muted;
  }

  .calendar-view-more {
    @apply text-start text-[10px] font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1;
  }

  .calendar-view-popover {
    @apply p-2 rounded-lg border border-surface bg-background text-text dark:bg-background shadow-lg
      open:fixed open:inset-auto open:mt-1;
  }

  .calendar-view-popover-list {
    @apply flex flex-col gap-1 m-0 p-0 list-none min-w-36;
  }
</style>
