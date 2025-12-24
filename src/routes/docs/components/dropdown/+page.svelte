<!--
@component
Documentation page for the Dropdown component.
-->
<script lang="ts">
import { Dropdown, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"

// Sample data for examples
const countries = [
  {
    label: "United States",
    value: "us",
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
  },
  {
    label: "United Kingdom",
    value: "uk",
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
  },
  {
    label: "Canada",
    value: "ca",
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
  },
]

const skills = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Svelte", value: "svelte" },
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
]

const categories = [
  {
    name: "Frontend",
    id: "frontend",
    items: [
      { name: "HTML", id: "html" },
      { name: "CSS", id: "css" },
      { name: "JavaScript", id: "js" },
    ],
  },
  {
    name: "Backend",
    id: "backend",
    items: [
      { name: "Node.js", id: "node" },
      { name: "Python", id: "python" },
      { name: "Java", id: "java" },
    ],
  },
]
</script>

<h1>Dropdown</h1>

<p>
  The Dropdown component provides a way to select one or multiple options from a dropdown menu.
  It supports icons, option groups, cascading menus, filtering, and keyboard navigation.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <Dropdown 
    options={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
    placeholder="Select a fruit"
  />
</div>
<CodeBlock>
  {`<Dropdown 
  options={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
  placeholder="Select a fruit"
/>`}
</CodeBlock>

<h3>With Object Options</h3>
<div class="example">
  <Dropdown 
    options={countries}
    placeholder="Select a country"
  />
</div>
<CodeBlock>
  {`const countries = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' }
]

<Dropdown 
  options={countries}
  placeholder="Select a country"
/>`}
</CodeBlock>

<h3>Multiple Selection</h3>
<div class="example">
  <Dropdown 
    options={skills}
    placeholder="Select skills"
    multiple={true}
  />
</div>
<CodeBlock>
  {`const skills = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' }
]

<Dropdown 
  options={skills}
  placeholder="Select skills"
  multiple={true}
/>`}
</CodeBlock>

<h3>With Icons</h3>
<div class="example">
  <Dropdown 
    options={countries}
    placeholder="Select a country"
    optionIcon="icon"
  />
</div>
<CodeBlock>
  {`const countries = [
  { 
    label: 'United States', 
    value: 'us', 
    icon: '<svg>...</svg>' 
  },
  { 
    label: 'United Kingdom', 
    value: 'uk', 
    icon: '<svg>...</svg>' 
  },
  { 
    label: 'Canada', 
    value: 'ca', 
    icon: '<svg>...</svg>' 
  }
]

<Dropdown 
  options={countries}
  placeholder="Select a country"
  optionIcon="icon"
/>`}
</CodeBlock>

<h3>Cascading Dropdown</h3>
<div class="example">
  <Dropdown 
    options={categories}
    placeholder="Select a category"
    optionLabel="name"
    optionValue="id"
    optionChildren="items"
  />
</div>
<CodeBlock>
  {`const categories = [
  { 
    name: 'Frontend', 
    id: 'frontend',
    items: [
      { name: 'HTML', id: 'html' },
      { name: 'CSS', id: 'css' },
      { name: 'JavaScript', id: 'js' }
    ]
  },
  { 
    name: 'Backend', 
    id: 'backend',
    items: [
      { name: 'Node.js', id: 'node' },
      { name: 'Python', id: 'python' },
      { name: 'Java', id: 'java' }
    ]
  }
]

<Dropdown 
  options={categories}
  placeholder="Select a category"
  optionLabel="name"
  optionValue="id"
  optionChildren="items"
/>`}
</CodeBlock>

<h3>With Filtering</h3>
<div class="example">
  <Dropdown 
    options={skills}
    placeholder="Search and select skills"
    filter={true}
  />
</div>
<CodeBlock>
  {`<Dropdown 
  options={skills}
  placeholder="Search and select skills"
  filter={true}
/>`}
</CodeBlock>

<h3>Different Sizes</h3>
<div class="example">
  <div class="flex flex-col gap-4">
    <Dropdown 
      options={['Small', 'Medium', 'Large']}
      placeholder="Small"
      size="sm"
    />
    <Dropdown 
      options={['Small', 'Medium', 'Large']}
      placeholder="Medium"
      size="md"
    />
    <Dropdown 
      options={['Small', 'Medium', 'Large']}
      placeholder="Large"
      size="lg"
    />
  </div>
</div>
<CodeBlock>
  {`<Dropdown 
  options={['Small', 'Medium', 'Large']}
  placeholder="Small"
  size="sm"
/>
<Dropdown 
  options={['Small', 'Medium', 'Large']}
  placeholder="Medium"
  size="md"
/>
<Dropdown 
  options={['Small', 'Medium', 'Large']}
  placeholder="Large"
  size="lg"
/>`}
</CodeBlock>

<h3>Clearable</h3>
<div class="example">
  <Dropdown 
    options={countries}
    placeholder="Select a country"
    clearable={true}
  />
</div>
<CodeBlock>
  {`<Dropdown 
  options={countries}
  placeholder="Select a country"
  clearable={true}
/>`}
</CodeBlock>

<h3>Disabled State</h3>
<div class="example">
  <Dropdown 
    options={countries}
    placeholder="Select a country"
    disabled={true}
  />
</div>
<CodeBlock>
  {`<Dropdown 
  options={countries}
  placeholder="Select a country"
  disabled={true}
/>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'options',
      type: 'Array',
      default: '[]',
      description: 'Options to display in the dropdown'
    },
    {
      name: 'value',
      type: 'any',
      description: 'Selected value(s)'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "'Select an option'",
      description: 'Placeholder text when no option is selected'
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Whether multiple selection is allowed'
    },
    {
      name: 'optionLabel',
      type: 'string',
      default: "'label'",
      description: 'Property name for option label when using object options'
    },
    {
      name: 'optionValue',
      type: 'string',
      default: "'value'",
      description: 'Property name for option value when using object options'
    },
    {
      name: 'optionIcon',
      type: 'string',
      description: 'Property name for option icon when using object options'
    },
    {
      name: 'optionChildren',
      type: 'string',
      default: "'items'",
      description: 'Property name for option children (for cascading dropdowns)'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the dropdown is disabled'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the dropdown is required'
    },
    {
      name: 'filter',
      type: 'boolean',
      default: 'false',
      description: 'Whether to enable filtering options by typing'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size of the dropdown'
    },
    {
      name: 'clearable',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show a clear button'
    },
    {
      name: 'name',
      type: 'string',
      description: 'Name attribute for form submission'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label for accessibility'
    },
    {
      name: 'id',
      type: 'string',
      default: 'auto-generated',
      description: 'HTML id for accessibility'
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
      type: '{ value: any }',
      description: 'Fired when the selected value changes'
    },
    {
      name: 'clear',
      type: 'Event',
      description: 'Fired when the selection is cleared'
    }
  ]}
/>

<h2>Accessibility</h2>
<p>
  The Dropdown component follows WAI-ARIA guidelines for combobox and listbox elements:
</p>
<ul>
  <li>Uses appropriate ARIA roles (<code>combobox</code>, <code>listbox</code>, <code>option</code>)</li>
  <li>Provides proper keyboard navigation</li>
  <li>Manages focus appropriately</li>
  <li>Includes proper ARIA attributes for expanded state and selection</li>
  <li>Supports screen readers with appropriate labels and descriptions</li>
</ul>

<h2>Keyboard Interaction</h2>
<ul>
  <li><code>Space</code> or <code>Enter</code> - Open/close dropdown and select highlighted option</li>
  <li><code>ArrowDown</code> - Open dropdown or move to next option</li>
  <li><code>ArrowUp</code> - Move to previous option</li>
  <li><code>ArrowRight</code> - Open submenu (for cascading dropdowns)</li>
  <li><code>ArrowLeft</code> - Close submenu (for cascading dropdowns)</li>
  <li><code>Escape</code> - Close dropdown</li>
  <li><code>Tab</code> - Move focus away from dropdown</li>
  <li><code>Home</code> - Move to first option</li>
  <li><code>End</code> - Move to last option</li>
</ul>

<style>
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>
