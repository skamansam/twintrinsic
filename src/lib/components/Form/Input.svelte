<!--
@component
Input - Base component for form inputs with validation, floating labels, and input groups.
Built with accessibility and customization in mind.

Usage:
```svelte
<Input label="Username" />

<Input
  label="Email"
  type="email"
  value="user@example.com"
  floating={true}
  required
  error="Please enter a valid email"
/>

<Input
  label="Password"
  type="password"
  leftIcon="lock"
  rightIcon="eye"
  onrightIconClick={togglePassword}
/>
```
-->
<script lang="ts">
import { slide } from "svelte/transition"
import Icon from "../Icon/Icon.svelte"

const {
  /** @type {string} - Input label text */
  label,
  /** @type {string} - Input type (text, email, password, etc.) */
  type = "text",
  /** @type {string} - Input value */
  value = "",
  /** @type {string} - Placeholder text */
  placeholder = "",
  /** @type {string} - Name attribute */
  name = "",
  /** @type {string} - Id attribute */
  id = crypto.randomUUID(),
  /** @type {boolean} - Whether the input is disabled */
  disabled = false,
  /** @type {boolean} - Whether the input is required */
  required = false,
  /** @type {boolean} - Whether to use floating labels */
  floating = false,
  /** @type {boolean} - Whether the input is readonly */
  readonly = false,
  /** @type {string} - Error message to display */
  error = "",
  /** @type {string} - Help text to display below input */
  helpText = "",
  /** @type {string} - Left icon name */
  leftIcon = "",
  /** @type {string} - Right icon name */
  rightIcon = "",
  /** @type {string} - Additional CSS classes */
  class: className = "",
  /** @type {string} - Input mask pattern */
  mask = "",
  /** @type {string} - ARIA description */
  ariaDescription = "",
  /** @type {(event: Event) => void} - Focus event handler */
  onfocus,
  /** @type {(event: Event) => void} - Blur event handler */
  onblur,
  /** @type {(event: CustomEvent) => void} - Input event handler */
  oninput,
  /** @type {() => void} - Left icon click handler */
  onleftIconClick,
  /** @type {() => void} - Right icon click handler */
  onrightIconClick,
} = $props()

let inputValue = $state(value)
let focused = $state(false)
let touched = $state(false)

// Sync input value when prop changes
$effect(() => {
  inputValue = value
})

// Handle input focus
function handleFocus(event) {
  focused = true
  onfocus?.(event)
}

// Handle input blur
function handleBlur(event) {
  focused = false
  touched = true
  onblur?.(event)
}

// Handle input change
function handleInput(event) {
  const newValue = event.target.value

  // Apply mask if provided
  if (mask) {
    inputValue = applyMask(newValue, mask)
  } else {
    inputValue = newValue
  }

  oninput?.(new CustomEvent("input", { detail: { value: inputValue } }))
}

// Handle icon clicks
function handleLeftIconClick() {
  onleftIconClick?.()
}

function handleRightIconClick() {
  onrightIconClick?.()
}

// Apply input mask
function applyMask(value, pattern) {
  let result = ""
  let valueIndex = 0

  for (let i = 0; i < pattern.length && valueIndex < value.length; i++) {
    const maskChar = pattern[i]
    const valueChar = value[valueIndex]

    if (maskChar === "#") {
      if (/\d/.test(valueChar)) {
        result += valueChar
        valueIndex++
      }
    } else if (maskChar === "A") {
      if (/[a-zA-Z]/.test(valueChar)) {
        result += valueChar
        valueIndex++
      }
    } else if (maskChar === "*") {
      result += valueChar
      valueIndex++
    } else {
      result += maskChar
      if (valueChar === maskChar) {
        valueIndex++
      }
    }
  }

  return result
}

// Compute classes
const containerClasses = $derived(`
    form-input-container
    ${floating ? "form-input-floating" : ""}
    ${error ? "form-input-error" : ""}
    ${disabled ? "form-input-disabled" : ""}
    ${className}
  `)

const labelClasses = $derived(`
    form-input-label
    ${floating && (focused || inputValue) ? "form-input-label-float" : ""}
    ${error ? "form-input-label-error" : ""}
    ${disabled ? "form-input-label-disabled" : ""}
  `)

const inputClasses = $derived(`
    form-input
    ${leftIcon ? "form-input-left-icon" : ""}
    ${rightIcon ? "form-input-right-icon" : ""}
    ${error ? "form-input-field-error" : ""}
  `)
</script>

<div class={containerClasses}>
  {#if label}
    <label for={id} class={labelClasses}>
      {label}
      {#if required}
        <span class="form-input-required">*</span>
      {/if}
    </label>
  {/if}

  <div class="form-input-wrapper">
    {#if leftIcon}
      <button
        type="button"
        class="form-input-icon form-input-icon-left"
        onclick={handleLeftIconClick}
        tabindex="-1"
        aria-hidden="true"
      >
        <Icon name={leftIcon} />
      </button>
    {/if}

    <input
      {type}
      {id}
      {name}
      class={inputClasses}
      value={inputValue}
      placeholder={floating ? ' ' : placeholder}
      {disabled}
      {readonly}
      {required}
      aria-invalid={!!error}
      aria-describedby={error || helpText ? `${id}-description` : undefined}
      onfocus={handleFocus}
      onblur={handleBlur}
      oninput={handleInput}
    />

    {#if rightIcon}
      <button
        type="button"
        class="form-input-icon form-input-icon-right"
        onclick={handleRightIconClick}
        tabindex="-1"
        aria-hidden="true"
      >
        <Icon name={rightIcon} />
      </button>
    {/if}
  </div>

  {#if (error || helpText) && touched}
    <div
      id="{id}-description"
      class="form-input-description"
      class:form-input-error-text={!!error}
      transition:slide={{ duration: 150 }}
    >
      {error || helpText}
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  /* Container */
  .form-input-container {
    @apply relative space-y-1.5;
  }

  /* Label */
  .form-input-label {
    @apply block text-sm font-medium text-muted transition-all;
  }

  .form-input-label-error {
    @apply text-error-bold;
  }

  .form-input-label-disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  .form-input-required {
    @apply text-error-bold ml-1;
  }

  /* Input wrapper */
  .form-input-wrapper {
    @apply relative;
  }

  /* Base input */
  .form-input {
    @apply block w-full px-3 py-2 bg-surface;
    @apply border border-border rounded-md shadow-sm;
    @apply text-base placeholder-muted;
    @apply transition-colors duration-150;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
  }

  .form-input-disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  .form-input-field-error {
    @apply border-error-bold;
    @apply focus:ring-error-bold focus:border-error-bold;
  }

  /* Icons */
  .form-input-left-icon {
    @apply pl-10;
  }

  .form-input-right-icon {
    @apply pr-10;
  }

  .form-input-icon {
    @apply absolute inset-y-0 flex items-center;
    @apply p-2 text-muted transition-colors;
    @apply hover:text-primary-text focus:outline-none;
  }

  .form-input-icon-left {
    @apply left-0;
  }

  .form-input-icon-right {
    @apply right-0;
  }

  /* Floating label */
  .form-input-floating .form-input-label {
    @apply absolute text-sm text-muted;
    transform-origin: 0 0;
    transition: transform 0.15s ease-in-out;
  }

  .form-input-floating .form-input {
    @apply pt-4 pb-1;
  }

  .form-input-label-float {
    @apply transform -translate-y-3 scale-75 text-primary-500;
  }

  /* Description/Error text */
  .form-input-description {
    @apply mt-1 text-sm;
  }

  .form-input-error-text {
    @apply text-error-bold;
  }
</style>
