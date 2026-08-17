<script module lang="ts">
export const propsMetadata = [
  { name: "value", type: "string | Snippet", description: "Content to render, either a plain string or a Snippet", optional: true },
];
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Content to render, either a plain string or a Snippet */
		value?: string | Snippet;
	};

	let { value }: Props = $props();
</script>

{#if typeof value === 'string'}
	{value}
{:else if value}
	{@render value()}
{/if}
