<!--
@component
Split - A component for creating resizable split panels in an IDE-style layout.
Supports horizontal or vertical splitting with draggable dividers and keyboard controls.

Usage:
```svelte
<Split>
  <div slot="first">First panel content</div>
  <div slot="second">Second panel content</div>
</Split>

<Split direction="vertical" initialSize={30} minSize={20} maxSize={80}>
  <div slot="first">Top panel</div>
  <div slot="second">Bottom panel</div>
</Split>
```
-->
<script>
  import { onMount, createEventDispatcher } from 'svelte';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),

    /** @type {string} - Split direction (horizontal or vertical) */
    direction = 'horizontal',

    /** @type {number} - Initial size of the first panel in percentage (0-100) */
    initialSize = 50,

    /** @type {number} - Minimum size of the first panel in percentage */
    minSize = 10,

    /** @type {number} - Maximum size of the first panel in percentage */
    maxSize = 90,

    /** @type {boolean} - Whether the split is resizable */
    resizable = true,

    /** @type {boolean} - Whether to collapse the first panel */
    collapseFirst = false,

    /** @type {boolean} - Whether to collapse the second panel */
    collapseSecond = false,

    /** @type {number} - Size of the divider in pixels */
    dividerSize = 4,

    /** @type {string} - ARIA label for the divider */
    dividerAriaLabel,

    first,
    second
  } = $props();

  const dispatch = createEventDispatcher();
  
  // Component state
  let size = $state(initialSize);
  let isDragging = $state(false);
  let containerElement;
  let firstPanelElement;
  let secondPanelElement;
  let dividerElement;
  let startPosition = 0;
  let startSize = 0;
  let containerSize = 0;
  
  // Computed values
  const isHorizontal = $derived(direction === 'horizontal');
  const isVertical = $derived(direction === 'vertical');
  const effectiveSize = $derived(collapseFirst ? 0 : collapseSecond ? 100 : size);
  
  // Divider aria label
  const dividerLabel = $derived(dividerAriaLabel || 
    `${isHorizontal ? 'Horizontal' : 'Vertical'} resizer. Use arrow keys to resize.`);
  
  /**
   * Starts dragging the divider
   * @param {MouseEvent|TouchEvent} event - Mouse or touch event
   */
  function startDrag(event) {
    if (!resizable || collapseFirst || collapseSecond) return;
    
    isDragging = true;
    
    // Get starting position
    startPosition = isHorizontal
      ? (event.type === 'touchstart' ? event.touches[0].clientX : event.clientX)
      : (event.type === 'touchstart' ? event.touches[0].clientY : event.clientY);
    
    startSize = size;
    
    // Get container size
    const rect = containerElement.getBoundingClientRect();
    containerSize = isHorizontal ? rect.width : rect.height;
    
    // Add event listeners for drag
    if (event.type === 'mousedown') {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', stopDrag);
    } else if (event.type === 'touchstart') {
      document.addEventListener('touchmove', handleDrag, { passive: false });
      document.addEventListener('touchend', stopDrag);
    }
    
    // Prevent default to avoid text selection
    event.preventDefault();
  }
  
  /**
   * Handles dragging the divider
   * @param {MouseEvent|TouchEvent} event - Mouse or touch event
   */
  function handleDrag(event) {
    if (!isDragging) return;
    
    // Get current position
    const currentPosition = isHorizontal
      ? (event.type === 'touchmove' ? event.touches[0].clientX : event.clientX)
      : (event.type === 'touchmove' ? event.touches[0].clientY : event.clientY);
    
    // Calculate delta and new size
    const delta = currentPosition - startPosition;
    const deltaPercent = (delta / containerSize) * 100;
    let newSize = startSize + deltaPercent;
    
    // Constrain to min/max
    newSize = Math.max(minSize, Math.min(maxSize, newSize));
    
    // Update size
    size = newSize;
    
    // Dispatch resize event
    dispatch('resize', { size });
    
    // Prevent default to avoid scrolling on touch devices
    event.preventDefault();
  }
  
  /**
   * Stops dragging the divider
   */
  function stopDrag() {
    if (!isDragging) return;
    
    isDragging = false;
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('touchend', stopDrag);
    
    // Dispatch resize end event
    dispatch('resizeend', { size });
  }
  
  /**
   * Handles keyboard navigation for resizing
   * @param {KeyboardEvent} event - Keydown event
   */
  function handleKeydown(event) {
    if (!resizable || collapseFirst || collapseSecond) return;
    
    let newSize = size;
    const step = event.shiftKey ? 10 : 1;
    
    switch (event.key) {
      case 'ArrowLeft':
        if (isHorizontal) newSize -= step;
        break;
      case 'ArrowRight':
        if (isHorizontal) newSize += step;
        break;
      case 'ArrowUp':
        if (isVertical) newSize -= step;
        break;
      case 'ArrowDown':
        if (isVertical) newSize += step;
        break;
      case 'Home':
        newSize = minSize;
        break;
      case 'End':
        newSize = maxSize;
        break;
      default:
        return;
    }
    
    // Constrain to min/max
    newSize = Math.max(minSize, Math.min(maxSize, newSize));
    
    // Update size if changed
    if (newSize !== size) {
      size = newSize;
      dispatch('resize', { size });
      event.preventDefault();
    }
  }
  
  // Clean up event listeners on unmount
  onMount(() => {
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('touchend', stopDrag);
    };
  });
</script>

<div
  {id}
  class="
    split
    split-{direction}
    {isDragging ? 'split-dragging' : ''}
    {collapseFirst ? 'split-collapse-first' : ''}
    {collapseSecond ? 'split-collapse-second' : ''}
    {className}
  "
  bind:this={containerElement}
>
  <div
    class="split-panel split-first"
    style="
      {isHorizontal ? `width: ${effectiveSize}%` : `height: ${effectiveSize}%`};
      {collapseFirst ? 'display: none' : ''}
    "
    bind:this={firstPanelElement}
  >
    {@render first?.()}
  </div>
  
  {#if !collapseFirst && !collapseSecond}
    <div
      class="
        split-divider
        {resizable ? 'split-divider-resizable' : ''}
      "
      style="
        {isHorizontal ? `width: ${dividerSize}px` : `height: ${dividerSize}px`};
      "
      role={resizable ? 'separator' : undefined}
      tabindex={resizable ? 0 : undefined}
      aria-label={resizable ? dividerLabel : undefined}
      aria-valuenow={resizable ? size : undefined}
      aria-valuemin={resizable ? minSize : undefined}
      aria-valuemax={resizable ? maxSize : undefined}
      onmousedown={startDrag}
      ontouchstart={startDrag}
      onkeydown={handleKeydown}
      bind:this={dividerElement}
    >
      <div class="split-divider-handle"></div>
    </div>
  {/if}
  
  <div
    class="split-panel split-second"
    style="
      {isHorizontal ? `width: ${100 - effectiveSize}%` : `height: ${100 - effectiveSize}%`};
      {collapseSecond ? 'display: none' : ''}
    "
    bind:this={secondPanelElement}
  >
    {@render second?.()}
  </div>
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .split {
    @apply flex w-full h-full overflow-hidden;
  }
  
  .split-horizontal {
    @apply flex-row;
  }
  
  .split-vertical {
    @apply flex-col;
  }
  
  .split-panel {
    @apply overflow-auto;
  }
  
  .split-divider {
    @apply flex-shrink-0 bg-border dark:bg-border;
    @apply z-10;
  }
  
  .split-divider-resizable {
    @apply cursor-col-resize hover:bg-primary-300 dark:hover:bg-primary-700;
    @apply focus:outline-none focus:bg-primary-300 dark:focus:bg-primary-700;
    @apply transition-colors duration-150;
  }
  
  .split-vertical .split-divider-resizable {
    @apply cursor-row-resize;
  }
  
  .split-divider-handle {
    @apply absolute;
  }
  
  .split-horizontal .split-divider-handle {
    @apply top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
    @apply w-1 h-8 rounded-full;
    @apply bg-border dark:bg-border;
  }
  
  .split-vertical .split-divider-handle {
    @apply top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
    @apply w-8 h-1 rounded-full;
    @apply bg-border dark:bg-border;
  }
  
  .split-dragging {
    @apply select-none;
  }
  
  .split-dragging .split-divider {
    @apply bg-primary-300 dark:bg-primary-700;
  }
</style>
