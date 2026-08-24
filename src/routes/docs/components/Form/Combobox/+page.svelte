<!--
@component
Combobox documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Combobox from "$lib/components/Form/Combobox.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ComboboxModule from "$lib/components/Form/Combobox.svelte"

const cities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
  "Philadelphia", "San Antonio", "San Diego",
]

const countries = [
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "France", code: "FR", flag: "🇫🇷" },
]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Combobox</h1>

  <p>
    <strong>Combobox</strong> combines a text input with a dropdown list, providing
    autocomplete functionality. Users type to filter suggestions, then select from
    the filtered list. Uses <code>popover="auto"</code> for the dropdown panel with
    CSS Anchor Positioning for tethering.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    An editable text input with an associated popup that filters options as the user
    types. The popup uses the Popover API for top-layer rendering and light-dismiss.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Combobox&gt;</code> when users need to filter a large dataset while
    typing (country selector, search with suggestions). For simple dropdown selection
    without typing, use <code>&lt;Select&gt;</code>. For action menus, use
    <code>&lt;Dropdown&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Type-ahead filtering</strong> — narrows options as the user types, faster than scrolling.</li>
    <li><strong>Rich options</strong> — options can include icons, flags, descriptions.</li>
    <li><strong>Popover API</strong> — light-dismiss, top-layer, and CSS Anchor Positioning with zero JS.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/">WAI-ARIA APG — Combobox</a></li>
    <li><a href="https://primer.style/product/components/Autocomplete">Primer — Autocomplete</a></li>
    <li><a href="https://m3.material.io/components/menus/overview">Material Design 3 — Exposed dropdown</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Fills container width; the dropdown matches the input width via <code>anchor-size()</code>.</li>
    <li>On mobile, the dropdown opens as a full-width overlay.</li>
    <li>Touch targets meet 44×44 px minimum.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Custom option templates via the <code>optionTemplate</code> snippet.</li>
    <li>Object data with <code>optionLabel</code> and <code>optionValue</code> props.</li>
    <li>Loading state for async data.</li>
    <li>Disabled and required states.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Combobox</h3>
  <ExampleTabs code={`<Combobox
  options={['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']}
  placeholder="Select a city"
/>`}>
    <div class="max-w-md" data-testid="combobox-basic">
      <Combobox options={cities} placeholder="Select a city" />
    </div>
  </ExampleTabs>

  <h3>With Object Data</h3>
  <ExampleTabs code={`<Combobox
  options={countries}
  optionLabel="name"
  optionValue="code"
  placeholder="Select a country"
/>`}>
    <div class="max-w-md" data-testid="combobox-object">
      <Combobox options={countries} optionLabel="name" optionValue="code" placeholder="Select a country" />
    </div>
  </ExampleTabs>

  <h3>Custom Option Template</h3>
  <ExampleTabs code={`<Combobox options={countries} optionLabel="name" optionValue="code" placeholder="Select a country">
  {#snippet optionTemplate(option)}
    <div class="flex items-center">
      <span class="mr-2 text-lg">{option.flag}</span>
      <span>{option.name}</span>
      <span class="ml-2 text-xs text-muted">({option.code})</span>
    </div>
  {/snippet}
</Combobox>`}>
    <div class="max-w-md" data-testid="combobox-template">
      <Combobox options={countries} optionLabel="name" optionValue="code" placeholder="Select a country">
        {#snippet optionTemplate(option: { flag: string; name: string; code: string })}
          <div class="flex items-center">
            <span class="mr-2 text-lg">{option.flag}</span>
            <span>{option.name}</span>
            <span class="ml-2 text-xs text-muted">({option.code})</span>
          </div>
        {/snippet}
      </Combobox>
    </div>
  </ExampleTabs>

  <h3>Disabled</h3>
  <ExampleTabs code={`<Combobox options={cities} placeholder="Select a city" disabled />`}>
    <div class="max-w-md" data-testid="combobox-disabled">
      <Combobox options={cities} placeholder="Select a city" disabled />
    </div>
  </ExampleTabs>

  <h3>Loading State</h3>
  <ExampleTabs code={`<Combobox options={[]} placeholder="Loading options..." loading />`}>
    <div class="max-w-md" data-testid="combobox-loading">
      <Combobox options={[]} placeholder="Loading options..." loading />
    </div>
  </ExampleTabs>

  <h2>Slots</h2>
  <table>
    <thead><tr><th>Slot</th><th>Props</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>optionTemplate</code></td><td><code>{'{ option }'}</code></td><td>Custom template for option items</td></tr>
    </tbody>
  </table>

  <h3>Initial Value</h3>
  <ExampleTabs code={`<Combobox options={[...]} value="apple" />`}>
    <div class="max-w-md" data-testid="combobox-initial">
      <Combobox options={[{value: "apple", label: "Apple"}, {value: "banana", label: "Banana"}, {value: "cherry", label: "Cherry"}]} value="apple" />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={ComboboxModule} />

  <h2>Events</h2>
  <EventsTable component={ComboboxModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="combobox"</code>, <code>role="listbox"</code>, <code>role="option"</code>.</li>
    <li>Proper <code>aria-expanded</code>, <code>aria-controls</code>,
      <code>aria-activedescendant</code>, <code>aria-selected</code>.</li>
    <li>Arrow keys navigate options; Enter selects; Escape closes.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Arrow Down</kbd></td><td>Open dropdown or move to next option</td></tr>
      <tr><td><kbd>Arrow Up</kbd></td><td>Move to previous option</td></tr>
      <tr><td><kbd>Enter</kbd></td><td>Select highlighted option</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>Close dropdown</td></tr>
      <tr><td><kbd>Type</kbd></td><td>Filter options by typed characters</td></tr>
    </tbody>
  </table>
</Container>
