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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>Chip</h1>

<p>
  A compact element for representing an input, attribute, or action. Chips
  support selection, removal, and click interactions with full keyboard
  navigation.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A small, rounded element that can display text, icons, or avatars. Chips can
  be clickable (toggle selection), removable (with an × button), or static.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Chip&gt;</code> for selected filters, tag inputs, removable
  categories, or compact action buttons. For purely visual labels, use
  <code>&lt;Badge&gt;</code>. For dismissible labels in a group, use
  <code>&lt;Tag&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Interactive selection</strong> — toggle chips on/off for filter states.</li>
  <li><strong>Removable</strong> — users can dismiss chips with a clear × button.</li>
  <li><strong>Rich content</strong> — supports icons and avatars inside the chip.</li>
  <li><strong>Group management</strong> — <code>&lt;ChipGroup&gt;</code> handles layout and selection state.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://m3.material.io/components/chips/overview">Material Design 3 — Chips</a></li>
  <li><a href="https://primer.style/components/toggle-button">Primer — Toggle Button</a></li>
  <li><a href="https://ant.design/components/tag">Ant Design — Tag</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Chips wrap naturally within their container.</li>
  <li>In <code>&lt;ChipGroup&gt;</code>, chips use flexbox wrap layout.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Variants: default, primary, secondary, success, warning, error, info.</li>
  <li>Sizes: sm, md, lg.</li>
  <li>Style: <code>outline</code> for bordered chips.</li>
  <li><code>clickable</code> — makes the chip a toggle button.</li>
  <li><code>removable</code> — adds a dismiss × button.</li>
  <li><code>selected</code> — reflects selection state.</li>
  <li><code>icon</code> and <code>avatar</code> — rich content inside the chip.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Chip</h3>
<ExampleTabs code={`<Chip>Basic Chip</Chip>`}>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md" data-testid="chip-basic">
    <Chip>Basic Chip</Chip>
  </div>
</ExampleTabs>

<h3>Variants</h3>
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

<h3>Removable Chips</h3>
<ExampleTabs code={`<Chip removable>Removable</Chip>
<Chip variant="primary" removable>Primary</Chip>`}>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md" data-testid="chip-removable">
    <Chip removable>Removable</Chip>
    <Chip variant="primary" removable>Primary</Chip>
    <Chip variant="error" removable>Error</Chip>
  </div>
</ExampleTabs>

<h3>Clickable Chips</h3>
<ExampleTabs code={`<Chip clickable>Clickable</Chip>
<Chip variant="success" clickable selected>Selected</Chip>`}>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md" data-testid="chip-clickable">
    <Chip clickable>Clickable</Chip>
    <Chip variant="primary" clickable>Primary</Chip>
    <Chip variant="success" clickable selected>Selected</Chip>
  </div>
</ExampleTabs>

<h3>Disabled</h3>
<ExampleTabs code={`<Chip disabled>Disabled</Chip>
<Chip variant="primary" disabled clickable>Disabled Clickable</Chip>`}>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md" data-testid="chip-disabled">
    <Chip disabled>Disabled</Chip>
    <Chip variant="primary" disabled clickable>Disabled Clickable</Chip>
    <Chip variant="error" disabled removable>Disabled Removable</Chip>
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={ChipModule} />

<h2>Events</h2>
<EventsTable component={ChipModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses <code>role="button"</code> when clickable.</li>
  <li>Supports Enter and Space keys for activation.</li>
  <li>Includes <code>aria-disabled="true"</code> when disabled.</li>
  <li>Remove button has an <code>aria-label</code> for screen readers.</li>
  <li>Icons are marked <code>aria-hidden="true"</code>.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Toggle selection (clickable chips)</td></tr>
    <tr><td><kbd>Tab</kbd></td><td>Move focus to next interactive chip</td></tr>
  </tbody>
</table>
</Container>
