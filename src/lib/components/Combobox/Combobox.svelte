<script lang="ts">
import { createEventDispatcher } from "svelte"

const {
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
  children,
} = $props()

const dispatch = createEventDispatcher()

let isOpen = $state(false)
let searchValue = $state("")
let highlightedIndex = $state(-1)
let selectedValue = $state(value)
let inputElement

$effect(() => {
  selectedValue = value
})

const getOptionLabel = (option) => {
  if (typeof option === "object" && option !== null) {
    return option[optionLabel]
  }
  return option
}

const getOptionValue = (option) => {
  if (typeof option === "object" && option !== null) {
    return option[optionValue]
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

const handleInputFocus = () => {
  isOpen = true
}

const handleInputBlur = (e) => {
  if (!e.relatedTarget?.closest(".combobox-dropdown")) {
    isOpen = false
  }
}

const handleInputChange = (e) => {
  if (searchable) {
    searchValue = e.target.value
  }
}

const handleOptionClick = (option) => {
  const newValue = getOptionValue(option)
  selectedValue = newValue
  isOpen = false
  searchValue = ""
  dispatch("change", { value: newValue, option })
}

const handleClear = (e) => {
  e.stopPropagation()
  selectedValue = null
  searchValue = ""
  dispatch("change", { value: null, option: null })
  inputElement?.focus()
}

const handleKeydown = (e) => {
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
        handleOptionClick(filteredOptions[highlightedIndex])
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
</script>

<style>
  @reference '$lib/twintrinsic.css';

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
      on:focus={handleInputFocus}
      on:blur={handleInputBlur}
      on:change={handleInputChange}
      on:keydown={handleKeydown}
      aria-label={ariaLabel}
      aria-description={ariaDescription}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      {name}
    />
    {#if clearable && value !== null && value !== undefined}
      <button
        class="combobox-clear"
        on:click={handleClear}
        aria-label="Clear selection"
        tabindex="-1"
      >
        ✕
      </button>
    {/if}
  </div>

  {#if isOpen && filteredOptions.length > 0}
    <div class="combobox-dropdown" bind:this={dropdownElement} role="listbox">
      {#each filteredOptions as option, index}
        <div
          class="combobox-option"
          class:highlighted={index === highlightedIndex}
          class:selected={getOptionValue(option) === value}
          on:click={() => handleOptionClick(option)}
          on:keydown={(e) => {
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
    <div class="combobox-dropdown">
      <div class="combobox-empty">No options available</div>
    </div>
  {/if}
</div>
