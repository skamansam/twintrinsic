<!--
@component
Badge documentation page — standardized structure
-->
<script lang="ts">
import Badge from "$lib/components/Badge/Badge.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Icon from "$lib/components/Icon/Icon.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as BadgeModule from "$lib/components/Badge/Badge.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.badge_heading()}</h1>

<p>{m.badge_intro_1()}</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.badge_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.badge_when_1()}<code>&lt;Badge&gt;</code>{m.badge_when_2()}<code>&lt;Chip&gt;</code>{m.badge_when_3()}<code>&lt;Tag&gt;</code>{m.badge_when_4()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.badge_why_emphasis()}</strong>{m.badge_why_emphasis_desc()}</li>
  <li><strong>{m.badge_why_placement()}</strong>{m.badge_why_placement_desc()}</li>
  <li><strong>{m.badge_why_dot()}</strong>{m.badge_why_dot_desc()}</li>
  <li><strong>{m.badge_why_pulse()}</strong>{m.badge_why_pulse_desc()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://m3.material.io/components/badges/overview">Material Design 3 — Badges</a></li>
  <li><a href="https://primer.style/components/badge">Primer — Badge</a></li>
  <li><a href="https://ant.design/components/badge">Ant Design — Badge</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li>{m.badge_impl_1_1()}<code>&lt;span&gt;</code>{m.badge_impl_1_2()}</li>
  <li><code>accent-color</code>{m.badge_impl_2_1()}</li>
  <li><code>aria-hidden="true"</code>{m.badge_impl_3_1()}<code>aria-label</code>{m.badge_impl_3_2()}</li>
  <li>{m.badge_impl_4()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.badge_mistake_1_1()}<code>&lt;div&gt;</code>{m.badge_mistake_1_2()}<code>&lt;span&gt;</code>{m.badge_mistake_1_3()}</li>
  <li>{m.badge_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>Tag, Chip, Avatar</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.badge_responsive_1()}</li>
  <li>{m.badge_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.badge_custom_1()}</li>
  <li>{m.badge_custom_2()}</li>
  <li>{m.badge_custom_3_1()}<code>pill</code>{m.badge_custom_3_2()}</li>
  <li>{m.badge_custom_4_1()}<code>outline</code>{m.badge_custom_4_2()}</li>
  <li><code>dot</code>{m.badge_custom_5_1()}</li>
  <li><code>pulse</code>{m.badge_custom_6_1()}</li>
  <li><code>overlay</code>{m.badge_custom_7_1()}<code>position</code>{m.badge_custom_7_2()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.badge_ex_basic()}</h3>
<ExampleTabs code={`<Badge>New</Badge>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="badge-basic">
    <Badge>New</Badge>
  </div>
</ExampleTabs>

<h3>{m.badge_ex_variants()}</h3>
<ExampleTabs code={`<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md flex-wrap" data-testid="badge-variants">
    <Badge variant="default">Default</Badge>
    <Badge variant="primary">Primary</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="info">Info</Badge>
  </div>
</ExampleTabs>

<h3>{m.badge_ex_sizes()}</h3>
<ExampleTabs code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="badge-sizes">
    <Badge size="sm">Small</Badge>
    <Badge size="md">Medium</Badge>
    <Badge size="lg">Large</Badge>
  </div>
</ExampleTabs>

<h3>{m.badge_ex_pill()}</h3>
<ExampleTabs code={`<Badge pill>Pill Badge</Badge>
<Badge variant="primary" pill>Primary Pill</Badge>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="badge-pill">
    <Badge pill>Pill Badge</Badge>
    <Badge variant="primary" pill>Primary Pill</Badge>
  </div>
</ExampleTabs>

<h3>{m.badge_ex_outline()}</h3>
<ExampleTabs code={`<Badge outline>Outline</Badge>
<Badge variant="primary" outline>Primary</Badge>
<Badge variant="success" outline>Success</Badge>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="badge-outline">
    <Badge outline>Outline</Badge>
    <Badge variant="primary" outline>Primary</Badge>
    <Badge variant="success" outline>Success</Badge>
  </div>
</ExampleTabs>

<h3>{m.badge_ex_dot()}</h3>
<ExampleTabs code={`<Badge variant="success" dot></Badge> Online
<Badge variant="error" dot></Badge> Offline
<Badge variant="warning" dot></Badge> Away`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="badge-dot">
    <div class="flex items-center gap-1"><Badge variant="success" dot></Badge><span>Online</span></div>
    <div class="flex items-center gap-1"><Badge variant="error" dot></Badge><span>Offline</span></div>
    <div class="flex items-center gap-1"><Badge variant="warning" dot></Badge><span>Away</span></div>
  </div>
</ExampleTabs>

<h3>{m.badge_ex_pulse()}</h3>
<ExampleTabs code={`<Badge variant="primary" pulse>Pulse</Badge>
<Badge variant="error" dot pulse></Badge>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="badge-pulse">
    <Badge variant="primary" pulse>Pulse</Badge>
    <Badge variant="error" dot pulse></Badge>
  </div>
</ExampleTabs>

<h3>{m.badge_ex_overlay()}</h3>
<ExampleTabs code={`<div class="relative inline-block">
  <div class="w-10 h-10 bg-muted/20 rounded"></div>
  <Badge variant="primary" overlay position="top-right">5</Badge>
</div>`}>
  <div class="flex items-center gap-8 p-4 bg-surface rounded-md" data-testid="badge-overlay">
    <div class="relative inline-block">
      <div class="w-10 h-10 bg-muted/20 rounded"></div>
      <Badge variant="primary" overlay position="top-right">5</Badge>
    </div>
    <div class="relative inline-block">
      <div class="w-10 h-10 bg-muted/20 rounded"></div>
      <Badge variant="error" overlay position="top-left">!</Badge>
    </div>
    <div class="relative inline-block">
      <div class="w-10 h-10 bg-muted/20 rounded"></div>
      <Badge variant="success" overlay position="bottom-right" dot></Badge>
    </div>
  </div>
</ExampleTabs>

<h2>{m.badge_compare_heading()}</h2>
<table>
  <thead><tr><th>{m.badge_th_feature()}</th><th>{m.badge_th_badge()}</th><th>{m.badge_th_tag()}</th><th>{m.badge_th_chip()}</th></tr></thead>
  <tbody>
    <tr><td>{m.badge_row_purpose()}</td><td>{m.badge_row_purpose_badge()}</td><td>{m.badge_row_purpose_tag()}</td><td>{m.badge_row_purpose_chip()}</td></tr>
    <tr><td>{m.badge_row_interactive()}</td><td>{m.badge_no()}</td><td>{m.badge_row_interactive_tag()}</td><td>{m.badge_row_interactive_chip()}</td></tr>
    <tr><td>{m.badge_row_overlay()}</td><td>{m.badge_yes()}</td><td>{m.badge_no()}</td><td>{m.badge_no()}</td></tr>
    <tr><td>{m.badge_row_dot()}</td><td>{m.badge_yes()}</td><td>{m.badge_no()}</td><td>{m.badge_no()}</td></tr>
    <tr><td>{m.badge_row_pulse()}</td><td>{m.badge_yes()}</td><td>{m.badge_no()}</td><td>{m.badge_no()}</td></tr>
    <tr><td>{m.badge_row_dismissible()}</td><td>{m.badge_no()}</td><td>{m.badge_yes()}</td><td>{m.badge_row_dismissible_chip()}</td></tr>
    <tr><td>{m.badge_row_link()}</td><td>{m.badge_no()}</td><td>{m.badge_row_link_tag()}</td><td>{m.badge_no()}</td></tr>
    <tr><td>{m.badge_row_best()}</td><td>{m.badge_row_best_badge()}</td><td>{m.badge_row_best_tag()}</td><td>{m.badge_row_best_chip()}</td></tr>
  </tbody>
</table>

<h2>{m.sec_props()}</h2>
<PropsTable component={BadgeModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.badge_a11y_1_1()}<code>role="status"</code>{m.badge_a11y_1_2()}</li>
  <li>{m.badge_a11y_2_1()}<code>aria-label</code>{m.badge_a11y_2_2()}</li>
  <li>{m.badge_a11y_3()}</li>
  <li>{m.badge_a11y_4()}</li>
</ul>
</Container>
