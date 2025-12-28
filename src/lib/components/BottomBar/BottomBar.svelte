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
<script lang="ts">
import { slide } from "svelte/transition"
import Panel from "../Panel/Panel.svelte"

type BottomBarProps = {
  expanded?: boolean
  class?: string
  height?: string
  id?: string
  ariaLabel?: string
  disabled?: boolean
  floatOnMobile?: boolean
  docked?: boolean
  ontoggle?: (payload: { expanded: boolean }) => void
}

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
} = $props() satisfies BottomBarProps

let isExpanded = $state(false)
let bottomBarElement = $state()

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
      <svelte:fragment slot="header">
        <slot name="header" />
      </svelte:fragment>
      <slot />
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
