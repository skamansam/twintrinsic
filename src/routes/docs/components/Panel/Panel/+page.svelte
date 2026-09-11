<!--
@component
Panel documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import Panel from "$lib/components/Panel/Panel.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as PanelModule from "$lib/components/Panel/Panel.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.panel_heading()}</h1>

  <p>
    <strong>{m.panel_heading()}</strong>{m.panel_intro_1()}<code>&lt;button&gt;</code>{m.panel_intro_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.panel_what_1()}<code>&lt;button&gt;</code>{m.panel_what_2()}<code>aria-expanded</code>{m.panel_what_3()}<code>aria-controls</code>{m.panel_what_4()}<code>slide</code>{m.panel_what_5()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.panel_when_1()}<code>&lt;Panel&gt;</code>{m.panel_when_2()}<code>&lt;Card&gt;</code>{m.panel_when_3()}<code>&lt;Container&gt;</code>{m.panel_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.panel_why_space()}</strong> — {m.panel_why_space_desc()}</li>
    <li><strong>{m.panel_why_progressive()}</strong> — {m.panel_why_progressive_desc()}</li>
    <li><strong>{m.panel_why_keyboard()}</strong> — {m.panel_why_keyboard_desc()}</li>
    <li><strong>{m.panel_why_animation()}</strong> — {m.panel_why_animation_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details">MDN — &lt;details&gt;</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/">WAI-ARIA APG — Accordion</a></li>
    <li><a href="https://primer.style/components/box">Primer — Box</a></li>
    <li><a href="https://m3.material.io/components/expansion-panel/overview">Material Design 3 — Expansion panels</a></li>
    <li><a href="https://ant.design/components/collapse">Ant Design — Collapse</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.panel_responsive_1()}</li>
    <li>{m.panel_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>expanded</code>{m.panel_custom_1()}</li>
    <li><code>disabled</code>{m.panel_custom_2()}</li>
    <li><code>bordered</code>{m.panel_custom_3()}</li>
    <li><code>showIcon</code>{m.panel_custom_4()}</li>
    <li>{m.panel_custom_5()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.panel_ex_basic()}</h3>
  <ExampleTabs code={`<Panel class="max-w-xl">
  {#snippet header()}Order Summary{/snippet}
  <div class="space-y-2">
    <div class="flex justify-between"><span>Subtotal</span><span>$149.00</span></div>
    <div class="flex justify-between"><span>Shipping</span><span>Free</span></div>
    <div class="flex justify-between font-medium"><span>Total</span><span>$149.00</span></div>
  </div>
</Panel>`}>
    <div class="max-w-xl" data-testid="panel-basic">
      <Panel>
        {#snippet header()}Order Summary{/snippet}
        <div class="space-y-2">
          <div class="flex justify-between"><span class="text-muted">Subtotal</span><span>$149.00</span></div>
          <div class="flex justify-between"><span class="text-muted">Shipping</span><span>Free</span></div>
          <div class="flex justify-between font-medium border-t pt-2"><span>Total</span><span>$149.00</span></div>
        </div>
      </Panel>
    </div>
  </ExampleTabs>

  <h3>{m.panel_ex_disabled()}</h3>
  <ExampleTabs code={`<Panel disabled class="max-w-xl">
  {#snippet header()}Billing{/snippet}
  <p>Billing is managed by your administrator.</p>
</Panel>`}>
    <div class="max-w-xl" data-testid="panel-disabled">
      <Panel disabled>
        {#snippet header()}Billing{/snippet}
        <p class="text-muted">Billing is managed by your administrator.</p>
      </Panel>
    </div>
  </ExampleTabs>

  <h3>{m.panel_ex_borderless()}</h3>
  <ExampleTabs code={`<Panel bordered={false} class="max-w-xl">
  {#snippet header()}Project Guidelines{/snippet}
  <ul class="list-disc pl-5 space-y-1">
    <li>Keep pull requests under 400 lines</li>
    <li>All new components need unit tests</li>
    <li>Update docs with every public API change</li>
  </ul>
</Panel>`}>
    <div class="max-w-xl" data-testid="panel-borderless">
      <Panel bordered={false}>
        {#snippet header()}Project Guidelines{/snippet}
        <ul class="text-muted list-disc pl-5 space-y-1">
          <li>Keep pull requests under 400 lines</li>
          <li>All new components need unit tests</li>
          <li>Update docs with every public API change</li>
        </ul>
      </Panel>
    </div>
  </ExampleTabs>

  <h2>{m.sec_slots()}</h2>
  <table>
    <thead><tr><th>{m.sec_slot()}</th><th>{m.sec_description()}</th></tr></thead>
    <tbody>
      <tr><td><code>header</code></td><td>{m.panel_slot_header()}</td></tr>
      <tr><td><code>default</code></td><td>{m.panel_slot_default()}</td></tr>
      <tr><td><code>footer</code></td><td>{m.panel_slot_footer()}</td></tr>
    </tbody>
  </table>

  <h3>{m.panel_ex_custom()}</h3>
  <ExampleTabs code={`<Panel>
  {#snippet header()}Custom Header{/snippet}
  <p>Panel with a custom header snippet.</p>
</Panel>`}>
    <div class="max-w-xl" data-testid="panel-custom-header">
      <Panel>
        {#snippet header()}Custom Header{/snippet}
        <p>Panel with a custom header snippet.</p>
      </Panel>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={PanelModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={PanelModule} />

  <h2>{m.panel_compare_heading()}</h2>
  <table>
    <thead><tr><th>{m.container_compare_component()}</th><th>{m.container_compare_when()}</th><th>{m.container_compare_el()}</th></tr></thead>
    <tbody>
      <tr><td><strong>Panel</strong></td><td>{m.panel_compare_panel()}</td><td><code>&lt;button&gt;</code> + <code>&lt;div&gt;</code></td></tr>
      <tr><td><strong>Container</strong></td><td>{m.panel_compare_container()}</td><td><code>&lt;section&gt;</code> / semantic</td></tr>
      <tr><td><strong>Card</strong></td><td>{m.panel_compare_card()}</td><td><code>&lt;article&gt;</code></td></tr>
    </tbody>
  </table>

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.panel_a11y_1_1()}<code>&lt;button&gt;</code>{m.panel_a11y_1_2()}</li>
    <li>{m.panel_a11y_2_1()}<code>aria-expanded</code>{m.panel_a11y_2_2()}<code>aria-controls</code>{m.panel_a11y_2_3()}<code>aria-labelledby</code>{m.panel_a11y_2_4()}</li>
    <li>{m.panel_a11y_3_1()}<code>ariaLabel</code>{m.panel_a11y_3_2()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.panel_kb_1()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.panel_kb_2()}</td></tr>
    </tbody>
  </table>
</Container>
