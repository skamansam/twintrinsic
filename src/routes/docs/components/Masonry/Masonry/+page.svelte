<!--
@component
Masonry documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Masonry from "$lib/components/Masonry/Masonry.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as MasonryModule from "$lib/components/Masonry/Masonry.svelte"
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
  <h1>Masonry</h1>

  <p>
    <strong>Masonry</strong> creates Pinterest-style grid layouts with items of varying
    heights. It provides responsive, dynamic layouts that automatically adjust to different
    screen sizes and content dimensions.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A JavaScript-based masonry layout engine that positions items of varying heights into
    columns, always placing the next item in the shortest column. Uses
    <code>ResizeObserver</code> and <code>MutationObserver</code> for dynamic content.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Masonry&gt;</code> for image galleries, card grids, dashboards, or any
    layout where items have different heights. For uniform-height grids, use CSS Grid.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Variable heights</strong> — CSS Grid/Flexbox can't natively do true masonry.</li>
    <li><strong>Responsive</strong> — breakpoint-based column counts.</li>
    <li><strong>Dynamic</strong> — auto-positions items when content changes.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout">MDN — CSS Masonry Layout</a></li>
    <li><a href="https://masonry.desandro.com/">Masonry.js</a></li>
    <li><a href="https://ant.design/components/masonry">Ant Design — Masonry</a></li>
    <li><a href="https://css-tricks.com/seamlessly-responsive-masonry-css-only/">CSS-Tricks — Masonry</a></li>
    <li><a href="https://www.w3.org/TR/css-grid-2/">CSS Grid Level 2</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Supports responsive breakpoints via the <code>columns</code> prop object.</li>
    <li><code>columnWidth</code> mode auto-calculates column count from container width.</li>
    <li>Re-layouts on container resize via <code>ResizeObserver</code>.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>columns</code> — fixed number or responsive breakpoints object.</li>
    <li><code>gap</code> — gap between items in pixels.</li>
    <li><code>columnWidth</code> — fixed column width (overrides <code>columns</code>).</li>
    <li><code>centered</code> — center the grid.</li>
    <li><code>animated</code> — animate item positions.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Masonry</h3>
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

  <h3>Responsive Columns</h3>
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

  <h3>Fixed Width</h3>
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

  <h2>Props</h2>
  <PropsTable component={MasonryModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="grid"</code> to indicate the grid layout.</li>
    <li>Includes customizable <code>aria-label</code> for screen readers.</li>
    <li>Maintains proper focus order for keyboard navigation.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    Masonry is a layout-only element. Items within the masonry maintain their native
    keyboard behavior.
  </p>
</Container>
