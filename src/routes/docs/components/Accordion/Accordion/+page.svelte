<script lang="ts">
import Accordion from "$lib/components/Accordion/Accordion.svelte"
import AccordionItem from "$lib/components/Accordion/AccordionItem.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AccordionModule from "$lib/components/Accordion/Accordion.svelte"
import * as AccordionItemModule from "$lib/components/Accordion/AccordionItem.svelte"
</script>
<!--
@component
Documentation page for the Accordion component
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
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

  <CodeBlock title="Basic Usage">{`
<Accordion>
  <AccordionItem>
    {#snippet header()}Section 1{/snippet}
    Content 1
  </AccordionItem>
  <AccordionItem>
    {#snippet header()}Section 2{/snippet}
    Content 2
  </AccordionItem>
</Accordion>

<Accordion allowMultiple>
  <!-- Allows multiple items to be expanded -->
  <AccordionItem>
    {#snippet header()}Section 1{/snippet}
    Content 1
  </AccordionItem>
  <AccordionItem>
    {#snippet header()}Section 2{/snippet}
    Content 2
  </AccordionItem>
</Accordion>
    `}
  </CodeBlock>

  <h2>Examples</h2>

  <h3>Basic Accordion</h3>
  <div class="not-prose mb-8" data-testid="accordion-basic">
    <Accordion>
      <AccordionItem>
        {#snippet header()}Section 1{/snippet}
        <div class="p-4">
          <p>Content for section 1. Only one section can be open at a time.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        {#snippet header()}Section 2{/snippet}
        <div class="p-4">
          <p>Content for section 2. Opening this will close other sections.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        {#snippet header()}Section 3{/snippet}
        <div class="p-4">
          <p>Content for section 3.</p>
        </div>
      </AccordionItem>
    </Accordion>
  </div>

  <h3>Multiple Sections</h3>
  <div class="not-prose mb-8" data-testid="accordion-multiple">
    <Accordion allowMultiple>
      <AccordionItem>
        {#snippet header()}Multiple 1{/snippet}
        <div class="p-4">
          <p>Multiple sections can be expanded at once.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        {#snippet header()}Multiple 2{/snippet}
        <div class="p-4">
          <p>Try expanding this while the other is open.</p>
        </div>
      </AccordionItem>
    </Accordion>
  </div>

  <h3>Without Border</h3>
  <div class="not-prose mb-8" data-testid="accordion-no-border">
    <Accordion bordered={false}>
      <AccordionItem>
        {#snippet header()}No Border 1{/snippet}
        <div class="p-4">
          <p>This accordion has no border around it.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        {#snippet header()}No Border 2{/snippet}
        <div class="p-4">
          <p>Notice the clean look without a border.</p>
        </div>
      </AccordionItem>
    </Accordion>
  </div>

  <h3>All Collapsed</h3>
  <div class="not-prose mb-8" data-testid="accordion-all-collapsed">
    <Accordion defaultExpanded={null}>
      <AccordionItem>
        {#snippet header()}Collapsed 1{/snippet}
        <div class="p-4">
          <p>All items start in a collapsed state.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        {#snippet header()}Collapsed 2{/snippet}
        <div class="p-4">
          <p>Users must click to expand any section.</p>
        </div>
      </AccordionItem>
    </Accordion>
  </div>

  <h2>Props</h2>

  <h3>Accordion</h3>
  <div class="overflow-x-auto">
    <PropsTable component={AccordionModule} />
  </div>

  <h3>AccordionItem</h3>
  <div class="overflow-x-auto">
    <PropsTable component={AccordionItemModule} />
  </div>

  <h2>Events</h2>
  <div class="overflow-x-auto">
    <EventsTable component={AccordionModule} />
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
