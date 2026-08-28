<!--
@component
ColorPicker - A color selection component built on the native `<input type="color">` element.
Provides the browser's built-in color picker with a text input for direct hex entry.

Usage:
```svelte
<ColorPicker
  value="#FF0000"
  onchange={handleChange}
/>

<ColorPicker
  label="Theme Color"
  value="#3B82F6"
/>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "name", type: "string", description: "Name attribute", optional: true },
  { name: "value", type: "string", description: "Color value as a hex string (e.g., \"#FF0000\")", default: "\"#000000\"", optional: true },
  { name: "label", type: "string", description: "Label text", default: "\"Color\"", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the picker is disabled", default: "false", optional: true },
  { name: "required", type: "boolean", description: "Whether the color is required", default: "false", optional: true },
  { name: "error", type: "string", description: "Error message", default: "\"\"", optional: true },
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "onchange", type: "(event: CustomEvent<{ value: string }>) => void", description: "Change event handler", optional: true, eventDetail: "{ value: string }" },
];
</script>

<script lang="ts">
/**
 * @component
 * ColorPicker - A color selection component built on the native
 * `<input type="color">` element.
 *
 * Uses the browser's native color picker for accessibility, validation,
 * and cross-platform consistency. A hex text input allows direct value entry.
 * The native picker provides ARIA support, keyboard navigation, and
 * platform-native color selection UI for free.
 */
import { getContext } from "svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"

interface Props {
  /** Additional props passed through to the root element */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
  /** HTML id for accessibility */
  id?: string
  /** Name attribute */
  name?: string
  /** Color value as a hex string (e.g., "#FF0000") */
  value?: string
  /** Label text */
  label?: string
  /** Whether the picker is disabled */
  disabled?: boolean
  /** Whether the color is required */
  required?: boolean
  /** Error message */
  error?: string
  /** Additional CSS classes */
  class?: string
  /** Change event handler */
  onchange?: (event: CustomEvent<{ value: string }>) => void
}

let {
  id = crypto.randomUUID(),
  name,
  value = "#000000",
  label = "Color",
  disabled = false,
  required = false,
  error = "",
  class: className = "",
  onchange = undefined,
  ...restProps
}: Props = $props()

// Get form context if available
const formContext = getContext<FormContext | undefined>("form")

// Register with form if available
let fieldApi: FormFieldApi | undefined

// Disabled from form context takes precedence over the local prop
const effectiveDisabled = $derived(
  disabled || (fieldApi?.isDisabled() ?? false) || (formContext?.disabled() ?? false)
)

$effect(() => {
  if (formContext && name) {
    fieldApi = formContext.registerField(name, value)
  }
})

/**
 * Normalize a color string to a 7-character hex string (#RRGGBB)
 * @param {string} color - Color string to normalize
 * @returns {string} Normalized hex string
 */
function normalizeHex(color: string): string {
  if (!color) return "#000000"
  // Already a valid 7-char hex
  if (/^#[0-9a-fA-F]{6}$/.test(color)) return color
  // 4-char hex (#RGB) → #RRGGBB
  if (/^#[0-9a-fA-F]{3}$/.test(color)) {
    const r = color[1]
    const g = color[2]
    const b = color[3]
    return `#${r}${r}${g}${g}${b}${b}`
  }
  // Try to parse via canvas
  try {
    const ctx = document.createElement("canvas").getContext("2d")
    if (ctx) {
      ctx.fillStyle = color
      return ctx.fillStyle
    }
  } catch {
    // Fall through
  }
  return "#000000"
}

// Internal hex value for the native input
// svelte-ignore state_referenced_locally
let hexValue = $state(normalizeHex(value))
// svelte-ignore state_referenced_locally
let textValue = $state(normalizeHex(value))

// Sync from value prop
$effect(() => {
  const newHex = normalizeHex(value)
  if (newHex !== hexValue) {
    hexValue = newHex
    textValue = newHex
  }
})

/**
 * Dispatch change event and update form field
 * @param {string} newHex - New hex color value
 */
function dispatchChange(newHex: string): void {
  hexValue = newHex
  textValue = newHex

  fieldApi?.setValue(newHex)
  // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding;
  // module-scope has `this: void`
  onchange?.(new CustomEvent("change", { detail: { value: newHex } }))
}

/**
 * Handle native color input change
 * @param {Event} event - Input event
 */
function handleColorInput(event: Event): void {
  const target = event.target as HTMLInputElement
  dispatchChange(target.value)
}

/**
 * Handle hex text input change
 * @param {Event} event - Input event
 */
function handleTextInput(event: Event): void {
  const target = event.target as HTMLInputElement
  const raw = target.value
  textValue = raw

  // Only dispatch if it's a valid hex
  if (/^#[0-9a-fA-F]{6}$/.test(raw)) {
    dispatchChange(raw)
  }
}

/**
 * Handle text input blur — normalize the value
 */
function handleTextBlur(): void {
  const normalized = normalizeHex(textValue)
  textValue = normalized
  if (normalized !== hexValue) {
    dispatchChange(normalized)
  }
}
</script>

<div class="color-picker {className}">
  {#if label}
    <label for="{id}-hex" class="color-picker-label">{label}</label>
  {/if}
  <div class="color-picker-input-row">
    <div class="color-picker-native">
      <input
        {...restProps}
        id="{id}-native"
        {name}
        type="color"
        class="color-picker-native-input"
        value={hexValue}
        disabled={effectiveDisabled}
        {required}
        aria-label={label ? `${label} color swatch` : "Color swatch"}
        oninput={handleColorInput}
      />
    </div>
    <input
      id="{id}-hex"
      type="text"
      class="color-picker-hex-input"
      class:color-picker-hex-error={!!error}
      value={textValue}
      disabled={effectiveDisabled}
      {required}
      placeholder="#000000"
      maxlength="7"
      aria-label={label ? `${label} hex value` : "Hex color value"}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      oninput={handleTextInput}
      onblur={handleTextBlur}
    />
  </div>
  {#if error}
    <p id="{id}-error" class="color-picker-error" role="alert">{error}</p>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .color-picker {
    @apply w-full;
  }

  .color-picker-label {
    @apply block text-sm font-medium text-text dark:text-text mb-1;
  }

  .color-picker-input-row {
    @apply flex items-center gap-2;
  }

  .color-picker-native {
    @apply relative shrink-0;
  }

  .color-picker-native-input {
    @apply w-10 h-10 rounded-md cursor-pointer;
    @apply border border-border dark:border-border;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
    @apply transition-colors duration-200;
    /* Hide the default browser swatch and use our own */
    padding: 2px;
  }

  .color-picker-native-input::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  .color-picker-native-input::-webkit-color-swatch {
    @apply rounded-sm border-none;
  }

  .color-picker-native-input::-moz-color-swatch {
    @apply rounded-sm border-none;
  }

  .color-picker-hex-input {
    @apply flex-1 h-10 px-3;
    @apply bg-surface dark:bg-surface;
    @apply border border-border dark:border-border rounded-md;
    @apply text-text dark:text-text font-mono text-sm;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply focus:border-primary-500 dark:focus:border-primary-400;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
    @apply transition-colors duration-200;
  }

  .color-picker-hex-error {
    @apply border-error-500 dark:border-error-500;
    @apply focus:ring-error-500 dark:focus:ring-error-500;
  }

  .color-picker-error {
    @apply mt-1 text-sm text-error-500 dark:text-error-500;
  }
</style>
