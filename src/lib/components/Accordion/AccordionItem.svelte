<!--
@component
AccordionItem - Individual item within an Accordion component.
Uses native HTML details/summary elements for semantic disclosure.

Usage:
```svelte
<AccordionItem>
  <svelte:fragment slot="header">Section Title</svelte:fragment>
  Content goes here
</AccordionItem>
```
-->
<script lang="ts">
  import type { Snippet } from "svelte";
  import { getContext, onMount } from "svelte";

  interface AccordionContext {
    groupName: string;
    allowMultiple: boolean;
    defaultExpanded: number | null;
    onchange?: (event: CustomEvent<{ expandedItems: number[] }>) => void;
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
    header?: Snippet;
  }

  let {
    class: className = "",
    id = crypto.randomUUID(),
    ariaLabel,
    disabled = false,
    showIcon = true,
    children,
    header,
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

  const shouldBeOpen = $derived(
    accordion?.defaultExpanded === index && accordion?.defaultExpanded !== null
  );

  function handleToggle(event: Event): void {
    if (disabled) {
      event.preventDefault();
      return;
    }

    const target = event.target as HTMLDetailsElement;
    accordion?.onchange?.(
      new CustomEvent("change", {
        detail: { expandedItems: [index] },
      })
    );
  }
</script>

<details
  class="accordion-item {className}"
  class:disabled
  bind:this={detailsElement}
  {id}
  name={accordion?.allowMultiple ? undefined : accordion?.groupName}
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
      <svg
        class="w-5 h-5 transform transition-transform duration-200 text-muted dark:text-muted"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
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

  :is(details[open]) :is(summary) :is(svg) {
    @apply rotate-180;
  }
</style>
