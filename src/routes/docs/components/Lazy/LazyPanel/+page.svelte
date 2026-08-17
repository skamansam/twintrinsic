<!--
@component
Documentation page for the LazyPanel component
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import LazyPanel from "$lib/components/Panel/LazyPanel.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as LazyPanelModule from "$lib/components/Panel/LazyPanel.svelte"
</script>

<article class="prose dark:prose-invert max-w-none">
  <h1>LazyPanel</h1>
  <p>
    A Panel component that only loads its content when it becomes visible in the viewport.
    Built on top of the Panel component with intersection observer for lazy loading.
  </p>

  <h2>Usage</h2>
  <p>
    LazyPanel is perfect for content that is expensive to render or requires data fetching,
    especially when that content might be off-screen initially.
  </p>

  <CodeBlock
    title="Basic Usage"
  >
    {`
<LazyPanel>
  {#snippet header()}Lazy Content{/snippet}
  {#snippet loading()}Loading...{/snippet}
  <ExpensiveComponent />
</LazyPanel>
    `}
  </CodeBlock>

  <h2>Examples</h2>

  <h3>Basic LazyPanel</h3>
  <div class="not-prose mb-8" data-testid="lazypanel-basic">
    <LazyPanel>
      {#snippet header()}Basic Example{/snippet}
      {#snippet loading()}Loading content...{/snippet}
      <div class="p-4">
        <p>This content was loaded lazily when the panel became visible.</p>
      </div>
    </LazyPanel>
  </div>

  <h3>Custom Loading State</h3>
  <div class="not-prose mb-8" data-testid="lazypanel-custom-loading">
    <LazyPanel>
      {#snippet header()}Custom Loading{/snippet}
      {#snippet loading()}
        <div class="p-4 flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      {/snippet}
      <div class="p-4">
        <p>Content with custom loading indicator.</p>
      </div>
    </LazyPanel>
  </div>

  <h2>Props</h2>
  <div class="overflow-x-auto">
    <PropsTable component={LazyPanelModule} />
  </div>

  <h2>Slots</h2>
  <div class="overflow-x-auto">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>default</code></td>
          <td>Content to be loaded lazily</td>
        </tr>
        <tr>
          <td><code>header</code></td>
          <td>Panel header content</td>
        </tr>
        <tr>
          <td><code>loading</code></td>
          <td>Content to show while loading</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Best Practices</h2>
  <ul>
    <li>Use LazyPanel for content that is expensive to render or requires data fetching</li>
    <li>Always provide a loading state to improve user experience</li>
    <li>Consider the rootMargin to start loading content before it becomes visible</li>
    <li>Use multiple LazyPanels for long lists of content to improve initial page load</li>
  </ul>

  <h2>Accessibility</h2>
  <ul>
    <li>Inherits all accessibility features from the base Panel component</li>
    <li>Loading states are properly announced to screen readers</li>
    <li>Content updates are announced when lazy loading completes</li>
  </ul>
</article>
