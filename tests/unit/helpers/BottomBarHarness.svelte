<!--
Test helper: renders a BottomBar with header/children snippets.
Svelte 5 children are snippets, so tests cannot write
`<BottomBar>{#snippet header()}…{/snippet}</BottomBar>` directly —
this wrapper supplies "Details" as the header and body content.
All BottomBar props pass through.
-->
<script lang="ts">
	import BottomBar from "$lib/components/BottomBar/BottomBar.svelte"

	let { headerText = "Details", bodyText = "Bar body content", ...rest }: {
		headerText?: string
		bodyText?: string
		[key: string]: unknown
	} = $props()
</script>

<BottomBar {...rest}>
	{#snippet header()}{headerText}{/snippet}
	{#snippet children()}{bodyText}{/snippet}
</BottomBar>
