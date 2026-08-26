<!--
@component
Panel - A collapsible container with header and content sections.
Provides smooth animations and keyboard accessibility.

Usage:
```svelte
<Panel>
  {#snippet header()}Panel Title{/snippet}
  Content goes here
</Panel>

<Panel expanded={false} class="custom-class">
  {#snippet header()}
    <Icon name="settings" />
    Settings
  {/snippet}
  Settings content
</Panel>
```
-->
<script module lang="ts">
/**
 * Exported so consumers (LazyPanel, BottomBar, Card, etc.) can type-check
 * their Panel usage. Without this, Panel's props resolve to `never` in
 * consumer type positions, causing cascade errors like
 * "Type 'boolean' is not assignable to type 'never'".
 */
export type PanelProps = {
  /** Whether the panel is expanded */
  expanded?: boolean
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** ARIA label for the header button */
  ariaLabel?: string | null
  /** Whether to disable the panel controls */
  disabled?: boolean
  /** Whether to show a border */
  bordered?: boolean
  /** Whether to show the expand/collapse icon */
  showIcon?: boolean
  /** Slot content for the panel body */
  children?: import("svelte").Snippet | null
  /** Slot content for the header */
  header?: import("svelte").Snippet | null
  /** Slot content rendered below the body */
  footer?: import("svelte").Snippet | null
  /** Callback invoked whenever the panel toggles expanded state */
  ontoggle?: (payload: { expanded: boolean }) => void
}

export const propsMetadata = [
  { name: "expanded", type: "boolean", description: "Whether the panel is expanded", default: "true", optional: true },
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "ariaLabel", type: "string | null", description: "ARIA label for the header button", default: "null", optional: true },
  { name: "disabled", type: "boolean", description: "Whether to disable the panel controls", default: "false", optional: true },
  { name: "bordered", type: "boolean", description: "Whether to show a border", default: "true", optional: true },
  { name: "showIcon", type: "boolean", description: "Whether to show the expand/collapse icon", default: "true", optional: true },
  { name: "header", type: "import(\"svelte\").Snippet | null", description: "Slot content for the header", default: "null", optional: true },
  { name: "footer", type: "import(\"svelte\").Snippet | null", description: "Slot content rendered below the body", default: "null", optional: true },
  { name: "ontoggle", type: "(payload: { expanded: boolean }) => void", description: "Callback invoked whenever the panel toggles expanded state", optional: true },
];
</script>

<script lang="ts">
import { slide } from "svelte/transition"
import Icon from "../Icon/Icon.svelte"

/**
 * @slot header Renders custom header content for the panel button
 * @slot default Provides the main panel body content
 * @slot footer Displays supplemental content below the body (e.g., actions)
 */

const {
  /** @type {boolean} - Whether the panel is expanded */
  expanded = true,

  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - ARIA label for the header button */
  ariaLabel = null,

  /** @type {boolean} - Whether to disable the panel controls */
  disabled = false,

  /** @type {boolean} - Whether to show a border */
  bordered = true,

  /** @type {boolean} - Whether to show the expand/collapse icon */
  showIcon = true,

  children = null,
  header = null,
  footer = null,
  ontoggle = undefined,
  ...restProps
}: PanelProps = $props()

let isExpanded = $state(true)

// Internal state
let headerEl = $state<HTMLButtonElement | null>(null)
let contentEl = $state<HTMLDivElement | null>(null)

// Update expanded state when prop changes
$effect(() => {
  isExpanded = expanded
})

// Handle toggle
function handleToggle() {
  if (disabled) return

  isExpanded = !isExpanded
  ontoggle?.({ expanded: isExpanded })
}

// Handle keyboard navigation
function handleKeydown(event: KeyboardEvent) {
  if (disabled) return

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault()
    handleToggle()
  }
}
</script>

<div {...restProps} 
  class="panel {bordered ? 'border border-border dark:border-border rounded-lg' : ''} {className}"
  class:disabled
>
  <button
    type="button"
    id="{id}-header"
    class="
      w-full flex items-center justify-between
      px-4 py-3
      text-left
      bg-surface dark:bg-surface
      hover:bg-hover dark:hover:bg-hover
      focus:outline-none focus:ring-2 focus:ring-focus-ring dark:focus:ring-focus-ring
      disabled:opacity-50 disabled:cursor-not-allowed
      text-text dark:text-text
      {bordered ? 'rounded-t-lg' : 'rounded-lg'}
    "
    aria-expanded={isExpanded}
    aria-controls="{id}-content"
    aria-label={ariaLabel}
    {disabled}
    onclick={handleToggle}
    onkeydown={handleKeydown}
    bind:this={headerEl}
  >
    <div class="flex items-center gap-2">
      {#if header}
        {@render header()}
      {:else}
        Panel
      {/if}
    </div>

    {#if showIcon}
      <Icon 
        name="tabler:chevron-down" 
        class="w-5 h-5 transform transition-transform duration-200 text-muted dark:text-muted {isExpanded ? 'rotate-180' : ''}" 
      />
    {/if}
  </button>

  {#if isExpanded}
    <div
      id="{id}-content"
      class="px-4 py-3 bg-background dark:bg-background text-text dark:text-text"
      role="region"
      aria-labelledby="{id}-header"
      transition:slide={{ duration: 200 }}
      bind:this={contentEl}
      class:rounded-b-lg={!footer && bordered}
    >
      {@render children?.()}
    </div>

    {#if footer}
      <div
        class="px-4 py-3 bg-background dark:bg-background text-muted dark:text-muted"
        class:border-t={bordered}
        class:border-border={bordered}
        class:rounded-b-lg={bordered}
      >
        {@render footer()}
      </div>
    {/if}
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  /* Base styles that work with Tailwind */
  .panel {
    @apply overflow-hidden;
  }

  .panel.disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  /* Ensure the content area has proper spacing when collapsed */
  .panel :global(.svelte-collapse-content) {
    @apply overflow-hidden;
  }
</style>
