<script lang="ts">
	interface Props {
		/** Card label/title */
		label: string;
		/** Metric value */
		value: string | number;
		/** Icon component or name */
		icon?: string;
		/** Trend direction: 'up' or 'down' */
		trend?: 'up' | 'down';
		/** Trend value (e.g., "12.5%") */
		trendValue?: string | number;
		/** Color theme: primary, secondary, success, danger, warning, info */
		color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
		/** Callback when card is clicked */
		onclick?: (event: CustomEvent<void>) => void;
	}

	let { label, value, icon, trend, trendValue, color = 'primary', onclick, ...rest }: Props = $props();

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

	const colorClasses = colorMap[color];

	function handleClick() {
		onclick?.(new CustomEvent('click'));
	}
</script>

<div
	class="rounded-lg border p-6 transition-all hover:shadow-md {colorClasses.bg} {colorClasses.border} cursor-pointer"
	role="button"
	tabindex="0"
	aria-label="{label}: {value}"
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
			<p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>

			{#if trend && trendValue}
				<div class="mt-2 flex items-center gap-1">
					{#if trend === 'up'}
						<svg
							class="h-4 w-4 text-green-600 dark:text-green-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M12 5a1 1 0 011.707-.707l2.828 2.829a1 1 0 11-1.414 1.414L13 7.414V15a1 1 0 11-2 0V7.414l-1.121 1.121a1 1 0 11-1.414-1.414l2.828-2.829A1 1 0 0112 5z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="text-sm font-medium text-green-600 dark:text-green-400">
							{trendValue}
						</span>
					{:else}
						<svg
							class="h-4 w-4 text-red-600 dark:text-red-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M12 15a1 1 0 01-1.707.707l-2.828-2.829a1 1 0 011.414-1.414L11 12.586V5a1 1 0 112 0v7.586l1.121-1.121a1 1 0 111.414 1.414l-2.828 2.829A1 1 0 0112 15z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="text-sm font-medium text-red-600 dark:text-red-400">
							{trendValue}
						</span>
					{/if}
				</div>
			{/if}
		</div>

		{#if icon}
			<div class="ml-4 flex h-12 w-12 items-center justify-center rounded-lg {colorClasses.text}">
				<svg
					class="h-6 w-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					aria-hidden="true"
				>
					{#if icon === 'chart'}
						<path
							d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
						></path>
					{:else if icon === 'users'}
						<path
							d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
						></path>
					{:else if icon === 'trending'}
						<path
							d="M2 15a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 01.707 1.707l-9.414 9.414a1 1 0 01-1.414 0l-2.828-2.829a1 1 0 00-1.414 0l-2.828 2.829a1 1 0 01-1.414-1.414l2.828-2.829a1 1 0 000-1.414l-2.829-2.828A1 1 0 012 15z"
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
