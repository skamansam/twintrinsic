<script lang="ts">
	import { GaugeChart } from '$lib';
	import Container from '$lib/components/Container/Container.svelte';
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>GaugeChart</h1>

	<p>
		A circular gauge chart for displaying a value within a range. Perfect for showing performance
		metrics, progress, or status indicators.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Circular gauge display</li>
		<li>Customizable min/max range</li>
		<li>Needle indicator</li>
		<li>Percentage display</li>
		<li>Customizable colors</li>
		<li>Optional label and unit</li>
		<li>Responsive sizing</li>
	</ul>

	<h2>Examples</h2>

	<h3>Basic GaugeChart</h3>
	<div class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<GaugeChart value={75} min={0} max={100} label="Performance Score" unit="%" color="primary" />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<script>
  import { GaugeChart } from '$lib';
</script>

<GaugeChart
  value={75}
  min={0}
  max={100}
  label="Performance Score"
  unit="%"
  color="primary"
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
				<td><code>value</code></td>
				<td><code>number</code></td>
				<td>Required</td>
				<td>Current value</td>
			</tr>
			<tr>
				<td><code>min</code></td>
				<td><code>number</code></td>
				<td>0</td>
				<td>Minimum value</td>
			</tr>
			<tr>
				<td><code>max</code></td>
				<td><code>number</code></td>
				<td>100</td>
				<td>Maximum value</td>
			</tr>
			<tr>
				<td><code>label</code></td>
				<td><code>string</code></td>
				<td>undefined</td>
				<td>Gauge label</td>
			</tr>
			<tr>
				<td><code>unit</code></td>
				<td><code>string</code></td>
				<td>undefined</td>
				<td>Unit of measurement</td>
			</tr>
			<tr>
				<td><code>color</code></td>
				<td><code>string</code></td>
				<td>'primary'</td>
				<td>Gauge color theme</td>
			</tr>
			<tr>
				<td><code>size</code></td>
				<td><code>number</code></td>
				<td>200</td>
				<td>Gauge size in pixels</td>
			</tr>
		</tbody>
	</table>

	<h2>Best Practices</h2>
	<ul>
		<li>Use for single metric displays</li>
		<li>Include meaningful labels and units</li>
		<li>Use colors to indicate status</li>
		<li>Keep ranges intuitive and meaningful</li>
	</ul>
</Container>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
