<!--
@component
BreadcrumbItem documentation page — standardized structure
-->
<script lang="ts">
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Breadcrumb from "$lib/components/Breadcrumb/Breadcrumb.svelte"
import BreadcrumbItem from "$lib/components/Breadcrumb/BreadcrumbItem.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import * as BreadcrumbItemModule from "$lib/components/Breadcrumb/BreadcrumbItem.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>BreadcrumbItem</h1>

  <p>
    <strong>BreadcrumbItem</strong> is a single item within a Breadcrumb. Items
    with <code>href</code> render as links; the current item renders as plain text
    with <code>aria-current="page"</code>.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A list item in a breadcrumb trail. Renders as an <code>&lt;a&gt;</code> tag when
    <code>href</code> is provided, or as a <code>&lt;span&gt;</code> for the current page.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Always inside a <code>&lt;Breadcrumb&gt;</code>. Each level in the hierarchy
    gets its own BreadcrumbItem. The last item (current page) should not have an href.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Semantics</strong> — proper <code>&lt;li&gt;</code> inside <code>&lt;ol&gt;</code>.</li>
    <li><strong>Current page</strong> — <code>aria-current="page"</code> announces the current location.</li>
    <li><strong>Icons</strong> — optional icon with <code>aria-hidden</code>.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Items</h3>
  <ExampleTabs code={`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
  <BreadcrumbItem>Components</BreadcrumbItem>
</Breadcrumb>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="breadcrumb-item-basic">
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
        <BreadcrumbItem>Components</BreadcrumbItem>
      </Breadcrumb>
    </div>
  </ExampleTabs>

  <h3>With Icons</h3>
  <ExampleTabs code={`<Breadcrumb separator="›">
  <BreadcrumbItem href="/" icon="home">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs" icon="book">Docs</BreadcrumbItem>
  <BreadcrumbItem icon="component">Components</BreadcrumbItem>
</Breadcrumb>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="breadcrumb-item-icons">
      <Breadcrumb separator="›">
        <BreadcrumbItem href="/" icon="home">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs" icon="book">Docs</BreadcrumbItem>
        <BreadcrumbItem icon="component">Components</BreadcrumbItem>
      </Breadcrumb>
    </div>
  </ExampleTabs>

  <h3>Collapsed</h3>
  <ExampleTabs code={`<Breadcrumb collapsible maxVisibleItems={1}>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem>Section A</BreadcrumbItem>
  <BreadcrumbItem>Section B</BreadcrumbItem>
  <BreadcrumbItem>Section C</BreadcrumbItem>
  <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumb>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="breadcrumb-item-collapsed">
      <Breadcrumb collapsible maxVisibleItems={1}>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Section A</BreadcrumbItem>
        <BreadcrumbItem>Section B</BreadcrumbItem>
        <BreadcrumbItem>Section C</BreadcrumbItem>
        <BreadcrumbItem>Current Page</BreadcrumbItem>
      </Breadcrumb>
    </div>
  </ExampleTabs>

  <h3>Links and Current</h3>
  <ExampleTabs code={`<Breadcrumb separator="›">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem href="/products/desk">Desks</BreadcrumbItem>
  <BreadcrumbItem current>Standing Desk</BreadcrumbItem>
</Breadcrumb>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="breadcrumb-item-links">
      <Breadcrumb separator="›">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem href="/products/desk">Desks</BreadcrumbItem>
        <BreadcrumbItem current>Standing Desk</BreadcrumbItem>
      </Breadcrumb>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={BreadcrumbItemModule} />

  <h2>Events</h2>
  <EventsTable component={BreadcrumbItemModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Renders inside <code>&lt;li&gt;</code> within a <code>&lt;ol&gt;</code>.</li>
    <li>Current item: <code>aria-current="page"</code>, rendered as text.</li>
    <li>Separators are <code>aria-hidden</code>.</li>
  </ul>
</Container>
