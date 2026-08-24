<!--
@component
AutoComplete documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import AutoComplete from "$lib/components/Form/AutoComplete.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AutoCompleteModule from "$lib/components/Form/AutoComplete.svelte"
import Container from "$lib/components/Container/Container.svelte"

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

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>AutoComplete</h1>

<p>
  <strong>AutoComplete</strong> provides text-based suggestions as the user types,
  supporting single and multiple selections. Uses <code>popover="auto"</code> for
  the suggestions panel with CSS Anchor Positioning.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  An input field that shows a filtered list of suggestions below it as the user types.
  Suggestions can include rich content (avatars, descriptions) via custom templates.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;AutoComplete&gt;</code> for search fields, tag inputs, or any field
  where suggesting completions saves typing. For simpler dropdown selection, use
  <code>&lt;Combobox&gt;</code> or <code>&lt;Select&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Speed</strong> — reduces typing errors and speeds up form completion.</li>
  <li><strong>Rich suggestions</strong> — options can include avatars, icons, descriptions.</li>
  <li><strong>Popover API</strong> — light-dismiss and top-layer rendering with zero JS.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/">WAI-ARIA APG — Combobox</a></li>
  <li><a href="https://primer.style/product/components/Autocomplete">Primer — Autocomplete</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Fills container width; suggestions panel matches input width.</li>
  <li>On mobile, suggestions open as a full-width overlay.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Custom option templates via <code>itemTemplate</code>.</li>
  <li>Single or multiple selection.</li>
  <li>Object data with label/value mapping.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Usage</h3>
<ExampleTabs code={`<AutoComplete label="Country" items={countries} placeholder="Select a country" />`}>
  <div class="max-w-md" data-testid="autocomplete-basic">
    <AutoComplete label="Country" items={countries} placeholder="Select a country" />
  </div>
</ExampleTabs>

<h3>Multiple Selection</h3>
<ExampleTabs code={`<AutoComplete label="Countries" items={countries} multiple={true} placeholder="Select countries" />`}>
  <div class="max-w-md" data-testid="autocomplete-multiple">
    <AutoComplete label="Countries" items={countries} multiple={true} placeholder="Select countries" />
  </div>
</ExampleTabs>

  <h3>Custom Template</h3>
  <ExampleTabs code={`<AutoComplete items={...} />`}>
    <div class="max-w-md" data-testid="autocomplete-custom-template">
      <!-- Custom template example -->
    </div>
  </ExampleTabs>

<h2>Props</h2>
<PropsTable component={AutoCompleteModule} />

<h2>Events</h2>
<EventsTable component={AutoCompleteModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses WAI-ARIA combobox/listbox roles.</li>
  <li>Arrow keys navigate suggestions; Enter selects; Escape closes.</li>
  <li>Screen reader announcements for loading and empty states.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Arrow Down</kbd></td><td>Highlight next suggestion</td></tr>
    <tr><td><kbd>Arrow Up</kbd></td><td>Highlight previous suggestion</td></tr>
    <tr><td><kbd>Enter</kbd></td><td>Select highlighted suggestion</td></tr>
    <tr><td><kbd>Escape</kbd></td><td>Close suggestions</td></tr>
  </tbody>
</table>
</Container>
