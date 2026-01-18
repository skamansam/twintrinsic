<!--
@component
Documentation page for the Accordion component
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Accordion from "$lib/components/Accordion/Accordion.svelte"
import AccordionItem from "$lib/components/Accordion/AccordionItem.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
</script>

<article class="prose dark:prose-invert max-w-none">
  <h1>Accordion</h1>
  <p>
    A group of collapsible items where only one can be expanded at a time by default.
    Provides keyboard navigation and full accessibility support with ARIA attributes.
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
  <AccordionItem>
    <svelte:fragment slot="header">Section 1</svelte:fragment>
    Content 1
  </AccordionItem>
  <AccordionItem>
    <svelte:fragment slot="header">Section 2</svelte:fragment>
    Content 2
  </AccordionItem>
</Accordion>

<Accordion allowMultiple>
  <!-- Allows multiple items to be expanded -->
  <AccordionItem>
    <svelte:fragment slot="header">Section 1</svelte:fragment>
    Content 1
  </AccordionItem>
  <AccordionItem>
    <svelte:fragment slot="header">Section 2</svelte:fragment>
    Content 2
  </AccordionItem>
</Accordion>
    `}
  />

  <h2>Examples</h2>

  <h3>Basic Accordion</h3>
  <div class="not-prose mb-8">
    <Accordion>
      <AccordionItem>
        <svelte:fragment slot="header">Section 1</svelte:fragment>
        <div class="p-4">
          <p>Content for section 1. Only one section can be open at a time.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        <svelte:fragment slot="header">Section 2</svelte:fragment>
        <div class="p-4">
          <p>Content for section 2. Opening this will close other sections.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        <svelte:fragment slot="header">Section 3</svelte:fragment>
        <div class="p-4">
          <p>Content for section 3.</p>
        </div>
      </AccordionItem>
    </Accordion>
  </div>

  <h3>Multiple Sections</h3>
  <div class="not-prose mb-8">
    <Accordion allowMultiple>
      <AccordionItem>
        <svelte:fragment slot="header">Multiple 1</svelte:fragment>
        <div class="p-4">
          <p>Multiple sections can be expanded at once.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        <svelte:fragment slot="header">Multiple 2</svelte:fragment>
        <div class="p-4">
          <p>Try expanding this while the other is open.</p>
        </div>
      </AccordionItem>
    </Accordion>
  </div>

  <h3>Without Border</h3>
  <div class="not-prose mb-8">
    <Accordion bordered={false}>
      <AccordionItem>
        <svelte:fragment slot="header">No Border 1</svelte:fragment>
        <div class="p-4">
          <p>This accordion has no border around it.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        <svelte:fragment slot="header">No Border 2</svelte:fragment>
        <div class="p-4">
          <p>Notice the clean look without a border.</p>
        </div>
      </AccordionItem>
    </Accordion>
  </div>

  <h3>All Collapsed</h3>
  <div class="not-prose mb-8">
    <Accordion defaultExpanded={null}>
      <AccordionItem>
        <svelte:fragment slot="header">Collapsed 1</svelte:fragment>
        <div class="p-4">
          <p>All items start in a collapsed state.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        <svelte:fragment slot="header">Collapsed 2</svelte:fragment>
        <div class="p-4">
          <p>Users must click to expand any section.</p>
        </div>
      </AccordionItem>
    </Accordion>
  </div>

  <h2>Props</h2>

  <h3>Accordion</h3>
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
          <td><code>allowMultiple</code></td>
          <td><code>boolean</code></td>
          <td><code>false</code></td>
          <td>Allow multiple items to be expanded simultaneously</td>
        </tr>
        <tr>
          <td><code>bordered</code></td>
          <td><code>boolean</code></td>
          <td><code>true</code></td>
          <td>Add a border around the accordion</td>
        </tr>
        <tr>
          <td><code>defaultExpanded</code></td>
          <td><code>number | null</code></td>
          <td><code>0</code></td>
          <td>Index of initially expanded item (null for all collapsed)</td>
        </tr>
        <tr>
          <td><code>id</code></td>
          <td><code>string</code></td>
          <td><code>random UUID</code></td>
          <td>HTML id for accessibility</td>
        </tr>
        <tr>
          <td><code>class</code></td>
          <td><code>string</code></td>
          <td><code>""</code></td>
          <td>Additional CSS classes</td>
        </tr>
        <tr>
          <td><code>onchange</code></td>
          <td><code>function</code></td>
          <td><code>undefined</code></td>
          <td>Callback fired when expanded items change</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>AccordionItem</h3>
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
          <td><code>disabled</code></td>
          <td><code>boolean</code></td>
          <td><code>false</code></td>
          <td>Disable the item from being toggled</td>
        </tr>
        <tr>
          <td><code>showIcon</code></td>
          <td><code>boolean</code></td>
          <td><code>true</code></td>
          <td>Show the expand/collapse icon</td>
        </tr>
        <tr>
          <td><code>ariaLabel</code></td>
          <td><code>string</code></td>
          <td><code>undefined</code></td>
          <td>ARIA label for the header button</td>
        </tr>
        <tr>
          <td><code>id</code></td>
          <td><code>string</code></td>
          <td><code>random UUID</code></td>
          <td>HTML id for accessibility</td>
        </tr>
        <tr>
          <td><code>class</code></td>
          <td><code>string</code></td>
          <td><code>""</code></td>
          <td>Additional CSS classes</td>
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
          <td><code>expandedItems: number[]</code></td>
          <td>Fired when the expanded items change</td>
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
