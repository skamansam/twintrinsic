<!--
@component
LineChart documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import LineChart from "$lib/components/Metrics/LineChart/LineChart.svelte"
import * as LineChartModule from "$lib/components/Metrics/LineChart/LineChart.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>LineChart</h1>

  <p>
    <strong>LineChart</strong> — {m.line_lede()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.line_lede()}</p>

  <h3>{m.sec_when()}</h3>
  <p>{m.line_when()}</p>

  <h3>{m.chart_ww_heading()}</h3>
  <table>
    <thead><tr><th>{m.chart_ww_th_chart()}</th><th>{m.chart_ww_th_best()}</th><th>{m.chart_ww_th_avoid()}</th></tr></thead>
    <tbody>
      <tr><td><strong>LineChart</strong></td><td>{m.chart_ww_r_line()}</td><td>{m.chart_ww_r_line_avoid_2()}</td></tr>
      <tr><td><strong>AreaChart</strong></td><td>{m.chart_ww_r_area()}</td><td>{m.chart_ww_r_area_avoid()}</td></tr>
      <tr><td><strong>BarChart</strong></td><td>{m.chart_ww_r_bar()}</td><td>{m.chart_ww_r_bar_avoid()}</td></tr>
      <tr><td><strong>PieChart</strong></td><td>{m.chart_ww_r_pie()}</td><td>{m.chart_ww_r_pie_avoid()}</td></tr>
    </tbody>
  </table>

  <h3>{m.chart_usecases()}</h3>
  <ul>
    <li><strong>{m.line_uc_revenue()}</strong>{m.line_uc_revenue_desc()}</li>
    <li><strong>{m.line_uc_traffic()}</strong>{m.line_uc_traffic_desc()}</li>
    <li><strong>{m.line_uc_sales()}</strong>{m.line_uc_sales_desc()}</li>
    <li><strong>{m.line_uc_share()}</strong>{m.line_uc_share_desc()}</li>
  </ul>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.line_why_svg()}</strong>{m.line_why_svg_desc()}</li>
    <li><strong>{m.line_why_smooth()}</strong>{m.line_why_smooth_desc()}</li>
    <li><strong>{m.line_why_interactive()}</strong>{m.line_why_interactive_desc()}</li>
    <li><strong>{m.line_why_multi()}</strong>{m.line_why_multi_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Data Visualization</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/line.html">Chart.js — Line Charts</a></li>
    <li><a href="https://d3js.org/d3-shape/line">D3.js — Line Charts</a></li>
    <li><a href="https://ant.design/components/line">Ant Design — Line Chart</a></li>
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

  <ExampleTabs code={`<LineChart
  series={[{ label: 'Sales', data: [10, 15, 12, 18, 22, 20, 25], color: '#3b82f6' }]}
  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  title="Weekly Sales" width={600} height={300}
/>`}>
    <div class="flex justify-center" data-testid="metrics-linechart-basic">
      <LineChart
        series={[{ label: "Product A", data: [12, 19, 15, 22, 18, 25] }, { label: "Product B", data: [8, 12, 10, 16, 14, 20] }]}
        labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        title="Weekly Sales"
        showLegend={true}
      />
    </div>
  </ExampleTabs>

  <h3>{m.line_ex_multi()}</h3>
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
      <LineChart
        series={[{ label: "Product A", data: [12, 19, 15, 22, 18, 25] }]}
        labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        title="Weekly Sales"
        showLegend={true}
      />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={LineChartModule} />
  <h2>{m.sec_events()}</h2>
  <EventsTable component={LineChartModule} />

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
