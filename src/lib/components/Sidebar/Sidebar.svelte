<!--
@component
Sidebar - A collapsible side panel that attaches to its parent container.
Built on top of the Panel component with additional positioning and animation features.

Usage:
```svelte
<Sidebar>
  <svelte:fragment slot="header">Navigation</svelte:fragment>
  <nav>Menu items here</nav>
</Sidebar>

<Sidebar position="right" expanded={false}>
  <svelte:fragment slot="header">Settings</svelte:fragment>
  Settings content
</Sidebar>
```
-->
<script>
  import { slide } from 'svelte/transition';
  import Panel from '../Panel/Panel.svelte';

  const {
    /** @type {boolean} - Whether the sidebar is expanded */
    expanded = true,
    /** @type {string} - Additional CSS classes */
    class: className = '',
    /** @type {string} - Position of the sidebar */
    position = 'left',
    /** @type {string} - Width of the sidebar when expanded */
    width = '16rem',
    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),
    /** @type {string} - ARIA label */
    ariaLabel,
    /** @type {boolean} - Whether to disable the sidebar controls */
    disabled = false,
    /** @type {boolean} - Whether to show a backdrop when expanded on mobile */
    showBackdrop = true,
    /** @type {boolean} - Whether to float over content on mobile */
    floatOnMobile = true,
    /** @type {boolean} - Whether to dock to viewport instead of parent */
    docked = false
  } = $props();

  let isExpanded = $state(expanded);

  // Handle toggle from Panel
  function handleToggle(event) {
    isExpanded = event.detail.expanded;
    dispatch('toggle', { expanded: isExpanded });
  }

  // Handle backdrop click
  function handleBackdropClick() {
    if (!disabled) {
      isExpanded = false;
      dispatch('toggle', { expanded: isExpanded });
    }
  }

  // Handle escape key
  function handleKeydown(event) {
    if (!disabled && event.key === 'Escape' && isExpanded) {
      isExpanded = false;
      dispatch('toggle', { expanded: isExpanded });
    }
  }

  // Emit events directly
  function dispatch(event, detail) {
    const customEvent = new CustomEvent(event, { detail });
    this?.dispatchEvent(customEvent);
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="
    sidebar-container
    {position === 'right' ? 'sidebar-right' : 'sidebar-left'}
    {floatOnMobile ? 'sidebar-float-mobile' : ''}
    {className}
  "
  style="--sidebar-width: {width}"
  {id}
  role="complementary"
  aria-label={ariaLabel}
>
  {#if showBackdrop && isExpanded}
    <div
      class="sidebar-backdrop"
      onclick={handleBackdropClick}
      transition:slide={{ duration: 200 }}
      aria-hidden="true"
    />
  {/if}

  <div
    class="
      sidebar
      {isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}
    "
    role="region"
    aria-labelledby="{id}-header"
  >
    <Panel
      expanded={isExpanded}
      {disabled}
      bordered={false}
      toggle={handleToggle}
    >
      <svelte:fragment slot="header">
        <slot name="header" />
      </svelte:fragment>
      <slot />
    </Panel>
  </div>
</div>

<style>
  @reference "../../twintrinsic.css";
  .sidebar-container {
    @apply relative;
  }

  /* Base sidebar styles */
  .sidebar {
    @apply h-full bg-background transition-[width,transform] duration-200 ease-in-out;
    width: var(--sidebar-width);
  }

  /* Left position styles */
  .sidebar-left .sidebar {
    @apply left-0;
  }

  .sidebar-left .sidebar-collapsed {
    @apply -translate-x-full;
  }

  /* Right position styles */
  .sidebar-right .sidebar {
    @apply right-0;
  }

  .sidebar-right .sidebar-collapsed {
    @apply translate-x-full;
  }

  /* Backdrop styles */
  .sidebar-backdrop {
    @apply fixed inset-0 bg-black/20 backdrop-blur-sm z-40;
  }

  /* Mobile styles */
  @media (max-width: 640px) {
    .sidebar-float-mobile .sidebar {
      @apply fixed top-0 bottom-0 z-50;
    }

    .sidebar-float-mobile .sidebar-backdrop {
      @apply z-40;
    }
  }

  /* Non-floating mobile styles */
  @media (max-width: 640px) {
    .sidebar:not(.sidebar-float-mobile) {
      @apply w-full;
    }
  }
</style>
