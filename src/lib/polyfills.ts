/**
 * Platform polyfill loader for the bleeding-edge APIs Twintrinsic uses.
 *
 * Twintrinsic targets current Chrome, where the Popover API and CSS Anchor
 * Positioning are natively supported — but when a consumer (or a test
 * browser like the Playwright build) runs in an engine that lacks them,
 * these polyfills restore the behavior instead of breaking the components.
 *
 * Both polyfills are feature-detected and dynamically imported ONLY when
 * native support is missing, per the upstream guidance:
 *
 *   - Popover API:          `"popover" in HTMLElement.prototype`
 *   - CSS Anchor Positioning: `"anchorName" in document.documentElement.style`
 *   - Interest Invokers:    `HTMLButtonElement.prototype.hasOwnProperty("interestForElement")`
 *
 * Call `loadPlatformPolyfills()` once early in an app's bootstrap (e.g. the
 * root layout) or let the docs/demo site do it for you. The call is
 * idempotent and safe to invoke multiple times.
 */

let loadPromise: Promise<void> | null = null

/**
 * Loads the platform polyfills (popover + CSS anchor positioning) when the
 * running engine lacks native support. Resolves immediately on engines that
 * already support the features. Safe to call from server and client.
 */
export function loadPlatformPolyfills(): Promise<void> {
  // SSR: nothing to polyfill server-side.
  if (typeof window === "undefined") return Promise.resolve()
  if (loadPromise) return loadPromise

  loadPromise = (async () => {
    const tasks: Array<Promise<unknown>> = []

    if (!("popover" in HTMLElement.prototype)) {
      tasks.push(import("@oddbird/popover-polyfill"))
    }

    if (!("anchorName" in document.documentElement.style)) {
      tasks.push(import("@oddbird/css-anchor-positioning"))
    }

    // Interest Invokers (interestfor attribute) — Chrome 142+, Edge 142+.
    // Polyfill for Firefox / Safari where the attribute is not yet supported.
    if (!HTMLButtonElement.prototype.hasOwnProperty("interestForElement")) {
      tasks.push(import("interestfor"))
    }

    await Promise.all(tasks)
  })()

  return loadPromise
}
