/**
 * Breadcrumb context interface shared by Breadcrumb.svelte (provider) and
 * BreadcrumbItem.svelte (consumer). Exported from a dedicated module so both
 * sides can import the same type without circular dependencies.
 */

export interface BreadcrumbContext {
  /** Separator character or HTML between items */
  separator?: string
  /** Whether to collapse middle items when there are too many */
  collapsible?: boolean
  /** Maximum number of middle items to show before collapsing */
  maxVisibleItems?: number
}
