<!--
@component
Documentation page for the LazyPanel component
-->
<script lang="ts">
import LazyPanel from "$lib/components/Panel/LazyPanel.svelte"
import { CodeBlock } from "$lib/components/CodeBlock"
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
    code={`
<LazyPanel>
  <svelte:fragment slot="header">Lazy Content</svelte:fragment>
  <svelte:fragment slot="loading">Loading...</svelte:fragment>
  <ExpensiveComponent />
</LazyPanel>
    `}
  />

  <h2>Examples</h2>

  <h3>Basic LazyPanel</h3>
  <div class="not-prose mb-8">
    <LazyPanel>
      <svelte:fragment slot="header">Basic Example</svelte:fragment>
      <svelte:fragment slot="loading">Loading content...</svelte:fragment>
      <div class="p-4">
        <p>This content was loaded lazily when the panel became visible.</p>
      </div>
    </LazyPanel>
  </div>

  <h3>Custom Loading State</h3>
  <div class="not-prose mb-8">
    <LazyPanel>
      <svelte:fragment slot="header">Custom Loading</svelte:fragment>
      <svelte:fragment slot="loading">
        <div class="p-4 flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </svelte:fragment>
      <div class="p-4">
        <p>Content with custom loading indicator.</p>
      </div>
    </LazyPanel>
  </div>

  <h2>Props</h2>
  <div class="overflow-x-auto">
    <table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>expanded</code></td>
          <td><code>boolean</code></td>
          <td><code>true</code></td>
          <td>Whether the panel is expanded initially</td>
        </tr>
        <tr>
          <td><code>class</code></td>
          <td><code>string</code></td>
          <td><code>''</code></td>
          <td>Additional CSS classes</td>
        </tr>
        <tr>
          <td><code>rootMargin</code></td>
          <td><code>string</code></td>
          <td><code>'50px'</code></td>
          <td>Root margin for intersection observer</td>
        </tr>
        <tr>
          <td><code>threshold</code></td>
          <td><code>number</code></td>
          <td><code>0</code></td>
          <td>Threshold for intersection observer</td>
        </tr>
      </tbody>
    </table>
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
