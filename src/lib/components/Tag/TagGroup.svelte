<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "variant", type: "\"default\" | \"primary\" | \"secondary\" | \"success\" | \"warning\" | \"error\" | \"info\"", description: "Visual style variant passed to all tags", default: "\"default\"", optional: true },
  { name: "size", type: "\"sm\" | \"md\" | \"lg\"", description: "Size passed to all tags (sm, md, lg)", default: "\"md\"", optional: true },
  { name: "dismissible", type: "boolean", description: "Whether all tags are dismissible", default: "false", optional: true },
  { name: "outline", type: "boolean", description: "Whether all tags are outlines", default: "false", optional: true },
  { name: "pill", type: "boolean", description: "Whether all tags are pills", default: "false", optional: true },
  { name: "clickable", type: "boolean", description: "Whether all tags are clickable", default: "false", optional: true },
  { name: "direction", type: "\"horizontal\" | \"vertical\"", description: "Direction of the tag group (horizontal, vertical)", default: "\"horizontal\"", optional: true },
  { name: "items", type: "TItem[]", description: "Items to render as tags", default: "[]", optional: true },
  { name: "labelField", type: "string", description: "Field used to derive the label when items are objects", default: "\"label\"", optional: true },
  { name: "itemTemplate", type: "Snippet<[TItem, number]>", description: "Snippet rendered per item. Receives the item and its index,\ne.g. `{#snippet itemTemplate(item)}<Tag>{item}</Tag>{/snippet}`.", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for the tag group", default: "\"Tag group\"", optional: true },
  { name: "ondismiss", type: "(event: CustomEvent<{ item: TItem; index: number }>) => void", description: "Dismiss event handler", optional: true, eventDetail: "{ item: TItem; index: number }" },
];
</script>

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
