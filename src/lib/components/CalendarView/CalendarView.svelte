<!--
@component
CalendarView - A full calendar view built on the native Temporal API.

Renders a month grid (6 weeks × 7 days) with ARIA grid semantics, roving
-tabindex keyboard navigation, and month paging. Events, grouping, import,
and drag-to-edit land in later milestones (see docs/plans/CALENDARVIEW_DESIGN.md).

Requires native Temporal (Chrome/Edge 131+). Consumers targeting older
browsers can install `@js-temporal/polyfill` themselves (first import of
their app entry) — Twintrinsic ships no polyfill.

Usage:
```svelte
<CalendarView bind:value={selectedDate} />

<CalendarView
  month={visibleMonth}
  onmonthchange={(e) => console.log(e.detail.month)}
  weekStart={0}
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
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for the grid element", default: "crypto.randomUUID()", optional: true },
  { name: "onmonthchange", type: "(event: CustomEvent<{ month: Temporal.PlainDate }>) => void", description: "Fires after the visible month changes", optional: true, eventDetail: "{ month: Temporal.PlainDate }" },
  { name: "ondateselect", type: "(event: CustomEvent<{ date: Temporal.PlainDate }>) => void", description: "Fires when a day is selected via pointer or keyboard", optional: true, eventDetail: "{ date: Temporal.PlainDate }" },
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
import { buildMonthGrid, monthTitle, resolveWeekStart, weekdayHeaders, type WeekStart } from "../../helpers/calendarGrid.js"

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
  /** Additional CSS classes */
  class?: string
  /** Fires after the visible month changes */
  onmonthchange?: (event: CustomEvent<{ month: Temporal.PlainDate }>) => void
  /** Fires when a day is selected via pointer or keyboard */
  ondateselect?: (event: CustomEvent<{ date: Temporal.PlainDate }>) => void
}

let {
  id = crypto.randomUUID(),
  value = $bindable(null),
  month = $bindable(undefined),
  weekStart = "auto",
  locale = undefined,
  weeks = 6,
  class: className = "",
  onmonthchange,
  ondateselect,
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

/** The 6×7 grid of PlainDates covering the visible month. */
const grid = $derived(buildMonthGrid(effectiveMonth, { weekStart: effectiveWeekStart, weeks, locale }))

/** Localized weekday header labels, grid-column order. */
const headers = $derived(weekdayHeaders(effectiveWeekStart, locale))

/** Localized "September 2026" title for the visible month. */
const title = $derived(monthTitle(effectiveMonth, locale))

/** Split into weeks for role="row" rendering. */
const rows = $derived(
  Array.from({ length: weeks }, (_, w) => grid.slice(w * 7, w * 7 + 7)),
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
 * Changes the visible month, notifies the consumer, and restores focus to
 * the same week/day position in the new grid (clamped to the grid length).
 * @param months - Number of months to move by (negative = backwards)
 */
async function pageMonths(months: number): Promise<void> {
  const next = effectiveMonth.add({ months })
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
  // Ran off the grid edge — page the month and keep the focus position.
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
</script>

<div class="calendar-view {className}" data-testid="calendar-view">
  <div class="calendar-view-header">
    <button
      type="button"
      class="calendar-view-nav"
      data-testid="calendar-view-prev"
      aria-label="Previous month"
      onclick={() => pageMonths(-1)}
    >
      <Icon name="tabler:chevron-left" class="w-4 h-4" />
    </button>
    <h2 id={labelId} class="calendar-view-title" aria-live="polite">{title}</h2>
    <button
      type="button"
      class="calendar-view-nav"
      data-testid="calendar-view-next"
      aria-label="Next month"
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
              aria-selected={selected}
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
</style>
