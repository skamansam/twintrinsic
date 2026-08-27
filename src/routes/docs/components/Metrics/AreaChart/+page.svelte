<!--
@component
AreaChart documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import AreaChart from "$lib/components/Metrics/AreaChart/AreaChart.svelte"
import * as AreaChartModule from "$lib/components/Metrics/AreaChart/AreaChart.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>AreaChart</h1>

  <p>
    <strong>AreaChart</strong> — An SVG area chart for displaying trends over time with filled areas. Supports single and multiple data series with optional stacking.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>An SVG area chart for displaying trends over time with filled areas. Supports single and multiple data series with optional stacking.</p>

  <h3>When should I use it?</h3>
  <p>Use AreaChart for showing trends over time where the filled area emphasizes volume (e.g. website traffic, revenue over time). For simple line trends, use LineChart. For categorical comparison, use BarChart.</p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>SVG rendering</strong> — crisp at any resolution.</li>
    <li><strong>Multi-series</strong> — stacked or overlapping areas.</li>
    <li><strong>Interactive</strong> — hover tooltips and click events.</li>
    <li><strong>Responsive</strong> — adapts to container size.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Data Visualization</a></li>
    <li><a href="https://d3js.org/d3-shape/area">D3.js — Area Charts</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/area.html">Chart.js — Area Charts</a></li>
    <li><a href="https://ant.design/components/area">Ant Design — Area Chart</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>SVG-based chart rendering for Area, Bar, Line, Pie, Donut, HorizontalBar</li>
    <li>`aria-label` on chart container for screen readers</li>
    <li>Accessible data tables as alternatives</li>
    <li>`content-visibility: auto` for off-screen charts</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;canvas&gt;` without a text alternative — SVG is more accessible</li>
    <li>Don't forget to provide an accessible data table alternative</li>
</ul>

<h2>Related Components</h2>
<p>KPICard, MetricGrid, GaugeChart</p>

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
  
  <ExampleTabs code={`<AreaChart
  series={[{ label: 'Website Traffic', data: [10, 15, 12, 18, 22, 20, 25], color: '#3b82f6' }]}
  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  title="Website Traffic"
  width={600} height={300}
/>`}>
    <div class="flex justify-center" data-testid="metrics-single-series-areachart">
      <AreaChart
        series={[{ label: "Website Traffic", data: [1200, 1900, 1500, 2200, 1800, 2500] }]}
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        title="Website Traffic"
        showLegend={true}
      />
    </div>
  </ExampleTabs>

  <h3>Stacked AreaChart</h3>
  <ExampleTabs code={`<AreaChart
  series={[
    { label: 'Desktop', data: [10, 15, 12, 18, 22, 20, 25], color: '#3b82f6' },
    { label: 'Mobile', data: [8, 12, 14, 16, 18, 22, 20], color: '#ef4444' }
  ]}
  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  title="Traffic by Device" stacked={true} showGrid={true} showLegend={true}
  width={600} height={300}
/>`}>
    <div class="flex justify-center" data-testid="metrics-stacked-areachart">
      <AreaChart
        series={[
          { label: "Desktop", data: [800, 1200, 900, 1400, 1100, 1600] },
          { label: "Mobile", data: [400, 700, 600, 800, 700, 900] }
        ]}
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        title="Traffic by Device (Stacked)"
        stacked={true}
        showLegend={true}
      />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={AreaChartModule} />

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
