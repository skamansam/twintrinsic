<!--
Test helper: renders a Hero with heading/children snippets. Svelte 5
children are snippets, so tests cannot write
`<Hero>{#snippet heading()}…{/snippet}</Hero>` directly — this wrapper
supplies an h1 heading and body content. All Hero props pass through.
-->
<script lang="ts">
	import Hero from "$lib/components/Panel/Hero/Hero.svelte"

	let { headingText = "Hero title", bodyText = "Hero body", ...rest }: {
		headingText?: string
		bodyText?: string
		[key: string]: unknown
	} = $props()
</script>

<Hero {...rest}>
	{#snippet heading()}<h1>{headingText}</h1>{/snippet}
	{#snippet children()}<p>{bodyText}</p>{/snippet}
</Hero>
