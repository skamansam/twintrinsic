<!--
@component
Skeleton - A component for displaying loading placeholders.
Provides consistent styling, accessibility features, and various shapes for content loading states.

Usage:
```svelte
<Skeleton width="100%" height="20px" />

<Skeleton variant="circle" size="40px" />

<Skeleton variant="text" lines={3} />

<div class="flex gap-4">
  <Skeleton variant="circle" size="48px" />
  <div class="flex-1">
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="80%" />
  </div>
</div>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "variant", type: "string", description: "Shape variant (text, rectangle, circle, rounded)", default: "\"rectangle\"", optional: true },
  { name: "width", type: "string|number", description: "Width of the skeleton", default: "\"100%\"", optional: true },
  { name: "height", type: "string|number", description: "Height of the skeleton", optional: true },
  { name: "size", type: "string|number", description: "Size for circle and square variants (sets both width and height)", optional: true },
  { name: "lines", type: "number", description: "Number of lines for text variant", default: "1", optional: true },
  { name: "animated", type: "boolean", description: "Whether to show the animation", default: "true", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for accessibility", default: "\"Loading content\"", optional: true },
];
</script>

<script lang="ts">
const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Shape variant (text, rectangle, circle, rounded) */
  variant = "rectangle",

  /** @type {string|number} - Width of the skeleton */
  width = "100%",

  /** @type {string|number} - Height of the skeleton */
  height = undefined,

  /** @type {string|number} - Size for circle and square variants (sets both width and height) */
  size = undefined,

  /** @type {number} - Number of lines for text variant */
  lines = 1,

  /** @type {boolean} - Whether to show the animation */
  animated = true,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel = "Loading content",
} = $props()

// Determine height based on variant
const computedHeight = $derived(
  (() => {
    if (height) return height
    if (size) return size

    return (
      {
        text: "1em",
        rectangle: "100px",
        circle: "40px",
        rounded: "40px",
      }[variant] || "100px"
    )
  })()
)

// Determine width based on variant
const computedWidth = $derived(
  (() => {
    if (width) return width
    if (size) return size
    if (variant === "circle") return computedHeight

    return "100%"
  })()
)

// Determine border radius based on variant
const borderRadius = $derived(
  {
    text: "4px",
    rectangle: "0",
    circle: "50%",
    rounded: "8px",
  }[variant] || "0"
)

// Generate array for multiple lines
const lineArray = $derived(Array.from({ length: lines }))

// Determine if we should render multiple lines
const isMultiLine = $derived(variant === "text" && lines > 1)
</script>

{#if isMultiLine}
  <div 
    {id}
    class="skeleton-group {className}"
    role="status"
    aria-label={ariaLabel}
  >
    {#each lineArray as _, i}
      <div
        class="
          skeleton
          skeleton-{variant}
          {animated ? 'skeleton-animated' : ''}
        "
        style="
          width: {i === lineArray.length - 1 && lineArray.length > 1 ? '80%' : computedWidth};
          height: {computedHeight};
          border-radius: {borderRadius};
          margin-bottom: {i === lineArray.length - 1 ? '0' : '0.5rem'};
        "
        aria-hidden="true"
      ></div>
    {/each}
    <span class="sr-only">{ariaLabel}</span>
  </div>
{:else}
  <div
    {id}
    class="
      skeleton
      skeleton-{variant}
      {animated ? 'skeleton-animated' : ''}
      {className}
    "
    style="
      width: {computedWidth};
      height: {computedHeight};
      border-radius: {borderRadius};
    "
    role="status"
    aria-label={ariaLabel}
  >
    <span class="sr-only">{ariaLabel}</span>
  </div>
{/if}

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .skeleton {
    @apply bg-muted/10 dark:bg-muted/10;
    @apply inline-block;
    /* Content visibility for rendering perf on off-screen skeletons */
    content-visibility: auto;
    contain-intrinsic-size: auto 100px;
    /* Entry animation via @starting-style (CSS-native, no JS) */
    transition: opacity 200ms ease-out, display 200ms ease-out allow-discrete;
  }

  @starting-style {
    .skeleton {
      opacity: 0;
    }
  }
  
  .skeleton-group {
    @apply w-full;
  }
  
  .skeleton-animated {
    @apply relative overflow-hidden;
    @apply before:absolute before:inset-0;
    @apply before:translate-x-[-100%];
    @apply before:animate-[skeleton-loading_1.5s_infinite];
    @apply before:bg-gradient-to-r;
    @apply before:from-transparent before:via-muted/20 before:to-transparent;
  }
  
  @keyframes skeleton-loading {
    100% {
      transform: translateX(100%);
    }
  }
</style>
