<!--
@component
Switch - A toggle switch component that provides an alternative to checkboxes.
Supports labels, disabled states, and integrates with the Form component.

Usage:
```svelte
<Switch 
  name="darkMode" 
  label="Enable dark mode" 
  checked={true} 
/>

<FormField label="Notifications">
  <Switch name="notifications" />
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

  /** @type {string} - Input name */
  name,

  /** @type {string} - Label text */
  label,

  /** @type {boolean} - Whether the switch is checked */
  checked = false,

  /** @type {boolean} - Whether the switch is required */
  required = false,

  /** @type {boolean} - Whether the switch is disabled */
  disabled = false,

  /** @type {string} - Size of the switch (sm, md, lg) */
  size = "md",

  /** @type {string} - ARIA label for accessibility */
  ariaLabel,

  /** @type {(event: CustomEvent) => void} - Change event handler */
  onchange,

  /** @type {object} - Additional props to pass to the input element */
  ...restProps
} = $props()

// Get form context if available
const formContext = getContext("form")

// Switch state
let isChecked = $state(checked)
let fieldApi = $state()

// Register with form if available
$effect(() => {
  if (formContext && name) {
    fieldApi = formContext.registerField(name, checked)
  }
})

// Update value when form field changes
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue()
    if (formValue !== undefined && formValue !== isChecked) {
      isChecked = !!formValue
    }
  }
})

// Update checked state when prop changes
$effect(() => {
  isChecked = checked
})

/**
 * Handles switch toggle
 * @param {Event} event - Change event
 */
function handleChange(event) {
  isChecked = event.target.checked

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(isChecked)
  }

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
  class="switch-wrapper {className} {labelSizeClasses} {disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
>
  <div class="switch-container">
    <input
      type="checkbox"
      {id}
      {name}
      checked={isChecked}
      {required}
      disabled={disabled || (fieldApi && fieldApi.isDisabled())}
      aria-label={ariaLabel || label}
      class="switch-input"
      onchange={handleChange}
      {...restProps}
    />
    
    <span class="switch-track {switchSizeClasses}" aria-hidden="true">
      <span 
        class="switch-thumb {thumbSizeClasses}"
        class:translate-x-full={isChecked}
      ></span>
    </span>
  </div>
  
  {#if label}
    <span class="switch-label">{label}</span>
  {/if}
</label>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .switch-wrapper {
    @apply inline-flex items-center gap-2;
  }
  
  .switch-container {
    @apply relative;
  }
  
  .switch-input {
    @apply sr-only;
  }
  
  .switch-track {
    @apply block rounded-full bg-muted dark:bg-muted transition-colors duration-200 ease-in-out;
    @apply flex items-center px-0.5;
  }
  
  .switch-input:checked + .switch-track {
    @apply bg-primary-500 dark:bg-primary-400;
  }
  
  .switch-input:focus + .switch-track {
    @apply ring-2 ring-offset-2 ring-primary-500 dark:ring-primary-400;
  }
  
  .switch-thumb {
    @apply rounded-full bg-white dark:bg-white transform transition-transform duration-200 ease-in-out;
  }
  
  .switch-label {
    @apply text-text dark:text-text;
  }
</style>
