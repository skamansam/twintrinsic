<!--
@component
LazyPanel documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import LazyPanel from "$lib/components/Panel/LazyPanel.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as LazyPanelModule from "$lib/components/Panel/LazyPanel.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.lazypanel_heading()}</h1>

  <p>
    <strong>{m.lazypanel_heading()}</strong>{m.lazypanel_intro_1()}<code>IntersectionObserver</code>{m.lazypanel_intro_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.lazypanel_what_1()}<code>IntersectionObserver</code>{m.lazypanel_what_2()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.lazypanel_when_1()}<code>&lt;LazyPanel&gt;</code>{m.lazypanel_when_2()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.lazypanel_why_perf()}</strong>{m.lazypanel_why_perf_desc()}</li>
    <li><strong>{m.lazypanel_why_accessible()}</strong>{m.lazypanel_why_accessible_desc()}</li>
    <li><strong>{m.lazypanel_why_loading()}</strong>{m.lazypanel_why_loading_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">MDN — IntersectionObserver</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details">MDN — &lt;details&gt;</a></li>
    <li><a href="https://primer.style/components/accordion">Primer — Accordion</a></li>
    <li><a href="https://ant.design/components/collapse">Ant Design — Collapse</a></li>
    <li><a href="https://web.dev/articles/content-visibility">web.dev — content-visibility</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.lazypanel_responsive_1()}</li>
    <li>{m.lazypanel_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.lazypanel_custom_1_1()}<code>header</code>{m.lazypanel_custom_1_2()}</li>
    <li>{m.lazypanel_custom_2_1()}<code>loading</code>{m.lazypanel_custom_2_2()}</li>
    <li>{m.lazypanel_custom_3()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.lazypanel_ex_basic()}</h3>
  <ExampleTabs code={`<LazyPanel>
  {#snippet header()}Billing FAQ{/snippet}
  {#snippet loading()}Loading FAQ…{/snippet}
  <div class="p-4">
    <p>How do upgrades work? Upgrades take effect immediately.</p>
  </div>
</LazyPanel>`}>
    <div data-testid="lazypanel-basic">
      <LazyPanel>
        {#snippet header()}Billing FAQ{/snippet}
        {#snippet loading()}Loading FAQ…{/snippet}
        <div class="p-4">
          <p>How do upgrades work? Upgrades take effect immediately and are prorated.</p>
        </div>
      </LazyPanel>
    </div>
  </ExampleTabs>

  <h3>{m.lazypanel_ex_spinner()}</h3>
  <ExampleTabs code={`<LazyPanel>
  {#snippet header()}Account Settings{/snippet}
  {#snippet loading()}
    <div class="p-4 flex items-center justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  {/snippet}
  <div class="p-4">
    <p>Manage your profile, notifications, and security.</p>
  </div>
</LazyPanel>`}>
    <div data-testid="lazypanel-custom-loading">
      <LazyPanel>
        {#snippet header()}Account Settings{/snippet}
        {#snippet loading()}
          <div class="p-4 flex items-center justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        {/snippet}
        <div class="p-4">
          <p>Manage your profile, notifications, and security preferences.</p>
        </div>
      </LazyPanel>
    </div>
  </ExampleTabs>

  <h2>{m.sec_slots()}</h2>
  <table>
    <thead><tr><th>{m.sec_slot()}</th><th>{m.sec_description()}</th></tr></thead>
    <tbody>
      <tr><td><code>header</code></td><td>{m.lazypanel_slot_header()}</td></tr>
      <tr><td><code>loading</code></td><td>{m.lazypanel_slot_loading()}</td></tr>
      <tr><td><code>default</code></td><td>{m.lazypanel_slot_default()}</td></tr>
    </tbody>
  </table>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={LazyPanelModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.lazypanel_a11y_1()}</li>
    <li>{m.lazypanel_a11y_2()}</li>
    <li>{m.lazypanel_a11y_3()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.lazypanel_kb_1()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.lazypanel_kb_2()}</td></tr>
    </tbody>
  </table>
</Container>
