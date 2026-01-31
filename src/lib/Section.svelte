<script lang="ts">
const {
  heading = "",
  class: propClasses = "",
  type = null,
  children
} = $props<{ heading?: string; class?: string; type?: string | null }>()

const typeCSS = $derived(type ? `bg-${type}` : "")
</script>

<style lang="postcss">
  @reference "./twintrinsic.css";
.twin-section {
  @apply m-2 my-4;
}
</style>

<section class="twin-section {propClasses} {typeCSS}">
  {#if heading}
    <h2>{@render heading?.()}</h2>
  {/if}
  {@render children?.()}
</section>