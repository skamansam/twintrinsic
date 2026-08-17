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
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", optional: true },
  { name: "name", type: "string", description: "Input name", optional: true },
  { name: "options", type: "Array", description: "Options to display", default: "[]", optional: true },
  { name: "value", type: "any", description: "Selected value(s)", optional: true },
  { name: "placeholder", type: "string", description: "Placeholder text", default: "\"Select an option\"", optional: true },
  { name: "multiple", type: "boolean", description: "Whether multiple selection is allowed", default: "false", optional: true },
  { name: "optionChildren", type: "string", description: "Property name for option children (for cascading)", default: "\"items\"", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the dropdown is disabled", default: "false", optional: true },
  { name: "required", type: "boolean", description: "Whether the dropdown is required", default: "false", optional: true },
  { name: "filter", type: "boolean", description: "Whether to filter options by typing", default: "false", optional: true },
  { name: "size", type: "\"sm\" | \"md\" | \"lg\"", description: "Size of the dropdown (sm, md, lg)", default: "\"md\" as const", optional: true },
  { name: "clearable", type: "boolean", description: "Whether to show a clear button", default: "false", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for accessibility", optional: true },
  { name: "onchange", type: "(event: CustomEvent) => void", description: "Change event handler", optional: true, eventDetail: "unknown" },
  { name: "onclear", type: "(event: CustomEvent) => void", description: "Clear event handler", optional: true, eventDetail: "unknown" },
  { name: "onopen", type: "(event: CustomEvent) => void", description: "Open event handler", optional: true, eventDetail: "unknown" },
  { name: "onclose", type: "(event: CustomEvent) => void", description: "Close event handler", optional: true, eventDetail: "unknown" },
  { name: "onfilter", type: "(event: CustomEvent) => void", description: "Filter event handler", optional: true, eventDetail: "unknown" },
];
</script>

<script lang="ts">
import Select from "./Select.svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = undefined,

  /** @type {string} - Input name */
  name = undefined,

  /** @type {Array} - Options to display */
  options = [],

  /** @type {any} - Selected value(s) */
  value = undefined,

  /** @type {string} - Placeholder text */
  placeholder = "Select an option",

  /** @type {boolean} - Whether multiple selection is allowed */
  multiple = false,

  /** @type {string} - Property name for option children (for cascading) */
  optionChildren = "items",

  /** @type {boolean} - Whether the dropdown is disabled */
  disabled = false,

  /** @type {boolean} - Whether the dropdown is required */
  required = false,

  /** @type {boolean} - Whether to filter options by typing */
  filter = false,

  /** @type {"sm" | "md" | "lg"} - Size of the dropdown (sm, md, lg) */
  size = "md" as const,

  /** @type {boolean} - Whether to show a clear button */
  clearable = false,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel = undefined,

  /** @type {(event: CustomEvent) => void} - Change event handler */
  onchange = undefined,
  /** @type {(event: CustomEvent) => void} - Clear event handler */
  onclear = undefined,
  /** @type {(event: CustomEvent) => void} - Open event handler */
  onopen = undefined,
  /** @type {(event: CustomEvent) => void} - Close event handler */
  onclose = undefined,
  /** @type {(event: CustomEvent) => void} - Filter event handler */
  onfilter = undefined,
} = $props()

// Normalize string options (e.g. `["Apple", "Banana"]`) into the
// `{ label, value }` shape Select expects, preserving the legacy Dropdown API
// where a plain string array is the common usage.
const normalizedOptions = $derived(
  options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option
  )
)
</script>

<Select
  {id}
  label={ariaLabel || name}
  options={normalizedOptions}
  {value}
  {placeholder}
  {multiple}
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
