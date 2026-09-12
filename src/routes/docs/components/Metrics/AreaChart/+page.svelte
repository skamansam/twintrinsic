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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>AreaChart</h1>

  <p>
    <strong>AreaChart</strong> — {m.area_lede()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.area_lede()}</p>

  <h3>{m.sec_when()}</h3>
  <p>{m.area_when()}</p>

  <h3>{m.chart_ww_heading()}</h3>
  <table>
    <thead><tr><th>{m.chart_ww_th_chart()}</th><th>{m.chart_ww_th_best()}</th><th>{m.chart_ww_th_avoid()}</th></tr></thead>
    <tbody>
      <tr><td><strong>AreaChart</strong></td><td>{m.chart_ww_r_area()}</td><td>{m.chart_ww_r_area_avoid()}</td></tr>
      <tr><td><strong>LineChart</strong></td><td>{m.chart_ww_r_line()}</td><td>{m.chart_ww_r_line_avoid_1()}</td></tr>
      <tr><td><strong>BarChart</strong></td><td>{m.chart_ww_r_bar()}</td><td>{m.chart_ww_r_bar_avoid()}</td></tr>
      <tr><td><strong>PieChart</strong></td><td>{m.chart_ww_r_pie()}</td><td>{m.chart_ww_r_pie_avoid()}</td></tr>
    </tbody>
  </table>

  <h3>{m.chart_usecases()}</h3>
  <ul>
    <li><strong>{m.area_uc_dau()}</strong>{m.area_uc_dau_desc()}</li>
    <li><strong>{m.area_uc_revenue()}</strong>{m.area_uc_revenue_desc()}</li>
    <li><strong>{m.area_uc_temp()}</strong>{m.area_uc_temp_desc()}</li>
    <li><strong>{m.area_uc_storage()}</strong>{m.area_uc_storage_desc()}</li>
  </ul>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.area_why_svg()}</strong>{m.area_why_svg_desc()}</li>
    <li><strong>{m.area_why_multi()}</strong>{m.area_why_multi_desc()}</li>
    <li><strong>{m.area_why_interactive()}</strong>{m.area_why_interactive_desc()}</li>
    <li><strong>{m.area_why_responsive()}</strong>{m.area_why_responsive_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Data Visualization</a></li>
    <li><a href="https://d3js.org/d3-shape/area">D3.js — Area Charts</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/area.html">Chart.js — Area Charts</a></li>
    <li><a href="https://ant.design/components/area">Ant Design — Area Chart</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.area_impl_svg()}</li>
    <li>{m.area_impl_aria()}</li>
    <li>{m.area_impl_tables()}</li>
    <li>{m.area_impl_cv()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.area_mistake_1_1()}<code>&lt;canvas&gt;</code>{m.area_mistake_1_2()}</li>
    <li>{m.area_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.area_related()}</p>

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

  <h3>{m.area_ex_basic()}</h3>
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

  <h2>{m.sec_props()}</h2>
  <PropsTable component={AreaChartModule} />

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
