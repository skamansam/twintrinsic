<!--
@component
Badge - A component for displaying small counts, status indicators, or labels.
Provides consistent styling, accessibility features, and various display options.

Usage:
```svelte
<Badge>New</Badge>

<Badge variant="primary" size="lg">42</Badge>

<Badge variant="success" dot>Online</Badge>

<Button>
  Notifications
  <Badge variant="error">5</Badge>
</Button>
```
-->
<script>
  const {
    /** @type {string} - Additional CSS classes */
    class: className = '',

    /** @type {string} - HTML id for accessibility */
    id = crypto.randomUUID(),

    /** @type {string} - Visual style variant */
    variant = 'default',

    /** @type {string} - Size of the badge (sm, md, lg) */
    size = 'md',

    /** @type {boolean} - Whether to show as a dot indicator */
    dot = false,

    /** @type {boolean} - Whether to show as a pill shape */
    pill = false,

    /** @type {boolean} - Whether to show as an outline */
    outline = false,

    /** @type {boolean} - Whether to add a subtle pulse animation */
    pulse = false,

    /** @type {boolean} - Whether to hide when content is empty */
    hideEmpty = false,

    /** @type {boolean} - Whether to position as an absolute overlay */
    overlay = false,

    /** @type {string} - Position when used as overlay (top-right, top-left, etc.) */
    position = 'top-right',

    children
  } = $props();

  // Determine if badge should be hidden
  $derived isEmpty = !children || children().toString().trim() === '';
  $derived isHidden = hideEmpty && isEmpty;
  
  // Determine variant classes
  $derived variantClasses = {
    default: 'bg-muted/20 text-muted dark:bg-muted/20 dark:text-muted',
    primary: 'bg-primary-500 text-white dark:bg-primary-500 dark:text-white',
    secondary: 'bg-secondary-500 text-white dark:bg-secondary-500 dark:text-white',
    success: 'bg-success-500 text-white dark:bg-success-500 dark:text-white',
    warning: 'bg-warning-500 text-white dark:bg-warning-500 dark:text-white',
    error: 'bg-error-500 text-white dark:bg-error-500 dark:text-white',
    info: 'bg-info-500 text-white dark:bg-info-500 dark:text-white'
  }[variant] || 'bg-muted/20 text-muted dark:bg-muted/20 dark:text-muted';
  
  // Determine outline variant classes
  $derived outlineClasses = outline ? {
    default: 'bg-transparent border border-muted text-muted dark:border-muted dark:text-muted',
    primary: 'bg-transparent border border-primary-500 text-primary-500 dark:border-primary-500 dark:text-primary-500',
    secondary: 'bg-transparent border border-secondary-500 text-secondary-500 dark:border-secondary-500 dark:text-secondary-500',
    success: 'bg-transparent border border-success-500 text-success-500 dark:border-success-500 dark:text-success-500',
    warning: 'bg-transparent border border-warning-500 text-warning-500 dark:border-warning-500 dark:text-warning-500',
    error: 'bg-transparent border border-error-500 text-error-500 dark:border-error-500 dark:text-error-500',
    info: 'bg-transparent border border-info-500 text-info-500 dark:border-info-500 dark:text-info-500'
  }[variant] : '';
  
  // Determine size classes
  $derived sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 min-w-4 h-4',
    md: 'text-xs px-2 py-0.5 min-w-5 h-5',
    lg: 'text-sm px-2.5 py-0.5 min-w-6 h-6'
  }[size] || 'text-xs px-2 py-0.5 min-w-5 h-5';
  
  // Determine dot size classes
  $derived dotSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3'
  }[size] || 'w-2.5 h-2.5';
  
  // Determine position classes for overlay
  $derived positionClasses = overlay ? {
    'top-right': 'absolute -top-1 -right-1',
    'top-left': 'absolute -top-1 -left-1',
    'bottom-right': 'absolute -bottom-1 -right-1',
    'bottom-left': 'absolute -bottom-1 -left-1'
  }[position] || 'absolute -top-1 -right-1' : '';
</script>

{#if !isHidden}
  <span
    {id}
    class="
      badge
      {dot ? 'badge-dot' : ''}
      {pill ? 'badge-pill' : ''}
      {pulse ? 'badge-pulse' : ''}
      {overlay ? 'badge-overlay' : ''}
      {outline ? outlineClasses : variantClasses}
      {dot ? dotSizeClasses : sizeClasses}
      {positionClasses}
      {className}
    "
    role={dot ? 'status' : 'status'}
    aria-label={dot ? 'Status indicator' : undefined}
  >
    {#if !dot}
      {@render children?.()}
    {/if}
  </span>
{/if}

<style>
  @reference "../../twintrinsic.css";
  
  .badge {
    @apply inline-flex items-center justify-center;
    @apply font-medium leading-none;
    @apply rounded;
  }
  
  .badge-pill {
    @apply rounded-full;
  }
  
  .badge-dot {
    @apply rounded-full;
    @apply flex-shrink-0;
  }
  
  .badge-overlay {
    @apply z-10;
  }
  
  .badge-pulse {
    animation: badge-pulse 1.5s infinite;
  }
  
  @keyframes badge-pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(var(--color-primary-500-rgb), 0.4);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(var(--color-primary-500-rgb), 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(var(--color-primary-500-rgb), 0);
    }
  }
</style>
