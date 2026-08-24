<!--
@component
MetricGrid documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import MetricGrid from "$lib/components/Metrics/MetricGrid/MetricGrid.svelte"
import * as MetricGridModule from "$lib/components/Metrics/MetricGrid/MetricGrid.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>MetricGrid</h1>

  <p>
    <strong>MetricGrid</strong> — A responsive grid layout for displaying multiple StatsCard components. Automatically adjusts columns based on screen size.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>A responsive grid layout for displaying multiple StatsCard components. Automatically adjusts columns based on screen size.</p>

  <h3>When should I use it?</h3>
  <p>Use MetricGrid for dashboard overview sections with multiple KPIs. For individual metrics, use StatsCard or KPICard directly.</p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Responsive grid</strong> — auto-adjusting columns.</li>
    <li><strong>Consistent spacing</strong> — uniform gap between cards.</li>
    <li><strong>Mobile-friendly</strong> — adapts to all screen sizes.</li>
    <li><strong>Simple API</strong> — pass items array.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://m3.material.io/foundations/layout/applying-layout/overview">Material Design 3 — Layout Grid</a></li>
    <li><a href="https://tailwindcss.com/docs/grid-template-columns">Tailwind CSS — Grid</a></li>
    <li><a href="https://ant.design/components/grid">Ant Design — Grid</a></li>
    <li><a href="https://primer.style/components/grid">Primer — Grid</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout">MDN — CSS Grid</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Fills container width by default.</li>
    <li>SVG charts scale to any resolution.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Custom colors, labels, and sizes.</li>
    <li>Grid lines, legends, and axis labels.</li>
  </ul>

  <h2>Examples</h2>
  
  <ExampleTabs code={`<MetricGrid items={[
  { label: 'Total Revenue', value: '$45,231.89', color: 'primary' },
  { label: 'Total Users', value: '2,543', color: 'success' }
]} columns={4} gap="md" />`}>
    <div class="flex justify-center" data-testid="metrics-basic-metricgrid">
      <MetricGrid
        items={[
          { label: "Total Revenue", value: "$45,231.89" },
          { label: "Total Users", value: "2,543" },
          { label: "Conversion Rate", value: "4.8%" },
          { label: "Active Sessions", value: "542" }
        ]}
      />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={MetricGridModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>SVG elements include proper ARIA roles and labels.</li>
    <li>Color contrast meets WCAG AA standards.</li>
    <li>Legend provides text alternative to colors.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    Chart components are display-only elements. Interactive data points support
    focus via Tab and activation via Enter/Space.
  </p>
</Container>
