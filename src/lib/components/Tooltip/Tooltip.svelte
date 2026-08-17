<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "content", type: "string", description: "Plain-text tooltip content", default: "\"\"", optional: true },
  { name: "position", type: "string", description: "Position of the tooltip relative to the trigger (top, right, bottom, left)", default: "\"top\"", optional: true },
  { name: "delay", type: "number", description: "Delay in milliseconds before showing the tooltip", default: "0", optional: true },
  { name: "duration", type: "number", description: "Time in milliseconds before auto-hiding (0 disables)", default: "0", optional: true },
  { name: "arrow", type: "boolean", description: "Whether to show the arrow", default: "true", optional: true },
  { name: "offset", type: "number", description: "Distance in pixels between the tooltip and its trigger", default: "8", optional: true },
  { name: "showOnFocus", type: "boolean", description: "Whether to show the tooltip when the trigger receives focus", default: "true", optional: true },
  { name: "ariaDescription", type: "string", description: "ARIA description for the trigger", optional: true },
  { name: "onshow", type: "(event: CustomEvent) => void", description: "Callback fired when the tooltip is shown", optional: true, eventDetail: "unknown" },
  { name: "onhide", type: "(event: CustomEvent) => void", description: "Callback fired when the tooltip is hidden", optional: true, eventDetail: "unknown" },
  { name: "tooltipContent", type: "import(\"svelte\").Snippet", description: "Snippet rendered as the tooltip content (overrides `content`)", optional: true },
];
</script>

<script lang="ts">
/**
 * @component
 * Tooltip - A component for displaying additional information when hovering or focusing on an element.
 * Provides accessible, configurable tooltips with various positions and styles.
 *
 * Usage:
 * ```svelte
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 *
 * <Tooltip position="bottom" delay={300}>
 *   <svelte:fragment slot="content">
 *     <strong>Custom tooltip</strong> with HTML content
 *   </svelte:fragment>
 *   <span>Hover for more info</span>
 * </Tooltip>
 * ```
 */
import { onMount } from "svelte"
import { fade } from "svelte/transition"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Plain-text tooltip content */
  content = "",

  /** @type {string} - Position of the tooltip relative to the trigger (top, right, bottom, left) */
  position = "top",

  /** @type {number} - Delay in milliseconds before showing the tooltip */
  delay = 0,

  /** @type {number} - Time in milliseconds before auto-hiding (0 disables) */
  duration = 0,

  /** @type {boolean} - Whether to show the arrow */
  arrow = true,

  /** @type {number} - Distance in pixels between the tooltip and its trigger */
  offset = 8,

  /** @type {boolean} - Whether to show the tooltip when the trigger receives focus */
  showOnFocus = true,

  /** @type {string} - ARIA description for the trigger */
  ariaDescription = undefined,

  /** @type {(event: CustomEvent) => void} - Callback fired when the tooltip is shown */
  onshow = undefined,

  /** @type {(event: CustomEvent) => void} - Callback fired when the tooltip is hidden */
  onhide = undefined,

  children = undefined,

  /** @type {import("svelte").Snippet} - Snippet rendered as the tooltip content (overrides `content`) */
  tooltipContent = undefined,
} = $props()

// Tooltip state
let isVisible = $state(false)
let triggerElement: HTMLElement | undefined = $state()
let tooltipElement: HTMLElement | undefined = $state()
let showTimeout: ReturnType<typeof setTimeout> | null = $state(null)
let hideTimeout: ReturnType<typeof setTimeout> | null = $state(null)

// Position state
let tooltipPosition = $state({
  top: 0,
  left: 0,
})

/**
 * Shows the tooltip
 */
function showTooltip(): void {
  if (hideTimeout !== null) clearTimeout(hideTimeout)

  if (delay > 0) {
    showTimeout = setTimeout(() => {
      isVisible = true
      updatePosition()
      onshow?.(new CustomEvent("show"))

      // Auto-hide after duration if specified
      if (duration > 0) {
        hideTimeout = setTimeout(hideTooltip, duration)
      }
    }, delay)
  } else {
    isVisible = true
    updatePosition()
    onshow?.(new CustomEvent("show"))

    // Auto-hide after duration if specified
    if (duration > 0) {
      hideTimeout = setTimeout(hideTooltip, duration)
    }
  }
}

/**
 * Hides the tooltip
 */
function hideTooltip(): void {
  if (showTimeout !== null) clearTimeout(showTimeout)
  isVisible = false
  onhide?.(new CustomEvent("hide"))
}

/**
 * Updates the tooltip position based on trigger element
 */
function updatePosition(): void {
  if (!triggerElement || !tooltipElement) return

  // Get element dimensions and positions
  const triggerRect = (triggerElement as HTMLElement).getBoundingClientRect()
  const tooltipRect = (tooltipElement as HTMLElement).getBoundingClientRect()

  // Calculate position based on specified position
  let top = 0
  let left = 0

  switch (position) {
    case "top":
      top = triggerRect.top - tooltipRect.height - offset
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
      break
    case "right":
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
      left = triggerRect.right + offset
      break
    case "bottom":
      top = triggerRect.bottom + offset
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
      break
    case "left":
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
      left = triggerRect.left - tooltipRect.width - offset
      break
    default:
      // Default to top
      top = triggerRect.top - tooltipRect.height - offset
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
  }

  // Adjust for scroll position
  top += window.scrollY
  left += window.scrollX

  // Ensure tooltip stays within viewport
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // Adjust horizontal position if needed
  if (left < 10) {
    left = 10
  } else if (left + tooltipRect.width > viewportWidth - 10) {
    left = viewportWidth - tooltipRect.width - 10
  }

  // Adjust vertical position if needed
  if (top < 10) {
    top = 10
  } else if (top + tooltipRect.height > viewportHeight - 10) {
    top = viewportHeight - tooltipRect.height - 10
  }

  // Update position state
  tooltipPosition = { top, left }
}

// Event handlers
function handleMouseEnter(): void {
  showTooltip()
}

function handleMouseLeave(): void {
  hideTooltip()
}

function handleFocus(): void {
  if (showOnFocus) {
    showTooltip()
  }
}

function handleBlur(): void {
  hideTooltip()
}

// Clean up timers on unmount
onMount(() => {
  return () => {
    if (showTimeout !== null) clearTimeout(showTimeout)
    if (hideTimeout !== null) clearTimeout(hideTimeout)
  }
})
</script>

<div class="tooltip-wrapper {className}">
  <!-- Trigger element -->
  <div
    class="tooltip-trigger"
    role="button"
    tabindex="0"
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    onfocus={handleFocus}
    onblur={handleBlur}
    bind:this={triggerElement}
    aria-describedby={isVisible ? `${id}-tooltip` : undefined}
  >
    {@render children?.()}
  </div>
  
  <!-- Tooltip -->
  {#if isVisible}
    <div
      id="{id}-tooltip"
      class="tooltip tooltip-{position} {arrow ? 'tooltip-arrow' : ''}"
      style="top: {tooltipPosition.top}px; left: {tooltipPosition.left}px;"
      role="tooltip"
      bind:this={tooltipElement}
      transition:fade={{ duration: 200 }}
    >
      {#if tooltipContent}
        {@render tooltipContent()}
      {:else}
        {content}
      {/if}
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .tooltip-wrapper {
    @apply inline-block relative;
  }
  
  .tooltip-trigger {
    @apply inline-block;
  }
  
  .tooltip {
    @apply fixed z-50 max-w-xs;
    @apply bg-surface dark:bg-surface text-text dark:text-text;
    @apply border border-border dark:border-border rounded-md shadow-md;
    @apply px-3 py-2 text-sm;
  }
  
  /* Arrow styles */
  .tooltip-arrow::before {
    @apply content-[''] absolute w-2 h-2 rotate-45;
    @apply bg-surface dark:bg-surface border border-border dark:border-border;
  }
  
  .tooltip-top.tooltip-arrow::before {
    @apply -bottom-1 left-1/2 -ml-1;
    @apply border-b border-r;
  }
  
  .tooltip-right.tooltip-arrow::before {
    @apply -left-1 top-1/2 -mt-1;
    @apply border-l border-t;
  }
  
  .tooltip-bottom.tooltip-arrow::before {
    @apply -top-1 left-1/2 -ml-1;
    @apply border-t border-l;
  }
  
  .tooltip-left.tooltip-arrow::before {
    @apply -right-1 top-1/2 -mt-1;
    @apply border-r border-b;
  }
</style>
