<!--
@component
Accordion documentation page — standardized structure
-->
<script lang="ts">
import Accordion from "$lib/components/Accordion/Accordion.svelte"
import AccordionItem from "$lib/components/Accordion/AccordionItem.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AccordionModule from "$lib/components/Accordion/Accordion.svelte"
import * as AccordionItemModule from "$lib/components/Accordion/AccordionItem.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.accordion_heading()}</h1>

  <p>
    <strong>{m.accordion_heading()}</strong>{m.accordion_intro_1()}<code>&lt;details&gt;</code>{m.accordion_intro_2()}<code>&lt;summary&gt;</code>{m.accordion_intro_3()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.accordion_what_1()}<code>&lt;details&gt;</code>{m.accordion_what_2()}<code>name</code>{m.accordion_what_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.accordion_when_1()}<code>&lt;Accordion&gt;</code>{m.accordion_when_2()}<code>&lt;Panel&gt;</code>{m.accordion_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.accordion_why_native()}</strong> — <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> {m.accordion_why_native_desc()}</li>
    <li><strong>{m.accordion_why_exclusive()}</strong> — {m.accordion_why_exclusive_desc_1()}<code>name</code>{m.accordion_why_exclusive_desc_2()}</li>
    <li><strong>{m.accordion_why_pe()}</strong> — {m.accordion_why_pe_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details">MDN — &lt;details&gt;</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/">WAI-ARIA APG — Accordion</a></li>
    <li><a href="https://primer.style/components/accordion">Primer — Accordion</a></li>
    <li><a href="https://m3.material.io/components/expansion-panel/overview">Material Design 3 — Expansion panels</a></li>
    <li><a href="https://ant.design/components/collapse">Ant Design — Collapse</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.accordion_impl_1()}</li>
    <li>{m.accordion_impl_2()}</li>
    <li>{m.accordion_impl_3()}</li>
    <li>{m.accordion_impl_4()}</li>
    <li>{m.accordion_impl_5()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.accordion_mistake_1()}</li>
    <li>{m.accordion_mistake_2()}</li>
    <li>{m.accordion_mistake_3()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>Tabs, Tree, Menu</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.accordion_responsive_1()}</li>
    <li>{m.accordion_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>allowMultiple</code>{m.accordion_custom_1()}</li>
    <li><code>defaultExpanded</code>{m.accordion_custom_2_1()}<code>null</code>{m.accordion_custom_2_2()}</li>
    <li><code>bordered</code>{m.accordion_custom_3()}</li>
    <li>{m.accordion_custom_4()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.accordion_ex_faq()}</h3>
  <ExampleTabs code={`<Accordion>
  <AccordionItem>
    {#snippet header()}Is there a free trial?{/snippet}
    <div class="p-4">
      <p>Yes — every new workspace starts with a 14-day free trial.</p>
    </div>
  </AccordionItem>
  <AccordionItem>
    {#snippet header()}When will I be billed?{/snippet}
    <div class="p-4">
      <p>You'll be billed on the first day of each billing cycle.</p>
    </div>
  </AccordionItem>
</Accordion>`}>
    <div class="max-w-2xl" data-testid="accordion-basic">
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
  </ExampleTabs>

  <h3>{m.accordion_ex_multiple()}</h3>
  <ExampleTabs code={`<Accordion allowMultiple>
  <AccordionItem>
    {#snippet header()}Our mission{/snippet}
    <div class="p-4">We build tools that help small teams ship software.</div>
  </AccordionItem>
  <AccordionItem>
    {#snippet header()}Our story{/snippet}
    <div class="p-4">Founded in 2021, we now serve teams in over 40 countries.</div>
  </AccordionItem>
</Accordion>`}>
    <div class="max-w-2xl" data-testid="accordion-multiple">
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
  </ExampleTabs>

  <h3>{m.accordion_ex_noborder()}</h3>
  <ExampleTabs code={`<Accordion bordered={false}>
  <AccordionItem>
    {#snippet header()}What's included?{/snippet}
    <div class="p-4">All plans include unlimited projects and team members.</div>
  </AccordionItem>
  <AccordionItem>
    {#snippet header()}What support do you offer?{/snippet}
    <div class="p-4">Email support for free plans, priority for paid.</div>
  </AccordionItem>
</Accordion>`}>
    <div class="max-w-2xl" data-testid="accordion-no-border">
      <Accordion bordered={false}>
        <AccordionItem>
          {#snippet header()}What's included?{/snippet}
          <div class="p-4">All plans include unlimited projects and team members.</div>
        </AccordionItem>
        <AccordionItem>
          {#snippet header()}What support do you offer?{/snippet}
          <div class="p-4">Email support for free plans, priority support for paid plans.</div>
        </AccordionItem>
      </Accordion>
    </div>
  </ExampleTabs>

  <h3>{m.accordion_ex_string()}</h3>
  <ExampleTabs code={`<Accordion>
  <AccordionItem header="What is this?">
    <div class="p-4">A component library for Svelte.</div>
  </AccordionItem>
  <AccordionItem header="How do I install it?">
    <div class="p-4">Run npm install twintrinsic.</div>
  </AccordionItem>
</Accordion>`}>
    <div class="max-w-2xl" data-testid="accordion-string-header">
      <Accordion>
        <AccordionItem header="What is this?">
          <div class="p-4">A component library for Svelte.</div>
        </AccordionItem>
        <AccordionItem header="How do I install it?">
          <div class="p-4">Run npm install twintrinsic.</div>
        </AccordionItem>
      </Accordion>
    </div>
  </ExampleTabs>

  <h3>{m.accordion_ex_collapsed()}</h3>
  <ExampleTabs code={`<Accordion defaultExpanded={null}>
  <AccordionItem>
    {#snippet header()}First question{/snippet}
    <div class="p-4">Answer one.</div>
  </AccordionItem>
  <AccordionItem>
    {#snippet header()}Second question{/snippet}
    <div class="p-4">Answer two.</div>
  </AccordionItem>
</Accordion>`}>
    <div class="max-w-2xl" data-testid="accordion-all-collapsed">
      <Accordion defaultExpanded={null}>
        <AccordionItem>
          {#snippet header()}First question{/snippet}
          <div class="p-4">All items start collapsed.</div>
        </AccordionItem>
        <AccordionItem>
          {#snippet header()}Second question{/snippet}
          <div class="p-4">Click any header to expand it.</div>
        </AccordionItem>
      </Accordion>
    </div>
  </ExampleTabs>

  <h2>{m.accordion_props()}</h2>
  <PropsTable component={AccordionModule} />

  <h2>{m.accordionitem_props()}</h2>
  <PropsTable component={AccordionItemModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={AccordionModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.accordion_a11y_1()}<code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code>{m.accordion_a11y_1b()}</li>
    <li>{m.accordion_a11y_2_1()}<code>name</code>{m.accordion_a11y_2_2()}</li>
    <li>{m.accordion_a11y_3()}</li>
    <li>{m.accordion_a11y_4()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.accordion_kb_1()}</td></tr>
      <tr><td><kbd>Tab</kbd></td><td>{m.accordion_kb_2()}</td></tr>
    </tbody>
  </table>
</Container>
