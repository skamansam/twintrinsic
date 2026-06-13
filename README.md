# Twintrinsic

A Tailwind-based Svelte 5 component library emphasizing accessibility, extensibility, and performance through semantic HTML and CSS-first approaches.

## Project Status

**Version**: 0.0.1 (Development)

**Current Focus**: Svelte 5 migration - migrating 40 components from `createEventDispatcher` to callback props. 12 of 40 components completed.

## Philosophy

Twintrinsic was created to provide a flexible, accessible UI library that extends HTML elements rather than replacing them. Since HTML elements already have built-in accessibility, using them as the foundation ensures better a11y support. Combined with Tailwind CSS for theming and customization, the name reflects this approach: `tailwind + intrinsic = twintrinsic`.

**Core Principles**:
- **Semantic HTML First**: Use native HTML elements and attributes whenever possible
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels
- **CSS Over JavaScript**: Prefer CSS (Tailwind) for styling and simple interactions
- **Type Safety**: Full TypeScript with proper type definitions
- **Testing**: E2E (Playwright) and unit (Vitest) test coverage
- **Documentation**: Storybook stories and demo site for every component

## Technology Stack

- **Svelte 5.56.3**: Latest runes-based reactive system
- **Tailwind CSS 4.3.1**: Utility-first styling with custom theme
- **TypeScript 6.0.3**: Type safety across the codebase
- **SvelteKit 2.65.0**: Full-stack framework for demo site
- **Playwright 1.60.0**: E2E testing framework
- **Vitest 4.1.8**: Unit testing framework
- **Storybook 10.4.4**: Component documentation and testing
- **Biome 2.5.0**: Linting and formatting

## Installation

```bash
pnpm install
```

## Development

```bash
# Start SvelteKit dev server
pnpm dev

# Start Storybook for component development
pnpm storybook

# Type checking
pnpm check

# Linting and formatting
pnpm lint
pnpm format

# Testing
pnpm test          # Run all tests (e2e + unit)
pnpm test:e2e      # E2E tests only
pnpm test:unit     # Unit tests only
```

## Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview

# Build library package
pnpm prepack
```

## Components

### Layout & Containers
- **Container** - Responsive layout wrapper
- **Panel** - Flexible container with optional header
- **Sidebar** - Fixed or sliding side panel
- **BottomBar** - Bottom navigation bar
- **Accordion** - Expandable/collapsible sections
- **Card** - Elevated content container
- **Lazy** - Deferred content loading
- **Hero** - Large banner section
- **AppHeader** - Top navigation bar
- **App** - Root application wrapper
- **Splitter** - Resizable panels
- **Separator** - Visual divider
- **Section** - Content section wrapper
- **Footer** - Page footer

### Form Components
- **Input** - Base text input
- **TextInput** - Text input with masking
- **Textarea** - Multi-line text input
- **Checkbox** - Accessible checkbox
- **Radio** - Single-select radio button
- **RadioGroup** - Grouped radio buttons
- **Switch** - Toggle switch
- **Select** - Dropdown select
- **Combobox** - Searchable select
- **NumberInput** - Numeric input with controls
- **Slider** - Range slider
- **Knob** - Circular progress slider
- **Form** - Form wrapper with validation
- **FormField** - Form field wrapper

### Data Display
- **DataTable** - Sortable, filterable table
- **Table** - Semantic HTML table
- **TableHeader** - Table header row
- **TableBody** - Table body wrapper
- **TableRow** - Table row
- **TableCell** - Table cell
- **Carousel** - Image/content carousel
- **Timeline** - Timeline display
- **Tree** - Hierarchical tree view
- **Metrics** - Chart components (Area, Bar, Donut, Gauge, Line, Pie, etc.)

### Navigation & Menus
- **Button** - Action button with variants
- **Breadcrumb** - Navigation breadcrumb
- **Menu** - Dropdown menu
- **Tabs** - Tab navigation with panels
- **SidebarMenu** - Side panel menu
- **TreeMenu** - Tree-based menu

### Feedback & Overlays
- **Modal** - Dialog modal
- **Tooltip** - Hover tooltip
- **Toast** - Notification messages
- **Progress** - Linear progress bar
- **Skeleton** - Loading placeholder
- **Stepper** - Step indicator

### Misc & Utilities
- **Avatar** - User avatar
- **Badge** - Small label/badge
- **Chip** - Removable tag/chip
- **Tag** - Label tag
- **Icon** - Icon component
- **Masonry** - Masonry grid layout
- **ThemeToggle** - Dark/light mode toggle
- **CodeBlock** - Syntax-highlighted code
- **CodeBlockSpeed** - High-performance code block
- **CodeEditor** - Interactive code editor
- **Map** - Leaflet map integration
- **RenderStringOrSnippet** - String/snippet renderer

## Svelte 5 Migration Progress

**Status**: 12 of 40 components migrated from `createEventDispatcher` to callback props

**Completed Components**:
- Input, Checkbox, Radio, TextInput, Select, RadioGroup, Switch, Slider, Form, FormField, Masonry, Knob

**Remaining Components**:
- Form: Rating, Calendar, Combobox, AutoComplete, Textarea, NumberInput, ColorPicker, Dropdown, Listbox, ListInput, FileUpload
- Data Display: DataTable, Table, TableHeader, TableRow, Carousel, Chip, ChipGroup, Tag, TagGroup
- Navigation/Container: Tabs, Modal, Accordion, Button, Split, Tooltip, Tree, Stepper, Timeline, AvatarGroup

## Documentation

- **Storybook**: Run `pnpm storybook` to view component stories and documentation
- **Demo Site**: Run `pnpm dev` to view the full demo application
- **AGENTS.md**: Development guidelines for contributors

## License

MIT
