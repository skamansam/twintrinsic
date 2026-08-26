<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "ariaLabel", type: "string|undefined", description: "ARIA label", optional: true },
  { name: "href", type: "string", description: "Link href", default: "\"#\"", optional: true },
  { name: "active", type: "boolean", description: "Whether the item is active", default: "false", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the item is disabled", default: "false", optional: true },
  { name: "initialOpen", type: "boolean", description: "Whether the submenu is initially open", default: "false", optional: true },
  { name: "divider", type: "boolean", description: "Whether to show a visual divider below this item", default: "false", optional: true },
  { name: "icon", type: "string|undefined", description: "Icon name to render before the menu item text", optional: true },
  { name: "value", type: "any", description: "Value associated with this menu item", default: "{}", optional: true },
];
</script>

<script lang="ts">
import { type Component, getContext } from "svelte";
import Icon from "../../Icon/Icon.svelte";
import MenuItemSelf from "./MenuItem.svelte";

/** Self-reference for recursive children (typed loosely to allow partial props) */
const Self = MenuItemSelf as unknown as Component<{ value: Record<string, unknown> }>;

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string|undefined} - ARIA label */
  ariaLabel = undefined,

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

  /** @type {string|undefined} - Icon name to render before the menu item text */
  icon = undefined,

  /** @type {any} - Value associated with this menu item */
  value = {},

  children = undefined,
  ...restProps
} = $props()

let isOpen = $state(false)

$effect(() => {
  isOpen = initialOpen
})

const toggleMenu = () => {
  isOpen = !isOpen
}
</script>

<li {...restProps} role="none">
  <svelte:element
    this={href ? 'a' : 'span'}
    {href}
    {id}
    class="menu-item {className}"
    class:active
    class:disabled
    class:divider
    role="menuitem"
    tabindex="-1"
    aria-label={ariaLabel}
    aria-disabled={disabled}
    onclick={() => !disabled && toggleMenu()}
  >
    {#if icon}
      <Icon name={icon} class="inline-block w-4 h-4 mr-2 align-middle text-muted" />
    {/if}
    {@render children?.()}
    {#if (value as { children?: unknown[] })?.children}
      <ul class="menu-item-submenu" class:hidden={!isOpen} role="menu">
        {#each (value as { children: unknown[] }).children as child}
          <Self value={child as Record<string, unknown>} />
        {/each}
      </ul>
    {/if}
  </svelte:element>
</li>

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
