<!--
@component
Radio documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import Radio from "$lib/components/Form/Radio.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as RadioModule from "$lib/components/Form/Radio.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"

let theme = $state("light")
let fruit = $state("apple")

const radioGroupCode = `<script>
  let theme = 'light'
<\\/script>

<div class="flex flex-col gap-2">
  <Radio name="theme" value="light" label="Light"
    checked={theme === 'light'} onchange={() => theme = 'light'} />
  <Radio name="theme" value="dark" label="Dark"
    checked={theme === 'dark'} onchange={() => theme = 'dark'} />
  <Radio name="theme" value="system" label="System"
    checked={theme === 'system'} onchange={() => theme = 'system'} />
</div>
<p>Selected theme: {theme}</p>`

const horizontalCode = `<script>
  let fruit = 'apple'
<\\/script>

<div class="flex gap-4">
  <Radio name="fruit" value="apple" label="Apple"
    checked={fruit === 'apple'} onchange={() => fruit = 'apple'} />
  <Radio name="fruit" value="banana" label="Banana"
    checked={fruit === 'banana'} onchange={() => fruit = 'banana'} />
  <Radio name="fruit" value="cherry" label="Cherry"
    checked={fruit === 'cherry'} onchange={() => fruit = 'cherry'} />
</div>`
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.radio_heading()}</h1>

<!-- ─── Description ───────────────────────────────────── -->
<p>
  <strong>{m.radio_heading()}</strong>{m.radio_lede_1()}<code>&lt;input type="radio"&gt;</code>{m.radio_lede_2()}
</p>

<!-- ─── What / When / Why ─────────────────────────────── -->
<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.radio_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.radio_when_1()}<code>&lt;Radio&gt;</code>{m.radio_when_2()}<code>&lt;Select&gt;</code>{m.radio_when_3()}<code>&lt;Combobox&gt;</code>{m.radio_when_4()}<code>&lt;Checkbox&gt;</code>{m.radio_when_5()}<code>&lt;Switch&gt;</code>{m.radio_when_6()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.radio_why_visibility()}</strong>{m.radio_why_visibility_1()}</li>
  <li><strong>{m.radio_why_exclusion()}</strong>{m.radio_why_exclusion_1()}<code>name</code>{m.radio_why_exclusion_2()}</li>
  <li><strong>{m.radio_why_keyboard()}</strong>{m.radio_why_keyboard_1()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/radio/">WAI-ARIA APG — Radio Group</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio">MDN — radio input</a></li>
  <li><a href="https://primer.style/product/components/Radio">Primer — Radio</a></li>
  <li><a href="https://m3.material.io/components/radio-buttons/overview">Material Design 3 — Radio buttons</a></li>
  <li><a href="https://ant.design/components/radio">Ant Design — Radio</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.radio_impl_1()}</li>
    <li>{m.radio_impl_2()}</li>
    <li>{m.radio_impl_3()}</li>
    <li>{m.radio_impl_4()}</li>
    <li>{m.radio_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.radio_mistake_1()}</li>
    <li>{m.radio_mistake_2()}</li>
    <li>{m.radio_mistake_3()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.radio_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.radio_responsive_1()}</li>
  <li>{m.radio_responsive_2_1()}<code>flex gap-4</code>{m.radio_responsive_2_2()}</li>
  <li>{m.radio_responsive_3()}</li>
</ul>

<!-- ─── Customization ─────────────────────────────────── -->
<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.radio_custom_1_1()}<code>sm</code>, <code>md</code>{m.radio_custom_1_2()}<code>lg</code>{m.radio_custom_1_3()}</li>
  <li>{m.radio_custom_2_1()}<code>&lt;FormField&gt;</code>{m.radio_custom_2_2()}</li>
  <li>{m.radio_custom_3()}</li>
</ul>

<!-- ─── Examples ──────────────────────────────────────── -->
<h2>{m.sec_examples()}</h2>

<h3>{m.radio_ex_group()}</h3>
<ExampleTabs code={radioGroupCode}>
  <div class="max-w-md" data-testid="radio-group">
    <div class="flex flex-col gap-2">
      <Radio name="theme-group" value="light" label="Light" checked={theme === 'light'} onchange={() => theme = 'light'} />
      <Radio name="theme-group" value="dark" label="Dark" checked={theme === 'dark'} onchange={() => theme = 'dark'} />
      <Radio name="theme-group" value="system" label="System" checked={theme === 'system'} onchange={() => theme = 'system'} />
    </div>
    <p class="text-sm text-muted mt-2">{m.radio_selected_theme()} {theme}</p>
  </div>
</ExampleTabs>

<h3>{m.radio_ex_horizontal()}</h3>
<ExampleTabs code={horizontalCode}>
  <div class="max-w-md" data-testid="radio-horizontal">
    <div class="flex gap-4">
      <Radio name="fruit" value="apple" label="Apple" checked={fruit === 'apple'} onchange={() => fruit = 'apple'} />
      <Radio name="fruit" value="banana" label="Banana" checked={fruit === 'banana'} onchange={() => fruit = 'banana'} />
      <Radio name="fruit" value="cherry" label="Cherry" checked={fruit === 'cherry'} onchange={() => fruit = 'cherry'} />
    </div>
    <p class="text-sm text-muted mt-2">{m.radio_selected_fruit()} {fruit}</p>
  </div>
</ExampleTabs>

<h3>{m.radio_ex_sizes()}</h3>
<ExampleTabs code={`<Radio name="sm" value="sm" label="Small" size="sm" />
<Radio name="md" value="md" label="Medium (default)" size="md" />
<Radio name="lg" value="lg" label="Large" size="lg" />`}>
  <div class="max-w-md flex flex-col gap-4" data-testid="radio-sizes">
    <Radio name="size-sm" value="sm" label="Small" size="sm" />
    <Radio name="size-md" value="md" label="Medium (default)" size="md" />
    <Radio name="size-lg" value="lg" label="Large" size="lg" />
  </div>
</ExampleTabs>

<h3>{m.radio_ex_formfield()}</h3>
<ExampleTabs code={`<FormField label="Select theme" required={true}>
  <div class="flex gap-4">
    <Radio name="theme-required" value="light" label="Light" required={true} />
    <Radio name="theme-required" value="dark" label="Dark" required={true} />
  </div>
</FormField>`}>
  <div class="max-w-md" data-testid="radio-formfield">
    <FormField label="Select theme" required={true}>
      <div class="flex gap-4">
        <Radio name="theme-required" value="light" label="Light" required={true} />
        <Radio name="theme-required" value="dark" label="Dark" required={true} />
      </div>
    </FormField>
  </div>
</ExampleTabs>

<h3>{m.radio_ex_disabled()}</h3>
<ExampleTabs code={`<Radio name="disabled" value="disabled" label="Disabled option" disabled={true} />`}>
  <div class="max-w-md" data-testid="radio-disabled">
    <Radio name="disabled" value="disabled" label="Disabled option" disabled={true} />
  </div>
</ExampleTabs>

<!-- ─── Slots ─────────────────────────────────────────── -->
<h2>{m.sec_slots()}</h2>
<p>
  {m.radio_slot_none_1()}<code>&lt;FormField&gt;</code>{m.radio_slot_none_2()}
</p>

<!-- ─── Props ─────────────────────────────────────────── -->
<h3>{m.radio_ex_group()}</h3>
<ExampleTabs code={`<Radio name="theme" value="light" label="Light theme" checked />`}>
  <div data-testid="radio-basic">
    <Radio name="theme" value="light" label="Light theme" checked />
  </div>
</ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={RadioModule} />

<!-- ─── Events ────────────────────────────────────────── -->
<h2>{m.sec_events()}</h2>
<EventsTable component={RadioModule} />

<!-- ─── Accessibility ─────────────────────────────────── -->
<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.radio_a11y_1_1()}<code>&lt;input type="radio"&gt;</code>{m.radio_a11y_1_2()}</li>
  <li>{m.radio_a11y_2()}</li>
  <li>{m.radio_a11y_3()}</li>
  <li>{m.radio_a11y_4()}</li>
  <li>{m.radio_a11y_5()}</li>
</ul>

<!-- ─── Keyboard Support ──────────────────────────────── -->
<h2>{m.sec_keyboard()}</h2>
<table>
  <thead>
    <tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr>
  </thead>
  <tbody>
    <tr><td><kbd>Tab</kbd></td><td>{m.radio_kb_tab()}</td></tr>
    <tr><td><kbd>Space</kbd></td><td>{m.radio_kb_space()}</td></tr>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Left</kbd></td><td>{m.radio_kb_prev()}</td></tr>
    <tr><td><kbd>Arrow Down</kbd> / <kbd>Arrow Right</kbd></td><td>{m.radio_kb_next()}</td></tr>
  </tbody>
</table>
</Container>
