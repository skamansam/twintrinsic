<!--
@component
DonutChart documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import DonutChart from "$lib/components/Metrics/DonutChart/DonutChart.svelte"
import * as DonutChartModule from "$lib/components/Metrics/DonutChart/DonutChart.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>DonutChart</h1>

  <p>
    <strong>DonutChart</strong> — An SVG donut chart (pie chart with center cutout) for displaying proportional data. The center can display a total or summary.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>An SVG donut chart (pie chart with center cutout) for displaying proportional data. The center can display a total or summary.</p>

  <h3>When should I use it?</h3>
  <p>Use DonutChart for composition data where the center cutout provides visual emphasis or a summary value. For traditional pie, use PieChart.</p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>SVG rendering</strong> — crisp at any resolution.</li>
    <li><strong>Center cutout</strong> — space for summary text.</li>
    <li><strong>Customizable</strong> — inner radius, colors, legend.</li>
    <li><strong>Interactive</strong> — hover effects on slices.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/doughnut.html">Chart.js — Doughnut</a></li>
    <li><a href="https://ant.design/components/pie">Ant Design — Pie Chart</a></li>
    <li><a href="https://d3js.org/d3-shape/pie">D3.js — Pie Layouts</a></li>
    <li><a href="https://www.nightingaledata.com/blog/when-to-use-donut-charts">Nightingale — Donut Charts</a></li>
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
  
  <ExampleTabs code={`<DonutChart data={[30, 25, 20, 15, 10]}
  labels={['Product A', 'Product B', 'Product C', 'Product D', 'Product E']}
  size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-basic-donutchart">
      <DonutChart
        data={[30, 25, 20, 15, 10]}
        labels={["Product A", "Product B", "Product C", "Product D", "Product E"]}
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>Title and Legend</h3>
  <ExampleTabs code={`<DonutChart data={[30, 25, 20, 15, 10]}
  labels={['Product A', 'Product B', 'Product C', 'Product D', 'Product E']}
  title="Market Share" showLegend={true} size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-with-title-and-legend">
      <DonutChart
        data={[30, 25, 20, 15, 10]}
        labels={["Product A", "Product B", "Product C", "Product D", "Product E"]}
        title="Market Share"
        showLegend={true}
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>Custom Colors</h3>
  <ExampleTabs code={`<DonutChart data={[30, 25, 20, 15, 10]}
  labels={['Product A', 'Product B', 'Product C', 'Product D', 'Product E']}
  colors={['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']}
  title="Custom Colors" showLegend={true} size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-custom-colors">
      <DonutChart
        data={[30, 25, 20, 15, 10]}
        labels={["Product A", "Product B", "Product C", "Product D", "Product E"]}
        colors={["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"]}
        title="Custom Colors"
        showLegend={true}
        size={300}
      />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={DonutChartModule} />
  <h2>Events</h2>
  <EventsTable component={DonutChartModule} />

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
