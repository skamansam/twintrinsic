<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", optional: true },
  { name: "type", type: "string", description: "Background type (maps to a `bg-{type}` theme color)", optional: true },
  { name: "heading", type: "Snippet", description: "Hero heading content snippet", optional: true },
];
</script>

<script lang="ts">
import type { Snippet } from "svelte"
import Container from "../../Container/Container.svelte"

interface Props {
	/** Additional CSS classes */
	class?: string
	/** Background type (maps to a `bg-{type}` theme color) */
	type?: string
	/** Hero heading content snippet */
	heading?: Snippet
	/** Hero body content */
	children?: Snippet
	[key: string]: unknown
}

const {
	class: propClasses,
	type,
	heading,
	children,
	...rest
}: Props = $props()

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
