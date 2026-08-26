<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "variant", type: "\"default\" | \"primary\" | \"secondary\" | \"success\" | \"warning\" | \"error\" | \"info\"", description: "Visual style variant passed to all chips", default: "\"default\"", optional: true },
  { name: "size", type: "\"sm\" | \"md\" | \"lg\"", description: "Size passed to all chips (sm, md, lg)", default: "\"md\"", optional: true },
  { name: "removable", type: "boolean", description: "Whether all chips are removable", default: "false", optional: true },
  { name: "clickable", type: "boolean", description: "Whether all chips are clickable", default: "false", optional: true },
  { name: "selectable", type: "boolean", description: "Whether all chips are selectable", default: "false", optional: true },
  { name: "multiple", type: "boolean", description: "Whether multiple chips can be selected", default: "false", optional: true },
  { name: "disabled", type: "boolean", description: "Whether all chips are disabled", default: "false", optional: true },
  { name: "outline", type: "boolean", description: "Whether all chips use outline style", default: "false", optional: true },
  { name: "direction", type: "\"horizontal\" | \"vertical\"", description: "Direction of the chip group (horizontal, vertical)", default: "\"horizontal\"", optional: true },
  { name: "items", type: "TItem[]", description: "Items to render as chips", default: "[]", optional: true },
  { name: "selected", type: "TItem[]", description: "Selected items (controlled). Pass a stable reference or omit for\nuncontrolled selection — a fresh array literal each render would\nreset internal toggles.", default: "[]", optional: true },
  { name: "labelField", type: "string", description: "Field used to derive the label when items are objects", default: "\"label\"", optional: true },
  { name: "itemTemplate", type: "Snippet<[TItem, number, boolean]>", description: "Snippet rendered per item. Receives the item, its index, and a boolean\nindicating whether that item is currently selected in the group, e.g.\n`{#snippet itemTemplate(item, index, selected)}<Chip selected={selected}>{item}</Chip>{/snippet}`.\nThe selected flag stays in sync with the group's internal selection state\n(and the controlled `selected` prop), so snippet chips can reflect\nselection without tracking it themselves.\n\nNote: group props (`clickable`, `selectable`, `removable`) apply only to\nthe default fallback — a custom snippet owns the Chip entirely and must\napply those interactive props itself.", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for the chip group", default: "\"Chip group\"", optional: true },
  { name: "onselect", type: "(event: CustomEvent<{ selected: TItem[] }>) => void", description: "Select event handler", optional: true, eventDetail: "{ selected: TItem[] }" },
  { name: "onremove", type: "(event: CustomEvent<{ item: TItem; index: number }>) => void", description: "Remove event handler", optional: true, eventDetail: "{ item: TItem; index: number }" },
];
</script>

<script lang="ts" generics="TItem extends string | Record<string, unknown> = string | Record<string, unknown>">
/**
 * @component
 * ChipGroup - A container for managing multiple Chip components.
 * Provides consistent spacing, layout options, selection state, and accessibility.
 *
 * Usage:
 * ```svelte
 * <ChipGroup>
 *   <Chip>Chip 1</Chip>
 *   <Chip>Chip 2</Chip>
 *   <Chip>Chip 3</Chip>
 * </ChipGroup>
 *
 * <ChipGroup variant="primary" removable>
 *   <Chip>JavaScript</Chip>
 *   <Chip>TypeScript</Chip>
 *   <Chip>Svelte</Chip>
 * </ChipGroup>
 *
 * <ChipGroup
 *   items={['Red', 'Green', 'Blue']}
 *   selectable
 *   onselect={handleSelect}
 * >
 *   {#snippet itemTemplate(item, index, selected)}
 *     <Chip clickable selected={selected}>{item}</Chip>
 *   {/snippet}
 * </ChipGroup>
 * ```
 */
import type { Snippet } from "svelte"
import { dispatchGroupRemove } from "../../helpers/groupRemove.js"
import { getItemLabel } from "../../helpers/itemLabel.js"
import Chip from "./Chip.svelte"

interface Props<TItem extends string | Record<string, unknown>> {
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Visual style variant passed to all chips */
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info"
  /** Size passed to all chips (sm, md, lg) */
  size?: "sm" | "md" | "lg"
  /** Whether all chips are removable */
  removable?: boolean
  /** Whether all chips are clickable */
  clickable?: boolean
  /** Whether all chips are selectable */
  selectable?: boolean
  /** Whether multiple chips can be selected */
  multiple?: boolean
  /** Whether all chips are disabled */
  disabled?: boolean
  /** Whether all chips use outline style */
  outline?: boolean
  /** Direction of the chip group (horizontal, vertical) */
  direction?: "horizontal" | "vertical"
  /** Items to render as chips */
  items?: TItem[]
  /** Selected items (controlled). Pass a stable reference or omit for
   *  uncontrolled selection — a fresh array literal each render would
   *  reset internal toggles. */
  selected?: TItem[]
  /** Field used to derive the label when items are objects */
  labelField?: string
  /**
   * Snippet rendered per item. Receives the item, its index, and a boolean
   * indicating whether that item is currently selected in the group, e.g.
   * `{#snippet itemTemplate(item, index, selected)}<Chip selected={selected}>{item}</Chip>{/snippet}`.
   * The selected flag stays in sync with the group's internal selection state
   * (and the controlled `selected` prop), so snippet chips can reflect
   * selection without tracking it themselves.
   *
   * Note: group props (`clickable`, `selectable`, `removable`) apply only to
   * the default fallback — a custom snippet owns the Chip entirely and must
   * apply those interactive props itself.
   */
  itemTemplate?: Snippet<[TItem, number, boolean]>
  /** ARIA label for the chip group */
  ariaLabel?: string
  /** Select event handler */
  onselect?: (event: CustomEvent<{ selected: TItem[] }>) => void
  /** Remove event handler */
  onremove?: (event: CustomEvent<{ item: TItem; index: number }>) => void
  /** Static chip content (rendered when `items` is empty) */
  children?: Snippet
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  variant = "default",
  size = "md",
  removable = false,
  clickable = false,
  selectable = false,
  multiple = false,
  disabled = false,
  outline = false,
  direction = "horizontal",
  items = [],
  selected = [],
  labelField = "label",
  itemTemplate,
  ariaLabel = "Chip group",
  onselect,
  onremove,
  children,
  ...restProps
}: Props<TItem> = $props()

// Component state. Initialize from the controlled `selected` prop so the
// FIRST render already reflects the caller's selection (an effect-only sync
// would render once with `[]` and flip after mount, breaking the
// `itemTemplate` third-arg on initial paint). Capturing the prop value once
// here is intentional — the `$effect` below handles later changes.
// svelte-ignore state_referenced_locally
let selectedItems: TItem[] = $state(Array.isArray(selected) ? [...selected] : [])

// Update selected items when the controlled `selected` prop changes later
$effect(() => {
  selectedItems = Array.isArray(selected) ? [...selected] : []
})

/**
 * Toggles an item's selection state and fires the select event.
 * @param item - The item to toggle
 */
function toggleSelection(item: TItem): void {
  if (!selectable) return
  if (selectedItems.includes(item)) {
    selectedItems = selectedItems.filter((i) => i !== item)
  } else {
    selectedItems = multiple ? [...selectedItems, item] : [item]
  }
  onselect?.(new CustomEvent("select", { detail: { selected: selectedItems } }))
}

/**
 * Handles removing a chip
 * @param index - Index of the chip to remove
 */
function handleRemove(index: number): void {
  dispatchGroupRemove(items, index, "remove", onremove)
}
</script>

<div {...restProps}
  {id}
  class="
    chip-group
    chip-group-{direction}
    {className}
  "
  role={selectable ? "listbox" : "group"}
  aria-label={ariaLabel}
  aria-multiselectable={selectable && multiple ? true : undefined}
>
  {#if items.length > 0}
    {#each items as item, index}
      <div class="chip-group-item">
        {#if itemTemplate}
          {@render itemTemplate(item, index, selectedItems.includes(item))}
        {:else}
          <Chip
            {variant}
            {size}
            {removable}
            clickable={clickable || selectable}
            {disabled}
            selected={selectedItems.includes(item)}
            {outline}
            onclick={() => toggleSelection(item)}
            onremove={() => handleRemove(index)}
          >
            {getItemLabel(item, labelField)}
          </Chip>
        {/if}
      </div>
    {/each}
  {:else}
    {@render children?.()}
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .chip-group {
    @apply flex flex-wrap;
    @apply gap-2;
  }

  .chip-group-horizontal {
    @apply flex-row;
  }

  .chip-group-vertical {
    @apply flex-col;
  }

  .chip-group-item {
    @apply flex-none;
  }
</style>
