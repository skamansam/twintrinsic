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
		/** Stack areas on top of each other */
		stacked?: boolean;
		/** Callback when a point is clicked */
		onpointclick?: (event: CustomEvent<{ seriesIndex: number; pointIndex: number; value: number }>) => void;
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
		stacked = false,
		onpointclick,
		showLegend = true,
		width = 500,
		height = 300,
		...rest
	}: Props = $props();

	const defaultColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
	const padding = { top: 20, right: 20, bottom: 40, left: 50 };

	const chartWidth = $derived(width - padding.left - padding.right);
	const chartHeight = $derived(height - padding.top - padding.bottom);

	const seriesWithColors = $derived(
		series.map((s, i) => ({
			...s,
			color: s.color || defaultColors[i % defaultColors.length]
		}))
	);

	const allValues = $derived(
		stacked
			? Array.from({ length: labels.length }, (_, i) =>
					series.reduce((sum, s) => sum + s.data[i], 0)
				)
			: series.flatMap((s) => s.data)
	);

	const maxValue = $derived(Math.max(...allValues, 0));
	const minValue = $derived(Math.min(...allValues, 0));
	const yRange = $derived(maxValue - minValue || 1);

	function getX(index: number): number {
		return padding.left + (index / (labels.length - 1)) * chartWidth;
	}

	function getY(value: number): number {
		return padding.top + chartHeight - ((value - minValue) / yRange) * chartHeight;
	}

	function createPathData(data: number[], offset: number[] = []): string {
		const points = data.map((value, index) => {
			const x = getX(index);
			const y = getY(value + (offset[index] || 0));
			return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
		});

		const closePath = data.map((_, index) => {
			const x = getX(data.length - 1 - index);
			const y = getY((offset[data.length - 1 - index] || 0));
			return `${index === 0 ? 'L' : 'L'} ${x} ${y}`;
		});

		return [...points, ...closePath, 'Z'].join(' ');
	}

	function handlePointClick(seriesIndex: number, pointIndex: number) {
		onpointclick?.(
			new CustomEvent('pointclick', {
				detail: {
					seriesIndex,
					pointIndex,
					value: series[seriesIndex].data[pointIndex]
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
		aria-label={title || 'Area chart'}
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
			{@const x = getX(i)}
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

		<!-- Areas -->
		{#each seriesWithColors as s, seriesIndex}
			{@const offset = stacked
				? Array.from({ length: labels.length }, (_, i) =>
						series.slice(0, seriesIndex).reduce((sum, ser) => sum + ser.data[i], 0)
					)
				: []}
			<path
				d={createPathData(s.data, offset)}
				fill={s.color}
				opacity="0.3"
				stroke="none"
			></path>

			<!-- Line on top of area -->
			<path
				d={s.data
					.map((value, index) => {
						const x = getX(index);
						const y = getY(value + (offset[index] || 0));
						return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
					})
					.join(' ')}
				fill="none"
				stroke={s.color}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path>

			<!-- Points -->
			{#each s.data as value, pointIndex}
				{@const x = getX(pointIndex)}
				{@const y = getY(value + (offset[pointIndex] || 0))}
				<circle
					cx={x}
					cy={y}
					r="3"
					fill={s.color}
					class="cursor-pointer transition-all hover:r-5"
					role="button"
					tabindex="0"
					aria-label="{s.label}: {value}"
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							handlePointClick(seriesIndex, pointIndex);
						}
					}}
					onclick={() => handlePointClick(seriesIndex, pointIndex)}
				></circle>
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
