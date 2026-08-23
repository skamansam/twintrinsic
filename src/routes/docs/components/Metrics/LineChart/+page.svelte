<!--
@component
LineChart documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import * as LineChartModule from "$lib/components/Metrics/LineChart/LineChart.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>LineChart</h1>

  <p>
    <strong>LineChart</strong> — An SVG line chart for displaying trends over time. Supports single and multiple data series with smooth curves and data points.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>An SVG line chart for displaying trends over time. Supports single and multiple data series with smooth curves and data points.</p>

  <h3>When should I use it?</h3>
  <p>Use LineChart for continuous time-series data (sales over time, user growth). For filled volume emphasis, use AreaChart. For categorical comparison, use BarChart.</p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>SVG rendering</strong> — crisp at any resolution.</li>
    <li><strong>Smooth curves</strong> — visually appealing trend lines.</li>
    <li><strong>Interactive</strong> — hover tooltips on data points.</li>
    <li><strong>Multi-series</strong> — compare multiple trends.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Data Visualization</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/line.html">Chart.js — Line Charts</a></li>
    <li><a href="https://d3js.org/d3-shape/line">D3.js — Line Charts</a></li>
    <li><a href="https://ant.design/components/line">Ant Design — Line Chart</a></li>
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
  
  <ExampleTabs code={`<LineChart
  series={[{ label: 'Sales', data: [10, 15, 12, 18, 22, 20, 25], color: '#3b82f6' }]}
  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  title="Weekly Sales" width={600} height={300}
/>`}>
    <div class="flex justify-center" data-testid="metrics-linechart-basic">
      <!-- Live demo -->
    </div>
  </ExampleTabs>

  <h3>Multiple Series LineChart</h3>
  <ExampleTabs code={`<LineChart
  series={[
    { label: 'Product A', data: [10, 15, 12, 18, 22, 20, 25], color: '#3b82f6' },
    { label: 'Product B', data: [8, 12, 14, 16, 18, 22, 20], color: '#ef4444' }
  ]}
  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  title="Product Comparison" showGrid={true} showLegend={true}
  width={600} height={300}
/>`}>
    <div class="flex justify-center" data-testid="metrics-linechart-multi">
      <!-- Live demo -->
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={LineChartModule} />
  <h2>Events</h2>
  <EventsTable component={LineChartModule} />

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
