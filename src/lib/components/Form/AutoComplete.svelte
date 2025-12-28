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
<script>
import { createEventDispatcher } from "svelte"
import { slide } from "svelte/transition"
import { clickOutside } from "$lib/actions"
import Input from "./Input.svelte"

const dispatch = createEventDispatcher()

const {
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
} = $props()

let inputValue = $state("")
let suggestions = $state([])
let selectedItems = $state(multiple ? [] : null)
let focused = $state(false)
let showSuggestions = $state(false)
let highlightedIndex = $state(-1)
let searchTimeout = $state()

// Initialize selected items
$effect(() => {
  if (value) {
    selectedItems = multiple ? (Array.isArray(value) ? value : [value]) : value
    inputValue = multiple ? "" : getItemLabel(value)
  }
})

// Handle input changes
function handleInput(event) {
  const query = event.detail.value
  inputValue = query

  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  if (query.length >= minLength) {
    searchTimeout = setTimeout(() => {
      search(query)
    }, delay)
  } else {
    suggestions = []
    showSuggestions = false
  }
}

// Search for suggestions
function search(query) {
  if (filter) {
    suggestions = filter(items, query)
  } else {
    suggestions = items.filter((item) => {
      const label = getItemLabel(item).toLowerCase()
      return label.includes(query.toLowerCase())
    })
  }

  suggestions = suggestions.slice(0, maxItems)
  showSuggestions = true
  highlightedIndex = -1
}

// Get label for an item
function getItemLabel(item) {
  if (!item) return ""
  return typeof item === "object" ? item[labelField] : item
}

// Get value for an item
function getItemValue(item) {
  if (!item) return ""
  return typeof item === "object" ? item[valueField] : item
}

// Handle item selection
function selectItem(item) {
  if (multiple) {
    const value = getItemValue(item)
    const exists = selectedItems.some((i) => getItemValue(i) === value)

    if (!exists) {
      selectedItems = [...selectedItems, item]
      dispatch("select", { items: selectedItems })
    }

    inputValue = ""
  } else {
    selectedItems = item
    inputValue = getItemLabel(item)
    dispatch("select", { item })
  }

  showSuggestions = false
}

// Remove selected item (multiple mode)
function removeItem(item) {
  if (!multiple) return

  const value = getItemValue(item)
  selectedItems = selectedItems.filter((i) => getItemValue(i) !== value)
  dispatch("remove", { item })
  dispatch("select", { items: selectedItems })
}

// Handle keyboard navigation
function handleKeydown(event) {
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
function handleFocus() {
  focused = true
  if (inputValue.length >= minLength) {
    showSuggestions = true
  }
}

function handleBlur() {
  focused = false
  // Delay hiding suggestions to allow click events
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
function highlightText(text, query) {
  if (!highlight || !query) return text

  const regex = new RegExp(`(${query})`, "gi")
  return text.replace(regex, "<mark>$1</mark>")
}
</script>

<div
  class="autocomplete {className}"
  use:clickOutside
  onclickOutside={() => showSuggestions = false}
>
  <Input
    {label}
    {placeholder}
    {disabled}
    value={inputValue}
    oninput={handleInput}
    onfocus={handleFocus}
    onblur={handleBlur}
    onkeydown={handleKeydown}
  />
  
  {#if multiple && selectedItems.length > 0}
    <div class="autocomplete-chips" aria-label="Selected items">
      {#each selectedItems as item}
        <div class="autocomplete-chip">
          <span>{getItemLabel(item)}</span>
          <button
            type="button"
            class="autocomplete-chip-remove"
            onclick={() => removeItem(item)}
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
            onmouseenter={() => highlightedIndex = index}
            onclick={() => selectItem(item)}
          >
            {#if itemTemplate}
              <svelte:component this={itemTemplate} {item} />
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
    @apply absolute z-50 w-full mt-1;
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
