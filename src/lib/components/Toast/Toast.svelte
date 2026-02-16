<script lang="ts">
/**
 * @component
 * Toast - A component for displaying temporary notifications.
 * Provides consistent styling, accessibility features, and various display options.
 *
 * Usage:
 * ```svelte
 * <script lang="ts">
 * import { subscribe } from "svelte/store"
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
  import { fade, fly } from 'svelte/transition';
  import { toastStore } from './toastStore.js';

  const {
    class: className = '',
    position = 'bottom-right',
    maxToasts = 5,
    duration = 5000,
    dismissible = true,
    pauseOnHover = true
  } = $props();

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
</script>

<div
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
        "
        aria-live={toast.variant === 'error' ? 'assertive' : 'polite'}
        aria-label="Dismiss notification"
        onclick={() => removeToast(toast.id)}
        onmouseenter={() => pauseToast(toast.id)}
        onmouseleave={() => resumeToast(toast.id)}
        in:fly={{ y: 20, duration: 200 }}
        out:fly={{ x: 20, duration: 200 }}
      >
        <div class="toast-content">
          {#if toast.icon}
            <div class="toast-icon">
              {@html toast.icon}
            </div>
          {:else}
            <div class="toast-icon">
              {#if toast.variant === 'success'}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              {:else if toast.variant === 'error'}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              {:else if toast.variant === 'warning'}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              {:else if toast.variant === 'info'}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
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
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
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
        "
        role="alert"
        aria-live={toast.variant === 'error' ? 'assertive' : 'polite'}
        onmouseenter={() => pauseToast(toast.id)}
        onmouseleave={() => resumeToast(toast.id)}
        in:fly={{ y: 20, duration: 200 }}
        out:fly={{ x: 20, duration: 200 }}
      >
        <div class="toast-content">
          {#if toast.icon}
            <div class="toast-icon">
              {@html toast.icon}
            </div>
          {:else}
            <div class="toast-icon">
              {#if toast.variant === 'success'}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              {:else if toast.variant === 'error'}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              {:else if toast.variant === 'warning'}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              {:else if toast.variant === 'info'}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
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
  
  /* No custom animations needed - using Svelte transitions */
</style>
