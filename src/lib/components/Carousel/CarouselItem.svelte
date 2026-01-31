<!--
@component
CarouselItem - An individual slide within a Carousel component.
Provides consistent styling, accessibility features, and transition effects.

Usage:
```svelte
<CarouselItem>
  <img src="/image1.jpg" alt="Image 1" />
</CarouselItem>

<CarouselItem>
  <div class="p-4 text-center">
    <h3>Slide Title</h3>
    <p>Slide content goes here</p>
  </div>
</CarouselItem>
```
-->
<script lang="ts">
import { getContext, onMount } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {boolean} - Whether the item is active */
  active = false,

  children,
} = $props()

// Get carousel context
const carouselContext = getContext("carousel")

// Component state
let index = $state(-1)
let isActive = $state(false)
let isVisible = $state(false)
let wasActive = $state(false)

// Register with parent on mount
onMount(() => {
  if (carouselContext) {
    index = carouselContext.registerItem()
  }

  return () => {
    // Cleanup if needed
  }
})

// Update active state when prop changes
$effect(() => {
  if (!carouselContext) {
    isActive = active
  }
})

// Update active state based on context
$effect(() => {
  if (carouselContext) {
    const currentIndex = carouselContext.currentIndex
    wasActive = isActive
    isActive = index === currentIndex

    // For fade transition, we need to keep the item visible for a bit after it becomes inactive
    if (carouselContext.transition === "fade") {
      if (isActive) {
        isVisible = true
      } else if (wasActive) {
        // Keep visible during transition, then hide
        isVisible = true
        setTimeout(() => {
          isVisible = false
        }, carouselContext.transitionDuration)
      }
    }
  }
})

// Determine transition styles based on context
const transitionType = $derived(carouselContext?.transition || "slide")
const transitionDuration = $derived(carouselContext?.transitionDuration || 300)
const currentIndex = $derived(carouselContext?.currentIndex || 0)

// Calculate transform for slide transition
const transform = $derived(() => {
  if (transitionType === "slide" && typeof index === "number" && typeof currentIndex === "number") {
    const offset = (index - currentIndex) * 100
    return `translateX(${offset}%)`
  }
  return ""
})
</script>

<div
  {id}
  class="
    carousel-item
    carousel-item-{transitionType}
    {isActive ? 'carousel-item-active' : ''}
    {isVisible ? 'carousel-item-visible' : ''}
    {className}
  "
  style="
    --transition-duration: {transitionDuration}ms;
    transform: {transform};
  "
  role="tabpanel"
  aria-hidden={!isActive}
  aria-roledescription="slide"
>
  {@render children?.()}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .carousel-item {
    @apply w-full flex-shrink-0;
  }
  
  /* Slide transition */
  .carousel-item-slide {
    @apply transition-transform ease-in-out;
    transition-duration: var(--transition-duration);
  }
  
  /* Fade transition */
  .carousel-item-fade {
    @apply absolute inset-0;
    @apply opacity-0 invisible;
    @apply transition-opacity ease-in-out;
    transition-duration: var(--transition-duration);
  }
  
  .carousel-item-fade.carousel-item-active,
  .carousel-item-fade.carousel-item-visible {
    @apply opacity-100 visible;
  }
  
  .carousel-item-active {
    @apply z-10;
  }
</style>
