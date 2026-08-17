<!--
@component
Documentation page for the Select component.
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Select from "$lib/components/Form/Select.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SelectModule from "$lib/components/Form/Select.svelte"

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
    group: "Frontend",
    value: "js",
    label: "JavaScript",
  },
  {
    group: "Frontend",
    value: "ts",
    label: "TypeScript",
  },
  {
    group: "Backend",
    value: "python",
    label: "Python",
  },
  {
    group: "Backend",
    value: "java",
    label: "Java",
  },
  {
    group: "Mobile",
    value: "swift",
    label: "Swift",
  },
  {
    group: "Mobile",
    value: "kotlin",
    label: "Kotlin",
  },
]
</script>

<h1>Select</h1>

<p>
  The Select component provides a dropdown interface for selecting one or multiple
  options from a list. It supports option groups, search functionality, and keyboard
  navigation.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example" data-testid="select-basic">
  <Select
    label="Country"
    options={countries}
    placeholder="Select a country..."
  />
</div>
<CodeBlock>
  {`<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' }
  ]}
  placeholder="Select a country..."
/>`}
</CodeBlock>

<h3>Multiple Selection</h3>
<div class="example" data-testid="select-multiple">
  <Select
    label="Programming Languages"
    options={languages}
    multiple={true}
    placeholder="Select languages..."
  />
</div>
<CodeBlock>
  {`<Select
  label="Programming Languages"
  options={languages}
  multiple={true}
  placeholder="Select languages..."
/>`}
</CodeBlock>

<h3>Option Groups</h3>
<div class="example" data-testid="select-groups">
  <Select
    label="Programming Language"
    options={languages}
    placeholder="Select a language..."
  />
</div>
<CodeBlock>
  {`<Select
  label="Programming Language"
  options={[
    {
      group: 'Frontend',
      value: 'js',
      label: 'JavaScript'
    },
    {
      group: 'Backend',
      value: 'python',
      label: 'Python'
    }
  ]}
  placeholder="Select a language..."
/>`}
</CodeBlock>

<h3>Required Field</h3>
<div class="example" data-testid="select-required">
  <Select
    label="Country"
    options={countries}
    required={true}
    placeholder="Select a country..."
  />
</div>
<CodeBlock>
  {`<Select
  label="Country"
  options={countries}
  required={true}
  placeholder="Select a country..."
/>`}
</CodeBlock>

<h3>With Error</h3>
<div class="example" data-testid="select-error">
  <Select
    label="Country"
    options={countries}
    error="Please select a country"
    required={true}
  />
</div>
<CodeBlock>
  {`<Select
  label="Country"
  options={countries}
  error="Please select a country"
  required={true}
/>`}
</CodeBlock>

<h3>Disabled State</h3>
<div class="example" data-testid="select-disabled">
  <Select
    label="Country"
    options={countries}
    value="us"
    disabled={true}
  />
</div>
<CodeBlock>
  {`<Select
  label="Country"
  options={countries}
  value="us"
  disabled={true}
/>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable component={SelectModule} />

<h2>Events</h2>
<EventsTable component={SelectModule} />

<h2>Accessibility</h2>
<p>
  The Select component follows WAI-ARIA guidelines for comboboxes and listboxes:
</p>
<ul>
  <li>Proper ARIA roles and attributes for combobox and listbox</li>
  <li>Support for required fields with visual and ARIA indicators</li>
  <li>Error messages are linked using <code>aria-describedby</code></li>
  <li>Invalid states are indicated with <code>aria-invalid</code></li>
  <li>Proper focus management and keyboard interaction</li>
  <li>Support for screen readers with ARIA labels</li>
  <li>Clear visual feedback for selected and focused options</li>
</ul>

<h2>Keyboard Interaction</h2>
<ul>
  <li><code>Enter</code> or <code>Space</code> - Open/close dropdown and select focused option</li>
  <li><code>Arrow Up/Down</code> - Navigate through options</li>
  <li><code>Tab</code> - Move focus to next control</li>
  <li><code>Escape</code> - Close dropdown</li>
  <li><code>Type</code> - Search through options (when dropdown is open)</li>
</ul>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>
