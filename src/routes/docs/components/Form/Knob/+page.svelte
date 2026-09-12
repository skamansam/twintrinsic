<!--
@component
Knob documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import Knob from "$lib/components/Form/Knob.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as KnobModule from "$lib/components/Form/Knob.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"

const valueDisplayCode = `<Knob name="progress" value={75} showValue={true} valueTemplate="{value}%" />`
const sizesCode = `<Knob size="sm" value={25} />
<Knob size="md" value={50} />
<Knob size="lg" value={75} />`
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.knob_heading()}</h1>

<p>
  <strong>{m.knob_heading()}</strong>{m.knob_lede_1()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.knob_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.knob_when_1()}<code>&lt;Knob&gt;</code>{m.knob_when_2()}<code>&lt;Slider&gt;</code>{m.knob_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.knob_why_domain()}</strong>{m.knob_why_domain_1()}</li>
  <li><strong>{m.knob_why_compact()}</strong>{m.knob_why_compact_1()}</li>
  <li><strong>{m.knob_why_aria()}</strong>{m.knob_why_aria_1()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/slider/">WAI-ARIA APG — Slider (rotary variant)</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/slider_role">MDN — slider role</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.knob_impl_1()}</li>
    <li>{m.knob_impl_2()}</li>
    <li>{m.knob_impl_3()}</li>
    <li>{m.knob_impl_4()}</li>
    <li>{m.knob_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.knob_mistake_1()}</li>
    <li>{m.knob_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.knob_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.knob_responsive_1_1()}<code>sm</code>{m.knob_responsive_1_2()}<code>md</code>{m.knob_responsive_1_3()}<code>lg</code>{m.knob_responsive_1_4()}</li>
  <li>{m.knob_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.knob_custom_1()}</li>
  <li>{m.knob_custom_2()}</li>
  <li>{m.knob_custom_3()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.knob_ex_basic()}</h3>
<ExampleTabs code={`<Knob name="volume" value={50} min={0} max={100} />`}>
  <div class="max-w-md flex justify-center" data-testid="knob-basic-usage">
    <Knob name="volume" value={50} min={0} max={100} />
  </div>
</ExampleTabs>

<h3>{m.knob_ex_value()}</h3>
<ExampleTabs code={valueDisplayCode}>
  <div class="max-w-md flex justify-center" data-testid="knob-value-display">
    <Knob name="progress" value={75} showValue={true} valueTemplate="{75}%" />
  </div>
</ExampleTabs>

<h3>{m.knob_ex_sizes()}</h3>
<ExampleTabs code={sizesCode}>
  <div class="max-w-md flex items-center justify-center gap-8" data-testid="knob-sizes">
    <div class="flex flex-col items-center"><span class="text-sm mb-2">Small</span><Knob size="sm" value={25} /></div>
    <div class="flex flex-col items-center"><span class="text-sm mb-2">Medium</span><Knob size="md" value={50} /></div>
    <div class="flex flex-col items-center"><span class="text-sm mb-2">Large</span><Knob size="lg" value={75} /></div>
  </div>
</ExampleTabs>

<h3>{m.knob_ex_disabled()}</h3>
<ExampleTabs code={`<Knob value={65} disabled={true} />`}>
  <div class="max-w-md flex justify-center" data-testid="knob-disabled-state">
    <Knob value={65} disabled={true} />
  </div>
</ExampleTabs>

  <h3>{m.knob_ex_formfield()}</h3>
  <ExampleTabs code={`<FormField label="Volume">
  <Knob min={0} max={100} value={50} />
</FormField>`}>
    <div data-testid="knob-formfield">
      <FormField label="Volume">
        <Knob min={0} max={100} value={50} />
      </FormField>
    </div>
  </ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={KnobModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={KnobModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li><code>role="slider"</code>{m.knob_a11y_1_2()}<code>aria-valuemin</code>{m.knob_a11y_1_3()}<code>aria-valuemax</code>, <code>aria-valuenow</code>{m.knob_a11y_1_4()}</li>
  <li>{m.knob_a11y_2()}</li>
  <li>{m.knob_a11y_3()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Right</kbd></td><td>{m.knob_kb_up()}</td></tr>
    <tr><td><kbd>Arrow Down</kbd> / <kbd>Arrow Left</kbd></td><td>{m.knob_kb_down()}</td></tr>
    <tr><td><kbd>Home</kbd></td><td>{m.knob_kb_home()}</td></tr>
    <tr><td><kbd>End</kbd></td><td>{m.knob_kb_end()}</td></tr>
  </tbody>
</table>
</Container>
