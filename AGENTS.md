# LLM Agent Guidelines for Twintrinsic

This document provides instructions for LLM agents working on the Twintrinsic component library.

## Coding Guidelines

- Use early returns when possible
- Avoid using else statements, in lieu of early returns
- Always add documentation when creating new functions and classes
- Use modern web technologies as much as possible, favoring CSS over JS where possible
- Make everything accessible and add the proper ARIA labels where necessary
- All CSS should use Tailwind classes and `@reference` the Tailwind CSS file where possible

## Documentation Guidelines

- Use JSDoc comments where necessary
- Add JSDoc types where necessary
- Reference TypeScript types in `*.d.ts` files where possible

## Project Overview

**Twintrinsic** is a Tailwind-based Svelte 5 component library emphasizing accessibility, extensibility, and performance through semantic HTML and CSS-first approaches.

- **Framework**: Svelte 5 with SvelteKit
- **Styling**: Tailwind CSS v4+
- **Testing**: Playwright (e2e) + Vitest (unit)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Documentation**: Storybook + Demo site

## Core Principles

1. **Semantic HTML First**: Use native HTML elements and attributes whenever possible
2. **Accessibility**: All components must be WCAG 2.1 compliant with proper ARIA labels
3. **CSS Over JavaScript**: Prefer CSS (Tailwind) for styling and simple interactions
4. **Type Safety**: All code must be TypeScript with proper type definitions
5. **Testing**: Every component change requires e2e and unit tests
6. **Documentation**: Every component needs Storybook stories and demo site documentation

## Technology Stack

- **Svelte 5**: Latest runes-based reactive system
- **Tailwind CSS v4.1**: Utility-first styling with custom theme in `lib/twintrinsic.css`
- **Playwright ^1.57.0**: E2E testing framework
- **Vitest ^4.0.16**: Unit testing framework
- **TypeScript ^5.9.3**: Type safety
- **Storybook ^10.1.10**: Component documentation and testing

## File Structure

```
src/
├── lib/
│   ├── components/        # Component implementations
│   ├── actions/          # Svelte actions
│   ├── twintrinsic.css   # Custom Tailwind theme
│   └── index.ts          # Public exports
├── routes/
│   ├── demo/             # Demo site routes
│   └── docs/             # Documentation pages
stories/                   # Storybook stories
tests/
├── e2e/                  # Playwright e2e tests
└── unit/                 # Vitest unit tests
```

## Component Development Workflow

### 1. Create Component File

Create component in `src/lib/components/{ComponentName}/` with TypeScript:

```svelte
<script lang="ts">
  interface Props {
    // Define all props with JSDoc
    /** Description of prop */
    propName?: string;
    onchange?: (event: CustomEvent<any>) => void;
  }

  let { propName, onchange, ...rest }: Props = $props();
</script>

<div {...rest}>
  <!-- Component markup -->
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  /* Use Tailwind classes in markup, not here */
</style>
```

### 2. Create Unit Tests

Create `tests/unit/{ComponentName}.test.ts` using Vitest:

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Component from "@/lib/components/{ComponentName}/{ComponentName}.svelte";

describe("{ComponentName}", () => {
  it("should render with default props", () => {
    render(Component);
    expect(screen.getByRole("...")).toBeInTheDocument();
  });

  it("should handle callbacks", async () => {
    const { component } = render(Component);
    // Test callback behavior
  });
});
```

### 3. Create E2E Tests

Create `tests/e2e/{ComponentName}.test.js` using Playwright:

```javascript
import { test, expect } from "@playwright/test";

test.describe("{ComponentName}", () => {
  test("should render correctly", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=...");
    const component = page.locator("[data-testid='...']");
    await expect(component).toBeVisible();
  });

  test("should handle user interactions", async ({ page }) => {
    // Test interactions
  });
});
```

### 4. Create Storybook Story

Create `stories/{ComponentName}.stories.ts`:

```typescript
import type { Meta, StoryObj } from "@storybook/svelte";
import Component from "@/lib/components/{ComponentName}/{ComponentName}.svelte";

const meta = {
  title: "Components/{ComponentName}",
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    // Define controls for props
  },
} satisfies Meta<Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomProps: Story = {
  args: {
    propName: "value",
  },
};
```

### 5. Create Documentation Page

Create `src/routes/docs/{component-name}/+page.svelte`:

- Include component description
- Show usage examples
- Document all props and events
- Highlight accessibility features
- Provide interactive examples

## Code Standards

### TypeScript

- Use strict mode (enforced by tsconfig.json)
- Define interfaces for all props
- Use JSDoc comments for public APIs
- Export types in `.d.ts` files when needed

### Svelte 5 Patterns

**Props with Runes**:
```typescript
let { propName = "default", onchange }: Props = $props();
```

**Reactive State**:
```typescript
let count = $state(0);
```

**Derived State**:
```typescript
let doubled = $derived(count * 2);
```

**Effects**:
```typescript
$effect(() => {
  // Side effects
});
```

**Callbacks (No Event Dispatcher)**:
```typescript
onchange?.(new CustomEvent("change", { detail: value }));
```

### Tailwind CSS

- Use Tailwind utility classes in markup
- Instead of creating inline colors, add them to the `@theme` rule in `lib/twintrinsic.css`
- Colors should have semantic names, such as `primary`, `secondary`, `success`, `danger`, etc.
- Reference `@/lib/twintrinsic.css` in all components
- Avoid inline styles; use Tailwind classes

Example custom theme:
```css
@theme {
  --color-primary: #your-color;
  --color-secondary: #your-color;
}
```

### Accessibility

- Use semantic HTML (`<button>`, `<input>`, `<label>`, etc.)
- Add `aria-label` or `aria-labelledby` where needed
- Ensure keyboard navigation works
- Test with screen readers
- Use `role` attributes only when semantic HTML isn't available
- Maintain color contrast ratios (WCAG AA minimum)

## Testing Requirements

### Unit Tests (Vitest)

- Test component rendering
- Test prop changes
- Test callback/event handling
- Test edge cases and error states
- Aim for >80% coverage

Run: `pnpm test:unit`

### E2E Tests (Playwright)

- Test user interactions (click, type, etc.)
- Test visual behavior
- Test accessibility (keyboard navigation, screen reader)
- Test responsive behavior if applicable
- Test in Storybook stories

Run: `pnpm test:e2e`

### Running All Tests

```bash
pnpm test          # Runs both e2e and unit tests
pnpm test:e2e      # E2E tests only
pnpm test:unit     # Unit tests only
```

## Documentation Requirements

Every component change must include:

1. **Updated Storybook Story** (`stories/{Component}.stories.ts`)
   - Add/update story for new features
   - Include all prop variations
   - Document interactive examples

2. **Updated Demo Page** (`src/routes/docs/{component-name}/+page.svelte`)
   - Explain component purpose
   - Show usage examples
   - Document all props with types
   - Document all events/callbacks
   - Highlight accessibility features
   - Provide interactive examples

3. **JSDoc Comments** in component file
   - Document all props
   - Document all callbacks
   - Explain complex logic

## Migration Notes: Event Dispatcher → Callback Props

When migrating from `createEventDispatcher` to callback props:

1. Remove `import { createEventDispatcher }`
2. Remove `const dispatch = createEventDispatcher()`
3. Add callback props to `$props()` (e.g., `onchange`, `oninput`, `onfocus`)
4. Replace `dispatch("eventName", data)` with `oncallback?.(new CustomEvent("eventName", { detail: data }))`

Example:
```typescript
// Before
const dispatch = createEventDispatcher();
dispatch("change", value);

// After
let { onchange }: Props = $props();
onchange?.(new CustomEvent("change", { detail: value }));
```

## Common Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm storybook        # Start Storybook on port 6006
pnpm build            # Build for production
pnpm preview          # Preview production build

# Testing
pnpm test             # Run all tests
pnpm test:e2e         # Run e2e tests
pnpm test:unit        # Run unit tests

# Code Quality
pnpm check            # Type check with svelte-check
pnpm lint             # Lint with Biome
pnpm format           # Format with Biome
```

## Checklist for Component Changes

- [ ] Component code updated in TypeScript
- [ ] Props documented with JSDoc
- [ ] Unit tests created/updated (`tests/unit/{Component}.test.ts`)
- [ ] E2E tests created/updated (`tests/e2e/{Component}.test.js`)
- [ ] Storybook story created/updated (`stories/{Component}.stories.ts`)
- [ ] Demo page created/updated (`src/routes/docs/{component-name}/+page.svelte`)
- [ ] All tests passing (`pnpm test`)
- [ ] Type checking passes (`pnpm check`)
- [ ] Code formatted (`pnpm format`)
- [ ] Accessibility verified (keyboard nav, ARIA labels, semantic HTML)

## Important Notes

- **No Event Dispatcher**: Svelte 5 uses callback props instead of `createEventDispatcher`
- **Runes Only**: Use Svelte 5 runes (`$state`, `$props`, `$derived`, `$effect`) instead of reactive declarations
- **Tailwind v4.1**: Uses new @theme syntax for custom colors
- **TypeScript Required**: All code must be TypeScript with proper types
- **Test Coverage**: Changes without tests will not be accepted
- **Documentation**: Changes without documentation updates will not be accepted

## Troubleshooting

### Tests Not Running
- Ensure Storybook is running on port 6006: `pnpm storybook`
- Ensure preview server is running on port 4173: `pnpm build && pnpm preview`
- Check `playwright.config.ts` for correct test directories

### Type Errors
- Run `pnpm check` to see all type errors
- Ensure all props are properly typed in component interfaces
- Check that imports use correct paths with `@/` alias

### Styling Issues
- Verify `@/lib/twintrinsic.css` is imported in component
- Check that custom colors are defined in `@theme` rule
- Use Tailwind classes, not inline styles

### Accessibility Issues
- Use semantic HTML elements
- Add ARIA labels where needed
- Test with keyboard navigation
- Verify color contrast with WCAG tools
