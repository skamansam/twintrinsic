<!--
@component
Carousel - A component for displaying slideshows of content.
Provides consistent styling, accessibility features, and various display options.

Usage:
```svelte
<Carousel>
  <div slot="items">
    <CarouselItem>Slide 1 content</CarouselItem>
    <CarouselItem>Slide 2 content</CarouselItem>
    <CarouselItem>Slide 3 content</CarouselItem>
  </div>
</Carousel>

<Carousel
  autoplay
  interval={5000}
  showArrows
  showIndicators
  circular
>
  <div slot="items">
    <CarouselItem>
      <img src="/image1.jpg" alt="Image 1" />
    </CarouselItem>
    <CarouselItem>
      <img src="/image2.jpg" alt="Image 2" />
    </CarouselItem>
  </div>
</Carousel>
```
-->
<script>
import { onMount, onDestroy, setContext } from "svelte"

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
  prevIcon,

  /** @type {string} - Custom next arrow icon */
  nextIcon,

  items,
} = $props()

// Component state
let currentIndex = $state(0)
let totalSlides = $state(0)
let isPlaying = $state(false)
let isHovering = $state(false)
let isDragging = $state(false)
let startX = 0
let currentX = 0
let carouselElement
let itemsElement
let autoplayInterval
let slideWidth = 0
let touchStartTime = 0

// Update current index when activeIndex prop changes
$effect(() => {
  currentIndex = activeIndex
})

// Update autoplay state when prop changes
$effect(() => {
  isPlaying = autoplay
})

// Provide context for child components
setContext("carousel", {
  registerItem: () => {
    totalSlides++
    return totalSlides - 1
  },
  currentIndex,
  transition,
  transitionDuration,
})

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
function goToSlide(index) {
  if (index >= 0 && index < totalSlides) {
    currentIndex = index
    dispatchChange()
  }
}

/**
 * Dispatches change event
 */
function dispatchChange() {
  dispatch("change", { index: currentIndex })
}

/**
 * Handles mouse enter event
 */
function handleMouseEnter() {
  if (pauseOnHover) {
    isHovering = true
  }
}

/**
 * Handles mouse leave event
 */
function handleMouseLeave() {
  isHovering = false
}

/**
 * Handles touch start event
 * @param {TouchEvent} event - Touch event
 */
function handleTouchStart(event) {
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
function handleTouchMove(event) {
  if (!swipeable || !isDragging) return

  currentX = event.touches[0].clientX

  // Prevent default to avoid scrolling
  event.preventDefault()
}

/**
 * Handles touch end event
 */
function handleTouchEnd() {
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
function handleKeyDown(event) {
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
function updateDimensions() {
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

<div
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
  tabindex="0"
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
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
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
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
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

<style>
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
    @apply relative;
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
