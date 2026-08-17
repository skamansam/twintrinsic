<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte'
	import DonutChart from '$lib/components/Metrics/DonutChart/DonutChart.svelte'

	const defaultData = [30, 25, 20, 15, 10];
	const defaultLabels = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
	const customColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as DonutChartModule from "$lib/components/Metrics/DonutChart/DonutChart.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>DonutChart</h1>

	<p>
		A circular chart with a center cutout that displays proportional data. Perfect for showing
		composition or distribution of data in a visually appealing way.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Customizable inner radius for donut effect</li>
		<li>Optional legend display</li>
		<li>Hover effects on slices</li>
		<li>Click events for slice interaction</li>
		<li>Responsive sizing</li>
		<li>Custom colors support</li>
		<li>Accessible with ARIA labels</li>
	</ul>

	<h2>Examples</h2>

	<h3>Basic DonutChart</h3>
	<div data-testid="metrics-basic-donutchart" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<DonutChart data={defaultData} labels={defaultLabels} size={300} />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`\u003Cscript>
  import { DonutChart } from '$lib';

  const data = [30, 25, 20, 15, 10];
  const labels = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
\u003C/script>

<DonutChart {data} {labels} size={300} />`}</code></pre>

	<h3>With Title and Legend</h3>
	<div data-testid="metrics-with-title-and-legend" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<DonutChart
			data={defaultData}
			labels={defaultLabels}
			title="Market Share"
			showLegend={true}
			size={300}
		/>
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<DonutChart
  data={[30, 25, 20, 15, 10]}
  labels={['Product A', 'Product B', 'Product C', 'Product D', 'Product E']}
  title="Market Share"
  showLegend={true}
  size={300}
/>`}</code></pre>

	<h3>Custom Colors</h3>
	<div data-testid="metrics-custom-colors" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<DonutChart
			data={defaultData}
			labels={defaultLabels}
			colors={customColors}
			title="Custom Colors"
			showLegend={true}
			size={300}
		/>
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<DonutChart
  data={[30, 25, 20, 15, 10]}
  labels={['Product A', 'Product B', 'Product C', 'Product D', 'Product E']}
  colors={['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']}
  title="Custom Colors"
  showLegend={true}
  size={300}
/>`}</code></pre>

	<h2>Props</h2>
<PropsTable component={DonutChartModule} />

	<h2>Events</h2>
<EventsTable component={DonutChartModule} />

	<h2>Accessibility</h2>
	<ul>
		<li>SVG has proper ARIA role and label</li>
		<li>Each slice is keyboard accessible</li>
		<li>Color contrast meets WCAG AA standards</li>
		<li>Legend provides text alternative to colors</li>
	</ul>

	<h2>Best Practices</h2>
	<ul>
		<li>Use for showing composition or parts of a whole</li>
		<li>Limit to 5-7 slices for clarity</li>
		<li>Use distinct colors for better differentiation</li>
		<li>Include a legend for accessibility</li>
		<li>Provide meaningful labels</li>
	</ul>
</Container>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
