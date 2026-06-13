<!--
@component
BottomBar - A collapsible bottom panel that attaches to its parent container.
Built on top of the Panel component with additional positioning and animation features.

Usage:
```svelte
<BottomBar>
  <svelte:fragment slot="header">Details</svelte:fragment>
  Content here
</BottomBar>

<BottomBar expanded={false} height="20rem">
  <svelte:fragment slot="header">Console</svelte:fragment>
  Console output here
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
  /** Whether the bottom bar is expanded by default */
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
  /** Called when the bottom bar is toggled */
  ontoggle?: (payload: { expanded: boolean }) => void
  /** Header content */
  header?: Snippet
  /** Main content */
  children?: Snippet
}
</script>

<script lang="ts">
import { slide } from "svelte/transition"
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
  ontoggle,
  header,
  children,
}: BottomBarProps = $props()

let isExpanded = $state(false)
let bottomBarElement: HTMLElement | undefined = $state()

// Initialize and sync expanded state when prop changes
$effect(() => {
  isExpanded = expanded
})

// Handle toggle from Panel
function handleToggle(payload: { expanded: boolean }) {
  isExpanded = payload.expanded
  ontoggle?.({ expanded: isExpanded })
}

// Handle escape key
function handleKeydown(event: KeyboardEvent) {
  if (!disabled && event.key === "Escape" && isExpanded) {
    isExpanded = false
    ontoggle?.({ expanded: isExpanded })
  }
}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
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
  <div
    class="
      bottombar
      {isExpanded ? 'bottombar-expanded' : 'bottombar-collapsed'}
    "
    role="region"
    aria-labelledby="{id}-header"
  >
    <Panel
      expanded={isExpanded}
      {disabled}
      bordered={false}
      ontoggle={handleToggle}
    >
      {#if header}
        <div class="bottombar-header">
            {@render header()}
        </div>
      {/if}
      {@render children?.()}
    </Panel>
  </div>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  .bottombar-container {
    @apply relative w-full;
  }

  /* Base bottombar styles */
  .bottombar {
    @apply bg-background transition-[height,transform] duration-200 ease-in-out overflow-hidden;
    height: var(--bottombar-height);
  }

  /* Collapsed state */
  .bottombar-collapsed {
    @apply translate-y-full;
  }

  /* Expanded state */
  .bottombar-expanded {
    @apply translate-y-0;
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
