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

let {
  class: className = "",
  id,
  name,
  placeholder = "",
  value = "",
  rows = 3,
  required = false,
  disabled = false,
  readonly = false,
  minlength,
  maxlength,
  autocomplete,
  autoResize = false,
  ariaLabel,
  oninput,
  onchange,
  onfocus,
  onblur,
  ...restProps
} = $props()

// Get form context if available
const formContext = getContext("form") as { registerField?: (name: string, value: unknown) => { getValue?: () => unknown; setValue?: (value: unknown) => void; isDisabled?: () => boolean } } | undefined

// Derived values for reactive prop access in closures
const derivedValue = $derived(value)
const derivedName = $derived(name)

// Generate unique ID if not provided
const textareaId = $derived(id || `textarea-${crypto.randomUUID()}`)

// Textarea state
let textareaValue = $state("")
let isFocused = $state(false)
let textareaEl: HTMLTextAreaElement | undefined = $state()
let fieldApi: { getValue?: () => unknown; setValue?: (value: unknown) => void; isDisabled?: () => boolean } | undefined = $state()

// Register with form if available
$effect(() => {
  if (formContext?.registerField && derivedName) {
    fieldApi = formContext.registerField(derivedName, derivedValue)
  }
})

// Update value when form field changes
$effect(() => {
  if (fieldApi?.getValue) {
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

/**
 * Handles textarea input
 * @param {Event} event - Input event
 */
function handleInput(event: Event): void {
  const newValue = (event.target as HTMLTextAreaElement).value
  textareaValue = newValue

  // Update form field if available
  if (fieldApi?.setValue) {
    fieldApi.setValue(newValue)
  }

  // Auto-resize if enabled
  if (autoResize && textareaEl) {
    resizeTextarea()
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
 * Resizes the textarea based on content
 */
function resizeTextarea(): void {
  if (!textareaEl) return

  // Reset height to calculate scroll height
  (textareaEl as HTMLTextAreaElement).style.height = "auto"

  // Set height to scroll height
  (textareaEl as HTMLTextAreaElement).style.height = `${(textareaEl as HTMLTextAreaElement).scrollHeight}px`
}

// Initialize auto-resize
$effect(() => {
  if (autoResize && textareaEl) {
    // Use setTimeout to ensure content is rendered
    setTimeout(resizeTextarea, 0)
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
    disabled={disabled || (fieldApi?.isDisabled ? fieldApi.isDisabled() : false)}
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
