<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte'
	import BarChart from '$lib/components/Metrics/BarChart/BarChart.svelte'

	const singleSeries = [
		{
			label: 'Revenue',
			data: [45, 52, 48, 61, 55, 67],
			color: '#3b82f6'
		}
	];

	const multipleSeries = [
		{
			label: 'Q1',
			data: [30, 40, 35, 50],
			color: '#3b82f6'
		},
		{
			label: 'Q2',
			data: [35, 45, 40, 55],
			color: '#ef4444'
		}
	];

	const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as BarChartModule from "$lib/components/Metrics/BarChart/BarChart.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>BarChart</h1>

	<p>
		A vertical bar chart for comparing values across categories. Supports single and multiple data
		series with grid lines and axis labels.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Single and multiple data series support</li>
		<li>Grouped bars for comparison</li>
		<li>Grid lines for reference</li>
		<li>Axis labels and title</li>
		<li>Legend display</li>
		<li>Interactive bars with click events</li>
		<li>Responsive sizing</li>
		<li>Accessible with ARIA labels</li>
	</ul>

	<h2>Examples</h2>

	<h3>Single Series BarChart</h3>
	<div data-testid="metrics-single-series-barchart" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<BarChart series={singleSeries} {labels} title="Monthly Revenue" width={600} height={300} />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`\u003Cscript>
  import { BarChart } from '$lib';

  const series = [
    {
      label: 'Revenue',
      data: [45, 52, 48, 61, 55, 67],
      color: '#3b82f6'
    }
  ];
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
\u003C/script>

<BarChart {series} {labels} title="Monthly Revenue" width={600} height={300} />`}</code></pre>

	<h3>Multiple Series BarChart</h3>
	<div data-testid="metrics-multiple-series-barchart" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<BarChart
			series={multipleSeries}
			labels={['Product A', 'Product B', 'Product C', 'Product D']}
			title="Quarterly Comparison"
			yAxisLabel="Sales ($K)"
			showGrid={true}
			showLegend={true}
			width={600}
			height={300}
		/>
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<BarChart
  series={[
    { label: 'Q1', data: [30, 40, 35, 50], color: '#3b82f6' },
    { label: 'Q2', data: [35, 45, 40, 55], color: '#ef4444' }
  ]}
  labels={['Product A', 'Product B', 'Product C', 'Product D']}
  title="Quarterly Comparison"
  yAxisLabel="Sales ($K)"
  showGrid={true}
  showLegend={true}
  width={600}
  height={300}
/>`}</code></pre>

	<h2>Props</h2>
<PropsTable component={BarChartModule} />

	<h2>Events</h2>
<EventsTable component={BarChartModule} />

	<h2>Accessibility</h2>
	<ul>
		<li>SVG has proper ARIA role and label</li>
		<li>Bars are keyboard accessible</li>
		<li>Color contrast meets WCAG AA standards</li>
		<li>Legend provides text alternative to colors</li>
		<li>Grid lines aid in reading values</li>
	</ul>

	<h2>Best Practices</h2>
	<ul>
		<li>Use for comparing values across categories</li>
		<li>Limit to 3-4 series for clarity</li>
		<li>Use distinct colors for each series</li>
		<li>Include axis labels for context</li>
		<li>Enable grid lines for easier value reading</li>
	</ul>
</Container>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
