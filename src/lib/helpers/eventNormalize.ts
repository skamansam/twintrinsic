/**
 * Event normalization for CalendarView (plan item 11.1, milestone 3) —
 * built exclusively on the native Temporal API (typed global; see
 * `src/lib/temporal.d.ts`). No `Date`, no date libraries, no polyfill
 * shipped by Twintrinsic.
 *
 * Consumers pass events with ISO 8601 strings so JSON-API-backed apps
 * never need to import Temporal; every instant is normalized to the
 * **day in the event's own time zone** — a 23:30 Los Angeles meeting
 * lands on the same date for a Berlin viewer, per the design note (§1).
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §3
 */

/** Any value accepted where a Temporal type appears in the event model. */
export type CalendarInstant =
  | Temporal.PlainDate
  | Temporal.PlainDateTime
  | Temporal.ZonedDateTime
  | string; // ISO 8601: "2026-09-17" | "2026-09-17T14:00" | "2026-09-17T14:00:00-08:00"

/** Visual/alert status of an event (iCalendar STATUS subset). */
export type EventStatus = "confirmed" | "tentative" | "cancelled";

/**
 * One event as passed in via the CalendarView `events` prop.
 * Only `id`, `title`, and `start` are required — everything else is
 * optional rendering metadata (colors fall back to the calendar's).
 */
export interface CalendarViewEvent {
  /** Stable identity within one calendar source. */
  id: string;
  /** Event title. Rendered in the cell; announced to assistive tech. */
  title: string;
  /** Start instant (required). */
  start: CalendarInstant;
  /** End instant (optional; inclusive day for multi-day events). */
  end?: CalendarInstant;
  /**
   * All-day events render without a time and may span cells.
   * Default: inferred — `true` when `start` is a `PlainDate` or a
   * date-only string, `false` otherwise.
   */
  allDay?: boolean;
  /** Which connected calendar this came from (matches `calendars[].id`). */
  calendarId?: string;
  /** iCalendar UID — the cross-calendar dedup key used by grouping (milestone 4). */
  uid?: string;
  /** Chip color (CSS color value). Falls back to the calendar's color, then primary. */
  color?: string;
  /** Iconify icon name rendered inside the chip (e.g. "tabler:star"). */
  icon?: string;
  /** Small badge rendered next to the title (count, label, etc.). */
  badge?: string | number;
  /** iCalendar STATUS subset; `cancelled` renders struck through, never dropped. */
  status?: EventStatus;
  /**
   * Set by the .ics importer (`parseICal`) for events carrying an RRULE.
   * The base instance only is rendered; when no custom `icon` is given the
   * chip shows a repeat marker. Expansion is out of scope (milestone 6).
   */
  recurring?: boolean;
  /** Free-form metadata for `eventContent` snippet consumers. */
  location?: string;
  description?: string;
  /** Rest props forwarded to the chip element. */
  [key: `data-${string}`]: unknown;
}

/** One event normalized to day spans, ready for grid placement. */
export interface NormalizedEvent {
  /** The original event, carried through for snippets and callbacks. */
  event: CalendarViewEvent;
  /** Inclusive first day, in the event's own time zone. */
  startDay: Temporal.PlainDate;
  /** Inclusive last day (equals `startDay` for single-day events). */
  endDay: Temporal.PlainDate;
  /** Formatted start time "HH:mm", or `undefined` for all-day events. */
  startTime?: string;
  /** Resolved all-day flag (prop value or inferred from the instant type). */
  allDay: boolean;
  /** Convenience flag: `event.status === "cancelled"`. */
  cancelled: boolean;
}

/**
 * Runtime accessor for the `Temporal` global. Read lazily (per call) so
 * consumers and test suites can install the global after this module is
 * loaded (the library never ships or imports a polyfill).
 */
function temporal(): typeof Temporal {
  return (globalThis as { Temporal: typeof Temporal }).Temporal;
}

/**
 * Converts any accepted instant into the day it belongs to, in the
 * event's own time zone.
 *
 * - `PlainDate` passes through unchanged.
 * - `PlainDateTime` / `ZonedDateTime` use `toPlainDate()` — for zoned
 *   instants that is the wall-clock date in the event's own zone.
 * - Strings: date-only → `PlainDate`; anything with a time is parsed as
 *   `PlainDateTime` (RFC 9557 strings with offsets are accepted and the
 *   offset ignored, which keeps the wall-clock date of the source zone).
 * @param instant - The instant to normalize
 * @returns The PlainDate the event starts (or ends) on
 */
function toDay(instant: CalendarInstant): Temporal.PlainDate {
  if (typeof instant !== "string") {
    // PlainDate is already a day; PlainDateTime/ZonedDateTime convert.
    if (instant instanceof temporal().PlainDate) return instant;
    return instant.toPlainDate();
  }
  const T = temporal();
  if (!instant.includes("T") && !instant.includes("t") && instant.length === 10) {
    return T.PlainDate.from(instant);
  }
  return T.PlainDateTime.from(instant).toPlainDate();
}

/**
 * Extracts the start time of an instant as "HH:mm" (or `undefined` when
 * the instant carries no time, e.g. a `PlainDate` or date-only string).
 * @param instant - The instant to read the time from
 * @returns "HH:mm" string, or undefined for all-day instants
 */
function toTime(instant: CalendarInstant): string | undefined {
  if (typeof instant !== "string") {
    if (instant instanceof temporal().PlainDate) return undefined;
    return instant.toPlainTime().toString({ smallestUnit: "minute" });
  }
  if (!instant.includes("T") && !instant.includes("t") && instant.length === 10) {
    return undefined;
  }
  return temporal().PlainDateTime.from(instant).toPlainTime().toString({ smallestUnit: "minute" });
}

/**
 * Infers the all-day flag when not given explicitly: date-only instants
 * (`PlainDate` or a "YYYY-MM-DD" string) are all-day, timed instants are
 * not.
 * @param event - The event to inspect
 * @returns The resolved all-day flag
 */
function inferAllDay(event: CalendarViewEvent): boolean {
  if (event.allDay !== undefined) return event.allDay;
  const start = event.start;
  if (typeof start !== "string") return start instanceof temporal().PlainDate;
  return !start.includes("T") && !start.includes("t") && start.length === 10;
}

/**
 * Normalizes one event into its day-span representation.
 * @param event - The event to normalize
 * @returns The NormalizedEvent for grid placement
 */
export function normalizeEvent(event: CalendarViewEvent): NormalizedEvent {
  const allDay = inferAllDay(event);
  const startDay = toDay(event.start);
  const endDay = event.end === undefined ? startDay : toDay(event.end);
  // Timed events with an end instant may carry a start time; all-day never does.
  const startTime = allDay ? undefined : toTime(event.start);
  return { event, startDay, endDay, startTime, allDay, cancelled: event.status === "cancelled" };
}

/**
 * Normalizes a list of events, sorted by start day (then start time,
 * then id for a deterministic order).
 * @param events - The events to normalize
 * @returns NormalizedEvents in stable calendar order
 */
export function normalizeEvents(events: CalendarViewEvent[]): NormalizedEvent[] {
  return events.map(normalizeEvent).sort((a, b) => {
    const byDay = Temporal.PlainDate.compare(a.startDay, b.startDay);
    if (byDay !== 0) return byDay;
    if (a.startTime !== b.startTime) return (a.startTime ?? "") < (b.startTime ?? "") ? -1 : 1;
    return a.event.id < b.event.id ? -1 : a.event.id > b.event.id ? 1 : 0;
  });
}

/**
 * Returns the normalized events that cover the given day — the event's
 * span is inclusive on both ends, so a multi-day event appears on every
 * day it touches (continuation cells render a marker in the view layer).
 * @param events - Normalized events (as returned by `normalizeEvents`)
 * @param day - The day to look up
 * @returns Events overlapping the day, in calendar order
 */
export function eventsForDay(
  events: NormalizedEvent[],
  day: Temporal.PlainDate,
): NormalizedEvent[] {
  return events.filter(
    (ne) =>
      Temporal.PlainDate.compare(ne.startDay, day) <= 0 &&
      Temporal.PlainDate.compare(day, ne.endDay) <= 0,
  );
}

/**
 * Payload for CalendarView's `oneventmove` callback: the moved event, the
 * day it was dragged (or keyboard-moved) from, and the day it landed on.
 * The component never mutates event state — the consumer owns the `events`
 * array and re-renders by updating `event.start` to the new day.
 */
export interface EventMoveDetail {
  /** The moved event (raw, as passed via the `events` prop) */
  event: CalendarViewEvent;
  /** The event's start day before the move */
  from: Temporal.PlainDate;
  /** The event's start day after the move */
  to: Temporal.PlainDate;
}
