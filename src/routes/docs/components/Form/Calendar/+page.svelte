<!--
@component
Documentation page for the Calendar component.
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Calendar from "$lib/components/Form/Calendar.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as CalendarModule from "$lib/components/Form/Calendar.svelte"
</script>

<h1>Calendar</h1>

<p>
  The Calendar component is a date picker that supports single date and range selection,
  with keyboard navigation and accessibility features. It's built on top of the Input
  component and includes month navigation, week numbers, and customizable formatting.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example" data-testid="calendar-basic">
  <Calendar label="Select Date" />
</div>
<CodeBlock>
  {`<Calendar label="Select Date" />`}
</CodeBlock>

<h3>Date Range Selection</h3>
<div class="example" data-testid="calendar-range">
  <Calendar
    label="Date Range"
    range={true}
    value={[new Date('2025-04-07'), new Date('2025-04-14')]}
  />
</div>
<CodeBlock>
  {`<Calendar
  label="Date Range"
  range={true}
  value={[new Date('2025-04-07'), new Date('2025-04-14')]}
/>`}
</CodeBlock>

<h3>With Min/Max Dates</h3>
<div class="example" data-testid="calendar-min-max">
  <Calendar
    label="Date"
    minDate={new Date('2025-04-01')}
    maxDate={new Date('2025-04-30')}
  />
</div>
<CodeBlock>
  {`<Calendar
  label="Date"
  minDate={new Date('2025-04-01')}
  maxDate={new Date('2025-04-30')}
/>`}
</CodeBlock>

<h3>With Week Numbers</h3>
<div class="example" data-testid="calendar-week-numbers">
  <Calendar
    label="Date"
    showWeekNumbers={true}
  />
</div>
<CodeBlock>
  {`<Calendar
  label="Date"
  showWeekNumbers={true}
/>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable component={CalendarModule} />

<h2>Events</h2>
<EventsTable component={CalendarModule} />

<h2>Keyboard Navigation</h2>
<p>
  The Calendar component supports keyboard navigation when the calendar is open:
</p>
<ul>
  <li><code>ArrowLeft</code> - Previous day</li>
  <li><code>ArrowRight</code> - Next day</li>
  <li><code>ArrowUp</code> - Previous week</li>
  <li><code>ArrowDown</code> - Next week</li>
  <li><code>Enter</code> - Select current date</li>
  <li><code>Escape</code> - Close calendar</li>
</ul>

<h2>Date Formatting</h2>
<p>
  The format prop supports the following tokens:
</p>
<ul>
  <li><code>MM</code> - Month number (01-12)</li>
  <li><code>dd</code> - Day of the month (01-31)</li>
  <li><code>yyyy</code> - Full year</li>
</ul>
<p>Examples:</p>
<ul>
  <li><code>MM/dd/yyyy</code> - 04/07/2025</li>
  <li><code>dd/MM/yyyy</code> - 07/04/2025</li>
  <li><code>yyyy-MM-dd</code> - 2025-04-07</li>
</ul>

<h2>Accessibility</h2>
<p>
  The Calendar component follows WAI-ARIA guidelines for date pickers:
</p>
<ul>
  <li>Calendar opens in a dialog with proper ARIA labeling</li>
  <li>Navigation buttons have descriptive labels</li>
  <li>Date grid uses proper table semantics with row and column headers</li>
  <li>Selected dates are indicated with <code>aria-selected</code></li>
  <li>Keyboard navigation support</li>
  <li>Disabled dates are properly indicated</li>
</ul>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>
