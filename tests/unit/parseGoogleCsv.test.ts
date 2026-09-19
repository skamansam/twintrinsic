/**
 * Unit tests for the Google CSV export parser (plan item 11.1, phase 2).
 * Fixtures mirror **real Google Calendar CSV export output** (header row,
 * `M/D/YYYY` dates, `H:MM AM/PM` times, quoted multi-line descriptions,
 * ignored guest/created columns, CRLF line endings). Pure helper tests —
 * native Temporal only; Node lacks a Temporal global, so the suite
 * installs the polyfill *as the global*, mirroring exactly the shape a
 * consumer's polyfill install takes (the library itself never imports it).
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §4
 */
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { parseGoogleCsv } from "../../src/lib/helpers/parseGoogleCsv.js";
import { normalizeEvents } from "../../src/lib/helpers/eventNormalize.js";

// Install the polyfill as the global — the same shape a consumer's
// polyfill install produces in the browser.
let Temporal: typeof TemporalPolyfill;

beforeEach(() => {
  (globalThis as { Temporal?: typeof TemporalPolyfill }).Temporal = TemporalPolyfill;
  Temporal = TemporalPolyfill;
});

afterEach(() => {
  delete (globalThis as { Temporal?: typeof TemporalPolyfill }).Temporal;
});

/** Trimmed-down Google CSV export (structure, casing, CRLF preserved). */
const GOOGLE_CSV = [
  "Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location,Created,Updated",
  'Weekly sync,9/15/2026,9:30 AM,9/15/2026,10:30 AM,False,"Agenda: roadmap & hiring",https://meet.google.com/xyz,9/1/2026,9/1/2026',
  'Company offsite,9/21/2026,,9/22/2026,,True,"Two-day\r\noffsite",Mountain View,9/1/2026,9/1/2026',
  'Interview - design,10/2/2026,2:00 PM,10/2/2026,3:00 PM,False,"Say ""hello"" to the panel",Building 3,9/1/2026,9/1/2026',
].join("\r\n");

describe("parseGoogleCsv", () => {
  it("parses a real-shape Google export with timed and all-day rows", () => {
    const events = parseGoogleCsv(GOOGLE_CSV);
    expect(events).toHaveLength(3);

    const [sync, offsite, interview] = events;

    // Timed row → RFC 9557 wall-clock strings, no "Z".
    expect(sync.title).toBe("Weekly sync");
    expect(sync.start).toBe("2026-09-15T09:30");
    expect(sync.end).toBe("2026-09-15T10:30");
    expect(sync.allDay).toBeUndefined();
    expect(sync.description).toBe("Agenda: roadmap & hiring");
    expect(sync.location).toBe("https://meet.google.com/xyz");

    // All-day multi-day row: the inclusive CSV end passes through
    // (CalendarView spans are inclusive on both ends).
    expect(offsite.title).toBe("Company offsite");
    expect(offsite.start).toBe("2026-09-21");
    expect(offsite.end).toBe("2026-09-22");
    expect(offsite.allDay).toBe(true);
    expect(offsite.description).toBe("Two-day\noffsite");

    // 12-hour clock: 2:00 PM → 14:00; escaped quotes unescaped.
    expect(interview.start).toBe("2026-10-02T14:00");
    expect(interview.description).toBe('Say "hello" to the panel');
  });

  it("drops the end on same-day all-day rows (RFC 5545 single-day shape)", () => {
    const csv = [
      "Subject,Start Date,Start Time,End Date,End Time,All Day Event",
      "Holiday,9/15/2026,,9/15/2026,,True",
    ].join("\r\n");
    const [event] = parseGoogleCsv(csv);
    expect(event.allDay).toBe(true);
    expect(event.start).toBe("2026-09-15");
    expect(event.end).toBeUndefined();
  });

  it("parses midnight and noon 12-hour times correctly", () => {
    const csv = [
      "Subject,Start Date,Start Time,End Date,End Time,All Day Event",
      "Midnight run,9/15/2026,12:00 AM,9/15/2026,12:30 PM,False",
    ].join("\r\n");
    const [event] = parseGoogleCsv(csv);
    expect(event.start).toBe("2026-09-15T00:00");
    expect(event.end).toBe("2026-09-15T12:30");
  });

  it("accepts 24-hour times and is column-order/case independent", () => {
    const csv = [
      "ALL DAY EVENT,subject,end time,END DATE,start time,START DATE",
      "False,Nightly batch,23:45,9/16/2026,23:00,9/15/2026",
    ].join("\r\n");
    const [event] = parseGoogleCsv(csv);
    expect(event.title).toBe("Nightly batch");
    expect(event.start).toBe("2026-09-15T23:00");
    expect(event.end).toBe("2026-09-16T23:45");
    expect(event.allDay).toBeUndefined();
  });

  it("treats rows without times as all-day even without the flag column", () => {
    const csv = ["Subject,Start Date,End Date", "Trip,10/1/2026,10/3/2026"].join("\r\n");
    const [event] = parseGoogleCsv(csv);
    expect(event.allDay).toBe(true);
    expect(event.start).toBe("2026-10-01");
    expect(event.end).toBe("2026-10-03");
  });

  it("skips malformed rows but keeps parsable ones", () => {
    const csv = [
      "Subject,Start Date,Start Time,End Date,End Time,All Day Event",
      "Good,9/15/2026,9:00 AM,9/15/2026,10:00 AM,False",
      ",9/16/2026,9:00 AM,9/16/2026,10:00 AM,False",
      "Bad date,9/31/2026,9:00 AM,9/30/2026,10:00 AM,False",
      "Good too,12/1/2026,9:00 AM,12/1/2026,10:00 AM,False",
    ].join("\r\n");
    const events = parseGoogleCsv(csv);
    expect(events.map((e) => e.title)).toEqual(["Good", "Good too"]);
  });

  it("returns [] for CSVs without Google export columns", () => {
    expect(parseGoogleCsv("name,when\r\nLunch,tomorrow")).toEqual([]);
    expect(parseGoogleCsv("")).toEqual([]);
  });

  it("honors the idPrefix option and produces unique ids", () => {
    const events = parseGoogleCsv(GOOGLE_CSV, { idPrefix: "hol" });
    expect(events[0].id).toMatch(/^hol-/);
    expect(new Set(events.map((e) => e.id)).size).toBe(events.length);
  });

  it("output feeds straight into normalizeEvents (CalendarView events prop)", () => {
    const events = parseGoogleCsv(GOOGLE_CSV);
    const normalized = normalizeEvents(events, "2026-09");
    // The offsite spans Sep 21–22 inclusive → one normalized record
    // covering both days.
    const offsite = normalized.find((ne) => ne.event.title === "Company offsite");
    expect(offsite).toBeDefined();
    expect(offsite?.startDay.toString()).toBe("2026-09-21");
    expect(offsite?.endDay.toString()).toBe("2026-09-22");
    expect(offsite?.allDay).toBe(true);
  });

  it("never mutates the input text and needs no polyfill-time conversion", () => {
    const csv = "Subject,Start Date,End Date\r\nT,9/15/2026,9/15/2026\r\n";
    const before = csv.length;
    parseGoogleCsv(csv);
    expect(csv).toHaveLength(before);
    expect(Temporal.PlainDate.from("2026-09-15").day).toBe(15);
  });
});
