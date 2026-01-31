<!--
@component
BreadcrumbItem - An individual item within a Breadcrumb component.
Renders as a link when href is provided, otherwise as a span for the current page.

Usage:
```svelte
<BreadcrumbItem href="/">Home</BreadcrumbItem>

<BreadcrumbItem href="/products" icon="<svg>...</svg>">
  Products
</BreadcrumbItem>

<BreadcrumbItem>Current Page</BreadcrumbItem>
```
-->
<script lang="ts">
import { getContext, onMount } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - Link URL (if item is a link) */
  href,

  /** @type {string} - Link target (_blank, _self, etc.) */
  target,

  /** @type {string} - Icon to display (HTML or SVG string) */
  icon,

  /** @type {boolean} - Whether this is the current/active page */
  current = false,

  /** @type {boolean} - Whether this item should be hidden when collapsed */
  collapsible = true,

  children,
} = $props()

// Get breadcrumb context
const breadcrumbContext = getContext("breadcrumb")

// Get separator from context
const separator = breadcrumbContext?.separator || "/"

// Component state
let itemElement
let index = $state(-1)
let isVisible = $state(true)

// Register with parent on mount
onMount(() => {
  if (itemElement) {
    // Find our index among siblings
    const parent = itemElement.parentElement
    if (parent) {
      const items = Array.from(parent.children)
      index = items.indexOf(itemElement)

      // Check if we should be visible based on collapsible settings
      if (breadcrumbContext?.collapsible && collapsible) {
        const maxVisible = breadcrumbContext.maxVisibleItems || 1
        const totalItems = items.length

        // Always show first and last items
        if (index === 0 || index === totalItems - 1) {
          isVisible = true
        } else {
          // For middle items, only show up to maxVisible
          const middleItems = totalItems - 2 // excluding first and last

          if (middleItems <= maxVisible) {
            // If we have fewer middle items than max, show all
            isVisible = true
          } else {
            // Otherwise, only show the first maxVisible middle items
            isVisible = index <= maxVisible
          }
        }
      }
    }
  }
})

// Determine if this is the last item
const isLast = $derived(index === -1 || !itemElement?.nextElementSibling)

// Determine if this is the current page
const isCurrent = $derived(current || isLast)
</script>

<li 
  class="
    breadcrumb-item
    {isCurrent ? 'breadcrumb-item-current' : ''}
    {isVisible ? '' : 'breadcrumb-item-hidden'}
    {className}
  "
  aria-current={isCurrent ? 'page' : undefined}
  bind:this={itemElement}
>
  {#if href && !isCurrent}
    <a 
      {href}
      {target}
      class="breadcrumb-link"
    >
      {#if icon}
        <span class="breadcrumb-icon" aria-hidden="true">
          {@html icon}
        </span>
      {/if}
      <span class="breadcrumb-text">
        {@render children?.()}
      </span>
    </a>
  {:else}
    <span class="breadcrumb-text">
      {#if icon}
        <span class="breadcrumb-icon" aria-hidden="true">
          {@html icon}
        </span>
      {/if}
      {@render children?.()}
    </span>
  {/if}
  
  {#if !isLast}
    <span class="breadcrumb-separator" aria-hidden="true">
      {@html separator}
    </span>
  {/if}
</li>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .breadcrumb-item {
    @apply flex items-center;
  }
  
  .breadcrumb-item-hidden {
    @apply hidden;
  }
  
  .breadcrumb-link {
    @apply inline-flex items-center;
    @apply text-primary-600 dark:text-primary-400;
    @apply hover:text-primary-700 dark:hover:text-primary-300 hover:underline;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 rounded-sm;
    @apply transition-colors duration-150;
  }
  
  .breadcrumb-text {
    @apply inline-flex items-center;
  }
  
  .breadcrumb-item-current .breadcrumb-text {
    @apply font-medium text-text dark:text-text;
  }
  
  .breadcrumb-separator {
    @apply mx-2 text-muted dark:text-muted;
  }
  
  .breadcrumb-icon {
    @apply mr-1 w-4 h-4;
  }
</style>
