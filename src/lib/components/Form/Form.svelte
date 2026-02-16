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
<script lang="ts">
import { setContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Form method (get or post) */
  method = "post",

  /** @type {string} - Form action URL */
  action = "",

  /** @type {boolean} - Whether to validate the form on submission */
  validate = true,

  /** @type {boolean} - Whether to use the browser's built-in validation UI */
  useNativeValidation = true,

  /** @type {string} - Layout direction (vertical or horizontal) */
  layout = "vertical",

  /** @type {boolean} - Whether to disable all form controls */
  disabled = false,

  /** @type {boolean} - Whether the form is in a loading state */
  loading = false,

  /** @type {(event: CustomEvent) => void} - Submit event handler */
  onsubmit,
  /** @type {(event: CustomEvent) => void} - Change event handler */
  onchange,
  /** @type {(event: CustomEvent) => void} - Error event handler */
  onerror,

  children,
} = $props()

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
    form: formElement,
  } }))

  // Reset submitting state after a short delay
  setTimeout(() => {
    isSubmitting = false
  }, 100)
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

// Provide form context to child components
$effect(() => {
  setContext("form", {
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
    layout,
    disabled: () => disabled || loading || isSubmitting,
  })
})

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

<form
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
