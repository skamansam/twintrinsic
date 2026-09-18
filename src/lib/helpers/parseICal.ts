/**
 * iCalendar (.ics) parsing for CalendarView (plan item 11.1, milestone 5) —
 * built exclusively on the native Temporal API (typed global; see
 * `src/lib/temporal.d.ts`). No `Date`, no date libraries, no polyfill
 * shipped by Twintrinsic.
 *
 * Scope (per `docs/plans/CALENDARVIEW_DESIGN.md` §4): the property subset
 * real-world calendar exports actually use — VEVENT, UID, SUMMARY,
 * DTSTART/DTEND (DATE vs DATE-TIME, TZID, VALUE=DATE, UTC "Z"), STATUS,
 * DESCRIPTION, LOCATION. RRULE is captured raw on `data-rrule` and marked
 * `recurring: true`; expansion into occurrences is the caller's choice via
 * the phase-2 `expandRecurrences` helper (range-capped), so the parser
 * stays a pure property-mapper.
 *
 * Google Calendar's .ics export *is* iCalendar, so the same parser covers
 * it; "real Google-export samples" in the test suite mirror Google's
 * exact output shape (X-WR-CALNAME, METHOD:PUBLISH, DTSTAMP, prodid).
 *
 * Wall-clock semantics: iCalendar times are wall-clock in their zone.
 * Parsed instants are emitted as RFC 9557 strings **without** a UTC "Z"
 * designator (`PlainDateTime` rejects "Z"), so the event lands on the
 * same date the source file states. Consumers needing absolute instants
 * can post-process with `Temporal.ZonedDateTime.from(...)` using the
 * event's TZID, which is preserved on the returned event.
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §4
 */

import type { CalendarViewEvent, EventStatus } from "./eventNormalize.js";

/** Options for {@link parseICal}. */
export interface ParseICalOptions {
  /**
   * Fallback IANA time zone for DATE-TIME values without a TZID param
   * (floating times). The zone is recorded on the event (`tzid`) but no
   * zone conversion is performed — iCalendar times stay wall-clock.
   * @default "UTC"
   */
  defaultTz?: string;
  /**
   * Prefix for generated event ids when a VEVENT has no UID.
   * @default "ical"
   */
  idPrefix?: string;
}

/** An event parsed from an .ics feed, ready for the CalendarView `events` prop. */
export type ParsedICalEvent = CalendarViewEvent & {
  /** iCalendar UID verbatim (the grouping dedup key). */
  uid?: string;
  /** Resolved IANA zone of DTSTART (TZID param or `defaultTz`). */
  tzid?: string;
  /** True when the VEVENT carries an RRULE (base instance; expand via `expandRecurrences`). */
  recurring?: boolean;
  /** Raw RRULE value (without the `RRULE:` prefix) for `expandRecurrences`. */
  "data-rrule"?: string;
};

/**
 * Unfolds RFC 5545 content lines: a CRLF (or LF) followed by a space or
 * tab is a continuation of the previous line.
 * @param text - Raw .ics text
 * @returns Physical content lines, folded lines joined
 */
function unfoldLines(text: string): string[] {
  const raw = text.split(/\r\n|\n|\r/);
  const lines: string[] = [];
  for (const line of raw) {
    if ((line.startsWith(" ") || line.startsWith("\t")) && lines.length > 0) {
      lines[lines.length - 1] += line.slice(1);
    } else {
      lines.push(line);
    }
  }
  return lines;
}

/**
 * Splits a content line into `NAME;PARAM=VALUE;PARAM=VALUE:value` parts.
 * A colon inside a quoted param value does not split; a colon inside a
 * property value does not confuse the split because only the first
 * unquoted colon separates name from value.
 * @param line - One unfolded content line
 * @returns Lowercase name, raw param string, and property value
 */
function parseLine(line: string): { name: string; params: string; value: string } | undefined {
  let inQuotes = false;
  let splitAt = -1;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') inQuotes = !inQuotes;
    else if (ch === ":" && !inQuotes) {
      splitAt = i;
      break;
    }
  }
  if (splitAt === -1) return undefined;
  const head = line.slice(0, splitAt);
  const value = line.slice(splitAt + 1);
  const semi = head.indexOf(";");
  const name = (semi === -1 ? head : head.slice(0, semi)).trim().toUpperCase();
  const params = semi === -1 ? "" : head.slice(semi + 1);
  return { name, params, value };
}

/**
 * Extracts a named parameter's value from a raw param string
 * (`TZID=America/New_York;VALUE=DATE` → e.g. `VALUE` lookup gives `DATE`).
 * @param params - Raw parameter string (between NAME and ":")
 * @param key - Parameter name (case-insensitive)
 * @returns Unquoted value, or undefined when absent
 */
function getParam(params: string, key: string): string | undefined {
  for (const part of params.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim().toUpperCase() === key.toUpperCase()) {
      return part
        .slice(eq + 1)
        .trim()
        .replace(/^"|"$/g, "");
    }
  }
  return undefined;
}

/** iCalendar date form: `YYYYMMDD` (`VALUE=DATE`). */
const DATE_ONLY = /^\d{8}$/;
/** iCalendar date-time form: `YYYYMMDDTHHMMSS` (with optional trailing `Z`). */
const DATE_TIME = /^(\d{8})T(\d{6})(Z?)$/;

/**
 * Converts an iCalendar DATE or DATE-TIME value into the RFC 9557 string
 * shape the CalendarView event model accepts. UTC ("Z") values keep their
 * wall clock — the designator is dropped, never converted.
 * @param value - Raw DTSTART/DTEND value
 * @returns `"YYYY-MM-DD"` or `"YYYY-MM-DDTHH:mm"` (seconds kept when nonzero)
 */
function icalToInstant(value: string): string {
  if (DATE_ONLY.test(value)) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }
  const m = DATE_TIME.exec(value);
  if (!m) return value;
  const date = `${m[1].slice(0, 4)}-${m[1].slice(4, 6)}-${m[1].slice(6, 8)}`;
  const hh = m[2].slice(0, 2);
  const mm = m[2].slice(2, 4);
  const ss = m[2].slice(4, 6);
  return ss === "00" ? `${date}T${hh}:${mm}` : `${date}T${hh}:${mm}:${ss}`;
}

/**
 * Unescapes iCalendar TEXT per RFC 5545 §3.3.11 (backslash escapes and
 * literal newlines).
 * @param value - Raw TEXT property value
 * @returns Unescaped string
 */
function unescapeText(value: string): string {
  return value
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

/**
 * Parses an iCalendar (.ics) feed into CalendarView events. Only VEVENTs
 * are emitted; VTODO/VJOURNAL/VFREEBUSY are ignored. Events missing
 * DTSTART are skipped (nothing to place on the grid).
 * @param text - Raw .ics text (Google/Outlook/Apple exports all qualify)
 * @param options - Parsing options (default time zone, id prefix)
 * @returns Events in file order, ready for the `events` prop
 */
export function parseICal(text: string, options: ParseICalOptions = {}): ParsedICalEvent[] {
  const defaultTz = options.defaultTz ?? "UTC";
  const idPrefix = options.idPrefix ?? "ical";
  const events: ParsedICalEvent[] = [];

  let current:
    | (Partial<ParsedICalEvent> & { dtstart?: string; dtend?: string; tzid?: string })
    | undefined;
  let uidSeq = 0;

  const flush = () => {
    if (!current?.dtstart) return;
    // UID doubles as the event id when present: ids stay stable across
    // re-parses and line up with the grouping dedup key (milestone 4).
    const id = current.uid ?? `${idPrefix}-${++uidSeq}`;
    const base: ParsedICalEvent = {
      id,
      title: current.title ?? "(untitled)",
      start: current.dtstart,
      uid: current.uid,
      tzid: current.tzid,
      recurring: current.recurring,
    };
    if (current.dtend !== undefined) base.end = current.dtend;
    if (current.allDay !== undefined) base.allDay = current.allDay;
    if (current.status !== undefined) base.status = current.status;
    if (current.location !== undefined) base.location = current.location;
    if (current.description !== undefined) base.description = current.description;
    if (current["data-rrule"] !== undefined) base["data-rrule"] = current["data-rrule"];
    events.push(base);
  };

  for (const line of unfoldLines(text)) {
    const parsed = parseLine(line);
    if (!parsed) continue;
    const { name, params, value } = parsed;

    if (name === "BEGIN" && value.trim().toUpperCase() === "VEVENT") {
      current = {};
      continue;
    }
    if (name === "END" && value.trim().toUpperCase() === "VEVENT") {
      flush();
      current = undefined;
      continue;
    }
    if (!current) continue;

    switch (name) {
      case "UID":
        current.uid = value.trim();
        break;
      case "SUMMARY":
        current.title = unescapeText(value);
        break;
      case "DTSTART": {
        current.dtstart = icalToInstant(value.trim());
        current.tzid = getParam(params, "TZID") ?? defaultTz;
        current.allDay =
          getParam(params, "VALUE")?.toUpperCase() === "DATE" || DATE_ONLY.test(value.trim());
        break;
      }
      case "DTEND":
        current.dtend = icalToInstant(value.trim());
        break;
      case "STATUS":
        current.status = normalizeStatus(value.trim());
        break;
      case "LOCATION":
        current.location = unescapeText(value);
        break;
      case "DESCRIPTION":
        current.description = unescapeText(value);
        break;
      case "RRULE":
        current.recurring = true;
        current["data-rrule"] = value;
        break;
      default:
        break;
    }
  }

  return events;
}

/**
 * Maps an iCalendar STATUS value onto the CalendarView status subset.
 * Unknown statuses are dropped (the event renders with default styling).
 * @param raw - Raw STATUS property value (case-insensitive)
 * @returns The matching EventStatus, or undefined for unmapped values
 */
function normalizeStatus(raw: string): EventStatus | undefined {
  const upper = raw.toUpperCase();
  if (upper === "CONFIRMED" || upper === "TENTATIVE" || upper === "CANCELLED") {
    return upper.toLowerCase() as EventStatus;
  }
  return undefined;
}

// Re-exported so parser consumers get the event model types from one module.
export type { CalendarInstant, CalendarViewEvent, EventStatus } from "./eventNormalize.js";
