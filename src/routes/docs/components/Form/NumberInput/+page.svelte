<!--
@component
NumberInput documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import NumberInput from "$lib/components/Form/NumberInput.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as NumberInputModule from "$lib/components/Form/NumberInput.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"

let quantity = $state(1)
let price = $state(29.99)
let percentage = $state(75)
let temperature = $state(22.5)
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.numberinput_heading()}</h1>

<p>
  <strong>{m.numberinput_heading()}</strong>{m.numberinput_lede_1()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.numberinput_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.numberinput_when_1()}<code>&lt;NumberInput&gt;</code>{m.numberinput_when_2()}<code>&lt;Slider&gt;</code>{m.numberinput_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.numberinput_why_precision()}</strong>{m.numberinput_why_precision_1()}</li>
  <li><strong>{m.numberinput_why_formatting()}</strong>{m.numberinput_why_formatting_1()}</li>
  <li><strong>{m.numberinput_why_a11y()}</strong>{m.numberinput_why_a11y_1()}<code>aria-valuemin</code>{m.numberinput_why_a11y_2()}<code>aria-valuemax</code>{m.numberinput_why_a11y_3()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/">WAI-ARIA APG — Spinbutton</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number">MDN — number input</a></li>
  <li><a href="https://ant.design/components/input-number">Ant Design — InputNumber</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.numberinput_impl_1()}</li>
    <li>{m.numberinput_impl_2()}</li>
    <li>{m.numberinput_impl_3()}</li>
    <li>{m.numberinput_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.numberinput_mistake_1()}</li>
    <li>{m.numberinput_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.numberinput_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.numberinput_responsive_1()}</li>
  <li>{m.numberinput_responsive_2_1()}<code>type="number"</code>{m.numberinput_responsive_2_2()}</li>
  <li>{m.numberinput_responsive_3_1()}<code>showButtons</code>{m.numberinput_responsive_3_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.numberinput_custom_1()}</li>
  <li>{m.numberinput_custom_2_1()}<code>"tabler:currency-dollar"</code>{m.numberinput_custom_2_2()}</li>
  <li>{m.numberinput_custom_3_1()}<code>decimalPlaces</code>{m.numberinput_custom_3_2()}</li>
  <li>{m.numberinput_custom_4()}</li>
  <li>{m.numberinput_custom_5_1()}<code>sm</code>, <code>md</code>, <code>lg</code>{m.numberinput_custom_5_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.numberinput_ex_basic()}</h3>
<ExampleTabs code={`<script>
  let quantity = 1
<\\/script>

<NumberInput name="quantity" value={quantity} min={0} max={100} step={1} />`}>
  <div class="max-w-md" data-testid="numberinput-basic-usage">
    <NumberInput name="quantity" value={quantity} min={0} max={100} step={1} />
  </div>
</ExampleTabs>

<h3>{m.numberinput_ex_currency()}</h3>
<ExampleTabs code={`<script>
  let price = 29.99
<\\/script>

<NumberInput name="price" value={price} prefix="$" decimalPlaces={2} min={0} />`}>
  <div class="max-w-md" data-testid="numberinput-currency">
    <NumberInput name="price" value={price} prefix="$" decimalPlaces={2} min={0} />
  </div>
</ExampleTabs>

<h3>{m.numberinput_ex_percentage()}</h3>
<ExampleTabs code={`<script>
  let percentage = 75
<\\/script>

<NumberInput name="percentage" value={percentage} suffix="%" min={0} max={100} />`}>
  <div class="max-w-md" data-testid="numberinput-percentage">
    <NumberInput name="percentage" value={percentage} suffix="%" min={0} max={100} />
  </div>
</ExampleTabs>

<h3>{m.numberinput_ex_icon()}</h3>
<ExampleTabs code={`<NumberInput name="weight" value={5} suffix="tabler:weight" min={0} />
<NumberInput name="speed" value={120} suffix="tabler:speed" min={0} />`}>
  <div class="max-w-md space-y-4" data-testid="numberinput-icon-suffix">
    <NumberInput name="weight" value={5} suffix="tabler:weight" min={0} />
    <NumberInput name="speed" value={120} suffix="tabler:speed" min={0} />
  </div>
</ExampleTabs>

<h3>{m.numberinput_ex_vertical()}</h3>
<ExampleTabs code={`<NumberInput name="temperature" value={22.5} step={0.5} decimalPlaces={1} suffix="°C" verticalButtons={true} />`}>
  <div class="max-w-md" data-testid="numberinput-vertical">
    <NumberInput name="temperature" value={temperature} step={0.5} decimalPlaces={1} suffix="°C" verticalButtons={true} />
  </div>
</ExampleTabs>

<h3>{m.numberinput_ex_disabled()}</h3>
<ExampleTabs code={`<NumberInput name="disabled" value={10} disabled={true} />`}>
  <div class="max-w-md" data-testid="numberinput-disabled-state">
    <NumberInput name="disabled" value={10} disabled={true} />
  </div>
</ExampleTabs>

<h2>{m.sec_slots()}</h2>
<p>{m.numberinput_slot_none()}</p>

<h3>{m.numberinput_ex_nobuttons()}</h3>
<ExampleTabs code={`<NumberInput showButtons={false} placeholder="Enter a number" />`}>
  <div data-testid="numberinput-no-buttons">
    <NumberInput showButtons={false} placeholder="Enter a number" />
  </div>
</ExampleTabs>

<h3>{m.numberinput_ex_readonly()}</h3>
<ExampleTabs code={`<NumberInput readonly ariaLabel="readonly"  />`}>
  <div data-testid="numberinput-readonly">
    <NumberInput readonly ariaLabel="readonly"  />
  </div>
</ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={NumberInputModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={NumberInputModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.numberinput_a11y_1_1()}<code>aria-valuemin</code>{m.numberinput_a11y_1_2()}<code>aria-valuemax</code>{m.numberinput_a11y_1_3()}<code>aria-valuenow</code>{m.numberinput_a11y_1_4()}</li>
  <li>{m.numberinput_a11y_2_1()}<code>aria-label</code>{m.numberinput_a11y_2_2()}</li>
  <li>{m.numberinput_a11y_3()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Up</kbd></td><td>{m.numberinput_kb_up()}</td></tr>
    <tr><td><kbd>Arrow Down</kbd></td><td>{m.numberinput_kb_down()}</td></tr>
    <tr><td><kbd>Home</kbd></td><td>{m.numberinput_kb_home()}</td></tr>
    <tr><td><kbd>End</kbd></td><td>{m.numberinput_kb_end()}</td></tr>
  </tbody>
</table>
</Container>
