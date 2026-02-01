<!--
@component
Accordion - A group of collapsible panels using native HTML details/summary elements.
By default, only one panel can be open at a time using the native `name` attribute.

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

  const groupName = crypto.randomUUID();

  $effect(() => {
    setContext("accordion", {
      groupName,
      allowMultiple,
      defaultExpanded,
      onchange,
    });
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
