<!--
@component
Documentation page for the AutoComplete component.
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import AutoComplete from "$lib/components/Form/AutoComplete.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AutoCompleteModule from "$lib/components/Form/AutoComplete.svelte"

const countries = [
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "UK" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
]

const users = [
  { label: "Sarah Chen", value: "1", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces" },
  { label: "Marcus Webb", value: "2", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces" },
  { label: "Priya Patel", value: "3", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces" },
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
<div class="example" data-testid="autocomplete-basic">
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
<div class="example" data-testid="autocomplete-multiple">
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
<div class="example" data-testid="autocomplete-custom-template">
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
<PropsTable component={AutoCompleteModule} />

<h2>Events</h2>
<EventsTable component={AutoCompleteModule} />

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

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  .example {
    @apply my-4 p-4 border border-border rounded-md;
    @apply flex flex-col gap-4 max-w-md;
  }
</style>
