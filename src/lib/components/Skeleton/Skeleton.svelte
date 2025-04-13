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
<script>
  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),

    /** @type {string} - Shape variant (text, rectangle, circle, rounded) */
    variant = 'rectangle',

    /** @type {string|number} - Width of the skeleton */
    width = '100%',

    /** @type {string|number} - Height of the skeleton */
    height,

    /** @type {string|number} - Size for circle and square variants (sets both width and height) */
    size,

    /** @type {number} - Number of lines for text variant */
    lines = 1,

    /** @type {boolean} - Whether to show the animation */
    animated = true,

    /** @type {string} - ARIA label for accessibility */
    ariaLabel = 'Loading content'
  } = $props();

  // Determine height based on variant
  $derived computedHeight = (() => {
    if (height) return height;
    if (size) return size;
    
    return {
      text: '1em',
      rectangle: '100px',
      circle: '40px',
      rounded: '40px'
    }[variant] || '100px';
  })();
  
  // Determine width based on variant
  $derived computedWidth = (() => {
    if (width) return width;
    if (size) return size;
    if (variant === 'circle') return computedHeight;
    
    return '100%';
  })();
  
  // Determine border radius based on variant
  $derived borderRadius = {
    text: '4px',
    rectangle: '0',
    circle: '50%',
    rounded: '8px'
  }[variant] || '0';
  
  // Generate array for multiple lines
  $derived lineArray = Array.from({ length: lines });
  
  // Determine if we should render multiple lines
  $derived isMultiLine = variant === 'text' && lines > 1;
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

<style>
  @reference "../../twintrinsic.css";
  
  .skeleton {
    @apply bg-muted/10 dark:bg-muted/10;
    @apply inline-block;
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
