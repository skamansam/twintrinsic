<!--
@component
RadioGroup - A component for grouping related radio buttons.
Provides consistent styling, accessibility features, and integration with the Form component.

Usage:
```svelte
<RadioGroup 
  name="theme" 
  value="light"
  legend="Select theme"
>
  <Radio value="light" label="Light" />
  <Radio value="dark" label="Dark" />
  <Radio value="system" label="System" />
</RadioGroup>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "name", type: "string", description: "Name attribute", optional: true },
  { name: "value", type: "string", description: "Currently selected value", default: "\"\"", optional: true },
  { name: "legend", type: "string", description: "Legend text for the fieldset", optional: true },
  { name: "required", type: "boolean", description: "Whether the radio group is required", default: "false", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the radio group is disabled", default: "false", optional: true },
  { name: "layout", type: "\"horizontal\" | \"vertical\"", description: "Layout direction (horizontal or vertical)", default: "\"vertical\"", optional: true },
  { name: "size", type: "\"sm\" | \"md\" | \"lg\"", description: "Size of the radio buttons (sm, md, lg)", default: "\"md\"", optional: true },
  { name: "onchange", type: "(event: CustomEvent<{ value: string }>) => void", description: "Change event handler", optional: true, eventDetail: "{ value: string }" },
];
</script>

<script lang="ts">

import type { Snippet } from "svelte"
import { getContext, setContext } from "svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Name attribute */
  name?: string
  /** Currently selected value */
  value?: string
  /** Legend text for the fieldset */
  legend?: string
  /** Whether the radio group is required */
  required?: boolean
  /** Whether the radio group is disabled */
  disabled?: boolean
  /** Layout direction (horizontal or vertical) */
  layout?: "horizontal" | "vertical"
  /** Size of the radio buttons (sm, md, lg) */
  size?: "sm" | "md" | "lg"
  /** Change event handler */
  onchange?: (event: CustomEvent<{ value: string }>) => void
  /** Radio children */
  children?: Snippet
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  name,
  value = "",
  legend,
  required = false,
  disabled = false,
  layout = "vertical",
  size = "md",
  onchange,
  children,
}: Props = $props()

// Get form context if available
const formContext = getContext<FormContext | undefined>("form")

// Derived values for reactive prop access in closures
const derivedValue = $derived(value)
const derivedName = $derived(name)

// Radio group state
let selectedValue = $state("")

// Update selected value when prop changes
$effect(() => {
  selectedValue = derivedValue
})

// Register with form if available
let fieldApi: FormFieldApi | undefined

$effect(() => {
  if (formContext && derivedName) {
    fieldApi = formContext.registerField(derivedName, derivedValue)
  }
})

// Update value when form field changes
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue()
    if (formValue === null || formValue === undefined) return
    if (typeof formValue !== "string") return
    if (formValue !== selectedValue) {
      selectedValue = formValue
    }
  }
})

// Disabled from form context takes precedence over the local prop
// (fieldApi.isDisabled is a superset of formContext.disabled — check it first)
const effectiveDisabled = $derived(
  disabled || (fieldApi?.isDisabled() ?? false) || (formContext?.disabled() ?? false)
)

/**
 * Handles radio selection
 * @param {CustomEvent} event - Change event from Radio component
 */
function handleRadioChange(event: CustomEvent): void {
  const { value: radioValue } = event.detail
  selectedValue = radioValue

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(radioValue)
  }

  // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding;
  // module-scope has `this: void`
  onchange?.(new CustomEvent("change", { detail: { value: radioValue } }))
}

// Provide context for child Radio components. Called at init (not in `$effect`)
// so the context is available during server-side rendering.
setContext("radioGroup", {
  get name() {
    return name
  },
  selectedValue: () => selectedValue,
  get required() {
    return required
  },
  disabled: () => effectiveDisabled,
  get size() {
    return size
  },
  onChange: handleRadioChange,
})
</script>

<fieldset
  {id}
  class="radio-group {layout === 'horizontal' ? 'radio-group-horizontal' : 'radio-group-vertical'} {className}"
  disabled={effectiveDisabled}
>
  {#if legend}
    <legend class="radio-group-legend">{legend}</legend>
  {/if}
  
  <div class="radio-group-items">
    {@render children?.()}
  </div>
</fieldset>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .radio-group {
    @apply border-0 p-0 m-0;
  }
  
  .radio-group-legend {
    @apply text-sm font-medium text-text dark:text-text mb-2;
  }
  
  .radio-group-items {
    @apply flex;
  }
  
  .radio-group-vertical .radio-group-items {
    @apply flex-col gap-2;
  }
  
  .radio-group-horizontal .radio-group-items {
    @apply flex-row flex-wrap gap-4;
  }
  
  .radio-group[disabled] {
    @apply opacity-50 cursor-not-allowed;
  }
</style>
