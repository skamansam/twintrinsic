<script lang="ts">
  import { Section } from "../../";
  let propClasses = '';
  export let heading:string|null = '';
  export let type:TypeLevel = null;
  let typeClass = '';
  $: typeClass = type ? `bg-${type}` : 'bg-light';
  export { propClasses as class }
</script>

<style>
  :global(.twin-hero){
    @apply p-4;
  }
  :global(.twin-hero h1) {
    @apply text-4xl mb-3;
  }
</style>

<Section {...$$restProps} class="twin-hero {typeClass} {propClasses}  ">
  <h1 slot="heading">{heading}</h1>
  <slot></slot>
</Section>