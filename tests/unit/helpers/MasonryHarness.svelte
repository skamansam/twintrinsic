<!--
Test helper: renders a Masonry with N child items. Svelte 5 children
are snippets, so tests cannot write `<Masonry><div/></Masonry>`
directly — this wrapper supplies `count` identifiable children.
All Masonry props pass through.
-->
<script lang="ts">
	import Masonry from "$lib/components/Masonry/Masonry.svelte"

	let { count = 3, ...rest }: { count?: number; [key: string]: unknown } = $props()
</script>

<Masonry {...rest}>
	{#snippet children()}
		{#each Array.from({ length: count }, (_, i) => i) as i}
			<div data-testid="masonry-item-{i}">Item {i}</div>
		{/each}
	{/snippet}
</Masonry>
