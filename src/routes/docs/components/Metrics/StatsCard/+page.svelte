<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte'
	import StatsCard from '$lib/components/Metrics/StatsCard/StatsCard.svelte'
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as StatsCardModule from "$lib/components/Metrics/StatsCard/StatsCard.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>StatsCard</h1>

	<p>
		A card component for displaying a single metric with optional trend indicator. Perfect for
		dashboards and overview pages.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Display single metric with label and value</li>
		<li>Optional trend indicator (up/down)</li>
		<li>Customizable colors</li>
		<li>Optional icon display</li>
		<li>Click events for interaction</li>
		<li>Responsive design</li>
	</ul>

	<h2>Examples</h2>

	<h3>Basic StatsCard</h3>
	<div class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<StatsCard label="Total Revenue" value="$124,532.89" color="primary" />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`\u003Cscript>
  import { StatsCard } from '$lib';
\u003C/script>

<StatsCard label="Total Revenue" value="$124,532.89" color="primary" />`}</code></pre>

	<h3>With Trend Indicator</h3>
	<div class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<StatsCard
			label="Total Users"
			value="2,543"
			trend="up"
			trendValue="12.5%"
			color="success"
		/>
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<StatsCard
  label="Total Users"
  value="2,543"
  trend="up"
  trendValue="12.5%"
  color="success"
/>`}</code></pre>

	<h2>Props</h2>
<PropsTable component={StatsCardModule} />

	<h2>Events</h2>
<EventsTable component={StatsCardModule} />

	<h2>Best Practices</h2>
	<ul>
		<li>Use for key metrics in dashboards</li>
		<li>Include trend indicators for context</li>
		<li>Use consistent colors across related metrics</li>
		<li>Keep labels concise and meaningful</li>
	</ul>
</Container>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
