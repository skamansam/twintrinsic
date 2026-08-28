<!--
@component
Alert - A component for displaying inline alerts, important information, or warnings.
Colored background with a thick one-side border. Use for "You have 3 new messages",
"Your account is almost full", informational callouts, or best-practices sections.

Usage:
```svelte
<Alert variant="info">A new version is available.</Alert>

<Alert variant="warning" title="Storage full">
  Your storage is 95% full. Upgrade your plan to add more space.
</Alert>

<Alert variant="success" dismissible>Profile saved successfully.</Alert>

<Alert variant="error" border="left">
  Something went wrong. Please try again.
</Alert>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "variant", type: "string", description: "Visual style variant", default: "\"info\"", optional: true },
  { name: "border", type: "string", description: "Side for the thick border", default: "\"left\"", optional: true },
  { name: "title", type: "string", description: "Optional alert title", optional: true },
  { name: "icon", type: "string | false", description: "Custom Iconify icon name, or false to hide", optional: true },
  { name: "dismissible", type: "boolean", description: "Whether to show a close button", default: "false", optional: true },
  { name: "onclose", type: "(event: CustomEvent) => void", description: "Close event handler", optional: true, eventDetail: "unknown" },
];
</script>

<script lang="ts">
import Icon from "../Icon/Icon.svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Visual style variant */
  variant = "info",

  /** @type {string} - Side for the thick border */
  border = "left",

  /** @type {string} - Optional alert title */
  title = undefined,

  /** @type {string | false} - Custom Iconify icon name, or false to hide */
  icon = undefined,

  /** @type {boolean} - Whether to show a close button */
  dismissible = false,

  /** @type {(event: CustomEvent) => void} - Close event handler */
  onclose = undefined,

  children,
  ...restProps
} = $props()

/** Whether the alert is currently visible */
let visible = $state(true)

/** Default icon per variant */
const defaultIcons: Record<string, string> = {
  info: "tabler:info-circle",
  success: "tabler:circle-check",
  warning: "tabler:alert-triangle",
  error: "tabler:alert-octagon",
}

/** Variant color classes */
const variantClasses: Record<string, string> = {
  info: "bg-info-50 dark:bg-info-950 text-info-800 dark:text-info-200 border-info-500",
  success: "bg-success-50 dark:bg-success-950 text-success-800 dark:text-success-200 border-success-500",
  warning: "bg-warning-50 dark:bg-warning-950 text-warning-800 dark:text-warning-200 border-warning-500",
  error: "bg-error-50 dark:bg-error-950 text-error-800 dark:text-error-200 border-error-500",
  default: "bg-muted/10 dark:bg-muted/10 text-text dark:text-text border-muted",
}

/** Border side classes */
const borderClasses: Record<string, string> = {
  left: "border-l-4",
  right: "border-r-4",
  top: "border-t-4",
  bottom: "border-b-4",
}

/** Handle close button click */
function handleClose(): void {
  visible = false
  onclose?.(new CustomEvent("close"))
}

/** Resolved icon name */
const resolvedIcon = $derived(
  icon === false ? null : (icon as string) || defaultIcons[variant] || defaultIcons.info
)
</script>

{#if visible}
  <div
    {...restProps}
    {id}
    role="alert"
    class="
      alert
      {variantClasses[variant] || variantClasses.default}
      {borderClasses[border] || borderClasses.left}
      {className}
    "
  >
    {#if resolvedIcon}
      <div class="alert-icon">
        <Icon name={resolvedIcon} class="w-5 h-5" />
      </div>
    {/if}

    <div class="alert-body">
      {#if title}
        <div class="alert-title">{title}</div>
      {/if}
      <div class="alert-content">
        {@render children?.()}
      </div>
    </div>

    {#if dismissible}
      <button
        type="button"
        class="alert-close"
        aria-label="Dismiss alert"
        onclick={handleClose}
      >
        <Icon name="tabler:x" class="w-4 h-4" />
      </button>
    {/if}
  </div>
{/if}

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .alert {
    @apply flex items-start p-4 rounded-lg;
    @apply text-sm leading-relaxed;
  }

  .alert-icon {
    @apply flex-shrink-0 mr-3 mt-0.5;
  }

  .alert-body {
    @apply flex-1 min-w-0;
  }

  .alert-title {
    @apply font-semibold mb-1;
  }

  .alert-content {
    @apply opacity-90;
  }

  .alert-close {
    @apply flex-shrink-0 ml-3 -mr-1 p-1;
    @apply rounded-md opacity-70;
    @apply hover:opacity-100;
    @apply focus:outline-none focus:ring-2 focus:ring-current;
    @apply transition-opacity duration-150;
  }
</style>
