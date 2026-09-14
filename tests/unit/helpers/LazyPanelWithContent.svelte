<!--
Test helper: renders a LazyPanel component with regular element children.
Svelte 5 children are snippets, so a plain `<LazyPanel><div/></LazyPanel>`
in a test cannot provide them — this wrapper forwards element children
into the snippet slot. Spread props pass through (expanded, rootMargin,
threshold, class, id, ariaLabel, disabled, bordered, showIcon, loading).
-->
<script lang="ts">
	import { type Snippet } from "svelte";
	import LazyPanel from "$lib/components/Panel/LazyPanel.svelte";

	let { children, ...rest }: { children?: Snippet; [key: string]: unknown } = $props();
</script>

<LazyPanel {...rest}>
	<p>lazy panel body</p>
	{@render children?.()}
</LazyPanel>
