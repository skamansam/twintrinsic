<!--
@component
Calendar playground example (plan item 11.4) — a standalone, full-featured
sandbox: multi-select Google public holiday feeds, a seeded random-events
generator scoped to the visible month/week/day, a custom-event form,
select-then-delete, and drag-to-edit. The library itself never ships the
Temporal polyfill; this page installs it with the documented consumer
pattern so the demo renders in every environment.
-->
<script module lang="ts">
/**
 * Consumer polyfill pattern, dogfooded: importing the polyfill makes the
 * `Temporal` global available before any component code runs, in both the
 * browser and the SSR node process. The guarded assignment keeps the
 * import from being tree-shaken.
 */
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill"

if (!globalThis.Temporal) {
  ;(globalThis as { Temporal: unknown }).Temporal = TemporalPolyfill
}
</script>

<script lang="ts">
import CalendarView from "$lib/components/CalendarView/CalendarView.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"
import type { CalendarViewEvent } from "$lib/helpers/eventNormalize.js"
import {
  PLAYGROUND_CALENDARS,
  SANDBOX_COLORS,
  googleHolidaySource,
  sprinkleEvents,
  viewSpan,
} from "../playgroundHelpers"

/** Visibility month + view (consumer-owned, feeds CalendarView). */
let month = $state(Temporal.PlainDate.from("2026-09-01"))
let view = $state<"month" | "week" | "day">("month")

/** Multi-select state: which holiday feeds are toggled on. */
let pickedCalendars = $state<string[]>([])

/** The sandbox's custom/random events (consumer-owned; drag rewrites starts). */
let sandboxEvents: CalendarViewEvent[] = $state([
  { id: "sb-1", title: "Kickoff", start: "2026-09-03T10:00", color: "var(--color-success)" },
])

/** Sprinkle counter — 1-based; feeds the seeded generator (e2e-pinned ids). */
let sprinkleRun = 0

/** Sprinkles 4 random events across the currently visible period (seeded). */
function sprinkle() {
  const created = sprinkleEvents(++sprinkleRun, viewSpan(month, view))
  sandboxEvents = [...sandboxEvents, ...created]
}

/** Adds a custom event on the chosen day. */
function addCustomEvent(e: SubmitEvent) {
  e.preventDefault()
  const data = new FormData(e.target as HTMLFormElement)
  const title = String(data.get("title") ?? "").trim() || "New event"
  const day = String(data.get("date") || month.toString()).slice(0, 10)
  sandboxEvents = [
    ...sandboxEvents,
    {
      id: `sb-custom-${crypto.randomUUID()}`,
      title,
      start: day,
      allDay: true,
      color: SANDBOX_COLORS[sandboxEvents.length % SANDBOX_COLORS.length],
    },
  ]
  form?.reset()
}

/** Deletes the selected sandbox event (holidays are never deletable). */
function deleteSelected() {
  if (!selectedEvent || !selectedEvent.id.startsWith("sb-")) return
  sandboxEvents = sandboxEvents.filter((ev) => ev.id !== selectedEvent?.id)
  selectedEvent = undefined
}

/** First calendar-holiday event currently selected via oneventselect. */
let selectedEvent: CalendarViewEvent | undefined = $state(undefined)

/** The add-event form element (reset after submit). */
let form: HTMLFormElement | undefined = $state()

/** Source ids whose holiday feed failed to load (shown as a notice). */
let sourceErrors: string[] = $state([])
</script>

<svelte:head>
  <title>{m.example_calendar_title()}</title>
</svelte:head>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.example_calendar_heading()}</h1>
  <p>{m.example_calendar_lede()}</p>

  <div class="not-prose rounded-lg border border-border p-4" data-testid="calendar-playground">
    <fieldset class="mb-3">
      <legend class="text-xs font-semibold uppercase tracking-wide text-muted">{m.example_calendar_calendars()}</legend>
      <div class="flex flex-wrap gap-3">
        {#each PLAYGROUND_CALENDARS as cal (cal.id)}
          <label class="flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              class="accent-[var(--color-primary)]"
              checked={pickedCalendars.includes(cal.id)}
              onchange={(e) => {
                const on = (e.currentTarget as HTMLInputElement).checked
                pickedCalendars = on ? [...pickedCalendars, cal.id] : pickedCalendars.filter((c) => c !== cal.id)
              }}
              data-testid={`playground-cal-${cal.id.split("#")[0]}`}
            />
            <span class="inline-block h-3 w-3 rounded-full" style="background: {cal.color}"></span>
            {cal.name}
          </label>
        {/each}
      </div>
    </fieldset>

    <div class="mb-3 flex flex-wrap items-end gap-3">
      <div class="flex gap-2" role="group" aria-label={m.sec_view()}>
        <button
          type="button"
          class="rounded border px-2 py-1.5 text-sm"
          class:bg-primary={view === "month"}
          class:text-background={view === "month"}
          onclick={() => (view = "month")}
          data-testid="view-month"
        >{m.playground_view_month()}</button>
        <button
          type="button"
          class="rounded border px-2 py-1.5 text-sm"
          class:bg-primary={view === "week"}
          class:text-background={view === "week"}
          onclick={() => (view = "week")}
          data-testid="view-week"
        >{m.playground_view_week()}</button>
        <button
          type="button"
          class="rounded border px-2 py-1.5 text-sm"
          class:bg-primary={view === "day"}
          class:text-background={view === "day"}
          onclick={() => (view = "day")}
          data-testid="view-day"
        >{m.playground_view_day()}</button>
      </div>
      <button
        type="button"
        class="rounded bg-primary px-3 py-1.5 text-sm text-background hover:opacity-90"
        onclick={sprinkle}
        data-testid="playground-sprinkle"
      >
        {m.playground_sprinkle()}
      </button>
      <button
        type="button"
        class="rounded border border-border px-3 py-1.5 text-sm disabled:opacity-40"
        disabled={!selectedEvent || !selectedEvent.id.startsWith("sb-")}
        onclick={deleteSelected}
        data-testid="playground-delete"
      >
        {m.playground_delete()}
      </button>
      <form class="flex items-end gap-2" onsubmit={addCustomEvent} bind:this={form}>
        <label class="text-xs">
          <span class="block text-muted">{m.playground_title_label()}</span>
          <input name="title" class="rounded border border-border px-2 py-1 text-sm" required />
        </label>
        <label class="text-xs">
          <span class="block text-muted">{m.playground_date_label()}</span>
          <input name="date" type="date" value="2026-09-15" class="rounded border border-border px-2 py-1 text-sm" />
        </label>
        <button type="submit" class="rounded border border-border px-3 py-1.5 text-sm" data-testid="playground-add">
          {m.playground_add()}
        </button>
      </form>
    </div>

    {#if sourceErrors.length > 0}
      <p class="mb-2 text-xs text-danger" role="status" data-testid="playground-errors">
        {m.calendarview_connect_errors({ count: sourceErrors.length })}
      </p>
    {/if}

    <p class="mb-2 text-xs text-muted">{m.playground_hint()}</p>

    <CalendarView
      bind:month
      {view}
      events={sandboxEvents}
      calendars={PLAYGROUND_CALENDARS.filter((c) => pickedCalendars.includes(c.id)).map((c) =>
        googleHolidaySource(c.id, c.name, c.color),
      )}
      grouping
      dragEvents
      eventsDraggable={(e) => !e.calendarId}
      ondateselect={(e) => (month = e.detail.date)}
      oneventselect={(e) => (selectedEvent = e.detail.event)}
      oneventmove={(e) => {
        sandboxEvents = sandboxEvents.map((ev) =>
          ev.id === e.detail.event.id ? { ...ev, start: e.detail.to.toString() } : ev,
        )
        selectedEvent = { ...e.detail.event, start: e.detail.to }
      }}
      oncalendarserror={(e) => {
        sourceErrors = e.detail.errors.map((err) => err.sourceId)
      }}
    />
  </div>

  <h2>{m.sec_what_when_why()}</h2>
  <ul>
    <li>{m.example_calendar_why_1()}</li>
    <li>{m.example_calendar_why_2()}</li>
    <li>{m.example_calendar_why_3()}</li>
  </ul>
</Container>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
