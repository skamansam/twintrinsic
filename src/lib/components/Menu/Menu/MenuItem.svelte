<script>
const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - ARIA label */
  ariaLabel,

  /** @type {string} - Link href */
  href = "#",

  /** @type {boolean} - Whether the item is active */
  active = false,

  /** @type {boolean} - Whether the item is disabled */
  disabled = false,
  
  /** @type {boolean} - Whether the submenu is initially open */
  initialOpen = false,
  
  /** @type {any} - Value associated with this menu item */
  value = {}
} = $props()

// Use $state for values that need to be modified
let isOpen = $state(initialOpen);

const toggleMenu = () => {
  isOpen = !isOpen;
}
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  {href}
  {id}
  class="menu-item {className}"
  class:active
  class:disabled
  role="menuitem"
  aria-label={ariaLabel}
  aria-disabled={disabled}
  onclick={!disabled && toggleMenu}
>
  {@render children?.()}
  {#if value?.children}
    <ul class="menu-item-submenu" class:hidden={!isOpen}>
      {#each value.children as child}
        <MenuItem value={child}/>
      {/each}
    </ul>
  {/if}
</svelte:element>

<style>
  @reference "../../../twintrinsic.css";
  
  .menu-item {
    @apply block w-full text-left;
    @apply px-4 py-2 text-sm;
    @apply hover:bg-hover focus:outline-none focus:bg-hover;
  }

  .menu-item.active {
    @apply bg-primary-500 text-white;
  }

  .menu-item.disabled {
    @apply opacity-50 cursor-not-allowed;
    @apply hover:bg-transparent;
  }

  .menu-item-submenu {
    @apply pl-4;
  }
  
  .hidden {
    @apply hidden;
  }
</style>
