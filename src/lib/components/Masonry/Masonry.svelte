<!--
@component
Masonry - A component for creating Pinterest-style grid layouts.
Provides responsive, dynamic layouts for items of varying heights.

Usage:
```svelte
<Masonry columns={3} gap={16}>
  <div>Item 1 with some content</div>
  <div>Item 2 with more content that might be taller</div>
  <div>Item 3 with less content</div>
  <div>Item 4 with a different height</div>
</Masonry>

<Masonry 
  columns={{ default: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
  gap={20}
  columnWidth="300px"
>
  {#each items as item}
    <div>{item.content}</div>
  {/each}
</Masonry>
```
-->
<script>
import { onMount, onDestroy } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {number|Object} - Number of columns or responsive breakpoints object */
  columns = 3,

  /** @type {number} - Gap between items in pixels */
  gap = 16,

  /** @type {string} - Fixed column width (overrides columns) */
  columnWidth,

  /** @type {boolean} - Whether to center the grid */
  centered = false,

  /** @type {boolean} - Whether to animate item positions */
  animated = true,

  /** @type {number} - Animation duration in milliseconds */
  animationDuration = 300,

  /** @type {string} - Animation easing function */
  animationEasing = "ease-out",

  /** @type {string} - ARIA label for the grid */
  ariaLabel = "Masonry grid",

  children,
} = $props()

// Component state
let containerElement = $state()
let items = $state([])
let columnCount = $state(3)
let columnHeights = $state([])
let resizeObserver = $state()
let mutationObserver = $state()
let itemObservers = $state([])

// Initialize column count based on columns prop
$effect(() => {
  columnCount = typeof columns === "number" ? columns : 3
})

/**
 * Initializes the masonry layout
 */
function initLayout() {
  if (!containerElement) return

  // Determine column count based on container width and breakpoints
  if (typeof columns === "object") {
    const containerWidth = containerElement.offsetWidth
    const breakpoints = {
      default: 1,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
      ...columns,
    }

    // Sort breakpoints by size (descending)
    const sortedBreakpoints = Object.entries(breakpoints)
      .filter(([key]) => key !== "default")
      .sort((a, b) => b[1] - a[1])

    // Find the first breakpoint that matches
    let matchedColumns = breakpoints.default
    for (const [key, width] of sortedBreakpoints) {
      if (containerWidth >= width) {
        matchedColumns = columns[key]
        break
      }
    }

    columnCount = matchedColumns
  } else if (columnWidth) {
    // Calculate column count based on fixed column width
    const containerWidth = containerElement.offsetWidth
    columnCount = Math.max(1, Math.floor(containerWidth / parseInt(columnWidth)))
  } else {
    columnCount = columns
  }

  // Initialize column heights
  columnHeights = Array(columnCount).fill(0)

  // Position items
  positionItems()
}

/**
 * Positions items in the masonry layout
 */
function positionItems() {
  if (!containerElement || !items.length) return

  // Reset column heights
  columnHeights = Array(columnCount).fill(0)

  // Calculate column width
  const containerWidth = containerElement.offsetWidth
  const colWidth = (containerWidth - gap * (columnCount - 1)) / columnCount

  // Position each item
  items.forEach((item, index) => {
    // Find the shortest column
    const shortestCol = columnHeights.indexOf(Math.min(...columnHeights))

    // Calculate position
    const left = shortestCol * (colWidth + gap)
    const top = columnHeights[shortestCol]

    // Update item style
    const itemStyle = item.style
    itemStyle.width = `${colWidth}px`
    itemStyle.left = `${left}px`
    itemStyle.top = `${top}px`

    // Add transition if animated
    if (animated) {
      itemStyle.transition = `transform ${animationDuration}ms ${animationEasing}, opacity ${animationDuration}ms ${animationEasing}`
      itemStyle.transform = "translate3d(0, 0, 0)"
      itemStyle.opacity = "1"
    }

    // Update column height
    columnHeights[shortestCol] += item.offsetHeight + gap
  })

  // Update container height
  const maxHeight = Math.max(...columnHeights) - gap
  containerElement.style.height = `${maxHeight}px`
}

/**
 * Observes changes to item dimensions
 */
function observeItems() {
  // Clean up existing observers
  itemObservers.forEach((observer) => observer.disconnect())
  itemObservers = []

  // Create new observers for each item
  items.forEach((item) => {
    const observer = new ResizeObserver(() => {
      // Reposition items when an item's size changes
      positionItems()
    })

    observer.observe(item)
    itemObservers.push(observer)
  })
}

// Initialize layout on mount
onMount(() => {
  if (containerElement) {
    // Get all immediate children
    items = Array.from(containerElement.children)

    // Set initial styles
    items.forEach((item) => {
      item.style.position = "absolute"
      if (animated) {
        item.style.opacity = "0"
        item.style.transform = "translate3d(0, 20px, 0)"
      }
    })

    // Initialize layout
    initLayout()

    // Observe container resize
    resizeObserver = new ResizeObserver(() => {
      initLayout()
    })
    resizeObserver.observe(containerElement)

    // Observe DOM changes (added/removed items)
    mutationObserver = new MutationObserver((mutations) => {
      let needsUpdate = false

      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          if (mutation.addedNodes.length || mutation.removedNodes.length) {
            needsUpdate = true
          }
        }
      })

      if (needsUpdate) {
        items = Array.from(containerElement.children)

        // Set styles for new items
        items.forEach((item) => {
          if (!item.style.position) {
            item.style.position = "absolute"
            if (animated) {
              item.style.opacity = "0"
              item.style.transform = "translate3d(0, 20px, 0)"
            }
          }
        })

        initLayout()
        observeItems()
      }
    })

    mutationObserver.observe(containerElement, {
      childList: true,
    })

    // Observe item size changes
    observeItems()
  }

  return () => {
    // Clean up observers on destroy
    if (resizeObserver) {
      resizeObserver.disconnect()
    }

    if (mutationObserver) {
      mutationObserver.disconnect()
    }

    itemObservers.forEach((observer) => observer.disconnect())
  }
})
</script>

<div
  {id}
  class="
    masonry
    {centered ? 'masonry-centered' : ''}
    {className}
  "
  style="--masonry-gap: {gap}px;"
  role="grid"
  aria-label={ariaLabel}
  bind:this={containerElement}
>
  {@render children?.()}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .masonry {
    @apply relative w-full;
    min-height: 100px;
  }
  
  .masonry-centered {
    @apply mx-auto;
  }
  
  .masonry > :global(*) {
    @apply box-border;
    margin-bottom: var(--masonry-gap);
  }
</style>
