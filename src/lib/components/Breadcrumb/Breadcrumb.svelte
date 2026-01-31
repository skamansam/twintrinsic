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
<script lang="ts">
import { setContext } from "svelte"

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

// Provide context for child components
$effect(() => {
  const breadcrumbContext = {
    separator,
    collapsible,
    maxVisibleItems,
  }
  setContext("breadcrumb", breadcrumbContext)
})
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
