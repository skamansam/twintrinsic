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
<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";

  interface Props {
    /** Additional CSS classes */
    class?: string;
    /** HTML id for accessibility */
    id?: string;
    /** Whether to allow multiple panels to be open simultaneously */
    allowMultiple?: boolean;
    /** Index of the initially expanded item (null for all collapsed) */
    defaultExpanded?: number | null;
    /** Whether to add a border around the accordion */
    bordered?: boolean;
    /** Change event handler */
    onchange?: (event: CustomEvent<{ expandedItems: number[] }>) => void;
    children?: Snippet;
  }

  let {
    class: className = "",
    id = crypto.randomUUID(),
    allowMultiple = false,
    defaultExpanded = 0,
    bordered = true,
    onchange,
    children,
  }: Props = $props();

// Track expanded items
let expandedItems = $state<Set<number>>(new Set());

// Initialize with default expanded item if provided
$effect(() => {
  if (defaultExpanded !== null) {
    expandedItems.clear();
    expandedItems.add(defaultExpanded);
  }
});

// Set up context for accordion items
$effect(() => {
  const accordionContext = {
    registerItem: (itemId: string, index: number): boolean => {
      // Return whether this item should be expanded initially
      return expandedItems.has(index);
    },
    toggleItem: (index: number, expanded: boolean): void => {
      if (expanded) {
        if (!allowMultiple) {
          // Close all other items
          expandedItems.clear();
        }
        expandedItems.add(index);
      } else {
        expandedItems.delete(index);
      }

      onchange?.(
        new CustomEvent("change", {
          detail: { expandedItems: Array.from(expandedItems) },
        })
      );
    },
    allowMultiple,
  };
  setContext("accordion", accordionContext);
});
</script>

<div 
  class="accordion {bordered ? 'border border-border dark:border-border rounded-lg' : ''} {className}"
  id={id}
>
  {@render children?.()}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .accordion {
    @apply divide-y divide-border dark:divide-border overflow-hidden;
  }
</style>
