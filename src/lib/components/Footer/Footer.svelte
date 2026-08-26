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
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "left", type: "Snippet", description: "Left-aligned content snippet", optional: true },
  { name: "center", type: "Snippet", description: "Center-aligned content snippet", optional: true },
  { name: "right", type: "Snippet", description: "Right-aligned content snippet", optional: true },
];
</script>

<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    /** Additional props passed through to the root element */
    [key: `data-${string}`]: unknown;
    [key: `aria-${string}`]: string | undefined;
    /** Additional CSS classes */
    class?: string;
    /** Left-aligned content snippet */
    left?: Snippet;
    /** Center-aligned content snippet */
    center?: Snippet;
    /** Right-aligned content snippet */
    right?: Snippet;
  }

  const {
    class: className = "",
    left,
    center,
    right,
    ...restProps
  }: Props = $props();
</script>

<footer {...restProps} class="footer {className}">
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
