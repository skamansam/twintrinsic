<!--
@component
AccordionItem - Individual item within an Accordion component.
Provides collapsible content with header and smooth animations.

Usage:
```svelte
<AccordionItem>
  <svelte:fragment slot="header">Section Title</svelte:fragment>
  Content goes here
</AccordionItem>
```
-->
<script>
import { slide } from "svelte/transition"
import { getContext, onMount } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - ARIA label for the header button */
  ariaLabel,

  /** @type {boolean} - Whether to disable the item controls */
  disabled = false,

  /** @type {boolean} - Whether to show the expand/collapse icon */
  showIcon = true,

  children,
  header,
} = $props()

// Get accordion context
const accordion = getContext("accordion")

// Track expanded state
let isExpanded = $state(false)
let index = $state(-1)

// Register with parent accordion on mount
onMount(() => {
  // Find our index among siblings
  const parent = element.parentElement
  if (parent) {
    const items = Array.from(parent.children)
    index = items.indexOf(element)

    // Check if we should be expanded initially
    isExpanded = accordion.registerItem(id, index)
  }

  return () => {
    // Cleanup if needed
  }
})

// Handle toggle
function handleToggle() {
  if (disabled) return

  isExpanded = !isExpanded
  accordion.toggleItem(index, isExpanded)
}

// Handle keyboard navigation
function handleKeydown(event) {
  if (disabled) return

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault()
    handleToggle()
  }
}

// Reference to the element
let element = $state()
let contentEl = $state()
</script>

<div 
  class="accordion-item {className}"
  class:disabled
  bind:this={element}
>
  <h3>
    <button
      type="button"
      id="{id}-header"
      class="
        w-full flex items-center justify-between
        px-4 py-3
        text-left
        bg-surface dark:bg-surface
        hover:bg-hover dark:hover:bg-hover
        focus:outline-none focus:ring-2 focus:ring-focus-ring dark:focus:ring-focus-ring
        disabled:opacity-50 disabled:cursor-not-allowed
        text-text dark:text-text
      "
      aria-expanded={isExpanded}
      aria-controls="{id}-content"
      aria-label={ariaLabel}
      {disabled}
      onclick={handleToggle}
      onkeydown={handleKeydown}
    >
      <div class="flex items-center gap-2">
        {#if header}
          {@render header()}
        {:else}
          Item
        {/if}
      </div>

      {#if showIcon}
        <svg
          class="w-5 h-5 transform transition-transform duration-200 text-muted dark:text-muted {isExpanded ? 'rotate-180' : ''}"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      {/if}
    </button>
  </h3>

  {#if isExpanded}
    <div
      id="{id}-content"
      class="px-4 py-3 bg-background dark:bg-background text-text dark:text-text"
      role="region"
      aria-labelledby="{id}-header"
      transition:slide={{ duration: 200 }}
      bind:this={contentEl}
    >
      {@render children?.()}
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .accordion-item {
    @apply overflow-hidden;
  }

  .accordion-item.disabled {
    @apply opacity-50 cursor-not-allowed;
  }
</style>
