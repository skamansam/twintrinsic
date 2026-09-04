<!--
@component
BottomBar - A panel that attaches to the bottom of its parent container.
Useful as a mobile app bar, media-player controls, a console/detail panel,
or any bar that should be available on demand.

Visibility is driven by the `expanded` prop so the bar can be shown/hidden
from another component's UX (e.g. shown when a mobile menu opens). When the
`collapsible` prop is set, the header also acts as a toggle: clicking it
slides the panel down to a small handle, and clicking the handle slides it
back in.

For a static bar, visibility is prop-driven: bind `expanded` to app state and
update it from `ontoggle` (e.g. a mobile menu button). For a collapsible detail
panel, set `collapsible` and click the header to slide the bar down to a handle.

Usage:
```svelte
<BottomBar expanded={false}>
  {#snippet header()}Details{/snippet}
  Content here
</BottomBar>

<BottomBar collapsible>
  {#snippet header()}Details{/snippet}
  Content here
</BottomBar>
```
-->
<script module lang="ts">
import type { Snippet } from "svelte"

/**
 * Public props for the BottomBar component.
 * Exported so consumers (e.g. the App shell) can type-check against it
 * and avoid the `never` cascade that occurs when a component's
 * destructured props are not annotated with its own type.
 */
export type BottomBarProps = {
  /** Additional props passed through to the root element */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
  /** Whether the bottom bar is shown (prop-driven show/hide) */
  expanded?: boolean
  /** Additional CSS classes */
  class?: string
  /** Height of the bottom bar (CSS length value) */
  height?: string
  /** Unique ID for the bottom bar */
  id?: string
  /** Accessible label for the bottom bar */
  ariaLabel?: string
  /** Whether the bottom bar is disabled */
  disabled?: boolean
  /** Whether the bottom bar floats on mobile (fixed positioning) */
  floatOnMobile?: boolean
  /** Whether the bottom bar is docked to the bottom of the viewport */
  docked?: boolean
  /** Whether the header toggles the bar: clicking it collapses the bar to a small handle (click the handle to slide it back in). When false the bar is static and only the `expanded` prop shows/hides it. */
  collapsible?: boolean
  /** Called when the bottom bar's shown/hidden state changes */
  ontoggle?: (payload: { expanded: boolean }) => void
  /** Header content (rendered in the bar's header row) */
  header?: Snippet
  /** Main content */
  children?: Snippet
}

export const propsMetadata = [
  { name: "expanded", type: "boolean", description: "Whether the bottom bar is shown (prop-driven show/hide)", default: "true", optional: true },
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "height", type: "string", description: "Height of the bottom bar (CSS length value)", default: "\"16rem\"", optional: true },
  { name: "id", type: "string", description: "Unique ID for the bottom bar", default: "crypto.randomUUID()", optional: true },
  { name: "ariaLabel", type: "string", description: "Accessible label for the bottom bar", optional: true },
  { name: "disabled", type: "boolean", description: "Whether the bottom bar is disabled", default: "false", optional: true },
  { name: "floatOnMobile", type: "boolean", description: "Whether the bottom bar floats on mobile (fixed positioning)", default: "true", optional: true },
  { name: "docked", type: "boolean", description: "Whether the bottom bar is docked to the bottom of the viewport", default: "false", optional: true },
  { name: "collapsible", type: "boolean", description: "Whether the header toggles the bar: clicking it collapses the bar to a small handle (click the handle to slide it back in). When false the bar is static and only the `expanded` prop shows/hides it.", default: "false", optional: true },
  { name: "ontoggle", type: "(payload: { expanded: boolean }) => void", description: "Called when the bottom bar's shown/hidden state changes", optional: true },
  { name: "header", type: "Snippet", description: "Header content (rendered in the bar's header row)", optional: true },
];
</script>

<script lang="ts">
import Icon from "../Icon/Icon.svelte"
import Panel from "../Panel/Panel.svelte"

const {
  expanded = true,
  class: className = "",
  height = "16rem",
  id = crypto.randomUUID(),
  ariaLabel,
  disabled = false,
  floatOnMobile = true,
  docked = false,
  collapsible = false,
  ontoggle,
  header,
  children,
  ...restProps
}: BottomBarProps = $props()

// Initialize from the `expanded` prop — starting from a hardcoded `false`
// and syncing in an `$effect` would flip the bar open on mount, triggering
// the CSS transition ("not stable" for Playwright clicks, visible slide-in
// for users). The `$effect` below keeps the state in sync on later prop
// changes, so capturing only the initial value here is intentional.
// svelte-ignore state_referenced_locally
let isExpanded = $state(expanded)

// Sync expanded state when the prop changes (prop-driven show/hide)
$effect(() => {
  isExpanded = expanded
})

// Handle toggle from Panel (collapsible mode)
function handleToggle(payload: { expanded: boolean }) {
  isExpanded = payload.expanded
  ontoggle?.({ expanded: isExpanded })
}

// Re-expand from the collapsed handle
function handleExpand() {
  if (disabled) return
  isExpanded = true
  ontoggle?.({ expanded: true })
}

// Escape collapses a collapsible bar
function handleKeydown(event: KeyboardEvent) {
  if (!disabled && collapsible && event.key === "Escape" && isExpanded) {
    isExpanded = false
    ontoggle?.({ expanded: isExpanded })
  }
}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  {...restProps}
  class="
    bottombar-container
    {docked ? 'bottombar-docked' : ''}
    {floatOnMobile ? 'bottombar-float-mobile' : ''}
    {className}
  "
  style="--bottombar-height: {height}"
  {id}
  role="complementary"
  aria-label={ariaLabel}
>
  {#if collapsible && !isExpanded}
    <button
      type="button"
      class="bottombar-handle"
      aria-label={ariaLabel ? `Expand ${ariaLabel}` : "Expand bottom bar"}
      aria-expanded="false"
      aria-controls="{id}-content"
      {disabled}
      onclick={handleExpand}
    >
      <Icon name="tabler:chevron-up" class="w-4 h-4" />
      <span class="sr-only">Expand</span>
    </button>
  {/if}
  <div
    class="
      bottombar
      {isExpanded ? 'bottombar-expanded' : 'bottombar-collapsed'}
    "
    role="region"
    aria-labelledby={header ? '{id}-header' : undefined}
    aria-label={header ? undefined : ariaLabel}
  >
    {#if collapsible}
      <Panel
        expanded={isExpanded}
        {disabled}
        bordered={false}
        {header}
        ontoggle={handleToggle}
      >
        {@render children?.()}
      </Panel>
    {:else}
      <div class="bottombar-static">
        {#if header}
          <div class="bottombar-static-header" id="{id}-header">
            <div class="flex items-center gap-2 w-full">
              {@render header()}
            </div>
          </div>
        {/if}
        <div class="bottombar-static-content">
          {@render children?.()}
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  .bottombar-container {
    @apply relative w-full h-full;
  }

  /* Base bottombar styles — absolutely positioned at parent bottom */
  .bottombar {
    @apply bg-background border-t border-border transition-transform duration-200 ease-in-out overflow-hidden;
    height: var(--bottombar-height);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  /* Collapsed state — slide completely out of view; the small handle
     (rendered outside this element) stays visible to slide it back in. */
  .bottombar-collapsed {
    @apply translate-y-full pointer-events-none;
  }

  /* Expanded state */
  .bottombar-expanded {
    @apply translate-y-0;
  }

  /* Collapsed handle — a small tab docked at the bottom edge that
     re-expands the bar. Rendered only while collapsed. */
  .bottombar-handle {
    @apply absolute bottom-0 left-1/2 -translate-x-1/2 z-10
      flex items-center justify-center gap-1
      px-4 pt-1.5 pb-1.5 rounded-t-lg
      bg-surface dark:bg-surface border border-b-0 border-border
      text-muted dark:text-muted
      hover:bg-hover dark:hover:bg-hover hover:text-text dark:hover:text-text
      focus:outline-none focus:ring-2 focus:ring-focus-ring
      disabled:opacity-50 disabled:cursor-not-allowed;
  }

  /* Static (non-collapsible) header/content rows — match the collapsible
     Panel chrome so both modes look identical when shown. */
  .bottombar-static-header {
    @apply w-full px-4 py-3 bg-surface dark:bg-surface text-text dark:text-text;
  }

  .bottombar-static-content {
    @apply px-4 py-3 bg-background dark:bg-background text-text dark:text-text;
  }

  /* Docked styles */
  .bottombar-docked {
    @apply fixed bottom-0 left-0 right-0 z-50;
  }

  /* Mobile styles */
  @media (max-width: 640px) {
    .bottombar-float-mobile .bottombar {
      @apply fixed bottom-0 left-0 right-0 z-50;
    }
  }

  /* Non-floating mobile styles */
  @media (max-width: 640px) {
    .bottombar:not(.bottombar-float-mobile) {
      @apply w-full;
    }
  }
</style>
