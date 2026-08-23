<!--
@component
ChipGroup documentation page — standardized structure
-->
<script lang="ts">
import Chip from "$lib/components/Chip/Chip.svelte"
import ChipGroup from "$lib/components/Chip/ChipGroup.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ChipGroupModule from "$lib/components/Chip/ChipGroup.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>ChipGroup</h1>

<p>
  A container for managing multiple Chip components with consistent spacing,
  layout, and selection state. Supports listbox semantics for accessible
  selectable groups.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A layout wrapper that arranges <code>&lt;Chip&gt;</code> components in a flex
  wrap container. When <code>selectable</code>, it tracks which chips are
  selected and provides keyboard navigation.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;ChipGroup&gt;</code> when you need a set of selectable or
  removable chips — filter categories, skill tags, plan selectors. For a simple
  list of static chips, just use CSS flex wrap directly.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Centralized selection</strong> — tracks selected state for multiple chips.</li>
  <li><strong>Listbox semantics</strong> — <code>role="listbox"</code> with <code>aria-multiselectable</code>.</li>
  <li><strong>Dynamic items</strong> — render from a data array with <code>itemTemplate</code>.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/">WAI-ARIA APG — Listbox</a></li>
  <li><a href="https://m3.material.io/components/chips/overview">Material Design 3 — Chips</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Chips wrap naturally within the group container.</li>
  <li>Group fills available width.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li><code>selectable</code> — enables selection tracking.</li>
  <li><code>multiple</code> — allows multiple selected chips.</li>
  <li><code>items</code> — render from a data array.</li>
  <li><code>itemTemplate</code> — custom chip rendering per item.</li>
  <li><code>selected</code> — controlled selection state.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Group</h3>
<ExampleTabs code={`<ChipGroup>
  <Chip>JavaScript</Chip>
  <Chip>TypeScript</Chip>
  <Chip>Svelte</Chip>
  <Chip>React</Chip>
</ChipGroup>`}>
  <div class="not-prose mb-8" data-testid="chip-group-basic">
    <ChipGroup>
      <Chip>JavaScript</Chip>
      <Chip>TypeScript</Chip>
      <Chip>Svelte</Chip>
      <Chip>React</Chip>
    </ChipGroup>
  </div>
</ExampleTabs>

<h3>Dynamic Items with Custom Template</h3>
<ExampleTabs code={`<ChipGroup items={["Design", "Engineering", "Product", "Marketing"]}>
  {#snippet itemTemplate(item)}
    <Chip variant="primary" clickable removable>{item}</Chip>
  {/snippet}
</ChipGroup>`}>
  <div class="not-prose mb-8" data-testid="chip-group-dynamic">
    <ChipGroup items={["Design", "Engineering", "Product", "Marketing"]}>
      {#snippet itemTemplate(item: string)}
        <Chip variant="primary" clickable removable>{item}</Chip>
      {/snippet}
    </ChipGroup>
  </div>
</ExampleTabs>

<h3>Selectable Group</h3>
<ExampleTabs code={`<ChipGroup items={["Starter", "Pro", "Enterprise"]} selectable multiple />`}>
  <div class="not-prose mb-8" data-testid="chip-group-selectable">
    <ChipGroup items={["Starter", "Pro", "Enterprise"]} selectable multiple />
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={ChipGroupModule} />

<h2>Events</h2>
<EventsTable component={ChipGroupModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses <code>role="listbox"</code> with <code>aria-multiselectable</code> for selectable groups.</li>
  <li>Uses <code>role="group"</code> with <code>aria-label</code> for static groups.</li>
  <li>Keyboard: Enter/Space to activate chips.</li>
  <li>Remove buttons have <code>aria-label</code> for screen readers.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Toggle chip selection</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>Move focus between chips</td></tr>
  </tbody>
</table>
</Container>
