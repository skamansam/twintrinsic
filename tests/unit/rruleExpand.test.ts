/**
 * Unit tests for the RRULE expansion helper (plan item 11.1, phase 2).
 * Pure helper tests — the suite installs the polyfill as the Temporal
 * global exactly as a consumer's install would (Node lacks the native).
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §4
 */
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";
import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  expandRecurrence,
  expandRecurrences,
  parseRRule,
} from "../../src/lib/helpers/rruleExpand.js";

beforeAll(() => {
  vi.stubGlobal("Temporal", TemporalPolyfill);
});

const RANGE = {
  start: TemporalPolyfill.PlainDate.from("2026-09-01"),
  end: TemporalPolyfill.PlainDate.from("2026-10-11"),
};

describe("parseRRule", () => {
  it("parses FREQ/INTERVAL/COUNT/UNTIL/BYDAY", () => {
    expect(parseRRule("FREQ=WEEKLY;BYDAY=TU;COUNT=10")).toEqual({
      freq: "WEEKLY",
      interval: 1,
      count: 10,
      until: undefined,
      byday: [2],
    });
    expect(parseRRule("FREQ=DAILY;INTERVAL=2;UNTIL=20261231")).toEqual({
      freq: "DAILY",
      interval: 2,
      count: undefined,
      until: "20261231",
      byday: undefined,
    });
  });

  it("returns undefined for unsupported or missing FREQ", () => {
    expect(parseRRule("INTERVAL=2")).toBeUndefined();
    expect(parseRRule("FREQ=SECONDLY")).toBeUndefined();
    // Fail-closed: rules with out-of-scope parts fall back to the base instance.
    expect(parseRRule("FREQ=WEEKLY;BYSETPOS=2")).toBeUndefined();
  });
});

describe("expandRecurrence", () => {
  it("emits the base instance plus in-range weekly occurrences", () => {
    const event = {
      id: "e1",
      title: "Standup",
      start: "2026-09-01T09:30",
      "data-rrule": "FREQ=WEEKLY;BYDAY=TU;COUNT=10",
    };
    const out = expandRecurrence(event, RANGE);
    // Sept 1,8,15,22,29 + Oct 6 = 6 in range of the 10 COUNT occurrences.
    expect(out.map((e) => e.start)).toEqual([
      "2026-09-01T09:30",
      "2026-09-08T09:30",
      "2026-09-15T09:30",
      "2026-09-22T09:30",
      "2026-09-29T09:30",
      "2026-10-06T09:30",
    ]);
    // Generated ids are suffixed; the base keeps its own.
    expect(out[0].id).toBe("e1");
    expect(out[1].id).toBe("e1_0");
  });

  it("preserves duration by shifting end by the same delta", () => {
    const event = {
      id: "e2",
      title: "Retreat",
      start: "2026-09-01",
      end: "2026-09-03",
      "data-rrule": "FREQ=MONTHLY;COUNT=3",
    };
    const out = expandRecurrence(event, RANGE);
    // The November occurrence is legitimately excluded by the range cap
    // (RANGE.end = Oct 11) — expansion is range-capped by design.
    expect(out.map((e) => [e.start, e.end])).toEqual([
      ["2026-09-01", "2026-09-03"],
      ["2026-10-01", "2026-10-03"],
    ]);
  });

  it("respects INTERVAL for DAILY rules", () => {
    const event = {
      id: "e3",
      title: "Every other day",
      start: "2026-09-01T08:00",
      "data-rrule": "FREQ=DAILY;INTERVAL=2;COUNT=4",
    };
    const out = expandRecurrence(event, RANGE);
    expect(out.map((e) => e.start)).toEqual([
      "2026-09-01T08:00",
      "2026-09-03T08:00",
      "2026-09-05T08:00",
      "2026-09-07T08:00",
    ]);
  });

  it("stops at UNTIL", () => {
    const event = {
      id: "e4",
      title: "Until Oct",
      start: "2026-09-14T10:00",
      "data-rrule": "FREQ=WEEKLY;UNTIL=20260928",
    };
    const out = expandRecurrence(event, RANGE);
    expect(out.map((e) => e.start)).toEqual([
      "2026-09-14T10:00",
      "2026-09-21T10:00",
      "2026-09-28T10:00",
    ]);
  });

  it("weekly BYDAY emits one instance per matching weekday", () => {
    const event = {
      id: "e5",
      title: "Mon/Wed",
      start: "2026-09-02T09:00",
      "data-rrule": "FREQ=WEEKLY;BYDAY=MO,WE;COUNT=4",
    };
    const out = expandRecurrence(event, RANGE);
    // Count counts every emitted occurrence: Sep 2 (base, WE), Sep 7 (MO), Sep 9 (WE), Sep 14 (MO).
    expect(out.map((e) => e.start)).toEqual([
      "2026-09-02T09:00",
      "2026-09-07T09:00",
      "2026-09-09T09:00",
      "2026-09-14T09:00",
    ]);
  });

  it("unsupported rules fall back to the base instance", () => {
    const event = {
      id: "e6",
      title: "Exotic",
      start: "2026-09-01",
      "data-rrule": "FREQ=WEEKLY;BYSETPOS=2;BYDAY=MO",
    };
    const out = expandRecurrence(event, RANGE);
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe("e6");
  });
});

describe("expandRecurrences", () => {
  it("passes non-recurring events through untouched and expands the rest", () => {
    const plain = { id: "p1", title: "One-off", start: "2026-09-05T13:00" };
    const recurring = {
      id: "r1",
      title: "Weekly",
      start: "2026-09-02T09:00",
      "data-rrule": "FREQ=WEEKLY;BYDAY=WE;COUNT=3",
    };
    const out = expandRecurrences([plain, recurring], RANGE);
    expect(out.map((e) => e.start)).toEqual([
      "2026-09-05T13:00",
      "2026-09-02T09:00",
      "2026-09-09T09:00",
      "2026-09-16T09:00",
    ]);
  });

  it("is range-capped: unbounded rules generate nothing beyond the range", () => {
    const event = {
      id: "u1",
      title: "Forever weekly",
      start: "2026-09-01T09:00",
      "data-rrule": "FREQ=WEEKLY;BYDAY=TU",
    };
    const out = expandRecurrence(event, RANGE);
    // Sept 1 → Oct 6 weekly = 6 occurrences, base included.
    expect(out).toHaveLength(6);
    expect(out.at(-1)?.start?.toString().startsWith("2026-10-06")).toBe(true);
  });
});
