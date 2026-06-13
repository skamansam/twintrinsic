<script lang="ts">
import type { Snippet } from "svelte"

interface Props {
  class?: string
  id?: string
  name?: string
  options?: unknown[]
  value?: unknown
  placeholder?: string
  optionLabel?: string
  optionValue?: string
  disabled?: boolean
  searchable?: boolean
  clearable?: boolean
  ariaLabel?: string
  onchange?: (event: CustomEvent<{ value: unknown; option: unknown }>) => void
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

const getOptionLabel = (option: unknown): string => {
  if (typeof option === "object" && option !== null) {
    return ((option as Record<string, unknown>)[optionLabel]?.toString() || "")
  }
  return option?.toString() || ""
}

const getOptionValue = (option: unknown): unknown => {
  if (typeof option === "object" && option !== null) {
    return (option as Record<string, unknown>)[optionValue]
  }
  return option
}

const filteredOptions = $derived.by(() => {
  if (!searchable || !searchValue) {
    return options
  }
  return options.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(searchValue.toLowerCase())
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
  const newValue = getOptionValue(option)
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
  const selected = options.find((opt) => getOptionValue(opt) === selectedValue)
  return selected ? getOptionLabel(selected) : placeholder
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
          class:selected={getOptionValue(option) === value}
          onclick={() => handleOptionClick(option)}
          onkeydown={(e) => {
            if (e.key === "Enter") {
              handleOptionClick(option)
            }
          }}
          role="option"
          aria-selected={getOptionValue(option) === value}
          tabindex="-1"
        >
          {#if children}
            {@render children(option)}
          {:else}
            {getOptionLabel(option)}
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
