<!--
@component
Select documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Select from "$lib/components/Form/Select.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SelectModule from "$lib/components/Form/Select.svelte"
import Container from "$lib/components/Container/Container.svelte"

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "uk", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
]

const languages = [
  { group: "Frontend", value: "js", label: "JavaScript" },
  { group: "Frontend", value: "ts", label: "TypeScript" },
  { group: "Backend", value: "python", label: "Python" },
  { group: "Backend", value: "java", label: "Java" },
  { group: "Mobile", value: "swift", label: "Swift" },
  { group: "Mobile", value: "kotlin", label: "Kotlin" },
]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>Select</h1>

<!-- ─── Description ───────────────────────────────────── -->
<p>
  <strong>Select</strong> is a dropdown form control for choosing one or more options
  from a predefined list. It supports option groups, search/filter functionality,
  keyboard navigation, and full form integration.
</p>

<!-- ─── What / When / Why ─────────────────────────────── -->
<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A dropdown menu that presents a list of options and allows the user to select one
  (or multiple). Wraps the native <code>&lt;select&gt;</code> or implements a custom
  listbox with enhanced styling and behavior.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Select&gt;</code> when the user must choose from 5+ predefined options.
  For fewer options (2–4), prefer radio buttons — all options are visible and scannable.
  For type-ahead filtering, use <code>&lt;Combobox&gt;</code> instead.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Space efficiency</strong> — collapses many options into a single-line control.</li>
  <li><strong>Native semantics</strong> — the underlying <code>&lt;select&gt;</code>
    provides keyboard navigation, screen reader support, and form participation.</li>
  <li><strong>Option groups</strong> — organizes long lists with visual group headers.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/">WAI-ARIA APG — Listbox</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select">MDN — &lt;select&gt;</a></li>
  <li><a href="https://primer.style/product/components/Select">Primer — Select</a></li>
  <li><a href="https://m3.material.io/components/menus/overview">Material Design 3 — Menus</a></li>
  <li><a href="https://ant.design/components/select">Ant Design — Select</a></li>
</ul>

<!-- ─── Responsiveness ────────────────────────────────── -->
<h2>Responsiveness</h2>
<ul>
  <li>The select fills its container width by default (<code>w-full</code>).</li>
  <li>On mobile, native select picker is used for the best platform experience.</li>
  <li>Touch targets meet 44×44 px minimum for mobile tap areas.</li>
</ul>

<!-- ─── Customization ─────────────────────────────────── -->
<h2>Customization</h2>
<ul>
  <li>Single or multiple selection via the <code>multiple</code> prop.</li>
  <li>Option groups via the <code>group</code> property on option objects.</li>
  <li>Custom placeholder text via the <code>placeholder</code> prop.</li>
  <li>Theme colors and borders are controlled by the Tailwind theme.</li>
</ul>

<!-- ─── Examples ──────────────────────────────────────── -->
<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' }
  ]}
  placeholder="Select a country..."
/>`}>
  <div class="max-w-md" data-testid="select-basic">
    <Select label="Country" options={countries} placeholder="Select a country..." />
  </div>
</ExampleTabs>

<h3>Multiple Selection</h3>
<ExampleTabs code={`<Select
  label="Programming Languages"
  options={languages}
  multiple={true}
  placeholder="Select languages..."
/>`}>
  <div class="max-w-md" data-testid="select-multiple">
    <Select label="Programming Languages" options={languages} multiple={true} placeholder="Select languages..." />
  </div>
</ExampleTabs>

<h3>Option Groups</h3>
<ExampleTabs code={`<Select
  label="Programming Language"
  options={[
    { group: 'Frontend', value: 'js', label: 'JavaScript' },
    { group: 'Backend', value: 'python', label: 'Python' }
  ]}
  placeholder="Select a language..."
/>`}>
  <div class="max-w-md" data-testid="select-groups">
    <Select label="Programming Language" options={languages} placeholder="Select a language..." />
  </div>
</ExampleTabs>

<h3>Required Field</h3>
<ExampleTabs code={`<Select
  label="Country"
  options={countries}
  required={true}
  placeholder="Select a country..."
/>`}>
  <div class="max-w-md" data-testid="select-required">
    <Select label="Country" options={countries} required={true} placeholder="Select a country..." />
  </div>
</ExampleTabs>

<h3>Error State</h3>
<ExampleTabs code={`<Select
  label="Country"
  options={countries}
  error="Please select a country"
  required={true}
/>`}>
  <div class="max-w-md" data-testid="select-error">
    <Select label="Country" options={countries} error="Please select a country" required={true} />
  </div>
</ExampleTabs>

<h3>Disabled</h3>
<ExampleTabs code={`<Select label="Country" options={countries} value="us" disabled={true} />`}>
  <div class="max-w-md" data-testid="select-disabled">
    <Select label="Country" options={countries} value="us" disabled={true} />
  </div>
</ExampleTabs>

<!-- ─── Slots ─────────────────────────────────────────── -->
<h2>Slots</h2>
<p>
  The Select component does not expose named slots. Use props for customization.
  For custom option rendering, use <code>&lt;Listbox&gt;</code> or
  <code>&lt;Combobox&gt;</code>.
</p>

<!-- ─── Props ─────────────────────────────────────────── -->
<h2>Props</h2>
<PropsTable component={SelectModule} />

<!-- ─── Events ────────────────────────────────────────── -->
<h2>Events</h2>
<EventsTable component={SelectModule} />

<!-- ─── Accessibility ─────────────────────────────────── -->
<h2>Accessibility</h2>
<ul>
  <li>Uses WAI-ARIA combobox and listbox roles with proper attributes.</li>
  <li>Required fields use <code>aria-required="true"</code> and visual indicators.</li>
  <li>Error messages are linked via <code>aria-describedby</code>.</li>
  <li>Invalid states use <code>aria-invalid="true"</code>.</li>
  <li>Full keyboard navigation: arrow keys, Enter/Space, Escape, type-ahead.</li>
</ul>

<!-- ─── Keyboard Support ──────────────────────────────── -->
<h2>Keyboard Support</h2>
<table>
  <thead>
    <tr><th>Key</th><th>Function</th></tr>
  </thead>
  <tbody>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Open/close dropdown and select focused option</td></tr>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Down</kbd></td><td>Navigate through options</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>Move focus to next control</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>Close dropdown without selecting</td></tr>
    <tr><td><kbd>Type</kbd></td><td>Search through options when dropdown is open</td></tr>
  </tbody>
</table>
</Container>
