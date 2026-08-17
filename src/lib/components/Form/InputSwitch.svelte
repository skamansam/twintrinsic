<!--
@component
InputSwitch - A toggle switch component that provides an alternative to checkboxes.
Supports labels, disabled states, and integrates with the Form component.

Usage:
```svelte
<InputSwitch 
  name="darkMode" 
  label="Enable dark mode" 
  checked={true} 
/>

<FormField label="Notifications">
  <InputSwitch name="notifications" />
</FormField>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "name", type: "string", description: "Input name", optional: true },
  { name: "label", type: "string", description: "Label text", optional: true },
  { name: "checked", type: "boolean", description: "Whether the switch is checked", default: "false", optional: true },
  { name: "required", type: "boolean", description: "Whether the switch is required", default: "false", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the switch is disabled", default: "false", optional: true },
  { name: "size", type: "\"sm\" | \"md\" | \"lg\"", description: "Size of the switch (sm, md, lg)", default: "\"md\"", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for accessibility", optional: true },
  { name: "onchange", type: "(event: CustomEvent<{ checked: boolean }>) => void", description: "Change event handler", optional: true, eventDetail: "{ checked: boolean }" },
];
</script>

<script lang="ts">
import { getContext } from "svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Input name */
  name?: string
  /** Label text */
  label?: string
  /** Whether the switch is checked */
  checked?: boolean
  /** Whether the switch is required */
  required?: boolean
  /** Whether the switch is disabled */
  disabled?: boolean
  /** Size of the switch (sm, md, lg) */
  size?: "sm" | "md" | "lg"
  /** ARIA label for accessibility */
  ariaLabel?: string
  /** Change event handler */
  onchange?: (event: CustomEvent<{ checked: boolean }>) => void
  /** Additional props passed through to the underlying input */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  name,
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

// Derived values for reactive prop access
const derivedName = $derived(name)
const derivedChecked = $derived(checked)

// Switch state — initialized from the prop so `checked={true}` renders checked
// on mount (the sync effect below only reacts to prop *changes*).
// svelte-ignore state_referenced_locally
let isChecked = $state(checked)

// Register with form if available
let fieldApi: FormFieldApi | undefined
$effect(() => {
	if (!formContext) return
	if (!derivedName) return

	fieldApi = formContext.registerField(derivedName, derivedChecked)
})

// Update value when form field changes
$effect(() => {
	if (!fieldApi) return
	const formValue = fieldApi.getValue()
	if (formValue === undefined) return
	if (formValue === isChecked) return
	isChecked = !!formValue
})// Sync internal state only when the `checked` prop actually changes.
// (Capturing the prop value here is intentional; this mirrors the
// NumberInput lastPropValue pattern so user toggles aren't clobbered.)
// svelte-ignore state_referenced_locally
let lastCheckedProp = $state(checked)
$effect(() => {
  if (checked !== lastCheckedProp) {
    lastCheckedProp = checked
    isChecked = checked
  }
})

// Disabled from form context takes precedence over the local prop
// (fieldApi.isDisabled is a superset of formContext.disabled — check it first)
const effectiveDisabled = $derived(
  disabled || (fieldApi?.isDisabled() ?? false) || (formContext?.disabled() ?? false)
)

/**
 * Handles switch toggle
 * @param {Event} event - Change event
 */
function handleChange(event: Event): void {
  isChecked = (event.target as HTMLInputElement).checked

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(isChecked)
  }

  // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding;
  // module-scope has `this: void`
  onchange?.(new CustomEvent("change", { detail: { checked: isChecked } }))
}

// Determine switch size classes
const switchSizeClasses = $derived(
  {
    sm: "w-8 h-4",
    md: "w-10 h-5",
    lg: "w-12 h-6",
  }[size] || "w-10 h-5"
)

const thumbSizeClasses = $derived(
  {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }[size] || "w-4 h-4"
)

const labelSizeClasses = $derived(
  {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size] || "text-sm"
)
</script>

<label 
  class="input-switch-wrapper {className} {labelSizeClasses} {effectiveDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
>
  <div class="input-switch-container">
    <input
      type="checkbox"
      {id}
      {name}
      checked={isChecked}
      {required}
      disabled={effectiveDisabled}
      aria-label={ariaLabel || label}
      class="input-switch-input"
      onchange={handleChange}
      {...restProps}
    />
    
    <span class="input-switch-track {switchSizeClasses}" aria-hidden="true">
      <span 
        class="input-switch-thumb {thumbSizeClasses}"
        class:translate-x-full={isChecked}
      ></span>
    </span>
  </div>
  
  {#if label}
    <span class="input-switch-label">{label}</span>
  {/if}
</label>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .input-switch-wrapper {
    @apply inline-flex items-center gap-2;
  }
  
  .input-switch-container {
    @apply relative;
  }
  
  .input-switch-input {
    @apply sr-only;
  }
  
  .input-switch-track {
    @apply block rounded-full bg-muted dark:bg-muted transition-colors duration-200 ease-in-out;
    @apply flex items-center px-0.5;
  }
  
  .input-switch-input:checked + .input-switch-track {
    @apply bg-primary-500 dark:bg-primary-400;
  }
  
  .input-switch-input:focus + .input-switch-track {
    @apply ring-2 ring-offset-2 ring-primary-500 dark:ring-primary-400;
  }
  
  .input-switch-thumb {
    @apply rounded-full bg-white dark:bg-white transform transition-transform duration-200 ease-in-out;
  }
  
  .input-switch-label {
    @apply text-text dark:text-text;
  }
</style>
