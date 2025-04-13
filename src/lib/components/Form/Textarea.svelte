<!--
@component
Textarea - A styled textarea component for multi-line text input.
Provides consistent styling, accessibility features, and integration with the Form component.

Usage:
```svelte
<Textarea 
  name="description"
  placeholder="Enter description"
  rows={4}
/>

<FormField label="Message">
  <Textarea name="message" required />
</FormField>
```
-->
<script>
  import { getContext, createEventDispatcher } from 'svelte';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id,

    /** @type {string} - Textarea name */
    name,

    /** @type {string} - Textarea placeholder */
    placeholder = '',

    /** @type {string} - Textarea value */
    value = '',

    /** @type {number} - Number of rows */
    rows = 3,

    /** @type {boolean} - Whether the textarea is required */
    required = false,

    /** @type {boolean} - Whether the textarea is disabled */
    disabled = false,

    /** @type {boolean} - Whether the textarea is readonly */
    readonly = false,

    /** @type {string} - Minimum length */
    minlength,

    /** @type {string} - Maximum length */
    maxlength,

    /** @type {string} - Autocomplete attribute */
    autocomplete,

    /** @type {boolean} - Whether to auto-resize based on content */
    autoResize = false,

    /** @type {string} - ARIA label for accessibility */
    ariaLabel
  } = $props();

  const dispatch = createEventDispatcher();
  
  // Get form context if available
  const formContext = getContext('form');
  
  // Generate unique ID if not provided
  const textareaId = id || `textarea-${crypto.randomUUID()}`;
  
  // Textarea state
  let textareaValue = $state(value);
  let isFocused = $state(false);
  let textareaEl;
  
  // Register with form if available
  let fieldApi;
  if (formContext && name) {
    fieldApi = formContext.registerField(name, value);
    
    // Update value when form field changes
    $effect(() => {
      const formValue = fieldApi.getValue();
      if (formValue !== undefined && formValue !== textareaValue) {
        textareaValue = formValue;
      }
    });
  }
  
  /**
   * Handles textarea input
   * @param {Event} event - Input event
   */
  function handleInput(event) {
    const newValue = event.target.value;
    textareaValue = newValue;
    
    // Update form field if available
    if (fieldApi) {
      fieldApi.setValue(newValue);
    }
    
    // Auto-resize if enabled
    if (autoResize && textareaEl) {
      resizeTextarea();
    }
    
    dispatch('input', { value: newValue });
    dispatch('change', { value: newValue });
  }
  
  /**
   * Handles focus events
   */
  function handleFocus() {
    isFocused = true;
    dispatch('focus');
  }
  
  /**
   * Handles blur events
   */
  function handleBlur() {
    isFocused = false;
    dispatch('blur');
  }
  
  /**
   * Resizes the textarea based on content
   */
  function resizeTextarea() {
    if (!textareaEl) return;
    
    // Reset height to calculate scroll height
    textareaEl.style.height = 'auto';
    
    // Set height to scroll height
    textareaEl.style.height = `${textareaEl.scrollHeight}px`;
  }
  
  // Initialize auto-resize
  $effect(() => {
    if (autoResize && textareaEl) {
      // Use setTimeout to ensure content is rendered
      setTimeout(resizeTextarea, 0);
    }
  });
</script>

<div class="textarea-wrapper {className}">
  <textarea
    id={textareaId}
    {name}
    {placeholder}
    value={textareaValue}
    {rows}
    {required}
    disabled={disabled || (fieldApi && fieldApi.isDisabled())}
    {readonly}
    {minlength}
    {maxlength}
    {autocomplete}
    aria-label={ariaLabel}
    class="textarea {isFocused ? 'is-focused' : ''}"
    on:input={handleInput}
    on:focus={handleFocus}
    on:blur={handleBlur}
    bind:this={textareaEl}
    {...$$restProps}
  ></textarea>
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .textarea-wrapper {
    @apply w-full;
  }
  
  .textarea {
    @apply w-full rounded-md border-border dark:border-border bg-background dark:bg-background text-text dark:text-text;
    @apply border focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400;
    @apply disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface dark:disabled:bg-surface;
    @apply placeholder:text-muted dark:placeholder:text-muted;
    @apply p-3 resize-y;
  }
</style>
