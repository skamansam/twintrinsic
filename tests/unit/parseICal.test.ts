/**
 * Unit tests for the iCalendar parser (plan item 11.1, milestone 5).
 * Fixtures mirror **real Google Calendar .ics export output** (METHOD:
 * PUBLISH, X-WR-CALNAME, DTSTAMP, PRODID, escaped commas/semicolons,
 * folded lines) plus RFC 5545 edge cases. Pure helper tests — native
 * Temporal only; Node lacks a Temporal global, so the suite installs the
 * polyfill *as the global*, mirroring exactly the shape a consumer's
 * polyfill install takes (the library itself never imports it).
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §4
 */
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { parseICal, type ParsedICalEvent } from "../../src/lib/helpers/parseICal.js"
import { normalizeEvents } from "../../src/lib/helpers/eventNormalize.js"

// Install the polyfill as the global — the same shape a consumer's
// polyfill install produces in the browser.
let Temporal: typeof TemporalPolyfill

beforeEach(() => {
	;(globalThis as { Temporal?: typeof TemporalPolyfill }).Temporal = TemporalPolyfill
	Temporal = TemporalPolyfill
})

afterEach(() => {
	delete (globalThis as { Temporal?: typeof TemporalPolyfill }).Temporal
})

/** Trimmed-down Google Calendar export (structure and casing preserved). */
const GOOGLE_EXPORT = `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Team Calendar
X-WR-TIMEZONE:Europe/Berlin
BEGIN:VEVENT
DTSTART;TZID=Europe/Berlin:20260915T093000
DTEND;TZID=Europe/Berlin:20260915T100000
RRULE:FREQ=WEEKLY;BYDAY=TU;COUNT=10
DTSTAMP:20260901T120000Z
UID:goog-standup-9a8b7c6d@google.com
CREATED:20260801T101500Z
DESCRIPTION:Weekly sync.\\nAgenda: https://example.com/standup
LAST-MODIFIED:20260901T113000Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Team standup
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260921
DTEND;VALUE=DATE:20260922
DTSTAMP:20260901T120000Z
UID:goog-offsite-c3d4e5@google.com
CREATED:20260802T090000Z
DESCRIPTION:Quarterly planning offsite.
LAST-MODIFIED:20260901T100000Z
LOCATION:Berlin HQ\\, Room 4
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Planning offsite
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART:20260917T140000Z
DTEND:20260917T150000Z
DTSTAMP:20260901T120000Z
UID:utc-review-f6g7h8@google.com
STATUS:CONFIRMED
SUMMARY:UTC design review
END:VEVENT
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20260918T130000
DTSTAMP:20260901T120000Z
UID:tentative-i9j0k1@google.com
STATUS:TENTATIVE
SUMMARY:Maybe lunch
END:VEVENT
BEGIN:VEVENT
DTSTART:20260922T100000Z
DTSTAMP:20260901T120000Z
UID:cancelled-l2m3n4@google.com
STATUS:CANCELLED
SUMMARY:Cancelled retro
END:VEVENT
END:VCALENDAR`

/** Minimal hand-written feed for parser edge cases. */
const MINIMAL = `BEGIN:VCALENDAR
BEGIN:VEVENT
DTSTART:20260910T080000
SUMMARY:Simple event
END:VEVENT
END:VCALENDAR`

describe("parseICal", () => {
	it("parses a real-shaped Google export into events", () => {
		const events = parseICal(GOOGLE_EXPORT)
		expect(events).toHaveLength(5)
		expect(events.map((e) => e.title)).toEqual([
			"Team standup",
			"Planning offsite",
			"UTC design review",
			"Maybe lunch",
			"Cancelled retro",
		])
	})

	it("converts iCalendar DATE-TIME with TZID to wall-clock local strings", () => {
		const events = parseICal(GOOGLE_EXPORT)
		const standup = events[0] as ParsedICalEvent
		expect(standup.start).toBe("2026-09-15T09:30")
		expect(standup.tzid).toBe("Europe/Berlin")
		expect(standup.uid).toBe("goog-standup-9a8b7c6d@google.com")
		expect(standup.recurring).toBe(true)
	})

	it("converts VALUE=DATE forms to all-day events with inclusive end", () => {
		const events = parseICal(GOOGLE_EXPORT)
		const offsite = events[1] as ParsedICalEvent
		expect(offsite.start).toBe("2026-09-21")
		expect(offsite.end).toBe("2026-09-22")
		expect(offsite.allDay).toBe(true)
	})

	it("drops the UTC Z designator without shifting the wall clock", () => {
		const events = parseICal(GOOGLE_EXPORT)
		const utc = events[2] as ParsedICalEvent
		expect(utc.start).toBe("2026-09-17T14:00")
		// The wall clock is untouched: 14:00 stays 14:00 (no conversion).
		const day = Temporal.PlainDateTime.from(utc.start as string).toPlainDate()
		expect(day.toString()).toBe("2026-09-17")
	})

	it("applies defaultTz to floating times and records the zone", () => {
		const events = parseICal(MINIMAL, { defaultTz: "America/Chicago" })
		const ev = events[0] as ParsedICalEvent
		expect(ev.start).toBe("2026-09-10T08:00")
		expect(ev.tzid).toBe("America/Chicago")
	})

	it("unescapes TEXT per RFC 5545 (commas, semicolons, newlines, backslashes)", () => {
		const events = parseICal(GOOGLE_EXPORT)
		const offsite = events[1] as ParsedICalEvent
		// Fixture: `Berlin HQ\\\\, Room 4` → file value `Berlin HQ\\, Room 4`
		// → unescape pass 1 `Berlin HQ\, Room 4` → pass 2 `Berlin HQ, Room 4`.
		expect(offsite.location).toBe("Berlin HQ, Room 4")
		const standup = events[0] as ParsedICalEvent
		expect(standup.description).toContain("Agenda: https://example.com/standup")
		expect(standup.description).toContain("\n")
	})

	it("maps STATUS onto the event status subset", () => {
		const events = parseICal(GOOGLE_EXPORT)
		expect((events[0] as ParsedICalEvent).status).toBe("confirmed")
		expect((events[3] as ParsedICalEvent).status).toBe("tentative")
		expect((events[4] as ParsedICalEvent).status).toBe("cancelled")
	})

	it("unfolds RFC 5545 continuation lines", () => {
		const folded = `BEGIN:VCALENDAR
BEGIN:VEVENT
DTSTART:20260910T080000
SUMMARY:This summary is long
 and continues here
END:VEVENT
END:VCALENDAR`
		const events = parseICal(folded)
		expect(events[0]?.title).toBe("This summary is longand continues here")
	})

	it("generates ids when UID is missing and skips events without DTSTART", () => {
		const text = `BEGIN:VCALENDAR
BEGIN:VEVENT
SUMMARY:No DTSTART at all
END:VEVENT
BEGIN:VEVENT
DTSTART:20260912T090000
SUMMARY:No UID
END:VEVENT
END:VCALENDAR`
		const events = parseICal(text)
		expect(events).toHaveLength(1)
		expect(events[0]?.id).toMatch(/^ical-1$/)
		expect(events[0]?.uid).toBeUndefined()
	})

	it("ignores VTODO and other non-VEVENT components", () => {
		const text = `BEGIN:VCALENDAR
BEGIN:VTODO
DTSTART:20260910T080000
SUMMARY:A todo
END:VTODO
BEGIN:VEVENT
DTSTART:20260911T090000
SUMMARY:A real event
END:VEVENT
END:VCALENDAR`
		const events = parseICal(text)
		expect(events).toHaveLength(1)
		expect(events[0]?.title).toBe("A real event")
	})

	it("output feeds straight into the CalendarView event pipeline", () => {
		const events = parseICal(GOOGLE_EXPORT)
		const normalized = normalizeEvents(events)
		// Sept 21 offsite is all-day, Sept 15 standup timed.
		expect(normalized.map((ne) => ne.event.title)).toContain("Planning offsite")
		const standup = normalized.find((ne) => ne.event.title === "Team standup")
		expect(standup?.startTime).toBe("09:30")
		expect(standup?.allDay).toBe(false)
	})

	it("parses an Outlook-style feed with quoted params and trailing semicolon", () => {
		const outlook = `BEGIN:VCALENDAR
PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN
VERSION:2.0
BEGIN:VEVENT
DTSTART;TZID="W. Europe Standard Time":20260916T110000
DTEND;TZID="W. Europe Standard Time":20260916T120000
UID:outlook-1@microsoft.com
SUMMARY:Graph sync; quarterly
LOCATION:Teams
END:VEVENT
END:VCALENDAR`
		const events = parseICal(outlook)
		expect(events[0]?.start).toBe("2026-09-16T11:00")
		expect(events[0]?.tzid).toBe("W. Europe Standard Time")
		expect(events[0]?.title).toBe("Graph sync; quarterly")
	})
})
