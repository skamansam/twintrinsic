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
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "allowMultiple", type: "boolean", description: "Whether to allow multiple panels to be open simultaneously", default: "false", optional: true },
  { name: "defaultExpanded", type: "number | null", description: "Index of the initially expanded item (null for all collapsed)", default: "0", optional: true },
  { name: "bordered", type: "boolean", description: "Whether to add a border around the accordion", default: "true", optional: true },
  { name: "onchange", type: "(event: CustomEvent<{ expandedItems: number[] }>) => void", description: "Change event handler", optional: true, eventDetail: "{ expandedItems: number[] }" },
];
</script>

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
    onchange = undefined,
    children = undefined,
  }: Props = $props();

  const groupName = crypto.randomUUID();

  setContext("accordion", {
    groupName,
    isAllowMultiple: () => allowMultiple,
    getDefaultExpanded: () => defaultExpanded,
    onchange: (detail: { expandedItems: number[] }) =>
      onchange?.(new CustomEvent("change", { detail })),
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
