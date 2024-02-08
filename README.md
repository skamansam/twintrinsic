# Twintrinsic
A tailwind-based collection of svelte components.

# WTF is Twintrinsic?
I got this idea during the christmas break of 2022 when I was looking for a new UI library that was flexible enough to 
allow me to extend it in ways I wanted and had good accessibility support. After combing through a bunch, I got the idea 
to try to create a small lib that was basically extensions of HTML. Since HTML elements already have basic accessibility 
built-in, it's a no-brainer to use these instead of fancy custom elements. I also wanted to use Tailwind for its themeability
and easy customization. HTML in intrinsic to the web and tailwind is an extension, so i got `tailwind + intrinsic = twintrinsic`.

# Performance
I am not going to worry about performance for now. I am going to use available HTML and CSS as much as possible, without 
using Javascript for interactivity unless absolutely necessary. This should keep the compiled bundle pretty performant. My
main focus is going to be on code readability, accessibility, and extensibility.

## Components:
This is in order of heirarchy.
- [ ] Container
  - [ ] Panel (collapsible content and header)
    - [ ] Sidebar (attaches to side of parent)
    - [ ] BottomBar
    - [ ] Accordion
    - [ ] Card
    - [ ] Lazy (content loads when card is visible)
    - [ ] 
  - [ ] AppHeader
  - [ ] App
    - [ ] `split` is IDE-style (resizable panels)
- [ ] Separator (visual HR/VR with text, icon, etc)
- [ ]Form
  - [ ] General (all inputs)
    - [ ] Input Validation
    - [ ] floating labels (optional)
    - [ ] compact view ("input group" with icons on left/right)
    - [ ] Placeholder
    - [ ] input masking (formatting display)
  - [ ] AutoComplete
  - [ ] Calendar
  - [ ] Checkbox
    - [ ] configurable states / icons
  - [ ] ListInput (multiple value with "chips")
  - [ ] ColorPicker
  - [ ] Dropdown 
    - [ ] Cascading Menu
    - [ ] Multiple selection
    - [ ] icons
  - [ ] FloatLabel
  - [ ] NumberInput
    - [ ] unit display (with masking)
    - [ ] vertical 
  - [ ] InputSwitch
  - [ ] InputText
  - [ ] InvalidState
  - [ ] Knob (circle progress "slider")
  - [ ] Listbox
  - [ ] MultiSelect
  - [ ] Password
  - [ ] RadioButton
  - [ ] Rating
  - [ ] SelectButton
  - [ ] Slider
  - [ ] Textarea
  - [ ] ToggleButton
  - [ ] TreeSelect
  - [ ] Validation on all inputs
  - [ ] 
- [ ] Advanced
  - [ ] Editor
  - [ ] Terminal

- [ ]General
  - [ ] Localization
  - [ ] Theming
    - [ ] Colors
  - [ ] Specifying Iconsets
- [ ] Button
  - [ ] Button
  - [ ] Speed Dial
  - [ ] SplitButton
- [ ] Data
  - [ ] DataTable
  - [ ] DataView
  - [ ] VirtualScroller
  - [ ] FilterService
  - [ ] FullCalendar
  - [ ] OrderList
  - [ ] OrganizationChart
  - [ ] Paginator
  - [ ] PickList
  - [ ] Timeline
  - [ ] Tree
  - [ ] TreeTable
- [ ] Panel
  - [ ] Accordion
  - [ ] Card
  - [ ] Deferred
  - [ ] Divider
  - [ ] Fieldset
  - [ ] Panel
  - [ ] Splitter
  - [ ] ScrollPanel
  - [ ] TabView
  - [ ] Toolbar
- [ ] Overlay
  - [ ] ConfirmDialog
  - [ ] ConfirmPopup
  - [ ] Dialog
  - [ ] DynamicDialog
  - [ ] OverlayPanel
  - [ ] Sidebar
  - [ ] Tooltip
- [ ] File
  - [ ] Upload
- [ ] Menu
  - [ ] MenuModel
  - [ ] BreadCrumb
  - [ ] ContextMenu
  - [ ] MegaMenu
  - [ ] Menu
  - [ ] Menubar
  - [ ] PanelMenu
  - [ ] Steps
  - [ ] TabMenu
  - [ ] TieredMenu
  - [ ] Dock
- [ ] Chart
  - [ ] ChartModel
  - [ ] Pie
  - [ ] Doughnut
  - [ ] Bar
  - [ ] Line
  - [ ] PolarArea
  - [ ] Radar
  - [ ] Combo
- [ ] Messages
  - [ ] Message
  - [ ] Toast
  - [ ] Media
  - [ ] Carousel
  - [ ] Galleria
  - [ ] Image
- [ ] Misc
  - [ ] Avatar
  - [ ] Badge
  - [ ] BlockUI
  - [ ] Chip
  - [ ] FocusTrap
  - [ ] Inplace
  - [ ] ProgressBar
  - [ ] ProgressSpinner
  - [ ] Ripple
  - [ ] ScrollTop
  - [ ] Skeleton
  - [ ] StyleClass
  - [ ] Tag
  - [ ] Terminal

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)





# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
