<!--
@component
Container - A base layout component that provides consistent padding, width, and responsive behavior.
Serves as the foundation for other layout components.

Usage:
```svelte
<Container>
  <h1>Content</h1>
</Container>

<Container fluid>
  <p>Full-width content</p>
</Container>
```
-->
<script lang="ts">
import type { Snippet } from "svelte"

interface Props {
  /** If true, container will be full-width */
  fluid?: boolean
  /** Additional CSS classes to apply */
  class?: string
  /** HTML element to render */
  as?: "main" | "section" | "article" | "div" | "header" | "footer" | "nav" | "aside"
  /** ARIA role if needed */
  role?: string | null
  /** ARIA label if needed */
  ariaLabel?: string | null
  /** Container content */
  children?: Snippet
}

const {
  fluid = false,
  class: className = "",
  as = "section",
  role = null,
  ariaLabel = null,
  children = undefined,
}: Props = $props()
</script>

<svelte:element
  this={as}
  class="{fluid ? 'w-full' : 'container mx-auto px-4 sm:px-6 lg:px-8'} {className}"
  {role}
  aria-label={ariaLabel}
>
  {@render children?.()}
</svelte:element>
