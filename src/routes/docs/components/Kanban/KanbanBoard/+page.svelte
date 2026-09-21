<!--
@component
KanbanBoard documentation page — standardized structure.

Prose flows through Paraglide `m.*()` keys (messages/{en,es,fa}.json);
code tokens, ARIA names, and links stay English inside <code>/<a>/
ExampleTabs per the docs-i18n policy. The page dogfoods the component
with live demos whose state the page owns (consumer-owned pattern).
-->
<script lang="ts">
import BrowserApiBadge from "$lib/components/BrowserApiBadge/BrowserApiBadge.svelte"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import KanbanBoard from "$lib/components/Kanban/KanbanBoard.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as KanbanBoardModule from "$lib/components/Kanban/KanbanBoard.svelte"
import Container from "$lib/components/Container/Container.svelte"
import type { KanbanCardData, KanbanColumnData, KanbanMoveDetail, KanbanResizeDetail, KanbanTick } from "$lib/components/Kanban/kanbanTypes.js"
import { m } from "$lib/paraglide/messages.js"

// ── Shared fixtures ──

/** Jira-style columns for the demos. */
const SPRINT_COLUMNS: KanbanColumnData[] = [
  { id: "todo", title: "To do", subtitle: "3" },
  { id: "doing", title: "Doing", subtitle: "WIP", accent: "var(--color-warning)" },
  { id: "review", title: "Review", accent: "var(--color-secondary)" },
  { id: "done", title: "Done", accent: "var(--color-success)" },
]

/** Rich stacked cards (icon, badge, assignee, description, progress). */
const STACKED_CARDS: KanbanCardData[] = [
  { id: "k1", column: "todo", title: "Design the API", assignee: "AK", badge: "P1", description: "Resource model + pagination contract" },
  { id: "k2", column: "todo", title: "Set up CI", assignee: "MB", progress: 20 },
  { id: "k3", column: "todo", title: "Draft the RFC" },
  { id: "k4", column: "doing", title: "Implement search", assignee: "SA", progress: 65, icon: "tabler:search" },
  { id: "k5", column: "review", title: "Billing page", assignee: "JD", progress: 90 },
  { id: "k6", column: "done", title: "Auth flows", icon: "tabler:circle-check" },
]

/** One business week, Monday → Friday. */
const WEEK_COLUMNS: KanbanColumnData[] = [
  { id: "mon", title: "Monday", date: "2026-09-14" },
  { id: "tue", title: "Tuesday", date: "2026-09-15" },
  { id: "wed", title: "Wednesday", date: "2026-09-16" },
]

/** Hourly business-hours axis (9 AM → 5 PM), labeled every two hours. */
const HOUR_TICKS: KanbanTick[] = Array.from({ length: 9 }, (_, i) => ({
  value: 9 + i,
  ...(i % 2 === 0 ? { label: `${((9 + i) % 12) || 12} ${9 + i < 12 ? "AM" : "PM"}`, major: true } : {}),
}))

/** Calendar-week cards, including an overlapping pair on Tuesday. */
const WEEK_CARDS: KanbanCardData[] = [
  { id: "w1", column: "mon", title: "Sprint planning", start: 9, end: 10.5, color: "var(--color-secondary)" },
  { id: "w2", column: "mon", title: "1:1 with Sam", start: 11, end: 11.5, color: "var(--color-success)" },
  { id: "w3", column: "tue", title: "Design review", start: 14, end: 15, color: "var(--color-warning)" },
  { id: "w4", column: "tue", title: "Offsite prep", start: 14.5, end: 16, color: "var(--color-error)" },
  { id: "w5", column: "wed", title: "Conference talk", start: 9, end: 11, color: "var(--color-primary)" },
]

/** Monday carries its own morning-only axis (per-column tick override demo). */
const OVERRIDDEN_MONDAY: KanbanColumnData = {
  id: "mon",
  title: "Monday",
  ticks: [
    { value: 9, major: true },
    { value: 10, major: true },
    { value: 11, major: true },
  ],
}

// ── DnD demo (consumer-owned state) ──

let dndCards: KanbanCardData[] = $state([...STACKED_CARDS])

/** Applies a drop: rewrites the card's column. */
function moveDndCard(e: CustomEvent<KanbanMoveDetail>) {
  dndCards = dndCards.map((c) => (c.id === e.detail.card.id ? { ...c, column: e.detail.toColumn } : c))
}

// ── Resize demo (consumer-owned state) ──

let resizeCards: KanbanCardData[] = $state([...WEEK_CARDS])

/** Applies a committed resize: rewrites the card's start/end and persists
 * a cross-column spill (`endColumn`) when the end rolled into the next day. */
function resizeCard(e: CustomEvent<KanbanResizeDetail>) {
  const { card, start, end, endColumn } = e.detail
  resizeCards = resizeCards.map((c) => (c.id === card.id ? { ...c, start, end, endColumn } : c))
}

/** Last committed resize, shown for the callback contract. */
let lastResize = $state<KanbanResizeDetail | undefined>(undefined)

function handleResize(e: CustomEvent<KanbanResizeDetail>) {
  resizeCard(e)
  lastResize = e.detail
}
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("KanbanBoard")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
  <h1>{m.kanbanboard_heading()}</h1>
  <BrowserApiBadge component="KanbanBoard" />
</div>

<p>
  <strong>{m.kanbanboard_heading()}</strong>{m.kanbanboard_lede_1()}<code>KanbanBoard</code>{m.kanbanboard_lede_2()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.kanbanboard_what_1()}<code>temporal</code>{m.kanbanboard_what_2()}<code>stacked</code>{m.kanbanboard_what_3()}<code>Jira</code>{m.kanbanboard_what_4()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.kanbanboard_when_1()}<code>&lt;KanbanBoard&gt;</code>{m.kanbanboard_when_2()}<code>&lt;CalendarView&gt;</code>{m.kanbanboard_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.kanbanboard_why_data()}</strong>{m.kanbanboard_why_data_1()}</li>
  <li><strong>{m.kanbanboard_why_native()}</strong>{m.kanbanboard_why_native_1()}</li>
  <li><strong>{m.kanbanboard_why_kb()}</strong>{m.kanbanboard_why_kb_1()}</li>
  <li><strong>{m.kanbanboard_why_percol()}</strong>{m.kanbanboard_why_percol_1()}</li>
</ul>

<h2>{m.sec_sources()}</h2>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API">MDN — HTML Drag and Drop API</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events">MDN — Pointer Events</a></li>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/grid/">WAI-ARIA APG — Grid</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li>{m.kanbanboard_impl_1()}<code>src/lib/helpers/kanbanLayout.ts</code>{m.kanbanboard_impl_2()}</li>
  <li>{m.kanbanboard_impl_3()}<code>grid-column</code>{m.kanbanboard_impl_4()}</li>
  <li>{m.kanbanboard_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.kanbanboard_mistake_1()}</li>
  <li>{m.kanbanboard_mistake_2()}<code>temporal</code>{m.kanbanboard_mistake_3()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.kanbanboard_related_1()}<a href="/docs/components/Form/CalendarView">CalendarView</a>.</p>

<h2>{m.sec_examples()}</h2>

<h3>{m.kanbanboard_ex_stacked_h()}</h3>
<p>{m.kanbanboard_ex_stacked_p()}</p>
<ExampleTabs code={`<script lang="ts">
  import { KanbanBoard } from "twintrinsic"
<\\/script>

<KanbanBoard
  columns={[
    { id: "todo", title: "To do" },
    { id: "doing", title: "Doing" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ]}
  cards={[
    { id: "k1", column: "todo", title: "Design the API", assignee: "AK", badge: "P1" },
    { id: "k4", column: "doing", title: "Implement search", progress: 65 },
  ]}
/>`}>
  <div data-testid="kanbanboard-doc-stacked">
    <KanbanBoard columns={SPRINT_COLUMNS} cards={STACKED_CARDS} stackedRows={3} />
  </div>
</ExampleTabs>

<h3>{m.kanbanboard_ex_temporal_h()}</h3>
<p>{m.kanbanboard_ex_temporal_p()}</p>
<ExampleTabs code={`<KanbanBoard
  positioning="temporal"
  ticks={[{ value: 9, label: "9 AM", major: true }, { value: 10 }, { value: 11, label: "11 AM", major: true }]}
  columns={[
    { id: "mon", title: "Monday", date: "2026-09-14" },
    { id: "tue", title: "Tuesday", date: "2026-09-15" },
  ]}
  cards={[
    { id: "w3", column: "tue", title: "Design review", start: 14, end: 15 },
  ]}
  hourHeight={56}
/>`}>
  <div data-testid="kanbanboard-doc-temporal">
    <KanbanBoard columns={WEEK_COLUMNS} cards={WEEK_CARDS} positioning="temporal" ticks={HOUR_TICKS} hourHeight={56} />
  </div>
</ExampleTabs>

<h3>{m.kanbanboard_ex_ticks_h()}</h3>
<p>{m.kanbanboard_ex_ticks_p()}</p>
<ExampleTabs code={`<KanbanBoard
  positioning="temporal"
  ticks={HOUR_TICKS}
  columns={[
    // Monday gets its own morning-only axis; the rest use the ticks prop.
    { id: "mon", title: "Monday", ticks: [{ value: 9, major: true }, { value: 10 }, { value: 11, major: true }] },
    { id: "tue", title: "Tuesday" },
  ]}
  cards={[{ id: "p1", column: "mon", title: "Early standup", start: 9, end: 9.5 }]}
/>`}>
  <div data-testid="kanbanboard-doc-ticks">
    <KanbanBoard
      columns={[OVERRIDDEN_MONDAY, WEEK_COLUMNS[1], WEEK_COLUMNS[2]]}
      cards={[
        { id: "p1", column: "mon", title: "Early standup", start: 9, end: 9.5, color: "var(--color-secondary)" },
        { id: "p2", column: "tue", title: "Lunch", start: 12, end: 13, color: "var(--color-success)" },
      ]}
      positioning="temporal"
      ticks={HOUR_TICKS}
      hourHeight={48}
    />
  </div>
</ExampleTabs>

<h3>{m.kanbanboard_ex_span_h()}</h3>
<p>{m.kanbanboard_ex_span_p()}</p>
<ExampleTabs code={`<KanbanBoard {columns} {cards} />
// The WIP card straddles two lanes:
cards={[{ id: "s7", column: "doing", title: "Ship v2", columnStart: 1, columnEnd: 2, progress: 80 }]}`}>
  <div data-testid="kanbanboard-doc-span">
    <KanbanBoard
      columns={SPRINT_COLUMNS}
      cards={[
        ...STACKED_CARDS,
        { id: "k7", column: "doing", title: "Ship v2 release", columnStart: 1, columnEnd: 2, progress: 80, description: "Almost done — finishing the review pass", color: "var(--color-primary)" },
      ]}
      stackedRows={3}
    />
  </div>
</ExampleTabs>

<h3>{m.kanbanboard_ex_dnd_h()}</h3>
<p>{m.kanbanboard_ex_dnd_p()}<code>oncardmove</code>{m.kanbanboard_ex_dnd_2()}</p>
<ExampleTabs code={`<script lang="ts">
  let cards = $state([...])
  function moveCard(e: CustomEvent<KanbanMoveDetail>) {
    cards = cards.map((c) => (c.id === e.detail.card.id ? { ...c, column: e.detail.toColumn } : c))
  }
<\\\\/script>

<KanbanBoard {columns} {cards} dragDrop oncardmove={moveCard} />`}>
  <div data-testid="kanbanboard-doc-dnd">
    <KanbanBoard columns={SPRINT_COLUMNS} cards={dndCards} stackedRows={3} dragDrop oncardmove={moveDndCard} />
  </div>
</ExampleTabs>

<h3>{m.kanbanboard_ex_resize_h()}</h3>
<p>{m.kanbanboard_ex_resize_p()}<code>oncardresize</code>{m.kanbanboard_ex_resize_2()}<kbd>ArrowDown</kbd>{m.kanbanboard_ex_resize_3()}<kbd>ArrowUp</kbd>{m.kanbanboard_ex_resize_4()}<kbd>Shift</kbd>{m.kanbanboard_ex_resize_5()}</p>
<ExampleTabs code={`<script lang="ts">
  let cards = $state([...])
  function resizeCard(e: CustomEvent<KanbanResizeDetail>) {
    cards = cards.map((c) => (c.id === e.detail.card.id ? { ...c, start: e.detail.start, end: e.detail.end } : c))
  }
<\\\\/script>

<KanbanBoard positioning="temporal" {ticks} {columns} {cards} resize oncardresize={resizeCard} />`}>
  <div data-testid="kanbanboard-doc-resize">
    <p class="mb-2 text-xs text-muted">
      {m.kanbanboard_ex_resize_last()}<code>{lastResize ? `${lastResize.start} → ${lastResize.end}` : "—"}</code>
    </p>
    <KanbanBoard columns={WEEK_COLUMNS} cards={resizeCards} positioning="temporal" ticks={HOUR_TICKS} hourHeight={56} dragDrop resize oncardresize={handleResize} />
  </div>
</ExampleTabs>

<h3>{m.kanbanboard_ex_spill_h()}</h3>
<p>{m.kanbanboard_ex_spill_p()}<code>endColumn</code>{m.kanbanboard_ex_spill_2()}<code>end</code>{m.kanbanboard_ex_spill_3()}<code>Offsite prep</code>{m.kanbanboard_ex_spill_4()}<code>card.resizable</code>{m.kanbanboard_ex_spill_p2()}</p>

<h2>{m.sec_props()}</h2>
<PropsTable component={KanbanBoardModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={KanbanBoardModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.kanbanboard_a11y_1()}<a href="https://www.w3.org/WAI/ARIA/apg/patterns/grid/">Grid</a>{m.kanbanboard_a11y_2()}<code>columnheader</code>{m.kanbanboard_a11y_3()}<code>separator</code>{m.kanbanboard_a11y_4()}</li>
  <li>{m.kanbanboard_a11y_5()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<p>{m.kanbanboard_kb_intro()}<kbd>Enter</kbd>{m.kanbanboard_kb_intro_2()}</p>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Left</kbd> / <kbd>Arrow Right</kbd></td><td>{m.kanbanboard_kb_lr()}</td></tr>
    <tr><td><kbd>Arrow Down</kbd> / <kbd>Arrow Up</kbd></td><td>{m.kanbanboard_kb_ud()}</td></tr>
    <tr><td><kbd>Shift + Arrow Down</kbd> / <kbd>Shift + Arrow Up</kbd></td><td>{m.kanbanboard_kb_ud_shift()}</td></tr>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.kanbanboard_kb_enter()}</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>{m.kanbanboard_kb_esc()}</td></tr>
  </tbody>
</table>
</Container>
