<!--
@component
Slider - A component for selecting values from a range.
Uses native HTML input[type="range"] with consistent styling and accessibility.

Usage:
```svelte
<Slider value={50} min={0} max={100} />

<Slider 
  value={75} 
  min={0} 
  max={100} 
  step={5}
  showValue
  onchange={(e) => console.log(e.detail.value)}
/>

<Slider
  value={25}
  min={0}
  max={100}
  disabled={false}
  variant="primary"
/>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "value", type: "number", description: "Current value", default: "0", optional: true },
  { name: "min", type: "number", description: "Minimum value", default: "0", optional: true },
  { name: "max", type: "number", description: "Maximum value", default: "100", optional: true },
  { name: "step", type: "number", description: "Step size", default: "1", optional: true },
  { name: "variant", type: "string", description: "Visual style variant", default: "\"primary\"", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the slider is disabled", default: "false", optional: true },
  { name: "showValue", type: "boolean", description: "Whether to show the current value", default: "false", optional: true },
  { name: "valueFormat", type: "string", description: "Format for displayed value", default: "\"{value}\"", optional: true },
  { name: "name", type: "string", description: "Name attribute for form submission", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for accessibility", optional: true },
  { name: "showTicks", type: "boolean", description: "Whether to show tick marks", default: "false", optional: true },
  { name: "tickValues", type: "number[]", description: "Custom tick values", default: "[]", optional: true },
  { name: "showTooltip", type: "boolean", description: "Whether to show tooltips on hover/drag", default: "false", optional: true },
  { name: "orientation", type: "string", description: "Orientation (horizontal, vertical)", default: "\"horizontal\"", optional: true },
  { name: "onchange", type: "(event: CustomEvent) => void", description: "Change event handler", optional: true, eventDetail: "unknown" },
  { name: "oninput", type: "(event: CustomEvent) => void", description: "Input event handler", optional: true, eventDetail: "unknown" },
];
</script>

<script lang="ts">
import { getContext } from "svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {number} - Current value */
  value = 0,

  /** @type {number} - Minimum value */
  min = 0,

  /** @type {number} - Maximum value */
  max = 100,

  /** @type {number} - Step size */
  step = 1,

  /** @type {string} - Visual style variant */
  variant = "primary",

  /** @type {boolean} - Whether the slider is disabled */
  disabled = false,

  /** @type {boolean} - Whether to show the current value */
  showValue = false,

  /** @type {string} - Format for displayed value */
  valueFormat = "{value}",

  /** @type {string} - Name attribute for form submission */
  name = undefined,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel = undefined,

  /** @type {boolean} - Whether to show tick marks */
  showTicks = false,

  /** @type {number[]} - Custom tick values */
  tickValues = [],

  /** @type {boolean} - Whether to show tooltips on hover/drag */
  showTooltip = false,

  /** @type {string} - Orientation (horizontal, vertical) */
  orientation = "horizontal",

  /** @type {(event: CustomEvent) => void} - Change event handler */
  onchange = undefined,
  /** @type {(event: CustomEvent) => void} - Input event handler */
  oninput = undefined,
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

let inputElement: HTMLInputElement | undefined = $state()

const formattedValue = $derived(valueFormat.replace("{value}", String(value)))

const variantClasses = $derived(
  {
    default: "slider-default",
    primary: "slider-primary",
    secondary: "slider-secondary",
    success: "slider-success",
    warning: "slider-warning",
    error: "slider-error",
    info: "slider-info",
  }[variant] || "slider-primary"
)

function handleChange(e: Event): void {
  const target = e.target as HTMLInputElement
  const newValue = Number(target.value)
  onchange?.(new CustomEvent("change", { detail: { value: newValue } }))
}

function handleInput(e: Event): void {
  const target = e.target as HTMLInputElement
  const newValue = Number(target.value)
  oninput?.(new CustomEvent("input", { detail: { value: newValue } }))
}
</script>

<div class="slider-wrapper {className}">
  <input
    {id}
    type="range"
    {value}
    {min}
    {max}
    {step}
    {name}
    disabled={effectiveDisabled}
    aria-label={ariaLabel}
    class="slider {variantClasses}"
    bind:this={inputElement}
    onchange={handleChange}
    oninput={handleInput}
  />
  
  {#if showValue}
    <div class="slider-value-display">
      {formattedValue}
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .slider-wrapper {
    @apply w-full flex flex-col gap-2;
  }
  
  .slider {
    @apply w-full h-2 appearance-none cursor-pointer;
    @apply bg-transparent;
    @apply m-0;
  }
  
  .slider:disabled {
    @apply opacity-50 cursor-not-allowed;
  }
  
  /* WebKit (Chrome, Safari, Edge) */
  .slider::-webkit-slider-runnable-track {
    @apply w-full h-2 rounded-full;
    @apply bg-muted/20 dark:bg-muted/20;
    @apply border-none outline-none;
  }
  
  .slider::-webkit-slider-thumb {
    @apply appearance-none w-5 h-5 rounded-full;
    @apply shadow-md cursor-grab;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
    @apply transition-transform duration-150;
    @apply -mt-1.5;
  }
  
  .slider::-webkit-slider-thumb:active {
    @apply cursor-grabbing scale-110;
  }
  
  /* Firefox */
  .slider::-moz-range-track {
    @apply w-full h-2 rounded-full;
    @apply bg-muted/20 dark:bg-muted/20;
    @apply border-none outline-none;
  }
  
  .slider::-moz-range-progress {
    @apply h-2 rounded-full;
  }
  
  .slider::-moz-range-thumb {
    @apply w-5 h-5 rounded-full;
    @apply shadow-md cursor-grab;
    @apply border-none outline-none;
    @apply focus:ring-2 focus:ring-offset-2;
    @apply transition-transform duration-150;
  }
  
  .slider::-moz-range-thumb:active {
    @apply cursor-grabbing scale-110;
  }
  
  /* Variant colors - WebKit thumb */
  .slider-default::-webkit-slider-thumb {
    @apply bg-muted dark:bg-muted;
  }
  
  .slider-primary::-webkit-slider-thumb {
    @apply bg-primary-500 dark:bg-primary-500;
    @apply focus:ring-primary-500 dark:focus:ring-primary-400;
  }
  
  .slider-secondary::-webkit-slider-thumb {
    @apply bg-secondary-500 dark:bg-secondary-500;
    @apply focus:ring-secondary-500 dark:focus:ring-secondary-400;
  }
  
  .slider-success::-webkit-slider-thumb {
    @apply bg-success-500 dark:bg-success-500;
    @apply focus:ring-success-500 dark:focus:ring-success-400;
  }
  
  .slider-warning::-webkit-slider-thumb {
    @apply bg-warning-500 dark:bg-warning-500;
    @apply focus:ring-warning-500 dark:focus:ring-warning-400;
  }
  
  .slider-error::-webkit-slider-thumb {
    @apply bg-error-500 dark:bg-error-500;
    @apply focus:ring-error-500 dark:focus:ring-error-400;
  }
  
  .slider-info::-webkit-slider-thumb {
    @apply bg-info-500 dark:bg-info-500;
    @apply focus:ring-info-500 dark:focus:ring-info-400;
  }
  
  /* Variant colors - Firefox thumb */
  .slider-default::-moz-range-thumb {
    @apply bg-muted dark:bg-muted;
  }
  
  .slider-primary::-moz-range-thumb {
    @apply bg-primary-500 dark:bg-primary-500;
    @apply focus:ring-primary-500 dark:focus:ring-primary-400;
  }
  
  .slider-secondary::-moz-range-thumb {
    @apply bg-secondary-500 dark:bg-secondary-500;
    @apply focus:ring-secondary-500 dark:focus:ring-secondary-400;
  }
  
  .slider-success::-moz-range-thumb {
    @apply bg-success-500 dark:bg-success-500;
    @apply focus:ring-success-500 dark:focus:ring-success-400;
  }
  
  .slider-warning::-moz-range-thumb {
    @apply bg-warning-500 dark:bg-warning-500;
    @apply focus:ring-warning-500 dark:focus:ring-warning-400;
  }
  
  .slider-error::-moz-range-thumb {
    @apply bg-error-500 dark:bg-error-500;
    @apply focus:ring-error-500 dark:focus:ring-error-400;
  }
  
  .slider-info::-moz-range-thumb {
    @apply bg-info-500 dark:bg-info-500;
    @apply focus:ring-info-500 dark:focus:ring-info-400;
  }
  
  /* Variant colors - Firefox progress */
  .slider-default::-moz-range-progress {
    @apply bg-muted dark:bg-muted;
  }
  
  .slider-primary::-moz-range-progress {
    @apply bg-primary-500 dark:bg-primary-500;
  }
  
  .slider-secondary::-moz-range-progress {
    @apply bg-secondary-500 dark:bg-secondary-500;
  }
  
  .slider-success::-moz-range-progress {
    @apply bg-success-500 dark:bg-success-500;
  }
  
  .slider-warning::-moz-range-progress {
    @apply bg-warning-500 dark:bg-warning-500;
  }
  
  .slider-error::-moz-range-progress {
    @apply bg-error-500 dark:bg-error-500;
  }
  
  .slider-info::-moz-range-progress {
    @apply bg-info-500 dark:bg-info-500;
  }
  
  .slider-value-display {
    @apply text-sm text-muted dark:text-muted font-medium;
  }
</style>
