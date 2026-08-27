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
  <strong>Calendar</strong> is a date picker supporting single date and range selection,
  with month navigation, week numbers, and customizable formatting. Uses
  <code>popover="auto"</code> for the popup panel with <code>@starting-style</code>
  entry animation.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A month-grid calendar that opens from an input field. Users click a date to select
  it, or drag to select a range. Navigates between months with arrow buttons.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Calendar&gt;</code> when the user needs to pick a date or date range.
  For simple date input without a calendar grid, use <code>&lt;Input type="date"&gt;</code>.
  Custom calendars are needed for range selection, week numbers, or blocked dates.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Range selection</strong> — native <code>&lt;input type="date"&gt;</code> doesn't support date ranges.</li>
  <li><strong>Visual selection</strong> — the month grid makes it easy to see the selected date in context.</li>
  <li><strong>Popover API</strong> — light-dismiss and top-layer rendering with <code>@starting-style</code> animation.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/#datepickerdialog">WAI-ARIA APG — Date Picker Dialog</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date">MDN — date input</a></li>
</ul>


<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Custom grid-based calendar with `popover=&quot;auto&quot;` for the picker panel</li>
    <li>`@starting-style` + `transition-behavior: allow-discrete` for entry animation</li>
    <li>Range selection support with visual highlighting</li>
    <li>Week numbers via `weekNumber` prop</li>
    <li>Form context integration via `getContext('form')`</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;input type=&quot;date&quot;&gt;` when you need range selection or custom formatting</li>
    <li>Don't forget `popover=&quot;auto&quot;` — it handles top-layer rendering and light-dismiss</li>
</ul>

<h2>Related Components</h2>
<p>Input, ColorPicker, Select</p>

<h2>Responsiveness</h2>
<ul>
  <li>Calendar grid adapts to container width.</li>
  <li>On mobile, the calendar opens as a full-width overlay.</li>
  <li>Touch targets meet 44×44 px minimum.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Date format via <code>format</code> prop (e.g., <code>MM/dd/yyyy</code>).</li>
  <li>Min/max date constraints.</li>
  <li>Week numbers via <code>showWeekNumbers</code>.</li>
  <li>Range selection via <code>range={true}</code>.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Calendar label="Select Date" />`}>
  <div class="max-w-md" data-testid="calendar-basic">
    <Calendar label="Select Date" />
  </div>
</ExampleTabs>

<h3>Date Range</h3>
<ExampleTabs code={`<Calendar label="Date Range" range={true} value={[new Date('2026-04-07'), new Date('2026-04-14')]} />`}>
  <div class="max-w-md" data-testid="calendar-range">
    <Calendar label="Date Range" range={true} value={[new Date('2026-04-07'), new Date('2026-04-14')]} />
  </div>
</ExampleTabs>

<h3>With Min/Max Dates</h3>
<ExampleTabs code={`<Calendar label="Date" minDate={new Date('2026-04-01')} maxDate={new Date('2026-04-30')} />`}>
  <div class="max-w-md" data-testid="calendar-min-max">
    <Calendar label="Date" minDate={new Date('2026-04-01')} maxDate={new Date('2026-04-30')} />
  </div>
</ExampleTabs>

<h3>Week Numbers</h3>
<ExampleTabs code={`<Calendar label="Date" showWeekNumbers={true} />`}>
  <div class="max-w-md" data-testid="calendar-week-numbers">
    <Calendar label="Date" showWeekNumbers={true} />
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={CalendarModule} />

<h2>Events</h2>
<EventsTable component={CalendarModule} />

<h2>Accessibility</h2>
<ul>
  <li>Calendar opens in a dialog with proper ARIA labeling.</li>
  <li>Date grid uses table semantics with row/column headers.</li>
  <li><code>aria-selected</code> on selected dates.</li>
  <li>Keyboard: arrow keys navigate days, Enter selects, Escape closes.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Left</kbd></td><td>Previous day</td></tr>
    <tr><td><kbd>Arrow Right</kbd></td><td>Next day</td></tr>
    <tr><td><kbd>Arrow Up</kbd></td><td>Previous week</td></tr>
    <tr><td><kbd>Arrow Down</kbd></td><td>Next week</td></tr>
    <tr><td><kbd>Enter</kbd></td><td>Select current date</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>Close calendar</td></tr>
  </tbody>
</table>
</Container>
