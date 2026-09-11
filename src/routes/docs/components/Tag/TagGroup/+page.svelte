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
import { m } from "$lib/paraglide/messages.js"

const techTags = ["JavaScript", "TypeScript", "Svelte", "Tailwind CSS"]
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.taggroup_heading()}</h1>

<p>{m.taggroup_intro_1()}</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.taggroup_what_1()}<code>&lt;Tag&gt;</code>{m.taggroup_what_2()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.taggroup_when_1()}<code>&lt;TagGroup&gt;</code>{m.taggroup_when_2()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.taggroup_why_styling()}</strong>{m.taggroup_why_styling_desc()}</li>
  <li><strong>{m.taggroup_why_dynamic()}</strong>{m.taggroup_why_dynamic_desc_1()}<code>itemTemplate</code>{m.taggroup_why_dynamic_desc_2()}</li>
  <li><strong>{m.taggroup_why_dismiss()}</strong>{m.taggroup_why_dismiss_desc_1()}<code>ondismiss</code>{m.taggroup_why_dismiss_desc_2()}<code>&#123; item, index &#125;</code>{m.taggroup_why_dismiss_desc_3()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://m3.material.io/components/chips/overview">Material Design 3 — Chips</a></li>
  <li><a href="https://ant.design/components/tag">Ant Design — Tag</a></li>
</ul>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.taggroup_responsive_1()}</li>
  <li>{m.taggroup_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li><code>variant</code>{m.taggroup_custom_1_2()}<code>size</code>{m.taggroup_custom_1_3()}<code>pill</code>{m.taggroup_custom_1_4()}</li>
  <li><code>items</code>{m.taggroup_custom_2_1()}</li>
  <li><code>itemTemplate</code>{m.taggroup_custom_3_1()}</li>
  <li><code>dismissible</code>{m.taggroup_custom_4_1()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.taggroup_ex_basic()}</h3>
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

<h3>{m.taggroup_ex_dismissible()}</h3>
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

<h3>{m.taggroup_ex_styling()}</h3>
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

  <h3>{m.taggroup_ex_role()}</h3>
  <ExampleTabs code={`<TagGroup>
  <Tag>Design</Tag>
  <Tag>Development</Tag>
  <Tag>Marketing</Tag>
</TagGroup>`}>
    <div class="not-prose mb-8" data-testid="tag-group">
      <TagGroup>
        <Tag>Design</Tag>
        <Tag>Development</Tag>
        <Tag>Marketing</Tag>
      </TagGroup>
    </div>
  </ExampleTabs>

  <h3>{m.taggroup_ex_dynamic()}</h3>
  <ExampleTabs code={`<TagGroup>
  {#each ['React', 'Vue', 'Svelte'] as framework}
    <Tag>{framework}</Tag>
  {/each}
</TagGroup>`}>
    <div class="not-prose mb-8" data-testid="tag-group-dynamic">
      <TagGroup>
        <Tag>React</Tag>
        <Tag>Vue</Tag>
        <Tag>Svelte</Tag>
      </TagGroup>
    </div>
  </ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={TagGroupModule} />

<h2>{m.sec_events()}</h2>
<EventsTable component={TagGroupModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.taggroup_a11y_1_0()}<code>role="group"</code>{m.taggroup_a11y_1_1()}<code>aria-label</code>{m.taggroup_a11y_1_2()}</li>
  <li>{m.taggroup_a11y_2_0()}<code>aria-label="Dismiss"</code>{m.taggroup_a11y_2_1()}</li>
  <li>{m.taggroup_a11y_3()}</li>
</ul>
</Container>
