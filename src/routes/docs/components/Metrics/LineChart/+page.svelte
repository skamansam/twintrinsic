<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte'
	import LineChart from '$lib/components/Metrics/LineChart/LineChart.svelte'

	const singleSeries = [
		{
			label: 'Sales',
			data: [10, 15, 12, 18, 22, 20, 25],
			color: '#3b82f6'
		}
	];

	const multipleSeries = [
		{
			label: 'Product A',
			data: [10, 15, 12, 18, 22, 20, 25],
			color: '#3b82f6'
		},
		{
			label: 'Product B',
			data: [8, 12, 14, 16, 18, 22, 20],
			color: '#ef4444'
		}
	];

	const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as LineChartModule from "$lib/components/Metrics/LineChart/LineChart.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>LineChart</h1>

	<p>
		A line graph for displaying trends over time. Supports single and multiple data series with
		smooth curves, grid lines, and axis labels.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Single and multiple data series support</li>
		<li>Smooth curve rendering</li>
		<li>Grid lines for reference</li>
		<li>Axis labels and title</li>
		<li>Legend display</li>
		<li>Interactive points with click events</li>
		<li>Responsive sizing</li>
		<li>Accessible with ARIA labels</li>
	</ul>

	<h2>Examples</h2>

	<h3>Single Series LineChart</h3>
	<div data-testid="metrics-single-series-linechart" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<LineChart series={singleSeries} {labels} title="Weekly Sales" width={600} height={300} />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`\u003Cscript>
  import { LineChart } from '$lib';

  const series = [
    {
      label: 'Sales',
      data: [10, 15, 12, 18, 22, 20, 25],
      color: '#3b82f6'
    }
  ];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
\u003C/script>

<LineChart {series} {labels} title="Weekly Sales" width={600} height={300} />`}</code></pre>

	<h3>Multiple Series LineChart</h3>
	<div data-testid="metrics-multiple-series-linechart" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<LineChart
			series={multipleSeries}
			{labels}
			title="Product Comparison"
			yAxisLabel="Sales ($K)"
			showGrid={true}
			showLegend={true}
			width={600}
			height={300}
		/>
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<LineChart
  series={[
    { label: 'Product A', data: [10, 15, 12, 18, 22, 20, 25], color: '#3b82f6' },
    { label: 'Product B', data: [8, 12, 14, 16, 18, 22, 20], color: '#ef4444' }
  ]}
  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  title="Product Comparison"
  yAxisLabel="Sales ($K)"
  showGrid={true}
  showLegend={true}
  width={600}
  height={300}
/>`}</code></pre>

	<h2>Props</h2>
<PropsTable component={LineChartModule} />

	<h2>Events</h2>
<EventsTable component={LineChartModule} />

	<h2>Accessibility</h2>
	<ul>
		<li>SVG has proper ARIA role and label</li>
		<li>Data points are keyboard accessible</li>
		<li>Color contrast meets WCAG AA standards</li>
		<li>Legend provides text alternative to colors</li>
		<li>Grid lines aid in reading values</li>
	</ul>

	<h2>Best Practices</h2>
	<ul>
		<li>Use for showing trends over time</li>
		<li>Limit to 3-4 series for clarity</li>
		<li>Use distinct colors for each series</li>
		<li>Include axis labels for context</li>
		<li>Enable grid lines for easier value reading</li>
	</ul>
</Container>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
