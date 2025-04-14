<!--
@component
Documentation page for the Listbox component.
-->
<script>
import { Listbox, FormField, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"

// Sample data for examples
const colors = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Purple', value: 'purple' }
]

const users = [
  { name: 'Alice Johnson', id: 1, icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>' },
  { name: 'Bob Smith', id: 2, icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>' },
  { name: 'Carol Williams', id: 3, icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>' },
  { name: 'Dave Brown', id: 4, icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>' },
  { name: 'Eve Davis', id: 5, icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>' }
]

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange']

// Selected values for examples
let selectedColor = 'blue'
let selectedUsers = [1, 3]
let selectedFruits = ['Apple', 'Grape']
</script>

<h1>Listbox</h1>

<p>
  The Listbox component provides a dropdown-style selection interface for choosing one or multiple options from a list.
  It supports keyboard navigation, filtering, and customization of option display.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <Listbox 
    name="color" 
    options={colors} 
    value={selectedColor}
  />
</div>
<CodeBlock>
  {`<script>
  const colors = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Purple', value: 'purple' }
  ]
  
  let selectedColor = 'blue'
</script>

<Listbox 
  name="color" 
  options={colors} 
  value={selectedColor}
/>`}
</CodeBlock>

<h3>Multiple Selection</h3>
<div class="example">
  <Listbox 
    name="users" 
    options={users} 
    optionLabel="name"
    optionValue="id"
    multiple={true}
    value={selectedUsers}
  />
</div>
<CodeBlock>
  {`<script>
  const users = [
    { name: 'Alice Johnson', id: 1 },
    { name: 'Bob Smith', id: 2 },
    { name: 'Carol Williams', id: 3 },
    { name: 'Dave Brown', id: 4 },
    { name: 'Eve Davis', id: 5 }
  ]
  
  let selectedUsers = [1, 3]
</script>

<Listbox 
  name="users" 
  options={users} 
  optionLabel="name"
  optionValue="id"
  multiple={true}
  value={selectedUsers}
/>`}
</CodeBlock>

<h3>With Filtering</h3>
<div class="example">
  <Listbox 
    name="fruits" 
    options={fruits} 
    multiple={true}
    filter={true}
    filterPlaceholder="Search fruits..."
    value={selectedFruits}
  />
</div>
<CodeBlock>
  {`<script>
  const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange']
  
  let selectedFruits = ['Apple', 'Grape']
</script>

<Listbox 
  name="fruits" 
  options={fruits} 
  multiple={true}
  filter={true}
  filterPlaceholder="Search fruits..."
  value={selectedFruits}
/>`}
</CodeBlock>

<h3>With Icons</h3>
<div class="example">
  <Listbox 
    name="users-with-icons" 
    options={users} 
    optionLabel="name"
    optionValue="id"
    optionIcon="icon"
  />
</div>
<CodeBlock>
  {`<script>
  const users = [
    { 
      name: 'Alice Johnson', 
      id: 1, 
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>' 
    },
    // Other users...
  ]
</script>

<Listbox 
  name="users-with-icons" 
  options={users} 
  optionLabel="name"
  optionValue="id"
  optionIcon="icon"
/>`}
</CodeBlock>

<h3>With Form Field</h3>
<div class="example">
  <FormField label="Select a color" required={true}>
    <Listbox 
      name="color-required" 
      options={colors} 
      required={true}
    />
  </FormField>
</div>
<CodeBlock>
  {`<FormField label="Select a color" required={true}>
  <Listbox 
    name="color-required" 
    options={colors} 
    required={true}
  />
</FormField>`}
</CodeBlock>

<h3>Disabled State</h3>
<div class="example">
  <Listbox 
    name="color-disabled" 
    options={colors} 
    disabled={true}
  />
</div>
<CodeBlock>
  {`<Listbox 
  name="color-disabled" 
  options={colors} 
  disabled={true}
/>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'name',
      type: 'string',
      description: 'Input name for form submission'
    },
    {
      name: 'options',
      type: 'Array',
      default: '[]',
      description: 'Array of options to display'
    },
    {
      name: 'value',
      type: 'any',
      description: 'Selected value(s)'
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
      description: 'Property name for option label when options are objects'
    },
    {
      name: 'optionValue',
      type: 'string',
      default: "'value'",
      description: 'Property name for option value when options are objects'
    },
    {
      name: 'optionIcon',
      type: 'string',
      description: 'Property name for option icon when options are objects'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the listbox is disabled'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the listbox is required'
    },
    {
      name: 'filter',
      type: 'boolean',
      default: 'false',
      description: 'Whether to enable filtering options by typing'
    },
    {
      name: 'filterPlaceholder',
      type: 'string',
      default: "'Search...'",
      description: 'Placeholder text for the filter input'
    },
    {
      name: 'maxHeight',
      type: 'number',
      default: '300',
      description: 'Maximum height of the listbox in pixels'
    },
    {
      name: 'showCheckbox',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show checkboxes for multiple selection'
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
      description: 'Fired when the selection changes'
    }
  ]}
/>

<h2>Accessibility</h2>
<p>
  The Listbox component follows accessibility best practices:
</p>
<ul>
  <li>Uses <code>role="listbox"</code> and <code>role="option"</code> for proper semantics</li>
  <li>Supports keyboard navigation with arrow keys, Home, End, and type-ahead functionality</li>
  <li>Includes <code>aria-selected</code> attributes to indicate selected options</li>
  <li>Provides proper focus management and visible focus indicators</li>
  <li>Supports ARIA labels for better screen reader announcements</li>
  <li>Includes proper disabled states with visual indicators</li>
</ul>

<h2>Keyboard Interaction</h2>
<ul>
  <li><code>Tab</code> - Move focus to the listbox</li>
  <li><code>Arrow Up/Down</code> - Navigate between options</li>
  <li><code>Home</code> - Move to the first option</li>
  <li><code>End</code> - Move to the last option</li>
  <li><code>Enter/Space</code> - Select the highlighted option</li>
  <li><code>Type characters</code> - Jump to options starting with typed characters (when filter is disabled)</li>
</ul>

<h2>Form Integration</h2>
<p>
  The Listbox component integrates with the Form component for validation and submission:
</p>
<CodeBlock>
  {`<Form onSubmit={handleSubmit}>
  <FormField label="Select categories">
    <Listbox 
      name="categories" 
      options={categories} 
      multiple={true}
      required={true}
    />
  </FormField>
  
  <Button type="submit">Save</Button>
</Form>`}
</CodeBlock>

<style>
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>
