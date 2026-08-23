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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Panel</h1>

  <p>
    <strong>Panel</strong> is a collapsible container that provides an organized way to
    show and hide content. It features a header that can be clicked to toggle the
    visibility of the content section, using native <code>&lt;button&gt;</code> elements
    for built-in accessibility.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A disclosure widget with a clickable header and expandable body. The toggle mechanism
    uses a <code>&lt;button&gt;</code> element with proper <code>aria-expanded</code> and
    <code>aria-controls</code> attributes. Content slides open/closed with Svelte's
    <code>slide</code> transition.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Panel&gt;</code> for content that can be collapsed to save vertical space:
    FAQ sections, settings panels, advanced options, or collapsible documentation. For
    always-visible content, use <code>&lt;Card&gt;</code>. For layout wrapping, use
    <code>&lt;Container&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Space saving</strong> — collapse less-used content to reduce page length.</li>
    <li><strong>Progressive disclosure</strong> — show details on demand.</li>
    <li><strong>Keyboard accessible</strong> — toggle with Enter/Space via native button.</li>
    <li><strong>Smooth animation</strong> — slide transition for expand/collapse.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details">MDN — &lt;details&gt;</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/">WAI-ARIA APG — Accordion</a></li>
    <li><a href="https://primer.style/components/box">Primer — Box</a></li>
    <li><a href="https://m3.material.io/components/expansion-panel/overview">Material Design 3 — Expansion panels</a></li>
    <li><a href="https://ant.design/components/collapse">Ant Design — Collapse</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Full-width by default; set max-width via <code>class</code>.</li>
    <li>Touch targets meet 44×44 px minimum for the header button.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>expanded</code> — controlled open/close state.</li>
    <li><code>disabled</code> — disable the toggle.</li>
    <li><code>bordered</code> — show/hide border.</li>
    <li><code>showIcon</code> — show/hide the chevron icon.</li>
    <li>Header, body, and footer snippets for full content control.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Order Summary</h3>
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

  <h3>Disabled Panel</h3>
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

  <h3>Borderless Panel</h3>
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

  <h2>Slots</h2>
  <table>
    <thead><tr><th>Slot</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>header</code></td><td>Content for the panel header</td></tr>
      <tr><td><code>default</code></td><td>Main panel body content</td></tr>
      <tr><td><code>footer</code></td><td>Content below the body (actions)</td></tr>
    </tbody>
  </table>

  <h2>Props</h2>
  <PropsTable component={PanelModule} />

  <h2>Events</h2>
  <EventsTable component={PanelModule} />

  <h2>When to Use Panel vs Container vs Card</h2>
  <table>
    <thead><tr><th>Component</th><th>Use When</th><th>HTML Element</th></tr></thead>
    <tbody>
      <tr><td><strong>Panel</strong></td><td>Collapsible/expandable content</td><td><code>&lt;button&gt;</code> + <code>&lt;div&gt;</code></td></tr>
      <tr><td><strong>Container</strong></td><td>Page/section layout with max-width</td><td><code>&lt;section&gt;</code> / semantic</td></tr>
      <tr><td><strong>Card</strong></td><td>Self-contained, always-visible content</td><td><code>&lt;article&gt;</code></td></tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <ul>
    <li>Header uses a native <code>&lt;button&gt;</code> for keyboard accessibility.</li>
    <li>Proper <code>aria-expanded</code>, <code>aria-controls</code>, and <code>aria-labelledby</code> attributes.</li>
    <li>Optional <code>ariaLabel</code> prop for custom button labels.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Move focus to the panel header button</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Toggle the panel open/closed</td></tr>
    </tbody>
  </table>
</Container>
