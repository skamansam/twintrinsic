<!--
@component
Components overview page
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"

const categories = [
  {
    name: "App",
    items: [
      { name: "App", href: "/docs/components/App/App" },
      { name: "AppHeader", href: "/docs/components/AppHeader/AppHeader" },
      { name: "BottomBar", href: "/docs/components/BottomBar/BottomBar" },
      { name: "Footer", href: "/docs/components/Footer/Footer" },
      { name: "Sidebar", href: "/docs/components/Sidebar/Sidebar" },
      { name: "ThemeToggle", href: "/docs/components/ThemeToggle/ThemeToggle" },
    ],
  },
  {
    name: "Basic",
    items: [
      { name: "Accordion", href: "/docs/components/Accordion/Accordion" },
      { name: "AccordionItem", href: "/docs/components/Accordion/AccordionItem" },
      { name: "Card", href: "/docs/components/Card/Card" },
      { name: "Container", href: "/docs/components/Container/Container" },
      { name: "Hero", href: "/docs/components/Panel/Hero" },
      { name: "Panel", href: "/docs/components/Panel/Panel" },
      { name: "Section", href: "/docs/components/Section/Section" },
      { name: "Separator", href: "/docs/components/Separator/Separator" },
      { name: "Splitter", href: "/docs/components/Splitter/Splitter" },
    ],
  },
  {
    name: "Navigation",
    items: [
      { name: "Breadcrumb", href: "/docs/components/Breadcrumb/Breadcrumb" },
      { name: "BreadcrumbItem", href: "/docs/components/Breadcrumb/BreadcrumbItem" },
      { name: "Menu", href: "/docs/components/Menu/Menu" },
      { name: "MenuItem", href: "/docs/components/Menu/MenuItem" },
      { name: "Tabs", href: "/docs/components/Tabs/Tabs" },
      { name: "Tab", href: "/docs/components/Tabs/Tab" },
      { name: "TabList", href: "/docs/components/Tabs/TabList" },
      { name: "TabPanel", href: "/docs/components/Tabs/TabPanel" },
      { name: "TreeMenu", href: "/docs/components/TreeMenu/TreeMenu" },
    ],
  },
  {
    name: "Data Display",
    items: [
      { name: "Avatar", href: "/docs/components/Avatar/Avatar" },
      { name: "AvatarGroup", href: "/docs/components/Avatar/AvatarGroup" },
      { name: "Badge", href: "/docs/components/Badge/Badge" },
      { name: "Carousel", href: "/docs/components/Carousel/Carousel" },
      { name: "CarouselItem", href: "/docs/components/Carousel/CarouselItem" },
      { name: "Chip", href: "/docs/components/Chip/Chip" },
      { name: "ChipGroup", href: "/docs/components/Chip/ChipGroup" },
      { name: "CodeBlock", href: "/docs/components/CodeBlock/CodeBlock" },
      { name: "CodeBlockSpeed", href: "/docs/components/CodeBlockSpeed/CodeBlockSpeed" },
      { name: "CodeEditor", href: "/docs/components/CodeEditor/CodeEditor" },
      { name: "DataTable", href: "/docs/components/DataTable/DataTable" },
      { name: "Map", href: "/docs/components/Map/Map" },
      { name: "Progress", href: "/docs/components/Progress/Progress" },
      { name: "Skeleton", href: "/docs/components/Skeleton/Skeleton" },
      { name: "Table", href: "/docs/components/Table/Table" },
      { name: "Tag", href: "/docs/components/Tag/Tag" },
      { name: "TagGroup", href: "/docs/components/Tag/TagGroup" },
      { name: "Timeline", href: "/docs/components/Timeline/Timeline" },
      { name: "TimelineItem", href: "/docs/components/Timeline/TimelineItem" },
      { name: "Tooltip", href: "/docs/components/Tooltip/Tooltip" },
      { name: "Tree", href: "/docs/components/Tree/Tree" },
      { name: "TreeNode", href: "/docs/components/Tree/TreeNode" },
    ],
  },
  {
    name: "Metrics",
    items: [
      { name: "DonutChart", href: "/docs/components/Metrics/DonutChart" },
      { name: "PieChart", href: "/docs/components/Metrics/PieChart" },
      { name: "LineChart", href: "/docs/components/Metrics/LineChart" },
      { name: "BarChart", href: "/docs/components/Metrics/BarChart" },
      { name: "HorizontalBarChart", href: "/docs/components/Metrics/HorizontalBarChart" },
      { name: "AreaChart", href: "/docs/components/Metrics/AreaChart" },
      { name: "StatsCard", href: "/docs/components/Metrics/StatsCard" },
      { name: "MetricGrid", href: "/docs/components/Metrics/MetricGrid" },
      { name: "KPICard", href: "/docs/components/Metrics/KPICard" },
      { name: "GaugeChart", href: "/docs/components/Metrics/GaugeChart" },
      { name: "ProgressMetric", href: "/docs/components/Metrics/ProgressMetric" },
      { name: "MetricTrend", href: "/docs/components/Metrics/MetricTrend" },
    ],
  },
  {
    name: "Form",
    items: [
      { name: "AutoComplete", href: "/docs/components/Form/AutoComplete" },
      { name: "Button", href: "/docs/components/Button/Button" },
      { name: "ButtonGroup", href: "/docs/components/Button/ButtonGroup" },
      { name: "Calendar", href: "/docs/components/Form/Calendar" },
      { name: "Checkbox", href: "/docs/components/Form/Checkbox" },
      { name: "ColorPicker", href: "/docs/components/Form/ColorPicker" },
      { name: "Combobox", href: "/docs/components/Form/Combobox" },
      { name: "Dropdown", href: "/docs/components/Form/Dropdown" },
      { name: "FileUpload", href: "/docs/components/Form/FileUpload" },
      { name: "FloatLabel", href: "/docs/components/Form/FloatLabel" },
      { name: "Form", href: "/docs/components/Form/Form" },
      { name: "FormField", href: "/docs/components/Form/FormField" },
      { name: "Input", href: "/docs/components/Form/Input" },
      { name: "InputSwitch", href: "/docs/components/Form/InputSwitch" },
      { name: "InvalidState", href: "/docs/components/Form/InvalidState" },
      { name: "Knob", href: "/docs/components/Form/Knob" },
      { name: "ListInput", href: "/docs/components/Form/ListInput" },
      { name: "Listbox", href: "/docs/components/Form/Listbox" },
      { name: "NumberInput", href: "/docs/components/Form/NumberInput" },
      { name: "Radio", href: "/docs/components/Form/Radio" },
      { name: "RadioGroup", href: "/docs/components/Form/RadioGroup" },
      { name: "Rating", href: "/docs/components/Form/Rating" },
      { name: "Select", href: "/docs/components/Form/Select" },
      { name: "SelectGroup", href: "/docs/components/Form/SelectGroup" },
      { name: "Slider", href: "/docs/components/Form/Slider" },
      { name: "Switch", href: "/docs/components/Form/Switch" },
      { name: "TextInput", href: "/docs/components/Form/TextInput" },
      { name: "Textarea", href: "/docs/components/Form/Textarea" },
    ],
  },
  {
    name: "Feedback",
    items: [
      { name: "Modal", href: "/docs/components/Modal/Modal" },
      { name: "Stepper", href: "/docs/components/Stepper/Stepper" },
      { name: "StepperStep", href: "/docs/components/Stepper/StepperStep" },
      { name: "Toast", href: "/docs/components/Toast/Toast" },
    ],
  },
  {
    name: "Utility",
    items: [
      { name: "EventsTable", href: "/docs/components/EventsTable/EventsTable" },
      { name: "Icon", href: "/docs/components/Icon/Icon" },
      { name: "Lazy", href: "/docs/components/Lazy/Lazy" },
      { name: "LazyPanel", href: "/docs/components/Lazy/LazyPanel" },
      { name: "Masonry", href: "/docs/components/Masonry/Masonry" },
      { name: "PropsTable", href: "/docs/components/PropsTable/PropsTable" },
    ],
  },
]
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Components</h1>

  <p>
    Twintrinsic provides a set of accessible, customizable components built with
    Svelte 5 and Tailwind CSS. Each component is responsive and follows best
    practices for accessibility.
  </p>

  <div class="space-y-8 not-prose">
    {#each categories as category}
      <section>
        <Separator>{category.name}</Separator>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
          {#each category.items as component}
            <a
              href={component.href}
              class="block px-3 py-2 rounded-md text-sm text-text hover:bg-hover hover:text-primary-500 transition-colors"
            >
              {component.name}
            </a>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</Container>
