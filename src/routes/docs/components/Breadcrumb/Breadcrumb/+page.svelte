<!--
@component
Breadcrumb documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Breadcrumb from "$lib/components/Breadcrumb/Breadcrumb.svelte"
import BreadcrumbItem from "$lib/components/Breadcrumb/BreadcrumbItem.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as BreadcrumbModule from "$lib/components/Breadcrumb/Breadcrumb.svelte"
import * as BreadcrumbItemModule from "$lib/components/Breadcrumb/BreadcrumbItem.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Breadcrumb</h1>

  <p>
    <strong>Breadcrumb</strong> shows the user's current location within a site
    hierarchy as a trail of links. Uses native <code>&lt;nav&gt;</code>,
    <code>&lt;ol&gt;</code>, and <code>&lt;li&gt;</code> elements.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A horizontal list of links separated by visual dividers. The last item
    represents the current page (not a link). Collapses middle items when the
    trail is long.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use on every page with 3+ levels of hierarchy. Place at the top of the
    content area. Not needed for single-level sites.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Orientation</strong> — helps users understand where they are in the site structure.</li>
    <li><strong>Navigation</strong> — provides quick access to parent pages.</li>
    <li><strong>Accessibility</strong> — <code>&lt;nav aria-label="Breadcrumb"&gt;</code> lets screen-reader users jump to the trail.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/">WAI-ARIA APG — Breadcrumb</a></li>
    <li><a href="https://primer.style/product/components/Breadcrumbs">Primer — Breadcrumbs</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Semantic `&lt;nav aria-label=&quot;Breadcrumb&quot;&gt;` + `&lt;ol&gt;` + `&lt;li&gt;` structure</li>
    <li>`aria-current=&quot;page&quot;` on the last link (current page)</li>
    <li>Separator styling via CSS `::before` pseudo-element — no JS needed</li>
    <li>`&lt;link&gt;` on each item except the last (which uses `&lt;span&gt;` or `&lt;a aria-current=&quot;page&quot;&gt;`)</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;div&gt;` for breadcrumbs — always `&lt;nav&gt;` + `&lt;ol&gt;` for landmark semantics</li>
    <li>Don't forget `aria-current=&quot;page&quot;` on the last item</li>
</ul>

<h2>Related Components</h2>
<p>App, AppHeader, Sidebar, Tree</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Wraps naturally on narrow screens.</li>
    <li>Collapsible mode hides middle items on overflow.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Custom separator via <code>separator</code> prop.</li>
    <li>Collapsible via <code>collapsible</code> + <code>maxVisibleItems</code>.</li>
    <li>Icons on individual items.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Breadcrumb</h3>
  <ExampleTabs code={`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
  <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="breadcrumb-basic">
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </div>
  </ExampleTabs>

  <h3>Custom Separator</h3>
  <ExampleTabs code={`<Breadcrumb separator="›">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
  <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="breadcrumb-custom-separator">
      <Breadcrumb separator="›">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </div>
  </ExampleTabs>

  <h3>Collapsible</h3>
  <ExampleTabs code={`<Breadcrumb collapsible maxVisibleItems={1}>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
  <BreadcrumbItem href="/docs/components">Components</BreadcrumbItem>
  <BreadcrumbItem href="/docs/components/navigation">Navigation</BreadcrumbItem>
  <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="breadcrumb-collapsible">
      <Breadcrumb collapsible maxVisibleItems={1}>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
        <BreadcrumbItem href="/docs/components">Components</BreadcrumbItem>
        <BreadcrumbItem href="/docs/components/navigation">Navigation</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </div>
  </ExampleTabs>

  <h3>With Icons</h3>
  <ExampleTabs code={`<Breadcrumb>
  <BreadcrumbItem href="/" icon="home">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs" icon="book">Documentation</BreadcrumbItem>
  <BreadcrumbItem icon="component">Components</BreadcrumbItem>
</Breadcrumb>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="breadcrumb-with-icons">
      <Breadcrumb>
        <BreadcrumbItem href="/" icon="home">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs" icon="book">Documentation</BreadcrumbItem>
        <BreadcrumbItem icon="component">Components</BreadcrumbItem>
      </Breadcrumb>
    </div>
  </ExampleTabs>

  <h2>Breadcrumb Props</h2>
  <PropsTable component={BreadcrumbModule} />

  <h2>BreadcrumbItem Props</h2>
  <PropsTable component={BreadcrumbItemModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>&lt;nav aria-label="Breadcrumb"&gt;</code>.</li>
    <li>Ordered list (<code>&lt;ol&gt;</code>) for proper trail semantics.</li>
    <li><code>aria-current="page"</code> on the current (last) item.</li>
    <li>Separators hidden from screen readers via <code>aria-hidden</code>.</li>
  </ul>
</Container>
