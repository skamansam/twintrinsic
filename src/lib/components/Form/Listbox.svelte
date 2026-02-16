<!--
@component
Listbox - A component for selecting one or multiple options from a list.
Provides accessible keyboard navigation, filtering, and customization options.

Usage:
```svelte
<Listbox 
  name="users" 
  options={users} 
  optionLabel="name" 
  optionValue="id" 
/>

<Listbox 
  name="colors" 
  options={colors} 
  multiple 
  filter 
/>

<FormField label="Select a category">
  <Listbox 
    name="category" 
    options={categories} 
    optionIcon="icon" 
  />
</FormField>
```
-->
<script lang="ts">
import { getContext, onMount } from "svelte"

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

  /** @type {boolean} - Whether multiple selection is allowed */
  multiple = false,

  /** @type {string} - Property name for option label */
  optionLabel = "label",

  /** @type {string} - Property name for option value */
  optionValue = "value",

  /** @type {string} - Property name for option icon */
  optionIcon,

  /** @type {boolean} - Whether the listbox is disabled */
  disabled = false,

  /** @type {boolean} - Whether the listbox is required */
  required = false,

  /** @type {boolean} - Whether to filter options by typing */
  filter = false,

  /** @type {string} - Placeholder for filter input */
  filterPlaceholder = "Search...",

  /** @type {number} - Maximum height of the listbox */
  maxHeight = 300,

  /** @type {boolean} - Whether to show a checkbox for multiple selection */
  showCheckbox = true,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel,

  /** @type {(event: CustomEvent) => void} - Change event handler */
  onchange,
  /** @type {(event: CustomEvent) => void} - Filter event handler */
  onfilter,
} = $props()

// Get form context if available
const formContext = getContext("form") as { registerField?: (name: string, value: unknown) => { getValue?: () => unknown; setValue?: (value: unknown) => void } } | undefined

// Component state
let selectedValues: unknown[] | unknown | null = $state(multiple ? [] : null)
let filterValue = $state("")
let highlightedIndex = $state(0)
let listboxElement: HTMLElement | undefined = $state()
let filterInputElement: HTMLInputElement | undefined = $state()

// Register with form if available
let fieldApi: { getValue?: () => unknown; setValue?: (value: unknown) => void } | undefined = $state()

$effect(() => {
  if (formContext?.registerField && name) {
    fieldApi = formContext.registerField(name, value)
  }
})

// Update value when form field changes
$effect(() => {
  if (fieldApi?.getValue) {
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
function getOptionLabel(option: unknown): string {
  if (!option) return ""

  if (typeof option === "object") {
    return (option as Record<string, unknown>)[optionLabel]?.toString() || ""
  }

  return option.toString()
}

/**
 * Gets the value for an option
 * @param {Object|string} option - Option to get value for
 * @returns {any} - Option value
 */
function getOptionValue(option: unknown): unknown {
  if (!option) return null

  if (typeof option === "object") {
    return (option as Record<string, unknown>)[optionValue]
  }

  return option
}

/**
 * Gets the icon for an option
 * @param {Object} option - Option to get icon for
 * @returns {string} - Icon HTML
 */
function getOptionIcon(option: unknown): unknown {
  if (!option || !optionIcon || typeof option !== "object") return null

  return (option as Record<string, unknown>)[optionIcon]
}

/**
 * Checks if an option is selected
 * @param {Object|string} option - Option to check
 * @returns {boolean} - Whether the option is selected
 */
function isOptionSelected(option: unknown): boolean {
  const value = getOptionValue(option)

  if (multiple) {
    return (
      Array.isArray(selectedValues) &&
      selectedValues.some((v) => (typeof v === "object" ? (v as Record<string, unknown>)[optionValue] === value : v === value))
    )
  }

  return (
    selectedValues === value ||
    (typeof selectedValues === "object" && selectedValues !== null && (selectedValues as Record<string, unknown>)[optionValue] === value)
  )
}

/**
 * Filters options based on input value
 * @returns {Array} - Filtered options
 */
function filterOptions(): unknown[] {
  if (!filter || !filterValue) return options

  return options.filter((option) => {
    const label = getOptionLabel(option).toLowerCase()
    return label.includes(filterValue.toLowerCase())
  })
}

/**
 * Selects an option
 * @param {Object|string} option - Option to select
 */
function selectOption(option: unknown): void {
  if (disabled) return

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
  }

  // Update form field if available
  if (fieldApi?.setValue) {
    fieldApi.setValue(selectedValues)
  }

  onchange?.(new CustomEvent("change", { detail: { value: selectedValues } }))
}

/**
 * Handles keydown events
 * @param {KeyboardEvent} event - Keydown event
 */
function handleKeydown(event: KeyboardEvent): void {
  if (disabled) return

  const filteredOptions = filterOptions()

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault()
      highlightedIndex = (highlightedIndex + 1) % filteredOptions.length
      scrollOptionIntoView()
      break

    case "ArrowUp":
      event.preventDefault()
      highlightedIndex = (highlightedIndex - 1 + filteredOptions.length) % filteredOptions.length
      scrollOptionIntoView()
      break

    case "Enter":
    case " ":
      if (!filter || event.target !== filterInputElement) {
        event.preventDefault()
        if (filteredOptions[highlightedIndex]) {
          selectOption(filteredOptions[highlightedIndex])
        }
      }
      break

    case "Home":
      event.preventDefault()
      highlightedIndex = 0
      scrollOptionIntoView()
      break

    case "End":
      event.preventDefault()
      highlightedIndex = filteredOptions.length - 1
      scrollOptionIntoView()
      break

    case "Tab":
      // Allow normal tab behavior
      break

    default:
      // If filter is not enabled, use type-ahead
      if (!filter && event.key.length === 1) {
        const char = event.key.toLowerCase()
        const matchingIndex = filteredOptions.findIndex(
          (option, index) =>
            index > highlightedIndex && getOptionLabel(option).toLowerCase().startsWith(char)
        )

        if (matchingIndex !== -1) {
          highlightedIndex = matchingIndex
          scrollOptionIntoView()
        } else {
          // Try from the beginning
          const firstMatchingIndex = filteredOptions.findIndex((option) =>
            getOptionLabel(option).toLowerCase().startsWith(char)
          )

          if (firstMatchingIndex !== -1) {
            highlightedIndex = firstMatchingIndex
            scrollOptionIntoView()
          }
        }
      }
      break
  }
}

/**
 * Scrolls the highlighted option into view
 */
function scrollOptionIntoView(): void {
  if (!listboxElement) return

  const highlightedOption = listboxElement.querySelector(`[data-index="${highlightedIndex}"]`)
  if (highlightedOption) {
    highlightedOption.scrollIntoView({ block: "nearest" })
  }
}

/**
 * Handles filter input
 * @param {Event} event - Input event
 */
function handleFilterInput(event: Event): void {
  filterValue = event.target.value
  highlightedIndex = 0

  onfilter?.(new CustomEvent("filter", { detail: { filter: filterValue } }))
}

// Focus the listbox on mount
onMount(() => {
  if (filter && filterInputElement) {
    filterInputElement.focus()
  } else if (listboxElement) {
    listboxElement.focus()
  }
})

// Computed filtered options
const filteredOptions = $derived(filterOptions())
</script>

<div class="listbox-container {className}">
  {#if filter}
    <div class="listbox-filter">
      <input
        type="text"
        class="listbox-filter-input"
        placeholder={filterPlaceholder}
        value={filterValue}
        oninput={handleFilterInput}
        onkeydown={handleKeydown}
        bind:this={filterInputElement}
        {disabled}
        aria-controls={`${id}-listbox`}
      />
    </div>
  {/if}
  
  <div
    id="{id}-listbox"
    class="listbox"
    style="max-height: {maxHeight}px;"
    tabindex={disabled ? undefined : 0}
    role="listbox"
    aria-multiselectable={multiple ? 'true' : undefined}
    aria-label={ariaLabel || name}
    aria-disabled={disabled ? 'true' : undefined}
    onkeydown={handleKeydown}
    bind:this={listboxElement}
  >
    {#if filteredOptions.length > 0}
      <ul class="listbox-options">
        {#each filteredOptions as option, index}
          {@const isHighlighted = index === highlightedIndex}
          {@const isSelected = isOptionSelected(option)}
          
          <li
            class="
              listbox-option
              {isHighlighted ? 'listbox-option-highlighted' : ''}
              {isSelected ? 'listbox-option-selected' : ''}
            "
            role="option"
            aria-selected={isSelected ? 'true' : 'false'}
            data-index={index}
            onclick={() => selectOption(option)}
            onmouseenter={() => highlightedIndex = index}
          >
            <div class="listbox-option-content">
              {#if multiple && showCheckbox}
                <div class="listbox-checkbox">
                  {#if isSelected}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  {/if}
                </div>
              {/if}
              
              {#if optionIcon && getOptionIcon(option)}
                <div class="listbox-option-icon">
                  {@html getOptionIcon(option)}
                </div>
              {/if}
              
              <div class="listbox-option-label">
                {getOptionLabel(option)}
              </div>
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <div class="listbox-empty">No options available</div>
    {/if}
  </div>
  
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
  
  .listbox-container {
    @apply w-full;
  }
  
  .listbox-filter {
    @apply mb-2;
  }
  
  .listbox-filter-input {
    @apply w-full px-3 py-2;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border rounded-md;
    @apply text-text dark:text-text placeholder:text-muted dark:placeholder:text-muted;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
    @apply transition-colors duration-200;
  }
  
  .listbox {
    @apply w-full overflow-y-auto;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border rounded-md;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply transition-colors duration-200;
  }
  
  .listbox[aria-disabled="true"] {
    @apply opacity-50 cursor-not-allowed;
  }
  
  .listbox-options {
    @apply py-1;
  }
  
  .listbox-option {
    @apply px-3 py-2 cursor-pointer;
    @apply text-text dark:text-text;
    @apply hover:bg-hover dark:hover:bg-hover;
    @apply transition-colors duration-150;
  }
  
  .listbox-option-content {
    @apply flex items-center gap-2;
  }
  
  .listbox-option-highlighted {
    @apply bg-hover dark:bg-hover;
  }
  
  .listbox-option-selected {
    @apply bg-primary-50 dark:bg-primary-900/20;
    @apply text-primary-700 dark:text-primary-300;
  }
  
  .listbox-checkbox {
    @apply w-4 h-4 flex-shrink-0;
    @apply border border-border dark:border-border rounded;
    @apply flex items-center justify-center;
    @apply bg-background dark:bg-background;
  }
  
  .listbox-option-selected .listbox-checkbox {
    @apply bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400;
    @apply text-white dark:text-white;
  }
  
  .listbox-option-icon {
    @apply flex-shrink-0 w-5 h-5;
  }
  
  .listbox-option-label {
    @apply flex-grow truncate;
  }
  
  .listbox-empty {
    @apply px-3 py-4 text-muted dark:text-muted text-center;
  }
</style>
