# Build Warnings Summary

Total warnings: 18

## Current Warnings (from latest build)

### src/lib/components/Tabs/Tab.svelte (1 warning)
- Line 87:14 - This reference only captures the initial value of `id`. Did you mean to reference it inside a closure instead?

### src/lib/components/Tabs/TabPanel.svelte (1 warning)
- Line 80:16 - This reference only captures the initial value of `id`. Did you mean to reference it inside a closure instead?

### src/lib/components/Tag/TagGroup.svelte (1 warning)
- Line 109:8 - `<svelte:component>` is deprecated in runes mode — components are dynamic by default

### src/lib/components/Tag/Tag.svelte (1 warning)
- Line 176:2 - noninteractive element cannot have nonnegative tabIndex value

### src/lib/components/Tabs/Tabs.svelte (1 warning)
- Line 59:27 - This reference only captures the initial value of `defaultIndex`. Did you mean to reference it inside a closure instead?

### src/lib/components/Timeline/TimelineItem.svelte (1 warning)
- Line 185:2 - The attribute 'aria-disabled' is not supported by the role 'listitem'

### src/lib/components/Toast/Toast.svelte (2 warnings)
- Line 119:4 - Visible, non-interactive elements with a click event must be accompanied by a keyboard event handler. Consider whether an interactive element such as `<button type="button">` or `<a>` might be more appropriate
- Line 119:4 - Non-interactive element `<div>` should not be assigned mouse or keyboard event listeners

### src/lib/components/Tooltip/Tooltip.svelte (1 warning)
- Line 208:2 - `<div>` with a mouseenter or mouseleave handler must have an ARIA role

### src/lib/components/Tree/Tree.svelte (2 warnings)
- Line 69:41 - This reference only captures the initial value of `selected`. Did you mean to reference it inside a derived instead?
- Line 69:57 - This reference only captures the initial value of `selected`. Did you mean to reference it inside a derived instead?

### src/lib/components/Tree/TreeNode.svelte (3 warnings)
- Line 70:24 - This reference only captures the initial value of `expanded`. Did you mean to reference it inside a closure instead?
- Line 71:24 - This reference only captures the initial value of `selected`. Did you mean to reference it inside a closure instead?
- Line 252:6 - `<svelte:self>` is deprecated — use self-imports (e.g. `import TreeNode from './TreeNode.svelte'`) instead

### src/lib/components/App/App.svelte (1 warning)
- Line 47:10 - Redundant role 'main'

## Summary

**Warnings Fixed**: 438 (from 456 to 18)
**Remaining**: 18 warnings across 11 files

### Categories of Remaining Warnings:
1. **state_referenced_locally** (6 warnings) - Props captured in closures
2. **Accessibility Issues** (8 warnings) - ARIA roles, tabindex, keyboard handlers
3. **Deprecated Patterns** (2 warnings) - `<svelte:component>` and `<svelte:self>`
4. **Other** (2 warnings) - Redundant roles, unsupported ARIA attributes
