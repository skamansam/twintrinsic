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
<h1>Listbox</h1>

<p>
  <strong>Listbox</strong> presents a list of options where the user can select one
  or more. Unlike a dropdown, options are always visible — no opening required.
  Supports filtering, icons, and multi-select.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A visible list of selectable options with keyboard navigation (arrows, Home/End,
  type-ahead). Options can contain rich content (icons, descriptions).
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Listbox&gt;</code> for 5–15 options that benefit from being always
  visible. For fewer options, use radio buttons. For hidden-until-opened options,
  use <code>&lt;Select&gt;</code> or <code>&lt;Combobox&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Always visible</strong> — no dropdown to open; all options scannable at a glance.</li>
  <li><strong>Rich content</strong> — options can include icons, avatars, descriptions.</li>
  <li><strong>Keyboard accessible</strong> — full arrow key navigation, Home/End, type-ahead.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/">WAI-ARIA APG — Listbox</a></li>
  <li><a href="https://primer.style/product/components/ActionList">Primer — ActionList</a></li>
</ul>


<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Always-visible list of options (no dropdown to open)</li>
    <li>`filter=&#123;true&#125;` enables a filter input for narrowing options</li>
    <li>`filterPlaceholder` for the filter input placeholder text</li>
    <li>WAI-ARIA listbox pattern with `role=&quot;listbox&quot;` + `role=&quot;option&quot;`</li>
    <li>Form context integration via `getContext('form')`</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use for fewer than 5 options — use radio buttons or checkboxes</li>
    <li>Don't forget `aria-selected` on the selected option</li>
</ul>

<h2>Related Components</h2>
<p>Select, Combobox, AutoComplete, Menu</p>

<h2>Responsiveness</h2>
<ul>
  <li>Fills container width; scrollable when options overflow.</li>
  <li>Touch targets meet 44×44 px minimum.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Single or multiple selection.</li>
  <li>Filterable via <code>filter={true}</code>.</li>
  <li>Option icons via <code>optionIcon</code>.</li>
  <li>Wrap with <code>&lt;FormField&gt;</code> for labels and validation.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Listbox name="color" options={colors} value={selectedColor} />`}>
  <div class="max-w-md" data-testid="listbox-basic">
    <Listbox name="color" options={colors} value={selectedColor} />
  </div>
</ExampleTabs>

<h3>Multiple Selection</h3>
<ExampleTabs code={`<Listbox name="fruits" options={fruits} multiple={true} filter={true} value={selectedFruits} />`}>
  <div class="max-w-md" data-testid="listbox-multiple">
    <Listbox name="fruits" options={['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape']} multiple={true} filter={true} value={selectedFruits} />
  </div>
</ExampleTabs>

<h3>With FormField</h3>
<ExampleTabs code={`<FormField label="Select a color" required={true}>
  <Listbox name="color-required" options={colors} required={true} />
</FormField>`}>
  <div class="max-w-md" data-testid="listbox-formfield">
    <FormField label="Select a color" required={true}>
      <Listbox name="color-required" options={colors} required={true} />
    </FormField>
  </div>
</ExampleTabs>

<h3>Disabled</h3>
<ExampleTabs code={`<Listbox name="color-disabled" options={colors} disabled={true} />`}>
  <div class="max-w-md" data-testid="listbox-disabled">
    <Listbox name="color-disabled" options={colors} disabled={true} />
  </div>
</ExampleTabs>

  <h3>With Filter</h3>
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

<h2>Props</h2>
<PropsTable component={ListboxModule} />

<h2>Events</h2>
<EventsTable component={ListboxModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses <code>role="listbox"</code> and <code>role="option"</code>.</li>
  <li><code>aria-selected</code> on selected options.</li>
  <li>Arrow keys, Home/End, type-ahead navigation.</li>
  <li>Visible focus indicators.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Down</kbd></td><td>Navigate between options</td></tr>
    <tr><td><kbd>Home</kbd> / <kbd>End</kbd></td><td>Move to first/last option</td></tr>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Select highlighted option</td></tr>
    <tr><td><kbd>Type</kbd></td><td>Jump to matching option</td></tr>
  </tbody>
</table>
</Container>
