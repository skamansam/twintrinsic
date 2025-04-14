<!--
@component
TagGroup - A component for managing multiple Tag components.
Provides consistent spacing, layout options, and accessibility features.

Usage:
```svelte
<TagGroup>
  <Tag>Tag 1</Tag>
  <Tag>Tag 2</Tag>
  <Tag>Tag 3</Tag>
</TagGroup>

<TagGroup variant="primary" size="lg">
  <Tag>JavaScript</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Svelte</Tag>
</TagGroup>

<TagGroup 
  items={['Red', 'Green', 'Blue']} 
  let:item 
  ondismiss={(e) => handleDismiss(e.detail)}
>
  <Tag dismissible>{item}</Tag>
</TagGroup>
```
-->
<script>
  import { setContext } from 'svelte';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),

    /** @type {string} - Visual style variant passed to all tags */
    variant = 'default',

    /** @type {string} - Size passed to all tags (sm, md, lg) */
    size = 'md',

    /** @type {boolean} - Whether all tags are dismissible */
    dismissible = false,

    /** @type {boolean} - Whether all tags are outlines */
    outline = false,

    /** @type {boolean} - Whether all tags are pills */
    pill = false,

    /** @type {boolean} - Whether all tags are clickable */
    clickable = false,

    /** @type {string} - Direction of the tag group (horizontal, vertical) */
    direction = 'horizontal',

    /** @type {Array} - Items to render as tags */
    items = [],

    /** @type {string} - ARIA label for the tag group */
    ariaLabel = 'Tag group',

    children
  } = $props();

  const dispatch = createEventDispatcher();
  
  // Provide context for child tags
  setContext('tagGroup', {
    variant,
    size,
    dismissible,
    outline,
    pill,
    clickable
  });
  
  /**
   * Handles removing a tag
   * @param {number} index - Index of the tag to remove
   */
  function handleDismiss(index) {
    if (items.length > 0) {
      const removedItem = items[index];
      dispatch('dismiss', { item: removedItem, index });
    }
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
        <svelte:component
          this={children?.item}
          {item}
          {index}
          variant={variant}
          size={size}
          dismissible={dismissible}
          outline={outline}
          pill={pill}
          clickable={clickable}
          ondismiss={() => handleDismiss(index)}
        />
      </div>
    {/each}
  {:else}
    {@render children?.()}
  {/if}
</div>

<style>
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
