# Lib Type Errors Plan

## Current Status

- **Total errors**: 214 (was 216 in previous run; fixed 2 in last batch)
- **Files with errors**: 65
- **Baseline before Props batch**: 1,367 errors total
- **After Props batch**: 214 lib errors / 1,272 total errors

## Top Error Categories

1. **Form context untyped** (~30 errors across 13 form components) — `setValue`, `registerField`, `isDisabled`, `getValue` do not exist on type `{}`
2. ~~**App slot_def errors** (~9 errors)~~ — **RESOLVED**: Histoire stories removed (obsolete)
3. **"Type X is not assignable to type 'never'"** (10+ errors) — remaining Props interfaces incomplete
4. **`App.svelte` `Brand`/`logo` mismatch** (4 errors) — `Brand` type doesn't declare `logo` property
5. **`iconConfig` Writable issue** (1-2 errors) — used as a store when it should be the unwrapped value

## Top 15 Error Files (represent ~120 of 214 errors)

| Errors | File | Root cause |
| ------ | ---- | ---------- |
| 15 | `CodeEditor.svelte` | cascading "never" from props, has `view: any` |
| 14 | `App.svelte` | `Brand` type missing `logo`, `this` context of `void` |
| 9 | `LazyPanel.svelte` | cascading "never" |
| 8 | `ColorPicker.svelte` | form context + cascading |
| 8 | `Combobox.svelte` | cascading "never" from Props |
| 7 | `Knob.svelte` | form context |
| 7 | `FormField.svelte` | form context |
| 7 | `CarouselItem.svelte` | cascading "never" from Context |
| 6 | `Tree.svelte` | cascading context types |
| 6 | `TextInput.svelte` | form context |
| 6 | `BreadcrumbItem.svelte` | breadcrumb context untyped |
| 5 | (multiple) | form context / slot_def |
| 5 | `AppHeader.svelte` | callback props + some other |

## Remediation Phases

### Phase 1: Type the Form context (target: -30 errors)

The `Form` component provides `formContext` via `setContext("form", ...)`. Form-input components consume it via `getContext("form")` and call `.registerField()`, `.setValue()`, `.getValue()`, `.isDisabled()`, etc. Since the context is typed as `{}`, all those method calls fail.

**Fix:** Create `src/lib/components/Form/formContext.ts` exporting a `FormContext` interface, then update Form.svelte to `setContext<FormContext>("form", api)`. Update consumers to `getContext<FormContext | undefined>("form")` with proper undefined checks.

Components affected (~13): Switch, RadioGroup, Radio, InputSwitch, Calendar, ColorPicker, Knob, FormField, TextInput, AutoComplete, Listbox, ListInput, Combobox, Rating, NumberInput.

### Phase 2: ~~Migrate story files to snippet syntax~~ — OBSOLETE (Histoire removed)

`App.story.svelte` and `Hero.story.svelte` were Histoire stories. Histoire is obsolete and the stories have been removed. No migration needed.

### Phase 3: Fix App.svelte Brand type (target: -4 errors)

The `Brand` type:

```ts
type Brand = string | { name: string; logo?: string | Snippet; href?: string }
```

`logo` is declared but `.logo` access fails somewhere. Likely a `Snippet` import issue or a `.d.ts` augmentation needed.

### Phase 4: Fix CodeEditor.svelte `view: any` (target: -5 errors)

Replace `let view: any` with a proper type from `@codemirror/view` (e.g., `let view: EditorView | null = $state(null)`).

### Phase 5: Fix iconConfig Writable issue (target: -2 errors)

In some component, `iconConfig` is being passed where a store is expected. Either type it as the unwrapped value or use `$iconConfig` to auto-subscribe.

## Progress

- [x] Phase 0: Investigation (JSDoc → Props cascade root cause identified)
- [x] Phase 0a: Batch Props interface additions (~25 files, -95 errors in full check, -2 in lib)
- [x] Phase 2: ~~Migrate story files~~ — OBSOLETE (Histoire stories removed)
- [ ] Phase 1: Type Form context
- [ ] Phase 3: Fix App.svelte Brand
- [ ] Phase 4: Fix CodeEditor view type
- [ ] Phase 5: Fix iconConfig
