/**
 * Minimal RFC 5545 RRULE expansion for CalendarView (plan item 11.1,
 * phase 2) — built exclusively on the native Temporal API (types via
 * `src/lib/temporal.d.ts`; no polyfill shipped).
 *
 * Scope: the subset real-world calendar feeds actually emit for meeting-
 * style events — `FREQ` (DAILY/WEEKLY/MONTHLY/YEARLY), `INTERVAL`,
 * `COUNT`, `UNTIL`, and `BYDAY` (weekly only). Rules carrying any other
 * part (BYSETPOS, BYMONTHDAY, BYWEEKNO, …) are rejected and fall back to
 * the base instance, so a feed never renders wrongly. RDATE/EXDATE and
 * sub-daily frequencies are likewise out of scope.
 *
 * Expansion is always **range-capped** to the calendar's visible grid,
 * so unbounded rules stay O(visible cells), not O(rule length). Pure and
 * rune-free: the component calls `expandRecurrences(events, range)`
 * after fetching and before `normalizeEvents`, so expanded instances
 * flow through chips, popovers, and grouping unchanged (they keep the
 * original's `uid`, which the grouping dedup keys on).
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §4 (recurrence row)
 */
import type { CalendarViewEvent } from "./eventNormalize.js";

/** Days of week as RFC 5545 two-letter codes → ISO day-of-week (Mon=1..Sun=7). */
const BYDAY_TO_ISO: Record<string, number> = {
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FR: 5,
  SA: 6,
  SU: 7,
};

/** Parsed parts of a supported RRULE. */
export interface ParsedRRule {
  /** Frequency unit (the only required part). */
  freq: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  /** Step size per frequency unit (default 1). */
  interval: number;
  /** Total occurrence cap (RFC 5545: the base instance counts as #1). */
  count?: number;
  /** Inclusive bound date (`YYYYMMDD` — date-time forms are date-truncated). */
  until?: string;
  /** ISO day-of-week list for WEEKLY rules (Mon=1..Sun=7). */
  byday?: number[];
}

/**
 * Parses an RRULE property value into its supported parts. Returns
 * undefined when FREQ is missing, unsupported, or the rule carries parts
 * outside this module's documented scope (fail-closed: callers render
 * the base instance rather than a wrong recurrence).
 * @param rrule - The value part of `RRULE:...` (e.g. `FREQ=WEEKLY;BYDAY=TU;COUNT=10`)
 */
export function parseRRule(rrule: string): ParsedRRule | undefined {
  const UNSUPPORTED = new Set([
    "BYSETPOS",
    "BYMONTHDAY",
    "BYYEARDAY",
    "BYWEEKNO",
    "BYMONTH",
    "BYHOUR",
    "BYMINUTE",
    "BYSECOND",
    "WKST",
  ]);
  const parts: Record<string, string> = {};
  for (const piece of rrule.split(";")) {
    const eq = piece.indexOf("=");
    if (eq === -1) continue;
    parts[piece.slice(0, eq).trim().toUpperCase()] = piece.slice(eq + 1).trim();
  }
  const freq = parts.FREQ?.toUpperCase() as ParsedRRule["freq"] | undefined;
  if (!freq || !["DAILY", "WEEKLY", "MONTHLY", "YEARLY"].includes(freq)) return undefined;
  if (Object.keys(parts).some((k) => UNSUPPORTED.has(k))) return undefined;
  const interval = Math.max(1, Number.parseInt(parts.INTERVAL ?? "1", 10) || 1);
  const count =
    parts.COUNT !== undefined ? Math.max(1, Number.parseInt(parts.COUNT, 10) || 1) : undefined;
  const until = parts.UNTIL;
  let byday: number[] | undefined;
  if (parts.BYDAY !== undefined) {
    if (freq !== "WEEKLY") return undefined;
    byday = parts.BYDAY.split(",")
      .map((d) => BYDAY_TO_ISO[d.trim().toUpperCase()])
      .filter((n) => n !== undefined);
    if (byday.length === 0) return undefined;
  }
  return { freq, interval, count, until, byday };
}

/**
 * Extracts the raw `RRULE:...` string from a `CalendarViewEvent`'s
 * free-form `data-*` metadata (parseICal stores the rule there).
 * @param event - The event carrying (or lacking) recurrence metadata
 */
export function rruleOf(event: CalendarViewEvent): string | undefined {
  const meta = event["data-rrule"];
  return typeof meta === "string" ? meta : undefined;
}

/** PlainDate from an ISO date string, honoring the Temporal global. */
function temporalDateFrom(iso: string): Temporal.PlainDate | undefined {
  const T = (globalThis as { Temporal?: typeof Temporal }).Temporal;
  if (!T) return undefined;
  try {
    return T.PlainDate.from(iso);
  } catch {
    return undefined;
  }
}

/**
 * Yields occurrence dates for a rule, starting at the base start date
 * (the base instance is the first yield — RFC 5545 COUNT includes it).
 * Bounded by COUNT, UNTIL, and the 5000-instance safety cap; the caller
 * additionally stops on range end.
 */
function* occurrenceDates(
  startDate: Temporal.PlainDate,
  rule: ParsedRRule,
  range: { start: Temporal.PlainDate; end: Temporal.PlainDate },
): Generator<Temporal.PlainDate> {
  const until = rule.until
    ? temporalDateFrom(
        `${rule.until.slice(0, 4)}-${rule.until.slice(4, 6)}-${rule.until.slice(6, 8)}`,
      )
    : undefined;
  const emitted = rule.count ?? 0;
  const cap = Math.min(emitted > 0 ? emitted : 5000, 5000);

  if (rule.freq === "WEEKLY" && rule.byday) {
    // Walk week by week (interval steps, weeks anchored on Monday) and
    // emit each matching weekday at or after the base start.
    let weekStart = startDate.subtract({ days: startDate.dayOfWeek - 1 });
    let count = 0;
    while (count < cap) {
      for (const iso of [...rule.byday].sort((a, b) => a - b)) {
        const day = weekStart.add({ days: iso - 1 });
        if (Temporal.PlainDate.compare(day, startDate) < 0) continue;
        if (until && Temporal.PlainDate.compare(day, until) > 0) return;
        if (Temporal.PlainDate.compare(day, range.end) > 0) return;
        count++;
        yield day;
        if (count >= cap) return;
      }
      weekStart = weekStart.add({ weeks: rule.interval });
    }
    return;
  }

  const step =
    rule.freq === "DAILY"
      ? { days: rule.interval }
      : rule.freq === "WEEKLY"
        ? { weeks: rule.interval }
        : rule.freq === "MONTHLY"
          ? { months: rule.interval }
          : { years: rule.interval };
  for (let date = startDate, n = 0; n < cap; n++) {
    if (until && Temporal.PlainDate.compare(date, until) > 0) return;
    if (Temporal.PlainDate.compare(date, range.end) > 0) return;
    yield date;
    date = date.add(step);
  }
}

/**
 * Expands one event's recurrence into instances landing inside the given
 * range (inclusive on both ends). The base instance is always included
 * (it is occurrence #1); generated instances keep the original's `uid`,
 * color, and other metadata, get `_N`-suffixed ids, and stay marked
 * `recurring` so the repeat marker still renders.
 *
 * Unsupported rules return just the base instance (no expansion) so a
 * feed never goes blank — the base still renders with its repeat marker.
 *
 * @param event - The (raw) event carrying `data-rrule`
 * @param range - Inclusive start/end PlainDates to generate within
 * @returns The base instance plus every in-range generated instance
 */
export function expandRecurrence(
  event: CalendarViewEvent,
  range: { start: Temporal.PlainDate; end: Temporal.PlainDate },
): CalendarViewEvent[] {
  const base: CalendarViewEvent = { ...event };
  const rrule = rruleOf(event);
  if (!rrule) return [base];

  const rule = parseRRule(rrule);
  if (!rule) return [base];

  const startStr = typeof event.start === "string" ? event.start : event.start.toString();
  const hasTime = startStr.includes("T");
  const startDate = temporalDateFrom(startStr.slice(0, 10));
  if (!startDate) return [base];
  const timePart = hasTime ? startStr.slice(11, 16) : undefined;

  // End's day delta from start — preserved across instances.
  const endStr =
    event.end !== undefined
      ? typeof event.end === "string"
        ? event.end
        : event.end.toString()
      : undefined;
  const endDate = endStr ? temporalDateFrom(endStr.slice(0, 10)) : undefined;
  // Day-count delta via Temporal.Duration (PlainDate.compare only yields a sign).
  const durationDays = endDate ? (startDate.until(endDate, { largestUnit: "day" }).days ?? 0) : 0;

  // The base instance always renders (occurrence #1 of COUNT). Occurrence
  // dates equal to the base start are skipped here to avoid double-emitting.
  const out: CalendarViewEvent[] = [base];
  let n = 0;
  for (const date of occurrenceDates(startDate, rule, range)) {
    if (date.equals(startDate)) continue;
    const instance: CalendarViewEvent = {
      ...event,
      start: timePart ? `${date.toString()}T${timePart}` : date.toString(),
      id: `${event.id}_${n++}`,
    };
    if (endStr && endDate) {
      const newEnd = date.add({ days: durationDays });
      instance.end = endStr.includes("T")
        ? `${newEnd.toString()}T${endStr.slice(11, 16)}`
        : newEnd.toString();
    }
    if (!timePart && event.allDay === undefined) instance.allDay = true;
    out.push(instance);
  }
  return out;
}

/**
 * Expands every recurring event in a raw event list against the visible
 * range. Events without `data-rrule` pass through untouched; recurring
 * ones contribute their base instance plus in-range generated instances.
 * Call after fetching and before `normalizeEvents` so instances flow
 * through chips, popovers, and grouping unchanged.
 * @param events - Raw events (as passed to CalendarView's `events`/fetched)
 * @param range - The visible grid range (inclusive)
 * @returns Expanded, range-capped events ready for `normalizeEvents`
 */
export function expandRecurrences(
  events: CalendarViewEvent[],
  range: { start: Temporal.PlainDate; end: Temporal.PlainDate },
): CalendarViewEvent[] {
  const out: CalendarViewEvent[] = [];
  for (const event of events) {
    if (!rruleOf(event)) {
      out.push(event);
      continue;
    }
    out.push(...expandRecurrence(event, range));
  }
  return out;
}
