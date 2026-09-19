/**
 * Unit tests for the CalendarView sub-row lane assignment (plan item
 * 11.1, phase 2): overlapping multi-day events must claim side-by-side
 * lanes per week row so they render side by instead of stacked. Pure
 * helper tests — native Temporal only; Node lacks a Temporal global, so
 * the suite installs the polyfill *as the global*, mirroring exactly the
 * shape a consumer's polyfill install takes (the library itself never
 * imports it).
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §3 (phase-2 sub-row lanes)
 */
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { assignEventLanes, computeWeekLanes } from "../../src/lib/helpers/eventLanes.js";
import { normalizeEvents } from "../../src/lib/helpers/eventNormalize.js";
import type { CalendarViewEvent } from "../../src/lib/helpers/eventNormalize.js";

// Install the polyfill as the global — the same shape a consumer's
// polyfill install produces in the browser.
let Temporal: typeof TemporalPolyfill;

beforeEach(() => {
  (globalThis as { Temporal?: typeof TemporalPolyfill }).Temporal = TemporalPolyfill;
  Temporal = TemporalPolyfill;
});
void Temporal;

afterEach(() => {
  delete (globalThis as { Temporal?: typeof TemporalPolyfill }).Temporal;
});

/** Week of Mon 2026-09-07 … Sun 2026-09-13. */
const WEEK_START = TemporalPolyfill.PlainDate.from("2026-09-07");
const WEEK_END = TemporalPolyfill.PlainDate.from("2026-09-13");

/** Shorthand: normalize raw events (handles the day math for us). */
function norm(events: CalendarViewEvent[]) {
  return normalizeEvents(events, "2026-09");
}

/** A multi-day all-day span within the test week. */
function span(id: string, startIso: string, endIso: string): CalendarViewEvent {
  return { id, title: id, start: startIso, end: endIso, allDay: true };
}

describe("assignEventLanes", () => {
  it("gives sequential (non-overlapping) spans the same lane", () => {
    const events = norm([
      span("a", "2026-09-07", "2026-09-09"), // Mon–Tue
      span("b", "2026-09-10", "2026-09-11"), // Wed only
    ]);
    const { lanes, count } = assignEventLanes(events, WEEK_START, WEEK_END);
    expect(count).toBe(1);
    expect(lanes.get("a")).toBe(1);
    expect(lanes.get("b")).toBe(1);
  });

  it("gives overlapping spans separate lanes", () => {
    const events = norm([
      span("a", "2026-09-07", "2026-09-11"), // Mon–Fri
      span("b", "2026-09-08", "2026-09-09"), // Tue–Wed, overlaps a
    ]);
    const { lanes, count } = assignEventLanes(events, WEEK_START, WEEK_END);
    expect(count).toBe(2);
    expect(lanes.get("a")).toBe(1);
    expect(lanes.get("b")).toBe(2);
  });

  it("packs a third span into the lowest free lane", () => {
    const events = norm([
      span("a", "2026-09-07", "2026-09-11"), // Mon–Fri → lane 1
      span("b", "2026-09-08", "2026-09-09"), // Tue–Wed → lane 2
      // Thu–Fri touches nothing b covers (b ends Wed): reuses lane 2? No —
      // a occupies lane 1 through Fri, b through Wed; Thu is free in lane 2.
      span("c", "2026-09-10", "2026-09-11"),
    ]);
    const { lanes, count } = assignEventLanes(events, WEEK_START, WEEK_END);
    expect(lanes.get("c")).toBe(2);
    expect(count).toBe(2);
  });

  it("orders equal-start spans longest first", () => {
    const events = norm([
      span("short", "2026-09-07", "2026-09-08"),
      span("long", "2026-09-07", "2026-09-13"),
    ]);
    const { lanes } = assignEventLanes(events, WEEK_START, WEEK_END);
    expect(lanes.get("long")).toBe(1);
    expect(lanes.get("short")).toBe(2);
  });

  it("ignores single-day events (no lanes, normal stacked flow)", () => {
    const events = norm([
      span("one", "2026-09-08", "2026-09-08"),
      span("two", "2026-09-09", "2026-09-09"),
    ]);
    const { lanes, count } = assignEventLanes(events, WEEK_START, WEEK_END);
    expect(count).toBe(0);
    expect(lanes.size).toBe(0);
  });

  it("clips spans coming from the previous week", () => {
    const events = norm([span("prev", "2026-09-05", "2026-09-09")]);
    const { lanes, count } = assignEventLanes(events, WEEK_START, WEEK_END);
    expect(count).toBe(1);
    expect(lanes.get("prev")).toBe(1);
  });

  it("ignores events entirely outside the week", () => {
    const events = norm([
      span("before", "2026-09-01", "2026-09-05"),
      span("after", "2026-09-14", "2026-09-15"),
    ]);
    const { lanes, count } = assignEventLanes(events, WEEK_START, WEEK_END);
    expect(count).toBe(0);
    expect(lanes.size).toBe(0);
  });

  it("mixed week: multi-day spans lane up, single-day chips do not consume lanes", () => {
    const events = norm([
      span("offsite", "2026-09-08", "2026-09-10"),
      { id: "standup", title: "Standup", start: "2026-09-09T09:30" },
    ]);
    const { lanes, count } = assignEventLanes(events, WEEK_START, WEEK_END);
    expect(count).toBe(1);
    expect(lanes.get("offsite")).toBe(1);
    expect(lanes.has("standup")).toBe(false);
  });
});

describe("computeWeekLanes", () => {
  it("assigns lanes per week and reports the grid-wide max", () => {
    const week1 = [6, 7, 8, 9, 10, 11, 12].map((d) =>
      TemporalPolyfill.PlainDate.from(`2026-09-${String(d).padStart(2, "0")}`),
    );
    const week2 = [13, 14, 15, 16, 17, 18, 19].map((d) =>
      TemporalPolyfill.PlainDate.from(`2026-09-${String(d).padStart(2, "0")}`),
    );
    const events = norm([
      span("a", "2026-09-08", "2026-09-09"), // week 1: sequential with b
      span("b", "2026-09-10", "2026-09-11"),
      span("c", "2026-09-15", "2026-09-17"), // week 2
      span("d", "2026-09-16", "2026-09-18"), // week 2, overlaps c → 2 lanes
    ]);
    const { maps, count } = computeWeekLanes([week1, week2], events);
    expect(count).toBe(2);
    expect(maps[0].get("a")).toBe(1);
    expect(maps[0].get("b")).toBe(1);
    expect(maps[1].get("c")).toBe(1);
    expect(maps[1].get("d")).toBe(2);
  });
});
