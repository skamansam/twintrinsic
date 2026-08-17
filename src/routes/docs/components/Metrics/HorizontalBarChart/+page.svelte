<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte'
	import HorizontalBarChart from '$lib/components/Metrics/HorizontalBarChart/HorizontalBarChart.svelte'

	const data = [45, 38, 52, 41, 35];
	const labels = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'];

import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as HorizontalBarChartModule from "$lib/components/Metrics/HorizontalBarChart/HorizontalBarChart.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>HorizontalBarChart</h1>

	<p>
		A horizontal bar chart for displaying and comparing values. Ideal for long category names or when
		space is limited vertically.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Horizontal bar layout</li>
		<li>Grid lines for reference</li>
		<li>Axis labels and title</li>
		<li>Interactive bars with click events</li>
		<li>Responsive sizing</li>
		<li>Accessible with ARIA labels</li>
	</ul>

	<h2>Examples</h2>

	<h3>Basic HorizontalBarChart</h3>
	<div data-testid="metrics-basic-horizontalbarchart" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<HorizontalBarChart {data} {labels} title="Browser Usage" width={600} height={250} />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`\u003Cscript>
  import { HorizontalBarChart } from '$lib';

  const data = [45, 38, 52, 41, 35];
  const labels = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'];
\u003C/script>

<HorizontalBarChart {data} {labels} title="Browser Usage" width={600} height={250} />`}</code></pre>

	<h2>Props</h2>
<PropsTable component={HorizontalBarChartModule} />

	<h2>Events</h2>
<EventsTable component={HorizontalBarChartModule} />

	<h2>Best Practices</h2>
	<ul>
		<li>Use for categories with long names</li>
		<li>Include axis labels for context</li>
		<li>Enable grid lines for easier value reading</li>
	</ul>
</Container>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
