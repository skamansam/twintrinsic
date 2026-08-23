<!--
@component
Tag documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Tag from "$lib/components/Tag/Tag.svelte"
import TagGroup from "$lib/components/Tag/TagGroup.svelte"
import * as TagModule from "$lib/components/Tag/Tag.svelte"
import * as TagGroupModule from "$lib/components/Tag/TagGroup.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>Tag</h1>

<p>
  A label element for displaying categories, statuses, or keywords. Tags
  support icons, dismissal, click actions, and link navigation with full
  keyboard support.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A compact label that can be static, clickable, dismissible, or a link. Tags
  are similar to Chips but lean more toward static labeling than interactive
  selection.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Tag&gt;</code> for category labels, status indicators, keyword
  tags, or dismissible items. For filter selection, use <code>&lt;Chip&gt;</code>.
  For notification counts, use <code>&lt;Badge&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Labeling</strong> — concise, styled labels for content categorization.</li>
  <li><strong>Dismissible</strong> — users can remove tags with an × button.</li>
  <li><strong>Linkable</strong> — can render as an <code>&lt;a&gt;</code> tag for navigation.</li>
  <li><strong>Group support</strong> — <code>&lt;TagGroup&gt;</code> manages layout and ARIA semantics.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://m3.material.io/components/chips/overview">Material Design 3 — Chips</a></li>
  <li><a href="https://ant.design/components/tag">Ant Design — Tag</a></li>
  <li><a href="https://primer.style/components/label">Primer — Label</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Tags wrap naturally within their container.</li>
  <li>In <code>&lt;TagGroup&gt;</code>, tags use flexbox wrap.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Variants: default, primary, secondary, success, warning, error, info.</li>
  <li>Sizes: sm, md, lg.</li>
  <li>Shape: <code>pill</code> for fully rounded.</li>
  <li>Style: <code>outline</code> for bordered tags.</li>
  <li><code>clickable</code> — makes the tag interactive.</li>
  <li><code>dismissible</code> — adds a dismiss × button.</li>
  <li><code>icon</code> — inline SVG icon before the text.</li>
  <li><code>href</code> — renders as a link.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Tags</h3>
<ExampleTabs code={`<Tag>Default</Tag>
<Tag variant="primary">Primary</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="error">Error</Tag>`}>
  <div class="not-prose mb-8 flex flex-wrap gap-2" data-testid="tag-basic">
    <Tag>Default</Tag>
    <Tag variant="primary">Primary</Tag>
    <Tag variant="secondary">Secondary</Tag>
    <Tag variant="success">Success</Tag>
    <Tag variant="warning">Warning</Tag>
    <Tag variant="error">Error</Tag>
    <Tag variant="info">Info</Tag>
  </div>
</ExampleTabs>

<h3>Sizes</h3>
<ExampleTabs code={`<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>`}>
  <div class="not-prose mb-8 flex flex-wrap items-center gap-2" data-testid="tag-sizes">
    <Tag size="sm">Small</Tag>
    <Tag size="md">Medium</Tag>
    <Tag size="lg">Large</Tag>
  </div>
</ExampleTabs>

<h3>Outline and Pill</h3>
<ExampleTabs code={`<Tag outline>Outline</Tag>
<Tag variant="primary" pill>Primary Pill</Tag>`}>
  <div class="not-prose mb-8 flex flex-wrap gap-2" data-testid="tag-outline">
    <Tag outline>Outline</Tag>
    <Tag variant="primary" outline>Primary</Tag>
    <Tag pill>Pill</Tag>
    <Tag variant="primary" pill>Primary Pill</Tag>
  </div>
</ExampleTabs>

<h3>Dismissible Tags</h3>
<ExampleTabs code={`<Tag dismissible>Dismissible</Tag>
<Tag variant="primary" dismissible>Primary</Tag>`}>
  <div class="not-prose mb-8 flex flex-wrap gap-2" data-testid="tag-dismissible">
    <Tag dismissible>Dismissible</Tag>
    <Tag variant="primary" dismissible>Primary</Tag>
  </div>
</ExampleTabs>

<h3>Clickable Tags</h3>
<ExampleTabs code={`<Tag clickable>Clickable</Tag>
<Tag href="https://example.com" target="_blank">Link</Tag>`}>
  <div class="not-prose mb-8 flex flex-wrap gap-2" data-testid="tag-clickable">
    <Tag clickable>Clickable</Tag>
    <Tag variant="primary" clickable>Primary</Tag>
    <Tag href="https://example.com" target="_blank">Link</Tag>
  </div>
</ExampleTabs>

<h2>Tag Props</h2>
<PropsTable component={TagModule} />

<h2>TagGroup Props</h2>
<PropsTable component={TagGroupModule} />

<h2>Tag Events</h2>
<EventsTable component={TagModule} />

<h2>TagGroup Events</h2>
<EventsTable component={TagGroupModule} />

<h2>Accessibility</h2>
<ul>
  <li>Static tags use <code>&lt;span&gt;</code>.</li>
  <li>Clickable tags use <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code>.</li>
  <li>Dismiss buttons have <code>aria-label</code>.</li>
  <li>TagGroup uses <code>role="group"</code> with <code>aria-label</code>.</li>
</ul>

<h2>Keyboard Support</h2>
<table>
  <thead><tr><th>Key</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td><kbd>Tab</kbd></td><td>Move focus to interactive tags</td></tr>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Activate clickable tag or dismiss button</td></tr>
  </tbody>
</table>
</Container>
