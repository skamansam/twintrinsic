<!--
@component
BarChart documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import BarChart from "$lib/components/Metrics/BarChart/BarChart.svelte"
import * as BarChartModule from "$lib/components/Metrics/BarChart/BarChart.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>BarChart</h1>

  <p>
    <strong>BarChart</strong> — {m.bar_lede()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.bar_lede()}</p>

  <h3>{m.sec_when()}</h3>
  <p>{m.bar_when()}</p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.bar_why_svg()}</strong>{m.bar_why_svg_desc()}</li>
    <li><strong>{m.bar_why_grouped()}</strong>{m.bar_why_grouped_desc()}</li>
    <li><strong>{m.bar_why_interactive()}</strong>{m.bar_why_interactive_desc()}</li>
    <li><strong>{m.bar_why_accessible()}</strong>{m.bar_why_accessible_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Data Visualization</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/bar.html">Chart.js — Bar Charts</a></li>
    <li><a href="https://ant.design/components/bar">Ant Design — Bar Chart</a></li>
    <li><a href="https://d3js.org/d3-shape/bar">D3.js — Bar Charts</a></li>
  </ul>

  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.chart_responsive_1()}</li>
    <li>{m.chart_responsive_2()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.chart_custom_1()}</li>
    <li>{m.chart_custom_2()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <ExampleTabs code={`<BarChart
  series={[{ label: 'Revenue', data: [45, 52, 48, 61, 55, 67], color: '#3b82f6' }]}
  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
  title="Monthly Revenue" width={600} height={300}
/>`}>
    <div class="flex justify-center" data-testid="metrics-single-series-barchart">
      <BarChart
        series={[{ label: "Revenue", data: [45, 52, 48, 61, 55, 67] }]}
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        title="Monthly Revenue"
        showLegend={true}
      />
    </div>
  </ExampleTabs>

  <h3>{m.bar_ex_multi()}</h3>
  <ExampleTabs code={`<BarChart
  series={[
    { label: 'Q1', data: [30, 40, 35, 50], color: '#3b82f6' },
    { label: 'Q2', data: [35, 45, 40, 55], color: '#ef4444' }
  ]}
  labels={['Product A', 'Product B', 'Product C', 'Product D']}
  title="Quarterly Comparison" showGrid={true} showLegend={true}
  width={600} height={300}
/>`}>
    <div class="flex justify-center" data-testid="metrics-multiple-series-barchart">
      <BarChart
        series={[
          { label: "Q1", data: [30, 40, 35, 50] },
          { label: "Q2", data: [35, 45, 40, 55] }
        ]}
        labels={["Product A", "Product B", "Product C", "Product D"]}
        title="Quarterly Comparison"
        showLegend={true}
      />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={BarChartModule} />
  <h2>{m.sec_events()}</h2>
  <EventsTable component={BarChartModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.chart_a11y_1()}</li>
    <li>{m.chart_a11y_2()}</li>
    <li>{m.chart_a11y_3()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>
    {m.chart_kb_body()}
  </p>
</Container>
