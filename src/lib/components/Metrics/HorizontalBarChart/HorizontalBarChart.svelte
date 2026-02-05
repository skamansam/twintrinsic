<script lang="ts">
	interface Props {
		/** Array of numeric values */
		data: number[];
		/** Array of labels for each bar */
		labels: string[];
		/** Array of colors for each bar */
		colors?: string[];
		/** Chart title */
		title?: string;
		/** X-axis label */
		xAxisLabel?: string;
		/** Show grid lines */
		showGrid?: boolean;
		/** Callback when a bar is clicked */
		onbarclick?: (event: CustomEvent<{ index: number; label: string; value: number }>) => void;
		/** Size of the chart in pixels */
		width?: number;
		height?: number;
	}

	let {
		data,
		labels,
		colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
		title,
		xAxisLabel,
		showGrid = true,
		onbarclick,
		width = 500,
		height = 300,
		...rest
	}: Props = $props();

	const padding = { top: 20, right: 40, bottom: 40, left: 120 };

	const chartWidth = $derived(width - padding.left - padding.right);
	const chartHeight = $derived(height - padding.top - padding.bottom);

	const maxValue = $derived(Math.max(...data, 0));
	const barHeight = $derived(chartHeight / labels.length);

	function getX(value: number): number {
		return padding.left + (value / maxValue) * chartWidth;
	}

	function handleBarClick(index: number) {
		onbarclick?.(
			new CustomEvent('barclick', {
				detail: { index, label: labels[index], value: data[index] }
			})
		);
	}
</script>

<div class="flex flex-col gap-4" {...rest}>
	{#if title}
		<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
	{/if}

	<svg
		{width}
		{height}
		viewBox="0 0 {width} {height}"
		class="drop-shadow-sm"
		role="img"
		aria-label={title || 'Horizontal bar chart'}
	>
		<!-- Grid lines -->
		{#if showGrid}
			{#each Array.from({ length: 5 }) as _, i}
				{@const x = padding.left + (chartWidth / 4) * i}
				<line
					x1={x}
					y1={padding.top}
					x2={x}
					y2={height - padding.bottom}
					stroke="currentColor"
					stroke-width="0.5"
					opacity="0.1"
					class="text-gray-400"
				></line>
			{/each}
		{/if}

		<!-- Y-axis -->
		<line
			x1={padding.left}
			y1={padding.top}
			x2={padding.left}
			y2={height - padding.bottom}
			stroke="currentColor"
			stroke-width="1"
			class="text-gray-400"
		></line>

		<!-- X-axis -->
		<line
			x1={padding.left}
			y1={height - padding.bottom}
			x2={width - padding.right}
			y2={height - padding.bottom}
			stroke="currentColor"
			stroke-width="1"
			class="text-gray-400"
		></line>

		<!-- X-axis labels -->
		{#each Array.from({ length: 5 }) as _, i}
			{@const value = (maxValue / 4) * i}
			{@const x = padding.left + (chartWidth / 4) * i}
			<text
				x={x}
				y={height - padding.bottom + 20}
				text-anchor="middle"
				font-size="12"
				fill="currentColor"
				class="text-gray-600 dark:text-gray-400"
			>
				{value.toFixed(0)}
			</text>
		{/each}

		<!-- X-axis label -->
		{#if xAxisLabel}
			<text
				x={width / 2}
				y={height - 5}
				text-anchor="middle"
				font-size="12"
				fill="currentColor"
				class="text-gray-600 dark:text-gray-400"
			>
				{xAxisLabel}
			</text>
		{/if}

		<!-- Bars and labels -->
		{#each data as value, index}
			{@const y = padding.top + barHeight * index}
			{@const barWidth = (value / maxValue) * chartWidth}
			{@const color = colors[index % colors.length]}

			<!-- Y-axis label -->
			<text
				x={padding.left - 10}
				y={y + barHeight / 2 + 4}
				text-anchor="end"
				font-size="12"
				fill="currentColor"
				class="text-gray-600 dark:text-gray-400"
			>
				{labels[index]}
			</text>

			<!-- Bar -->
			<rect
				x={padding.left}
				y={y + barHeight * 0.2}
				width={barWidth}
				height={barHeight * 0.6}
				fill={color}
				class="cursor-pointer transition-opacity hover:opacity-80"
				role="button"
				tabindex="0"
				aria-label="{labels[index]}: {value}"
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						handleBarClick(index);
					}
				}}
				onclick={() => handleBarClick(index)}
			></rect>

			<!-- Value label -->
			<text
				x={getX(value) + 5}
				y={y + barHeight / 2 + 4}
				font-size="12"
				fill="currentColor"
				class="text-gray-700 dark:text-gray-300"
			>
				{value}
			</text>
		{/each}
	</svg>
</div>

<style lang="postcss">
	@reference "../../../twintrinsic.css";
</style>
