<!--
@component
RadioGroup documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Radio from "$lib/components/Form/Radio.svelte"
import RadioGroup from "$lib/components/Form/RadioGroup.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as RadioGroupModule from "$lib/components/Form/RadioGroup.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.rg_heading()}</h1>

<p>
  <strong>{m.rg_heading()}</strong>{m.rg_intro_1()}<code>&lt;fieldset&gt;</code>{m.rg_intro_2()}<code>&lt;legend&gt;</code>{m.rg_intro_3()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.rg_what()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.rg_when_1()}<code>&lt;RadioGroup&gt;</code>{m.rg_when_2()}<code>&lt;Radio&gt;</code>{m.rg_when_3()}<code>&lt;Radio&gt;</code>{m.rg_when_4()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.rg_why_semantics()}</strong>{m.rg_why_semantics_1()}<code>&lt;fieldset&gt;</code>{m.rg_why_semantics_2()}<code>&lt;legend&gt;</code>{m.rg_why_semantics_3()}</li>
  <li><strong>{m.rg_why_consistency()}</strong>{m.rg_why_consistency_desc()}</li>
  <li><strong>{m.rg_why_a11y()}</strong>{m.rg_why_a11y_desc()}</li>
</ul>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.rg_responsive_1()}</li>
  <li>{m.rg_responsive_2_1()}<code>layout="horizontal"</code>{m.rg_responsive_2_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.rg_custom_1_1()}<code>vertical</code>{m.rg_custom_1_2()}<code>horizontal</code>{m.rg_custom_1_3()}</li>
  <li>{m.rg_custom_2_1()}<code>sm</code>{m.rg_custom_2_2()}<code>md</code>{m.rg_custom_2_3()}<code>lg</code>{m.rg_custom_2_4()}</li>
  <li>{m.rg_custom_3()}</li>
  <li>{m.rg_custom_4_1()}<code>value</code>{m.rg_custom_4_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.rg_ex_basic()}</h3>
<ExampleTabs code={`<RadioGroup name="theme" legend="Select theme">
  <Radio value="light" label="Light" />
  <Radio value="dark" label="Dark" />
  <Radio value="system" label="System" />
</RadioGroup>`}>
  <div class="max-w-md" data-testid="radiogroup-basic">
    <RadioGroup name="theme" legend="Select theme">
      <Radio value="light" label="Light" />
      <Radio value="dark" label="Dark" />
      <Radio value="system" label="System" />
    </RadioGroup>
  </div>
</ExampleTabs>

<h3>{m.rg_ex_horizontal()}</h3>
<ExampleTabs code={`<RadioGroup name="alignment" legend="Text alignment" layout="horizontal">
  <Radio value="left" label="Left" />
  <Radio value="center" label="Center" />
  <Radio value="right" label="Right" />
</RadioGroup>`}>
  <div class="max-w-md" data-testid="radiogroup-horizontal">
    <RadioGroup name="alignment" legend="Text alignment" layout="horizontal">
      <Radio value="left" label="Left" />
      <Radio value="center" label="Center" />
      <Radio value="right" label="Right" />
    </RadioGroup>
  </div>
</ExampleTabs>

<h3>{m.rg_ex_disabled()}</h3>
<ExampleTabs code={`<RadioGroup name="disabled" legend="Unavailable" disabled={true}>
  <Radio value="basic" label="Basic" />
  <Radio value="plus" label="Plus" />
  <Radio value="premium" label="Premium" />
</RadioGroup>`}>
  <div class="max-w-md" data-testid="radiogroup-disabled">
    <RadioGroup name="disabled" legend="Unavailable" disabled={true}>
      <Radio value="basic" label="Basic" />
      <Radio value="plus" label="Plus" />
      <Radio value="premium" label="Premium" />
    </RadioGroup>
  </div>
</ExampleTabs>

  <h3>{m.rg_ex_initial()}</h3>
  <ExampleTabs code={`<RadioGroup name="size" value="medium">
  <Radio name="size" value="small" label="Small" />
  <Radio name="size" value="medium" label="Medium" />
  <Radio name="size" value="large" label="Large" />
</RadioGroup>`}>
    <div data-testid="radiogroup-initial">
      <RadioGroup name="size" value="medium">
        <Radio name="size" value="small" label="Small" />
        <Radio name="size" value="medium" label="Medium" />
        <Radio name="size" value="large" label="Large" />
      </RadioGroup>
    </div>
  </ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={RadioGroupModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={RadioGroupModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.rg_a11y_1_1()}<code>&lt;fieldset&gt;</code>{m.rg_a11y_1_2()}<code>&lt;legend&gt;</code>{m.rg_a11y_1_3()}</li>
  <li>{m.rg_a11y_2()}</li>
  <li>{m.rg_a11y_3()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Tab</kbd></td><td>{m.rg_kb_1()}</td></tr>
    <tr><td><kbd>Space</kbd></td><td>{m.rg_kb_2()}</td></tr>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Left</kbd></td><td>{m.rg_kb_3()}</td></tr>
    <tr><td><kbd>Arrow Down</kbd> / <kbd>Arrow Right</kbd></td><td>{m.rg_kb_4()}</td></tr>
  </tbody>
</table>
</Container>
