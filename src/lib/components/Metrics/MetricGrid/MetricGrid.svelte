<script lang="ts">
	import StatsCard from '../StatsCard/StatsCard.svelte';

	interface StatsCardItem {
		label: string;
		value: string | number;
		icon?: string;
		trend?: 'up' | 'down';
		trendValue?: string | number;
		color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
		onclick?: (event: CustomEvent<void>) => void;
	}

	interface Props {
		/** Array of stats card items */
		items: StatsCardItem[];
		/** Number of columns in the grid */
		columns?: number;
		/** Gap between items */
		gap?: 'sm' | 'md' | 'lg';
	}

	let { items, columns = 4, gap = 'md', ...rest }: Props = $props();

	const gapMap = {
		sm: 'gap-2',
		md: 'gap-4',
		lg: 'gap-6'
	};

	const columnMap: Record<number, string> = {
		1: 'grid-cols-1',
		2: 'grid-cols-1 sm:grid-cols-2',
		3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
		4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
		5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
		6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
	};

	const gridClass = columnMap[columns] || columnMap[4];
</script>

<div class="grid {gridClass} {gapMap[gap]}" {...rest}>
	{#each items as item}
		<StatsCard
			label={item.label}
			value={item.value}
			icon={item.icon}
			trend={item.trend}
			trendValue={item.trendValue}
			color={item.color}
			onclick={item.onclick}
		/>
	{/each}
</div>

<style lang="postcss">
	@reference "../../../twintrinsic.css";
</style>
