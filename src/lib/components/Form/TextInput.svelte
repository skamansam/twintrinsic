<script lang="ts">
/**
 * @component
 * TextInput - A styled text input component with support for various input types.
 * Provides consistent styling, accessibility features, and integration with the Form component.
 *
 * Usage:
 * ```svelte
 * <TextInput 
 *   name="username"
 *   placeholder="Enter username"
 *   value="initialValue"
 * />
 *
 * <TextInput 
 *   type="email"
 *   name="email"
 *   required
 * />
 * ```
 */
import { getContext } from "svelte"
import Icon from "../Icon/Icon.svelte"

let {
  type = "text",
  class: className = "",
  startIcon,
  endIcon,
  id,
  name,
  placeholder = "",
  value = "",
  required = false,
  disabled = false,
  readonly = false,
  minlength,
  maxlength,
  pattern,
  autocomplete,
  size = "md",
  clearable = false,
  ariaLabel,
  oninput,
  onchange,
  onfocus,
  onblur,
  onclear,
  ...restProps
} = $props()

// Get form context if available
const formContext = getContext("form")

// Derived values for reactive prop access in closures
const derivedValue = $derived(value)
const derivedName = $derived(name)

// Generate unique ID if not provided
const inputId = $derived(id || `input-${crypto.randomUUID()}`)

// Input state
let inputValue = $state("")
let isFocused = $state(false)
let fieldApi = $state()

// Register with form if available
$effect(() => {
  if (formContext && name) {
    fieldApi = formContext.registerField(name, value)
  }
})

// Update value when form field changes
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue()
    if (formValue !== undefined && formValue !== inputValue) {
      inputValue = formValue
    }
  }
})

// Update input value when prop changes
$effect(() => {
	inputValue = derivedValue
})

/**
 * Handles input changes
 * @param {Event} event - Input event
 */
function handleInput(event: Event): void {
  const newValue = (event.target as HTMLInputElement).value
  inputValue = newValue

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(newValue)
  }

  oninput?.(new CustomEvent("input", { detail: { value: newValue } }))
  onchange?.(new CustomEvent("change", { detail: { value: newValue } }))
}

/**
 * Handles focus events
 */
function handleFocus(event: FocusEvent): void {
  isFocused = true
  onfocus?.(event)
}

/**
 * Handles blur events
 */
function handleBlur(event: FocusEvent): void {
  isFocused = false
  onblur?.(event)
}

/**
 * Clears the input value
 */
function clearInput(): void {
  inputValue = ""

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue("")
  }

  oninput?.(new CustomEvent("input", { detail: { value: "" } }))
  onchange?.(new CustomEvent("change", { detail: { value: "" } }))
  onclear?.()
}

// Determine input size classes
const sizeClasses = $derived(
  {
    sm: "h-8 text-sm px-2",
    md: "h-10 text-base px-3",
    lg: "h-12 text-lg px-4",
  }[size] || "h-10 text-base px-3"
)
</script>

<div class="input-wrapper {className}">
  <div class="input-container {isFocused ? 'is-focused' : ''}">
    {#if startIcon}
      <div class="input-icon input-icon-start">
        {@html startIcon}
      </div>
    {/if}
    
    <input
      {type}
      id={inputId}
      {name}
      {placeholder}
      value={inputValue}
      {required}
      disabled={disabled || (fieldApi && fieldApi.isDisabled())}
      {readonly}
      {minlength}
      {maxlength}
      {pattern}
      {autocomplete}
      aria-label={ariaLabel}
      class="input {sizeClasses} {startIcon ? 'pl-9' : ''} {(endIcon || clearable) ? 'pr-9' : ''}"
      oninput={handleInput}
      onfocus={handleFocus}
      onblur={handleBlur}
      {...restProps}
    />
    
    {#if clearable && inputValue}
      <button
        type="button"
        class="input-clear-button"
        aria-label="Clear input"
        onclick={clearInput}
        tabindex="-1"
      >
        <Icon name="x" width="16px" height="16px" />
      </button>
    {:else if endIcon}
      <div class="input-icon input-icon-end">
        {@html endIcon}
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .input-wrapper {
    @apply w-full;
  }
  
  .input-container {
    @apply relative flex items-center;
  }
  
  .input {
    @apply w-full rounded-md border-border dark:border-border bg-background dark:bg-background text-text dark:text-text;
    @apply border focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400;
    @apply disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface dark:disabled:bg-surface;
    @apply placeholder:text-muted dark:placeholder:text-muted;
  }
  
  .input-icon {
    @apply absolute flex items-center justify-center w-9 h-full text-muted dark:text-muted pointer-events-none;
  }
  
  .input-icon-start {
    @apply left-0;
  }
  
  .input-icon-end {
    @apply right-0;
  }
  
  .input-clear-button {
    @apply absolute right-0 flex items-center justify-center w-9 h-full text-muted dark:text-muted;
    @apply hover:text-text dark:hover:text-text focus:outline-none;
  }
  
  .is-focused .input-icon,
  .is-focused .input-clear-button {
    @apply text-primary-500 dark:text-primary-400;
  }
</style>
