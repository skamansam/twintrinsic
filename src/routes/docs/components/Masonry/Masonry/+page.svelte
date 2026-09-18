<!--
@component
Masonry documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Masonry from "$lib/components/Masonry/Masonry.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as MasonryModule from "$lib/components/Masonry/Masonry.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  .masonry-demo {
    @apply p-4 bg-surface rounded-md;
    height: 400px;
    overflow: hidden;
  }
  .masonry-item {
    @apply p-4 rounded-md flex items-center justify-center font-medium text-center;
  }
  .item-1 { @apply bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200; height: 100px; }
  .item-2 { @apply bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200; height: 150px; }
  .item-3 { @apply bg-success-100 dark:bg-success-900 text-success-800 dark:text-success-200; height: 180px; }
  .item-4 { @apply bg-warning-100 dark:bg-warning-900 text-warning-800 dark:text-warning-200; height: 120px; }
  .item-5 { @apply bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200; height: 200px; }
  .item-6 { @apply bg-info-100 dark:bg-info-900 text-info-800 dark:text-info-200; height: 160px; }
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("Masonry")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
    <h1>{m.masonry_heading()}</h1>
  </div>

  <p>
    <strong>{m.masonry_heading()}</strong>{m.masonry_intro()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.masonry_what_1()}<code>ResizeObserver</code>{m.masonry_what_2()}<code>MutationObserver</code>{m.masonry_what_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.masonry_when_1()}<code>&lt;Masonry&gt;</code>{m.masonry_when_2()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.masonry_why_variable()}</strong>{m.masonry_why_variable_desc()}</li>
    <li><strong>{m.masonry_why_responsive()}</strong>{m.masonry_why_responsive_desc()}</li>
    <li><strong>{m.masonry_why_dynamic()}</strong>{m.masonry_why_dynamic_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout">MDN — CSS Masonry Layout</a></li>
    <li><a href="https://masonry.desandro.com/">Masonry.js</a></li>
    <li><a href="https://ant.design/components/masonry">Ant Design — Masonry</a></li>
    <li><a href="https://css-tricks.com/seamlessly-responsive-masonry-css-only/">CSS-Tricks — Masonry</a></li>
    <li><a href="https://www.w3.org/TR/css-grid-2/">CSS Grid Level 2</a></li>
  </ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li>{m.masonry_impl_1_1()}<code>columns: 3</code>{m.masonry_impl_1_2()}</li>
  <li>{m.masonry_impl_2_1()}<code>content-visibility: auto</code>{m.masonry_impl_2_2()}</li>
  <li>{m.masonry_impl_3_1()}<code>break-inside: avoid</code>{m.masonry_impl_3_2()}</li>
  <li>{m.masonry_impl_4_1()}<code>@supports (grid-template-rows: masonry)</code>{m.masonry_impl_4_2()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.masonry_mistake_1()}</li>
  <li>{m.masonry_mistake_2_0()}<code>break-inside: avoid</code>{m.masonry_mistake_2_1()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.masonry_related()}</p>

<h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.masonry_responsive_1_1()}<code>columns</code>{m.masonry_responsive_1_2()}</li>
    <li>{m.masonry_responsive_2_1()}<code>columnWidth</code>{m.masonry_responsive_2_2()}</li>
    <li>{m.masonry_responsive_3_1()}<code>ResizeObserver</code>{m.masonry_responsive_3_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.masonry_custom_1_1()}<code>columns</code>{m.masonry_custom_1_2()}</li>
    <li>{m.masonry_custom_2_1()}<code>gap</code>{m.masonry_custom_2_2()}</li>
    <li>{m.masonry_custom_3_1()}<code>columnWidth</code>{m.masonry_custom_3_2()}<code>columns</code>{m.masonry_custom_3_3()}</li>
    <li>{m.masonry_custom_4_1()}<code>centered</code>{m.masonry_custom_4_2()}</li>
    <li>{m.masonry_custom_5_1()}<code>animated</code>{m.masonry_custom_5_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.masonry_ex_basic()}</h3>
  <ExampleTabs code={`<Masonry columns={3} gap={16}>
  <div class="item">Sketch: login flow</div>
  <div class="item">Photo: team offsite</div>
  <div class="item">Note: Q3 roadmap</div>
  <div class="item">Screenshot: v2 dashboard</div>
  <div class="item">Quote: design review</div>
  <div class="item">Moodboard: brand refresh</div>
</Masonry>`}>
    <div class="masonry-demo" data-testid="masonry-basic">
      <Masonry columns={3} gap={16}>
        <div class="masonry-item item-1">Sketch: login flow</div>
        <div class="masonry-item item-2">Photo: team offsite</div>
        <div class="masonry-item item-3">Note: Q3 roadmap</div>
        <div class="masonry-item item-4">Screenshot: v2 dashboard</div>
        <div class="masonry-item item-5">Quote: design review</div>
        <div class="masonry-item item-6">Moodboard: brand refresh</div>
      </Masonry>
    </div>
  </ExampleTabs>

  <h3>{m.masonry_ex_responsive()}</h3>
  <ExampleTabs code={`<Masonry
  columns={{ default: 1, sm: 2, md: 3, lg: 4 }}
  gap={16}
>
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <div class="item">Item 4</div>
</Masonry>`}>
    <div class="masonry-demo" data-testid="masonry-responsive">
      <Masonry columns={{ default: 1, sm: 2, md: 3, lg: 4 }} gap={16}>
        <div class="masonry-item item-1">Sketch: login flow</div>
        <div class="masonry-item item-2">Photo: team offsite</div>
        <div class="masonry-item item-3">Note: Q3 roadmap</div>
        <div class="masonry-item item-4">Screenshot: v2 dashboard</div>
        <div class="masonry-item item-5">Quote: design review</div>
        <div class="masonry-item item-6">Moodboard: brand refresh</div>
      </Masonry>
    </div>
  </ExampleTabs>

  <h3>{m.masonry_ex_fixed()}</h3>
  <ExampleTabs code={`<Masonry gap={16}>
  <div class="p-4 bg-surface rounded">Item 1</div>
  <div class="p-4 bg-surface rounded">Item 2</div>
  <div class="p-4 bg-surface rounded">Item 3</div>
</Masonry>`}>
    <div data-testid="masonry-fixed-width">
      <Masonry gap={16}>
        <div class="p-4 bg-surface rounded">Item 1</div>
        <div class="p-4 bg-surface rounded">Item 2</div>
        <div class="p-4 bg-surface rounded">Item 3</div>
      </Masonry>
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={MasonryModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.masonry_a11y_1_1()}<code>role="grid"</code>{m.masonry_a11y_1_2()}</li>
    <li>{m.masonry_a11y_2_1()}<code>aria-label</code>{m.masonry_a11y_2_2()}</li>
    <li>{m.masonry_a11y_3()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>{m.masonry_kb()}</p>
</Container>
