<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte'
	import MetricTrend from '$lib/components/Metrics/MetricTrend/MetricTrend.svelte'
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as MetricTrendModule from "$lib/components/Metrics/MetricTrend/MetricTrend.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>MetricTrend</h1>

	<p>
		A sparkline-style mini chart for displaying data trends. Perfect for showing quick trend
		visualizations in compact spaces.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Sparkline-style visualization</li>
		<li>Smooth curve rendering</li>
		<li>Optional area fill</li>
		<li>Customizable colors</li>
		<li>Customizable height</li>
		<li>Click events for interaction</li>
		<li>Responsive sizing</li>
	</ul>

	<h2>Examples</h2>

	<h3>Basic MetricTrend</h3>
	<div data-testid="metrics-basic-metrictrend" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<MetricTrend label="Sales Trend" data={[10, 15, 12, 18, 22, 20, 25]} color="#10b981" />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`\u003Cscript>
  import { MetricTrend } from '$lib';
\u003C/script>

<MetricTrend
  label="Sales Trend"
  data={[10, 15, 12, 18, 22, 20, 25]}
  color="#10b981"
/>`}</code></pre>

	<h2>Props</h2>
<PropsTable component={MetricTrendModule} />

	<h2>Events</h2>
<EventsTable component={MetricTrendModule} />

	<h2>Best Practices</h2>
	<ul>
		<li>Use for quick trend visualization</li>
		<li>Keep data series short (5-10 points)</li>
		<li>Use consistent colors across related trends</li>
		<li>Include labels for context</li>
	</ul>
</Container>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
