<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "''", optional: true },
  { name: "position", type: "ToastPosition", description: "Position of the toast container", default: "'bottom-right'", optional: true },
  { name: "maxToasts", type: "number", description: "Maximum number of toasts to show", default: "5", optional: true },
  { name: "duration", type: "number", description: "Default duration (ms) before a toast auto-dismisses", default: "5000", optional: true },
  { name: "dismissible", type: "boolean", description: "Whether the toast is dismissible via click", default: "true", optional: true },
  { name: "pauseOnHover", type: "boolean", description: "Whether to pause the auto-dismiss timer on hover", default: "true", optional: true },
];
</script>

<script lang="ts">
/**
 * @component
 * Toast - A component for displaying temporary notifications.
 * Uses pure CSS entry/exit animations via @starting-style and
 * transition-behavior: allow-discrete, with content-visibility: auto
 * for rendering performance. No JavaScript animation logic.
 *
 * Usage:
 * ```svelte
 * <script lang="ts">
 * import { showToast } from "$lib/components/Toast/toastStore.js"
 *
 * function notify() {
 *   showToast({
 *     message: "Operation completed successfully",
 *     variant: "success",
 *     duration: 3000
 *   })
 * }
 * <\/script>
 *
 * <button onclick={notify}>Show Toast</button>
 *
 * <Toast />
 * ```
 */
  import { onDestroy, onMount } from 'svelte';
  import { toastStore } from './toastStore.js';
  import Icon from '../Icon/Icon.svelte';

/** Toast container positions enumerated by `positionClasses` in this component. */
  type ToastPosition =
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center'

  interface Props {
    /** Additional CSS classes */
    class?: string
    /** Position of the toast container */
    position?: ToastPosition
    /** Maximum number of toasts to show */
    maxToasts?: number
    /** Default duration (ms) before a toast auto-dismisses */
    duration?: number
    /** Whether the toast is dismissible via click */
    dismissible?: boolean
    /** Whether to pause the auto-dismiss timer on hover */
    pauseOnHover?: boolean
  }

  let {
    class: className = '',
    position = 'bottom-right',
    maxToasts = 5,
    duration = 5000,
    dismissible = true,
    pauseOnHover = true,
  ...restProps
  }: Props = $props();

  // Component state
  interface Toast {
    id: string;
    message: string;
    title?: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
    duration: number;
    icon?: string | boolean;
    dismissible: boolean;
    progress: number | boolean;
    closing: boolean;
    createdAt: number;
    paused?: boolean;
    remaining?: number;
  }
  
  let toasts: Toast[] = $state([]);
  let container: HTMLElement | undefined;
  
  // Determine position classes
  const positionClasses = $derived({
    'top-right': 'toast-top-right',
    'top-left': 'toast-top-left',
    'bottom-right': 'toast-bottom-right',
    'bottom-left': 'toast-bottom-left',
    'top-center': 'toast-top-center',
    'bottom-center': 'toast-bottom-center'
  }[position] || 'toast-bottom-right');
  
  // Subscribe to toast store
  onMount(() => {
    const unsubscribe = toastStore.subscribe(($toasts: Toast[]): void => {
      // Limit to maxToasts
      toasts = $toasts.slice(0, maxToasts);
    });
    
    return unsubscribe;
  });
  
  /**
   * Removes a toast by id
   * @param {string} id - Toast id
   */
  function removeToast(id: string): void {
    toastStore.remove(id);
  }
  
  /**
   * Pauses a toast's timer
   * @param {string} id - Toast id
   */
  function pauseToast(id: string): void {
    if (pauseOnHover) {
      toastStore.pause?.(id);
    }
  }
  
  /**
   * Resumes a toast's timer
   * @param {string} id - Toast id
   */
  function resumeToast(id: string): void {
    if (pauseOnHover) {
      toastStore.resume(id);
    }
  }
  
  // Clean up on component destroy
  onDestroy(() => {
    toastStore.clear();
  });

  /** Map variant to Iconify icon name */
  const variantIcons: Record<string, string> = {
    success: 'tabler:circle-check',
    error: 'tabler:x',
    warning: 'tabler:alert-triangle',
    info: 'tabler:info-circle',
  };
</script>

<div {...restProps}
  class="
    toast-container
    {positionClasses}
    {className}
  "
  aria-live="polite"
  aria-atomic="true"
  bind:this={container}
>
  {#each toasts as toast (toast.id)}
    {#if dismissible}
      <button
        type="button"
        class="
          toast
          toast-{toast.variant || 'default'}
          {toast.closing ? 'toast-closing' : ''}
        "
        aria-live={toast.variant === 'error' ? 'assertive' : 'polite'}
        aria-label="Dismiss notification"
        onclick={() => removeToast(toast.id)}
        onmouseenter={() => pauseToast(toast.id)}
        onmouseleave={() => resumeToast(toast.id)}
      >
        <div class="toast-content">
          {#if toast.icon}
            <div class="toast-icon">
              {@html toast.icon}
            </div>
          {:else}
            <div class="toast-icon">
              {#if toast.variant && variantIcons[toast.variant]}
                <Icon name={variantIcons[toast.variant]} class="w-5 h-5" />
              {/if}
            </div>
          {/if}
          
          <div class="toast-message">
            {#if toast.title}
              <div class="toast-title">{toast.title}</div>
            {/if}
            <div>{toast.message}</div>
          </div>
          
          <span class="toast-close" aria-hidden="true">
            <Icon name="tabler:x" class="w-4 h-4" />
          </span>
        </div>
        
        {#if toast.progress !== false}
          <div class="toast-progress-container">
            <div 
              class="toast-progress" 
              style="width: {toast.progress || 100}%"
            ></div>
          </div>
        {/if}
      </button>
    {:else}
      <div
        class="
          toast
          toast-{toast.variant || 'default'}
          {toast.closing ? 'toast-closing' : ''}
        "
        role="alert"
        aria-live={toast.variant === 'error' ? 'assertive' : 'polite'}
        onmouseenter={() => pauseToast(toast.id)}
        onmouseleave={() => resumeToast(toast.id)}
      >
        <div class="toast-content">
          {#if toast.icon}
            <div class="toast-icon">
              {@html toast.icon}
            </div>
          {:else}
            <div class="toast-icon">
              {#if toast.variant && variantIcons[toast.variant]}
                <Icon name={variantIcons[toast.variant]} class="w-5 h-5" />
              {/if}
            </div>
          {/if}
          
          <div class="toast-message">
            {#if toast.title}
              <div class="toast-title">{toast.title}</div>
            {/if}
            <div>{toast.message}</div>
          </div>
        </div>
        
        {#if toast.progress !== false}
          <div class="toast-progress-container">
            <div 
              class="toast-progress" 
              style="width: {toast.progress || 100}%"
            ></div>
          </div>
        {/if}
      </div>
    {/if}
  {/each}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .toast-container {
    @apply fixed z-50;
    @apply flex flex-col gap-2;
    @apply max-w-sm w-full;
    @apply pointer-events-none;
    /* Top-layer stacking via content-visibility for rendering perf */
    content-visibility: auto;
    contain-intrinsic-size: auto 200px;
  }
  
  .toast-top-right {
    @apply top-4 right-4;
  }
  
  .toast-top-left {
    @apply top-4 left-4;
  }
  
  .toast-bottom-right {
    @apply bottom-4 right-4;
  }
  
  .toast-bottom-left {
    @apply bottom-4 left-4;
  }
  
  .toast-top-center {
    @apply top-4 left-1/2 -translate-x-1/2;
  }
  
  .toast-bottom-center {
    @apply bottom-4 left-1/2 -translate-x-1/2;
  }
  
  .toast {
    @apply bg-surface dark:bg-surface;
    @apply text-text dark:text-text;
    @apply rounded-lg shadow-lg;
    @apply overflow-hidden;
    @apply pointer-events-auto;
    /* Pure CSS entry via @starting-style; exit via .toast-closing class */
    transition: opacity 200ms ease-out, transform 200ms ease-out,
      display 200ms ease-out allow-discrete;
  }

  /* Exit animation when the closing class is applied */
  .toast-closing {
    opacity: 0;
    transform: translateX(1rem);
    display: none;
  }

  /* @starting-style for entry animation (CSS-native, no JS) */
  @starting-style {
    .toast {
      opacity: 0;
      transform: translateY(1rem);
    }
  }
  
  .toast-content {
    @apply flex items-start p-4;
  }
  
  .toast-icon {
    @apply flex-shrink-0 mr-3 mt-0.5;
  }
  
  .toast-message {
    @apply flex-grow;
  }
  
  .toast-title {
    @apply font-medium mb-0.5;
  }
  
  .toast-close {
    @apply flex-shrink-0 ml-3 -mr-1 p-1;
    @apply text-muted dark:text-muted;
    @apply hover:text-text dark:hover:text-text;
    @apply rounded-full;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400;
    @apply transition-colors duration-150;
  }
  
  .toast-progress-container {
    @apply h-1 w-full bg-muted/10 dark:bg-muted/10;
  }
  
  .toast-progress {
    @apply h-full transition-all duration-150 ease-linear;
  }
  
  /* Variant styles */
  .toast-default .toast-progress {
    @apply bg-muted dark:bg-muted;
  }
  
  .toast-primary .toast-icon {
    @apply text-primary-500 dark:text-primary-500;
  }
  
  .toast-primary .toast-progress {
    @apply bg-primary-500 dark:bg-primary-500;
  }
  
  .toast-success .toast-icon {
    @apply text-success-500 dark:text-success-500;
  }
  
  .toast-success .toast-progress {
    @apply bg-success-500 dark:bg-success-500;
  }
  
  .toast-warning .toast-icon {
    @apply text-warning-500 dark:text-warning-500;
  }
  
  .toast-warning .toast-progress {
    @apply bg-warning-500 dark:bg-warning-500;
  }
  
  .toast-error .toast-icon {
    @apply text-error-500 dark:text-error-500;
  }
  
  .toast-error .toast-progress {
    @apply bg-error-500 dark:bg-error-500;
  }
  
  .toast-info .toast-icon {
    @apply text-info-500 dark:text-info-500;
  }
  
  .toast-info .toast-progress {
    @apply bg-info-500 dark:bg-info-500;
  }
</style>
