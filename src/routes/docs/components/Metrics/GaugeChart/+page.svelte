<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte'
	import GaugeChart from '$lib/components/Metrics/GaugeChart/GaugeChart.svelte'
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as GaugeChartModule from "$lib/components/Metrics/GaugeChart/GaugeChart.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>GaugeChart</h1>

	<p>
		A circular gauge chart for displaying a value within a range. Perfect for showing performance
		metrics, progress, or status indicators. Features configurable arcs, tic marks, and color zones.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Circular gauge display with configurable arc angles</li>
		<li>Customizable min/max range</li>
		<li>Needle indicator</li>
		<li>Percentage display</li>
		<li>Customizable colors</li>
		<li>Optional label and unit</li>
		<li>Responsive sizing</li>
		<li>Configurable tic marks with labels</li>
		<li>Color zones for value ranges</li>
		<li>Min/max labels at arc endpoints</li>
	</ul>

	<h2>Examples</h2>

	<h3>Basic GaugeChart</h3>
	<div data-testid="metrics-basic-gaugechart" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<GaugeChart value={75} min={0} max={100} label="Performance Score" unit="%" color="primary" />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`\u003Cscript>
  import { GaugeChart } from '$lib';
\u003C/script>

<GaugeChart
  value={75}
  min={0}
  max={100}
  label="Performance Score"
  unit="%"
  color="primary"
/>`}</code></pre>

	<h3>With Tic Marks</h3>
	<div data-testid="metrics-with-tic-marks" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<GaugeChart
			value={71}
			min={0}
			max={100}
			label="Customer Satisfaction"
			unit="%"
			color="primary"
			size={280}
			tics={{ show: true, step: 25, showLabels: true }}
		/>
	</div>

	<h3>With Color Zones</h3>
	<div data-testid="metrics-with-color-zones" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<GaugeChart
			value={71}
			min={0}
			max={100}
			label="Walmart's Customer Satisfaction Score"
			unit="%"
			color="primary"
			size={300}
			tics={{ show: true, step: 25, showLabels: true }}
			zones={[
				{ start: 0, end: 25, color: '#ef4444', label: 'Poor' },
				{ start: 25, end: 50, color: '#f97316', label: 'Fair' },
				{ start: 50, end: 75, color: '#eab308', label: 'Good' },
				{ start: 75, end: 100, color: '#10b981', label: 'Excellent' }
			]}
		/>
	</div>

	<h3>Full Circle Gauge</h3>
	<div data-testid="metrics-full-circle-gauge" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<GaugeChart
			value={65}
			min={0}
			max={100}
			label="System Health"
			unit="%"
			color="success"
			size={280}
			arcStart={0}
			arcEnd={360}
			tics={{ show: true, step: 20, showLabels: true }}
		/>
	</div>

	<h2>Props</h2>
<PropsTable component={GaugeChartModule} />

	<h2>Tic Configuration</h2>
	<p>The <code>tics</code> prop accepts an object with the following properties:</p>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>show</code></td>
				<td><code>boolean</code></td>
				<td>Show tic marks</td>
			</tr>
			<tr>
				<td><code>step</code></td>
				<td><code>number</code></td>
				<td>Step size for tics (if not using custom values)</td>
			</tr>
			<tr>
				<td><code>values</code></td>
				<td><code>number[]</code></td>
				<td>Custom values to show as tics (overrides step)</td>
			</tr>
			<tr>
				<td><code>showLabels</code></td>
				<td><code>boolean</code></td>
				<td>Show tic labels</td>
			</tr>
			<tr>
				<td><code>format</code></td>
				<td><code>(value: number) => string</code></td>
				<td>Format function for tic labels</td>
			</tr>
		</tbody>
	</table>

	<h2>Color Zones</h2>
	<p>The <code>zones</code> prop accepts an array of objects with the following properties:</p>
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>start</code></td>
				<td><code>number</code></td>
				<td>Start value for the zone</td>
			</tr>
			<tr>
				<td><code>end</code></td>
				<td><code>number</code></td>
				<td>End value for the zone</td>
			</tr>
			<tr>
				<td><code>color</code></td>
				<td><code>string</code></td>
				<td>Color for the zone (hex or CSS color)</td>
			</tr>
			<tr>
				<td><code>label</code></td>
				<td><code>string</code></td>
				<td>Optional label for the zone</td>
			</tr>
		</tbody>
	</table>

	<h2>Best Practices</h2>
	<ul>
		<li>Use for single metric displays</li>
		<li>Include meaningful labels and units</li>
		<li>Use color zones to indicate status ranges</li>
		<li>Keep ranges intuitive and meaningful</li>
		<li>Use tic marks to help users understand the scale</li>
		<li>Angle specifications: 0° = horizontal left, 90° = vertical top, 180° = horizontal right, 270° = vertical bottom</li>
	</ul>
</Container>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
