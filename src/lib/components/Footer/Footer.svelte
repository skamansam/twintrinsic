<!--
@component
Footer - A flexible footer component with left, center, and right regions.

## Props
- `class` - Additional CSS classes
- `left` - Left-aligned content snippet
- `center` - Center-aligned content snippet
- `right` - Right-aligned content snippet

## Usage
```svelte
<Footer
  left={() => <p>© 2024 Company</p>}
  center={() => <p>Privacy Policy | Terms</p>}
  right={() => <p>Contact Us</p>}
/>

<Footer center={() => <p>Copyright © 2024 QuestLists</p>} />
```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    class?: string;
    left?: Snippet;
    center?: Snippet;
    right?: Snippet;
  }

  const { class: className = "", left, center, right }: Props = $props();
</script>

<footer class="footer {className}">
  <div class="footer-left">
    {#if left}
      {@render left()}
    {/if}
  </div>
  <div class="footer-center">
    {#if center}
      {@render center()}
    {/if}
  </div>
  <div class="footer-right">
    {#if right}
      {@render right()}
    {/if}
  </div>
</footer>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .footer {
    @apply bg-surface border-t border-border px-6 py-4;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
    align-items: center;
  }

  .footer-left {
    @apply text-left;
  }

  .footer-center {
    @apply text-center;
  }

  .footer-right {
    @apply text-right;
  }

  /* Responsive: Stack on smaller screens */
  @media (max-width: 640px) {
    .footer {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .footer-left,
    .footer-center,
    .footer-right {
      @apply text-center;
    }
  }
</style>
