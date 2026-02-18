<!--
@component
Documentation site layout with left navigation and header
-->
<script>
import { page } from "$app/stores"
import { App, Separator, TwintrinsicLogo } from "$lib"

let { children } = $props();

const siteLinks = [
  { label: "Getting Started", href: "/docs", current: $page.url.pathname === "/docs" },
  {
    label: "Components",
    href: "/docs/components",
    current: $page.url.pathname.startsWith("/docs/components"),
  },
  { label: "Theming", href: "/docs/theming", current: $page.url.pathname === "/docs/theming" },
  { label: "Completion", href: "/docs/completion", current: $page.url.pathname === "/docs/completion" },
]

let leftSidebarExpanded = $state(false)

// Component links for the left sidebar
const siteMenu = [
  {
    title: "Examples",
    children: [
      { title: "Data Dashboard", link: "/docs/examples/dashboard" },
    ],
  },
  {
    title: "Core",
    children: [
      { title: "App", link: "/docs/components/App/App" },
    ],
  },
  {
    title: "Layout",
    children: [
      { title: "Accordion", link: "/docs/components/Accordion/Accordion" },
      { title: "AccordionItem", link: "/docs/components/Accordion/AccordionItem" },
      { title: "Card", link: "/docs/components/Card/Card" },
      { title: "Container", link: "/docs/components/Container/Container" },
      { title: "Panel", link: "/docs/components/Panel/Panel" },
      { title: "Separator", link: "/docs/components/Separator/Separator" },
      { title: "Sidebar", link: "/docs/components/Sidebar/Sidebar" },
      { title: "Splitter", link: "/docs/components/Splitter/Splitter" },
    ],
  },
  {
    title: "Navigation",
    children: [
      { title: "AppHeader", link: "/docs/components/AppHeader/AppHeader" },
      { title: "BottomBar", link: "/docs/components/BottomBar/BottomBar" },
      { title: "Breadcrumb", link: "/docs/components/Breadcrumb/Breadcrumb" },
      { title: "BreadcrumbItem", link: "/docs/components/Breadcrumb/BreadcrumbItem" },
      { title: "Menu", link: "/docs/components/Menu/Menu" },
      { title: "MenuItem", link: "/docs/components/Menu/MenuItem" },
      { title: "Tabs", link: "/docs/components/Tabs/Tabs" },
      { title: "Tab", link: "/docs/components/Tabs/Tab" },
      { title: "TabList", link: "/docs/components/Tabs/TabList" },
      { title: "TabPanel", link: "/docs/components/Tabs/TabPanel" },
      { title: "TreeMenu", link: "/docs/components/TreeMenu/TreeMenu" },
    ],
  },
  {
    title: "Data Display",
    children: [
      { title: "Avatar", link: "/docs/components/Avatar/Avatar" },
      { title: "AvatarGroup", link: "/docs/components/Avatar/AvatarGroup" },
      { title: "Badge", link: "/docs/components/Badge/Badge" },
      { title: "Carousel", link: "/docs/components/Carousel/Carousel" },
      { title: "CarouselItem", link: "/docs/components/Carousel/CarouselItem" },
      { title: "Chip", link: "/docs/components/Chip/Chip" },
      { title: "ChipGroup", link: "/docs/components/Chip/ChipGroup" },
      { title: "CodeBlock", link: "/docs/components/CodeBlock/CodeBlock" },
      { title: "CodeBlockSpeed", link: "/docs/components/CodeBlockSpeed/CodeBlockSpeed" },
      { title: "CodeEditor", link: "/docs/components/CodeEditor/CodeEditor" },
      { title: "DataTable", link: "/docs/components/DataTable/DataTable" },
      { title: "Progress", link: "/docs/components/Progress/Progress" },
      { title: "Skeleton", link: "/docs/components/Skeleton/Skeleton" },
      { title: "Table", link: "/docs/components/Table/Table" },
      { title: "TableBody", link: "/docs/components/Table/TableBody" },
      { title: "TableCell", link: "/docs/components/Table/TableCell" },
      { title: "TableHead", link: "/docs/components/Table/TableHead" },
      { title: "TableHeader", link: "/docs/components/Table/TableHeader" },
      { title: "TableRow", link: "/docs/components/Table/TableRow" },
      { title: "Tag", link: "/docs/components/Tag/Tag" },
      { title: "TagGroup", link: "/docs/components/Tag/TagGroup" },
      { title: "Timeline", link: "/docs/components/Timeline/Timeline" },
      { title: "TimelineItem", link: "/docs/components/Timeline/TimelineItem" },
      { title: "Tooltip", link: "/docs/components/Tooltip/Tooltip" },
      { title: "Tree", link: "/docs/components/Tree/Tree" },
      { title: "TreeNode", link: "/docs/components/Tree/TreeNode" },
    ],
  },
  {
    title: "Metrics",
    children: [
      { title: "DonutChart", link: "/docs/components/Metrics/DonutChart" },
      { title: "PieChart", link: "/docs/components/Metrics/PieChart" },
      { title: "LineChart", link: "/docs/components/Metrics/LineChart" },
      { title: "BarChart", link: "/docs/components/Metrics/BarChart" },
      { title: "HorizontalBarChart", link: "/docs/components/Metrics/HorizontalBarChart" },
      { title: "AreaChart", link: "/docs/components/Metrics/AreaChart" },
      { title: "StatsCard", link: "/docs/components/Metrics/StatsCard" },
      { title: "MetricGrid", link: "/docs/components/Metrics/MetricGrid" },
      { title: "KPICard", link: "/docs/components/Metrics/KPICard" },
      { title: "GaugeChart", link: "/docs/components/Metrics/GaugeChart" },
      { title: "ProgressMetric", link: "/docs/components/Metrics/ProgressMetric" },
      { title: "MetricTrend", link: "/docs/components/Metrics/MetricTrend" },
    ],
  },
  {
    title: "Form",
    children: [
      { title: "AutoComplete", link: "/docs/components/Form/AutoComplete" },
      { title: "Button", link: "/docs/components/Button/Button" },
      { title: "ButtonGroup", link: "/docs/components/Button/ButtonGroup" },
      { title: "Calendar", link: "/docs/components/Form/Calendar" },
      { title: "Checkbox", link: "/docs/components/Form/Checkbox" },
      { title: "ColorPicker", link: "/docs/components/Form/ColorPicker" },
      { title: "Combobox", link: "/docs/components/Form/Combobox" },
      { title: "Dropdown", link: "/docs/components/Form/Dropdown" },
      { title: "FileUpload", link: "/docs/components/Form/FileUpload" },
      { title: "FloatLabel", link: "/docs/components/Form/FloatLabel" },
      { title: "Form", link: "/docs/components/Form/Form" },
      { title: "FormField", link: "/docs/components/Form/FormField" },
      { title: "Input", link: "/docs/components/Form/Input" },
      { title: "InputSwitch", link: "/docs/components/Form/InputSwitch" },
      { title: "InvalidState", link: "/docs/components/Form/InvalidState" },
      { title: "Knob", link: "/docs/components/Form/Knob" },
      { title: "ListInput", link: "/docs/components/Form/ListInput" },
      { title: "Listbox", link: "/docs/components/Form/Listbox" },
      { title: "NumberInput", link: "/docs/components/Form/NumberInput" },
      { title: "Radio", link: "/docs/components/Form/Radio" },
      { title: "RadioGroup", link: "/docs/components/Form/RadioGroup" },
      { title: "Rating", link: "/docs/components/Form/Rating" },
      { title: "Select", link: "/docs/components/Form/Select" },
      { title: "SelectGroup", link: "/docs/components/Form/SelectGroup" },
      { title: "Slider", link: "/docs/components/Form/Slider" },
      { title: "Switch", link: "/docs/components/Form/Switch" },
      { title: "TextInput", link: "/docs/components/Form/TextInput" },
      { title: "Textarea", link: "/docs/components/Form/Textarea" },
    ],
  },
  {
    title: "Feedback",
    children: [
      { title: "Modal", link: "/docs/components/Modal/Modal" },
      { title: "Stepper", link: "/docs/components/Stepper/Stepper" },
      { title: "StepperStep", link: "/docs/components/Stepper/StepperStep" },
      { title: "Toast", link: "/docs/components/Toast/Toast" },
    ],
  },
  {
    title: "Utility",
    children: [
      { title: "Icon", link: "/docs/components/Icon/Icon" },
      { title: "Lazy", link: "/docs/components/Lazy/Lazy" },
      { title: "LazyPanel", link: "/docs/components/Lazy/LazyPanel" },
      { title: "Masonry", link: "/docs/components/Masonry/Masonry" },
      { title: "ThemeToggle", link: "/docs/components/ThemeToggle/ThemeToggle" },
    ],
  },
]

// Theme colors for the right sidebar
const themeColors = [
  { name: "Primary", value: "rgb(var(--color-primary-500))" },
  { name: "Secondary", value: "rgb(var(--color-secondary-500))" },
  { name: "Background", value: "rgb(var(--color-background))" },
  { name: "Surface", value: "rgb(var(--color-surface))" },
  { name: "Border", value: "rgb(var(--color-border))" },
  { name: "Text", value: "rgb(var(--color-text))" },
  { name: "Muted", value: "rgb(var(--color-muted))" },
  { name: "Error", value: "rgb(var(--color-error-bold))" },
]
</script>

{#snippet logo(size)}
  <TwintrinsicLogo {size}/>
{/snippet}

<App
  rightSidebarHidden={true}
  appName="Twintrinsic Documentation"
  brand={{
    name: 'Twintrinsic',
    href: '/',
    logo
  }}
  {siteMenu}
  {siteLinks}
>
  {@render children?.()}
</App>
  
  <style lang="postcss">
    @reference '$lib/twintrinsic.css';

  </style>