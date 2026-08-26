<!--
@component
Combobox - A component that combines a text input with a dropdown list.
Provides autocomplete functionality with keyboard navigation and accessibility features.

The dropdown is a native `popover="auto"` element (top layer, light-dismiss,
Esc-to-close) positioned with CSS Anchor Positioning (`anchor-name` /
`position-anchor` / `anchor()`), so no JS measures the input width or manages
outside-click/Esc. Load `loadPlatformPolyfills()` in the host app to restore
these behaviors in engines without native support.

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
>
  {#snippet option({ option })}
    <div class="flex items-center">
      <img src={option.flag} alt={option.name} class="w-5 h-5 mr-2" />
      {option.name}
    </div>
  {/snippet}
</Combobox>
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "name", type: "string", description: "Name attribute", optional: true },
  { name: "options", type: "Array", description: "Options to display in the dropdown", default: "[]", optional: true },
  { name: "value", type: "any", description: "Current value", default: "null", optional: true },
  { name: "placeholder", type: "string", description: "Placeholder text", default: "\"Select an option\"", optional: true },
  { name: "optionLabel", type: "string", description: "Property name for option labels", default: "\"label\"", optional: true },
  { name: "optionValue", type: "string", description: "Property name for option values", default: "\"value\"", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the combobox is disabled", default: "false", optional: true },
  { name: "readonly", type: "boolean", description: "Whether the combobox is readonly", default: "false", optional: true },
  { name: "required", type: "boolean", description: "Whether the combobox is required", default: "false", optional: true },
  { name: "searchable", type: "boolean", description: "Whether to allow searching", default: "true", optional: true },
  { name: "clearable", type: "boolean", description: "Whether to allow clearing the selection", default: "true", optional: true },
  { name: "loading", type: "boolean", description: "Whether to show a loading indicator", default: "false", optional: true },
  { name: "autoSelect", type: "boolean", description: "Whether to automatically select the first option", default: "false", optional: true },
  { name: "openOnFocus", type: "boolean", description: "Whether to open the dropdown on focus", default: "true", optional: true },
  { name: "maxHeight", type: "number", description: "Maximum height of the dropdown in pixels", default: "250", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for the combobox", optional: true },
  { name: "filter", type: "Function", description: "Custom filter function", optional: true },
  { name: "optionTemplate", type: "Function", description: "Custom template for options", optional: true },
  { name: "valueTemplate", type: "Function", description: "Custom template for selected value", optional: true },
  { name: "onchange", type: "(event: CustomEvent) => void", description: "Change event handler", optional: true, eventDetail: "unknown" },
  { name: "oninput", type: "(event: CustomEvent) => void", description: "Input event handler", optional: true, eventDetail: "unknown" },
  { name: "option", type: "import(\"svelte\").Snippet<[{ option: unknown }]>", description: "Snippet rendering an option", optional: true },
];
</script>

<script lang="ts">
import { getContext, tick } from "svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"
import { getItemLabel } from "../../helpers/itemLabel.js"
import { getItemValue } from "../../helpers/itemValue.js"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Name attribute */
  name = undefined,

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
  ariaLabel = undefined,

  /** @type {Function} - Custom filter function */
  filter = undefined,

  /** @type {Function} - Custom template for options */
  optionTemplate = undefined,

  /** @type {Function} - Custom template for selected value */
  valueTemplate = undefined,

  /** @type {(event: CustomEvent) => void} - Change event handler */
  onchange = undefined,
  /** @type {(event: CustomEvent) => void} - Input event handler */
  oninput = undefined,

  /** @type {import("svelte").Snippet<[{ option: unknown }]>} - Snippet rendering an option */
  option = undefined,
  ...restProps
} = $props()

// Get form context if available
const formContext = getContext<FormContext | undefined>("form")
let fieldApi: FormFieldApi | undefined

// Register with form if available
$effect(() => {
  if (formContext && name) {
    fieldApi = formContext.registerField(name, value)
  }
})

// Disabled from form context takes precedence over the local prop
const effectiveDisabled = $derived(
  disabled || (fieldApi?.isDisabled() ?? false) || (formContext?.disabled() ?? false)
)

// Component state
let inputElement: HTMLInputElement | undefined = $state()
let dropdownElement: HTMLElement | undefined = $state()
let isOpen = $state(false)
let inputValue = $state("")
let selectedOption: unknown = $state(null)
let highlightedIndex = $state(-1)
let filteredOptions: unknown[] = $state([])

// True when the native Popover API is available (guards showPopover/hidePopover
// in jsdom-based unit tests and engines that only have the polyfill).
let supportsPopover = $state(false)

$effect(() => {
  supportsPopover = typeof dropdownElement?.showPopover === "function"
})

// Update selected option when the value prop changes. The else-branch is
// intentionally omitted: in uncontrolled mode (no `value` prop) the internal
// selection must survive the dropdown closing — wiping it here would erase
// the option the user just clicked (closing the dropdown flips `isOpen`,
// re-running this effect).
$effect(() => {
  if (value !== undefined && value !== null) {
    const opt = findOptionByValue(value)
    selectedOption = opt
    inputValue = opt ? getItemLabel(opt, optionLabel) : ""
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

// The popover element owns its open/close state (light-dismiss, Esc, and the
// toggle button are all handled by the browser). Keep the component's `isOpen`
// in sync via the `toggle` event so aria-expanded and the open styles follow.
$effect(() => {
  const dropdown = dropdownElement
  if (!dropdown || typeof dropdown.addEventListener !== "function") return

  const handleToggle = (event: Event) => {
    const toggleEvent = event as ToggleEvent
    isOpen = toggleEvent.newState === "open"
  }

  dropdown.addEventListener("toggle", handleToggle)
  return () => {
    dropdown.removeEventListener("toggle", handleToggle)
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
 * Finds an option by its value
 * @param {any} value - Value to find
 * @returns {Object|null} - Found option or null
 */
function findOptionByValue(value: unknown): unknown {
  if (value === null || value === undefined) return null

  return options.find((option) => getItemValue(option, optionValue) === value)
}

/**
 * Filters options based on input value
 * @param {string} query - Query to filter by
 * @returns {Array} - Filtered options
 */
function filterOptions(query: string): unknown[] {
  if (!query) return [...options]

  if (filter) {
    return filter(options, query)
  }

  return options.filter((option) => {
    const label = getItemLabel(option, optionLabel).toLowerCase()
    return label.includes(query.toLowerCase())
  })
}

/**
 * Handles input focus — opens the dropdown when configured to do so
 */
function handleFocus(): void {
  if (effectiveDisabled || readonly) return

  if (openOnFocus) {
    openDropdown()
  }
}

/**
 * Handles input clicks. Clicking the input is treated as an "outside" click
 * by the popover's light-dismiss (the `source` option only sets focus order
 * and the implicit anchor — it does not exempt the source), so the dropdown
 * closes. Reopen it so the list stays available for typing/selection.
 */
function handleClick(): void {
  if (effectiveDisabled || readonly) return

  if (openOnFocus) {
    openDropdown()
  }
}

/**
 * Handles input change
 * @param {Event} event - Input event
 */
function handleInput(event: Event): void {
  if (effectiveDisabled || readonly) return

  const target = event.target as HTMLInputElement | null
  if (!target) return
  inputValue = target.value

  // Use the DOM state rather than `isOpen` (which syncs via the async
  // `toggle` event) so typing during a show doesn't re-invoke showPopover.
  if (!dropdownElement || !isPopoverOpen(dropdownElement)) {
    openDropdown()
  }

  // If input is cleared, clear selection
  if (!inputValue && selectedOption) {
    selectedOption = null
    onchange?.(new CustomEvent("change", { detail: { value: null } }))
  }
}

/**
 * Handles keydown events
 * @param {KeyboardEvent} event - Keydown event
 */
async function handleKeydown(event: KeyboardEvent): Promise<void> {
  if (effectiveDisabled || readonly) return

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
        inputValue = selectedOption ? getItemLabel(selectedOption, optionLabel) : ""
      }
      break

    case "Tab":
      if (isOpen) {
        closeDropdown()
        // Reset input value to selected option
        inputValue = selectedOption ? getItemLabel(selectedOption, optionLabel) : ""
      }
      break
  }
}

/**
 * Scrolls to the highlighted option
 */
async function scrollToHighlighted(): Promise<void> {
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
function openDropdown(): void {
  if (effectiveDisabled || readonly) return

  filteredOptions = filterOptions(inputValue)
  highlightedIndex = autoSelect && filteredOptions.length > 0 ? 0 : -1

  if (supportsPopover) {
    if (dropdownElement && !isPopoverOpen(dropdownElement)) {
      // Guarded: showPopover throws if another show/hide is mid-flight
      // (e.g. a click that light-dismissed is still settling). The `toggle`
      // event keeps `isOpen` correct either way.
      try {
        dropdownElement.showPopover({ source: inputElement })
      } catch {
        // ignore — popover state settles via the toggle event
      }
    }
  } else {
    // jsdom fallback: no native popover — flip the flag directly.
    isOpen = true
  }

  // Focus input if not already focused
  if (inputElement && document.activeElement !== inputElement) {
    inputElement.focus()
  }
}

/**
 * Closes the dropdown
 */
function closeDropdown(): void {
  if (supportsPopover) {
    if (dropdownElement && isPopoverOpen(dropdownElement)) {
      try {
        dropdownElement.hidePopover()
      } catch {
        // ignore — popover state settles via the toggle event
      }
    }
  } else {
    isOpen = false
  }
  highlightedIndex = -1
}

/**
 * Selects an option
 * @param {Object|string} option - Option to select
 */
function selectOption(option: unknown): void {
  selectedOption = option
  inputValue = getItemLabel(option, optionLabel)
  closeDropdown()

  const value = getItemValue(option, optionValue)
  onchange?.(new CustomEvent("change", { detail: { value, option } }))
  oninput?.(new CustomEvent("input", { detail: { value, option } }))
}

/**
 * Clears the selection
 * @param {Event} event - Click event
 */
function clearSelection(event: Event): void {
  event.stopPropagation()

  if (effectiveDisabled || readonly) return

  selectedOption = null
  inputValue = ""

  onchange?.(new CustomEvent("change", { detail: { value: null } }))
  oninput?.(new CustomEvent("input", { detail: { value: null } }))

  // Focus input after clearing
  inputElement?.focus()
}
</script>

<div
  class="
    combobox
    {effectiveDisabled ? 'combobox-disabled' : ''}
    {readonly ? 'combobox-readonly' : ''}
    {isOpen ? 'combobox-open' : ''}
    {className}
  "
>
  <div class="combobox-input-container">
    <input
      {...restProps}
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
      disabled={effectiveDisabled}
      {readonly}
      {required}
      onfocus={handleFocus}
      onclick={handleClick}
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

      {#if clearable && selectedOption && !effectiveDisabled && !readonly}
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

      {#if supportsPopover}
        <button
          type="button"
          class="combobox-toggle"
          aria-label={isOpen ? 'Close dropdown' : 'Open dropdown'}
          popovertarget={`${id}-listbox`}
          popovertargetaction="toggle"
          disabled={effectiveDisabled || readonly}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
          </svg>
        </button>
      {:else}
        <button
          type="button"
          class="combobox-toggle"
          aria-label={isOpen ? 'Close dropdown' : 'Open dropdown'}
          onclick={() => { if (isOpen) { closeDropdown() } else { openDropdown() } }}
          disabled={effectiveDisabled || readonly}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
          </svg>
        </button>
      {/if}
    </div>
  </div>

  <div
    id={`${id}-listbox`}
    class="combobox-dropdown"
    popover={supportsPopover ? 'auto' : undefined}
    role="listbox"
    style="max-height: {maxHeight}px;"
    bind:this={dropdownElement}
  >
    {#if filteredOptions.length === 0}
      <div class="combobox-empty">
        No options available
      </div>
    {:else}
      {#each filteredOptions as opt, i}
        <div
          id={`${id}-option-${i}`}
          class="
            combobox-option
            {i === highlightedIndex ? 'combobox-option-highlighted' : ''}
            {selectedOption && getItemValue(selectedOption, optionValue) === getItemValue(opt, optionValue) ? 'combobox-option-selected' : ''}
          "
          role="option"
          tabindex="-1"
          aria-selected={selectedOption !== null && selectedOption !== undefined && getItemValue(selectedOption, optionValue) === getItemValue(opt, optionValue)}
          data-index={i}
          onclick={() => selectOption(opt)}
          onmouseenter={() => highlightedIndex = i}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              selectOption(opt);
            }
          }}
        >
          {#if optionTemplate}
            {@render optionTemplate(opt)}
          {:else if option}
            {@render option?.({ option: opt })}
          {:else}
            {getItemLabel(opt, optionLabel)}
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .combobox {
    @apply relative w-full;
    /* Scope the anchor name to this subtree so multiple comboboxes on a page
       don't all bind to the last `--combobox-anchor` (see MDN anchor scoping). */
    anchor-scope: all;
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
    anchor-name: --combobox-anchor;
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

  /* The dropdown is a native popover. Anchor it below the input and match the
     input's width with anchor-size(); flip above when it would overflow the
     viewport bottom. `inset: auto` + `margin: 0` reset the UA popover styles.
     (anchor()/anchor-size() are used instead of position-area so the OddBird
     anchor-positioning polyfill can handle them too.) */
  .combobox-dropdown {
    @apply overflow-auto;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border;
    @apply rounded-md shadow-lg;
    position: fixed;
    inset: auto;
    margin: 0;
    position-anchor: --combobox-anchor;
    top: anchor(bottom);
    left: anchor(left);
    width: anchor-size(width);
    position-try-fallbacks: flip-block;
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
