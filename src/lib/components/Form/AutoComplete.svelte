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
<script module lang="ts">
export const propsMetadata = [
  { name: "name", type: "string", description: "Field name for form registration", optional: true },
  { name: "label", type: "string", description: "Input label", optional: true },
  { name: "items", type: "TItem[]", description: "Array of items to search through (strings or objects)", default: "[]", optional: true },
  { name: "labelField", type: "string", description: "Field to use for item labels", default: "\"label\"", optional: true },
  { name: "valueField", type: "string", description: "Field to use for item values", default: "\"value\"", optional: true },
  { name: "value", type: "TItem | TItem[]", description: "Selected value(s)", default: "\"\" as unknown as TItem", optional: true },
  { name: "minLength", type: "number", description: "Minimum characters before showing suggestions", default: "1", optional: true },
  { name: "delay", type: "number", description: "Delay in ms before searching", default: "150", optional: true },
  { name: "multiple", type: "boolean", description: "Whether to allow multiple selections", default: "false", optional: true },
  { name: "highlight", type: "boolean", description: "Whether to highlight matching text", default: "true", optional: true },
  { name: "forceSelection", type: "boolean", description: "Whether to force selection from suggestions", default: "false", optional: true },
  { name: "maxItems", type: "number", description: "Maximum number of suggestions to show", default: "10", optional: true },
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "filter", type: "((items: TItem[], query: string) => TItem[]) | null", description: "Custom filter function", default: "null", optional: true },
  { name: "itemTemplate", type: "ItemTemplateValue<TItem> | null", description: "Custom item template (function or { render: ... } object)", default: "null", optional: true },
  { name: "emptyMessage", type: "string", description: "No results message", default: "\"No results found\"", optional: true },
  { name: "loadingMessage", type: "string", description: "Loading message", default: "\"Loading...\"", optional: true },
  { name: "loading", type: "boolean", description: "Whether suggestions are loading", default: "false", optional: true },
  { name: "placeholder", type: "string", description: "Placeholder text", default: "\"\"", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the input is disabled", default: "false", optional: true },
  { name: "onselect", type: "(event: CustomEvent<{ item?: TItem; items?: TItem[] }>) => void", description: "Select event handler", optional: true, eventDetail: "{ item?: TItem; items?: TItem[] }" },
  { name: "onremove", type: "(event: CustomEvent<{ item: TItem }>) => void", description: "Remove event handler", optional: true, eventDetail: "{ item: TItem }" },
];
</script>

<script lang="ts" generics="TItem extends string | Record<string, unknown> = string | Record<string, unknown>">
import { getContext } from "svelte"
import { getItemLabel } from "../../helpers/itemLabel.js"
import { getItemValue } from "../../helpers/itemValue.js"
import type { FormContext, FormFieldApi } from "./formContext.js"
import Input from "./Input.svelte"

/**
 * Shape consumers can use to override the suggestion-item rendering.
 *
 * Two shapes are supported for backward-compat with existing docs and
 * consumers:
 *   1. A plain function `(item) => string` — the primary form.
 *   2. A render-object `{ render: ({ item }) => string }` — the older
 *      docs convention; both callables return an HTML string that is
 *      injected with `{@html ...}`.
 */
export type ItemTemplateValue<TItem> =
  | ((item: TItem) => string)
  | { render: (args: { item: TItem }) => string }

interface Props<TItem extends string | Record<string, unknown> = string | Record<string, unknown>> {
  /** Field name for form registration */
  name?: string
  /** Input label */
  label?: string
  /** Array of items to search through (strings or objects) */
  items?: TItem[]
  /** Field to use for item labels */
  labelField?: string
  /** Field to use for item values */
  valueField?: string
  /** Selected value(s) */
  value?: TItem | TItem[]
  /** Minimum characters before showing suggestions */
  minLength?: number
  /** Delay in ms before searching */
  delay?: number
  /** Whether to allow multiple selections */
  multiple?: boolean
  /** Whether to highlight matching text */
  highlight?: boolean
  /** Whether to force selection from suggestions */
  forceSelection?: boolean
  /** Maximum number of suggestions to show */
  maxItems?: number
  /** Additional CSS classes */
  class?: string
  /** Custom filter function */
  filter?: ((items: TItem[], query: string) => TItem[]) | null
  /** Custom item template (function or { render: ... } object) */
  itemTemplate?: ItemTemplateValue<TItem> | null
  /** No results message */
  emptyMessage?: string
  /** Loading message */
  loadingMessage?: string
  /** Whether suggestions are loading */
  loading?: boolean
  /** Placeholder text */
  placeholder?: string
  /** Whether the input is disabled */
  disabled?: boolean
  /** Select event handler */
  onselect?: (event: CustomEvent<{ item?: TItem; items?: TItem[] }>) => void
  /** Remove event handler */
  onremove?: (event: CustomEvent<{ item: TItem }>) => void
}

let {
  name,
  label,
  items = [],
  labelField = "label",
  valueField = "value",
  // sentinel default; TItem extends string | Record<string, unknown>, so bare "" can't narrow to it.
  // Downstream code reads via fieldApi?.getValue(), so the literal default rarely surfaces.
  value = "" as unknown as TItem,
  minLength = 1,
  delay = 150,
  multiple = false,
  highlight = true,
  forceSelection = false,
  maxItems = 10,
  class: className = "",
  filter = null,
  itemTemplate = null,
  emptyMessage = "No results found",
  loadingMessage = "Loading...",
  loading = false,
  placeholder = "",
  disabled = false,
  onselect,
  onremove,
}: Props<TItem> = $props()

let inputValue = $state("")
let suggestions: TItem[] = $state([])
let selectedItems: TItem[] | TItem | null = $state<TItem[] | TItem | null>(null)
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
        selectedItems = arr as TItem[]
        inputValue = ""
      }
    } else {
      // Single mode: compare by value
      const currentSingle = selectedItems
      const a = typeof formValue === "object" ? JSON.stringify(formValue) : formValue
      const b = typeof currentSingle === "object" && currentSingle !== null ? JSON.stringify(currentSingle) : currentSingle
      if (a !== b) {
        selectedItems = formValue as TItem
        inputValue = getItemLabel(formValue as TItem, labelField)
      }
    }
  }
})

let ItemTemplate: ItemTemplateValue<TItem> | null = $state<ItemTemplateValue<TItem> | null>(null)
$effect(() => {
	ItemTemplate = itemTemplate
})

let focused = $state(false)
let showSuggestions = $state(false)
let suggestionsPopoverRef: HTMLElement | undefined = $state()
let anchorElement: HTMLElement | undefined = $state()

// True when the native Popover API is available (guards showPopover/hidePopover
// in jsdom-based unit tests and engines that only have the polyfill).
let supportsPopover = $state(false)

$effect(() => {
  supportsPopover = typeof suggestionsPopoverRef?.showPopover === "function"
})

// Handle popover toggle events — the browser owns open/close (light-dismiss,
// Esc, outside click), and `showSuggestions` follows so aria/conditional state
// stays in sync.
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

/**
 * Returns whether a popover element is currently open, working both with
 * native `:popover-open` and the OddBird polyfill (which toggles a
 * `:popover-open` class instead of the pseudo-class).
 */
function isPopoverOpen(el: HTMLElement): boolean {
  return el.matches(":popover-open") || el.classList.contains(":popover-open")
}

/**
 * Opens the suggestions popover. In environments without the Popover API
 * (jsdom unit tests) it falls back to flipping `showSuggestions` directly.
 */
function openSuggestions(): void {
  if (effectiveDisabled) return

  if (supportsPopover) {
    const popover = suggestionsPopoverRef
    if (!popover) return
    if (!isPopoverOpen(popover)) {
      // Guarded: showPopover throws if another show/hide is mid-flight.
      // The `toggle` event keeps `showSuggestions` correct either way.
      try {
        popover.showPopover({ source: anchorElement })
      } catch {
        // ignore — popover state settles via the toggle event
      }
    }
    // The OddBird popover polyfill moves focus to the first focusable element
    // on showPopover() (native does not). Keep focus in the input.
    const input = anchorElement?.querySelector("input")
    if (input && document.activeElement !== input) {
      input.focus()
    }
  } else {
    showSuggestions = true
  }
}

/**
 * Closes the suggestions popover (or falls back to the flag in jsdom).
 */
function closeSuggestions(): void {
  if (supportsPopover) {
    const popover = suggestionsPopoverRef
    if (popover && isPopoverOpen(popover)) {
      try {
        popover.hidePopover()
      } catch {
        // ignore — popover state settles via the toggle event
      }
    }
  } else {
    showSuggestions = false
  }
}
let highlightedIndex = $state(-1)
let searchTimeout: ReturnType<typeof setTimeout> | undefined = $state()

// Initialize selected items from value prop (only when not registered with form)
$effect(() => {
  if (!fieldApi && value) {
    selectedItems = derivedMultiple ? (Array.isArray(value) ? value : [value]) : value
    inputValue = derivedMultiple ? "" : (Array.isArray(value) ? (value.length > 0 ? getItemLabel(value[0], labelField) : "") : getItemLabel(value, labelField))
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
    closeSuggestions()
  }
}

// Search for suggestions
function search(query: string): void {
  if (filter && typeof filter === "function") {
    suggestions = filter(items, query)
  } else {
    suggestions = items.filter((item: TItem): boolean => {
      const label = getItemLabel(item, labelField).toLowerCase()
      return label.includes(query.toLowerCase())
    })
  }

  suggestions = suggestions.slice(0, maxItems)
  openSuggestions()
  highlightedIndex = -1
}

// Handle item selection
function selectItem(item: TItem): void {
  if (effectiveDisabled) return
  if (derivedMultiple) {
		if (!Array.isArray(selectedItems)) {
			selectedItems = [] as TItem[]
		}

    const value = getItemValue(item, valueField)
    const exists = (selectedItems as TItem[]).some((i) => getItemValue(i, valueField) === value)

    if (!exists) {
      selectedItems = [...(selectedItems as TItem[]), item]
      // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding;
      // module-scope has `this: void`
      onselect?.(new CustomEvent("select", { detail: { items: selectedItems } }))
      fieldApi?.setValue((selectedItems as TItem[]).map((i) => getItemValue(i, valueField)))
    }

    inputValue = ""
  } else {
    selectedItems = item
    inputValue = getItemLabel(item, labelField)
    // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding;
    // module-scope has `this: void`
    onselect?.(new CustomEvent("select", { detail: { item } }))
    fieldApi?.setValue(getItemValue(item, valueField))
  }

  closeSuggestions()
}

// Remove selected item (multiple mode)
function removeItem(item: TItem): void {
  if (effectiveDisabled) return
  if (!derivedMultiple) return
  if (!Array.isArray(selectedItems)) return

  const value = getItemValue(item, valueField)
  selectedItems = (selectedItems as TItem[]).filter((i) => getItemValue(i, valueField) !== value)
  // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding;
  // module-scope has `this: void`
  onremove?.(new CustomEvent("remove", { detail: { item } }))
  // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding;
  // module-scope has `this: void`
  onselect?.(new CustomEvent("select", { detail: { items: selectedItems } }))
  fieldApi?.setValue((selectedItems as TItem[]).map((i) => getItemValue(i, valueField)))
}

/**
 * Handles keydown events for a suggestion option
 */
function handleOptionKeydown(event: KeyboardEvent, item: TItem): void {
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
        // Allow free-form entry only when items are strings (single-select primitive)
        if (typeof items[0] === "string") {
          selectItem(inputValue as TItem)
        }
      }
      break

    case "Escape":
      event.preventDefault()
      closeSuggestions()
      break
  }
}

// Handle focus events
function handleFocus(): void {
  focused = true
  if (inputValue.length >= minLength) {
    openSuggestions()
  }
}

/**
 * Handles input clicks. Clicking the input is an "outside" click to the
 * suggestions popover's light-dismiss, so it closes; reopen it when there's
 * a searchable query so the list stays available for selection.
 */
function handleClick(): void {
  if (effectiveDisabled) return

  if (inputValue.length >= minLength) {
    openSuggestions()
  }
}

function handleBlur(): void {
  focused = false
  // Delay hiding suggestions to allow click events. With native popovers
  // light-dismiss has usually already closed it, so this is a no-op there;
  // it matters for the jsdom fallback path.
  // @ts-ignore: DOM lib types setTimeout with `this: Window` binding;
  // module-scope has `this: void`
  setTimeout(() => {
    if (!focused) {
      closeSuggestions()
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

/**
 * Dispatch on the ItemTemplate shape and produce the HTML string for one
 * suggestion row. Used by the markup below with `{@html ...}` so that
 * consumer-returned HTML is injected (not escaped) into the popover.
 *
 * **Security note:** the HTML returned by `function`-form or `render`-form
 * templates is injected unescaped via `{@html}`, executing any
 * `<script>` tags or attribute-style event handlers (`onerror`,
 * `onload`, ...) interpolated from data-item fields. Callers must
 * sanitize data-item fields before interpolating.
 *
 * When no template is provided, fall back to the highlighted label.
 */
function renderItemTemplate(item: TItem): string {
  if (ItemTemplate === null) {
    return highlightText(getItemLabel(item, labelField), inputValue)
  }
  if (typeof ItemTemplate === "function") {
    return ItemTemplate(item)
  }
  return ItemTemplate.render({ item })
}
</script>

<div
  class="autocomplete {className}"
>
  <div
    class="autocomplete-anchor"
    bind:this={anchorElement}
  >
    <Input
      {label}
      {placeholder}
      disabled={effectiveDisabled}
      value={inputValue}
      oninput={handleInput}
      onfocus={handleFocus}
      onblur={handleBlur}
      onclick={handleClick}
      onkeydown={handleKeydown}
    />
  </div>

  {#if derivedMultiple && Array.isArray(selectedItems) && selectedItems.length > 0}
    <div class="autocomplete-chips" aria-label="Selected items">
      {#each selectedItems as item}
        <div class="autocomplete-chip">
          <span>{getItemLabel(item, labelField)}</span>
          <button
            type="button"
            class="autocomplete-chip-remove"
            onclick={() => removeItem(item)}
            disabled={effectiveDisabled}
            aria-label="Remove {getItemLabel(item, labelField)}"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      {/each}
    </div>
  {/if}

  <div
    class="autocomplete-suggestions"
    popover={supportsPopover ? 'auto' : undefined}
    role={loading || suggestions.length > 0 ? 'listbox' : 'status'}
    bind:this={suggestionsPopoverRef}
  >
    {#if loading}
      <div class="autocomplete-message" role="status">
        {loadingMessage}
      </div>
    {:else if suggestions.length > 0}
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
            {@html renderItemTemplate(item)}
          {:else}
            {@html highlightText(getItemLabel(item, labelField), inputValue)}
          {/if}
        </div>
      {/each}
    {:else}
      <div class="autocomplete-message">
        {emptyMessage}
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .autocomplete {
    @apply relative w-full;
    /* Scope the anchor name to this subtree so multiple autocompletes on a
       page don't all bind to the last `--autocomplete-anchor`. */
    anchor-scope: all;
  }

  /* Anchors the suggestions popover to the input row (not the chips below it). */
  .autocomplete-anchor {
    anchor-name: --autocomplete-anchor;
  }

  /* Suggestions dropdown — a native popover in the top layer, anchored below
     the input and matched to its width with anchor-size(). `inset: auto` +
     `margin: 0` reset the UA popover styles, and flip-block avoids viewport
     overflow. (anchor()/anchor-size() instead of position-area so the OddBird
     anchor-positioning polyfill can handle them too.) */
  .autocomplete-suggestions {
    @apply bg-surface border border-border rounded-md shadow-lg;
    @apply max-h-60 overflow-auto;
    position: fixed;
    inset: auto;
    margin: 0;
    position-anchor: --autocomplete-anchor;
    top: anchor(bottom);
    left: anchor(left);
    width: anchor-size(width);
    position-try-fallbacks: flip-block;
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
