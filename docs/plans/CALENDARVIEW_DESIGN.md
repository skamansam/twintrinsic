# CalendarView — Design Note

> Design for plan item **11.1** in `FEEDBACK_RESOLUTION_PLAN.md` (P1, ⬜ Planned).
> Status: **Final** — open questions resolved 2026-09-17. Owner: TBD.
> Companion rename: existing `Form/Calendar.svelte` → **CalendarInput**.
> Policy: **native APIs only** — Twintrinsic ships zero polyfills; browser-support
> gaps (Temporal, `Intl.Locale.weekInfo`) are documented so consumers can fill them.

---

## 0. Calendar → CalendarInput rename (pre-requisite)

The current `src/lib/components/Form/Calendar.svelte` is a thin, accessible
wrapper around native `<input type="date">` — a *picker*, not a *view*. It
keeps that role under the new name:

| Artifact | Change |
|---|---|
| `src/lib/components/Form/Calendar.svelte` | Rename file+component to `CalendarInput.svelte` |
| `package.json` subpath | `./components/Calendar` → `./components/CalendarInput`; keep `./components/Calendar` pointing at the new **CalendarView** |
| `src/lib/index.ts` | `Calendar` → `CalendarInput` export + add `CalendarView` |
| `stories/Calendar.stories.js` | Rename to `CalendarInput.stories.js`; new `CalendarView.stories.svelte` |
| `tests/unit/Calendar.test.ts`, `tests/e2e/Calendar.test.js` | Rename to `CalendarInput.*`; new `CalendarView.*` |
| Docs route | `docs/components/Form/Calendar` → `docs/components/Form/CalendarInput` (+ redirect stub per the 1.8 convention); new `docs/components/CalendarView/CalendarView` |
| Messages | New keys in `messages/{en,es,fa}.json`; recompile Paraglide; regenerate `llms.txt` |

`CalendarInput` behavior is unchanged — this is a mechanical rename plus
docs/redirect work.

---

## 1. Temporal date model

### Why Temporal

`Date` cannot answer any question a calendar needs without a library:
month arithmetic across DST, weeks per locale, "same instant" comparisons
across time zones, or date-only values (no midnight trap). Temporal gives
us all of it natively. Per `CONSOLIDATED_PLAN.md`, native support is
Chrome/Edge 131+ but not yet universal — **we code against the native API
and document the polyfill as a consumer opt-in** (see the consumer note
under Shared helpers below).

### Runtime support (no polyfill shipped)

Twintrinsic installs **no polyfill and no date library** — zero new
dependencies. The component targets native Temporal directly and treats
`Temporal` as a global, typed via a local ambient declaration:

```ts
// src/lib/temporal.d.ts — types only, no runtime import
/// <reference types="@js-temporal/polyfill" />
```

That reference is dev-dependency-only (types for the editor); it
contributes nothing to the bundle. When Temporal support is universal,
the only cleanup is deleting the declaration file.

### The three types, and when each is used

| Type | Used for | Serializes as |
|---|---|---|
| `Temporal.PlainDate` | All-day events, the selected day, grid cells | `2026-09-17` |
| `Temporal.PlainDateTime` | Timed events with no time zone (imported .ics floating times) | `2026-09-17T14:00:00` |
| `Temporal.ZonedDateTime` | Timed events from external calendars (Google/Outlook/CalDAV always send absolute instants + tz) | `2026-09-17T14:00:00[Europe/Berlin]` |

**Normalization rule (the one rule that keeps the grid correct):** every
event is normalized at the boundary into `{ startDay: PlainDate, endDay:
PlainDate, startTime?: PlainTime, endTime?: PlainTime }`.

- `PlainDate` → itself.
- `PlainDateTime` → its date part (the view is day-based; tz-less times
  render as-is).
- `ZonedDateTime` → `.toPlainDate()` — **the date in the event's own time
  zone**, not the viewer's. A 23:30 Los Angeles meeting is *September 16
  in LA* even for a Berlin viewer; grouping and grid placement must agree
  with the source calendar.

### Shared helpers (`src/lib/helpers/`)

Per-file modules, imported relatively inside components, `.js` extensions
(same conventions as `itemLabel.ts`):

```
src/lib/helpers/
  calendarGrid.ts       // buildMonthGrid(), weekdayHeaders() — native Temporal only
  eventNormalize.ts     // toInterval(event): { startDay, endDay, startTime?, endTime? }
  eventGroup.ts         // groupEvents(events, { grouping }): GroupedEvent[]
```

All helpers read `Temporal` as a **global** (typed by
`src/lib/temporal.d.ts`) — there is no import site to swap and nothing to
rewrite when the polyfill era ends.

**Consumer polyfill note (docs requirement).** The component and its docs
page must carry a **Browser support** callout — which plan item **11.3**
generalizes site-wide as a badge beside the page title with a tooltip
naming the polyfill. CalendarView requires
**native Temporal** (Chrome/Edge 131+; check current Baseline status when
shipping), and consumers targeting older browsers install the polyfill
themselves — typically as the first import of their app entry or layout:

```ts
// consumer's app entry — their choice, their bundle
import "@js-temporal/polyfill";
```

The polyfill only defines `Temporal` where the runtime lacks it, so it is
a no-op on evergreen browsers. Twintrinsic never imports it, never
installs it, and does not global-patch anything.

---

## 2. Month grid algorithm

A month grid is **42 `PlainDate`s, no `Date`, no loops over days-as-ints**.
All arithmetic is calendar-aware by construction (Temporal knows months
have different lengths and that `dayOfWeek` is ISO Mon=1…Sun=7).

```ts
// Temporal is a typed global (src/lib/temporal.d.ts) — no import, no polyfill.

/** Options for buildMonthGrid. */
interface GridOptions {
  /** 0 = Sunday … 6 = Saturday. `"auto"` = derive from the Temporal locale. */
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | "auto";
}

/**
 * Build a 6×7 grid of PlainDates covering `month`, starting on `weekStart`.
 * Trailing cells always run into the next month; the grid is exactly 42
 * cells so CSS rows never reflow between months.
 */
function buildMonthGrid(
  month: Temporal.PlainDate,            // any date inside the target month
  { weekStart = "auto" }: GridOptions = {},
): Temporal.PlainDate[] {
  // "auto": Intl.Locale.prototype.weekInfo.firstDay where available
  // (Chromium 131+/Safari 18.4+); ISO Monday fallback elsewhere.
  const start = weekStart === "auto" ? localeFirstDay() : weekStart;
  const first = month.with({ day: 1 });
  // Days to step back from the 1st to reach the configured week start.
  // ISO dayOfWeek is Mon=1..Sun=7; map into weekStart space and shift.
  const back = (first.dayOfWeek - 1 - start + 7) % 7;
  const gridStart = first.subtract({ days: back });
  return Array.from({ length: 42 }, (_, i) => gridStart.add({ days: i }));
}
```

Details that matter:

- **`weekStart` default: derive from locale (`"auto"`).**
  `new Intl.Locale(navigator.language).weekInfo?.firstDay` where available
  (Chromium 131+/Safari 18.4+); **ISO Monday fallback** where absent
  (Firefox) — resolved decision #2. The prop overrides the locale.
- **42 fixed cells** (6 rows × 7) — simplifies CSS (`grid-rows-6`), e2e
  selectors, and keyboard End-key math. Some months leave a fully-bleed
  final row; that row is hidden with CSS (`:has()` on the row container
  when all cells are out-of-month) rather than variable grid sizes.
- **Month paging** is `month.add({ months: 1 })` / `.subtract({ months: 1 })`
  — `PlainDate.add` clamps correctly across 28/30/31-day months. Never
  `setMonth()`.
- **"Today"** is `Temporal.Now.plainDateISO()` and is marked
  `aria-current="date"` — never `new Date()`.
- **Week view** (phase 2) = one row of the same algorithm; **day view**
  (phase 2) = a single column, timed events listed with `PlainTime`s.

---

## 3. Event model

### Component-facing event shape

ISO strings are accepted anywhere a Temporal type appears, so consumers
backed by JSON APIs never import Temporal to feed us:

```ts
type CalendarInstant =
  | Temporal.PlainDate
  | Temporal.PlainDateTime
  | Temporal.ZonedDateTime
  | string;                       // ISO 8601: "2026-09-17" | "2026-09-17T14:00" | …Z[+tz]

/** One event as passed in via the `events` prop. */
interface CalendarViewEvent {
  /** Stable identity within one calendar source. */
  id: string
  /** Event title. Rendered in the cell; announced to AT. */
  title: string
  /** Start (required) and end (optional) instants. */
  start: CalendarInstant
  end?: CalendarInstant
  /** All-day events render without a time and span cells. Default: inferred (PlainDate start → true). */
  allDay?: boolean
  /** Which connected calendar this came from (matches `calendars[].id`). */
  calendarId?: string
  /** iCalendar UID — the cross-calendar dedup key for grouping. */
  uid?: string
  /** Visual markers (see §3 of plan 11.1). */
  color?: string          // falls back to the calendar's color
  icon?: string           // icon name rendered via the shared Icon component (Chip convention)
  badge?: string | number // small badge next to the title
  status?: "confirmed" | "tentative" | "cancelled"
  /** Free-form metadata for snippet consumers. */
  location?: string
  description?: string
  [key: `data-${string}`]: unknown
}
```

### Grouping — the headline feature

`groupEvents(events, { grouping })` in `eventGroup.ts`:

1. **Dedup key**: `uid` when present (the iCalendar UID that Google /
   Outlook / CalDAV preserve across attendees' calendars). Fallback key:
   `title + startDay + startTime` — deterministic but documented as
   best-effort (renamed meetings won't merge).
2. A **`GroupedEvent`** keeps `sources: CalendarViewEvent[]` (one per
   contributing calendar, ordered by `calendars` order) and a **primary**
   (first source) that supplies title/time/content.
3. **`grouping` prop** (`boolean`, default `false`): off → every source
   event renders separately (today's behavior); on → one visual event
   with a **source-count badge** rendered via the shared `Badge`
   component, plus per-source color dots.
4. Cancelled-status events (any source) surface the `cancelled` status on
   the grouped event with strikethrough styling — never silently dropped.

### Multi-day placement

`eventNormalize.ts` expands each event into per-cell spans; an event
covering N days occupies the leading cell's track and continues with
`↔` continuation chips on subsequent days (phase 2: CSS grid sub-row
lanes à la FullCalendar; phase 1 accepts stacked chips).

---

## 4. Import & connectivity

**Architecture decision: the component consumes plain data.** Fetching
Google/Microsoft/Apple data requires OAuth secrets and is blocked by CORS
in-browser; it belongs in the consumer's server. CalendarView ships the
**contract + client-side parsers**, not network calls:

```ts
/** Consumer-implemented source descriptor; `fetchEvents` runs server-side. */
interface CalendarSource {
  /** Stable id referenced by `CalendarViewEvent.calendarId`. */
  id: string
  /** Display name (legend, grouping tooltip). */
  name: string
  /** CSS color (Tailwind theme token, hex, or var()). */
  color: string
  /** Fetch events for the visible range. Called per month/page change. */
  fetchEvents(range: { start: Temporal.PlainDate; end: Temporal.PlainDate }): Promise<CalendarViewEvent[]>
}
```

| Capability | Approach |
|---|---|
| **iCalendar (.ics) import** | `parseICal(text, { defaultTz }): CalendarViewEvent[]` in `src/lib/helpers/` — VEVENT, UID, SUMMARY, DTSTART/DTEND (DATE vs DATE-TIME, TZID, VALUE=DATE), STATUS, DESCRIPTION, LOCATION. Ships phase 1. |
| **Google export** | Google's .ics export *is* iCalendar → same parser. CSV export gets `parseGoogleCsv()` in phase 2. |
| **Recurrence (RRULE)** | Phase 2. Phase 1 renders only the base instance and marks `recurring: true` (icon marker). Expansion via an RFC 5545 helper lib, expansion capped at the visible range. |
| **Google Calendar API** | Adapter doc example: server endpoint → `fetchEvents()`; client passes `{ id, name, color, fetchEvents }`. |
| **Microsoft Outlook/365** | Same pattern via Graph API `/me/calendarview`. |
| **Apple** | CalDAV server-side, or (zero-auth) published **iCal subscription URLs** fetched server-side and fed through the same .ics parser. |

Phase 1 "connectivity" = the `calendars` prop + .ics parsing + the doc
recipe for Google/Outlook/Apple. The grouping feature is fully exercisable
with static multi-source data, which is also how tests and stories demo it.

---

## 5. Component API (no polyfill shipped)

```svelte
<CalendarView
  bind:value={selectedDate}
  month={visibleMonth}
  onmonthchange={(e) => e.detail.month}
  events={events}
  calendars={sources}
  grouping={true}
  weekStart="auto"          // 0–6 | "auto"
  view="month"              // "month" | "week" | "day" (week/day: phase 2)
  showWeekNumbers={false}
  maxEventsPerCell={3}
  oneventselect={(e) => e.detail.event}
  ondateselect={(e) => e.detail.date}
>
  {#snippet eventContent(event)}
    <span>{event.title}</span>
  {/snippet}
</CalendarView>
```

- **Data-driven first** (`events` + `calendars` props) — consistent with
  the 10.6 data-driven-API direction. No CalendarEvent sub-component.
- `eventContent` snippet receives the (grouped) event; `icon`/`badge`/
  `color`/`status` render automatically when no snippet is given.
- Callback props, not `createEventDispatcher` (Svelte 5 convention).
- `propsMetadata` exported for the PropsTable, rest props with
  `data-*`/`aria-*` index signatures spread on the root (App-level grid).
- `bind:value` is the *selected* day (`PlainDate | null`); `month` +
  `onmonthchange` control the visible page (uncontrolled when `bind` is
  omitted — Svelte 5 `$bindable`).
- File layout: `src/lib/components/CalendarView/CalendarView.svelte`
  (+ `CalendarGrid.svelte`, `CalendarEventChip.svelte` as private, relatively-imported internals; no new barrel).

---

## 6. Rendering & CSS

- **CSS grid over JS positioning**: root `grid grid-cols-7`, rows
  `grid-rows-6` (month) — cell membership is DOM order, zero absolute
  positioning.
- Tailwind classes in markup; theme colors via `@theme` tokens
  (`--color-primary` etc.) in `lib/twintrinsic.css`; per-calendar colors
  via inline `style="--event-color: {color}"` + `bg-(--event-color)/15`
  utilities (the one sanctioned inline style, since colors are dynamic
  data, not design tokens).
- Cell overflow: show `maxEventsPerCell`, remainder as **"+N more"**
  opening a `popover` (Popover API — matches Tooltip/Toast patterns) so
  nothing is keyboard-inaccessible.
- Out-of-month cells dimmed (`opacity-40`), still focusable for natural
  arrow-key traversal.

---

## 7. Accessibility (WAI-ARIA APG "Grid" pattern)

- Root `role="grid"` + `aria-label` (month name); `role="row"` per week;
  day cells `role="gridcell"` with `aria-selected`, `aria-current="date"`.
- Weekday header row: `role="row"` with `role="columnheader"` `abbr` for
  the full weekday name.
- **Keyboard** (roving tabindex, one cell tabbable): ← → ↑ ↓ move by
  day/week · Home/End start/end of week · PageUp/PageDown ±1 month ·
  Enter/Space select · the focused cell scrolls into view on focus.
- Event chips are buttons **inside** gridcells (grid cells themselves are
  not buttons — keeps the APG grid focus model intact); each chip's
  accessible name = `title, time, calendar name, badge count`
  (e.g. "Standup, 9:00, Work calendar, 3 people").
- Month/page changes announced via a visually-hidden `aria-live="polite"`
  region ("September 2026, 12 events").
- Grouped events announce the source count, not just the badge number.

---

## 8. Milestones (maps to plan Phase 7)

| # | Deliverable | Includes |
|---|---|---|
| 1 | **CalendarInput rename** ✅ | §0 table, zero behavior change, docs redirect, e2e/unit/story renames green |
| 2 | **Month grid MVP** ✅ | `calendarGrid` helpers (native Temporal global + `temporal.d.ts`) with unit tests; ARIA grid + roving-tabindex keyboard nav, paging, today/selection, live region; docs page + i18n + e2e; **no polyfill installed** |
| 3 | **Events** ✅ | `eventNormalize`, static `events` render, chips with icon/badge/color/status, `eventContent` snippet, `+N more` popover |
| 4 | **Grouping** ✅ | `eventGroup` (uid key → fallback key), count badge, color dots, `grouping` toggle demo with two fake calendars |
| 5 | **Import** ✅ | `parseICal` (+ tests with real Google-export samples), recurring-flag marker |
| 6 | **Connectivity recipe** ✅ | `connectCalendars` helper (calendars/fetchEvents contract, Promise.allSettled per-source failures, calendarId stamping, color fallback); `calendars` + `oncalendarserror` wired into CalendarView; Google/Outlook/Apple docs recipes — `week`/`day` views and RRULE expansion deferred (phase 2) |
| 7 | **Drag-to-edit** | `draggable` events + cell `dragover`/`drop` (HTML DnD API), `oneventmove` callback, keyboard-editing alternative, e2e drag test |
| 8 | **Checklist close-out** ✅ | Storybook story (11 stories incl. DragToEdit + Connectivity), docs page (i18n en/es/fa), e2e (render, keyboard, grouping toggle, drag keyboard-move, connectivity fetch, badge row), `check`/`check:i18n`/`check:assets` green, completion page updated (+DnD, +Popover) |

## Resolved decisions (2026-09-17)

1. **RRULE expansion — deferred to milestone 6.** Milestone 5 ships .ics
   parsing with recurring events marked (`recurring: true` + icon marker,
   base instance only). Grouping and import don't need expansion, and a
   correct RRULE engine deserves its own reviewed milestone.
2. **`weekStart: "auto"` falls back to ISO Monday** where
   `Intl.Locale.prototype.weekInfo` is missing (currently Firefox).
   Consumers override with `weekStart={0}` or `{1}` — the prop is the
   documented remedy, so no locale→firstDay lookup table ships. The docs
   **Browser support** callout lists `weekInfo` alongside Temporal.
3. **Event editing (drag to reschedule) is IN scope, via the native HTML Drag and Drop API** — no pointer-event framework, no library. Events are `draggable` (mouse) with a **keyboard-editing alternative** (select event → Enter opens an editor / arrow keys move by day — DnD is pointer-only and must never be the only path); `dragover` on cells is handled to highlight drop targets and compute the target `PlainDate`; `drop` moves the event's `start` by the day delta, routing through a new `oneventmove` callback (`{ event, from, to }`) so the consumer owns state. Limits documented: HTML DnD has no touch support (desktop-only) and cannot resize event durations — resizing would need pointer events, explicitly out of 11.1 scope.

**Finalized:** the design is ready for milestone 1 (CalendarInput rename).
The no-polyfill policy is reflected throughout: zero runtime dependencies,
`Temporal` as a typed global, and a required **Browser support** consumer
note in the docs page.
