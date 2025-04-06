<!--
@component
Panel - A collapsible container with header and content sections.
Provides smooth animations and keyboard accessibility.

Usage:
```svelte
<Panel>
  <svelte:fragment slot="header">Panel Title</svelte:fragment>
  Content goes here
</Panel>

<Panel expanded={false} class="custom-class">
  <svelte:fragment slot="header">
    <Icon name="settings" />
    Settings
  </svelte:fragment>
  Settings content
</Panel>
```
-->
<script>
  import { slide } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  /** @type {boolean} - Whether the panel is expanded */
  export let expanded = true;

  /** @type {string} - Additional CSS classes */
  export let class = '';

  /** @type {string} - HTML id for accessibility */
  export let id = crypto.randomUUID();

  /** @type {string} - ARIA label for the header button */
  export let ariaLabel = undefined;

  /** @type {boolean} - Whether to disable the panel controls */
  export let disabled = false;

  /** @type {boolean} - Whether to show a border */
  export let bordered = true;

  /** @type {boolean} - Whether to show the expand/collapse icon */
  export let showIcon = true;

  // Internal state
  let headerEl;
  let contentEl;

  // Handle toggle
  function handleToggle() {
    if (!disabled) {
      expanded = !expanded;
      dispatch('toggle', { expanded });
    }
  }

  // Handle keyboard navigation
  function handleKeydown(event) {
    if (disabled) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  }
</script>

<div 
  class="
    panel
    {bordered ? 'border border-border rounded-lg' : ''} 
    {class}
  "
  class:disabled
>
  <button
    type="button"
    id="{id}-header"
    class="
      w-full flex items-center justify-between
      px-4 py-3
      text-left
      bg-surface hover:bg-hover
      focus:outline-none focus:ring-2 focus:ring-focus-ring
      disabled:opacity-50 disabled:cursor-not-allowed
      {bordered ? 'rounded-t-lg' : 'rounded-lg'}
    "
    aria-expanded={expanded}
    aria-controls="{id}-content"
    aria-label={ariaLabel}
    {disabled}
    on:click={handleToggle}
    on:keydown={handleKeydown}
    bind:this={headerEl}
  >
    <div class="flex items-center gap-2">
      <slot name="header">Panel</slot>
    </div>

    {#if showIcon}
      <svg
        class="w-5 h-5 transform transition-transform duration-200 {expanded ? 'rotate-180' : ''}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    {/if}
  </button>

  {#if expanded}
    <div
      id="{id}-content"
      class="px-4 py-3 bg-background {bordered ? 'rounded-b-lg' : ''}"
      role="region"
      aria-labelledby="{id}-header"
      transition:slide={{ duration: 200 }}
      bind:this={contentEl}
    >
      <slot />
    </div>
  {/if}
</div>

<style>
  /* Base styles that work with Tailwind */
  .panel {
    @apply overflow-hidden;
  }

  .panel.disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  /* Ensure the content area has proper spacing when collapsed */
  .panel :global(.svelte-collapse-content) {
    @apply overflow-hidden;
  }
</style>
