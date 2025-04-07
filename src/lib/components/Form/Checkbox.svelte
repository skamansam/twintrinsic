<!--
@component
Checkbox - A form component for boolean or indeterminate input with customizable
labels, descriptions, and validation states.

Usage:
```svelte
<Checkbox
  label="Accept terms"
  on:change={handleChange}
/>

<Checkbox
  label="Select all"
  indeterminate={someSelected}
  checked={allSelected}
  description="Select all items in the list"
/>
```
-->
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const {
    /** @type {string} - Label text */
    label,
    /** @type {string} - Description text */
    description = '',
    /** @type {boolean} - Whether the checkbox is checked */
    checked = false,
    /** @type {boolean} - Whether the checkbox is in an indeterminate state */
    indeterminate = false,
    /** @type {boolean} - Whether the checkbox is disabled */
    disabled = false,
    /** @type {boolean} - Whether the checkbox is required */
    required = false,
    /** @type {string} - Error message */
    error = '',
    /** @type {string} - Name attribute */
    name = '',
    /** @type {string} - Value attribute */
    value = '',
    /** @type {string} - Additional CSS classes */
    class: className = ''
  } = $props();

  let checkboxEl;

  // Update indeterminate state
  $effect(() => {
    if (checkboxEl) {
      checkboxEl.indeterminate = indeterminate;
    }
  });

  // Handle change event
  function handleChange(event) {
    const isChecked = event.target.checked;
    dispatch('change', { checked: isChecked });
  }
</script>

<div class="checkbox-container {className}">
  <label
    class="checkbox"
    class:checkbox-disabled={disabled}
    class:checkbox-error={error}
  >
    <input
      type="checkbox"
      bind:this={checkboxEl}
      {name}
      {value}
      {checked}
      {disabled}
      {required}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      on:change={handleChange}
    />
    <span class="checkbox-control" aria-hidden="true">
      {#if checked && !indeterminate}
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
        </svg>
      {:else if indeterminate}
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
        </svg>
      {/if}
    </span>
    <span class="checkbox-label">
      {label}
      {#if required}
        <span class="checkbox-required" aria-hidden="true">*</span>
      {/if}
    </span>
  </label>

  {#if description}
    <div class="checkbox-description">
      {description}
    </div>
  {/if}

  {#if error}
    <div
      class="checkbox-error-text"
      id="{name}-error"
      role="alert"
    >
      {error}
    </div>
  {/if}
</div>

<style>
  @reference "../../twintrinsic.css";

  .checkbox-container {
    @apply flex flex-col gap-1;
  }

  .checkbox {
    @apply relative flex items-start gap-2;
    @apply cursor-pointer select-none;
  }

  .checkbox-disabled {
    @apply cursor-not-allowed opacity-50;
  }

  /* Hide default checkbox */
  .checkbox input {
    @apply absolute w-0 h-0 opacity-0;
  }

  /* Custom checkbox control */
  .checkbox-control {
    @apply flex items-center justify-center;
    @apply w-5 h-5 rounded;
    @apply border-2 border-border;
    @apply text-primary-foreground;
    @apply transition-colors;
  }

  /* Hover state */
  .checkbox:hover .checkbox-control {
    @apply border-primary-500;
  }

  /* Focus state */
  .checkbox input:focus + .checkbox-control {
    @apply ring-2 ring-primary-500 ring-offset-2;
    @apply ring-offset-background;
  }

  /* Checked state */
  .checkbox input:checked + .checkbox-control {
    @apply bg-primary-500 border-primary-500;
  }

  /* Error state */
  .checkbox-error .checkbox-control {
    @apply border-error-500;
  }

  .checkbox-error:hover .checkbox-control {
    @apply border-error-600;
  }

  .checkbox-error input:checked + .checkbox-control {
    @apply bg-error-500 border-error-500;
  }

  /* Label */
  .checkbox-label {
    @apply text-sm;
  }

  .checkbox-required {
    @apply ml-1 text-error-500;
  }

  /* Description */
  .checkbox-description {
    @apply text-sm text-muted;
    @apply pl-7; /* Align with label text */
  }

  /* Error message */
  .checkbox-error-text {
    @apply text-sm text-error-500;
    @apply pl-7; /* Align with label text */
  }
</style>
