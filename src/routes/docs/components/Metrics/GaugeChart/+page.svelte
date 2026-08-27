<!--
@component
GaugeChart documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import GaugeChart from "$lib/components/Metrics/GaugeChart/GaugeChart.svelte"
import * as GaugeChartModule from "$lib/components/Metrics/GaugeChart/GaugeChart.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>GaugeChart</h1>

  <p>
    <strong>GaugeChart</strong> — An SVG gauge chart for displaying a value within a range. Features configurable arcs, needle indicator, tic marks, and color zones.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>An SVG gauge chart for displaying a value within a range. Features configurable arcs, needle indicator, tic marks, and color zones.</p>

  <h3>When should I use it?</h3>
  <p>Use GaugeChart for single metric displays: performance scores, satisfaction ratings, or any value within a defined range. For progress bars, use ProgressMetric.</p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>SVG rendering</strong> — crisp at any resolution.</li>
    <li><strong>Needle indicator</strong> — precise value display.</li>
    <li><strong>Color zones</strong> — visual status ranges.</li>
    <li><strong>Configurable</strong> — arc angles, tic marks, labels.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/meter/">WAI-ARIA APG — Meter</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/doughnut.html">Chart.js — Doughnut (as gauge)</a></li>
    <li><a href="https://ant.design/components/gauge">Ant Design — Gauge</a></li>
    <li><a href="https://d3js.org/d3-shape/arc">D3.js — Arcs</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>SVG-based semicircular/circular gauge</li>
    <li>`role=&quot;meter&quot;` with `aria-valuenow/min/max`</li>
    <li>Text alternative with actual value</li>
    <li>`conic-gradient` for the fill indicator</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;div&gt;` with CSS rotation — always `role=&quot;meter&quot;` for accessibility</li>
    <li>Don't forget the text alternative — screen readers can't read SVG</li>
</ul>

<h2>Related Components</h2>
<p>Slider, Progress, NumberInput</p>

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
  
  <ExampleTabs code={`<GaugeChart value={75} min={0} max={100}
  label="Performance Score" unit="%" color="primary" />`}>
    <div class="flex justify-center" data-testid="metrics-basic-gaugechart">
      <GaugeChart value={75} min={0} max={100} label="Performance Score" unit="%" color="primary" />
    </div>
  </ExampleTabs>

  <h3>With Tic Marks</h3>
  <ExampleTabs code={`<GaugeChart value={82} min={0} max={100}
  label="Customer Satisfaction" unit="%" color="primary" showTicks={true} size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-with-tic-marks">
      <GaugeChart value={82} min={0} max={100} label="Customer Satisfaction" unit="%" color="primary" size={300} />
    </div>
  </ExampleTabs>

  <h3>With Color Zones</h3>
  <ExampleTabs code={`<GaugeChart value={71} min={0} max={100}
  label="Walmart's Customer Satisfaction Score" unit="%" color="primary" size={300}
  zones={[
    { start: 0, end: 25, color: '#ef4444', label: 'Poor' },
    { start: 25, end: 50, color: '#f97316', label: 'Fair' },
    { start: 50, end: 75, color: '#eab308', label: 'Good' },
    { start: 75, end: 100, color: '#10b981', label: 'Excellent' }
  ]} />`}>
    <div class="flex justify-center" data-testid="metrics-with-color-zones">
      <GaugeChart value={71} min={0} max={100} label="Walmart's Customer Satisfaction Score" unit="%" color="primary" size={300} />
    </div>
  </ExampleTabs>

  <h3>Full Circle</h3>
  <ExampleTabs code={`<GaugeChart value={92} min={0} max={100}
  label="System Health" unit="%" color="success" fullCircle={true} size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-full-circle-gauge">
      <GaugeChart value={92} min={0} max={100} label="System Health" unit="%" color="success" size={300} />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={GaugeChartModule} />

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
