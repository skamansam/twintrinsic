<script lang="ts">
  export let heading = "";
  let propClasses = '';
  export { propClasses as class };
  export let type:string|null = null;

  $: typeCSS = type ? `bg-${type}` : '';

  </script>

<style>
  @reference "./twintrinsic.css";
.twin-section {
  @apply m-2 my-4;
}
</style>

<section class="twin-section {propClasses} {typeCSS}">
  {#if $$slots.heading}
  <slot name="heading">
    <h2>{heading}</h2>
  </slot>
  {/if}
  <slot></slot>
</section>