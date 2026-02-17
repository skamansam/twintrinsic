<!--
@component
Progress - A component for displaying progress bars using native HTML progress element.
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
<script lang="ts">
const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {number} - Current value */
  value = 0,

  /** @type {number} - Maximum value */
  max = 100,

  /** @type {string} - Visual style variant */
  variant = "primary",

  /** @type {string} - Size of the progress bar (sm, md, lg) */
  size = "md",

  /** @type {boolean} - Whether to show the value as text */
  showValue = false,

  /** @type {boolean} - Whether to show striped pattern */
  striped = false,

  /** @type {boolean} - Whether to animate the stripes */
  animated = false,

  /** @type {boolean} - Whether to show indeterminate loading state */
  indeterminate = false,

  /** @type {Function} - Custom function to format the displayed value */
  format = undefined,

  /** @type {string} - ARIA label for accessibility */
  ariaLabel = undefined,
} = $props()

const isIndeterminate = $derived(indeterminate)

const percentage = $derived(isIndeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100)))

const formattedValue = $derived(isIndeterminate ? "Loading..." : (format ? format(value, max) : `${Math.round(percentage)}%`))

const stripedClasses = $derived(striped ? "progress-striped" : "")

const animatedClasses = $derived(animated && striped ? "progress-animated" : "")

const sizeClasses = $derived(
  {
    sm: "progress-sm",
    md: "progress-md",
    lg: "progress-lg",
  }[size] || "progress-md"
)

const variantClasses = $derived(
  {
    default: "progress-default",
    primary: "progress-primary",
    secondary: "progress-secondary",
    success: "progress-success",
    warning: "progress-warning",
    error: "progress-error",
    info: "progress-info",
  }[variant] || "progress-primary"
)

const progressAriaLabel = $derived(ariaLabel || `Progress: ${formattedValue}`)
</script>

<div class="progress-container {className}">
  {#if showValue}
    <div class="progress-label">
      {formattedValue}
    </div>
  {/if}
  
  <progress
    {id}
    value={isIndeterminate ? undefined : value}
    {max}
    aria-label={progressAriaLabel}
    class="progress {sizeClasses} {variantClasses} {stripedClasses} {animatedClasses}"
  >
    {formattedValue}
  </progress>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .progress-container {
    @apply w-full flex flex-col gap-2;
  }
  
  .progress-label {
    @apply text-sm font-medium text-text dark:text-text;
  }
  
  .progress {
    @apply w-full appearance-none;
    @apply accent-primary-500;
    @apply border-none outline-none;
  }

  /* WebKit (Chrome, Safari, Edge) */
  .progress::-webkit-progress-bar {
    @apply w-full h-2 rounded-full;
    @apply bg-muted/20 dark:bg-muted/20;
    @apply border-none outline-none;
  }
  
  .progress::-webkit-progress-value {
    @apply h-2 rounded-full;
    @apply bg-primary-500 dark:bg-primary-500;
  }
  
  /* Firefox */
  .progress::-moz-progress-bar {
    @apply h-2 rounded-full;
    @apply bg-primary-500 dark:bg-primary-500;
  }
  
  /* Size variants */
  .progress-sm {
    @apply h-1.5;
  }
  
  .progress-sm::-webkit-progress-bar {
    @apply h-1.5;
  }
  
  .progress-md {
    @apply h-2;
  }
  
  .progress-md::-webkit-progress-bar {
    @apply h-2;
  }
  
  .progress-lg {
    @apply h-3;
  }
  
  .progress-lg::-webkit-progress-bar {
    @apply h-3;
  }
  
  /* Variant colors */
  .progress-default {
    @apply accent-muted;
  }
  
  .progress-default::-webkit-progress-value {
    @apply bg-muted dark:bg-muted;
  }
  
  .progress-default::-moz-progress-bar {
    @apply bg-muted dark:bg-muted;
  }
  
  .progress-primary {
    @apply accent-primary-500;
  }
  
  .progress-primary::-webkit-progress-value {
    @apply bg-primary-500 dark:bg-primary-500;
  }
  
  .progress-primary::-moz-progress-bar {
    @apply bg-primary-500 dark:bg-primary-500;
  }
  
  .progress-secondary {
    @apply accent-secondary-500;
  }
  
  .progress-secondary::-webkit-progress-value {
    @apply bg-secondary-500 dark:bg-secondary-500;
  }
  
  .progress-secondary::-moz-progress-bar {
    @apply bg-secondary-500 dark:bg-secondary-500;
  }
  
  .progress-success {
    @apply accent-success-500;
  }
  
  .progress-success::-webkit-progress-value {
    @apply bg-success-500 dark:bg-success-500;
  }
  
  .progress-success::-moz-progress-bar {
    @apply bg-success-500 dark:bg-success-500;
  }
  
  .progress-warning {
    @apply accent-warning-500;
  }
  
  .progress-warning::-webkit-progress-value {
    @apply bg-warning-500 dark:bg-warning-500;
  }
  
  .progress-warning::-moz-progress-bar {
    @apply bg-warning-500 dark:bg-warning-500;
  }
  
  .progress-error {
    @apply accent-error-500;
  }
  
  .progress-error::-webkit-progress-value {
    @apply bg-error-500 dark:bg-error-500;
  }
  
  .progress-error::-moz-progress-bar {
    @apply bg-error-500 dark:bg-error-500;
  }
  
  .progress-info {
    @apply accent-info-500;
  }
  
  .progress-info::-webkit-progress-value {
    @apply bg-info-500 dark:bg-info-500;
  }
  
  .progress-info::-moz-progress-bar {
    @apply bg-info-500 dark:bg-info-500;
  }

  /* Striped pattern */
  .progress-striped::-webkit-progress-value {
    background-image: 
      linear-gradient(
        -45deg,
        transparent 33%,
        rgba(0, 0, 0, 0.1) 33%,
        rgba(0, 0, 0, 0.1) 66%,
        transparent 66%
      );
    background-size: 35px 20px;
    background-position: 0 0;
  }

  .progress-striped::-moz-progress-bar {
    background-image: 
      linear-gradient(
        -45deg,
        transparent 33%,
        rgba(0, 0, 0, 0.1) 33%,
        rgba(0, 0, 0, 0.1) 66%,
        transparent 66%
      );
    background-size: 35px 20px;
    background-position: 0 0;
  }

  /* Animated stripes */
  @keyframes progress-stripes {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 35px 0;
    }
  }

  .progress-animated {
    /* animation: progress-stripes 1s linear infinite; */
  }

  .progress-animated::-webkit-progress-value {
    background-image: 
      linear-gradient(
        -45deg,
        transparent 33%,
        rgba(0, 0, 0, 0.1) 33%,
        rgba(0, 0, 0, 0.1) 66%,
        transparent 66%
      );
    background-size: 35px 20px;
    background-position: 0 0;
    animation: progress-stripes 1s linear infinite;
  }

  .progress-animated::-moz-progress-bar {
    background-image: 
      linear-gradient(
        -45deg,
        transparent 33%,
        rgba(0, 0, 0, 0.1) 33%,
        rgba(0, 0, 0, 0.1) 66%,
        transparent 66%
      );
    background-size: 35px 20px;
    background-position: 0 0;
    animation: progress-stripes 1s linear infinite;
  }

  /* Indeterminate state styling */
  progress:indeterminate {
    @apply w-full h-2 rounded-full;
  }

  progress:indeterminate::-webkit-progress-bar {
    @apply w-full h-2 rounded-full;
    @apply bg-muted/20 dark:bg-muted/20;
    @apply border-none outline-none;
  }

  progress:indeterminate::-webkit-progress-value {
    @apply h-2 rounded-full;
    @apply bg-primary-500 dark:bg-primary-500;
    animation: indeterminate-progress 1.5s ease-in-out infinite;
  }

  progress:indeterminate::-moz-progress-bar {
    @apply h-2 rounded-full;
    @apply bg-primary-500 dark:bg-primary-500;
    animation: indeterminate-progress 1.5s ease-in-out infinite;
  }

  @keyframes indeterminate-progress {
    0% {
      width: 0%;
    }
    50% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
</style>
