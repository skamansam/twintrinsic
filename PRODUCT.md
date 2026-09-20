# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

All web developers building interfaces — regardless of framework. Svelte 5
is the first implementation; web components and Vue ports are planned,
with the long-term shape being a largely CSS-based toolkit usable
everywhere.

## Product Purpose

Twintrinsic is a component library that extends native HTML elements
rather than replacing them. Because builtin elements (`select`,
`textarea`, `section`, …) carry accessibility intrinsically, the library
inherits WCAG-grade behavior instead of reimplementing it. Styling and
interaction are CSS-first — JavaScript only when necessary — with
Tailwind theme tokens as the customization contract.

## Positioning

A combination no neighboring library truthfully copies together:

- **HTML-extension approach** — components wrap and extend native
  elements, so a11y is intrinsic, not bolted on.
- **CSS-first, minimal JS** — Tailwind + CSS interactions wherever
  possible; near-JS-free components stay small and fast.
- **Full-stack breadth** — app shell to form controls to charts, code
  editor, and maps in one themed system.
- **Framework trajectory** — designed so the CSS/HTML core ports to web
  components and Vue without rethinking the design language.

## Operating Context

Distributed as a package (GitHub/npm, `svelte-package` dist + subpath
exports like `twintrinsic/components/Button`). Consumed today via Vite
alias to the local source by sibling apps (dnanything, questlists,
fo4-tools). Docs site (`src/routes/docs`) and Storybook are the
evaluation surfaces for every component.

## Capabilities and Constraints

- 56 components: layout/app shell, full form set, dataviz (charts,
  gauges, KPI), code editor, map, menus, overlays.
- Svelte 5 runes only; callback props, no `createEventDispatcher`.
- Tailwind CSS v4 `@theme` tokens in `src/lib/twintrinsic.css` are the
  public theming API.
- WCAG 2.1 target; WAI-ARIA APG patterns for composite widgets.
- Pre-1.0 status: heavy development; **performance is deliberately not a
  focus yet** — readability, accessibility, and extensibility come first.
- Testing: Playwright e2e + Vitest unit required for component changes.
- Docs-site prose is runtime-translated via Paraglide (en/es/fa).
- Roadmap (confirmed direction, not yet built): web components port,
  Vue port, framework-agnostic CSS core.

## Brand Commitments

- Name: **twintrinsic** — `tailwind` + `intrinsic`; the name itself is
  the product thesis (Tailwind theming over intrinsic HTML).
- Voice: documentation-first, standards-fluent (APG, WCAG, semantic
  HTML); honest about pre-1.0 status.

## Evidence on Hand

- 56 implemented components under `src/lib/components/` with unit tests,
  Playwright e2e, and Storybook stories.
- Docs site under `src/routes/docs` with per-component pages and a
  completion tracker.
- `src/lib/twintrinsic.css` — the theme token source of truth.
- `CHANGELOG.md`, `CONTRIBUTING.md`, `AGENTS.md`, `docs/plans/`.
- No external adoption metrics or testimonials; do not fabricate any.

## Product Principles

1. **Extend, don't replace** — native HTML elements are the foundation;
   the library adds, never subtracts, platform behavior.
2. **CSS over JavaScript** — if CSS can do it, JS shouldn't.
3. **Accessibility is intrinsic** — leaning on builtin semantics beats
   retrofitting ARIA onto custom elements.
4. **Theming is a contract** — Tailwind tokens are the public API;
   components never hard-code look.
5. **Portability by construction** — the CSS/HTML core must survive the
   jump to web components and Vue.

## Accessibility & Inclusion

WCAG 2.1 compliance is a core product requirement, not a nice-to-have:
semantic HTML first, ARIA only where semantic HTML is unavailable, APG
patterns for composite widgets, keyboard navigation, and AA contrast are
enforced by the component checklist.
