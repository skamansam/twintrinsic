<!--
@component
Documentation page for the Select component.
-->
<script>
import { Select, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"

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
<div class="example">
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
<div class="example">
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
<div class="example">
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
<div class="example">
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
<div class="example">
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
<div class="example">
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
<PropsTable
  props={[
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Input label'
    },
    {
      name: 'options',
      type: 'Array<{ value: string, label: string, group?: string }>',
      default: '[]',
      description: 'Options to display in the dropdown'
    },
    {
      name: 'value',
      type: 'string | string[]',
      default: "''",
      description: 'Selected value(s)'
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Whether multiple selection is allowed'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "'Select...'",
      description: 'Placeholder text when no option is selected'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the select is disabled'
    },
    {
      name: 'error',
      type: 'string',
      default: "''",
      description: 'Error message'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the field is required'
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes'
    }
  ]}
/>

<h2>Events</h2>
<EventsTable
  events={[
    {
      name: 'change',
      type: '{ value: string | string[] }',
      description: 'Fired when selection changes'
    }
  ]}
/>

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

<style>
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>
