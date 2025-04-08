<!--
@component
Documentation page for the AutoComplete component.
-->
<script>
import { AutoComplete, CodeBlock } from "$lib/index.js"
import { PropsTable, EventsTable } from "$lib/docs/index.js"

const countries = [
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "UK" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
]

const users = [
  { label: "John Doe", value: "1", avatar: "https://i.pravatar.cc/40?u=1" },
  { label: "Jane Smith", value: "2", avatar: "https://i.pravatar.cc/40?u=2" },
]
</script>

<h1>AutoComplete</h1>

<p>
  The AutoComplete component provides suggestions as you type, supporting both single and multiple
  selections. It's built on top of the base Input component and includes features like custom
  templates, keyboard navigation, and input masking.
</p>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<div class="example">
  <AutoComplete
    label="Country"
    items={countries}
    placeholder="Select a country"
  />
</div>
<CodeBlock>
  {`<AutoComplete
  label="Country"
  items={countries}
  placeholder="Select a country"
/>`}
</CodeBlock>

<h3>Multiple Selection</h3>
<div class="example">
  <AutoComplete
    label="Countries"
    items={countries}
    multiple={true}
    placeholder="Select countries"
  />
</div>
<CodeBlock>
  {`<AutoComplete
  label="Countries"
  items={countries}
  multiple={true}
  placeholder="Select countries"
/>`}
</CodeBlock>

<h3>Custom Template</h3>
<div class="example">
  <AutoComplete
    label="User"
    items={users}
    itemTemplate={{
      render: ({ item }) => `
        <div class="flex items-center gap-2">
          <img src="${item.avatar}" alt="" class="w-8 h-8 rounded-full" />
          <span>${item.label}</span>
        </div>
      `
    }}
    placeholder="Select a user"
  />
</div>
<CodeBlock>
  {`<AutoComplete
  label="User"
  items={users}
  itemTemplate={{
    render: ({ item }) => \`
      <div class="flex items-center gap-2">
        <img src="\${item.avatar}" alt="" class="w-8 h-8 rounded-full" />
        <span>\${item.label}</span>
      </div>
    \`
  }}
  placeholder="Select a user"
/>`}
</CodeBlock>

<h2>Props</h2>
<PropsTable
  props={[
    {
      name: 'label',
      type: 'string',
      description: 'Input label'
    },
    {
      name: 'items',
      type: 'Array<any>',
      default: '[]',
      description: 'Array of items to search through'
    },
    {
      name: 'labelField',
      type: 'string',
      default: 'label',
      description: 'Field to use for item labels'
    },
    {
      name: 'valueField',
      type: 'string',
      default: 'value',
      description: 'Field to use for item values'
    },
    {
      name: 'value',
      type: 'string | Array<string>',
      description: 'Selected value(s)'
    },
    {
      name: 'minLength',
      type: 'number',
      default: '1',
      description: 'Minimum characters before showing suggestions'
    },
    {
      name: 'delay',
      type: 'number',
      default: '150',
      description: 'Delay in ms before searching'
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Whether to allow multiple selections'
    },
    {
      name: 'highlight',
      type: 'boolean',
      default: 'true',
      description: 'Whether to highlight matching text'
    },
    {
      name: 'forceSelection',
      type: 'boolean',
      default: 'false',
      description: 'Whether to force selection from suggestions'
    },
    {
      name: 'maxItems',
      type: 'number',
      default: '10',
      description: 'Maximum number of suggestions to show'
    },
    {
      name: 'filter',
      type: 'function',
      description: 'Custom filter function (items, query) => filteredItems'
    },
    {
      name: 'itemTemplate',
      type: 'Component',
      description: 'Custom item template component'
    },
    {
      name: 'emptyMessage',
      type: 'string',
      default: 'No results found',
      description: 'Message to show when no results are found'
    },
    {
      name: 'loadingMessage',
      type: 'string',
      default: 'Loading...',
      description: 'Message to show when loading'
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Whether suggestions are loading'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the input is disabled'
    }
  ]}
/>

<h2>Events</h2>
<EventsTable
  events={[
    {
      name: 'select',
      type: '{ item: any } | { items: Array<any> }',
      description: 'Fired when an item is selected'
    },
    {
      name: 'remove',
      type: '{ item: any }',
      description: 'Fired when an item is removed (multiple mode)'
    },
    {
      name: 'input',
      type: '{ value: string }',
      description: 'Fired when input value changes'
    },
    {
      name: 'focus',
      type: 'void',
      description: 'Fired when input gains focus'
    },
    {
      name: 'blur',
      type: 'void',
      description: 'Fired when input loses focus'
    }
  ]}
/>

<h2>Keyboard Navigation</h2>
<p>
  The AutoComplete component supports keyboard navigation:
</p>
<ul>
  <li><code>ArrowDown</code> - Highlight next suggestion</li>
  <li><code>ArrowUp</code> - Highlight previous suggestion</li>
  <li><code>Enter</code> - Select highlighted suggestion</li>
  <li><code>Escape</code> - Close suggestions</li>
</ul>

<h2>Accessibility</h2>
<p>
  The component follows WAI-ARIA guidelines for combobox and listbox patterns:
</p>
<ul>
  <li>Proper ARIA roles and attributes for the input and suggestions list</li>
  <li>Keyboard navigation support</li>
  <li>Screen reader announcements for loading and empty states</li>
  <li>Proper focus management</li>
</ul>

<style>
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>
