<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "name", type: "string", description: "Name attribute for the input", optional: true },
  { name: "options", type: "unknown[]", description: "Options displayed in the dropdown", default: "[]", optional: true },
  { name: "value", type: "unknown", description: "Currently selected value", default: "null", optional: true },
  { name: "placeholder", type: "string", description: "Placeholder text when no option is selected", default: "\"Select an option\"", optional: true },
  { name: "optionLabel", type: "string", description: "Property name used for option labels", default: "\"label\"", optional: true },
  { name: "optionValue", type: "string", description: "Property name used for option values", default: "\"value\"", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the combobox is disabled", default: "false", optional: true },
  { name: "searchable", type: "boolean", description: "Whether to allow filtering options by typing", default: "false", optional: true },
  { name: "clearable", type: "boolean", description: "Whether to show a clear button when a value is selected", default: "false", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for the input", optional: true },
  { name: "onchange", type: "(event: CustomEvent<{ value: unknown; option: unknown }>) => void", description: "Callback fired when the selection changes", optional: true, eventDetail: "{ value: unknown; option: unknown }" },
];
</script>

<script lang="ts">
import type { Snippet } from "svelte"
import { getItemLabel } from "../../helpers/itemLabel.js"
import { getItemValue } from "../../helpers/itemValue.js"

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Name attribute for the input */
  name?: string
  /** Options displayed in the dropdown */
  options?: unknown[]
  /** Currently selected value */
  value?: unknown
  /** Placeholder text when no option is selected */
  placeholder?: string
  /** Property name used for option labels */
  optionLabel?: string
  /** Property name used for option values */
  optionValue?: string
  /** Whether the combobox is disabled */
  disabled?: boolean
  /** Whether to allow filtering options by typing */
  searchable?: boolean
  /** Whether to show a clear button when a value is selected */
  clearable?: boolean
  /** ARIA label for the input */
  ariaLabel?: string
  /** Callback fired when the selection changes */
  onchange?: (event: CustomEvent<{ value: unknown; option: unknown }>) => void
  /** Snippet that renders each option */
  children?: Snippet<[unknown]>
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  name,
  options = [],
  value = null,
  placeholder = "Select an option",
  optionLabel = "label",
  optionValue = "value",
  disabled = false,
  searchable = false,
  clearable = false,
  ariaLabel,
  onchange,
  children,
}: Props = $props()

let isOpen = $state(false)
let searchValue = $state("")
let highlightedIndex = $state(-1)
let selectedValue: unknown = $state(null)
let inputElement: HTMLInputElement | undefined = $state()

$effect(() => {
  selectedValue = value
})

const filteredOptions = $derived.by(() => {
  if (!searchable || !searchValue) {
    return options
  }
  return options.filter((option) =>
    getItemLabel(option, optionLabel).toLowerCase().includes(searchValue.toLowerCase())
  )
})

const handleInputFocus = (): void => {
  isOpen = true
}

const handleInputBlur = (e: FocusEvent): void => {
  const target = e.relatedTarget as HTMLElement | null
  if (!target?.closest(".combobox-dropdown")) {
    isOpen = false
  }
}

const handleInputChange = (e: Event): void => {
  if (searchable) {
    const target = e.target as HTMLInputElement | null
    if (target) {
      searchValue = target.value
    }
  }
}

const handleOptionClick = (option: unknown): void => {
  const newValue = getItemValue(option, optionValue)
  selectedValue = newValue
  isOpen = false
  searchValue = ""
  onchange?.(new CustomEvent("change", { detail: { value: newValue, option } }))
}

const handleClear = (e: MouseEvent): void => {
  e.stopPropagation()
  selectedValue = null
  searchValue = ""
  onchange?.(new CustomEvent("change", { detail: { value: null, option: null } }))
  inputElement?.focus()
}

const handleKeydown = (e: KeyboardEvent): void => {
  if (!isOpen) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      isOpen = true
    }
    return
  }

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault()
      highlightedIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1)
      break
    case "ArrowUp":
      e.preventDefault()
      highlightedIndex = Math.max(highlightedIndex - 1, -1)
      break
    case "Enter":
      e.preventDefault()
      if (highlightedIndex >= 0) {
        const option = filteredOptions[highlightedIndex]
        if (option !== undefined) {
          handleOptionClick(option)
        }
      }
      break
    case "Escape":
      e.preventDefault()
      isOpen = false
      break
  }
}

const selectedLabel = $derived.by(() => {
  if (selectedValue === null || selectedValue === undefined) {
    return placeholder
  }
  const selected = options.find((opt) => getItemValue(opt, optionValue) === selectedValue)
  return selected ? getItemLabel(selected, optionLabel) : placeholder
})

/** Stable id for the listbox dropdown; referenced by aria-controls and the dropdown's own id. */
const listboxId = $derived(`${id}-listbox`)
</script>

<style lang="postcss">
  @reference '../../twintrinsic.css';

  .combobox-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .combobox-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 0.375rem;
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 1rem;
    transition: all 0.2s ease;
  }

  .combobox-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .combobox-input:disabled {
    background-color: var(--color-disabled);
    cursor: not-allowed;
    opacity: 0.5;
  }

  .combobox-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .combobox-clear {
    position: absolute;
    right: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    color: var(--color-text-secondary);
    transition: color 0.2s ease;
  }

  .combobox-clear:hover {
    color: var(--color-text);
  }

  .combobox-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.25rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-height: 300px;
    overflow-y: auto;
    z-index: 10;
  }

  .combobox-option {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .combobox-option:hover,
  .combobox-option.highlighted {
    background-color: var(--color-hover);
  }

  .combobox-option.selected {
    background-color: var(--color-primary);
    color: white;
  }

  .combobox-empty {
    padding: 1rem;
    text-align: center;
    color: var(--color-text-secondary);
  }
</style>

<div class="combobox-wrapper {className}" {id}>
  <div class="combobox-input-wrapper">
    <input
      bind:this={inputElement}
      type="text"
      class="combobox-input"
      {placeholder}
      {disabled}
      value={searchable ? searchValue : selectedLabel}
  onfocus={handleInputFocus}
  onblur={handleInputBlur}
  onchange={handleInputChange}
  onkeydown={handleKeydown}
      aria-label={ariaLabel}
      aria-haspopup="listbox"
      aria-controls={listboxId}
      aria-expanded={isOpen}
      role="combobox"
      {name}
    />
    {#if clearable && value !== null && value !== undefined}
      <button
        class="combobox-clear"
        onclick={handleClear}
        aria-label="Clear selection"
        tabindex="-1"
      >
        ✕
      </button>
    {/if}
  </div>

  {#if isOpen && filteredOptions.length > 0}
    <div class="combobox-dropdown" role="listbox" id={listboxId}>
      {#each filteredOptions as option, index}
        <div
          class="combobox-option"
          class:highlighted={index === highlightedIndex}
          class:selected={getItemValue(option, optionValue) === value}
          onclick={() => handleOptionClick(option)}
          onkeydown={(e) => {
            if (e.key === "Enter") {
              handleOptionClick(option)
            }
          }}
          role="option"
          aria-selected={getItemValue(option, optionValue) === value}
          tabindex="-1"
        >
          {#if children}
            {@render children(option)}
          {:else}
            {getItemLabel(option, optionLabel)}
          {/if}
        </div>
      {/each}
    </div>
  {:else if isOpen}
    <div class="combobox-dropdown" id={listboxId}>
      <div class="combobox-empty">No options available</div>
    </div>
  {/if}
</div>
