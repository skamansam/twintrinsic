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
<script>
import { slide } from "svelte/transition"
import Panel from "../Panel/Panel.svelte"

const {
  /** @type {boolean} - Whether the bottom bar is expanded */
  expanded = true,
  /** @type {string} - Additional CSS classes */
  class: className = "",
  /** @type {string} - Height of the bottom bar when expanded */
  height = "16rem",
  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),
  /** @type {string} - ARIA label */
  ariaLabel,
  /** @type {boolean} - Whether to disable the bottom bar controls */
  disabled = false,
  /** @type {boolean} - Whether to show a backdrop when expanded on mobile */
  showBackdrop = false,
  /** @type {boolean} - Whether to float over content on mobile */
  floatOnMobile = true,
  /** @type {boolean} - Whether to dock to viewport instead of parent */
  docked = false,
} = $props()

let isExpanded = $state(expanded)

// Handle toggle from Panel
function handleToggle(event) {
  isExpanded = event.detail.expanded
  dispatch("toggle", { expanded: isExpanded })
}

// Handle backdrop click
function handleBackdropClick() {
  if (!disabled) {
    isExpanded = false
    dispatch("toggle", { expanded: isExpanded })
  }
}

// Handle escape key
function handleKeydown(event) {
  if (!disabled && event.key === "Escape" && isExpanded) {
    isExpanded = false
    dispatch("toggle", { expanded: isExpanded })
  }
}

// Emit events directly
function dispatch(event, detail) {
  const customEvent = new CustomEvent(event, { detail })
  this?.dispatchEvent(customEvent)
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
  {#if showBackdrop && isExpanded}
    <div
      class="bottombar-backdrop"
      onclick={handleBackdropClick}
      transition:slide={{ duration: 200 }}
      aria-hidden="true"
    />
  {/if}

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
      toggle={handleToggle}
    >
      <svelte:fragment slot="header">
        <slot name="header" />
      </svelte:fragment>
      <slot />
    </Panel>
  </div>
</div>

<style>
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

  /* Backdrop styles */
  .bottombar-backdrop {
    @apply fixed inset-0 bg-black/20 backdrop-blur-sm z-40;
  }

  /* Mobile styles */
  @media (max-width: 640px) {
    .bottombar-float-mobile .bottombar {
      @apply fixed bottom-0 left-0 right-0 z-50;
    }

    .bottombar-float-mobile .bottombar-backdrop {
      @apply z-40;
    }
  }

  /* Non-floating mobile styles */
  @media (max-width: 640px) {
    .bottombar:not(.bottombar-float-mobile) {
      @apply w-full;
    }
  }
</style>
