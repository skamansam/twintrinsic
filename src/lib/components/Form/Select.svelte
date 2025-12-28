<!--
@component
Select - A form component for selecting options from a dropdown list.
Supports single and multiple selection, option groups, and custom option templates.

Usage:
```svelte
<Select
  label="Country"
  options={countries}
  onchange={handleChange}
/>

<Select
  label="Skills"
  options={skills}
  multiple={true}
  placeholder="Select skills..."
/>
```
-->
<script>
import { createEventDispatcher } from "svelte"
import { slide } from "svelte/transition"
import { clickOutside } from "$lib/actions/index.js"

const dispatch = createEventDispatcher()

const {
  /** @type {string} - Input label */
  label = "",
  /** @type {Array<{ value: string, label: string, group?: string }>} - Options to display */
  options = [],
  /** @type {string | string[]} - Selected value(s) */
  value = "",
  /** @type {boolean} - Whether multiple selection is allowed */
  multiple = false,
  /** @type {string} - Placeholder text */
  placeholder = "Select...",
  /** @type {boolean} - Whether the select is disabled */
  disabled = false,
  /** @type {string} - Error message */
  error = "",
  /** @type {boolean} - Whether the field is required */
  required = false,
  /** @type {string} - Additional CSS classes */
  class: className = "",
} = $props()

let showDropdown = $state(false)
let searchValue = $state("")
let selectedValues = $state([])
let focusedIndex = $state(-1)
let dropdownRef = $state()

// Initialize selected values
$effect(() => {
  selectedValues = Array.isArray(value) ? value : value ? [value] : []
})

// Filter options based on search
const filteredOptions = $derived(() => {
  const search = searchValue.toLowerCase()
  return options.filter((option) => option.label.toLowerCase().includes(search))
})

// Group options by their group property
const groupedOptions = $derived(() => {
  const groups = new Map()

  for (const option of filteredOptions) {
    const group = option.group || ""
    if (!groups.has(group)) {
      groups.set(group, [])
    }
    groups.get(group).push(option)
  }

  return groups
})

// Handle option selection
function selectOption(option) {
  if (disabled) return

  const value = option.value
  let newValues

  if (multiple) {
    newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]
  } else {
    newValues = [value]
    showDropdown = false
  }

  selectedValues = newValues
  dispatch("change", {
    value: multiple ? newValues : newValues[0],
  })
}

// Handle keyboard navigation
function handleKeydown(event) {
  if (disabled) return

  switch (event.key) {
    case "Enter":
    case " ":
      if (!showDropdown) {
        event.preventDefault()
        showDropdown = true
      } else if (focusedIndex >= 0) {
        event.preventDefault()
        selectOption(filteredOptions[focusedIndex])
      }
      break

    case "ArrowDown":
      event.preventDefault()
      if (!showDropdown) {
        showDropdown = true
      } else {
        focusedIndex = Math.min(focusedIndex + 1, filteredOptions.length - 1)
        scrollToOption(focusedIndex)
      }
      break

    case "ArrowUp":
      event.preventDefault()
      if (showDropdown) {
        focusedIndex = Math.max(focusedIndex - 1, 0)
        scrollToOption(focusedIndex)
      }
      break

    case "Escape":
      showDropdown = false
      break

    case "Tab":
      showDropdown = false
      break
  }
}

// Scroll focused option into view
function scrollToOption(index) {
  if (!dropdownRef) return

  const options = dropdownRef.querySelectorAll(".select-option")
  if (options[index]) {
    options[index].scrollIntoView({
      block: "nearest",
    })
  }
}

// Clear selection
function clearSelection(event) {
  event.stopPropagation()
  if (disabled) return
  selectedValues = []
  dispatch("change", { value: multiple ? [] : "" })
}

// Get display value
const displayValue = $derived(() => {
  if (!selectedValues.length) return ""

  const selected = options.filter((option) => selectedValues.includes(option.value))

  if (multiple) {
    return selected.length === 1 ? selected[0].label : `${selected.length} items selected`
  }

  return selected[0]?.label || ""
})
</script>

<div
  class="select {className}"
  class:select-error={!!error}
  class:select-disabled={disabled}
  use:clickOutside
  onclickOutside={() => showDropdown = false}
>
  <label class="select-label">
    {#if label}
      <span class="select-label-text">
        {label}
        {#if required}
          <span class="select-required" aria-hidden="true">*</span>
        {/if}
      </span>
    {/if}
    
    <div
      class="select-control"
      role="combobox"
      aria-expanded={showDropdown}
      aria-haspopup="listbox"
      aria-controls="select-options"
      aria-label={label}
      aria-required={required}
      aria-invalid={!!error}
      aria-describedby={error ? 'select-error' : undefined}
      tabindex={disabled ? -1 : 0}
      onclick={() => !disabled && (showDropdown = !showDropdown)}
      onkeydown={handleKeydown}
    >
      <div class="select-value">
        {#if selectedValues.length}
          <span class="select-text">{displayValue}</span>
          {#if !disabled}
            <button
              type="button"
              class="select-clear"
              aria-label="Clear selection"
              onclick={clearSelection}
            >
              ×
            </button>
          {/if}
        {:else}
          <span class="select-placeholder">{placeholder}</span>
        {/if}
      </div>
      
      <div class="select-indicator">
        <svg
          class="select-arrow"
          class:select-arrow-open={showDropdown}
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path
            fill="currentColor"
            d="M7 10l5 5 5-5z"
          />
        </svg>
      </div>
    </div>
  </label>
  
  {#if error}
    <div
      id="select-error"
      class="select-error-text"
      aria-live="polite"
    >
      {error}
    </div>
  {/if}
  
  {#if showDropdown}
    <div
      class="select-dropdown"
      id="select-options"
      role="listbox"
      aria-multiselectable={multiple}
      bind:this={dropdownRef}
      transition:slide={{ duration: 150 }}
    >
      {#if options.length > 10}
        <div class="select-search">
          <input
            type="text"
            placeholder="Search..."
            bind:value={searchValue}
            onclick={event => event.stopPropagation()}
          />
        </div>
      {/if}
      
      <div class="select-options">
        {#each [...groupedOptions.entries()] as [group, options]}
          {#if group}
            <div class="select-group">
              <div class="select-group-label">{group}</div>
              {#each options as option, index}
                <div
                  class="select-option"
                  class:select-option-selected={selectedValues.includes(option.value)}
                  class:select-option-focused={focusedIndex === index}
                  role="option"
                  aria-selected={selectedValues.includes(option.value)}
                  onclick={() => selectOption(option)}
                >
                  {option.label}
                </div>
              {/each}
            </div>
          {:else}
            {#each options as option, index}
              <div
                class="select-option"
                class:select-option-selected={selectedValues.includes(option.value)}
                class:select-option-focused={focusedIndex === index}
                role="option"
                aria-selected={selectedValues.includes(option.value)}
                onclick={() => selectOption(option)}
              >
                {option.label}
              </div>
            {/each}
          {/if}
        {/each}
        
        {#if filteredOptions.length === 0}
          <div class="select-no-results">
            No options found
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference '../../twintrinsic.css';

  .select {
    @apply relative inline-block w-full;
  }

  .select-label {
    @apply block;
  }

  .select-label-text {
    @apply block mb-1 text-sm font-medium;
  }

  .select-required {
    @apply ml-1 text-error;
  }

  .select-control {
    @apply relative flex items-center w-full px-3 py-2;
    @apply bg-surface border border-border rounded-md;
    @apply text-sm cursor-pointer;
    @apply transition-colors duration-150;
    @apply focus:outline-none focus:ring-2 focus:ring-primary/50;
  }

  .select-disabled .select-control {
    @apply bg-surface/50 cursor-not-allowed;
  }

  .select-error .select-control {
    @apply border-error;
  }

  .select-value {
    @apply flex-1 flex items-center min-w-0;
  }

  .select-text {
    @apply truncate;
  }

  .select-placeholder {
    @apply text-muted;
  }

  .select-clear {
    @apply ml-2 text-lg text-muted hover:text-primary-text;
    @apply focus:outline-none focus:text-primary-text;
  }

  .select-indicator {
    @apply ml-2 flex-none;
  }

  .select-arrow {
    @apply transition-transform duration-150;
  }

  .select-arrow-open {
    @apply rotate-180;
  }

  .select-dropdown {
    @apply absolute z-50 w-full mt-1;
    @apply bg-surface border border-border rounded-md shadow-lg;
    @apply max-h-60 overflow-auto;
  }

  .select-search {
    @apply sticky top-0 p-2 border-b border-border bg-surface;
  }

  .select-search input {
    @apply w-full px-2 py-1 text-sm;
    @apply bg-surface border border-border rounded;
    @apply focus:outline-none focus:ring-2 focus:ring-primary/50;
  }

  .select-options {
    @apply py-1;
  }

  .select-group {
    @apply py-1;
  }

  .select-group-label {
    @apply px-3 py-1 text-xs font-medium text-muted;
  }

  .select-option {
    @apply px-3 py-2 text-sm cursor-pointer;
    @apply hover:bg-hover focus:bg-hover;
    @apply transition-colors duration-150;
  }

  .select-option-selected {
    @apply bg-primary/10 text-primary;
  }

  .select-option-focused {
    @apply bg-hover;
  }

  .select-no-results {
    @apply px-3 py-2 text-sm text-muted;
  }

  .select-error-text {
    @apply mt-1 text-sm text-error;
  }
</style>
