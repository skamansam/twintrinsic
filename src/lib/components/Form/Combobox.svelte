<!--
@component
Combobox - A component that combines a text input with a dropdown list.
Provides autocomplete functionality with keyboard navigation and accessibility features.

Usage:
```svelte
<Combobox 
  options={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
  placeholder="Select a fruit"
  onchange={(e) => console.log(e.detail.value)}
/>

<Combobox 
  options={users}
  optionLabel="name"
  optionValue="id"
  placeholder="Select a user"
  onchange={(e) => console.log(e.detail.value)}
/>

<Combobox 
  options={countries}
  optionLabel="name"
  optionValue="code"
  placeholder="Select a country"
  searchable
  clearable
  let:option
>
  <div class="flex items-center">
    <img src={option.flag} alt={option.name} class="w-5 h-5 mr-2" />
    {option.name}
  </div>
</Combobox>
```
-->
<script>
import { createEventDispatcher, tick } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Name attribute for the input */
  name,

  /** @type {Array} - Options to display in the dropdown */
  options = [],

  /** @type {any} - Current value */
  value = null,

  /** @type {string} - Placeholder text */
  placeholder = "Select an option",

  /** @type {string} - Property name for option labels */
  optionLabel = "label",

  /** @type {string} - Property name for option values */
  optionValue = "value",

  /** @type {boolean} - Whether the combobox is disabled */
  disabled = false,

  /** @type {boolean} - Whether the combobox is readonly */
  readonly = false,

  /** @type {boolean} - Whether the combobox is required */
  required = false,

  /** @type {boolean} - Whether to allow searching */
  searchable = true,

  /** @type {boolean} - Whether to allow clearing the selection */
  clearable = true,

  /** @type {boolean} - Whether to show a loading indicator */
  loading = false,

  /** @type {boolean} - Whether to automatically select the first option */
  autoSelect = false,

  /** @type {boolean} - Whether to open the dropdown on focus */
  openOnFocus = true,

  /** @type {number} - Maximum height of the dropdown in pixels */
  maxHeight = 250,

  /** @type {string} - ARIA label for the combobox */
  ariaLabel,

  /** @type {Function} - Custom filter function */
  filter,

  /** @type {Function} - Custom template for options */
  optionTemplate,

  /** @type {Function} - Custom template for selected value */
  valueTemplate,

  option,
} = $props()

const dispatch = createEventDispatcher()

// Component state
let inputElement = $state()
let dropdownElement = $state()
let isOpen = $state(false)
let inputValue = $state("")
let selectedOption = $state(null)
let highlightedIndex = $state(-1)
let filteredOptions = $state([])
let inputWidth = $state(0)

// Update selected option when value prop changes
$effect(() => {
  if (value !== undefined && value !== null) {
    const option = findOptionByValue(value)
    selectedOption = option
    inputValue = option ? getOptionLabel(option) : ""
  } else {
    selectedOption = null
    if (!isOpen) {
      inputValue = ""
    }
  }
})

// Update filtered options when input value changes
$effect(() => {
  if (searchable && isOpen) {
    filteredOptions = filterOptions(inputValue)
    highlightedIndex = autoSelect && filteredOptions.length > 0 ? 0 : -1
  } else {
    filteredOptions = [...options]
  }
})

// Update input width when element is mounted
$effect(() => {
  if (inputElement) {
    inputWidth = inputElement.offsetWidth
  }
})

/**
 * Finds an option by its value
 * @param {any} value - Value to find
 * @returns {Object|null} - Found option or null
 */
function findOptionByValue(value) {
  if (value === null || value === undefined) return null

  return options.find((option) => {
    const optionValue = getOptionValue(option)
    return optionValue === value
  })
}

/**
 * Gets the label for an option
 * @param {Object|string} option - Option to get label for
 * @returns {string} - Option label
 */
function getOptionLabel(option) {
  if (!option) return ""

  if (typeof option === "string" || typeof option === "number") {
    return String(option)
  }

  return option[optionLabel] || ""
}

/**
 * Gets the value for an option
 * @param {Object|string} option - Option to get value for
 * @returns {any} - Option value
 */
function getOptionValue(option) {
  if (!option) return null

  if (typeof option === "string" || typeof option === "number") {
    return option
  }

  return option[optionValue]
}

/**
 * Filters options based on input value
 * @param {string} query - Query to filter by
 * @returns {Array} - Filtered options
 */
function filterOptions(query) {
  if (!query) return [...options]

  if (filter) {
    return filter(options, query)
  }

  return options.filter((option) => {
    const label = getOptionLabel(option).toLowerCase()
    return label.includes(query.toLowerCase())
  })
}

/**
 * Handles input focus
 */
function handleFocus() {
  if (disabled || readonly) return

  if (openOnFocus) {
    openDropdown()
  }
}

/**
 * Handles input blur
 */
function handleBlur(event) {
  // Close dropdown after a short delay to allow for click events
  setTimeout(() => {
    if (
      document.activeElement !== inputElement &&
      !dropdownElement?.contains(document.activeElement)
    ) {
      closeDropdown()

      // Reset input value if no option is selected
      if (!selectedOption) {
        inputValue = ""
      } else {
        inputValue = getOptionLabel(selectedOption)
      }
    }
  }, 100)
}

/**
 * Handles input change
 * @param {Event} event - Input event
 */
function handleInput(event) {
  if (disabled || readonly) return

  inputValue = event.target.value

  if (!isOpen) {
    openDropdown()
  }

  // If input is cleared, clear selection
  if (!inputValue && selectedOption) {
    selectedOption = null
    dispatch("change", { value: null })
  }
}

/**
 * Handles keydown events
 * @param {KeyboardEvent} event - Keydown event
 */
async function handleKeydown(event) {
  if (disabled || readonly) return

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault()
      if (!isOpen) {
        openDropdown()
      } else {
        highlightedIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1)
        await scrollToHighlighted()
      }
      break

    case "ArrowUp":
      event.preventDefault()
      if (!isOpen) {
        openDropdown()
      } else {
        highlightedIndex = Math.max(highlightedIndex - 1, 0)
        await scrollToHighlighted()
      }
      break

    case "Enter":
      event.preventDefault()
      if (isOpen && highlightedIndex >= 0) {
        selectOption(filteredOptions[highlightedIndex])
      } else if (!isOpen) {
        openDropdown()
      }
      break

    case "Escape":
      event.preventDefault()
      if (isOpen) {
        closeDropdown()
        // Reset input value to selected option
        inputValue = selectedOption ? getOptionLabel(selectedOption) : ""
      }
      break

    case "Tab":
      if (isOpen) {
        closeDropdown()
        // Reset input value to selected option
        inputValue = selectedOption ? getOptionLabel(selectedOption) : ""
      }
      break
  }
}

/**
 * Scrolls to the highlighted option
 */
async function scrollToHighlighted() {
  await tick()

  if (dropdownElement && highlightedIndex >= 0) {
    const highlightedEl = dropdownElement.querySelector(`[data-index="${highlightedIndex}"]`)
    if (highlightedEl) {
      const containerRect = dropdownElement.getBoundingClientRect()
      const optionRect = highlightedEl.getBoundingClientRect()

      if (optionRect.bottom > containerRect.bottom) {
        dropdownElement.scrollTop += optionRect.bottom - containerRect.bottom
      } else if (optionRect.top < containerRect.top) {
        dropdownElement.scrollTop -= containerRect.top - optionRect.top
      }
    }
  }
}

/**
 * Opens the dropdown
 */
function openDropdown() {
  if (disabled || readonly) return

  isOpen = true
  filteredOptions = filterOptions(inputValue)
  highlightedIndex = autoSelect && filteredOptions.length > 0 ? 0 : -1

  // Focus input if not already focused
  if (document.activeElement !== inputElement) {
    inputElement.focus()
  }
}

/**
 * Closes the dropdown
 */
function closeDropdown() {
  isOpen = false
  highlightedIndex = -1
}

/**
 * Selects an option
 * @param {Object|string} option - Option to select
 */
function selectOption(option) {
  selectedOption = option
  inputValue = getOptionLabel(option)
  closeDropdown()

  const value = getOptionValue(option)
  dispatch("change", { value, option })
  dispatch("input", { value, option })
}

/**
 * Clears the selection
 * @param {Event} event - Click event
 */
function clearSelection(event) {
  event.stopPropagation()

  if (disabled || readonly) return

  selectedOption = null
  inputValue = ""

  dispatch("change", { value: null })
  dispatch("input", { value: null })

  // Focus input after clearing
  inputElement.focus()
}

/**
 * Toggles the dropdown
 */
function toggleDropdown() {
  if (disabled || readonly) return

  if (isOpen) {
    closeDropdown()
  } else {
    openDropdown()
  }
}
</script>

<div
  class="
    combobox
    {disabled ? 'combobox-disabled' : ''}
    {readonly ? 'combobox-readonly' : ''}
    {isOpen ? 'combobox-open' : ''}
    {className}
  "
>
  <div class="combobox-input-container">
    <input
      {id}
      {name}
      type="text"
      class="combobox-input"
      placeholder={placeholder}
      value={inputValue}
      aria-label={ariaLabel || placeholder}
      aria-autocomplete="list"
      aria-controls={`${id}-listbox`}
      aria-expanded={isOpen}
      aria-activedescendant={highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined}
      role="combobox"
      autocomplete="off"
      {disabled}
      {readonly}
      {required}
      onfocus={handleFocus}
      onblur={handleBlur}
      oninput={handleInput}
      onkeydown={handleKeydown}
      bind:this={inputElement}
    />
    
    <div class="combobox-actions">
      {#if loading}
        <div class="combobox-loading">
          <svg class="combobox-spinner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle class="combobox-spinner-track" cx="12" cy="12" r="10" />
            <circle class="combobox-spinner-path" cx="12" cy="12" r="10" />
          </svg>
        </div>
      {/if}
      
      {#if clearable && selectedOption && !disabled && !readonly}
        <button
          type="button"
          class="combobox-clear"
          aria-label="Clear selection"
          onclick={clearSelection}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      {/if}
      
      <button
        type="button"
        class="combobox-toggle"
        aria-label={isOpen ? 'Close dropdown' : 'Open dropdown'}
        onclick={toggleDropdown}
        disabled={disabled || readonly}
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
        </svg>
      </button>
    </div>
  </div>
  
  {#if isOpen}
    <div
      id={`${id}-listbox`}
      class="combobox-dropdown"
      role="listbox"
      style="max-height: {maxHeight}px; width: {inputWidth}px;"
      bind:this={dropdownElement}
    >
      {#if filteredOptions.length === 0}
        <div class="combobox-empty">
          No options available
        </div>
      {:else}
        {#each filteredOptions as option, i}
          <div
            id={`${id}-option-${i}`}
            class="
              combobox-option
              {i === highlightedIndex ? 'combobox-option-highlighted' : ''}
              {selectedOption && getOptionValue(selectedOption) === getOptionValue(option) ? 'combobox-option-selected' : ''}
            "
            role="option"
            aria-selected={selectedOption && getOptionValue(selectedOption) === getOptionValue(option)}
            data-index={i}
            onclick={() => selectOption(option)}
            onmouseenter={() => highlightedIndex = i}
          >
            {#if optionTemplate}
              {@render optionTemplate(option)}
            {:else if option}
              {@render option?.({ option })}
            {:else}
              {getOptionLabel(option)}
            {/if}
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .combobox {
    @apply relative w-full;
  }
  
  .combobox-disabled {
    @apply opacity-50 cursor-not-allowed;
    @apply pointer-events-none;
  }
  
  .combobox-readonly {
    @apply cursor-default;
  }
  
  .combobox-input-container {
    @apply relative flex items-center;
    @apply w-full;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border;
    @apply rounded-md;
    @apply transition-colors duration-150;
  }
  
  .combobox-open .combobox-input-container {
    @apply border-primary-500 dark:border-primary-500;
    @apply ring-2 ring-primary-500/20 dark:ring-primary-500/20;
  }
  
  .combobox-input {
    @apply w-full py-2 pl-3 pr-10;
    @apply bg-transparent;
    @apply text-text dark:text-text;
    @apply border-none;
    @apply focus:outline-none;
  }
  
  .combobox-actions {
    @apply absolute right-2;
    @apply flex items-center;
  }
  
  .combobox-loading {
    @apply mr-1;
  }
  
  .combobox-spinner {
    @apply w-4 h-4;
    @apply animate-spin;
    @apply text-muted dark:text-muted;
  }
  
  .combobox-spinner-track {
    @apply opacity-25;
    @apply stroke-current;
    @apply fill-none;
    @apply stroke-2;
  }
  
  .combobox-spinner-path {
    @apply opacity-75;
    @apply stroke-current;
    @apply fill-none;
    @apply stroke-2;
    stroke-dasharray: 60;
    stroke-dashoffset: 45;
  }
  
  .combobox-clear {
    @apply p-1 mr-1;
    @apply text-muted dark:text-muted;
    @apply hover:text-text dark:hover:text-text;
    @apply rounded-full;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply transition-colors duration-150;
  }
  
  .combobox-toggle {
    @apply p-1;
    @apply text-muted dark:text-muted;
    @apply hover:text-text dark:hover:text-text;
    @apply rounded-full;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply transition-colors duration-150;
  }
  
  .combobox-dropdown {
    @apply absolute z-50 mt-1;
    @apply overflow-auto;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border;
    @apply rounded-md shadow-lg;
  }
  
  .combobox-empty {
    @apply py-2 px-3;
    @apply text-muted dark:text-muted;
    @apply text-center;
  }
  
  .combobox-option {
    @apply py-2 px-3;
    @apply cursor-pointer;
    @apply text-text dark:text-text;
    @apply hover:bg-hover dark:hover:bg-hover;
  }
  
  .combobox-option-highlighted {
    @apply bg-hover dark:bg-hover;
  }
  
  .combobox-option-selected {
    @apply bg-primary-50 dark:bg-primary-900/20;
    @apply text-primary-700 dark:text-primary-300;
  }
</style>
