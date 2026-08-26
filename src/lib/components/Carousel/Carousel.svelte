<!--
@component
Carousel - A component for displaying slideshows of content.
Provides consistent styling, accessibility features, and various display options.

Usage:
```svelte
<Carousel>
  {#snippet items()}
    <CarouselItem>Slide 1 content</CarouselItem>
    <CarouselItem>Slide 2 content</CarouselItem>
    <CarouselItem>Slide 3 content</CarouselItem>
  {/snippet}
</Carousel>

<Carousel
  autoplay
  interval={5000}
  showArrows
  showIndicators
  circular
>
  {#snippet items()}
    <CarouselItem>
      <img src="/image1.jpg" alt="Image 1" />
    </CarouselItem>
    <CarouselItem>
      <img src="/image2.jpg" alt="Image 2" />
    </CarouselItem>
  {/snippet}
</Carousel>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "activeIndex", type: "number", description: "Index of the active slide (0-based)", default: "0", optional: true },
  { name: "showArrows", type: "boolean", description: "Whether to show navigation arrows", default: "true", optional: true },
  { name: "showIndicators", type: "boolean", description: "Whether to show slide indicators", default: "true", optional: true },
  { name: "autoplay", type: "boolean", description: "Whether to enable autoplay", default: "false", optional: true },
  { name: "interval", type: "number", description: "Autoplay interval in milliseconds", default: "3000", optional: true },
  { name: "pauseOnHover", type: "boolean", description: "Whether to pause autoplay on hover", default: "true", optional: true },
  { name: "circular", type: "boolean", description: "Whether to enable circular navigation", default: "true", optional: true },
  { name: "swipeable", type: "boolean", description: "Whether to enable swipe gestures on touch devices", default: "true", optional: true },
  { name: "transition", type: "string", description: "Transition effect (slide, fade)", default: "\"slide\"", optional: true },
  { name: "transitionDuration", type: "number", description: "Transition duration in milliseconds", default: "300", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for the carousel", default: "\"Carousel\"", optional: true },
  { name: "prevAriaLabel", type: "string", description: "ARIA label for the previous button", default: "\"Previous slide\"", optional: true },
  { name: "nextAriaLabel", type: "string", description: "ARIA label for the next button", default: "\"Next slide\"", optional: true },
  { name: "prevIcon", type: "string", description: "Custom previous arrow icon", optional: true },
  { name: "nextIcon", type: "string", description: "Custom next arrow icon", optional: true },
  { name: "onchange", type: "(event: CustomEvent) => void", description: "Change event handler", optional: true, eventDetail: "unknown" },
  { name: "items", type: "import(\"svelte\").Snippet", description: "Snippet rendering the slide items", optional: true },
];
</script>

<script lang="ts">
import { onDestroy, onMount, setContext } from "svelte"
import type { CarouselContext } from "./carouselContext.js"
import Icon from "../Icon/Icon.svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {number} - Index of the active slide (0-based) */
  activeIndex = 0,

  /** @type {boolean} - Whether to show navigation arrows */
  showArrows = true,

  /** @type {boolean} - Whether to show slide indicators */
  showIndicators = true,

  /** @type {boolean} - Whether to enable autoplay */
  autoplay = false,

  /** @type {number} - Autoplay interval in milliseconds */
  interval = 3000,

  /** @type {boolean} - Whether to pause autoplay on hover */
  pauseOnHover = true,

  /** @type {boolean} - Whether to enable circular navigation */
  circular = true,

  /** @type {boolean} - Whether to enable swipe gestures on touch devices */
  swipeable = true,

  /** @type {string} - Transition effect (slide, fade) */
  transition = "slide",

  /** @type {number} - Transition duration in milliseconds */
  transitionDuration = 300,

  /** @type {string} - ARIA label for the carousel */
  ariaLabel = "Carousel",

  /** @type {string} - ARIA label for the previous button */
  prevAriaLabel = "Previous slide",

  /** @type {string} - ARIA label for the next button */
  nextAriaLabel = "Next slide",

  /** @type {string} - Custom previous arrow icon */
  prevIcon = undefined,

  /** @type {string} - Custom next arrow icon */
  nextIcon = undefined,

  /** @type {(event: CustomEvent) => void} - Change event handler */
  onchange = undefined,

  /** @type {import("svelte").Snippet} - Snippet rendering the slide items */
  items = undefined,
  ...restProps
} = $props()

// Component state
let currentIndex = $state(0)
let totalSlides = $state(0)
let isPlaying = $state(false)
let isHovering = $state(false)
let isDragging = $state(false)
let startX = $state(0)
let currentX = $state(0)
let carouselElement: HTMLElement | undefined = $state()
let itemsElement: HTMLElement | undefined = $state()
// Plain (non-reactive) handle — it must not be `$state` because the autoplay
// `$effect` below both reads (`clearInterval`) and writes (`setInterval`) it.
// `setInterval` returns a fresh timer id on every call, so a reactive value
// would invalidate the effect endlessly and Svelte aborts with
// `effect_update_depth_exceeded`.
let autoplayInterval: ReturnType<typeof setInterval> | undefined
let slideWidth = $state(0)
let touchStartTime = $state(0)

// Update current index when activeIndex prop changes
$effect(() => {
  currentIndex = activeIndex
})

// Update autoplay state when prop changes
$effect(() => {
  isPlaying = autoplay
})

// Provide context for child components. Called at init (not in `$effect`) so
// the context is available during server-side rendering.
const carouselContext: CarouselContext = {
  registerItem: () => {
    totalSlides++
    return totalSlides - 1
  },
  get currentIndex() {
    return currentIndex
  },
  get transition() {
    return transition
  },
  get transitionDuration() {
    return transitionDuration
  },
}
setContext<CarouselContext>("carousel", carouselContext)

// Set up autoplay
$effect(() => {
  clearInterval(autoplayInterval)

  if (isPlaying && !isHovering && !isDragging && totalSlides > 1) {
    autoplayInterval = setInterval(() => {
      goToNext()
    }, interval)
  }

  return () => clearInterval(autoplayInterval)
})

/**
 * Goes to the previous slide
 */
function goToPrev() {
  if (currentIndex > 0) {
    currentIndex--
  } else if (circular) {
    currentIndex = totalSlides - 1
  }

  dispatchChange()
}

/**
 * Goes to the next slide
 */
function goToNext() {
  if (currentIndex < totalSlides - 1) {
    currentIndex++
  } else if (circular) {
    currentIndex = 0
  }

  dispatchChange()
}

/**
 * Goes to a specific slide
 * @param {number} index - Slide index
 */
function goToSlide(index: number): void {
  if (index >= 0 && index < totalSlides) {
    currentIndex = index
    dispatchChange()
  }
}

/**
 * Dispatches change event
 */
function dispatchChange(): void {
  onchange?.(new CustomEvent("change", { detail: { index: currentIndex } }))
}

/**
 * Handles mouse enter event
 */
function handleMouseEnter(): void {
  if (pauseOnHover) {
    isHovering = true
  }
}

/**
 * Handles mouse leave event
 */
function handleMouseLeave(): void {
  isHovering = false
}

/**
 * Handles touch start event
 * @param {TouchEvent} event - Touch event
 */
function handleTouchStart(event: TouchEvent): void {
  if (!swipeable) return

  isDragging = true
  startX = event.touches[0].clientX
  currentX = startX
  touchStartTime = Date.now()
}

/**
 * Handles touch move event
 * @param {TouchEvent} event - Touch event
 */
function handleTouchMove(event: TouchEvent): void {
  if (!swipeable || !isDragging) return

  currentX = event.touches[0].clientX

  // Prevent default to avoid scrolling
  event.preventDefault()
}

/**
 * Handles touch end event
 */
function handleTouchEnd(): void {
  if (!swipeable || !isDragging) return

  const deltaX = currentX - startX
  const deltaTime = Date.now() - touchStartTime

  // Determine if it was a swipe (fast movement)
  const isSwipe = Math.abs(deltaX) > 50 && deltaTime < 300

  // Determine if it was a drag (slow movement but significant distance)
  const isDrag = Math.abs(deltaX) > slideWidth / 3

  if (isSwipe || isDrag) {
    if (deltaX > 0) {
      goToPrev()
    } else {
      goToNext()
    }
  }

  isDragging = false
}

/**
 * Handles key down event
 * @param {KeyboardEvent} event - Key event
 */
function handleKeyDown(event: KeyboardEvent): void {
  switch (event.key) {
    case "ArrowLeft":
      goToPrev()
      event.preventDefault()
      break
    case "ArrowRight":
      goToNext()
      event.preventDefault()
      break
    case "Home":
      goToSlide(0)
      event.preventDefault()
      break
    case "End":
      goToSlide(totalSlides - 1)
      event.preventDefault()
      break
  }
}

// Update slide width on mount and resize
function updateDimensions(): void {
  if (carouselElement) {
    slideWidth = carouselElement.offsetWidth
  }
}

// Set up resize observer
onMount(() => {
  updateDimensions()

  const resizeObserver = new ResizeObserver(updateDimensions)

  if (carouselElement) {
    resizeObserver.observe(carouselElement)
  }

  return () => {
    resizeObserver.disconnect()
  }
})

// Clean up on destroy
onDestroy(() => {
  clearInterval(autoplayInterval)
})
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div {...restProps}
  {id}
  class="
    carousel
    carousel-transition-{transition}
    {className}
  "
  style="--transition-duration: {transitionDuration}ms;"
  role="region"
  aria-label={ariaLabel}
  aria-roledescription="carousel"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  ontouchend={handleTouchEnd}
  onkeydown={handleKeyDown}
  bind:this={carouselElement}
>
  <div 
    class="carousel-items"
    bind:this={itemsElement}
  >
    {@render items?.()}
  </div>
  
  {#if showArrows && totalSlides > 1}
    <div class="carousel-arrows">
      <button
        type="button"
        class="carousel-arrow carousel-arrow-prev"
        aria-label={prevAriaLabel}
        disabled={!circular && currentIndex === 0}
        onclick={goToPrev}
      >
        {#if prevIcon}
          {@html prevIcon}
        {:else}
          <Icon name="tabler:chevron-left" class="w-6 h-6" />
        {/if}
      </button>
      
      <button
        type="button"
        class="carousel-arrow carousel-arrow-next"
        aria-label={nextAriaLabel}
        disabled={!circular && currentIndex === totalSlides - 1}
        onclick={goToNext}
      >
        {#if nextIcon}
          {@html nextIcon}
        {:else}
          <Icon name="tabler:chevron-right" class="w-6 h-6" />
        {/if}
      </button>
    </div>
  {/if}
  
  {#if showIndicators && totalSlides > 1}
    <div class="carousel-indicators" role="tablist">
      {#each Array(totalSlides) as _, i}
        <button
          type="button"
          class="
            carousel-indicator
            {i === currentIndex ? 'carousel-indicator-active' : ''}
          "
          role="tab"
          aria-label={`Slide ${i + 1}`}
          aria-selected={i === currentIndex}
          onclick={() => goToSlide(i)}
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .carousel {
    @apply relative overflow-hidden;
    @apply w-full;
  }
  
  .carousel-items {
    @apply flex;
  }
  
  .carousel-transition-slide .carousel-items {
    @apply transition-transform ease-in-out;
    transition-duration: var(--transition-duration);
  }
  
  .carousel-transition-fade .carousel-items {
    @apply relative h-full;
  }
  
  .carousel-arrows {
    @apply absolute inset-0;
    @apply flex items-center justify-between;
    @apply pointer-events-none;
  }
  
  .carousel-arrow {
    @apply flex items-center justify-center;
    @apply w-10 h-10 rounded-full;
    @apply bg-background/60 dark:bg-background/60;
    @apply text-text dark:text-text;
    @apply pointer-events-auto;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply hover:bg-background/80 dark:hover:bg-background/80;
    @apply transition-colors duration-150;
    @apply z-10;
  }
  
  .carousel-arrow:disabled {
    @apply opacity-50 cursor-not-allowed;
  }
  
  .carousel-arrow-prev {
    @apply ml-2;
  }
  
  .carousel-arrow-next {
    @apply mr-2;
  }
  
  .carousel-indicators {
    @apply absolute bottom-4 left-1/2 -translate-x-1/2;
    @apply flex items-center justify-center gap-2;
    @apply z-10;
  }
  
  .carousel-indicator {
    @apply w-2.5 h-2.5 rounded-full;
    @apply bg-background/60 dark:bg-background/60;
    @apply hover:bg-background/80 dark:hover:bg-background/80;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply transition-colors duration-150;
  }
  
  .carousel-indicator-active {
    @apply bg-primary-500 dark:bg-primary-500;
    @apply w-3 h-3;
  }
</style>
