<script lang="ts">
import Container from "../../Container/Container.svelte"
let propClasses = ""
export let heading: string | null = ""
export let type: TypeLevel = null
let typeClass = ""
$: typeClass = type ? `bg-${type}` : "bg-light"
export { propClasses as class }

</script>

<Container as="section" {...$$restProps} class="twin-hero {typeClass} {propClasses}  ">
	<h1 slot="heading">{heading}</h1>
	<slot></slot>
</Container>

<style>
	@reference "../../../twintrinsic.css";
	:global(.twin-hero) {
		@apply p-4;
	}
	:global(.twin-hero h1) {
		@apply text-4xl mb-3;
	}
</style>
