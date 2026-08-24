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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>StatsCard</h1>

  <p>
    <strong>StatsCard</strong> — A card component for displaying a single metric with optional trend indicator. Perfect for dashboards and overview pages.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>A card component for displaying a single metric with optional trend indicator. Perfect for dashboards and overview pages.</p>

  <h3>When should I use it?</h3>
  <p>Use StatsCard for displaying key metrics with trend context: total revenue, user count, conversion rate. For KPI tracking with targets, use KPICard.</p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Simple display</strong> — label, value, trend in a card.</li>
    <li><strong>Trend indicator</strong> — up/down with percentage.</li>
    <li><strong>Customizable</strong> — colors, icons.</li>
    <li><strong>Interactive</strong> — click events.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://m3.material.io/components/cards/overview">Material Design 3 — Cards</a></li>
    <li><a href="https://ant.design/components/statistic">Ant Design — Statistic</a></li>
    <li><a href="https://primer.style/components/counter">Primer — Counter</a></li>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/">WAI-ARIA APG</a></li>
    <li><a href="https://carbondesignsystem.com/components/tile/usage">Carbon Design — Tile</a></li>
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
  
  <ExampleTabs code={`<StatsCard label="Total Revenue" value="$124,532.89" color="primary" />`}>
    <div class="flex justify-center" data-testid="metrics-basic-statscard">
      <StatsCard label="Total Revenue" value="$124,532.89" color="success" />
    </div>
  </ExampleTabs>

  <h3>With Trend Indicator</h3>
  <ExampleTabs code={`<StatsCard label="Total Users" value="2,543"
  trend="up" trendValue="12.5%" color="success" />`}>
    <div class="flex justify-center" data-testid="metrics-with-trend-indicator">
      <StatsCard label="Total Users" value="2,543" trend="up" trendValue="12.5%" color="primary" />
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={StatsCardModule} />
  <h2>Events</h2>
  <EventsTable component={StatsCardModule} />

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
