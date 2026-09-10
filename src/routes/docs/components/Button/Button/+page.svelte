<!--
@component
Button documentation page — standardized structure
-->
<script lang="ts">
import Button, * as ButtonModule from "$lib/components/Button/Button.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.btn_heading()}</h1>

  <p>
    <strong>{m.btn_heading()}</strong>
    {m.btn_intro_1()}
    <code>&lt;button&gt;</code>
    {m.btn_intro_2()}
    <code>&lt;a&gt;</code>
    {m.btn_intro_3()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.btn_what_1()}
    <code>&lt;button&gt;</code>
    {m.btn_what_2()}
    <code>&lt;a&gt;</code>
    {m.btn_what_3()}
    <code>href</code>
    {m.btn_what_4()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.btn_when_1()}
    <code>&lt;Button&gt;</code>
    {m.btn_when_2()}
    <code>primary</code>
    {m.btn_when_3()}
    <code>secondary</code>
    {m.btn_when_4()}
    <code>outline</code>/
    <code>ghost</code>
    {m.btn_when_5()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.btn_why_consistent()}</strong> — {m.btn_why_consistent_desc()}.</li>
    <li><strong>{m.btn_why_accessible()}</strong> — {m.btn_why_accessible_desc_1()}<code>&lt;button&gt;</code>{m.btn_why_accessible_desc_2()}.</li>
    <li><strong>{m.btn_why_versatile()}</strong> — {m.btn_why_versatile_desc()}.</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">WAI-ARIA APG — Button</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button">MDN — &lt;button&gt;</a></li>
    <li><a href="https://m3.material.io/components/buttons/overview">Material Design 3 — Buttons</a></li>
    <li><a href="https://primer.style/components/button">Primer — Button</a></li>
    <li><a href="https://ant.design/components/button">Ant Design — Button</a></li>
  </ul>  <h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.btn_impl_1()}</li>
    <li>{m.btn_impl_2()}</li>
    <li>{m.btn_impl_3()}</li>
    <li>{m.btn_impl_4()}</li>
    <li>{m.btn_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.btn_mistake_1()}</li>
    <li>{m.btn_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>ButtonGroup, Chip, Tag, Link</p>

<h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.btn_responsive_1_pre()}<code>fullWidth</code>{m.btn_responsive_1_post()}</li>
    <li>{m.btn_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.btn_custom_variants()}<code>default</code>, <code>primary</code>, <code>secondary</code>, <code>outline</code>, <code>ghost</code>, <code>link</code>.</li>
    <li>{m.btn_custom_sizes()}<code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>.</li>
    <li><code>icon</code> / <code>iconPosition</code>{m.btn_custom_icon()}</li>
    <li><code>loading</code>{m.btn_custom_loading()}</li>
    <li><code>href</code>{m.btn_custom_href_1()}<code>&lt;a&gt;</code>{m.btn_custom_href_2()}<code>&lt;button&gt;</code>{m.btn_custom_href_3()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.btn_ex_basic()}</h3>
  <ExampleTabs code={`<Button>Default Button</Button>`}>
    <div class="flex flex-wrap items-center gap-4" data-testid="button-basic">
      <Button>Default Button</Button>
    </div>
  </ExampleTabs>

  <h3>{m.btn_ex_variants()}</h3>
  <ExampleTabs code={`<Button variant="default">Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}>
    <div class="flex flex-wrap items-center gap-4" data-testid="button-variants">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  </ExampleTabs>

  <h3>{m.btn_ex_sizes()}</h3>
  <ExampleTabs code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}>
    <div class="flex flex-wrap items-center gap-4" data-testid="button-sizes">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  </ExampleTabs>

  <h3>{m.btn_ex_states()}</h3>
  <ExampleTabs code={`<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
<Button fullWidth>Full Width Button</Button>`}>
    <div class="flex flex-wrap items-center gap-4" data-testid="button-states">
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
      <Button fullWidth>Full Width Button</Button>
    </div>
  </ExampleTabs>

  <h3>{m.btn_ex_link()}</h3>
  <ExampleTabs code={`<Button href="/docs">Link Button</Button>
<Button href="https://example.com" target="_blank" variant="primary">External Link</Button>`}>
    <div class="flex flex-wrap items-center gap-4" data-testid="button-link">
      <Button href="/docs">Link Button</Button>
      <Button href="https://example.com" target="_blank" variant="primary">External Link</Button>
    </div>
  </ExampleTabs>

  <h3>{m.btn_ex_icons()}</h3>
  <ExampleTabs code={`<Button icon="tabler:plus">Add Item</Button>
<Button icon="tabler:trash" iconPosition="right">Delete</Button>
<Button icon="tabler:settings" variant="outline">Settings</Button>`}>
    <div class="flex flex-wrap items-center gap-4" data-testid="button-with-icons">
      <Button icon="tabler:plus">Add Item</Button>
      <Button icon="tabler:trash" iconPosition="right">Delete</Button>
      <Button icon="tabler:settings" variant="outline">Settings</Button>
    </div>
  </ExampleTabs>

  <h3>{m.btn_ex_rest()}</h3>
  <ExampleTabs code={`<Button data-rest-pass="button">Rest Props</Button>`}>
    <div class="flex flex-wrap items-center gap-4" data-testid="button-rest-props">
      <Button data-rest-pass="button">Rest Props</Button>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={ButtonModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={ButtonModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.btn_a11y_1_pre()}<code>&lt;button&gt;</code>{m.btn_a11y_1_post()}</li>
    <li>{m.btn_a11y_2_pre()}<code>aria-disabled="true"</code>{m.btn_a11y_2_post()}</li>
    <li>{m.btn_a11y_3()}</li>
    <li>{m.btn_a11y_4_pre()}<code>aria-hidden="true"</code>{m.btn_a11y_4_post()}</li>
    <li>{m.btn_a11y_5_pre()}<code>ariaLabel</code>{m.btn_a11y_5_post()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.btn_kb_1()}</td></tr>
      <tr><td><kbd>Tab</kbd></td><td>{m.btn_kb_2()}</td></tr>
    </tbody>
  </table>
</Container>
