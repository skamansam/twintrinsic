<!--
@component
Separator - A visual divider that can be horizontal or vertical with optional text/icon content.

Usage:
```svelte
<Separator />
<Separator>or</Separator>
<Separator vertical />
<Separator>
  <Icon name="star" />
  Featured Content
</Separator>
```
-->
<script>
const {
  /** @type {boolean} - Whether the separator should be vertical */
  vertical = false,

  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - ARIA label */
  ariaLabel,

  /** @type {string} - Color variant */
  color = "default",

  /** @type {"div" | "hr"} - HTML element to render */
  as,

  children,
} = $props()

// Color variants mapping
const colorClasses = {
  default: "border-border",
  primary: "border-primary-200 dark:border-primary-800",
  success: "border-success/30",
  warning: "border-warning/30",
  error: "border-error/30",
}

// Determine if we have content and element type
const hasContent = $derived(children !== undefined)
const element = $derived(as ?? (hasContent ? "div" : "hr"))
</script>

<svelte:element
  this={element}
  class="separator {colorClasses[color]} {vertical ? 'separator-vertical' : 'separator-horizontal'} {hasContent ? 'separator-with-content' : ''} {className}"
  role={element === 'div' ? 'separator' : undefined}
  aria-orientation={vertical ? 'vertical' : 'horizontal'}
  aria-label={ariaLabel}
>
  {#if hasContent}
  <div class="separator-content">
      {@render children()}
  </div>
  {/if}
</svelte:element>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  /* Base separator styles */
  .separator {
    @apply relative border-0;
  }

  /* Horizontal separator */
  .separator-horizontal {
    @apply w-full h-px mt-4 mb-4;
  }

  .separator-horizontal:not(.separator-with-content) {
    @apply border-t;
  }

  .separator-horizontal.separator-with-content {
    @apply flex items-center text-center before:content-[''] after:content-[''];
    @apply before:flex-1 before:border-t;
    @apply after:flex-1 after:border-t;
  }

  /* Vertical separator */
  .separator-vertical {
    @apply h-full w-px mx-4 inline-block align-middle;
  }

  .separator-vertical:not(.separator-with-content) {
    @apply border-l;
  }

  .separator-vertical.separator-with-content {
    @apply flex flex-col items-center text-center before:content-[''] after:content-[''];
    @apply before:flex-1 before:border-l;
    @apply after:flex-1 after:border-l;
  }

  /* Content styles */
  .separator-content {
    @apply flex items-center gap-2 px-3 text-muted;
  }

  .separator-vertical .separator-content {
    @apply py-3 px-0 rotate-180 [writing-mode:vertical-lr];
  }
</style>
