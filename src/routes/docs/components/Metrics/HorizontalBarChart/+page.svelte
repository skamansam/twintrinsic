<script lang="ts">
	import { HorizontalBarChart } from '$lib';
	import Container from '$lib/components/Container/Container.svelte';

	const data = [45, 38, 52, 41, 35];
	const labels = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'];
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
	<div class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<HorizontalBarChart {data} {labels} title="Browser Usage" width={600} height={250} />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<script>
  import { HorizontalBarChart } from '$lib';

  const data = [45, 38, 52, 41, 35];
  const labels = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'];
</script>

<HorizontalBarChart {data} {labels} title="Browser Usage" width={600} height={250} />`}</code></pre>

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
				<td><code>data</code></td>
				<td><code>number[]</code></td>
				<td>Required</td>
				<td>Array of numeric values</td>
			</tr>
			<tr>
				<td><code>labels</code></td>
				<td><code>string[]</code></td>
				<td>Required</td>
				<td>Array of category labels</td>
			</tr>
			<tr>
				<td><code>colors</code></td>
				<td><code>string[]</code></td>
				<td>Default palette</td>
				<td>Array of colors</td>
			</tr>
			<tr>
				<td><code>title</code></td>
				<td><code>string</code></td>
				<td>undefined</td>
				<td>Chart title</td>
			</tr>
			<tr>
				<td><code>xAxisLabel</code></td>
				<td><code>string</code></td>
				<td>undefined</td>
				<td>X-axis label</td>
			</tr>
			<tr>
				<td><code>showGrid</code></td>
				<td><code>boolean</code></td>
				<td>true</td>
				<td>Show grid lines</td>
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
				<td><code>&#123; index: number; label: string; value: number &#125;</code></td>
				<td>Fired when a bar is clicked</td>
			</tr>
		</tbody>
	</table>

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
