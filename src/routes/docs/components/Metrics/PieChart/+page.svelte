<!--
@component
PieChart documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import * as PieChartModule from "$lib/components/Metrics/PieChart/PieChart.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>PieChart</h1>

  <p>
    <strong>PieChart</strong> — An SVG pie chart for displaying proportional data. Each slice represents a portion of the whole.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>An SVG pie chart for displaying proportional data. Each slice represents a portion of the whole.</p>

  <h3>When should I use it?</h3>
  <p>Use PieChart for showing composition or parts of a whole (market share, budget allocation). For donut style, use DonutChart. For trends, use LineChart.</p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>SVG rendering</strong> — crisp at any resolution.</li>
    <li><strong>Visual composition</strong> — intuitive part-to-whole.</li>
    <li><strong>Interactive</strong> — hover effects on slices.</li>
    <li><strong>Legend support</strong> — text alternative to colors.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Data Visualization</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/doughnut.html">Chart.js — Pie Charts</a></li>
    <li><a href="https://ant.design/components/pie">Ant Design — Pie Chart</a></li>
    <li><a href="https://d3js.org/d3-shape/pie">D3.js — Pie Layouts</a></li>
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
  
  <ExampleTabs code={`<PieChart data={[35, 25, 20, 20]} labels={['Chrome', 'Firefox', 'Safari', 'Edge']} size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-piechart-basic">
      <!-- Live demo -->
    </div>
  </ExampleTabs>

  <h3>With Title and Legend</h3>
  <ExampleTabs code={`<PieChart data={[35, 25, 20, 20]} labels={['Chrome', 'Firefox', 'Safari', 'Edge']}
  title="Browser Market Share" showLegend={true} size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-piechart-multi">
      <!-- Live demo -->
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={PieChartModule} />
  <h2>Events</h2>
  <EventsTable component={PieChartModule} />

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
