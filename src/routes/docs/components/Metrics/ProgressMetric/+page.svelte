<script lang="ts">
	import { ProgressMetric } from '$lib';
	import Container from '$lib/components/Container/Container.svelte';
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>ProgressMetric</h1>

	<p>
		A horizontal progress bar component for displaying progress towards a goal. Ideal for tracking
		completion, resource usage, or any linear progress.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Horizontal progress bar</li>
		<li>Customizable height</li>
		<li>Optional percentage display</li>
		<li>Customizable colors</li>
		<li>Label display</li>
		<li>Responsive design</li>
	</ul>

	<h2>Examples</h2>

	<h3>Basic ProgressMetric</h3>
	<div class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8 w-full">
		<div class="w-full max-w-md">
			<ProgressMetric label="CPU Usage" value={65} max={100} color="primary" showPercentage={true} />
		</div>
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`<script>
  import { ProgressMetric } from '$lib';
</script>

<ProgressMetric
  label="CPU Usage"
  value={65}
  max={100}
  color="primary"
  showPercentage={true}
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
				<td>Progress label</td>
			</tr>
			<tr>
				<td><code>value</code></td>
				<td><code>number</code></td>
				<td>Required</td>
				<td>Current progress value</td>
			</tr>
			<tr>
				<td><code>max</code></td>
				<td><code>number</code></td>
				<td>Required</td>
				<td>Maximum value</td>
			</tr>
			<tr>
				<td><code>color</code></td>
				<td><code>string</code></td>
				<td>'primary'</td>
				<td>Progress bar color</td>
			</tr>
			<tr>
				<td><code>showPercentage</code></td>
				<td><code>boolean</code></td>
				<td>false</td>
				<td>Show percentage display</td>
			</tr>
			<tr>
				<td><code>height</code></td>
				<td><code>'sm' | 'md' | 'lg'</code></td>
				<td>'md'</td>
				<td>Progress bar height</td>
			</tr>
		</tbody>
	</table>

	<h2>Best Practices</h2>
	<ul>
		<li>Use for tracking progress towards goals</li>
		<li>Include percentage display for clarity</li>
		<li>Use colors to indicate status</li>
		<li>Keep labels concise and meaningful</li>
	</ul>
</Container>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
