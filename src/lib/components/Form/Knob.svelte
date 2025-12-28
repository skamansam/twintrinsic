<!--
@component
Knob - A circular progress slider component for selecting numeric values.
Provides an intuitive circular interface with drag interaction and keyboard controls.

Usage:
```svelte
<Knob 
  name="volume" 
  value={50} 
  min={0} 
  max={100} 
/>

<Knob 
  name="progress" 
  value={75} 
  showValue 
  valueTemplate="{value}%" 
  size="lg" 
/>

<FormField label="Temperature">
  <Knob 
    name="temperature" 
    value={22} 
    min={15} 
    max={30} 
    step={0.5} 
    color="var(--color-primary-500)" 
  />
</FormField>
```
-->
<script>
import { getContext, createEventDispatcher, onMount } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Input name */
  name,

  /** @type {number} - Current value */
  value = 0,

  /** @type {number} - Minimum value */
  min = 0,

  /** @type {number} - Maximum value */
  max = 100,

  /** @type {number} - Step increment */
  step = 1,

  /** @type {string} - Size of the knob (sm, md, lg, xl) */
  size = "md",

  /** @type {boolean} - Whether the knob is disabled */
  disabled = false,

  /** @type {boolean} - Whether to show the current value */
  showValue = false,

  /** @type {string} - Template for displaying the value, use {value} as placeholder */
  valueTemplate = "{value}",

  /** @type {string} - Color of the progress arc */
  color,

  /** @type {number} - Thickness of the progress arc (1-10) */
  thickness = 4,

  /** @type {boolean} - Whether to show tick marks */
  showTicks = false,

  /** @type {number} - Number of tick marks to display */
  tickCount = 10,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel,
} = $props()

const dispatch = createEventDispatcher()

// Get form context if available
const formContext = getContext("form")

// Component state
let currentValue = $state(value)
let isDragging = $state(false)
let knobElement = $state()
let radius = $state(0)
let center = $state({ x: 0, y: 0 })

// Register with form if available
let fieldApi = $state()

$effect(() => {
  if (formContext && name) {
    fieldApi = formContext.registerField(name, value)
  }
})

// Update value when form field changes
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue()
    if (formValue !== undefined && formValue !== currentValue) {
      currentValue = formValue
    }
  }
})

// Update internal value when prop changes
$effect(() => {
  currentValue = value
})

/**
 * Constrains a value to min/max bounds and applies step
 * @param {number} val - Value to constrain
 * @returns {number} - Constrained value
 */
function constrainValue(val) {
  // Apply min/max constraints
  let constrained = Math.max(min, Math.min(max, val))

  // Apply step
  if (step !== 0) {
    constrained = Math.round((constrained - min) / step) * step + min
  }

  return constrained
}

/**
 * Converts a value to a percentage (0-100)
 * @param {number} val - Value to convert
 * @returns {number} - Percentage
 */
function valueToPercentage(val) {
  return ((val - min) / (max - min)) * 100
}

/**
 * Converts a percentage to a value
 * @param {number} percentage - Percentage (0-100)
 * @returns {number} - Value
 */
function percentageToValue(percentage) {
  return (percentage / 100) * (max - min) + min
}

/**
 * Formats the current value using the template
 * @returns {string} - Formatted value
 */
function formatValue() {
  return valueTemplate.replace("{value}", currentValue.toString())
}

/**
 * Calculates the SVG path for the progress arc
 * @param {number} percentage - Percentage (0-100)
 * @returns {string} - SVG path
 */
function calculateArc(percentage) {
  const r = 50 - thickness / 2 // Adjust radius for thickness
  const circumference = 2 * Math.PI * r
  const arcLength = (percentage / 100) * circumference
  const dashArray = `${arcLength} ${circumference}`

  return dashArray
}

/**
 * Calculates tick positions
 * @returns {Array} - Array of tick positions
 */
function calculateTicks() {
  const ticks = []
  const r = 50 - thickness / 2 // Adjust radius for thickness

  for (let i = 0; i < tickCount; i++) {
    const percentage = (i / (tickCount - 1)) * 100
    const angle = (percentage / 100) * 360 - 90 // -90 to start at top
    const angleRad = (angle * Math.PI) / 180

    const x1 = 50 + (r - 2) * Math.cos(angleRad)
    const y1 = 50 + (r - 2) * Math.sin(angleRad)
    const x2 = 50 + (r + 2) * Math.cos(angleRad)
    const y2 = 50 + (r + 2) * Math.sin(angleRad)

    ticks.push({ x1, y1, x2, y2 })
  }

  return ticks
}

/**
 * Calculates the angle from center to a point
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {number} - Angle in degrees (0-360)
 */
function calculateAngle(x, y) {
  const dx = x - center.x
  const dy = y - center.y

  // Calculate angle in radians
  let angle = Math.atan2(dy, dx)

  // Convert to degrees and adjust to start from top (0 degrees)
  angle = (angle * 180) / Math.PI + 90

  // Ensure angle is between 0-360
  if (angle < 0) angle += 360

  return angle
}

/**
 * Converts an angle to a percentage
 * @param {number} angle - Angle in degrees (0-360)
 * @returns {number} - Percentage (0-100)
 */
function angleToPercentage(angle) {
  return (angle / 360) * 100
}

/**
 * Updates the value based on mouse/touch position
 * @param {MouseEvent|TouchEvent} event - Mouse or touch event
 */
function updateValueFromEvent(event) {
  if (disabled) return

  // Get coordinates
  const clientX = event.type.includes("touch") ? event.touches[0].clientX : event.clientX
  const clientY = event.type.includes("touch") ? event.touches[0].clientY : event.clientY

  // Get element position
  const rect = knobElement.getBoundingClientRect()
  const x = clientX - rect.left
  const y = clientY - rect.top

  // Calculate angle and percentage
  const angle = calculateAngle(x, y)
  const percentage = angleToPercentage(angle)

  // Update value
  const newValue = constrainValue(percentageToValue(percentage))
  currentValue = newValue

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(newValue)
  }

  dispatch("input", { value: newValue })
}

/**
 * Starts dragging
 * @param {MouseEvent|TouchEvent} event - Mouse or touch event
 */
function startDrag(event) {
  if (disabled) return

  isDragging = true
  updateValueFromEvent(event)

  // Add event listeners for drag
  if (event.type === "mousedown") {
    document.addEventListener("mousemove", updateValueFromEvent)
    document.addEventListener("mouseup", stopDrag)
  } else if (event.type === "touchstart") {
    document.addEventListener("touchmove", updateValueFromEvent)
    document.addEventListener("touchend", stopDrag)
  }
}

/**
 * Stops dragging
 */
function stopDrag() {
  if (!isDragging) return

  isDragging = false

  // Remove event listeners
  document.removeEventListener("mousemove", updateValueFromEvent)
  document.removeEventListener("mouseup", stopDrag)
  document.removeEventListener("touchmove", updateValueFromEvent)
  document.removeEventListener("touchend", stopDrag)

  dispatch("change", { value: currentValue })
}

/**
 * Handles keyboard navigation
 * @param {KeyboardEvent} event - Keydown event
 */
function handleKeydown(event) {
  if (disabled) return

  let newValue = currentValue

  switch (event.key) {
    case "ArrowUp":
    case "ArrowRight":
      event.preventDefault()
      newValue = constrainValue(currentValue + step)
      break

    case "ArrowDown":
    case "ArrowLeft":
      event.preventDefault()
      newValue = constrainValue(currentValue - step)
      break

    case "Home":
      event.preventDefault()
      newValue = min
      break

    case "End":
      event.preventDefault()
      newValue = max
      break

    case "PageUp":
      event.preventDefault()
      newValue = constrainValue(currentValue + step * 10)
      break

    case "PageDown":
      event.preventDefault()
      newValue = constrainValue(currentValue - step * 10)
      break
  }

  if (newValue !== currentValue) {
    currentValue = newValue

    // Update form field if available
    if (fieldApi) {
      fieldApi.setValue(newValue)
    }

    dispatch("input", { value: newValue })
    dispatch("change", { value: newValue })
  }
}

// Initialize component
onMount(() => {
  if (knobElement) {
    const rect = knobElement.getBoundingClientRect()
    radius = rect.width / 2
    center = { x: radius, y: radius }
  }

  return () => {
    // Clean up event listeners
    document.removeEventListener("mousemove", updateValueFromEvent)
    document.removeEventListener("mouseup", stopDrag)
    document.removeEventListener("touchmove", updateValueFromEvent)
    document.removeEventListener("touchend", stopDrag)
  }
})

// Computed values
const percentage = $derived(valueToPercentage(currentValue))
const arcDashArray = $derived(calculateArc(percentage))
const ticks = $derived(showTicks ? calculateTicks() : [])

// Determine size classes
const sizeClasses = $derived(
  {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  }[size] || "w-24 h-24"
)

// Determine font size classes
const fontSizeClasses = $derived(
  {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  }[size] || "text-sm"
)
</script>

<div
  {id}
  class="knob {sizeClasses} {className}"
  class:disabled
  tabindex={disabled ? undefined : 0}
  role="slider"
  aria-valuemin={min}
  aria-valuemax={max}
  aria-valuenow={currentValue}
  aria-label={ariaLabel || name}
  onkeydown={handleKeydown}
  bind:this={knobElement}
>
  <svg
    viewBox="0 0 100 100"
    class="knob-svg"
    onmousedown={startDrag}
    ontouchstart={startDrag}
  >
    <!-- Background circle -->
    <circle
      cx="50"
      cy="50"
      r={50 - thickness / 2}
      class="knob-track"
      stroke-width={thickness}
    />
    
    <!-- Progress arc -->
    <circle
      cx="50"
      cy="50"
      r={50 - thickness / 2}
      class="knob-progress"
      stroke-width={thickness}
      stroke-dasharray={arcDashArray}
      style={color ? `stroke: ${color}` : ''}
      transform="rotate(-90 50 50)"
    />
    
    <!-- Tick marks -->
    {#if showTicks}
      {#each ticks as tick}
        <line
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          class="knob-tick"
        />
      {/each}
    {/if}
    
    <!-- Indicator dot -->
    {#if !showValue}
      <circle
        cx={50 + (50 - thickness / 2 - 3) * Math.cos((percentage / 100 * 360 - 90) * Math.PI / 180)}
        cy={50 + (50 - thickness / 2 - 3) * Math.sin((percentage / 100 * 360 - 90) * Math.PI / 180)}
        r="3"
        class="knob-indicator"
        style={color ? `fill: ${color}` : ''}
      />
    {/if}
    
    <!-- Value text -->
    {#if showValue}
      <text
        x="50"
        y="50"
        text-anchor="middle"
        dominant-baseline="middle"
        class="knob-value {fontSizeClasses}"
      >
        {formatValue()}
      </text>
    {/if}
  </svg>
  
  <!-- Hidden input for form submission -->
  <input
    type="hidden"
    {name}
    value={currentValue}
    {disabled}
  />
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .knob {
    @apply relative inline-block;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-full;
  }
  
  .knob.disabled {
    @apply opacity-50 cursor-not-allowed;
  }
  
  .knob-svg {
    @apply w-full h-full cursor-pointer;
  }
  
  .knob.disabled .knob-svg {
    @apply cursor-not-allowed;
  }
  
  .knob-track {
    @apply fill-none stroke-border dark:stroke-border;
  }
  
  .knob-progress {
    @apply fill-none stroke-primary-500 dark:stroke-primary-400;
    stroke-linecap: round;
    transform-origin: center;
    stroke-dashoffset: 0;
  }
  
  .knob-indicator {
    @apply fill-primary-500 dark:fill-primary-400;
  }
  
  .knob-tick {
    @apply stroke-border dark:stroke-border;
    stroke-width: 1;
  }
  
  .knob-value {
    @apply fill-text dark:fill-text font-medium;
  }
</style>
