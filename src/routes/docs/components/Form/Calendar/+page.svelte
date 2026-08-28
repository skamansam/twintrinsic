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


</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>Calendar</h1>

<p>
  <strong>Calendar</strong> is a date picker built on the native
  <code>&lt;input type="date"&gt;</code> element. It uses the browser's built-in
  date picker for accessibility, validation, and localized formatting — free of charge.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A form control that lets users pick a date using the browser's native date
  picker. Provides a calendar popup, keyboard navigation, and locale-aware
  formatting with zero JavaScript overhead.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Calendar&gt;</code> when the user needs to pick a single date.
  The native picker provides ARIA support, keyboard navigation, and validation
  for free. For date range selection, use two Calendar components side by side.
  For custom calendar grids with week numbers or blocked dates, consider a
  dedicated calendar library.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Accessible by default</strong> — native date pickers have built-in ARIA, keyboard navigation, and screen reader support.</li>
  <li><strong>Locale-aware</strong> — the browser formats dates according to the user's locale automatically.</li>
  <li><strong>Validated</strong> — <code>min</code>/<code>max</code> attributes prevent invalid dates natively.</li>
  <li><strong>Lightweight</strong> — no custom calendar grid JavaScript needed.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date">MDN — date input</a></li>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/">WAI-ARIA APG — Spinbutton</a></li>
</ul>

<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Wraps native `&lt;input type="date"&gt;` with label and icon styling</li>
    <li>`::-webkit-calendar-picker-indicator` is visually hidden; the Icon component provides the calendar icon</li>
    <li>Form context integration via `getContext('form')`</li>
    <li>Min/max constraints use native `min`/`max` attributes</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;input type="text"&gt;` with a date pattern — `type="date"` gives you the native picker for free</li>
    <li>Don't forget `aria-label` when the input has no visible label</li>
</ul>

<h2>Related Components</h2>
<p>Input, ColorPicker, Select</p>

<h2>Responsiveness</h2>
<ul>
  <li>Fills container width by default (<code>w-full</code>).</li>
  <li>On mobile, the native date picker opens as a system-native overlay.</li>
  <li>Touch targets meet 44×44 px minimum.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Min/max date constraints via <code>minDate</code> / <code>maxDate</code>.</li>
  <li>Disabled state via <code>disabled</code>.</li>
  <li>Required validation via <code>required</code>.</li>
  <li>The date format is determined by the user's browser locale.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Calendar label="Select Date" />`}>
  <div class="max-w-md" data-testid="calendar-basic">
    <Calendar label="Select Date" />
  </div>
</ExampleTabs>

<h3>With Pre-selected Date</h3>
<ExampleTabs code={`<Calendar label="Date" value={new Date('2026-04-07')} />`}>
  <div class="max-w-md" data-testid="calendar-with-value">
    <Calendar label="Date" value={new Date('2026-04-07')} />
  </div>
</ExampleTabs>

<h3>With Min/Max Dates</h3>
<ExampleTabs code={`<Calendar\n  label="Date"\n  minDate={new Date('2026-04-01')}\n  maxDate={new Date('2026-04-30')}\n/>`}>
  <div class="max-w-md" data-testid="calendar-min-max">
    <Calendar label="Date" minDate={new Date('2026-04-01')} maxDate={new Date('2026-04-30')} />
  </div>
</ExampleTabs>

<h3>With Callback</h3>
<ExampleTabs code={`<Calendar
  label="Pick a date"
  onselect={(e) => console.log('Selected:', e.detail.date)}
/>`}>
  <div class="max-w-md" data-testid="calendar-callback">
    <Calendar label="Pick a date" />
  </div>
</ExampleTabs>

<h3>Disabled</h3>
<ExampleTabs code={`<Calendar label="Date" disabled={true} value={new Date('2026-04-07')} />`}>
  <div class="max-w-md" data-testid="calendar-disabled">
    <Calendar label="Date" disabled={true} value={new Date('2026-04-07')} />
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={CalendarModule} />

<h2>Events</h2>
<EventsTable component={CalendarModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses native <code>&lt;input type="date"&gt;</code> which provides built-in ARIA support.</li>
  <li>The native date picker includes keyboard navigation and screen reader announcements.</li>
  <li><code>min</code>/<code>max</code> attributes enforce date constraints at the browser level.</li>
  <li>Label is associated via <code>for</code>/<code>id</code> pairing.</li>
</ul>

<h2>Keyboard Support</h2>
<p>
  The native date picker provides full keyboard support automatically:
</p>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Left</kbd> / <kbd>Arrow Right</kbd></td><td>Navigate between date segments (month, day, year)</td></tr>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Down</kbd></td><td>Increment/decrement the active segment</td></tr>
    <tr><td><kbd>Enter</kbd></td><td>Confirm the selected date</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>Close the date picker</td></tr>
  </tbody>
</table>

<h2>Date Range Selection</h2>
<p>
  The native <code>&lt;input type="date"&gt;</code> does not support date range
  selection. To pick a date range, use two Calendar components side by side:
</p>
<ExampleTabs code={`<div class="flex gap-4">\n  <Calendar label="Start Date" />\n  <Calendar label="End Date" />\n</div>`}>
  <div class="max-w-md flex gap-4" data-testid="calendar-range">
    <Calendar label="Start Date" />
    <Calendar label="End Date" />
  </div>
</ExampleTabs>
</Container>
