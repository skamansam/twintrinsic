/**
 * Feature-detection probes for the Tier 0 "Chrome-only" platform APIs
 * tracked in docs/plans/HTML_SEMANTIC_REPLACEMENT_PLAN.md (Part 1.5).
 *
 * Each entry's `check` function is serialized and executed inside the
 * browser via `page.evaluate()`, so it must be self-contained (no closures
 * over outer variables) and must not reference Node.js globals.
 *
 * @type {Array<{ name: string, check: () => boolean }>}
 */
export const features = [
  {
    name: "Popover API",
    check: () => "popover" in HTMLElement.prototype,
  },
  {
    name: "CSS Anchor Positioning",
    check: () => CSS.supports("anchor-name", "--tw-anchor"),
  },
  {
    name: "Invoker Commands (command/commandfor)",
    check: () => "command" in document.createElement("button"),
  },
  {
    name: "dialog closedby attribute",
    check: () => "closedBy" in HTMLDialogElement.prototype,
  },
  {
    name: "Customizable <select> API",
    check: () => CSS.supports("appearance", "base-select"),
  },
  {
    name: "CSS field-sizing: content",
    check: () => CSS.supports("field-sizing", "content"),
  },
  {
    name: "CSS :has()",
    check: () => CSS.supports("selector(:has(a))"),
  },
  {
    name: "CSS :user-valid / :user-invalid",
    check: () => CSS.supports("selector(:user-invalid)"),
  },
  {
    name: "CSS light-dark()",
    check: () => CSS.supports("color", "light-dark(#fff, #000)"),
  },
  {
    name: "CSS @starting-style",
    check: () => CSS.supports("(transition-behavior: allow-discrete)"),
  },
  {
    name: "interestfor attribute",
    check: () => "interestForElement" in HTMLElement.prototype,
  },
  {
    name: "<search> element",
    check: () => !(document.createElement("search") instanceof HTMLUnknownElement),
  },
];
