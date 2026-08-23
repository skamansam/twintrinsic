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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>Badge</h1>

<p>
  A small inline element for displaying counts, status indicators, or labels.
  Supports variants, sizes, dot indicators, pulse animation, and overlay
  positioning.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A compact visual element that conveys metadata — a notification count, a
  status label, or a category tag. Badges are non-interactive by default but
  can be positioned as overlays on other elements.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Badge&gt;</code> for notification counts on icons/buttons, status
  indicators next to text, category labels, or version tags. For interactive
  selectable elements, use <code>&lt;Chip&gt;</code> or <code>&lt;Tag&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Visual emphasis</strong> — draws attention to important counts or statuses.</li>
  <li><strong>Versatile placement</strong> — inline or overlay (top-right, bottom-left, etc.).</li>
  <li><strong>Dot mode</strong> — minimal status indicator without text.</li>
  <li><strong>Pulse animation</strong> — draws attention to new notifications.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://m3.material.io/components/badges/overview">Material Design 3 — Badges</a></li>
  <li><a href="https://primer.style/components/badge">Primer — Badge</a></li>
  <li><a href="https://ant.design/components/badge">Ant Design — Badge</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Badges are inline and grow with content.</li>
  <li>Overlay badges are positioned absolutely relative to their parent.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Variants: default, primary, secondary, success, warning, error, info.</li>
  <li>Sizes: sm, md, lg.</li>
  <li>Shape: <code>pill</code> for fully rounded.</li>
  <li>Style: <code>outline</code> for bordered badges.</li>
  <li><code>dot</code> — minimal dot indicator without text.</li>
  <li><code>pulse</code> — animated pulse effect.</li>
  <li><code>overlay</code> with <code>position</code> — positioned over a parent element.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Badge</h3>
<ExampleTabs code={`<Badge>New</Badge>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="badge-basic">
    <Badge>New</Badge>
  </div>
</ExampleTabs>

<h3>Variants</h3>
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

<h3>Sizes</h3>
<ExampleTabs code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="badge-sizes">
    <Badge size="sm">Small</Badge>
    <Badge size="md">Medium</Badge>
    <Badge size="lg">Large</Badge>
  </div>
</ExampleTabs>

<h3>Pill Shape</h3>
<ExampleTabs code={`<Badge pill>Pill Badge</Badge>
<Badge variant="primary" pill>Primary Pill</Badge>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="badge-pill">
    <Badge pill>Pill Badge</Badge>
    <Badge variant="primary" pill>Primary Pill</Badge>
  </div>
</ExampleTabs>

<h3>Outline Style</h3>
<ExampleTabs code={`<Badge outline>Outline</Badge>
<Badge variant="primary" outline>Primary</Badge>
<Badge variant="success" outline>Success</Badge>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="badge-outline">
    <Badge outline>Outline</Badge>
    <Badge variant="primary" outline>Primary</Badge>
    <Badge variant="success" outline>Success</Badge>
  </div>
</ExampleTabs>

<h3>Dot Indicators</h3>
<ExampleTabs code={`<Badge variant="success" dot></Badge> Online
<Badge variant="error" dot></Badge> Offline
<Badge variant="warning" dot></Badge> Away`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="badge-dot">
    <div class="flex items-center gap-1"><Badge variant="success" dot></Badge><span>Online</span></div>
    <div class="flex items-center gap-1"><Badge variant="error" dot></Badge><span>Offline</span></div>
    <div class="flex items-center gap-1"><Badge variant="warning" dot></Badge><span>Away</span></div>
  </div>
</ExampleTabs>

<h3>Pulse Animation</h3>
<ExampleTabs code={`<Badge variant="primary" pulse>Pulse</Badge>
<Badge variant="error" dot pulse></Badge>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="badge-pulse">
    <Badge variant="primary" pulse>Pulse</Badge>
    <Badge variant="error" dot pulse></Badge>
  </div>
</ExampleTabs>

<h3>Overlay Position</h3>
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

<h2>Props</h2>
<PropsTable component={BadgeModule} />

<h2>Accessibility</h2>
<ul>
  <li>Uses <code>role="status"</code> for screen readers.</li>
  <li>Dot indicators include <code>aria-label</code> attributes.</li>
  <li>Color contrast meets WCAG AA standards.</li>
  <li>Can be hidden when empty to avoid confusing screen readers.</li>
</ul>
</Container>
