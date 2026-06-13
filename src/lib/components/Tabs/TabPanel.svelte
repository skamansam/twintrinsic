<!--
@component
TabPanel - A container for tab content within a Tabs component.
Displays content when its corresponding Tab is selected.

Usage:
```svelte
<TabPanel>
  Content for the first tab
</TabPanel>

<TabPanel lazy>
  This content only renders when the tab is selected
</TabPanel>
```
-->
<script lang="ts">
import { getContext, onMount } from "svelte"
import { fade } from "svelte/transition"
import type { Snippet } from "svelte"

interface Props {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Whether to lazy load panel content */
  lazy?: boolean
  /** Whether to keep content in DOM when not visible */
  keepAlive?: boolean
  /** Whether to animate panel transitions */
  animated?: boolean
  /** Animation duration in ms */
  animationDuration?: number
  children?: Snippet
}

let {
  class: className = "",
  id,
  lazy = false,
  keepAlive = true,
  animated = true,
  animationDuration = 200,
  children,
}: Props = $props()

// Get tabs context
const tabsContext = getContext<{
  registerPanel: (element: HTMLElement) => number
  selectedIndex: () => number
} | undefined>("tabs")

if (!tabsContext) {
  throw new Error("TabPanel must be used within a Tabs component")
}

// Panel state
let panelElement: HTMLElement | undefined = $state()
let index = -1
let hasBeenSelected = $state(false)

// Register panel on mount
onMount(() => {
  if (panelElement) {
    index = tabsContext.registerPanel(panelElement)
  }

  return () => {
    // Cleanup if needed
  }
})

// Determine if this panel is selected
const isSelected = $derived(tabsContext.selectedIndex() === index)

// Update hasBeenSelected when selected
$effect(() => {
  if (isSelected) {
    hasBeenSelected = true
  }
})

// Determine if content should be rendered
const shouldRenderContent = $derived(isSelected || (keepAlive && hasBeenSelected) || !lazy)

// Derived values for reactive prop access in closures
const derivedId = $derived(id)

// Generate unique ID if not provided
const panelId = derivedId || `panel-${crypto.randomUUID()}`

// Tab ID for aria-labelledby
const tabId = $derived(`tab-${panelId.replace("panel-", "")}`)
</script>

<div
  id={panelId}
  class="tab-panel {className}"
  role="tabpanel"
  aria-labelledby={tabId}
  tabindex="0"
  hidden={!isSelected}
  bind:this={panelElement}
>
  {#if shouldRenderContent}
    {#if animated && isSelected}
      <div transition:fade={{ duration: animationDuration }}>
        {@render children?.()}
      </div>
    {:else}
      <div>
        {@render children?.()}
      </div>
    {/if}
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .tab-panel {
    @apply w-full py-4 focus:outline-none;
  }
  
  .tab-panel[hidden] {
    @apply hidden;
  }
</style>
