<script lang="ts">
	import { AreaChart } from '$lib';
	import Container from '$lib/components/Container/Container.svelte';

	const singleSeries = [
		{
			label: 'Website Traffic',
			data: [10, 15, 12, 18, 22, 20, 25],
			color: '#3b82f6'
		}
	];

	const multipleSeries = [
		{
			label: 'Desktop',
			data: [10, 15, 12, 18, 22, 20, 25],
			color: '#3b82f6'
		},
		{
			label: 'Mobile',
			data: [8, 12, 14, 16, 18, 22, 20],
			color: '#ef4444'
		}
	];

	const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>AreaChart</h1>

	<p>
		An area chart for displaying trends over time with filled areas. Supports single and multiple
		data series with optional stacking.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Single and multiple data series support</li>
		<li>Stacked or overlapping areas</li>
		<li>Smooth curve rendering</li>
		<li>Grid lines for reference</li>
		<li>Axis labels and title</li>
		<li>Legend display</li>
		<li>Interactive points with click events</li>
		<li>Responsive sizing</li>
	</ul>

	<h2>Examples</h2>

	<h3>Single Series AreaChart</h3>
	<div class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<AreaChart series={singleSeries} {labels} title="Website Traffic" width={600} height={300} />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<AreaChart
  series={[{
    label: 'Website Traffic',
    data: [10, 15, 12, 18, 22, 20, 25],
    color: '#3b82f6'
  }]}
  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  title="Website Traffic"
  width={600}
  height={300}
/>`}</code></pre>

	<h3>Stacked AreaChart</h3>
	<div class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<AreaChart
			series={multipleSeries}
			{labels}
			title="Traffic by Device (Stacked)"
			yAxisLabel="Visits"
			stacked={true}
			showGrid={true}
			showLegend={true}
			width={600}
			height={300}
		/>
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<AreaChart
  series={[
    { label: 'Desktop', data: [10, 15, 12, 18, 22, 20, 25], color: '#3b82f6' },
    { label: 'Mobile', data: [8, 12, 14, 16, 18, 22, 20], color: '#ef4444' }
  ]}
  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  title="Traffic by Device (Stacked)"
  yAxisLabel="Visits"
  stacked={true}
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
				<td>Array of data series</td>
			</tr>
			<tr>
				<td><code>onpointclick</code></td>
				<td><code>&#123; seriesIndex: number; pointIndex: number; value: number &#125;</code></td>
				<td>Fired when a data point is clicked</td>
			</tr>
			<tr>
				<td><code>labels</code></td>
				<td><code>string[]</code></td>
				<td>Required</td>
				<td>Array of x-axis labels</td>
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
				<td><code>stacked</code></td>
				<td><code>boolean</code></td>
				<td>false</td>
				<td>Stack areas on top of each other</td>
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

	<h2>Best Practices</h2>
	<ul>
		<li>Use for showing trends over time</li>
		<li>Use stacking for cumulative data</li>
		<li>Limit to 3-4 series for clarity</li>
		<li>Include axis labels for context</li>
	</ul>
</Container>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
