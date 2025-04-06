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
  const {
    /** @type {boolean} - If true, container will be full-width */
    fluid = false,
    
    /** @type {string} - Additional CSS classes to apply */
    class: className = '',
    
    /** @type {"main" | "section" | "article" | "div"} - HTML element to render */
    as = 'div',
    
    /** @type {string} - ARIA role if needed */
    role,
    
    /** @type {string} - ARIA label if needed */
    ariaLabel
  } = $props();
</script>

<svelte:element 
  this={as}
  class="{fluid ? 'w-full' : 'container mx-auto px-4 sm:px-6 lg:px-8'} {className}"
  {role}
  aria-label={ariaLabel}
>
  {@render children()}
</svelte:element>
