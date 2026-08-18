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
    {#snippet header()}How does the free trial work?{/snippet}
    Start with a 14-day trial — no credit card required.
  </AccordionItem>
  <AccordionItem>
    {#snippet header()}When will I be billed?{/snippet}
    Billing happens on the first day of each billing cycle.
  </AccordionItem>
</Accordion>
    `}
  </CodeBlock>

  <h2>Examples</h2>

  <h3>Billing FAQ</h3>
  <div class="not-prose mb-8" data-testid="accordion-basic">
    <Accordion>
      <AccordionItem>
        {#snippet header()}Is there a free trial?{/snippet}
        <div class="p-4">
          <p>Yes — every new workspace starts with a 14-day free trial. No credit card is required, and you can cancel anytime.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        {#snippet header()}When will I be billed?{/snippet}
        <div class="p-4">
          <p>You'll be billed on the first day of each billing cycle. Invoices are emailed to the workspace owner.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        {#snippet header()}Can I change my plan later?{/snippet}
        <div class="p-4">
          <p>Plans can be upgraded or downgraded anytime from the Billing page. Changes are prorated automatically.</p>
        </div>
      </AccordionItem>
    </Accordion>
  </div>

  <h3>Company Information</h3>
  <div class="not-prose mb-8" data-testid="accordion-multiple">
    <Accordion allowMultiple>
      <AccordionItem>
        {#snippet header()}Our mission{/snippet}
        <div class="p-4">
          <p>We build tools that help small teams ship software with confidence and clarity.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        {#snippet header()}Our story{/snippet}
        <div class="p-4">
          <p>Founded in 2021, we started as a two-person studio and now serve teams in over 40 countries.</p>
        </div>
      </AccordionItem>
    </Accordion>
  </div>

  <h3>Without Border</h3>
  <div class="not-prose mb-8" data-testid="accordion-no-border">
    <Accordion bordered={false}>
      <AccordionItem>
        {#snippet header()}Getting started guide{/snippet}
        <div class="p-4">
          <p>Follow the quickstart to connect your first repository and invite your team.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        {#snippet header()}Support options{/snippet}
        <div class="p-4">
          <p>Email support is available 24/5, and every plan includes access to our docs and community forum.</p>
        </div>
      </AccordionItem>
    </Accordion>
  </div>

  <h3>Plan Comparison</h3>
  <div class="not-prose mb-8" data-testid="accordion-all-collapsed">
    <Accordion defaultExpanded={null}>
      <AccordionItem>
        {#snippet header()}Starter{/snippet}
        <div class="p-4">
          <p>Up to 5 users, 3 projects, and community support — free forever.</p>
        </div>
      </AccordionItem>
      <AccordionItem>
        {#snippet header()}Pro{/snippet}
        <div class="p-4">
          <p>Unlimited users and projects, priority support, and advanced analytics.</p>
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
