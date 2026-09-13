# Contributing to Twintrinsic

Thanks for contributing! This guide covers the workflows that are easy to
get wrong — start with [AGENTS.md](AGENTS.md) for the general coding
standards (Svelte 5 runes, Tailwind, rest-props conventions, testing
requirements) and come back here for the documentation/i18n workflow.

## Documentation i18n (Paraglide)

The docs site renders all prose through [Paraglide](https://paraglidejs.com)
in three locales: `en` (base), `es`, and `fa` (RTL). Every docs page is
expected to participate — a page that mixes hard-coded English prose with
`m()` calls renders half-translated in every locale.

### The golden rule

**All prose goes through `m()`. Code, demos, and identifiers stay as-is.**

`pnpm check:i18n` enforces this in CI. It scans every page that imports
`m` from `$lib/paraglide/messages.js` and fails when a text run looks like
an untranslated English sentence. These are skipped intentionally:

- `<script>` / `<style>` blocks, HTML comments
- `<CodeBlock>` / `<ExampleTabs>` demo markup and code samples
- `<pre>`, `<code>`, `<kbd>` — code tokens are not translated
- `<a>` link labels, `<strong>` / `<em>` runs
- `{#snippet …}` blocks, `{…}` Svelte expressions

If the checker flags something that *should* stay in English (an
identifier, brand name, code token), move it inside `<code>`, `<strong>`,
an `<a>` label, or a snippet — don't wrap it in a message.

### Adding or editing a translated page

1. **Import the messages module** in the page:

   ```svelte
   <script lang="ts">
   import { m } from "$lib/paraglide/messages.js"
   </script>
   ```

2. **Add keys to all three locale files** — `messages/en.json`,
   `messages/es.json`, and `messages/fa.json` must have identical key
   sets. Write real translations, not copies of the English string.

3. **Rewrite the prose** using the fragment pattern: split sentences into
   keys around the non-translatable elements:

   ```svelte
   <p>
     {m.progress_what_1()}<code>&lt;progress&gt;</code>{m.progress_what_2()}
   </p>
   ```

   Keep fragments semantically complete — a translator sees the keys out
   of context, so `"... renders a native "` is a bad key while
   `"A progress indicator built on the native "` plus
   `" element with accent-color styling."` reads fine.

4. **Reuse shared section keys** instead of creating duplicates:
   `sec_what_when_why`, `sec_what`, `sec_when`, `sec_why`, `sec_sources`,
   `sec_implementation`, `sec_mistakes`, `sec_related`,
   `sec_responsiveness`, `sec_customization`, `sec_examples`, `sec_props`,
   `sec_events`, `sec_slots`, `sec_accessibility`, `sec_keyboard`,
   `sec_key`, `sec_function`, `sec_description`, `sec_slot`.

5. **Never put braces inside a message.** ICU message format treats `{`
   and `}` as placeholders, and Paraglide HTML-escapes its output, so
   code tokens containing braces (e.g. `bg-{type}`, `` `on${string}` ``)
   must stay in markup as `&#123;` / `&#125;` entities:

   ```svelte
   <li>{m.something_1()}<code>bg-&#123;type&#125;</code>{m.something_2()}</li>
   ```

6. **Recompile Paraglide.** The generated output
   (`src/lib/paraglide/`) is gitignored — TypeScript will report
   `Property 'x' does not exist on type ...` for every new key until you
   run:

   ```bash
   npx paraglide-js compile --project ./project.inlang --outdir ./src/lib/paraglide
   ```

### Key naming

Use a page-scoped prefix matching the existing files:

| Prefix | Page |
|--------|------|
| `timer_*` | Timer |
| `lazy_*` / `lazypanel_*` | Lazy, LazyPanel |
| `ti_*` | TextInput |
| `ff_*` | FormField |
| `rg_*` | RadioGroup |
| `fb_*` | FormBuilder |
| `masonry_*` | Masonry |
| `pt_*` | PropsTable |
| `locale_*` | LocaleSwitcher |
| `invalid_*` | InvalidState |
| `themepv_*` | theming/preview |
| `exdash*` / `exshop*` / `exmap_*` | example pages |
| `card_*`, `inputswitch_*`, `selectgroup_*`, `panellazy_*` | redirect stubs |

Pattern: `page_what_1`, `page_when_2`, `page_why_<topic>`,
`page_custom_<n>_<n>`, `page_a11y_<n>`, `page_kb_<n>`,
`page_ex_<name>` for example headings.

### Redirect stubs

A stub page (e.g. `Card` → `Panel`) still imports `m` so it leaves the
i18n backlog — its single sentence is translated like any other page.
Keep the stub minimal: heading + one paragraph with the target link.

### Checking your work

```bash
pnpm check:i18n        # no untranslated prose; backlog must not grow
pnpm check             # 0 errors after recompiling paraglide
pnpm test:unit         # 105+ test files
```

The e2e suite (`pnpm test:e2e`) includes `tests/e2e/DirToggle.test.js`,
which switches each docs page to Persian and asserts the `dir="rtl"`
attribute plus translated headings. **When you translate a page, add a
locale-switch test for it** — copy the pattern:

```javascript
test("MyComponent docs page switches to Persian", async ({ page }) => {
  await page.goto("/docs/components/Category/MyComponent");
  await waitForHydration(page);

  await page.getByTestId("docs-locale-switcher").getByRole("button", { name: "فارسی" }).click();
  await waitForHydration(page);

  const heading = page.getByRole("heading", { name: "MyComponent", level: 1 });
  await expect(heading).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  // + one translated section heading that is unique to the page
});
```

### `llms.txt`

`static/llms.txt` is generated (`pnpm build:llms`, runs as part of
`pnpm build`) by extracting literal text from docs pages. Because most
pages now render prose through `m()`, the generator resolves `m.key()`
calls against `messages/en.json` — so **adding keys without regenerating
leaves the digest stale**. Regenerate it whenever you touch messages:

```bash
pnpm build:llms
```

and commit the result alongside your message-file changes.

## Pull requests

- Run `pnpm check`, `pnpm test:unit`, and `pnpm check:i18n` before pushing.
- Component changes additionally need `pnpm test:e2e` and updated
  Storybook stories + docs pages (see the checklist in AGENTS.md).
- Keep commits focused; the repo uses conventional-commit subjects
  (`feat(i18n): …`, `fix(components): …`, `docs: …`).
