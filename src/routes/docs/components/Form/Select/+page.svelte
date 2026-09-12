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
import { m } from "$lib/paraglide/messages.js"

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "uk", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
]

const languages = [
  {
    label: "Frontend",
    children: [
      { value: "js", label: "JavaScript" },
      { value: "ts", label: "TypeScript" },
    ],
  },
  {
    label: "Backend",
    children: [
      { value: "python", label: "Python" },
      { value: "java", label: "Java" },
    ],
  },
  {
    label: "Mobile",
    children: [
      { value: "swift", label: "Swift" },
      { value: "kotlin", label: "Kotlin" },
    ],
  },
]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.select_heading()}</h1>

<!-- ─── Description ───────────────────────────────────── -->
<p>
  <strong>{m.select_heading()}</strong>{m.select_lede_1()}
</p>

<!-- ─── What / When / Why ─────────────────────────────── -->
<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.select_what_1()}<code>&lt;select&gt;</code>{m.select_what_2()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.select_when_1()}<code>&lt;Select&gt;</code>{m.select_when_2()}<code>&lt;Combobox&gt;</code>{m.select_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.select_why_space()}</strong>{m.select_why_space_1()}</li>
  <li><strong>{m.select_why_native()}</strong>{m.select_why_native_1()}<code>&lt;select&gt;</code>{m.select_why_native_2()}</li>
  <li><strong>{m.select_why_groups()}</strong>{m.select_why_groups_1()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/">WAI-ARIA APG — Listbox</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select">MDN — &lt;select&gt;</a></li>
  <li><a href="https://primer.style/product/components/Select">Primer — Select</a></li>
  <li><a href="https://m3.material.io/components/menus/overview">Material Design 3 — Menus</a></li>
  <li><a href="https://ant.design/components/select">Ant Design — Select</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.select_impl_1()}</li>
    <li>{m.select_impl_2()}</li>
    <li>{m.select_impl_3()}</li>
    <li>{m.select_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.select_mistake_1()}</li>
    <li>{m.select_mistake_2()}</li>
    <li>{m.select_mistake_3()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.select_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.select_responsive_1()}</li>
  <li>{m.select_responsive_2()}</li>
  <li>{m.select_responsive_3()}</li>
</ul>

<!-- ─── Customization ─────────────────────────────────── -->
<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.select_custom_1_1()}<code>multiple</code>{m.select_custom_1_2()}</li>
  <li>{m.select_custom_2_1()}<code>children</code>{m.select_custom_2_2()}<code>label</code>{m.select_custom_2_3()}<code>children</code>{m.select_custom_2_4()}<code>&lt;optgroup&gt;</code>{m.select_custom_2_5()}<code>&lt;SelectGroup&gt;</code>{m.select_custom_2_6()}</li>
  <li>{m.select_custom_3_1()}<code>placeholder</code>{m.select_custom_3_2()}</li>
  <li>{m.select_custom_4()}</li>
</ul>

<!-- ─── Examples ──────────────────────────────────────── -->
<h2>{m.sec_examples()}</h2>

<h3>{m.select_ex_basic()}</h3>
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

<h3>{m.select_ex_multiple()}</h3>
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

<h3>{m.select_ex_groups()}</h3>
<ExampleTabs code={`<Select
  label="Programming Language"
  options={[
    {
      label: 'Frontend',
      children: [
        { value: 'js', label: 'JavaScript' },
        { value: 'ts', label: 'TypeScript' },
      ],
    },
    {
      label: 'Backend',
      children: [
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
      ],
    },
  ]}
  placeholder="Select a language..."
/>`}>
  <div class="max-w-md" data-testid="select-groups">
    <Select label="Programming Language" options={languages} placeholder="Select a language..." />
  </div>
</ExampleTabs>

<h3>{m.select_ex_required()}</h3>
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

<h3>{m.select_ex_error()}</h3>
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

<h3>{m.select_ex_disabled()}</h3>
<ExampleTabs code={`<Select label="Country" options={countries} value="us" disabled={true} />`}>
  <div class="max-w-md" data-testid="select-disabled">
    <Select label="Country" options={countries} value="us" disabled={true} />
  </div>
</ExampleTabs>

<!-- ─── Slots ─────────────────────────────────────────── -->
<h2>{m.sec_slots()}</h2>
<p>
  {m.select_slot_none_1()}<code>&lt;Listbox&gt;</code>{m.select_slot_none_2()}<code>&lt;Combobox&gt;</code>{m.select_slot_none_3()}
</p>

<!-- ─── Props ─────────────────────────────────────────── -->
<h2>{m.sec_props()}</h2>
<PropsTable component={SelectModule} />

<!-- ─── Events ────────────────────────────────────────── -->
<h2>{m.sec_events()}</h2>
<EventsTable component={SelectModule} />

<!-- ─── Accessibility ─────────────────────────────────── -->
<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.select_a11y_1()}</li>
  <li>{m.select_a11y_2_1()}<code>aria-required="true"</code>{m.select_a11y_2_2()}</li>
  <li>{m.select_a11y_3_1()}<code>aria-describedby</code>{m.select_a11y_3_2()}</li>
  <li>{m.select_a11y_4_1()}<code>aria-invalid="true"</code>{m.select_a11y_4_2()}</li>
  <li>{m.select_a11y_5()}</li>
</ul>

<!-- ─── Keyboard Support ──────────────────────────────── -->
<h2>{m.sec_keyboard()}</h2>
<table>
  <thead>
    <tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr>
  </thead>
  <tbody>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.select_kb_enter()}</td></tr>
    <tr><td><kbd>Arrow Up</kbd> / <kbd>Arrow Down</kbd></td><td>{m.select_kb_arrows()}</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>{m.select_kb_tab()}</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>{m.select_kb_escape()}</td></tr>
    <tr><td><kbd>Type</kbd></td><td>{m.select_kb_type()}</td></tr>
  </tbody>
</table>
</Container>
