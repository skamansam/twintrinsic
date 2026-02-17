<!--
@component
Sidebar documentation page
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Sidebar from "$lib/components/Sidebar/Sidebar.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Panel from "$lib/components/Panel/Panel.svelte"
import { onMount } from "svelte"

let showExamples = $state(false)

onMount(() => {
  // Delay showing examples to prevent transition glitch on page load
  setTimeout(() => {
    showExamples = true
  }, 100)
})
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Sidebar</h1>
  
  <p>
    The Sidebar component is a collapsible side panel that attaches to its parent
    container. It's built on top of the Panel component and adds positioning,
    mobile responsiveness, and smooth animations.
  </p>

  <h2>Examples</h2>

  <h3>Basic Sidebar</h3>
  <div class="not-prose mb-8">
    <div class="h-[400px] bg-surface relative">
      {#if showExamples}
        <Sidebar>
          <svelte:fragment slot="header">Navigation</svelte:fragment>
          <nav class="space-y-2">
            <a href="#" class="block p-2 rounded hover:bg-hover">Home</a>
            <a href="#" class="block p-2 rounded hover:bg-hover">About</a>
            <a href="#" class="block p-2 rounded hover:bg-hover">Settings</a>
            <a href="#" class="block p-2 rounded hover:bg-hover">Help</a>
          </nav>
        </Sidebar>
      {/if}
    </div>
  </div>

  <CodeBlock language="svelte">{`{`<Sidebar>
  <svelte:fragment slot="header">Navigation</svelte:fragment>
  <nav class="space-y-2">
    <a href="#" class="block p-2 rounded hover:bg-hover">Home</a>
    <a href="#" class="block p-2 rounded hover:bg-hover">About</a>
    <a href="#" class="block p-2 rounded hover:bg-hover">Settings</a>
    <a href="#" class="block p-2 rounded hover:bg-hover">Help</a>
  </nav>
</Sidebar>`}</CodeBlock>

  <h3>Right-positioned Sidebar</h3>
  <div class="not-prose mb-8">
    <div class="h-[400px] bg-surface relative">
      {#if showExamples}
        <Sidebar position="right">
          <svelte:fragment slot="header">Settings</svelte:fragment>
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium">Theme</label>
              <select class="w-full rounded-md border-border bg-background">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
          </div>
        </Sidebar>
      {/if}
    </div>
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
        <td>Whether the sidebar is expanded</td>
      </tr>
      <tr>
        <td><code>position</code></td>
        <td><code>"left" | "right"</code></td>
        <td><code>"left"</code></td>
        <td>Position of the sidebar</td>
      </tr>
      <tr>
        <td><code>width</code></td>
        <td><code>string</code></td>
        <td><code>"16rem"</code></td>
        <td>Width of the sidebar when expanded</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to disable the sidebar controls</td>
      </tr>
      <tr>
        <td><code>showBackdrop</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show a backdrop when expanded on mobile</td>
      </tr>
      <tr>
        <td><code>floatOnMobile</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to float over content on mobile</td>
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
        <td>ARIA label</td>
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
        <td>Fired when the sidebar is toggled</td>
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
        <td>Content for the sidebar header</td>
      </tr>
      <tr>
        <td>default</td>
        <td>Main content of the sidebar</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Sidebar component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses <code>role="complementary"</code> for the sidebar container</li>
    <li>Uses <code>role="region"</code> for the content area</li>
    <li>Proper ARIA labelling and relationships</li>
    <li>Keyboard support for closing (Escape key)</li>
    <li>Focus management when using the backdrop</li>
  </ul>

  <h2>Mobile Support</h2>
  <p>
    The sidebar is fully responsive and provides two modes for mobile:
  </p>
  <ul>
    <li>
      <strong>Float mode</strong> (default): The sidebar floats over the content
      with a backdrop when expanded
    </li>
    <li>
      <strong>Inline mode</strong>: The sidebar pushes the content when expanded,
      taking full width
    </li>
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
        <td>Moves focus through interactive elements</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
        <td>When focus is on the header, toggles the sidebar</td>
      </tr>
      <tr>
        <td><kbd>Escape</kbd></td>
        <td>Closes the sidebar</td>
      </tr>
    </tbody>
  </table>
</Container>
