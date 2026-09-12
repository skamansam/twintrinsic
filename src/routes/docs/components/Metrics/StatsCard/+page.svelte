<!--
@component
StatsCard documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import StatsCard from "$lib/components/Metrics/StatsCard/StatsCard.svelte"
import * as StatsCardModule from "$lib/components/Metrics/StatsCard/StatsCard.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>StatsCard</h1>

  <p>
    <strong>StatsCard</strong> — {m.stats_lede()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.stats_lede()}</p>

  <h3>{m.sec_when()}</h3>
  <p>{m.stats_when()}</p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.stats_why_simple()}</strong>{m.stats_why_simple_desc()}</li>
    <li><strong>{m.stats_why_trend()}</strong>{m.stats_why_trend_desc()}</li>
    <li><strong>{m.stats_why_custom()}</strong>{m.stats_why_custom_desc()}</li>
    <li><strong>{m.stats_why_interactive()}</strong>{m.stats_why_interactive_desc()}</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://m3.material.io/components/cards/overview">Material Design 3 — Cards</a></li>
    <li><a href="https://ant.design/components/statistic">Ant Design — Statistic</a></li>
    <li><a href="https://primer.style/components/counter">Primer — Counter</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG</a></li>
    <li><a href="https://carbondesignsystem.com/components/tile/usage">Carbon Design — Tile</a></li>
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
  
  <ExampleTabs code={`<StatsCard label="Total Revenue" value="$124,532.89" color="primary" />`}>
    <div class="flex justify-center" data-testid="metrics-basic-statscard">
      <StatsCard label="Total Revenue" value="$124,532.89" color="success" />
    </div>
  </ExampleTabs>

  <h3>{m.stats_ex_trend()}</h3>
  <ExampleTabs code={`<StatsCard label="Total Users" value="2,543"
  trend="up" trendValue="12.5%" color="success" />`}>
    <div class="flex justify-center" data-testid="metrics-with-trend-indicator">
      <StatsCard label="Total Users" value="2,543" trend="up" trendValue="12.5%" color="primary" />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={StatsCardModule} />
  <h2>{m.sec_events()}</h2>
  <EventsTable component={StatsCardModule} />

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
