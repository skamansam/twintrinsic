/**
 * Toast notification store
 * Manages toast notifications for the application
 * 
 * @module toastStore
 */

import { writable } from 'svelte/store';

/**
 * @typedef {Object} Toast
 * @property {string} id - Unique identifier
 * @property {string} message - Toast message content
 * @property {string} [title] - Optional toast title
 * @property {string} [variant] - Visual style variant (default, primary, success, warning, error, info)
 * @property {number} [duration] - Duration in milliseconds
 * @property {string|boolean} [icon] - Custom icon or false to hide icon
 * @property {boolean} [dismissible] - Whether toast can be dismissed by clicking
 * @property {number} [progress] - Progress percentage (0-100) or false to hide progress
 * @property {boolean} [closing] - Whether toast is in closing animation
 */

/**
 * Create a toast store
 * @returns {Object} Toast store with methods
 */
function createToastStore() {
  // Create writable store
  const { subscribe, update } = writable(/** @type {Toast[]} */ ([]));
  
  // Timer map to track toast timeouts
  const timers = new Map();
  
  /**
   * Add a new toast
   * @param {Object} toast - Toast configuration
   * @param {string} toast.message - Toast message
   * @param {string} [toast.title] - Toast title
   * @param {string} [toast.variant] - Toast variant (default, primary, success, warning, error, info)
   * @param {number} [toast.duration] - Duration in milliseconds
   * @param {string|boolean} [toast.icon] - Custom icon or false to hide icon
   * @param {boolean} [toast.dismissible] - Whether toast can be dismissed
   * @param {boolean} [toast.progress] - Whether to show progress
   * @returns {string} Toast ID
   */
  function add(toast) {
    const id = crypto.randomUUID();
    const duration = toast.duration || 5000;
    
    // Create toast object
    const newToast = {
      id,
      message: toast.message,
      title: toast.title,
      variant: toast.variant || 'default',
      duration,
      icon: toast.icon,
      dismissible: toast.dismissible !== false,
      progress: toast.progress !== false ? 100 : false,
      closing: false,
      createdAt: Date.now()
    };
    
    // Add toast to store
    update(toasts => [newToast, ...toasts]);
    
    // Start timer for auto-removal
    if (duration > 0) {
      const timer = startTimer(id, duration);
      timers.set(id, timer);
    }
    
    return id;
  }
  
  /**
   * Start a timer for toast removal
   * @param {string} id - Toast ID
   * @param {number} duration - Duration in milliseconds
   * @returns {Object} Timer object with interval and timeout
   */
  function startTimer(id, duration) {
    // Progress update interval (update every 100ms)
    const interval = setInterval(() => {
      update(toasts => {
        return toasts.map(toast => {
          if (toast.id === id && toast.progress !== false) {
            const elapsed = Date.now() - toast.createdAt;
            const remaining = Math.max(0, duration - elapsed);
            const progress = (remaining / duration) * 100;
            
            return { ...toast, progress };
          }
          return toast;
        });
      });
    }, 100);
    
    // Timeout for removal
    const timeout = setTimeout(() => {
      // Start closing animation
      update(toasts => {
        return toasts.map(toast => {
          if (toast.id === id) {
            return { ...toast, closing: true };
          }
          return toast;
        });
      });
      
      // Remove after animation completes
      setTimeout(() => {
        remove(id);
      }, 200); // Match animation duration
    }, duration);
    
    return { interval, timeout };
  }
  
  /**
   * Remove a toast by ID
   * @param {string} id - Toast ID
   */
  function remove(id) {
    // Clear timers
    if (timers.has(id)) {
      const timer = timers.get(id);
      clearInterval(timer.interval);
      clearTimeout(timer.timeout);
      timers.delete(id);
    }
    
    // Remove from store
    update(toasts => toasts.filter(toast => toast.id !== id));
  }
  
  /**
   * Pause a toast's timer
   * @param {string} id - Toast ID
   */
  function pause(id) {
    if (timers.has(id)) {
      const timer = timers.get(id);
      clearInterval(timer.interval);
      clearTimeout(timer.timeout);
      
      // Store remaining time
      update(toasts => {
        return toasts.map(toast => {
          if (toast.id === id) {
            const elapsed = Date.now() - toast.createdAt;
            const remaining = Math.max(0, toast.duration - elapsed);
            
            return { 
              ...toast, 
              remaining,
              paused: true
            };
          }
          return toast;
        });
      });
    }
  }
  
  /**
   * Resume a toast's timer
   * @param {string} id - Toast ID
   */
  function resume(id) {
    update(toasts => {
      const toastToResume = toasts.find(toast => toast.id === id && toast.paused);
      
      if (toastToResume) {
        // Update creation time to account for pause
        const newCreatedAt = Date.now() - (toastToResume.duration - toastToResume.remaining);
        
        // Restart timer
        const timer = startTimer(id, toastToResume.remaining);
        timers.set(id, timer);
        
        // Update toast
        return toasts.map(toast => {
          if (toast.id === id) {
            return { 
              ...toast, 
              createdAt: newCreatedAt,
              paused: false,
              remaining: undefined
            };
          }
          return toast;
        });
      }
      
      return toasts;
    });
  }
  
  /**
   * Clear all toasts
   */
  function clear() {
    // Clear all timers
    timers.forEach(timer => {
      clearInterval(timer.interval);
      clearTimeout(timer.timeout);
    });
    timers.clear();
    
    // Clear store
    update(() => []);
  }
  
  /**
   * Show a success toast
   * @param {string|Object} message - Message or toast config
   * @param {string} [title] - Toast title
   * @param {number} [duration] - Duration in milliseconds
   * @returns {string} Toast ID
   */
  function success(message, title, duration) {
    const config = typeof message === 'string' 
      ? { message, title, duration } 
      : { ...message, variant: 'success' };
    
    return add({ ...config, variant: 'success' });
  }
  
  /**
   * Show an error toast
   * @param {string|Object} message - Message or toast config
   * @param {string} [title] - Toast title
   * @param {number} [duration] - Duration in milliseconds
   * @returns {string} Toast ID
   */
  function error(message, title, duration) {
    const config = typeof message === 'string' 
      ? { message, title, duration } 
      : { ...message, variant: 'error' };
    
    return add({ ...config, variant: 'error' });
  }
  
  /**
   * Show a warning toast
   * @param {string|Object} message - Message or toast config
   * @param {string} [title] - Toast title
   * @param {number} [duration] - Duration in milliseconds
   * @returns {string} Toast ID
   */
  function warning(message, title, duration) {
    const config = typeof message === 'string' 
      ? { message, title, duration } 
      : { ...message, variant: 'warning' };
    
    return add({ ...config, variant: 'warning' });
  }
  
  /**
   * Show an info toast
   * @param {string|Object} message - Message or toast config
   * @param {string} [title] - Toast title
   * @param {number} [duration] - Duration in milliseconds
   * @returns {string} Toast ID
   */
  function info(message, title, duration) {
    const config = typeof message === 'string' 
      ? { message, title, duration } 
      : { ...message, variant: 'info' };
    
    return add({ ...config, variant: 'info' });
  }

  return {
    subscribe,
    add,
    remove,
    pause,
    resume,
    clear,
    success,
    error,
    warning,
    info
  };
}

// Create and export toast store
export const toastStore = createToastStore();

// Alias for add method
export const showToast = toastStore.add;
