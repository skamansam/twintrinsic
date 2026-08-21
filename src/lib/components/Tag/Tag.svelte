<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "variant", type: "TagVariant", description: "Visual style variant", default: "\"default\"", optional: true },
  { name: "size", type: "\"sm\" | \"md\" | \"lg\"", description: "Size of the tag (sm, md, lg)", default: "\"md\"", optional: true },
  { name: "icon", type: "string", description: "Icon to display (HTML or SVG string)", optional: true },
  { name: "dismissible", type: "boolean", description: "Whether the tag is dismissible", default: "false", optional: true },
  { name: "outline", type: "boolean", description: "Whether to show the tag as an outline", default: "false", optional: true },
  { name: "pill", type: "boolean", description: "Whether to show the tag as a pill", default: "false", optional: true },
  { name: "clickable", type: "boolean", description: "Whether the tag is clickable", default: "false", optional: true },
  { name: "href", type: "string", description: "URL for the tag (makes it a link)", optional: true },
  { name: "target", type: "string", description: "Anchor target. Inlined as `string` to match the HTML `<a target>`\nspecification, which accepts any string (including named frames like\n`\"my-iframe\"`) — not just the four standard keywords.", optional: true },
  { name: "dismissAriaLabel", type: "string", description: "ARIA label for the dismiss button", default: "\"Dismiss\"", optional: true },
  { name: "dismissIcon", type: "string", description: "Custom dismiss icon (HTML or SVG string)", optional: true },
  { name: "ondismiss", type: "(event: CustomEvent) => void", description: "Dismiss event handler", optional: true, eventDetail: "unknown" },
];
</script>

<script lang="ts">
/**
 * @component
 * Tag - A component for displaying tags, labels, or status indicators.
 * Provides consistent styling, accessibility features, and various display options.
 *
 * Usage:
 * ```svelte
 * <Tag>Default Tag</Tag>
 *
 * <Tag variant="primary" size="lg">Primary Tag</Tag>
 *
 * <Tag variant="success" icon="<svg>...</svg>">Success</Tag>
 *
 * <Tag variant="warning" dismissible ondismiss={() => handleDismiss()}>Warning</Tag>
 * ```
 */
import type { Snippet } from "svelte"
import Icon from "../Icon/Icon.svelte"

/** Tag visual variants enumerated by the lookup dictionaries in this component. */
type TagVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Visual style variant */
  variant?: TagVariant
  /** Size of the tag (sm, md, lg) */
  size?: "sm" | "md" | "lg"
  /** Icon to display (HTML or SVG string) */
  icon?: string
  /** Whether the tag is dismissible */
  dismissible?: boolean
  /** Whether to show the tag as an outline */
  outline?: boolean
  /** Whether to show the tag as a pill */
  pill?: boolean
  /** Whether the tag is clickable */
  clickable?: boolean
  /** URL for the tag (makes it a link) */
  href?: string
  /**
   * Anchor target. Inlined as `string` to match the HTML `<a target>`
   * specification, which accepts any string (including named frames like
   * `"my-iframe"`) — not just the four standard keywords.
   */
  target?: string
  /** ARIA label for the dismiss button */
  dismissAriaLabel?: string
  /** Custom dismiss icon (HTML or SVG string) */
  dismissIcon?: string
  /** Dismiss event handler */
  ondismiss?: (event: CustomEvent) => void
  /** Tag content */
  children?: Snippet
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  variant = "default",
  size = "md",
  icon,
  dismissible = false,
  outline = false,
  pill = false,
  clickable = false,
  href,
  target,
  dismissAriaLabel = "Dismiss",
  dismissIcon,
  ondismiss,
  children,
}: Props = $props()

// Determine variant classes
const variantClasses = $derived(
  outline
    ? {
        default: "bg-transparent border border-muted text-text dark:border-muted dark:text-text",
        primary:
          "bg-transparent border border-primary-500 text-primary-500 dark:border-primary-500 dark:text-primary-500",
        secondary:
          "bg-transparent border border-secondary-500 text-secondary-500 dark:border-secondary-500 dark:text-secondary-500",
        success:
          "bg-transparent border border-success-500 text-success-500 dark:border-success-500 dark:text-success-500",
        warning:
          "bg-transparent border border-warning-500 text-warning-500 dark:border-warning-500 dark:text-warning-500",
        error:
          "bg-transparent border border-error-500 text-error-500 dark:border-error-500 dark:text-error-500",
        info: "bg-transparent border border-info-500 text-info-500 dark:border-info-500 dark:text-info-500",
      }[variant]
    : {
        default: "bg-muted/10 text-text dark:bg-muted/20 dark:text-text",
        primary: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200",
        secondary:
          "bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200",
        success: "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200",
        warning: "bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200",
        error: "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200",
        info: "bg-info-100 text-info-800 dark:bg-info-900 dark:text-info-200",
      }[variant]
)

// Determine size classes
const sizeClasses = $derived(
  {
    sm: "text-xs px-2 py-0.5 h-5",
    md: "text-sm px-2.5 py-0.5 h-6",
    lg: "text-base px-3 py-1 h-8",
  }[size] || "text-sm px-2.5 py-0.5 h-6"
)

// Determine icon size classes
const iconSizeClasses = $derived(
  {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }[size] || "w-4 h-4"
)

/**
 * Handles dismiss button click
 * @param {MouseEvent} event - Click event
 */
function handleDismiss(event: MouseEvent): void {
  event.stopPropagation()
  ondismiss?.(new CustomEvent("dismiss"))
}

/**
 * Handles click on the tag
 * @param {MouseEvent} event - Click event
 */
function handleClick(event: MouseEvent): void {
  if (clickable && !href) {
    // Click events are handled by native browser behavior for links
  }
}
</script>

{#if href}
  <a
    {id}
    href={href}
    target={target}
    class="
      tag
      {variantClasses}
      {sizeClasses}
      {pill ? 'tag-pill' : ''}
      {clickable || href ? 'tag-clickable' : ''}
      {className}
    "
    onclick={handleClick}
  >
    {#if icon}
      <span class="tag-icon {iconSizeClasses}">
        {@html icon}
      </span>
    {/if}
    
    <span class="tag-content">
      {@render children?.()}
    </span>
    
    {#if dismissible}
      <button
        type="button"
        class="tag-dismiss"
        aria-label={dismissAriaLabel}
        onclick={handleDismiss}
      >
        {#if dismissIcon}
          <span class="tag-dismiss-icon">
            {@html dismissIcon}
          </span>
        {:else}
          <Icon name="tabler:x" class={iconSizeClasses} />
        {/if}
      </button>
    {/if}
  </a>
{:else}
  {#if clickable && dismissible}
    <span
      {id}
      class="
        tag
        {variantClasses}
        {sizeClasses}
        {pill ? 'tag-pill' : ''}
        tag-clickable
        {className}
      "
    >
      <button type="button" class="tag-content" onclick={handleClick}>
        {#if icon}
          <span class="tag-icon {iconSizeClasses}">
            {@html icon}
          </span>
        {/if}
        {@render children?.()}
      </button>
      <button
        type="button"
        class="tag-dismiss"
        aria-label={dismissAriaLabel}
        onclick={handleDismiss}
      >
        {#if dismissIcon}
          <span class="tag-dismiss-icon">
            {@html dismissIcon}
          </span>
        {:else}
          <Icon name="tabler:x" class={iconSizeClasses} />
        {/if}
      </button>
    </span>
  {:else if clickable}
    <button
      type="button"
      {id}
      class="
        tag
        {variantClasses}
        {sizeClasses}
        {pill ? 'tag-pill' : ''}
        tag-clickable
        {className}
      "
      onclick={handleClick}
    >
      {#if icon}
        <span class="tag-icon {iconSizeClasses}">
          {@html icon}
        </span>
      {/if}
      <span class="tag-content">
        {@render children?.()}
      </span>
    </button>
  {:else}
    <span
      {id}
      class="
        tag
        {variantClasses}
        {sizeClasses}
        {pill ? 'tag-pill' : ''}
        {className}
      "
    >
      {#if icon}
        <span class="tag-icon {iconSizeClasses}">
          {@html icon}
        </span>
      {/if}
      <span class="tag-content">
        {@render children?.()}
      </span>
      {#if dismissible}
        <button
          type="button"
          class="tag-dismiss"
          aria-label={dismissAriaLabel}
          onclick={handleDismiss}
        >
          {#if dismissIcon}
            <span class="tag-dismiss-icon">
              {@html dismissIcon}
            </span>
          {:else}
            <Icon name="tabler:x" class={iconSizeClasses} />
          {/if}
        </button>
      {/if}
    </span>
  {/if}
{/if}

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .tag {
    @apply inline-flex items-center;
    @apply rounded;
    @apply font-medium;
    @apply transition-colors duration-150;
    @apply max-w-full;
  }
  
  .tag-pill {
    @apply rounded-full;
  }
  
  .tag-clickable {
    @apply cursor-pointer;
    @apply hover:bg-inherit/80 dark:hover:bg-inherit/80;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2;
  }
  
  .tag-icon {
    @apply mr-1 flex-shrink-0;
  }
  
  .tag-content {
    @apply truncate;
  }
  
  .tag-dismiss {
    @apply ml-1 -mr-1 p-0.5;
    @apply rounded-full;
    @apply flex items-center justify-center;
    @apply text-current opacity-70;
    @apply hover:opacity-100;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply transition-opacity duration-150;
  }
</style>
