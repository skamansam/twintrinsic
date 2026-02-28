# Type Check Errors Plan

**Total Errors: 1859 | Total Warnings: 67 | Files Affected: 197**

**Last Update: Feb 15, 2026 - 4:44pm UTC-05:00**

## Summary Statistics

| Category | Count | Status |
|----------|-------|--------|
| Documentation Files | ~800+ | ⚠️ High Priority |
| Component Type Errors | ~600+ | 🔴 Critical |
| Test File Errors | ~200+ | 🟡 Medium |
| Missing Type Annotations | ~150+ | 🟡 Medium |
| Context/Store Type Issues | ~100+ | 🟡 Medium |

---

## Error Checklist by File (Top Priority - High Error Count)

---

## Component Files with Errors (Checklist)

### High Priority - 50+ Errors Each
- [ ] **src/lib/components/Form/FileUpload.svelte** - 58 errors
  - Missing type annotations, implicit `any` parameters, variable type issues
  
- [ ] **src/lib/components/Toast/Toast.svelte** - 37 errors
  - Type mismatches with toastStore, missing type annotations
  
- [ ] **src/lib/components/Form/Form.svelte** - 34 errors
  - Missing type annotations, prop type mismatches
  
- [ ] **src/lib/components/DataTable/DataTable.svelte** - 33 errors
  - Missing type annotations, implicit `any` parameters
  
- [ ] **src/lib/components/Masonry/Masonry.svelte** - 32 errors
  - Missing type annotations

### Medium Priority - 20-49 Errors Each
- [ ] **src/lib/components/Form/Dropdown.svelte** - 29 errors
- [ ] **src/lib/components/Form/ColorPicker.svelte** - 28 errors
- [ ] **src/lib/components/Form/AutoComplete.svelte** - 28 errors
- [ ] **src/lib/components/Form/ListInput.svelte** - 26 errors
- [ ] **src/lib/components/Form/Slider.svelte** - 23 errors
- [ ] **src/lib/components/App/App.svelte** - 23 errors
  - Unused props (brand, user), prop type mismatches with child components
- [ ] **src/lib/components/Form/Combobox.svelte** - 22 errors
- [ ] **src/lib/components/Form/Select.svelte** - 21 errors
- [ ] **src/lib/components/Combobox/Combobox.svelte** - 21 errors
- [ ] **src/lib/components/Form/Calendar.svelte** - 19 errors
- [ ] **src/lib/components/Form/Listbox.svelte** - 17 errors
- [ ] **src/lib/components/Form/Knob.svelte** - 16 errors
- [ ] **src/lib/components/Form/NumberInput.svelte** - 15 errors
- [ ] **src/lib/components/CodeEditor/CodeEditor.svelte** - 14 errors
- [ ] **src/lib/components/Tabs/Tabs.svelte** - 13 errors
- [ ] **src/lib/components/Panel/LazyPanel.svelte** - 13 errors
- [ ] **src/lib/components/Chip/ChipGroup.svelte** - 12 errors
- [ ] **src/lib/components/Tree/TreeNode.svelte** - 12 errors
- [ ] **src/lib/components/Carousel/Carousel.svelte** - 11 errors
- [ ] **src/lib/components/App/App.story.svelte** - 11 errors

### Low Priority - 5-19 Errors Each
- [ ] **src/lib/components/Carousel/CarouselItem.svelte** - 9 errors
- [ ] **src/lib/components/Form/Textarea.svelte** - 8 errors
- [ ] **src/lib/components/Form/Dropdown.svelte** - 8 errors
- [ ] **src/lib/components/Sidebar/Sidebar.svelte** - 7 errors
- [ ] **src/lib/components/CodeBlock/CodeBlock.svelte** - 7 errors
- [ ] **src/lib/components/CodeBlockSpeed/CodeBlockSpeed.svelte** - 6 errors
- [ ] **src/lib/components/Metrics/StatsCard/StatsCard.svelte** - 5 errors
- [ ] **src/lib/components/Metrics/MetricGrid/MetricGrid.svelte** - 5 errors
- [ ] **src/lib/components/Metrics/KPICard/KPICard.svelte** - 5 errors
- [ ] **src/lib/components/Metrics/ProgressMetric/ProgressMetric.svelte** - 3 errors
- [ ] **src/lib/components/Menu/Menu/MenuItem.svelte** - 3 errors
- [ ] **src/lib/components/Form/Rating.svelte** - 3 errors
- [ ] **src/lib/components/Accordion/Accordion.svelte** - 3 errors
- [ ] **src/lib/components/TreeMenu/TreeMenu.svelte** - 1 error
- [ ] **src/lib/components/Tag/TagGroup.svelte** - 1 error
- [ ] **src/lib/components/Table/TableRow.svelte** - 1 error
- [ ] **src/lib/components/Table/TableHeader.svelte** - 1 error
- [ ] **src/lib/components/Panel/Panel.svelte** - 1 error
- [ ] **src/lib/components/Separator/Separator.svelte** - 2 errors
- [ ] **src/lib/components/Icon/Icon.svelte** - 2 errors
- [ ] **src/lib/components/Form/Checkbox.svelte** - 2 errors
- [ ] **src/lib/components/Card/Card.svelte** - 2 errors
- [ ] **src/lib/components/Button/ButtonGroup.svelte** - 2 errors
- [ ] **src/lib/components/Button/Button.svelte** - 2 errors
- [ ] **src/lib/components/Tabs/TabList.svelte** - 2 errors

---

## Test Files with Errors (Checklist)

### High Priority - 10+ Errors Each
- [ ] **tests/unit/Avatar.test.ts** - 27 errors
  - Component prop type mismatches
  
- [ ] **tests/unit/CodeBlock.test.ts** - 11 errors
- [ ] **tests/unit/Button.test.ts** - 10 errors
- [ ] **tests/unit/Accordion.test.ts** - 10 errors

### Medium Priority - 5-9 Errors Each
- [ ] **tests/unit/TreeMenu.test.ts** - 6 errors
  - `userEvent.setup()` doesn't exist (version mismatch)
  
- [ ] **tests/unit/Metrics/MetricGrid.test.ts** - 9 errors
  - Color type mismatch (string vs specific color union)

### Low Priority - 1-4 Errors Each
- [ ] **tests/unit/Tooltip.test.ts** - 2 errors
- [ ] **tests/unit/Toast.test.ts** - 2 errors
- [ ] **tests/unit/TimelineItem.test.ts** - 2 errors
- [ ] **tests/unit/TextInput.test.ts** - 2 errors
- [ ] **tests/unit/TagGroup.test.ts** - 2 errors
- [ ] **tests/unit/Tabs.test.ts** - 2 errors
- [ ] **tests/unit/Table.test.ts** - 2 errors
- [ ] **tests/unit/Skeleton.test.ts** - 2 errors
- [ ] **tests/unit/Separator.test.ts** - 2 errors
- [ ] **tests/unit/Rating.test.ts** - 2 errors
- [ ] **tests/unit/RadioGroup.test.ts** - 2 errors
- [ ] **tests/unit/Progress.test.ts** - 2 errors
- [ ] **tests/unit/Panel.test.ts** - 2 errors
- [ ] **tests/unit/InvalidState.test.ts** - 2 errors
- [ ] **tests/unit/FileUpload.test.ts** - 2 errors
- [ ] **tests/unit/DataTable.test.ts** - 2 errors
- [ ] **tests/unit/ChipGroup.test.ts** - 2 errors
- [ ] **tests/unit/Checkbox.test.ts** - 2 errors
- [ ] **tests/unit/ButtonGroup.test.ts** - 2 errors
- [ ] **tests/unit/BreadcrumbItem.test.ts** - 2 errors
- [ ] **tests/unit/App.test.ts** - 2 errors
- [ ] **tests/unit/Slider.test.ts** - 1 error
- [ ] **tests/unit/Knob.test.ts** - 1 error
- [ ] **tests/unit/Input.test.ts** - 1 error
- [ ] **tests/unit/ColorPicker.test.ts** - 1 error
- [ ] **tests/unit/CodeBlockSpeed.test.ts** - 1 error
- [ ] **tests/unit/Calendar.test.ts** - 1 error
- [ ] **tests/unit/Badge.test.ts** - 1 error
- [ ] **tests/unit/AutoComplete.test.ts** - 1 error

---

## Documentation Files with Errors (Checklist)

### Critical - 50+ Errors Each
- [ ] **src/routes/docs/components/Masonry/Masonry/+page.svelte** - 119 errors
- [ ] **src/routes/docs/theming/+page.svelte** - 68 errors
- [ ] **src/routes/docs/components/DataTable/DataTable/+page.svelte** - 52 errors
- [ ] **src/routes/docs/components/Tree/Tree/+page.svelte** - 50 errors
- [ ] **src/routes/docs/components/Modal/Modal/+page.svelte** - 42 errors

### High Priority - 20-49 Errors Each
- [ ] **src/routes/docs/components/Tag/Tag/+page.svelte** - 33 errors
- [ ] **src/routes/docs/components/Tabs/Tabs/+page.svelte** - 32 errors
- [ ] **src/routes/docs/components/Progress/Progress/+page.svelte** - 30 errors
- [ ] **src/routes/docs/components/Form/Form/+page.svelte** - 29 errors
- [ ] **src/routes/docs/components/Form/RadioGroup/+page.svelte** - 28 errors
- [ ] **src/routes/docs/components/Chip/Chip/+page.svelte** - 28 errors
- [ ] **src/routes/docs/components/Form/ColorPicker/+page.svelte** - 23 errors
- [ ] **src/routes/docs/components/Stepper/Stepper/+page.svelte** - 22 errors
- [ ] **src/routes/docs/components/Form/FormField/+page.svelte** - 20 errors
- [ ] **src/routes/docs/components/Form/FloatLabel/+page.svelte** - 20 errors
- [ ] **src/routes/docs/components/Button/Button/+page.svelte** - 20 errors

### Medium Priority - 10-19 Errors Each
- [ ] **src/routes/docs/components/Avatar/Avatar/+page.svelte** - 19 errors
- [ ] **src/routes/docs/components/Form/Slider/+page.svelte** - 17 errors
- [ ] **src/routes/docs/components/Form/Knob/+page.svelte** - 17 errors
- [ ] **src/routes/docs/components/Form/Rating/+page.svelte** - 16 errors
- [ ] **src/routes/docs/components/Menu/Menu/+page.svelte** - 15 errors
- [ ] **src/routes/docs/components/Form/Radio/+page.svelte** - 15 errors
- [ ] **src/routes/docs/components/Breadcrumb/Breadcrumb/+page.svelte** - 14 errors
- [ ] **src/routes/docs/components/Form/InvalidState/+page.svelte** - 13 errors
- [ ] **src/routes/docs/components/Form/InputSwitch/+page.svelte** - 13 errors
- [ ] **src/routes/docs/components/TreeMenu/TreeMenu/+page.svelte** - 12 errors
- [ ] **src/routes/docs/components/Toast/Toast/+page.svelte** - 11 errors
- [ ] **src/routes/docs/components/Form/Dropdown/+page.svelte** - 11 errors
- [ ] **src/routes/docs/components/Tooltip/Tooltip/+page.svelte** - 10 errors
- [ ] **src/routes/docs/components/Skeleton/Skeleton/+page.svelte** - 10 errors

### Low Priority - 1-9 Errors Each
- [ ] **src/routes/docs/components/+page.svelte** - 2 errors
- [ ] **src/routes/docs/examples/dashboard/+page.svelte** - 1 error
- [ ] **src/routes/docs/components/Metrics/AreaChart/+page.svelte** - 1 error
- [ ] **src/routes/docs/components/Menu/MenuItem/+page.svelte** - 1 error
- [ ] **src/routes/docs/+layout.svelte** - 1 error

---

## Other Files with Errors (Checklist)

- [ ] **src/hooks.server.ts** - 3 errors
- [ ] **src/hooks.ts** - 1 error
- [ ] **src/lib/helpers/index.ts** - 1 error
- [ ] **src/lib/actions/index.ts** - 1 error
- [ ] **src/lib/paraglide/server.js** - 1 error
- [ ] **src/routes/demo/paraglide/+page.svelte** - 1 error
- [ ] **tests/e2e/Select.test.js** - 1 error
- [ ] **tests/e2e/Checkbox.test.js** - 1 error

---

## Error Categories & Solutions

### Category 1: Documentation Code Block Syntax Errors (~800+ errors)
**Root Cause:** Malformed code examples in documentation files
**Solution:** Review and fix code block syntax in all `src/routes/docs/` files

### Category 2: Missing Type Annotations (~150+ errors)
**Error Pattern:** "Parameter implicitly has an 'any' type"
**Solution:** Add proper TypeScript types to function parameters

### Category 3: Context/Store Type Issues (~100+ errors)
**Files:** Components using context or stores
**Solution:** Properly type context values and store subscriptions

### Category 4: Component Prop Type Mismatches (~200+ errors)
**Error Pattern:** "Type 'X' is not assignable to type 'Y'"
**Solution:** Update component interfaces to accept expected props

### Category 5: Test File Type Errors (~200+ errors)
**Error Patterns:** Component prop mismatches, API version issues
**Solution:** Update test props and use correct testing library APIs

---

## Notes

- Total: 1859 errors across 197 files
- Most errors concentrated in documentation (~800) and form components (~600)
- Fixing top 10 files should eliminate ~40% of errors
- Documentation errors are likely syntax-related and may be quick wins
