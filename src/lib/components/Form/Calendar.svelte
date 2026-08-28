<!--
@component
Calendar - A date picker built on the native `<input type="date">` element.
Uses the browser's built-in date picker for accessibility, validation, and
localized formatting — free of charge.

Usage:
```svelte
<Calendar
  value={selectedDate}
  onselect={handleSelect}
/>

<Calendar
  label="Birthday"
  minDate={new Date('2026-01-01')}
  maxDate={new Date('2026-12-31')}
/>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "name", type: "string", description: "Name attribute", optional: true },
  { name: "value", type: "Date | null", description: "Selected date", default: "null", optional: true },
  { name: "minDate", type: "Date | null", description: "Minimum selectable date", default: "null", optional: true },
  { name: "maxDate", type: "Date | null", description: "Maximum selectable date", default: "null", optional: true },
  { name: "label", type: "string", description: "Label text", default: "\"Date\"", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the calendar is disabled", default: "false", optional: true },
  { name: "required", type: "boolean", description: "Whether the date is required", default: "false", optional: true },
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "onselect", type: "(event: CustomEvent<{ date: Date | null }>) => void", description: "Select event handler", optional: true, eventDetail: "{ date: Date | null }" },
  { name: "onchange", type: "(event: CustomEvent<{ value: string }>) => void", description: "Change event handler (fires with the ISO date string)", optional: true, eventDetail: "{ value: string }" },
];
</script>

<script lang="ts">
/**
 * @component
 * Calendar - A date picker built on the native `<input type="date">` element.
 *
 * Uses the browser's native date picker for maximum accessibility, validation,
 * and localized formatting. The native picker provides ARIA support, keyboard
 * navigation, and locale-aware date formatting for free.
 *
 * For date range selection, use two Calendar components side by side.
 * For custom calendar grids with week numbers, consider a dedicated
 * calendar library.
 */
import { getContext } from "svelte"
import type { FormContext, FormFieldApi } from "./formContext.js"
import Icon from "../Icon/Icon.svelte"

interface Props {
  /** Additional props passed through to the root element */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
  /** HTML id for accessibility */
  id?: string
  /** Name attribute */
  name?: string
  /** Selected date */
  value?: Date | null
  /** Minimum selectable date */
  minDate?: Date | null
  /** Maximum selectable date */
  maxDate?: Date | null
  /** Label text */
  label?: string
  /** Whether the calendar is disabled */
  disabled?: boolean
  /** Whether the date is required */
  required?: boolean
  /** Additional CSS classes */
  class?: string
  /** Select event handler */
  onselect?: (event: CustomEvent<{ date: Date | null }>) => void
  /** Change event handler (fires with the ISO date string) */
  onchange?: (event: CustomEvent<{ value: string }>) => void
}

let {
  id = crypto.randomUUID(),
  name,
  value = null,
  minDate = null,
  maxDate = null,
  label = "Date",
  disabled = false,
  required = false,
  class: className = "",
  onselect,
  onchange,
  ...restProps
}: Props = $props()

// Get form context if available
const formContext = getContext<FormContext | undefined>("form")

// Register with form if available
let fieldApi: FormFieldApi | undefined

// Disabled from form context takes precedence over the local prop
const effectiveDisabled = $derived(
  disabled === true || (fieldApi?.isDisabled() ?? false) || (formContext?.disabled() ?? false)
)

$effect(() => {
  if (formContext && name) {
    fieldApi = formContext.registerField(name, value)
  }
})

// Sync from form (handles form.reset(), form.setValue(), etc.)
$effect(() => {
  if (fieldApi) {
    const formValue = fieldApi.getValue()
    if (formValue === null || formValue === undefined) {
      // Form reset — clear internal value
    } else if (formValue instanceof Date && !isNaN(formValue.getTime())) {
      // Form set a Date
    }
  }
})

/**
 * Convert a Date to YYYY-MM-DD string for the native input
 * @param {Date | null} date - Date to convert
 * @returns {string} ISO date string or empty string
 */
function dateToISOString(date: Date | null): string {
  if (!date || isNaN(date.getTime())) return ""
  // Use local time methods — dates created via parseLocalDate() are
  // already at local midnight, and dates from user interaction are local.
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/**
 * Parse a YYYY-MM-DD string into a Date at local midnight
 * (avoids UTC timezone drift that `new Date(iso)` causes)
 * @param {string} isoString - ISO date string
 * @returns {Date | null} Date object or null
 */
function parseLocalDate(isoString: string): Date | null {
  if (!isoString) return null
  const [year, month, day] = isoString.split("-").map(Number)
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null
  return new Date(year, month - 1, day)
}

/**
 * Convert a YYYY-MM-DD string from the native input to a Date
 * @param {string} isoString - ISO date string
 * @returns {Date | null} Date object or null
 */


// Internal ISO string for the native input
// svelte-ignore state_referenced_locally
let isoValue = $state(dateToISOString(value))

// Sync from value prop
$effect(() => {
  const newIso = dateToISOString(value)
  if (newIso !== isoValue) {
    isoValue = newIso
  }
})

// Min/max as ISO strings for the native input
const minISOString = $derived(dateToISOString(minDate))
const maxISOString = $derived(dateToISOString(maxDate))

/**
 * Handles input change from the native date picker
 * @param {Event} event - Input event
 */
function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement
  const newIso = target.value
  isoValue = newIso

  const newDate = parseLocalDate(newIso)

  // Update form field if available
  if (fieldApi) {
    fieldApi.setValue(newDate)
  }

  // @ts-ignore: DOM lib types CustomEvent with `this: Window` binding;
  // module-scope has `this: void`
  onselect?.(new CustomEvent("select", { detail: { date: newDate } }))
  // @ts-ignore: same as above
  onchange?.(new CustomEvent("change", { detail: { value: newIso } }))
}
</script>

<div class="calendar-wrapper {className}">
  {#if label}
    <label for={id} class="calendar-label">{label}</label>
  {/if}
  <div class="calendar-input-wrapper">
    <input
      {...restProps}
      {id}
      {name}
      type="date"
      class="calendar-input"
      value={isoValue}
      min={minISOString || undefined}
      max={maxISOString || undefined}
      disabled={effectiveDisabled}
      {required}
      aria-label={label}
      oninput={handleInput}
    />
    <span class="calendar-icon" aria-hidden="true">
      <Icon name="tabler:calendar" class="w-4 h-4" />
    </span>
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .calendar-wrapper {
    @apply w-full;
  }

  .calendar-label {
    @apply block text-sm font-medium text-text dark:text-text mb-1;
  }

  .calendar-input-wrapper {
    @apply relative;
  }

  .calendar-input {
    @apply w-full h-10 px-3 pr-10;
    @apply bg-surface dark:bg-surface;
    @apply border border-border dark:border-border rounded-md;
    @apply text-text dark:text-text;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply focus:border-primary-500 dark:focus:border-primary-400;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
    @apply transition-colors duration-200;
  }

  /* Style the native calendar picker indicator */
  .calendar-input::-webkit-calendar-picker-indicator {
    @apply opacity-0 cursor-pointer;
    @apply absolute right-0 top-0 h-full w-10;
  }

  .calendar-icon {
    @apply absolute right-3 top-1/2 -translate-y-1/2;
    @apply text-muted dark:text-muted pointer-events-none;
  }
</style>
