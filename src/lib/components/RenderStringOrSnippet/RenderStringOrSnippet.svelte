<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		value?: string | Snippet;
	};

	let { value }: Props = $props();
</script>

{#if typeof value === 'string'}
	{value}
{:else if value}
	{@render value()}
{/if}
