<script lang="ts">
	interface Props {
		/** Array of data points */
		data: number[];
		/** Label text */
		label: string;
		/** Color of the sparkline */
		color?: string;
		/** Height in pixels */
		height?: number;
		/** Callback when clicked */
		onclick?: (event: CustomEvent<void>) => void;
	}

	let {
		data,
		label,
		color = '#3b82f6',
		height = 40,
		onclick,
		...rest
	}: Props = $props();

	const width = $derived(data.length * 4);
	const padding = 4;

	const minValue = $derived(Math.min(...data, 0));
	const maxValue = $derived(Math.max(...data, 0));
	const range = $derived(maxValue - minValue || 1);

	function getY(value: number): number {
		return padding + (height - padding * 2) - ((value - minValue) / range) * (height - padding * 2);
	}

	const pathData = $derived(
		data
			.map((value, index) => {
				const x = padding + index * 4;
				const y = getY(value);
				return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
			})
			.join(' ')
	);

	function handleClick() {
		onclick?.(new CustomEvent('click'));
	}
</script>

<div class="flex items-center gap-3" {...rest}>
	<div class="flex-1">
		<p class="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
	</div>

	<svg
		{width}
		{height}
		viewBox="0 0 {width} {height}"
		class="cursor-pointer transition-opacity hover:opacity-75"
		role="button"
		tabindex="0"
		aria-label="{label} trend"
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				handleClick();
			}
		}}
		onclick={handleClick}
	>
		<!-- Area under the line -->
		<path
			d="{pathData} L {width - padding} {height - padding} L {padding} {height - padding} Z"
			fill={color}
			opacity="0.1"
		></path>

		<!-- Line -->
		<path
			d={pathData}
			fill="none"
			stroke={color}
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		></path>

		<!-- Points -->
		{#each data as value, index}
			{@const x = padding + index * 4}
			{@const y = getY(value)}
			<circle
				cx={x}
				cy={y}
				r="1.5"
				fill={color}
			></circle>
		{/each}
	</svg>
</div>

<style lang="postcss">
	@reference "../../../twintrinsic.css";
</style>
