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
import { m } from "$lib/paraglide/messages.js"

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
    <strong>PieChart</strong> {m.pie_lede()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.pie_what()} <code>hole</code> {m.pie_what_2()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.pie_when_1()} <code>&lt;LineChart&gt;</code>. {m.pie_when_2()} <code>&lt;KPICard&gt;</code>.
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.pie_why_svg()}</strong>{m.pie_why_svg_desc()}</li>
    <li><strong>{m.pie_why_composition()}</strong>{m.pie_why_composition_desc()}</li>
    <li><strong>{m.pie_why_donut()}</strong>{m.pie_why_donut_desc()}</li>
    <li><strong>{m.pie_why_interactive()}</strong>{m.pie_why_interactive_desc()}</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Data Visualization</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/doughnut.html">Chart.js — Pie/Doughnut</a></li>
    <li><a href="https://d3js.org/d3-shape/pie">D3.js — Pie Layouts</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.chart_responsive_2()}</li>
    <li>{m.pie_responsive_2()} <code>size</code> {m.pie_responsive_2_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li><code>hole</code>{m.pie_custom_hole()}</li>
    <li><code>centerText</code> / <code>centerSubtext</code>{m.pie_custom_center()}</li>
    <li><code>start</code>{m.pie_custom_start()} <code>'top'</code>, <code>'right'</code>, <code>'bottom'</code>, <code>'left'</code>, {m.pie_custom_start_2()} <code>'45deg'</code>.</li>
    <li><code>counterClockwise</code>{m.pie_custom_ccw()}</li>
    <li><code>showTooltips</code>{m.pie_custom_tooltips()}</li>
    <li>{m.pie_custom_colors()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.pie_ex_basic()}</h3>
  <ExampleTabs code={`<PieChart data={[35, 25, 20, 15, 5]} labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]} size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-basic-piechart">
      <PieChart
        data={[35, 25, 20, 15, 5]}
        labels={["Chrome", "Firefox", "Safari", "Edge", "Other"]}
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>{m.pie_ex_donut()}</h3>
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

  <h3>{m.pie_ex_start()}</h3>
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

  <h3>{m.pie_ex_ccw()}</h3>
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

  <h3>{m.pie_ex_title()}</h3>
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

  <h3>{m.pie_ex_pull()}</h3>
  <p>
    {m.pie_ex_pull_desc()} <code>pullDistance</code> {m.pie_ex_pull_desc_2()}
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

  <h3>{m.pie_ex_reveal()}</h3>
  <p>
    {m.pie_ex_reveal_desc()} <code>onactivechange</code> {m.pie_ex_reveal_desc_2()} <code>onsliceclick</code> {m.pie_ex_reveal_desc_3()}
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

  <h3>{m.pie_ex_outside()}</h3>
  <p>
    {m.pie_ex_outside_desc()} <code>outsideLabels</code> {m.pie_ex_outside_desc_2()} <code>labelFontSize</code> {m.pie_ex_outside_desc_3()}
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

  <h3>{m.pie_ex_inside()}</h3>
  <p>
    {m.pie_ex_inside_desc()} <code>insideLabels</code> {m.pie_ex_inside_desc_2()} <code>outsideLabels</code> {m.pie_ex_inside_desc_3()}
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

  <h3>{m.pie_ex_donut_outside()}</h3>
  <p>
    {m.pie_ex_donut_outside_desc()}
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

  <h2>{m.sec_props()}</h2>
  <PropsTable component={PieChartModule} />
  <h2>{m.sec_events()}</h2>
  <EventsTable component={PieChartModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.chart_a11y_1()}</li>
    <li>{m.pie_a11y_2()}</li>
    <li>{m.pie_a11y_3()} <code>aria-label</code> {m.pie_a11y_3_2()}</li>
    <li>{m.chart_a11y_3()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>{m.pie_kb_slices()}</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>{m.pie_kb_activate()}</td></tr>
    </tbody>
  </table>
</Container>
