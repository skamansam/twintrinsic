<!--
@component
Slider - A component for selecting values from a range.
Provides consistent styling, accessibility features, and interactive options.

Usage:
```svelte
<Slider value={50} min={0} max={100} />

<Slider 
  value={[20, 80]} 
  min={0} 
  max={100} 
  step={5}
  showTicks
  showValue
  onchange={(e) => console.log(e.detail.value)}
/>

<Slider
  value={25}
  min={0}
  max={100}
  disabled={false}
  variant="primary"
  orientation="horizontal"
/>
```
-->
<script>
import { onDestroy } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {number|Array} - Current value or range [min, max] */
  value = 0,

  /** @type {number} - Minimum value */
  min = 0,

  /** @type {number} - Maximum value */
  max = 100,

  /** @type {number} - Step size */
  step = 1,

  /** @type {string} - Visual style variant */
  variant = "primary",

  /** @type {string} - Orientation (horizontal, vertical) */
  orientation = "horizontal",

  /** @type {boolean} - Whether the slider is disabled */
  disabled = false,

  /** @type {boolean} - Whether to show tick marks */
  showTicks = false,

  /** @type {Array} - Custom tick values */
  tickValues = [],

  /** @type {boolean} - Whether to show the current value */
  showValue = false,

  /** @type {string} - Format for displayed value */
  valueFormat = "{value}",

  /** @type {boolean} - Whether to show tooltips on hover/drag */
  showTooltip = false,

  /** @type {string} - Name attribute for form submission */
  name,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel,

  /** @type {(event: CustomEvent) => void} - Change event handler */
  onchange,
  /** @type {(event: CustomEvent) => void} - Input event handler */
  oninput,
} = $props()

// Component state
let sliderValues = $state([])
let isDragging = $state(false)
let dragIndex = $state(-1)
let hoverIndex = $state(-1)
let trackElement = $state()
let thumbElements = $state([])

// Update internal value when prop changes
$effect(() => {
  sliderValues = Array.isArray(value) ? [...value] : [value]
})

// Computed values
const isRange = $derived(sliderValues.length > 1)
const range = $derived(max - min)

// Determine variant classes
const variantClasses = $derived(
  {
    default: "bg-muted dark:bg-muted",
    primary: "bg-primary-500 dark:bg-primary-500",
    secondary: "bg-secondary-500 dark:bg-secondary-500",
    success: "bg-success-500 dark:bg-success-500",
    warning: "bg-warning-500 dark:bg-warning-500",
    error: "bg-error-500 dark:bg-error-500",
    info: "bg-info-500 dark:bg-info-500",
  }[variant] || "bg-primary-500 dark:bg-primary-500"
)

// Generate tick values if not provided
const ticks = $derived.by(() => {
  if (!showTicks) return []

  if (tickValues.length > 0) {
    return tickValues
  }

  // Generate ticks based on step
  const count = Math.floor(range / step) + 1
  // Limit to a reasonable number of ticks
  const stride = count > 20 ? Math.ceil(count / 20) : 1

  return Array.from({ length: Math.ceil(count / stride) }, (_, i) => min + i * stride * step)
})

/**
 * Calculates the percentage position for a value
 * @param {number} val - Value to calculate position for
 * @returns {number} - Percentage (0-100)
 */
function getPercentage(val) {
  return ((val - min) / range) * 100
}

/**
 * Calculates the value from a percentage position
 * @param {number} percentage - Percentage position (0-100)
 * @returns {number} - Value
 */
function getValueFromPercentage(percentage) {
  const rawValue = min + (percentage / 100) * range

  // Round to nearest step
  const steppedValue = Math.round(rawValue / step) * step

  // Ensure value is within bounds
  return Math.max(min, Math.min(max, steppedValue))
}

/**
 * Formats the displayed value
 * @param {number} val - Value to format
 * @returns {string} - Formatted value
 */
function formatValue(val) {
  return valueFormat.replace("{value}", val)
}

/**
 * Updates the value based on pointer position
 * @param {MouseEvent|TouchEvent} event - Pointer event
 */
function updateValue(event) {
  if (disabled || !trackElement) return

  const rect = trackElement.getBoundingClientRect()
  const clientPos = event.type.startsWith("touch") ? event.touches[0].clientX : event.clientX

  // Calculate percentage
  let percentage
  if (orientation === "horizontal") {
    percentage = ((clientPos - rect.left) / rect.width) * 100
  } else {
    percentage = ((rect.bottom - clientPos) / rect.height) * 100
  }

  // Clamp percentage
  percentage = Math.max(0, Math.min(100, percentage))

  // Get value from percentage
  const newValue = getValueFromPercentage(percentage)

  // Update the appropriate thumb
  if (isRange) {
    if (dragIndex >= 0) {
      // Update the dragging thumb
      sliderValues[dragIndex] = newValue

      // Ensure values remain in order
      if (dragIndex === 0 && newValue > sliderValues[1]) {
        sliderValues[0] = sliderValues[1]
      } else if (dragIndex === 1 && newValue < sliderValues[0]) {
        sliderValues[1] = sliderValues[0]
      }
    } else {
      // Determine which thumb to update based on proximity
      const dist0 = Math.abs(percentage - getPercentage(sliderValues[0]))
      const dist1 = Math.abs(percentage - getPercentage(sliderValues[1]))

      if (dist0 < dist1) {
        sliderValues[0] = newValue
        dragIndex = 0
      } else {
        sliderValues[1] = newValue
        dragIndex = 1
      }
    }
  } else {
    sliderValues[0] = newValue
  }

  // Dispatch change event
  dispatchChange()
}

/**
 * Handles pointer down event
 * @param {MouseEvent|TouchEvent} event - Pointer event
 * @param {number} index - Thumb index
 */
function handlePointerDown(event, index) {
  if (disabled) return

  isDragging = true
  dragIndex = index

  // Update value immediately
  updateValue(event)

  // Add document event listeners
  if (event.type === "mousedown") {
    document.addEventListener("mousemove", handlePointerMove)
    document.addEventListener("mouseup", handlePointerUp)
  } else if (event.type === "touchstart") {
    document.addEventListener("touchmove", handlePointerMove, { passive: false })
    document.addEventListener("touchend", handlePointerUp)
  }

  // Prevent default to avoid text selection
  event.preventDefault()
}

/**
 * Handles pointer move event
 * @param {MouseEvent|TouchEvent} event - Pointer event
 */
function handlePointerMove(event) {
  if (!isDragging) return

  updateValue(event)

  // Prevent scrolling on touch devices
  if (event.type === "touchmove") {
    event.preventDefault()
  }
}

/**
 * Handles pointer up event
 */
function handlePointerUp() {
  isDragging = false
  dragIndex = -1

  // Remove document event listeners
  document.removeEventListener("mousemove", handlePointerMove)
  document.removeEventListener("mouseup", handlePointerUp)
  document.removeEventListener("touchmove", handlePointerMove)
  document.removeEventListener("touchend", handlePointerUp)

  // Dispatch final change event
  dispatchChange()
}

/**
 * Handles track click
 * @param {MouseEvent} event - Click event
 */
function handleTrackClick(event) {
  if (disabled) return

  // Only handle direct track clicks
  if (event.target === trackElement) {
    updateValue(event)
  }
}

/**
 * Handles thumb hover
 * @param {number} index - Thumb index
 */
function handleThumbHover(index) {
  hoverIndex = index
}

/**
 * Handles thumb leave
 */
function handleThumbLeave() {
  hoverIndex = -1
}

/**
 * Handles keyboard navigation
 * @param {KeyboardEvent} event - Keydown event
 * @param {number} index - Thumb index
 */
function handleKeydown(event, index) {
  if (disabled) return

  let newValue = sliderValues[index]
  const stepSize = event.shiftKey ? step * 10 : step

  switch (event.key) {
    case "ArrowRight":
    case "ArrowUp":
      newValue = Math.min(max, newValue + stepSize)
      break
    case "ArrowLeft":
    case "ArrowDown":
      newValue = Math.max(min, newValue - stepSize)
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

  // Ensure range values remain in order
  if (isRange) {
    if (index === 0 && newValue > sliderValues[1]) {
      newValue = sliderValues[1]
    } else if (index === 1 && newValue < sliderValues[0]) {
      newValue = sliderValues[0]
    }
  }

  if (newValue !== sliderValues[index]) {
    sliderValues[index] = newValue
    dispatchChange()
    event.preventDefault()
  }
}

/**
 * Dispatches change event
 */
function dispatchChange() {
  const eventValue = isRange ? [...sliderValues] : sliderValues[0]
  onchange?.(new CustomEvent("change", { detail: { value: eventValue } }))
  oninput?.(new CustomEvent("input", { detail: { value: eventValue } }))
}

// Clean up event listeners on destroy
onDestroy(() => {
  document.removeEventListener("mousemove", handlePointerMove)
  document.removeEventListener("mouseup", handlePointerUp)
  document.removeEventListener("touchmove", handlePointerMove)
  document.removeEventListener("touchend", handlePointerUp)
})
</script>

<div
  {id}
  class="
    slider
    slider-{orientation}
    {disabled ? 'slider-disabled' : ''}
    {className}
  "
  aria-disabled={disabled}
>
  {#if name}
    <input 
      type="hidden" 
      {name} 
      value={isRange ? sliderValues.join(',') : sliderValues[0]} 
    />
  {/if}
  
  <div 
    class="slider-container"
    onclick={handleTrackClick}
  >
    <div 
      class="slider-track"
      bind:this={trackElement}
    >
      <div 
        class="slider-track-background"
      ></div>
      
      <div 
        class="slider-track-fill {variantClasses}"
        style="
          {orientation === 'horizontal' 
            ? `left: ${getPercentage(isRange ? sliderValues[0] : min)}%; right: ${100 - getPercentage(isRange ? sliderValues[1] : sliderValues[0])}%` 
            : `bottom: ${getPercentage(isRange ? sliderValues[0] : min)}%; top: ${100 - getPercentage(isRange ? sliderValues[1] : sliderValues[0])}%`}
        "
      ></div>
      
      {#if showTicks}
        <div class="slider-ticks">
          {#each ticks as tick}
            <div 
              class="slider-tick"
              style="
                {orientation === 'horizontal' 
                  ? `left: ${getPercentage(tick)}%` 
                  : `bottom: ${getPercentage(tick)}%`}
              "
            ></div>
          {/each}
        </div>
      {/if}
      
      {#each sliderValues as value, i}
        <div 
          class="
            slider-thumb
            {isDragging && dragIndex === i ? 'slider-thumb-active' : ''}
            {variantClasses}
          "
          style="
            {orientation === 'horizontal' 
              ? `left: ${getPercentage(value)}%` 
              : `bottom: ${getPercentage(value)}%`}
          "
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-orientation={orientation}
          aria-label={ariaLabel || `Slider ${isRange ? i + 1 : ''}`}
          tabindex={disabled ? undefined : 0}
          onmousedown={(e) => handlePointerDown(e, i)}
          ontouchstart={(e) => handlePointerDown(e, i)}
          onkeydown={(e) => handleKeydown(e, i)}
          onmouseenter={() => handleThumbHover(i)}
          onmouseleave={handleThumbLeave}
          bind:this={thumbElements[i]}
        >
          {#if showTooltip && (isDragging && dragIndex === i || hoverIndex === i)}
            <div class="slider-tooltip">
              {formatValue(value)}
            </div>
          {/if}
        </div>
      {/each}
    </div>
    
    {#if showValue}
      <div class="slider-values">
        {#if isRange}
          <div class="slider-value">{formatValue(sliderValues[0])}</div>
          <div class="slider-value">{formatValue(sliderValues[1])}</div>
        {:else}
          <div class="slider-value">{formatValue(sliderValues[0])}</div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .slider {
    @apply w-full;
  }
  
  .slider-horizontal {
    @apply h-12;
  }
  
  .slider-vertical {
    @apply h-48 w-12;
  }
  
  .slider-disabled {
    @apply opacity-50 cursor-not-allowed;
    @apply pointer-events-none;
  }
  
  .slider-container {
    @apply relative;
    @apply h-full;
  }
  
  .slider-track {
    @apply absolute;
    @apply cursor-pointer;
  }
  
  .slider-horizontal .slider-track {
    @apply left-0 right-0 top-1/2 -translate-y-1/2;
    @apply h-1.5;
  }
  
  .slider-vertical .slider-track {
    @apply bottom-0 top-0 left-1/2 -translate-x-1/2;
    @apply w-1.5;
  }
  
  .slider-track-background {
    @apply absolute inset-0;
    @apply bg-muted/20 dark:bg-muted/20;
    @apply rounded-full;
  }
  
  .slider-track-fill {
    @apply absolute;
    @apply rounded-full;
  }
  
  .slider-horizontal .slider-track-fill {
    @apply h-full;
  }
  
  .slider-vertical .slider-track-fill {
    @apply w-full;
  }
  
  .slider-ticks {
    @apply absolute;
    @apply pointer-events-none;
  }
  
  .slider-horizontal .slider-ticks {
    @apply left-0 right-0 top-1/2;
    @apply h-0;
  }
  
  .slider-vertical .slider-ticks {
    @apply bottom-0 top-0 left-1/2;
    @apply w-0;
  }
  
  .slider-tick {
    @apply absolute;
    @apply w-1 h-3;
    @apply bg-muted/40 dark:bg-muted/40;
    @apply rounded-sm;
  }
  
  .slider-horizontal .slider-tick {
    @apply -translate-x-1/2 -translate-y-1/2;
  }
  
  .slider-vertical .slider-tick {
    @apply -translate-x-1/2 translate-y-1/2;
    @apply h-1 w-3;
  }
  
  .slider-thumb {
    @apply absolute;
    @apply w-5 h-5 rounded-full;
    @apply shadow-md;
    @apply cursor-grab;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2;
    @apply transition-transform duration-150;
    @apply z-10;
  }
  
  .slider-horizontal .slider-thumb {
    @apply -translate-x-1/2 -translate-y-1/2;
  }
  
  .slider-vertical .slider-thumb {
    @apply -translate-x-1/2 translate-y-1/2;
  }
  
  .slider-thumb-active {
    @apply cursor-grabbing;
    @apply scale-110;
  }
  
  .slider-tooltip {
    @apply absolute;
    @apply px-2 py-1;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border;
    @apply rounded;
    @apply text-xs font-medium;
    @apply shadow-md;
    @apply whitespace-nowrap;
    @apply z-20;
  }
  
  .slider-horizontal .slider-tooltip {
    @apply bottom-full mb-1.5;
    @apply left-1/2 -translate-x-1/2;
  }
  
  .slider-vertical .slider-tooltip {
    @apply left-full ml-1.5;
    @apply top-1/2 -translate-y-1/2;
  }
  
  .slider-values {
    @apply flex justify-between;
    @apply mt-2;
    @apply text-sm text-muted dark:text-muted;
  }
  
  .slider-vertical .slider-values {
    @apply flex-col h-full justify-between;
    @apply ml-6 mt-0;
  }
</style>
