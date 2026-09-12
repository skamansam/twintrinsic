<!--
@component
Listbox documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import FormField from "$lib/components/Form/FormField.svelte"
import Listbox from "$lib/components/Form/Listbox.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ListboxModule from "$lib/components/Form/Listbox.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"

const colors = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Yellow", value: "yellow" },
  { label: "Purple", value: "purple" },
]

let selectedColor = $state({ label: "Blue", value: "blue" })
let selectedFruits = $state(["Apple", "Grape"])
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.listbox_heading()}</h1>

<p>
  <strong>{m.listbox_heading()}</strong>{m.listbox_lede_1()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.listbox_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.listbox_when_1()}<code>&lt;Listbox&gt;</code>{m.listbox_when_2()}<code>&lt;Select&gt;</code>{m.listbox_when_3()}<code>&lt;Combobox&gt;</code>{m.listbox_when_4()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.listbox_why_visible()}</strong>{m.listbox_why_visible_1()}</li>
  <li><strong>{m.listbox_why_rich()}</strong>{m.listbox_why_rich_1()}</li>
  <li><strong>{m.listbox_why_keyboard()}</strong>{m.listbox_why_keyboard_1()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/">WAI-ARIA APG — Listbox</a></li>
  <li><a href="https://primer.style/product/components/ActionList">Primer — ActionList</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.listbox_impl_1()}</li>
    <li>{m.listbox_impl_2_1()}<code>filter=&#123;true&#125;</code>{m.listbox_impl_2_2()}</li>
    <li>{m.listbox_impl_3_1()}<code>filterPlaceholder</code>{m.listbox_impl_3_2()}</li>
    <li>{m.listbox_impl_4()}</li>
    <li>{m.listbox_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.listbox_mistake_1()}</li>
    <li>{m.listbox_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.listbox_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.listbox_responsive_1()}</li>
  <li>{m.listbox_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.listbox_custom_1()}</li>
  <li>{m.listbox_custom_2_1()}<code>filter={true}</code>{m.listbox_custom_2_2()}</li>
  <li>{m.listbox_custom_3_1()}<code>optionIcon</code>{m.listbox_custom_3_2()}</li>
  <li>{m.listbox_custom_4_1()}<code>&lt;FormField&gt;</code>{m.listbox_custom_4_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.listbox_ex_basic()}</h3>
<ExampleTabs code={`<Listbox name="color" options={colors} value={selectedColor} />`}>
  <div class="max-w-md" data-testid="listbox-basic">
    <Listbox name="color" options={colors} value={selectedColor} />
  </div>
</ExampleTabs>

<h3>{m.listbox_ex_multiple()}</h3>
<ExampleTabs code={`<Listbox name="fruits" options={fruits} multiple={true} filter={true} value={selectedFruits} />`}>
  <div class="max-w-md" data-testid="listbox-multiple">
    <Listbox name="fruits" options={['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape']} multiple={true} filter={true} value={selectedFruits} />
  </div>
</ExampleTabs>

<h3>{m.listbox_ex_formfield()}</h3>
<ExampleTabs code={`<FormField label="Select a color" required={true}>
  <Listbox name="color-required" options={colors} required={true} />
</FormField>`}>
  <div class="max-w-md" data-testid="listbox-formfield">
    <FormField label="Select a color" required={true}>
      <Listbox name="color-required" options={colors} required={true} />
    </FormField>
  </div>
</ExampleTabs>

<h3>{m.listbox_ex_disabled()}</h3>
<ExampleTabs code={`<Listbox name="color-disabled" options={colors} disabled={true} />`}>
  <div class="max-w-md" data-testid="listbox-disabled">
    <Listbox name="color-disabled" options={colors} disabled={true} />
  </div>
</ExampleTabs>

  <h3>{m.listbox_ex_filter()}</h3>
  <ExampleTabs code={`<Listbox
  name="fruit-filter"
  options={[{value:'apple',label:'Apple'},{value:'banana',label:'Banana'},{value:'cherry',label:'Cherry'},{value:'grape',label:'Grape'},{value:'kiwi',label:'Kiwi'}]}
  filter={true}
  filterPlaceholder="Search fruits..."
/>`}>
    <div class="max-w-md" data-testid="listbox-filtering">
      <Listbox
        name="fruit-filter"
        options={[{value:'apple',label:'Apple'},{value:'banana',label:'Banana'},{value:'cherry',label:'Cherry'},{value:'grape',label:'Grape'},{value:'kiwi',label:'Kiwi'}]}
        filter={true}
        filterPlaceholder="Search fruits..."
      />
    </div>
  </ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={ListboxModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={ListboxModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.listbox_a11y_1_1()}<code>role="listbox"</code>{m.listbox_a11y_1_2()}<code>role="option"</code>{m.listbox_a11y_1_3()}</li>
  <li><code>aria-selected</code>{m.listbox_a11y_2_2()}</li>
  <li>{m.listbox_a11y_3()}</li>
  <li>{m.listbox_a11y_4()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Down</kbd></td><td>{m.listbox_kb_arrows()}</td></tr>
    <tr><td><kbd>Home</kbd> / <kbd>End</kbd></td><td>{m.listbox_kb_home()}</td></tr>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.listbox_kb_enter()}</td></tr>
    <tr><td><kbd>Type</kbd></td><td>{m.listbox_kb_type()}</td></tr>
  </tbody>
</table>
</Container>
