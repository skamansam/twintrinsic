<!--
@component
Accordion - A group of collapsible panels where only one can be open at a time.
Provides keyboard navigation and accessibility features.

Usage:
```svelte
<Accordion>
  <AccordionItem>
    <svelte:fragment slot="header">Section 1</svelte:fragment>
    Content for section 1
  </AccordionItem>
  <AccordionItem>
    <svelte:fragment slot="header">Section 2</svelte:fragment>
    Content for section 2
  </AccordionItem>
</Accordion>
```
-->
<script>
import { createEventDispatcher, setContext } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {boolean} - Whether to allow multiple panels to be open simultaneously */
  allowMultiple = false,

  /** @type {number|null} - Index of the initially expanded item (null for all collapsed) */
  defaultExpanded = 0,

  /** @type {boolean} - Whether to add a border around the accordion */
  bordered = true,

  children,
} = $props()

const dispatch = createEventDispatcher()

// Track expanded items
let expandedItems = $state(new Set())

// Initialize with default expanded item if provided
if (defaultExpanded !== null) {
  expandedItems.add(defaultExpanded)
}

// Set up context for accordion items
setContext("accordion", {
  registerItem: (itemId, index) => {
    // Return whether this item should be expanded initially
    return expandedItems.has(index)
  },
  toggleItem: (index, expanded) => {
    if (expanded) {
      if (!allowMultiple) {
        // Close all other items
        expandedItems.clear()
      }
      expandedItems.add(index)
    } else {
      expandedItems.delete(index)
    }

    dispatch("change", { expandedItems: Array.from(expandedItems) })
  },
  allowMultiple,
})
</script>

<div 
  class="accordion {bordered ? 'border border-border dark:border-border rounded-lg' : ''} {className}"
  id={id}
>
  {@render children?.()}
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .accordion {
    @apply divide-y divide-border dark:divide-border overflow-hidden;
  }
</style>
