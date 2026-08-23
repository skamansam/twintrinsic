<!--
@component
Hero documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Hero from "$lib/components/Panel/Hero/Hero.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as HeroModule from "$lib/components/Panel/Hero/Hero.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Hero</h1>

  <p>
    <strong>Hero</strong> is a themed hero section for landing pages and page headers. It
    accepts a heading snippet and body content, mapping a <code>type</code> prop to a
    <code>bg-&#123;type&#125;</code> theme background.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A full-width banner section with a heading and body area, used at the top of pages
    or sections. Renders a semantic <code>&lt;section&gt;</code> landmark via the
    <code>&lt;Container&gt;</code> component.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Hero&gt;</code> for prominent page headers, landing page banners, or
    section introductions. For regular page sections with titles, use
    <code>&lt;Section&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Visual prominence</strong> — themed backgrounds draw attention.</li>
    <li><strong>Semantic structure</strong> — renders as <code>&lt;section&gt;</code> landmark.</li>
    <li><strong>Theme integration</strong> — maps to the Twintrinsic color system.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section">MDN — &lt;section&gt;</a></li>
    <li><a href="https://m3.material.io/styles/typography/overview">Material Design 3 — Typography</a></li>
    <li><a href="https://primer.style/components/pagehead">Primer — Pagehead</a></li>
    <li><a href="https://ant.design/components/typography">Ant Design — Typography</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/">WAI-ARIA APG — Landmarks</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Full-width by default; padding comes from the inner Container.</li>
    <li>Heading text scales naturally within the document flow.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>type</code> — maps to a <code>bg-&#123;type&#125;</code> theme color (e.g. <code>"primary"</code>).</li>
    <li><code>heading</code> snippet for custom heading content.</li>
    <li>Custom CSS classes via <code>class</code> prop.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Hero</h3>
  <ExampleTabs code={`<Hero>
  {#snippet heading()}
    <h1>Welcome to Twintrinsic</h1>
  {/snippet}
  <p>Accessible Svelte 5 components.</p>
</Hero>`}>
    <div class="not-prose" data-testid="hero-basic">
      <Hero>
        {#snippet heading()}
          <h1>Welcome to Twintrinsic</h1>
        {/snippet}
        <p>Accessible Svelte 5 components.</p>
      </Hero>
    </div>
  </ExampleTabs>

  <h3>Custom Background</h3>
  <ExampleTabs code={`<Hero type="primary">
  {#snippet heading()}
    <h1>Highlighted Hero</h1>
  {/snippet}
</Hero>`}>
    <div class="not-prose" data-testid="hero-type">
      <Hero type="primary">
        {#snippet heading()}
          <h1>Highlighted Hero</h1>
        {/snippet}
      </Hero>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={HeroModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Renders a semantic <code>&lt;section&gt;</code> landmark.</li>
    <li>Extra attributes are forwarded to the root element for ARIA wiring.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    Hero is a layout-only element and does not require keyboard interaction.
  </p>
</Container>
