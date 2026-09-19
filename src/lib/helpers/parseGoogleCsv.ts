/**
 * Google Calendar CSV export parsing for CalendarView (plan item 11.1,
 * phase 2) — built exclusively on the native Temporal API (typed global;
 * see `src/lib/temporal.d.ts`). No `Date`, no date libraries, no polyfill
 * shipped by Twintrinsic.
 *
 * Scope (per `docs/plans/CALENDARVIEW_DESIGN.md` §4): Google's **CSV
 * export** ("Export" → per-calendar CSV, or the CSV download of a
 * subscribed calendar). Fields are US-English (Google's export shape);
 * the header row (`Subject`, `Start Date`, …) is matched
 * case-insensitively and column-order independent. Returns
 * `CalendarViewEvent`s ready for the `events` prop, exactly like
 * {@link ./parseICal.js | parseICal} does for .ics files.
 *
 * Wall-clock semantics match parseICal: CSV times are wall-clock in the
 * calendar's zone and are emitted as RFC 9557 strings **without** a UTC
 * "Z" designator, so events land on the same date/time the file states.
 * Consumers needing absolute instants can attach the zone later via
 * `Temporal.ZonedDateTime.from(...)`.
 *
 * All-day rows (`All Day Event` = True, or a row with no times) produce
 * `PlainDate`-string `start`/`end` with `allDay: true`. Google's CSV end
 * date is **inclusive**, which matches CalendarView's inclusive span
 * contract (`eventsForDay`), so it passes through unchanged; a same-day
 * event drops the end entirely.
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §4
 */

import type { CalendarViewEvent } from "./eventNormalize.js";

/** Options for {@link parseGoogleCsv}. */
export interface ParseGoogleCsvOptions {
  /**
   * Prefix for generated event ids.
   * @default "gcsv"
   */
  idPrefix?: string;
}

/** An event parsed from a Google Calendar CSV export. */
export type ParsedGoogleCsvEvent = CalendarViewEvent;

/**
 * Tokenizes RFC 4180 CSV text into rows of fields. Handles
 * `""`-escaped quotes inside quoted fields and newlines inside quoted
 * fields (Google exports multi-line descriptions quoted); commas and
 * newlines separate fields and records only outside quotes. A trailing
 * record without a line terminator is still emitted.
 * @param text - Raw CSV text
 * @returns Rows of raw string fields
 */
function tokenizeCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const n = text.length;

  for (let i = 0; i < n; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        // `""` inside a quoted field is a literal quote character.
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else if (ch === "\r" && text[i + 1] === "\n") {
        // Normalize CRLF line breaks inside quoted fields to LF.
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else if (ch === "\r") {
      // CRLF: the following \n closes the record. A bare CR closes it too.
      if (text[i + 1] !== "\n") {
        row.push(field);
        field = "";
        rows.push(row);
        row = [];
      }
    } else {
      field += ch;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/**
 * Parses Google's US date (`M/D/YYYY`, zero-padding optional, two-digit
 * years expand into the 2000s) into an ISO `YYYY-MM-DD`.
 * @param raw - Raw date cell
 * @returns The ISO date, or undefined for blank/malformed values
 */
function parseUsDate(raw: string): string | undefined {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/.exec(raw.trim());
  if (!m) return undefined;
  const month = Number(m[1]);
  const day = Number(m[2]);
  let year = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return undefined;
  if (year < 100) year += 2000;
  const iso = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  // Reject impossible dates (2/30, 9/31, …) via the Temporal calendar.
  try {
    Temporal.PlainDate.from(iso);
  } catch {
    return undefined;
  }
  return iso;
}

/**
 * Parses Google's US time (`H:MM[:SS] AM/PM`, or 24-hour `H:MM[:SS]`)
 * into an RFC 9557 `HH:MM[:SS]` string.
 * @param raw - Raw time cell (may be blank for all-day rows)
 * @returns The normalized time, or undefined for blank/malformed values
 */
function parseUsTime(raw: string): string | undefined {
  const m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i.exec(raw.trim());
  if (!m) return undefined;
  let hours = Number(m[1]);
  const minutes = m[2];
  const seconds = m[3];
  const meridiem = m[4]?.toUpperCase();
  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  if (hours > 23) return undefined;
  return `${String(hours).padStart(2, "0")}:${minutes}${seconds ? `:${seconds}` : ""}`;
}

/**
 * Parses a Google Calendar CSV export into CalendarView events.
 *
 * Accepts the US-English export columns — `Subject`, `Start Date`,
 * `Start Time`, `End Date`, `End Time`, `All Day Event`, `Description`,
 * `Location` — plus any other columns (guests, visibility, …), which are
 * ignored. Matching is case-insensitive and column-order independent;
 * rows missing a parsable subject/start/end are skipped.
 *
 * All-day rows (`All Day Event` = True, or a row with no times) produce
 * `PlainDate`-string `start`/`end` with `allDay: true`; the inclusive
 * CSV end date is converted to RFC 5545's exclusive convention.
 * Timed rows produce RFC 9557 wall-clock strings without a "Z".
 *
 * @param text - Raw CSV text of a Google Calendar CSV export
 * @param options - Parse options (id prefix)
 * @returns Events ready for the CalendarView `events` prop
 */
export function parseGoogleCsv(
  text: string,
  options: ParseGoogleCsvOptions = {},
): ParsedGoogleCsvEvent[] {
  const { idPrefix = "gcsv" } = options;
  const rows = tokenizeCsvRows(text);
  if (rows.length < 2) return [];

  // Header row → column indices (case-insensitive, order-independent).
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name);
  const idx = {
    subject: col("subject"),
    startDate: col("start date"),
    startTime: col("start time"),
    endDate: col("end date"),
    endTime: col("end time"),
    allDay: col("all day event"),
    description: col("description"),
    location: col("location"),
  };
  // Without the anchor columns the file is not a Google CSV export.
  if (idx.subject === -1 || idx.startDate === -1 || idx.endDate === -1) return [];

  const events: ParsedGoogleCsvEvent[] = [];

  rows.slice(1).forEach((cells, rowIndex) => {
    const subject = (cells[idx.subject] ?? "").trim();
    const startDate = parseUsDate(cells[idx.startDate] ?? "");
    const endDate = parseUsDate(cells[idx.endDate] ?? "");
    // Skip blank/malformed rows instead of failing the whole import.
    if (!subject || !startDate || !endDate) return;

    const rawAllDay = idx.allDay === -1 ? "" : (cells[idx.allDay] ?? "").trim().toLowerCase();
    const startTime = parseUsTime(idx.startTime === -1 ? "" : (cells[idx.startTime] ?? ""));
    const endTime = parseUsTime(idx.endTime === -1 ? "" : (cells[idx.endTime] ?? ""));
    const allDay =
      rawAllDay === "true" ||
      rawAllDay === "1" ||
      (startTime === undefined && endTime === undefined);

    const event: ParsedGoogleCsvEvent = {
      id: `${idPrefix}-${rowIndex}`,
      title: subject,
      start: startDate,
    };

    if (allDay) {
      event.allDay = true;
      // Google's CSV end date is inclusive, matching CalendarView's
      // span contract — passthrough. Same-day events drop the end.
      if (endDate !== startDate) event.end = endDate;
    } else {
      event.start = `${startDate}T${startTime ?? "00:00"}`;
      // A missing end time on a timed row falls back to the start time
      // (instant-length) rather than spilling into the next day.
      const endTimeOrStart = endTime ?? startTime ?? "00:00";
      const end =
        endDate === startDate ? `${endDate}T${endTimeOrStart}` : `${endDate}T${endTime ?? "00:00"}`;
      if (end !== event.start) event.end = end;
    }

    const description = idx.description === -1 ? "" : (cells[idx.description] ?? "").trim();
    if (description) event.description = description;
    const location = idx.location === -1 ? "" : (cells[idx.location] ?? "").trim();
    if (location) event.location = location;

    events.push(event);
  });

  return events;
}

// Re-exported so parser consumers get the event model type from one module.
export type { CalendarInstant, CalendarViewEvent, EventStatus } from "./eventNormalize.js";
