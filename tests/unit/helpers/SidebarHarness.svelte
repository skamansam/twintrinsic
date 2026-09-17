<!--
Test helper: renders a Sidebar with a children snippet (Sidebar's
default slot). Svelte 5 children are snippets, so tests cannot write
`<Sidebar><div/></Sidebar>` directly. All Sidebar props pass through.
-->
<script lang="ts">
	import Sidebar from "$lib/components/Sidebar/Sidebar.svelte"

	let { bodyText = "Sidebar content", ...rest }: {
		bodyText?: string
		[key: string]: unknown
	} = $props()
</script>

<Sidebar {...rest}>
	{#snippet children()}<div data-testid="sidebar-body">{bodyText}</div>{/snippet}
</Sidebar>
