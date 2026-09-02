<!--
@component
PieChart documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PieChart from "$lib/components/Metrics/PieChart/PieChart.svelte"
import * as PieChartModule from "$lib/components/Metrics/PieChart/PieChart.svelte"

const pieData = [35, 25, 20, 15, 5]
const pieLabels = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other']
const pieColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']

let interactiveActive = $state<number | null>(null)
let lastClicked = $state<{ index: number; label: string; value: number } | null>(null)

function handleSliceChange(event: CustomEvent<{ index: number | null }>) {
  interactiveActive = event.detail.index;
}

function handleSliceClick(_event: MouseEvent | KeyboardEvent, detail: { index: number; label: string; value: number }) {
  lastClicked = detail;
}

const interactiveCode = `<script lang="ts">
  let active = $state<number | null>(null);
  let info = $state<{ label: string; value: number } | null>(null);
<\/script>

<PieChart
  data={[35, 25, 20, 15, 5]}
  labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]}
  colors={["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"]}
  activeSlice={active}
  pullDistance={14}
  size={300}
  onactivechange={(e) => active = e.detail.index}
  onsliceclick={(_e, detail) => info = detail}
/>
{#if info}
  <div class="mt-4 p-3 bg-surface border border-border rounded-lg">
    <strong>{info.label}</strong>: {info.value} units
  </div>
{/if}`;
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>PieChart</h1>

  <p>
    <strong>PieChart</strong> displays proportional data as an SVG pie or donut chart.
    Each slice represents a portion of the whole. Supports donut mode, custom start angles,
    hover tooltips, and click interactivity.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    An SVG chart for displaying proportional data. Each slice represents a portion of the
    whole. Set <code>hole</code> to create a donut chart with optional center text.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use PieChart for showing composition or parts of a whole: market share, budget allocation,
    survey results. For trends over time, use <code>&lt;LineChart&gt;</code>. For single
    values, use <code>&lt;KPICard&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>SVG rendering</strong> — crisp at any resolution, no canvas dependency.</li>
    <li><strong>Visual composition</strong> — intuitive part-to-whole relationship.</li>
    <li><strong>Donut mode</strong> — center text for key metrics (total, percentage).</li>
    <li><strong>Interactive</strong> — hover tooltips, click callbacks, keyboard accessible.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Data Visualization</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/doughnut.html">Chart.js — Pie/Doughnut</a></li>
    <li><a href="https://d3js.org/d3-shape/pie">D3.js — Pie Layouts</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>SVG charts scale to any resolution.</li>
    <li>Set <code>size</code> to control dimensions; chart is square.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li><code>hole</code> — donut mode (0 = pie, 0.6 = standard donut, 0.8 = thin ring).</li>
    <li><code>centerText</code> / <code>centerSubtext</code> — text in the center (donut mode).</li>
    <li><code>start</code> — start angle: <code>'top'</code>, <code>'right'</code>, <code>'bottom'</code>, <code>'left'</code>, or <code>'45deg'</code>.</li>
    <li><code>counterClockwise</code> — draw slices in reverse direction.</li>
    <li><code>showTooltips</code> — hover tooltips with label, value, and percentage.</li>
    <li>Custom colors, labels, and sizes.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Pie</h3>
  <ExampleTabs code={`<PieChart data={[35, 25, 20, 15, 5]} labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]} size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-basic-piechart">
      <PieChart
        data={[35, 25, 20, 15, 5]}
        labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]}
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>Donut Mode with Center Text</h3>
  <ExampleTabs code={`<PieChart data={[35, 25, 20]} labels={["Desktop", "Mobile", "Tablet"]}
  hole={0.6} centerText="100%" centerSubtext="Total" size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-donut-center">
      <PieChart
        data={[35, 25, 20]}
        labels={["Desktop", "Mobile", "Tablet"]}
        hole={0.6}
        centerText="100%"
        centerSubtext="Total"
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>Custom Start Angle</h3>
  <ExampleTabs code={`<PieChart data={[30, 25, 20, 15]} labels={["Q1", "Q2", "Q3", "Q4"]}
  start="right" size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-start-angle">
      <PieChart
        data={[30, 25, 20, 15]}
        labels={["Q1", "Q2", "Q3", "Q4"]}
        start="right"
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>Counter-Clockwise</h3>
  <ExampleTabs code={`<PieChart data={[35, 25, 20]} labels={["A", "B", "C"]}
  counterClockwise size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-counterclockwise">
      <PieChart
        data={[35, 25, 20]}
        labels={["A", "B", "C"]}
        counterClockwise
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>With Title and Legend</h3>
  <ExampleTabs code={`<PieChart data={[35, 25, 20, 15, 5]} labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]}
  title="Browser Market Share" showLegend={true} size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-with-title-and-legend">
      <PieChart
        data={[35, 25, 20, 15, 5]}
        labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]}
        title="Browser Market Share"
        showLegend={true}
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>Active / Pull Slice</h3>
  <p>
    Click a slice or legend item to "pull it out" from the chart. The active slice is
    displaced outward by <code>pullDistance</code> pixels. Click again (or click the same
    legend item) to deactivate.
  </p>
  <ExampleTabs code={`<PieChart
  data={[35, 25, 20, 15, 5]}
  labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]}
  activeSlice={0}
  pullDistance={14}
  size={300}
/>`}>
    <div class="flex justify-center" data-testid="metrics-active-slice">
      <PieChart
        data={[35, 25, 20, 15, 5]}
        labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]}
        activeSlice={0}
        pullDistance={14}
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>Interactive Click-to-Reveal</h3>
  <p>
    Click any slice to activate it and display its details below the chart.
    The <code>onactivechange</code> and <code>onsliceclick</code> callbacks drive
    the info panel.
  </p>
  <ExampleTabs code={interactiveCode}>
    <div class="flex flex-col items-center" data-testid="metrics-interactive">
      <PieChart
        data={pieData}
        labels={pieLabels}
        colors={pieColors}
        activeSlice={interactiveActive}
        pullDistance={14}
        size={300}
        onactivechange={handleSliceChange}
        onsliceclick={handleSliceClick}
      />
      {#if lastClicked}
        <div class="mt-4 p-3 bg-surface border border-border rounded-lg text-sm" data-testid="metrics-interactive-info">
          <strong>{lastClicked.label}</strong>: {lastClicked.value} units
        </div>
      {/if}
    </div>
  </ExampleTabs>

  <h3>Outside Labels with Leader Lines</h3>
  <p>
    Set <code>outsideLabels</code> to render labels outside the chart connected by leader lines.
    Useful when slices are too small for inside labels. The <code>labelFontSize</code> prop
    controls text size.
  </p>
  <ExampleTabs code={`<PieChart
  data={[35, 25, 20, 15, 5]}
  labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]}
  outsideLabels
  labelFontSize={11}
  size={300}
/>`}>
    <div class="flex justify-center" data-testid="metrics-outside-labels">
      <PieChart
        data={[35, 25, 20, 15, 5]}
        labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]}
        outsideLabels
        labelFontSize={11}
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>Inside Labels on Slices</h3>
  <p>
    Set <code>insideLabels</code> to render percentage labels directly on top of each slice.
    Works best with larger slices. Combine with <code>outsideLabels</code> for both views.
  </p>
  <ExampleTabs code={`<PieChart
  data={[40, 30, 20, 10]}
  labels={["Enterprise", "Pro", "Free", "Trial"]}
  insideLabels
  size={300}
/>`}>
    <div class="flex justify-center" data-testid="metrics-inside-labels">
      <PieChart
        data={[40, 30, 20, 10]}
        labels={["Enterprise", "Pro", "Free", "Trial"]}
        insideLabels
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>Donut with Outside Labels</h3>
  <p>
    Outside labels work great with donut charts — center text shows the total while
    leader lines label each segment.
  </p>
  <ExampleTabs code={`<PieChart
  data={[35, 25, 20, 15, 5]}
  labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]}
  hole={0.5}
  centerText="100%"
  centerSubtext="Total"
  outsideLabels
  size={350}
/>`}>
    <div class="flex justify-center" data-testid="metrics-donut-outside-labels">
      <PieChart
        data={[35, 25, 20, 15, 5]}
        labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]}
        hole={0.5}
        centerText="100%"
        centerSubtext="Total"
        outsideLabels
        size={350}
      />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={PieChartModule} />
  <h2>Events</h2>
  <EventsTable component={PieChartModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>SVG elements include proper ARIA roles and labels.</li>
    <li>Slices are keyboard-focusable with Enter/Space activation.</li>
    <li>Each slice has an <code>aria-label</code> with label, value, and percentage.</li>
    <li>Legend provides text alternative to colors.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Move focus between slices</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Activate the focused slice (fires onsliceclick)</td></tr>
    </tbody>
  </table>
</Container>
