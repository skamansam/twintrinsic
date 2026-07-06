<!--
@component
Menu - A dropdown menu component with a trigger button and a popup content area.

Usage:
```svelte
<Menu>
  {#snippet trigger()}<Button>Open Menu</Button>{/snippet}
  {#snippet content()}
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
  {/snippet}
</Menu>
```
-->
<script lang="ts">
import type { Snippet } from "svelte"

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** ARIA label */
  ariaLabel?: string
  /** Trigger button content (rendered inside the toggle button) */
  trigger?: Snippet
  /** Popup menu content (rendered inside the popup panel) */
  content?: Snippet
}

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - ARIA label */
  ariaLabel = "Menu",

  trigger = undefined,
  content = undefined,
}: Props = $props()

let isOpen = $state(false)

function toggleMenu() {
  isOpen = !isOpen
}
</script>

<div class="menu {className}" {id}>
  <button
    type="button"
    class="menu-trigger"
    {id}
    aria-haspopup="true"
    aria-expanded={isOpen}
    aria-label={ariaLabel}
    onclick={toggleMenu}
  >
    {@render trigger?.()}
  </button>

  {#if isOpen}
    <div
      class="menu-content"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={id}
    >
      {@render content?.()}
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../../twintrinsic.css";

  .menu {
    @apply relative inline-block;
  }

  .menu-trigger {
    @apply inline-flex items-center justify-center rounded-md;
    @apply px-4 py-2 text-sm font-medium;
    @apply bg-background border border-border;
    @apply hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary-500;
  }

  .menu-content {
    @apply absolute right-0 mt-2 w-56;
    @apply bg-background border border-border rounded-md shadow-lg;
    @apply origin-top-right;
  }
</style>
