<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte'
	import ProgressMetric from '$lib/components/Metrics/ProgressMetric/ProgressMetric.svelte'
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ProgressMetricModule from "$lib/components/Metrics/ProgressMetric/ProgressMetric.svelte"
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

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`\u003Cscript>
  import { ProgressMetric } from '$lib';
\u003C/script>

<ProgressMetric
  label="CPU Usage"
  value={65}
  max={100}
  color="primary"
  showPercentage={true}
/>`}</code></pre>

	<h2>Props</h2>
<PropsTable component={ProgressMetricModule} />

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
