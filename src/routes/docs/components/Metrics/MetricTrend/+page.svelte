<!--
@component
MetricTrend documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import MetricTrend from "$lib/components/Metrics/MetricTrend/MetricTrend.svelte"
import * as MetricTrendModule from "$lib/components/Metrics/MetricTrend/MetricTrend.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>MetricTrend</h1>

  <p>
    <strong>MetricTrend</strong> — {m.trend_lede()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.trend_lede()}</p>

  <h3>{m.sec_when()}</h3>
  <p>{m.trend_when()}</p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.trend_why_compact()}</strong>{m.trend_why_compact_desc()}</li>
    <li><strong>{m.trend_why_visual()}</strong>{m.trend_why_visual_desc()}</li>
    <li><strong>{m.trend_why_custom()}</strong>{m.trend_why_custom_desc()}</li>
    <li><strong>{m.trend_why_responsive()}</strong>{m.trend_why_responsive_desc()}</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://d3js.org/d3-shape/line">D3.js — Line Charts</a></li>
    <li><a href="https://ant.design/components/sparkline">Ant Design — Sparkline</a></li>
    <li><a href="https://primer.style/components/sparkline">Primer — Sparkline</a></li>
    <li><a href="https://informationisbeautiful.net/2010/sparklines-instant-charts/">Information is Beautiful — Sparklines</a></li>
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
  
  <ExampleTabs code={`<MetricTrend label="Sales Trend"
  data={[10, 15, 12, 18, 22, 20, 25]} color="#10b981" />`}>
    <div class="flex justify-center" data-testid="metrics-basic-metrictrend">
      <MetricTrend
        data={[10, 15, 13, 18, 22, 25, 20, 28]}
        label="Sales Trend"
        color="#3b82f6"
      />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={MetricTrendModule} />
  <h2>{m.sec_events()}</h2>
  <EventsTable component={MetricTrendModule} />

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
