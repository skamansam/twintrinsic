<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "selectable", type: "boolean", description: "Whether nodes can be selected", default: "false", optional: true },
  { name: "multiSelect", type: "boolean", description: "Whether multiple nodes can be selected at once", default: "false", optional: true },
  { name: "selected", type: "unknown[]", description: "Array of selected node keys (controlled)", default: "[]", optional: true },
  { name: "expandAll", type: "boolean", description: "Whether to expand all nodes by default", default: "false", optional: true },
  { name: "showIcons", type: "boolean", description: "Whether to show node icons", default: "true", optional: true },
  { name: "showLines", type: "boolean", description: "Whether to show connecting lines between nodes", default: "true", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for the tree", default: "\"Tree\"", optional: true },
  { name: "onselect", type: "(event: CustomEvent<{ selected: unknown[] }>) => void", description: "Callback fired when the selection changes", optional: true, eventDetail: "{ selected: unknown[] }" },
];
</script>

<script lang="ts">
import type { Snippet } from "svelte";
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

interface Props {
  /** Additional props passed through to the root element */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
  /** Additional CSS classes */
  class?: string
  /** HTML id for accessibility */
  id?: string
  /** Whether nodes can be selected */
  selectable?: boolean
  /** Whether multiple nodes can be selected at once */
  multiSelect?: boolean
  /** Array of selected node keys (controlled) */
  selected?: unknown[]
  /** Whether to expand all nodes by default */
  expandAll?: boolean
  /** Whether to show node icons */
  showIcons?: boolean
  /** Whether to show connecting lines between nodes */
  showLines?: boolean
  /** ARIA label for the tree */
  ariaLabel?: string
  /** Callback fired when the selection changes */
  onselect?: (event: CustomEvent<{ selected: unknown[] }>) => void
  children?: Snippet
}

let {
  class: className = "",
  id = crypto.randomUUID(),
  selectable = false,
  multiSelect = false,
  selected = [],
  expandAll = false,
  showIcons = true,
  showLines = true,
  ariaLabel = "Tree",
  onselect,
  children,
  ...restProps
}: Props = $props()

// Derived values for reactive prop access in closures
const derivedSelectable = $derived(selectable)
const derivedMultiSelect = $derived(multiSelect)

// Component state
let selectedNodes: unknown[] = $state([])

// Provide context for child components. Called at init (not in `$effect`) so
// the context is available during server-side rendering.
setContext("tree", {
  get selectable() { return derivedSelectable },
  get multiSelect() { return derivedMultiSelect },
  get showIcons() { return showIcons },
  get showLines() { return showLines },
  get expanded() { return expandAll },
  isSelected: (key: unknown): boolean => selectedNodes.includes(key),
  toggleSelection: (key: unknown): void => {
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

// Update selected state when prop changes
$effect(() => {
  selectedNodes = Array.isArray(selected) ? [...selected] : []
})
</script>

<div {...restProps}
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
