<!--
@component
MetricGrid documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import MetricGrid from "$lib/components/Metrics/MetricGrid/MetricGrid.svelte"
import * as MetricGridModule from "$lib/components/Metrics/MetricGrid/MetricGrid.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>MetricGrid</h1>

  <p>
    <strong>MetricGrid</strong> — {m.grid_lede()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>{m.grid_lede()}</p>

  <h3>{m.sec_when()}</h3>
  <p>{m.grid_when()}</p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.grid_why_responsive()}</strong>{m.grid_why_responsive_desc()}</li>
    <li><strong>{m.grid_why_spacing()}</strong>{m.grid_why_spacing_desc()}</li>
    <li><strong>{m.grid_why_mobile()}</strong>{m.grid_why_mobile_desc()}</li>
    <li><strong>{m.grid_why_api()}</strong>{m.grid_why_api_desc()}</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://m3.material.io/foundations/layout/applying-layout/overview">Material Design 3 — Layout Grid</a></li>
    <li><a href="https://tailwindcss.com/docs/grid-template-columns">Tailwind CSS — Grid</a></li>
    <li><a href="https://ant.design/components/grid">Ant Design — Grid</a></li>
    <li><a href="https://primer.style/components/grid">Primer — Grid</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout">MDN — CSS Grid</a></li>
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
  
  <ExampleTabs code={`<MetricGrid items={[
  { label: 'Total Revenue', value: '$45,231.89', color: 'primary' },
  { label: 'Total Users', value: '2,543', color: 'success' }
]} columns={4} gap="md" />`}>
    <div class="flex justify-center" data-testid="metrics-basic-metricgrid">
      <MetricGrid
        items={[
          { label: "Total Revenue", value: "$45,231.89" },
          { label: "Total Users", value: "2,543" },
          { label: "Conversion Rate", value: "4.8%" },
          { label: "Active Sessions", value: "542" }
        ]}
      />
    </div>
  </ExampleTabs>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={MetricGridModule} />

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
