<!--
@component
ProgressMetric documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import ProgressMetric from "$lib/components/Metrics/ProgressMetric/ProgressMetric.svelte"
import * as ProgressMetricModule from "$lib/components/Metrics/ProgressMetric/ProgressMetric.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>ProgressMetric</h1>

  <p>
    <strong>ProgressMetric</strong> — {m.progress_lede()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.progress_lede()}</p>

  <h3>{m.sec_when()}</h3>
  <p>{m.progress_when()}</p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.progress_why_linear()}</strong>{m.progress_why_linear_desc()}</li>
    <li><strong>{m.progress_why_custom()}</strong>{m.progress_why_custom_desc()}</li>
    <li><strong>{m.progress_why_accessible()}</strong>{m.progress_why_accessible_desc()}</li>
    <li><strong>{m.progress_why_responsive()}</strong>{m.progress_why_responsive_desc()}</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress">MDN — progress element</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/meter/">WAI-ARIA APG — Meter</a></li>
    <li><a href="https://ant.design/components/progress">Ant Design — Progress</a></li>
    <li><a href="https://primer.style/components/progress">Primer — ProgressBar</a></li>
    <li><a href="https://m3.material.io/components/progress-indicators/overview">Material Design 3 — Linear Progress</a></li>
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
  
  <ExampleTabs code={`<ProgressMetric label="CPU Usage" value={65} max={100}
  color="primary" showPercentage={true} />`}>
    <div class="flex justify-center" data-testid="metrics-basic-progressmetric">
      <ProgressMetric label="CPU Usage" value={72} max={100} color="primary" showPercentage />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={ProgressMetricModule} />

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
