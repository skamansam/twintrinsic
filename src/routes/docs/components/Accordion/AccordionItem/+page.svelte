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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>AccordionItem</h1>

  <p>
    <strong>AccordionItem</strong> is a single collapsible panel inside an
    <code>&lt;Accordion&gt;</code>. It uses the native <code>&lt;details&gt;</code> /
    <code>&lt;summary&gt;</code> elements for semantic disclosure.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A single collapsible section within an Accordion. Renders a <code>&lt;details&gt;</code>
    element with a <code>&lt;summary&gt;</code> header, optional chevron icon, and content
    area. Supports disabled state and custom header snippets.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Always use <code>&lt;AccordionItem&gt;</code> inside an <code>&lt;Accordion&gt;</code>.
    Each logical section gets its own <code>&lt;AccordionItem&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Native disclosure</strong> — <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> for zero-JS accessibility.</li>
    <li><strong>Flexible headers</strong> — snippets for custom header markup.</li>
    <li><strong>Disabled state</strong> — block toggling on specific items.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details">MDN — &lt;details&gt;</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/">WAI-ARIA APG — Accordion</a></li>
    <li><a href="https://primer.style/components/accordion">Primer — Accordion</a></li>
    <li><a href="https://m3.material.io/components/expansion-panel/overview">Material Design 3 — Expansion panels</a></li>
    <li><a href="https://ant.design/components/collapse">Ant Design — Collapse</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Full-width by default; inherits from parent Accordion.</li>
    <li>Touch targets meet 44×44 px minimum for the summary header.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>header</code> snippet for custom header content.</li>
    <li><code>showIcon</code> — show/hide the chevron.</li>
    <li><code>disabled</code> — disable the item.</li>
    <li><code>ariaLabel</code> — custom label for the summary.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Items</h3>
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

  <h3>Disabled Item</h3>
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

  <h2>Props</h2>
  <PropsTable component={AccordionItemModule} />

  <h2>Events</h2>
  <EventsTable component={AccordionItemModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses native <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> for keyboard-accessible disclosure.</li>
    <li>Disabled items block toggling and reduce visual emphasis.</li>
    <li>The <code>ariaLabel</code> prop names the summary for assistive technology.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Toggle the item open/closed</td></tr>
      <tr><td><kbd>Tab</kbd></td><td>Move focus to the next item</td></tr>
    </tbody>
  </table>
</Container>
