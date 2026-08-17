<!--
@component
Sidebar documentation page
-->
<script lang="ts">
import { onMount } from "svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Panel from "$lib/components/Panel/Panel.svelte"
import Sidebar from "$lib/components/Sidebar/Sidebar.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SidebarModule from "$lib/components/Sidebar/Sidebar.svelte"

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
  <div class="not-prose mb-8" data-testid="sidebar-basic">
    <div class="h-[400px] bg-surface relative">
      {#if showExamples}
        <Sidebar>
          {#snippet header()}Navigation{/snippet}
          <nav class="space-y-2">
            <a href="#home" class="block p-2 rounded hover:bg-hover">Home</a>
            <a href="#about" class="block p-2 rounded hover:bg-hover">About</a>
            <a href="#settings" class="block p-2 rounded hover:bg-hover">Settings</a>
            <a href="#help" class="block p-2 rounded hover:bg-hover">Help</a>
          </nav>
        </Sidebar>
      {/if}
    </div>
  </div>

  <CodeBlock language="svelte">{`<Sidebar>
  <svelte:fragment slot="header">Navigation</svelte:fragment>
  <nav class="space-y-2">
    <a href="#" class="block p-2 rounded hover:bg-hover">Home</a>
    <a href="#" class="block p-2 rounded hover:bg-hover">About</a>
    <a href="#" class="block p-2 rounded hover:bg-hover">Settings</a>
    <a href="#" class="block p-2 rounded hover:bg-hover">Help</a>
  </nav>
</Sidebar>`}</CodeBlock>

  <h3>Right-positioned Sidebar</h3>
  <div class="not-prose mb-8" data-testid="sidebar-right">
    <div class="h-[400px] bg-surface relative">
      {#if showExamples}
        <Sidebar position="right">
          {#snippet header()}Settings{/snippet}
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="theme-select" class="block text-sm font-medium">Theme</label>
              <select id="theme-select" class="w-full rounded-md border-border bg-background">
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
<PropsTable component={SidebarModule} />

  <h2>Events</h2>
<EventsTable component={SidebarModule} />

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
