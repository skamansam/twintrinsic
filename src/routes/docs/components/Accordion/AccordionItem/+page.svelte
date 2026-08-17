<script lang="ts">
import Accordion from "$lib/components/Accordion/Accordion.svelte"
import AccordionItem from "$lib/components/Accordion/AccordionItem.svelte"
import * as AccordionItemModule from "$lib/components/Accordion/AccordionItem.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>AccordionItem</h1>

  <p>
    The AccordionItem component is a single collapsible panel inside an
    <code>Accordion</code>. It uses the native <code>&lt;details&gt;</code> /
    <code>&lt;summary&gt;</code> elements for semantic disclosure, with a
    custom header snippet, an optional expand/collapse icon, and a disabled
    state.
  </p>

  <h2>Examples</h2>

  <h3>Basic Items</h3>
  <div class="not-prose mb-8 max-w-2xl" data-testid="accordion-item-basic">
    <Accordion>
      <AccordionItem>
        {#snippet header()}<h3 class="font-medium">Getting started</h3>{/snippet}
        <p>Install the package and import the components you need.</p>
      </AccordionItem>
      <AccordionItem>
        {#snippet header()}<h3 class="font-medium">Theming</h3>{/snippet}
        <p>Customize colors and tokens in your Tailwind theme.</p>
      </AccordionItem>
    </Accordion>
  </div>

  <CodeBlock language="svelte">{`<Accordion>
  <AccordionItem>
    {#snippet header()}<h3 class="font-medium">Getting started</h3>{/snippet}
    <p>Install the package and import the components you need.</p>
  </AccordionItem>
  <AccordionItem>
    {#snippet header()}<h3 class="font-medium">Theming</h3>{/snippet}
    <p>Customize colors and tokens in your Tailwind theme.</p>
  </AccordionItem>
</Accordion>`}</CodeBlock>

  <h3>Initially Expanded</h3>
  <div class="not-prose mb-8 max-w-2xl" data-testid="accordion-item-expanded">
    <Accordion defaultExpanded={0}>
      <AccordionItem>
        {#snippet header()}<h3 class="font-medium">FAQ</h3>{/snippet}
        <p>Here is the answer to a frequently asked question.</p>
      </AccordionItem>
      <AccordionItem>
        {#snippet header()}<h3 class="font-medium">Docs</h3>{/snippet}
        <p>Browse the documentation for full details.</p>
      </AccordionItem>
    </Accordion>
  </div>

  <CodeBlock language="svelte">{`<Accordion defaultExpanded={0}>
  <AccordionItem>
    {#snippet header()}<h3 class="font-medium">FAQ</h3>{/snippet}
    <p>Here is the answer to a frequently asked question.</p>
  </AccordionItem>
  <AccordionItem>
    {#snippet header()}<h3 class="font-medium">Docs</h3>{/snippet}
    <p>Browse the documentation for full details.</p>
  </AccordionItem>
</Accordion>`}</CodeBlock>

  <h3>Without Icon</h3>
  <div class="not-prose mb-8 max-w-2xl" data-testid="accordion-item-noicon">
    <Accordion>
      <AccordionItem showIcon={false}>
        {#snippet header()}<h3 class="font-medium">Plain header</h3>{/snippet}
        <p>This item hides the chevron icon.</p>
      </AccordionItem>
    </Accordion>
  </div>

  <CodeBlock language="svelte">{`<Accordion>
  <AccordionItem showIcon={false}>
    {#snippet header()}<h3 class="font-medium">Plain header</h3>{/snippet}
    <p>This item hides the chevron icon.</p>
  </AccordionItem>
</Accordion>`}</CodeBlock>

  <h3>Disabled Item</h3>
  <div class="not-prose mb-8 max-w-2xl" data-testid="accordion-item-disabled">
    <Accordion>
      <AccordionItem>
        {#snippet header()}<h3 class="font-medium">Available</h3>{/snippet}
        <p>This panel can be opened.</p>
      </AccordionItem>
      <AccordionItem disabled>
        {#snippet header()}<h3 class="font-medium">Locked</h3>{/snippet}
        <p>This panel cannot be opened.</p>
      </AccordionItem>
    </Accordion>
  </div>

  <CodeBlock language="svelte">{`<Accordion>
  <AccordionItem>
    {#snippet header()}<h3 class="font-medium">Available</h3>{/snippet}
    <p>This panel can be opened.</p>
  </AccordionItem>
  <AccordionItem disabled>
    {#snippet header()}<h3 class="font-medium">Locked</h3>{/snippet}
    <p>This panel cannot be opened.</p>
  </AccordionItem>
</Accordion>`}</CodeBlock>

  <h2>AccordionItem Props</h2>
  <PropsTable component={AccordionItemModule} />

  <h2>AccordionItem Events</h2>
  <EventsTable component={AccordionItemModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses native <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> for keyboard-accessible disclosure</li>
    <li>By default, only one panel opens at a time via the native <code>name</code> grouping</li>
    <li>Disabled items block toggling and reduce visual emphasis</li>
    <li>The <code>ariaLabel</code> prop names the summary for assistive technology</li>
  </ul>
</Container>
