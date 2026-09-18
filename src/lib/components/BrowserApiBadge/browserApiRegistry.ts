/**
 * Shared registry for the docs-site Browser-API badges (plan item 11.3).
 *
 * Each entry names a **native browser API** a component is built on, its
 * MDN page, and — where one exists — the exact polyfill package a consumer
 * may install to enable the feature in older browsers. Twintrinsic never
 * ships a polyfill (plan 11.1 policy); the badges surface the consumer
 * opt-in.
 *
 * Mappings are evidence-based: an entry exists only if the component's
 * source actually uses the API (verified 2026-09-18 by scanning
 * `src/lib/components/`). Add new entries when a component adopts a new
 * platform primitive — the registry also feeds the completion page's
 * web-API checklist, so keep names aligned with it.
 */

/** One native browser API a component is built on. */
export interface BrowserApi {
  /** Short label shown inside the badge pill (e.g. `Temporal`) */
  label: string;
  /** MDN (or equivalent spec) URL for "learn more" */
  mdnUrl: string;
  /** Polyfill package a consumer can install for older browsers, if one exists */
  polyfill?: string;
  /** True when no polyfill exists — the tooltip says so explicitly */
  noPolyfill?: boolean;
}

/** The components' per-page API list, keyed by docs page component name. */
export const browserApiRegistry: Record<string, BrowserApi[]> = {
  // Temporal date math (grid, events, drag deltas), Popover API (+N more
  // overflow), and drag-to-edit rescheduling via the HTML DnD API.
  CalendarView: [
    {
      label: "Temporal",
      mdnUrl:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal",
      polyfill: "@js-temporal/polyfill",
    },
    {
      label: "Popover",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Popover_API",
    },
    {
      label: "Drag and Drop",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API",
    },
  ],
  // Native date picker input
  CalendarInput: [
    {
      label: "input type=date",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date",
    },
  ],
  // popover="hint" + CSS Anchor Positioning (interestfor triggers)
  Tooltip: [
    {
      label: "Popover",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Popover_API",
    },
    {
      label: "Anchor Positioning",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning",
      polyfill: "@oddbird/css-anchor-positioning",
    },
  ],
  // Native dialog element
  Modal: [
    {
      label: "dialog",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog",
    },
  ],
  // Disclosure widgets rendered as native <details>/<summary>
  Accordion: [
    {
      label: "details",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details",
    },
  ],
  TreeMenu: [
    {
      label: "details",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details",
    },
  ],
  // Native color picker input
  ColorPicker: [
    {
      label: "input type=color",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color",
    },
  ],
  // Native file picker input
  FileUpload: [
    {
      label: "input type=file",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file",
    },
  ],
  // Menu surfaces render in the top layer via the Popover API
  Menu: [
    {
      label: "Popover",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Popover_API",
    },
  ],
  // Native checkbox styled with CSS (no JS toggle state)
  Switch: [
    {
      label: "input type=checkbox",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox",
    },
    {
      label: ":has()",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/:has",
    },
  ],
  // Theme persistence + system preference detection
  ThemeToggle: [
    {
      label: "localStorage",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
    },
    {
      label: "prefers-color-scheme",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme",
    },
  ],
  // Copy-to-clipboard button on code samples
  CodeBlock: [
    {
      label: "Clipboard",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API",
    },
  ],
  // Touch/wheel swipe handling plus resize-driven layout
  Carousel: [
    {
      label: "Pointer events",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events",
    },
    {
      label: "ResizeObserver",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver",
    },
  ],
  // Content reveals only when scrolled into view
  Lazy: [
    {
      label: "IntersectionObserver",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",
    },
  ],
  Timeline: [
    {
      label: "IntersectionObserver",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",
    },
  ],
  // Interval-driven countdown display
  Timer: [
    {
      label: "setInterval",
      mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval",
    },
  ],
};

/**
 * Looks up the badge APIs for a docs page's component.
 * @param component - The component name exactly as registered
 * @returns The component's APIs, or undefined when it has none registered
 */
export function browserApisFor(component: string): BrowserApi[] | undefined {
  return browserApiRegistry[component];
}
