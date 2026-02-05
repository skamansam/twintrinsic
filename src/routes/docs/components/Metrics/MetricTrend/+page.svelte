<script lang="ts">
	import { MetricTrend } from '$lib';
	import Container from '$lib/components/Container/Container.svelte';
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
	<div class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<MetricTrend label="Sales Trend" data={[10, 15, 12, 18, 22, 20, 25]} color="#10b981" />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<script>
  import { MetricTrend } from '$lib';
</script>

<MetricTrend
  label="Sales Trend"
  data={[10, 15, 12, 18, 22, 20, 25]}
  color="#10b981"
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
				<td><code>label</code></td>
				<td><code>string</code></td>
				<td>Required</td>
				<td>Trend label</td>
			</tr>
			<tr>
				<td><code>data</code></td>
				<td><code>number[]</code></td>
				<td>Required</td>
				<td>Array of data points</td>
			</tr>
			<tr>
				<td><code>color</code></td>
				<td><code>string</code></td>
				<td>'#3b82f6'</td>
				<td>Trend line color</td>
			</tr>
			<tr>
				<td><code>height</code></td>
				<td><code>number</code></td>
				<td>40</td>
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
				<td><code>onclick</code></td>
				<td><code>void</code></td>
				<td>Fired when trend is clicked</td>
			</tr>
		</tbody>
	</table>

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
