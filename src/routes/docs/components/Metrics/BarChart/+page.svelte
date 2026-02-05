<script lang="ts">
	import { BarChart } from '$lib';
	import Container from '$lib/components/Container/Container.svelte';

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
	<div class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<BarChart series={singleSeries} {labels} title="Monthly Revenue" width={600} height={300} />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<script>
  import { BarChart } from '$lib';

  const series = [
    {
      label: 'Revenue',
      data: [45, 52, 48, 61, 55, 67],
      color: '#3b82f6'
    }
  ];
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
</script>

<BarChart {series} {labels} title="Monthly Revenue" width={600} height={300} />`}</code></pre>

	<h3>Multiple Series BarChart</h3>
	<div class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
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
	<table>
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>series</code></td>
				<td><code>Series[]</code></td>
				<td>Required</td>
				<td>Array of data series with label, data, and optional color</td>
			</tr>
			<tr>
				<td><code>labels</code></td>
				<td><code>string[]</code></td>
				<td>Required</td>
				<td>Array of category labels</td>
			</tr>
			<tr>
				<td><code>title</code></td>
				<td><code>string</code></td>
				<td>undefined</td>
				<td>Chart title</td>
			</tr>
			<tr>
				<td><code>yAxisLabel</code></td>
				<td><code>string</code></td>
				<td>undefined</td>
				<td>Y-axis label</td>
			</tr>
			<tr>
				<td><code>showGrid</code></td>
				<td><code>boolean</code></td>
				<td>true</td>
				<td>Show grid lines</td>
			</tr>
			<tr>
				<td><code>showLegend</code></td>
				<td><code>boolean</code></td>
				<td>true</td>
				<td>Show legend</td>
			</tr>
			<tr>
				<td><code>width</code></td>
				<td><code>number</code></td>
				<td>500</td>
				<td>Chart width in pixels</td>
			</tr>
			<tr>
				<td><code>height</code></td>
				<td><code>number</code></td>
				<td>300</td>
				<td>Chart height in pixels</td>
			</tr>
		</tbody>
	</table>

	<h2>Events</h2>
	<table>
		<thead>
			<tr>
				<th>Event</th>
				<th>Detail</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>onbarclick</code></td>
				<td><code>&#123; seriesIndex: number; barIndex: number; value: number &#125;</code></td>
				<td>Fired when a bar is clicked</td>
			</tr>
		</tbody>
	</table>

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
