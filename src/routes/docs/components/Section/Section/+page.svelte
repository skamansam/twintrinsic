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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.section_heading()}</h1>

  <p>
    <strong>{m.section_heading()}</strong>{m.section_intro_1()}<code>&lt;section&gt;</code>{m.section_intro_2()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.section_what_1()}<code>&lt;section&gt;</code>{m.section_what_2()}<code>&lt;h2&gt;</code>{m.section_what_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.section_when_1()}<code>&lt;Section&gt;</code>{m.section_when_2()}<code>&lt;Container&gt;</code>{m.section_when_3()}<code>&lt;Panel&gt;</code>{m.section_when_4()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.section_why_semantic()}</strong> — {m.section_why_semantic_desc_1()}<code>&lt;section&gt;</code>{m.section_why_semantic_desc_2()}</li>
    <li><strong>{m.section_why_heading()}</strong> — {m.section_why_heading_desc_1()}<code>&lt;h2&gt;</code>{m.section_why_heading_desc_2()}</li>
    <li><strong>{m.section_why_flexible()}</strong> — {m.section_why_flexible_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section">MDN — &lt;section&gt;</a></li>
    <li><a href="https://www.w3.org/TR/WCAG21/#headings-and-labels">WCAG 2.1 — Headings and Labels</a></li>
    <li><a href="https://primer.style/components/heading">Primer — Heading</a></li>
    <li><a href="https://m3.material.io/styles/typography/overview">Material Design 3 — Typography</a></li>
    <li><a href="https://ant.design/components/typography">Ant Design — Typography</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.section_responsive_1()}</li>
    <li>{m.section_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>title</code>{m.section_custom_1_1()}<code>&lt;h2&gt;</code>{m.section_custom_1_2()}</li>
    <li><code>subtitle</code>{m.section_custom_2()}</li>
    <li><code>id</code>{m.section_custom_3()}</li>
    <li>{m.section_custom_4()}<code>class</code>{m.section_custom_4_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.section_ex_string()}</h3>
  <ExampleTabs code={`<Section title="About Us" subtitle="We build accessible components.">
  <p>Content goes here.</p>
</Section>`}>
    <div class="not-prose border border-border rounded-md p-4" data-testid="section-string-title">
      <Section title="About Us" subtitle="We build accessible components.">
        <p>Content goes here.</p>
      </Section>
    </div>
  </ExampleTabs>

  <h3>{m.section_ex_snippet()}</h3>
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

  <h2>{m.sec_props()}</h2>
  <PropsTable component={SectionModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.section_a11y_1_1()}<code>&lt;section&gt;</code>{m.section_a11y_1_2()}</li>
    <li>{m.section_a11y_2_1()}<code>&lt;h2&gt;</code>{m.section_a11y_2_2()}</li>
    <li>{m.section_a11y_3_1()}<code>id</code>{m.section_a11y_3_2()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>
    {m.section_kb_1()}
  </p>
</Container>
