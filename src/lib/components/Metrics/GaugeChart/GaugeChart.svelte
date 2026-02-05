<script lang="ts">
	interface Props {
		/** Current value */
		value: number;
		/** Minimum value */
		min?: number;
		/** Maximum value */
		max?: number;
		/** Label text */
		label?: string;
		/** Unit of measurement */
		unit?: string;
		/** Color theme */
		color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
		/** Size in pixels */
		size?: number;
	}

	let {
		value,
		min = 0,
		max = 100,
		label,
		unit,
		color = 'primary',
		size = 200,
		...rest
	}: Props = $props();

	const colorMap: Record<string, string> = {
		primary: '#3b82f6',
		secondary: '#8b5cf6',
		success: '#10b981',
		danger: '#ef4444',
		warning: '#f59e0b',
		info: '#06b6d4'
	};

	const percentage = $derived(((value - min) / (max - min)) * 100);
	const angle = $derived((percentage / 100) * 270 - 135);
	const color_value = colorMap[color];

	const radius = size / 2 - 20;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = $derived(circumference - (percentage / 100) * circumference);

	function polarToCartesian(angle: number): { x: number; y: number } {
		const rad = ((angle + 90) * Math.PI) / 180;
		return {
			x: size / 2 + radius * Math.cos(rad),
			y: size / 2 + radius * Math.sin(rad)
		};
	}
</script>

<div class="flex flex-col items-center gap-4" {...rest}>
	{#if label}
		<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{label}</h3>
	{/if}

	<svg
		width={size}
		height={size}
		viewBox="0 0 {size} {size}"
		class="drop-shadow-sm"
		role="img"
		aria-label={label || 'Gauge chart'}
	>
		<!-- Background arc -->
		<circle
			cx={size / 2}
			cy={size / 2}
			r={radius}
			fill="none"
			stroke="currentColor"
			stroke-width="8"
			opacity="0.1"
			class="text-gray-400"
		></circle>

		<!-- Progress arc -->
		<circle
			cx={size / 2}
			cy={size / 2}
			r={radius}
			fill="none"
			stroke={color_value}
			stroke-width="8"
			stroke-dasharray={circumference}
			stroke-dashoffset={strokeDashoffset}
			stroke-linecap="round"
			class="transition-all duration-500"
		></circle>

		<!-- Needle -->
		{#if true}
			{@const needleStart = polarToCartesian(-135)}
			{@const needleEnd = polarToCartesian(angle)}
			<line
				x1={needleStart.x}
				y1={needleStart.y}
				x2={needleEnd.x}
				y2={needleEnd.y}
				stroke={color_value}
				stroke-width="3"
				stroke-linecap="round"
				class="transition-all duration-500"
			></line>
		{/if}

		<!-- Center dot -->
		<circle
			cx={size / 2}
			cy={size / 2}
			r="6"
			fill={color_value}
		></circle>

		<!-- Value text -->
		<text
			x={size / 2}
			y={size / 2 + 30}
			text-anchor="middle"
			font-size="24"
			font-weight="bold"
			fill="currentColor"
			class="text-gray-900 dark:text-white"
		>
			{value.toFixed(0)}
		</text>

		<!-- Unit text -->
		{#if unit}
			<text
				x={size / 2}
				y={size / 2 + 50}
				text-anchor="middle"
				font-size="12"
				fill="currentColor"
				class="text-gray-600 dark:text-gray-400"
			>
				{unit}
			</text>
		{/if}
	</svg>

	<div class="flex gap-8 text-sm">
		<div class="text-center">
			<p class="text-gray-600 dark:text-gray-400">Min</p>
			<p class="font-semibold text-gray-900 dark:text-white">{min}</p>
		</div>
		<div class="text-center">
			<p class="text-gray-600 dark:text-gray-400">Max</p>
			<p class="font-semibold text-gray-900 dark:text-white">{max}</p>
		</div>
	</div>
</div>

<style lang="postcss">
	@reference "../../../twintrinsic.css";
</style>
