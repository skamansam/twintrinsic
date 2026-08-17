<!--
@component
Radio - A styled radio button component.
Provides consistent styling, accessibility features, and integration with the Form component.

Usage:
```svelte
<Radio 
  name="theme" 
  value="light"
  label="Light theme" 
  checked={theme === 'light'} 
/>

<FormField label="Select theme">
  <div class="flex gap-4">
    <Radio name="theme" value="light" label="Light" />
    <Radio name="theme" value="dark" label="Dark" />
    <Radio name="theme" value="system" label="System" />
  </div>
</FormField>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "name", type: "string", description: "Radio name (for grouping)", optional: true },
  { name: "value", type: "string", description: "Radio value", optional: true },
  { name: "label", type: "string", description: "Label text", optional: true },
  { name: "checked", type: "boolean", description: "Whether the radio is checked", default: "false", optional: true },
  { name: "required", type: "boolean", description: "Whether the radio is required", default: "false", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the radio is disabled", default: "false", optional: true },
  { name: "size", type: "\"sm\" | \"md\" | \"lg\"", description: "Size of the radio (sm, md, lg)", default: "\"md\"", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for accessibility", optional: true },
  { name: "onchange", type: "(event: CustomEvent<{ checked: boolean; value: string }>) => void", description: "Change event handler", optional: true, eventDetail: "{ checked: boolean; value: string }" },
];
</script>

<script lang="ts">
import { getContext } from "svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"

/** Context provided by the RadioGroup component. */
interface RadioGroupContext {
  get name(): string | undefined
  selectedValue: () => string
  get required(): boolean
  disabled: () => boolean
  get size(): "sm" | "md" | "lg"
  onChange: (event: CustomEvent<{ checked: boolean; value: string }>) => void
}

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Radio name (for grouping) */
  name?: string
  /** Radio value */
  value?: string
  /** Label text */
  label?: string
  /** Whether the radio is checked */
  checked?: boolean
  /** Whether the radio is required */
  required?: boolean
  /** Whether the radio is disabled */
  disabled?: boolean
  /** Size of the radio (sm, md, lg) */
  size?: "sm" | "md" | "lg"
  /** ARIA label for accessibility */
  ariaLabel?: string
  /** Change event handler */
  onchange?: (event: CustomEvent<{ checked: boolean; value: string }>) => void
  /** Additional props passed through to the underlying input */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  name,
  value,
  label,
  checked = false,
  required = false,
  disabled = false,
  size = "md",
  ariaLabel,
  onchange,
  ...restProps
}: Props = $props()

// Get form context if available
const formContext = getContext<FormContext | undefined>("form")

// Get radio group context if available
const radioGroup = getContext<RadioGroupContext | undefined>("radioGroup")

// Radio state
let isChecked = $state(false)

// Effective name: the group's name wins when present
const effectiveName = $derived(name || radioGroup?.name)

// Update checked state when prop changes
$effect(() => {
  isChecked = checked || (radioGroup?.selectedValue() === value)
})

// Register with form if available
let fieldApi: FormFieldApi | undefined

$effect(() => {
  if (formContext && effectiveName) {
    fieldApi = formContext.registerField(effectiveName, checked ? value : undefined)
  }
})

// Update checked state when form field changes
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue()
    isChecked = formValue === value
  }
})

// Disabled from form context takes precedence over the local prop
// (fieldApi.isDisabled is a superset of formContext.disabled — check it first)
const effectiveDisabled = $derived(
  disabled ||
    (fieldApi?.isDisabled() ?? false) ||
    (formContext?.disabled() ?? false) ||
    (radioGroup?.disabled() ?? false)
)

// Size falls back to the group's size
const effectiveSize = $derived(size || radioGroup?.size)

/**
 * Handles radio change
 * @param {Event} event - Change event
 */
function handleChange(event: Event): void {
  isChecked = (event.target as HTMLInputElement).checked

  // Update form field if available
  if (fieldApi && isChecked) {
    fieldApi.setValue(value)
  }

  const changeEvent = new CustomEvent("change", {
    detail: { checked: isChecked, value: value ?? "" },
  })

  // Forward to the group (which updates its own state and fires onchange)
  radioGroup?.onChange(changeEvent)

  onchange?.(changeEvent)
}

const labelSizeClasses = $derived(
  {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size] || "text-sm"
)
</script>

<label 
  class="radio-wrapper {className} {labelSizeClasses} {effectiveDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
>
  <div class="radio-container">
    <input
      type="radio"
      {id}
      name={effectiveName}
      {value}
      checked={isChecked}
      required={required || (radioGroup?.required ?? false)}
      disabled={effectiveDisabled}
      aria-label={ariaLabel || label}
      class="radio-input"
      onchange={handleChange}
      {...restProps}
    />
    
    <span class="radio-control {effectiveSize === 'sm' ? 'w-3.5 h-3.5' : effectiveSize === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}" aria-hidden="true">
      <span class="radio-dot"></span>
    </span>
  </div>
  
  {#if label}
    <span class="radio-label">{label}</span>
  {/if}
</label>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .radio-wrapper {
    @apply inline-flex items-center gap-2;
  }
  
  .radio-container {
    @apply relative flex items-center justify-center;
  }
  
  .radio-input {
    @apply sr-only;
  }
  
  .radio-control {
    @apply rounded-full border-2 border-border dark:border-border bg-background dark:bg-background;
    @apply flex items-center justify-center;
    @apply transition-colors duration-200;
  }
  
  .radio-input:checked + .radio-control {
    @apply border-primary-500 dark:border-primary-400;
  }
  
  .radio-input:focus + .radio-control {
    @apply ring-2 ring-offset-2 ring-primary-500 dark:ring-primary-400;
  }
  
  .radio-dot {
    @apply rounded-full bg-primary-500 dark:bg-primary-400;
    @apply w-0 h-0 opacity-0 transition-all duration-200;
  }
  
  .radio-input:checked + .radio-control .radio-dot {
    @apply w-1/2 h-1/2 opacity-100;
  }
  
  .radio-label {
    @apply text-text dark:text-text;
  }
</style>
