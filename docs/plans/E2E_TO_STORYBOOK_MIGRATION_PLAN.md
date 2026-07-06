# E2E → Docs + Storybook Test Migration Plan

Status: **Draft** (awaiting approval before implementation)
Owner: TBD
Last updated: 2025-01-XX

## 1. Context & Problem Statement

We have **two mixed-up testing strategies** today:

1. The Playwright suite in `tests/e2e/` was originally written for **Storybook at port 6006**. Many of those tests still hard-code `http://localhost:6006/?path=/story/...` or `http://localhost:6006/iframe.html?id=...` URLs.
2. The Playwright config (`playwright.config.ts`) was recently edited (see git diff) to instead boot the **SvelteKit docs preview at port 5173** and use that as `baseURL`. This breaks every Storybook-pointing test.

Meanwhile, `vitest.config.ts` already has a `storybook` project wired up through `@storybook/addon-vitest`, so we have the infrastructure for **component-level testing inside Storybook** sitting unused.

The intended split is:

| Surface | Test type | Runner | What it covers |
| --- | --- | --- | --- |
| **Docs site** (`localhost:5173/docs/...`, `/`, `/demo`) | Playwright | `@playwright/test` | Smoke + pages exist + data-testid hooks |
| **Component behavior** (rendering, interaction, a11y, visual) | Vitest + `@storybook/test` | `vitest --project=storybook` | Render / interaction / a11y / coverage, all from stories |

Per the Storybook docs we read
(`https://storybook.js.org/docs/writing-tests`,
`/writing-tests/interaction-testing`,
`/writing-tests/accessibility-testing`),
a basic story is already a **render test**, a `play` function turns it into an
**interaction test**, and the Accessibility addon runs a11y checks per story.

## 2. Goals & Non-Goals

**Goals**
- Every component test in `tests/e2e/` has a clear destination: either **move to a story's `play` function** (behavior) or **become a docs-site smoke test** (page-level).
- All docs-site tests use `data-testid` hooks (we already do this in `Avatar` / `Container` docs).
- Storybook tests run via `pnpm test:storybook` (`vitest --project=storybook`), already configured.
- Playwright `pnpm test:e2e` no longer references `localhost:6006`.

**Non-Goals (this plan)**
- Visual regression (Chromatic) — already wired via `@chromatic-com/storybook`.
- Snapshot testing — not currently used; defer.
- Unit tests in `tests/unit/**` — out of scope, they stay as-is.
- Storybook → SvelteKit docs migration (i.e., removing the docs site).

## 3. Status of the Existing Infrastructure

Already in place (no work needed):
- `@storybook/addon-vitest` registered in `.storybook/main.ts`.
- Two Vitest projects (`unit`, `storybook`) configured in `vitest.config.ts`.
- Browser-mode provider (Playwright) for the storybook project.
- Globals from `tests/vitest.setup.ts` polyfilled for the unit project; storybook project uses `.storybook/vitest.setup.ts` (project annotations setup).
- Playwright `baseURL` is the SvelteKit preview at `http://localhost:5173`.

Gaps to address:
- `playwright.config.ts`: `webServer` runs `pnpm build && pnpm preview --port 5173` for every test run; that's slow locally. Consider `pnpm dev --port 5173` for local, keep build-only for CI.
- No `data-testid` convention document/ESLint rule.
- Most stories don't have `play` functions.
- 26 e2e test files reference Storybook URLs.

## 4. Migration Strategy

For every Storybook-targeting test, decide per-case:

| Decision | New home |
| --- | --- |
| Pure "story renders visually" or "a11y" assertion | Storybook render test (already auto-generated from each story by the Vitest addon) + A11y addon |
| "story accepts args X / responds to click / keyboard" | Storybook **interaction test** — add a `play` function on the story |
| "the docs landing page for component N renders examples" | Playwright smoke on the docs route, asserting `data-testid` hooks |
| "the homepage `/` renders <h1>` ` | Playwright smoke |
| Pure cross-page navigation or full-app flow | Playwright on docs (`/demo`, `/docs`, custom examples) |

Component-internal logic that's already covered by existing unit tests
(`tests/unit/**`) need not be re-ported.

### 4.1 Data-testid convention (new)

Add `data-testid="<component>-<variant>"` to the wrapping `<div>` of every
example block on the docs page. Already in place for Avatar docs:
`avatar-basic`, `avatar-sizes`, `avatar-size-xs`, `avatar-shape-circle`, etc.
Apply this convention to every docs page that doesn't already follow it.

### 4.2 Play-function helper

Create a small reusable helper (in `tests/story-helpers.ts` or via
`storybook/test` re-exports) for the common patterns:

- `await canvas.findByRole('button', { name: /open/i })`
- `await userEvent.click(el)`
- `await userEvent.keyboard('{Enter}')`
- `await expect(canvas.getByRole('dialog')).toBeVisible()`

Reuse `fn()` from `storybook/test` for spy/mock args.

## 5. File-by-File Checklist

Legend:
- `[STORY]` = port to Storybook story interaction test (add `play` function)
- `[DOCS]` = port to docs-site Playwright smoke (uses `data-testid`)
- `[KEEP-PW]` = keep as Playwright but rewrite URL/selectors
- `✅` = already done

### 5.1 Playwright e2e tests (`tests/e2e/`)

For each row: **link the story to migrate to**, **the docs page to add
`data-testid` to**, and **the Playwright artifact to keep/replace/delete.**

#### Already on docs path (need data-testid audit + URL casing fix)

- [x] `tests/e2e/Avatar.test.js` → `/docs/components/Avatar/Avatar` ✅ → `[DOCS]`
  - Story reference: `stories/Avatar.stories.ts` (for component-level behavior via `play`)
  - Docs has full testid coverage (`avatar-basic`, `avatar-sizes`, `avatar-size-xs...lg`, `avatar-shape-*`, `avatar-status-*`, `avatar-bordered`, `avatar-shadowed`, `avatar-gravatar`, `avatar-initials`, `avatar-fallback`). ✅
  - **Add legend expectations**: enforce `avatar-fallback` shows `.avatar-fallback`, etc.
  - **Port to Storybook**: each `<Avatar size=…>` etc. can be a render test. The "image loads", "maintains aspect ratio", "ARIA" assertions move to story `play` functions using `expect(img).toBeInTheDocument()` / `expect(img.getAttribute('src')).toContain('gravatar.com/avatar/')`.

- [x] `tests/e2e/Container.test.js` → `/docs/components/Container/Container` ✅ → `[DOCS]`
  - Story: `stories/Container.stories.js`.
  - "basic" / "fluid" testids already present.
  - Behavior (class names matching `container` / `w-full`) → Storybook `play` function per story.

- [ ] `tests/e2e/themetoggle.test.ts` → currently goes to `/docs/components/themetoggle` (casing mismatch; docs page is at `/docs/components/ThemeToggle/ThemeToggle`) → `[DOCS]`
  - **Fix URL**: `/docs/components/ThemeToggle/ThemeToggle` (PascalCase).
  - Story: `stories/ThemeToggle.stories.js`.
  - Port 14 tests across 4 `describe` blocks to:
    1. **Storybook `play` functions**: rendering, ARIA, hidden checkbox, moon/sun icon swap, click toggle, keyboard (Space) toggle, basic state persistence. These are *component-level*.
    2. **Docs Playwright smoke**: nested-theming demo presence, page-header toggle works after page navigation.
  - The CSS-var test (`--color-background` swap) does not need Playwright — Storybook + A11y already covers behavior.

- [ ] `tests/e2e/demo.test.ts` → stays as-is (`/` smoke) → `[KEEP-PW]`
  - Add: assert that the homepage contains a link to `/docs` and links to component cards.
  - Add: same smoke against `/docs`, `/docs/components`, `/demo/paraglide`.

#### Storybook-pointing tests to migrate to docs + Storybook

| Test file | Stories to add `play` to | Docs route to add testids to | Playwright keep? |
| --- | --- | --- | --- |
| `tests/e2e/App.test.js` | `stories/...` for App: `default`, `dark-mode`, `full-layout`, `custom-widths` (likely in `App.story.md` or `App.stories.svelte` — confirm) | `/docs/components/App/App` (already exists) | Reduce to: page loads, `.app` visible, dark-mode toggle, responsive (375 vs 1024). Move behavior into story `play`. |
| `tests/e2e/AppHeader.test.js` | `stories/AppHeader.stories.svelte`: extend with `play` for mobile menu toggle (with `setViewportSize` analog), search input, notifications panel, user menu, navigation, brand logo | `/docs/components/AppHeader/AppHeader` (exists; no testids yet) | Smoke: page renders. Component behavior → story `play`. |
| `tests/e2e/Accordion.test.js` | `stories/Accordion.stories.svelte`: `Default`, `AllowMultiple`, `NoBorder` — add `play` for open/close, Enter/Space, disabled (force-click) | `/docs/components/Accordion/Accordion` (exists) | Smoke + a11y: keyboard nav. |
| `tests/e2e/App.test.js` *(already listed above)* | | | |
| `tests/e2e/AutoComplete.test.js` | `stories/AutoComplete.stories.js`: extend stories covering Default, Multiple, Loading, Disabled. Add `play` for typing, filtering, selection, removal, disabled-typing reject. | `/docs/components/Form/AutoComplete` (exists) | Smoke + dropdown CSS-class assertions per state. |
| `tests/e2e/BottomBar.test.js` | `stories/BottomBar.stories.js`: Default, Disabled, Docked | `/docs/components/BottomBar/BottomBar` (exists) | Smoke. |
| `tests/e2e/Card.test.js` | `stories/Card.stories.js`: Default, WithMedia, WithFooter, Clickable | `/docs/components/Panel/Card` (exists) | Smoke. |
| `tests/e2e/Calendar.test.js` | `stories/Calendar.stories.js`: Default, DateRange, WithMinMax, CustomFormat, Disabled | `/docs/components/Form/Calendar` (exists) | Smoke. Playwright keeps a "Calendar opens via click", "keyboard nav with arrow keys", "Calendar closes when selecting a date". |
| `tests/e2e/Checkbox.test.js` | `stories/Checkbox.stories.js`: Default, WithDescription, Indeterminate, Required, WithError, Disabled, DisabledChecked, WithValue, Group | `/docs/components/Form/Checkbox` (exists) | Smoke. |
| `tests/e2e/CodeBlock.test.js` | `stories/CodeBlock.stories.js`: JavaScript, TypeScript, Html, Css, Json, AutoDetect | `/docs/components/CodeBlock/CodeBlock` (exists) | Smoke (rendering across languages). |
| `tests/e2e/CodeBlockSpeed.test.js` | `stories/CodeBlockSpeed.stories.js`: Default, Javascript, TypeScript, Python, Html, Css, Json, Bash, Markdown, AutoDetect, WithCustomClass — note the test references `components-codeblockspeeed--default` (typo: "speeed"); story ID should be `codeblockspeed` | `/docs/components/CodeBlockSpeed/CodeBlockSpeed` (exists) | Smoke. |
| `tests/e2e/CodeEditor.test.js` | `stories/CodeEditor.stories.js`: Default, DarkTheme, CustomHeight, Dracula, Json, Jsx, Svelte | `/docs/components/CodeEditor/CodeEditor` (exists) | Smoke. |
| `tests/e2e/ColorPicker.test.js` | `stories/ColorPicker.stories.js`: Default, RgbFormat, RgbaFormat, HslFormat, WithError, Disabled | `/docs/components/Form/ColorPicker` (exists) | Smoke. |
| `tests/e2e/Input.test.js` | `stories/Input.stories.js`: Default, FloatingLabel, WithError, WithIcons, WithMask, Disabled, Readonly, Required, WithHelpText | `/docs/components/Form/Input` (exists) | Smoke. |
| `tests/e2e/LazyPanel.test.js` | `stories/LazyPanel.stories.js`: Default, WithCustomLoading, MultipleWithScroll | `/docs/components/Panel/LazyPanel` (exists) | Smoke. Note: "multiple-with-scroll" needs an extra scroll-to-bottom mechanism in Storybook; it may stay as Playwright only. |
| `tests/e2e/Map.test.js` | `stories/Map.stories.ts`: Default, CustomCenter, CustomTileLayer, NoZoomControl, NoAttribution | `/docs/components/Map/Map` (exists) | Smoke. (Map tile render in headless browser can be flaky; keep "container is visible" as docs smoke only.) |
| `tests/e2e/Panel.test.js` | `stories/Panel.stories.js`: Default, Disabled | `/docs/components/Panel/Panel` (exists) | Smoke. |
| `tests/e2e/PanelCardSnippets.test.js` | Add `play` to `stories/Panel.stories.js` Default + `stories/Card.stories.js` Default to verify snippet-prop rendering | `/docs/components/Panel/Card` (exists) | Smoke. |
| `tests/e2e/Select.test.js` | `stories/Select.stories.js`: Default + variants | `/docs/components/Form/Select` (exists) | Smoke. |
| `tests/e2e/Separator.test.js` | `stories/Separator.stories.js`: Default, Vertical, WithText, WithIcon, WithLabel, Complex — **add stories**: `Primary`, `Success`, `Warning`, `Error` (test references each color variant story) | `/docs/components/Separator/Separator` (exists) | Smoke. All four ARIA / orientation / hr-vs-div assertions move to story `play`. |
| `tests/e2e/ThemeToggle.test.js` | Already covered by `themetoggle.test.ts` (the lowercase URL one); choose one to keep — name the suite explicitly so we don't have two competing files. Move either the typed-file contents into `stories/ThemeToggle.stories.js` `play` functions and delete one of the Playwright files. | `/docs/components/ThemeToggle/ThemeToggle` (exists) | One of the two Playwright files combines into one. **Recommend**: Delete `tests/e2e/ThemeToggle.test.js`, keep `tests/e2e/themetoggle.test.ts` and fix its casing (or rename to `ThemeToggle.test.ts`). |
| `tests/e2e/TreeMenu.test.js` | `stories/TreeMenu.stories.svelte`: Default, WithNestedItems, WithActions, ComplexHierarchy, TextOnly — add `play` for expand/collapse, link-rendering, click action (`alert` dialog), keyboard nav | `/docs/components/TreeMenu/TreeMenu` (exists) | Smoke. |

After migration, the Playwright e2e surface should look like:

```
tests/e2e/
  demo.test.ts              # /, /docs, /docs/components, /demo/paraglide
  Avatar.test.js            # docs (already migrated; trim dupes with stories)
  Container.test.js         # docs (already migrated; trim dupes)
  themetoggle.test.ts       # docs, single source of truth for theme toggle docs smoke
  Accordion.test.js         # docs smoke + keyboard
  AppHeader.test.js         # docs smoke + responsive viewport checks
  App.test.js               # docs smoke + responsive viewport checks
  AutoComplete.test.js      # docs smoke
  BottomBar.test.js         # docs smoke
  Card.test.js              # docs smoke
  Calendar.test.js          # docs smoke + keyboard nav
  Checkbox.test.js          # docs smoke
  CodeBlock.test.js         # docs smoke
  CodeBlockSpeed.test.js    # docs smoke
  CodeEditor.test.js        # docs smoke
  ColorPicker.test.js       # docs smoke
  Input.test.js             # docs smoke
  LazyPanel.test.js         # docs smoke + scroll-to-load
  Map.test.js               # docs smoke (map only)
  Panel.test.js             # docs smoke
  PanelCardSnippets.test.js # delete OR keep as a focused snippet-API test
  Select.test.js            # docs smoke
  Separator.test.js         # docs smoke
  TreeMenu.test.js          # docs smoke
```

…and a single optional `tests/e2e/docs.spec.ts` that smoke-tests every docs route
listed under `src/routes/docs/components/**/+page.svelte`.

### 5.2 Stories to extend (`stories/`)

For each story file we update, **add a `play` function** to the existing
`Default` story (and to each named variant) containing the e2e behavior assertion.
Take advantage of the Storybook Vitest addon's auto-rendering — every story
becomes a render test, and stories with `play` become interaction tests.

Priority order (matches the file-by-file order above):

1. Avatar, Container, ThemeToggle — already partially in good shape.
2. Accordion, AppHeader, App.
3. AutoComplete, BottomBar, Card, Calendar, Checkbox.
4. CodeBlock, CodeBlockSpeed, CodeEditor, ColorPicker, Input.
5. LazyPanel, Map, Panel, Select, Separator, TreeMenu.

Add new stories where the e2e test references a variant that doesn't exist:
- `Separator`: Primary, Success, Warning, Error variants.
- Anything else flagged in section 5.1.

### 5.3 Docs pages to add `data-testid` to

For each docs route, wrap each example `<div>` in a parent with
`data-testid="<component>-<variant>"`. Already done: Avatar, Container.
Need to do:
- App, AppHeader, Accordion, AutoComplete, BottomBar, Card, Calendar,
  Checkbox, CodeBlock, CodeBlockSpeed, CodeEditor, ColorPicker, Container
  (done ✅), Input, LazyPanel, Map, Panel, Panel/Card, Select, Separator,
  ThemeToggle, TreeMenu, plus the static `/docs/components` index,
  `/docs/examples/dashboard`, `/docs/examples/game-map`, `/docs/theming`,
  `/`.

### 5.4 `tests/unit/**`

No changes expected. They already run inside `vitest --project=unit`. Confirm no
unit tests still rely on Storybook globals; if any do, port the assertions to
storybook/test API equivalents.

## 6. CI / Scripts Updates

`package.json` scripts (current vs. target):

```diff
- "test:e2e": "playwright test",
+ "test:e2e": "playwright test",
+ "test:e2e:ui": "playwright test --ui",
+ "test:e2e:headed": "playwright test --headed",
```

Add to `package.json`:
```diff
  "test": "pnpm run test:e2e && pnpm run test:unit",
+ "test:all": "pnpm run test:storybook && pnpm run test:e2e && pnpm run test:unit",
```

Already present:
- `test:storybook`: `vitest --project=storybook`
- `test:unit`: `vitest run --project=unit`

`playwright.config.ts` (no edit needed for URLs; target = SvelteKit preview at
5173):
- For local dev, optionally add a `webServer` command override:
  `pnpm dev --port 5173` (faster) when `process.env.NODE_ENV !== 'CI'`
- Otherwise leave as is.

Add to CI:
- The existing GitHub Actions workflow (`.github/workflows/publish.yml` —
  inspect before editing) should run `pnpm test:all` (or at minimum
  `pnpm test:storybook` & `pnpm test:e2e`) before publishing.
- Add a `.github/workflows/test.yml` if missing, that runs unit + storybook +
  e2e on every push/PR.
- Per Storybook CI doc: `image: mcr.microsoft.com/playwright:v1.58.2-noble`
  (or matching our `@playwright/test ^1.60.0` version).

## 7. Storybook Vitest addon: cheat-sheet

We're following the official docs we read:

- `npx storybook add @storybook/addon-vitest` is already done (we see it in
  `.storybook/main.ts` and `vitest.config.ts`).
- Stories become tests automatically (one render test per story).
- Interactive stories use `play`:
  ```ts
  export const Opens: Story = {
    play: async ({ canvas, userEvent, args }) => {
      await userEvent.click(canvas.getByRole('button', { name: /open/i }));
      await expect(canvas.getByRole('dialog')).toBeVisible();
    },
  };
  ```
- Mock callbacks with `args: { onSubmit: fn() }` and assert with
  `expect(args.onSubmit).toHaveBeenCalledWith(...)`.
- Enable the Accessibility checkbox in the testing widget to run a11y per
  story. Wire `@axe-core/playwright` (or use the official
  `@storybook/addon-a11y`) so a11y checks run automatically.
- `process.env.BROWSER === 'true'` already exported in `vitest.config.ts`
  for Storybook component initialization.
- `tests/vitest.setup.ts` polyfills for the unit project must NOT bleed into
  the storybook project; the storybook project uses
  `.storybook/vitest.setup.ts` (already wired).

## 8. New Docs-Site Tests to Add

- `tests/e2e/docs-pages.spec.ts` — generic smoke that visits every
  `/docs/components/<C>/<C>` page, verifies it has an `<h1>` and the
  expected root data-testid.
- `tests/e2e/homepage.spec.ts` — extends `demo.test.ts`: hero CTA links,
  feature cards, ThemeToggle presence, responsive nav at 375px.
- `tests/e2e/docs-components-index.spec.ts` — `/docs/components` lists
  all components.

## 9. Resolved Decisions

Each of the four open questions below has been resolved with rationale and
implementation steps. Status moved from **Draft** → **Decisions approved,
ready for pilot**.

### 9.1 Story-ID typo: `codeblockspeeed` → `codeblockspeed` — **Fix tests**

**Decision.** Update every reference to `codeblockspeeed` in
`tests/e2e/CodeBlockSpeed.test.js` to `codeblockspeed`. Do **not** rename the
story.

**Rationale.**
- The Storybook story file `stories/CodeBlockSpeed.stories.js` declares
  `title: 'Components/CodeBlockSpeed'` (correct).
- Storybook's deterministic story-id slug rule (from `@storybook/csf`'s
  `pathToId`) is: lowercase, replace `/` and whitespace with `-`.
  → `Components/CodeBlockSpeed` ⇒ `components-codeblockspeed`. The
  underlying story is the source of truth.
- Story-ids are referenced from many places (Storybook URLs, the Vitest
  addon's test names, the Accessibility addon's per-story reports, deep
  links from docs). Renaming a story to match a test typo would create 14+
  references we would later have to fix again.
- The test file already needs to be rewritten anyway (URL → docs route),
  so fix the typo at the same time.

**Implementation.**
- `tests/e2e/CodeBlockSpeed.test.js`: replace all `codeblockspeeed`
  occurrences with `codeblockspeed` (14 references per
  `tests/e2e/CodeBlockSpeed.test.js`).
- Add a Vitest unit test on `stories/TitleRegistry.test.ts` (optional,
  nice-to-have): assert every story title in `stories/` parses to the
  expected slug. Blocks accidental typos like this in the future.

### 9.2 Two ThemeToggle Playwright files — **Keep typed file, delete the .js**

**Decision.**
1. Rename `tests/e2e/themetoggle.test.ts` → `tests/e2e/ThemeToggle.test.ts`
   (matches the casing convention used by `Avatar.test.js`,
   `Container.test.js`, etc., which match the SvelteKit docs route casing).
2. Fix its `beforeEach` URL to `/docs/components/ThemeToggle/ThemeToggle`
   (the actual route at `src/routes/docs/components/ThemeToggle/ThemeToggle/+page.svelte`).
3. Slim it down to **docs smoke** tests only (the seven "ThemeToggle
   Component" describe-blocks become replacements for component-level behavior,
   which move into the story).
4. **Delete** `tests/e2e/ThemeToggle.test.js` outright — its story URL is
   dead since `playwright.config.ts` boots the SvelteKit preview at 5173.

**Rationale.**
- `ThemeToggle.test.js` (4 tests) hits `?path=/story/components-themetoggle--default`,
  which no longer resolves — `playwright.config.ts` boots the docs preview
  on 5173, with `baseURL` `http://localhost:5173`. The `.js` file is
  already broken; repairing it offers no value.
- `themetoggle.test.ts` (14 tests across 4 describe blocks) has higher
  coverage and is a small edit (one URL casing, plus the rename).
- Story-level behavior (click toggle, keyboard Space, ARIA label, moon/sun
  icon swap, persistence) should live in `stories/ThemeToggle.stories.js`
  via `play` functions — that is what the Storybook Vitest addon is for.
- Confirmed from `src/lib/components/ThemeToggle/ThemeToggle.svelte` that
  the selectors the `.ts` file uses (`[data-twintrinsic-theme-toggle]`,
  `.tw-theme-toggle-button`, `.tw-theme-toggle-icon-moon`,
  `.tw-theme-toggle-icon-sun`, `[data-theme]`) are valid CSS-class /
  data-attribute hooks emitted by the component itself, not custom
  testids. So we don't need to add testids to the docs page — the
  selectors work as-is once we scope them to a single toggle in a
  `[data-theme]` section.

**Implementation (post-rename, slim content).**
- Retain only:
  - Basic rendering / ARIA / checkbox presence on the docs page.
  - Sun ↔ moon icon swap on a single toggle within one `[data-theme]`
    section.
  - Nested-theming smoke: verify that the docs page renders ≥3
    `[data-theme]` sections, and clicking a level-2 toggle does not change
    a level-1 sibling's `--color-background`.
- Migrate into `stories/ThemeToggle.stories.js`'s `play`:
  - Click-toggles-checkbox (`ThemeToggle/default/play`).
  - Space-from-focus toggles (`ThemeToggle/default`).
  - ARIA label updates after click.
  - Icon swap (`ThemeToggle/default`).
  - Persistence (Mount + click + unmount + remount → checked) — use
    `composeStories` or a manual remount.

### 9.3 `@storybook/addon-a11y` — **Yes, enable it**

**Decision.** Add `@storybook/addon-a11y` to the addons list in
`.storybook/main.ts`. Treat per-story a11y violations the same as other
test failures in CI.

**Rationale.**
- Accessibility is a stated core principle of Twintrinsic (AGENTS.md,
  "Accessibility" #2) and is enforced at compile time by
  `scripts/check-a11y.sh`. Adding runtime a11y in CI closes the gap.
- The Storybook docs we read
  (`https://storybook.js.org/docs/writing-tests`) explicitly say:
  *"Storybook's Accessibility (A11y) addon runs a set of automated
  checks on your stories to help ensure your components can be used by
  all users..."*
- The Vitest addon already runs every story as a render test in
  `pnpm test:storybook`; activating accessibility through the a11y
  panel extends that run to include axe-core checks at no extra
  invocation cost.
- Catching a11y regressions is enforceable but cheap — `@axe-core/playwright`
  is already available via `@vitest/browser-playwright @1.60`.
- Avoids ad-hoc `aria-label` Playwright assertions in tests/e2e/, which
  duplicate addon behavior.

**Implementation.**
- `pnpm dlx storybook add @storybook/addon-a11y` (or add manually).
  Add to `addons` in `.storybook/main.ts`:
  ```ts
  addons: [
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-mcp",
    "@storybook/addon-vitest",
  ],
  ```
- Add `a11y` configuration in `.storybook/preview.ts`:
  ```ts
  parameters: {
    a11y: {
      // 'wcag21a' + 'wcag21aa' = default in @storybook/addon-a11y v10.
      config: { rules: [{ id: 'color-contrast', enabled: true }] },
      options: { restoreScroll: true },
    },
    controls: { ... },
  },
  ```
- Update `scripts/check-a11y.sh` budget: relax per-warning count from
  the existing Svelte compile-time limit only; a11y violations in
  Storybook are surfaced through `pnpm test:storybook` and should fail
  CI loudly (no per-file throttle).
- Documentation: add to `AGENTS.md` § Code Standards → Accessibility:
  "Run `pnpm test:storybook` to validate per-story a11y before opening a
  PR. Components that legitimately need to fail a11y (e.g. decorative
  SVGs) must include an inline `// a11y-disable-next-line
  <rule-id>` and a JSDoc rationale."

### 9.4 CI workflow strategy — **Add a separate `.github/workflows/test.yml`**
                                    **and gate `publish.yml` on it**

**Decision.**
1. Create `.github/workflows/test.yml`. Triggered by `push` to main and
   on every `pull_request`. Runs all three test suites in parallel jobs.
2. Edit `.github/workflows/publish.yml` to add a `test` job (or `needs:
   test`) that re-runs the same checks before publishing.

**Rationale.**
- Currently only `.github/workflows/publish.yml` exists, gated on tag
  push (`v*`). It runs `pnpm run prepack` (build) but no tests. That
  is too late — we ship before we test.
- Two options were considered: (A) inline the test steps in
  `publish.yml`; (B) separate `test.yml` + GitHub Actions
  `workflow_run` from `test.yml` to gate publishing.
- B is the standard GitHub Actions pattern and gives us per-PR test
  feedback (faster than waiting for a tag). `publish.yml` already
  trusts tags, so we layer the test gate on top with `workflow_run` or
  a `test` job in the same file with `needs`.
- Node version: `.nvmrc` is `v24.10.0` (dev-time only); `publish.yml`
  pins `'20'`. We are align with the Storybook CI doc example
  (`22.12.0`) for the test workflow — it matches `@types/node ^22.19.7`
  we have in devDeps, Storybook 10's documented requirement, and keeps
  `./static/storybook` builds stable.
- The Playwright image (`mcr.microsoft.com/playwright:v1.58.2-noble`)
  is recommended by the Storybook CI example and saves ~30s per run by
  pre-installing Chromium. We use it for the `e2e` and `storybook` jobs.

**Implementation — `.github/workflows/test.yml` (new).**
```yaml
name: Tests
on:
  push:
    branches: [main]
  pull_request: {}
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 8 }
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:unit
  build-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 8 }
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm check
      - run: pnpm check:lib
      - run: pnpm check:a11y
  storybook:
    # Browser-mode Vitest + a11y via @storybook/addon-a11y.
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.58.2-noble
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 8 }
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:storybook
  e2e:
    # SvelteKit preview at 5173, Playwright drives the browser.
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.58.2-noble
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 8 }
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:e2e
```

**Implementation — `.github/workflows/publish.yml` (edits).**
Add a `test` job identical to the new workflow's logic, and chain
`publish.needs: test` so a tag push only publishes when the test
sweep succeeds. Locally, `pnpm test:all` runs the same gate.

### 9.5 Other resolved decisions (the original § 9 questions 3 and 5)

- **Map render stability in Playwright** — keep `Map.test.js` as docs
  smoke only. We assert only that the Map container has the
  `data-testid="map"` and a non-zero bounding box. Leaflet tile load is
  flaky in headless Playwright and is already covered visually via the
  story's render test; do **not** assert tile pixel data.
- **Visual regression** — defer to Chromatic. `pnpm chromatic` (already
  available via `@chromatic-com/storybook`) is run on pushes to main.
  We do **not** add `toHaveScreenshot()` per story yet, to keep CI
  runtime under 5 minutes.

## 10. Rollout Order (maximize parallelism, minimize regressions)

1. **Phase A — Scaffolding**
   - Confirm `pnpm test:storybook` runs the existing stories.
   - Add `data-testid="<component>-<variant>"` to every docs page.
   - Enable `@storybook/addon-a11y` in `.storybook/main.ts` (per § 9.3).
   - Add `.github/workflows/test.yml` (per § 9.4).
   - Establish the `play` helper convention.
   - Fix `CodeBlockSpeed` story-id typo (per § 9.1; 14 lines in
     `tests/e2e/CodeBlockSpeed.test.js`).
   - Delete `tests/e2e/ThemeToggle.test.js`; rename the typed
     counterpart (per § 9.2).
2. **Phase B — One pilot component** (Avatar, easiest)
   - Add `play` functions to every `stories/Avatar.stories.ts` story.
   - Trim `tests/e2e/Avatar.test.js` to a docs smoke.
3. **Phase C — Bulk migration** (rest of the components in 5.1)
   - Add `play` functions to each story file.
   - Add/extend stories for missing variants (Separator).
   - Trim/replace each e2e file to docs smoke.
4. **Phase D — Docs-site coverage**
   - Add `tests/e2e/docs-pages.spec.ts`,
     `tests/e2e/homepage.spec.ts`,
     `tests/e2e/docs-components-index.spec.ts`.
5. **Phase E — CI gating**
   - Verify the new `test.yml` passes end-to-end on a draft PR.
   - Edit `publish.yml` to add `needs: test`.
6. **Phase F — Cleanup**
   - Delete `tests/e2e/ThemeToggle.test.js` (already done in Phase A).
   - Delete any other dead files in `stories/`: `stories/AppHeader.test.js`,
     `stories/Sidebar.test.js`, `stories/Separator.test.js`,
     `stories/BottomBar.test.js` — these are leftovers from a previous
     `@storybook/test-runner` era and should be moved to `tests/unit/` if
     still wanted, otherwise removed.

## 11. Acceptance Criteria

- [ ] No file under `tests/e2e/` references `localhost:6006`.
- [ ] No `codeblockspeeed` string anywhere in the repo.
- [ ] Exactly one `tests/e2e/ThemeToggle.test.ts` (renamed from
      lowercase, with corrected docs URL).
- [ ] `@storybook/addon-a11y` listed in `.storybook/main.ts` addons.
- [ ] `.github/workflows/test.yml` exists; runs `unit`, `storybook`,
      `e2e` jobs on every PR.
- [ ] `publish.yml` requires `test` job success.
- [ ] Every e2e file has at most 5–10 docs smoke assertions per file
      (no per-instance duplication across stories).
- [ ] Every story file has at least one story (the `Default` story is
      already implicit) and `play` functions for any non-trivial behavior.
- [ ] `pnpm test:unit` succeeds.
- [ ] `pnpm test:storybook` succeeds (browser-mode, through Playwright).
- [ ] `pnpm test:e2e` succeeds (SvelteKit docs preview on 5173).
- [ ] Accessibility addon passes (no a11y violations in CI).

## 12. References

- Storybook testing hub: <https://storybook.js.org/docs/writing-tests>
- Interaction testing / `play`: <https://storybook.js.org/docs/writing-tests>
  (we already read this — the doc shows exact `canvas`, `userEvent`, `fn`,
  `beforeEach`, `expect` usage).
- Accessibility testing: <https://storybook.js.org/docs/writing-tests>
  (referenced from the hub; the `@storybook/addon-a11y` addon runs axe-core
  automatically).
- CI example workflow (Playwright image, Node setup): see the verbatim
  example in `docs/plans/E2E_TO_STORYBOOK_MIGRATION_PLAN.md` § 6.
- Documented conventions for this repo: AGENTS.md (component patterns,
  `data-testid`, Tailwind), `scripts/check-a11y.sh` (a11y budget).
