<!--
@component
Button - A styled button component with various variants and sizes.
Provides consistent styling, accessibility features, and loading states.

Usage:
```svelte
<Button>Default Button</Button>

<Button variant="primary" size="lg">
  Primary Button
</Button>

<Button variant="outline" icon="settings">
  Settings
</Button>

<Button variant="link" href="/about">
  About Us
</Button>
```
-->
<script>
import { createEventDispatcher } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Button type (button, submit, reset) */
  type = "button",

  /** @type {string} - Button variant (default, primary, secondary, outline, ghost, link) */
  variant = "default",

  /** @type {string} - Button size (xs, sm, md, lg, xl) */
  size = "md",

  /** @type {boolean} - Whether the button is disabled */
  disabled = false,

  /** @type {boolean} - Whether the button is in a loading state */
  loading = false,

  /** @type {string} - Icon to display (HTML or SVG string) */
  icon,

  /** @type {string} - Icon position (left or right) */
  iconPosition = "left",

  /** @type {boolean} - Whether the button is full width */
  fullWidth = false,

  /** @type {string} - Link URL (renders as <a> instead of <button>) */
  href,

  /** @type {string} - Link target (_blank, _self, etc.) */
  target,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel,

  /** @type {string} - Form ID that this button is associated with */
  form,

  /** @type {string} - Name attribute for form buttons */
  name,

  /** @type {string} - Value attribute for form buttons */
  value,

  /** @type {boolean} - Whether the button should be autofocused */
  autofocus = false,

  /** @type {string} - Form submission method (post, get, etc.) */
  formmethod,

  /** @type {string} - Form submission encoding */
  formenctype,

  /** @type {string} - Form validation mode */
  formnovalidate,

  /** @type {string} - Form target */
  formtarget,

  /** @type {string} - Relationship attribute for links */
  rel,

  /** @type {string} - Download attribute for links */
  download,

  children,
} = $props()

const dispatch = createEventDispatcher()

/**
 * Handles button click
 * @param {Event} event - Click event
 */
function handleClick(event) {
  if (disabled || loading) {
    event.preventDefault()
    return
  }

  dispatch("click", event)
}

// Determine if button should render as a link
const isLink = $derived(!!href && !disabled && !loading)

// Determine element type
const elementType = $derived(isLink ? "a" : "button")

// Determine variant classes
const variantClasses = $derived(
  {
    default:
      "bg-surface dark:bg-surface text-text dark:text-text border border-border dark:border-border hover:bg-hover dark:hover:bg-hover",
    primary:
      "bg-primary-500 dark:bg-primary-500 text-white dark:text-white hover:bg-primary-600 dark:hover:bg-primary-600",
    secondary:
      "bg-secondary-500 dark:bg-secondary-500 text-white dark:text-white hover:bg-secondary-600 dark:hover:bg-secondary-600",
    outline:
      "bg-transparent dark:bg-transparent text-text dark:text-text border border-border dark:border-border hover:bg-hover dark:hover:bg-hover",
    ghost:
      "bg-transparent dark:bg-transparent text-text dark:text-text hover:bg-hover dark:hover:bg-hover",
    link: "bg-transparent dark:bg-transparent text-primary-500 dark:text-primary-400 hover:underline p-0 h-auto",
  }[variant] ||
    "bg-surface dark:bg-surface text-text dark:text-text border border-border dark:border-border hover:bg-hover dark:hover:bg-hover"
)

// Determine size classes
const sizeClasses = $derived(
  variant === "link"
    ? ""
    : {
        xs: "text-xs h-6 px-2",
        sm: "text-sm h-8 px-3",
        md: "text-base h-10 px-4",
        lg: "text-lg h-12 px-5",
        xl: "text-xl h-14 px-6",
      }[size] || "text-base h-10 px-4"
)

// Determine icon size based on button size
const iconSize = $derived(
  {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
  }[size] || "w-5 h-5"
)
</script>

<svelte:element
  this={elementType}
  {id}
  class="
    button
    {variantClasses}
    {sizeClasses}
    {fullWidth ? 'w-full' : ''}
    {loading ? 'opacity-80 pointer-events-none' : ''}
    {className}
  "
  {type}
  {href}
  {target}
  {disabled}
  aria-disabled={disabled || loading ? 'true' : undefined}
  aria-label={ariaLabel}
  onclick={handleClick}
  {form}
  {name}
  {value}
  {autofocus}
  {formmethod}
  {formenctype}
  {formnovalidate}
  {formtarget}
  {rel}
  {download}
>
  {#if loading}
    <span class="button-loader {iconSize}" aria-hidden="true"></span>
    <span class="sr-only">Loading</span>
  {:else}
    {#if icon && iconPosition === 'left'}
      <span class="button-icon button-icon-left {iconSize}" aria-hidden="true">
        {@html icon}
      </span>
    {/if}
    
    {#if children}
      <span class="button-content">
        {@render children?.()}
      </span>
    {/if}
    
    {#if icon && iconPosition === 'right'}
      <span class="button-icon button-icon-right {iconSize}" aria-hidden="true">
        {@html icon}
      </span>
    {/if}
  {/if}
</svelte:element>

<style>
  @reference "../../twintrinsic.css";
  
  .button {
    @apply inline-flex items-center justify-center;
    @apply font-medium rounded-md;
    @apply transition-colors duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-background;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
    @apply whitespace-nowrap;
  }
  
  .button-content {
    @apply flex-grow;
  }
  
  .button-icon-left {
    @apply mr-2 -ml-1;
  }
  
  .button-icon-right {
    @apply ml-2 -mr-1;
  }
  
  .button-loader {
    @apply rounded-full border-2 border-transparent border-t-current border-r-current;
    animation: button-spin 0.6s linear infinite;
  }
  
  @keyframes button-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
