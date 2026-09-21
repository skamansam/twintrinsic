<!--
@component
Kanban board example page — one board, two modes.

Shows the `KanbanBoard` family as (a) a Google-Calendar-style week view
(`positioning="temporal"` with hour ticks, overlapping cards in side-by-side
lanes, and a release window spanning two days) and (b) a Jira-style sprint
board (`positioning="stacked"` with drag between lanes and a WIP task
straddling Doing → Review). Both demos use the native-HTML5-DnD + keyboard
path and reset/add-card controls to show the consumer-owned state pattern.
-->
<script module lang="ts">
/**
 * Consumer polyfill pattern: the example renders day columns from real
 * PlainDates (see `WEEK_COLUMNS`), so the Temporal global is installed up
 * front exactly as the docs recommend for consumers.
 */
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill"

if (!globalThis.Temporal) {
  ;(globalThis as { Temporal: unknown }).Temporal = TemporalPolyfill
}
</script>

<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import KanbanBoard from "$lib/components/Kanban/KanbanBoard.svelte"
import type { KanbanCardData, KanbanColumnData, KanbanMoveDetail, KanbanResizeDetail, KanbanTick } from "$lib/components/Kanban/kanbanTypes.js"
import { m } from "$lib/paraglide/messages.js"

// ── Calendar week (temporal) demo ──

/** One business week built from real PlainDates (pinned September 2026). */
function dayColumn(iso: string): KanbanColumnData {
  const date = Temporal.PlainDate.from(iso)
  return { id: iso, title: date.toLocaleString("en", { weekday: "long" }), subtitle: `Sep ${date.day}`, date: iso }
}

const WEEK_COLUMNS: KanbanColumnData[] = [
  dayColumn("2026-09-14"),
  dayColumn("2026-09-15"),
  dayColumn("2026-09-16"),
  dayColumn("2026-09-17"),
  dayColumn("2026-09-18"),
]

/** Hourly axis, 9 AM → 5 PM, labeled every two hours (minor ticks in between). */
const HOUR_TICKS: KanbanTick[] = Array.from({ length: 9 }, (_, i) => ({
  value: 9 + i,
  ...(i % 2 === 0
    ? { label: `${((9 + i) % 12) || 12} ${9 + i < 12 ? "AM" : "PM"}`, major: true }
    : {}),
}))

/** Colors cycled by the add-card control (theme tokens). */
const CARD_COLORS = [
  "var(--color-secondary)",
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-error)",
  "var(--color-primary)",
]

/** Consumer-owned week cards (drag rewrites the card's column). */
let weekCards: KanbanCardData[] = $state([
  { id: "wk-plan", column: "2026-09-14", title: "Sprint planning", start: 9, end: 10.5, color: CARD_COLORS[0] },
  { id: "wk-1on1", column: "2026-09-14", title: "1:1 with Sam", start: 11, end: 11.5, color: CARD_COLORS[1] },
  { id: "wk-review", column: "2026-09-15", title: "Design review", start: 14, end: 15, color: CARD_COLORS[2] },
  { id: "wk-offsite", column: "2026-09-15", title: "Offsite prep", start: 14.5, end: 16, color: CARD_COLORS[3] },
  { id: "wk-talk", column: "2026-09-16", title: "Conference talk", start: 9, end: 11, color: CARD_COLORS[4] },
  { id: "wk-deploy", column: "2026-09-17", title: "Release window", start: 15, end: 17, color: CARD_COLORS[1], columnStart: 3, columnEnd: 4 },
])

/** Applies a cross-column move to the consumer-owned week cards. A move
 * clears span fields and any cross-column spill from a previous resize. */
function moveWeekCard(e: CustomEvent<KanbanMoveDetail>) {
  const { card, toColumn } = e.detail
  weekCards = weekCards.map((c) => (c.id === card.id ? { ...c, column: toColumn, columnStart: undefined, columnEnd: undefined, endColumn: undefined } : c))
}

/** Applies a committed resize to the consumer-owned week cards. Cross-column
 * spills persist `endColumn` (and the spill-axis `end`); a plain resize
 * clears it, which retracts the card into its own day. */
function resizeWeekCard(e: CustomEvent<KanbanResizeDetail>) {
  const { card, start, end, endColumn } = e.detail
  weekCards = weekCards.map((c) => (c.id === card.id ? { ...c, start, end, endColumn } : c))
}

// ── Sprint board (stacked) demo ──

/** Jira-style columns; the Doing column carries its own accent. */
const SPRINT_COLUMNS: KanbanColumnData[] = [
  { id: "todo", title: "To do", subtitle: "Backlog" },
  { id: "doing", title: "Doing", subtitle: "WIP", accent: "var(--color-warning)" },
  { id: "review", title: "Review", accent: "var(--color-secondary)" },
  { id: "done", title: "Done", accent: "var(--color-success)" },
]

/** Consumer-owned sprint cards (the release task straddles Doing → Review). */
let sprintCards: KanbanCardData[] = $state([
  { id: "sp-1", column: "todo", title: "Design the API", assignee: "AK", badge: "P1", description: "Resource model + pagination contract" },
  { id: "sp-2", column: "todo", title: "Set up CI", assignee: "MB", progress: 20 },
  { id: "sp-3", column: "todo", title: "Draft the RFC" },
  { id: "sp-4", column: "doing", title: "Implement search", assignee: "SA", progress: 65 },
  { id: "sp-5", column: "review", title: "Billing page", assignee: "JD", progress: 90 },
  { id: "sp-6", column: "done", title: "Auth flows" },
  { id: "sp-release", column: "doing", title: "Ship v2 release", columnStart: 1, columnEnd: 2, progress: 80, description: "Almost done — finishing the review pass", color: CARD_COLORS[4] },
])

/** Applies a cross-column move; spanning releases stay spanning. */
function moveSprintCard(e: CustomEvent<KanbanMoveDetail>) {
  const { card, toColumn, toIndex } = e.detail
  const columnIndex = SPRINT_COLUMNS.findIndex((c) => c.id === toColumn)
  sprintCards = sprintCards.map((c) => {
    if (c.id !== card.id) return c
    const wasSpanning = c.columnStart !== undefined || c.columnEnd !== undefined
    if (wasSpanning) {
      // Keep a one-column reach around the new home so the straddle survives moves.
      return { ...c, column: toColumn, columnStart: Math.max(0, columnIndex - 1), columnEnd: Math.min(SPRINT_COLUMNS.length - 1, columnIndex + 1) }
    }
    void toIndex
    return { ...c, column: toColumn }
  })
}

/** Per-card lock: completed work is no longer draggable. */
function draggableCard(card: KanbanCardData): boolean {
  return card.column !== "done"
}

/** Counter for added cards (keeps ids stable for e2e). */
let addedCount = 0

/** Adds a fresh card to the first column (consumer-owned state demo). */
function addCard() {
  addedCount += 1
  sprintCards = [
    ...sprintCards,
    {
      id: `sp-added-${addedCount}`,
      column: "todo",
      title: `${m.kanban_new_card_title()} ${addedCount}`,
      color: CARD_COLORS[sprintCards.length % CARD_COLORS.length],
    },
  ]
}

/** Restores both demos to their initial data (consumer-owned reset). */
function resetBoard() {
  addedCount = 0
  weekCards = [
    { id: "wk-plan", column: "2026-09-14", title: "Sprint planning", start: 9, end: 10.5, color: CARD_COLORS[0] },
    { id: "wk-1on1", column: "2026-09-14", title: "1:1 with Sam", start: 11, end: 11.5, color: CARD_COLORS[1] },
    { id: "wk-review", column: "2026-09-15", title: "Design review", start: 14, end: 15, color: CARD_COLORS[2] },
    { id: "wk-offsite", column: "2026-09-15", title: "Offsite prep", start: 14.5, end: 16, color: CARD_COLORS[3] },
    { id: "wk-talk", column: "2026-09-16", title: "Conference talk", start: 9, end: 11, color: CARD_COLORS[4] },
    { id: "wk-deploy", column: "2026-09-17", title: "Release window", start: 15, end: 17, color: CARD_COLORS[1], columnStart: 3, columnEnd: 4 },
  ]
  sprintCards = [
    { id: "sp-1", column: "todo", title: "Design the API", assignee: "AK", badge: "P1", description: "Resource model + pagination contract" },
    { id: "sp-2", column: "todo", title: "Set up CI", assignee: "MB", progress: 20 },
    { id: "sp-3", column: "todo", title: "Draft the RFC" },
    { id: "sp-4", column: "doing", title: "Implement search", assignee: "SA", progress: 65 },
    { id: "sp-5", column: "review", title: "Billing page", assignee: "JD", progress: 90 },
    { id: "sp-6", column: "done", title: "Auth flows" },
    { id: "sp-release", column: "doing", title: "Ship v2 release", columnStart: 1, columnEnd: 2, progress: 80, description: "Almost done — finishing the review pass", color: CARD_COLORS[4] },
  ]
}
</script>

<svelte:head>
  <title>{m.kanban_title()}</title>
</svelte:head>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.kanban_heading()}</h1>
  <p>{m.kanban_lede()}</p>

  <h2>{m.kanban_week_h()}</h2>
  <p>{m.kanban_week_p()}</p>

  <div class="not-prose rounded-lg border border-border p-4" data-testid="kanban-week-demo">
    <p class="sr-only">{m.kanban_week_label()}</p>
    <p class="mb-2 text-xs text-muted">{m.kanban_hint()}</p>
    <KanbanBoard
      columns={WEEK_COLUMNS}
      cards={weekCards}
      positioning="temporal"
      ticks={HOUR_TICKS}
      hourHeight={56}
      dragDrop
      resize
      cardsDraggable={draggableCard}
      oncardmove={moveWeekCard}
      oncardresize={resizeWeekCard}
    />
    <p class="mt-3 mb-1 text-xs text-muted">{m.kanban_resize_hint()}</p>
    <ul
      class="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-muted"
      data-testid="kanban-week-legend"
      aria-label={m.kanban_legend_label()}
    >
      <li class="flex items-center gap-1.5">
        <kbd class="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px]">↓</kbd>
        <kbd class="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px]">↑</kbd>
        <span>{m.kanban_legend_extend()}</span>
      </li>
      <li class="flex items-center gap-1.5">
        <kbd class="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px]">Shift</kbd>
        <span>+</span>
        <kbd class="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px]">↓</kbd>
        <kbd class="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px]">↑</kbd>
        <span>{m.kanban_legend_trim()}</span>
      </li>
      <li class="flex items-center gap-1.5">
        <kbd class="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px]">←</kbd>
        <kbd class="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px]">→</kbd>
        <span>{m.kanban_legend_move()}</span>
      </li>
    </ul>
  </div>

  <h2>{m.kanban_board_h()}</h2>
  <p>{m.kanban_board_p()}</p>

  <div class="not-prose rounded-lg border border-border p-4" data-testid="kanban-sprint-demo">
    <p class="sr-only">{m.kanban_board_label()}</p>
    <div class="mb-3 flex gap-2">
      <button
        type="button"
        class="rounded bg-primary px-3 py-1.5 text-sm text-background hover:opacity-90"
        onclick={addCard}
        data-testid="kanban-add"
      >{m.kanban_add_card()}</button>
      <button
        type="button"
        class="rounded border border-border px-3 py-1.5 text-sm"
        onclick={resetBoard}
        data-testid="kanban-reset"
      >{m.kanban_reset()}</button>
    </div>
    <KanbanBoard
      columns={SPRINT_COLUMNS}
      cards={sprintCards}
      positioning="stacked"
      stackedRows={4}
      dragDrop
      cardsDraggable={draggableCard}
      oncardmove={moveSprintCard}
    />
  </div>

  <h2>{m.kanban_a11y_h()}</h2>
  <ul>
    <li>{m.kanban_a11y_1()}</li>
    <li>{m.kanban_a11y_2()}</li>
    <li>{m.kanban_a11y_3()}</li>
    <li>{m.kanban_a11y_4()}</li>
  </ul>
</Container>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
