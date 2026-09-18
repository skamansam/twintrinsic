<!--
@component
CalendarView documentation page — standardized structure.

The page dogfoods the documented consumer pattern: importing the Temporal
polyfill defines the `Temporal` global in both the browser and the SSR node
process, so demos anchor to real PlainDates and the component renders
everywhere (including the e2e suite's server-rendered HTML).
-->
<script module lang="ts">
/**
 * Consumer polyfill pattern, dogfooded: importing the polyfill makes the
 * `Temporal` global available before any component code runs, in both the
 * browser and the SSR node process. The library itself never ships or
 * imports the polyfill (plan 11.1 policy). The guarded assignment keeps
 * the import from being tree-shaken — the package's `sideEffects` field
 * omits its own ESM entry, so a bare side-effect import would be dropped.
 */
import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill"

if (!globalThis.Temporal) {
  ;(globalThis as { Temporal: unknown }).Temporal = TemporalPolyfill
}
</script>

<script lang="ts">
import BrowserApiBadge from "$lib/components/BrowserApiBadge/BrowserApiBadge.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import CalendarView from "$lib/components/CalendarView/CalendarView.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CalendarViewModule from "$lib/components/CalendarView/CalendarView.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { parseICal } from "$lib/helpers/parseICal.js"
import type { EventMoveDetail } from "$lib/helpers/eventNormalize.js"
import type { CalendarSource } from "$lib/helpers/connectCalendars.js"
import { m } from "$lib/paraglide/messages.js"

// Anchor dates for the demos — pinned so examples don't drift as months pass.
const SEPTEMBER = Temporal.PlainDate.from("2026-09-01")
const SELECTED = Temporal.PlainDate.from("2026-09-21")

// Milestone-4 grouping demo: two fake calendars sharing one standup (iCal
// UID dedup). Deep work and the dentist appointment are unshared.
const GROUPING_EVENTS = [
  { id: "work-standup", uid: "standup@google.com", title: "Standup", start: "2026-09-15T09:30", color: "#10b981" },
  { id: "work-deep", title: "Deep work", start: "2026-09-16T14:00", color: "#6366f1" },
  { id: "personal-standup", uid: "standup@google.com", title: "Standup", start: "2026-09-15T09:30", color: "#f59e0b" },
  { id: "personal-dentist", title: "Dentist", start: "2026-09-17T11:00", color: "#ef4444" },
]

/** Toggle state for the grouping demo. */
let grouping = $state(false)

// Dogfood the .ics importer: a Google-export-shaped feed (standup repeats,
// offsite is all-day, one tentative). Parsed once at module scope.
const ICS_SAMPLE = `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART;TZID=Europe/Berlin:20260915T093000
DTEND;TZID=Europe/Berlin:20260915T100000
RRULE:FREQ=WEEKLY;BYDAY=TU;COUNT=10
UID:docs-standup@google.com
STATUS:CONFIRMED
SUMMARY:Team standup
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260921
DTEND;VALUE=DATE:20260922
UID:docs-offsite@google.com
STATUS:CONFIRMED
SUMMARY:Planning offsite
END:VEVENT
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20260918T130000
UID:docs-lunch@google.com
STATUS:TENTATIVE
SUMMARY:Maybe lunch
END:VEVENT
END:VCALENDAR`
const ICS_EVENTS = parseICal(ICS_SAMPLE)

/** Copy-paste Google Calendar recipe shown in the connectivity example's code tab. */
const GOOGLE_RECIPE = `// +page.server.ts — OAuth + CORS live on your server, not in the component
import { google } from "googleapis"

export async function load() {
  const cal = google.calendar({ version: "v3", auth: OAUTH_CLIENT })
  const { data } = await cal.events.list({
    calendarId: "primary",
    timeMin: ..., timeMax: ..., singleEvents: true, orderBy: "startTime",
  })
  return {
    events: data.items.map((item) => ({
      id: item.id,
      uid: item.iCalUID,            // cross-calendar grouping key
      title: item.summary,
      start: item.start.dateTime ?? item.start.date,
      end: item.end.dateTime ?? item.end.date,
      status: item.status === "cancelled" ? "cancelled" : "confirmed",
    })),
  }
}

// +page.svelte — the component consumes plain data:
const work: CalendarSource = {
  id: "work", name: "Work", color: "#10b981",
  fetchEvents: async (range) => (await fetch(serverUrl + "?from=" + range.start)).json(),
}
<CalendarView calendars={[work]} grouping />`

// Milestone-7 drag demo: the consumer owns event state — `oneventmove`
// rewrites the moved event's `start` and the chip re-renders in its new cell.
let dragEvents = $state([
  { id: "d1", title: "Planning session", start: "2026-09-15T10:00", color: "#6366f1" },
  { id: "d2", title: "Team offsite", start: "2026-09-21", allDay: true, color: "#f59e0b" },
])

/**
 * Moves a dragged event's start to the drop day.
 * @param e - The CalendarView `eventmove` detail ({ event, from, to })
 */
function moveEvent(e: CustomEvent<EventMoveDetail>) {
  dragEvents = dragEvents.map((ev) =>
    ev.id === e.detail.event.id ? { ...ev, start: e.detail.to.toString() } : ev,
  )
}

// Milestone-6 connectivity demo: stand-ins for the server-backed sources
// shown in the recipes below. Each mock resolves asynchronously so the
// demo exercises the real fetch → merge → color-fallback path.
const CONNECTED_SOURCES: CalendarSource[] = [
  {
    id: "work",
    name: "Work",
    color: "#10b981",
    fetchEvents: async ({ start, end }) => {
      await new Promise((r) => setTimeout(r, 30))
      return [
        { id: "conn-standup-g", uid: "standup@docs", title: "Standup", start: "2026-09-15T09:30" },
        { id: "conn-review", title: "Design review", start: "2026-09-16T14:00" },
      ].filter((e) => e.start >= start.toString() && e.start <= end.toString())
    },
  },
  {
    id: "family",
    name: "Family",
    color: "#f59e0b",
    fetchEvents: async () => {
      await new Promise((r) => setTimeout(r, 10))
      return [
        { id: "conn-standup-p", uid: "standup@docs", title: "Standup", start: "2026-09-15T09:30" },
        { id: "conn-dentist", title: "Dentist", start: "2026-09-17T11:00" },
      ]
    },
  },
]

/** Failures reported by oncalendarserror (demo shows them inline). */
let sourceErrors = $state<string[]>([])
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<div class="flex flex-wrap items-center gap-3">
  <h1>{m.calendarview_heading()}</h1>
  <BrowserApiBadge component="CalendarView" />
</div>

<p>
  <strong>{m.calendarview_heading()}</strong>{m.calendarview_lede_1()}<code>Temporal</code>{m.calendarview_lede_2()}<code>@js-temporal/polyfill</code>{m.calendarview_lede_3()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.calendarview_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.calendarview_when_1()}<code>&lt;CalendarView&gt;</code>{m.calendarview_when_2()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.calendarview_why_temporal()}</strong>{m.calendarview_why_temporal_1()}</li>
  <li><strong>{m.calendarview_why_accessible()}</strong>{m.calendarview_why_accessible_1()}</li>
  <li><strong>{m.calendarview_why_locale()}</strong>{m.calendarview_why_locale_1()}</li>
  <li><strong>{m.calendarview_why_stable()}</strong>{m.calendarview_why_stable_1()}</li>
</ul>

<h2>{m.calendarview_browser_h()}</h2>
<p>
  {m.calendarview_browser_p_1()}<code>Temporal</code>{m.calendarview_browser_p_2()}<code>@js-temporal/polyfill</code>{m.calendarview_browser_p_3()}
</p>
<pre><code>import "@js-temporal/polyfill"</code></pre>

<h2>{m.sec_sources()}</h2>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal">MDN — Temporal</a></li>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/grid/">WAI-ARIA APG — Grid</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.calendarview_impl_1()}</li>
    <li>{m.calendarview_impl_2()}</li>
    <li>{m.calendarview_impl_3()}</li>
    <li>{m.calendarview_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.calendarview_mistake_1()}</li>
    <li>{m.calendarview_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.calendarview_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.calendarview_responsive_1_1()}<code>max-w-sm</code>{m.calendarview_responsive_1_2()}</li>
  <li>{m.calendarview_responsive_2()}</li>
  <li>{m.calendarview_responsive_3()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.calendarview_custom_1_1()}<code>primary</code>{m.calendarview_custom_1_2()}<code>ring-primary</code>{m.calendarview_custom_1_3()}</li>
  <li>{m.calendarview_custom_2_1()}<code>class</code>{m.calendarview_custom_2_2()}</li>
  <li>{m.calendarview_custom_3_1()}<code>locale</code>{m.calendarview_custom_3_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.calendarview_ex_basic()}</h3>
<p>{m.calendarview_ex_basic_p()}</p>
<ExampleTabs code={`<CalendarView />`}>
  <div class="max-w-sm" data-testid="calendarview-basic">
    <CalendarView />
  </div>
</ExampleTabs>

<h3>{m.calendarview_ex_fixed()}</h3>
<p>{m.calendarview_ex_fixed_p()}</p>
<ExampleTabs code={`<CalendarView month={Temporal.PlainDate.from('2026-09-01')} />`}>
  <div class="max-w-sm" data-testid="calendarview-fixed">
    <CalendarView month={SEPTEMBER} />
  </div>
</ExampleTabs>

<h3>{m.calendarview_ex_selected()}</h3>
<p>{m.calendarview_ex_selected_p()}</p>
<ExampleTabs code={`<CalendarView
  month={Temporal.PlainDate.from('2026-09-01')}
  value={Temporal.PlainDate.from('2026-09-21')}
/>`}>
  <div class="max-w-sm" data-testid="calendarview-selected">
    <CalendarView month={SEPTEMBER} value={SELECTED} />
  </div>
</ExampleTabs>

<h3>{m.calendarview_ex_weekstart()}</h3>
<p>{m.calendarview_ex_weekstart_p()}</p>
<ExampleTabs code={`<CalendarView weekStart={0} />`}>
  <div class="max-w-sm" data-testid="calendarview-weekstart">
    <CalendarView weekStart={0} />
  </div>
</ExampleTabs>

<h3>{m.calendarview_ex_keyboard()}</h3>
<p>{m.calendarview_ex_keyboard_p()}</p>
<ExampleTabs code={`<CalendarView />`}>
  <div class="max-w-sm" data-testid="calendarview-keyboard">
    <CalendarView />
  </div>
</ExampleTabs>

<h3>{m.calendarview_ex_grouping()}</h3>
<p>{m.calendarview_ex_grouping_p()}</p>
<ExampleTabs code={`<script lang="ts">
  let grouping = $state(false)
<\/script>

<label>
  <input type="checkbox" bind:checked={grouping} />
  Group shared events
</label>
<CalendarView {...{ events }} {grouping} />`}>
  <div class="max-w-sm" data-testid="calendarview-grouping">
    <label class="mb-2 flex items-center gap-2 text-sm">
      <input type="checkbox" bind:checked={grouping} />
      {grouping ? "Group shared events" : "Show all calendars"}
    </label>
    <CalendarView month={SEPTEMBER} {...{ events: GROUPING_EVENTS }} {grouping} />
  </div>
</ExampleTabs>

<h3>{m.calendarview_ex_ics()}</h3>
<p>{m.calendarview_ex_ics_p()}</p>
<ExampleTabs code={`\`\`\`js
// Google Calendar export (or any iCalendar feed)
import { parseICal } from "twintrinsic/helpers/parseICal"
const events = parseICal(icsText, { defaultTz: "Europe/Berlin" })
\`\`\`
<CalendarView month={Temporal.PlainDate.from('2026-09-01')} {events} recurrence />`}>
  <div class="max-w-sm" data-testid="calendarview-ics">
    <CalendarView month={SEPTEMBER} events={ICS_EVENTS} recurrence />
  </div>
</ExampleTabs>

<h3>{m.calendarview_ex_drag()}</h3>
<p>{m.calendarview_ex_drag_p()}</p>
<ExampleTabs code={`<script lang="ts">
  // Consumer-owned state: oneventmove rewrites the event's start.
  let events = $state([
    { id: "d1", title: "Planning session", start: "2026-09-15T10:00", color: "#6366f1" },
  ])
  function moveEvent(e: CustomEvent<EventMoveDetail>) {
    events = events.map((ev) =>
      ev.id === e.detail.event.id ? { ...ev, start: e.detail.to.toString() } : ev,
    )
  }
<\\/script>

<CalendarView {events} dragEvents oneventmove={moveEvent} />`}>
  <div class="max-w-sm" data-testid="calendarview-drag">
    <CalendarView month={SEPTEMBER} events={dragEvents} dragEvents oneventmove={moveEvent} />
  </div>
</ExampleTabs>

<h3>{m.calendarview_ex_connect()}</h3>
<p>{m.calendarview_ex_connect_p()}</p>
<ExampleTabs code={GOOGLE_RECIPE}>
  <div class="max-w-sm" data-testid="calendarview-connect">
    {#if sourceErrors.length > 0}
      <p class="mb-2 text-xs text-danger" data-testid="calendarview-connect-errors">
        {m.calendarview_connect_errors({ count: sourceErrors.length })}
      </p>
    {/if}
    <CalendarView
      month={SEPTEMBER}
      calendars={CONNECTED_SOURCES}
      grouping
      oncalendarserror={(e) => {
        sourceErrors = e.detail.errors.map((err) => err.sourceId)
      }}
    />
  </div>
</ExampleTabs>

<h3>{m.calendarview_ex_outlook()}</h3>
<p>{m.calendarview_ex_outlook_p()}</p>
<pre><code>{`// +page.server.ts — Microsoft Graph /me/calendarview proxy
const { data } = await graphClient.api("/me/calendarview")
  .query({ startDateTime: range.start, endDateTime: range.end })
  .select("subject,start,end,iCalUId,isCancelled")
  .post()

// Map Graph items to CalendarViewEvents:
events = data.value.map((item) => ({
  id: item.id,
  uid: item.iCalUId,             // same dedup key Google uses
  title: item.subject,
  start: item.start.dateTime,    // always an instant + timeZone
  end: item.end.dateTime,
  status: item.isCancelled ? "cancelled" : "confirmed",
}))`}</code></pre>

<h3>{m.calendarview_ex_apple()}</h3>
<p>{m.calendarview_ex_apple_p()}</p>
<pre><code>{`// +page.server.ts — zero-auth: fetch the published iCal URL server-side
// and reuse the built-in parser (works for any CalDAV/ics feed too)
import { parseICal } from "twintrinsic/helpers/parseICal"

const ics = await fetch("https://caldav.icloud.com/published/…").then((r) => r.text())
const events = parseICal(ics, { defaultTz: "Europe/Berlin" })

const family: CalendarSource = {
  id: "family", name: "Family", color: "#f59e0b",
  fetchEvents: async () => events,
}
<CalendarView calendars={[family]} />`}</code></pre>

<h2>{m.sec_props()}</h2>
<PropsTable component={CalendarViewModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={CalendarViewModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.calendarview_a11y_1_1()}<a href="https://www.w3.org/WAI/ARIA/apg/patterns/grid/">APG grid pattern</a>{m.calendarview_a11y_1_2()}</li>
  <li>{m.calendarview_a11y_2()}</li>
  <li>{m.calendarview_a11y_3_1()}<code>aria-live="polite"</code>{m.calendarview_a11y_3_2()}</li>
  <li>{m.calendarview_a11y_4_1()}<code>aria-label</code>{m.calendarview_a11y_4_2()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<p>{m.calendarview_kb_intro()}</p>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Left</kbd> / <kbd>Arrow Right</kbd></td><td>{m.calendarview_kb_left()} / {m.calendarview_kb_right()}</td></tr>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Down</kbd></td><td>{m.calendarview_kb_up()} / {m.calendarview_kb_down()}</td></tr>
    <tr><td><kbd>Home</kbd> / <kbd>End</kbd></td><td>{m.calendarview_kb_home()} / {m.calendarview_kb_end()}</td></tr>
    <tr><td><kbd>Page Up</kbd> / <kbd>Page Down</kbd></td><td>{m.calendarview_kb_pgup()} / {m.calendarview_kb_pgdn()}</td></tr>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.calendarview_kb_enter()}</td></tr>
  </tbody>
</table>
</Container>
