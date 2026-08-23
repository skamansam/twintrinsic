<!--
@component
TagGroup documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Tag from "$lib/components/Tag/Tag.svelte"
import TagGroup from "$lib/components/Tag/TagGroup.svelte"
import * as TagGroupModule from "$lib/components/Tag/TagGroup.svelte"

const techTags = ["JavaScript", "TypeScript", "Svelte", "Tailwind CSS"]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>TagGroup</h1>

<p>
  A container for managing multiple Tag components with consistent spacing,
  layout, and dismiss handling. Supports dynamic item rendering and ARIA
  group semantics.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A layout wrapper that arranges <code>&lt;Tag&gt;</code> components in a flex
  wrap container with centralized dismiss event handling.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;TagGroup&gt;</code> when you have a collection of tags that
  share common properties (variant, size, pill) or need centralized dismiss
  handling. For a simple list of tags, just use CSS flex wrap.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Consistent styling</strong> — apply variant, size, and pill to all tags at once.</li>
  <li><strong>Dynamic items</strong> — render from a data array with <code>itemTemplate</code>.</li>
  <li><strong>Dismiss handling</strong> — <code>ondismiss</code> fires with <code>&#123; item, index &#125;</code>.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://m3.material.io/components/chips/overview">Material Design 3 — Chips</a></li>
  <li><a href="https://ant.design/components/tag">Ant Design — Tag</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Tags wrap naturally within the group container.</li>
  <li>Group fills available width.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li><code>variant</code> / <code>size</code> / <code>pill</code> — applied to all child tags.</li>
  <li><code>items</code> — render from a data array.</li>
  <li><code>itemTemplate</code> — custom tag rendering per item.</li>
  <li><code>dismissible</code> — enables dismiss buttons on all tags.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Group</h3>
<ExampleTabs code={`<TagGroup>
  <Tag>JavaScript</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Svelte</Tag>
  <Tag>Tailwind CSS</Tag>
</TagGroup>`}>
  <div class="not-prose mb-8" data-testid="tag-group-basic">
    <TagGroup>
      <Tag>JavaScript</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Svelte</Tag>
      <Tag>Tailwind CSS</Tag>
    </TagGroup>
  </div>
</ExampleTabs>

<h3>Dismissible Tags</h3>
<ExampleTabs code={`<TagGroup items={techTags} dismissible ondismiss={handleDismiss}>
  {#snippet itemTemplate(item)}
    <Tag dismissible>{item}</Tag>
  {/snippet}
</TagGroup>`}>
  <div class="not-prose mb-8" data-testid="tag-group-dismissible">
    <TagGroup items={techTags} dismissible>
      {#snippet itemTemplate(item: string)}
        <Tag dismissible>{item}</Tag>
      {/snippet}
    </TagGroup>
  </div>
</ExampleTabs>

<h3>Custom Styling</h3>
<ExampleTabs code={`<TagGroup variant="primary" size="lg" pill>
  <Tag>Primary</Tag>
  <Tag>Pill</Tag>
  <Tag>Large</Tag>
</TagGroup>`}>
  <div class="not-prose mb-8" data-testid="tag-group-styled">
    <TagGroup variant="primary" size="lg" pill>
      <Tag>Primary</Tag>
      <Tag>Pill</Tag>
      <Tag>Large</Tag>
    </TagGroup>
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={TagGroupModule} />

<h2>Events</h2>
<EventsTable component={TagGroupModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses <code>role="group"</code> with <code>aria-label</code>.</li>
  <li>Dismissible tags expose a button with <code>aria-label="Dismiss"</code>.</li>
  <li>Semantic elements maintain readable contrast and focus states.</li>
</ul>
</Container>
