/**
 * Prism global guard.
 *
 * `prismjs`'s UMD bootstrap auto-scans the DOM for `code.language-*` elements
 * (`highlightAll`) when the document is not in the `'loading'` state. In a
 * bundler context (ES module import) `document.currentScript` is `null`, so
 * Prism schedules that scan via `requestAnimationFrame` at module-evaluation
 * time — potentially *before* importing modules have a chance to set
 * `Prism.manual = true`. The scan then fetches grammars from the autoloader's
 * relative `'components/'` default, which 404s against the page URL.
 *
 * This guard is imported by `CodeBlock.svelte` *before* `prismjs`, so it can
 * intercept the `window.Prism` global assignment and set `manual = true`
 * synchronously — before Prism's bootstrap even checks it. It also pins the
 * autoloader's `languages_path` to an absolute CDN path the moment the
 * autoloader registers, so any on-demand grammar fetch resolves correctly.
 */
if (typeof window !== "undefined") {
  // Start at `undefined` (not `null`) so that `typeof window.Prism` stays
  // `"undefined"` before prismjs assigns — Prism and its plugins use
  // `typeof Prism === "undefined"` as an existence guard, so returning
  // `null` here would change that semantics for early readers.
  let prism: unknown = undefined;

  Object.defineProperty(window, "Prism", {
    configurable: true,
    get() {
      return prism;
    },
    set(value: unknown) {
      prism = value;
      if (value && typeof value === "object") {
        // Suppress Prism's automatic DOM scan; CodeBlock highlights explicitly.
        // NOTE: this is a global side effect — consumers that rely on Prism's
        // built-in `highlightAll()` must set `Prism.manual = false` themselves.
        (value as { manual?: boolean }).manual = true;
        // Defensive pin for other import orders (e.g. if a consumer loads the
        // autoloader before prismjs). In CodeBlock's own import order the
        // autoloader registers *after* this setter fires, so the effective pin
        // is the module-scope one in `CodeBlock.svelte`.
        const autoloader = (value as { plugins?: { autoloader?: { languages_path?: string } } })
          .plugins?.autoloader;
        if (autoloader) {
          autoloader.languages_path = "https://unpkg.com/prismjs@1/components/";
        }
      }
    },
  });
}

export {};
