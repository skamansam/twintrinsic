/**
 * Calendar grid math for CalendarView (plan item 11.1) — built exclusively
 * on the native Temporal API (typed global; see `src/lib/temporal.d.ts`).
 * No `Date`, no date libraries, no polyfill shipped by Twintrinsic.
 *
 * The month grid is a fixed 6×7 (42-cell) matrix of `Temporal.PlainDate`s:
 * a constant cell count keeps the CSS grid stable between months, makes
 * e2e selectors deterministic, and gives keyboard End-key math a fixed
 * range. Months whose grid includes a fully out-of-month final row are
 * hidden in the view layer (CSS `:has()`), not by resizing the grid here.
 *
 * All arithmetic is calendar-aware by construction: `PlainDate.with`,
 * `.subtract`, and `.add` handle variable month lengths (28/30/31) and
 * year rollovers; `dayOfWeek` is ISO (Mon=1 … Sun=7).
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §2
 */

/** Day-of-week for the first grid column. 0 = Sunday … 6 = Saturday. */
export type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6

/**
 * Runtime accessor for the `Temporal` global. Read lazily (per call) rather
 * than captured at module scope so vitest's `vi.stubGlobal("Intl", …)` —
 * which *replaces* the global object — cannot sever the binding, and so
 * test suites can install a polyfill-backed `Temporal` global before
 * calling the helpers.
 */
function temporal(): typeof Temporal {
	return (globalThis as { Temporal: typeof Temporal }).Temporal
}

/** Grid column configuration. */
export interface GridOptions {
	/**
	 * Day the week starts on (0 = Sunday … 6 = Saturday).
	 * `"auto"` derives it from the runtime locale via
	 * `Intl.Locale.prototype.weekInfo.firstDay` where available, falling
	 * back to ISO Monday (`1`) elsewhere (e.g. Firefox).
	 * @default "auto"
	 */
	weekStart?: WeekStart | "auto"
	/** Number of rows in the grid. Keep 6 for a stable month view. */
	weeks?: number
	/** BCP 47 locale tag used to resolve `weekStart: "auto"` (defaults to the runtime locale). */
	locale?: string
}

/**
 * Resolves the effective first day of the week.
 *
 * `"auto"` reads `weekInfo.firstDay` from the runtime's default locale —
 * Chromium 131+/Safari 18.4+ expose it; runtimes without it fall back to
 * ISO Monday. Consumers override via the `weekStart` prop (documented
 * remedy per the CalendarView design, resolved decision #2).
 * @param weekStart - Configured week start (`0`–`6` or `"auto"`)
 * @param locale - BCP 47 locale tag override (defaults to the runtime locale)
 * @returns Day-of-week the grid starts on (0 = Sunday … 6 = Saturday)
 */
export function resolveWeekStart(
	weekStart: WeekStart | "auto" = "auto",
	locale?: string,
): WeekStart {
	if (weekStart !== "auto") return weekStart

	const tag = locale ?? (typeof navigator !== "undefined" ? navigator.language : "en")
	try {
		// weekInfo is Baseline 2024 (TS lib.dom lags) — read it defensively.
		const localeInstance = new Intl.Locale(tag) as Intl.Locale & {
			weekInfo?: { firstDay?: number }
		}
		const firstDay = localeInstance.weekInfo?.firstDay
		// CLDR firstDay: 1 = Monday … 7 = Sunday. Map Sunday(7) → 0.
		if (typeof firstDay === "number" && firstDay >= 1 && firstDay <= 7) {
			return ((firstDay % 7) as WeekStart) // 7 (Sunday) → 0, 1 (Mon) → 1, …
		}
	} catch {
		// Invalid locale tag — fall through to the ISO Monday default.
	}
	return 1
}

/**
 * Builds a 6×7 grid of `PlainDate`s covering the month of `month`,
 * starting on the configured week start.
 *
 * Leading cells come from the previous month and trailing cells run into
 * the next month, so the grid is exactly `weeks × 7` cells and column
 * `i` is always the same weekday. Cell membership is DOM order in the
 * view layer — no absolute positioning.
 * @param month - Any `PlainDate` inside the target month (time components ignored)
 * @param options - Grid configuration (`weekStart`, `weeks`)
 * @returns Exactly `weeks × 7` dates in row-major order (7 per week)
 */
export function buildMonthGrid(
	month: Temporal.PlainDate,
	{ weekStart = "auto", weeks = 6, locale }: GridOptions = {},
): Temporal.PlainDate[] {
	const start = resolveWeekStart(weekStart, locale)
	const first = month.with({ day: 1 })

	// Days to step back from the 1st to reach the configured week start.
	// ISO dayOfWeek is Mon=1..Sun=7; normalize into weekStart space.
	const firstDow = (first.dayOfWeek % 7) as WeekStart // Mon=1..Sat=6, Sun=0
	const back = (firstDow - start + 7) % 7
	const gridStart = first.subtract({ days: back })

	return Array.from({ length: weeks * 7 }, (_, i) => gridStart.add({ days: i }))
}

/**
 * Builds the weekday header labels for a grid with the given week start,
 * localized via `PlainDate.toLocaleString` in "short" format (e.g. "Mon").
 *
 * Uses `toLocaleString` rather than `Intl.DateTimeFormat.prototype.format`
 * because the latter coerces its argument through valueOf, which the
 * Temporal spec (and the polyfill) reject for Temporal objects.
 * @param weekStart - Day the week starts on (0 = Sunday … 6 = Saturday)
 * @param locale - BCP 47 locale tag (defaults to the runtime locale)
 * @returns 7 short weekday labels, grid-column order
 */
export function weekdayHeaders(weekStart: WeekStart, locale?: string): string[] {
	const tag = locale ?? (typeof navigator !== "undefined" ? navigator.language : "en")
	// 2023-01-02 is a Monday; offset each label from that base by
	// (weekStart - 1 + i) days so column 0 lands on the configured start day.
	const monday = temporal().PlainDate.from("2023-01-02")
	return Array.from({ length: 7 }, (_, i) =>
		monday
			.add({ days: (weekStart - 1 + i + 7) % 7 })
			.toLocaleString(tag, { weekday: "short" }),
	)
}

/**
 * Builds the full month title (e.g. "September 2026") localized via
 * `PlainDate.toLocaleString` (same valueOf-coercion rationale as
 * `weekdayHeaders`).
 * @param month - Any `PlainDate` inside the target month
 * @param locale - BCP 47 locale tag (defaults to the runtime locale)
 * @returns Localized month + year label
 */
export function monthTitle(month: Temporal.PlainDate, locale?: string): string {
	const tag = locale ?? (typeof navigator !== "undefined" ? navigator.language : "en")
	return month.toLocaleString(tag, { month: "long", year: "numeric" })
}
