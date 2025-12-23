<!--
@component
FormField - A component for creating form field containers with labels, validation, and help text.
Provides consistent styling and accessibility features for form inputs.

Usage:
```svelte
<FormField 
  label="Username" 
  name="username" 
  required 
  helpText="Enter your username"
>
  <TextInput />
</FormField>
```
-->
<script>
import { getContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Field name (used for form data) */
  name,

  /** @type {string} - Field label */
  label,

  /** @type {string} - Help text displayed below the field */
  helpText,

  /** @type {string} - Error message to display */
  error,

  /** @type {boolean} - Whether the field is required */
  required = false,

  /** @type {boolean} - Whether the field is disabled */
  disabled = false,

  /** @type {boolean} - Whether to hide the label visually (still accessible to screen readers) */
  hideLabel = false,

  /** @type {string} - Layout direction (vertical or horizontal) */
  layout,

  children,
} = $props()

// Get form context if available
const formContext = getContext("form")

// Use layout from form context if not specified
const fieldLayout = layout || (formContext ? formContext.layout : "vertical")

// Generate unique ID for the field
const fieldId = `${id}-field`
const errorId = `${id}-error`
const helpId = `${id}-help`

// Track field state
let fieldError = $state(error || "")
let touched = $state(false)
let fieldDisabled = $state(disabled)

// Register with form if available
let fieldApi
if (formContext && name) {
  fieldApi = formContext.registerField(name)

  // Update field error when form validation runs
  $effect(() => {
    const formError = fieldApi.getError()
    if (formError) {
      fieldError = formError
    }
  })

  // Update touched state
  $effect(() => {
    touched = fieldApi.isTouched()
  })

  // Update disabled state
  $effect(() => {
    const formDisabled = formContext.disabled()
    fieldDisabled = disabled || formDisabled
  })
}

// Determine if we should show an error
const showError = $derived(!!fieldError && touched)

// Determine the aria-describedby attribute value
const describedBy = $derived(
  [helpText ? helpId : null, showError ? errorId : null].filter(Boolean).join(" ")
)
</script>

<div 
  class="
    form-field
    {fieldLayout === 'horizontal' ? 'form-field-horizontal' : 'form-field-vertical'}
    {showError ? 'has-error' : ''}
    {className}
  "
>
  {#if label}
    <label 
      for={fieldId}
      class="form-label {hideLabel ? 'sr-only' : ''}"
    >
      {label}
      {#if required}
        <span class="required-indicator" aria-hidden="true">*</span>
        <span class="sr-only">required</span>
      {/if}
    </label>
  {/if}
  
  <div class="form-control-container">
    <div class="form-control">
      <!-- Slot for the actual form control -->
      {@render children({
        name: fieldName,
        id: fieldId,
        disabled: fieldDisabled,
        'aria-invalid': showError ? 'true' : undefined,
        'aria-describedby': describedBy || undefined,
        'aria-required': required ? 'true' : undefined,
        required
      })}
    </div>
    
    {#if helpText && !showError}
      <div class="form-help-text" id={helpId}>
        {helpText}
      </div>
    {/if}
    
    {#if showError}
      <div class="form-error" id={errorId} role="alert">
        {fieldError}
      </div>
    {/if}
  </div>
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .form-field {
    @apply w-full;
  }
  
  .form-field-vertical {
    @apply flex flex-col gap-1.5;
  }
  
  .form-field-horizontal {
    @apply grid grid-cols-12 gap-4 items-start;
  }
  
  .form-field-horizontal .form-label {
    @apply col-span-3 pt-2 text-right;
  }
  
  .form-field-horizontal .form-control-container {
    @apply col-span-9;
  }
  
  .form-label {
    @apply block text-sm font-medium text-text dark:text-text;
  }
  
  .required-indicator {
    @apply ml-1 text-error-500 dark:text-error-400;
  }
  
  .form-control-container {
    @apply w-full;
  }
  
  .form-control {
    @apply w-full;
  }
  
  .form-help-text {
    @apply mt-1 text-xs text-muted dark:text-muted;
  }
  
  .form-error {
    @apply mt-1 text-xs text-error-600 dark:text-error-400;
  }
  
  .has-error :global(input),
  .has-error :global(select),
  .has-error :global(textarea) {
    @apply border-error-500 dark:border-error-400 focus:ring-error-500 dark:focus:ring-error-400 focus:border-error-500 dark:focus:border-error-400;
  }
</style>
