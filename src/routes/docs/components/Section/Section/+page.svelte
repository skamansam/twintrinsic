<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Section from "$lib/components/Section/Section.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as SectionModule from "$lib/components/Section/Section.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Section</h1>

  <p>
    The Section component is a themed content container for page layouts. It
    renders a semantic <code>&lt;section&gt;</code> with an optional title and
    subtitle, each of which can be a plain string or a snippet for custom markup.
  </p>

  <h2>Usage</h2>

  <h3>String Title</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4" data-testid="section-string-title">
    <Section title="About Us" subtitle="We build accessible components.">
      <p>Content goes here.</p>
    </Section>
  </div>

  <CodeBlock language="svelte">{`<Section title="About Us" subtitle="We build accessible components.">
  <p>Content goes here.</p>
</Section>`}</CodeBlock>

  <h3>Snippet Title</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4" data-testid="section-snippet-title">
    <Section>
      {#snippet title()}
        <span class="font-bold">Custom title content</span>
      {/snippet}
      <p>Content goes here.</p>
    </Section>
  </div>

  <CodeBlock language="svelte">{`<Section>
  {#snippet title()}
    <span class="font-bold">Custom title content</span>
  {/snippet}
  <p>Content goes here.</p>
</Section>`}</CodeBlock>

  <h2>Props</h2>
  <PropsTable component={SectionModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses the native <code>&lt;section&gt;</code> element for correct landmark semantics</li>
    <li>The title renders as a heading (<code>&lt;h2&gt;</code>) when it is a plain string</li>
    <li>Accepts an <code>id</code> for deep-linking and ARIA references</li>
  </ul>
</Container>
