<!--
@component
Breadcrumb - A navigation component that helps users understand their location in a website or application.
Provides a hierarchical trail of links with proper accessibility features.

Usage:
```svelte
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumb>

<Breadcrumb separator="/">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Documentation</BreadcrumbItem>
  <BreadcrumbItem>Components</BreadcrumbItem>
</Breadcrumb>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "separator", type: "string", description: "Separator character or HTML between items", default: "\"/\"", optional: true },
  { name: "ariaLabel", type: "string", description: "ARIA label for the breadcrumb", default: "\"Breadcrumb\"", optional: true },
  { name: "collapsible", type: "boolean", description: "Whether to collapse long breadcrumbs with ellipsis", default: "false", optional: true },
  { name: "maxVisibleItems", type: "number", description: "Maximum visible items when collapsed (excluding first and last)", default: "1", optional: true },
];
</script>

<script lang="ts">
import { setContext } from "svelte"
import type { BreadcrumbContext } from "./breadcrumbContext.js"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Separator character or HTML between items */
  separator = "/",

  /** @type {string} - ARIA label for the breadcrumb */
  ariaLabel = "Breadcrumb",

  /** @type {boolean} - Whether to collapse long breadcrumbs with ellipsis */
  collapsible = false,

  /** @type {number} - Maximum visible items when collapsed (excluding first and last) */
  maxVisibleItems = 1,

  children,
} = $props()

// Provide context for child components. Called at init (not in `$effect`) so
// the context is available during server-side rendering.
const breadcrumbContext: BreadcrumbContext = {
  get separator() {
    return separator
  },
  get collapsible() {
    return collapsible
  },
  get maxVisibleItems() {
    return maxVisibleItems
  },
}
setContext<BreadcrumbContext>("breadcrumb", breadcrumbContext)
</script>

<nav
  {id}
  class="breadcrumb {className}"
  aria-label={ariaLabel}
>
  <ol class="breadcrumb-list">
    {@render children?.()}
  </ol>
</nav>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .breadcrumb {
    @apply w-full;
  }
  
  .breadcrumb-list {
    @apply flex flex-wrap items-center;
  }
</style>
