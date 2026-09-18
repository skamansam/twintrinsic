/**
 * Unit tests for the connectivity contract (plan item 11.1, milestone 6).
 * Pure helper tests — mock fetchers only, no network, no Temporal global
 * needed beyond the polyfill install (Node lacks the native global).
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §4
 */
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";
import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  connectCalendars,
  isCalendarSource,
  type CalendarSource,
} from "../../src/lib/helpers/connectCalendars.js";

beforeAll(() => {
  vi.stubGlobal("Temporal", TemporalPolyfill);
});

const RANGE = {
  start: TemporalPolyfill.PlainDate.from("2026-09-01"),
  end: TemporalPolyfill.PlainDate.from("2026-09-30"),
};

/** A source that always resolves with the given events. */
function source(id: string, events: Array<Record<string, unknown>> = []): CalendarSource {
  return { id, name: id, color: `#${id}`, fetchEvents: vi.fn().mockResolvedValue(events) };
}

describe("connectCalendars", () => {
  it("concatenates events from every source in source order", async () => {
    const a = source("a", [{ id: "a1", title: "From A", start: "2026-09-02" }]);
    const b = source("b", [
      { id: "b1", title: "From B", start: "2026-09-03" },
      { id: "b2", title: "Also B", start: "2026-09-04" },
    ]);
    const { events, errors } = await connectCalendars([a, b], RANGE);
    expect(events.map((e) => e.id)).toEqual(["a1", "b1", "b2"]);
    expect(errors).toEqual([]);
  });

  it("stamps calendarId and falls back color to the calendar's color", async () => {
    const a = source("a", [{ id: "a1", title: "Plain", start: "2026-09-02" }]);
    const b = source("b", [{ id: "b1", title: "Custom", start: "2026-09-02", color: "#custom" }]);
    const { events } = await connectCalendars([a, b], RANGE);
    expect(events[0].calendarId).toBe("a");
    expect(events[0].color).toBe("#a");
    // Event-provided color wins over the calendar's.
    expect(events[1].color).toBe("#custom");
  });

  it("respects an event's own calendarId without overwriting", async () => {
    const a = source("a", [
      { id: "a1", title: "Pinned", start: "2026-09-02", calendarId: "elsewhere" },
    ]);
    const { events } = await connectCalendars([a], RANGE);
    expect(events[0].calendarId).toBe("elsewhere");
  });

  it("a failing source surfaces in errors while the rest still render", async () => {
    const failing: CalendarSource = {
      id: "flaky",
      name: "Flaky",
      color: "#f00",
      fetchEvents: vi.fn().mockRejectedValue(new Error("CORS")),
    };
    const healthy = source("ok", [{ id: "ok1", title: "Fine", start: "2026-09-02" }]);
    const { events, errors } = await connectCalendars([failing, healthy], RANGE);
    expect(events.map((e) => e.id)).toEqual(["ok1"]);
    expect(errors).toHaveLength(1);
    expect(errors[0].sourceId).toBe("flaky");
  });

  it("passes the range through to every fetcher", async () => {
    const fetcher = vi.fn().mockResolvedValue([]);
    const a: CalendarSource = { id: "a", name: "a", color: "#a", fetchEvents: fetcher };
    await connectCalendars([a], RANGE);
    expect(fetcher).toHaveBeenCalledWith(RANGE);
  });

  it("sources with no events contribute nothing", async () => {
    const { events, errors } = await connectCalendars([source("empty")], RANGE);
    expect(events).toEqual([]);
    expect(errors).toEqual([]);
  });
});

describe("isCalendarSource", () => {
  it("accepts a well-formed source", () => {
    expect(isCalendarSource(source("a"))).toBe(true);
  });

  it("rejects objects missing the fetcher or descriptors", () => {
    expect(isCalendarSource(null)).toBe(false);
    expect(isCalendarSource({ id: "a", name: "a", color: "#a" })).toBe(false);
    expect(isCalendarSource({ id: 1, name: "a", color: "#a", fetchEvents: async () => [] })).toBe(false);
  });
});
