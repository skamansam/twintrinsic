<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		/** Array of numeric values for each slice */
		data: number[];
		/** Array of labels for each slice */
		labels: string[];
		/** Array of colors for each slice (hex or Tailwind class names) */
		colors?: string[];
		/** Chart title */
		title?: string;
		/** Width of the donut ring (0-1, where 1 is full circle) */
		innerRadius?: number;
		/** Callback when a slice is clicked */
		onsliceclick?: (event: CustomEvent<{ index: number; label: string; value: number }>) => void;
		/** Show legend */
		showLegend?: boolean;
		/** Size of the chart in pixels */
		size?: number;
	}

	let {
		data,
		labels,
		colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
		title,
		innerRadius = 0.6,
		onsliceclick,
		showLegend = true,
		size = 300,
		...rest
	}: Props = $props();

	let paths: SVGPathElement[] = [];

	const total = $derived(data.reduce((sum, val) => sum + val, 0));
	const slices = $derived.by(() => {
		let currentAngle = -Math.PI / 2;
		return data.map((value, index) => {
			const sliceAngle = (value / total) * 2 * Math.PI;
			const startAngle = currentAngle;
			const endAngle = currentAngle + sliceAngle;
			const percentage = ((value / total) * 100).toFixed(1);

			const start = polarToCartesian(size / 2, size / 2, size / 2 - 10, endAngle);
			const end = polarToCartesian(size / 2, size / 2, size / 2 - 10, startAngle);
			const innerStart = polarToCartesian(size / 2, size / 2, (size / 2 - 10) * innerRadius, endAngle);
			const innerEnd = polarToCartesian(size / 2, size / 2, (size / 2 - 10) * innerRadius, startAngle);

			const largeArc = sliceAngle > Math.PI ? 1 : 0;

			const pathData = [
				`M ${start.x} ${start.y}`,
				`A ${size / 2 - 10} ${size / 2 - 10} 0 ${largeArc} 0 ${end.x} ${end.y}`,
				`L ${innerEnd.x} ${innerEnd.y}`,
				`A ${(size / 2 - 10) * innerRadius} ${(size / 2 - 10) * innerRadius} 0 ${largeArc} 1 ${innerStart.x} ${innerStart.y}`,
				'Z'
			].join(' ');

			currentAngle = endAngle;

			return {
				pathData,
				color: colors[index % colors.length],
				label: labels[index],
				value,
				percentage
			};
		});
	});

	function polarToCartesian(
		centerX: number,
		centerY: number,
		radius: number,
		angleInRadians: number
	) {
		return {
			x: centerX + radius * Math.cos(angleInRadians),
			y: centerY + radius * Math.sin(angleInRadians)
		};
	}

	function handleSliceClick(index: number) {
		onsliceclick?.(
			new CustomEvent('sliceclick', {
				detail: { index, label: labels[index], value: data[index] }
			})
		);
	}

	onMount(() => {
		paths.forEach((path, index) => {
			path.addEventListener('click', () => handleSliceClick(index));
		});
	});
</script>

<div class="flex flex-col items-center gap-4" {...rest} role="region" aria-label="Donut chart visualization">
	{#if title}
		<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
	{/if}

	<svg
		width={size}
		height={size}
		viewBox="0 0 {size} {size}"
		class="drop-shadow-sm"
		role="img"
		aria-label={title || 'Donut chart'}
	>
		{#each slices as slice, index}
			<path
				bind:this={paths[index]}
				d={slice.pathData}
				fill={slice.color}
				class="cursor-pointer transition-opacity hover:opacity-80"
				role="button"
				tabindex="0"
				aria-label="{slice.label}: {slice.value} ({slice.percentage}%)"
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						handleSliceClick(index);
					}
				}}
				onclick={() => handleSliceClick(index)}
			></path>
		{/each}
	</svg>

	{#if showLegend}
		<div class="flex flex-wrap justify-center gap-4">
			{#each slices as slice, index}
				<div class="flex items-center gap-2">
					<div
						class="h-3 w-3 rounded-full"
						style="background-color: {slice.color}"
						aria-hidden="true"
					></div>
					<span class="text-sm text-gray-700 dark:text-gray-300">
						{slice.label} ({slice.percentage}%)
					</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	@reference "../../../twintrinsic.css";
</style>
