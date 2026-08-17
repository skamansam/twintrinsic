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
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", optional: true },
  { name: "lazy", type: "boolean", description: "Whether to lazy load panel content", default: "false", optional: true },
  { name: "keepAlive", type: "boolean", description: "Whether to keep content in DOM when not visible", default: "true", optional: true },
  { name: "animated", type: "boolean", description: "Whether to animate panel transitions", default: "true", optional: true },
  { name: "animationDuration", type: "number", description: "Animation duration in ms", default: "200", optional: true },
];
</script>

<script lang="ts">
import type { Snippet } from "svelte"
import { getContext, onMount } from "svelte"
import { fade } from "svelte/transition"

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
  children = undefined,
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
let index = $state(-1)
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

// Generate unique ID if not provided (read prop directly — no shadowing $derived needed)
const panelId = $derived(id || `panel-${crypto.randomUUID()}`)

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
