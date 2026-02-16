<!--
@component
Tab - An individual tab button within a TabList component.
Provides the clickable interface for selecting tab panels.

Usage:
```svelte
<Tab>Tab Label</Tab>

<Tab disabled>Disabled Tab</Tab>

<Tab icon="<svg>...</svg>">
  Tab with Icon
</Tab>
```
-->
<script lang="ts">
import { getContext, onMount } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id,

  /** @type {boolean} - Whether the tab is disabled */
  disabled = false,

  /** @type {string} - Icon to display (HTML or SVG string) */
  icon,

  /** @type {string} - Icon position (left or right) */
  iconPosition = "left",

  children,
} = $props()

// Get tabs context
const tabsContext = getContext("tabs") as { registerTab?: (element: HTMLElement) => number; selectedIndex?: () => number; disabled?: () => boolean; selectTab?: (index: number) => void; handleKeydown?: (event: KeyboardEvent, index: number) => void } | undefined

if (!tabsContext) {
  throw new Error("Tab must be used within a Tabs component")
}

// Tab state
let tabElement: HTMLButtonElement | undefined
let index = -1

// Register tab on mount
onMount(() => {
  if (tabElement && tabsContext?.registerTab) {
    index = tabsContext.registerTab(tabElement)
  }

  return () => {
    // Cleanup if needed
  }
})

// Determine if this tab is selected
const isSelected = $derived((tabsContext?.selectedIndex ? tabsContext.selectedIndex() : -1) === index)

// Determine if tabs are disabled from parent
const isDisabled = $derived(disabled || (tabsContext?.disabled ? tabsContext.disabled() : false))

/**
 * Handles tab click
 */
function handleClick(): void {
  if (isDisabled) return

  if (tabsContext?.selectTab) {
    tabsContext.selectTab(index)
  }
}

/**
 * Handles tab keydown
 * @param {KeyboardEvent} event - Keydown event
 */
function handleKeydown(event: KeyboardEvent): void {
  if (isDisabled) return

  if (tabsContext?.handleKeydown) {
    tabsContext.handleKeydown(event, index)
  }
}

// Derived values for reactive prop access in closures
const derivedId = $derived(id)

// Generate unique ID if not provided
const tabId = derivedId || `tab-${crypto.randomUUID()}`

// Panel ID for aria-controls
const panelId = $derived(`panel-${tabId}`)
</script>

<button
  id={tabId}
  class="tab {className}"
  role="tab"
  aria-selected={isSelected}
  aria-controls={panelId}
  tabindex={isSelected ? 0 : -1}
  {disabled}
  onclick={handleClick}
  onkeydown={handleKeydown}
  bind:this={tabElement}
>
  {#if icon && iconPosition === 'left'}
    <span class="tab-icon tab-icon-left" aria-hidden="true">
      {@html icon}
    </span>
  {/if}
  
  <span class="tab-content">
    {@render children?.()}
  </span>
  
  {#if icon && iconPosition === 'right'}
    <span class="tab-icon tab-icon-right" aria-hidden="true">
      {@html icon}
    </span>
  {/if}
</button>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .tab {
    @apply inline-flex items-center justify-center;
    @apply font-medium text-muted dark:text-muted;
    @apply transition-colors duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
    @apply whitespace-nowrap;
  }
  
  .tab-content {
    @apply flex-grow;
  }
  
  .tab-icon-left {
    @apply mr-2;
  }
  
  .tab-icon-right {
    @apply ml-2;
  }
</style>
