<!--
@component
Calendar documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Calendar from "$lib/components/Form/Calendar.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CalendarModule from "$lib/components/Form/Calendar.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.calendar_heading()}</h1>

<p>
  <strong>{m.calendar_heading()}</strong>{m.calendar_lede_1()}<code>&lt;input type="date"&gt;</code>{m.calendar_lede_2()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.calendar_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.calendar_when_1()}<code>&lt;Calendar&gt;</code>{m.calendar_when_2()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.calendar_why_accessible()}</strong>{m.calendar_why_accessible_1()}</li>
  <li><strong>{m.calendar_why_locale()}</strong>{m.calendar_why_locale_1()}</li>
  <li><strong>{m.calendar_why_validated()}</strong>{m.calendar_why_validated_1()}<code>min</code>/<code>max</code>{m.calendar_why_validated_2()}</li>
  <li><strong>{m.calendar_why_lightweight()}</strong>{m.calendar_why_lightweight_1()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date">MDN — date input</a></li>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/">WAI-ARIA APG — Spinbutton</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.calendar_impl_1()}</li>
    <li>{m.calendar_impl_2()}</li>
    <li>{m.calendar_impl_3()}</li>
    <li>{m.calendar_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.calendar_mistake_1()}</li>
    <li>{m.calendar_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.calendar_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.calendar_responsive_1_1()}<code>w-full</code>{m.calendar_responsive_1_2()}</li>
  <li>{m.calendar_responsive_2()}</li>
  <li>{m.calendar_responsive_3()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.calendar_custom_1_1()}<code>minDate</code> / <code>maxDate</code>{m.calendar_custom_1_3()}</li>
  <li>{m.calendar_custom_2_1()}<code>disabled</code>{m.calendar_custom_2_2()}</li>
  <li>{m.calendar_custom_3_1()}<code>required</code>{m.calendar_custom_3_2()}</li>
  <li>{m.calendar_custom_4()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.calendar_ex_basic()}</h3>
<ExampleTabs code={`<Calendar label="Select Date" />`}>
  <div class="max-w-md" data-testid="calendar-basic">
    <Calendar label="Select Date" />
  </div>
</ExampleTabs>

<h3>{m.calendar_ex_value()}</h3>
<!-- NOTE: build dates with `new Date(year, monthIndex, day)` (local time)
     rather than `new Date('YYYY-MM-DD')` (UTC midnight). Calendar formats
     values with local time methods, so an ISO-string date shifts back a day
     in timezones behind UTC. -->
<ExampleTabs code={`<Calendar label="Date" value={new Date(2026, 3, 7)} />`}>
  <div class="max-w-md" data-testid="calendar-with-value">
    <Calendar label="Date" value={new Date(2026, 3, 7)} />
  </div>
</ExampleTabs>

<h3>{m.calendar_ex_minmax()}</h3>
<ExampleTabs code={`<Calendar\\n  label="Date"\\n  minDate={new Date(2026, 3, 1)}\\n  maxDate={new Date(2026, 3, 30)}\\n/>`}>
  <div class="max-w-md" data-testid="calendar-min-max">
    <Calendar label="Date" minDate={new Date(2026, 3, 1)} maxDate={new Date(2026, 3, 30)} />
  </div>
</ExampleTabs>

<h3>{m.calendar_ex_callback()}</h3>
<ExampleTabs code={`<Calendar
  label="Pick a date"
  onselect={(e) => console.log('Selected:', e.detail.date)}
/>`}>
  <div class="max-w-md" data-testid="calendar-callback">
    <Calendar label="Pick a date" />
  </div>
</ExampleTabs>

<h3>{m.calendar_ex_disabled()}</h3>
<ExampleTabs code={`<Calendar label="Date" disabled={true} value={new Date(2026, 3, 7)} />`}>
  <div class="max-w-md" data-testid="calendar-disabled">
    <Calendar label="Date" disabled={true} value={new Date(2026, 3, 7)} />
  </div>
</ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={CalendarModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={CalendarModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.calendar_a11y_1_1()}<code>&lt;input type="date"&gt;</code>{m.calendar_a11y_1_2()}</li>
  <li>{m.calendar_a11y_2()}</li>
  <li>{m.calendar_a11y_3_1()}<code>min</code>/<code>max</code>{m.calendar_a11y_3_2()}</li>
  <li>{m.calendar_a11y_4_1()}<code>for</code>/<code>id</code>{m.calendar_a11y_4_2()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<p>{m.calendar_kb_intro()}</p>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Left</kbd> / <kbd>Arrow Right</kbd></td><td>{m.calendar_kb_left()}</td></tr>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Down</kbd></td><td>{m.calendar_kb_up()}</td></tr>
    <tr><td><kbd>Enter</kbd></td><td>{m.calendar_kb_enter()}</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>{m.calendar_kb_escape()}</td></tr>
  </tbody>
</table>

<h2>{m.calendar_range_heading()}</h2>
<p>
  {m.calendar_range_1_1()}<code>&lt;input type="date"&gt;</code>{m.calendar_range_1_2()}
</p>
<ExampleTabs code={`<div class="flex gap-4">\\n  <Calendar label="Start Date" />\\n  <Calendar label="End Date" />\\n</div>`}>
  <div class="max-w-md flex gap-4" data-testid="calendar-range">
    <Calendar label="Start Date" />
    <Calendar label="End Date" />
  </div>
</ExampleTabs>
</Container>
