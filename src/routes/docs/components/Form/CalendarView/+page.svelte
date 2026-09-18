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
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import CalendarView from "$lib/components/CalendarView/CalendarView.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CalendarViewModule from "$lib/components/CalendarView/CalendarView.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"

// Anchor dates for the demos — pinned so examples don't drift as months pass.
const SEPTEMBER = Temporal.PlainDate.from("2026-09-01")
const SELECTED = Temporal.PlainDate.from("2026-09-21")
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.calendarview_heading()}</h1>

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
