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
<script>
  /** @type {boolean} - If true, container will be full-width */
  export let fluid = false;
  
  /** @type {string} - Additional CSS classes to apply */
  export let class = '';
  
  /** @type {"main" | "section" | "article" | "div"} - HTML element to render */
  export let as = 'div';
  
  /** @type {string} - ARIA role if needed */
  export let role = undefined;
  
  /** @type {string} - ARIA label if needed */
  export let ariaLabel = undefined;
</script>

<svelte:element 
  this={as}
  class="
    {fluid ? 'w-full' : 'container mx-auto px-4 sm:px-6 lg:px-8'} 
    {class}
  "
  role={role}
  aria-label={ariaLabel}
>
  <slot />
</svelte:element>
