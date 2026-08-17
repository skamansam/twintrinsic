<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte'
	import MetricGrid from '$lib/components/Metrics/MetricGrid/MetricGrid.svelte'

	const items: Array<{ label: string; value: string; color: 'primary' | 'success' | 'warning' | 'info' }> = [
		{ label: 'Total Revenue', value: '$45,231.89', color: 'primary' },
		{ label: 'Total Users', value: '2,543', color: 'success' },
		{ label: 'Conversion Rate', value: '4.8%', color: 'warning' },
		{ label: 'Active Sessions', value: '542', color: 'info' }
	];

import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as MetricGridModule from "$lib/components/Metrics/MetricGrid/MetricGrid.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
	<h1>MetricGrid</h1>

	<p>
		A responsive grid layout for displaying multiple StatsCard components. Automatically adjusts
		columns based on screen size.
	</p>

	<h2>Features</h2>
	<ul>
		<li>Responsive grid layout</li>
		<li>Customizable column count</li>
		<li>Adjustable gap spacing</li>
		<li>Displays multiple StatsCards</li>
		<li>Mobile-friendly</li>
	</ul>

	<h2>Examples</h2>

	<h3>Basic MetricGrid</h3>
	<div data-testid="metrics-basic-metricgrid" class="not-prose mb-8 bg-white dark:bg-gray-900 rounded-lg p-8">
		<MetricGrid {items} columns={4} gap="md" />
	</div>

	<pre class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>{`\u003Cscript>
  import { MetricGrid } from '$lib';

  const items = [
    { label: 'Total Revenue', value: '$45,231.89', color: 'primary' },
    { label: 'Total Users', value: '2,543', color: 'success' },
    { label: 'Conversion Rate', value: '4.8%', color: 'warning' },
    { label: 'Active Sessions', value: '542', color: 'info' }
  ];
\u003C/script>

<MetricGrid {items} columns={4} gap="md" />`}</code></pre>

	<h2>Props</h2>
<PropsTable component={MetricGridModule} />

	<h2>Best Practices</h2>
	<ul>
		<li>Use for dashboard overview sections</li>
		<li>Adjust columns based on content</li>
		<li>Use consistent spacing with gap prop</li>
		<li>Limit to 4-6 items for clarity</li>
	</ul>
</Container>

<style lang="postcss">
	@reference "$lib/twintrinsic.css";
</style>
