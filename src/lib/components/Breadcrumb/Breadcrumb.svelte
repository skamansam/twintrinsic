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
  { name: "items", type: "BreadcrumbItem[] | undefined", description: "Flat array of breadcrumb items", optional: true },
];
</script>

<script lang="ts">
import { setContext } from "svelte"
import type { BreadcrumbContext } from "./breadcrumbContext.js"
import Icon from "../Icon/Icon.svelte"

interface BreadcrumbItem {
  /** Display name */
  name: string
  /** Optional icon name (renders via Icon component) */
  icon?: string
  /** Optional link URL (renders as <a>) */
  link?: string
}

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

  /** @type {BreadcrumbItem[] | undefined} - Flat array of breadcrumb items */
  items = undefined,

  children = undefined,
  ...restProps
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

<nav {...restProps}
  {id}
  class="breadcrumb {className}"
  aria-label={ariaLabel}
>
  <ol class="breadcrumb-list">
    {#if items && items.length > 0}
      {@const total = items.length}
      {@const shouldCollapse = collapsible && total > maxVisibleItems + 2}
      {#each items as item, i}
        {@const isFirst = i === 0}
        {@const isLast = i === total - 1}
        {@const isMiddleHidden = shouldCollapse && !isFirst && !isLast && i > maxVisibleItems}
        {@const showEllipsis = shouldCollapse && i === maxVisibleItems && !isFirst && !isLast}

        {#if showEllipsis}
          <li class="breadcrumb-item">
            <span class="breadcrumb-ellipsis" role="button" tabindex="0" aria-label="Show hidden breadcrumb items">
              <span aria-hidden="true">&hellip;</span>
            </span>
            <span class="breadcrumb-separator" aria-hidden="true">{@html separator}</span>
          </li>
        {/if}

        {#if !isMiddleHidden || isFirst || isLast}
          <li class="breadcrumb-item" aria-current={isLast ? 'page' : undefined}>
            {#if item.link && !isLast}
              <a href={item.link} class="breadcrumb-link">
                {#if item.icon}
                  <span class="breadcrumb-icon" aria-hidden="true"><Icon name={item.icon} width="16px" height="16px" /></span>
                {/if}
                <span class="breadcrumb-text">{item.name}</span>
              </a>
            {:else}
              <span class="breadcrumb-text {isLast ? 'font-medium text-text dark:text-text' : ''}">
                {#if item.icon}
                  <span class="breadcrumb-icon" aria-hidden="true"><Icon name={item.icon} width="16px" height="16px" /></span>
                {/if}
                {item.name}
              </span>
            {/if}
            {#if !isLast}
              <span class="breadcrumb-separator" aria-hidden="true">{@html separator}</span>
            {/if}
          </li>
        {/if}
      {/each}
    {:else}
      {@render children?.()}
    {/if}
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

  .breadcrumb-ellipsis {
    @apply inline-flex items-center justify-center w-6 h-6;
    @apply text-muted hover:text-primary-600 dark:hover:text-primary-400;
    @apply cursor-pointer rounded hover:bg-hover;
    @apply transition-colors duration-150;
  }
</style>
