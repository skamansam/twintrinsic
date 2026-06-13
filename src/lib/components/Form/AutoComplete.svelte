<!--
@component
AutoComplete - An input component that provides suggestions as you type.
Built on top of the base Input component with additional dropdown functionality.

Usage:
```svelte
<AutoComplete
  label="Country"
  items={countries}
  onselect={handleSelect}
/>

<AutoComplete
  label="Search Users"
  items={users}
  itemTemplate={UserTemplate}
  minLength={2}
  delay={300}
  multiple
/>
```
-->
<script lang="ts">
import { getContext } from "svelte"
import { slide } from "svelte/transition"
import Input from "./Input.svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"

const {
  /** @type {string} - Field name for form registration */
  name,
  /** @type {string} - Input label */
  label,
  /** @type {Array<any>} - Array of items to search through */
  items = [],
  /** @type {string} - Field to use for item labels */
  labelField = "label",
  /** @type {string} - Field to use for item values */
  valueField = "value",
  /** @type {string | Array<string>} - Selected value(s) */
  value = "",
  /** @type {number} - Minimum characters before showing suggestions */
  minLength = 1,
  /** @type {number} - Delay in ms before searching */
  delay = 150,
  /** @type {boolean} - Whether to allow multiple selections */
  multiple = false,
  /** @type {boolean} - Whether to highlight matching text */
  highlight = true,
  /** @type {boolean} - Whether to force selection from suggestions */
  forceSelection = false,
  /** @type {number} - Maximum number of suggestions to show */
  maxItems = 10,
  /** @type {string} - Additional CSS classes */
  class: className = "",
  /** @type {function} - Custom filter function */
  filter = null,
  /** @type {function} - Custom item template */
  itemTemplate = null,
  /** @type {string} - No results message */
  emptyMessage = "No results found",
  /** @type {string} - Loading message */
  loadingMessage = "Loading...",
  /** @type {boolean} - Whether suggestions are loading */
  loading = false,
  /** @type {string} - Placeholder text */
  placeholder = "",
  /** @type {boolean} - Whether the input is disabled */
  disabled = false,
  /** @type {(event: CustomEvent) => void} - Select event handler */
  onselect,
  /** @type {(event: CustomEvent) => void} - Remove event handler */
  onremove,
} = $props()

let inputValue = $state("")
let suggestions: unknown[] = $state([])
let selectedItems: unknown[] | unknown | null = $state(null)
const derivedMultiple = $derived(multiple)

// Get form context if available
const formContext = getContext<FormContext | undefined>("form")

// Register with form if available
let fieldApi: FormFieldApi | undefined

// Disabled from form context takes precedence over the local prop
// (fieldApi.isDisabled is a superset of formContext.disabled — check it first)
const effectiveDisabled = $derived(
  disabled || (fieldApi?.isDisabled() ?? false) || (formContext?.disabled() ?? false)
)

$effect(() => {
  if (formContext && name) {
    fieldApi = formContext.registerField(name, value)
  }
})

// Sync from form (handles form.reset(), form.setValue(), etc.)
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue()
    if (formValue === null || formValue === undefined) {
      // Form reset
      if (selectedItems !== null) {
        selectedItems = null
        inputValue = ""
      }
    } else if (derivedMultiple) {
      const arr = Array.isArray(formValue) ? formValue : [formValue]
      // Compare by value-of-array to avoid reassignment loops
      const currentArr = Array.isArray(selectedItems) ? selectedItems : []
      const sameLength = arr.length === currentArr.length
      const sameItems = sameLength && arr.every((v, i) => {
        const a = typeof v === "object" ? JSON.stringify(v) : v
        const b = typeof currentArr[i] === "object" ? JSON.stringify(currentArr[i]) : currentArr[i]
        return a === b
      })
      if (!sameItems) {
        selectedItems = arr
        inputValue = ""
      }
    } else {
      // Single mode: compare by value
      const currentSingle = selectedItems
      const a = typeof formValue === "object" ? JSON.stringify(formValue) : formValue
      const b = typeof currentSingle === "object" && currentSingle !== null ? JSON.stringify(currentSingle) : currentSingle
      if (a !== b) {
        selectedItems = formValue
        inputValue = getItemLabel(formValue)
      }
    }
  }
})

let ItemTemplate: ((item: unknown) => string) | null = $state(null)
$effect(() => {
	ItemTemplate = itemTemplate
})

let focused = $state(false)
let showSuggestions = $state(false)
let suggestionsPopoverRef: HTMLElement | undefined = $state()

// Handle popover toggle events
$effect(() => {
  if (!suggestionsPopoverRef) return
  
  const handleToggle = (event: Event) => {
    const toggleEvent = event as ToggleEvent
    showSuggestions = toggleEvent.newState === "open"
  }
  
  suggestionsPopoverRef.addEventListener("toggle", handleToggle)
  
  return () => {
    suggestionsPopoverRef?.removeEventListener("toggle", handleToggle)
  }
})
let highlightedIndex = $state(-1)
let searchTimeout: ReturnType<typeof setTimeout> | undefined = $state()

// Initialize selected items from value prop (only when not registered with form)
$effect(() => {
  if (!fieldApi && value) {
    selectedItems = derivedMultiple ? (Array.isArray(value) ? value : [value]) : value
    inputValue = derivedMultiple ? "" : getItemLabel(value)
  }
})

// Handle input changes
function handleInput(event: CustomEvent): void {
  const query = event.detail.value
  inputValue = query

  if (searchTimeout !== undefined) {
    clearTimeout(searchTimeout)
  }

  if (query.length >= minLength) {
    // @ts-ignore: DOM lib types setTimeout with `this: Window` binding;
    // module-scope has `this: void`
    searchTimeout = setTimeout(() => {
      search(query)
    }, delay)
  } else {
    suggestions = []
    showSuggestions = false
  }
}

// Search for suggestions
function search(query: string): void {
  if (filter && typeof filter === 'function') {
    suggestions = (filter as (items: unknown[], query: string) => unknown[])(items, query)
  } else {
    suggestions = items.filter((item: unknown): boolean => {
      const label = getItemLabel(item).toLowerCase()
      return label.includes(query.toLowerCase())
    })
  }

  suggestions = suggestions.slice(0, maxItems)
  showSuggestions = true
  highlightedIndex = -1
}

// Get label for an item
function getItemLabel(item: unknown): string {
  if (!item) return ""
  return typeof item === "object" ? ((item as Record<string, unknown>)[labelField]?.toString() || "") : item.toString()
}

// Get value for an item
function getItemValue(item: unknown): unknown {
  if (!item) return ""
  return typeof item === "object" ? (item as Record<string, unknown>)[valueField] : item
}

// Handle item selection
function selectItem(item: unknown): void {
  if (effectiveDisabled) return
  if (derivedMultiple) {
		if (!Array.isArray(selectedItems)) {
			selectedItems = []
		}

    const value = getItemValue(item)
    const exists = (selectedItems as unknown[]).some((i: unknown) => getItemValue(i) === value)

    if (!exists) {
      selectedItems = [...(selectedItems as unknown[]), item]
      // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding;
      // module-scope has `this: void`
      onselect?.(new CustomEvent("select", { detail: { items: selectedItems } }))
      fieldApi?.setValue((selectedItems as unknown[]).map((i) => getItemValue(i)))
    }

    inputValue = ""
  } else {
    selectedItems = item
    inputValue = getItemLabel(item)
    // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding;
    // module-scope has `this: void`
    onselect?.(new CustomEvent("select", { detail: { item } }))
    fieldApi?.setValue(getItemValue(item))
  }

  showSuggestions = false
}

// Remove selected item (multiple mode)
function removeItem(item: unknown): void {
  if (effectiveDisabled) return
  if (!derivedMultiple) return
  if (!Array.isArray(selectedItems)) return

  const value = getItemValue(item)
  selectedItems = (selectedItems as unknown[]).filter((i: unknown) => getItemValue(i) !== value)
  // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding;
  // module-scope has `this: void`
  onremove?.(new CustomEvent("remove", { detail: { item } }))
  // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding;
  // module-scope has `this: void`
  onselect?.(new CustomEvent("select", { detail: { items: selectedItems } }))
  fieldApi?.setValue((selectedItems as unknown[]).map((i) => getItemValue(i)))
}

/**
 * Handles keydown events for a suggestion option
 * @param {KeyboardEvent} event - Keydown event
 * @param {any} item - Suggestion item
 */
function handleOptionKeydown(event: KeyboardEvent, item: unknown): void {
  if (event.key !== "Enter" && event.key !== " ") return
  event.preventDefault()
  selectItem(item)
}

// Handle keyboard navigation
function handleKeydown(event: KeyboardEvent): void {
  if (!showSuggestions) return

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault()
      highlightedIndex = Math.min(highlightedIndex + 1, suggestions.length - 1)
      break

    case "ArrowUp":
      event.preventDefault()
      highlightedIndex = Math.max(highlightedIndex - 1, -1)
      break

    case "Enter":
      event.preventDefault()
      if (highlightedIndex >= 0) {
        selectItem(suggestions[highlightedIndex])
      } else if (!forceSelection && inputValue) {
        selectItem(inputValue)
      }
      break

    case "Escape":
      event.preventDefault()
      showSuggestions = false
      break
  }
}

// Handle focus events
function handleFocus(): void {
  focused = true
  if (inputValue.length >= minLength) {
    showSuggestions = true
  }
}

function handleBlur(): void {
  focused = false
  // Delay hiding suggestions to allow click events
  // @ts-ignore: DOM lib types setTimeout with `this: Window` binding;
  // module-scope has `this: void`
  setTimeout(() => {
    if (!focused) {
      showSuggestions = false
      if (forceSelection && !selectedItems) {
        inputValue = ""
      }
    }
  }, 200)
}

// Highlight matching text
function highlightText(text: string, query: string): string {
  if (!highlight || !query) return text

  const regex = new RegExp(`(${query})`, "gi")
  return text.replace(regex, "<mark>$1</mark>")
}
</script>

<div
  class="autocomplete {className}"
>
  <Input
    {label}
    {placeholder}
    disabled={effectiveDisabled}
    value={inputValue}
    oninput={handleInput}
    onfocus={handleFocus}
    onblur={handleBlur}
    onkeydown={handleKeydown}
  />
  
  {#if derivedMultiple && Array.isArray(selectedItems) && selectedItems.length > 0}
    <div class="autocomplete-chips" aria-label="Selected items">
      {#each selectedItems as item}
        <div class="autocomplete-chip">
          <span>{getItemLabel(item)}</span>
          <button
            type="button"
            class="autocomplete-chip-remove"
            onclick={() => removeItem(item)}
            disabled={effectiveDisabled}
            aria-label="Remove {getItemLabel(item)}"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      {/each}
    </div>
  {/if}
  
  {#if showSuggestions && (suggestions.length > 0 || loading)}
    <div
      class="autocomplete-suggestions"
      role="listbox"
      transition:slide={{ duration: 150 }}
    >
      {#if loading}
        <div class="autocomplete-message" role="status">
          {loadingMessage}
        </div>
      {:else}
        {#each suggestions as item, index}
          <div
            class="autocomplete-item"
            class:autocomplete-item-highlighted={index === highlightedIndex}
            role="option"
            aria-selected={index === highlightedIndex}
            tabindex={index === highlightedIndex ? 0 : -1}
            onmouseenter={() => highlightedIndex = index}
            onclick={() => selectItem(item)}
            onkeydown={(event) => handleOptionKeydown(event, item)}
          >
            {#if ItemTemplate}
              {ItemTemplate(item)}
            {:else}
              {@html highlightText(getItemLabel(item), inputValue)}
            {/if}
          </div>
        {/each}
      {/if}
    </div>
  {:else if showSuggestions && suggestions.length === 0 && !loading}
    <div
      class="autocomplete-suggestions"
      role="status"
      transition:slide={{ duration: 150 }}
    >
      <div class="autocomplete-message">
        {emptyMessage}
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .autocomplete {
    @apply relative w-full;
  }

  /* Suggestions dropdown */
  .autocomplete-suggestions {
    @apply z-50 w-full;
    @apply bg-surface border border-border rounded-md shadow-lg;
    @apply max-h-60 overflow-auto;
  }

  /* Suggestion items */
  .autocomplete-item {
    @apply px-4 py-2 text-sm cursor-pointer;
    @apply hover:bg-hover focus:bg-hover;
  }

  .autocomplete-item-highlighted {
    @apply bg-hover;
  }

  /* Highlighted text */
  :global(.autocomplete-item mark) {
    @apply bg-primary-100 dark:bg-primary-900;
    @apply text-primary-900 dark:text-primary-100;
    @apply rounded px-0.5;
  }

  /* Message styles */
  .autocomplete-message {
    @apply px-4 py-3 text-sm text-muted text-center;
  }

  /* Selected chips (multiple mode) */
  .autocomplete-chips {
    @apply flex flex-wrap gap-2 mt-2;
  }

  .autocomplete-chip {
    @apply flex items-center gap-1 px-2 py-1 text-sm;
    @apply bg-surface border border-border rounded-full;
  }

  .autocomplete-chip-remove {
    @apply p-0.5 hover:text-error focus:outline-none;
    @apply focus:text-error transition-colors;
  }
</style>
