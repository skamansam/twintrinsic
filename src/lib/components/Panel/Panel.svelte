<!--
@component
Panel - A collapsible container with header and content sections.
Provides smooth animations and keyboard accessibility.

Usage:
```svelte
<Panel>
  <svelte:fragment slot="header">Panel Title</svelte:fragment>
  Content goes here
</Panel>

<Panel expanded={false} class="custom-class">
  <svelte:fragment slot="header">
    <Icon name="settings" />
    Settings
  </svelte:fragment>
  Settings content
</Panel>
```
-->
<script>
import { slide } from "svelte/transition"
import { createEventDispatcher } from "svelte"

const {
  /** @type {boolean} - Whether the panel is expanded */
  expanded = true,

  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - ARIA label for the header button */
  ariaLabel,

  /** @type {boolean} - Whether to disable the panel controls */
  disabled = false,

  /** @type {boolean} - Whether to show a border */
  bordered = true,

  /** @type {boolean} - Whether to show the expand/collapse icon */
  showIcon = true,

  children,
  header,
} = $props()

const dispatch = createEventDispatcher()
let isExpanded = $state(expanded)

// Internal state
let headerEl
let contentEl

// Handle toggle
function handleToggle() {
  if (!disabled) {
    isExpanded = !isExpanded
    dispatch("toggle", { expanded: isExpanded })
  }
}

// Handle keyboard navigation
function handleKeydown(event) {
  if (disabled) return

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault()
    handleToggle()
  }
}
</script>

<div 
  class="panel {bordered ? 'border border-border dark:border-border rounded-lg' : ''} {className}"
  class:disabled
>
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
      {bordered ? 'rounded-t-lg' : 'rounded-lg'}
    "
    aria-expanded={isExpanded}
    aria-controls="{id}-content"
    aria-label={ariaLabel}
    {disabled}
    onclick={handleToggle}
    onkeydown={handleKeydown}
    bind:this={headerEl}
  >
    <div class="flex items-center gap-2">
      {#if header}
        {@render header()}
      {:else}
        Panel
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

  {#if isExpanded}
    <div
      id="{id}-content"
      class="px-4 py-3 bg-background dark:bg-background text-text dark:text-text {bordered ? 'rounded-b-lg' : ''}"
      role="region"
      aria-labelledby="{id}-header"
      transition:slide={{ duration: 200 }}
      bind:this={contentEl}
    >
      {@render children?.()}
    </div>
  {/if}
</div>

<style>
  @reference "../../twintrinsic.css";
  /* Base styles that work with Tailwind */
  .panel {
    @apply overflow-hidden;
  }

  .panel.disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  /* Ensure the content area has proper spacing when collapsed */
  .panel :global(.svelte-collapse-content) {
    @apply overflow-hidden;
  }
</style>
