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
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "name", type: "string", description: "Name attribute", optional: true },
  { name: "label", type: "string", description: "Field label", optional: true },
  { name: "helpText", type: "string", description: "Help text displayed below the field", optional: true },
  { name: "error", type: "string", description: "Error message to display", optional: true },
  { name: "required", type: "boolean", description: "Whether the field is required", default: "false", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the field is disabled", default: "false", optional: true },
  { name: "hideLabel", type: "boolean", description: "Whether to hide the label visually (still accessible to screen readers)", default: "false", optional: true },
  { name: "layout", type: "string", description: "Layout direction (vertical or horizontal)", optional: true },
];
</script>

<script lang="ts">
import type { Snippet } from "svelte"
import { getContext, onMount } from "svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"

interface ChildProps {
  name?: string
  id: string
  disabled: boolean
  'aria-invalid'?: 'true'
  'aria-describedby'?: string
  'aria-required'?: 'true'
  required?: boolean
}

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Name attribute */
  name?: string
  /** Field label */
  label?: string
  /** Help text displayed below the field */
  helpText?: string
  /** Error message to display */
  error?: string
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is disabled */
  disabled?: boolean
  /** Whether to hide the label visually (still accessible to screen readers) */
  hideLabel?: boolean
  /** Layout direction (vertical or horizontal) */
  layout?: string
  children?: Snippet<[ChildProps]>
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  name,
  label,
  helpText,
  error,
  required = false,
  disabled = false,
  hideLabel = false,
  layout,
  children,
}: Props = $props()

// Get form context if available
const formContext = getContext<FormContext | undefined>("form")

// Use layout from form context if not specified
const fieldLayout = $derived(layout || (formContext ? formContext.layout : "vertical"))

// Generate unique ID for the field. The label targets the *actual* child
// input's id (discovered on mount) rather than a synthetic id, because the
// child control (e.g. TextInput) generates its own id when none is passed.
const fieldId = $derived(`${id}-field`)
const errorId = $derived(`${id}-error`)
const helpId = $derived(`${id}-help`)
const fieldName = $derived(name)

// The id the label should point at. Starts as the synthetic fieldId and is
// corrected to the child input's real id once mounted. (Capturing the
// derived at init is intentional — `fieldId` never changes afterwards.)
// svelte-ignore state_referenced_locally
let labelFor = $state(fieldId)
let formControlElement: HTMLElement | undefined = $state()

// Track field state
let fieldError = $state("")
let touched = $state(false)
let fieldApi: FormFieldApi | undefined

// Register with form if available
$effect(() => {
  if (formContext && name) {
    fieldApi = formContext?.registerField(name)
  }
})

// Update field error when form validation runs
$effect(() => {
  if (fieldApi) {
    const formError = fieldApi.getError()
    if (formError) {
      fieldError = formError
    }
  } else {
    fieldError = error || ""
  }
})

// Update touched state
$effect(() => {
  if (fieldApi) {
    touched = fieldApi.isTouched()
  }
})

// Disabled from form context takes precedence over the local prop
// (fieldApi.isDisabled is a superset of formContext.disabled — check it first)
const effectiveDisabled = $derived(
  disabled || (fieldApi?.isDisabled() ?? false) || (formContext?.disabled() ?? false)
)

// Determine if we should show an error. Inside a Form the error appears once
// the field is touched; standalone (no Form context) the `error` prop should
// show immediately — otherwise it would never render.
const showError = $derived(!!fieldError && (formContext ? touched : true))

// Point the label at the real child control once it's in the DOM.
onMount(() => {
  const input = formControlElement?.querySelector(
    "input, select, textarea"
  ) as HTMLElement | null | undefined
  if (input?.id) {
    labelFor = input.id
  }
})

// Wire ARIA and disabled state directly onto the child control element. Many
// consumers pass plain components (e.g. `<TextInput />`) as children, which
// don't destructure the snippet props above, so the attributes must also be
// applied to the rendered element to guarantee accessible wiring.
$effect(() => {
  const input = formControlElement?.querySelector(
    "input, select, textarea"
  ) as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) | null | undefined
  if (!input) return

  if (showError) {
    input.setAttribute("aria-invalid", "true")
  } else {
    input.removeAttribute("aria-invalid")
  }

  if (required) {
    input.setAttribute("aria-required", "true")
  } else {
    input.removeAttribute("aria-required")
  }

  const describedByTargets = [
    helpText && !showError ? helpId : null,
    showError ? errorId : null,
  ].filter(Boolean)
  if (describedByTargets.length > 0) {
    input.setAttribute("aria-describedby", describedByTargets.join(" "))
  } else {
    input.removeAttribute("aria-describedby")
  }

  if (effectiveDisabled) {
    input.setAttribute("disabled", "")
  } else {
    input.removeAttribute("disabled")
  }
})

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
      for={labelFor}
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
    <div class="form-control" bind:this={formControlElement}>
      <!-- Slot for the actual form control -->
      {@render children?.({
        name: fieldName,
        id: fieldId,
        disabled: effectiveDisabled,
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

<style lang="postcss">
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

  /* CSS-only validation styling via :has() + :user-valid/:user-invalid.
     Progressive enhancement — works for fields using native constraint
     validation (required, pattern, type, min, max). Fields using custom
     TanStack Form validators still rely on the .has-error class above. */
  .form-field:has(:user-invalid) :global(input),
  .form-field:has(:user-invalid) :global(select),
  .form-field:has(:user-invalid) :global(textarea) {
    @apply border-error-500 dark:border-error-400;
  }

  .form-field:has(:user-valid) :global(input),
  .form-field:has(:user-valid) :global(select),
  .form-field:has(:user-valid) :global(textarea) {
    @apply border-success-500 dark:border-success-400;
  }
</style>
