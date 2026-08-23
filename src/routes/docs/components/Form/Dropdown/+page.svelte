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
<h1>Dropdown</h1>

<p>
  <strong>Dropdown</strong> is a menu-based selection component for choosing one or
  multiple options from a list. It supports icons, option groups, cascading submenus,
  filtering, and keyboard navigation.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A button that opens a menu of options when clicked. Different from Select in that
  it's primarily designed for actions and rich option content (icons, nested groups)
  rather than plain value selection.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Dropdown&gt;</code> for action menus (edit, delete, share) or for
  option selection with rich content (icons, descriptions). For simple value
  selection, prefer <code>&lt;Select&gt;</code>. For type-ahead filtering, use
  <code>&lt;Combobox&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Rich content</strong> — options can include icons, descriptions, and nested groups.</li>
  <li><strong>Space efficient</strong> — collapses many options into a single button.</li>
  <li><strong>Popover API</strong> — uses <code>popover="auto"</code> for top-layer rendering, light-dismiss, and zero-JS open/close.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/">WAI-ARIA APG — Menu Button</a></li>
  <li><a href="https://primer.style/product/components/ActionMenu">Primer — ActionMenu</a></li>
  <li><a href="https://m3.material.io/components/menus/overview">Material Design 3 — Menus</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Fills container width by default.</li>
  <li>On mobile, the dropdown opens as a full-width overlay.</li>
  <li>Touch targets meet 44×44 px minimum.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Single or multiple selection.</li>
  <li>Option icons, descriptions, and nested children.</li>
  <li>Filterable options via <code>filter={true}</code>.</li>
  <li>Clearable selection.</li>
  <li>Sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Dropdown
  options={['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']}
  placeholder="Select a city"
/>`}>
  <div class="max-w-md" data-testid="dropdown-basic">
    <Dropdown options={['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']} placeholder="Select a city" />
  </div>
</ExampleTabs>

<h3>With Object Options</h3>
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

<h3>Multiple Selection</h3>
<ExampleTabs code={`<Dropdown options={skills} placeholder="Select skills" multiple={true} />`}>
  <div class="max-w-md" data-testid="dropdown-multiple">
    <Dropdown options={skills} placeholder="Select skills" multiple={true} />
  </div>
</ExampleTabs>

<h3>With Filtering</h3>
<ExampleTabs code={`<Dropdown options={skills} placeholder="Search and select skills" filter={true} />`}>
  <div class="max-w-md" data-testid="dropdown-filter">
    <Dropdown options={skills} placeholder="Search and select skills" filter={true} />
  </div>
</ExampleTabs>

<h3>Clearable</h3>
<ExampleTabs code={`<Dropdown options={countries} placeholder="Select a country" clearable={true} />`}>
  <div class="max-w-md" data-testid="dropdown-clearable">
    <Dropdown options={countries} placeholder="Select a country" clearable={true} />
  </div>
</ExampleTabs>

<h3>Disabled</h3>
<ExampleTabs code={`<Dropdown options={countries} placeholder="Select a country" disabled={true} />`}>
  <div class="max-w-md" data-testid="dropdown-disabled">
    <Dropdown options={countries} placeholder="Select a country" disabled={true} />
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={DropdownModule} />

<h2>Events</h2>
<EventsTable component={DropdownModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses WAI-ARIA combobox/listbox roles.</li>
  <li>Arrow keys navigate options; Enter/Space selects; Escape closes.</li>
  <li>Focus is managed within the dropdown when open.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Open/close and select option</td></tr>
    <tr><td><kbd>Arrow Down</kbd></td><td>Open or move to next option</td></tr>
    <tr><td><kbd>Arrow Up</kbd></td><td>Move to previous option</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>Close dropdown</td></tr>
    <tr><td><kbd>Home</kbd> / <kbd>End</kbd></td><td>Move to first/last option</td></tr>
  </tbody>
</table>
</Container>
