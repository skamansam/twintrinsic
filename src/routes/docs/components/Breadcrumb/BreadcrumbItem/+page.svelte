<script lang="ts">
import Breadcrumb from "$lib/components/Breadcrumb/Breadcrumb.svelte"
import BreadcrumbItem from "$lib/components/Breadcrumb/BreadcrumbItem.svelte"
import * as BreadcrumbItemModule from "$lib/components/Breadcrumb/BreadcrumbItem.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>BreadcrumbItem</h1>

  <p>
    The BreadcrumbItem component is a single item within a
    <code>Breadcrumb</code>. Items with an <code>href</code> render as links;
    the last item (or one marked <code>current</code>) renders as plain text
    with <code>aria-current="page"</code>. Items can carry icons and can be
    hidden when the parent breadcrumb is collapsed.
  </p>

  <h2>Examples</h2>

  <h3>Basic Items</h3>
  <div class="not-prose mb-8" data-testid="breadcrumb-item-basic">
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
      <BreadcrumbItem>Components</BreadcrumbItem>
    </Breadcrumb>
  </div>

  <CodeBlock language="svelte">{`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
  <BreadcrumbItem>Components</BreadcrumbItem>
</Breadcrumb>`}</CodeBlock>

  <h3>Links and Current Item</h3>
  <div class="not-prose mb-8" data-testid="breadcrumb-item-links">
    <Breadcrumb separator="›">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem href="/products/desk">Desks</BreadcrumbItem>
      <BreadcrumbItem current>Standing Desk</BreadcrumbItem>
    </Breadcrumb>
  </div>

  <CodeBlock language="svelte">{`<Breadcrumb separator="›">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem href="/products/desk">Desks</BreadcrumbItem>
  <BreadcrumbItem current>Standing Desk</BreadcrumbItem>
</Breadcrumb>`}</CodeBlock>

  <h3>With Icons</h3>
  <div class="not-prose mb-8" data-testid="breadcrumb-item-icons">
    <Breadcrumb>
      <BreadcrumbItem href="/" icon="home">Home</BreadcrumbItem>
      <BreadcrumbItem href="/account" icon="user">Account</BreadcrumbItem>
      <BreadcrumbItem icon="settings">Settings</BreadcrumbItem>
    </Breadcrumb>
  </div>

  <CodeBlock language="svelte">{`<Breadcrumb>
  <BreadcrumbItem href="/" icon="home">Home</BreadcrumbItem>
  <BreadcrumbItem href="/account" icon="user">Account</BreadcrumbItem>
  <BreadcrumbItem icon="settings">Settings</BreadcrumbItem>
</Breadcrumb>`}</CodeBlock>

  <h3>Collapsed Breadcrumb</h3>
  <p>
    With <code>collapsible</code> on the parent, middle items are hidden
    (the first and last stay visible):
  </p>
  <div class="not-prose mb-8" data-testid="breadcrumb-item-collapsed">
    <Breadcrumb collapsible maxVisibleItems={1}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/a">Section A</BreadcrumbItem>
      <BreadcrumbItem href="/a/b">Section B</BreadcrumbItem>
      <BreadcrumbItem href="/a/b/c">Section C</BreadcrumbItem>
      <BreadcrumbItem>Current Page</BreadcrumbItem>
    </Breadcrumb>
  </div>

  <CodeBlock language="svelte">{`<Breadcrumb collapsible maxVisibleItems={1}>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/a">Section A</BreadcrumbItem>
  <BreadcrumbItem href="/a/b">Section B</BreadcrumbItem>
  <BreadcrumbItem href="/a/b/c">Section C</BreadcrumbItem>
  <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumb>`}</CodeBlock>

  <h2>BreadcrumbItem Props</h2>
  <PropsTable component={BreadcrumbItemModule} />

  <h2>BreadcrumbItem Events</h2>
  <EventsTable component={BreadcrumbItemModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Items render inside a <code>&lt;ol&gt;</code>/<code>&lt;li&gt;</code> list within a <code>nav</code> landmark</li>
    <li>The current item exposes <code>aria-current="page"</code> and renders as text (not a link)</li>
    <li>Separators are <code>aria-hidden</code> so screen readers hear the trail, not the symbols</li>
  </ul>
</Container>
