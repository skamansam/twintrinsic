/**
 * Toast notification store
 * Manages toast notifications for the application
 *
 * Auto-dismissal is driven by the Timer component: each toast with a
 * `duration > 0` renders a Timer whose `oncomplete` marks the toast closing
 * (via `setClosing`) and removes it after the exit animation. The store only
 * tracks the toast list and the paused flag; it no longer owns any timers.
 *
 * @module toastStore
 */

import { writable } from "svelte/store";

/**
 * @typedef {Object} Toast
 * @property {string} id - Unique identifier
 * @property {string} message - Toast message content
 * @property {string} [title] - Optional toast title
 * @property {string} [variant] - Visual style variant (default, primary, success, warning, error, info)
 * @property {number} duration - Duration in milliseconds (0 = persistent, no auto-dismiss)
 * @property {string|boolean} [icon] - Custom icon or false to hide icon
 * @property {boolean} [dismissible] - Whether toast can be dismissed by clicking
 * @property {number|boolean} [progress] - 100 or false; false hides the countdown bar
 * @property {boolean} [closing] - Whether toast is in closing animation
 * @property {number} [createdAt] - Timestamp when toast was created
 * @property {boolean} [paused] - Whether the countdown is paused (drives the Timer)
 */

/**
 * Create a toast store
 * @returns {Object} Toast store with methods
 */
function createToastStore() {
  // Create writable store
  const { subscribe, update } = writable(/** @type {Toast[]} */ ([]));

  /**
   * Add a new toast
   * @param {Object} toast - Toast configuration
   * @param {string} toast.message - Toast message
   * @param {string} [toast.title] - Toast title
   * @param {string} [toast.variant] - Toast variant (default, primary, success, warning, error, info)
   * @param {number} [toast.duration] - Duration in milliseconds; 0 for persistent
   * @param {string|boolean} [toast.icon] - Custom icon or false to hide icon
   * @param {boolean} [toast.dismissible] - Whether toast can be dismissed
   * @param {boolean} [toast.progress] - false to hide the countdown bar
   * @returns {string} Toast ID
   */
  function add(toast) {
    const id = crypto.randomUUID();
    // `??` (not `||`) so duration: 0 is honoured as a persistent toast
    const duration = toast.duration ?? 5000;

    // Create toast object
    const newToast = {
      id,
      message: toast.message,
      title: toast.title,
      variant: toast.variant || "default",
      duration,
      icon: toast.icon,
      dismissible: toast.dismissible !== false,
      progress: toast.progress !== false ? 100 : false,
      closing: false,
      createdAt: Date.now(),
      paused: false,
    };

    // Add toast to store
    update((toasts) => [newToast, ...toasts]);

    return id;
  }

  /**
   * Remove a toast by ID
   * @param {string} id - Toast ID
   */
  function remove(id) {
    update((toasts) => toasts.filter((toast) => toast.id !== id));
  }

  /**
   * Mark a toast as closing (starts its exit animation)
   * @param {string} id - Toast ID
   */
  function setClosing(id) {
    update((toasts) =>
      toasts.map((toast) => (toast.id === id ? { ...toast, closing: true } : toast)),
    );
  }

  /**
   * Pause a toast's countdown
   * @param {string} id - Toast ID
   */
  function pause(id) {
    update((toasts) =>
      toasts.map((toast) => (toast.id === id ? { ...toast, paused: true } : toast)),
    );
  }

  /**
   * Resume a toast's countdown
   * @param {string} id - Toast ID
   */
  function resume(id) {
    update((toasts) =>
      toasts.map((toast) => (toast.id === id ? { ...toast, paused: false } : toast)),
    );
  }

  /**
   * Clear all toasts
   */
  function clear() {
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
    const config =
      typeof message === "string"
        ? { message, title, duration }
        : { ...message, variant: "success" };

    return add({ ...config, variant: "success" });
  }

  /**
   * Show an error toast
   * @param {string|Object} message - Message or toast config
   * @param {string} [title] - Toast title
   * @param {number} [duration] - Duration in milliseconds
   * @returns {string} Toast ID
   */
  function error(message, title, duration) {
    const config =
      typeof message === "string" ? { message, title, duration } : { ...message, variant: "error" };

    return add({ ...config, variant: "error" });
  }

  /**
   * Show a warning toast
   * @param {string|Object} message - Message or toast config
   * @param {string} [title] - Toast title
   * @param {number} [duration] - Duration in milliseconds
   * @returns {string} Toast ID
   */
  function warning(message, title, duration) {
    const config =
      typeof message === "string"
        ? { message, title, duration }
        : { ...message, variant: "warning" };

    return add({ ...config, variant: "warning" });
  }

  /**
   * Show an info toast
   * @param {string|Object} message - Message or toast config
   * @param {string} [title] - Toast title
   * @param {number} [duration] - Duration in milliseconds
   * @returns {string} Toast ID
   */
  function info(message, title, duration) {
    const config =
      typeof message === "string" ? { message, title, duration } : { ...message, variant: "info" };

    return add({ ...config, variant: "info" });
  }

  return {
    subscribe,
    add,
    remove,
    setClosing,
    pause,
    resume,
    clear,
    success,
    error,
    warning,
    info,
  };
}

// Create and export toast store
export const toastStore = createToastStore();

// Alias for add method
export const showToast = toastStore.add;
