---
name: svelte-components
description: Guide for creating Svelte 5 components with Tailwind 4.2 and semantic HTML elements
---

# Svelte Component Development Skill

## Overview
This skill covers building accessible, performant Svelte 5 components using semantic HTML elements, Tailwind CSS 4.2 utilities, and modern reactive patterns. Prioritize native HTML elements over custom divs whenever possible.

## Core Principles

### 1. Use Semantic HTML First (Built-in Accessibility)
Always prefer native HTML elements over custom divs. Native elements come with **free accessibility** – keyboard navigation, screen reader support, and proper semantics are built-in.

**Native elements to use**:
- `<button>` instead of `<div role="button">` – includes keyboard support, focus management, click handling
- `<progress>` instead of `<div class="progress-bar">` – semantic progress indicator
- `<input>` instead of custom input wrapper – native form handling, validation, accessibility
- `<select>` instead of custom dropdown – native keyboard navigation, mobile support
- `<fieldset>` for grouped form inputs – semantic grouping
- `<label>` for form labels – automatic association with inputs
- `<nav>`, `<main>`, `<section>`, `<article>` for page structure – semantic landmarks
- `<dialog>` for modals – built-in focus management, backdrop, keyboard handling
- `<details>` and `<summary>` for accordions – native expand/collapse with keyboard support
- `<meter>` for measurements – semantic alternative to progress
- `<output>` for form results – semantic output element
- `<time>` for dates – semantic time representation

**Benefits**:
- ✅ Built-in accessibility (keyboard navigation, screen readers, focus management)
- ✅ Smaller bundle size (no custom JavaScript needed)
- ✅ Better browser support and performance
- ✅ Automatic form handling and validation
- ✅ Mobile-friendly (native mobile UI on iOS/Android)
- ✅ Reduced maintenance burden

**Only add ARIA when the native element doesn't cover it**:
```svelte
<!-- ✅ Good: Native button has all accessibility built-in -->
<button onclick={handleClick}>Click me</button>

<!-- ✅ Good: Add aria-label only when needed for clarity -->
<button aria-label="Close dialog" onclick={closeDialog}>×</button>

<!-- ❌ Bad: Adding ARIA to recreate native functionality -->
<div role="button" aria-pressed="false" onclick={handleClick}>Click me</div>

<!-- ✅ Good: Native input with label -->
<label>
  Email
  <input type="email" required />
</label>

<!-- ❌ Bad: Custom input without native element -->
<div class="custom-input">
  <span>Email</span>
  <div class="input-field"></div>
</div>
```

### 2. Accessibility First (WCAG 2.1 Compliant)
Every component must be WCAG 2.1 compliant. Start with semantic HTML, then add ARIA only when necessary:

**Accessibility requirements**:
- Use semantic HTML with proper element structure
- Add ARIA labels/descriptions only when native element doesn't provide them
- Ensure keyboard navigation works (Tab, Enter, Escape, Arrow keys)
- Maintain color contrast ratios (WCAG AA minimum: 4.5:1 for text)
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Follow W3C WAI-ARIA Authoring Practices Guide (APG) for custom widgets
- Focus indicators must be visible (never remove outline without replacement)
- Form inputs must have associated labels

**ARIA usage philosophy**:
> "No ARIA is better than bad ARIA" – Use native elements first, add ARIA only to enhance or clarify, never to replace native functionality.

### 3. Modern CSS Over JavaScript
Use Tailwind CSS 4.2 and modern CSS features for styling and interactions:
- Prefer CSS for hover, focus, active states
- Use CSS for animations and transitions
- Only use JavaScript for complex interactions
- Leverage native HTML attributes (disabled, readonly, etc.)

**Modern CSS features to use**:
- **CSS Container Queries** – Style components based on container size, not viewport
- **CSS Grid & Flexbox** – Modern layout without floats or positioning hacks
- **CSS Custom Properties (Variables)** – Dynamic theming and design tokens
- **CSS Cascade Layers** – Organize styles with proper specificity management
- **CSS Nesting** – Write cleaner, more maintainable styles
- **CSS Functions** – `clamp()`, `min()`, `max()`, `calc()` for responsive sizing
- **CSS Transitions & Animations** – Smooth interactions without JavaScript
- **CSS Subgrid** – Advanced grid layouts
- **CSS :has()** – Parent selectors for conditional styling
- **CSS @supports** – Feature detection for progressive enhancement
- **CSS Logical Properties** – `inline-start`, `block-end` for international layouts

**Example: Modern CSS with Tailwind 4.2**:
```svelte
<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  /* Use CSS custom properties for theming */
  .button {
    @apply px-4 py-2 rounded-lg font-medium transition-colors;
    background-color: var(--color-primary);
    color: var(--color-primary-text);
  }
  
  /* Use :has() for parent-based styling */
  .button-group:has(button:focus-visible) {
    @apply ring-2 ring-offset-2 ring-primary;
  }
  
  /* Use clamp() for fluid typography */
  .heading {
    font-size: clamp(1.5rem, 5vw, 3rem);
  }
  
  /* Use container queries for component-based responsive design */
  @container (min-width: 400px) {
    .card {
      @apply grid grid-cols-2;
    }
  }
  
  /* CSS nesting for cleaner organization */
  .form {
    @apply flex flex-col gap-4;
    
    & input {
      @apply px-3 py-2 border rounded-lg;
    }
    
    & input:focus-visible {
      @apply outline-none ring-2 ring-primary;
    }
  }
</style>
```

**Avoid**:
- ❌ JavaScript for simple hover/focus states
- ❌ Inline styles (use Tailwind classes)
- ❌ Old CSS patterns (floats, positioning hacks)
- ❌ Hardcoded colors (use CSS variables or Tailwind theme)
- ❌ Media queries for component sizing (use container queries instead)

### 4. Modern Web APIs (Popover, Positioning CSS, etc.)
Use modern browser APIs instead of custom JavaScript solutions:

**Popover API** – Native popover functionality with automatic click-outside handling:
```svelte
<script lang="ts">
  let popoverId = "my-popover";
  let isOpen = $state(false);

  function togglePopover() {
    const popover = document.getElementById(popoverId);
    if (popover?.matches(":popover-open")) {
      popover.hidePopover();
    } else {
      popover?.showPopover();
    }
  }
</script>

<!-- Trigger button -->
<button popovertarget={popoverId} onclick={togglePopover}>
  Open Menu
</button>

<!-- Popover content - automatically closes on click-outside -->
<div id={popoverId} popover="auto" class="popover-content">
  <button popovertarget={popoverId}>Close</button>
  <ul>
    <li><a href="/profile">Profile</a></li>
    <li><a href="/settings">Settings</a></li>
    <li><a href="/logout">Logout</a></li>
  </ul>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .popover-content {
    @apply bg-white rounded-lg shadow-lg p-4;
    /* Popover API handles positioning and backdrop */
  }
  
  /* Style the backdrop */
  .popover-content::backdrop {
    @apply bg-black/50;
  }
</style>
```

**Anchor Positioning API** – Position elements relative to an anchor without JavaScript:
```svelte
<script lang="ts">
  let anchorId = "dropdown-anchor";
</script>

<!-- Anchor element -->
<button id={anchorId}>
  Sort By
</button>

<!-- Positioned dropdown -->
<div popover="auto" anchor={anchorId} class="dropdown">
  <button value="name">Name</button>
  <button value="date">Date</button>
  <button value="size">Size</button>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  [popover] {
    /* Position relative to anchor */
    position-anchor: --dropdown-anchor;
    top: anchor(bottom);
    left: anchor(left);
    margin-top: 0.5rem;
  }
  
  [popover]::backdrop {
    @apply bg-transparent; /* Transparent backdrop for dropdowns */
  }
</style>
```

**Benefits of modern APIs**:
- ✅ No custom JavaScript for click-outside handling
- ✅ Automatic focus management and keyboard handling
- ✅ Automatic backdrop/dimming
- ✅ Automatic positioning with fallback
- ✅ Smaller bundle size
- ✅ Better accessibility (built-in)
- ✅ Mobile-friendly (respects safe areas)

**Common use cases**:
- Dropdowns with automatic positioning
- Modals with automatic backdrop
- Tooltips with anchor positioning
- Context menus with click-outside handling
- Popovers with automatic focus trapping

**Browser support** (Intrinsic Design Philosophy):
Twintrinsic uses cutting-edge modern APIs because they are superior to custom-rolled solutions. If you're using an older browser, errors may happen – that's acceptable. Modern APIs are better engineered, more accessible, and smaller than custom implementations.

- Popover API: Chrome 114+, Edge 114+, Safari 17.4+, Firefox 125+
- Anchor Positioning: Chrome 125+, Edge 125+, Safari 17.5+

Use modern APIs directly without fallbacks. The browser will error gracefully if unsupported.

## Svelte 5 Patterns

### Component Structure
```svelte
<script lang="ts">
  /**
   * Component description
   */
  interface Props {
    /** Description of prop */
    label?: string;
    /** Callback when value changes */
    onchange?: (event: CustomEvent<string>) => void;
    /** Additional CSS classes */
    class?: string;
  }

  let { label, onchange, class: className, ...rest }: Props = $props();

  // Derived state
  let isActive = $derived(someCondition);

  // Effects
  $effect(() => {
    // Side effects
  });
</script>

<button {label} class={className} {...rest}>
  {label}
</button>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  button {
    @apply px-4 py-2 rounded-lg;
  }
</style>
```

### Props with Runes
```typescript
// Basic props
let { label = "Default" }: Props = $props();

// Props with callbacks
let { onchange, onclick }: Props = $props();

// Spread remaining props
let { label, ...rest }: Props = $props();

// Props with derived state
let { value }: Props = $props();
let doubled = $derived(value * 2);
```

### Reactive State
```typescript
// Mutable state
let count = $state(0);

// Derived state (computed)
let doubled = $derived(count * 2);

// Effects (side effects)
$effect(() => {
  console.log("Count changed:", count);
});

// Effects with cleanup
$effect(() => {
  const handler = () => console.log("resize");
  window.addEventListener("resize", handler);
  
  return () => {
    window.removeEventListener("resize", handler);
  };
});
```

### Event Handling (No Event Dispatcher)
Svelte 5 uses callback props instead of `createEventDispatcher`:

```typescript
interface Props {
  onchange?: (event: CustomEvent<string>) => void;
  onclick?: (event: MouseEvent) => void;
}

let { onchange, onclick }: Props = $props();

// Dispatch custom event
function handleChange(value: string) {
  onchange?.(new CustomEvent("change", { detail: value }));
}

// Dispatch native event
function handleClick(event: MouseEvent) {
  onclick?.(event);
}
```

## Common Component Patterns

### Form Input Component
```svelte
<script lang="ts">
  interface Props {
    label?: string;
    type?: string;
    value?: string;
    disabled?: boolean;
    required?: boolean;
    onchange?: (event: CustomEvent<string>) => void;
    class?: string;
  }

  let { 
    label, 
    type = "text", 
    value = "", 
    disabled = false,
    required = false,
    onchange,
    class: className,
    ...rest 
  }: Props = $props();

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    onchange?.(new CustomEvent("change", { detail: target.value }));
  }
</script>

<div class="form-group">
  {#if label}
    <label for="input" class="block text-sm font-medium mb-2">
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
  {/if}
  
  <input
    id="input"
    {type}
    {value}
    {disabled}
    {required}
    onchange={handleChange}
    class="w-full px-3 py-2 border rounded-lg {className}"
    {...rest}
  />
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  input {
    @apply border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20;
  }
  
  input:disabled {
    @apply bg-gray-100 cursor-not-allowed;
  }
</style>
```

### Button Component
```svelte
<script lang="ts">
  type Variant = "primary" | "secondary" | "danger";
  type Size = "sm" | "md" | "lg";

  interface Props {
    label?: string;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    onclick?: (event: MouseEvent) => void;
    class?: string;
  }

  let { 
    label, 
    variant = "primary", 
    size = "md",
    disabled = false,
    onclick,
    class: className,
    ...rest 
  }: Props = $props();

  const variantClasses = $derived({
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  }[variant]);

  const sizeClasses = $derived({
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }[size]);
</script>

<button
  {disabled}
  onclick={onclick}
  class="rounded-lg font-medium transition-colors {variantClasses} {sizeClasses} {className}"
  {...rest}
>
  {label}
</button>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  button:disabled {
    @apply opacity-50 cursor-not-allowed;
  }
  
  button:focus-visible {
    @apply outline-none ring-2 ring-offset-2 ring-primary;
  }
</style>
```

### Progress Component (Using Native Element)
```svelte
<script lang="ts">
  interface Props {
    value?: number;
    max?: number;
    showValue?: boolean;
    ariaLabel?: string;
    class?: string;
  }

  let { 
    value = 0, 
    max = 100, 
    showValue = false,
    ariaLabel,
    class: className,
    ...rest 
  }: Props = $props();

  const formattedValue = $derived(Math.round((value / max) * 100));
  const progressAriaLabel = $derived(ariaLabel || `Progress: ${formattedValue}%`);
</script>

<div class="progress-container {className}">
  {#if showValue}
    <div class="progress-label">
      {formattedValue}%
    </div>
  {/if}
  
  <progress
    {value}
    {max}
    aria-label={progressAriaLabel}
    class="progress"
    {...rest}
  >
    {formattedValue}%
  </progress>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .progress-container {
    @apply w-full flex flex-col gap-2;
  }
  
  .progress-label {
    @apply text-sm font-medium text-gray-700;
  }
  
  progress {
    @apply w-full h-2 rounded-full bg-gray-200;
    accent-color: var(--color-primary);
  }
</style>
```

### Select/Dropdown Component (Using Native Element)
```svelte
<script lang="ts">
  interface Option {
    value: string;
    label: string;
  }

  interface Props {
    label?: string;
    options: Option[];
    value?: string;
    disabled?: boolean;
    required?: boolean;
    onchange?: (event: CustomEvent<string>) => void;
    class?: string;
  }

  let { 
    label, 
    options, 
    value = "", 
    disabled = false,
    required = false,
    onchange,
    class: className,
    ...rest 
  }: Props = $props();

  function handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onchange?.(new CustomEvent("change", { detail: target.value }));
  }
</script>

<div class="form-group">
  {#if label}
    <label for="select" class="block text-sm font-medium mb-2">
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
  {/if}
  
  <select
    id="select"
    {value}
    {disabled}
    {required}
    onchange={handleChange}
    class="w-full px-3 py-2 border rounded-lg {className}"
    {...rest}
  >
    {#each options as option}
      <option value={option.value}>
        {option.label}
      </option>
    {/each}
  </select>
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  select {
    @apply border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20;
  }
</style>
```

## Tailwind CSS 4.2 Integration

### Using @theme for Custom Colors
```css
@reference "../../twintrinsic.css";

@theme {
  --color-primary: #your-color;
  --color-secondary: #your-color;
}
```

### Common Tailwind Patterns
```svelte
<!-- Responsive classes -->
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<!-- Conditional classes -->
<button class:active={isActive} class:disabled={disabled}>
  Click me
</button>

<!-- Dynamic classes -->
<div class="px-{size === 'lg' ? '6' : '4'}">
  Dynamic padding
</div>

<!-- Hover/Focus states -->
<button class="bg-primary hover:bg-primary-dark focus-visible:ring-2 focus-visible:ring-offset-2">
  Interactive
</button>

<!-- Dark mode -->
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  Dark mode support
</div>
```

## Accessibility Checklist

- [ ] Uses semantic HTML elements
- [ ] Has proper ARIA labels for interactive elements
- [ ] Keyboard navigation works (Tab, Enter, Escape, Arrow keys)
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Form inputs have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Tested with keyboard only
- [ ] Tested with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Follows WAI-ARIA APG patterns

## TypeScript Best Practices

### Define Props Interface
```typescript
interface Props {
  /** Description */
  label?: string;
  /** Callback description */
  onchange?: (event: CustomEvent<string>) => void;
  /** CSS class override */
  class?: string;
}
```

### Use JSDoc Comments
```typescript
/**
 * Displays a progress bar with optional value label
 * @param value - Current progress value (0-100)
 * @param max - Maximum value (default: 100)
 * @param showValue - Whether to display the percentage
 */
interface Props {
  value?: number;
  max?: number;
  showValue?: boolean;
}
```

### Type Union for Variants
```typescript
type Variant = "primary" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses = $derived({
  primary: "bg-primary",
  secondary: "bg-gray-200",
  danger: "bg-red-500",
}[variant]);
```

## Testing Components

### Unit Test Example (Vitest)
```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Button from "$lib/components/Button/Button.svelte";

describe("Button", () => {
  it("should render with label", () => {
    render(Button, { props: { label: "Click me" } });
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("should be disabled when disabled prop is true", () => {
    render(Button, { props: { label: "Click", disabled: true } });
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

### E2E Test Example (Playwright)
```typescript
import { test, expect } from "@playwright/test";

test.describe("Button", () => {
  test("should be clickable", async ({ page }) => {
    await page.goto("/components/button");
    const button = page.getByRole("button", { name: "Click me" });
    
    await expect(button).toBeVisible();
    await button.click();
  });
});
```

## File Structure

```
src/lib/components/
├── Button/
│   ├── Button.svelte
│   └── Button.test.ts
├── Input/
│   ├── Input.svelte
│   └── Input.test.ts
├── Progress/
│   ├── Progress.svelte
│   └── Progress.test.ts
└── index.ts
```

## Checklist for New Components

- [ ] Uses semantic HTML element (not just divs)
- [ ] Props interface defined with JSDoc
- [ ] Svelte 5 runes used ($props, $derived, $effect)
- [ ] No createEventDispatcher (use callback props instead)
- [ ] Tailwind 4.2 classes used for styling
- [ ] Accessible (semantic HTML, ARIA labels, keyboard nav)
- [ ] Responsive design considered
- [ ] Unit tests written (Vitest)
- [ ] E2E tests written (Playwright)
- [ ] Storybook story created
- [ ] Documentation page created
- [ ] Type-safe (TypeScript with proper interfaces)
- [ ] No hardcoded colors (use @theme or CSS variables)
- [ ] Spread rest props to native element
- [ ] Focus states styled
- [ ] Disabled state handled

## Common Mistakes to Avoid

❌ **Using divs instead of semantic elements**
```svelte
<div role="button" onclick={handleClick}>Click</div>
```

✅ **Use native button**
```svelte
<button onclick={handleClick}>Click</button>
```

---

❌ **Using createEventDispatcher**
```typescript
const dispatch = createEventDispatcher();
dispatch("change", value);
```

✅ **Use callback props**
```typescript
let { onchange }: Props = $props();
onchange?.(new CustomEvent("change", { detail: value }));
```

---

❌ **Hardcoding colors in styles**
```css
.button {
  background-color: #3b82f6;
}
```

✅ **Use Tailwind or CSS variables**
```css
button {
  @apply bg-primary;
}
```

---

❌ **Not spreading rest props**
```svelte
<button {label}>Click</button>
```

✅ **Spread rest props to enable customization**
```svelte
<button {label} {...rest}>Click</button>
```
