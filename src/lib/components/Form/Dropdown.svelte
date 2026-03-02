<!--
@component
Dropdown - A wrapper around Select for backward compatibility.
All functionality is now in Select. Use Select directly for new code.

This component is deprecated. Use Select instead:
```svelte
<Select 
  options={countries} 
  placeholder="Select a country" 
/>
```
-->
<script lang="ts">
import Select from "./Select.svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id,

  /** @type {string} - Input name */
  name,

  /** @type {Array} - Options to display */
  options = [],

  /** @type {any} - Selected value(s) */
  value,

  /** @type {string} - Placeholder text */
  placeholder = "Select an option",

  /** @type {boolean} - Whether multiple selection is allowed */
  multiple = false,

  /** @type {string} - Property name for option label */
  optionLabel = "label",

  /** @type {string} - Property name for option value */
  optionValue = "value",

  /** @type {string} - Property name for option icon */
  optionIcon,

  /** @type {string} - Property name for option children (for cascading) */
  optionChildren = "items",

  /** @type {boolean} - Whether the dropdown is disabled */
  disabled = false,

  /** @type {boolean} - Whether the dropdown is required */
  required = false,

  /** @type {boolean} - Whether to filter options by typing */
  filter = false,

  /** @type {string} - Size of the dropdown (sm, md, lg) */
  size = "md",

  /** @type {boolean} - Whether to show a clear button */
  clearable = false,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel,

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
</script>

<Select
  {id}
  label={ariaLabel || name}
  {options}
  {value}
  {placeholder}
  {multiple}
  {optionLabel}
  {optionValue}
  {optionChildren}
  {disabled}
  required={required || false}
  {filter}
  {size}
  {clearable}
  class={className}
  {onchange}
  {onclear}
  {onopen}
  {onclose}
  {onfilter}
/>
