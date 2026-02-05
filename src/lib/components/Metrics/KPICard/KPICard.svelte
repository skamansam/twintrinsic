<script lang="ts">
	interface Props {
		/** KPI label */
		label: string;
		/** Current value */
		value: number;
		/** Target value */
		target: number;
		/** Unit of measurement */
		unit?: string;
		/** Icon component or name */
		icon?: string;
		/** Color theme */
		color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
		/** Callback when card is clicked */
		onclick?: (event: CustomEvent<void>) => void;
	}

	let { label, value, target, unit, icon, color = 'primary', onclick, ...rest }: Props = $props();

	const percentage = $derived(Math.min((value / target) * 100, 100));
	const status = $derived(percentage >= 100 ? 'success' : percentage >= 75 ? 'warning' : 'danger');

	const colorMap: Record<string, { bg: string; text: string; border: string }> = {
		primary: {
			bg: 'bg-blue-50 dark:bg-blue-950',
			text: 'text-blue-600 dark:text-blue-400',
			border: 'border-blue-200 dark:border-blue-800'
		},
		secondary: {
			bg: 'bg-purple-50 dark:bg-purple-950',
			text: 'text-purple-600 dark:text-purple-400',
			border: 'border-purple-200 dark:border-purple-800'
		},
		success: {
			bg: 'bg-green-50 dark:bg-green-950',
			text: 'text-green-600 dark:text-green-400',
			border: 'border-green-200 dark:border-green-800'
		},
		danger: {
			bg: 'bg-red-50 dark:bg-red-950',
			text: 'text-red-600 dark:text-red-400',
			border: 'border-red-200 dark:border-red-800'
		},
		warning: {
			bg: 'bg-yellow-50 dark:bg-yellow-950',
			text: 'text-yellow-600 dark:text-yellow-400',
			border: 'border-yellow-200 dark:border-yellow-800'
		},
		info: {
			bg: 'bg-cyan-50 dark:bg-cyan-950',
			text: 'text-cyan-600 dark:text-cyan-400',
			border: 'border-cyan-200 dark:border-cyan-800'
		}
	};

	const statusColors = {
		success: 'bg-green-500',
		warning: 'bg-yellow-500',
		danger: 'bg-red-500'
	};

	const colorClasses = colorMap[color];

	function handleClick() {
		onclick?.(new CustomEvent('click'));
	}
</script>

<div
	class="rounded-lg border p-6 transition-all hover:shadow-md {colorClasses.bg} {colorClasses.border} cursor-pointer"
	role="button"
	tabindex="0"
	aria-label="{label}: {value} of {target} {unit || ''}"
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleClick();
		}
	}}
	onclick={handleClick}
	{...rest}
>
	<div class="flex items-start justify-between">
		<div class="flex-1">
			<p class="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>

			<div class="mt-3 flex items-baseline gap-2">
				<p class="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
				{#if unit}
					<p class="text-sm text-gray-600 dark:text-gray-400">{unit}</p>
				{/if}
			</div>

			<div class="mt-4">
				<div class="flex items-center justify-between gap-2 text-sm">
					<span class="text-gray-600 dark:text-gray-400">Target: {target}{unit ? ` ${unit}` : ''}</span>
					<span class="font-semibold text-gray-900 dark:text-white">{percentage.toFixed(0)}%</span>
				</div>

				<div class="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
					<div
						class="h-full transition-all {statusColors[status]}"
						style="width: {percentage}%"
						aria-hidden="true"
					></div>
				</div>
			</div>
		</div>

		{#if icon}
			<div class="ml-4 flex h-12 w-12 items-center justify-center rounded-lg {colorClasses.text}">
				<svg
					class="h-6 w-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					aria-hidden="true"
				>
					{#if icon === 'target'}
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-2a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
							clip-rule="evenodd"
						></path>
					{:else if icon === 'flag'}
						<path
							d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2h4a1 1 0 011 1v10a1 1 0 01-1 1h-4v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2H1a1 1 0 01-1-1V7a1 1 0 011-1h2V4z"
						></path>
					{:else}
						<circle cx="10" cy="10" r="8"></circle>
					{/if}
				</svg>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	@reference "../../../twintrinsic.css";
</style>
