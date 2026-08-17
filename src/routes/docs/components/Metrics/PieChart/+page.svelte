<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte'
	import PieChart from '$lib/components/Metrics/PieChart/PieChart.svelte'

	const browserData = [35, 25, 20, 20];
	const browserLabels = ['Chrome', 'Firefox', 'Safari', 'Edge'];

import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as PieChartModule from "$lib/components/Metrics/PieChart/PieChart.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>PieChart</h1>

	<p>
		A traditional pie chart for displaying proportional data. Each slice represents a portion of the
		whole, making it ideal for showing composition and distribution.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Clean, traditional pie chart design</li>
		<li>Optional legend display</li>
		<li>Hover effects on slices</li>
		<li>Click events for slice interaction</li>
		<li>Responsive sizing</li>
		<li>Custom colors support</li>
		<li>Accessible with ARIA labels</li>
	</ul>

	<h2>Examples</h2>

	<h3>Basic PieChart</h3>
	<div data-testid="metrics-basic-piechart" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<PieChart data={browserData} labels={browserLabels} size={300} />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`\u003Cscript>
  import { PieChart } from '$lib';

  const data = [35, 25, 20, 20];
  const labels = ['Chrome', 'Firefox', 'Safari', 'Edge'];
\u003C/script>

<PieChart {data} {labels} size={300} />`}</code></pre>

	<h3>With Title and Legend</h3>
	<div data-testid="metrics-with-title-and-legend" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<PieChart
			data={browserData}
			labels={browserLabels}
			title="Browser Market Share"
			showLegend={true}
			size={300}
		/>
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<PieChart
  data={[35, 25, 20, 20]}
  labels={['Chrome', 'Firefox', 'Safari', 'Edge']}
  title="Browser Market Share"
  showLegend={true}
  size={300}
/>`}</code></pre>

	<h2>Props</h2>
<PropsTable component={PieChartModule} />

	<h2>Events</h2>
<EventsTable component={PieChartModule} />

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
