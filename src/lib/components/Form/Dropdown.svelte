<!--
@component
Dropdown - A component for selecting one or multiple options from a dropdown menu.
Supports icons, groups, cascading menus, and keyboard navigation.

Usage:
```svelte
<Dropdown 
  name="country" 
  options={countries} 
  placeholder="Select a country" 
/>

<Dropdown 
  name="skills" 
  options={skills} 
  multiple 
  placeholder="Select skills" 
/>

<Dropdown 
  name="category" 
  options={categories} 
  optionLabel="name" 
  optionValue="id" 
  optionIcon="icon" 
/>
```
-->
<script lang="ts">
import { getContext } from "svelte"
import { slide } from "svelte/transition"
import { clickOutside } from "../../actions/clickOutside.js"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Input name */
  name,

  /** @type {Array} - Options to display */
  options = [],

  /** @type {any} - Selected value(s) */
  value,

  /** @type {string} - Placeholder text */
  placeholder = "Select an option",

  /** @type {boolean} - Whether multiple selection is allowed */
  multiple = false,

  /** @type {string} - Property name for option label */
  optionLabel = "label",

  /** @type {string} - Property name for option value */
  optionValue = "value",

  /** @type {string} - Property name for option icon */
  optionIcon,

  /** @type {string} - Property name for option children (for cascading) */
  optionChildren = "items",

  /** @type {boolean} - Whether the dropdown is disabled */
  disabled = false,

  /** @type {boolean} - Whether the dropdown is required */
  required = false,

  /** @type {boolean} - Whether to filter options by typing */
  filter = false,

  /** @type {string} - Size of the dropdown (sm, md, lg) */
  size = "md",

  /** @type {boolean} - Whether to show a clear button */
  clearable = false,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel,

  /** @type {(event: CustomEvent) => void} - Change event handler */
  onchange,
  /** @type {(event: CustomEvent) => void} - Clear event handler */
  onclear,
  /** @type {(event: CustomEvent) => void} - Open event handler */
  onopen,
  /** @type {(event: CustomEvent) => void} - Close event handler */
  onclose,
  /** @type {(event: CustomEvent) => void} - Filter event handler */
  onfilter,
} = $props()

// Get form context if available
const formContext = getContext("form")

// Derived values for reactive prop access in closures
const derivedValue = $derived(value)
const derivedName = $derived(name)
const derivedMultiple = $derived(multiple)

// Component state
let isOpen = $state(false)
let selectedValues = $state(derivedMultiple ? [] : null)
let filterValue = $state("")
let highlightedIndex = $state(0)
let dropdownElement = $state()
let inputElement = $state()
let menuElement = $state()
let activeSubmenu = $state(null)

// Register with form if available
let fieldApi = $state()

$effect(() => {
  if (formContext && derivedName) {
    fieldApi = formContext.registerField(derivedName, derivedValue)
  }
})

// Update value when form field changes
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue()
    if (formValue !== undefined && JSON.stringify(formValue) !== JSON.stringify(selectedValues)) {
      selectedValues = formValue
    }
  }
})

// Initialize selected values from prop
$effect(() => {
  if (value !== undefined) {
    selectedValues = value
  }
})

/**
 * Gets the display label for an option
 * @param {Object|string} option - Option to get label for
 * @returns {string} - Display label
 */
function getOptionLabel(option) {
  if (!option) return ""

  if (typeof option === "object") {
    return option[optionLabel] || ""
  }

  return option.toString()
}

/**
 * Gets the value for an option
 * @param {Object|string} option - Option to get value for
 * @returns {any} - Option value
 */
function getOptionValue(option) {
  if (!option) return null

  if (typeof option === "object") {
    return option[optionValue]
  }

  return option
}

/**
 * Gets the icon for an option
 * @param {Object} option - Option to get icon for
 * @returns {string} - Icon HTML
 */
function getOptionIcon(option) {
  if (!option || !optionIcon || typeof option !== "object") return null

  return option[optionIcon]
}

/**
 * Gets the children for an option (for cascading)
 * @param {Object} option - Option to get children for
 * @returns {Array} - Child options
 */
function getOptionChildren(option) {
  if (!option || typeof option !== "object") return null

  return option[optionChildren] || null
}

/**
 * Checks if an option is selected
 * @param {Object|string} option - Option to check
 * @returns {boolean} - Whether the option is selected
 */
function isOptionSelected(option) {
  const value = getOptionValue(option)

  if (multiple) {
    return (
      Array.isArray(selectedValues) &&
      selectedValues.some((v) => (typeof v === "object" ? v[optionValue] === value : v === value))
    )
  }

  return (
    selectedValues === value ||
    (typeof selectedValues === "object" && selectedValues && selectedValues[optionValue] === value)
  )
}

/**
 * Filters options based on input value
 * @param {Array} opts - Options to filter
 * @returns {Array} - Filtered options
 */
function filterOptions(opts) {
  if (!filter || !filterValue) return opts

  return opts.filter((option) => {
    const label = getOptionLabel(option).toLowerCase()
    return label.includes(filterValue.toLowerCase())
  })
}

/**
 * Gets the display value for the input
 * @returns {string} - Display value
 */
function getDisplayValue() {
  if (!selectedValues || (Array.isArray(selectedValues) && selectedValues.length === 0)) {
    return ""
  }

  if (multiple) {
    if (Array.isArray(selectedValues)) {
      return selectedValues
        .map((v) =>
          typeof v === "object"
            ? getOptionLabel(v)
            : getOptionLabel(options.find((o) => getOptionValue(o) === v))
        )
        .join(", ")
    }
    return ""
  }

  if (typeof selectedValues === "object") {
    return getOptionLabel(selectedValues)
  }

  const selectedOption = options.find((o) => getOptionValue(o) === selectedValues)
  return selectedOption ? getOptionLabel(selectedOption) : ""
}

/**
 * Selects an option
 * @param {Object|string} option - Option to select
 */
function selectOption(option, evt) {
  evt.stopPropagation()
  const value = getOptionValue(option)

  if (multiple) {
    if (isOptionSelected(option)) {
      // Remove from selection
      selectedValues = Array.isArray(selectedValues)
        ? selectedValues.filter((v) =>
            typeof v === "object" ? v[optionValue] !== value : v !== value
          )
        : []
    } else {
      // Add to selection
      selectedValues = Array.isArray(selectedValues) ? [...selectedValues, value] : [value]
    }
  } else {
    // Single selection
    selectedValues = value
    closeDropdown()
  }

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(selectedValues)
  }

  onchange?.(new CustomEvent("change", { detail: { value: selectedValues } }))
}

/**
 * Clears the selection
 */
function clearSelection(evt) {
  evt.stopPropagation()
  selectedValues = multiple ? [] : null

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(selectedValues)
  }

  onchange?.(new CustomEvent("change", { detail: { value: selectedValues } }))
  onclear?.(new CustomEvent("clear"))
}

/**
 * Opens the dropdown
 */
function openDropdown() {
  if (disabled) return

  isOpen = true
  highlightedIndex = 0
  activeSubmenu = null

  // Focus the filter input if filtering is enabled
  if (filter) {
    setTimeout(() => {
      inputElement?.focus()
    }, 0)
  }

  onopen?.(new CustomEvent("open"))
}

/**
 * Closes the dropdown
 */
function closeDropdown() {
  isOpen = false
  filterValue = ""
  activeSubmenu = null

  onclose?.(new CustomEvent("close"))
}

/**
 * Toggles the dropdown
 */
function toggleDropdown() {
  if (isOpen) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

/**
 * Opens a submenu
 * @param {Object} option - Parent option
 * @param {Event} event - Mouse event
 */
function openSubmenu(option, event) {
  if (event) {
    event.stopPropagation()
  }

  activeSubmenu = option
}

/**
 * Handles keydown events
 * @param {KeyboardEvent} event - Keydown event
 */
function handleKeydown(event) {
  if (disabled) return

  const filteredOptions = filterOptions(options)

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault()
      if (!isOpen) {
        openDropdown()
      } else {
        highlightedIndex = (highlightedIndex + 1) % filteredOptions.length
        scrollOptionIntoView()
      }
      break

    case "ArrowUp":
      event.preventDefault()
      if (!isOpen) {
        openDropdown()
      } else {
        highlightedIndex = (highlightedIndex - 1 + filteredOptions.length) % filteredOptions.length
        scrollOptionIntoView()
      }
      break

    case "Enter":
      event.preventDefault()
      if (isOpen) {
        if (filteredOptions[highlightedIndex]) {
          selectOption(filteredOptions[highlightedIndex])
        }
      } else {
        openDropdown()
      }
      break

    case "Escape":
      event.preventDefault()
      closeDropdown()
      break

    case "Tab":
      if (isOpen) {
        closeDropdown()
      }
      break

    case " ":
      if (!filter) {
        event.preventDefault()
        if (!isOpen) {
          openDropdown()
        }
      }
      break
  }
}

/**
 * Scrolls the highlighted option into view
 */
function scrollOptionIntoView() {
  if (!menuElement) return

  const highlightedOption = menuElement.querySelector(`[data-index="${highlightedIndex}"]`)
  if (highlightedOption) {
    highlightedOption.scrollIntoView({ block: "nearest" })
  }
}

/**
 * Handles filter input
 * @param {Event} event - Input event
 */
function handleFilterInput(event) {
  filterValue = event.target.value
  highlightedIndex = 0

  onfilter?.(new CustomEvent("filter", { detail: { filter: filterValue } }))
}

// Determine size classes
const sizeClasses = $derived(
  {
    sm: "h-8 text-sm",
    md: "h-10 text-base",
    lg: "h-12 text-lg",
  }[size] || "h-10 text-base"
)

// Computed display value
const displayValue = $derived(getDisplayValue())
</script>

<div
  class="
    dropdown
    {isOpen ? 'dropdown-open' : ''}
    {disabled ? 'dropdown-disabled' : ''}
    {className}
  "
  bind:this={dropdownElement}
  use:clickOutside={() => isOpen && closeDropdown()}
>
  <div
    class="dropdown-control {sizeClasses}"
    onclick={toggleDropdown}
    onkeydown={handleKeydown}
    tabindex={disabled ? undefined : 0}
    role="combobox"
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    aria-controls={`${id}-menu`}
    aria-label={ariaLabel || name}
    aria-disabled={disabled ? 'true' : undefined}
  >
    {#if filter && isOpen}
      <input
        type="text"
        class="dropdown-filter"
        placeholder={placeholder}
        value={filterValue}
        oninput={handleFilterInput}
        onkeydown={handleKeydown}
        bind:this={inputElement}
        {disabled}
      />
    {:else}
      <div class="dropdown-value">
        {#if displayValue}
          {displayValue}
        {:else}
          <span class="dropdown-placeholder">{placeholder}</span>
        {/if}
      </div>
    {/if}
    
    <div class="dropdown-indicators">
      {#if clearable && (selectedValues !== null && (!Array.isArray(selectedValues) || selectedValues.length > 0))}
        <button
          type="button"
          class="dropdown-clear-button"
          aria-label="Clear selection"
          onclick={clearSelection}
          tabindex="-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      {/if}
      
      <div class="dropdown-arrow">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  </div>
  
  {#if isOpen}
    <div
      id="{id}-menu"
      class="dropdown-menu"
      role="listbox"
      aria-multiselectable={multiple ? 'true' : undefined}
      bind:this={menuElement}
      transition:slide={{ duration: 200 }}
    >
      <ul class="dropdown-options">
        {#each filterOptions(options) as option, index}
          {@const hasChildren = getOptionChildren(option) && getOptionChildren(option).length > 0}
          {@const isHighlighted = index === highlightedIndex}
          {@const isSelected = isOptionSelected(option)}
          
          <li
            class="
              dropdown-option
              {isHighlighted ? 'dropdown-option-highlighted' : ''}
              {isSelected ? 'dropdown-option-selected' : ''}
              {hasChildren ? 'dropdown-option-parent' : ''}
            "
            role="option"
            aria-selected={isSelected ? 'true' : 'false'}
            data-index={index}
            onclick={() => selectOption(option)}
            onmouseenter={() => {
              highlightedIndex = index;
              if (hasChildren) {
                openSubmenu(option);
              } else {
                activeSubmenu = null;
              }
            }}
          >
            <div class="dropdown-option-content">
              {#if multiple}
                <div class="dropdown-checkbox">
                  {#if isSelected}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  {/if}
                </div>
              {/if}
              
              {#if optionIcon && getOptionIcon(option)}
                <div class="dropdown-option-icon">
                  {@html getOptionIcon(option)}
                </div>
              {/if}
              
              <div class="dropdown-option-label">
                {getOptionLabel(option)}
              </div>
              
              {#if hasChildren}
                <div class="dropdown-submenu-arrow">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              {/if}
            </div>
            
            {#if hasChildren && activeSubmenu === option}
              <div class="dropdown-submenu">
                <ul class="dropdown-options">
                  {#each getOptionChildren(option) as childOption, childIndex}
                    {@const isChildSelected = isOptionSelected(childOption)}
                    
                    <li
                      class="
                        dropdown-option
                        {isChildSelected ? 'dropdown-option-selected' : ''}
                      "
                      role="option"
                      aria-selected={isChildSelected ? 'true' : 'false'}
                      onclick={() => selectOption(childOption)}
                    >
                      <div class="dropdown-option-content">
                        {#if multiple}
                          <div class="dropdown-checkbox">
                            {#if isChildSelected}
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            {/if}
                          </div>
                        {/if}
                        
                        {#if optionIcon && getOptionIcon(childOption)}
                          <div class="dropdown-option-icon">
                            {@html getOptionIcon(childOption)}
                          </div>
                        {/if}
                        
                        <div class="dropdown-option-label">
                          {getOptionLabel(childOption)}
                        </div>
                      </div>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </li>
        {:else}
          <li class="dropdown-empty">No options available</li>
        {/each}
      </ul>
    </div>
  {/if}
  
  <!-- Hidden input for form submission -->
  <input
    type="hidden"
    {id}
    {name}
    value={JSON.stringify(selectedValues)}
    {required}
    {disabled}
  />
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .dropdown {
    @apply relative w-full;
  }
  
  .dropdown-control {
    @apply flex items-center justify-between;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border rounded-md;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400;
    @apply transition-colors duration-200;
    @apply px-3 cursor-pointer;
  }
  
  .dropdown-disabled .dropdown-control {
    @apply opacity-50 cursor-not-allowed;
  }
  
  .dropdown-value {
    @apply flex-grow truncate text-text dark:text-text;
  }
  
  .dropdown-placeholder {
    @apply text-muted dark:text-muted;
  }
  
  .dropdown-indicators {
    @apply flex items-center ml-2;
  }
  
  .dropdown-arrow {
    @apply flex-shrink-0 text-muted dark:text-muted transition-transform duration-200;
  }
  
  .dropdown-open .dropdown-arrow {
    @apply rotate-180;
  }
  
  .dropdown-clear-button {
    @apply p-1 mr-1 rounded-full text-muted dark:text-muted;
    @apply hover:bg-hover dark:hover:bg-hover hover:text-text dark:hover:text-text;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
  }
  
  .dropdown-filter {
    @apply w-full bg-transparent border-none outline-none;
    @apply text-text dark:text-text placeholder:text-muted dark:placeholder:text-muted;
  }
  
  .dropdown-menu {
    @apply absolute z-50 w-full mt-1;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border rounded-md;
    @apply shadow-lg;
    @apply max-h-60 overflow-y-auto;
  }
  
  .dropdown-options {
    @apply py-1;
  }
  
  .dropdown-option {
    @apply relative px-3 py-2 cursor-pointer;
    @apply text-text dark:text-text;
    @apply hover:bg-hover dark:hover:bg-hover;
    @apply transition-colors duration-150;
  }
  
  .dropdown-option-content {
    @apply flex items-center gap-2;
  }
  
  .dropdown-option-highlighted {
    @apply bg-hover dark:bg-hover;
  }
  
  .dropdown-option-selected {
    @apply bg-primary-50 dark:bg-primary-900/20;
    @apply text-primary-700 dark:text-primary-300;
  }
  
  .dropdown-option-parent {
    @apply pr-8;
  }
  
  .dropdown-checkbox {
    @apply w-4 h-4 flex-shrink-0;
    @apply border border-border dark:border-border rounded;
    @apply flex items-center justify-center;
    @apply bg-background dark:bg-background;
  }
  
  .dropdown-option-selected .dropdown-checkbox {
    @apply bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400;
    @apply text-white dark:text-white;
  }
  
  .dropdown-option-icon {
    @apply flex-shrink-0 w-5 h-5;
  }
  
  .dropdown-option-label {
    @apply flex-grow truncate;
  }
  
  .dropdown-submenu-arrow {
    @apply absolute right-3 top-1/2 -translate-y-1/2;
    @apply text-muted dark:text-muted;
  }
  
  .dropdown-submenu {
    @apply absolute left-full top-0 ml-1;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border rounded-md;
    @apply shadow-lg;
    @apply min-w-[200px] max-h-60 overflow-y-auto;
  }
  
  .dropdown-empty {
    @apply px-3 py-2 text-muted dark:text-muted text-center;
  }
</style>
