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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.tag_heading()}</h1>

<p>{m.tag_intro_1()}</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.tag_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.tag_when_1()}<code>&lt;Tag&gt;</code>{m.tag_when_2()}<code>&lt;Chip&gt;</code>{m.tag_when_3()}<code>&lt;Badge&gt;</code>{m.tag_when_4()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.tag_why_labeling()}</strong>{m.tag_why_labeling_desc()}</li>
  <li><strong>{m.tag_why_dismissible()}</strong>{m.tag_why_dismissible_desc()}</li>
  <li><strong>{m.tag_why_linkable()}</strong>{m.tag_why_linkable_desc_1()}<code>&lt;a&gt;</code>{m.tag_why_linkable_desc_2()}</li>
  <li><strong>{m.tag_why_group()}</strong>{m.tag_why_group_desc_1()}<code>&lt;TagGroup&gt;</code>{m.tag_why_group_desc_2()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://m3.material.io/components/chips/overview">Material Design 3 — Chips</a></li>
  <li><a href="https://ant.design/components/tag">Ant Design — Tag</a></li>
  <li><a href="https://primer.style/components/label">Primer — Label</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li><code>&lt;span&gt;</code>{m.tag_impl_1_1()}</li>
  <li><code>role=&quot;group&quot;</code>{m.tag_impl_2_1()}</li>
  <li>{m.tag_impl_3_0()}<code>aria-label=&quot;Remove [tag name]&quot;</code>{m.tag_impl_3_1()}</li>
  <li><code>dispatchGroupRemove</code>{m.tag_impl_4_1()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.tag_mistake_1_0()}<code>aria-label</code>{m.tag_mistake_1_1()}</li>
  <li>{m.tag_mistake_2_0()}<code>&lt;div&gt;</code>{m.tag_mistake_2_1()}<code>&lt;span&gt;</code>{m.tag_mistake_2_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.tag_related_1()}</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.tag_responsive_1()}</li>
  <li>{m.tag_responsive_2_0()}<code>&lt;TagGroup&gt;</code>{m.tag_responsive_2_1()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.tag_custom_1()}</li>
  <li>{m.tag_custom_2()}</li>
  <li>{m.tag_custom_3_0()}<code>pill</code>{m.tag_custom_3_1()}</li>
  <li>{m.tag_custom_4_0()}<code>outline</code>{m.tag_custom_4_1()}</li>
  <li><code>clickable</code>{m.tag_custom_5_1()}</li>
  <li><code>dismissible</code>{m.tag_custom_6_1()}</li>
  <li><code>icon</code>{m.tag_custom_7_1()}</li>
  <li><code>href</code>{m.tag_custom_8_1()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.tag_ex_basic()}</h3>
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

<h3>{m.tag_ex_sizes()}</h3>
<ExampleTabs code={`<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>`}>
  <div class="not-prose mb-8 flex flex-wrap items-center gap-2" data-testid="tag-sizes">
    <Tag size="sm">Small</Tag>
    <Tag size="md">Medium</Tag>
    <Tag size="lg">Large</Tag>
  </div>
</ExampleTabs>

<h3>{m.tag_ex_outline()}</h3>
<ExampleTabs code={`<Tag outline>Outline</Tag>
<Tag variant="primary" pill>Primary Pill</Tag>`}>
  <div class="not-prose mb-8 flex flex-wrap gap-2" data-testid="tag-outline">
    <Tag outline>Outline</Tag>
    <Tag variant="primary" outline>Primary</Tag>
    <Tag pill>Pill</Tag>
    <Tag variant="primary" pill>Primary Pill</Tag>
  </div>
</ExampleTabs>

<h3>{m.tag_ex_dismissible()}</h3>
<ExampleTabs code={`<Tag dismissible>Dismissible</Tag>
<Tag variant="primary" dismissible>Primary</Tag>`}>
  <div class="not-prose mb-8 flex flex-wrap gap-2" data-testid="tag-dismissible">
    <Tag dismissible>Dismissible</Tag>
    <Tag variant="primary" dismissible>Primary</Tag>
  </div>
</ExampleTabs>

<h3>{m.tag_ex_clickable()}</h3>
<ExampleTabs code={`<Tag clickable>Clickable</Tag>
<Tag href="https://example.com" target="_blank">Link</Tag>`}>
  <div class="not-prose mb-8 flex flex-wrap gap-2" data-testid="tag-clickable">
    <Tag clickable>Clickable</Tag>
    <Tag variant="primary" clickable>Primary</Tag>
    <Tag href="https://example.com" target="_blank">Link</Tag>
  </div>
</ExampleTabs>

<h2>{m.tag_vs_heading()}</h2>
<table>
  <thead><tr><th>{m.badge_th_feature()}</th><th>{m.badge_th_tag()}</th><th>{m.badge_th_badge()}</th><th>{m.badge_th_chip()}</th></tr></thead>
  <tbody>
    <tr><td>{m.badge_row_purpose()}</td><td>{m.badge_row_purpose_tag()}</td><td>{m.badge_row_purpose_badge()}</td><td>{m.badge_row_purpose_chip()}</td></tr>
    <tr><td>{m.badge_row_interactive()}</td><td>{m.badge_row_interactive_tag()}</td><td>{m.badge_no()}</td><td>{m.badge_row_interactive_chip()}</td></tr>
    <tr><td>{m.badge_row_dismissible()}</td><td>{m.badge_yes()}</td><td>{m.badge_no()}</td><td>{m.badge_row_dismissible_chip()}</td></tr>
    <tr><td>{m.badge_row_link()}</td><td>{m.badge_row_link_tag()}</td><td>{m.badge_no()}</td><td>{m.badge_no()}</td></tr>
    <tr><td>{m.badge_row_overlay()}</td><td>{m.badge_no()}</td><td>{m.badge_yes()}</td><td>{m.badge_no()}</td></tr>
    <tr><td>{m.badge_row_dot()}</td><td>{m.badge_no()}</td><td>{m.badge_yes()}</td><td>{m.badge_no()}</td></tr>
    <tr><td>{m.badge_row_pulse()}</td><td>{m.badge_no()}</td><td>{m.badge_yes()}</td><td>{m.badge_no()}</td></tr>
    <tr><td>{m.badge_row_best()}</td><td>{m.badge_row_best_tag()}</td><td>{m.badge_row_best_badge()}</td><td>{m.badge_row_best_chip()}</td></tr>
  </tbody>
</table>

<h2>{m.tag_props_heading()}</h2>
<PropsTable component={TagModule} />

<h2>{m.taggroup_props_heading()}</h2>
<PropsTable component={TagGroupModule} />

<h2>{m.tag_events_heading()}</h2>
<EventsTable component={TagModule} />

<h2>{m.taggroup_events_heading()}</h2>
<EventsTable component={TagGroupModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.tag_a11y_1_0()}<code>&lt;span&gt;</code>{m.tag_a11y_1_1()}</li>
  <li>{m.tag_a11y_2_0()}<code>&lt;button&gt;</code>{m.tag_a11y_2_1()}<code>&lt;a&gt;</code>{m.tag_a11y_2_2()}</li>
  <li>{m.tag_a11y_3_0()}<code>aria-label</code>{m.tag_a11y_3_1()}</li>
  <li>{m.tag_a11y_4_0()}<code>role="group"</code>{m.tag_a11y_4_1()}<code>aria-label</code>{m.tag_a11y_4_2()}</li>
</ul>

<h2>{m.sec_keyboard()}</h2>
<table>
  <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
  <tbody>
    <tr><td><kbd>Tab</kbd></td><td>{m.tag_kb_1()}</td></tr>
    <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.tag_kb_2()}</td></tr>
  </tbody>
</table>
</Container>
