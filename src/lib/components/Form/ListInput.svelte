<!--
@component
ListInput - A component for handling multiple input values displayed as "chips".
Allows adding, removing, and editing multiple values with keyboard navigation.

Usage:
```svelte
<ListInput 
  name="tags" 
  placeholder="Add tag..." 
  values={['react', 'svelte']} 
  onchange={handleTagsChange} 
/>

<FormField label="Recipients">
  <ListInput 
    name="recipients" 
    placeholder="Add email..." 
    validator={(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)}
    errorMessage="Please enter a valid email address"
  />
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

    /** @type {string} - Input name */
    name,

    /** @type {string} - Placeholder text */
    placeholder = 'Add item...',

    /** @type {string[]} - Array of values */
    values = [],

    /** @type {boolean} - Whether the input is disabled */
    disabled = false,

    /** @type {boolean} - Whether the input is required */
    required = false,

    /** @type {boolean} - Whether to allow duplicates */
    allowDuplicates = false,

    /** @type {string} - Character(s) that trigger adding a new item */
    addOnKeys = 'Enter,Tab,Comma',

    /** @type {string} - Separator for pasting multiple values */
    pasteSeparator = ',',

    /** @type {number} - Maximum number of items */
    maxItems,

    /** @type {Function} - Validator function for new values */
    validator,

    /** @type {string} - Error message for invalid values */
    errorMessage = 'Invalid value',

    /** @type {string} - ARIA label for the input */
    ariaLabel
  } = $props();

  const dispatch = createEventDispatcher();
  
  // Get form context if available
  const formContext = getContext('form');
  
  // Input state
  let inputValue = $state('');
  let itemValues = $state([...values]);
  let focusedIndex = $state(-1);
  let inputEl;
  let isInvalid = $state(false);
  let validationMessage = $state('');
  
  // Register with form if available
  let fieldApi;
  if (formContext && name) {
    fieldApi = formContext.registerField(name, values);
    
    // Update values when form field changes
    $effect(() => {
      const formValue = fieldApi.getValue();
      if (formValue !== undefined && JSON.stringify(formValue) !== JSON.stringify(itemValues)) {
        itemValues = [...formValue];
      }
    });
  }
  
  // Update internal values when prop changes
  $effect(() => {
    if (JSON.stringify(values) !== JSON.stringify(itemValues)) {
      itemValues = [...values];
    }
  });
  
  /**
   * Validates a value
   * @param {string} value - Value to validate
   * @returns {boolean} - Whether the value is valid
   */
  function validateValue(value) {
    if (!value.trim()) return false;
    
    if (!allowDuplicates && itemValues.includes(value.trim())) {
      validationMessage = 'Duplicate value';
      return false;
    }
    
    if (maxItems && itemValues.length >= maxItems) {
      validationMessage = `Maximum of ${maxItems} items allowed`;
      return false;
    }
    
    if (validator) {
      const isValid = validator(value.trim());
      if (!isValid) {
        validationMessage = errorMessage;
      }
      return isValid;
    }
    
    return true;
  }
  
  /**
   * Adds a new item
   * @param {string} value - Value to add
   */
  function addItem(value) {
    const trimmedValue = value.trim();
    
    if (!validateValue(trimmedValue)) {
      isInvalid = true;
      return;
    }
    
    isInvalid = false;
    validationMessage = '';
    
    // Add the item
    itemValues = [...itemValues, trimmedValue];
    inputValue = '';
    
    // Update form field if available
    if (fieldApi) {
      fieldApi.setValue(itemValues);
    }
    
    dispatch('change', { values: itemValues });
    dispatch('add', { value: trimmedValue });
  }
  
  /**
   * Removes an item
   * @param {number} index - Index of the item to remove
   */
  function removeItem(index) {
    if (index < 0 || index >= itemValues.length) return;
    
    const removedValue = itemValues[index];
    itemValues = itemValues.filter((_, i) => i !== index);
    
    // Update form field if available
    if (fieldApi) {
      fieldApi.setValue(itemValues);
    }
    
    // Update focused index
    if (focusedIndex >= itemValues.length) {
      focusedIndex = itemValues.length - 1;
    }
    
    dispatch('change', { values: itemValues });
    dispatch('remove', { value: removedValue, index });
  }
  
  /**
   * Handles input keydown
   * @param {KeyboardEvent} event - Keydown event
   */
  function handleKeydown(event) {
    // Get add trigger keys
    const triggerKeys = addOnKeys.split(',').map(k => k.trim().toLowerCase());
    
    // Check if key should trigger adding an item
    const shouldAddItem = (
      (triggerKeys.includes('enter') && event.key === 'Enter') ||
      (triggerKeys.includes('tab') && event.key === 'Tab') ||
      (triggerKeys.includes('comma') && event.key === ',') ||
      (triggerKeys.includes('space') && event.key === ' ')
    );
    
    if (shouldAddItem && inputValue.trim()) {
      event.preventDefault();
      addItem(inputValue);
      return;
    }
    
    // Handle backspace to remove last item
    if (event.key === 'Backspace' && !inputValue && itemValues.length > 0) {
      if (focusedIndex === -1) {
        // Focus the last item first
        focusedIndex = itemValues.length - 1;
      } else {
        // Remove the focused item
        removeItem(focusedIndex);
      }
    }
    
    // Handle arrow keys for navigation
    if (event.key === 'ArrowLeft' && focusedIndex === -1 && !inputValue && itemValues.length > 0) {
      focusedIndex = itemValues.length - 1;
    } else if (event.key === 'ArrowLeft' && focusedIndex > 0) {
      focusedIndex--;
    } else if (event.key === 'ArrowRight' && focusedIndex < itemValues.length - 1) {
      focusedIndex++;
    } else if (event.key === 'ArrowRight' && focusedIndex === itemValues.length - 1) {
      focusedIndex = -1;
      inputEl?.focus();
    }
    
    // Handle Escape to blur
    if (event.key === 'Escape') {
      inputEl?.blur();
      focusedIndex = -1;
    }
  }
  
  /**
   * Handles input change
   * @param {Event} event - Input event
   */
  function handleInput(event) {
    inputValue = event.target.value;
    
    // Clear validation state when typing
    if (isInvalid) {
      isInvalid = false;
      validationMessage = '';
    }
    
    // If the last character is a comma, add the item
    if (inputValue.endsWith(',') && addOnKeys.includes('Comma')) {
      const valueToAdd = inputValue.slice(0, -1);
      if (valueToAdd.trim()) {
        addItem(valueToAdd);
      }
    }
    
    dispatch('input', { value: inputValue });
  }
  
  /**
   * Handles paste event
   * @param {ClipboardEvent} event - Paste event
   */
  function handlePaste(event) {
    if (!pasteSeparator) return;
    
    const pastedText = event.clipboardData?.getData('text') || '';
    if (!pastedText.includes(pasteSeparator)) return;
    
    // Prevent default paste
    event.preventDefault();
    
    // Split pasted text and add items
    const pastedValues = pastedText
      .split(pasteSeparator)
      .map(v => v.trim())
      .filter(v => v);
    
    for (const value of pastedValues) {
      addItem(value);
    }
  }
  
  /**
   * Handles chip click
   * @param {number} index - Chip index
   */
  function handleChipClick(index) {
    focusedIndex = index;
  }
  
  /**
   * Handles input focus
   */
  function handleFocus() {
    focusedIndex = -1;
    dispatch('focus');
  }
  
  /**
   * Handles input blur
   */
  function handleBlur(event) {
    // Add current value if not empty and not clicking on a chip
    if (inputValue.trim() && !event.relatedTarget?.classList.contains('list-input-chip')) {
      addItem(inputValue);
    }
    
    // Reset focused index after a short delay
    // This allows chip click events to fire first
    setTimeout(() => {
      focusedIndex = -1;
    }, 100);
    
    dispatch('blur');
  }
</script>

<div
  class="
    list-input
    {isInvalid ? 'list-input-invalid' : ''}
    {disabled ? 'list-input-disabled' : ''}
    {className}
  "
>
  <div
    class="list-input-container"
    onclick={() => inputEl?.focus()}
  >
    <!-- Chips -->
    {#each itemValues as value, index}
      <div
        class="list-input-chip {focusedIndex === index ? 'list-input-chip-focused' : ''}"
        tabindex="0"
        onclick={() => handleChipClick(index)}
        onkeydown={(e) => {
          if (e.key === 'Backspace' || e.key === 'Delete') {
            removeItem(index);
            inputEl?.focus();
          }
        }}
      >
        <span class="list-input-chip-text">{value}</span>
        <button
          type="button"
          class="list-input-chip-remove"
          aria-label={`Remove ${value}`}
          tabindex="-1"
          onclick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            removeItem(index);
            inputEl?.focus();
          }}
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    {/each}
    
    <!-- Input -->
    <input
      {id}
      {name}
      type="text"
      class="list-input-field"
      {placeholder}
      value={inputValue}
      disabled={disabled || (maxItems && itemValues.length >= maxItems)}
      aria-label={ariaLabel || name}
      aria-invalid={isInvalid ? 'true' : undefined}
      bind:this={inputEl}
      oninput={handleInput}
      onkeydown={handleKeydown}
      onfocus={handleFocus}
      onblur={handleBlur}
      onpaste={handlePaste}
    />
  </div>
  
  {#if isInvalid && validationMessage}
    <div class="list-input-error" role="alert">
      {validationMessage}
    </div>
  {/if}
  
  <!-- Hidden input for form submission -->
  <input
    type="hidden"
    {name}
    value={JSON.stringify(itemValues)}
    {required}
    {disabled}
  />
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .list-input {
    @apply w-full;
  }
  
  .list-input-container {
    @apply flex flex-wrap items-center gap-2 p-2;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border rounded-md;
    @apply focus-within:ring-2 focus-within:ring-primary-500 dark:focus-within:ring-primary-400 focus-within:border-primary-500 dark:focus-within:border-primary-400;
    @apply transition-colors duration-200;
  }
  
  .list-input-field {
    @apply flex-grow min-w-[80px] bg-transparent border-none outline-none p-1;
    @apply text-text dark:text-text placeholder:text-muted dark:placeholder:text-muted;
  }
  
  .list-input-chip {
    @apply flex items-center gap-1 px-2 py-1 rounded-md;
    @apply bg-surface dark:bg-surface text-text dark:text-text;
    @apply border border-border dark:border-border;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
  }
  
  .list-input-chip-focused {
    @apply bg-primary-100 dark:bg-primary-900 border-primary-300 dark:border-primary-700;
  }
  
  .list-input-chip-text {
    @apply text-sm;
  }
  
  .list-input-chip-remove {
    @apply p-0.5 rounded-full;
    @apply text-muted dark:text-muted;
    @apply hover:bg-hover dark:hover:bg-hover hover:text-text dark:hover:text-text;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
  }
  
  .list-input-error {
    @apply mt-1 text-xs text-error-600 dark:text-error-400;
  }
  
  .list-input-invalid .list-input-container {
    @apply border-error-500 dark:border-error-400 focus-within:ring-error-500 dark:focus-within:ring-error-400 focus-within:border-error-500 dark:focus-within:border-error-400;
  }
  
  .list-input-disabled {
    @apply opacity-60 pointer-events-none;
  }
</style>
