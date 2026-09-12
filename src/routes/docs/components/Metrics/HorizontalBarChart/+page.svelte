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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>HorizontalBarChart</h1>

  <p>
    <strong>HorizontalBarChart</strong> — {m.hbar_lede()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.hbar_lede()}</p>

  <h3>{m.sec_when()}</h3>
  <p>{m.hbar_when()}</p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.hbar_why_svg()}</strong>{m.hbar_why_svg_desc()}</li>
    <li><strong>{m.hbar_why_layout()}</strong>{m.hbar_why_layout_desc()}</li>
    <li><strong>{m.hbar_why_interactive()}</strong>{m.hbar_why_interactive_desc()}</li>
    <li><strong>{m.hbar_why_accessible()}</strong>{m.hbar_why_accessible_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG — Data Visualization</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/bar.html">Chart.js — Horizontal Bar</a></li>
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

  <h2>{m.sec_props()}</h2>
  <PropsTable component={HorizontalBarChartModule} />
  <h2>{m.sec_events()}</h2>
  <EventsTable component={HorizontalBarChartModule} />

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
