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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>KPICard</h1>

  <p>
    <strong>KPICard</strong> — {m.kpi_lede()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.kpi_lede()}</p>

  <h3>{m.sec_when()}</h3>
  <p>{m.kpi_when()}</p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.kpi_why_progress()}</strong>{m.kpi_why_progress_desc()}</li>
    <li><strong>{m.kpi_why_target()}</strong>{m.kpi_why_target_desc()}</li>
    <li><strong>{m.kpi_why_custom()}</strong>{m.kpi_why_custom_desc()}</li>
    <li><strong>{m.kpi_why_interactive()}</strong>{m.kpi_why_interactive_desc()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://m3.material.io/components/cards/overview">Material Design 3 — Cards</a></li>
    <li><a href="https://ant.design/components/statistic">Ant Design — Statistic</a></li>
    <li><a href="https://primer.style/components/branch-graph">Primer — Branch graph</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/meter/">WAI-ARIA APG — Meter</a></li>
    <li><a href="https://www.chartjs.org/docs/latest/charts/doughnut.html">Chart.js — Doughnut</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.kpi_impl_dl()}</li>
    <li>{m.kpi_impl_meter()}</li>
    <li>{m.kpi_impl_grid()}</li>
    <li>{m.kpi_impl_cv()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.kpi_mistake_1_1()} <code>&lt;div&gt;</code> {m.kpi_mistake_1_2()} <code>&lt;dl&gt;</code> {m.kpi_mistake_1_3()}</li>
    <li>{m.kpi_mistake_2_1()} <code>aria-label</code> {m.kpi_mistake_2_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.kpi_related()}</p>

<h2>{m.kpi_compare_heading()}</h2>
<table>
  <thead><tr><th>{m.kpi_compare_th_feature()}</th><th>KPICard</th><th>StatsCard</th></tr></thead>
  <tbody>
    <tr><td>{m.kpi_compare_row_progress()}</td><td>{m.kpi_compare_row_progress_kpi()}</td><td>{m.badge_no}</td></tr>
    <tr><td>{m.kpi_compare_row_trend()}</td><td>{m.kpi_compare_row_trend_kpi()}</td><td>{m.kpi_compare_row_trend_stats()}</td></tr>
    <tr><td>{m.kpi_compare_row_value()}</td><td>{m.kpi_compare_row_value_kpi()}</td><td>{m.kpi_compare_row_value_stats()}</td></tr>
    <tr><td>{m.kpi_compare_row_unit()}</td><td>{m.badge_yes}</td><td>{m.badge_no}</td></tr>
    <tr><td>{m.kpi_compare_row_status()}</td><td>{m.kpi_compare_row_status_kpi()}</td><td>{m.kpi_compare_row_status_stats()}</td></tr>
    <tr><td>{m.kpi_compare_row_best()}</td><td>{m.kpi_compare_row_best_kpi()}</td><td>{m.kpi_compare_row_best_stats()}</td></tr>
  </tbody>
</table>
<p>{m.kpi_compare_outro_1()} <strong>KPICard</strong> {m.kpi_compare_outro_2()} <strong>StatsCard</strong> {m.kpi_compare_outro_3()}</p>

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

  <ExampleTabs code={`<KPICard label="Q4 Sales Target" value={95000} target={100000}
  unit="$" color="success" />`}>
    <div class="flex justify-center" data-testid="metrics-basic-kpicard">
      <KPICard label="Q4 Sales Target" value={95000} target={100000} unit="$" color="success" />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={KPICardModule} />

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
