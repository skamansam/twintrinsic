<script lang="ts">
/**
 * @component
 * Tree - A component for displaying hierarchical data with expandable nodes.
 * Provides consistent styling, accessibility features, and keyboard navigation.
 *
 * Usage:
 * ```svelte
 * <Tree>
 *   <TreeNode label="Root">
 *     <TreeNode label="Child 1" />
 *     <TreeNode label="Child 2">
 *       <TreeNode label="Grandchild 1" />
 *       <TreeNode label="Grandchild 2" />
 *     </TreeNode>
 *   </TreeNode>
 * </Tree>
 *
 * <Tree
 *   selectable
 *   multiSelect
 *   onselect={handleSelect}
 * >
 *   <TreeNode 
 *     label="Documents" 
 *     icon="<svg>...</svg>"
 *     expanded
 *   >
 *     <TreeNode label="Work" />
 *     <TreeNode label="Personal" />
 *   </TreeNode>
 * </Tree>
 * ```
 */
import { setContext } from "svelte";

const {
  class: className = "",
  id = crypto.randomUUID(),
  selectable = false,
  multiSelect = false,
  selected = [],
  showIcons = true,
  showLines = true,
  ariaLabel = "Tree",
  onselect,
  children,
} = $props()

// Derived values for reactive prop access in closures
const derivedSelectable = $derived(selectable)
const derivedMultiSelect = $derived(multiSelect)

// Component state
let selectedNodes = $state(/** @type {any[]} */ ([]))

// Provide context for child components
$effect(() => {
  setContext("tree", {
    get selectable() { return derivedSelectable },
    get multiSelect() { return derivedMultiSelect },
    showIcons,
    showLines,
    isSelected: (key) => selectedNodes.includes(key),
    toggleSelection: (key) => {
      if (derivedSelectable) {
        if (selectedNodes.includes(key)) {
          // Remove if already selected
          if (derivedMultiSelect) {
            selectedNodes = selectedNodes.filter((k) => k !== key)
          } else {
            // For single select, clicking the selected item again doesn't deselect it
          }
        } else {
          // Add if not selected
          if (multiSelect) {
            selectedNodes = [...selectedNodes, key]
          } else {
            selectedNodes = [key]
          }
        }

        onselect?.(new CustomEvent("select", { detail: { selected: selectedNodes } }))
      }
    },
  })
})

// Update selected state when prop changes
$effect(() => {
  selectedNodes = Array.isArray(selected) ? [...selected] : []
})
</script>

<div
  {id}
  class="
    tree
    {showLines ? 'tree-with-lines' : ''}
    {className}
  "
  role="tree"
  aria-label={ariaLabel}
  aria-multiselectable={multiSelect}
>
  {@render children?.()}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .tree {
    @apply w-full;
  }
</style>
