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
import { m } from "$lib/paraglide/messages.js"

// Dynamic items state for the interactive demo
let dynamicItems = $state([
  { id: 1, label: 'Svelte', variant: 'warning' },
  { id: 2, label: 'TypeScript', variant: 'info' },
  { id: 3, label: 'Vite', variant: 'primary' },
])
let nextId = $state(4)
const presets = ['Tailwind CSS', 'Playwright', 'Vitest', 'Storybook', 'ESLint']
const variantOptions = ['primary', 'secondary', 'success', 'warning', 'error', 'info']

function addRandom() {
  const available = presets.filter(p => !dynamicItems.some((/** @type {any} */ i) => i.label === p))
  if (available.length === 0) return
  const label = available[Math.floor(Math.random() * available.length)]
  dynamicItems = [...dynamicItems, { id: nextId++, label, variant: variantOptions[Math.floor(Math.random() * variantOptions.length)] }]
}

function removeItem(id: number) {
  dynamicItems = dynamicItems.filter((/** @type {any} */ i) => i.id !== id)
}
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.chipgroup_heading()}</h1>

<p>{m.chipgroup_intro_1()}</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.chipgroup_what_1()}<code>&lt;Chip&gt;</code>{m.chipgroup_what_2()}<code>selectable</code>{m.chipgroup_what_3()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.chipgroup_when_1()}<code>&lt;ChipGroup&gt;</code>{m.chipgroup_when_2()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.chipgroup_why_selection()}</strong>{m.chipgroup_why_selection_desc()}</li>
  <li><strong>{m.chipgroup_why_semantics()}</strong>{m.chipgroup_why_semantics_desc_1()}<code>role="listbox"</code>{m.chipgroup_why_semantics_desc_2()}<code>aria-multiselectable</code></li>
  <li><strong>{m.chipgroup_why_dynamic()}</strong>{m.chipgroup_why_dynamic_desc_1()}<code>itemTemplate</code>{m.chipgroup_why_dynamic_desc_2()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/">WAI-ARIA APG — Listbox</a></li>
  <li><a href="https://m3.material.io/components/chips/overview">Material Design 3 — Chips</a></li>
</ul>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.chipgroup_responsive_1()}</li>
  <li>{m.chipgroup_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li><code>selectable</code>{m.chipgroup_custom_1_1()}</li>
  <li><code>multiple</code>{m.chipgroup_custom_2_1()}</li>
  <li><code>items</code>{m.chipgroup_custom_3_1()}</li>
  <li><code>itemTemplate</code>{m.chipgroup_custom_4_1()}</li>
  <li><code>selected</code>{m.chipgroup_custom_5_1()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.chipgroup_ex_basic()}</h3>
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

<h3>{m.chipgroup_ex_dynamic()}</h3>
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

<h3>{m.chipgroup_ex_selectable()}</h3>
<ExampleTabs code={`<ChipGroup items={["Starter", "Pro", "Enterprise"]} selectable multiple />`}>
  <div class="not-prose mb-8" data-testid="chip-group-selectable">
    <ChipGroup items={["Starter", "Pro", "Enterprise"]} selectable multiple />
  </div>
</ExampleTabs>

  <h3>{m.chipgroup_ex_selection()}</h3>
  <ExampleTabs code={`<ChipGroup>
  <Chip>React</Chip>
  <Chip>Vue</Chip>
  <Chip>Svelte</Chip>
</ChipGroup>`}>
    <div class="flex flex-wrap gap-2" data-testid="chip-group-dynamic-selected">
      <ChipGroup>
        <Chip>React</Chip>
        <Chip>Vue</Chip>
        <Chip>Svelte</Chip>
      </ChipGroup>
    </div>
  </ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={ChipGroupModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={ChipGroupModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.chipgroup_a11y_1_0()}<code>role="listbox"</code>{m.chipgroup_a11y_1_1()}<code>aria-multiselectable</code>{m.chipgroup_a11y_1_2()}</li>
  <li>{m.chipgroup_a11y_2_0()}<code>role="group"</code>{m.chipgroup_a11y_2_1()}<code>aria-label</code>{m.chipgroup_a11y_2_2()}</li>
  <li>{m.chipgroup_a11y_3()}</li>
  <li>{m.chipgroup_a11y_4_0()}<code>aria-label</code>{m.chipgroup_a11y_4_1()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.chipgroup_kb_1()}</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>{m.chipgroup_kb_2()}</td></tr>
  </tbody>
</table>
</Container>
