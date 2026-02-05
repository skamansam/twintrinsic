<script lang="ts">
	interface TicConfig {
		/** Show tic marks */
		show?: boolean;
		/** Step size for tics (if not using custom values) */
		step?: number;
		/** Custom values to show as tics */
		values?: number[];
		/** Show tic labels */
		showLabels?: boolean;
		/** Format function for tic labels */
		format?: (value: number) => string;
	}

	interface ColorZone {
		/** Start value */
		start: number;
		/** End value */
		end: number;
		/** Color for this zone */
		color: string;
		/** Optional label */
		label?: string;
	}

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
		/** Color theme for needle/center */
		color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
		/** Size in pixels */
		size?: number;
		/** Arc start angle in degrees (0 = horizontal left, 90 = vertical top) */
		arcStart?: number;
		/** Arc end angle in degrees */
		arcEnd?: number;
		/** Tic configuration */
		tics?: TicConfig;
		/** Color zones for the arc */
		zones?: ColorZone[];
	}

	let {
		value,
		min = 0,
		max = 100,
		label,
		unit,
		color = 'primary',
		size = 200,
		arcStart = 0,
		arcEnd = 180,
		tics = {},
		zones = []
	}: Props = $props();

	const colorMap: Record<string, string> = {
		primary: '#3b82f6',
		secondary: '#8b5cf6',
		success: '#10b981',
		danger: '#ef4444',
		warning: '#f59e0b',
		info: '#06b6d4'
	};

	const colorValue = colorMap[color];
	const radius = size / 2 - 30;
	const arcRange = arcEnd - arcStart;
	const percentage = $derived(((value - min) / (max - min)) * 100);
	const currentAngle = $derived(arcStart + (percentage / 100) * arcRange);

	function polarToCartesian(angle: number): { x: number; y: number } {
		const rad = (angle * Math.PI) / 180;
		return {
			x: size / 2 + radius * Math.cos(rad),
			y: size / 2 + radius * Math.sin(rad)
		};
	}

	function describeArc(startAngle: number, endAngle: number): string {
		const start = polarToCartesian(startAngle);
		const end = polarToCartesian(endAngle);
		const largeArc = endAngle - startAngle > 180 ? 1 : 0;

		return [
			`M ${start.x} ${start.y}`,
			`A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`
		].join(' ');
	}

	function getTicValues(): number[] {
		if (tics.values) return tics.values;
		if (!tics.step) return [];

		const values = [];
		for (let i = min; i <= max; i += tics.step) {
			values.push(i);
		}
		return values;
	}

	const ticValues = $derived(getTicValues());
	const formatLabel = tics.format || ((v: number) => v.toString());
</script>

<div class="flex flex-col items-center gap-4">
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
		<path
			d={describeArc(arcStart, arcEnd)}
			fill="none"
			stroke="currentColor"
			stroke-width="12"
			opacity="0.1"
			class="text-gray-400"
			stroke-linecap="round"
		></path>

		<!-- Color zones -->
		{#each zones as zone}
			{@const zoneStart = arcStart + ((zone.start - min) / (max - min)) * arcRange}
			{@const zoneEnd = arcStart + ((zone.end - min) / (max - min)) * arcRange}
			<path
				d={describeArc(zoneStart, zoneEnd)}
				fill="none"
				stroke={zone.color}
				stroke-width="12"
				stroke-linecap="round"
				class="transition-all duration-500"
			></path>
		{/each}

		<!-- Tic marks and labels -->
		{#if tics.show && ticValues.length > 0}
			{#each ticValues as ticValue}
				{@const ticAngle = arcStart + ((ticValue - min) / (max - min)) * arcRange}
				{@const innerRad = (ticAngle * Math.PI) / 180}
				{@const ticInnerRadius = radius - 8}
				{@const ticOuterRadius = radius}
				{@const ticInnerX = size / 2 + ticInnerRadius * Math.cos(innerRad)}
				{@const ticInnerY = size / 2 + ticInnerRadius * Math.sin(innerRad)}
				{@const ticOuterX = size / 2 + ticOuterRadius * Math.cos(innerRad)}
				{@const ticOuterY = size / 2 + ticOuterRadius * Math.sin(innerRad)}

				<!-- Tic mark -->
				<line
					x1={ticInnerX}
					y1={ticInnerY}
					x2={ticOuterX}
					y2={ticOuterY}
					stroke="currentColor"
					stroke-width="2"
					class="text-gray-400 dark:text-gray-600"
				></line>

				<!-- Tic label -->
				{#if tics.showLabels}
					{@const labelRadius = radius + 20}
					{@const labelRad = (ticAngle * Math.PI) / 180}
					{@const labelX = size / 2 + labelRadius * Math.cos(labelRad)}
					{@const labelY = size / 2 + labelRadius * Math.sin(labelRad)}
					<text
						x={labelX}
						y={labelY}
						text-anchor="middle"
						dominant-baseline="middle"
						font-size="12"
						fill="currentColor"
						class="text-gray-600 dark:text-gray-400"
					>
						{formatLabel(ticValue)}
					</text>
				{/if}
			{/each}
		{/if}

		<!-- Min and Max labels -->
		{#if true}
			{@const minLabelRadius = radius + 28}
			{@const minLabelRad = (arcStart * Math.PI) / 180}
			{@const minLabelX = size / 2 + minLabelRadius * Math.cos(minLabelRad)}
			{@const minLabelY = size / 2 + minLabelRadius * Math.sin(minLabelRad)}
			{@const maxLabelRadius = radius + 28}
			{@const maxLabelRad = (arcEnd * Math.PI) / 180}
			{@const maxLabelX = size / 2 + maxLabelRadius * Math.cos(maxLabelRad)}
			{@const maxLabelY = size / 2 + maxLabelRadius * Math.sin(maxLabelRad)}

			<!-- Min label at arc start -->
			<text
				x={minLabelX}
				y={minLabelY}
				text-anchor="middle"
				dominant-baseline="middle"
				font-size="14"
				font-weight="600"
				fill="currentColor"
				class="text-gray-900 dark:text-white"
			>
				{min}%
			</text>

			<!-- Max label at arc end -->
			<text
				x={maxLabelX}
				y={maxLabelY}
				text-anchor="middle"
				dominant-baseline="middle"
				font-size="14"
				font-weight="600"
				fill="currentColor"
				class="text-gray-900 dark:text-white"
			>
				{max}%
			</text>
		{/if}

		<!-- Needle -->
		{#if true}
			{@const needleStart = polarToCartesian(arcStart)}
			{@const needleEnd = polarToCartesian(currentAngle)}
			<line
				x1={needleStart.x}
				y1={needleStart.y}
				x2={needleEnd.x}
				y2={needleEnd.y}
				stroke={colorValue}
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
			fill={colorValue}
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
			{value.toFixed(0)}%
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
</div>

<style lang="postcss">
	@reference "../../../twintrinsic.css";
</style>
