<script lang="ts">
/**
 * @component
 * Tabs - A component for organizing content into tabbed sections.
 * Provides accessible tab navigation with keyboard support and various styling options.
 *
 * Usage:
 * ```svelte
 * <Tabs>
 *   <TabList>
 *     <Tab>First Tab</Tab>
 *     <Tab>Second Tab</Tab>
 *     <Tab>Third Tab</Tab>
 *   </TabList>
 *   
 *   <TabPanel>First tab content</TabPanel>
 *   <TabPanel>Second tab content</TabPanel>
 *   <TabPanel>Third tab content</TabPanel>
 * </Tabs>
 * ```
 */
import { setContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {number} - Index of the initially selected tab */
  defaultIndex = 0,

  /** @type {string} - Tab variant (default, underline, pills, enclosed) */
  variant = "default",

  /** @type {string} - Tab size (sm, md, lg) */
  size = "md",

  /** @type {boolean} - Whether to make tabs take full width */
  fullWidth = false,

  /** @type {boolean} - Whether to center the tabs */
  centered = false,

  /** @type {boolean} - Whether tabs are disabled */
  disabled = false,

  /** @type {string} - ARIA label for the tablist */
  ariaLabel = "Tabs",

  /** @type {(event: CustomEvent) => void} - Change event handler */
  onchange,

  children,
} = $props()

// Derived values for reactive prop access in closures
const derivedDefaultIndex = $derived(defaultIndex)

// Tabs state
let selectedIndex = $state(derivedDefaultIndex)
let tabsCount = $state(0)
let tabsRefs = $state([])
let panelsRefs = $state([])

// Sync selectedIndex when defaultIndex changes
$effect(() => {
  selectedIndex = derivedDefaultIndex
})

/**
 * Selects a tab by index
 * @param {number} index - Tab index to select
 */
function selectTab(index) {
  if (index < 0 || index >= tabsCount || disabled) return

  selectedIndex = index
  onchange?.(new CustomEvent("change", { detail: { index, tab: tabsRefs[index], panel: panelsRefs[index] } }))
}

/**
 * Handles keyboard navigation
 * @param {KeyboardEvent} event - Keydown event
 * @param {number} index - Current tab index
 */
function handleKeydown(event, index) {
  if (disabled) return

  let newIndex

  switch (event.key) {
    case "ArrowLeft":
      event.preventDefault()
      newIndex = index - 1
      if (newIndex < 0) newIndex = tabsCount - 1 // Wrap to last tab
      selectTab(newIndex)
      tabsRefs[newIndex]?.focus()
      break

    case "ArrowRight":
      event.preventDefault()
      newIndex = index + 1
      if (newIndex >= tabsCount) newIndex = 0 // Wrap to first tab
      selectTab(newIndex)
      tabsRefs[newIndex]?.focus()
      break

    case "Home":
      event.preventDefault()
      selectTab(0)
      tabsRefs[0]?.focus()
      break

    case "End":
      event.preventDefault()
      newIndex = tabsCount - 1
      selectTab(newIndex)
      tabsRefs[newIndex]?.focus()
      break
  }
}

/**
 * Registers a tab
 * @param {HTMLElement} tabElement - Tab element reference
 * @returns {number} - Tab index
 */
function registerTab(tabElement) {
  const index = tabsRefs.length
  tabsRefs = [...tabsRefs, tabElement]
  tabsCount = tabsRefs.length
  return index
}

/**
 * Registers a panel
 * @param {HTMLElement} panelElement - Panel element reference
 * @returns {number} - Panel index
 */
function registerPanel(panelElement) {
  const index = panelsRefs.length
  panelsRefs = [...panelsRefs, panelElement]
  return index
}

// Provide context for child components
$effect(() => {
  setContext("tabs", {
    selectedIndex: () => selectedIndex,
    registerTab,
    registerPanel,
    selectTab,
    handleKeydown,
    disabled: () => disabled,
    variant,
    size,
    fullWidth,
    centered,
  })
})

// Determine variant classes
const variantClasses = $derived(
  {
    default: "tabs-default",
    underline: "tabs-underline",
    pills: "tabs-pills",
    enclosed: "tabs-enclosed",
  }[variant] || "tabs-default"
)

// Determine size classes
const sizeClasses = $derived(
  {
    sm: "tabs-sm",
    md: "tabs-md",
    lg: "tabs-lg",
  }[size] || "tabs-md"
)
</script>

<div 
  {id}
  class="
    tabs
    {variantClasses}
    {sizeClasses}
    {fullWidth ? 'tabs-full-width' : ''}
    {centered ? 'tabs-centered' : ''}
    {disabled ? 'tabs-disabled' : ''}
    {className}
  "
>
  {@render children?.()}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .tabs {
    @apply w-full;
  }
  
  .tabs-disabled {
    @apply opacity-60 pointer-events-none;
  }
  
  /* Size variants */
  .tabs-sm :global(.tab) {
    @apply text-sm py-1 px-2;
  }
  
  .tabs-md :global(.tab) {
    @apply text-base py-2 px-3;
  }
  
  .tabs-lg :global(.tab) {
    @apply text-lg py-3 px-4;
  }
  
  /* Layout variants */
  .tabs-full-width :global(.tab-list) {
    @apply w-full;
  }
  
  .tabs-full-width :global(.tab) {
    @apply flex-1;
  }
  
  .tabs-centered :global(.tab-list) {
    @apply justify-center;
  }
  
  /* Style variants */
  .tabs-default :global(.tab) {
    @apply border-b-2 border-transparent;
    @apply hover:border-border dark:hover:border-border;
    @apply hover:text-text dark:hover:text-text;
  }
  
  .tabs-default :global(.tab[aria-selected="true"]) {
    @apply border-b-2 border-primary-500 dark:border-primary-400;
    @apply text-primary-700 dark:text-primary-300;
  }
  
  .tabs-underline :global(.tab-list) {
    @apply border-b border-border dark:border-border;
  }
  
  .tabs-underline :global(.tab) {
    @apply border-b-2 border-transparent -mb-px;
    @apply hover:border-border dark:hover:border-border;
    @apply hover:text-text dark:hover:text-text;
  }
  
  .tabs-underline :global(.tab[aria-selected="true"]) {
    @apply border-b-2 border-primary-500 dark:border-primary-400;
    @apply text-primary-700 dark:text-primary-300;
  }
  
  .tabs-pills :global(.tab) {
    @apply rounded-md;
    @apply hover:bg-hover dark:hover:bg-hover;
    @apply hover:text-text dark:hover:text-text;
  }
  
  .tabs-pills :global(.tab[aria-selected="true"]) {
    @apply bg-primary-500 dark:bg-primary-500;
    @apply text-white dark:text-white;
  }
  
  .tabs-enclosed :global(.tab-list) {
    @apply p-1 bg-surface dark:bg-surface rounded-md;
    @apply border border-border dark:border-border;
  }
  
  .tabs-enclosed :global(.tab) {
    @apply rounded-md;
    @apply hover:bg-hover dark:hover:bg-hover;
    @apply hover:text-text dark:hover:text-text;
  }
  
  .tabs-enclosed :global(.tab[aria-selected="true"]) {
    @apply bg-background dark:bg-background;
    @apply text-text dark:text-text;
    @apply shadow-sm;
  }
</style>
