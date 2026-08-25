<!--
@component
Select - A native HTML select component for selecting options from a dropdown list.
Supports single and multiple selection with optgroup for nested options.

Uses `appearance: base-select` (Chrome 135+) for customizable styling with a
styled picker, arrow icon, and option checkmarks. Falls back to the standard
OS dropdown in browsers without support.

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
<script module lang="ts">
export const propsMetadata = [
  { name: "label", type: "string", description: "Label text", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "name", type: "string", description: "Name attribute", optional: true },
  { name: "options", type: "SelectOption[]", description: "Options to display", default: "[]", optional: true },
  { name: "value", type: "string | string[] | undefined", description: "Selected value(s)", default: "$bindable()", optional: true },
  { name: "multiple", type: "boolean", description: "Whether multiple selection is allowed", default: "false", optional: true },
  { name: "placeholder", type: "string", description: "Placeholder text", default: "\"Select...\"", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the select is disabled", default: "false", optional: true },
  { name: "error", type: "string", description: "Error message", default: "\"\"", optional: true },
  { name: "required", type: "boolean", description: "Whether the field is required", default: "false", optional: true },
  { name: "optionChildren", type: "string", description: "Property name for option children (for cascading)", optional: true },
  { name: "filter", type: "boolean", description: "Whether to filter options by typing", default: "false", optional: true },
  { name: "size", type: "\"sm\" | \"md\" | \"lg\"", description: "Size of the dropdown (sm, md, lg)", default: "\"md\"", optional: true },
  { name: "clearable", type: "boolean", description: "Whether to show a clear button", default: "false", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for accessibility", optional: true },
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "onchange", type: "(event: CustomEvent<{ value: string | string[] | undefined }>) => void", description: "Change event handler", optional: true, eventDetail: "{ value: string | string[] | undefined }" },
  { name: "onclear", type: "(event: CustomEvent<void>) => void", description: "Clear event handler", optional: true, eventDetail: "void" },
  { name: "onopen", type: "(event: CustomEvent<void>) => void", description: "Open event handler", optional: true, eventDetail: "void" },
  { name: "onclose", type: "(event: CustomEvent<void>) => void", description: "Close event handler", optional: true, eventDetail: "void" },
  { name: "onfilter", type: "(event: CustomEvent<{ query: string }>) => void", description: "Filter event handler", optional: true, eventDetail: "{ query: string }" },
];
</script>

<script lang="ts">
interface SelectOption {
  label: string
  value: string
  children?: SelectOption[],
  selected?: boolean
}

interface SelectProps {
  /** Label text */
  label?: string
  /** HTML id for accessibility */
  id?: string
  /** Name attribute */
  name?: string
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
  /** Property name for option children (for cascading) */
  optionChildren?: string
  /** Whether to filter options by typing */
  filter?: boolean
  /** Size of the dropdown (sm, md, lg) */
  size?: "sm" | "md" | "lg"
  /** Whether to show a clear button */
  clearable?: boolean
  /** ARIA label for accessibility */
  ariaLabel?: string
  /** Additional CSS classes */
  class?: string
  /** Change event handler */
  onchange?: (event: CustomEvent<{ value: string | string[] | undefined }>) => void
  /** Clear event handler */
  onclear?: (event: CustomEvent<void>) => void
  /** Open event handler */
  onopen?: (event: CustomEvent<void>) => void
  /** Close event handler */
  onclose?: (event: CustomEvent<void>) => void
  /** Filter event handler */
  onfilter?: (event: CustomEvent<{ query: string }>) => void
  /** Custom option children (e.g. `<SelectGroup>`/`<option>` snippets) */
  children?: import("svelte").Snippet
}

import { getContext } from "svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"

let {
  label = "",
  id = crypto.randomUUID(),
  name = undefined,
  options = [],
  value = $bindable(),
  multiple = false,
  placeholder = "Select...",
  disabled = false,
  error = "",
  required = false,
  optionChildren = undefined,
  filter = false,
  size = "md",
  clearable = false,
  ariaLabel = undefined,
  class: className = "",
  onchange = undefined,
  onclear = undefined,
  onopen = undefined,
  onclose = undefined,
  onfilter = undefined,
  children = undefined,
}: SelectProps = $props()

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
let selectElement: HTMLSelectElement | undefined = $state()
let selectedValue: string | string[] | undefined = $state()

// Sync selected value with prop
$effect(() => {
  selectedValue = value
})

// I would expect svelte to do this, but it doesn't. See https://github.com/sveltejs/svelte/issues/1270
$effect(() => {
  if (multiple) {
    selectElement && selectElement.setAttribute('multiple', '');
  } else {
    selectElement && selectElement.removeAttribute('multiple');
  }
})

// Handle change event
function handleChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  selectedValue = multiple ? Array.from(target.selectedOptions, (o) => o.value) : target.value
  // `value` is `$bindable()`: assign back so the parent's `bind:value`
  // updates on user interaction (writing the prop is also what keeps the
  // internal `selectedValue` in sync via the effect above).
  value = selectedValue
  onchange?.(new CustomEvent("change", { detail: { value: selectedValue } }))
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
    
    <select
      {id}
      bind:this={selectElement}
      bind:value={selectedValue}
      onchange={handleChange}
      disabled={effectiveDisabled}
      {required}
      aria-invalid={!!error}
      aria-describedby={error ? 'select-error' : undefined}
      class="select-input"
    >
      {#if children}
        {@render children?.()}
      {:else}
        {#if !selectedValue && !multiple}
          <option value="">{placeholder}</option>
        {/if}
        
        {#each options as option}          
          {#if option.children}
            <optgroup label={option.label}>
              {#each option.children as child}
                <option value={child.value}>
                  {child.label}
                </option>
              {/each}
            </optgroup>
          {:else}
            <option value={option.value}>
              {option.label}
            </option>
          {/if}
        {/each}
      {/if}
    </select>
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

  /*
   * Customizable <select> (appearance: base-select) — progressive enhancement
   * for Chrome 135+ and Edge 135+. Browsers without support show the
   * standard OS dropdown.
   */
  .select-input,
  .select-input::picker(select) {
    appearance: base-select;
  }

  /* Picker dropdown */
  .select-input::picker(select) {
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 0.25rem;
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    width: anchor-size(width);
  }

  /* Options */
  .select-input option {
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 100ms ease;
  }

  .select-input option:hover {
    background: var(--color-primary-50);
  }

  .select-input option:checked {
    background: var(--color-primary-500);
    color: white;
  }

  /* Checkmark indicator */
  .select-input option::checkmark {
    margin-inline-start: 0.5rem;
  }

  /* Arrow icon */
  .select-input::picker-icon {
    @apply text-text;
  }
</style>
