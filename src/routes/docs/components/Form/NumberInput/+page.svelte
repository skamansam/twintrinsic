<!--
@component
NumberInput documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import NumberInput from "$lib/components/Form/NumberInput.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as NumberInputModule from "$lib/components/Form/NumberInput.svelte"
import Container from "$lib/components/Container/Container.svelte"

let quantity = $state(1)
let price = $state(29.99)
let percentage = $state(75)
let temperature = $state(22.5)
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>NumberInput</h1>

<p>
  <strong>NumberInput</strong> is a specialized form control for numeric values with
  increment/decrement buttons, currency/percentage formatting, and unit suffixes.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A text input restricted to numeric values with up/down stepper buttons, optional
  prefix/suffix (e.g., "$", "%", "°C"), and configurable decimal precision.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;NumberInput&gt;</code> when the user needs to enter or adjust a
  specific numeric value: quantity, price, percentage, temperature. For approximate
  values on a continuous range, use <code>&lt;Slider&gt;</code> instead.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Precision</strong> — stepper buttons and keyboard arrows allow exact values.</li>
  <li><strong>Formatting</strong> — built-in currency, percentage, and unit display.</li>
  <li><strong>Accessibility</strong> — uses <code>aria-valuemin</code>,
    <code>aria-valuemax</code>, <code>aria-valuenow</code> for screen reader support.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/">WAI-ARIA APG — Spinbutton</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number">MDN — number input</a></li>
  <li><a href="https://ant.design/components/input-number">Ant Design — InputNumber</a></li>
</ul>


<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Wraps native `&lt;input type=&quot;number&quot;&gt;` with increment/decrement buttons</li>
    <li>Uses `step`, `min`, `max` for constraints — all native HTML5 validation</li>
    <li>`aria-live=&quot;polite&quot;` on the value display for screen reader announcements</li>
    <li>Form context integration via `getContext('form')`</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;input type=&quot;text&quot; inputmode=&quot;numeric&quot;&gt;` when you need step controls</li>
    <li>Don't forget `aria-label` on increment/decrement buttons</li>
</ul>

<h2>Related Components</h2>
<p>Input, Slider, Knob</p>

<h2>Responsiveness</h2>
<ul>
  <li>Fills container width by default (<code>w-full</code>).</li>
  <li>Mobile shows numeric keyboard for <code>type="number"</code>.</li>
  <li>Stepper buttons are hidden on touch devices when <code>showButtons</code> is false.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Prefix/suffix for currency, percentage, or units.</li>
  <li>Decimal precision via <code>decimalPlaces</code>.</li>
  <li>Vertical or horizontal button layout.</li>
  <li>Sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<script>
  let quantity = 1
<\/script>

<NumberInput name="quantity" value={quantity} min={0} max={100} step={1} />`}>
  <div class="max-w-md" data-testid="numberinput-basic-usage">
    <NumberInput name="quantity" value={quantity} min={0} max={100} step={1} />
  </div>
</ExampleTabs>

<h3>Currency Prefix</h3>
<ExampleTabs code={`<script>
  let price = 29.99
<\/script>

<NumberInput name="price" value={price} prefix="$" decimalPlaces={2} min={0} />`}>
  <div class="max-w-md" data-testid="numberinput-currency">
    <NumberInput name="price" value={price} prefix="$" decimalPlaces={2} min={0} />
  </div>
</ExampleTabs>

<h3>Percentage Suffix</h3>
<ExampleTabs code={`<script>
  let percentage = 75
<\/script>

<NumberInput name="percentage" value={percentage} suffix="%" min={0} max={100} />`}>
  <div class="max-w-md" data-testid="numberinput-percentage">
    <NumberInput name="percentage" value={percentage} suffix="%" min={0} max={100} />
  </div>
</ExampleTabs>

<h3>Vertical Buttons</h3>
<ExampleTabs code={`<NumberInput name="temperature" value={22.5} step={0.5} decimalPlaces={1} suffix="°C" verticalButtons={true} />`}>
  <div class="max-w-md" data-testid="numberinput-vertical">
    <NumberInput name="temperature" value={temperature} step={0.5} decimalPlaces={1} suffix="°C" verticalButtons={true} />
  </div>
</ExampleTabs>

<h3>Disabled</h3>
<ExampleTabs code={`<NumberInput name="disabled" value={10} disabled={true} />`}>
  <div class="max-w-md" data-testid="numberinput-disabled-state">
    <NumberInput name="disabled" value={10} disabled={true} />
  </div>
</ExampleTabs>

<h2>Slots</h2>
<p>The NumberInput component does not expose named slots. Use props for customization.</p>

  <h3>No Buttons</h3>
  <ExampleTabs code={`<NumberInput showButtons={false} placeholder="Enter a number" />`}>
    <div data-testid="numberinput-no-buttons">
      <NumberInput showButtons={false} placeholder="Enter a number" />
    </div>
  </ExampleTabs>

  <h3>Readonly</h3>
  <ExampleTabs code={`<NumberInput readonly ariaLabel="readonly"  />`}>
    <div data-testid="numberinput-readonly">
      <NumberInput readonly ariaLabel="readonly"  />
    </div>
  </ExampleTabs>

<h2>Props</h2>
<PropsTable component={NumberInputModule} />

<h2>Events</h2>
<EventsTable component={NumberInputModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses <code>aria-valuemin</code>, <code>aria-valuemax</code>, <code>aria-valuenow</code>.</li>
  <li>Increment/decrement buttons have descriptive <code>aria-label</code>.</li>
  <li>Keyboard: Arrow Up/Down to increment/decrement, Home/End for min/max.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Up</kbd></td><td>Increment value by step</td></tr>
    <tr><td><kbd>Arrow Down</kbd></td><td>Decrement value by step</td></tr>
    <tr><td><kbd>Home</kbd></td><td>Set to minimum value</td></tr>
    <tr><td><kbd>End</kbd></td><td>Set to maximum value</td></tr>
  </tbody>
</table>
</Container>
