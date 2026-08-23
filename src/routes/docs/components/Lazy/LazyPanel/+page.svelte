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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>LazyPanel</h1>

  <p>
    <strong>LazyPanel</strong> is a Panel component that only loads its content when it
    becomes visible in the viewport. Built on top of the Panel component with
    <code>IntersectionObserver</code> for lazy loading.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A Panel that defers its content rendering until visible. Combines the collapsible
    Panel with Lazy's <code>IntersectionObserver</code> behavior. Shows a configurable
    loading state while content is being deferred.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;LazyPanel&gt;</code> for expensive-to-render Panel content that is
    off-screen initially: FAQ sections at the bottom of a page, settings panels, or
    content that requires data fetching.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Performance</strong> — defers expensive Panel content.</li>
    <li><strong>Accessible</strong> — inherits Panel's keyboard and ARIA support.</li>
    <li><strong>Loading states</strong> — configurable placeholder while deferring.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">MDN — IntersectionObserver</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details">MDN — &lt;details&gt;</a></li>
    <li><a href="https://primer.style/components/accordion">Primer — Accordion</a></li>
    <li><a href="https://ant.design/components/collapse">Ant Design — Collapse</a></li>
    <li><a href="https://web.dev/articles/content-visibility">web.dev — content-visibility</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Full-width by default; inherits from parent Container.</li>
    <li>Touch targets meet 44×44 px minimum for the header button.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>header</code> snippet — panel header content.</li>
    <li><code>loading</code> snippet — content shown while deferring.</li>
    <li>All Panel props (expanded, disabled, bordered, showIcon, etc.).</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic LazyPanel</h3>
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

  <h3>Custom Loading Spinner</h3>
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

  <h2>Slots</h2>
  <table>
    <thead><tr><th>Slot</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>header</code></td><td>Panel header content</td></tr>
      <tr><td><code>loading</code></td><td>Content shown while deferring</td></tr>
      <tr><td><code>default</code></td><td>Lazily loaded content</td></tr>
    </tbody>
  </table>

  <h2>Props</h2>
  <PropsTable component={LazyPanelModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Inherits all accessibility features from the base Panel component.</li>
    <li>Loading states are announced to screen readers.</li>
    <li>Content updates are announced when lazy loading completes.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Move focus to the panel header</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Toggle the panel open/closed</td></tr>
    </tbody>
  </table>
</Container>
