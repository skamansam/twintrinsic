<!--
@component
Select - A native HTML select component for selecting options from a dropdown list.
Supports single and multiple selection with optgroup for nested options.

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
interface SelectOption {
  label: string
  value: string
  children?: SelectOption[],
  selected?: boolean
}

interface SelectProps {
  /** Input label */
  label?: string
  /** Options to display */
  options?: SelectOption[]
  /** Selected value(s) */
  value?: string | string[] | undefined
  /** Whether multiple selection is allowed */
  multiple?: boolean
  /** Placeholder text */
  placeholder?: string
  /** Whether the select is disabled */
  disabled?: boolean
  /** Error message */
  error?: string
  /** Whether the field is required */
  required?: boolean
  /** Additional CSS classes */
  class?: string
  /** Property name for option label */
  optionLabel?: string
  /** Property name for option value */
  optionValue?: string
  /** Property name for option children (for optgroup) */
  optionChildren?: string
  /** Change event handler */
  onchange?: (event: CustomEvent<{ value: string | string[] | undefined }>) => void
}

const {
  label = "",
  options = [],
  value,
  multiple = false,
  placeholder = "Select...",
  disabled = false,
  error = "",
  required = false,
  class: className = "",
  optionLabel = "label",
  optionValue = "value",
  optionChildren = "items",
  onchange,
}: SelectProps = $props()

// Component state
let selectElement: HTMLSelectElement | undefined = $state()
let selectedValue: string | string[] | undefined = $state(value)

// Sync selected value with prop
$effect(() => {
  selectedValue = value
})

// Handle change event
function handleChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  selectedValue = multiple ? Array.from(target.selectedOptions, (o) => o.value) : target.value
  onchange?.(new CustomEvent("change", { detail: { value: selectedValue } }))
}

/**
 * Gets the option label
 */
function getOptionLabel(option: unknown): string {
  if (!option) return ""
  if (typeof option === "object") {
    return String((option as Record<string, unknown>)[optionLabel] || "")
  }
  return option.toString()
}

/**
 * Gets the option value
 */
function getOptionValue(option: unknown): string {
  if (!option) return ""
  if (typeof option === "object") {
    const val = (option as Record<string, unknown>)[optionValue]
    return String(val || "")
  }
  return String(option)
}

/**
 * Gets the option children (for optgroup)
 */
function getOptionChildren(option: unknown): unknown[] | null {
  if (!option || typeof option !== "object") return null
  const children = (option as Record<string, unknown>)[optionChildren]
  return Array.isArray(children) ? children : null
}
</script>

<div class="select-wrapper {className}" class:select-error={!!error}>
  <label class="select-label">
    {#if label}
      <span class="select-label-text">
        {label}
        {#if required}
          <span class="select-required" aria-hidden="true">*</span>
        {/if}
      </span>
    {/if}
    
    {#if multiple}
      <select
        bind:this={selectElement}
        bind:value={selectedValue}
        onchange={handleChange}
        multiple
        {disabled}
        {required}
        aria-invalid={!!error}
        aria-describedby={error ? 'select-error' : undefined}
        class="select-input"
      >
        {#each options as option}
          {@const children = getOptionChildren(option)}
          
          {#if children && children.length > 0}
            <optgroup label={getOptionLabel(option)}>
              {#each children as child}
                <option value={getOptionValue(child)}>
                  {getOptionLabel(child)}
                </option>
              {/each}
            </optgroup>
          {:else}
            <option value={getOptionValue(option)}>
              {getOptionLabel(option)}
            </option>
          {/if}
        {/each}
      </select>
    {:else}
      <select
        bind:this={selectElement}
        bind:value={selectedValue}
        onchange={handleChange}
        {disabled}
        {required}
        aria-invalid={!!error}
        aria-describedby={error ? 'select-error' : undefined}
        class="select-input"
      >
        {#if !selectedValue}
          <option value="">{placeholder}</option>
        {/if}
        
        {#each options as option}
          {@const children = getOptionChildren(option)}
          
          {#if children}
            <optgroup label={getOptionLabel(option)}>
              {#each children as child}
                <option value={getOptionValue(child)}>
                  {getOptionLabel(child)}
                </option>
              {/each}
            </optgroup>
          {:else}
            <option value={getOptionValue(option)}>
              {getOptionLabel(option)}
            </option>
          {/if}
        {/each}
      </select>
    {/if}
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
</div>

<style lang="postcss">
  @reference '../../twintrinsic.css';

  .select-wrapper {
    @apply w-full;
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

  .select-input {
    @apply w-full px-3 py-2 rounded-md;
    @apply bg-background dark:bg-background;
    @apply border border-border dark:border-border;
    @apply text-text dark:text-text;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply focus:border-primary-500 dark:focus:border-primary-400;
    @apply transition-colors duration-200;
    @apply cursor-pointer;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .select-error .select-input {
    @apply border-error;
  }

  .select-error-text {
    @apply mt-1 text-sm text-error;
  }
</style>
