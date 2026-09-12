<!--
@component
DonutChart documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import DonutChart from "$lib/components/Metrics/DonutChart/DonutChart.svelte"
import * as DonutChartModule from "$lib/components/Metrics/DonutChart/DonutChart.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>DonutChart</h1>

  <p>
    <strong>DonutChart</strong> — {m.donut_lede()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.donut_lede()}</p>

  <h3>{m.sec_when()}</h3>
  <p>{m.donut_when()}</p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.donut_why_svg()}</strong>{m.donut_why_svg_desc()}</li>
    <li><strong>{m.donut_why_cutout()}</strong>{m.donut_why_cutout_desc()}</li>
    <li><strong>{m.donut_why_custom()}</strong>{m.donut_why_custom_desc()}</li>
    <li><strong>{m.donut_why_interactive()}</strong>{m.donut_why_interactive_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/doughnut.html">Chart.js — Doughnut</a></li>
    <li><a href="https://ant.design/components/pie">Ant Design — Pie Chart</a></li>
    <li><a href="https://d3js.org/d3-shape/pie">D3.js — Pie Layouts</a></li>
    <li><a href="https://www.nightingaledata.com/blog/when-to-use-donut-charts">Nightingale — Donut Charts</a></li>
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

  <ExampleTabs code={`<DonutChart data={[30, 25, 20, 15, 10]}
  labels={['Product A', 'Product B', 'Product C', 'Product D', 'Product E']}
  size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-basic-donutchart">
      <DonutChart
        data={[30, 25, 20, 15, 10]}
        labels={["Product A", "Product B", "Product C", "Product D", "Product E"]}
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>{m.donut_ex_title()}</h3>
  <ExampleTabs code={`<DonutChart data={[30, 25, 20, 15, 10]}
  labels={['Product A', 'Product B', 'Product C', 'Product D', 'Product E']}
  title="Market Share" showLegend={true} size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-with-title-and-legend">
      <DonutChart
        data={[30, 25, 20, 15, 10]}
        labels={["Product A", "Product B", "Product C", "Product D", "Product E"]}
        title="Market Share"
        showLegend={true}
        size={300}
      />
    </div>
  </ExampleTabs>

  <h3>{m.donut_ex_colors()}</h3>
  <ExampleTabs code={`<DonutChart data={[30, 25, 20, 15, 10]}
  labels={['Product A', 'Product B', 'Product C', 'Product D', 'Product E']}
  colors={['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']}
  title="Custom Colors" showLegend={true} size={300} />`}>
    <div class="flex justify-center" data-testid="metrics-custom-colors">
      <DonutChart
        data={[30, 25, 20, 15, 10]}
        labels={["Product A", "Product B", "Product C", "Product D", "Product E"]}
        colors={["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"]}
        title="Custom Colors"
        showLegend={true}
        size={300}
      />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={DonutChartModule} />
  <h2>{m.sec_events()}</h2>
  <EventsTable component={DonutChartModule} />

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
