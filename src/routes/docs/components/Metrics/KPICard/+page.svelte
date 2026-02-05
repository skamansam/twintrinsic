<script lang="ts">
	import { KPICard } from '$lib';
	import Container from '$lib/components/Container/Container.svelte';
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>KPICard</h1>

	<p>
		A card component for displaying Key Performance Indicators with progress visualization towards a
		target.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Display current value and target</li>
		<li>Progress visualization</li>
		<li>Customizable colors</li>
		<li>Optional unit display</li>
		<li>Optional icon</li>
		<li>Click events for interaction</li>
	</ul>

	<h2>Examples</h2>

	<h3>Basic KPICard</h3>
	<div class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<KPICard label="Q4 Sales Target" value={95000} target={100000} unit="$" color="success" />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<script>
  import { KPICard } from '$lib';
</script>

<KPICard
  label="Q4 Sales Target"
  value={95000}
  target={100000}
  unit="$"
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
				<td>KPI label/title</td>
			</tr>
			<tr>
				<td><code>value</code></td>
				<td><code>number</code></td>
				<td>Required</td>
				<td>Current value</td>
			</tr>
			<tr>
				<td><code>target</code></td>
				<td><code>number</code></td>
				<td>Required</td>
				<td>Target value</td>
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

	<h2>Best Practices</h2>
	<ul>
		<li>Use for tracking progress towards goals</li>
		<li>Include meaningful units</li>
		<li>Use colors to indicate status</li>
		<li>Keep targets realistic and meaningful</li>
	</ul>
</Container>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
