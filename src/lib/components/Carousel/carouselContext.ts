/**
 * Carousel context interface shared by Carousel.svelte (provider) and
 * CarouselItem.svelte (consumer). Exported from a dedicated module so both
 * sides can import the same type without circular dependencies.
 */

export interface CarouselContext {
  /** Registers a new slide and returns its index within the carousel */
  registerItem: () => number
  /** Currently active slide index (0-based) */
  currentIndex: number
  /** Transition effect name (slide, fade) */
  transition: string
  /** Transition duration in milliseconds */
  transitionDuration: number
}
