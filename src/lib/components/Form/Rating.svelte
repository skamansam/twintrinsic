<!--
@component
Rating - A component for collecting user ratings through stars or other symbols.
Provides consistent styling, accessibility features, and interactive options.

## Features
- **Value binding**: Two-way binding with `value` prop, synced to hidden number input
- **Min/Max constraints**: Native HTML5 number input handles validation with `min`, `max`, and `step` attributes
- **Step control**: `step` prop sets the granularity (e.g., 0.5 for half-stars, 1 for whole stars) - matches HTML number input API
- **Visual customization**: Configurable size (sm, md, lg) and color variant (default, primary, secondary, success, warning, error, info)
- **Custom icons**: Use named icons (e.g., "star", "heart") via Icon component or custom snippets for full control
- **Interactive modes**: Full interactivity, readonly, or disabled states - matches HTML number input API
- **Hover preview**: Optional `showPreview` to display hover values before committing
- **Numeric display**: `showValue` prop to show the current rating number
- **Drag support**: Mouse and touch drag to set value across the component
- **Keyboard navigation**: Arrow keys (±step), Home (min), End (max) for accessibility
- **Form integration**: Hidden number input with `name`, `placeholder`, `readonly`, `disabled` attributes for form submission
- **Accessibility**: Full ARIA support (slider role, valuemin/max/now, labels) and keyboard navigation
- **Events**: `onchange` callback fires when value is committed, `onhover` fires during preview
- **Standard API**: Exposes the same attributes as HTML `<input type="number">` (min, max, step, name, placeholder, readonly, disabled)

Usage:
```svelte
<Rating value={3} />

<Rating 
  value={4.5} 
  max={5}
  step={0.5}
  size="lg"
  readonly={false}
  onchange={(e) => console.log(e.detail.value)}
/>

<Rating
  value={2}
  icon="heart"
  emptyIcon="heart"
  variant="warning"
  showPreview={true}
  showValue={true}
  placeholder="Rate this item"
  min={1}
  max={10}
/>
```
-->
<script lang="ts">
import { getContext } from "svelte"
import Icon from "../Icon/Icon.svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {number} - Current rating value */
  value = 0,

  /** @type {number} - Minimum rating value */
  min = 0,

  /** @type {number} - Maximum rating value */
  max = 5,

  /** @type {number} - Step size for ratings (0.5 for half stars, 1 for whole stars) - same as HTML step attribute */
  step = 1,

  /** @type {string} - Size of the rating icons (sm, md, lg) */
  size = "md",

  /** @type {string} - Visual style variant */
  variant = "warning",

  /** @type {boolean} - Whether the rating is readonly - same as HTML readonly attribute */
  readonly = false,

  /** @type {boolean} - Whether the rating is disabled - same as HTML disabled attribute */
  disabled = false,

  /** @type {boolean} - Whether to show the numeric value */
  showValue = false,

  /** @type {boolean} - Whether to show hover preview */
  showPreview = false,

  /** @type {string} - Custom icon name for filled state (e.g., "star", "heart") */
  icon = "tabler:star-filled",

  /** @type {string} - Custom icon name for empty state (e.g., "star", "heart") */
  emptyIcon = "tabler:star",

  /** @type {string} - Name attribute for form submission - same as HTML name attribute */
  name,

  /** @type {string} - Placeholder text hint - same as HTML placeholder attribute */
  placeholder,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel = "Rating",

  /** @type {(event: CustomEvent) => void} - Change event handler */
  onchange,

  /** @type {(event: CustomEvent) => void} - Hover event handler */
  onhover,

  /** @type {Snippet} - Custom snippet for filled icon (receives iconSizeClasses) */
  filledIcon,

  /** @type {Snippet} - Custom snippet for empty icon (receives iconSizeClasses) */
  emptyIconSnippet,

  children,
} = $props()

// Derived values for reactive prop access in closures
const derivedValue = $derived(value)

// Component state
let currentValue = $state(0)
let hoverValue = $state(-1)
let isDragging = $state(false)
let ratingElement = $state()
let inputElement = $state<HTMLInputElement>()

// Update internal value when prop changes
$effect(() => {
  currentValue = derivedValue
  if (inputElement) {
    inputElement.value = String(derivedValue)
  }
})

// Trigger onhover callback when hover value changes
$effect(() => {
  if (hoverValue >= 0) {
    onhover?.(new CustomEvent("hover", { detail: { value: hoverValue } }))
  }
})

// Computed values
const displayValue = $derived(hoverValue >= 0 ? hoverValue : currentValue)
const isInteractive = $derived(!readonly && !disabled)

// Determine size classes
const sizeClasses = $derived(
  {
    sm: "text-sm gap-0.5",
    md: "text-base gap-1",
    lg: "text-lg gap-1.5",
  }[size] || "text-base gap-1"
)

// Determine icon size classes
const iconSizeClasses = $derived(
  {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }[size] || "w-5 h-5"
)

// Determine variant classes
const variantClasses = $derived(
  {
    default: "text-muted dark:text-muted",
    primary: "text-primary-500 dark:text-primary-500",
    secondary: "text-secondary-500 dark:text-secondary-500",
    success: "text-success-500 dark:text-success-500",
    warning: "text-warning-500 dark:text-warning-500",
    error: "text-error-500 dark:text-error-500",
    info: "text-info-500 dark:text-info-500",
  }[variant] || "text-warning-500 dark:text-warning-500"
)

// Generate items array based on min, max and step
const items = $derived(Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step))

/**
 * Calculates the value based on mouse position
 * @param {MouseEvent|TouchEvent} event - Mouse or touch event
 * @returns {number} - Calculated value
 */
function calculateValue(event: MouseEvent | TouchEvent): number {
  if (!ratingElement) return min

  const rect = ratingElement.getBoundingClientRect()
  const clientX = event.type.startsWith("touch") ? event.touches[0].clientX : event.clientX

  // Calculate percentage of width
  const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))

  // Calculate value based on percentage, min, max, and step
  const rawValue = min + percent * (max - min)
  const rounded = Math.round(rawValue / step) * step

  // Let the input element clamp to min/max
  return Math.max(min, Math.min(max, rounded))
}

/**
 * Handles mouse move or touch move events
 * @param {MouseEvent|TouchEvent} event - Mouse or touch event
 */
function handleMove(event: MouseEvent | TouchEvent): void {
  if (!isInteractive) return

  if (isDragging || event.type === "mousemove") {
    hoverValue = calculateValue(event)
  }
}

/**
 * Handles mouse move over the rating element for hover tracking
 * @param {MouseEvent} event - Mouse move event
 */
function handleMouseMove(event: MouseEvent): void {
  if (!isInteractive || isDragging || !showPreview) return
  hoverValue = calculateValue(event)
}

/**
 * Handles mouse over individual rating items
 * @param {number} itemValue - Value of the hovered item
 */
function handleItemHover(itemValue: number): void {
  if (!isInteractive || !showPreview) return
  hoverValue = itemValue
}

/**
 * Handles mouse leave from rating items
 */
function handleItemLeave(): void {
  if (!isInteractive || !showPreview) return
  hoverValue = -1
}

/**
 * Handles focus on rating items
 * @param {number} itemValue - Value of the focused item
 */
function handleItemFocus(itemValue: number): void {
  if (!isInteractive || !showPreview) return
  hoverValue = itemValue
}

/**
 * Handles blur from rating items
 */
function handleItemBlur(): void {
  if (!isInteractive || !showPreview) return
  hoverValue = -1
}

/**
 * Handles mouse down or touch start events
 * @param {MouseEvent|TouchEvent} event - Mouse or touch event
 */
function handleStart(event: MouseEvent | TouchEvent): void {
  if (!isInteractive) return

  isDragging = true
  hoverValue = calculateValue(event)

  // Add document event listeners for drag
  if (event.type === "mousedown") {
    document.addEventListener("mousemove", handleMove)
    document.addEventListener("mouseup", handleEnd)
  } else if (event.type === "touchstart") {
    document.addEventListener("touchmove", handleMove, { passive: true })
    document.addEventListener("touchend", handleEnd)
  }
}

/**
 * Handles mouse up or touch end events
 */
function handleEnd(): void {
  if (!isInteractive || !isDragging) return

  // Update input and trigger change event
  if (hoverValue >= min && inputElement) {
    inputElement.value = String(hoverValue)
    inputElement.dispatchEvent(new Event("change", { bubbles: true }))
  }

  isDragging = false

  // Remove document event listeners
  document.removeEventListener("mousemove", handleMove)
  document.removeEventListener("mouseup", handleEnd)
  document.removeEventListener("touchmove", handleMove)
  document.removeEventListener("touchend", handleEnd)
}

/**
 * Handles mouse enter events
 */
function handleEnter(): void {
  if (!isInteractive || !showPreview) return
  hoverValue = currentValue
}

/**
 * Handles mouse leave events
 */
function handleLeave(): void {
  if (!isInteractive || isDragging || !showPreview) return
  hoverValue = -1
}

/**
 * Handles input change events
 * @param {Event} event - Input change event
 */
function handleInputChange(event: Event): void {
  const target = event.target as HTMLInputElement
  const newValue = parseFloat(target.value) || min
  currentValue = newValue
  hoverValue = -1
  onchange?.(new CustomEvent("change", { detail: { value: currentValue } }))
}

/**
 * Handles click events on individual items
 * @param {number} itemValue - Value of the clicked item
 */
function handleItemClick(itemValue: number): void {
  if (!isInteractive) return

  // Toggle off if clicking the same value
  if (currentValue === itemValue && step === 1 && min === 0) {
    if (inputElement) {
      inputElement.value = String(min)
      inputElement.dispatchEvent(new Event("change", { bubbles: true }))
    }
  } else {
    if (inputElement) {
      inputElement.value = String(itemValue)
      inputElement.dispatchEvent(new Event("change", { bubbles: true }))
    }
  }
}

/**
 * Handles keyboard navigation
 * @param {KeyboardEvent} event - Keydown event
 */
function handleKeydown(event: KeyboardEvent): void {
  if (!isInteractive) return

  let newValue = currentValue

  switch (event.key) {
    case "ArrowRight":
    case "ArrowUp":
      newValue = Math.min(max, currentValue + step)
      break
    case "ArrowLeft":
    case "ArrowDown":
      newValue = Math.max(min, currentValue - step)
      break
    case "Home":
      newValue = min
      break
    case "End":
      newValue = max
      break
    default:
      return
  }

  if (newValue !== currentValue) {
    if (inputElement) {
      inputElement.value = String(newValue)
      inputElement.dispatchEvent(new Event("change", { bubbles: true }))
    }
    event.preventDefault()
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
  aria-valuemin={isInteractive ? min : undefined}
  aria-valuemax={isInteractive ? max : undefined}
  aria-valuenow={isInteractive ? currentValue : undefined}
  aria-valuetext={isInteractive ? `${currentValue} out of ${max}` : undefined}
  aria-readonly={readonly ? true : undefined}
  aria-disabled={disabled ? true : undefined}
  onmousedown={handleStart}
  ontouchstart={handleStart}
  onmouseenter={handleEnter}
  onmouseleave={handleLeave}
  onmousemove={handleMouseMove}
  onkeydown={handleKeydown}
  bind:this={ratingElement}
>
  <input
    type="number"
    {name}
    {min}
    {max}
    {step}
    {placeholder}
    {readonly}
    disabled={disabled}
    value={currentValue}
    bind:this={inputElement}
    onchange={handleInputChange}
    class="sr-only"
    style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;"
    aria-hidden="true"
  />
  
  <div class="rating-items">
    {#each items as item}
      <button
        type="button"
        class="
          rating-item
          {item <= displayValue ? 'rating-item-filled' : 'rating-item-empty'}
          {variantClasses}
        "
        onclick={() => handleItemClick(item)}
        onmouseover={() => handleItemHover(item)}
        onmouseout={handleItemLeave}
        onfocus={() => handleItemFocus(item)}
        onblur={handleItemBlur}
        disabled={!isInteractive}
        tabindex={isInteractive ? 0 : -1}
      >
        {#if item <= displayValue}
          {#if filledIcon}
            {@render filledIcon(iconSizeClasses)}
          {:else}
            <Icon name={icon} class={iconSizeClasses} />
          <!-- {:else}
            <svg class={iconSizeClasses} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg> -->
          {/if}
        {:else}
          {#if emptyIconSnippet}
            {@render emptyIconSnippet(iconSizeClasses)}
          {:else}
            <Icon name={emptyIcon} class={iconSizeClasses} />
          <!-- {:else}
            <svg class={iconSizeClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg> -->
          {/if}
        {/if}
      </button>
    {/each}
  </div>
  
  {#if showValue}
    <span class="rating-value">
      {currentValue}
    </span>
  {/if}
</div>

<style lang="postcss">
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
    @apply bg-transparent border-none p-0;
    @apply cursor-pointer;
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
