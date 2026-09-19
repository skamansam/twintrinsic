/**
 * Sub-row lane assignment for CalendarView (plan item 11.1, phase 2) —
 * packs overlapping multi-day events into side-by-side CSS-grid lanes
 * within each week row, FullCalendar-style, so simultaneous spans render
 * side by side instead of stacking in every cell they touch.
 *
 * Pure data mapping over the existing normalize → (group) → render
 * pipeline output; native Temporal only (no `Date`, no polyfill). The
 * component turns the returned lane numbers into `grid-row` placements,
 * which keeps this helper trivially testable and the view layer dumb.
 *
 * @see docs/plans/CALENDARVIEW_DESIGN.md §3 (phase-2 sub-row lanes)
 */
import type { NormalizedEvent } from "./eventNormalize.js";

/** Result of {@link assignEventLanes} for one week row. */
export interface EventLanes {
  /** Event id → 1-based lane index (stable per event across the week). */
  lanes: Map<string, number>;
  /** Total number of lanes needed by the week (>= 1 when events exist).  */
  count: number;
}

/**
 * Assigns overlapping multi-day events to side-by-side lanes for one
 * week row. Events are processed in calendar order (start day, then
 * longest span first so long events claim low lanes) and each takes the
 * lowest lane whose previous occupant has already ended, matching the
 * interval-graph greedy coloring FullCalendar uses.
 *
 * Single-day events are not lane-consumers: they pass through with the
 * lane their (empty) span yields, which keeps single-day chips flowing
 * in their normal stacked flow while multi-day spans align across the
 * week. Only events overlapping two or more days of this week produce
 * lanes — day-scoped chips cannot collide side-by-side anyway.
 *
 * @param events - Normalized events overlapping this week row
 * @param weekStart - First day of the week row (inclusive)
 * @param weekEnd - Last day of the week row (inclusive)
 * @returns Lane map and total lane count for the week
 */
export function assignEventLanes(
  events: NormalizedEvent[],
  weekStart: Temporal.PlainDate,
  weekEnd: Temporal.PlainDate,
): EventLanes {
  const lanes = new Map<string, number>();
  // Week length varies by view (month/week = 7 columns, day = 1).
  const lastIdx = weekStart.until(weekEnd).days;
  // Multi-day spans clipped to this week, in paint order.
  const spans = events
    .filter(
      (ne) =>
        Temporal.PlainDate.compare(ne.startDay, weekEnd) <= 0 &&
        Temporal.PlainDate.compare(weekStart, ne.endDay) <= 0,
    )
    .map((ne) => ({
      id: ne.event.id,
      from:
        Temporal.PlainDate.compare(ne.startDay, weekStart) < 0
          ? 0
          : weekStart.until(ne.startDay).days,
      to: Math.min(weekStart.until(ne.endDay).days, lastIdx),
    }))
    .filter((s) => s.to > s.from) // > 1 → strictly multi-day within the week
    .sort(
      (a, b) =>
        a.from - b.from ||
        b.to - a.to || // longer spans first at equal starts
        a.id.localeCompare(b.id),
    );

  // laneEnds[l] = last day index occupied by lane l (0-based lanes).
  const laneEnds: number[] = [];
  for (const span of spans) {
    let lane = laneEnds.findIndex((end) => end < span.from);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(span.to);
    } else {
      laneEnds[lane] = span.to;
    }
    lanes.set(span.id, lane + 1);
  }
  return { lanes, count: laneEnds.length };
}

/** Result of {@link computeWeekLanes} for a whole grid. */
export interface WeekLaneResult {
  /** One lane map per week row (index-aligned with the caller's rows). */
  maps: Map<string, number>[];
  /** Highest lane used anywhere in the grid (0 when no spans exist). */
  count: number;
}

/**
 * Convenience wrapper: assigns lanes for every week row of a grid and
 * reports the maximum lane count (the per-cell slot-row count the view
 * needs so lanes align horizontally across the week).
 * @param weeks - Week rows of grid days (as rendered)
 * @param events - All normalized events in the grid
 * @returns Lane maps per week and the total lane count
 */
export function computeWeekLanes(
  weeks: Temporal.PlainDate[][],
  events: NormalizedEvent[],
): WeekLaneResult {
  const maps: Map<string, number>[] = [];
  let count = 0;
  for (const week of weeks) {
    if (week.length === 0) {
      maps.push(new Map());
      continue;
    }
    const result = assignEventLanes(events, week[0], week[week.length - 1]);
    maps.push(result.lanes);
    if (result.count > count) count = result.count;
  }
  return { maps, count };
}
