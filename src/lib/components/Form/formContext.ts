/**
 * Form context interface shared by Form.svelte (provider) and form input
 * components (consumers). Exported from a dedicated module so both sides can
 * import the same type without circular dependencies.
 */

export interface FormFieldApi {
  /** Read the current value for this field from the parent form */
  getValue: () => unknown
  /** Update the value for this field in the parent form */
  setValue: (value: unknown) => void
  /** Read the current validation error message (or undefined) */
  getError: () => string | undefined
  /** Whether the field has been touched (blurred at least once) */
  isTouched: () => boolean
  /** Whether the field is currently disabled (form disabled, loading, or submitting) */
  isDisabled: () => boolean
}

export interface FormContext {
  /**
   * Register a field with the parent form. Pass an `initialValue` to seed
   * `formData`; subsequent calls with the same name are idempotent.
   */
  registerField: (name: string, initialValue?: unknown) => FormFieldApi
  /** Default layout ("vertical" | "horizontal") for descendant FormField components */
  layout: string
  /** Whether the form is currently disabled (any input should disable itself) */
  disabled: () => boolean
}
