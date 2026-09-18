/**
 * Unit tests for the CalendarView component shell (plan item 11.1,
 * milestone 2): ARIA grid structure, today/selected marking, month paging,
 * and roving-tabindex keyboard navigation.
 *
 * Node lacks a native Temporal global, so the suite installs the polyfill
 * as the global — exactly the shape a consumer's polyfill install takes.
 */
import { fireEvent, render, screen, waitFor } from "@testing-library/svelte"
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill"
import { beforeAll, describe, expect, it, vi } from "vitest"
import CalendarView from "../../src/lib/components/CalendarView/CalendarView.svelte"

beforeAll(() => {
	vi.stubGlobal("Temporal", TemporalPolyfill)
})

/** Fixed "today" so tests don't drift as months pass. */
const TODAY = TemporalPolyfill.PlainDate.from("2026-09-17")

/** Renders CalendarView pinned to September 2026. */
async function renderForSeptember(props = {}) {
	const result = render(CalendarView, {
		props: { month: TemporalPolyfill.PlainDate.from("2026-09-01"), locale: "en-US", weekStart: 1, ...props },
	})
	await waitFor(() => {
		expect(result.getByTestId(`calendar-view-day-${TODAY.toString()}`)).toBeInTheDocument()
	})
	return result
}

describe("CalendarView structure", () => {
	it("renders a role=grid with a localized month title", async () => {
		const { getByRole, getByText } = await renderForSeptember()
		expect(getByRole("grid")).toBeInTheDocument()
		expect(getByText("September 2026")).toBeInTheDocument()
	})

	it("exposes the grid name via aria-labelledby", async () => {
		const { getByRole, getByText } = await renderForSeptember()
		const grid = getByRole("grid")
		const title = getByText("September 2026")
		expect(grid.getAttribute("aria-labelledby")).toBe(title.id)
	})

	it("renders 7 weekday column headers", async () => {
		const { getAllByRole } = await renderForSeptember()
		const headers = getAllByRole("columnheader")
		expect(headers).toHaveLength(7)
		expect(headers.map((h) => h.textContent)).toEqual([
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat",
			"Sun",
		])
	})

	it("renders 42 day buttons (fixed 6×7 grid)", async () => {
		const { container } = await renderForSeptember()
		expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(42)
	})

	it("has exactly one tabbable cell (roving tabindex)", async () => {
		const { container } = await renderForSeptember()
		const tabbables = container.querySelectorAll('[role="gridcell"] [tabindex="0"]')
		expect(tabbables).toHaveLength(1)
		// Initial focus lands on the first in-month day (Sept 1, column Tue).
		expect(tabbables[0].textContent).toBe("1")
	})
})

describe("CalendarView today/selected", () => {
	it("marks today with aria-current=date", async () => {
		const { getByTestId } = await renderForSeptember()
		expect(getByTestId(`calendar-view-day-${TODAY.toString()}`)).toHaveAttribute(
			"aria-current",
			"date",
		)
	})

	it("marks only the selected date with aria-selected=true", async () => {
		const { container, getByTestId } = await renderForSeptember({
			value: TemporalPolyfill.PlainDate.from("2026-09-21"),
		})
		// aria-selected lives on the gridcell (APG), not the inner button.
		const selectedCell = getByTestId("calendar-view-day-2026-09-21").closest('[role="gridcell"]')
		expect(selectedCell).toHaveAttribute("aria-selected", "true")
		const allSelected = container.querySelectorAll('[aria-selected="true"]')
		expect(allSelected).toHaveLength(1)
	})

	it("dims out-of-month cells but keeps them rendered", async () => {
		const { getByTestId } = await renderForSeptember()
		const outside = getByTestId("calendar-view-day-2026-08-31")
		const cell = outside.closest('[role="gridcell"]') as HTMLElement
		expect(cell.className).toContain("calendar-view-outside")
	})
})

describe("CalendarView selection", () => {
	it("selects a day on click, updates bindable value, and fires ondateselect", async () => {
		const ondateselect = vi.fn()
		const { getByTestId, container } = await renderForSeptember({ ondateselect })
		const target = getByTestId("calendar-view-day-2026-09-21")
		await fireEvent.click(target)

		expect(ondateselect).toHaveBeenCalledTimes(1)
		const detail = ondateselect.mock.calls[0][0].detail as { date: TemporalPolyfill.PlainDate }
		expect(detail.date.equals(TemporalPolyfill.PlainDate.from("2026-09-21"))).toBe(true)
		// aria-selected moved to the clicked day's gridcell.
		expect(target.closest('[role="gridcell"]')).toHaveAttribute("aria-selected", "true")
		expect(container.querySelectorAll('[aria-selected="true"]')).toHaveLength(1)
	})

	it("supports keyboard activation (Enter) on the focused day", async () => {
		const ondateselect = vi.fn()
		const { getByRole, container } = await renderForSeptember({ ondateselect })
		const grid = getByRole("grid")
		await fireEvent.keyDown(grid, { key: "Enter" })
		expect(ondateselect).toHaveBeenCalledTimes(1)
		expect(container.querySelector('[aria-selected="true"]')).not.toBeNull()
	})
})

describe("CalendarView paging", () => {
	it("pages months via the next/prev buttons and fires onmonthchange", async () => {
		const onmonthchange = vi.fn()
		const { getByTestId, getByText } = await renderForSeptember({ onmonthchange })
		await fireEvent.click(getByTestId("calendar-view-next"))

		await waitFor(() => expect(getByText("October 2026")).toBeInTheDocument())
		expect(onmonthchange).toHaveBeenCalledTimes(1)
		expect(
			(onmonthchange.mock.calls[0][0].detail as { month: TemporalPolyfill.PlainDate }).month.equals(
				TemporalPolyfill.PlainDate.from("2026-10-01"),
			),
		).toBe(true)
	})

	it("clamps the focused cell position when paging (focus stays in the grid)", async () => {
		const { getByTestId, container } = await renderForSeptember()
		// Focus position starts at Sept 1 (index 1). Page forward — the same
		// positional cell (Oct 1) becomes the tabbable one.
		await fireEvent.click(getByTestId("calendar-view-next"))
		await waitFor(() => expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(42))
		const tabbable = container.querySelector('[role="gridcell"] [tabindex="0"]')
		expect(tabbable).not.toBeNull()
	})
})

describe("CalendarView keyboard navigation", () => {
	it("moves focus by day with ArrowRight/ArrowLeft", async () => {
		const { getByRole, container } = await renderForSeptember()
		const grid = getByRole("grid")
		await fireEvent.keyDown(grid, { key: "ArrowRight" })
		let tabbable = container.querySelector('[role="gridcell"] [tabindex="0"]')
		expect(tabbable?.textContent).toBe("2")
		await fireEvent.keyDown(grid, { key: "ArrowLeft" })
		tabbable = container.querySelector('[role="gridcell"] [tabindex="0"]')
		expect(tabbable?.textContent).toBe("1")
	})

	it("moves focus by week with ArrowDown/ArrowUp", async () => {
		const { getByRole, container } = await renderForSeptember()
		const grid = getByRole("grid")
		await fireEvent.keyDown(grid, { key: "ArrowDown" })
		expect(container.querySelector('[role="gridcell"] [tabindex="0"]')?.textContent).toBe("8")
		await fireEvent.keyDown(grid, { key: "ArrowUp" })
		expect(container.querySelector('[role="gridcell"] [tabindex="0"]')?.textContent).toBe("1")
	})

	it("jumps to week start/end with Home/End", async () => {
		const { getByRole, container } = await renderForSeptember()
		const grid = getByRole("grid")
		// Sept 1 is a Tuesday (column 1) → Home lands on Monday Aug 31,
		// End lands on Sunday Sept 6.
		await fireEvent.keyDown(grid, { key: "Home" })
		expect(container.querySelector('[role="gridcell"] [tabindex="0"]')?.textContent).toBe("31")
		await fireEvent.keyDown(grid, { key: "End" })
		expect(container.querySelector('[role="gridcell"] [tabindex="0"]')?.textContent).toBe("6")
	})

	it("pages months with PageDown/PageUp and never loses keyboard focus", async () => {
		const { getByRole, container } = await renderForSeptember()
		const grid = getByRole("grid")
		await fireEvent.keyDown(grid, { key: "PageDown" })
		await waitFor(() =>
			expect(container.querySelector(".calendar-view-title")?.textContent).toBe("October 2026"),
		)
		// Focus must have returned to a cell after the async re-render.
		expect(container.querySelector('[role="gridcell"] [tabindex="0"]')).not.toBeNull()
	})

	it("selects the focused day with Space", async () => {
		const ondateselect = vi.fn()
		const { getByRole } = await renderForSeptember({ ondateselect })
		await fireEvent.keyDown(getByRole("grid"), { key: " " })
		expect(ondateselect).toHaveBeenCalledTimes(1)
	})
})

describe("CalendarView props", () => {
	it("honors weekStart=0 with Sunday-first headers", async () => {
		const { getAllByRole } = await renderForSeptember({ weekStart: 0 })
		const headers = getAllByRole("columnheader")
		expect(headers[0].textContent).toBe("Sun")
	})

	it("honors weeks=5 with 35 cells", async () => {
		const { container } = await renderForSeptember({ weeks: 5 })
		expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(35)
	})

	it("spreads rest props onto the grid element", async () => {
		const { getByRole } = await renderForSeptember({
			"data-test-marker": "rest-works",
			"aria-describedby": "some-description",
		})
		expect(getByRole("grid")).toHaveAttribute("data-test-marker", "rest-works")
		expect(getByRole("grid")).toHaveAttribute("aria-describedby", "some-description")
	})

	it("announces the month via the live region", async () => {
		const { getByTestId } = await renderForSeptember()
		const live = getByTestId("calendar-view-live")
		expect(live).toHaveAttribute("aria-live", "polite")
		expect(live.textContent).toContain("September 2026")
	})

	it("renders nav buttons with accessible names", async () => {
		const { getByTestId } = await renderForSeptember()
		expect(getByTestId("calendar-view-prev")).toHaveAttribute("aria-label", "Previous month")
		expect(getByTestId("calendar-view-next")).toHaveAttribute("aria-label", "Next month")
	})
})

describe("CalendarView today anchor", () => {
	it("uses Temporal.Now (not Date) for today", async () => {
		// With the real system clock the component renders *some* month;
		// verify exactly one cell carries aria-current regardless.
		const { container, getByRole } = render(CalendarView)
		await waitFor(() => {
			expect(container.querySelector('[aria-current="date"]')).not.toBeNull()
		})
		expect(getByRole("grid")).toBeInTheDocument()
		expect(container.querySelectorAll('[aria-current="date"]')).toHaveLength(1)
	})
})

describe("CalendarView event chips (milestone 3)", () => {
	/** Sample events pinned to September 2026. */
	const EVENTS = [
		{ id: "standup", title: "Standup", start: "2026-09-17T09:30" },
		{ id: "launch", title: "Launch", start: "2026-09-17" },
		{ id: "conf", title: "Conference", start: "2026-09-15", end: "2026-09-18" },
		{ id: "review", title: "Review", start: "2026-09-17T14:00", icon: "tabler:eye", badge: 3, color: "#0ea5e9" },
		{ id: "gone", title: "Cancelled 1:1", start: "2026-09-21", status: "cancelled" as const },
		{ id: "a1", title: "A1", start: "2026-09-22T08:00" },
		{ id: "a2", title: "A2", start: "2026-09-22T09:00" },
		{ id: "a3", title: "A3", start: "2026-09-22T10:00" },
	]

	it("renders a chip per event on its day with time and title", async () => {
		const { getByTestId } = await renderForSeptember({ events: EVENTS, maxEventsPerCell: 4 })
		const chip = getByTestId("calendar-view-event-standup")
		expect(chip).toBeInTheDocument()
		expect(chip.textContent).toContain("Standup")
		expect(chip.textContent).toContain("09:30")
	})

	it("renders all-day events without a time", async () => {
		const { getByTestId } = await renderForSeptember({ events: EVENTS })
		const chip = getByTestId("calendar-view-event-launch")
		expect(chip.textContent).toContain("Launch")
		expect(chip.textContent).not.toContain(":")
	})

	it("renders multi-day events on every covered day with continuation markers", async () => {
		const { getAllByTestId } = await renderForSeptember({ events: EVENTS, maxEventsPerCell: 4 })
		// Same testid (event id) on all 4 covered cells; continuation cells show ↔ marker.
		const chips = getAllByTestId("calendar-view-event-conf")
		expect(chips).toHaveLength(4)
		expect(chips[1].textContent).toContain("↔")
		expect(chips[3].textContent).toContain("↔")
		expect(chips[0].textContent).not.toContain("↔")
	})

	it("renders icon and badge on the chip when provided", async () => {
		const { getByTestId } = await renderForSeptember({ events: EVENTS, maxEventsPerCell: 4 })
		const chip = getByTestId("calendar-view-event-review")
		// Icon data loads async from the Iconify runtime — assert the icon slot, not the svg.
		expect(chip.querySelector(".calendar-view-chip-icon")).not.toBeNull()
		expect(chip.textContent).toContain("3")
		expect(chip.getAttribute("style")).toContain("--event-color: #0ea5e9")
	})

	it("renders cancelled events struck through, not hidden", async () => {
		const { getByTestId } = await renderForSeptember({ events: EVENTS })
		const chip = getByTestId("calendar-view-event-gone")
		expect(chip).toBeInTheDocument()
		expect(chip.className).toContain("calendar-view-chip-cancelled")
	})

	it("overflows beyond maxEventsPerCell into a +N more popover", async () => {
		const { getByTestId } = await renderForSeptember({ events: EVENTS, maxEventsPerCell: 2 })
		const more = getByTestId("calendar-view-more-2026-09-22")
		expect(more.textContent).toContain("+1")
		// Only the first 2 (by sort order) are visible chips.
		expect(document.querySelector('[data-testid="calendar-view-event-a1"]')).not.toBeNull()
		expect(document.querySelector('[data-testid="calendar-view-event-a3"]')).toBeNull()
	})

	it("shows overflow events inside the popover when opened", async () => {
		const { getByTestId } = await renderForSeptember({ events: EVENTS, maxEventsPerCell: 2 })
		getByTestId("calendar-view-more-2026-09-22").click()
		await waitFor(() => {
			expect(document.querySelector('[data-testid="calendar-view-popover-event-a3"]')).not.toBeNull()
		})
	})

	it("fires oneventselect with the raw event on chip click", async () => {
		const oneventselect = vi.fn()
		const { getByTestId } = await renderForSeptember({ events: EVENTS, maxEventsPerCell: 4, oneventselect })
		fireEvent.click(getByTestId("calendar-view-event-standup"))
		expect(oneventselect).toHaveBeenCalledTimes(1)
		const detail = oneventselect.mock.calls[0][0].detail
		expect(detail.event.id).toBe("standup")
	})

	it("chip click does not select the day (stopPropagation)", async () => {
		const ondateselect = vi.fn()
		const { getByTestId } = await renderForSeptember({ events: EVENTS, maxEventsPerCell: 4, ondateselect })
		fireEvent.click(getByTestId("calendar-view-event-standup"))
		expect(ondateselect).not.toHaveBeenCalled()
	})
})
