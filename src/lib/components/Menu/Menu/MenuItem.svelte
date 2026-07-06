<script lang="ts">
import { getContext, type Component } from "svelte";
import Icon from "../../Icon/Icon.svelte";
import MenuItem from "./MenuItem.svelte";

/** Self-reference for recursive children (typed loosely to allow partial props) */
const Self = MenuItem as unknown as Component<{ value: Record<string, unknown> }>;

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

  /** @type {boolean} - Whether to show a visual divider below this item */
  divider = false,

  /** @type {string} - Icon name to render before the menu item text */
  icon,

  /** @type {any} - Value associated with this menu item */
  value = {},

  children,
} = $props()

// Use $state for values that need to be modified
let isOpen = $state(false)

// Sync isOpen when initialOpen changes
$effect(() => {
  isOpen = initialOpen
})

const toggleMenu = () => {
  isOpen = !isOpen
}
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  {href}
  {id}
  class="menu-item {className}"
  class:active
  class:disabled
  class:divider
  role="menuitem"
  tabindex="0"
  aria-label={ariaLabel}
  aria-disabled={disabled}
  onclick={() => !disabled && toggleMenu()}
>
  {#if icon}
    <Icon name={icon} class="inline-block w-4 h-4 mr-2 align-middle text-muted" />
  {/if}
  {@render children?.()}
  {#if (value as { children?: unknown[] })?.children}
    <ul class="menu-item-submenu" class:hidden={!isOpen}>
      {#each (value as { children: unknown[] }).children as child}
        <Self value={child as Record<string, unknown>} />
      {/each}
    </ul>
  {/if}
</svelte:element>

<style lang="postcss">
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

  /* Divider sits between this item and the one below it. */
  .menu-item.divider {
    @apply border-b border-border;
  }

  .menu-item-submenu {
    @apply pl-4;
  }

  .hidden {
    @apply hidden;
  }
</style>
