/**
 * Calendar connectivity contract for CalendarView (plan item 11.1,
 * milestone 6) — the `calendars`/`fetchEvents` plumbing, built on the
 * native Temporal API (types via `src/lib/temporal.d.ts`; no polyfill).
 *
 * Architecture decision (design note §4): the component consumes plain
 * data. Fetching Google/Microsoft/Apple data requires OAuth secrets and
 * is CORS-blocked in-browser, so network calls belong in the consumer's
 * server. Twintrinsic ships this contract + the client-side parsers
 * (`parseICal`), never network calls.
 *
 * The contract is deliberately framework-free: `connectCalendars` works
 * with any async source (server endpoint, Graph API proxy, CalDAV bridge,
 * .ics feed fetch), stamps results with their `calendarId`, falls back
 * per-event colors to the calendar's color, and reports per-source
 * failures without losing the sources that succeeded. Reactive loading
 * state lives in the component (runes), not here — this module stays
 * pure and rune-free.
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §4
 */
import type { CalendarViewEvent } from "./eventNormalize.js";

/**
 * A consumer-implemented event source. `fetchEvents` typically proxies a
 * server endpoint (Google Calendar API, Microsoft Graph `/me/calendarview`,
 * a CalDAV bridge, or a published .ics subscription URL) — see the
 * CalendarView docs page for copy-paste recipes per provider.
 */
export interface CalendarSource {
  /** Stable id referenced by `CalendarViewEvent.calendarId`. */
  id: string;
  /** Display name (legend, grouping tooltip). */
  name: string;
  /** CSS color (Tailwind theme token, hex, or `var()`). */
  color: string;
  /**
   * Fetch events for the visible range. Called per month/page change;
   * implementers return an empty array rather than throwing when a feed
   * is merely empty.
   */
  fetchEvents(range: {
    start: Temporal.PlainDate;
    end: Temporal.PlainDate;
  }): Promise<CalendarViewEvent[]>;
}

/** Narrow a bare object to a `CalendarSource` (duck check on `fetchEvents`). */
export function isCalendarSource(value: unknown): value is CalendarSource {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as CalendarSource).id === "string" &&
    typeof (value as CalendarSource).name === "string" &&
    typeof (value as CalendarSource).color === "string" &&
    typeof (value as CalendarSource).fetchEvents === "function"
  );
}

/**
 * Payload for CalendarView's `oncalendarserror` callback: the sources that
 * failed during the latest fetch round. Sources that succeeded still
 * render — this is a report, not a fatal state.
 */
export interface CalendarsErrorDetail {
  /** One entry per failed source, with the thrown reason. */
  errors: Array<{ sourceId: string; error: unknown }>;
}

/**
 * Result of a `connectCalendars` round: the calendar-stamped events from
 * every source that succeeded, plus one entry per source that rejected.
 */
export interface ConnectResult {
  /** Events from all successful sources, in source order. */
  events: CalendarViewEvent[];
  /** Per-source failures — a flaky feed must not blank the calendar. */
  errors: Array<{ sourceId: string; error: unknown }>;
}

/**
 * Queries every source for the visible range concurrently and returns
 * event-data-backed, calendar-stamped events. Uses `Promise.allSettled`:
 * a failing source surfaces in `errors` while the sources that succeeded
 * still render.
 *
 * Each returned event is tagged with its source's `calendarId` (when the
 * event didn't already carry one) and resolves `color` to the calendar's
 * color when the event has none — so multi-calendar grids color correctly
 * without consumers hand-painting every event.
 *
 * @param sources - The connected calendars to query
 * @param range - The visible range to fetch (inclusive `start`/`end`)
 * @returns Events plus per-source fetch errors
 */
export async function connectCalendars(
  sources: readonly CalendarSource[],
  range: { start: Temporal.PlainDate; end: Temporal.PlainDate },
): Promise<ConnectResult> {
  const settled = await Promise.allSettled(sources.map((source) => source.fetchEvents(range)));

  const events: CalendarViewEvent[] = [];
  const errors: Array<{ sourceId: string; error: unknown }> = [];

  sources.forEach((source, i) => {
    const outcome = settled[i];
    if (outcome.status === "rejected") {
      errors.push({ sourceId: source.id, error: outcome.reason });
      return;
    }
    for (const event of outcome.value) {
      events.push({
        ...event,
        calendarId: event.calendarId ?? source.id,
        color: event.color ?? source.color,
      });
    }
  });

  return { events, errors };
}
