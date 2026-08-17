<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", optional: true },
  { name: "name", type: "string", description: "Name attribute for the textarea", optional: true },
  { name: "placeholder", type: "string", description: "Placeholder text", default: "\"\"", optional: true },
  { name: "value", type: "string", description: "Textarea value", default: "\"\"", optional: true },
  { name: "rows", type: "number", description: "Number of visible rows", default: "3", optional: true },
  { name: "required", type: "boolean", description: "Whether the textarea is required", default: "false", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the textarea is disabled", default: "false", optional: true },
  { name: "readonly", type: "boolean", description: "Whether the textarea is read-only", default: "false", optional: true },
  { name: "minlength", type: "number", description: "Minimum number of characters", optional: true },
  { name: "maxlength", type: "number", description: "Maximum number of characters", optional: true },
  { name: "autocomplete", type: "string", description: "Autocomplete hint for the browser", optional: true },
  { name: "autoResize", type: "boolean", description: "Whether to auto-resize the textarea to fit its content", default: "false", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for the textarea", optional: true },
  { name: "oninput", type: "(event: CustomEvent<{ value: string }>) => void", description: "Input event handler", optional: true, eventDetail: "{ value: string }" },
  { name: "onchange", type: "(event: CustomEvent<{ value: string }>) => void", description: "Change event handler", optional: true, eventDetail: "{ value: string }" },
  { name: "onfocus", type: "(event: FocusEvent) => void", description: "Focus event handler", optional: true },
  { name: "onblur", type: "(event: FocusEvent) => void", description: "Blur event handler", optional: true },
];
</script>

<script lang="ts">
/**
 * @component
 * Textarea - A styled textarea component for multi-line text input.
 * Provides consistent styling, accessibility features, and integration with the Form component.
 *
 * Usage:
 * ```svelte
 * <Textarea 
 *   name="description"
 *   placeholder="Enter description"
 *   rows={4}
 * />
 *
 * <FormField label="Message">
 *   <Textarea name="message" required />
 * </FormField>
 * ```
 */
import { getContext } from "svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"

let {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = undefined,

  /** @type {string} - Name attribute for the textarea */
  name = undefined,

  /** @type {string} - Placeholder text */
  placeholder = "",

  /** @type {string} - Textarea value */
  value = "",

  /** @type {number} - Number of visible rows */
  rows = 3,

  /** @type {boolean} - Whether the textarea is required */
  required = false,

  /** @type {boolean} - Whether the textarea is disabled */
  disabled = false,

  /** @type {boolean} - Whether the textarea is read-only */
  readonly = false,

  /** @type {number} - Minimum number of characters */
  minlength = undefined,

  /** @type {number} - Maximum number of characters */
  maxlength = undefined,

  /** @type {string} - Autocomplete hint for the browser */
  autocomplete = undefined,

  /** @type {boolean} - Whether to auto-resize the textarea to fit its content */
  autoResize = false,

  /** @type {string} - ARIA label for the textarea */
  ariaLabel = undefined,

  /** @type {(event: CustomEvent<{ value: string }>) => void} - Input event handler */
  oninput = undefined,

  /** @type {(event: CustomEvent<{ value: string }>) => void} - Change event handler */
  onchange = undefined,

  /** @type {(event: FocusEvent) => void} - Focus event handler */
  onfocus = undefined,

  /** @type {(event: FocusEvent) => void} - Blur event handler */
  onblur = undefined,

  ...restProps
} = $props()

// Get form context if available
const formContext = getContext<FormContext | undefined>("form")

// Derived values for reactive prop access in closures
const derivedValue = $derived(value)
const derivedName = $derived(name)

// Generate unique ID if not provided
const textareaId = $derived(id || `textarea-${crypto.randomUUID()}`)

// Textarea state
let textareaValue = $state("")
let isFocused = $state(false)
let textareaEl: HTMLTextAreaElement | undefined = $state()
let fieldApi: FormFieldApi | undefined

// Register with form if available
$effect(() => {
  if (formContext && derivedName) {
    fieldApi = formContext.registerField(derivedName, derivedValue)
  }
})

// Update value when form field changes
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue()
    if (formValue !== undefined && formValue !== textareaValue) {
      textareaValue = formValue as string
    }
  }
})

// Update textarea value when prop changes
$effect(() => {
	textareaValue = derivedValue
})

// Disabled from form context takes precedence over the local prop
// (fieldApi.isDisabled is a superset of formContext.disabled — check it first)
const effectiveDisabled = $derived(
  disabled || (fieldApi?.isDisabled() ?? false) || (formContext?.disabled() ?? false)
)

/**
 * Handles textarea input
 * @param {Event} event - Input event
 */
function handleInput(event: Event): void {
  const newValue = (event.target as HTMLTextAreaElement).value
  textareaValue = newValue

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(newValue)
  }

  // Auto-resize if enabled
  if (autoResize && textareaEl) {
    resizeTextarea()
  }

  // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding
  oninput?.(new CustomEvent("input", { detail: { value: newValue } }))
  // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding
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
 * Resizes the textarea based on content.
 * Declared as a const arrow function to avoid the DOM lib `this: Window` binding
 * ambiguity that occurs with `function` declarations when passed as a callback.
 */
const resizeTextarea = (): void => {
  if (!textareaEl) return

  // Reset height to calculate scroll height
  textareaEl.style.height = "auto"

  // Set height to scroll height
  textareaEl.style.height = `${textareaEl.scrollHeight}px`
}

// Initialize auto-resize
$effect(() => {
  if (autoResize && textareaEl) {
    // Use queueMicrotask to defer resize until after the DOM has updated.
    // Arrow function strips the `this` binding ambiguity that DOM lib has with setTimeout/queueMicrotask.
    queueMicrotask(() => resizeTextarea())
  }
})
</script>

<div class="textarea-wrapper {className}">
  <textarea
    id={textareaId}
    {name}
    {placeholder}
    value={textareaValue}
    {rows}
    {required}
    disabled={effectiveDisabled}
    {readonly}
    {minlength}
    {maxlength}
    {autocomplete}
    aria-label={ariaLabel}
    class="textarea {isFocused ? 'is-focused' : ''}"
    oninput={handleInput}
    onfocus={handleFocus}
    onblur={handleBlur}
    bind:this={textareaEl}
    {...restProps}
  ></textarea>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .textarea-wrapper {
    @apply w-full;
  }
  
  .textarea {
    @apply w-full rounded-md border-border dark:border-border bg-background dark:bg-background text-text dark:text-text;
    @apply border focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400;
    @apply disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface dark:disabled:bg-surface;
    @apply placeholder:text-muted dark:placeholder:text-muted;
    @apply p-3 resize-y;
  }
</style>
