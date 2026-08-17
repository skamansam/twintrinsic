<script module lang="ts">
export const propsMetadata = [
  { name: "type", type: "string", description: "Input type (text, email, password, etc.)", default: "\"text\"", optional: true },
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "startIcon", type: "string", description: "Icon (HTML or SVG string) shown before the input", optional: true },
  { name: "endIcon", type: "string", description: "Icon (HTML or SVG string) shown after the input", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", optional: true },
  { name: "name", type: "string", description: "Name attribute for the input", optional: true },
  { name: "placeholder", type: "string", description: "Placeholder text", default: "\"\"", optional: true },
  { name: "value", type: "string", description: "Input value", default: "\"\"", optional: true },
  { name: "required", type: "boolean", description: "Whether the input is required", default: "false", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the input is disabled", default: "false", optional: true },
  { name: "readonly", type: "boolean", description: "Whether the input is read-only", default: "false", optional: true },
  { name: "minlength", type: "number", description: "Minimum number of characters", optional: true },
  { name: "maxlength", type: "number", description: "Maximum number of characters", optional: true },
  { name: "pattern", type: "string", description: "Validation pattern", optional: true },
  { name: "autocomplete", type: "string", description: "Autocomplete hint for the browser", optional: true },
  { name: "size", type: "string", description: "Size of the input (sm, md, lg)", default: "\"md\"", optional: true },
  { name: "clearable", type: "boolean", description: "Whether to show a clear button when the input has a value", default: "false", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for the input", optional: true },
  { name: "oninput", type: "(event: CustomEvent<{ value: string }>) => void", description: "Callback fired on input with the current value", optional: true, eventDetail: "{ value: string }" },
  { name: "onchange", type: "(event: CustomEvent<{ value: string }>) => void", description: "Callback fired on change with the current value", optional: true, eventDetail: "{ value: string }" },
  { name: "onfocus", type: "(event: FocusEvent) => void", description: "Callback fired when the input receives focus", optional: true },
  { name: "onblur", type: "(event: FocusEvent) => void", description: "Callback fired when the input loses focus", optional: true },
  { name: "onclear", type: "() => void", description: "Callback fired when the input is cleared", optional: true },
];
</script>

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
import type { FormContext, FormFieldApi } from "./formContext.js"

interface Props {
  /** Input type (text, email, password, etc.) */
  type?: string
  /** Additional CSS classes */
  class?: string
  /** Icon (HTML or SVG string) shown before the input */
  startIcon?: string
  /** Icon (HTML or SVG string) shown after the input */
  endIcon?: string
  /** HTML id for accessibility */
  id?: string
  /** Name attribute for the input */
  name?: string
  /** Placeholder text */
  placeholder?: string
  /** Input value */
  value?: string
  /** Whether the input is required */
  required?: boolean
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input is read-only */
  readonly?: boolean
  /** Minimum number of characters */
  minlength?: number
  /** Maximum number of characters */
  maxlength?: number
  /** Validation pattern */
  pattern?: string
  /** Autocomplete hint for the browser */
  autocomplete?: string
  /** Size of the input (sm, md, lg) */
  size?: string
  /** Whether to show a clear button when the input has a value */
  clearable?: boolean
  /** ARIA label for the input */
  ariaLabel?: string
  /** Callback fired on input with the current value */
  oninput?: (event: CustomEvent<{ value: string }>) => void
  /** Callback fired on change with the current value */
  onchange?: (event: CustomEvent<{ value: string }>) => void
  /** Callback fired when the input receives focus */
  onfocus?: (event: FocusEvent) => void
  /** Callback fired when the input loses focus */
  onblur?: (event: FocusEvent) => void
  /** Callback fired when the input is cleared */
  onclear?: () => void
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
}

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
}: Props = $props()

// Get form context if available
const formContext = getContext<FormContext | undefined>("form")

// Derived values for reactive prop access in closures
const derivedValue = $derived(value)
const derivedName = $derived(name)

// Generate unique ID if not provided
const inputId = $derived(id || `input-${crypto.randomUUID()}`)

// Input state
let inputValue = $state("")
let isFocused = $state(false)
let fieldApi: FormFieldApi | undefined

// Register with form if available
$effect(() => {
  if (formContext && name) {
    fieldApi = formContext.registerField(name, value as string)
  }
})

// Update value when form field changes
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue() as string | null | undefined
    if (formValue !== undefined && formValue !== null && formValue !== inputValue) {
      inputValue = formValue
    }
  }
})

// Update input value when prop changes
$effect(() => {
	inputValue = derivedValue
})

// Disabled from form context takes precedence over the local prop
// (fieldApi.isDisabled is a superset of formContext.disabled — check it first)
const effectiveDisabled = $derived(
  disabled || (fieldApi?.isDisabled() ?? false) || (formContext?.disabled() ?? false)
)

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
      disabled={effectiveDisabled}
      {readonly}
      {minlength}
      {maxlength}
      {pattern}
      autocomplete={autocomplete as HTMLInputElement["autocomplete"]}
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
