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
<script lang="ts">
import { getContext, onMount } from "svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Input name */
  name?: string
  /** Current value */
  value?: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Size of the knob (sm, md, lg, xl) */
  size?: string
  /** Whether the knob is disabled */
  disabled?: boolean
  /** Whether to show the current value */
  showValue?: boolean
  /** Template for displaying the value, use {value} as placeholder */
  valueTemplate?: string
  /** Color of the progress arc */
  color?: string
  /** Thickness of the progress arc (1-10) */
  thickness?: number
  /** Whether to show tick marks */
  showTicks?: boolean
  /** Input event handler */
  oninput?: (event: CustomEvent<{ value: number }>) => void
  /** Change event handler */
  onchange?: (event: CustomEvent<{ value: number }>) => void
  /** Number of tick marks to display */
  tickCount?: number
  /** ARIA label for accessibility */
  ariaLabel?: string
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  name,
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  disabled = false,
  showValue = false,
  valueTemplate = "{value}",
  color,
  thickness = 4,
  showTicks = false,
  oninput,
  onchange,
  tickCount = 10,
  ariaLabel,
}: Props = $props()

// Get form context if available
const formContext = getContext<FormContext | undefined>("form")

// Derived values for reactive prop access in closures
const derivedValue = $derived(value)
const derivedName = $derived(name)

// Component state
let currentValue = $state(0)
let isDragging = $state(false)
let knobElement: HTMLElement | undefined = $state()
let radius = $state(0)
let center = $state({ x: 0, y: 0 })

// Register with form if available
let fieldApi: FormFieldApi | undefined

$effect(() => {
  if (formContext && derivedName) {
    fieldApi = formContext.registerField(derivedName, derivedValue)
  }
})

// Update value when form field changes
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue()
    if (formValue !== undefined && formValue !== currentValue) {
      currentValue = formValue as number
    }
  }
})

// Update internal value when prop changes
$effect(() => {
	currentValue = derivedValue
})

// Disabled from form context takes precedence over the local prop
// (fieldApi.isDisabled is a superset of formContext.disabled — check it first)
const effectiveDisabled = $derived(
  disabled || (fieldApi?.isDisabled() ?? false) || (formContext?.disabled() ?? false)
)

/**
 * Constrains a value to min/max bounds and applies step
 * @param {number} val - Value to constrain
 * @returns {number} - Constrained value
 */
function constrainValue(val: number): number {
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
function valueToPercentage(val: number): number {
  return ((val - min) / (max - min)) * 100
}

/**
 * Converts a percentage to a value
 * @param {number} percentage - Percentage (0-100)
 * @returns {number} - Value
 */
function percentageToValue(percentage: number): number {
  return (percentage / 100) * (max - min) + min
}

/**
 * Formats the current value using the template
 * @returns {string} - Formatted value
 */
function formatValue(): string {
  return valueTemplate.replace("{value}", currentValue.toString())
}

/**
 * Calculates the SVG path for the progress arc
 * @param {number} percentage - Percentage (0-100)
 * @returns {string} - SVG path
 */
function calculateArc(percentage: number): string {
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
function calculateTicks(): Array<{x1: number; y1: number; x2: number; y2: number}> {
  const ticks: Array<{x1: number; y1: number; x2: number; y2: number}> = []
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
function calculateAngle(x: number, y: number): number {
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
function angleToPercentage(angle: number): number {
  return (angle / 360) * 100
}

/**
 * Updates the value based on mouse/touch position
 * @param {MouseEvent|TouchEvent} event - Mouse or touch event
 */
function updateValueFromEvent(event: MouseEvent | TouchEvent): void {
  if (effectiveDisabled) return
  if (!knobElement) return

  // Get coordinates
  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY

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

  // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding
  oninput?.(new CustomEvent("input", { detail: { value: newValue } }))
}

/**
 * Starts dragging
 * @param {MouseEvent|TouchEvent} event - Mouse or touch event
 */
function startDrag(event: MouseEvent | TouchEvent): void {
  if (effectiveDisabled) return

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
function stopDrag(): void {
  if (!isDragging) return

  isDragging = false

  // Remove event listeners
  document.removeEventListener("mousemove", updateValueFromEvent)
  document.removeEventListener("mouseup", stopDrag)
  document.removeEventListener("touchmove", updateValueFromEvent)
  document.removeEventListener("touchend", stopDrag)

  // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding
  onchange?.(new CustomEvent("change", { detail: { value: currentValue } }))
}

/**
 * Handles keyboard navigation
 * @param {KeyboardEvent} event - Keydown event
 */
function handleKeydown(event: KeyboardEvent): void {
  if (effectiveDisabled) return

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

    // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding
  oninput?.(new CustomEvent("input", { detail: { value: newValue } }))
    onchange?.(new CustomEvent("change", { detail: { value: newValue } }))
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
  class:disabled={effectiveDisabled}
  tabindex={effectiveDisabled ? undefined : 0}
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
    role="presentation"
    aria-hidden="true"
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
    disabled={effectiveDisabled}
  />
</div>

<style lang="postcss">
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
