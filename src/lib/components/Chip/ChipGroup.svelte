<!--
@component
ChipGroup - A container for managing multiple Chip components.
Provides consistent spacing, layout options, and keyboard navigation.

Usage:
```svelte
<ChipGroup>
  <Chip>Chip 1</Chip>
  <Chip>Chip 2</Chip>
  <Chip>Chip 3</Chip>
</ChipGroup>

<ChipGroup variant="primary" removable>
  <Chip>JavaScript</Chip>
  <Chip>TypeScript</Chip>
  <Chip>Svelte</Chip>
</ChipGroup>

<ChipGroup 
  items={['Red', 'Green', 'Blue']} 
  let:item 
  selectable 
  onselect={handleSelect}
>
  <Chip>{item}</Chip>
</ChipGroup>
```
-->
<script>
  import { setContext, createEventDispatcher } from 'svelte';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),

    /** @type {string} - Visual style variant passed to all chips */
    variant = 'default',

    /** @type {string} - Size passed to all chips (sm, md, lg) */
    size = 'md',

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
    direction = 'horizontal',

    /** @type {Array} - Items to render as chips */
    items = [],

    /** @type {Array} - Selected items or indices */
    selected = [],

    /** @type {string} - ARIA label for the chip group */
    ariaLabel = 'Chip group',

    children
  } = $props();

  const dispatch = createEventDispatcher();
  
  // Component state
  let selectedItems = $state(Array.isArray(selected) ? [...selected] : []);
  
  // Provide context for child chips
  setContext('chipGroup', {
    variant,
    size,
    removable,
    clickable,
    selectable,
    multiple,
    disabled,
    outline,
    isSelected: (item) => selectedItems.includes(item),
    toggleSelection: (item) => {
      if (selectable) {
        if (selectedItems.includes(item)) {
          // Remove item if already selected
          selectedItems = selectedItems.filter(i => i !== item);
        } else {
          // Add item if not selected
          if (multiple) {
            selectedItems = [...selectedItems, item];
          } else {
            selectedItems = [item];
          }
        }
        dispatch('select', { selected: selectedItems });
      }
    }
  });
  
  /**
   * Handles removing a chip
   * @param {number} index - Index of the chip to remove
   */
  function handleRemove(index) {
    if (items.length > 0) {
      const newItems = [...items];
      const removedItem = newItems.splice(index, 1)[0];
      dispatch('remove', { item: removedItem, index });
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
        <svelte:component
          this={children?.item}
          {item}
          {index}
          variant={variant}
          size={size}
          removable={removable}
          clickable={clickable || selectable}
          disabled={disabled}
          selected={selectedItems.includes(item)}
          outline={outline}
          onclick={() => selectable && !disabled && setContext('chipGroup').toggleSelection(item)}
          onremove={() => handleRemove(index)}
        />
      </div>
    {/each}
  {:else}
    {@render children?.()}
  {/if}
</div>

<style>
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
