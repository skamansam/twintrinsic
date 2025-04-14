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
<script>
  import { getContext, createEventDispatcher } from 'svelte';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),

    /** @type {string} - Radio name (for grouping) */
    name,

    /** @type {string} - Radio value */
    value,

    /** @type {string} - Label text */
    label,

    /** @type {boolean} - Whether the radio is checked */
    checked = false,

    /** @type {boolean} - Whether the radio is required */
    required = false,

    /** @type {boolean} - Whether the radio is disabled */
    disabled = false,

    /** @type {string} - Size of the radio (sm, md, lg) */
    size = 'md',

    /** @type {string} - ARIA label for accessibility */
    ariaLabel
  } = $props();

  const dispatch = createEventDispatcher();
  
  // Get form context if available
  const formContext = getContext('form');
  
  // Radio state
  let isChecked = $state(checked);
  
  // Register with form if available
  let fieldApi;
  if (formContext && name) {
    fieldApi = formContext.registerField(name, checked ? value : undefined);
    
    // Update checked state when form field changes
    $effect(() => {
      const formValue = fieldApi.getValue();
      isChecked = formValue === value;
    });
  }
  
  /**
   * Handles radio change
   * @param {Event} event - Change event
   */
  function handleChange(event) {
    isChecked = event.target.checked;
    
    // Update form field if available
    if (fieldApi && isChecked) {
      fieldApi.setValue(value);
    }
    
    dispatch('change', { checked: isChecked, value });
  }
  
  // Determine radio size classes
  const radioSizeClasses = $derived({
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size] || 'w-4 h-4');
  
  const labelSizeClasses = $derived({
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }[size] || 'text-sm');
</script>

<label 
  class="radio-wrapper {className} {labelSizeClasses} {disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
>
  <div class="radio-container">
    <input
      type="radio"
      {id}
      {name}
      {value}
      checked={isChecked}
      {required}
      disabled={disabled || (fieldApi && fieldApi.isDisabled())}
      aria-label={ariaLabel || label}
      class="radio-input"
      onchange={handleChange}
      {...$$restProps}
    />
    
    <span class="radio-control {radioSizeClasses}" aria-hidden="true">
      <span class="radio-dot"></span>
    </span>
  </div>
  
  {#if label}
    <span class="radio-label">{label}</span>
  {/if}
</label>

<style>
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
