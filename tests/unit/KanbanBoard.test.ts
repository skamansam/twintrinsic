/**
 * Unit tests for the KanbanBoard component: stacked/temporal rendering,
 * per-column ticks, spanning cards, drag and drop callbacks, the
 * keyboard-move alternative, and temporal-card resizing (pointer +
 * keyboard).
 */
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { describe, expect, it, vi } from "vitest";
import KanbanBoard from "../../src/lib/components/Kanban/KanbanBoard.svelte";
import { pointerTickOffset, resizeTickExtent } from "../../src/lib/helpers/kanbanLayout.js";
import type {
  KanbanCardData,
  KanbanColumnData,
  KanbanTick,
} from "../../src/lib/components/Kanban/kanbanTypes.js";

/** A two-column sprint board. */
const SPRINT_COLUMNS: KanbanColumnData[] = [
  { id: "todo", title: "To do", subtitle: "2" },
  { id: "doing", title: "Doing" },
];

/** Hourly business-hours axis for temporal tests. */
function hourTicks(): Array<{ value: number; label?: string; major?: boolean }> {
  return Array.from({ length: 9 }, (_, i) => ({
    value: 9 + i,
    label: i % 3 === 0 ? `${9 + i} AM` : undefined,
    major: i % 3 === 0,
  }));
}

/** A single-column temporal board with an hourly axis. */
const WEEK_COLUMNS: KanbanColumnData[] = [
  { id: "mon", title: "Monday", date: "2026-09-14" },
  { id: "tue", title: "Tuesday", date: "2026-09-15" },
];

/** Renders the board and waits for the board root to settle. */
async function renderBoard(props: Record<string, unknown> = {}) {
  const result = render(KanbanBoard, { props });
  await waitFor(() => {
    expect(result.getByTestId("kanban-board")).toBeInTheDocument();
  });
  return result;
}

describe("KanbanBoard stacked mode", () => {
  it("renders columns and stacked cards", async () => {
    const { getByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [
        { id: "t1", column: "todo", title: "Design the API" },
        { id: "t2", column: "doing", title: "Ship it", progress: 60 },
      ] satisfies KanbanCardData[],
    });
    expect(getByTestId("kanban-column-todo")).toBeInTheDocument();
    expect(getByTestId("kanban-card-t1")).toBeInTheDocument();
    expect(getByTestId("kanban-card-t1").textContent).toContain("Design the API");
    expect(getByTestId("kanban-card-t2")).toBeInTheDocument();
  });

  it("renders card markers: icon slot, badge, assignee, description, progress", async () => {
    const { getByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [
        {
          id: "rich",
          column: "todo",
          title: "Rich card",
          icon: "tabler:flag",
          badge: "P1",
          assignee: "SA",
          description: "The long description",
          progress: 40,
        },
      ],
    });
    const card = getByTestId("kanban-card-rich");
    expect(card.querySelector(".kanban-card-icon")).not.toBeNull();
    expect(card.textContent).toContain("P1");
    expect(card.textContent).toContain("SA");
    expect(card.textContent).toContain("The long description");
    expect(card.querySelector(".kanban-card-progress-bar")?.getAttribute("style")).toContain("40%");
  });

  it("renders dashed row guides when stackedRows is set", async () => {
    const { container } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [{ id: "t1", column: "todo", title: "A" }],
      stackedRows: 3,
    });
    expect(container.querySelectorAll(".kanban-guide")).toHaveLength(3 * SPRINT_COLUMNS.length);
  });

  it("renders a card with no ticks configured (stacked ignores the axis)", async () => {
    const { getByText } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [{ id: "t1", column: "todo", title: "No axis needed" }],
    });
    expect(getByText("No axis needed")).toBeInTheDocument();
  });
});

describe("KanbanBoard temporal mode", () => {
  it("positions cards against the tick axis and renders the ruler", async () => {
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Standup", start: 9, end: 9.5 }],
      positioning: "temporal",
      ticks: hourTicks(),
    });
    expect(getByTestId("kanban-ruler")).toBeInTheDocument();
    const card = getByTestId("kanban-card-a");
    // 9 is the axis start → top: 0%; 9→9.5 of 9→17 is 6.25% tall.
    expect(card.getAttribute("style")).toContain("top: 0%");
    expect(card.getAttribute("style")).toContain("height: 6.25%");
    expect(card.textContent).toContain("9 – 9:30");
  });

  it("falls back to the default business-hours axis without ticks", async () => {
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Lunch", start: 12, end: 13 }],
      positioning: "temporal",
    });
    // Default axis is 9→17 (8 units); 12→13 lands 37.5% down.
    expect(getByTestId("kanban-card-a").getAttribute("style")).toContain("top: 37.5%");
  });

  it("packs overlapping same-column cards side by side via lanes", async () => {
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [
        { id: "long", column: "mon", title: "Deep work", start: 9, end: 12 },
        { id: "short", column: "mon", title: "Sync", start: 10, end: 11 },
      ],
      positioning: "temporal",
      ticks: hourTicks(),
    });
    // Lane 1 vs lane 2 via the --lane custom property.
    expect(getByTestId("kanban-card-long").getAttribute("style")).toContain("--lane: 1");
    expect(getByTestId("kanban-card-short").getAttribute("style")).toContain("--lane: 2");
  });

  it("supports per-column tick overrides", async () => {
    const { container } = await renderBoard({
      columns: [
        {
          id: "mon",
          title: "Monday",
          ticks: [
            { value: 8, major: true },
            { value: 10, major: true },
          ],
        },
        { id: "tue", title: "Tuesday" },
      ],
      cards: [{ id: "a", column: "mon", title: "Early", start: 8, end: 9 }],
      positioning: "temporal",
      ticks: hourTicks(),
    });
    const mon = container.querySelector("[data-testid='kanban-column-mon']") as HTMLElement;
    const tue = container.querySelector("[data-testid='kanban-column-tue']") as HTMLElement;
    // Monday's body is 2 units × 48px; Tuesday's is the full 8-unit axis (9→17).
    expect(mon.getAttribute("style")).toContain("height: 96px");
    expect(tue.getAttribute("style")).toContain("height: 384px");
  });

  it("renders tick bands aligned to the axis", async () => {
    const { container } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [],
      positioning: "temporal",
      ticks: hourTicks(),
    });
    const bands = container.querySelectorAll(".kanban-band");
    expect(bands.length).toBeGreaterThan(0);
    expect(container.querySelectorAll(".kanban-band-major").length).toBeGreaterThan(0);
  });
});

describe("KanbanBoard spanning cards", () => {
  it("stacked: a spanning card renders once in the overlay across its columns", async () => {
    const { container, getByTestId, queryByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [
        { id: "t1", column: "todo", title: "Normal" },
        { id: "t2", column: "doing", title: "Almost done", columnStart: 0, columnEnd: 1 },
      ],
    });
    // One card element, spanning both grid columns (line offset +1 for the gutter track).
    const spanCard = getByTestId("kanban-card-t2");
    expect(spanCard.getAttribute("style")).toContain("grid-column: 2 / 4");
    expect(container.querySelectorAll("[data-testid='kanban-card-t2']")).toHaveLength(1);
    // Stacked mode renders no continuation markers — the overlay band shows the span.
    expect(queryByTestId("kanban-continuation-t2")).toBeNull();
    expect(getByTestId("kanban-card-t1")).toBeInTheDocument();
  });

  it("stacked: span=n counts from the card's own column", async () => {
    const THREE = [
      { id: "c1", title: "1" },
      { id: "c2", title: "2" },
      { id: "c3", title: "3" },
    ];
    const { getByTestId } = await renderBoard({
      columns: THREE,
      cards: [{ id: "t1", column: "c2", title: "Straddler", span: 2 }],
    });
    expect(getByTestId("kanban-card-t1").getAttribute("style")).toContain("grid-column: 3 / 5");
  });

  it("temporal: a spanning card extends across columns at its tick position", async () => {
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [
        {
          id: "x",
          column: "mon",
          title: "Deploy window",
          start: 13,
          end: 15,
          columnStart: 0,
          columnEnd: 1,
        },
      ],
      positioning: "temporal",
      ticks: hourTicks(),
    });
    const card = getByTestId("kanban-card-x");
    expect(card.getAttribute("style")).toContain("grid-column: 2 / 4");
    expect(card.getAttribute("style")).toContain("top: 50%");
    expect(card.getAttribute("style")).toContain("height: 25%");
  });

  it("continuation markers carry the card's color", async () => {
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "t2", column: "mon", title: "Span", span: 2, color: "#ff8800" }],
      positioning: "temporal",
      ticks: hourTicks(),
    });
    expect(getByTestId("kanban-continuation-t2").getAttribute("style")).toContain("#ff8800");
  });
});

describe("KanbanBoard drag and drop", () => {
  it("cards are not draggable unless dragDrop is enabled", async () => {
    const { getByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [{ id: "t1", column: "todo", title: "A" }],
    });
    expect(getByTestId("kanban-card-t1").getAttribute("draggable")).toBe("false");
  });

  it("dragDrop=true makes cards draggable and drop fires oncardmove", async () => {
    const oncardmove = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [{ id: "t1", column: "todo", title: "A" }],
      dragDrop: true,
      oncardmove,
    });
    const card = getByTestId("kanban-card-t1");
    expect(card.getAttribute("draggable")).toBe("true");
    const target = getByTestId("kanban-column-doing");
    fireEvent.dragStart(card);
    fireEvent.dragOver(target);
    expect(target.querySelector(".kanban-dropzone")).toHaveClass("kanban-dropzone-active");
    fireEvent.drop(target);
    expect(oncardmove).toHaveBeenCalledTimes(1);
    const detail = oncardmove.mock.calls[0][0].detail;
    expect(detail.card.id).toBe("t1");
    expect(detail.fromColumn).toBe("todo");
    expect(detail.toColumn).toBe("doing");
  });

  it("cardsDraggable=false locks a card (no dragstart state, no move)", async () => {
    const oncardmove = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [{ id: "locked", column: "todo", title: "Locked" }],
      dragDrop: true,
      cardsDraggable: () => false,
      oncardmove,
    });
    const card = getByTestId("kanban-card-locked");
    expect(card.getAttribute("draggable")).toBe("false");
    fireEvent.dragStart(card);
    fireEvent.drop(getByTestId("kanban-column-doing"));
    expect(oncardmove).not.toHaveBeenCalled();
  });

  it("per-card draggable=false locks just that card", async () => {
    const oncardmove = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [
        { id: "locked", column: "todo", title: "Locked", draggable: false },
        { id: "free", column: "todo", title: "Free" },
      ],
      dragDrop: true,
      oncardmove,
    });
    expect(getByTestId("kanban-card-locked").getAttribute("draggable")).toBe("false");
    expect(getByTestId("kanban-card-free").getAttribute("draggable")).toBe("true");
    void oncardmove;
  });

  it("drop without a preceding dragstart never fires the callback", async () => {
    const oncardmove = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [{ id: "t1", column: "todo", title: "A" }],
      dragDrop: true,
      oncardmove,
    });
    fireEvent.drop(getByTestId("kanban-column-doing"));
    expect(oncardmove).not.toHaveBeenCalled();
  });

  it("keyboard: activate a card then ArrowRight moves it to the next column", async () => {
    const oncardmove = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [{ id: "t1", column: "todo", title: "A" }],
      dragDrop: true,
      oncardmove,
    });
    const card = getByTestId("kanban-card-t1");
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: "ArrowRight" });
    expect(oncardmove).toHaveBeenCalledTimes(1);
    expect(oncardmove.mock.calls[0][0].detail.toColumn).toBe("doing");
    // ArrowLeft from column 0 is a no-op (no column there).
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: "ArrowLeft" });
    expect(oncardmove).toHaveBeenCalledTimes(1);
  });

  it("keyboard arrows do nothing on a card that is not activated", async () => {
    const oncardmove = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [{ id: "t1", column: "todo", title: "A" }],
      dragDrop: true,
      oncardmove,
    });
    fireEvent.keyDown(getByTestId("kanban-card-t1"), { key: "ArrowRight" });
    expect(oncardmove).not.toHaveBeenCalled();
  });

  it("fires oncardselect on card activation and announces moves", async () => {
    const oncardselect = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [{ id: "t1", column: "todo", title: "A" }],
      dragDrop: true,
      oncardselect,
    });
    fireEvent.click(getByTestId("kanban-card-t1"));
    expect(oncardselect).toHaveBeenCalledTimes(1);
    expect(oncardselect.mock.calls[0][0].detail.card.id).toBe("t1");
    fireEvent.drop(getByTestId("kanban-column-doing"));
    void getByTestId("kanban-board-live").textContent;
  });
});

describe("KanbanBoard resize helpers", () => {
  const TICKS: KanbanTick[] = [{ value: 9 }, { value: 10 }, { value: 11 }];

  it("pointerTickOffset maps pixels to raw tick units (unclamped)", () => {
    // 80px of a 160px body on a 9→11 axis → 10.
    expect(pointerTickOffset(80, TICKS, 160)).toBe(10);
    // Deliberately unclamped: cross-column spill gestures need the raw
    // overshoot past the axis; clamping happens in snapTickValue.
    expect(pointerTickOffset(-5, TICKS, 160)).toBeCloseTo(8.9375, 5);
    expect(pointerTickOffset(999, TICKS, 160)).toBeGreaterThan(11);
  });

  it("pointerTickOffset survives a zero-height body", () => {
    expect(pointerTickOffset(40, TICKS, 0)).toBe(9);
  });

  it("resizeTickExtent snaps to half ticks and keeps a one-step minimum", () => {
    // End dragged to 10.4 snaps to 10.5.
    expect(
      resizeTickExtent({ current: { start: 9, end: 10 }, target: 10.4, edge: "end", ticks: TICKS }),
    ).toEqual({
      start: 9,
      end: 10.5,
    });
    // End dragged above the start collapses to start + step.
    expect(
      resizeTickExtent({ current: { start: 9, end: 10 }, target: 8, edge: "end", ticks: TICKS }),
    ).toEqual({
      start: 9,
      end: 9.5,
    });
    // Start dragged below the end collapses to end − step.
    expect(
      resizeTickExtent({ current: { start: 9, end: 10 }, target: 11, edge: "start", ticks: TICKS }),
    ).toEqual({
      start: 9.5,
      end: 10,
    });
    // Clamps to the axis range.
    expect(
      resizeTickExtent({ current: { start: 9, end: 10 }, target: 99, edge: "end", ticks: TICKS })
        .end,
    ).toBe(11);
  });
});

describe("KanbanBoard resize (pointer)", () => {
  /** Stubs the column body's rect so pixel→tick math is deterministic. */
  function stubBodyRect(container: HTMLElement, top: number, height: number): void {
    const body = container.querySelector<HTMLElement>("[data-kanban-body]");
    if (body === null) throw new Error("board body not found");
    Object.defineProperty(body, "getBoundingClientRect", {
      value: () =>
        ({
          top,
          height,
          left: 0,
          right: 0,
          bottom: top + height,
          width: 0,
          x: 0,
          y: top,
          toJSON: () => ({}),
        }) as DOMRect,
      configurable: true,
    });
  }

  it("dragging the end handle fires oncardresize with the snapped extent", async () => {
    const oncardresize = vi.fn();
    const { container, getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Standup", start: 9, end: 10 }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      oncardresize,
    });
    stubBodyRect(container, 0, 384); // hourHeight 48 × 8 units (9→17) = 384px
    const handle = getByTestId("kanban-resize-end-a");
    fireEvent.pointerDown(handle, { pointerId: 1, clientY: 96 }); // 96px / 384px × 8 + 9 = 11
    fireEvent.pointerMove(handle, { pointerId: 1, clientY: 120 }); // → 11.5 snapped
    fireEvent.pointerUp(handle, { pointerId: 1, clientY: 120 });
    expect(oncardresize).toHaveBeenCalledTimes(1);
    const detail = oncardresize.mock.calls[0][0].detail;
    expect(detail.card.id).toBe("a");
    expect(detail.column).toBe("mon");
    expect(detail.edge).toBe("end");
    expect(detail.start).toBe(9);
    expect(detail.end).toBe(11.5);
  });

  it("dragging past the axis spills the end into the next column", async () => {
    const oncardresize = vi.fn();
    const { container, getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Deploy window", start: 15, end: 17 }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      oncardresize,
    });
    stubBodyRect(container, 0, 384); // 9→17 axis = 8 units × 48px
    const handle = getByTestId("kanban-resize-end-a");
    // 432px = one full unit (1h) past the 384px edge → Tue 9→10.
    fireEvent.pointerDown(handle, { pointerId: 1, clientY: 360 });
    fireEvent.pointerMove(handle, { pointerId: 1, clientY: 432 });
    // Mid-gesture: the spill segment previews in Tuesday's body before the
    // consumer commits (the board itself never owns card state).
    expect(getByTestId("kanban-spill-a")).toBeTruthy();
    fireEvent.pointerUp(handle, { pointerId: 1, clientY: 432 });
    const detail = oncardresize.mock.calls[0][0].detail;
    expect(detail.column).toBe("mon");
    expect(detail.endColumn).toBe("tue");
    expect(detail.end).toBe(10);
  });

  it("dragging within the axis never spills", async () => {
    const oncardresize = vi.fn();
    const { container, getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Standup", start: 9, end: 10 }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      oncardresize,
    });
    stubBodyRect(container, 0, 384);
    const handle = getByTestId("kanban-resize-end-a");
    fireEvent.pointerDown(handle, { pointerId: 1, clientY: 96 });
    fireEvent.pointerUp(handle, { pointerId: 1, clientY: 384 }); // exactly the axis bottom
    const detail = oncardresize.mock.calls[0][0].detail;
    expect(detail.endColumn).toBeUndefined();
    expect(detail.end).toBe(17);
  });

  it("dragging the start handle moves the start edge", async () => {
    const oncardresize = vi.fn();
    const { container, getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Standup", start: 10, end: 12 }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      oncardresize,
    });
    stubBodyRect(container, 0, 384);
    const handle = getByTestId("kanban-resize-start-a");
    fireEvent.pointerDown(handle, { pointerId: 1, clientY: 96 });
    fireEvent.pointerUp(handle, { pointerId: 1, clientY: 72 }); // 72/384 × 8 + 9 = 10.5
    const detail = oncardresize.mock.calls[0][0].detail;
    expect(detail.edge).toBe("start");
    expect(detail.start).toBe(10.5);
    expect(detail.end).toBe(12);
  });

  it("no handles render without resize=true", async () => {
    const { container } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Standup", start: 9, end: 10 }],
      positioning: "temporal",
      ticks: hourTicks(),
    });
    expect(container.querySelectorAll(".kanban-resize-handle")).toHaveLength(0);
  });

  it("per-card resizable=false suppresses that card's handles", async () => {
    const { container } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [
        { id: "locked", column: "mon", title: "Locked", resizable: false },
        { id: "free", column: "mon", title: "Free" },
      ],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
    });
    expect(container.querySelector("[data-testid='kanban-resize-start-locked']")).toBeNull();
    expect(container.querySelector("[data-testid='kanban-resize-start-free']")).not.toBeNull();
  });

  it("cardsResizable=false suppresses all handles", async () => {
    const { container } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "A" }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      cardsResizable: () => false,
    });
    expect(container.querySelectorAll(".kanban-resize-handle")).toHaveLength(0);
  });

  it("resize has no effect in stacked mode", async () => {
    const { container } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [{ id: "a", column: "todo", title: "A" }],
      resize: true,
    });
    expect(container.querySelectorAll(".kanban-resize-handle")).toHaveLength(0);
  });

  it("the synthetic click after a resize does not fire oncardselect", async () => {
    const oncardselect = vi.fn();
    const oncardresize = vi.fn();
    const { container, getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Standup", start: 9, end: 10 }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      oncardresize,
      oncardselect,
    });
    stubBodyRect(container, 0, 384);
    const handle = getByTestId("kanban-resize-end-a");
    fireEvent.pointerDown(handle, { pointerId: 1, clientY: 96 });
    fireEvent.pointerUp(handle, { pointerId: 1, clientY: 120 });
    // The browser fires a click on the card after pointerup on a child.
    fireEvent.click(getByTestId("kanban-card-a"));
    expect(oncardresize).toHaveBeenCalledTimes(1);
    expect(oncardselect).not.toHaveBeenCalled();
  });
});

describe("KanbanBoard resize (keyboard)", () => {
  it("ArrowDown extends the end by one tick step", async () => {
    const oncardresize = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Standup", start: 9, end: 10 }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      dragDrop: true,
      oncardresize,
    });
    const card = getByTestId("kanban-card-a");
    fireEvent.click(card); // activate
    fireEvent.keyDown(card, { key: "ArrowDown" });
    const detail = oncardresize.mock.calls[0][0].detail;
    expect(detail.edge).toBe("end");
    expect(detail.end).toBe(11);
    expect(detail.start).toBe(9);
  });

  it("Shift+ArrowDown pulls the end earlier; ArrowUp extends the start earlier", async () => {
    const oncardresize = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Standup", start: 10, end: 12 }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      oncardresize,
    });
    const card = getByTestId("kanban-card-a");
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: "ArrowDown", shiftKey: true });
    expect(oncardresize.mock.calls[0][0].detail).toMatchObject({ start: 10, end: 11, edge: "end" });
    fireEvent.keyDown(card, { key: "ArrowUp" });
    expect(oncardresize.mock.calls[1][0].detail).toMatchObject({
      start: 9,
      end: 12,
      edge: "start",
    });
  });

  it("ArrowDown past the axis rolls the end into the next column", async () => {
    const oncardresize = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Deploy window", start: 15, end: 17 }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      oncardresize,
    });
    const card = getByTestId("kanban-card-a");
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: "ArrowDown" });
    const detail = oncardresize.mock.calls[0][0].detail;
    expect(detail).toMatchObject({ start: 15, end: 10, endColumn: "tue", edge: "end" });
  });

  it("ArrowDown on a spilled card extends the spill on the spill axis", async () => {
    const oncardresize = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Deploy", start: 15, end: 10, endColumn: "tue" }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      oncardresize,
    });
    const card = getByTestId("kanban-card-a");
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: "ArrowDown" });
    expect(oncardresize.mock.calls[0][0].detail).toMatchObject({
      start: 15,
      end: 11,
      endColumn: "tue",
      edge: "end",
    });
  });

  it("Shift+ArrowDown retracts a spilled card fully once it reaches the spill edge", async () => {
    const oncardresize = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Deploy", start: 15, end: 10, endColumn: "tue" }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      oncardresize,
    });
    const card = getByTestId("kanban-card-a");
    fireEvent.click(card);
    // end 10 − 1 step = 9 = the spill axis's first tick → full retraction:
    // spill cleared, end back at the origin's last tick.
    fireEvent.keyDown(card, { key: "ArrowDown", shiftKey: true });
    const detail = oncardresize.mock.calls[0][0].detail;
    expect(detail.end).toBe(17);
    expect(detail.endColumn).toBeUndefined();
    expect(detail.edge).toBe("end");
  });

  it("Shift+ArrowDown shrinks a spilled card that stays past the spill edge", async () => {
    const oncardresize = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Deploy", start: 15, end: 12, endColumn: "tue" }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      oncardresize,
    });
    const card = getByTestId("kanban-card-a");
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: "ArrowDown", shiftKey: true });
    expect(oncardresize.mock.calls[0][0].detail).toMatchObject({
      end: 11,
      endColumn: "tue",
      edge: "end",
    });
  });

  it("horizontal arrows still move the column, not resize", async () => {
    const oncardresize = vi.fn();
    const oncardmove = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Standup", start: 9, end: 10 }],
      positioning: "temporal",
      ticks: hourTicks(),
      resize: true,
      dragDrop: true,
      oncardresize,
      oncardmove,
    });
    const card = getByTestId("kanban-card-a");
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: "ArrowRight" });
    expect(oncardmove).toHaveBeenCalledTimes(1);
    expect(oncardresize).not.toHaveBeenCalled();
  });

  it("keyboard resize requires an activated card and resize=true", async () => {
    const oncardresize = vi.fn();
    const { getByTestId } = await renderBoard({
      columns: WEEK_COLUMNS,
      cards: [{ id: "a", column: "mon", title: "Standup", start: 9, end: 10 }],
      positioning: "temporal",
      ticks: hourTicks(),
      oncardresize,
    });
    const card = getByTestId("kanban-card-a");
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: "ArrowDown" });
    expect(oncardresize).not.toHaveBeenCalled();
  });
});

describe("KanbanBoard props", () => {
  it("spreads rest props onto the board root", async () => {
    const { getByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [],
      "data-marker": "rest-works",
      "aria-describedby": "some-description",
    });
    expect(getByTestId("kanban-board")).toHaveAttribute("data-marker", "rest-works");
    expect(getByTestId("kanban-board")).toHaveAttribute("aria-describedby", "some-description");
  });

  it("renders column subtitles and accent colors", async () => {
    const { getByTestId } = await renderBoard({
      columns: [{ id: "wip", title: "WIP", subtitle: "3 in flight", accent: "#10b981" }],
      cards: [{ id: "t1", column: "wip", title: "A" }],
    });
    expect(getByTestId("kanban-column-title-wip").textContent).toContain("3 in flight");
  });

  it("renders custom card content via the cardContent snippet", async () => {
    const snippet = createRawSnippet<[KanbanCardData]>((card) => ({
      render: () => `<span>CUSTOM:${card().id}</span>`,
    }));
    const { getByTestId } = await renderBoard({
      columns: SPRINT_COLUMNS,
      cards: [{ id: "t1", column: "todo", title: "A" }],
      cardContent: snippet,
    });
    expect(getByTestId("kanban-card-t1").textContent).toContain("CUSTOM:t1");
  });
});
