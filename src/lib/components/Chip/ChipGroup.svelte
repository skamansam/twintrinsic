<script lang="ts">
/**
 * @component
 * ChipGroup - A container for managing multiple Chip components.
 * Provides consistent spacing, layout options, and keyboard navigation.
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
 *   let:item
 *   selectable
 *   onselect={handleSelect}
 * >
 *   <Chip>{item}</Chip>
 * </ChipGroup>
 * ```
 */
import { getContext, setContext, type Component } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Visual style variant passed to all chips */
  variant = "default",

  /** @type {string} - Size passed to all chips (sm, md, lg) */
  size = "md",

  /** @type {boolean} - Whether all chips are removable */
  removable = false,

  /** @type {boolean} - Whether all chips are clickable */
  clickable = false,

  /** @type {boolean} - Whether all chips are selectable */
  selectable = false,

  /** @type {boolean} - Whether multiple chips can be selected */
  multiple = false,

  /** @type {boolean} - Whether all chips are disabled */
  disabled = false,

  /** @type {boolean} - Whether all chips use outline style */
  outline = false,

  /** @type {string} - Direction of the chip group (horizontal, vertical) */
  direction = "horizontal",

  /** @type {Array} - Items to render as chips */
  items = [],

  /** @type {Array} - Selected items or indices */
  selected = [],

  /** @type {string} - ARIA label for the chip group */
  ariaLabel = "Chip group",

  /** @type {(event: CustomEvent) => void} - Select event handler */
  onselect,
  /** @type {(event: CustomEvent) => void} - Remove event handler */
  onremove,

  children,
} = $props()

// Component state
let selectedItems: unknown[] = $state([])

let ItemTemplate: Component | null = $state(null)
$effect(() => {
	ItemTemplate = (children?.item ?? null) as Component | null
})

// Update selected items when prop changes
$effect(() => {
  selectedItems = Array.isArray(selected) ? [...(selected as unknown[])] : []
})

// Provide context for child chips (wrapped in getters so prop changes propagate)
$effect(() => {
  setContext("chipGroup", {
    get variant() { return variant },
    get size() { return size },
    get removable() { return removable },
    get clickable() { return clickable },
    get selectable() { return selectable },
    get multiple() { return multiple },
    get disabled() { return disabled },
    get outline() { return outline },
    isSelected: (item: unknown): boolean => selectedItems.includes(item as never),
    toggleSelection: (item: unknown): void => {
      if (selectable) {
        if (selectedItems.includes(item as never)) {
          // Remove item if already selected
          selectedItems = selectedItems.filter((i) => i !== item)
        } else {
          // Add item if not selected
          if (multiple) {
            selectedItems = [...selectedItems, item as never]
          } else {
            selectedItems = [item as never]
          }
        }
        onselect?.(new CustomEvent("select", { detail: { selected: selectedItems } }))
      }
    },
  })
})

/**
 * Handles removing a chip
 * @param {number} index - Index of the chip to remove
 */
function handleRemove(index: number): void {
  if (items.length > 0) {
    const newItems = [...items]
    const removedItem = newItems.splice(index, 1)[0]
    onremove?.(new CustomEvent("remove", { detail: { item: removedItem, index } }))
  }
}
</script>

<div
  {id}
  class="
    chip-group
    chip-group-{direction}
    {className}
  "
  role={selectable ? 'listbox' : 'group'}
  aria-label={ariaLabel}
  aria-multiselectable={selectable && multiple ? true : undefined}
>
  {#if items.length > 0}
    {#each items as item, index}
      <div class="chip-group-item">
        {#if ItemTemplate}
          {@const ItemCtor = ItemTemplate}
          <ItemCtor
            {item}
            {index}
            {variant}
            {size}
            {removable}
            clickable={clickable || selectable}
            {disabled}
            selected={selectedItems.includes(item as never)}
            {outline}
            onclick={() => selectable && !disabled && (getContext<{ toggleSelection: (item: unknown) => void }>('chipGroup')?.toggleSelection(item))}
            onremove={() => handleRemove(index)}
          />
        {:else}
          {@render children?.()}
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
