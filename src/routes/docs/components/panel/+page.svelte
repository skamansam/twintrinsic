<!--
@component
Panel documentation page
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Panel from "$lib/components/Panel/Panel.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Panel</h1>
  
  <p>
    The Panel component is a collapsible container that provides an organized way to
    show and hide content. It features a header that can be clicked to toggle the
    visibility of the content section.
  </p>

  <h2>Examples</h2>

  <h3>Basic Panel</h3>
  <div class="not-prose mb-8">
    <Panel class="max-w-xl">
      <svelte:fragment slot="header">Basic Panel</svelte:fragment>
      <p class="text-muted">
        This is a basic panel with default settings. Click the header or use the
        keyboard to toggle it.
      </p>
    </Panel>
  </div>

  <pre class="language-svelte"><code>{`<Panel>
  <svelte:fragment slot="header">Basic Panel</svelte:fragment>
  <p>Panel content here</p>
</Panel>`}</code></pre>

  <h3>Custom Header with Icon</h3>
  <div class="not-prose mb-8">
    <Panel class="max-w-xl">
      <svelte:fragment slot="header">
        <svg class="w-5 h-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
        <span class="ml-2 font-medium">Settings Panel</span>
      </svelte:fragment>
      <div class="space-y-4">
        <p class="text-muted">Panels can have custom headers with icons and styling.</p>
      </div>
    </Panel>
  </div>

  <h3>Disabled Panel</h3>
  <div class="not-prose mb-8">
    <Panel disabled class="max-w-xl">
      <svelte:fragment slot="header">Disabled Panel</svelte:fragment>
      <p class="text-muted">This panel cannot be toggled.</p>
    </Panel>
  </div>

  <h3>Borderless Panel</h3>
  <div class="not-prose mb-8">
    <Panel bordered={false} class="max-w-xl">
      <svelte:fragment slot="header">Borderless Panel</svelte:fragment>
      <p class="text-muted">A panel without borders for a cleaner look.</p>
    </Panel>
  </div>

  <h2>Props</h2>
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
        <td>Whether the panel is expanded</td>
      </tr>
      <tr>
        <td><code>bordered</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show a border</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to disable the panel controls</td>
      </tr>
      <tr>
        <td><code>showIcon</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show the expand/collapse icon</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>ARIA label for the header button</td>
      </tr>
    </tbody>
  </table>

  <h2>Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>toggle</code></td>
        <td><code>{`{ expanded: boolean }`}</code></td>
        <td>Fired when the panel is toggled</td>
      </tr>
    </tbody>
  </table>

  <h2>Slots</h2>
  <table>
    <thead>
      <tr>
        <th>Slot</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>header</code></td>
        <td>Content for the panel header</td>
      </tr>
      <tr>
        <td>default</td>
        <td>Main content of the panel</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Panel component follows WAI-ARIA guidelines for accordions:
  </p>
  <ul>
    <li>Uses <code>button</code> element for the header to ensure keyboard accessibility</li>
    <li>Proper <code>aria-expanded</code>, <code>aria-controls</code>, and <code>aria-labelledby</code> attributes</li>
    <li>Supports keyboard navigation (Enter/Space to toggle)</li>
    <li>Optional <code>ariaLabel</code> prop for custom button labels</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Function</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><kbd>Tab</kbd></td>
        <td>Moves focus to the panel header</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
        <td>When focus is on the header, toggles the panel</td>
      </tr>
    </tbody>
  </table>
</Container>
