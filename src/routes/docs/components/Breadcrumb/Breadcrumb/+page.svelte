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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.breadcrumb_heading()}</h1>

  <p>
    <strong>{m.breadcrumb_heading()}</strong>{m.breadcrumb_intro_1()}<code>&lt;nav&gt;</code>{m.breadcrumb_intro_2()}<code>&lt;ol&gt;</code>{m.breadcrumb_intro_3()}<code>&lt;li&gt;</code>{m.breadcrumb_intro_4()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.breadcrumb_what_1()}</p>

  <h3>{m.sec_when()}</h3>
  <p>{m.breadcrumb_when_1()}</p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.breadcrumb_why_orientation()}</strong>{m.breadcrumb_why_orientation_desc()}</li>
    <li><strong>{m.breadcrumb_why_navigation()}</strong>{m.breadcrumb_why_navigation_desc()}</li>
    <li><strong>{m.breadcrumb_why_a11y()}</strong>{m.breadcrumb_why_a11y_desc_1()}<code>&lt;nav aria-label="Breadcrumb"&gt;</code>{m.breadcrumb_why_a11y_desc_2()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/">WAI-ARIA APG — Breadcrumb</a></li>
    <li><a href="https://primer.style/product/components/Breadcrumbs">Primer — Breadcrumbs</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.breadcrumb_impl_1()}<code>&lt;nav aria-label="Breadcrumb"&gt;</code>{m.breadcrumb_impl_2()}<code>&lt;ol&gt;</code>{m.breadcrumb_impl_3()}<code>&lt;li&gt;</code>{m.breadcrumb_impl_4()}</li>
    <li><code>aria-current="page"</code>{m.breadcrumb_impl_5()}</li>
    <li>{m.breadcrumb_impl_6()}<code>::before</code>{m.breadcrumb_impl_7()}</li>
    <li>{m.breadcrumb_impl_8()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.breadcrumb_mistake_1_1()}<code>&lt;nav&gt;</code>{m.breadcrumb_mistake_1_2()}</li>
    <li>{m.breadcrumb_mistake_2_1()}<code>aria-current="page"</code>{m.breadcrumb_mistake_2_2()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>App, AppHeader, Sidebar, Tree</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.breadcrumb_responsive_1()}</li>
    <li>{m.breadcrumb_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.breadcrumb_custom_1_1()}<code>separator</code>{m.breadcrumb_custom_1_2()}</li>
    <li>{m.breadcrumb_custom_2_1()}<code>collapsible</code>{m.breadcrumb_custom_2_2()}<code>maxVisibleItems</code>{m.breadcrumb_custom_2_3()}</li>
    <li>{m.breadcrumb_custom_3()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.breadcrumb_ex_basic()}</h3>
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

  <h3>{m.breadcrumb_ex_separator()}</h3>
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

  <h3>{m.breadcrumb_ex_datadriven()}</h3>
  <p>
    {m.breadcrumb_ex_datadriven_desc_1()}<code>&lt;BreadcrumbItem&gt;</code>{m.breadcrumb_ex_datadriven_desc_2()}
  </p>
  <ExampleTabs code={`<Breadcrumb items={[\n  { name: 'Home', link: '/' },\n  { name: 'Docs', link: '/docs', icon: 'tabler:book' },\n  { name: 'Components', link: '/docs/components' },\n  { name: 'Breadcrumb' }\n]} />`}>
    <div class="p-4 bg-surface rounded-md" data-testid="breadcrumb-data-driven">
      <Breadcrumb items={[{ name: 'Home', link: '/' }, { name: 'Docs', link: '/docs', icon: 'tabler:book' }, { name: 'Components', link: '/docs/components' }, { name: 'Breadcrumb' }]} />
    </div>
  </ExampleTabs>

  <h3>{m.breadcrumb_ex_collapsible()}</h3>
  <ExampleTabs code={`<Breadcrumb
  collapsible
  maxVisibleItems={1}
  items={[\n    { name: 'Home', link: '/' },\n    { name: 'Docs', link: '/docs' },\n    { name: 'Components', link: '/docs/components' },\n    { name: 'Navigation', link: '/docs/components/navigation' },\n    { name: 'Breadcrumb' }\n  ]}
/>`}>
    <div class="p-4 bg-surface rounded-md" data-testid="breadcrumb-collapsible">
      <Breadcrumb collapsible maxVisibleItems={1} items={[{ name: 'Home', link: '/' }, { name: 'Docs', link: '/docs' }, { name: 'Components', link: '/docs/components' }, { name: 'Navigation', link: '/docs/components/navigation' }, { name: 'Breadcrumb' }]} />
    </div>
  </ExampleTabs>

  <h3>{m.breadcrumb_ex_icons()}</h3>
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

  <h2>{m.breadcrumb_props()}</h2>
  <PropsTable component={BreadcrumbModule} />

  <h2>{m.breadcrumb_props_item()}</h2>
  <PropsTable component={BreadcrumbItemModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.breadcrumb_a11y_1_1()}<code>&lt;nav aria-label="Breadcrumb"&gt;</code>.</li>
    <li>{m.breadcrumb_a11y_2_1()}<code>&lt;ol&gt;</code>{m.breadcrumb_a11y_2_2()}</li>
    <li><code>aria-current="page"</code>{m.breadcrumb_a11y_3()}</li>
    <li>{m.breadcrumb_a11y_4_1()}<code>aria-hidden</code>{m.breadcrumb_a11y_4_2()}</li>
  </ul>
</Container>
