import { writable } from "svelte/store"

interface Toast {
  id: string
  message: string
  title?: string
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info"
  duration: number
  icon?: string | boolean
  dismissible: boolean
  progress: number | boolean
  closing: boolean
  createdAt: number
  paused?: boolean
  remaining?: number
}

interface ToastInput {
  message: string
  title?: string
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info"
  duration?: number
  icon?: string | boolean
  dismissible?: boolean
  progress?: boolean
}

interface TimerObject {
  interval: ReturnType<typeof setInterval>
  timeout: ReturnType<typeof setTimeout>
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([])

  const timers = new Map<string, TimerObject>()

  function add(toast: ToastInput): string {
    const id = crypto.randomUUID()
    const duration = toast.duration || 5000

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
    }

    update((toasts) => [newToast, ...toasts])

    if (duration > 0) {
      const timer = startTimer(id, duration)
      timers.set(id, timer)
    }

    return id
  }

  function startTimer(id: string, duration: number): TimerObject {
    const interval = setInterval(() => {
      update((toasts) => {
        return toasts.map((toast) => {
          if (toast.id === id && toast.progress !== false) {
            const elapsed = Date.now() - toast.createdAt
            const remaining = Math.max(0, duration - elapsed)
            const progress = (remaining / duration) * 100

            return { ...toast, progress }
          }
          return toast
        })
      })
    }, 100)

    const timeout = setTimeout(() => {
      update((toasts) => {
        return toasts.map((toast) => {
          if (toast.id === id) {
            return { ...toast, closing: true }
          }
          return toast
        })
      })

      setTimeout(() => {
        remove(id)
      }, 200)
    }, duration)

    return { interval, timeout }
  }

  function remove(id: string): void {
    if (timers.has(id)) {
      const timer = timers.get(id)!
      clearInterval(timer.interval)
      clearTimeout(timer.timeout)
      timers.delete(id)
    }

    update((toasts) => toasts.filter((toast) => toast.id !== id))
  }

  function pause(id: string): void {
    if (timers.has(id)) {
      const timer = timers.get(id)!
      clearInterval(timer.interval)
      clearTimeout(timer.timeout)

      update((toasts) => {
        return toasts.map((toast) => {
          if (toast.id === id) {
            const elapsed = Date.now() - toast.createdAt
            const remaining = Math.max(0, toast.duration - elapsed)

            return {
              ...toast,
              remaining,
              paused: true,
            }
          }
          return toast
        })
      })
    }
  }

  function resume(id: string): void {
    update((toasts) => {
      const toastToResume = toasts.find((toast) => toast.id === id && toast.paused)

      if (toastToResume && toastToResume.remaining !== undefined) {
        const newCreatedAt = Date.now() - (toastToResume.duration - toastToResume.remaining)

        const timer = startTimer(id, toastToResume.remaining)
        timers.set(id, timer)

        return toasts.map((toast) => {
          if (toast.id === id) {
            return {
              ...toast,
              createdAt: newCreatedAt,
              paused: false,
              remaining: undefined,
            }
          }
          return toast
        })
      }

      return toasts
    })
  }

  function clear(): void {
    timers.forEach((timer) => {
      clearInterval(timer.interval)
      clearTimeout(timer.timeout)
    })
    timers.clear()

    update(() => [])
  }

  function success(message: string | ToastInput, title?: string, duration?: number): string {
    const config: ToastInput =
      typeof message === "string"
        ? { message, title, duration }
        : { ...message, variant: "success" }

    return add({ ...config, variant: "success" })
  }

  function error(message: string | ToastInput, title?: string, duration?: number): string {
    const config: ToastInput =
      typeof message === "string"
        ? { message, title, duration }
        : { ...message, variant: "error" }

    return add({ ...config, variant: "error" })
  }

  function warning(message: string | ToastInput, title?: string, duration?: number): string {
    const config: ToastInput =
      typeof message === "string"
        ? { message, title, duration }
        : { ...message, variant: "warning" }

    return add({ ...config, variant: "warning" })
  }

  function info(message: string | ToastInput, title?: string, duration?: number): string {
    const config: ToastInput =
      typeof message === "string"
        ? { message, title, duration }
        : { ...message, variant: "info" }

    return add({ ...config, variant: "info" })
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
    info,
  }
}

export const toastStore = createToastStore()
export const showToast = toastStore.add
