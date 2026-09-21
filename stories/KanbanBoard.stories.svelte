<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, fireEvent, within } from "storybook/test"
import KanbanBoard from "$lib/components/Kanban/KanbanBoard.svelte"

const { Story } = defineMeta({
  title: "Data Display/KanbanBoard",
  component: KanbanBoard,
  tags: ["autodocs"],
  argTypes: {
    positioning: { control: "radio", options: ["stacked", "temporal"], description: "Stacked kanban cards or temporal placement against the tick axis" },
    hourHeight: { control: "number", description: "Temporal mode: pixels per tick unit" },
    stackedRows: { control: "number", description: "Stacked mode: dashed row-guide lines per column" },
    dragDrop: { control: "boolean", description: "Enable cross-column drag and drop plus the keyboard alternative" },
    resize: { control: "boolean", description: "Enable resizing the start/end edges of temporal cards" },
  },
  args: {},
})

/** Sprint-board columns (Jira style). */
const SPRINT_COLUMNS = [
  { id: "todo", title: "To do", subtitle: "3" },
  { id: "doing", title: "Doing", subtitle: "2", accent: "#f59e0b" },
  { id: "review", title: "Review", subtitle: "1", accent: "#8b5cf6" },
  { id: "done", title: "Done", accent: "#10b981" },
]

/** Sprint-board cards, including a WIP task straddling Doing → Review. */
const SPRINT_CARDS = [
  { id: "s1", column: "todo", title: "Design the API", assignee: "AK", badge: "P1", description: "Resource model + pagination contract" },
  { id: "s2", column: "todo", title: "Set up CI", assignee: "MB", progress: 20 },
  { id: "s3", column: "todo", title: "Draft the RFC" },
  { id: "s4", column: "doing", title: "Implement search", assignee: "SA", progress: 65, icon: "tabler:search" },
  { id: "s5", column: "review", title: "Billing page", assignee: "JD", progress: 90 },
  { id: "s6", column: "done", title: "Auth flows", icon: "tabler:circle-check" },
  {
    id: "s7",
    column: "doing",
    title: "Ship v2 release",
    columnStart: 1,
    columnEnd: 2,
    progress: 80,
    description: "Almost done — finishing the review pass",
    color: "#0ea5e9",
  },
]

/** One business week, Monday → Friday. */
const WEEK_COLUMNS = [
  { id: "mon", title: "Monday", date: "2026-09-14" },
  { id: "tue", title: "Tuesday", date: "2026-09-15" },
  { id: "wed", title: "Wednesday", date: "2026-09-16" },
  { id: "thu", title: "Thursday", date: "2026-09-17" },
  { id: "fri", title: "Friday", date: "2026-09-18" },
]

/** Hourly business-hours axis (9 AM → 5 PM), labeled every two hours. */
const HOUR_TICKS = Array.from({ length: 9 }, (_, i) => ({
  value: 9 + i,
  ...(i % 2 === 0
    ? { label: `${((9 + i) % 12) || 12} ${9 + i < 12 ? "AM" : "PM"}`, major: true }
    : {}),
}))

/** Calendar-week events, including two overlapping and one spanning Tue→Wed. */
const WEEK_CARDS = [
  { id: "w1", column: "mon", title: "Sprint planning", start: 9, end: 10.5, color: "#6366f1" },
  { id: "w2", column: "mon", title: "1:1 with Sam", start: 11, end: 11.5, color: "#10b981" },
  { id: "w3", column: "tue", title: "Design review", start: 14, end: 15, color: "#f59e0b" },
  { id: "w4", column: "tue", title: "Offsite prep", start: 14.5, end: 16, color: "#ef4444" },
  { id: "w5", column: "wed", title: "Conference talk", start: 9, end: 11, color: "#8b5cf6" },
  { id: "w6", column: "thu", title: "Dentist", start: 13, end: 14, color: "#0ea5e9" },
  { id: "w7", column: "fri", title: "Release window", start: 15, end: 17, color: "#10b981" },
]

/** `oneventmove`-style capture for the DnD play (module fn survives the CSF transform). */
const MOVES = []
function captureMove(e) {
  MOVES.push(e.detail)
}

/** `oncardresize` capture for the resize play. */
const RESIZES = []
function captureResize(e) {
  RESIZES.push(e.detail)
}

/** Per-column ticks: morning-only axis on Monday, board-wide elsewhere. */
const OVERRIDDEN_MONDAY = [
  { id: "mon", title: "Monday", ticks: [{ value: 9, major: true }, { value: 10, major: true }, { value: 11, major: true }] },
]
</script>

<Story name="SprintBoard">
  {#snippet children(args)}
    <div style="min-height: 420px">
      <KanbanBoard {...args} columns={SPRINT_COLUMNS} cards={SPRINT_CARDS} stackedRows={3} />
    </div>
  {/snippet}
</Story>

<Story
  name="SprintBoardDrag"
  args={{ dragDrop: true, oncardmove: captureMove }}
  play={async ({ canvas }) => {
    const card = await canvas.findByTestId("kanban-card-s1")
    expect(card.getAttribute("draggable")).toBe("true")
    const target = canvas.getByTestId("kanban-column-doing")
    await fireEvent.dragStart(card)
    await fireEvent.drop(target)
    expect(MOVES.length).toBe(1)
    expect(MOVES[0].card.id).toBe("s1")
    expect(MOVES[0].fromColumn).toBe("todo")
    expect(MOVES[0].toColumn).toBe("doing")
  }}
>
  {#snippet children(args)}
    <div style="min-height: 420px">
      <KanbanBoard {...args} columns={SPRINT_COLUMNS} cards={SPRINT_CARDS} stackedRows={3} />
    </div>
  {/snippet}
</Story>

<Story
  name="KeyboardMove"
  args={{ dragDrop: true, oncardmove: captureMove }}
  play={async ({ canvas }) => {
    const card = await canvas.findByTestId("kanban-card-s3")
    await fireEvent.click(card)
    await fireEvent.keyDown(card, { key: "ArrowRight" })
    expect(MOVES[MOVES.length - 1].card.id).toBe("s3")
    expect(MOVES[MOVES.length - 1].toColumn).toBe("doing")
  }}
>
  {#snippet children(args)}
    <div style="min-height: 420px">
      <KanbanBoard {...args} columns={SPRINT_COLUMNS} cards={SPRINT_CARDS} stackedRows={3} />
    </div>
  {/snippet}
</Story>

<Story name="CalendarWeek">
  {#snippet children(args)}
    <div style="min-height: 520px">
      <KanbanBoard {...args} columns={WEEK_COLUMNS} cards={WEEK_CARDS} positioning="temporal" ticks={HOUR_TICKS} hourHeight={56} />
    </div>
  {/snippet}
</Story>

<Story
  name="TemporalResize"
  args={{ positioning: "temporal", ticks: HOUR_TICKS, hourHeight: 56, resize: true, oncardresize: captureResize }}
  play={async ({ canvas }) => {
    const handle = await canvas.findByTestId("kanban-resize-end-w3")
    // Pointer down on the handle, move, up — one committed resize.
    await fireEvent.pointerDown(handle, { pointerId: 1, clientY: 0 })
    await fireEvent.pointerMove(handle, { pointerId: 1, clientY: 0 })
    await fireEvent.pointerUp(handle, { pointerId: 1, clientY: 0 })
    expect(RESIZES.length).toBe(1)
    expect(RESIZES[0].card.id).toBe("w3")
    expect(RESIZES[0].edge).toBe("end")
  }}
>
  {#snippet children(args)}
    <div style="min-height: 520px">
      <KanbanBoard {...args} columns={WEEK_COLUMNS} cards={WEEK_CARDS} positioning="temporal" ticks={HOUR_TICKS} hourHeight={56} />
    </div>
  {/snippet}
</Story>

<Story
  name="CrossColumnResize"
  args={{ positioning: "temporal", ticks: HOUR_TICKS, hourHeight: 56, resize: true, oncardresize: captureResize }}
  play={async ({ canvas }) => {
    const handle = await canvas.findByTestId("kanban-resize-end-w7")
    // Drag past the axis bottom: preview the spill segment in the next
    // column, commit, and verify the detail carries the spill contract.
    await fireEvent.pointerDown(handle, { pointerId: 1, clientY: 0 })
    await fireEvent.pointerMove(handle, { pointerId: 1, clientY: 0 })
    const spill = canvas.getByTestId("kanban-spill-w7")
    expect(spill).toBeTruthy()
    await fireEvent.pointerUp(handle, { pointerId: 1, clientY: 0 })
    expect(RESIZES[RESIZES.length - 1].endColumn).toBe("fri")
  }}
>
  {#snippet children(args)}
    <div style="min-height: 520px">
      <KanbanBoard
        {...args}
        columns={[WEEK_COLUMNS[3], WEEK_COLUMNS[4]]}
        cards={[{ id: "w7", column: "thu", title: "Release window", start: 15, end: 17, color: "#10b981" }]}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="CalendarWeekDnd"
  args={{ positioning: "temporal", ticks: HOUR_TICKS, hourHeight: 56, dragDrop: true, oncardmove: captureMove }}
  play={async ({ canvas }) => {
    const card = await canvas.findByTestId("kanban-card-w1")
    const target = canvas.getByTestId("kanban-column-tue")
    await fireEvent.dragStart(card)
    await fireEvent.drop(target)
    expect(MOVES[MOVES.length - 1].card.id).toBe("w1")
    expect(MOVES[MOVES.length - 1].toColumn).toBe("tue")
  }}
>
  {#snippet children(args)}
    <div style="min-height: 520px">
      <KanbanBoard {...args} columns={WEEK_COLUMNS} cards={WEEK_CARDS} />
    </div>
  {/snippet}
</Story>

<Story name="PerColumnTicks">
  {#snippet children(args)}
    <div style="min-height: 380px">
      <KanbanBoard
        {...args}
        columns={[...OVERRIDDEN_MONDAY, WEEK_COLUMNS[1], WEEK_COLUMNS[2]]}
        cards={[
          { id: "p1", column: "mon", title: "Early standup", start: 9, end: 9.5, color: "#6366f1" },
          { id: "p2", column: "tue", title: "Lunch", start: 12, end: 13, color: "#10b981" },
        ]}
        positioning="temporal"
        ticks={HOUR_TICKS}
        hourHeight={48}
      />
    </div>
  {/snippet}
</Story>
