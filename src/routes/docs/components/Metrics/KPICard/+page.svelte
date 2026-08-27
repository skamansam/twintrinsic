<!--
@component
KPICard documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import KPICard from "$lib/components/Metrics/KPICard/KPICard.svelte"
import * as KPICardModule from "$lib/components/Metrics/KPICard/KPICard.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>KPICard</h1>

  <p>
    <strong>KPICard</strong> — A card component for displaying Key Performance Indicators with progress visualization towards a target.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>A card component for displaying Key Performance Indicators with progress visualization towards a target.</p>

  <h3>When should I use it?</h3>
  <p>Use KPICard for tracking progress towards goals: sales targets, user acquisition, conversion rates. For simple stat display, use StatsCard.</p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Progress visualization</strong> — visual indicator of goal progress.</li>
    <li><strong>Target comparison</strong> — current vs target display.</li>
    <li><strong>Customizable</strong> — colors, units, icons.</li>
    <li><strong>Interactive</strong> — click events for drill-down.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://m3.material.io/components/cards/overview">Material Design 3 — Cards</a></li>
    <li><a href="https://ant.design/components/statistic">Ant Design — Statistic</a></li>
    <li><a href="https://primer.style/components/branch-graph">Primer — Branch graph</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/meter/">WAI-ARIA APG — Meter</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/doughnut.html">Chart.js — Doughnut</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>`&lt;dl&gt;` + `&lt;dt&gt;` + `&lt;dd&gt;` for semantic key-value pairs</li>
    <li>`&lt;meter&gt;` for scalar measurements within metrics</li>
    <li>CSS Grid for responsive layout</li>
    <li>`content-visibility: auto` for off-screen metric cards</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use `&lt;div&gt;` for label-value pairs — `&lt;dl&gt;` is semantic</li>
    <li>Don't forget `aria-label` on metric containers</li>
</ul>

<h2>Related Components</h2>
<p>Progress, GaugeChart, DataTable</p>

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
  
  <ExampleTabs code={`<KPICard label="Q4 Sales Target" value={95000} target={100000}
  unit="$" color="success" />`}>
    <div class="flex justify-center" data-testid="metrics-basic-kpicard">
      <KPICard label="Q4 Sales Target" value={95000} target={100000} unit="$" color="success" />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={KPICardModule} />

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
