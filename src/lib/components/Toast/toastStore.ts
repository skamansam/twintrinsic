import { writable } from "svelte/store";

/**
 * Typed mirror of `toastStore.js`. The runtime module is the `.js` file (Vite
 * resolves the extension literally); this `.ts` provides the type surface for
 * imports of `./toastStore.js`. Keep the two in sync.
 *
 * Auto-dismissal is driven by the Timer component: each toast with a
 * `duration > 0` renders a Timer whose `oncomplete` marks the toast closing
 * (via `setClosing`) and removes it after the exit animation. The store only
 * tracks the toast list and the paused flag; it no longer owns any timers.
 */

interface Toast {
  id: string;
  message: string;
  title?: string;
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
  /** Duration in milliseconds; 0 = persistent (no auto-dismiss) */
  duration: number;
  icon?: string | boolean;
  dismissible: boolean;
  /** 100, or false to hide the countdown bar */
  progress: number | boolean;
  closing: boolean;
  createdAt: number;
  /** Whether the countdown is paused (drives the Timer's `running` prop) */
  paused: boolean;
}

interface ToastInput {
  message: string;
  title?: string;
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
  /** Duration in milliseconds; 0 for a persistent toast */
  duration?: number;
  icon?: string | boolean;
  dismissible?: boolean;
  /** false to hide the countdown bar */
  progress?: boolean;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);

  function add(toast: ToastInput): string {
    const id = crypto.randomUUID();
    // `??` (not `||`) so duration: 0 is honoured as a persistent toast
    const duration = toast.duration ?? 5000;

    const newToast: Toast = {
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

    update((toasts) => [newToast, ...toasts]);

    return id;
  }

  function remove(id: string): void {
    update((toasts) => toasts.filter((toast) => toast.id !== id));
  }

  function setClosing(id: string): void {
    update((toasts) =>
      toasts.map((toast) => (toast.id === id ? { ...toast, closing: true } : toast)),
    );
  }

  function pause(id: string): void {
    update((toasts) =>
      toasts.map((toast) => (toast.id === id ? { ...toast, paused: true } : toast)),
    );
  }

  function resume(id: string): void {
    update((toasts) =>
      toasts.map((toast) => (toast.id === id ? { ...toast, paused: false } : toast)),
    );
  }

  function clear(): void {
    update(() => []);
  }

  function success(message: string | ToastInput, title?: string, duration?: number): string {
    const config: ToastInput =
      typeof message === "string"
        ? { message, title, duration }
        : { ...message, variant: "success" };

    return add({ ...config, variant: "success" });
  }

  function error(message: string | ToastInput, title?: string, duration?: number): string {
    const config: ToastInput =
      typeof message === "string" ? { message, title, duration } : { ...message, variant: "error" };

    return add({ ...config, variant: "error" });
  }

  function warning(message: string | ToastInput, title?: string, duration?: number): string {
    const config: ToastInput =
      typeof message === "string"
        ? { message, title, duration }
        : { ...message, variant: "warning" };

    return add({ ...config, variant: "warning" });
  }

  function info(message: string | ToastInput, title?: string, duration?: number): string {
    const config: ToastInput =
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

export const toastStore = createToastStore();
export const showToast = toastStore.add;
