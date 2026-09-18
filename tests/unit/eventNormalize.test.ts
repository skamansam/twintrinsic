/**
 * Unit tests for the eventNormalize helper (plan item 11.1, milestone 3).
 * Pure helper tests — native Temporal only; Node lacks a Temporal global,
 * so the suite installs the polyfill *as the global*, mirroring exactly
 * the shape a consumer's polyfill install takes (the library itself never
 * imports it).
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §3
 */
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
	eventsForDay,
	normalizeEvent,
	normalizeEvents,
} from "../../src/lib/helpers/eventNormalize.js"

beforeEach(() => {
	vi.stubGlobal("Temporal", TemporalPolyfill)
})

afterEach(() => {
	vi.unstubAllGlobals()
})

describe("normalizeEvent", () => {
	it("parses date-only strings into all-day events", () => {
		const ne = normalizeEvent({ id: "1", title: "Launch", start: "2026-09-17" })
		expect(ne.startDay.toString()).toBe("2026-09-17")
		expect(ne.endDay.toString()).toBe("2026-09-17")
		expect(ne.allDay).toBe(true)
		expect(ne.startTime).toBeUndefined()
	})

	it("parses datetime strings with a start time", () => {
		const ne = normalizeEvent({ id: "2", title: "Standup", start: "2026-09-17T09:30" })
		expect(ne.startDay.toString()).toBe("2026-09-17")
		expect(ne.allDay).toBe(false)
		expect(ne.startTime).toBe("09:30")
	})

	it("accepts PlainDate, PlainDateTime, and ZonedDateTime instants", () => {
		const pd = TemporalPolyfill.PlainDate.from("2026-09-17")
		const pdt = TemporalPolyfill.PlainDateTime.from("2026-09-17T14:00")
		const zdt = TemporalPolyfill.ZonedDateTime.from("2026-09-17T23:30[America/Los_Angeles]")
		expect(normalizeEvent({ id: "a", title: "d", start: pd }).startDay.toString()).toBe("2026-09-17")
		expect(normalizeEvent({ id: "b", title: "dt", start: pdt }).startDay.toString()).toBe("2026-09-17")
		// 23:30 in LA is Sept 17 in the event's own zone — the design guarantee.
		expect(normalizeEvent({ id: "c", title: "zdt", start: zdt }).startDay.toString()).toBe("2026-09-17")
	})

	it("keeps wall-clock date for offset datetime strings (design §1)", () => {
		const ne = normalizeEvent({ id: "3", title: "Nightly", start: "2026-09-17T23:30-08:00" })
		// The offset is ignored for day placement — the source wall-clock date wins.
		expect(ne.startDay.toString()).toBe("2026-09-17")
		expect(ne.startTime).toBe("23:30")
	})

	it("infers allDay=false for timed instants and honors explicit allDay", () => {
		expect(normalizeEvent({ id: "4", title: "t", start: "2026-09-17T08:00" }).allDay).toBe(false)
		expect(normalizeEvent({ id: "5", title: "t", start: "2026-09-17", allDay: false }).allDay).toBe(false)
		expect(normalizeEvent({ id: "6", title: "t", start: "2026-09-17T08:00", allDay: true }).allDay).toBe(true)
	})

	it("expands multi-day spans inclusive of the end day", () => {
		const ne = normalizeEvent({ id: "7", title: "Conference", start: "2026-09-15", end: "2026-09-18" })
		expect(ne.startDay.toString()).toBe("2026-09-15")
		expect(ne.endDay.toString()).toBe("2026-09-18")
	})

	it("flags cancelled events", () => {
		const ne = normalizeEvent({ id: "8", title: "Gone", start: "2026-09-17", status: "cancelled" })
		expect(ne.cancelled).toBe(true)
		expect(normalizeEvent({ id: "9", title: "Ok", start: "2026-09-17" }).cancelled).toBe(false)
	})
})

describe("normalizeEvents (list)", () => {
	it("sorts by start day, then time, then id", () => {
		const out = normalizeEvents([
			{ id: "late", title: "L", start: "2026-09-17T18:00" },
			{ id: "early", title: "E", start: "2026-09-17T09:00" },
			{ id: "prev", title: "P", start: "2026-09-16" },
			{ id: "early2", title: "E2", start: "2026-09-17T09:00" },
			{ id: "next-month", title: "N", start: "2026-10-01" },
		])
		expect(out.map((e) => e.event.id)).toEqual(["prev", "early", "early2", "late", "next-month"])
	})

	it("returns an empty list for empty input", () => {
		expect(normalizeEvents([])).toEqual([])
	})
})

describe("eventsForDay", () => {
	const input = [
		{ id: "single", title: "S", start: "2026-09-17" },
		{ id: "span", title: "M", start: "2026-09-15", end: "2026-09-18" },
		{ id: "later", title: "L", start: "2026-09-20" },
	]

	function events() {
		// Built per-call: module scope would run before the Temporal stub installs.
		return normalizeEvents(input)
	}

	it("returns events whose span covers the day (inclusive both ends)", () => {
		const ids = events()
			.filter((e) => e.event.id !== "later")
			.map((e) => e.event.id)
		const covered = eventsForDay(events(), TemporalPolyfill.PlainDate.from("2026-09-17")).map((e) => e.event.id)
		expect(covered).toEqual(["span", "single"])
		expect(ids).toContain("single")
	})

	it("returns nothing for days outside every span", () => {
		expect(eventsForDay(events(), TemporalPolyfill.PlainDate.from("2026-09-19"))).toEqual([])
	})
})
