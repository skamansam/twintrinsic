<!--
@component
Select - A form component for selecting options from a dropdown list.
Supports single and multiple selection, cascading menus, option groups, and custom option templates.

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

<Select
  options={categories}
  optionLabel="name"
  optionValue="id"
  optionChildren="items"
/>
```
-->
<script lang="ts">
import { getContext } from "svelte"

const {
  /** @type {string} - Input label */
  label = "",
  /** @type {Array} - Options to display */
  options = [],
  /** @type {any} - Selected value(s) */
  value,
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
  /** @type {string} - Property name for option label */
  optionLabel = "label",
  /** @type {string} - Property name for option value */
  optionValue = "value",
  /** @type {string} - Property name for option children (for cascading) */
  optionChildren = "items",
  /** @type {boolean} - Whether to filter options by typing */
  filter = false,
  /** @type {string} - Size of the select (sm, md, lg) */
  size = "md",
  /** @type {boolean} - Whether to show a clear button */
  clearable = false,
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
const formContext = getContext("form") as { registerField?: (name: string, value: unknown) => { getValue?: () => unknown } } | undefined

// Derived values for reactive prop access in closures
const derivedValue = $derived(value)
const derivedMultiple = $derived(multiple)

// Component state
let selectedValues: unknown[] | null = $state(derivedMultiple ? [] : null)
let filterValue = $state("")
let highlightedIndex = $state(0)
let dropdownElement: HTMLElement | undefined = $state()
let inputElement: HTMLInputElement | undefined = $state()
let menuElement: HTMLElement | undefined = $state()
let menuPopoverRef: HTMLElement | undefined = $state()
let activeSubmenu: unknown = $state(null)
let isOpen = $state(false)

// Register with form if available
let fieldApi: { getValue?: () => unknown; setValue?: (value: unknown) => void } | undefined = $state()

$effect(() => {
  if (formContext?.registerField && label) {
    fieldApi = formContext.registerField(label, derivedValue)
  }
})

// Update value when form field changes
$effect(() => {
  if (fieldApi?.getValue) {
    const formValue = fieldApi.getValue()
    if (formValue !== undefined && JSON.stringify(formValue) !== JSON.stringify(selectedValues)) {
      selectedValues = formValue as unknown[] | null
    }
  }
})

// Initialize selected values from prop
$effect(() => {
  if (value !== undefined) {
    selectedValues = value
  }
})

// Sync isOpen state with popover visibility
$effect(() => {
  if (menuPopoverRef) {
    const handleToggle = () => {
      isOpen = menuPopoverRef?.matches(':popover-open') ?? false
    }
    
    menuPopoverRef.addEventListener('toggle', handleToggle)
    return () => {
      menuPopoverRef?.removeEventListener('toggle', handleToggle)
    }
  }
})

/**
 * Gets the display label for an option
 */
function getOptionLabel(option: unknown): string {
  if (!option) return ""

  if (typeof option === "object") {
    return String((option as Record<string, unknown>)[optionLabel] || "")
  }

  return option.toString()
}

/**
 * Gets the value for an option
 */
function getOptionValue(option: unknown): unknown {
  if (!option) return null

  if (typeof option === "object") {
    return (option as Record<string, unknown>)[optionValue]
  }

  return option
}

/**
 * Gets the children for an option (for cascading)
 */
function getOptionChildren(option: unknown): unknown {
  if (!option || typeof option !== "object") return null

  return (option as Record<string, unknown>)[optionChildren] || null
}

/**
 * Checks if an option is selected
 */
function isOptionSelected(option: unknown): boolean {
  const val = getOptionValue(option)

  if (multiple) {
    return (
      Array.isArray(selectedValues) &&
      selectedValues.some((v) => (typeof v === "object" ? (v as Record<string, unknown>)[optionValue] === val : v === val))
    )
  }

  if (!selectedValues) return false

  return (
    selectedValues === val ||
    (typeof selectedValues === "object" && (selectedValues as Record<string, unknown>)[optionValue] === val)
  )
}

/**
 * Filters options based on input value
 */
function filterOptions(opts: unknown[]): unknown[] {
  if (!filter || !filterValue) return opts

  return opts.filter((option: unknown) => {
    const label = getOptionLabel(option).toLowerCase()
    return label.includes(filterValue.toLowerCase())
  })
}

/**
 * Gets the display value for the input
 */
function getDisplayValue(): string {
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
 */
function selectOption(option: unknown, event?: Event): void {
  if (event) {
    event.stopPropagation()
  }
  const val = getOptionValue(option)

  if (multiple) {
    if (isOptionSelected(option)) {
      // Remove from selection
      selectedValues = Array.isArray(selectedValues)
        ? selectedValues.filter((v) =>
            typeof v === "object" ? (v as Record<string, unknown>)[optionValue] !== val : v !== val
          )
        : []
    } else {
      // Add to selection
      selectedValues = Array.isArray(selectedValues) ? [...selectedValues, val] : [val]
    }
  } else {
    // Single selection
    selectedValues = val as unknown[] | null
    closeDropdown()
  }

  // Update form field if available
  if (fieldApi?.setValue) {
    (fieldApi as { setValue?: (value: unknown) => void }).setValue?.(selectedValues)
  }

  onchange?.(new CustomEvent("change", { detail: { value: selectedValues } }))
}

/**
 * Clears the selection
 */
function clearSelection(evt: Event): void {
  evt.stopPropagation()
  selectedValues = multiple ? [] : null

  // Update form field if available
  if (fieldApi?.setValue) {
    (fieldApi as { setValue?: (value: unknown) => void }).setValue?.(selectedValues)
  }

  onchange?.(new CustomEvent("change", { detail: { value: selectedValues } }))
  onclear?.(new CustomEvent("clear"))
}

/**
 * Opens the dropdown
 */
function openDropdown(): void {
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
function closeDropdown(): void {
  menuPopoverRef?.hidePopover()
  filterValue = ""
  activeSubmenu = null
  isOpen = false

  onclose?.(new CustomEvent("close"))
}

/**
 * Toggles the dropdown
 */
function toggleDropdown(): void {
  if (isOpen) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

/**
 * Opens a submenu
 */
function openSubmenu(option: unknown, event: Event): void {
  if (event) {
    event.stopPropagation()
  }

  activeSubmenu = option
}

/**
 * Handles keydown events
 */
function handleKeydown(event: KeyboardEvent): void {
  if (disabled) return

  const filteredOptions = filterOptions(options)

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault()
      if (!isOpen) {
        menuPopoverRef?.showPopover()
        isOpen = true
      } else {
        highlightedIndex = (highlightedIndex + 1) % filteredOptions.length
        scrollOptionIntoView()
      }
      break

    case "ArrowUp":
      event.preventDefault()
      if (!isOpen) {
        menuPopoverRef?.showPopover()
        isOpen = true
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
        menuPopoverRef?.showPopover()
        isOpen = true
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
          menuPopoverRef?.showPopover()
          isOpen = true
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
 */
function handleFilterInput(event: Event): void {
  filterValue = (event.target as HTMLInputElement).value
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
  class="select {isOpen ? 'select-open' : ''} {disabled ? 'select-disabled' : ''} {className}"
  class:select-error={!!error}
  bind:this={dropdownElement}
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
      class="select-control {sizeClasses}"
      popovertarget="select-menu"
      popovertargetaction="toggle"
      onkeydown={handleKeydown}
      tabindex={disabled ? undefined : 0}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="select-menu"
      aria-label={label}
      aria-required={required}
      aria-invalid={!!error}
      aria-describedby={error ? 'select-error' : undefined}
    >
      {#if filter && isOpen}
        <input
          type="text"
          class="select-filter"
          placeholder={placeholder}
          value={filterValue}
          oninput={handleFilterInput}
          onkeydown={handleKeydown}
          bind:this={inputElement}
          {disabled}
        />
      {:else}
        <div class="select-value">
          {#if displayValue}
            {displayValue}
          {:else}
            <span class="select-placeholder">{placeholder}</span>
          {/if}
        </div>
      {/if}
      
      <div class="select-indicators">
        {#if clearable && (selectedValues !== null && (!Array.isArray(selectedValues) || selectedValues.length > 0))}
          <button
            type="button"
            class="select-clear-button"
            aria-label="Clear selection"
            onclick={clearSelection}
            tabindex="-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        {/if}
        
        <div class="select-arrow">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
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
  
  <div
    id="select-menu"
    class="select-menu"
    popover="auto"
    role="listbox"
    aria-multiselectable={multiple ? 'true' : undefined}
    bind:this={menuPopoverRef}
    bind:this={menuElement}
  >
    <ul class="select-options">
      {#each filterOptions(options) as option, index}
        {@const hasChildren = getOptionChildren(option) && (getOptionChildren(option) as unknown[]).length > 0}
        {@const isHighlighted = index === highlightedIndex}
        {@const isSelected = isOptionSelected(option)}
        
        <li
          class="
            select-option
            {isHighlighted ? 'select-option-highlighted' : ''}
            {isSelected ? 'select-option-selected' : ''}
            {hasChildren ? 'select-option-parent' : ''}
          "
          role="option"
          aria-selected={isSelected ? 'true' : 'false'}
          data-index={index}
          onclick={() => selectOption(option)}
          onmouseenter={() => {
            highlightedIndex = index;
            if (hasChildren) {
              openSubmenu(option, new Event('mouseenter'));
            } else {
              activeSubmenu = null;
            }
          }}
        >
          <div class="select-option-content">
            {#if multiple}
              <div class="select-checkbox">
                {#if isSelected}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                {/if}
              </div>
            {/if}
            
            <div class="select-option-label">
              {getOptionLabel(option)}
            </div>
            
            {#if hasChildren}
              <div class="select-submenu-arrow">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            {/if}
          </div>
          
          {#if hasChildren && activeSubmenu === option}
            <div class="select-submenu">
              <ul class="select-options">
                {#each getOptionChildren(option) as childOption, childIndex}
                  {@const isChildSelected = isOptionSelected(childOption)}
                  
                  <li
                    class="
                      select-option
                      {isChildSelected ? 'select-option-selected' : ''}
                    "
                    role="option"
                    aria-selected={isChildSelected ? 'true' : 'false'}
                    onclick={() => selectOption(childOption)}
                  >
                    <div class="select-option-content">
                      {#if multiple}
                        <div class="select-checkbox">
                          {#if isChildSelected}
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          {/if}
                        </div>
                      {/if}
                      
                      <div class="select-option-label">
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
        <li class="select-empty">No options available</li>
      {/each}
    </ul>
  </div>
</div>

<style lang="postcss">
  @reference '../../twintrinsic.css';

  .select {
    @apply relative w-full;
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
    @apply flex items-center justify-between;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border rounded-md;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400;
    @apply transition-colors duration-200;
    @apply px-3 cursor-pointer;
  }

  .select-disabled .select-control {
    @apply opacity-50 cursor-not-allowed;
  }

  .select-error .select-control {
    @apply border-error;
  }

  .select-value {
    @apply flex-grow truncate text-text dark:text-text;
  }

  .select-placeholder {
    @apply text-muted dark:text-muted;
  }

  .select-indicators {
    @apply flex items-center ml-2;
  }

  .select-arrow {
    @apply flex-shrink-0 text-muted dark:text-muted transition-transform duration-200;
  }

  .select-open .select-arrow {
    @apply rotate-180;
  }

  .select-clear-button {
    @apply p-1 mr-1 rounded-full text-muted dark:text-muted;
    @apply hover:bg-hover dark:hover:bg-hover hover:text-text dark:hover:text-text;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
  }

  .select-filter {
    @apply w-full bg-transparent border-none outline-none;
    @apply text-text dark:text-text placeholder:text-muted dark:placeholder:text-muted;
  }

  .select-menu {
    @apply z-50 w-full;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border rounded-md;
    @apply shadow-lg;
    @apply max-h-60 overflow-y-auto;
  }

  .select-options {
    @apply py-1;
  }

  .select-option {
    @apply relative px-3 py-2 cursor-pointer;
    @apply text-text dark:text-text;
    @apply hover:bg-hover dark:hover:bg-hover;
    @apply transition-colors duration-150;
  }

  .select-option-content {
    @apply flex items-center gap-2;
  }

  .select-option-highlighted {
    @apply bg-hover dark:bg-hover;
  }

  .select-option-selected {
    @apply bg-primary-50 dark:bg-primary-900/20;
    @apply text-primary-700 dark:text-primary-300;
  }

  .select-option-parent {
    @apply pr-8;
  }

  .select-checkbox {
    @apply w-4 h-4 flex-shrink-0;
    @apply border border-border dark:border-border rounded;
    @apply flex items-center justify-center;
    @apply bg-background dark:bg-background;
  }

  .select-option-selected .select-checkbox {
    @apply bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400;
    @apply text-white dark:text-white;
  }

  .select-option-label {
    @apply flex-grow truncate;
  }

  .select-submenu-arrow {
    @apply absolute right-3 top-1/2 -translate-y-1/2;
    @apply text-muted dark:text-muted;
  }

  .select-submenu {
    @apply absolute left-full top-0 ml-1;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border rounded-md;
    @apply shadow-lg;
    @apply min-w-[200px] max-h-60 overflow-y-auto;
  }

  .select-empty {
    @apply px-3 py-2 text-muted dark:text-muted text-center;
  }

  .select-error-text {
    @apply mt-1 text-sm text-error;
  }
</style>
