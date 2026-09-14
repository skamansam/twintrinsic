<!--
Test helper: renders a Lazy component with regular element children.
Svelte 5 children are snippets, so a plain `<Lazy><div/></Lazy>` in a
test cannot provide them — this wrapper forwards element children into
the snippet slot. Spread props pass through (threshold, rootMargin,
keepRendered, showLoading, delay, class, id, ...).
-->
<script lang="ts">
	import { type Snippet } from "svelte";
	import Lazy from "$lib/components/Lazy/Lazy.svelte";

	let { children, ...rest }: { children?: Snippet; [key: string]: unknown } = $props();
</script>

<Lazy {...rest}>{@render children?.()}</Lazy>
