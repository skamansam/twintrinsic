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
<script>
import { getContext, createEventDispatcher, setContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Radio group name */
  name,

  /** @type {string} - Currently selected value */
  value = "",

  /** @type {string} - Legend text for the fieldset */
  legend,

  /** @type {boolean} - Whether the radio group is required */
  required = false,

  /** @type {boolean} - Whether the radio group is disabled */
  disabled = false,

  /** @type {string} - Layout direction (horizontal or vertical) */
  layout = "vertical",

  /** @type {string} - Size of the radio buttons (sm, md, lg) */
  size = "md",

  children,
} = $props()

const dispatch = createEventDispatcher()

// Get form context if available
const formContext = getContext("form")

// Radio group state
let selectedValue = $state(value)

// Update selected value when prop changes
$effect(() => {
  selectedValue = value
})

// Register with form if available
let fieldApi = $state()

$effect(() => {
  if (formContext && name) {
    fieldApi = formContext.registerField(name, value)
  }
})

// Update value when form field changes
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue()
    if (formValue !== undefined && formValue !== selectedValue) {
      selectedValue = formValue
    }
  }
})

/**
 * Handles radio selection
 * @param {CustomEvent} event - Change event from Radio component
 */
function handleRadioChange(event) {
  const { value: radioValue } = event.detail
  selectedValue = radioValue

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(radioValue)
  }

  dispatch("change", { value: radioValue })
}

// Provide context for child Radio components
$effect(() => {
  setContext("radioGroup", {
    name,
    selectedValue: () => selectedValue,
    required,
    disabled: () => disabled || (fieldApi && fieldApi.isDisabled()),
    size,
    onChange: handleRadioChange,
  })
})
</script>

<fieldset
  {id}
  class="radio-group {layout === 'horizontal' ? 'radio-group-horizontal' : 'radio-group-vertical'} {className}"
  {disabled}
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
