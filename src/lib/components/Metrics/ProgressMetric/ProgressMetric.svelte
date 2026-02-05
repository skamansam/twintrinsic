<script lang="ts">
	interface Props {
		/** Metric label */
		label: string;
		/** Current value */
		value: number;
		/** Maximum value */
		max: number;
		/** Color theme */
		color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
		/** Show percentage */
		showPercentage?: boolean;
		/** Height of the progress bar */
		height?: 'sm' | 'md' | 'lg';
	}

	let {
		label,
		value,
		max,
		color = 'primary',
		showPercentage = true,
		height = 'md',
		...rest
	}: Props = $props();

	const percentage = $derived(Math.min((value / max) * 100, 100));

	const colorMap: Record<string, string> = {
		primary: 'bg-blue-500',
		secondary: 'bg-purple-500',
		success: 'bg-green-500',
		danger: 'bg-red-500',
		warning: 'bg-yellow-500',
		info: 'bg-cyan-500'
	};

	const heightMap = {
		sm: 'h-1',
		md: 'h-2',
		lg: 'h-3'
	};

	const colorClass = colorMap[color];
	const heightClass = heightMap[height];
</script>

<div class="flex flex-col gap-2" {...rest}>
	<div class="flex items-center justify-between">
		<label class="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
		{#if showPercentage}
			<span class="text-sm font-semibold text-gray-900 dark:text-white">{percentage.toFixed(0)}%</span>
		{/if}
	</div>

	<div class="overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 {heightClass}">
		<div
			class="h-full transition-all duration-300 {colorClass}"
			style="width: {percentage}%"
			role="progressbar"
			aria-valuenow={value}
			aria-valuemin="0"
			aria-valuemax={max}
			aria-label={label}
		></div>
	</div>

	<div class="flex justify-between text-xs text-gray-600 dark:text-gray-400">
		<span>0</span>
		<span>{max}</span>
	</div>
</div>

<style lang="postcss">
	@reference "../../../twintrinsic.css";
</style>
