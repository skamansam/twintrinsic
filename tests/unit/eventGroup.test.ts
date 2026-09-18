/**
 * Unit tests for the eventGroup helper (plan item 11.1, milestone 4).
 * Pure helper tests — native Temporal only; Node lacks a Temporal global,
 * so the suite installs the polyfill *as the global*, mirroring exactly
 * the shape a consumer's polyfill install takes (the library itself never
 * imports it).
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §"Rendering & CSS" (M4)
 */
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { normalizeEvents } from "../../src/lib/helpers/eventNormalize.js";
import {
  dedupKey,
  groupEvents,
  sourceColors,
  sourceCount,
} from "../../src/lib/helpers/eventGroup.js";

// Install the polyfill as the global — the same shape a consumer's
// polyfill install produces in the browser.
beforeEach(() => {
  (globalThis as { Temporal?: typeof TemporalPolyfill }).Temporal = TemporalPolyfill;
});

afterEach(() => {
  delete (globalThis as { Temporal?: typeof TemporalPolyfill }).Temporal;
});

/** Two colleagues' calendars sharing one standup (UID dedup) + private events. */
const WORK = [
  {
    id: "w1",
    uid: "standup@google.com",
    title: "Standup",
    start: "2026-09-15T09:30",
    color: "#10b981",
  },
  { id: "w2", title: "Deep work", start: "2026-09-15T14:00", color: "#6366f1" },
];
const PERSONAL = [
  {
    id: "p1",
    uid: "standup@google.com",
    title: "Standup",
    start: "2026-09-15T09:30",
    color: "#f59e0b",
  },
  { id: "p2", title: "Dentist", start: "2026-09-16T11:00", color: "#ef4444" },
];

describe("dedupKey", () => {
  it("prefers the iCal UID when present", () => {
    const [ne] = normalizeEvents([WORK[0]]);
    // Key includes the start day: occurrences of a recurring series must
    // not merge with each other, only with the same occurrence cross-calendar.
    expect(dedupKey(ne)).toBe("uid:standup@google.com@2026-09-15");
  });

  it("falls back to title + startDay + startTime", () => {
    const [ne] = normalizeEvents([{ id: "x", title: "Sync", start: "2026-09-15T14:00" }]);
    expect(dedupKey(ne)).toBe("fb:Sync|2026-09-15|14:00");
  });

  it("uses an allday sentinel so a timed event never matches its all-day twin", () => {
    const timed = normalizeEvents([{ id: "t", title: "Sync", start: "2026-09-15T14:00" }])[0];
    const allDay = normalizeEvents([{ id: "a", title: "Sync", start: "2026-09-15" }])[0];
    expect(dedupKey(timed)).not.toBe(dedupKey(allDay));
  });
});

describe("groupEvents", () => {
  it("merges same-UID events from different calendars into one group", () => {
    const grouped = groupEvents(normalizeEvents([...WORK, ...PERSONAL]));
    const standup = grouped.find((g) => g.sources.length === 2);
    expect(standup?.sources.map((s) => s.id)).toEqual(["p1", "w1"]);
    // Primary is the first source (normalizeEvents' deterministic order).
    expect(standup?.startTime).toBe("09:30");
  });

  it("keeps unshared events as single-source groups", () => {
    const grouped = groupEvents(normalizeEvents([...WORK, ...PERSONAL]));
    const deepWork = grouped.find((g) => g.event.id === "w2");
    expect(deepWork?.sources).toHaveLength(1);
    expect(deepWork?.sources[0]?.id).toBe("w2");
  });

  it("falls back to title+day+time when UIDs are absent", () => {
    const a = { id: "a", title: "Sync", start: "2026-09-15T14:00", color: "#111" };
    const b = { id: "b", title: "Sync", start: "2026-09-15T14:00", color: "#222" };
    const grouped = groupEvents(normalizeEvents([a, b]));
    expect(grouped.filter((g) => g.event.title === "Sync")).toHaveLength(1);
    expect(grouped.find((g) => g.event.title === "Sync")?.sources).toHaveLength(2);
  });

  it("does not merge renamed meetings on the fallback key (documented limit)", () => {
    const a = { id: "a", title: "Sync", start: "2026-09-15T14:00" };
    const b = { id: "b", title: "Sync (renamed)", start: "2026-09-15T14:00" };
    const grouped = groupEvents(normalizeEvents([a, b]));
    expect(grouped).toHaveLength(2);
  });

  it("preserves first-appearance order and carries spans through", () => {
    const multi = { id: "m", title: "Conf", start: "2026-09-15", end: "2026-09-18" };
    const grouped = groupEvents(normalizeEvents([multi, ...WORK]));
    expect(grouped[0]?.event.id).toBe("m");
    expect(grouped[0]?.endDay.toString()).toBe("2026-09-18");
  });

  it("cancelled status survives via the primary source", () => {
    const cancelledCopy = {
      id: "p3",
      uid: "standup@google.com",
      title: "Standup",
      start: "2026-09-15T09:30",
      status: "cancelled" as const,
    };
    const grouped = groupEvents(normalizeEvents([...WORK, cancelledCopy]));
    const merged = grouped.find((g) => g.sources.length === 2);
    // The primary (first source in normalizeEvents order — p3 sorts first)
    // supplies the rendering, including its cancelled status.
    expect(merged?.cancelled).toBe(true);
  });
});

describe("sourceCount / sourceColors", () => {
  it("counts sources and returns per-source colors in order", () => {
    const grouped = groupEvents(normalizeEvents([...WORK, ...PERSONAL]));
    const standup = grouped.find((g) => g.sources.length === 2);
    expect(sourceCount(standup)).toBe(2);
    expect(sourceColors(standup)).toEqual(["#f59e0b", "#10b981"]);
  });

  it("single events count as one source with their own color", () => {
    const [ne] = normalizeEvents([{ id: "solo", title: "Solo", start: "2026-09-15" }]);
    expect(sourceCount(ne)).toBe(1);
    expect(sourceColors(ne)).toEqual(["var(--color-primary)"]);
  });
});
