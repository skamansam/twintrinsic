<!--
@component
Lazy - A component that renders its content only when it becomes visible in the viewport.
Useful for performance optimization by deferring the rendering of off-screen content.

Usage:
```svelte
<Lazy>
  <div>This content will only be rendered when visible</div>
</Lazy>

<Lazy placeholder={<div>Loading...</div>}>
  <HeavyComponent />
</Lazy>
```
-->
<script>
  import { onMount } from 'svelte';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),

    /** @type {number} - Threshold for intersection (0-1), where 1 means fully visible */
    threshold = 0.1,

    /** @type {string} - Margin around the root element for intersection detection */
    rootMargin = '0px',

    /** @type {boolean} - Whether to keep content rendered after it's been visible once */
    keepRendered = true,

    /** @type {boolean} - Whether to show a loading indicator while content is loading */
    showLoading = false,

    /** @type {number} - Delay in ms before showing content after it becomes visible */
    delay = 0,

    children,
    placeholder
  } = $props();

  // State
  let isVisible = $state(false);
  let hasBeenVisible = $state(false);
  let shouldRender = $state(false);
  let element;

  /**
   * Handles intersection changes
   * @param {IntersectionObserverEntry[]} entries - Intersection entries
   */
  function handleIntersection(entries) {
    const [entry] = entries;
    
    if (entry.isIntersecting) {
      isVisible = true;
      hasBeenVisible = true;
      
      if (delay > 0) {
        setTimeout(() => {
          shouldRender = true;
        }, delay);
      } else {
        shouldRender = true;
      }
      
      // If we only need to detect visibility once, disconnect the observer
      if (keepRendered) {
        observer?.disconnect();
      }
    } else {
      isVisible = false;
      
      // If we're not keeping rendered content, unrender when not visible
      if (!keepRendered) {
        shouldRender = false;
      }
    }
  }

  let observer;

  onMount(() => {
    // Check if IntersectionObserver is available
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(handleIntersection, {
        root: null, // viewport
        rootMargin,
        threshold
      });
      
      if (element) {
        observer.observe(element);
      }
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      shouldRender = true;
      isVisible = true;
      hasBeenVisible = true;
    }
    
    return () => {
      observer?.disconnect();
    };
  });
</script>

<div 
  {id}
  class="lazy-container {className}"
  bind:this={element}
>
  {#if shouldRender}
    <div class="lazy-content">
      {@render children?.()}
    </div>
  {:else if placeholder}
    <div class="lazy-placeholder">
      {@render placeholder()}
    </div>
  {:else if showLoading && hasBeenVisible}
    <div class="lazy-loading" aria-live="polite" aria-busy="true">
      <div class="loading-spinner" aria-hidden="true"></div>
      <span class="sr-only">Loading content</span>
    </div>
  {/if}
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .lazy-container {
    @apply min-h-[20px];
  }
  
  .lazy-loading {
    @apply flex items-center justify-center p-4;
  }
  
  .loading-spinner {
    @apply w-8 h-8 rounded-full border-4 border-primary-200 dark:border-primary-800;
    @apply border-t-primary-500 dark:border-t-primary-400;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
