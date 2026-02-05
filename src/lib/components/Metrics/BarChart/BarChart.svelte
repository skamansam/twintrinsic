<script lang="ts">
	interface Series {
		label: string;
		data: number[];
		color?: string;
	}

	interface Props {
		/** Array of data series */
		series: Series[];
		/** Array of x-axis labels */
		labels: string[];
		/** Chart title */
		title?: string;
		/** Y-axis label */
		yAxisLabel?: string;
		/** Show grid lines */
		showGrid?: boolean;
		/** Callback when a bar is clicked */
		onbarclick?: (event: CustomEvent<{ seriesIndex: number; barIndex: number; value: number }>) => void;
		/** Show legend */
		showLegend?: boolean;
		/** Size of the chart in pixels */
		width?: number;
		height?: number;
	}

	let {
		series,
		labels,
		title,
		yAxisLabel,
		showGrid = true,
		onbarclick,
		showLegend = true,
		width = 500,
		height = 300,
		...rest
	}: Props = $props();

	const defaultColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
	const padding = { top: 20, right: 20, bottom: 40, left: 50 };

	const chartWidth = $derived(width - padding.left - padding.right);
	const chartHeight = $derived(height - padding.top - padding.bottom);

	const allValues = $derived(series.flatMap((s) => s.data));
	const maxValue = $derived(Math.max(...allValues, 0));
	const minValue = $derived(Math.min(...allValues, 0));
	const yRange = $derived(maxValue - minValue || 1);

	const seriesWithColors = $derived(
		series.map((s, i) => ({
			...s,
			color: s.color || defaultColors[i % defaultColors.length]
		}))
	);

	const barWidth = $derived(chartWidth / labels.length / series.length);
	const groupWidth = $derived(chartWidth / labels.length);

	function getY(value: number): number {
		return padding.top + chartHeight - ((value - minValue) / yRange) * chartHeight;
	}

	function handleBarClick(seriesIndex: number, barIndex: number) {
		onbarclick?.(
			new CustomEvent('barclick', {
				detail: {
					seriesIndex,
					barIndex,
					value: series[seriesIndex].data[barIndex]
				}
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
		aria-label={title || 'Bar chart'}
	>
		<!-- Grid lines -->
		{#if showGrid}
			{#each Array.from({ length: 5 }) as _, i}
				{@const y = padding.top + (chartHeight / 4) * i}
				<line
					x1={padding.left}
					y1={y}
					x2={width - padding.right}
					y2={y}
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

		<!-- Y-axis labels -->
		{#each Array.from({ length: 5 }) as _, i}
			{@const value = minValue + (yRange / 4) * i}
			{@const y = padding.top + (chartHeight / 4) * (4 - i)}
			<text
				x={padding.left - 10}
				y={y + 4}
				text-anchor="end"
				font-size="12"
				fill="currentColor"
				class="text-gray-600 dark:text-gray-400"
			>
				{value.toFixed(0)}
			</text>
		{/each}

		<!-- X-axis labels -->
		{#each labels as label, i}
			{@const x = padding.left + groupWidth * (i + 0.5)}
			<text
				x={x}
				y={height - padding.bottom + 20}
				text-anchor="middle"
				font-size="12"
				fill="currentColor"
				class="text-gray-600 dark:text-gray-400"
			>
				{label}
			</text>
		{/each}

		<!-- Y-axis label -->
		{#if yAxisLabel}
			<text
				x={-height / 2}
				y={15}
				text-anchor="middle"
				font-size="12"
				fill="currentColor"
				transform="rotate(-90)"
				class="text-gray-600 dark:text-gray-400"
			>
				{yAxisLabel}
			</text>
		{/if}

		<!-- Bars -->
		{#each seriesWithColors as s, seriesIndex}
			{#each s.data as value, barIndex}
				{@const x = padding.left + groupWidth * barIndex + barWidth * seriesIndex}
				{@const y = getY(value)}
				{@const barHeight = height - padding.bottom - y}
				<rect
					x={x}
					y={y}
					width={barWidth - 2}
					height={barHeight}
					fill={s.color}
					class="cursor-pointer transition-opacity hover:opacity-80"
					role="button"
					tabindex="0"
					aria-label="{s.label}: {value}"
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							handleBarClick(seriesIndex, barIndex);
						}
					}}
					onclick={() => handleBarClick(seriesIndex, barIndex)}
				></rect>
			{/each}
		{/each}
	</svg>

	{#if showLegend}
		<div class="flex flex-wrap justify-center gap-4">
			{#each seriesWithColors as s}
				<div class="flex items-center gap-2">
					<div
						class="h-3 w-3 rounded-full"
						style="background-color: {s.color}"
						aria-hidden="true"
					></div>
					<span class="text-sm text-gray-700 dark:text-gray-300">{s.label}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	@reference "../../../twintrinsic.css";
</style>
