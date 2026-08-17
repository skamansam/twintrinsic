<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Hero from "$lib/components/Panel/Hero/Hero.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as HeroModule from "$lib/components/Panel/Hero/Hero.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Hero</h1>

  <p>
    The Hero component is a themed hero section for landing pages and page
    headers. It accepts a heading and body snippet and maps a <code>type</code>
    prop to a <code>bg-{`{type}`}</code> theme background.
  </p>

  <h2>Usage</h2>

  <h3>Basic</h3>
  <div class="not-prose mb-4" data-testid="hero-basic">
    <Hero>
      {#snippet heading()}
        <h1>Welcome to Twintrinsic</h1>
      {/snippet}
      <p>Accessible Svelte 5 components.</p>
    </Hero>
  </div>

  <CodeBlock language="svelte">{`<Hero>
  {#snippet heading()}
    <h1>Welcome to Twintrinsic</h1>
  {/snippet}
  <p>Accessible Svelte 5 components.</p>
</Hero>`}</CodeBlock>

  <h3>Custom Background Type</h3>
  <div class="not-prose mb-4" data-testid="hero-type">
    <Hero type="primary">
      {#snippet heading()}
        <h1>Highlighted Hero</h1>
      {/snippet}
    </Hero>
  </div>

  <CodeBlock language="svelte">{`<Hero type="primary">
  {#snippet heading()}
    <h1>Highlighted Hero</h1>
  {/snippet}
</Hero>`}</CodeBlock>

  <h2>Props</h2>
  <PropsTable component={HeroModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Renders a semantic <code>&lt;section&gt;</code> landmark</li>
    <li>Extra attributes are forwarded to the root element for ARIA wiring</li>
  </ul>
</Container>
