<!--
@component
TreeNode - An individual node within a Tree component.
Provides consistent styling, accessibility features, and keyboard navigation.

Usage:
```svelte
<TreeNode label="Documents">
  <TreeNode label="Work" />
  <TreeNode label="Personal" />
</TreeNode>

<TreeNode 
  label="Images" 
  icon="<svg>...</svg>"
  expanded
  selected
  disabled
>
  <TreeNode label="Vacation" />
</TreeNode>
```
-->
<script lang="ts">
import { getContext, onMount } from "svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Node key for selection (defaults to id) */
  key = id,

  /** @type {string} - Node label */
  label,

  /** @type {string} - Custom icon (HTML or SVG string) */
  icon,

  /** @type {boolean} - Whether the node is expanded */
  expanded = false,

  /** @type {boolean} - Whether the node is selected */
  selected = false,

  /** @type {boolean} - Whether the node is disabled */
  disabled = false,

  /** @type {boolean} - Whether the node is a leaf (no children) */
  leaf = false,

  /** @type {number} - Indentation level (managed internally) */
  level = 0,

  /** @type {Function} - Custom render function for the label */
  labelRender,

  /** @type {(event: CustomEvent) => void} - Toggle event handler */
  ontoggle,
  /** @type {(event: CustomEvent) => void} - Select event handler */
  onselect,

  children,

  ...restProps
} = $props()

// Get tree context
const treeContext = getContext("tree")

// Derived values for reactive prop access in closures
const derivedExpanded = $derived(expanded)
const derivedSelected = $derived(selected)

// Component state
let isExpanded = $state(derivedExpanded)
let isSelected = $state(derivedSelected)
let hasChildren = $state(false)
let nodeElement

// Update expanded state when prop changes
$effect(() => {
  isExpanded = derivedExpanded
})

// Update selected state from context or prop
$effect(() => {
  if (treeContext?.selectable) {
    isSelected = treeContext.isSelected(key)
  } else {
    isSelected = derivedSelected
  }
})

// Check if node has children
onMount(() => {
  hasChildren = !!children && children().length > 0

  return () => {
    // Cleanup if needed
  }
})

// Determine if node is selectable
const isSelectable = $derived(treeContext?.selectable && !disabled)

// Determine if node should show icons
const showIcons = $derived(treeContext?.showIcons !== false)

// Determine if tree should show lines
const showLines = $derived(treeContext?.showLines !== false)

/**
 * Toggles the expanded state
 * @param {Event} event - Click event
 */
function toggleExpanded(event) {
  if (disabled || !hasChildren) return

  isExpanded = !isExpanded
  ontoggle?.(new CustomEvent("toggle", { detail: { expanded: isExpanded, key } }))

  // Prevent event from triggering selection
  event.stopPropagation()
}

/**
 * Handles click on the node
 */
function handleClick() {
  if (disabled) return

  if (isSelectable) {
    treeContext.toggleSelection(key)
    onselect?.(new CustomEvent("select", { detail: { selected: !isSelected, key } }))
  }
}

/**
 * Handles keydown events for accessibility
 * @param {KeyboardEvent} event - Keydown event
 */
function handleKeyDown(event) {
  if (disabled) return

  switch (event.key) {
    case "Enter":
    case " ":
      // Select node
      if (isSelectable) {
        treeContext.toggleSelection(key)
        onselect?.(new CustomEvent("select", { detail: { selected: !isSelected, key } }))
        event.preventDefault()
      }
      break

    case "ArrowRight":
      // Expand node if collapsed
      if (hasChildren && !isExpanded) {
        isExpanded = true
        ontoggle?.(new CustomEvent("toggle", { detail: { expanded: true, key } }))
        event.preventDefault()
      }
      break

    case "ArrowLeft":
      // Collapse node if expanded
      if (hasChildren && isExpanded) {
        isExpanded = false
        ontoggle?.(new CustomEvent("toggle", { detail: { expanded: false, key } }))
        event.preventDefault()
      }
      break
  }
}
</script>

<div
  {id}
  class="
    tree-node
    {isSelected ? 'tree-node-selected' : ''}
    {disabled ? 'tree-node-disabled' : ''}
    {hasChildren ? 'tree-node-parent' : 'tree-node-leaf'}
    {className}
  "
  style="--tree-node-level: {level};"
  bind:this={nodeElement}
>
  <div
    class="
      tree-node-content
      {isSelectable ? 'tree-node-selectable' : ''}
    "
    role="treeitem"
    aria-expanded={hasChildren ? isExpanded : undefined}
    aria-selected={isSelectable ? isSelected : undefined}
    aria-disabled={disabled ? true : undefined}
    tabindex={disabled ? undefined : 0}
    onclick={handleClick}
    onkeydown={handleKeyDown}
  >
    {#if showLines}
      <div class="tree-node-lines"></div>
    {/if}
    
    <div class="tree-node-inner">
      {#if hasChildren}
        <button
          type="button"
          class="tree-node-toggle"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          onclick={toggleExpanded}
          tabindex="-1"
          disabled={disabled}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d={isExpanded ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
            ></path>
          </svg>
        </button>
      {:else}
        <div class="tree-node-spacer"></div>
      {/if}
      
      {#if showIcons}
        <div class="tree-node-icon">
          {#if icon}
            {@html icon}
          {:else if hasChildren}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
          {:else}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          {/if}
        </div>
      {/if}
      
      <div class="tree-node-label">
        {#if labelRender}
          {@render labelRender()}
        {:else}
          {label}
        {/if}
      </div>
    </div>
  </div>
  
  {#if hasChildren && isExpanded}
    <div class="tree-node-children" role="group">
      <svelte:self {...restProps} level={level + 1}>
        {@render children?.()}
      </svelte:self>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .tree-node {
    @apply w-full;
  }
  
  .tree-node-content {
    @apply flex items-center;
    @apply py-1 px-2 rounded-md;
    @apply text-text dark:text-text;
    @apply transition-colors duration-150;
  }
  
  .tree-node-selectable {
    @apply cursor-pointer;
    @apply hover:bg-hover dark:hover:bg-hover;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
  }
  
  .tree-node-selected > .tree-node-content {
    @apply bg-primary-50 dark:bg-primary-900/20;
    @apply text-primary-700 dark:text-primary-300;
  }
  
  .tree-node-disabled {
    @apply opacity-50 cursor-not-allowed;
    @apply pointer-events-none;
  }
  
  .tree-node-inner {
    @apply flex items-center;
    @apply min-w-0;
  }
  
  .tree-node-toggle {
    @apply flex items-center justify-center;
    @apply w-5 h-5 mr-1;
    @apply text-muted dark:text-muted;
    @apply hover:text-text dark:hover:text-text;
    @apply rounded-sm;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply transition-colors duration-150;
  }
  
  .tree-node-spacer {
    @apply w-5 h-5 mr-1;
  }
  
  .tree-node-icon {
    @apply flex-shrink-0 mr-2;
    @apply text-muted dark:text-muted;
  }
  
  .tree-node-label {
    @apply flex-grow truncate;
  }
  
  .tree-node-children {
    @apply pl-5;
  }
  
  /* Lines for tree visualization */
  .tree-node-lines {
    @apply absolute left-0;
    @apply border-l border-dashed border-border dark:border-border;
    @apply h-full;
    @apply -ml-4;
  }
  
  .tree-with-lines .tree-node-children {
    @apply relative;
  }
</style>
