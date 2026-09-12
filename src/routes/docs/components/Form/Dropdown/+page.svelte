<!--
@component
Dropdown documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Dropdown from "$lib/components/Form/Dropdown.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as DropdownModule from "$lib/components/Form/Dropdown.svelte"
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"

const countries = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
]

const skills = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Svelte", value: "svelte" },
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.dropdown_heading()}</h1>

<p>
  <strong>{m.dropdown_heading()}</strong>{m.dropdown_lede_1()}
</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.dropdown_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.dropdown_when_1()}<code>&lt;Dropdown&gt;</code>{m.dropdown_when_2()}<code>&lt;Select&gt;</code>{m.dropdown_when_3()}<code>&lt;Combobox&gt;</code>{m.dropdown_when_4()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.dropdown_why_rich()}</strong>{m.dropdown_why_rich_1()}</li>
  <li><strong>{m.dropdown_why_space()}</strong>{m.dropdown_why_space_1()}</li>
  <li><strong>{m.dropdown_why_popover()}</strong>{m.dropdown_why_popover_1()}<code>popover="auto"</code>{m.dropdown_why_popover_2()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/">WAI-ARIA APG — Menu Button</a></li>
  <li><a href="https://primer.style/product/components/ActionMenu">Primer — ActionMenu</a></li>
  <li><a href="https://m3.material.io/components/menus/overview">Material Design 3 — Menus</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.dropdown_impl_1()}</li>
    <li>{m.dropdown_impl_2()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.dropdown_mistake_1()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.dropdown_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.dropdown_responsive_1()}</li>
  <li>{m.dropdown_responsive_2()}</li>
  <li>{m.dropdown_responsive_3()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.dropdown_custom_1()}</li>
  <li>{m.dropdown_custom_2()}</li>
  <li>{m.dropdown_custom_3_1()}<code>filter={true}</code>{m.dropdown_custom_3_2()}</li>
  <li>{m.dropdown_custom_4()}</li>
  <li>{m.dropdown_custom_5_1()}<code>sm</code>, <code>md</code>, <code>lg</code>{m.dropdown_custom_5_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.dropdown_ex_basic()}</h3>
<ExampleTabs code={`<Dropdown
  options={['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']}
  placeholder="Select a city"
/>`}>
  <div class="max-w-md" data-testid="dropdown-basic">
    <Dropdown options={['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']} placeholder="Select a city" />
  </div>
</ExampleTabs>

<h3>{m.dropdown_ex_object()}</h3>
<ExampleTabs code={`const countries = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' }
]

<Dropdown options={countries} placeholder="Select a country" />`}>
  <div class="max-w-md" data-testid="dropdown-object">
    <Dropdown options={countries} placeholder="Select a country" />
  </div>
</ExampleTabs>

<h3>{m.dropdown_ex_multiple()}</h3>
<ExampleTabs code={`<Dropdown options={skills} placeholder="Select skills" multiple={true} />`}>
  <div class="max-w-md" data-testid="dropdown-multiple">
    <Dropdown options={skills} placeholder="Select skills" multiple={true} />
  </div>
</ExampleTabs>

<h3>{m.dropdown_ex_filter()}</h3>
<ExampleTabs code={`<Dropdown options={skills} placeholder="Search and select skills" filter={true} />`}>
  <div class="max-w-md" data-testid="dropdown-filter">
    <Dropdown options={skills} placeholder="Search and select skills" filter={true} />
  </div>
</ExampleTabs>

<h3>{m.dropdown_ex_clearable()}</h3>
<ExampleTabs code={`<Dropdown options={countries} placeholder="Select a country" clearable={true} />`}>
  <div class="max-w-md" data-testid="dropdown-clearable">
    <Dropdown options={countries} placeholder="Select a country" clearable={true} />
  </div>
</ExampleTabs>

<h3>{m.dropdown_ex_disabled()}</h3>
<ExampleTabs code={`<Dropdown options={countries} placeholder="Select a country" disabled={true} />`}>
  <div class="max-w-md" data-testid="dropdown-disabled">
    <Dropdown options={countries} placeholder="Select a country" disabled={true} />
  </div>
</ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={DropdownModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={DropdownModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.dropdown_a11y_1()}</li>
  <li>{m.dropdown_a11y_2()}</li>
  <li>{m.dropdown_a11y_3()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.dropdown_kb_enter()}</td></tr>
    <tr><td><kbd>Arrow Down</kbd></td><td>{m.dropdown_kb_down()}</td></tr>
    <tr><td><kbd>Arrow Up</kbd></td><td>{m.dropdown_kb_up()}</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>{m.dropdown_kb_escape()}</td></tr>
    <tr><td><kbd>Home</kbd> / <kbd>End</kbd></td><td>{m.dropdown_kb_home()}</td></tr>
  </tbody>
</table>
</Container>
