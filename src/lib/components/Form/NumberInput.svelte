<!--
@component
NumberInput - A specialized input for numeric values with formatting, units, and increment controls.
Provides consistent styling, accessibility features, and integration with the Form component.

Usage:
```svelte
<NumberInput 
  name="quantity" 
  value={1} 
  min={0} 
  max={100} 
  step={1} 
/>

<NumberInput 
  name="price" 
  value={29.99} 
  prefix="$" 
  decimalPlaces={2} 
/>

<NumberInput 
  name="percentage" 
  value={75} 
  suffix="%" 
  verticalButtons 
/>
```
-->
<script lang="ts">
import { getContext } from "svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Input name */
  name?: string
  /** Input value */
  value?: number
  /** Placeholder text */
  placeholder?: string
  /** Minimum allowed value */
  min?: number
  /** Maximum allowed value */
  max?: number
  /** Step increment/decrement amount */
  step?: number
  /** Number of decimal places to display */
  decimalPlaces?: number
  /** Text to display before the number */
  prefix?: string
  /** Text to display after the number */
  suffix?: string
  /** Whether to show increment/decrement buttons */
  showButtons?: boolean
  /** Whether to arrange buttons vertically */
  verticalButtons?: boolean
  /** Whether the input is required */
  required?: boolean
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input is readonly */
  readonly?: boolean
  /** Size of the input (sm, md, lg) */
  size?: "sm" | "md" | "lg"
  /** ARIA label for accessibility */
  ariaLabel?: string
  /** Change event handler */
  onchange?: (event: CustomEvent<{ value: number }>) => void
  /** Input event handler */
  oninput?: (event: CustomEvent<{ value: number }>) => void
  /** Focus event handler */
  onfocus?: (event: FocusEvent) => void
  /** Blur event handler */
  onblur?: (event: FocusEvent) => void
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  name,
  value = 0,
  placeholder = "",
  min,
  max,
  step = 1,
  decimalPlaces,
  prefix,
  suffix,
  showButtons = true,
  verticalButtons = false,
  required = false,
  disabled = false,
  readonly = false,
  size = "md",
  ariaLabel,
  onchange,
  oninput,
  onfocus,
  onblur,
}: Props = $props()

// Get form context if available
const formContext = getContext<FormContext | undefined>("form")

// Generate unique ID if not provided
const inputId = $derived(id || `number-input-${crypto.randomUUID()}`)

// Input state
let inputValue = $state("")
let numericValue: number | undefined = $state()
let isFocused = $state(false)
let inputEl: HTMLInputElement | undefined

$effect(() => {
	numericValue = value
	inputValue = formatValue(value)
})

// Register with form if available
let fieldApi: FormFieldApi | undefined

$effect(() => {
	if (!formContext) return
	if (!name) return
	fieldApi = formContext.registerField(name, value)
})

// Update value when form field changes
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue() as number | undefined
    if (formValue !== undefined && formValue !== numericValue) {
      numericValue = formValue
      inputValue = formatValue(formValue)
    }
  }
})

// Update internal value when prop changes
$effect(() => {
  if (value !== numericValue) {
    numericValue = value
    inputValue = formatValue(value)
  }
})

// Disabled from form context takes precedence over the local prop
// (fieldApi.isDisabled is a superset of formContext.disabled — check it first)
const effectiveDisabled = $derived(
  disabled || (fieldApi?.isDisabled() ?? false) || (formContext?.disabled() ?? false)
)

/**
 * Formats a numeric value for display
 * @param {number} val - Value to format
 * @returns {string} - Formatted value
 */
function formatValue(val: number | undefined | null): string {
  if (val === undefined || val === null) return ""

  let formatted = decimalPlaces !== undefined ? val.toFixed(decimalPlaces) : val.toString()

  return formatted
}

/**
 * Parses a string value to a number
 * @param {string} val - Value to parse
 * @returns {number} - Parsed number
 */
function parseValue(val: string): number {
  if (!val) return 0

  // Remove non-numeric characters except decimal point
  const numericString = val.replace(/[^\d.-]/g, "")
  return parseFloat(numericString)
}

/**
 * Constrains a value to min/max bounds
 * @param {number} val - Value to constrain
 * @returns {number} - Constrained value
 */
function constrainValue(val: number): number {
  let constrained = val

  if (min !== undefined && constrained < min) {
    constrained = min
  }

  if (max !== undefined && constrained > max) {
    constrained = max
  }

  return constrained
}

/**
 * Increments the current value
 */
function increment(): void {
  if (effectiveDisabled || readonly) return

  const currentValue = parseValue(inputValue)
  const newValue = constrainValue(currentValue + step)

  numericValue = newValue
  inputValue = formatValue(newValue)

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(newValue)
  }

  onchange?.(new CustomEvent("change", { detail: { value: newValue } }))
}

/**
 * Decrements the current value
 */
function decrement(): void {
  if (effectiveDisabled || readonly) return

  const currentValue = parseValue(inputValue)
  const newValue = constrainValue(currentValue - step)

  numericValue = newValue
  inputValue = formatValue(newValue)

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(newValue)
  }

  onchange?.(new CustomEvent("change", { detail: { value: newValue } }))
}

/**
 * Handles input change
 * @param {Event} event - Input event
 */
function handleInput(event: Event): void {
  const rawValue = (event.target as HTMLInputElement).value
  inputValue = rawValue

  // Only update numeric value if it's a valid number
  const parsed = parseValue(rawValue)
  if (!isNaN(parsed)) {
    numericValue = parsed

    // Update form field if available
    if (fieldApi) {
      fieldApi.setValue(parsed)
    }

    oninput?.(new CustomEvent("input", { detail: { value: parsed } }))
  }
}

/**
 * Handles blur event
 */
function handleBlur(event: FocusEvent): void {
  // Format and constrain the value on blur
  const parsed = parseValue(inputValue)
  const constrained = constrainValue(parsed)

  numericValue = constrained
  inputValue = formatValue(constrained)

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(constrained)
  }

  isFocused = false
  onblur?.(event)
  onchange?.(new CustomEvent("change", { detail: { value: constrained } }))
}

/**
 * Handles focus event
 */
function handleFocus(event: FocusEvent): void {
  isFocused = true
  onfocus?.(event)
}

/**
 * Handles keydown event
 * @param {KeyboardEvent} event - Keydown event
 */
function handleKeydown(event: KeyboardEvent): void {
  if (effectiveDisabled || readonly) return

  if (event.key === "ArrowUp") {
    event.preventDefault()
    increment()
  } else if (event.key === "ArrowDown") {
    event.preventDefault()
    decrement()
  }
}

// Determine size classes
const sizeClasses = $derived(
  {
    sm: "h-8 text-sm",
    md: "h-10 text-base",
    lg: "h-12 text-lg",
  }[size] || "h-10 text-base"
)

// Determine button size classes
const buttonSizeClasses = $derived(
  {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  }[size] || "w-8 h-8"
)
</script>

<div
  class="
    number-input
    {verticalButtons ? 'number-input-vertical' : 'number-input-horizontal'}
    {className}
  "
>
  <div class="number-input-container {sizeClasses}">
    {#if prefix}
      <span class="number-input-prefix">{prefix}</span>
    {/if}
    
    <input
      {id}
      {name}
      type="text"
      inputmode="decimal"
      class="number-input-field"
      {placeholder}
      value={inputValue}
      {required}
      disabled={effectiveDisabled}
      {readonly}
      min={min !== undefined ? min : undefined}
      max={max !== undefined ? max : undefined}
      step={step}
      aria-label={ariaLabel || name}
      bind:this={inputEl}
      oninput={handleInput}
      onblur={handleBlur}
      onfocus={handleFocus}
      onkeydown={handleKeydown}
    />
    
    {#if suffix}
      <span class="number-input-suffix">{suffix}</span>
    {/if}
    
    {#if showButtons}
      <div class="number-input-buttons {verticalButtons ? 'number-input-buttons-vertical' : ''}">
        <button
          type="button"
          class="number-input-button number-input-increment {buttonSizeClasses}"
          aria-label="Increase value"
          tabindex="-1"
          disabled={effectiveDisabled || readonly || (max !== undefined && (numericValue !== undefined && numericValue >= max))}
          onclick={increment}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
          </svg>
        </button>
        
        <button
          type="button"
          class="number-input-button number-input-decrement {buttonSizeClasses}"
          aria-label="Decrease value"
          tabindex="-1"
          disabled={effectiveDisabled || readonly || (min !== undefined && (numericValue !== undefined && numericValue <= min))}
          onclick={decrement}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .number-input {
    @apply w-full;
  }
  
  .number-input-container {
    @apply relative flex items-center;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border rounded-md;
    @apply focus-within:ring-2 focus-within:ring-primary-500 dark:focus-within:ring-primary-400 focus-within:border-primary-500 dark:focus-within:border-primary-400;
    @apply transition-colors duration-200;
  }
  
  .number-input-field {
    @apply w-full h-full px-3 bg-transparent border-none outline-none;
    @apply text-text dark:text-text placeholder:text-muted dark:placeholder:text-muted;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .number-input-prefix {
    @apply pl-3 text-muted dark:text-muted;
  }
  
  .number-input-suffix {
    @apply pr-3 text-muted dark:text-muted;
  }
  
  .number-input-buttons {
    @apply flex;
  }
  
  .number-input-buttons-vertical {
    @apply flex-col absolute right-0 top-0 h-full;
  }
  
  .number-input-horizontal .number-input-field {
    @apply pr-16;
  }
  
  .number-input-horizontal .number-input-buttons {
    @apply absolute right-0 h-full border-l border-border dark:border-border;
  }
  
  .number-input-button {
    @apply flex items-center justify-center;
    @apply text-muted dark:text-muted;
    @apply hover:bg-hover dark:hover:bg-hover hover:text-text dark:hover:text-text;
    @apply focus:outline-none focus:bg-hover dark:focus:bg-hover;
    @apply disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent;
    @apply transition-colors duration-150;
  }
  
  .number-input-vertical .number-input-increment {
    @apply rounded-tr-md border-b border-border dark:border-border;
  }
  
  .number-input-vertical .number-input-decrement {
    @apply rounded-br-md;
  }
  
  .number-input-horizontal .number-input-increment {
    @apply border-r border-border dark:border-border;
  }
  
  .number-input-horizontal .number-input-decrement {
    @apply rounded-r-md;
  }
</style>
