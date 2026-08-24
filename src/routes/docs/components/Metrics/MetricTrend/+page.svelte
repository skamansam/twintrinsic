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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>MetricTrend</h1>

  <p>
    <strong>MetricTrend</strong> — A sparkline-style mini chart for displaying data trends. Perfect for showing quick trend visualizations in compact spaces.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>A sparkline-style mini chart for displaying data trends. Perfect for showing quick trend visualizations in compact spaces.</p>

  <h3>When should I use it?</h3>
  <p>Use MetricTrend for inline sparklines in tables, cards, or dashboards. For full charts, use LineChart or AreaChart.</p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Compact</strong> — fits in small spaces.</li>
    <li><strong>Visual trend</strong> — quick pattern recognition.</li>
    <li><strong>Customizable</strong> — colors, height, area fill.</li>
    <li><strong>Responsive</strong> — adapts to container.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/SVG">MDN — SVG</a></li>
    <li><a href="https://d3js.org/d3-shape/line">D3.js — Line Charts</a></li>
    <li><a href="https://ant.design/components/sparkline">Ant Design — Sparkline</a></li>
    <li><a href="https://primer.style/components/sparkline">Primer — Sparkline</a></li>
    <li><a href="https://informationisbeautiful.net/2010/sparklines-instant-charts/">Information is Beautiful — Sparklines</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Fills container width by default.</li>
    <li>SVG charts scale to any resolution.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Custom colors, labels, and sizes.</li>
    <li>Grid lines, legends, and axis labels.</li>
  </ul>

  <h2>Examples</h2>
  
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

  <h2>Props</h2>
  <PropsTable component={MetricTrendModule} />
  <h2>Events</h2>
  <EventsTable component={MetricTrendModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>SVG elements include proper ARIA roles and labels.</li>
    <li>Color contrast meets WCAG AA standards.</li>
    <li>Legend provides text alternative to colors.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    Chart components are display-only elements. Interactive data points support
    focus via Tab and activation via Enter/Space.
  </p>
</Container>
