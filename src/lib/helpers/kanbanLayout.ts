/**
 * Layout math for the Kanban board family — lane packing for overlapping
 * same-column cards and temporal tick geometry.
 *
 * Pure data mapping (no DOM, no component imports) so the math stays
 * trivially testable, mirroring `eventLanes.ts` from CalendarView. The
 * board component turns lane numbers into CSS-grid placements and tick
 * values into `top`/`height` percentages.
 *
 * @see docs/plans/KANBAN_DESIGN.md
 */
import type {
  KanbanCardData,
  KanbanColumnData,
  KanbanTick,
} from "../components/Kanban/kanbanTypes.js";

/**
 * Resolves the effective span of a card against the board's column list.
 * Explicit `columnStart`/`columnEnd` win; otherwise `span` counts from the
 * card's own column. A cross-column end (`endColumn`, set by a spill
 * resize) widens the span to cover both columns. The result is clamped to
 * the board.
 * @param card - The card to resolve
 * @param columns - The board's columns (defines indices)
 * @returns `{ start, end }` as 0-based inclusive column indices
 */
export function cardColumnSpan(
  card: KanbanCardData,
  columns: KanbanColumnData[],
): { start: number; end: number } {
  const own = columns.findIndex((c) => c.id === card.column);
  const ownIndex = own === -1 ? 0 : own;
  const start = card.columnStart !== undefined ? Math.max(0, card.columnStart) : ownIndex;
  const spanEnd =
    card.columnEnd !== undefined ? card.columnEnd : start + Math.max(1, card.span ?? 1) - 1;
  let end = Math.min(columns.length - 1, Math.max(start, spanEnd));
  if (end === start && card.endColumn !== undefined && card.endColumn !== card.column) {
    const spillIndex = columns.findIndex((c) => c.id === card.endColumn);
    if (spillIndex > start) end = Math.min(columns.length - 1, spillIndex);
  }
  return { start, end };
}

/**
 * True when the card's end extends into a later column via a cross-column
 * resize (dynamic spill) — not a static multi-column span.
 * @param card - The card to test
 */
export function isSpilled(card: KanbanCardData): boolean {
  return card.endColumn !== undefined && card.endColumn !== card.column;
}

/**
 * Extent of a card's rendered body inside its own column. A spilled card
 * (`end` measured on the spill column's axis) renders clamped to its own
 * column's last tick; anything else resolves normally.
 * @param card - The card to measure
 * @param ticks - The card's column effective tick axis
 */
export function cardExtentInColumn(
  card: KanbanCardData,
  ticks: KanbanTick[],
): { start: number; end: number } {
  const first = ticks.length > 0 ? ticks[0].value : 0;
  const last = ticks.length > 0 ? ticks[ticks.length - 1].value : first + 1;
  if (isSpilled(card)) {
    const start = Math.min(Math.max(first, card.start ?? first), last);
    return { start, end: Math.max(start, last) };
  }
  return cardTickExtent(card, ticks);
}

/**
 * Extent of a spilled card's continuation segment in the spill column.
 * The card's `end` is already spill-axis units (see
 * `KanbanResizeDetail.endColumn`), so the band is the spill axis's first
 * tick → `end`, clamped to that axis with a one-unit minimum.
 * @param card - The spilled card
 * @param ticks - The spill column's effective tick axis
 */
export function cardExtentInSpill(
  card: KanbanCardData,
  ticks: KanbanTick[],
): { start: number; end: number } {
  const first = ticks.length > 0 ? ticks[0].value : 0;
  const last = ticks.length > 0 ? ticks[ticks.length - 1].value : first + 1;
  const end = Math.min(last, Math.max(first, card.end ?? first));
  return { start: first, end: end > first ? end : Math.min(last, first + 1) };
}

/**
 * Resolves the temporal extent of a card in tick units, with safe
 * defaults so a card without `start`/`end` still renders (first tick →
 * first tick + 1, or 0 → 1 when the column has no ticks).
 * @param card - The card to resolve
 * @param ticks - The effective tick list for the card's column
 * @returns `{ start, end }` in tick units
 */
export function cardTickExtent(
  card: KanbanCardData,
  ticks: KanbanTick[],
): { start: number; end: number } {
  const first = ticks.length > 0 ? ticks[0].value : 0;
  const start = card.start ?? first;
  const end = card.end ?? start + 1;
  const lo = Math.min(start, end);
  const hi = Math.max(start, end);
  // Degenerate (zero-height) extents still render one tick-unit tall.
  return hi - lo < 1e-9 ? { start: lo, end: lo + 1 } : { start: lo, end: hi };
}

/**
 * Converts a tick-unit extent into percentages relative to the axis range
 * covered by the tick list.
 * @param extent - `{ start, end }` in tick units (see {@link cardTickExtent})
 * @param ticks - The effective tick list defining the axis range
 * @returns `top`/`height` percentages for absolute positioning
 */
export function tickPercentages(
  extent: { start: number; end: number },
  ticks: KanbanTick[],
): { top: number; height: number } {
  const first = ticks.length > 0 ? ticks[0].value : 0;
  const last = ticks.length > 0 ? ticks[ticks.length - 1].value : first + 1;
  const range = last - first || 1;
  const top = ((extent.start - first) / range) * 100;
  const height = ((extent.end - extent.start) / range) * 100;
  return { top, height: Math.max(height, 0) };
}

/**
 * Converts a pointer pixel offset (relative to the top of a column body)
 * into a tick-unit value for the column's axis, without clamping to the
 * axis range — values past the last tick mean "keep going into the next
 * column" (cross-column resize). Pure math so resize gestures stay
 * testable without a real DOM.
 * @param offsetY - Pixels from the top of the column body
 * @param ticks - The effective tick list for that column (defines the axis range)
 * @param bodyHeight - Rendered pixel height of the column body
 * @returns The tick-unit value under the pointer, unclamped
 */
export function pointerTickOffset(
  offsetY: number,
  ticks: KanbanTick[],
  bodyHeight: number,
): number {
  const first = ticks.length > 0 ? ticks[0].value : 0;
  const last = ticks.length > 0 ? ticks[ticks.length - 1].value : first + 1;
  if (bodyHeight <= 0) return first;
  return first + (offsetY / bodyHeight) * (last - first);
}

/**
 * Resolves the snapped extent of a card whose start or end edge is being
 * resized to `target` tick units. One-tick minimum height, half-tick
 * snapping (matches a half-hour granularity on hourly axes), and clamps
 * to the column's axis range so a drag can never invert the card or
 * push it outside the ruler. Pure math — the component only supplies
 * measured pixels and the gesture's edge.
 * @param params - The current extent, target value, moved edge, and axis
 * @returns The new `{ start, end }` in tick units, ready to hand to the consumer
 */
export function resizeTickExtent(params: {
  /** Extent before the gesture's current move */
  current: { start: number; end: number };
  /** Pointer position in tick units (see {@link pointerTickOffset}) */
  target: number;
  /** Which edge is being dragged */
  edge: "start" | "end";
  /** The effective tick list for the card's column */
  ticks: KanbanTick[];
}): { start: number; end: number } {
  const { current, target, edge, ticks } = params;
  const first = ticks.length > 0 ? ticks[0].value : 0;
  const last = ticks.length > 0 ? ticks[ticks.length - 1].value : first + 1;
  const step = ticks.length >= 2 ? (ticks[1].value - ticks[0].value) / 2 : 0.5;
  const snap = (v: number): number => Math.round(v / step) * step;
  const snapped = snap(target);
  if (edge === "start") {
    const start = Math.min(Math.max(first, snapped), current.end - step);
    return { start, end: current.end };
  }
  // End edge: past the last tick is a cross-column spill target, clamped
  // to the last tick otherwise. Never inverts past the start edge.
  const end = Math.max(snapped, current.start + step);
  return { start: current.start, end: Math.max(current.start + step, Math.min(last, end)) };
}

/**
 * Snaps a raw pointer tick value to the axis's half-step grid and clamps
 * to `min`/`max`. Extracted from {@link resizeTickExtent} so the board can
 * snap pointer positions on *any* column's axis (cross-column resize
 * reads the pointer against the spill column's ticks).
 * @param value - Raw pointer position in tick units
 * @param ticks - The axis to snap against
 * @param min - Lower clamp
 * @param max - Upper clamp
 * @returns The snapped, clamped value
 */
export function snapTickValue(
  value: number,
  ticks: KanbanTick[],
  min: number,
  max: number,
): number {
  const step = ticks.length >= 2 ? (ticks[1].value - ticks[0].value) / 2 : 0.5;
  return Math.min(max, Math.max(min, Math.round(value / step) * step));
}

/**
 * Result of resolving a (possibly cross-column) end resize.
 */
export interface CrossColumnEnd {
  /**
   * End of the card's extent: in the origin column's axis when it stays
   * in-column, in the spill column's axis when it rolls over (matches the
   * `KanbanResizeDetail.end` contract).
   */
  end: number;
  /** Spill column index when the end rolled over; `undefined` otherwise. */
  endColumnIndex: number | undefined;
}

/**
 * Whether two tick axes are aligned for cross-column rendering — same
 * first and last values, so tick units are numerically interchangeable
 * between the columns (the calendar case: every day shares the hours).
 */
function axesAligned(a: KanbanTick[], b: KanbanTick[]): boolean {
  if (a.length === 0 || b.length === 0) return false;
  return a[0].value === b[0].value && a[a.length - 1].value === b[b.length - 1].value;
}

/**
 * Resolves an end resize that may extend past the origin column's axis
 * into the next column: snapped values beyond the last tick (by at least
 * one step) roll over into the next column, with the spill measured on
 * that column's own axis. Requires the two axes to be aligned — otherwise
 * the end clamps to the origin axis, so a mixed-zoom board can never
 * produce an unrenderable extent. Pure math.
 * @param params - The origin extent, snapped end, and both axes
 * @returns The end value and spill column index (if any)
 */
export function crossColumnEnd(params: {
  /** The card's start value (in-column results can never invert it) */
  start: number;
  /** Snapped end in origin-column axis units (may exceed the axis) */
  target: number;
  /** The origin column's effective tick axis */
  ticks: KanbanTick[];
  /** The next column's effective tick axis (when a spill is possible) */
  nextTicks: KanbanTick[] | undefined;
  /** Index of the spill column, when the caller allows one */
  nextIndex: number | undefined;
}): CrossColumnEnd {
  const { start, target, ticks, nextTicks, nextIndex } = params;
  const first = ticks.length > 0 ? ticks[0].value : 0;
  const last = ticks.length > 0 ? ticks[ticks.length - 1].value : first + 1;
  const step = ticks.length >= 2 ? (ticks[1].value - ticks[0].value) / 2 : 0.5;
  const clampInColumn = (): CrossColumnEnd => ({
    end: Math.max(start + step, Math.min(last, target)),
    endColumnIndex: undefined,
  });
  if (nextIndex === undefined || nextTicks === undefined || !axesAligned(ticks, nextTicks)) {
    return clampInColumn();
  }
  const nextFirst = nextTicks[0].value;
  const nextLast = nextTicks[nextTicks.length - 1].value;
  const overshoot = target - last;
  // Below one full step past the edge there is nothing to spill yet.
  if (overshoot < step) return clampInColumn();
  // The raw overshoot (origin-axis tick units past the edge — the axes are
  // aligned, so units are interchangeable) maps onto the spill axis: one
  // step past Monday's 17:00 lands at Tuesday's 10:00 when both axes share
  // 9–17. Snapped to the spill axis granularity and clamped so a huge drag
  // can't exceed the spill axis.
  return {
    end: snapTickValue(nextFirst + overshoot, nextTicks, nextFirst + step, nextLast),
    endColumnIndex: nextIndex,
  };
}

/**
 * Builds the row-guide geometry for a column body: one band per tick
 * interval, with the band's top/height percentages (major boundaries get
 * the stronger rule in the view layer).
 * @param ticks - The effective tick list
 * @returns Bands with `top`/`height` percentages and the tick that opens them
 */
export function tickBands(
  ticks: KanbanTick[],
): Array<{ top: number; height: number; tick: KanbanTick }> {
  if (ticks.length === 0) return [];
  const bands: Array<{ top: number; height: number; tick: KanbanTick }> = [];
  for (let i = 0; i < ticks.length - 1; i++) {
    const a = ticks[i];
    const b = ticks[i + 1];
    const { top, height } = tickPercentages({ start: a.value, end: b.value }, ticks);
    if (height > 0) bands.push({ top, height, tick: a });
  }
  // Trailing band so the axis range closes cleanly at the last tick.
  const last = ticks[ticks.length - 1];
  const tail = tickPercentages({ start: last.value, end: last.value + 1 }, ticks);
  bands.push({ top: tail.top, height: tail.height, tick: last });
  return bands;
}

/** Result of {@link assignKanbanLanes} for one column. */
export interface KanbanLanes {
  /** Card id → 1-based lane index (stable per card across columns it occupies). */
  lanes: Map<string, number>;
  /** Total lanes the column needs (>= 1 when cards exist). */
  count: number;
}

/**
 * Greedy interval packing for one column's cards — the same coloring
 * CalendarView uses for multi-day lanes. Overlapping cards land in
 * side-by-side lanes; non-overlapping cards reuse freed lanes. Cards are
 * processed in start order, then longest extent first (stable id tiebreak).
 *
 * Spans are clipped to the column so a card spanning multiple columns
 * still packs correctly per column.
 * @param cards - The cards occupying this column (already span-resolved)
 * @param extents - Card id → `{ start, end }` in tick units
 * @returns Lane map and total lane count for the column
 */
export function assignKanbanLanes(
  cards: KanbanCardData[],
  extents: Map<string, { start: number; end: number }>,
): KanbanLanes {
  const lanes = new Map<string, number>();
  if (cards.length === 0) return { lanes, count: 0 };
  const spans = cards
    .map((card) => {
      const extent = extents.get(card.id) ?? { start: 0, end: 1 };
      return { id: card.id, from: extent.start, to: Math.max(extent.end, extent.start + 1e-9) };
    })
    .sort((a, b) => a.from - b.from || b.to - a.to || a.id.localeCompare(b.id));
  // laneEnds[l] = furthest extent reached by lane l (0-based lanes).
  const laneEnds: number[] = [];
  for (const span of spans) {
    let lane = laneEnds.findIndex((end) => end <= span.from + 1e-9);
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
