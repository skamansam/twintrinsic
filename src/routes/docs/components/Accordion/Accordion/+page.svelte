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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Accordion</h1>

  <p>
    <strong>Accordion</strong> is a group of collapsible items where only one can be expanded
    at a time by default. It uses native <code>&lt;details&gt;</code> /
    <code>&lt;summary&gt;</code> elements for semantic disclosure, with full keyboard
    navigation and ARIA support.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A disclosure widget group that allows users to expand and collapse sections of content.
    Uses the native HTML <code>&lt;details&gt;</code> element with a <code>name</code>
    attribute for mutually exclusive panels. Supports single or multiple open panels.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Accordion&gt;</code> for FAQ sections, settings panels, or any grouped
    content where only one section should be visible at a time. For independent collapsible
    panels, use multiple <code>&lt;Panel&gt;</code> components.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Native HTML</strong> — <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> for built-in keyboard and screen reader support.</li>
    <li><strong>Mutual exclusion</strong> — native <code>name</code> attribute ensures only one panel is open.</li>
    <li><strong>Progressive enhancement</strong> — works without JavaScript.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details">MDN — &lt;details&gt;</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/">WAI-ARIA APG — Accordion</a></li>
    <li><a href="https://primer.style/components/accordion">Primer — Accordion</a></li>
    <li><a href="https://m3.material.io/components/expansion-panel/overview">Material Design 3 — Expansion panels</a></li>
    <li><a href="https://ant.design/components/collapse">Ant Design — Collapse</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Native `&lt;details&gt;` + `&lt;summary&gt;` for expand/collapse — zero JS</li>
    <li>`&lt;details name=&quot;group&quot;&gt;` for exclusive behavior (only one open at a time)</li>
    <li>`aria-expanded` on the summary button</li>
    <li>`aria-controls` linking summary to panel content</li>
    <li>CSS transitions for smooth expand/collapse animation</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;div onclick&gt;` with JS toggle — `&lt;details&gt;` is native and accessible</li>
    <li>Don't forget `&lt;details name&gt;` for exclusive accordion behavior</li>
    <li>Don't use Accordion for tab switching — use Tabs component instead</li>
</ul>

<h2>Related Components</h2>
<p>Tabs, Tree, Menu</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Full-width by default; set max-width via <code>class</code> or parent Container.</li>
    <li>Touch targets meet 44×44 px minimum for the summary header.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>allowMultiple</code> — allow multiple panels open simultaneously.</li>
    <li><code>defaultExpanded</code> — index of initially expanded item, or <code>null</code> for all collapsed.</li>
    <li><code>bordered</code> — show/hide border.</li>
    <li>Custom header snippets per item.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Billing FAQ</h3>
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

  <h3>Multiple Open</h3>
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

  <h3>No Border</h3>
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

  <h3>All Collapsed</h3>
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

  <h2>Accordion Props</h2>
  <PropsTable component={AccordionModule} />

  <h2>AccordionItem Props</h2>
  <PropsTable component={AccordionItemModule} />

  <h2>Events</h2>
  <EventsTable component={AccordionModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses native <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> for keyboard-accessible disclosure.</li>
    <li>By default, only one panel opens at a time via the native <code>name</code> grouping.</li>
    <li>Disabled items block toggling and reduce visual emphasis.</li>
    <li>Panel state changes are announced to screen readers.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Toggle panel expansion</td></tr>
      <tr><td><kbd>Tab</kbd></td><td>Move focus between panels</td></tr>
    </tbody>
  </table>
</Container>
