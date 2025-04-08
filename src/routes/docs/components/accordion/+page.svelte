<!--
@component
Documentation page for the Accordion component
-->

<style>
  @reference '$lib/twintrinsic.css';
</style>
<script>
import Accordion from "$lib/components/Panel/Accordion.svelte"
import Panel from "$lib/components/Panel/Panel.svelte"
import { CodeBlock } from "$lib/components/CodeBlock"
</script>

<article class="prose dark:prose-invert max-w-none">
  <h1>Accordion</h1>
  <p>
    A group of collapsible panels where only one can be expanded at a time by default.
    Built on top of the Panel component with coordinated expansion behavior.
  </p>

  <h2>Usage</h2>
  <p>
    Accordions are useful for organizing related content into collapsible sections,
    making it easier for users to find and focus on specific information.
  </p>

  <CodeBlock
    title="Basic Usage"
    code={`
<Accordion>
  <Panel>
    <svelte:fragment slot="header">Section 1</svelte:fragment>
    Content 1
  </Panel>
  <Panel>
    <svelte:fragment slot="header">Section 2</svelte:fragment>
    Content 2
  </Panel>
</Accordion>

<Accordion multiple>
  <!-- Allows multiple panels to be expanded -->
  <Panel>Section 1</Panel>
  <Panel>Section 2</Panel>
</Accordion>
    `}
  />

  <h2>Examples</h2>

  <h3>Basic Accordion</h3>
  <div class="not-prose mb-8">
    <Accordion>
      <Panel>
        <svelte:fragment slot="header">Section 1</svelte:fragment>
        <div class="p-4">
          <p>Content for section 1. Only one section can be open at a time.</p>
        </div>
      </Panel>
      <Panel>
        <svelte:fragment slot="header">Section 2</svelte:fragment>
        <div class="p-4">
          <p>Content for section 2. Opening this will close other sections.</p>
        </div>
      </Panel>
      <Panel>
        <svelte:fragment slot="header">Section 3</svelte:fragment>
        <div class="p-4">
          <p>Content for section 3.</p>
        </div>
      </Panel>
    </Accordion>
  </div>

  <h3>Multiple Sections</h3>
  <div class="not-prose mb-8">
    <Accordion multiple>
      <Panel>
        <svelte:fragment slot="header">Multiple 1</svelte:fragment>
        <div class="p-4">
          <p>Multiple sections can be expanded at once.</p>
        </div>
      </Panel>
      <Panel>
        <svelte:fragment slot="header">Multiple 2</svelte:fragment>
        <div class="p-4">
          <p>Try expanding this while the other is open.</p>
        </div>
      </Panel>
    </Accordion>
  </div>

  <h3>Without Dividers</h3>
  <div class="not-prose mb-8">
    <Accordion dividers={false}>
      <Panel>
        <svelte:fragment slot="header">No Dividers 1</svelte:fragment>
        <div class="p-4">
          <p>This accordion has no dividers between panels.</p>
        </div>
      </Panel>
      <Panel>
        <svelte:fragment slot="header">No Dividers 2</svelte:fragment>
        <div class="p-4">
          <p>Notice the clean look without separators.</p>
        </div>
      </Panel>
    </Accordion>
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
          <td><code>multiple</code></td>
          <td><code>boolean</code></td>
          <td><code>false</code></td>
          <td>Allow multiple panels to be expanded</td>
        </tr>
        <tr>
          <td><code>dividers</code></td>
          <td><code>boolean</code></td>
          <td><code>true</code></td>
          <td>Show dividers between panels</td>
        </tr>
        <tr>
          <td><code>disabled</code></td>
          <td><code>boolean</code></td>
          <td><code>false</code></td>
          <td>Disable all panels</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Events</h2>
  <div class="overflow-x-auto">
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
          <td><code>change</code></td>
          <td><code>{ panel, expanded, activePanels }</code></td>
          <td>Fired when a panel's expanded state changes</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Best Practices</h2>
  <ul>
    <li>Use accordions to organize related content into digestible sections</li>
    <li>Keep headers clear and concise</li>
    <li>Consider using multiple mode for related but independent content</li>
    <li>Use dividers to clearly separate sections when appropriate</li>
    <li>Ensure content within panels is properly structured</li>
  </ul>

  <h2>Accessibility</h2>
  <ul>
    <li>Uses proper ARIA attributes for accordion pattern</li>
    <li>Supports keyboard navigation</li>
    <li>Panel state changes are announced to screen readers</li>
    <li>Headers are properly labeled and associated with their content</li>
  </ul>

  <h2>Keyboard Navigation</h2>
  <ul>
    <li><kbd>Enter</kbd> or <kbd>Space</kbd>: Toggle panel expansion</li>
    <li><kbd>Tab</kbd>: Move focus between panels</li>
    <li><kbd>Shift</kbd> + <kbd>Tab</kbd>: Move focus to previous panel</li>
  </ul>
</article>
