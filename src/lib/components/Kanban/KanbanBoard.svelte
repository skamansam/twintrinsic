<!--
@component
KanbanBoard - A lane board that renders as a Google-Calendar-style week/day
view (`positioning="temporal"`) or a Jira-style task board
(`positioning="stacked"`).

Columns are lanes; cards flow top-down (stacked) or position against a tick
axis (temporal). Ticks — the row guides and ruler labels — can be set
board-wide (`ticks`) or per column (`column.ticks`). Cards may span multiple
columns (`span` or `columnStart`+`columnEnd`) so a task that is "almost
done" can straddle Doing → Done, and overlapping same-column cards pack
side-by-side into lanes (`assignKanbanLanes`).

Spanning cards render in a full-width overlay that shares the body's grid
template, so one element owns `grid-column: start / end` — continuation
markers appear in the covered columns.

Drag and drop between columns uses the native HTML Drag and Drop API (same
policy as CalendarView's `dragEvents`) with a keyboard alternative: activate
a card (Enter/Space) then use ArrowLeft/Right to move it between columns —
DnD is pointer-only and must never be the only path. Temporal cards can
also be resized (`resize`): drag the top/bottom edge handles (Pointer
Events), or use ArrowUp/ArrowDown (+Shift to shrink) on an activated card.
When a column's axis is aligned with the next column's (same first and
last ticks — the calendar case), dragging the end past the column's last
tick rolls the card over: the detail gains `endColumn` and the end is
measured on that column's axis, and the next column renders the spill
segment (`kanban-spill`). The board never owns card state: `oncardmove`
hands
`{ card, fromColumn, toColumn, toIndex }` and `oncardresize` hands
`{ card, column, start, end, edge }` (plus `endColumn` for cross-column
resizes) to the consumer, who re-renders from
their own data.

Usage:
```svelte
\<!-- Google-style week view: hour ticks, temporally placed cards --\>
<KanbanBoard
  columns={[{ id: "mon", title: "Monday", date: "2026-09-14" }]}
  cards={[{ id: "a", column: "mon", title: "Standup", start: 9, end: 9.5 }]}
  positioning="temporal"
  ticks={[{ value: 9, label: "9 AM", major: true }, { value: 10 }]}
/>

\<!-- Jira-style sprint board: stacked cards, drag between lanes --\>
<KanbanBoard
  columns={[{ id: "todo", title: "To do" }, { id: "doing", title: "Doing" }]}
  cards={[{ id: "t1", column: "todo", title: "Design the API" }]}
  positioning="stacked"
  dragDrop
  oncardmove={(e) => move(e.detail)}
/>
```

Accessibility follows the WAI-ARIA APG "Grid" pattern: the board root is
`role="grid"`, columns are `role="gridcell"` bodies under
`role="columnheader"` titles, cards are buttons carrying accessible names.
A visually-hidden live region announces moves and resizes for assistive tech.
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "columns", type: "KanbanColumnData[]", description: "The board's columns (lanes) in display order", default: "[]", optional: true },
  { name: "cards", type: "KanbanCardData[]", description: "The board's cards (plain data; the consumer owns state)", default: "[]", optional: true },
  { name: "positioning", type: '"stacked" | "temporal"', description: "`stacked` (kanban top-down) or `temporal` (positioned against the tick axis)", default: '"stacked"', optional: true },
  { name: "ticks", type: "KanbanTick[]", description: "Board-wide tick axis; `column.ticks` overrides per column", default: "[]", optional: true },
  { name: "hourHeight", type: "number", description: "Temporal mode: pixels per tick unit (e.g. 56 → one hour = 56px)", default: "48", optional: true },
  { name: "stackedRows", type: "number", description: "Stacked mode: number of dashed row-guide lines per column (0 = none)", default: "0", optional: true },
  { name: "dragDrop", type: "boolean", description: "Enable cross-column drag and drop plus the keyboard-move alternative", default: "false", optional: true },
  { name: "resize", type: "boolean", description: "Enable resizing the start/end edges of temporal cards (pointer handles plus a keyboard alternative); the end may extend into the next column when its axis is aligned", default: "false", optional: true },
  { name: "cardsDraggable", type: "(card: KanbanCardData) => boolean", description: "Per-card override: return false to lock a card in place", optional: true },
  { name: "cardsResizable", type: "(card: KanbanCardData) => boolean", description: "Per-card override: return false to lock a card's edges", optional: true },
  { name: "cardContent", type: "Snippet<[KanbanCardData]>", description: "Custom card content; receives the raw card", optional: true },
  { name: "class", type: "string", description: "Additional CSS classes on the board root", default: '""', optional: true },
  { name: "id", type: "string", description: "HTML id for the board element", default: "crypto.randomUUID()", optional: true },
  { name: "oncardselect", type: "(event: CustomEvent<{ card: KanbanCardData }>) => void", description: "Fires when a card is activated (pointer or keyboard)", optional: true, eventDetail: "{ card: KanbanCardData }" },
  { name: "oncardmove", type: "(event: CustomEvent<KanbanMoveDetail>) => void", description: "Fires on drop or keyboard move — the consumer owns state", optional: true, eventDetail: "KanbanMoveDetail" },
  { name: "oncardresize", type: "(event: CustomEvent<KanbanResizeDetail>) => void", description: "Fires when a resize gesture commits (pointer up or arrow key) — the consumer owns state; cross-column resizes add `endColumn`", optional: true, eventDetail: "KanbanResizeDetail" },
];
</script>

<script lang="ts">
/**
 * @component
 * KanbanBoard - A lane board with Google-Calendar and Jira-style modes.
 *
 * See the module doc block above for the full behavior contract. Layout
 * math lives in `src/lib/helpers/kanbanLayout.ts`; types in
 * `kanbanTypes.ts` beside this file.
 */
import type { Snippet } from "svelte"
import Icon from "../Icon/Icon.svelte"
import Tooltip from "../Tooltip/Tooltip.svelte"
import {
  assignKanbanLanes,
  cardColumnSpan,
  cardExtentInColumn,
  cardExtentInSpill,
  cardTickExtent,
  crossColumnEnd,
  isSpilled,
  pointerTickOffset,
  resizeTickExtent,
  snapTickValue,
  tickBands,
  tickPercentages,
} from "../../helpers/kanbanLayout.js"
import type {
  KanbanCardData,
  KanbanColumnData,
  KanbanMoveDetail,
  KanbanResizeDetail,
  KanbanTick,
} from "./kanbanTypes.js"

interface Props {
  /** Rest props passed through to the board root element */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
  /** HTML id for the board element */
  id?: string
  /** The board's columns (lanes) in display order */
  columns?: KanbanColumnData[]
  /** The board's cards (plain data; the consumer owns state) */
  cards?: KanbanCardData[]
  /** `stacked` (kanban top-down) or `temporal` (positioned against the tick axis) */
  positioning?: "stacked" | "temporal"
  /** Board-wide tick axis; `column.ticks` overrides per column */
  ticks?: KanbanTick[]
  /** Temporal mode: pixels per tick unit (e.g. 56 → one hour = 56px) */
  hourHeight?: number
  /** Stacked mode: number of dashed row-guide lines per column (0 = none) */
  stackedRows?: number
  /** Enable cross-column drag and drop plus the keyboard-move alternative */
  dragDrop?: boolean
  /** Enable resizing the start/end edges of temporal cards (pointer handles plus a keyboard alternative); the end may extend into the next column when its axis is aligned */
  resize?: boolean
  /** Per-card override: return false to lock a card in place */
  cardsDraggable?: (card: KanbanCardData) => boolean
  /** Per-card override: return false to lock a card's edges */
  cardsResizable?: (card: KanbanCardData) => boolean
  /** Custom card content; receives the raw card */
  cardContent?: Snippet<[KanbanCardData]>
  /** Additional CSS classes on the board root */
  class?: string
  /** Fires when a card is activated (pointer or keyboard) */
  oncardselect?: (event: CustomEvent<{ card: KanbanCardData }>) => void
  /** Fires on drop or keyboard move — the consumer owns state */
  oncardmove?: (event: CustomEvent<KanbanMoveDetail>) => void
  /** Fires when a resize gesture commits (pointer up or arrow key) — the consumer owns state; cross-column resizes add `endColumn` */
  oncardresize?: (event: CustomEvent<KanbanResizeDetail>) => void
}

let {
  id = crypto.randomUUID(),
  columns = [],
  cards = [],
  positioning = "stacked",
  ticks = [],
  hourHeight = 48,
  stackedRows = 0,
  dragDrop = false,
  resize = false,
  cardsDraggable,
  cardsResizable,
  cardContent,
  class: className = "",
  oncardselect,
  oncardmove,
  oncardresize,
  ...restProps
}: Props = $props()

/** Fallback temporal axis (9 AM → 5 PM) when no ticks are configured. */
const DEFAULT_TICKS: KanbanTick[] = [
  { value: 9, label: "9 AM", major: true },
  { value: 10 },
  { value: 11 },
  { value: 12, label: "12 PM", major: true },
  { value: 13 },
  { value: 14 },
  { value: 15, label: "3 PM", major: true },
  { value: 16 },
  { value: 17, major: true },
]

/**
 * Effective ticks for one column: the column override wins, then the
 * board-wide list. In temporal mode a column with no ticks at all falls
 * back to the default business-hours axis so cards still render.
 * @param column - The column to resolve ticks for
 */
function ticksFor(column: KanbanColumnData | undefined): KanbanTick[] {
  if (column !== undefined && column.ticks !== undefined && column.ticks.length > 0) {
    return column.ticks
  }
  if (ticks.length > 0) return ticks
  return positioning === "temporal" ? DEFAULT_TICKS : []
}

/** Board-wide axis extent (first/last tick of the board-wide list). */
const axis = $derived.by(() => {
  const list = ticks.length > 0 ? ticks : DEFAULT_TICKS
  const first = list[0].value
  const last = list[list.length - 1].value
  return { first, last, span: Math.max(last - first, 1) }
})

/**
 * Height of one column's scrollable body (temporal mode): that column's
 * own axis range × `hourHeight`, so per-column tick overrides rescale
 * the column while the board-wide ruler keeps its own geometry.
 * @param column - The column to measure
 */
function bodyHeightFor(column: KanbanColumnData | undefined): number {
  const list = ticksFor(column)
  if (list.length < 2) return hourHeight
  return (list[list.length - 1].value - list[0].value) * hourHeight
}

/** Ruler labels (labeled or major ticks of the board-wide axis). */
const rulerTicks = $derived(
  (ticks.length > 0 ? ticks : DEFAULT_TICKS).filter(
    (t) => (t.label !== undefined && t.label !== "") || t.major === true,
  ),
)

/** Resolved column spans for every card (0-based inclusive indices). */
const spans = $derived.by(() => {
  const map = new Map<string, { start: number; end: number }>()
  for (const card of cards) map.set(card.id, cardColumnSpan(card, columns))
  return map
})

/** Cards whose resolved span covers the given column index. */
function cardsInColumn(index: number): KanbanCardData[] {
  return cards.filter((card) => {
    const span = spans.get(card.id)
    if (span === undefined) return false
    if (index >= span.start && index <= span.end) return true
    // A live cross-column end gesture extends the card's reach into the
    // next column before the consumer commits it.
    return resizing?.card.id === card.id && spillIndexOf(resizing) === index
  })
}

/**
 * True when this column renders the spanning card's element — the card
 * renders once, in its span's first column, and visually extends right.
 * @param card - The card in question
 * @param index - The column being rendered
 */
function ownsSpan(card: KanbanCardData, index: number): boolean {
  const span = spans.get(card.id)
  return span !== undefined && span.start === index
}

/**
 * Cards rendering their full element in this column: span owners whose
 * span is a single column. Multi-column spans render in the overlay
 * instead (one element owning `grid-column: start / end`), with
 * continuation markers in the covered columns.
 * @param index - The column index
 */
function columnCards(index: number): KanbanCardData[] {
  return cardsInColumn(index).filter((c) => {
    if (!ownsSpan(c, index)) return false
    const span = spans.get(c.id)
    return span !== undefined && span.end === span.start
  })
}

/**
 * Spanning cards covering (but not owned by) this column.
 * @param index - The column index
 */
function continuationCards(index: number): KanbanCardData[] {
  return cardsInColumn(index).filter((c) => !ownsSpan(c, index) || c.endColumn === columns[index]?.id)
}

/** True when any card spans more than one column (drives the overlay). */
const hasSpans = $derived(cards.some((c) => {
  const span = spans.get(c.id)
  return span !== undefined && span.end > span.start
}))

/**
 * Grid-column placement for a spanning card's overlay element. The body
 * grid's first track is the ruler gutter, so 0-based column `i` lives on
 * CSS line `i + 2` (inclusive end → `+ 3`).
 * @param card - The card to place
 */
function spanGridColumn(card: KanbanCardData): string {
  const span = spans.get(card.id)
  if (span === undefined) return ""
  return `grid-column: ${span.start + 2} / ${span.end + 3};`
}

/** Lane assignment per column: card id → 1-based lane, plus max count. */
const lanes = $derived.by(() => {
  const maps: Map<string, number>[] = []
  let max = 0
  for (let i = 0; i < columns.length; i++) {
    const list = ticksFor(columns[i])
    const extentMap = new Map<string, { start: number; end: number }>()
    for (const card of cardsInColumn(i)) {
      extentMap.set(card.id, cardExtentInColumn(card, list))
    }
    const result = assignKanbanLanes(cardsInColumn(i), extentMap)
    maps.push(result.lanes)
    if (result.count > max) max = result.count
  }
  return { maps, count: max }
})

/** Lane lookup for one card in one column (defaults to lane 1). */
function laneOf(card: KanbanCardData, index: number): number {
  return lanes.maps[index]?.get(card.id) ?? 1
}

/** Lane count within one column (drives that column's width fractions). */
function laneCountOf(index: number): number {
  return Math.max(lanes.maps[index]?.size ?? 0, 1)
}

/** Effective color for a card: card color → column accent → primary. */
function cardColor(card: KanbanCardData, columnIndex: number): string {
  return card.color ?? columns[columnIndex]?.accent ?? "var(--color-primary)"
}

/** Formats a tick-unit value as a short clock label ("9" / "9.5" → "9:30"). */
function formatTick(value: number): string {
  const whole = Math.floor(value)
  const minutes = Math.round((value - whole) * 60)
  return minutes === 0 ? String(whole) : `${whole}:${String(minutes).padStart(2, "0")}`
}

/** Accessible name for a card: title, column, time, span marker. */
function cardLabel(card: KanbanCardData, columnIndex: number): string {
  const parts = [card.title]
  const column = columns[columnIndex]
  if (column !== undefined) parts.push(column.title)
  if (positioning === "temporal" && card.start !== undefined) {
    parts.push(`at ${formatTick(card.start)}`)
  }
  const span = spans.get(card.id)
  if (span !== undefined && span.end > span.start) parts.push("spans multiple columns")
  return parts.join(", ")
}

/** Progress clamped to 0–100 (undefined passes through — no bar renders). */
function progressOf(card: KanbanCardData): number | undefined {
  return card.progress === undefined ? undefined : Math.min(100, Math.max(0, card.progress))
}

/**
 * Whether a card can be dragged by the pointer or keyboard-moved:
 * board DnD on + per-card lock + `cardsDraggable` override.
 * @param card - The card to test
 */
function isDraggable(card: KanbanCardData): boolean {
  if (!dragDrop) return false
  if (card.draggable === false) return false
  // Cross-column resizes: resize the spill back instead of dragging.
  if (isSpilled(card)) return false
  return cardsDraggable?.(card) ?? true
}

// ── Drag and drop (native HTML DnD, CalendarView's policy) ──

/** Id of the card being dragged, if any. */
let draggingId = $state<string | undefined>(undefined)

/** `{ column, index }` currently hovered as a drop target, if any. */
let dragOver = $state<{ column: number; index: number } | undefined>(undefined)

/**
 * Starts a card drag. Only enabled when the board has DnD and the card
 * passes the per-card locks.
 * @param card - The card being dragged
 * @param e - The dragstart event
 */
function handleDragStart(card: KanbanCardData, e: DragEvent): void {
  if (resizing !== undefined) return
  if (!isDraggable(card)) return
  draggingId = card.id
  e.dataTransfer?.setData("text/plain", card.id)
  if (e.dataTransfer) e.dataTransfer.effectAllowed = "move"
}

/**
 * Resolves the `{ column, index }` a drop target represents. Drop zones
 * carry `data-dropzone` + `data-column`/`data-index`; the column body
 * itself carries `data-column` (dropping anywhere in the lane lands at
 * index 0 — ordering is the consumer's concern).
 * @param target - The event target or one of its ancestors
 */
function targetFromCell(target: EventTarget | null): { column: number; index: number } | undefined {
  const zone = (target as HTMLElement | null)?.closest?.("[data-dropzone]")
  if (zone !== null && zone !== undefined) {
    const columnIndex = Number(zone.getAttribute("data-column"))
    const index = Number(zone.getAttribute("data-index"))
    if (!Number.isNaN(columnIndex) && !Number.isNaN(index)) return { column: columnIndex, index }
  }
  const column = (target as HTMLElement | null)?.closest?.("[data-column]")
  if (column === null || column === undefined) return undefined
  const columnIndex = Number(column.getAttribute("data-column"))
  return Number.isNaN(columnIndex) ? undefined : { column: columnIndex, index: 0 }
}

/**
 * Highlights the hovered drop zone (dragover must be cancelled to allow
 * a drop per the HTML DnD spec).
 * @param e - The dragover event on a drop zone
 */
function handleDragOver(e: DragEvent): void {
  if (draggingId === undefined) return
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = "move"
  dragOver = targetFromCell(e.target)
}

/** Clears the drop-target highlight when the pointer leaves a zone. */
function handleDragLeave(e: DragEvent): void {
  const current = targetFromCell(e.target)
  if (current !== undefined && dragOver?.column === current.column && dragOver?.index === current.index) {
    dragOver = undefined
  }
}

/**
 * Accepts the drop: resolves the target column/index and fires
 * `oncardmove` so the consumer updates their state.
 * @param e - The drop event on a drop zone
 */
function handleDrop(e: DragEvent): void {
  const target = targetFromCell(e.target)
  const id = draggingId
  draggingId = undefined
  dragOver = undefined
  if (target === undefined || id === undefined) return
  fireMove(id, target.column)
}

/**
 * Fires the `cardmove` callback for a card moving to a column. Temporal
 * mode reports `toIndex: 0` (position comes from the tick extent); the
 * stacked insertion index is derived by the consumer from ordering.
 * @param cardId - The moving card's id
 * @param columnIndex - Target column index
 */
function fireMove(cardId: string, columnIndex: number): void {
  const card = cards.find((c) => c.id === cardId)
  const column = columns[columnIndex]
  if (card === undefined || column === undefined) return
  oncardmove?.(
    new CustomEvent("cardmove", {
      detail: {
        card,
        fromColumn: card.column,
        toColumn: column.id,
        toIndex: positioning === "temporal" ? 0 : Math.max(0, cardsInColumn(columnIndex).length - 1),
      } satisfies KanbanMoveDetail,
    }),
  )
  announce(`${card.title} moved to ${column.title}`)
}

// ── Keyboard move alternative (DnD is pointer-only) ──

/** Id of the activated card (keyboard-move target). */
let selectedId = $state<string | undefined>(undefined)

/**
 * Activates a card as the keyboard-move target and notifies the consumer.
 * @param card - The activated card
 */
function selectCard(card: KanbanCardData): void {
  selectedId = card.id
  oncardselect?.(new CustomEvent("cardselect", { detail: { card } }))
}

/**
 * Keyboard alternative on a focused card: once activated (Enter/Space),
 * ArrowLeft/Right move it between columns. Escape deselects. The card
 * re-renders in its new column when the consumer updates their data —
 * move is always relative to the props (the consumer owns state).
 * @param card - The card's data
 * @param e - The keyboard event on the card button
 */
function handleCardKeydown(card: KanbanCardData, e: KeyboardEvent): void {
  if (e.key === "Escape") {
    selectedId = undefined
    return
  }
  if (selectedId !== card.id) return
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    if (!dragDrop || !isDraggable(card)) return
    e.preventDefault()
    e.stopPropagation()
    const ownIndex = columns.findIndex((c) => c.id === card.column)
    if (ownIndex === -1) return
    const next = e.key === "ArrowRight" ? ownIndex + 1 : ownIndex - 1
    if (columns[next] !== undefined) fireMove(card.id, next)
    return
  }
  // Vertical arrows resize temporal cards (their own guards apply).
  handleResizeKeydown(card, e)
}

// ── Resize (temporal cards): pointer handles + keyboard alternative ──

/** One in-flight pointer resize gesture. */
interface ResizeGesture {
  /** The card being resized */
  card: KanbanCardData
  /** 0-based column index the card renders in */
  columnIndex: number
  /** Which edge the pointer moves */
  edge: "start" | "end"
  /** Extent at gesture start (only `edge` moves during the drag) */
  origin: { start: number; end: number }
  /** The column's effective tick axis (for pixel→tick math) */
  ticks: KanbanTick[]
  /** Rendered pixel height of the column body */
  bodyHeight: number
}

/** Active pointer resize, if any. Drives live preview + preview styles. */
let resizing = $state<ResizeGesture | undefined>(undefined)

/** Latest pointer position in tick units during an active gesture (origin-axis units). */
let resizeTarget = $state(0)

/**
 * True between a resize commit and the click it synthesizes: a pointer
 * gesture on a handle ends with a click on the card, which must not be
 * misread as a card activation. Self-clears via a zero timeout.
 */
let justResized = $state(false)

/**
 * Spill column for an in-flight end resize: the next column, when the
 * card is not statically spanning and a next column exists. Start-edge
 * gestures never spill.
 * @param gesture - The active gesture
 */
function spillIndexOf(gesture: ResizeGesture): number | undefined {
  if (gesture.edge !== "end") return undefined
  const span = spans.get(gesture.card.id)
  if (span !== undefined && span.end > span.start) return undefined
  const next = gesture.columnIndex + 1
  return next < columns.length ? next : undefined
}

/**
 * Whether a card's edges can be resized: board `resize` on (temporal only),
 * per-card lock, and the `cardsResizable` override.
 * @param card - The card to test
 */
function isResizable(card: KanbanCardData): boolean {
  if (!resize || positioning !== "temporal") return false
  if (card.resizable === false) return false
  return cardsResizable?.(card) ?? true
}

/**
 * A resolved (possibly cross-column) gesture state, shared by the origin
 * and spill preview renderers so both preview exactly what commit fires.
 */
interface GestureResolution {
  /** Card start (origin-axis units) */
  start: number
  /** Card end: origin-axis units in-column, spill-axis units when spilling */
  end: number
  /** Spill column index when the gesture rolls over; `undefined` otherwise */
  endColumnIndex: number | undefined
}

/**
 * Resolves the live resize gesture through `crossColumnEnd` — the exact
 * math commit uses — so previews and fired details can never diverge.
 * @returns The resolution, or `undefined` when no end-edge gesture is live
 */
function resolveGesture(): GestureResolution | undefined {
  if (resizing === undefined || resizing.edge !== "end") return undefined
  const nextIndex = spillIndexOf(resizing)
  const snapped = snapTickValue(resizeTarget, resizing.ticks, resizing.origin.start + halfStepOf(resizing.ticks), Number.POSITIVE_INFINITY)
  const resolution = crossColumnEnd({
    start: resizing.origin.start,
    target: snapped,
    ticks: resizing.ticks,
    nextTicks: nextIndex !== undefined ? ticksFor(columns[nextIndex]) : undefined,
    nextIndex,
  })
  return { start: resizing.origin.start, end: resolution.end, endColumnIndex: resolution.endColumnIndex }
}

/** Last tick value on an axis (fallback: first + 1). */
function lastTickOf(ticks: KanbanTick[]): number {
  return ticks.length > 0 ? ticks[ticks.length - 1].value : (ticks[0]?.value ?? 0) + 1
}

/** Half the tick step (the snap granularity); 0.5 on a degenerate axis. */
function halfStepOf(ticks: KanbanTick[]): number {
  return ticks.length >= 2 ? (ticks[1].value - ticks[0].value) / 2 : 0.5
}

/**
 * The tick extent currently rendered for a card — the live preview extent
 * during a gesture, otherwise the prop-derived extent. A spilled card
 * (cross-column end) clamps to its own column's axis.
 * @param card - The card in question
 * @param columnIndex - The card's column index
 * @param ticks - The column's effective tick axis
 */
function extentOf(card: KanbanCardData, columnIndex: number, ticks: KanbanTick[]): { start: number; end: number } {
  if (resizing?.card.id === card.id) {
    const resolution = resolveGesture()
    if (resolution !== undefined) {
      // Spilling: the origin body renders the card clamped to its own
      // axis (the spill column renders the preview segment).
      return { start: resolution.start, end: Math.min(resolution.end, lastTickOf(resizing.ticks)) }
    }
    return resizeTickExtent({ current: resizing.origin, target: resizeTarget, edge: resizing.edge, ticks: resizing.ticks })
  }
  return cardExtentInColumn(card, ticks)
}

/**
 * Starts a pointer resize from a handle's pointerdown. Captures the
 * pointer on the handle so subsequent moves/ups (even outside the
 * element) keep targeting it.
 * @param card - The card being resized
 * @param columnIndex - The card's 0-based column index
 * @param edge - Which edge the handle sits on
 * @param e - The pointerdown event on the handle
 */
function handleResizeStart(card: KanbanCardData, columnIndex: number, edge: "start" | "end", e: PointerEvent): void {
  if (!isResizable(card)) return
  const ticks = ticksFor(columns[columnIndex])
  const columnBody = (e.currentTarget as HTMLElement).closest("[data-kanban-body]")
  const bodyHeight = columnBody !== null ? columnBody.getBoundingClientRect().height : bodyHeightFor(columns[columnIndex])
  resizing = { card, columnIndex, edge, origin: cardTickExtent(card, ticks), ticks, bodyHeight }
  resizeTarget = edge === "start" ? cardTickExtent(card, ticks).start : cardTickExtent(card, ticks).end
  const handle = e.currentTarget as HTMLElement
  if (typeof handle.setPointerCapture === "function") {
    try {
      handle.setPointerCapture(e.pointerId)
    } catch {
      // jsdom and some styluses throw on capture — the pointerup still fires on the handle in practice
    }
  }
  e.preventDefault()
}

/**
 * Updates the live preview while the pointer moves. The gesture's
 * captured handle receives pointermove even outside the card. Values past
 * the column's last tick mean a cross-column spill; preview and commit
 * resolve the rollover through `crossColumnEnd`.
 * @param e - The pointermove event on the captured handle
 */
function handleResizeMove(e: PointerEvent): void {
  if (resizing === undefined) return
  const body = (e.currentTarget as HTMLElement).closest("[data-kanban-body]")
  const height = body !== null ? body.getBoundingClientRect().height : resizing.bodyHeight
  const offsetY = e.clientY - (body?.getBoundingClientRect().top ?? 0)
  resizeTarget = pointerTickOffset(offsetY, resizing.ticks, height)
}

/**
 * Commits the resize: resolves the (possibly cross-column) end, fires
 * `oncardresize` with the snapped extent, and clears the gesture. The
 * consumer re-renders from their own data.
 * @param e - The pointerup (or pointercancel) event
 */
function handleResizeEnd(e: PointerEvent): void {
  const gesture = resizing
  if (gesture === undefined) return
  const body = (e.currentTarget as HTMLElement).closest("[data-kanban-body]")
  const height = body !== null ? body.getBoundingClientRect().height : gesture.bodyHeight
  const offsetY = e.clientY - (body?.getBoundingClientRect().top ?? 0)
  const raw = pointerTickOffset(offsetY, gesture.ticks, height)
  resizing = undefined
  resizeTarget = 0
  justResized = true
  setTimeout(() => {
    justResized = false
  }, 0)
  fireResize(gesture.card, gesture.columnIndex, gesture.edge, raw)
}

/**
 * Fires the `cardresize` callback with a snapped, clamped extent. When
 * the end extends past the column's axis into an aligned next column, the
 * detail carries `endColumn` and the end measured on that column's axis.
 * @param card - The resized card
 * @param columnIndex - The card's column index
 * @param edge - Which edge moved
 * @param target - Pointer position in tick units at commit time (origin axis, unclamped)
 */
function fireResize(
  card: KanbanCardData,
  columnIndex: number,
  edge: "start" | "end",
  target: number,
): void {
  const ticks = ticksFor(columns[columnIndex])
  const column = columns[columnIndex]
  if (column === undefined) return
  const first = ticks[0]?.value ?? 0
  const last = ticks[ticks.length - 1]?.value ?? first + 1
  const step = ticks.length >= 2 ? (ticks[1].value - ticks[0].value) / 2 : 0.5

  // End-edge gestures may roll over into the next column.
  if (edge === "end") {
    const originExtent = cardTickExtent(card, ticks)
    const span = spans.get(card.id)
    const canSpill = (span === undefined || span.end === span.start) && columnIndex + 1 < columns.length
    const nextIndex = canSpill ? columnIndex + 1 : undefined
    const nextTicks = nextIndex !== undefined ? ticksFor(columns[nextIndex]) : undefined
    // Snap without an upper clamp: a target past the axis must survive so
    // crossColumnEnd can resolve it as a spill (it clamps in-column results
    // to `last` itself).
    const snapped = snapTickValue(target, ticks, first + step, Number.POSITIVE_INFINITY)
    const resolution = crossColumnEnd({
      start: originExtent.start,
      target: snapped,
      ticks,
      nextTicks,
      nextIndex,
    })
    if (resolution.endColumnIndex !== undefined) {
      // `resolution.end` is already snapped to the spill axis (proportional
      // to the pointer's overshoot past the origin body — see
      // crossColumnEnd). No pointer re-read needed: the handle captures the
      // pointer over the origin body, whose axis shares tick units.
      oncardresize?.(
        new CustomEvent("cardresize", {
          detail: {
            card,
            column: column.id,
            start: originExtent.start,
            end: resolution.end,
            endColumn: columns[resolution.endColumnIndex].id,
            edge,
          } satisfies KanbanResizeDetail,
        }),
      )
      announce(`${card.title} resized into ${columns[resolution.endColumnIndex].title}`)
      return
    }
    oncardresize?.(
      new CustomEvent("cardresize", {
        detail: {
          card,
          column: column.id,
          start: originExtent.start,
          end: resolution.end,
          edge,
        } satisfies KanbanResizeDetail,
      }),
    )
    announce(`${card.title} resized to ${formatTick(originExtent.start)} – ${formatTick(resolution.end)}`)
    return
  }

  // Start-edge resize stays within the column.
  const extent = resizeTickExtent({ current: cardTickExtent(card, ticks), target, edge, ticks })
  oncardresize?.(
    new CustomEvent("cardresize", {
      detail: { card, column: column.id, start: extent.start, end: extent.end, edge } satisfies KanbanResizeDetail,
    }),
  )
  announce(`${card.title} resized to ${formatTick(extent.start)} – ${formatTick(extent.end)}`)
}

/**
 * Keyboard resize on an activated temporal card (calendar semantics):
 * ArrowDown extends the end one tick step later, Shift+ArrowDown pulls the
 * end earlier, ArrowUp extends the start earlier, Shift+ArrowUp pushes the
 * start later. `fireResize` snaps and clamps each move; the consumer owns
 * state, so the card re-renders from their updated data.
 * @param card - The card's data
 * @param e - The keyboard event on the card button
 */
function handleResizeKeydown(card: KanbanCardData, e: KeyboardEvent): void {
  if (selectedId !== card.id) return
  if (!isResizable(card)) return
  if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return
  e.preventDefault()
  e.stopPropagation()
  const columnIndex = Math.max(0, columns.findIndex((c) => c.id === card.column))
  const ticks = ticksFor(columns[columnIndex])
  const first = ticks[0]?.value ?? 0
  const last = ticks[ticks.length - 1]?.value ?? first + 1
  const step = ticks.length >= 2 ? Math.abs(ticks[1].value - ticks[0].value) : 1
  const extent = cardExtentInColumn(card, ticks)
  if (e.key === "ArrowDown") {
    const next = e.shiftKey ? extent.end - step : extent.end + step
    if (isSpilled(card)) {
      // Already spilled: adjust the spill on the spill column's axis.
      const spillColumnIndex = columns.findIndex((c) => c.id === card.endColumn)
      const spillTicks = spillColumnIndex >= 0 ? ticksFor(columns[spillColumnIndex]) : undefined
      if (spillTicks !== undefined && spillTicks.length >= 2) {
        const spillFirst = spillTicks[0].value
        const spillLast = spillTicks[spillTicks.length - 1].value
        const spillEnd = card.end ?? spillFirst
        const newEnd = e.shiftKey ? spillEnd - step : spillEnd + step
        if (newEnd <= spillFirst) {
          // Retracted fully: clear the spill, end at the origin's last tick.
          oncardresize?.(
            new CustomEvent("cardresize", {
              detail: { card, column: columns[columnIndex].id, start: extent.start, end: last, edge: "end" } satisfies KanbanResizeDetail,
            }),
          )
          announce(`${card.title} resized to ${formatTick(extent.start)} – ${formatTick(last)}`)
          return
        }
        oncardresize?.(
          new CustomEvent("cardresize", {
            detail: {
              card,
              column: columns[columnIndex].id,
              start: extent.start,
              end: Math.min(spillLast, newEnd),
              endColumn: card.endColumn,
              edge: "end",
            } satisfies KanbanResizeDetail,
          }),
        )
        announce(`${card.title} resized to ${formatTick(extent.start)} – ${formatTick(Math.min(spillLast, newEnd))}`)
      }
      return
    }
    if (next > last) {
      // Rolling over into the next column (aligned axes only).
      const nextIndex = columnIndex + 1 < columns.length ? columnIndex + 1 : undefined
      const nextTicks = nextIndex !== undefined ? ticksFor(columns[nextIndex]) : undefined
      const resolution = crossColumnEnd({
        start: extent.start,
        target: next,
        ticks,
        nextTicks,
        nextIndex,
      })
      if (resolution.endColumnIndex !== undefined) {
        oncardresize?.(
          new CustomEvent("cardresize", {
            detail: {
              card,
              column: columns[columnIndex].id,
              start: extent.start,
              end: resolution.end,
              endColumn: columns[resolution.endColumnIndex].id,
              edge: "end",
            } satisfies KanbanResizeDetail,
          }),
        )
        announce(`${card.title} resized into ${columns[resolution.endColumnIndex].title}`)
      }
      return
    }
    fireResize(card, columnIndex, "end", next)
    return
  }
  if (e.shiftKey && isSpilled(card)) {
    // Shift shrinks a spilled card back toward its own column first.
    const spillColumnIndex = columns.findIndex((c) => c.id === card.endColumn)
    const spillTicks = spillColumnIndex >= 0 ? ticksFor(columns[spillColumnIndex]) : undefined
    if (spillTicks !== undefined && spillTicks.length >= 2) {
      const spillFirst = spillTicks[0].value
      const spillEnd = card.end ?? spillFirst
      if (spillEnd - step <= spillFirst) {
        // Fully retracted: clear the spill and end at the origin's last tick.
        oncardresize?.(
          new CustomEvent("cardresize", {
            detail: { card, column: columns[columnIndex].id, start: extent.start, end: last, edge: "end" } satisfies KanbanResizeDetail,
          }),
        )
        announce(`${card.title} resized to ${formatTick(extent.start)} – ${formatTick(last)}`)
        return
      }
      oncardresize?.(
        new CustomEvent("cardresize", {
          detail: { card, column: columns[columnIndex].id, start: extent.start, end: spillEnd - step, endColumn: card.endColumn, edge: "end" } satisfies KanbanResizeDetail,
        }),
      )
      announce(`${card.title} resized to ${formatTick(extent.start)} – ${formatTick(spillEnd - step)}`)
    }
    return
  }
  fireResize(card, columnIndex, "start", e.shiftKey ? extent.start + step : extent.start - step)
}

// ── Live region ──

/** Polite announcement text for assistive tech (moves and resizes). */
let liveMessage = $state("")

/**
 * Queues a screen-reader announcement.
 * @param message - The text to announce
 */
function announce(message: string): void {
  liveMessage = message
}

/** Row-guide bands for one column (temporal mode). */
function bandsFor(column: KanbanColumnData) {
  return tickBands(ticksFor(column))
}

/**
 * Extent of a card's spill segment in column `i`. During an active
 * end-resize gesture spilling into this column, the segment previews from
 * the gesture's target; otherwise it derives from the committed `end`.
 * @param card - The spilled card
 * @param i - The spill column's index
 * @param ticks - The spill column's effective tick axis
 */
function spillExtentOf(card: KanbanCardData, i: number, ticks: KanbanTick[]): { start: number; end: number } {
  if (resizing?.card.id === card.id && spillIndexOf(resizing) === i) {
    const resolution = resolveGesture()
    if (resolution !== undefined && resolution.endColumnIndex === i) {
      // Preview band: the spill axis's first tick → the resolved end.
      const first = ticks[0]?.value ?? 0
      const last = ticks.length > 0 ? ticks[ticks.length - 1].value : first + 1
      return { start: first, end: Math.min(last, Math.max(first, resolution.end)) }
    }
  }
  return cardExtentInSpill(card, ticks)
}

/** Stacked-mode guide positions as percentages (evenly spaced lines). */
function stackedGuides(): number[] {
  if (stackedRows <= 0) return []
  return Array.from({ length: stackedRows }, (_, i) => ((i + 1) / (stackedRows + 1)) * 100)
}

/** CSS grid template shared by header, body columns, and the span overlay. */
const gridTemplate = $derived(
  `var(--kanban-gutter, 48px) repeat(${columns.length}, minmax(0, 1fr))`,
)
</script>

<div
  {...restProps}
  {id}
  class={`kanban-board ${className}`}
  data-testid="kanban-board"
  data-positioning={positioning}
>
  <span class="sr-only" data-testid="kanban-board-label">
    {positioning === "temporal" ? "Calendar week board" : "Task board"}, {columns.length} columns
  </span>
  <span class="sr-only" aria-live="polite" data-testid="kanban-board-live">{liveMessage}</span>

  <!-- Header row: titles aligned over the body columns -->
  <div class="kanban-header" role="presentation" style={`grid-template-columns: ${gridTemplate};`}>
    <div class="kanban-gutter" role="presentation"></div>
    {#each columns as column (column.id)}
      <div
        class="kanban-title"
        style={`--column-accent: ${column.accent ?? "var(--color-primary)"};`}
        role="columnheader"
        aria-label={column.title}
        data-testid={`kanban-column-title-${column.id}`}
      >
        <span class="kanban-title-text">{column.title}</span>
        {#if column.subtitle}<span class="kanban-title-sub">{column.subtitle}</span>{/if}
      </div>
    {/each}
  </div>

  <!-- Body: columns + (optionally) the spanning overlay -->
  <div
    class="kanban-body"
    role="presentation"
    class:kanban-body-stacked-spans={positioning === "stacked" && hasSpans}
    style={`grid-template-columns: ${gridTemplate};`}
    data-kanban-body
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
  >
    <!-- Tick ruler (temporal mode only) -->
    {#if positioning === "temporal"}
      <div class="kanban-ruler" aria-hidden="true" data-testid="kanban-ruler">
        <div class="kanban-ruler-inner" style={`height: ${bodyHeightFor(columns[0])}px;`}>
          {#each rulerTicks as tick (tick.value)}
            <span
              class="kanban-ruler-label"
              style={`top: calc(${tickPercentages({ start: tick.value, end: tick.value }, ticks.length > 0 ? ticks : DEFAULT_TICKS).top}% - 0.5em);`}
            >
              {tick.label ?? tick.value}
            </span>
          {/each}
        </div>
      </div>
    {:else}
      <div class="kanban-gutter" role="presentation"></div>
    {/if}

    {#each columns as column, i (column.id)}
      {@const list = ticksFor(column)}
      <div
        class="kanban-column"
        class:kanban-column-temporal={positioning === "temporal"}
        style={`--column-accent: ${column.accent ?? "var(--color-primary)"}; ${positioning === "temporal" ? `height: ${bodyHeightFor(column)}px;` : ""}`}
        data-column={i}
        data-testid={`kanban-column-${column.id}`}
      >
        <!-- Row guides / tick bands -->
        <div class="kanban-guides" aria-hidden="true">
          {#if positioning === "temporal"}
            {#each bandsFor(column) as band, bi (bi)}
              <span
                class="kanban-band"
                class:kanban-band-major={band.tick.major}
                style={`top: ${band.top}%; height: ${band.height}%;`}
              ></span>
            {/each}
          {:else}
            {#each stackedGuides() as top, gi (gi)}
              <span class="kanban-guide" style={`top: ${top}%;`}></span>
            {/each}
          {/if}
        </div>

        <!-- Drop zone (whole column; index 0 — ordering is the consumer's concern) -->
        {#if dragDrop}
          <button
            type="button"
            class="kanban-dropzone"
            class:kanban-dropzone-active={dragOver !== undefined && dragOver.column === i}
            data-dropzone
            data-column={i}
            data-index={0}
            tabindex="-1"
            aria-label={`Drop card in ${column.title}`}
          ></button>
        {/if}

        <!-- Cards -->
        {#if positioning === "stacked"}
          <div class="kanban-stack">
            {#each columnCards(i) as card (card.id)}
              {@const draggable = isDraggable(card)}
              <button
                type="button"
                class="kanban-card"
                class:kanban-card-dragging={draggingId === card.id}
                class:kanban-card-selected={selectedId === card.id}
                class:kanban-card-locked={dragDrop && !draggable}
                style={`--card-color: ${cardColor(card, i)};`}
                aria-label={cardLabel(card, i)}
                data-testid={`kanban-card-${card.id}`}
                draggable={draggable}
                onclick={(e) => {
                  e.stopPropagation()
                  selectCard(card)
                }}
                ondragstart={(e) => handleDragStart(card, e)}
                ondragend={() => {
                  draggingId = undefined
                  dragOver = undefined
                }}
                onkeydown={(e) => handleCardKeydown(card, e)}
              >
                {#if cardContent}
                  {@render cardContent(card)}
                {:else}
                  <span class="kanban-card-head">
                    {#if card.icon}<span class="kanban-card-icon"><Icon name={card.icon} /></span>{/if}
                    <span class="kanban-card-title">{card.title}</span>
                    {#if card.badge !== undefined}<span class="kanban-card-badge">{card.badge}</span>{/if}
                    {#if card.assignee}<span class="kanban-card-assignee" aria-label={`Assigned to ${card.assignee}`}>{card.assignee}</span>{/if}
                  </span>
                  {#if card.description}<span class="kanban-card-desc">{card.description}</span>{/if}
                  {#if progressOf(card) !== undefined}
                    <span class="kanban-card-progress" aria-hidden="true">
                      <span class="kanban-card-progress-bar" style={`width: ${progressOf(card)}%;`}></span>
                    </span>
                  {/if}
                {/if}
              </button>
            {/each}
          </div>
        {:else}
          <!-- Temporal cards: absolutely positioned against the tick axis.
               A wrapper owns the placement and gesture wiring so the card
               and its resize handles can stay real, non-nested buttons. -->
          <div class="kanban-timegrid">
            {#each columnCards(i) as card (card.id)}
              {@const extent = extentOf(card, i, list)}
              {@const pct = tickPercentages(extent, list)}
              {@const lane = laneOf(card, i)}
              {@const laneTotal = laneCountOf(i)}
              {@const draggable = isDraggable(card)}
              {@const resizable = isResizable(card)}
              <div
                class="kanban-card kanban-card-temporal"
                class:kanban-card-dragging={draggingId === card.id}
                class:kanban-card-selected={selectedId === card.id}
                class:kanban-card-resizing={resizing?.card.id === card.id}
                class:kanban-card-locked={dragDrop && !draggable}
                style={`--card-color: ${cardColor(card, i)}; top: ${pct.top}%; height: ${pct.height}%; --lane: ${lane}; --lanes: ${laneTotal};`}
                role="presentation"
                data-testid={`kanban-card-${card.id}`}
                onclick={(e) => {
                  if (justResized) return
                  selectCard(card)
                }}
                ondragstart={(e) => handleDragStart(card, e)}
                ondragend={() => {
                  draggingId = undefined
                  dragOver = undefined
                }}
                onkeydown={(e) => handleCardKeydown(card, e)}
              >
                <button
                  type="button"
                  class="kanban-card-body"
                  aria-label={cardLabel(card, i)}
                  draggable={draggable}
                >
                  {#if cardContent}
                    {@render cardContent(card)}
                  {:else}
                    <span class="kanban-card-title">{card.title}</span>
                    <span class="kanban-card-time">{formatTick(extent.start)} – {formatTick(extent.end)}</span>
                  {/if}
                </button>
                {#if resizable}
                  <Tooltip content="Drag to resize" position="bottom">
                    <button
                      type="button"
                      class="kanban-resize-handle kanban-resize-start"
                      tabindex="-1"
                      aria-label={`Resize start of ${card.title}`}
                      data-testid={`kanban-resize-start-${card.id}`}
                      onpointerdown={(e) => handleResizeStart(card, i, "start", e)}
                      onpointermove={handleResizeMove}
                      onpointerup={handleResizeEnd}
                      onpointercancel={handleResizeEnd}
                    ></button>
                  </Tooltip>
                  <Tooltip content="Drag to resize" position="top">
                    <button
                      type="button"
                      class="kanban-resize-handle kanban-resize-end"
                      tabindex="-1"
                      aria-label={`Resize end of ${card.title}`}
                      data-testid={`kanban-resize-end-${card.id}`}
                      onpointerdown={(e) => handleResizeStart(card, i, "end", e)}
                      onpointermove={handleResizeMove}
                      onpointerup={handleResizeEnd}
                      onpointercancel={handleResizeEnd}
                    ></button>
                  </Tooltip>
                {/if}
              </div>
            {/each}
          </div>
        {/if}

        <!-- Continuation markers (temporal only): where a multi-column span
             passes through this day column. Cross-column resizes (spills)
             render a positioned segment on the spill column's axis instead;
             stacked mode shows static spans in the overlay band below. -->
        {#if positioning === "temporal"}
          {#each continuationCards(i) as card (card.id)}
            {@const previewSpill = resizing?.card.id === card.id && resolveGesture()?.endColumnIndex === i}
            {#if isSpilled(card) || previewSpill}
              {@const spillPct = tickPercentages(spillExtentOf(card, i, list), list)}
              <span
                class="kanban-spill"
                style={`--card-color: ${cardColor(card, i)}; top: ${spillPct.top}%; height: ${spillPct.height}%; --lane: ${laneOf(card, i)}; --lanes: ${laneCountOf(i)};`}
                aria-hidden="true"
                data-testid={`kanban-spill-${card.id}`}
              >{card.title}</span>
            {:else}
              {@const contPct = tickPercentages(cardTickExtent(card, list), list)}
              <span
                class="kanban-continuation kanban-continuation-temporal"
                style={`--card-color: ${cardColor(card, i)}; top: ${contPct.top}%; height: ${contPct.height}%;`}
                aria-hidden="true"
                data-testid={`kanban-continuation-${card.id}`}
              >→ {card.title}</span>
            {/if}
          {/each}
        {/if}
      </div>
    {/each}

    <!-- Spanning overlay: one element per multi-column card. Stacked mode
         flows it in its own body row (below the columns) so it never
         covers stacked cards; temporal mode absolutely positions it over
         the columns at the cards' tick placements. -->
    {#if hasSpans}
      <div
        class="kanban-span-overlay"
        class:kanban-span-overlay-stacked={positioning === "stacked"}
        style={`grid-template-columns: ${gridTemplate};`}
      >
        {#each cards.filter((c) => {
          const span = spans.get(c.id)
          return span !== undefined && span.end > span.start
        }) as card (card.id)}
          {@const span = spans.get(card.id)}
          {@const ownIndex = span?.start ?? 0}
          {@const draggable = isDraggable(card)}
          {#if positioning === "stacked"}
            <button
              type="button"
              class="kanban-card kanban-card-span"
              class:kanban-card-dragging={draggingId === card.id}
              class:kanban-card-selected={selectedId === card.id}
              class:kanban-card-locked={dragDrop && !draggable}
              style={`--card-color: ${cardColor(card, ownIndex)}; ${spanGridColumn(card)} align-self: start;`}
              aria-label={cardLabel(card, ownIndex)}
              data-testid={`kanban-card-${card.id}`}
              draggable={draggable}
              onclick={(e) => {
                e.stopPropagation()
                selectCard(card)
              }}
              ondragstart={(e) => handleDragStart(card, e)}
              ondragend={() => {
                draggingId = undefined
                dragOver = undefined
              }}
              onkeydown={(e) => handleCardKeydown(card, e)}
            >
              {#if cardContent}
                {@render cardContent(card)}
              {:else}
                <span class="kanban-card-head">
                  {#if card.icon}<span class="kanban-card-icon"><Icon name={card.icon} /></span>{/if}
                  <span class="kanban-card-title">{card.title}</span>
                  {#if card.badge !== undefined}<span class="kanban-card-badge">{card.badge}</span>{/if}
                  {#if card.assignee}<span class="kanban-card-assignee" aria-label={`Assigned to ${card.assignee}`}>{card.assignee}</span>{/if}
                </span>
                {#if card.description}<span class="kanban-card-desc">{card.description}</span>{/if}
                {#if progressOf(card) !== undefined}
                  <span class="kanban-card-progress" aria-hidden="true">
                    <span class="kanban-card-progress-bar" style={`width: ${progressOf(card)}%;`}></span>
                  </span>
                {/if}
              {/if}
            </button>
          {:else}
            {@const extent = extentOf(card, ownIndex, ticksFor(columns[ownIndex]))}
            {@const pct = tickPercentages(extent, ticksFor(columns[ownIndex]))}
            {@const lane = laneOf(card, ownIndex)}
            {@const laneTotal = laneCountOf(ownIndex)}
            <button
              type="button"
              class="kanban-card kanban-card-span kanban-card-temporal"
              class:kanban-card-dragging={draggingId === card.id}
              class:kanban-card-selected={selectedId === card.id}
              class:kanban-card-locked={dragDrop && !draggable}
              style={`--card-color: ${cardColor(card, ownIndex)}; ${spanGridColumn(card)} top: ${pct.top}%; height: ${pct.height}%; --lane: ${lane}; --lanes: ${laneTotal}; margin-inline: 2px;`}
              aria-label={cardLabel(card, ownIndex)}
              data-testid={`kanban-card-${card.id}`}
              draggable={draggable}
              onclick={(e) => {
                e.stopPropagation()
                selectCard(card)
              }}
              ondragstart={(e) => handleDragStart(card, e)}
              ondragend={() => {
                draggingId = undefined
                dragOver = undefined
              }}
              onkeydown={(e) => handleCardKeydown(card, e)}
            >
              {#if cardContent}
                {@render cardContent(card)}
              {:else}
                <span class="kanban-card-title">{card.title}</span>
                <span class="kanban-card-time">{formatTick(extent.start)} – {formatTick(extent.end)}</span>
              {/if}
            </button>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .kanban-board {
    @apply w-full;
  }

  /* Body: the positioning context for the spanning overlay (must stay
   * relative so `inset: 0` anchors to the board, not the page). When
   * stacked spans exist the body grows a second row that hosts them. */
  .kanban-body {
    @apply relative;
  }

  .kanban-body-stacked-spans {
    grid-template-rows: auto auto;
  }

  .kanban-header,
  .kanban-body {
    @apply grid;
  }

  .kanban-gutter {
    @apply w-12 shrink-0;
  }

  /* Header titles */
  .kanban-title {
    @apply flex flex-col items-center gap-0.5 border-b border-surface px-2 pb-2 text-center;
    border-top: 2px solid var(--column-accent);
  }

  .kanban-title-text {
    @apply text-sm font-semibold text-text dark:text-text;
  }

  .kanban-title-sub {
    @apply text-xs text-muted dark:text-muted;
  }

  /* Columns */
  .kanban-column {
    @apply relative border-b border-surface px-1;
    min-height: 8rem;
  }

  .kanban-column-temporal {
    @apply min-h-0;
  }

  .kanban-ruler {
    @apply relative;
  }

  .kanban-ruler-inner {
    @apply relative w-full;
  }

  .kanban-ruler-label {
    @apply absolute end-1 w-12 text-end text-[10px] tabular-nums text-muted dark:text-muted;
  }

  /* Row guides */
  .kanban-guides {
    @apply pointer-events-none absolute inset-y-0 inset-x-1;
  }

  .kanban-band {
    @apply absolute inset-x-0 border-t border-surface;
  }

  .kanban-band-major {
    @apply border-border;
  }

  .kanban-guide {
    @apply absolute inset-x-0 border-t border-dashed border-surface;
  }

  /* Drop zone: covers the column so a drop anywhere lands in that lane */
  .kanban-dropzone {
    @apply absolute inset-0 z-0 rounded opacity-0;
  }

  .kanban-dropzone-active {
    @apply opacity-100 bg-primary/10 ring-2 ring-inset ring-primary;
  }

  /* Stacked cards flow */
  .kanban-stack {
    @apply relative z-10 flex flex-col gap-1.5 p-1;
  }

  /* Temporal grid: cards absolutely positioned */
  .kanban-timegrid {
    @apply relative h-full w-full;
  }

  /* Cards */
  .kanban-card {
    @apply flex flex-col items-start gap-0.5 rounded-md px-2 py-1.5 text-start text-xs
      bg-(--card-color)/15 text-text dark:text-text hover:bg-(--card-color)/25
      focus:outline-none focus-visible:ring-2 focus-visible:ring-(--card-color);
    border-inline-start: 3px solid var(--card-color);
  }

  .kanban-card-temporal {
    @apply absolute;
    inset-inline: 2px;
    /* Side-by-side lanes: horizontal split via width fractions + offset */
    width: calc((100% - 4px) / var(--lanes, 1) - 2px);
    margin-inline-start: calc((var(--lane, 1) - 1) * ((100% - 4px) / var(--lanes, 1) + 2px));
    display: flex;
    flex-direction: column;
  }

  /* The card's visual surface: fills the wrapper minus the handle edges. */
  .kanban-card-body {
    @apply flex flex-col items-start gap-0.5 overflow-hidden rounded-md px-2 py-1.5 text-start text-xs
      bg-(--card-color)/15 text-text dark:text-text hover:bg-(--card-color)/25
      focus:outline-none focus-visible:ring-2 focus-visible:ring-(--card-color);
    border-inline-start: 3px solid var(--card-color);
    flex: 1;
    min-height: 0;
  }

  /* Tooltip wrappers around resize handles must not affect card layout. */
  .kanban-card-temporal :global(.tooltip-wrapper) {
    display: contents;
  }

  .kanban-card-span {
    @apply z-20;
  }

  .kanban-card-dragging {
    @apply opacity-40;
  }

  .kanban-card-selected {
    @apply ring-2 ring-(--card-color);
  }

  .kanban-card-locked {
    @apply cursor-default;
  }

  .kanban-card-resizing {
    @apply z-30 ring-2 ring-(--card-color);
  }

  /* Resize handles: thin pointer targets on the card's top/bottom edges.
   * Real buttons (Tooltip triggers need one) reset to pure edge strips —
   * `display: contents` on their Tooltip wrapper keeps them anchored to
   * the card. `touch-action: none` keeps vertical drags from scrolling. */
  .kanban-resize-handle {
    @apply absolute inset-x-0 z-10 m-0 h-1.5 cursor-ns-resize select-none
      appearance-none border-0 bg-transparent p-0;
    touch-action: none;
  }

  .kanban-resize-start {
    @apply top-0;
  }

  .kanban-resize-end {
    @apply bottom-0;
  }

  .kanban-card:not(.kanban-card-locked) {
    @apply cursor-grab;
  }

  .kanban-card-head {
    @apply flex w-full items-center gap-1;
  }

  .kanban-card-icon {
    @apply shrink-0 text-(--card-color);
  }

  .kanban-card-title {
    @apply min-w-0 flex-1 truncate font-medium;
  }

  .kanban-card-badge {
    @apply shrink-0 rounded-full bg-(--card-color)/30 px-1 text-[10px] font-semibold;
  }

  .kanban-card-assignee {
    @apply shrink-0 rounded-full bg-(--card-color) px-1.5 text-[10px] font-semibold text-white;
  }

  .kanban-card-desc {
    @apply line-clamp-2 w-full text-[11px] text-muted dark:text-muted;
  }

  .kanban-card-time {
    @apply shrink-0 tabular-nums text-[10px] text-muted dark:text-muted;
  }

  .kanban-card-progress {
    @apply h-1 w-full overflow-hidden rounded-full bg-surface;
  }

  .kanban-card-progress-bar {
    @apply block h-full rounded-full;
    background: var(--card-color);
  }

  /* Spanning overlay: mirrors the body's column tracks. Absolute over the
   * columns by default (temporal tick placement); in stacked mode it flows
   * in the body's second row so spanning cards get their own band. */
  .kanban-span-overlay {
    @apply pointer-events-none absolute inset-0 z-20 grid;
    grid-row: 1;
  }

  .kanban-span-overlay-stacked {
    @apply static z-10 py-1;
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .kanban-span-overlay > .kanban-card {
    @apply pointer-events-auto;
  }

  /* Continuation marker for spanning cards in later columns */
  .kanban-continuation {
    @apply absolute z-10 truncate rounded px-1 py-0.5 text-[10px] italic text-muted dark:text-muted
      bg-(--card-color)/10;
    border-inline-start: 2px solid var(--card-color);
    top: 4px;
    inset-inline: 2px;
  }

  .kanban-continuation-temporal {
    @apply overflow-hidden;
  }

  /* Cross-column spill: the continuation segment of a card whose end was
   * resized into this column. Positioned on this column's own axis with
   * the card's lane math, styled like a temporal card but inert. */
  .kanban-spill {
    @apply absolute z-10 overflow-hidden truncate rounded px-1 py-0.5 text-[10px] italic
      bg-(--card-color)/15 text-text dark:text-text;
    border-inline-start: 3px solid var(--card-color);
    inset-inline: 2px;
    width: calc((100% - 4px) / var(--lanes, 1) - 2px);
    margin-inline-start: calc((var(--lane, 1) - 1) * ((100% - 4px) / var(--lanes, 1) + 2px));
  }
</style>
