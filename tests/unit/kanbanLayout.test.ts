/**
 * Unit tests for the Kanban board layout helpers (`kanbanLayout.ts`) —
 * column-span resolution, tick extents/percentages, band geometry, and
 * greedy lane packing for overlapping cards.
 */
import { describe, expect, it } from "vitest";
import {
  assignKanbanLanes,
  cardColumnSpan,
  cardExtentInColumn,
  cardExtentInSpill,
  cardTickExtent,
  crossColumnEnd,
  isSpilled,
  resizeTickExtent,
  snapTickValue,
  tickBands,
  tickPercentages,
} from "../../src/lib/helpers/kanbanLayout.js";
import type {
  KanbanCardData,
  KanbanColumnData,
  KanbanTick,
} from "../../src/lib/components/Kanban/kanbanTypes.js";

/** Three columns used across span tests. */
const COLUMNS: KanbanColumnData[] = [
  { id: "a", title: "A" },
  { id: "b", title: "B" },
  { id: "c", title: "C" },
];

/** Helper to build a minimal card. */
function card(overrides: Partial<KanbanCardData>): KanbanCardData {
  return { id: "x", column: "a", title: "Card", ...overrides };
}

describe("cardColumnSpan", () => {
  it("defaults to the card's own single column", () => {
    const result = cardColumnSpan(card({ column: "b" }), COLUMNS);
    expect(result).toEqual({ start: 1, end: 1 });
  });

  it("resolves span=n from the card's own column", () => {
    const result = cardColumnSpan(card({ column: "a", span: 2 }), COLUMNS);
    expect(result).toEqual({ start: 0, end: 1 });
  });

  it("explicit columnStart/columnEnd win over span", () => {
    const result = cardColumnSpan(
      card({ column: "b", span: 1, columnStart: 0, columnEnd: 2 }),
      COLUMNS,
    );
    expect(result).toEqual({ start: 0, end: 2 });
  });

  it("clamps the end to the last column", () => {
    const result = cardColumnSpan(card({ column: "c", span: 5 }), COLUMNS);
    expect(result).toEqual({ start: 2, end: 2 });
  });

  it("clamps a negative columnStart to 0", () => {
    const result = cardColumnSpan(card({ column: "a", columnStart: -3, columnEnd: 1 }), COLUMNS);
    expect(result).toEqual({ start: 0, end: 1 });
  });

  it("falls back to column 0 for an unknown column id", () => {
    const result = cardColumnSpan(card({ column: "nope" }), COLUMNS);
    expect(result).toEqual({ start: 0, end: 0 });
  });

  it("widens the span to cover a cross-column endColumn", () => {
    const result = cardColumnSpan(card({ column: "a", endColumn: "b" }), COLUMNS);
    expect(result).toEqual({ start: 0, end: 1 });
  });

  it("ignores an endColumn pointing back at the card's own column", () => {
    const result = cardColumnSpan(card({ column: "a", endColumn: "a" }), COLUMNS);
    expect(result).toEqual({ start: 0, end: 0 });
  });

  it("ignores an endColumn before the card's column", () => {
    const result = cardColumnSpan(card({ column: "b", endColumn: "a" }), COLUMNS);
    expect(result).toEqual({ start: 1, end: 1 });
  });

  it("clamps an endColumn past the last column", () => {
    const result = cardColumnSpan(card({ column: "c", endColumn: "zzz" }), COLUMNS);
    expect(result).toEqual({ start: 2, end: 2 });
  });

  it("endColumn does not widen an explicitly spanning card", () => {
    const result = cardColumnSpan(
      card({ column: "a", columnStart: 0, columnEnd: 2, endColumn: "b" }),
      COLUMNS,
    );
    expect(result).toEqual({ start: 0, end: 2 });
  });
});

describe("cardTickExtent", () => {
  const TICKS: KanbanTick[] = [
    { value: 9, major: true },
    { value: 10 },
    { value: 12, major: true },
  ];

  it("uses start/end when given", () => {
    expect(cardTickExtent(card({ start: 9, end: 9.5 }), TICKS)).toEqual({ start: 9, end: 9.5 });
  });

  it("defaults start to the first tick and end to start+1", () => {
    expect(cardTickExtent(card({}), TICKS)).toEqual({ start: 9, end: 10 });
  });

  it("end defaults to start+1 when only start is given", () => {
    expect(cardTickExtent(card({ start: 11 }), TICKS)).toEqual({ start: 11, end: 12 });
  });

  it("swaps reversed extents", () => {
    expect(cardTickExtent(card({ start: 10, end: 9 }), TICKS)).toEqual({ start: 9, end: 10 });
  });

  it("inflates a zero-height extent to one unit", () => {
    expect(cardTickExtent(card({ start: 10, end: 10 }), TICKS)).toEqual({ start: 10, end: 11 });
  });

  it("handles an empty tick list (0 → 1)", () => {
    expect(cardTickExtent(card({}), [])).toEqual({ start: 0, end: 1 });
  });
});

describe("tickPercentages", () => {
  const TICKS: KanbanTick[] = [{ value: 9 }, { value: 17 }];

  it("maps the axis start to 0%", () => {
    expect(tickPercentages({ start: 9, end: 10 }, TICKS).top).toBe(0);
  });

  it("maps the axis end to 100%", () => {
    expect(tickPercentages({ start: 16, end: 17 }, TICKS)).toEqual({ top: 87.5, height: 12.5 });
  });

  it("returns zero height for a degenerate extent (cardTickExtent inflates before render)", () => {
    const result = tickPercentages({ start: 10, end: 10 }, TICKS);
    expect(result.height).toBe(0);
  });

  it("survives a degenerate single-tick axis", () => {
    const result = tickPercentages({ start: 0, end: 1 }, [{ value: 0 }]);
    expect(result.top).toBe(0);
    expect(result.height).toBe(100);
  });
});

describe("tickBands", () => {
  it("creates one band per tick interval plus the trailing band", () => {
    const TICKS: KanbanTick[] = [{ value: 9 }, { value: 10 }, { value: 11 }];
    const bands = tickBands(TICKS);
    expect(bands).toHaveLength(3);
    expect(bands[0].tick.value).toBe(9);
    expect(bands[1].tick.value).toBe(10);
    expect(bands[2].tick.value).toBe(11);
    // Bands tile the axis without gaps.
    expect(bands[0].top).toBe(0);
    expect(bands[2].top + bands[2].height).toBeGreaterThan(99);
  });

  it("returns no bands for an empty tick list", () => {
    expect(tickBands([])).toEqual([]);
  });
});

describe("assignKanbanLanes", () => {
  it("assigns overlapping cards to different lanes", () => {
    const a = card({ id: "a", start: 9, end: 11 });
    const b = card({ id: "b", start: 10, end: 12 });
    const result = assignKanbanLanes(
      [a, b],
      new Map([
        ["a", { start: 9, end: 11 }],
        ["b", { start: 10, end: 12 }],
      ]),
    );
    expect(result.lanes.get("a")).toBe(1);
    expect(result.lanes.get("b")).toBe(2);
    expect(result.count).toBe(2);
  });

  it("reuses a freed lane for a later non-overlapping card", () => {
    const result = assignKanbanLanes(
      [card({ id: "a" }), card({ id: "b" })],
      new Map([
        ["a", { start: 9, end: 10 }],
        ["b", { start: 10, end: 11 }],
      ]),
    );
    expect(result.lanes.get("a")).toBe(1);
    expect(result.lanes.get("b")).toBe(1);
    expect(result.count).toBe(1);
  });

  it("packs three-way overlaps into three lanes", () => {
    const result = assignKanbanLanes(
      [card({ id: "a" }), card({ id: "b" }), card({ id: "c" })],
      new Map([
        ["a", { start: 9, end: 12 }],
        ["b", { start: 9.5, end: 11 }],
        ["c", { start: 10, end: 10.5 }],
      ]),
    );
    expect(result.count).toBe(3);
    expect(result.lanes.get("a")).toBe(1);
    expect(result.lanes.get("b")).toBe(2);
    expect(result.lanes.get("c")).toBe(3);
  });

  it("breaks start-order ties longest-first", () => {
    const result = assignKanbanLanes(
      [card({ id: "short" }), card({ id: "long" })],
      new Map([
        ["short", { start: 9, end: 9.5 }],
        ["long", { start: 9, end: 12 }],
      ]),
    );
    // Both start at 9; the long span claims lane 1.
    expect(result.lanes.get("long")).toBe(1);
    expect(result.lanes.get("short")).toBe(2);
  });

  it("returns zero lanes for an empty column", () => {
    const result = assignKanbanLanes([], new Map());
    expect(result.count).toBe(0);
    expect(result.lanes.size).toBe(0);
  });

  it("falls back to a unit extent for unknown card ids", () => {
    const result = assignKanbanLanes([card({ id: "mystery" })], new Map());
    expect(result.lanes.get("mystery")).toBe(1);
    expect(result.count).toBe(1);
  });
});

describe("cross-column resize helpers", () => {
  const AXIS: KanbanTick[] = [
    { value: 9 },
    { value: 10 },
    { value: 11 },
    { value: 12 },
    { value: 13 },
    { value: 14 },
    { value: 15 },
    { value: 16 },
    { value: 17 },
  ];

  it("snapTickValue snaps to the half-step and clamps", () => {
    expect(snapTickValue(10.4, AXIS, 9.5, 17)).toBe(10.5);
    expect(snapTickValue(10.4, AXIS, 10.5, 17)).toBe(10.5);
    expect(snapTickValue(99, AXIS, 9.5, 17)).toBe(17);
  });

  it("crossColumnEnd keeps an end inside the axis in-column", () => {
    const result = crossColumnEnd({
      start: 9,
      target: 11.5,
      ticks: AXIS,
      nextTicks: AXIS,
      nextIndex: 1,
    });
    expect(result).toEqual({ end: 11.5, endColumnIndex: undefined });
  });

  it("crossColumnEnd clamps to the last tick below one step of overshoot", () => {
    const result = crossColumnEnd({
      start: 9,
      target: 17.25,
      ticks: AXIS,
      nextTicks: AXIS,
      nextIndex: 1,
    });
    expect(result.endColumnIndex).toBeUndefined();
    expect(result.end).toBe(17);
  });

  it("crossColumnEnd spills one step into the next column", () => {
    const result = crossColumnEnd({
      start: 9,
      target: 18,
      ticks: AXIS,
      nextTicks: AXIS,
      nextIndex: 1,
    });
    // One step (1h) past Monday's 17:00 edge = Tuesday 9→10.
    expect(result).toEqual({ end: 10, endColumnIndex: 1 });
  });

  it("crossColumnEnd keeps the end proportional on the spill axis (aligned axes)", () => {
    // 1.5 past a 9–17 axis = Tuesday 9→10.5 — proportional, not full column.
    const result = crossColumnEnd({
      start: 9,
      target: 18.5,
      ticks: AXIS,
      nextTicks: AXIS,
      nextIndex: 1,
    });
    expect(result).toEqual({ end: 10.5, endColumnIndex: 1 });
  });

  it("crossColumnEnd clamps the spill to the spill axis's last tick", () => {
    const result = crossColumnEnd({
      start: 9,
      target: 99,
      ticks: AXIS,
      nextTicks: AXIS,
      nextIndex: 1,
    });
    expect(result).toEqual({ end: 17, endColumnIndex: 1 });
  });

  it("crossColumnEnd clamps without a spill target (last column)", () => {
    const result = crossColumnEnd({
      start: 9,
      target: 20,
      ticks: AXIS,
      nextTicks: undefined,
      nextIndex: undefined,
    });
    expect(result).toEqual({ end: 17, endColumnIndex: undefined });
  });

  it("crossColumnEnd refuses to spill when the axes are misaligned", () => {
    const morning: KanbanTick[] = [{ value: 9 }, { value: 10 }, { value: 11 }];
    const result = crossColumnEnd({
      start: 9,
      target: 18,
      ticks: AXIS,
      nextTicks: morning,
      nextIndex: 1,
    });
    expect(result).toEqual({ end: 17, endColumnIndex: undefined });
  });

  it("resizeTickExtent still clamps the end edge to the axis", () => {
    expect(
      resizeTickExtent({ current: { start: 9, end: 10 }, target: 20, edge: "end", ticks: AXIS }),
    ).toEqual({
      start: 9,
      end: 17,
    });
  });

  it("isSpilled distinguishes dynamic spills from static spans", () => {
    expect(isSpilled(card({ column: "a", endColumn: "b" }))).toBe(true);
    expect(isSpilled(card({ column: "a" }))).toBe(false);
    expect(isSpilled(card({ column: "a", columnStart: 0, columnEnd: 1 }))).toBe(false);
  });

  it("cardExtentInColumn clamps a spilled card to its own axis", () => {
    const spilled = card({ column: "a", start: 15, end: 18.5, endColumn: "b" });
    expect(cardExtentInColumn(spilled, AXIS)).toEqual({ start: 15, end: 17 });
    expect(cardExtentInColumn(card({ start: 9, end: 10 }), AXIS)).toEqual({ start: 9, end: 10 });
  });

  it("cardExtentInSpill maps the spill band to the spill axis", () => {
    const spilled = card({ column: "a", start: 15, end: 10.5, endColumn: "b" });
    expect(cardExtentInSpill(spilled, AXIS)).toEqual({ start: 9, end: 10.5 });
    // `end` beyond the spill axis clamps to it.
    const over = card({ column: "a", start: 16, end: 25, endColumn: "b" });
    expect(cardExtentInSpill(over, AXIS)).toEqual({ start: 9, end: 17 });
  });
});
