<script lang="ts">
import { setContext } from "svelte";

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - ARIA label */
  ariaLabel = "Menu",
  children,
} = $props()

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
    {@render children?.('trigger')}
  </button>

  {#if isOpen}
    <div 
      class="menu-content" 
      role="menu" 
      aria-orientation="vertical" 
      aria-labelledby={id}
    >
      {@render children?.('content')}
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