# Twintrinsic
A tailwind-based collection of svelte components.

# WTF is Twintrinsic?
I got this idea during the christmas break of 2022 when I was looking for a new UI library that was flexible enough to allow me to extend it in ways I wanted and had good accessibility support. After combing through a bunch, I got the idea to try to create a small lib that was basically extensions of HTML. Since HTML elements already have basic accessibility built-in, it's a no-brainer to use these instead of fancy custom elements. I also wanted to use Tailwind for its themeability and easy customization. HTML in intrinsic to the web and tailwind is an extension, so i got `tailwind + intrinsic = twintrinsic`.

# Performance
I am not going to worry about performance for now. I am going to use available HTML and CSS as much as possible, without using Javascript for interactivity unless absolutely necessary. This should keep the compiled bundle pretty performant. My main focus is going to be on code readability, accessibility, and extensibility.

## Components:
This is in order of hierarchy.

### Layout & Containers
- [x] **Container** - Responsive layout wrapper for organizing page content
  - [x] **Panel** - Flexible container with optional header and collapsible content
    - [x] **Sidebar** - Fixed or sliding panel that attaches to the side of parent
    - [x] **BottomBar** - Navigation bar anchored to the bottom of the viewport
    - [x] **Accordion** - Expandable/collapsible sections with one active at a time
    - [x] **Card** - Elevated container for grouping related content
    - [x] **Lazy** - Deferred content loading when card becomes visible
    - [x] **Hero** - Large banner section for prominent messaging
  - [x] **AppHeader** - Top navigation bar for application header
  - [x] **App** - Root application wrapper with layout management
    - [x] **Split** - IDE-style resizable panels with drag-to-resize dividers

- [x] **Separator** - Visual divider (horizontal/vertical) with optional text or icon

### Form Components
- [x] **Input** - Base text input with validation and floating labels
- [x] **TextInput** - Extended text input with masking support
- [x] **Textarea** - Multi-line text input with auto-resize
- [x] **Checkbox** - Accessible checkbox with configurable states and icons
- [x] **Radio** - Single-select radio button
- [x] **RadioGroup** - Group of radio buttons with unified state
- [x] **Switch** - Toggle switch component
- [x] **Select** - Dropdown select with option groups
- [x] **Combobox** - Searchable select with filtering
- [x] **AutoComplete** - Input with autocomplete suggestions
- [x] **Dropdown** - Dropdown menu with cascading support
- [x] **Listbox** - Scrollable list of selectable items
- [x] **ListInput** - Multiple value input with removable chips
- [x] **NumberInput** - Numeric input with increment/decrement controls
- [x] **Slider** - Range slider with min/max values
- [x] **Knob** - Circular progress slider for rotational input
- [x] **Rating** - Star or icon-based rating input
- [x] **ColorPicker** - Color selection with hex/RGB input
- [x] **Calendar** - Date picker with month/year navigation
- [x] **FileUpload** - File input with drag-and-drop support
- [x] **FloatLabel** - Label that floats above input on focus
- [x] **Form** - Form wrapper with validation handling
- [x] **FormField** - Form field wrapper with label and error display
- [x] **InputSwitch** - Toggle switch variant
- [x] **InvalidState** - Error state display for form fields

### Data Display
- [x] **DataTable** - Sortable, filterable table with pagination
- [x] **Table** - Semantic HTML table with styling
- [x] **TableHeader** - Table header row
- [x] **TableBody** - Table body wrapper
- [x] **TableRow** - Table row
- [x] **TableCell** - Table cell
- [x] **Carousel** - Image/content carousel with navigation
- [x] **CarouselItem** - Individual carousel slide
- [x] **Timeline** - Vertical or horizontal timeline display
- [x] **TimelineItem** - Individual timeline event
- [x] **Tree** - Hierarchical tree view with expand/collapse
- [x] **TreeNode** - Individual tree node

### Navigation & Menus
- [x] **Button** - Primary action button with variants
- [x] **ButtonGroup** - Grouped buttons with unified styling
- [x] **Breadcrumb** - Navigation breadcrumb trail
- [x] **BreadcrumbItem** - Individual breadcrumb item
- [x] **Menu** - Dropdown menu with items
- [x] **MenuItem** - Individual menu item
- [x] **Tabs** - Tab navigation with panels
- [x] **Tab** - Individual tab
- [x] **TabList** - Tab list container
- [x] **TabPanel** - Tab panel content

### Feedback & Overlays
- [x] **Modal** - Dialog modal with backdrop
- [x] **Tooltip** - Hover tooltip with positioning
- [x] **Toast** - Notification toast messages
- [x] **Progress** - Linear progress bar
- [x] **Skeleton** - Loading skeleton placeholder
- [x] **Stepper** - Step indicator for multi-step processes
- [x] **StepperStep** - Individual stepper step

### Misc & Utilities
- [x] **Avatar** - User avatar with initials or image
- [x] **AvatarGroup** - Group of avatars with overlap
- [x] **Badge** - Small label/badge component
- [x] **Chip** - Small removable tag/chip
- [x] **ChipGroup** - Group of chips
- [x] **Tag** - Label tag component
- [x] **TagGroup** - Group of tags
- [x] **Icon** - Icon component with customizable size/color
- [x] **Masonry** - Masonry grid layout
- [x] **ThemeToggle** - Dark/light mode toggle
- [x] **CodeBlock** - Syntax-highlighted code display
- [x] **CodeBlockSpeed** - High-performance code block
- [x] **CodeEditor** - Interactive code editor

### Not Yet Implemented
- [ ] Advanced
  - [ ] Editor - Full-featured text editor
  - [ ] Terminal - Terminal emulator component
- [ ] General
  - [ ] Localization - Multi-language support
  - [ ] Theming - Advanced theming system
  - [ ] Specifying Iconsets - Custom icon set configuration using iconify
- [ ] Data
  - [ ] DataView - Alternative data display format
  - [ ] VirtualScroller - Virtual scrolling for large lists
  - [ ] FilterService - Data filtering utilities
  - [ ] FullCalendar - Full calendar view
  - [ ] OrderList - Draggable ordered list
  - [ ] OrganizationChart - Organizational hierarchy chart
  - [ ] Paginator - Pagination controls
  - [ ] PickList - Dual-list picker
  - [ ] TreeTable - Tree with table structure
- [ ] Overlay
  - [ ] ConfirmDialog - Confirmation dialog
  - [ ] ConfirmPopup - Confirmation popup
  - [ ] Dialog - Generic dialog
  - [ ] DynamicDialog - Dynamically created dialogs
  - [ ] OverlayPanel - Overlay panel
- [ ] File
  - [ ] Upload - Advanced file upload
- [ ] Menu
  - [ ] ContextMenu - Right-click context menu
  - [ ] MegaMenu - Large dropdown menu
  - [ ] Menubar - Top menu bar
  - [ ] PanelMenu - Side panel menu
  - [ ] Steps - Step indicator menu
  - [ ] TabMenu - Tab-based menu
  - [ ] TieredMenu - Multi-level menu
  - [ ] Dock - Dock menu
- [ ] Chart
  - [ ] Pie - Pie chart
  - [ ] Doughnut - Doughnut chart
  - [ ] Bar - Bar chart
  - [ ] Line - Line chart
  - [ ] PolarArea - Polar area chart
  - [ ] Radar - Radar chart
  - [ ] Combo - Combination chart
- [ ] Media
  - [ ] Image - Image component with lazy loading
  - [ ] Galleria - Image gallery
