/**
 * Unit tests for the CalendarView month-grid math (plan item 11.1,
 * milestone 2). Pure helper tests — native Temporal only, no component
 * render. Node ≥ 24 does not expose Temporal globally yet, so this suite
 * imports the polyfill directly to stand in for the browser global; the
 * library itself never ships or imports it — consumers opt in.
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §2
 */
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { buildMonthGrid, monthTitle, resolveWeekStart, weekdayHeaders } from "../../src/lib/helpers/calendarGrid.js"

// The helpers read the runtime `Temporal` global (no-polyfill policy).
// Native browsers provide it; this suite provides it the same way a
// consumer's polyfill install would.
beforeAll(() => {
	vi.stubGlobal("Temporal", TemporalPolyfill)
})
afterAll(() => {
	vi.unstubAllGlobals()
})

/** 2026-09: the 1st is a Tuesday; 30 days; Sept 17 2026 is a Thursday. */
const SEP_2026 = TemporalPolyfill.PlainDate.from("2026-09-17")
/** 2026-02: 1st is a Sunday, 28 days — the minimal 4-week case. */
const FEB_2026 = TemporalPolyfill.PlainDate.from("2026-02-15")

describe("resolveWeekStart", () => {
	/** Installs a minimal Intl.Locale whose weekInfo is as given (or absent). */
	function mockLocale(weekInfo: { firstDay: number } | undefined): void {
		const originalIntl = Intl
		const realLocale = originalIntl.Locale
		const scoped = Object.assign(Object.create(Object.getPrototypeOf(originalIntl)), originalIntl, {
			Locale: class extends realLocale {
				constructor(...args: ConstructorParameters<typeof Intl.Locale>) {
					super(...args)
				}
				get weekInfo() {
					return weekInfo
				}
			},
		})
		;(globalThis as { Intl: typeof Intl }).Intl = scoped
		;(mockLocale as { restore?: () => void }).restore = () => {
			;(globalThis as { Intl: typeof Intl }).Intl = originalIntl
		}
	}

	afterEach(() => {
		// Restore only Intl — unstubbing everything would also remove the
		// Temporal global installed by the file-level beforeAll.
		;(mockLocale as { restore?: () => void }).restore?.()
	})

	it("passes explicit numeric week starts through", () => {
		expect(resolveWeekStart(0)).toBe(0)
		expect(resolveWeekStart(1)).toBe(1)
		expect(resolveWeekStart(6)).toBe(6)
	})

	it("reads firstDay from the runtime locale's weekInfo when present", () => {
		// Node ≥ 24 exposes real weekInfo (en-US: Sunday = CLDR 7).
		expect(resolveWeekStart("auto", "en-US")).toBe(0)
		expect(resolveWeekStart("auto", "de-DE")).toBe(1)
	})

	it("defaults to ISO Monday when the runtime lacks weekInfo", () => {
		mockLocale(undefined)
		expect(resolveWeekStart("auto", "en-US")).toBe(1)
	})

	it("maps CLDR firstDay 7 (Sunday) to 0, 1 (Monday) stays 1", () => {
		mockLocale({ firstDay: 7 })
		expect(resolveWeekStart("auto", "en-US")).toBe(0)
		mockLocale({ firstDay: 1 })
		expect(resolveWeekStart("auto", "de-DE")).toBe(1)
		mockLocale({ firstDay: 6 })
		expect(resolveWeekStart("auto", "ar-EG")).toBe(6)
	})

	it("falls back to Monday when the locale tag is invalid in a weekInfo-less runtime", () => {
		// Node normalizes unknown tags ("not-a-locale" → en-US), so this only
		// reaches the catch-fallback when weekInfo is absent as well.
		mockLocale(undefined)
		expect(resolveWeekStart("auto", "not-a-locale")).toBe(1)
	})
})

describe("buildMonthGrid", () => {
	it("returns exactly 42 cells (6×7) by default", () => {
		expect(buildMonthGrid(SEP_2026)).toHaveLength(42)
	})

	it("starts the grid on the configured weekday (Monday default)", () => {
		const grid = buildMonthGrid(SEP_2026, { weekStart: 1 })
		expect(grid[0].dayOfWeek).toBe(1) // Monday
		expect(grid[7].dayOfWeek).toBe(1)
	})

	it("starts on Sunday when weekStart is 0", () => {
		const grid = buildMonthGrid(SEP_2026, { weekStart: 0 })
		expect(grid[0].dayOfWeek).toBe(7) // ISO Sunday
	})

	it("places day 1 of the month in the correct column", () => {
		// September 1, 2026 is a Tuesday → column 1 with a Monday week start.
		const grid = buildMonthGrid(SEP_2026, { weekStart: 1 })
		const firstCell = grid.findIndex((d) => d.day === 1 && d.month === 9)
		expect(firstCell).toBe(1)
		// With a Sunday start it lands in column 2.
		const gridSun = buildMonthGrid(SEP_2026, { weekStart: 0 })
		const firstCellSun = gridSun.findIndex((d) => d.day === 1 && d.month === 9)
		expect(firstCellSun).toBe(2)
	})

	it("leads with previous-month days that are contiguous", () => {
		const grid = buildMonthGrid(SEP_2026, { weekStart: 1 })
		// Leading cell is the last day of August.
		expect(grid[0].month).toBe(8)
		expect(grid[0].day).toBe(31)
		expect(grid[0].add({ days: 1 })).toEqual(grid[1])
	})

	it("trails into the next month to fill the fixed grid", () => {
		const grid = buildMonthGrid(SEP_2026, { weekStart: 1 })
		const last = grid[grid.length - 1]
		expect(last.month).toBe(10) // October
		expect(last).toEqual(TemporalPolyfill.PlainDate.from("2026-10-11"))
	})

	it("contains every day of the target month exactly once", () => {
		const grid = buildMonthGrid(SEP_2026, { weekStart: 0 })
		const septemberDays = grid.filter((d) => d.month === 9 && d.year === 2026)
		expect(septemberDays).toHaveLength(30)
		expect(new Set(septemberDays.map((d) => d.day)).size).toBe(30)
	})

	it("handles the minimal 4-week February case without shifting columns", () => {
		// Feb 2026 starts on Sunday; with a Sunday week start the month fits
		// in exactly 4 rows — the grid still stays 42 cells and day 1 is in
		// column 0.
		const grid = buildMonthGrid(FEB_2026, { weekStart: 0 })
		expect(grid).toHaveLength(42)
		expect(grid[0].day).toBe(1)
		expect(grid[0].month).toBe(2)
	})

	it("clamps month arithmetic across year boundaries", () => {
		// December 2026: trailing cells run into January 2027.
		const grid = buildMonthGrid(TemporalPolyfill.PlainDate.from("2026-12-15"), { weekStart: 1 })
		const last = grid[grid.length - 1]
		expect(last.year).toBe(2027)
		expect(last.month).toBe(1)
	})

	it("supports variable row counts via the weeks option", () => {
		expect(buildMonthGrid(SEP_2026, { weeks: 5 })).toHaveLength(35)
	})

	it("is deterministic for any date within the same month", () => {
		const a = buildMonthGrid(TemporalPolyfill.PlainDate.from("2026-09-01"), { weekStart: 1 })
		const b = buildMonthGrid(TemporalPolyfill.PlainDate.from("2026-09-30"), { weekStart: 1 })
		expect(a).toEqual(b)
	})

	it("never uses the legacy Date type", () => {
		const grid = buildMonthGrid(SEP_2026)
		for (const cell of grid) {
			expect(cell).toBeInstanceOf(TemporalPolyfill.PlainDate)
		}
	})
})

describe("weekdayHeaders", () => {
	it("returns 7 labels starting on the configured day", () => {
		const headers = weekdayHeaders(1, "en-US")
		expect(headers).toHaveLength(7)
		expect(headers[0]).toBe("Mon")
		expect(headers[6]).toBe("Sun")
	})

	it("rotates for a Sunday week start", () => {
		const headers = weekdayHeaders(0, "en-US")
		expect(headers[0]).toBe("Sun")
		expect(headers[1]).toBe("Mon")
	})

	it("localizes weekday names", () => {
		// German short weekdays — the polyfill renders these without CLDR's
		// trailing period; the assertion pins the non-English behavior.
		const headers = weekdayHeaders(1, "de-DE")
		expect(headers[0]).toBe("Mo")
		expect(headers[6]).toBe("So")
	})
})

describe("monthTitle", () => {
	it("formats month + year in the given locale", () => {
		expect(monthTitle(SEP_2026, "en-US")).toBe("September 2026")
		expect(monthTitle(SEP_2026, "de-DE")).toBe("September 2026")
	})

	it("reflects the month of the passed date, not today", () => {
		expect(monthTitle(TemporalPolyfill.PlainDate.from("2025-01-01"), "en-US")).toBe("January 2025")
	})
})
