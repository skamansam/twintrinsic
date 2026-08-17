<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte'
	import KPICard from '$lib/components/Metrics/KPICard/KPICard.svelte'
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as KPICardModule from "$lib/components/Metrics/KPICard/KPICard.svelte"
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
	<div data-testid="metrics-basic-kpicard" class="not-prose mb-8 flex justify-center bg-white dark:bg-gray-900 rounded-lg p-8">
		<KPICard label="Q4 Sales Target" value={95000} target={100000} unit="$" color="success" />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`\u003Cscript>
  import { KPICard } from '$lib';
\u003C/script>

<KPICard
  label="Q4 Sales Target"
  value={95000}
  target={100000}
  unit="$"
  color="success"
/>`}</code></pre>

	<h2>Props</h2>
<PropsTable component={KPICardModule} />

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
