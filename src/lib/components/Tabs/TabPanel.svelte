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
<script>
  import { getContext, onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id,

    /** @type {boolean} - Whether to lazy load panel content */
    lazy = false,

    /** @type {boolean} - Whether to keep content in DOM when not visible */
    keepAlive = true,

    /** @type {boolean} - Whether to animate panel transitions */
    animated = true,

    /** @type {number} - Animation duration in ms */
    animationDuration = 200,

    children
  } = $props();

  // Get tabs context
  const tabsContext = getContext('tabs');
  
  if (!tabsContext) {
    throw new Error('TabPanel must be used within a Tabs component');
  }
  
  // Panel state
  let panelElement;
  let index = -1;
  let hasBeenSelected = $state(false);
  
  // Register panel on mount
  onMount(() => {
    if (panelElement) {
      index = tabsContext.registerPanel(panelElement);
    }
    
    return () => {
      // Cleanup if needed
    };
  });
  
  // Determine if this panel is selected
  $derived isSelected = tabsContext.selectedIndex() === index;
  
  // Update hasBeenSelected when selected
  $effect(() => {
    if (isSelected) {
      hasBeenSelected = true;
    }
  });
  
  // Determine if content should be rendered
  $derived shouldRenderContent = isSelected || (keepAlive && hasBeenSelected) || !lazy;
  
  // Generate unique ID if not provided
  const panelId = id || `panel-${crypto.randomUUID()}`;
  
  // Tab ID for aria-labelledby
  $derived tabId = `tab-${panelId.replace('panel-', '')}`;
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

<style>
  @reference "../../twintrinsic.css";
  
  .tab-panel {
    @apply w-full py-4 focus:outline-none;
  }
  
  .tab-panel[hidden] {
    @apply hidden;
  }
</style>
