<!--
@component
Form - A component for creating accessible, styled forms with validation support.
Handles form submission, validation, and provides context for form controls.

Usage:
```svelte
<Form onsubmit={handleSubmit}>
  <FormField label="Username" name="username" required>
    <TextInput />
  </FormField>
  
  <FormField label="Email" name="email" required type="email">
    <TextInput type="email" />
  </FormField>
  
  <Button type="submit">Submit</Button>
</Form>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "method", type: "string", description: "Form method (get or post)", default: "\"post\"", optional: true },
  { name: "action", type: "string", description: "Form action URL", default: "\"\"", optional: true },
  { name: "validate", type: "boolean", description: "Whether to validate the form on submission", default: "true", optional: true },
  { name: "useNativeValidation", type: "boolean", description: "Whether to use the browser's built-in validation UI", default: "true", optional: true },
  { name: "layout", type: "string", description: "Layout direction (vertical or horizontal)", default: "\"vertical\"", optional: true },
  { name: "disabled", type: "boolean", description: "Whether to disable all form controls", default: "false", optional: true },
  { name: "loading", type: "boolean", description: "Whether the form is in a loading state", default: "false", optional: true },
  { name: "onsubmit", type: "(event: CustomEvent<{ data: Record<string, unknown>; formData: FormData; form: HTMLFormElement }>) => void", description: "Submit event handler", optional: true, eventDetail: "{ data: Record<string, unknown" },
  { name: "onchange", type: "(event: CustomEvent) => void", description: "Change event handler", optional: true, eventDetail: "unknown" },
  { name: "onerror", type: "(event: CustomEvent<{ errors: Record<string, string> }>) => void", description: "Error event handler", optional: true, eventDetail: "{ errors: Record<string, string" },
];
</script>

<script lang="ts">
import { setContext } from "svelte"
import type { FormContext } from "./formContext.js"

interface Props {
  /** Additional props passed through to the root element */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Form method (get or post) */
  method?: string
  /** Form action URL */
  action?: string
  /** Whether to validate the form on submission */
  validate?: boolean
  /** Whether to use the browser's built-in validation UI */
  useNativeValidation?: boolean
  /** Layout direction (vertical or horizontal) */
  layout?: string
  /** Whether to disable all form controls */
  disabled?: boolean
  /** Whether the form is in a loading state */
  loading?: boolean
  /** Submit event handler */
  onsubmit?: (event: CustomEvent<{ data: Record<string, unknown>; formData: FormData; form: HTMLFormElement }>) => void
  /** Change event handler */
  onchange?: (event: CustomEvent) => void
  /** Error event handler */
  onerror?: (event: CustomEvent<{ errors: Record<string, string> }>) => void
  /** Form children */
  children?: import("svelte").Snippet
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  method = "post",
  action = "",
  validate = true,
  useNativeValidation = true,
  layout = "vertical",
  disabled = false,
  loading = false,
  onsubmit = undefined,
  onchange = undefined,
  onerror = undefined,
  children = undefined,
  ...restProps
}: Props = $props()

// Form state
let formElement: HTMLFormElement | undefined
let formData: Record<string, unknown> = $state({})
let errors: Record<string, string> = $state({})
let touched: Record<string, boolean> = $state({})
let isSubmitting = $state(false)
let isValid = $state(true)

/**
 * Updates a field's value in the form data
 * @param {string} name - Field name
 * @param {any} value - Field value
 */
function updateField(name: string, value: unknown): void {
  formData[name] = value
  touched[name] = true

  // Validate the field if needed
  if (validate) {
    validateField(name, value)
  }
}

/**
 * Validates a single field
 * @param {string} name - Field name
 * @param {any} value - Field value
 * @returns {boolean} - Whether the field is valid
 */
function validateField(name: string, value: unknown): boolean {
  const field = formElement?.elements.namedItem(name) as HTMLFormElement | null

  if (!field) return true

  // Clear existing errors for this field
  delete errors[name]

  // Use HTML5 validation API
  if (field.validity) {
    if (!field.validity.valid) {
      errors[name] = field.validationMessage
      return false
    }
  }

  return true
}

/**
 * Validates the entire form
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(): boolean {
  // Reset errors
  errors = {}

  // Check all fields
  let valid = true

  if (formElement) {
    const formControls = Array.from(formElement.elements)

    formControls.forEach((field: Element) => {
      if ((field as HTMLFormElement).name) {
        const fieldValid = validateField((field as HTMLFormElement).name, (field as HTMLFormElement).value)
        if (!fieldValid) {
          valid = false
        }
      }
    })
  }

  isValid = valid
  return valid
}

/**
 * Handles form submission
 * @param {Event} event - Submit event
 */
function handleSubmit(event: Event): void {
  // Prevent default form submission
  event.preventDefault()

  // Mark all fields as touched
  if (formElement) {
    const formControls = Array.from(formElement.elements)
    formControls.forEach((field: Element) => {
      const control = field as HTMLFormElement
      if (control.name) {
        touched[control.name] = true
      }
    })
  }

  // Validate if needed
  if (validate) {
    if (!validateForm()) {
      // If validation fails, don't submit
      onerror?.(new CustomEvent("invalid", { detail: { errors } }))
      return
    }
  }

  // Set submitting state
  isSubmitting = true

  // Get form data
  const formDataObj = new FormData(formElement as HTMLFormElement)
  const dataObj: Record<string, unknown> = {}

  for (const [key, value] of formDataObj.entries()) {
    dataObj[key] = value as unknown
  }

  // Dispatch submit event with form data
  onsubmit?.(new CustomEvent("submit", { detail: {
    data: dataObj,
    formData: formDataObj,
    form: formElement as HTMLFormElement,
  } }))

  // Reset submitting state after a short delay
  const resetSubmitting = (): void => {
    isSubmitting = false
  }
  // biome-ignore lint/suspicious/noExplicitAny: setTimeout this context workaround
  globalThis.setTimeout(resetSubmitting, 100)
}

/**
 * Resets the form to its initial state
 */
function resetForm(): void {
  if (formElement) {
    formElement.reset()
    formData = {}
    errors = {}
    touched = {}
    isValid = true
  }
}

// Provide form context to child components. Called at init (not in `$effect`)
// so the context is available during server-side rendering.
const context: FormContext = {
  registerField: (name: string, initialValue: unknown) => {
    if (initialValue !== undefined && formData[name] === undefined) {
      formData[name] = initialValue
    }

    return {
      getValue: (): unknown => formData[name],
      setValue: (value: unknown): void => updateField(name, value),
      getError: () => errors[name],
      isTouched: () => !!touched[name],
      isDisabled: () => disabled || loading || isSubmitting,
    }
  },
  get layout() {
    return layout
  },
  disabled: () => disabled || loading || isSubmitting,
}
setContext<FormContext>("form", context)

// Expose form API to parent components
const formApi = {
  reset: resetForm,
  validate: validateForm,
  setValues: (values: Record<string, unknown>): void => {
    formData = { ...formData, ...values }
  },
  getValues: (): Record<string, unknown> => ({ ...formData }),
  setErrors: (newErrors: Record<string, string>): void => {
    errors = { ...errors, ...newErrors }
    isValid = Object.keys(errors).length === 0
  },
  clearErrors: (): void => {
    errors = {}
    isValid = true
  },
}

// Expose form API to parent
// Note: Form component exposes API through context, not events
</script>

<form {...restProps}
  {id}
  method={method as 'get' | 'post'}
  {action}
  class="form {layout} {className}"
  class:disabled
  onsubmit={handleSubmit}
  bind:this={formElement}
>
  {@render children?.()}
</form>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .form {
    @apply w-full;
  }
  
  .form-vertical {
    @apply space-y-4;
  }
  
  .form-horizontal {
    @apply grid gap-4;
  }
  
  .form.disabled {
    @apply opacity-70 pointer-events-none;
  }
  
  .form.loading {
    @apply opacity-70;
  }
</style>
