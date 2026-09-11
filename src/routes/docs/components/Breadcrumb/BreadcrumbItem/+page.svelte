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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="not-prose mb-6 p-4 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg">
    <p class="text-sm text-primary-700 dark:text-primary-300 m-0">
      <strong>BreadcrumbItem</strong>{m.breadcrumbitem_note_1()}
      <a href="/docs/components/Breadcrumb/Breadcrumb" class="underline font-medium">Breadcrumb</a>{m.breadcrumbitem_note_2()}
    </p>
  </div>

  <h1>{m.breadcrumbitem_heading()}</h1>

  <p>
    <strong>{m.breadcrumbitem_heading()}</strong>{m.breadcrumbitem_intro_1()}<code>href</code>{m.breadcrumbitem_intro_2()}<code>aria-current="page"</code>{m.breadcrumbitem_intro_3()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.breadcrumbitem_what_1()}<code>&lt;a&gt;</code>{m.breadcrumbitem_what_2()}<code>href</code>{m.breadcrumbitem_what_3()}<code>&lt;span&gt;</code>{m.breadcrumbitem_what_4()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.breadcrumbitem_when_1()}<code>&lt;Breadcrumb&gt;</code>{m.breadcrumbitem_when_2()}<code>href</code>{m.breadcrumbitem_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.breadcrumbitem_why_semantics()}</strong>{m.breadcrumbitem_why_semantics_desc_1()}<code>&lt;li&gt;</code>{m.breadcrumbitem_why_semantics_desc_2()}<code>&lt;ol&gt;</code>{m.breadcrumbitem_why_semantics_desc_3()}</li>
    <li><strong>{m.breadcrumbitem_why_current()}</strong>{m.breadcrumbitem_why_current_desc_1()}<code>aria-current="page"</code>{m.breadcrumbitem_why_current_desc_2()}</li>
    <li><strong>{m.breadcrumbitem_why_icons()}</strong>{m.breadcrumbitem_why_icons_desc_1()}<code>aria-hidden</code>{m.breadcrumbitem_why_icons_desc_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.breadcrumbitem_ex_basic()}</h3>
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

  <h3>{m.breadcrumbitem_ex_icons()}</h3>
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

  <h3>{m.breadcrumbitem_ex_collapsed()}</h3>
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

  <h3>{m.breadcrumbitem_ex_links()}</h3>
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

  <h2>{m.sec_props()}</h2>
  <PropsTable component={BreadcrumbItemModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={BreadcrumbItemModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.breadcrumbitem_a11y_1_1()}<code>&lt;li&gt;</code>{m.breadcrumbitem_a11y_1_2()}<code>&lt;ol&gt;</code>{m.breadcrumbitem_a11y_1_3()}</li>
    <li>{m.breadcrumbitem_a11y_2_1()}<code>aria-current="page"</code>{m.breadcrumbitem_a11y_2_2()}</li>
    <li>{m.breadcrumbitem_a11y_3_1()}<code>aria-hidden</code>{m.breadcrumbitem_a11y_3_2()}</li>
  </ul>
</Container>
