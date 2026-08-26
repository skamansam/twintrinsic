<!--
@component
Badge - A component for displaying small counts, status indicators, or labels.
Provides consistent styling, accessibility features, and various display options.

Usage:
```svelte
<Badge>New</Badge>

<Badge variant="primary" size="lg">42</Badge>

<Badge variant="success" dot>Online</Badge>

<Button>
  Notifications
  <Badge variant="error">5</Badge>
</Button>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "variant", type: "string", description: "Visual style variant", default: "\"default\"", optional: true },
  { name: "size", type: "string", description: "Size of the badge (sm, md, lg)", default: "\"md\"", optional: true },
  { name: "dot", type: "boolean", description: "Whether to show as a dot indicator", default: "false", optional: true },
  { name: "pill", type: "boolean", description: "Whether to show as a pill shape", default: "false", optional: true },
  { name: "outline", type: "boolean", description: "Whether to show as an outline", default: "false", optional: true },
  { name: "pulse", type: "boolean", description: "Whether to add a subtle pulse animation", default: "false", optional: true },
  { name: "hideEmpty", type: "boolean", description: "Whether to hide when content is empty", default: "false", optional: true },
  { name: "overlay", type: "boolean", description: "Whether to position as an absolute overlay", default: "false", optional: true },
  { name: "position", type: "string", description: "Position when used as overlay (top-right, top-left, etc.)", default: "\"top-right\"", optional: true },
  { name: "inline", type: "boolean", description: "Whether badge is inline (absolute positioning) or takes up space", default: "true", optional: true },
];
</script>

<script lang="ts">
const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Visual style variant */
  variant = "default",

  /** @type {string} - Size of the badge (sm, md, lg) */
  size = "md",

  /** @type {boolean} - Whether to show as a dot indicator */
  dot = false,

  /** @type {boolean} - Whether to show as a pill shape */
  pill = false,

  /** @type {boolean} - Whether to show as an outline */
  outline = false,

  /** @type {boolean} - Whether to add a subtle pulse animation */
  pulse = false,

  /** @type {boolean} - Whether to hide when content is empty */
  hideEmpty = false,

  /** @type {boolean} - Whether to position as an absolute overlay */
  overlay = false,

  /** @type {string} - Position when used as overlay (top-right, top-left, etc.) */
  position = "top-right",

  /** @type {boolean} - Whether badge is inline (absolute positioning) or takes up space */
  inline = true,

  children = undefined,
  ...restProps
} = $props()

// Determine if badge should be hidden
const isEmpty = $derived.by(() => {
  if (!children) return true
  try {
    return children().toString().trim() === ""
  } catch {
    return false
  }
})
const isHidden = $derived(hideEmpty && isEmpty)

// Determine variant classes
const variantClasses = $derived(
  {
    default: "bg-muted/20 text-muted dark:bg-muted/20 dark:text-muted",
    primary: "bg-primary-500 text-white dark:bg-primary-500 dark:text-white",
    secondary: "bg-secondary-500 text-white dark:bg-secondary-500 dark:text-white",
    success: "bg-success-500 text-white dark:bg-success-500 dark:text-white",
    warning: "bg-warning-500 text-white dark:bg-warning-500 dark:text-white",
    error: "bg-error-500 text-white dark:bg-error-500 dark:text-white",
    info: "bg-info-500 text-white dark:bg-info-500 dark:text-white",
  }[variant] || "bg-muted/20 text-muted dark:bg-muted/20 dark:text-muted"
)

// Determine outline variant classes
const outlineClasses = $derived(
  outline
    ? {
        default: "bg-transparent border border-muted text-muted dark:border-muted dark:text-muted",
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
    : ""
)

// Determine size classes
const sizeClasses = $derived(
  {
    sm: "text-xs px-1.5 py-0.5 min-w-4 h-4",
    md: "text-xs px-2 py-0.5 min-w-5 h-5",
    lg: "text-sm px-2.5 py-0.5 min-w-6 h-6",
  }[size] || "text-xs px-2 py-0.5 min-w-5 h-5"
)

// Determine dot size classes
const dotSizeClasses = $derived(
  {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
  }[size] || "w-2.5 h-2.5"
)

const topOffset = "-top-[0.5rem]";
const bottomOffset = "-bottom-[0.5rem]";
const rightOffset = "left-[calc(100%_-_1rem)]";
const leftOffset = "right-[calc(100%_-_1rem)]";

// Determine position classes for overlay
const positionClasses = $derived(
  overlay && inline
    ? {
      "top-right": `${topOffset} ${rightOffset}`,
      "top-left": `${topOffset} ${leftOffset}`,
      "bottom-right": `${bottomOffset} ${rightOffset}`,
      "bottom-left": `${bottomOffset} ${leftOffset}`,
    }[position] || `${topOffset} ${rightOffset}`
    : ""
)
</script>

{#if !isHidden}
  <span
    {...restProps}
    {id}
    class="
      badge
      {dot ? 'badge-dot' : ''}
      {pill ? 'badge-pill' : ''}
      {pulse ? 'badge-pulse' : ''}
      {overlay ? 'badge-overlay' : ''}
      {inline ? 'badge-inline' : ''}
      {outline ? outlineClasses : variantClasses}
      {dot ? dotSizeClasses : sizeClasses}
      {positionClasses}
      {      className}
    absolute"
    role={dot ? 'status' : 'status'}
    aria-label={dot ? 'Status indicator' : undefined}
  >
    {#if !dot}
      {@render children()}
    {/if}
  </span>
{/if}

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .badge {
    @apply inline-flex items-center justify-center;
    @apply font-medium leading-none;
    @apply rounded whitespace-nowrap;
  }

  .badge-inline {
    @apply absolute;
  }
  
  .badge-pill {
    @apply rounded-full;
  }
  
  .badge-dot {
    @apply rounded-full;
    @apply flex-shrink-0;
  }
  
  .badge-overlay {
    @apply z-10;
  }
  
  .badge-pulse {
    animation: badge-pulse 1.5s infinite;
  }
  
  @keyframes badge-pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(var(--color-primary-500-rgb), 0.4);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(var(--color-primary-500-rgb), 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(var(--color-primary-500-rgb), 0);
    }
  }
</style>
