<!--
@component
AccordionItem - Individual item within an Accordion component.
Uses native HTML details/summary elements for semantic disclosure.

Usage:
```svelte
<AccordionItem>
  {#snippet header()}Section Title{/snippet}
  Content goes here
</AccordionItem>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for the header", optional: true },
  { name: "disabled", type: "boolean", description: "Whether to disable the item controls", default: "false", optional: true },
  { name: "showIcon", type: "boolean", description: "Whether to show the expand/collapse icon", default: "true", optional: true },
  { name: "header", type: "Snippet", description: "Header content rendered in the summary", optional: true },
];
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { getContext, onMount } from "svelte";
  import Icon from "../Icon/Icon.svelte";

  interface AccordionContext {
    groupName: string;
    isAllowMultiple: () => boolean;
    getDefaultExpanded: () => number | null;
    onchange?: (detail: { expandedItems: number[] }) => void;
  }

  interface Props {
    /** Additional CSS classes */
    class?: string;
    /** HTML id for accessibility */
    id?: string;
    /** ARIA label for the header */
    ariaLabel?: string;
    /** Whether to disable the item controls */
    disabled?: boolean;
    /** Whether to show the expand/collapse icon */
    showIcon?: boolean;
    children?: Snippet;
    /** Header content rendered in the summary */
    header?: Snippet;
  }

  let {
    class: className = "",
    id = crypto.randomUUID(),
    ariaLabel = undefined,
    disabled = false,
    showIcon = true,
    children = undefined,
    header = undefined,
  ...restProps
  }: Props = $props();

  const accordion = getContext<AccordionContext | undefined>("accordion");

  let index = $state(-1);
  let detailsElement: HTMLDetailsElement | undefined = $state();

  onMount(() => {
    const parent = detailsElement?.parentElement;
    if (parent) {
      const items = Array.from(parent.children);
      index = items.indexOf(detailsElement!);
    }
  });

  const shouldBeOpen = $derived.by(() => {
    const defaultExpanded = accordion?.getDefaultExpanded();
    return defaultExpanded !== undefined && defaultExpanded !== null && defaultExpanded === index;
  });

  function handleToggle(event: Event): void {
    if (disabled) {
      event.preventDefault();
      return;
    }

    const target = event.target as HTMLDetailsElement;
    accordion?.onchange?.({ expandedItems: [index] });
  }
</script>

<details {...restProps}
  class="accordion-item {className}"
  class:disabled
  bind:this={detailsElement}
  {id}
  name={accordion?.isAllowMultiple() ? undefined : accordion?.groupName}
  ontoggle={handleToggle}
  open={shouldBeOpen}
>
  <summary
    class="
      w-full flex items-center justify-between
      px-4 py-3
      text-left
      bg-surface dark:bg-surface
      hover:bg-hover dark:hover:bg-hover
      focus:outline-none focus:ring-2 focus:ring-focus-ring dark:focus:ring-focus-ring
      cursor-pointer
      text-text dark:text-text
    "
    aria-label={ariaLabel}
  >
    <div class="flex items-center gap-2">
      {#if header}
        {@render header()}
      {:else}
        Item
      {/if}
    </div>

    {#if showIcon}
      <span class="accordion-chevron">
        <Icon name="chevron-down" width="20px" height="20px" />
      </span>
    {/if}
  </summary>

  <div
    class="px-4 py-3 bg-background dark:bg-background text-text dark:text-text"
  >
    {@render children?.()}
  </div>
</details>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .accordion-item {
    @apply overflow-hidden;
  }

  .accordion-item.disabled {
    @apply opacity-50 cursor-not-allowed pointer-events-none;
  }

  .accordion-chevron {
    @apply shrink-0 inline-flex items-center justify-center w-5 h-5 text-muted dark:text-muted transition-transform duration-200;
  }

  :is(details[open]) :is(summary) :is(.accordion-chevron) {
    @apply rotate-180;
  }
</style>
