<script lang="ts">
import Container from "../../Container/Container.svelte"

const {
	class: propClasses,
	type,
	heading,
	children,
	...rest
} = $props()

const typeClass = $derived(type ? `bg-${type}` : "bg-light")
</script>

<Container as="section" {...rest} class="twin-hero {typeClass} {propClasses}  ">
	{#if heading}
		<div class="hero-heading">
			{@render heading()}
		</div>
	{/if}
	{@render children?.()}
</Container>

<style lang="postcss">
	@reference "../../../twintrinsic.css";
	:global(.twin-hero) {
		@apply p-4;
	}
	:global(.twin-hero h1) {
		@apply text-4xl mb-3;
	}
</style>
