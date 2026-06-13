# Type Errors Plan

**Total Errors: 1,370 (across 197 files) | svelte-check: passing (no crash)**

**Last Update: Jun 11, 2026**

> Captured from `pnpm check` on `main` @ current state. Source log:
> `/tmp/check-full.log`. The `svelte-check@4.4.5` → `4.6.0` upgrade
> fixed the `forEachResolvedModule` crash; `pnpm check` now runs and
> reports type errors. All 54 pre-existing test failures are resolved
> (414 tests passing, 0 failures, 2 skipped).

---

## Root Cause

The dominant error pattern is:

```
Type 'X' is not assignable to type 'never'
```

This is a **Svelte 5 type inference failure** in components that use
`$props()` without a proper `interface Props` declaration. When Svelte
can't infer the prop types from destructuring, it falls back to `never`,
and every consumer that passes a typed value gets this error.

Secondary patterns:
- Missing properties on `window` (`mapUrl`, `baseUrl`, `user`, `isEditor`)
- `IconConfig` Writable type issues (missing `set`/`update`/`subscribe`)
- Generic Svelte template type inference issues in docs pages

---

## Top Error Files

| Errors | File |
|--------|------|
| 125 | `src/routes/docs/components/Masonry/Masonry/+page.svelte` |
| 69 | `src/routes/docs/components/DataTable/DataTable/+page.svelte` |
| 68 | `src/routes/docs/theming/+page.svelte` |
| 33 | `src/routes/docs/components/Tag/Tag/+page.svelte` |
| 32 | `src/routes/docs/components/Tabs/Tabs/+page.svelte` |
| 32 | `src/routes/docs/components/Form/Form/+page.svelte` |
| 30 | `tests/unit/Rating.test.ts` |
| 30 | `src/routes/docs/components/Avatar/Avatar/+page.svelte` |
| 28 | `src/routes/docs/components/Form/RadioGroup/+page.svelte` |
| 23 | `src/lib/components/App/App.svelte` |
| 20 | `src/routes/docs/components/Modal/Modal/+page.svelte` |
| 20 | `src/routes/docs/components/Form/FormField/+page.svelte` |
| 20 | `src/routes/docs/components/Form/FloatLabel/+page.svelte` |
| 20 | `src/routes/docs/components/Button/Button/+page.svelte` |
| 17 | `src/routes/docs/components/Form/Knob/+page.svelte` |

**Key insight:** Most errors are in **docs pages** (consumers), not the
library code itself. The fix is to add `interface Props` declarations
to the **library components** (e.g., `App`, `AppHeader`, `Masonry`,
`DataTable`, `Tag`, `Tabs`, `Avatar`, `Modal`, `Form`, `FormField`,
`FloatLabel`, `Button`, `Knob`, `RadioGroup`).

---

## Remediation Strategy

### Phase A — Add Props interfaces to library components
Add `interface Props` declarations to the most-used components. Each
interface declaration fixes all consumer errors at once.

**Target components (by impact):**
1. `App.svelte` — 23 errors in consumers
2. `AppHeader.svelte` — many errors in consumers
3. `Avatar.svelte` — 30 errors
4. `Button.svelte` — 20 errors
5. `Masonry.svelte` — 125 errors
6. `DataTable.svelte` — 69 errors
7. `Tag.svelte` — 33 errors
8. `Tabs.svelte` — 32 errors
9. `Modal.svelte` — 20 errors
10. `Form.svelte` / `FormField.svelte` / `FloatLabel.svelte` — 20+20+20 errors
11. `Knob.svelte` — 17 errors
12. `RadioGroup.svelte` — 28 errors

### Phase B — Fix window global type augmentations
Add `declare global { interface Window { ... } }` for `mapUrl`,
`baseUrl`, `user`, `isEditor`, etc.

### Phase C — Fix IconConfig Writable types
The `iconConfig` store is typed as `Writable<IconConfig>` but is being
used as a plain object. Fix the type or the usage.

### Phase D — Fix remaining docs page issues
After Phase A-C, most docs page errors should resolve. Fix any
remaining ones with `svelte-ignore` comments or type assertions.

---

## Progress

| Phase | Status | Notes |
|-------|--------|-------|
| A — Library Props interfaces | ⏳ In progress | Starting with highest-impact files |
| B — Window global types | ⏳ Pending | |
| C — IconConfig types | ⏳ Pending | |
| D — Remaining docs fixes | ⏳ Pending | |

---

## Notes

- The 1,370 error count includes both library code and docs pages.
  Library code fixes have higher impact (one fix → many consumer errors).
- The `pnpm check` crash is fully resolved; this is now a pure type-error
  remediation workstream.
- Consider adding a CI budget guard: `pnpm check 2>&1 | grep -c 'Error:'`
  to fail the build when type errors exceed a threshold.
- Svelte 5's `ComponentProps<typeof X>` utility can be used in docs
  pages to get typed prop references without manual interfaces.
