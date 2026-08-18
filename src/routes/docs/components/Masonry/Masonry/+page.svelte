<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Masonry, * as MasonryModule from "$lib/components/Masonry/Masonry.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
  
  .masonry-demo {
    @apply p-4 bg-surface rounded-md mb-4;
    height: 400px;
    overflow: hidden;
  }
  
  .masonry-item {
    @apply p-4 rounded-md;
    @apply flex items-center justify-center;
    @apply font-medium text-center;
  }
  
  .item-1 {
    @apply bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200;
    height: 100px;
  }
  
  .item-2 {
    @apply bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200;
    height: 150px;
  }
  
  .item-3 {
    @apply bg-success-100 dark:bg-success-900 text-success-800 dark:text-success-200;
    height: 180px;
  }
  
  .item-4 {
    @apply bg-warning-100 dark:bg-warning-900 text-warning-800 dark:text-warning-200;
    height: 120px;
  }
  
  .item-5 {
    @apply bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200;
    height: 200px;
  }
  
  .item-6 {
    @apply bg-info-100 dark:bg-info-900 text-info-800 dark:text-info-200;
    height: 160px;
  }
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Masonry</h1>
  
  <p>
    The Masonry component creates Pinterest-style grid layouts with items of varying heights.
    It provides responsive, dynamic layouts that automatically adjust to different screen sizes
    and content dimensions.
  </p>

  <h2>Usage</h2>

  <h3>Basic Masonry</h3>
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

  <CodeBlock language="svelte">{`<Masonry columns={3} gap={16}>
  <div class="item">Sketch: login flow</div>
  <div class="item">Photo: team offsite</div>
  <div class="item">Note: Q3 roadmap</div>
  <div class="item">Screenshot: v2 dashboard</div>
  <div class="item">Quote: design review</div>
  <div class="item">Moodboard: brand refresh</div>
</Masonry>`}</CodeBlock>

  <h3>Responsive Masonry</h3>
  <div class="masonry-demo" data-testid="masonry-responsive">
    <Masonry 
      columns={{ default: 1, sm: 2, md: 3, lg: 4 }}
      gap={16}
    >
      <div class="masonry-item item-1">Sketch: login flow</div>
      <div class="masonry-item item-2">Photo: team offsite</div>
      <div class="masonry-item item-3">Note: Q3 roadmap</div>
      <div class="masonry-item item-4">Screenshot: v2 dashboard</div>
      <div class="masonry-item item-5">Quote: design review</div>
      <div class="masonry-item item-6">Moodboard: brand refresh</div>
      <div class="masonry-item item-1">Wireframe: settings page</div>
      <div class="masonry-item item-2">Photo: launch party</div>
    </Masonry>
  </div>

  <CodeBlock language="svelte">{`<Masonry 
  columns={{ default: 1, sm: 2, md: 3, lg: 4 }}
  gap={16}
>
  <div class="item">Sketch: login flow</div>
  <div class="item">Photo: team offsite</div>
  <div class="item">Note: Q3 roadmap</div>
  <div class="item">Screenshot: v2 dashboard</div>
  <div class="item">Quote: design review</div>
  <div class="item">Moodboard: brand refresh</div>
  <div class="item">Wireframe: settings page</div>
  <div class="item">Photo: launch party</div>
</Masonry>`}</CodeBlock>

  <h3>Fixed Column Width</h3>
  <div class="masonry-demo" data-testid="masonry-fixed-width">
    <Masonry 
      columnWidth="150px"
      gap={16}
      centered
    >
      <div class="masonry-item item-1">Sketch: login flow</div>
      <div class="masonry-item item-2">Photo: team offsite</div>
      <div class="masonry-item item-3">Note: Q3 roadmap</div>
      <div class="masonry-item item-4">Screenshot: v2 dashboard</div>
      <div class="masonry-item item-5">Quote: design review</div>
      <div class="masonry-item item-6">Moodboard: brand refresh</div>
    </Masonry>
  </div>

  <CodeBlock language="svelte">{`<Masonry 
  columnWidth="150px"
  gap={16}
  centered
>
  <div class="item">Sketch: login flow</div>
  <div class="item">Photo: team offsite</div>
  <div class="item">Note: Q3 roadmap</div>
  <div class="item">Screenshot: v2 dashboard</div>
  <div class="item">Quote: design review</div>
  <div class="item">Moodboard: brand refresh</div>
</Masonry>`}</CodeBlock>

  <h3>With Dynamic Content</h3>
  <CodeBlock language="svelte">{`<script>
  import Masonry from "$lib/components/Masonry/Masonry.svelte";
  
  let items = [
    { id: 1, content: "Sketch: login flow", height: "100px" },
    { id: 2, content: "Photo: team offsite", height: "150px" },
    { id: 3, content: "Note: Q3 roadmap", height: "180px" },
    { id: 4, content: "Screenshot: v2 dashboard", height: "120px" }
  ];
  
  function addItem() {
    const heights = ["100px", "120px", "150px", "180px", "200px"];
    const randomHeight = heights[Math.floor(Math.random() * heights.length)];
    const notes = [
      "Quote: design review",
      "Moodboard: brand refresh",
      "Wireframe: settings page"
    ];
    
    items = [
      ...items,
      {
        id: items.length + 1,
        content: notes[(items.length - 1) % notes.length],
        height: randomHeight
      }
    ];
  }
<\/script>

<button onclick={addItem}>Add Note</button>

<Masonry columns={3} gap={16}>
  {#each items as item (item.id)}
    <div class="item" style="height: {item.height}">
      {item.content}
    </div>
  {/each}
</Masonry>`}</CodeBlock>

  <h2>Props</h2>
<PropsTable component={MasonryModule} />

  <h2>Responsive Breakpoints</h2>
  <p>
    The Masonry component supports responsive layouts through the <code>columns</code> prop.
    You can specify different column counts for different screen sizes:
  </p>

  <CodeBlock language="javascript">{`// Responsive columns configuration
columns={{
  default: 1,  // Default (mobile first)
  sm: 2,       // Small screens (640px and up)
  md: 3,       // Medium screens (768px and up)
  lg: 4,       // Large screens (1024px and up)
  xl: 5,       // Extra large screens (1280px and up)
  '2xl': 6     // 2XL screens (1536px and up)
}}`}</CodeBlock>

  <p>
    The breakpoints correspond to Tailwind CSS's default breakpoints:
  </p>

  <table>
    <thead>
      <tr>
        <th>Breakpoint</th>
        <th>Width</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>default</code></td>
        <td>0px+</td>
        <td>Mobile and up (default)</td>
      </tr>
      <tr>
        <td><code>sm</code></td>
        <td>640px+</td>
        <td>Small screens and up</td>
      </tr>
      <tr>
        <td><code>md</code></td>
        <td>768px+</td>
        <td>Medium screens and up</td>
      </tr>
      <tr>
        <td><code>lg</code></td>
        <td>1024px+</td>
        <td>Large screens and up</td>
      </tr>
      <tr>
        <td><code>xl</code></td>
        <td>1280px+</td>
        <td>Extra large screens and up</td>
      </tr>
      <tr>
        <td><code>2xl</code></td>
        <td>1536px+</td>
        <td>2XL screens and up</td>
      </tr>
    </tbody>
  </table>

  <h2>Fixed Column Width</h2>
  <p>
    Instead of specifying the number of columns, you can use the <code>columnWidth</code> prop
    to set a fixed width for each column. The component will automatically calculate how many
    columns can fit in the container:
  </p>

  <CodeBlock language="svelte">{`<Masonry columnWidth="300px" gap={16}>
  <!-- Items -->
</Masonry>`}</CodeBlock>

  <h2>Accessibility</h2>
  <p>
    The Masonry component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses <code>role="grid"</code> to indicate the grid layout</li>
    <li>Includes a customizable <code>aria-label</code> for screen readers</li>
    <li>Maintains proper focus order for keyboard navigation</li>
  </ul>

  <h2>Dynamic Content</h2>
  <p>
    The Masonry component automatically adjusts when items are added, removed, or resized.
    It uses ResizeObserver and MutationObserver to detect changes and reposition items accordingly.
  </p>

  <h2>Best Practices</h2>
  <ul>
    <li>Use responsive columns configuration for different screen sizes</li>
    <li>Consider disabling animations for users who prefer reduced motion</li>
    <li>Provide appropriate gap spacing to ensure items are visually distinct</li>
    <li>Use the centered prop for grids that don't take up the full width</li>
    <li>For image-heavy layouts, ensure images have proper width and height attributes to minimize layout shifts</li>
  </ul>

  <h2>Implementation Notes</h2>
  <p>
    The Masonry component uses a JavaScript-based implementation rather than CSS Grid or Flexbox
    because it needs to handle items of varying heights in a true masonry layout. It calculates
    the position of each item based on the heights of items in each column, placing new items in
    the shortest column.
  </p>
</Container>
