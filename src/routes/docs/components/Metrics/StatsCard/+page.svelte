<script lang="ts">
	import { StatsCard } from '$lib';
	import Container from '$lib/components/Container/Container.svelte';
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

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<script>
  import { StatsCard } from '$lib';
</script>

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
				<td>Card label/title</td>
			</tr>
			<tr>
				<td><code>value</code></td>
				<td><code>string | number</code></td>
				<td>Required</td>
				<td>Metric value to display</td>
			</tr>
			<tr>
				<td><code>trend</code></td>
				<td><code>'up' | 'down'</code></td>
				<td>undefined</td>
				<td>Trend direction indicator</td>
			</tr>
			<tr>
				<td><code>trendValue</code></td>
				<td><code>string | number</code></td>
				<td>undefined</td>
				<td>Trend value to display</td>
			</tr>
			<tr>
				<td><code>color</code></td>
				<td><code>string</code></td>
				<td>'primary'</td>
				<td>Card color theme</td>
			</tr>
			<tr>
				<td><code>icon</code></td>
				<td><code>string</code></td>
				<td>undefined</td>
				<td>Icon identifier</td>
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
				<td>Fired when card is clicked</td>
			</tr>
		</tbody>
	</table>

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
