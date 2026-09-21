# KanbanBoard — Design Note

> New component family requested 2026-09-20: a **lane board** that doubles as
> a Google-Calendar-style week/day view and a Jira-style task board.
> Companion to `CalendarView` (which stays untouched — its month grid remains
> the "mini-calendar" default view; the example page links to it).

## Resolved decisions (2026-09-20)

1. **Naming**: `KanbanBoard` / `KanbanColumn` / `KanbanCard` under
   `src/lib/components/Kanban/`. One board component (the column/card
   markup lives in the board for cross-column drag math; the exported
   `KanbanColumn` / `KanbanCard` types describe the data).
2. **Two positioning modes** via the `positioning` prop:
   - `"stacked"` — kanban/task-board mode: cards flow top-down inside each
     column (rows are just visual guides).
   - `"temporal"` — Google-Calendar week view mode: each card is positioned
     against the tick axis by its `start`/`end` (minutes since the axis
     origin), so cards line up with the time ruler like real calendar events.
3. **Ticks per column or per board**: `ticks` (board-wide) is a
   `KanbanTick[]`; `column.ticks` overrides for that column only.
   A tick is `{ value, label?, major? }` — rows/bands are drawn from tick
   boundaries (`major` ticks get a stronger rule + label by default).
4. **Spanning cards**: a card carries `span?: number` (columns) or explicit
   `columnStart?: number` + `columnEnd?: number`. The board renders it as
   one element covering the full column range (CSS `grid-column`), so a
   task that is "almost done" can straddle Doing → Done. Overlapping
   same-column cards stack side-by-side via the interval-packing math in
   `kanbanLayout.ts` (`assignKanbanLanes`), the same greedy algorithm
   CalendarView uses for multi-day lanes.
5. **Drag and drop**: native HTML Drag and Drop API (matches CalendarView's
   `dragEvents`), between lanes and onto spanning positions. The consumer
   owns state — the board fires `oncardmove` with
   `{ card, fromColumn, toColumn, toIndex }` and never mutates data. A
   keyboard alternative (activate card with Enter → arrow keys move it
   between columns/positions) keeps DnD from being pointer-only.
6. **Accessibility**: APG list/treegrid hybrid — the board is `role="grid"`,
   columns are `role="columnheader"` + `role="gridcell"` bodies, cards are
   buttons with accessible names (`title, column`). Drop targets are
   announced via `aria-dropeffect`-style live region updates; the live
   region announces the card's new column after a move.
7. **Example page**: `/docs/examples/kanban` (example-only per request —
   the component docs page can be added later following the standard
   template). Shows (a) a Google-style temporal week board with hour ticks
   and overlapping/spanning events, and (b) a Jira-style sprint board with
   stacked cards, WIP spanning between columns, and drag between lanes.

## Component API

```svelte
<KanbanBoard
  columns={[
    { id: "mon", title: "Monday", date: "2026-09-14", ticks: [{ value: 9, label: "9 AM" }, …] },
    { id: "done", title: "Done" },
  ]}
  cards={[
    { id: "t1", column: "mon", title: "Standup", start: 9, end: 9.5 },
    { id: "t2", column: "doing", title: "Ship v2", columnStart: 1, columnEnd: 2, progress: 80 },
  ]}
  positioning="temporal"   // "stacked" | "temporal"
  ticks={[{ value: 9, label: "9 AM", major: true }, …]}  // board-wide default
  hourHeight={56}          // temporal mode: px per tick unit
  dragDrop                 // enable cross-column DnD + keyboard move
  oncardmove={(e) => …}    // { card, fromColumn, toColumn, toIndex }
/>
```

### KanbanColumn (data shape)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | stable identity, referenced by cards |
| `title` | `string` | header label |
| `subtitle?` | `string` | secondary header text (e.g. date, WIP count) |
| `date?` | `string` | marks the column as a calendar day (temporal demos) |
| `ticks?` | `KanbanTick[]` | per-column tick override |
| `accent?` | `string` | CSS color for the header accent |
| `data-*` | | rest via index signature |

### KanbanCard (data shape)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | stable identity |
| `column` | `string` | the column the card lives in |
| `title` | `string` | card label |
| `start?` / `end?` | `number` | temporal position in tick units (e.g. hours) |
| `columnStart?` / `columnEnd?` | `number` | 0-based inclusive column span (overrides `span`) |
| `span?` | `number` | columns spanned, starting at the card's column |
| `lane?` | `number` | explicit side-by-side lane (1-based); auto-computed when omitted |
| `color?` | `string` | CSS color (falls back to the column accent / primary) |
| `icon?`, `badge?`, `assignee?`, `progress?` | | optional markers (icon name, chip, avatar initials, 0–100) |
| `draggable?` | `boolean` | per-card DnD lock (default true) |
| `data-*` | | rest via index signature |

## Layout math (`src/lib/helpers/kanbanLayout.ts`)

- `assignKanbanLanes(cards)` — greedy interval coloring (start, then longest
  first) over each column's card set; returns per-column lane maps and the
  per-column lane counts. Pure data → trivially testable, mirroring
  `eventLanes.ts`.
- `cardTicks(card)` — resolves the temporal extent (defaults: start = first
  tick, end = start + 1) so temporal placement never NaNs.

## Rendering model

- CSS grid: `grid-template-columns: repeat(N, minmax(0, 1fr))` with a fixed
  gutter column for the tick ruler (temporal mode). Column bodies are
  `position: relative` in temporal mode (cards absolutely placed by
  `top/height` percentages) and normal flow in stacked mode.
- Spanning cards render **inside the spanning column's body** but visually
  extend via negative margin + z-index… **revised**: spanning cards render
  in a dedicated overlay grid row keyed by the board grid so a single
  element owns `grid-column: start / end`. Simplest correct approach:
  the board renders each column as a grid item; spanning cards live in a
  full-width overlay whose children are placed with `grid-column:
  ${start + 1} / ${end + 2}` and per-column offsets. Both demos avoid
  nested-scroll issues because the board scrolls as one unit.
- Ticks render as repeating `linear-gradient` bands + absolutely-positioned
  labels (temporal mode) or as row guide lines (stacked mode), driven by the
  same tick arrays the ruler labels use.
- Tailwind utilities in markup; the one sanctioned inline style is dynamic
  geometry (`--tick-*`, `top/height/grid-column`), matching the CalendarView
  `--event-color` precedent (design §6 of CALENDARVIEW_DESIGN.md).

## Files

| File | Purpose |
|---|---|
| `src/lib/components/Kanban/KanbanBoard.svelte` | the board (columns, ticks, DnD, keyboard move) |
| `src/lib/components/Kanban/kanbanTypes.ts` | shared `KanbanColumnData` / `KanbanCardData` / `KanbanTick` types |
| `src/lib/helpers/kanbanLayout.ts` | lane packing + tick geometry |
| `tests/unit/kanbanLayout.test.ts`, `tests/unit/KanbanBoard.test.ts` | unit coverage |
| `stories/KanbanBoard.stories.svelte` | Storybook |
| `src/routes/docs/examples/kanban/+page.svelte` | Google-style week + Jira sprint demos |
| `tests/e2e/KanbanExample.test.js` | e2e |

## i18n / docs

Message keys `kanban_*` in `messages/{en,es,fa}.json`. The example page
imports `m` and follows the docs i18n rules (`check:i18n`). `componentIcons`
maps `KanbanBoard: "layout-kanban"`.
