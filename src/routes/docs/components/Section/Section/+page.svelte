<!--
@component
Section documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Section from "$lib/components/Section/Section.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SectionModule from "$lib/components/Section/Section.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Section</h1>

  <p>
    <strong>Section</strong> is a themed content container for page layouts. It renders a
    semantic <code>&lt;section&gt;</code> with an optional title and subtitle, each of which
    can be a plain string or a snippet for custom markup.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A semantic <code>&lt;section&gt;</code> element with optional heading and subtitle.
    The title renders as an <code>&lt;h2&gt;</code> when it's a string, making it a proper
    document landmark. Accepts snippets for fully custom heading content.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Section&gt;</code> to group related content on a page (e.g. "About Us",
    "Features", "Pricing") with a visible heading. For layout without headings, use
    <code>&lt;Container&gt;</code>. For collapsible sections, use <code>&lt;Panel&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Semantic HTML</strong> — native <code>&lt;section&gt;</code> landmark for accessibility.</li>
    <li><strong>Heading integration</strong> — auto-renders <code>&lt;h2&gt;</code> from a string title.</li>
    <li><strong>Flexible titles</strong> — snippets for custom heading markup.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section">MDN — &lt;section&gt;</a></li>
    <li><a href="https://www.w3.org/TR/WCAG21/#headings-and-labels">WCAG 2.1 — Headings and Labels</a></li>
    <li><a href="https://primer.style/components/heading">Primer — Heading</a></li>
    <li><a href="https://m3.material.io/styles/typography/overview">Material Design 3 — Typography</a></li>
    <li><a href="https://ant.design/components/typography">Ant Design — Typography</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Full-width by default; responsive padding comes from the parent Container.</li>
    <li>Title and subtitle scale naturally with the document flow.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>title</code> as string (auto-renders <code>&lt;h2&gt;</code>) or snippet.</li>
    <li><code>subtitle</code> as string or snippet.</li>
    <li><code>id</code> for deep-linking and ARIA references.</li>
    <li>Custom CSS classes via <code>class</code> prop.</li>
  </ul>

  <h2>Examples</h2>

  <h3>String Title</h3>
  <ExampleTabs code={`<Section title="About Us" subtitle="We build accessible components.">
  <p>Content goes here.</p>
</Section>`}>
    <div class="not-prose border border-border rounded-md p-4" data-testid="section-string-title">
      <Section title="About Us" subtitle="We build accessible components.">
        <p>Content goes here.</p>
      </Section>
    </div>
  </ExampleTabs>

  <h3>Snippet Title</h3>
  <ExampleTabs code={`<Section>
  {#snippet title()}
    <span class="font-bold">Custom title content</span>
  {/snippet}
  <p>Content goes here.</p>
</Section>`}>
    <div class="not-prose border border-border rounded-md p-4" data-testid="section-snippet-title">
      <Section>
        {#snippet title()}
          <span class="font-bold">Custom title content</span>
        {/snippet}
        <p>Content goes here.</p>
      </Section>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={SectionModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses native <code>&lt;section&gt;</code> for correct landmark semantics.</li>
    <li>Title renders as <code>&lt;h2&gt;</code> when it's a plain string.</li>
    <li>Accepts <code>id</code> for deep-linking and ARIA references.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    Section is a layout-only element and does not require keyboard interaction.
  </p>
</Container>
