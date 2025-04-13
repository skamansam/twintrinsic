<!--
@component
TabList - A container for Tab components within a Tabs component.
Provides the navigation interface for tab panels.

Usage:
```svelte
<Tabs>
  <TabList>
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
  </TabList>
  
  <TabPanel>First tab content</TabPanel>
  <TabPanel>Second tab content</TabPanel>
</Tabs>
```
-->
<script>
  import { getContext } from 'svelte';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - ARIA label for the tablist */
    ariaLabel,

    children
  } = $props();

  // Get tabs context
  const tabsContext = getContext('tabs');
  
  // Get context values with defaults
  const centered = tabsContext?.centered || false;
  const fullWidth = tabsContext?.fullWidth || false;
</script>

<div
  class="
    tab-list
    {fullWidth ? 'w-full' : ''}
    {centered ? 'justify-center' : ''}
    {className}
  "
  role="tablist"
  aria-label={ariaLabel}
>
  {@render children?.()}
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .tab-list {
    @apply flex items-center;
    @apply overflow-x-auto;
  }
</style>
