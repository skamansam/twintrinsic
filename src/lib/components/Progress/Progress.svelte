<!--
@component
Progress - A component for displaying progress bars and indicators.
Provides consistent styling, accessibility features, and various display options.

Usage:
```svelte
<Progress value={75} />

<Progress 
  value={42} 
  max={100} 
  variant="primary" 
  showValue 
/>

<Progress 
  value={0.8} 
  max={1} 
  variant="success" 
  size="lg" 
  format={(v) => `${Math.round(v * 100)}%`} 
/>
```
-->
<script>
const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {number} - Current value */
  value = 0,

  /** @type {number} - Maximum value */
  max = 100,

  /** @type {number} - Minimum value */
  min = 0,

  /** @type {string} - Visual style variant */
  variant = "primary",

  /** @type {string} - Size of the progress bar (sm, md, lg) */
  size = "md",

  /** @type {boolean} - Whether to show the value as text */
  showValue = false,

  /** @type {boolean} - Whether to show the value inside the progress bar */
  valueInside = false,

  /** @type {boolean} - Whether to show a striped pattern */
  striped = false,

  /** @type {boolean} - Whether to animate the striped pattern */
  animated = false,

  /** @type {boolean} - Whether to show an indeterminate loading animation */
  indeterminate = false,

  /** @type {Function} - Custom function to format the displayed value */
  format,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel,
} = $props()

// Calculate percentage for width
const percentage = $derived(Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)))

// Format value for display
const formattedValue = $derived(format ? format(value, min, max) : `${Math.round(percentage)}%`)

// Determine size classes
const sizeClasses = $derived(
  {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  }[size] || "h-2.5"
)

// Determine text size classes
const textSizeClasses = $derived(
  {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size] || "text-sm"
)

// Determine variant classes
const variantClasses = $derived(
  {
    default: "bg-muted/20 dark:bg-muted/20",
    primary: "bg-primary-500 dark:bg-primary-500",
    secondary: "bg-secondary-500 dark:bg-secondary-500",
    success: "bg-success-500 dark:bg-success-500",
    warning: "bg-warning-500 dark:bg-warning-500",
    error: "bg-error-500 dark:bg-error-500",
    info: "bg-info-500 dark:bg-info-500",
  }[variant] || "bg-primary-500 dark:bg-primary-500"
)

// Determine track classes
const trackClasses = $derived("bg-muted/10 dark:bg-muted/10")

// Generate ARIA label
const progressAriaLabel = $derived(ariaLabel || `Progress: ${formattedValue}`)
</script>

<div 
  class="progress-container {className}"
>
  {#if showValue && !valueInside}
    <div class="progress-label {textSizeClasses}">
      {formattedValue}
    </div>
  {/if}
  
  <div
    {id}
    class="
      progress
      {sizeClasses}
      {trackClasses}
    "
    role="progressbar"
    aria-valuenow={indeterminate ? undefined : value}
    aria-valuemin={min}
    aria-valuemax={max}
    aria-label={progressAriaLabel}
  >
    <div
      class="
        progress-bar
        {variantClasses}
        {striped ? 'progress-striped' : ''}
        {animated ? 'progress-animated' : ''}
        {indeterminate ? 'progress-indeterminate' : ''}
      "
      style={indeterminate ? '' : `width: ${percentage}%`}
    >
      {#if showValue && valueInside}
        <span class="progress-value {textSizeClasses}">
          {formattedValue}
        </span>
      {/if}
    </div>
  </div>
</div>

<style>
  @reference "../../twintrinsic.css";
  
  .progress-container {
    @apply w-full;
  }
  
  .progress-label {
    @apply mb-1 font-medium text-text dark:text-text;
  }
  
  .progress {
    @apply w-full overflow-hidden rounded-full;
  }
  
  .progress-bar {
    @apply h-full rounded-full transition-all duration-300 ease-out;
  }
  
  .progress-value {
    @apply text-white dark:text-white font-medium px-2;
    @apply flex items-center h-full;
  }
  
  .progress-striped {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
  }
  
  .progress-animated {
    animation: progress-stripes 1s linear infinite;
  }
  
  .progress-indeterminate {
    width: 50%;
    animation: progress-indeterminate 1.5s ease-in-out infinite;
  }
  
  @keyframes progress-stripes {
    from {
      background-position: 1rem 0;
    }
    to {
      background-position: 0 0;
    }
  }
  
  @keyframes progress-indeterminate {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(200%);
    }
  }
</style>
