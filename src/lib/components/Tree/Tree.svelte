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
  { name: "items", type: `TreeNodeData[]`, description: "Nested data array for data-driven rendering (alternative to TreeNode sub-components)", optional: true },
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
import Icon from "../Icon/Icon.svelte";

/** Data item for the data-driven `items` prop */
export type TreeNodeData = {
  /** Unique key for the node */
  key: string
  /** Display label */
  label: string
  /** Icon name for the Icon component (e.g., 'tabler:folder') */
  icon?: string
  /** Whether the node is disabled */
  disabled?: boolean
  /** Whether the node is expanded by default */
  expanded?: boolean
  /** Nested child items */
  children?: TreeNodeData[]
}

interface Props {
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
  /** Nested data array for data-driven rendering (alternative to TreeNode sub-components) */
  items?: TreeNodeData[]
  /** Callback fired when the selection changes */
  onselect?: (event: CustomEvent<{ selected: unknown[] }>) => void
  /** Additional props passed through to the root element */
  [key: `data-${string}`]: unknown
  [key: `aria-${string}`]: string | undefined
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
  items = undefined,
  onselect,
  children,
  ...restProps
}: Props = $props()

// Derived values for reactive prop access in closures
const derivedSelectable = $derived(selectable || multiSelect)
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

/** Track expanded state for data-driven items */
let expandedKeys: Record<string, boolean> = $state({})

/** Toggle a data-driven node's expanded state */
function toggleDataNode(nodeKey: string): void {
  expandedKeys[nodeKey] = !expandedKeys[nodeKey]
}

/** Handle data-driven node click for selection */
function handleDataNodeSelect(nodeKey: string): void {
  if (!derivedSelectable) return
  if (selectedNodes.includes(nodeKey)) {
    if (derivedMultiSelect) {
      selectedNodes = selectedNodes.filter((k) => k !== nodeKey)
    }
  } else {
    if (derivedMultiSelect) {
      selectedNodes = [...selectedNodes, nodeKey]
    } else {
      selectedNodes = [nodeKey]
    }
  }
  onselect?.(new CustomEvent("select", { detail: { selected: selectedNodes } }))
}

// Helper: check if a node or its descendants contain a selected key
function nodeOrDescendantSelected(node: TreeNodeData): boolean {
  if (selectedNodes.includes(node.key)) return true
  return node.children?.some((c) => nodeOrDescendantSelected(c)) ?? false
}
</script>

{#snippet dataTreeNode(node: TreeNodeData, level: number)}
  {@const hasKids = node.children && node.children.length > 0}
  {@const isExpanded = expandedKeys[node.key] ?? node.expanded ?? expandAll}
  {@const isSelectedNode = selectedNodes.includes(node.key)}
  {@const isSelectableNode = derivedSelectable && !node.disabled}

  <div class="tree-node {node.disabled ? 'tree-node-disabled' : ''} {isSelectedNode ? 'tree-node-selected-inner' : ''}">
    <div
      class="tree-node-content {isSelectableNode ? 'tree-node-selectable' : ''}"
      role="treeitem"
      aria-expanded={hasKids ? isExpanded : undefined}
      aria-selected={isSelectableNode ? isSelectedNode : undefined}
      aria-disabled={node.disabled ? true : undefined}
      tabindex={node.disabled ? undefined : 0}
      onclick={() => {
        if (hasKids) toggleDataNode(node.key)
        handleDataNodeSelect(node.key)
      }}
      onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (hasKids) toggleDataNode(node.key)
          handleDataNodeSelect(node.key)
        }
      }}
    >
      <div class="tree-node-inner" style="padding-left: {level * 1.25}rem;">
        {#if hasKids}
          <button
            type="button"
            class="tree-node-toggle"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            onclick={(e) => { e.stopPropagation(); toggleDataNode(node.key) }}
            tabindex="-1"
            disabled={node.disabled}
          >
            <Icon name={isExpanded ? 'tabler:chevron-down' : 'tabler:chevron-right'} class="w-4 h-4" />
          </button>
        {:else}
          <div class="tree-node-spacer"></div>
        {/if}

        {#if showIcons}
          <div class="tree-node-icon">
            {#if node.icon}
              <Icon name={node.icon} class="w-5 h-5" />
            {:else if hasKids}
              <Icon name="tabler:folder" class="w-5 h-5" />
            {:else}
              <Icon name="tabler:file" class="w-5 h-5" />
            {/if}
          </div>
        {/if}

        <div class="tree-node-label">{node.label}</div>
      </div>
    </div>

    {#if hasKids && isExpanded}
      <div class="tree-node-children" role="group">
        {#each node.children as child}
          {@render dataTreeNode(child, level + 1)}
        {/each}
      </div>
    {/if}
  </div>
{/snippet}

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
  {#if items}
    {#each items as node}
      {@render dataTreeNode(node, 0)}
    {/each}
  {:else}
    {@render children?.()}
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  .tree {
    @apply w-full;
  }

  /* Data-driven tree node styles (mirrors TreeNode.svelte) */
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
  .tree-node-selected-inner > .tree-node-content {
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
</style>
