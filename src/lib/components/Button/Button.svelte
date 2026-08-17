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
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "type", type: "\"button\" | \"submit\" | \"reset\"", description: "Button type (button, submit, reset)", default: "\"button\" as const", optional: true },
  { name: "variant", type: "string", description: "Button variant (default, primary, secondary, outline, ghost, link)", default: "\"default\"", optional: true },
  { name: "size", type: "string", description: "Button size (xs, sm, md, lg, xl)", default: "\"md\"", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the button is disabled", default: "false", optional: true },
  { name: "loading", type: "boolean", description: "Whether the button is in a loading state", default: "false", optional: true },
  { name: "icon", type: "string", description: "Icon to display (HTML or SVG string)", optional: true },
  { name: "iconPosition", type: "string", description: "Icon position (left or right)", default: "\"left\"", optional: true },
  { name: "fullWidth", type: "boolean", description: "Whether the button is full width", default: "false", optional: true },
  { name: "href", type: "string", description: "Link URL (renders as <a> instead of <button>)", optional: true },
  { name: "target", type: "string", description: "Link target (_blank, _self, etc.)", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for accessibility", optional: true },
  { name: "form", type: "string", description: "Form ID that this button is associated with", optional: true },
  { name: "name", type: "string", description: "Name attribute for form buttons", optional: true },
  { name: "value", type: "string", description: "Value attribute for form buttons", optional: true },
  { name: "autofocus", type: "boolean", description: "Whether the button should be autofocused on mount. Implemented via programmatic focus in `onMount` rather than the HTML `autofocus` attribute, to avoid the Svelte a11y_autofocus warning.", default: "false", optional: true },
  { name: "formmethod", type: "string", description: "Form submission method (post, get, etc.)", optional: true },
  { name: "formenctype", type: "string", description: "Form submission encoding", optional: true },
  { name: "formnovalidate", type: "string", description: "Form validation mode", optional: true },
  { name: "formtarget", type: "string", description: "Form target", optional: true },
  { name: "rel", type: "string", description: "Relationship attribute for links", optional: true },
  { name: "download", type: "string", description: "Download attribute for links", optional: true },
  { name: "onclick", type: "(event: CustomEvent) => void", description: "Click event handler", optional: true, eventDetail: "unknown" },
];
</script>

<script lang="ts">
import { getContext, onMount } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {"button" | "submit" | "reset"} - Button type (button, submit, reset) */
  type = "button" as const,

  /** @type {string} - Button variant (default, primary, secondary, outline, ghost, link) */
  variant = "default",

  /** @type {string} - Button size (xs, sm, md, lg, xl) */
  size = "md",

  /** @type {boolean} - Whether the button is disabled */
  disabled = false,

  /** @type {boolean} - Whether the button is in a loading state */
  loading = false,

  /** @type {string} - Icon to display (HTML or SVG string) */
  icon = undefined,

  /** @type {string} - Icon position (left or right) */
  iconPosition = "left",

  /** @type {boolean} - Whether the button is full width */
  fullWidth = false,

  /** @type {string} - Link URL (renders as <a> instead of <button>) */
  href = undefined,

  /** @type {string} - Link target (_blank, _self, etc.) */
  target = undefined,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel = undefined,

  /** @type {string} - Form ID that this button is associated with */
  form = undefined,

  /** @type {string} - Name attribute for form buttons */
  name = undefined,

  /** @type {string} - Value attribute for form buttons */
  value = undefined,

  /** @type {boolean} - Whether the button should be autofocused on mount.
   *  Implemented via programmatic focus in `onMount` rather than the HTML
   *  `autofocus` attribute, to avoid the Svelte a11y_autofocus warning. */
  autofocus = false,

  /** @type {string} - Form submission method (post, get, etc.) */
  formmethod = undefined,

  /** @type {string} - Form submission encoding */
  formenctype = undefined,

  /** @type {string} - Form validation mode */
  formnovalidate = undefined,

  /** @type {string} - Form target */
  formtarget = undefined,

  /** @type {string} - Relationship attribute for links */
  rel = undefined,

  /** @type {string} - Download attribute for links */
  download = undefined,

  /** @type {(event: CustomEvent) => void} - Click event handler */
  onclick = undefined,

  children = undefined,
} = $props()

/**
 * Handles button click
 * @param {Event} event - Click event
 */
function handleClick(event: Event): void {
  if (disabled || loading) {
    event.preventDefault()
    return
  }

  onclick?.(new CustomEvent("click", { detail: event }))
}

// Read the buttonGroup context (set by ButtonGroup) for inherited styling.
const buttonGroupContext = getContext<{ variant?: string; size?: string } | undefined>("buttonGroup")

// Group-provided variant/size take precedence over the button's own values
// (ButtonGroup's docs: "Button variant to apply to all children").
const effectiveVariant = $derived(buttonGroupContext?.variant ?? variant)
const effectiveSize = $derived(buttonGroupContext?.size ?? size)

// Determine if button should render as a link
const isLink = $derived(!!href && !disabled && !loading)

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
  }[effectiveVariant] ||
    "bg-surface dark:bg-surface text-text dark:text-text border border-border dark:border-border hover:bg-hover dark:hover:bg-hover"
)

// Determine size classes
const sizeClasses = $derived(
  effectiveVariant === "link"
    ? ""
    : {
        xs: "text-xs h-6 px-2",
        sm: "text-sm h-8 px-3",
        md: "text-base h-10 px-4",
        lg: "text-lg h-12 px-5",
        xl: "text-xl h-14 px-6",
      }[effectiveSize] || "text-base h-10 px-4"
)

// Determine icon size based on button size
const iconSize = $derived(
  {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
  }[effectiveSize] || "w-5 h-5"
)

// Shared class string for both <a> and <button> renderings
const buttonClass = $derived(
  [
    "button",
    variantClasses,
    sizeClasses,
    fullWidth ? "w-full" : "",
    loading ? "opacity-80 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")
)

// Ref for the rendered element (used to programmatically focus when autofocus is set)
let buttonElement: HTMLElement | undefined = $state()

// Focus the element ONCE on mount when autofocus is requested.
// Using onMount (not $effect) ensures focus is only stolen on initial
// render, not on every reactive dependency change.
onMount(() => {
  if (autofocus && !disabled && !loading && buttonElement) {
    buttonElement.focus()
  }
})
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#snippet buttonContent()}
  {#if loading}
    <span class="button-loader {iconSize}" aria-hidden="true"></span>
    <span class="sr-only">Loading</span>
  {:else}
    {#if icon && iconPosition === "left"}
      <span class="button-icon button-icon-left {iconSize}" aria-hidden="true">
        {@html icon}
      </span>
    {/if}

    {#if children}
      <span class="button-content">
        {@render children?.()}
      </span>
    {/if}

    {#if icon && iconPosition === "right"}
      <span class="button-icon button-icon-right {iconSize}" aria-hidden="true">
        {@html icon}
      </span>
    {/if}
  {/if}
{/snippet}

{#if isLink}
  <a
    {id}
    class={buttonClass}
    {href}
    {target}
    aria-disabled={disabled || loading ? "true" : undefined}
    aria-label={ariaLabel}
    onclick={handleClick}
    {rel}
    {download}
    bind:this={buttonElement}
  >
    {@render buttonContent()}
  </a>
{:else}
  <button
    {id}
    class={buttonClass}
    {type}
    {disabled}
    aria-disabled={disabled || loading ? "true" : undefined}
    aria-label={ariaLabel}
    onclick={handleClick}
    {form}
    {name}
    {value}
    {formmethod}
    {formenctype}
    {formnovalidate}
    {formtarget}
    bind:this={buttonElement}
  >
    {@render buttonContent()}
  </button>
{/if}

<style lang="postcss">
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
    @apply ml-2 -mr-2;
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
