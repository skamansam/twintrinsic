<!--
@component
Splitter documentation page
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import { Splitter, CodeBlock, Container } from "$lib"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Splitter</h1>
  
  <p>
    The Splitter component creates a resizable divider between two adjacent containers, allowing users to drag and adjust the width or height of each panel. It's ideal for layouts like code editors, file explorers, or any interface that needs flexible space allocation.
  </p>

  <h2>Usage</h2>
  <p>
    The Splitter component divides the available space into two panels with a draggable divider between them.
  </p>

  <CodeBlock language="svelte">{`<script>
  import { Splitter } from 'twintrinsic';
</script>

<Splitter orientation="horizontal" initialSize={50}>
  <svelte:fragment slot="first">
    <div class="p-4">Left Panel</div>
  </svelte:fragment>
  <svelte:fragment slot="second">
    <div class="p-4">Right Panel</div>
  </svelte:fragment>
</Splitter>`}</CodeBlock>

  <h3>Horizontal Layout</h3>
  <p>
    Horizontal splitter divides content left and right:
  </p>

  <div class="border border-border rounded-md overflow-hidden mb-4" style="height: 300px;">
    <Splitter orientation="horizontal" initialSize={50}>
      <svelte:fragment slot="first">
        <div class="bg-primary-100 dark:bg-primary-900 p-4 h-full overflow-auto">
          <h3 class="font-bold mb-2">Left Panel</h3>
          <p>Drag the divider to resize</p>
        </div>
      </svelte:fragment>
      <svelte:fragment slot="second">
        <div class="bg-secondary-100 dark:bg-secondary-900 p-4 h-full overflow-auto">
          <h3 class="font-bold mb-2">Right Panel</h3>
          <p>Use arrow keys for fine control</p>
        </div>
      </svelte:fragment>
    </Splitter>
  </div>

  <CodeBlock language="svelte">{`<Splitter orientation="horizontal" initialSize={50}>
  <svelte:fragment slot="first">
    <div>Left content</div>
  </svelte:fragment>
  <svelte:fragment slot="second">
    <div>Right content</div>
  </svelte:fragment>
</Splitter>`}</CodeBlock>

  <h3>Vertical Layout</h3>
  <p>
    Vertical splitter divides content top and bottom:
  </p>

  <div class="border border-border rounded-md overflow-hidden mb-4" style="height: 300px;">
    <Splitter orientation="vertical" initialSize={50}>
      <svelte:fragment slot="first">
        <div class="bg-primary-100 dark:bg-primary-900 p-4 h-full overflow-auto">
          <h3 class="font-bold mb-2">Top Panel</h3>
          <p>Drag the divider to resize</p>
        </div>
      </svelte:fragment>
      <svelte:fragment slot="second">
        <div class="bg-secondary-100 dark:bg-secondary-900 p-4 h-full overflow-auto">
          <h3 class="font-bold mb-2">Bottom Panel</h3>
          <p>Use arrow keys for fine control</p>
        </div>
      </svelte:fragment>
    </Splitter>
  </div>

  <CodeBlock language="svelte">{`<Splitter orientation="vertical" initialSize={50}>
  <svelte:fragment slot="first">
    <div>Top content</div>
  </svelte:fragment>
  <svelte:fragment slot="second">
    <div>Bottom content</div>
  </svelte:fragment>
</Splitter>`}</CodeBlock>

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
        <td><code>orientation</code></td>
        <td><code>"horizontal" | "vertical"</code></td>
        <td><code>"horizontal"</code></td>
        <td>Direction of the splitter divider</td>
      </tr>
      <tr>
        <td><code>initialSize</code></td>
        <td><code>number</code></td>
        <td><code>50</code></td>
        <td>Initial size of first panel as percentage (0-100)</td>
      </tr>
      <tr>
        <td><code>minSize</code></td>
        <td><code>number</code></td>
        <td><code>20</code></td>
        <td>Minimum size for first panel as percentage</td>
      </tr>
      <tr>
        <td><code>maxSize</code></td>
        <td><code>number</code></td>
        <td><code>80</code></td>
        <td>Maximum size for first panel as percentage</td>
      </tr>
      <tr>
        <td><code>storageKey</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>localStorage key for persisting resize preference</td>
      </tr>
      <tr>
        <td><code>onresize</code></td>
        <td><code>(size: number) => void</code></td>
        <td><code>undefined</code></td>
        <td>Callback fired when splitter is resized</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
      <tr>
        <td><code>id</code></td>
        <td><code>string</code></td>
        <td>auto-generated</td>
        <td>HTML id attribute</td>
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
        <td><code>first</code></td>
        <td>Content for the first panel (left or top)</td>
      </tr>
      <tr>
        <td><code>second</code></td>
        <td>Content for the second panel (right or bottom)</td>
      </tr>
    </tbody>
  </table>

  <h2>Features</h2>
  <ul>
    <li>Draggable divider for smooth resizing</li>
    <li>Keyboard support with arrow keys for fine control</li>
    <li>Min/max size constraints to prevent over-resizing</li>
    <li>localStorage persistence to remember user preferences</li>
    <li>Horizontal and vertical layout options</li>
    <li>Smooth transitions and hover effects</li>
    <li>Full accessibility support with ARIA labels</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Use <code>storageKey</code> to persist user resize preferences across sessions</li>
    <li>Set appropriate <code>minSize</code> and <code>maxSize</code> to prevent panels from becoming too small</li>
    <li>Provide meaningful content in both panels to justify the split layout</li>
    <li>Use <code>onresize</code> callback if you need to respond to resize events</li>
    <li>Ensure both panels have scrollable content if they might overflow</li>
  </ul>

  <h2>Keyboard Navigation</h2>
  <ul>
    <li><strong>Arrow Left/Up:</strong> Decrease first panel size by 5%</li>
    <li><strong>Arrow Right/Down:</strong> Increase first panel size by 5%</li>
    <li>Keyboard navigation respects min/max size constraints</li>
  </ul>

  <h2>Accessibility</h2>
  <ul>
    <li>Divider has <code>role="button"</code> for keyboard interaction</li>
    <li>Proper ARIA labels describing resize direction</li>
    <li>Keyboard navigation support with arrow keys</li>
    <li>Visual focus indicators for keyboard users</li>
    <li>Hover effects to indicate interactivity</li>
  </ul>
</Container>
