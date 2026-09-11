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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.hero_heading()}</h1>

  <p>
    <strong>{m.hero_heading()}</strong>{m.hero_intro_1()}<code>type</code>{m.hero_intro_2()}<code>bg-&#123;type&#125;</code>{m.hero_intro_3()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.hero_what_1()}<code>&lt;section&gt;</code>{m.hero_what_2()}<code>&lt;Container&gt;</code>{m.hero_what_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.hero_when_1()}<code>&lt;Hero&gt;</code>{m.hero_when_2()}<code>&lt;Section&gt;</code>{m.hero_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.hero_why_prominence()}</strong> — {m.hero_why_prominence_desc()}</li>
    <li><strong>{m.hero_why_semantic()}</strong> — {m.hero_why_semantic_desc_1()}<code>&lt;section&gt;</code>{m.hero_why_semantic_desc_2()}</li>
    <li><strong>{m.hero_why_theme()}</strong> — {m.hero_why_theme_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section">MDN — &lt;section&gt;</a></li>
    <li><a href="https://m3.material.io/styles/typography/overview">Material Design 3 — Typography</a></li>
    <li><a href="https://primer.style/components/pagehead">Primer — Pagehead</a></li>
    <li><a href="https://ant.design/components/typography">Ant Design — Typography</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/">WAI-ARIA APG — Landmarks</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
  <ul>
    <li>{m.hero_impl_1()}</li>
    <li>{m.hero_impl_2()}</li>
    <li>{m.hero_impl_3()}</li>
    <li>{m.hero_impl_4()}</li>
  </ul>

  <h2>{m.sec_mistakes()}</h2>
  <ul>
    <li>{m.hero_mistake_1()}</li>
    <li>{m.hero_mistake_2()}</li>
  </ul>

  <h2>{m.sec_related()}</h2>
  <p>AppHeader, Card, Container</p>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.hero_responsive_1()}</li>
    <li>{m.hero_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>type</code>{m.hero_custom_1_1()}<code>bg-&#123;type&#125;</code>{m.hero_custom_1_2()}<code>"primary"</code>{m.hero_custom_1_3()}</li>
    <li><code>heading</code>{m.hero_custom_2()}</li>
    <li>{m.hero_custom_3_1()}<code>class</code>{m.hero_custom_3_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.hero_ex_basic()}</h3>
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

  <h3>{m.hero_ex_type()}</h3>
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

  <h2>{m.sec_props()}</h2>
  <PropsTable component={HeroModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.hero_a11y_1_1()}<code>&lt;section&gt;</code>{m.hero_a11y_1_2()}</li>
    <li>{m.hero_a11y_2()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>
    {m.hero_kb_1()}
  </p>
</Container>
