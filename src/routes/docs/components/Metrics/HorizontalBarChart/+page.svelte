<!--
@component
HorizontalBarChart documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import HorizontalBarChart from "$lib/components/Metrics/HorizontalBarChart/HorizontalBarChart.svelte"
import * as HorizontalBarChartModule from "$lib/components/Metrics/HorizontalBarChart/HorizontalBarChart.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>HorizontalBarChart</h1>

  <p>
    <strong>HorizontalBarChart</strong> — An SVG horizontal bar chart for displaying and comparing values. Ideal for long category names or limited vertical space.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>An SVG horizontal bar chart for displaying and comparing values. Ideal for long category names or limited vertical space.</p>

  <h3>When should I use it?</h3>
  <p>Use HorizontalBarChart when category labels are long (browser names, department names) or when vertical space is limited. For standard vertical bars, use BarChart.</p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>SVG rendering</strong> — crisp at any resolution.</li>
    <li><strong>Horizontal layout</strong> — accommodates long labels.</li>
    <li><strong>Interactive</strong> — hover tooltips and click events.</li>
    <li><strong>Accessible</strong> — ARIA labels and keyboard navigation.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Data Visualization</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/bar.html">Chart.js — Horizontal Bar</a></li>
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
  
  <ExampleTabs code={`<HorizontalBarChart
  data={[45, 38, 52, 41, 35]}
  labels={['Chrome', 'Firefox', 'Safari', 'Edge', 'Other']}
  title="Browser Usage" width={600} height={250}
/>`}>
    <div class="flex justify-center" data-testid="metrics-basic-horizontalbarchart">
      <HorizontalBarChart
        data={[65, 40, 25, 15, 10]}
        labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]}
        title="Browser Usage"
        showGrid={true}
      />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={HorizontalBarChartModule} />
  <h2>Events</h2>
  <EventsTable component={HorizontalBarChartModule} />

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
