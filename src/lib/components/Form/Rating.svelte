<!--
@component
Rating - A component for collecting user ratings through stars or other symbols.
Provides consistent styling, accessibility features, and interactive options.

Usage:
```svelte
<Rating value={3} />

<Rating 
  value={4.5} 
  max={5}
  precision={0.5}
  size="lg"
  readonly={false}
  on:change={(e) => console.log(e.detail.value)}
/>

<Rating
  value={2}
  icon="<svg>...</svg>"
  emptyIcon="<svg>...</svg>"
  variant="warning"
/>
```
-->
<script>
  import { createEventDispatcher } from 'svelte';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),

    /** @type {number} - Current rating value */
    value = 0,

    /** @type {number} - Maximum rating value */
    max = 5,

    /** @type {number} - Step size for ratings (0.5 for half stars, 1 for whole stars) */
    precision = 1,

    /** @type {string} - Size of the rating icons (sm, md, lg) */
    size = 'md',

    /** @type {string} - Visual style variant */
    variant = 'warning',

    /** @type {boolean} - Whether the rating is readonly */
    readonly = false,

    /** @type {boolean} - Whether the rating is disabled */
    disabled = false,

    /** @type {boolean} - Whether to show the numeric value */
    showValue = false,

    /** @type {string} - Custom icon for filled state (HTML or SVG string) */
    icon,

    /** @type {string} - Custom icon for empty state (HTML or SVG string) */
    emptyIcon,

    /** @type {string} - Name attribute for form submission */
    name,

    /** @type {string} - ARIA label for accessibility */
    ariaLabel = 'Rating'
  } = $props();

  const dispatch = createEventDispatcher();
  
  // Component state
  let currentValue = $state(value);
  let hoverValue = $state(-1);
  let isDragging = $state(false);
  let ratingElement;
  
  // Update internal value when prop changes
  $effect(() => {
    currentValue = value;
  });
  
  // Computed values
  const displayValue = $derived(hoverValue >= 0 ? hoverValue : currentValue);
  const isInteractive = $derived(!readonly && !disabled);
  
  // Determine size classes
  const sizeClasses = $derived({
    sm: 'text-sm gap-0.5',
    md: 'text-base gap-1',
    lg: 'text-lg gap-1.5'
  }[size] || 'text-base gap-1');
  
  // Determine icon size classes
  const iconSizeClasses = $derived({
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[size] || 'w-5 h-5');
  
  // Determine variant classes
  const variantClasses = $derived({
    default: 'text-muted dark:text-muted',
    primary: 'text-primary-500 dark:text-primary-500',
    secondary: 'text-secondary-500 dark:text-secondary-500',
    success: 'text-success-500 dark:text-success-500',
    warning: 'text-warning-500 dark:text-warning-500',
    error: 'text-error-500 dark:text-error-500',
    info: 'text-info-500 dark:text-info-500'
  }[variant] || 'text-warning-500 dark:text-warning-500');
  
  // Generate items array based on max and precision
  const items = $derived(Array.from({ length: max / precision }, (_, i) => (i + 1) * precision));
  
  /**
   * Calculates the value based on mouse position
   * @param {MouseEvent|TouchEvent} event - Mouse or touch event
   * @returns {number} - Calculated value
   */
  function calculateValue(event) {
    if (!ratingElement) return 0;
    
    const rect = ratingElement.getBoundingClientRect();
    const clientX = event.type.startsWith('touch')
      ? event.touches[0].clientX
      : event.clientX;
    
    // Calculate percentage of width
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    
    // Calculate value based on percentage, max, and precision
    const rawValue = percent * max;
    
    // Round to nearest precision step
    return Math.max(precision, Math.round(rawValue / precision) * precision);
  }
  
  /**
   * Handles mouse move or touch move events
   * @param {MouseEvent|TouchEvent} event - Mouse or touch event
   */
  function handleMove(event) {
    if (!isInteractive) return;
    
    if (isDragging || event.type === 'mousemove') {
      hoverValue = calculateValue(event);
    }
  }
  
  /**
   * Handles mouse down or touch start events
   * @param {MouseEvent|TouchEvent} event - Mouse or touch event
   */
  function handleStart(event) {
    if (!isInteractive) return;
    
    isDragging = true;
    hoverValue = calculateValue(event);
    
    // Add document event listeners for drag
    if (event.type === 'mousedown') {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
    } else if (event.type === 'touchstart') {
      document.addEventListener('touchmove', handleMove, { passive: true });
      document.addEventListener('touchend', handleEnd);
    }
  }
  
  /**
   * Handles mouse up or touch end events
   */
  function handleEnd() {
    if (!isInteractive || !isDragging) return;
    
    // Update value and dispatch change event
    if (hoverValue >= 0) {
      currentValue = hoverValue;
      dispatch('change', { value: currentValue });
    }
    
    isDragging = false;
    
    // Remove document event listeners
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEnd);
  }
  
  /**
   * Handles mouse enter events
   */
  function handleEnter() {
    if (!isInteractive) return;
    hoverValue = currentValue;
  }
  
  /**
   * Handles mouse leave events
   */
  function handleLeave() {
    if (!isInteractive || isDragging) return;
    hoverValue = -1;
  }
  
  /**
   * Handles click events on individual items
   * @param {number} itemValue - Value of the clicked item
   */
  function handleItemClick(itemValue) {
    if (!isInteractive) return;
    
    // Toggle off if clicking the same value
    if (currentValue === itemValue && precision === 1) {
      currentValue = 0;
    } else {
      currentValue = itemValue;
    }
    
    hoverValue = currentValue;
    dispatch('change', { value: currentValue });
  }
  
  /**
   * Handles keyboard navigation
   * @param {KeyboardEvent} event - Keydown event
   */
  function handleKeydown(event) {
    if (!isInteractive) return;
    
    let newValue = currentValue;
    
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, currentValue + precision);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(0, currentValue - precision);
        break;
      case 'Home':
        newValue = precision;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }
    
    if (newValue !== currentValue) {
      currentValue = newValue;
      hoverValue = newValue;
      dispatch('change', { value: currentValue });
      event.preventDefault();
    }
  }
</script>

<div
  {id}
  class="
    rating
    {sizeClasses}
    {isInteractive ? 'rating-interactive' : ''}
    {disabled ? 'rating-disabled' : ''}
    {className}
  "
  role={isInteractive ? 'slider' : 'img'}
  aria-label={ariaLabel}
  aria-valuemin={isInteractive ? 0 : undefined}
  aria-valuemax={isInteractive ? max : undefined}
  aria-valuenow={isInteractive ? currentValue : undefined}
  aria-valuetext={isInteractive ? `${currentValue} out of ${max}` : undefined}
  aria-readonly={readonly ? true : undefined}
  aria-disabled={disabled ? true : undefined}
  tabindex={isInteractive ? 0 : undefined}
  on:mousedown={handleStart}
  on:touchstart={handleStart}
  on:mouseenter={handleEnter}
  on:mouseleave={handleLeave}
  on:keydown={handleKeydown}
  bind:this={ratingElement}
>
  {#if name && isInteractive}
    <input type="hidden" {name} value={currentValue} />
  {/if}
  
  <div class="rating-items">
    {#each items as item}
      <span
        class="
          rating-item
          {item <= displayValue ? 'rating-item-filled' : 'rating-item-empty'}
          {variantClasses}
        "
        role={isInteractive ? 'presentation' : undefined}
        on:click={() => handleItemClick(item)}
      >
        {#if item <= displayValue}
          {#if icon}
            <span class="rating-icon {iconSizeClasses}">
              {@html icon}
            </span>
          {:else}
            <svg class="{iconSizeClasses}" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
          {/if}
        {:else}
          {#if emptyIcon}
            <span class="rating-icon {iconSizeClasses}">
              {@html emptyIcon}
            </span>
          {:else}
            <svg class="{iconSizeClasses}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
          {/if}
        {/if}
      </span>
    {/each}
  </div>
  
  {#if showValue}
    <span class="rating-value">
      {currentValue}
    </span>
  {/if}
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .rating {
    @apply inline-flex items-center;
  }
  
  .rating-interactive {
    @apply cursor-pointer;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 rounded;
  }
  
  .rating-disabled {
    @apply opacity-50 cursor-not-allowed;
    @apply pointer-events-none;
  }
  
  .rating-items {
    @apply inline-flex;
  }
  
  .rating-item {
    @apply inline-flex items-center justify-center;
    @apply transition-colors duration-150;
  }
  
  .rating-item-empty {
    @apply text-muted/30 dark:text-muted/30;
  }
  
  .rating-interactive .rating-item {
    @apply hover:scale-110;
    @apply transition-transform duration-150;
  }
  
  .rating-value {
    @apply ml-2 font-medium;
    @apply text-text dark:text-text;
  }
</style>
