<!--
@component
AccordionItem documentation page — standardized structure
-->
<script lang="ts">
import Accordion from "$lib/components/Accordion/Accordion.svelte"
import AccordionItem from "$lib/components/Accordion/AccordionItem.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AccordionItemModule from "$lib/components/Accordion/AccordionItem.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="not-prose mb-6 p-4 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg">
    <p class="text-sm text-primary-700 dark:text-primary-300 m-0">
      <strong>AccordionItem</strong>{m.accordionitem_note_1()}
      <a href="/docs/components/Accordion/Accordion" class="underline font-medium">Accordion</a>{m.accordionitem_note_2()}
    </p>
  </div>

  <h1>{m.accordionitem_heading()}</h1>

  <p>
    <strong>{m.accordionitem_heading()}</strong>{m.accordionitem_intro_1()}<code>&lt;Accordion&gt;</code>{m.accordionitem_intro_2()}<code>&lt;details&gt;</code>{m.accordionitem_intro_3()}<code>&lt;summary&gt;</code>{m.accordionitem_intro_4()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.accordionitem_what_1()}<code>&lt;details&gt;</code>{m.accordionitem_what_2()}<code>&lt;summary&gt;</code>{m.accordionitem_what_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.accordionitem_when_1()}<code>&lt;AccordionItem&gt;</code>{m.accordionitem_when_2()}<code>&lt;Accordion&gt;</code>{m.accordionitem_when_3()}<code>&lt;AccordionItem&gt;</code>{m.accordionitem_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.accordionitem_why_native()}</strong> — <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> {m.accordionitem_why_native_desc()}</li>
    <li><strong>{m.accordionitem_why_flexible()}</strong> — {m.accordionitem_why_flexible_desc()}</li>
    <li><strong>{m.accordionitem_why_disabled()}</strong> — {m.accordionitem_why_disabled_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details">MDN — &lt;details&gt;</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/">WAI-ARIA APG — Accordion</a></li>
    <li><a href="https://primer.style/components/accordion">Primer — Accordion</a></li>
    <li><a href="https://m3.material.io/components/expansion-panel/overview">Material Design 3 — Expansion panels</a></li>
    <li><a href="https://ant.design/components/collapse">Ant Design — Collapse</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.accordionitem_responsive_1()}</li>
    <li>{m.accordion_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>header</code>{m.accordionitem_custom_1()}</li>
    <li><code>showIcon</code>{m.accordionitem_custom_2()}</li>
    <li><code>disabled</code>{m.accordionitem_custom_3()}</li>
    <li><code>ariaLabel</code>{m.accordionitem_custom_4()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.accordionitem_ex_basic()}</h3>
  <ExampleTabs code={`<Accordion>
  <AccordionItem>
    {#snippet header()}Getting started{/snippet}
    <p>Install the package and import the components you need.</p>
  </AccordionItem>
  <AccordionItem>
    {#snippet header()}Theming{/snippet}
    <p>Customize colors and tokens in your Tailwind theme.</p>
  </AccordionItem>
</Accordion>`}>
    <div class="max-w-2xl" data-testid="accordion-item-basic">
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
  </ExampleTabs>

  <h3>{m.accordionitem_ex_disabled()}</h3>
  <ExampleTabs code={`<Accordion>
  <AccordionItem>
    {#snippet header()}Available{/snippet}
    <p>This panel can be opened.</p>
  </AccordionItem>
  <AccordionItem disabled>
    {#snippet header()}Locked{/snippet}
    <p>This panel cannot be opened.</p>
  </AccordionItem>
</Accordion>`}>
    <div class="max-w-2xl" data-testid="accordion-item-disabled">
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
  </ExampleTabs>

  <h3>{m.accordionitem_ex_expanded()}</h3>
  <ExampleTabs code={`<Accordion defaultExpanded={0}>
  <AccordionItem>
    {#snippet header()}First question{/snippet}
    <div class="p-4">Here is the answer to a frequently asked question.</div>
  </AccordionItem>
  <AccordionItem>
    {#snippet header()}Second question{/snippet}
    <div class="p-4">This item starts collapsed.</div>
  </AccordionItem>
</Accordion>`}>
    <div class="max-w-2xl" data-testid="accordion-item-expanded">
      <Accordion defaultExpanded={0}>
        <AccordionItem>
          {#snippet header()}First question{/snippet}
          <div class="p-4">Here is the answer to a frequently asked question.</div>
        </AccordionItem>
        <AccordionItem>
          {#snippet header()}Second question{/snippet}
          <div class="p-4">This item starts collapsed.</div>
        </AccordionItem>
      </Accordion>
    </div>
  </ExampleTabs>

  <h3>{m.accordionitem_ex_noicon()}</h3>
  <ExampleTabs code={`<Accordion>
  <AccordionItem showIcon={false}>
    {#snippet header()}Plain header{/snippet}
    <div class="p-4">This item has no chevron icon.</div>
  </AccordionItem>
</Accordion>`}>
    <div class="max-w-2xl" data-testid="accordion-item-noicon">
      <Accordion>
        <AccordionItem showIcon={false}>
          {#snippet header()}Plain header{/snippet}
          <div class="p-4">This item has no chevron icon.</div>
        </AccordionItem>
      </Accordion>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={AccordionItemModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={AccordionItemModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.accordion_a11y_1()}<code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code>{m.accordion_a11y_1b()}</li>
    <li>{m.accordionitem_a11y_2()}</li>
    <li>{m.accordionitem_a11y_3_1()}<code>ariaLabel</code>{m.accordionitem_a11y_3_2()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.accordionitem_kb_1()}</td></tr>
      <tr><td><kbd>Tab</kbd></td><td>{m.accordionitem_kb_2()}</td></tr>
    </tbody>
  </table>
</Container>
