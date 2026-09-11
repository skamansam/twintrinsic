<!--
@component
Chip documentation page — standardized structure
-->
<script lang="ts">
import Chip from "$lib/components/Chip/Chip.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ChipModule from "$lib/components/Chip/Chip.svelte"
import { m } from "$lib/paraglide/messages.js"

let chips = $state([
  { id: 1, label: 'React', variant: 'primary' },
  { id: 2, label: 'TypeScript', variant: 'success' },
  { id: 3, label: 'Svelte', variant: 'error' },
])

function removeChip(id: number) {
  chips = chips.filter(c => c.id !== id)
}
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.chip_heading()}</h1>

<p>{m.chip_intro_1()}</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.chip_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.chip_when_1()}<code>&lt;Chip&gt;</code>{m.chip_when_2()}<code>&lt;Badge&gt;</code>{m.chip_when_3()}<code>&lt;Tag&gt;</code>{m.chip_when_4()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.chip_why_selection()}</strong>{m.chip_why_selection_desc()}</li>
  <li><strong>{m.chip_why_removable()}</strong>{m.chip_why_removable_desc()}</li>
  <li><strong>{m.chip_why_rich()}</strong>{m.chip_why_rich_desc()}</li>
  <li><strong>{m.chip_why_group()}</strong>{m.chip_why_group_desc_1()}<code>&lt;ChipGroup&gt;</code>{m.chip_why_group_desc_2()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://m3.material.io/components/chips/overview">Material Design 3 — Chips</a></li>
  <li><a href="https://primer.style/components/toggle-button">Primer — Toggle Button</a></li>
  <li><a href="https://ant.design/components/tag">Ant Design — Tag</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li>{m.chip_impl_1_0()}<code>&lt;button&gt;</code>{m.chip_impl_1_1()}</li>
  <li><code>aria-pressed</code>{m.chip_impl_2_1()}</li>
  <li><code>aria-live=&quot;polite&quot;</code>{m.chip_impl_3_1()}</li>
  <li>{m.chip_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.chip_mistake_1_0()}<code>&lt;span onclick&gt;</code>{m.chip_mistake_1_1()}<code>&lt;button&gt;</code>{m.chip_mistake_1_2()}</li>
  <li>{m.chip_mistake_2_0()}<code>aria-pressed</code>{m.chip_mistake_2_1()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.chip_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.chip_responsive_1()}</li>
  <li>{m.chip_responsive_2_0()}<code>&lt;ChipGroup&gt;</code>{m.chip_responsive_2_1()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.chip_custom_1()}</li>
  <li>{m.chip_custom_2()}</li>
  <li>{m.chip_custom_3_0()}<code>outline</code>{m.chip_custom_3_1()}</li>
  <li><code>clickable</code>{m.chip_custom_4_1()}</li>
  <li><code>removable</code>{m.chip_custom_5_1()}</li>
  <li><code>selected</code>{m.chip_custom_6_1()}</li>
  <li><code>icon</code>{m.chip_custom_7_1()}<code>avatar</code>{m.chip_custom_7_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.chip_ex_basic()}</h3>
<ExampleTabs code={`<Chip>Basic Chip</Chip>`}>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md" data-testid="chip-basic">
    <Chip>Basic Chip</Chip>
  </div>
</ExampleTabs>

<h3>{m.chip_ex_variants()}</h3>
<ExampleTabs code={`<Chip variant="default">Default</Chip>
<Chip variant="primary">Primary</Chip>
<Chip variant="secondary">Secondary</Chip>
<Chip variant="success">Success</Chip>
<Chip variant="warning">Warning</Chip>
<Chip variant="error">Error</Chip>
<Chip variant="info">Info</Chip>`}>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md" data-testid="chip-variants">
    <Chip variant="default">Default</Chip>
    <Chip variant="primary">Primary</Chip>
    <Chip variant="secondary">Secondary</Chip>
    <Chip variant="success">Success</Chip>
    <Chip variant="warning">Warning</Chip>
    <Chip variant="error">Error</Chip>
    <Chip variant="info">Info</Chip>
  </div>
</ExampleTabs>

<h3>{m.chip_ex_removable()}</h3>
<ExampleTabs code={`<Chip removable onremove={() => {}}>Removable</Chip>`}>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md" data-testid="chip-removable">
    {#each chips as chip (chip.id)}
      <Chip variant={chip.variant} removable onremove={() => removeChip(chip.id)}>
        {chip.label}
      </Chip>
    {/each}
    {#if chips.length === 0}
      <span class="text-sm text-muted">All chips removed!</span>
    {/if}
  </div>
</ExampleTabs>

<h3>{m.chip_ex_clickable()}</h3>
<ExampleTabs code={`<Chip clickable>Clickable</Chip>
<Chip variant="success" clickable selected>Selected</Chip>`}>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md" data-testid="chip-clickable">
    <Chip clickable>Clickable</Chip>
    <Chip variant="primary" clickable>Primary</Chip>
    <Chip variant="success" clickable selected>Selected</Chip>
  </div>
</ExampleTabs>

<h3>{m.chip_ex_disabled()}</h3>
<ExampleTabs code={`<Chip disabled>Disabled</Chip>
<Chip variant="primary" disabled clickable>Disabled Clickable</Chip>`}>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md" data-testid="chip-disabled">
    <Chip disabled>Disabled</Chip>
    <Chip variant="primary" disabled clickable>Disabled Clickable</Chip>
    <Chip variant="error" disabled removable>Disabled Removable</Chip>
  </div>
</ExampleTabs>

<h3>{m.chip_ex_icons()}</h3>
<ExampleTabs code={`<Chip icon="tabler:star">Starred</Chip>
<Chip icon="tabler:heart" variant="error">Favorite</Chip>
<Chip icon="tabler:bell" variant="warning">Notifications</Chip>`}>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md" data-testid="chip-icons">
    <Chip icon="tabler:star">Starred</Chip>
    <Chip icon="tabler:heart" variant="error">Favorite</Chip>
    <Chip icon="tabler:bell" variant="warning">Notifications</Chip>
    <Chip icon="tabler:rocket" variant="success" clickable>Launch</Chip>
  </div>
</ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={ChipModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={ChipModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.chip_a11y_1_0()}<code>role="button"</code>{m.chip_a11y_1_1()}</li>
  <li>{m.chip_a11y_2()}</li>
  <li>{m.chip_a11y_3_0()}<code>aria-disabled="true"</code>{m.chip_a11y_3_1()}</li>
  <li>{m.chip_a11y_4_0()}<code>aria-label</code>{m.chip_a11y_4_1()}</li>
  <li>{m.chip_a11y_5_0()}<code>aria-hidden="true"</code>{m.chip_a11y_5_1()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.chip_kb_1()}</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>{m.chip_kb_2()}</td></tr>
  </tbody>
</table>
</Container>
