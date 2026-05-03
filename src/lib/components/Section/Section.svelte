<!--
@component
Section - A themed content section container for one-page websites and page layouts.
Provides consistent theming with optional header, subtitle, and customizable borders/backgrounds.

Usage:
<Section 
  title="About Us" 
  subtitle="We are great!"
  class="mb-8 bg-surface"
>
  We love you and you love we!
</Section>

<Section 
  class="mb-8 bg-surface"
>
  {#snippet title()}
    Custom title content
  {/snippet}
  {#snippet subtitle()}
    Custom subtitle content
  {/snippet}
  We love you and you love we!
</Section>
-->
<script lang="ts">
import type { Snippet } from "svelte";

type Props = {
  /** @type {string} - Additional CSS classes */
  class?: string;
  
  /** @type {string} - HTML id for accessibility.  Defaults to a random UUID. */
  id?: string;
  
  /** @type {string | Snippet} - Section title */
  title?: string | Snippet;
  
  /** @type {string | Snippet} - Optional subtitle or description */
  subtitle?: string | Snippet;
  
  /** @type {() => void} - Section content */
  children?: () => void | Snippet | HTMLElement;
};

const {
  class: className = "",
  id = crypto.randomUUID(),
  title = "",
  subtitle = "",
  children = undefined,
}: Props = $props()
</script>

<section {id} class={className}>
  {#if title || subtitle}
    <header>
      {#if title}
        {#if typeof title === 'string'}
          <h2 class="section-title text-2xl font-bold font-mono mb-6 text-theme-primary">
            {title}
          </h2>
        {:else}
          {@render title()}
        {/if}
      {/if}
      {#if subtitle}
        {#if typeof subtitle === 'string'}
          <p class="section-subtitle text-sm font-mono mb-4 text-text opacity-75">
            {subtitle}
          </p>
        {:else}
          {@render subtitle()}
        {/if}
      {/if}
    </header>
  {/if}
  {#if children}
    <div class="section-body">
      {@render children()}
    </div>
  {/if}
</section>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .section {
    @apply border-2 rounded-none;
  }

</style>
