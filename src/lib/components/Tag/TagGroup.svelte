<script lang="ts" generics="TItem extends string | Record<string, unknown> = string | Record<string, unknown>">
/**
 * @component
 * TagGroup - A component for managing multiple Tag components.
 * Provides consistent spacing, layout options, and accessibility features.
 *
 * Usage:
 * ```svelte
 * <TagGroup>
 *   <Tag>Tag 1</Tag>
 *   <Tag>Tag 2</Tag>
 *   <Tag>Tag 3</Tag>
 * </TagGroup>
 *
 * <TagGroup variant="primary" size="lg">
 *   <Tag>JavaScript</Tag>
 *   <Tag>TypeScript</Tag>
 *   <Tag>Svelte</Tag>
 * </TagGroup>
 *
 * <TagGroup
 *   items={['Red', 'Green', 'Blue']}
 *   ondismiss={(e) => handleDismiss(e.detail)}
 * >
 *   {#snippet itemTemplate(item)}
 *     <Tag dismissible>{item}</Tag>
 *   {/snippet}
 * </TagGroup>
 * ```
 */
import type { Snippet } from "svelte"
import { dispatchGroupRemove } from "../../helpers/groupRemove.js"
import { getItemLabel } from "../../helpers/itemLabel.js"
import Tag from "./Tag.svelte"

interface Props<TItem extends string | Record<string, unknown>> {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Visual style variant passed to all tags */
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info"
  /** Size passed to all tags (sm, md, lg) */
  size?: "sm" | "md" | "lg"
  /** Whether all tags are dismissible */
  dismissible?: boolean
  /** Whether all tags are outlines */
  outline?: boolean
  /** Whether all tags are pills */
  pill?: boolean
  /** Whether all tags are clickable */
  clickable?: boolean
  /** Direction of the tag group (horizontal, vertical) */
  direction?: "horizontal" | "vertical"
  /** Items to render as tags */
  items?: TItem[]
  /** Field used to derive the label when items are objects */
  labelField?: string
  /**
   * Snippet rendered per item. Receives the item and its index,
   * e.g. `{#snippet itemTemplate(item)}<Tag>{item}</Tag>{/snippet}`.
   */
  itemTemplate?: Snippet<[TItem, number]>
  /** ARIA label for the tag group */
  ariaLabel?: string
  /** Dismiss event handler */
  ondismiss?: (event: CustomEvent<{ item: TItem; index: number }>) => void
  /** Static tag content (rendered when `items` is empty) */
  children?: Snippet
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  variant = "default",
  size = "md",
  dismissible = false,
  outline = false,
  pill = false,
  clickable = false,
  direction = "horizontal",
  items = [],
  labelField = "label",
  itemTemplate,
  ariaLabel = "Tag group",
  ondismiss,
  children,
}: Props<TItem> = $props()

/**
 * Handles dismissing a tag
 * @param index - Index of the tag to dismiss
 */
function handleDismiss(index: number): void {
  dispatchGroupRemove(items, index, "dismiss", ondismiss)
}
</script>

<div
  {id}
  class="
    tag-group
    tag-group-{direction}
    {className}
  "
  role="group"
  aria-label={ariaLabel}
>
  {#if items.length > 0}
    {#each items as item, index}
      <div class="tag-group-item">
        {#if itemTemplate}
          {@render itemTemplate(item, index)}
        {:else}
          <Tag
            {variant}
            {size}
            {dismissible}
            {outline}
            {pill}
            {clickable}
            ondismiss={() => handleDismiss(index)}
          >
            {getItemLabel(item, labelField)}
          </Tag>
        {/if}
      </div>
    {/each}
  {:else}
    {@render children?.()}
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .tag-group {
    @apply flex flex-wrap;
    @apply gap-2;
  }

  .tag-group-horizontal {
    @apply flex-row;
  }

  .tag-group-vertical {
    @apply flex-col;
  }

  .tag-group-item {
    @apply flex-none;
  }
</style>
