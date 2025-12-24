<!--
@component
BottomBar documentation page
-->

<style>
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import BottomBar from "$lib/components/BottomBar/BottomBar.svelte"
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
  <h1>BottomBar</h1>
  
  <p>
    The BottomBar component is a collapsible panel that attaches to the bottom of
    its parent container. It's built on top of the Panel component and adds
    positioning, mobile responsiveness, and smooth animations.
  </p>

  <h2>Examples</h2>

  <h3>Basic BottomBar</h3>
  <div class="not-prose mb-8">
    <div class="h-[400px] bg-surface relative">
      {#if showExamples}
        <BottomBar>
          <svelte:fragment slot="header">Details</svelte:fragment>
          <div class="p-4">
            <h3 class="text-lg font-medium mb-2">Project Information</h3>
            <div class="space-y-2">
              <p>Created: April 6, 2025</p>
              <p>Status: In Progress</p>
              <p>Owner: John Doe</p>
            </div>
          </div>
        </BottomBar>
      {/if}
    </div>
  </div>

  <pre class="language-svelte"><code>{`<BottomBar>
  <svelte:fragment slot="header">Details</svelte:fragment>
  <div class="p-4">
    <h3 class="text-lg font-medium mb-2">Project Information</h3>
    <div class="space-y-2">
      <p>Created: April 6, 2025</p>
      <p>Status: In Progress</p>
      <p>Owner: John Doe</p>
    </div>
  </div>
</BottomBar>`}</code></pre>

  <h3>Console Example</h3>
  <div class="not-prose mb-8">
    <div class="h-[400px] bg-surface relative">
      {#if showExamples}
        <BottomBar height="20rem">
          <svelte:fragment slot="header">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
              </svg>
              Console
            </div>
          </svelte:fragment>
          <div class="font-mono text-sm p-4 space-y-2">
            <p class="text-success-500">✓ Build completed successfully</p>
            <p class="text-warning-500">⚠ Unused variable detected</p>
            <p class="text-error-bold">✕ Failed to load resource</p>
            <p>> Loading dependencies...</p>
            <p>> Starting development server...</p>
            <p class="text-success-500">✓ Server is running on port 3000</p>
          </div>
        </BottomBar>
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
        <td>Whether the bottom bar is expanded</td>
      </tr>
      <tr>
        <td><code>height</code></td>
        <td><code>string</code></td>
        <td><code>"16rem"</code></td>
        <td>Height of the bottom bar when expanded</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to disable the bottom bar controls</td>
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
        <td><code>docked</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to dock to viewport instead of parent</td>
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
        <td>Fired when the bottom bar is toggled</td>
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
        <td>Content for the bottom bar header</td>
      </tr>
      <tr>
        <td>default</td>
        <td>Main content of the bottom bar</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The BottomBar component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses <code>role="complementary"</code> for the bottom bar container</li>
    <li>Uses <code>role="region"</code> for the content area</li>
    <li>Proper ARIA labelling and relationships</li>
    <li>Keyboard support for closing (Escape key)</li>
    <li>Focus management when using the backdrop</li>
  </ul>

  <h2>Mobile Support</h2>
  <p>
    The bottom bar is fully responsive and provides two modes for mobile:
  </p>
  <ul>
    <li>
      <strong>Float mode</strong> (default): The bottom bar floats over the content
      with a backdrop when expanded
    </li>
    <li>
      <strong>Inline mode</strong>: The bottom bar pushes the content when
      expanded, taking full width
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
        <td>When focus is on the header, toggles the bottom bar</td>
      </tr>
      <tr>
        <td><kbd>Escape</kbd></td>
        <td>Closes the bottom bar</td>
      </tr>
    </tbody>
  </table>
</Container>
