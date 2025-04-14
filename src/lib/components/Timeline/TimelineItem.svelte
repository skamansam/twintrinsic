<!--
@component
TimelineItem - An individual item within a Timeline component.
Provides consistent styling, accessibility features, and various display options.

Usage:
```svelte
<TimelineItem title="Event Title">
  Content for the event
</TimelineItem>

<TimelineItem 
  title="Important Milestone" 
  date="January 15, 2023"
  icon="<svg>...</svg>"
  variant="success"
>
  Detailed description of the milestone
</TimelineItem>

<TimelineItem 
  title="Error Occurred" 
  variant="error"
  iconBackground="bg-error-500"
>
  Details about the error
</TimelineItem>
```
-->
<script>
  import { getContext, onMount } from 'svelte';

  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),

    /** @type {string} - Title of the timeline item */
    title,

    /** @type {string} - Subtitle or date of the timeline item */
    date,

    /** @type {string} - Visual style variant */
    variant,

    /** @type {string} - Custom icon (HTML or SVG string) */
    icon,

    /** @type {string} - Background color for the icon */
    iconBackground,

    /** @type {boolean} - Whether the item is the last in the timeline */
    last = false,

    /** @type {boolean} - Whether the item is completed */
    completed = false,

    /** @type {boolean} - Whether the item is currently active */
    active = false,

    /** @type {boolean} - Whether the item is disabled */
    disabled = false,

    /** @type {string} - Position override for this specific item */
    position,

    children
  } = $props();

  // Get timeline context
  const timelineContext = getContext('timeline');
  
  // Component state
  let itemElement;
  let isVisible = $state(false);
  let index = $state(0);
  
  // Determine variant
  const itemVariant = $derived(variant || timelineContext?.variant || 'primary');
  
  // Determine position
  const itemPosition = $derived(position || timelineContext?.position || 'left');
  
  // Determine orientation
  const orientation = $derived(timelineContext?.orientation || 'vertical');
  
  // Determine if connected
  const connected = $derived(timelineContext?.connected !== false);
  
  // Determine if animated
  const animated = $derived(timelineContext?.animated === true);
  
  // Determine effective position based on alternate setting and index
  const effectivePosition = $derived(() => {
    if (itemPosition !== 'alternate') return itemPosition;
    return index % 2 === 0 ? 'left' : 'right';
  });
  
  // Determine variant classes
  const variantClasses = $derived({
    default: 'text-text dark:text-text',
    primary: 'text-primary-500 dark:text-primary-500',
    secondary: 'text-secondary-500 dark:text-secondary-500',
    success: 'text-success-500 dark:text-success-500',
    warning: 'text-warning-500 dark:text-warning-500',
    error: 'text-error-500 dark:text-error-500',
    info: 'text-info-500 dark:text-info-500'
  }[itemVariant] || 'text-primary-500 dark:text-primary-500');
  
  // Determine icon background classes
  const iconBgClasses = $derived(iconBackground || {
    default: 'bg-surface dark:bg-surface',
    primary: 'bg-primary-100 dark:bg-primary-900',
    secondary: 'bg-secondary-100 dark:bg-secondary-900',
    success: 'bg-success-100 dark:bg-success-900',
    warning: 'bg-warning-100 dark:bg-warning-900',
    error: 'bg-error-100 dark:bg-error-900',
    info: 'bg-info-100 dark:bg-info-900'
  }[itemVariant] || 'bg-primary-100 dark:bg-primary-900');
  
  // Determine state classes
  const stateClasses = $derived({
    completed: 'timeline-item-completed',
    active: 'timeline-item-active',
    disabled: 'timeline-item-disabled'
  });
  
  // Register with parent on mount and set up intersection observer
  onMount(() => {
    if (itemElement) {
      // Find our index among siblings
      const parent = itemElement.parentElement;
      if (parent) {
        const items = Array.from(parent.children);
        index = items.indexOf(itemElement);
      }
      
      // Set up intersection observer for animations
      if (animated) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                isVisible = true;
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.2 }
        );
        
        observer.observe(itemElement);
        
        return () => {
          observer.disconnect();
        };
      }
    }
  });
</script>

<div
  {id}
  class="
    timeline-item
    timeline-item-{orientation}
    timeline-item-{effectivePosition}
    {completed ? stateClasses.completed : ''}
    {active ? stateClasses.active : ''}
    {disabled ? stateClasses.disabled : ''}
    {last ? 'timeline-item-last' : ''}
    {animated && !isVisible ? 'timeline-item-hidden' : ''}
    {className}
  "
  role="listitem"
  aria-disabled={disabled ? true : undefined}
  bind:this={itemElement}
>
  <div class="timeline-item-connector">
    <div class="timeline-item-dot {variantClasses} {iconBgClasses}">
      {#if icon}
        <span class="timeline-item-icon">
          {@html icon}
        </span>
      {:else if completed}
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      {/if}
    </div>
    
    {#if connected && !last}
      <div class="timeline-item-line"></div>
    {/if}
  </div>
  
  <div class="timeline-item-content">
    {#if title}
      <div class="timeline-item-header">
        <h3 class="timeline-item-title {variantClasses}">
          {title}
        </h3>
        
        {#if date}
          <div class="timeline-item-date">
            {date}
          </div>
        {/if}
      </div>
    {/if}
    
    <div class="timeline-item-body">
      {@render children?.()}
    </div>
  </div>
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .timeline-item {
    @apply relative;
  }
  
  /* Vertical timeline layout */
  .timeline-item-vertical {
    @apply pb-6;
    @apply flex;
  }
  
  .timeline-item-vertical.timeline-item-last {
    @apply pb-0;
  }
  
  .timeline-item-vertical.timeline-item-left {
    @apply flex-row;
  }
  
  .timeline-item-vertical.timeline-item-right {
    @apply flex-row-reverse;
  }
  
  /* Horizontal timeline layout */
  .timeline-item-horizontal {
    @apply pr-6;
    @apply flex flex-col;
  }
  
  .timeline-item-horizontal.timeline-item-last {
    @apply pr-0;
  }
  
  .timeline-item-horizontal.timeline-item-left {
    @apply flex-col;
  }
  
  .timeline-item-horizontal.timeline-item-right {
    @apply flex-col-reverse;
  }
  
  /* Connector styles */
  .timeline-item-connector {
    @apply flex-shrink-0;
  }
  
  .timeline-item-vertical .timeline-item-connector {
    @apply flex flex-col items-center;
    @apply w-12;
  }
  
  .timeline-item-horizontal .timeline-item-connector {
    @apply flex flex-row items-center;
    @apply h-12;
  }
  
  .timeline-item-dot {
    @apply flex items-center justify-center;
    @apply rounded-full;
    @apply z-10;
    @apply w-6 h-6;
    @apply border-2 border-white dark:border-gray-900;
    @apply transition-colors duration-150;
  }
  
  .timeline-item-icon {
    @apply w-3 h-3;
  }
  
  .timeline-item-line {
    @apply bg-border dark:bg-border;
    @apply flex-grow;
  }
  
  .timeline-item-vertical .timeline-item-line {
    @apply w-0.5;
  }
  
  .timeline-item-horizontal .timeline-item-line {
    @apply h-0.5;
  }
  
  /* Content styles */
  .timeline-item-content {
    @apply flex-grow;
    @apply py-0.5;
  }
  
  .timeline-item-vertical.timeline-item-left .timeline-item-content {
    @apply pl-4;
  }
  
  .timeline-item-vertical.timeline-item-right .timeline-item-content {
    @apply pr-4;
    @apply text-right;
  }
  
  .timeline-item-horizontal.timeline-item-left .timeline-item-content {
    @apply pt-4;
  }
  
  .timeline-item-horizontal.timeline-item-right .timeline-item-content {
    @apply pb-4;
  }
  
  .timeline-item-header {
    @apply mb-2;
  }
  
  .timeline-item-title {
    @apply font-medium text-base;
  }
  
  .timeline-item-date {
    @apply text-sm text-muted dark:text-muted;
  }
  
  .timeline-item-body {
    @apply text-sm text-text dark:text-text;
  }
  
  /* State styles */
  .timeline-item-completed .timeline-item-dot {
    @apply bg-success-100 dark:bg-success-900;
    @apply text-success-500 dark:text-success-500;
  }
  
  .timeline-item-active .timeline-item-dot {
    @apply ring-2 ring-offset-2 ring-primary-500 dark:ring-primary-500;
  }
  
  .timeline-item-disabled {
    @apply opacity-50;
  }
  
  /* Animation styles */
  .timeline-item-hidden {
    @apply opacity-0;
    @apply translate-y-4;
    @apply transition-none;
  }
  
  .timeline-item-vertical.timeline-item-left.timeline-item-hidden {
    @apply -translate-x-4 translate-y-0;
  }
  
  .timeline-item-vertical.timeline-item-right.timeline-item-hidden {
    @apply translate-x-4 translate-y-0;
  }
  
  .timeline-item-horizontal.timeline-item-left.timeline-item-hidden {
    @apply -translate-y-4 translate-x-0;
  }
  
  .timeline-item-horizontal.timeline-item-right.timeline-item-hidden {
    @apply translate-y-4 translate-x-0;
  }
  
  .timeline-item:not(.timeline-item-hidden) {
    @apply opacity-100 translate-x-0 translate-y-0;
    @apply transition-all duration-300 ease-out;
  }
</style>
