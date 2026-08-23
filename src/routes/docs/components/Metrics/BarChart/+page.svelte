<!--
@component
BarChart documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import * as BarChartModule from "$lib/components/Metrics/BarChart/BarChart.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>BarChart</h1>

  <p>
    <strong>BarChart</strong> — An SVG vertical bar chart for comparing values across categories. Supports single and multiple data series with grouped bars.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>An SVG vertical bar chart for comparing values across categories. Supports single and multiple data series with grouped bars.</p>

  <h3>When should I use it?</h3>
  <p>Use BarChart for comparing discrete categories (monthly revenue, quarterly sales). For time-series trends, use LineChart or AreaChart.</p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>SVG rendering</strong> — crisp at any resolution.</li>
    <li><strong>Grouped bars</strong> — compare multiple series side by side.</li>
    <li><strong>Interactive</strong> — hover tooltips and click events.</li>
    <li><strong>Accessible</strong> — ARIA labels and keyboard navigation.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Data Visualization</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/bar.html">Chart.js — Bar Charts</a></li>
    <li><a href="https://ant.design/components/bar">Ant Design — Bar Chart</a></li>
    <li><a href="https://d3js.org/d3-shape/bar">D3.js — Bar Charts</a></li>
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
  
  <ExampleTabs code={`<BarChart
  series={[{ label: 'Revenue', data: [45, 52, 48, 61, 55, 67], color: '#3b82f6' }]}
  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
  title="Monthly Revenue" width={600} height={300}
/>`}>
    <div class="flex justify-center" data-testid="metrics-barchart-basic">
      <!-- Live demo -->
    </div>
  </ExampleTabs>

  <h3>Multiple Series BarChart</h3>
  <ExampleTabs code={`<BarChart
  series={[
    { label: 'Q1', data: [30, 40, 35, 50], color: '#3b82f6' },
    { label: 'Q2', data: [35, 45, 40, 55], color: '#ef4444' }
  ]}
  labels={['Product A', 'Product B', 'Product C', 'Product D']}
  title="Quarterly Comparison" showGrid={true} showLegend={true}
  width={600} height={300}
/>`}>
    <div class="flex justify-center" data-testid="metrics-barchart-multi">
      <!-- Live demo -->
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={BarChartModule} />
  <h2>Events</h2>
  <EventsTable component={BarChartModule} />

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
