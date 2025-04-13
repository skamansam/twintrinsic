<!--
@component
FloatLabel - A component for creating form inputs with animated floating labels.
Provides a modern, space-efficient input with improved user experience.

Usage:
```svelte
<FloatLabel label="Username">
  <TextInput name="username" />
</FloatLabel>

<FloatLabel label="Email" required>
  <TextInput type="email" name="email" />
</FloatLabel>

<FloatLabel label="Message">
  <Textarea name="message" rows={3} />
</FloatLabel>
```
-->
<script>
  import { onMount } from 'svelte';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),

    /** @type {string} - Label text */
    label,

    /** @type {boolean} - Whether the input is required */
    required = false,

    /** @type {boolean} - Whether the input is disabled */
    disabled = false,

    /** @type {string} - Error message to display */
    error,

    /** @type {string} - Help text to display below the input */
    helpText,

    children
  } = $props();

  // Component state
  let inputElement;
  let isFocused = $state(false);
  let hasValue = $state(false);
  let isFloating = $state(false);

  /**
   * Checks if the input has a value
   */
  function checkValue() {
    if (!inputElement) return;
    
    // Find the actual input element (could be nested)
    const input = findInputElement(inputElement);
    
    if (input) {
      hasValue = !!input.value;
    }
    
    // Update floating state
    isFloating = isFocused || hasValue;
  }
  
  /**
   * Recursively finds an input element
   * @param {HTMLElement} element - Element to search in
   * @returns {HTMLElement|null} - Found input element or null
   */
  function findInputElement(element) {
    // Check if this is an input, textarea, or select
    if (
      element.tagName === 'INPUT' || 
      element.tagName === 'TEXTAREA' || 
      element.tagName === 'SELECT'
    ) {
      return element;
    }
    
    // Check children
    const inputs = element.querySelectorAll('input, textarea, select');
    if (inputs.length > 0) {
      return inputs[0];
    }
    
    return null;
  }
  
  /**
   * Handles focus event
   */
  function handleFocus() {
    isFocused = true;
    isFloating = true;
  }
  
  /**
   * Handles blur event
   */
  function handleBlur() {
    isFocused = false;
    checkValue();
  }
  
  /**
   * Handles input event
   */
  function handleInput() {
    checkValue();
  }
  
  // Initialize component
  onMount(() => {
    if (inputElement) {
      // Find the actual input element
      const input = findInputElement(inputElement);
      
      if (input) {
        // Add event listeners
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
        input.addEventListener('input', handleInput);
        
        // Initial check
        checkValue();
        
        // Clean up
        return () => {
          input.removeEventListener('focus', handleFocus);
          input.removeEventListener('blur', handleBlur);
          input.removeEventListener('input', handleInput);
        };
      }
    }
  });
</script>

<div
  class="
    float-label-wrapper
    {isFocused ? 'is-focused' : ''}
    {isFloating ? 'is-floating' : ''}
    {hasValue ? 'has-value' : ''}
    {error ? 'has-error' : ''}
    {disabled ? 'is-disabled' : ''}
    {className}
  "
>
  <div class="float-label-container">
    {#if label}
      <label
        for={id}
        class="float-label"
      >
        {label}
        {#if required}
          <span class="required-indicator" aria-hidden="true">*</span>
          <span class="sr-only">required</span>
        {/if}
      </label>
    {/if}
    
    <div class="float-label-input" bind:this={inputElement}>
      {@render children?.()}
    </div>
  </div>
  
  {#if error}
    <div class="float-label-error" role="alert">
      {error}
    </div>
  {/if}
  
  {#if helpText && !error}
    <div class="float-label-help">
      {helpText}
    </div>
  {/if}
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .float-label-wrapper {
    @apply w-full;
  }
  
  .float-label-container {
    @apply relative;
  }
  
  .float-label {
    @apply absolute left-3 top-1/2 -translate-y-1/2;
    @apply text-muted dark:text-muted;
    @apply pointer-events-none transition-all duration-200;
    @apply text-base;
  }
  
  .is-floating .float-label {
    @apply text-xs top-0 -translate-y-1/2;
    @apply bg-background dark:bg-background px-1;
  }
  
  .is-focused .float-label {
    @apply text-primary-500 dark:text-primary-400;
  }
  
  .has-error .float-label {
    @apply text-error-500 dark:text-error-400;
  }
  
  .float-label-input {
    @apply w-full;
  }
  
  /* Style child inputs */
  .float-label-input :global(input),
  .float-label-input :global(textarea),
  .float-label-input :global(select) {
    @apply pt-4 pb-2;
  }
  
  .required-indicator {
    @apply ml-1 text-error-500 dark:text-error-400;
  }
  
  .float-label-error {
    @apply mt-1 text-xs text-error-600 dark:text-error-400;
  }
  
  .float-label-help {
    @apply mt-1 text-xs text-muted dark:text-muted;
  }
  
  .is-disabled {
    @apply opacity-60 pointer-events-none;
  }
</style>
