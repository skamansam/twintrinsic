<!--
@component
Documentation site layout with left navigation, right theme sidebar, and header
-->
<script>
import { page } from "$app/stores"
import App from "$lib/components/App/App.svelte"
import AppHeader from "$lib/components/AppHeader/AppHeader.svelte"
import TwintrinsicLogo from "$lib/components/icons/TwintrinsicLogo.svelte"
import Sidebar from "$lib/components/Sidebar/Sidebar.svelte"
import ThemeToggle from "$lib/components/ThemeToggle/ThemeToggle.svelte"

const navItems = [
  { label: "Getting Started", href: "/docs", current: $page.url.pathname === "/docs" },
  {
    label: "Components",
    href: "/docs/components",
    current: $page.url.pathname.startsWith("/docs/components"),
  },
  { label: "Theming", href: "/docs/theming", current: $page.url.pathname === "/docs/theming" },
  { label: "Completion", href: "/docs/completion", current: $page.url.pathname === "/docs/completion" },
]

let leftSidebarExpanded = true
let rightSidebarExpanded = true

// Component links for the left sidebar
const componentLinks = [
  // Core Components
  { category: "Core", name: "App", href: "/docs/components/App/App" },

  // Layout Components
  { category: "Layout", name: "Accordion", href: "/docs/components/Accordion/Accordion" },
  { name: "Card", href: "/docs/components/Card/Card" },
  { name: "Container", href: "/docs/components/Container/Container" },
  { name: "Panel", href: "/docs/components/Panel/Panel" },
  { name: "Separator", href: "/docs/components/Separator/Separator" },
  { name: "Sidebar", href: "/docs/components/Sidebar/Sidebar" },

  // Navigation Components
  { category: "Navigation", name: "AppHeader", href: "/docs/components/AppHeader/AppHeader" },
  { name: "BottomBar", href: "/docs/components/BottomBar/BottomBar" },
  { name: "Breadcrumb", href: "/docs/components/Breadcrumb/Breadcrumb" },
  { name: "Menu", href: "/docs/components/Menu/Menu" },
  { name: "Tabs", href: "/docs/components/Tabs/Tabs" },

  // Data Display Components
  { category: "Data Display", name: "Avatar", href: "/docs/components/Avatar/Avatar" },
  { name: "Badge", href: "/docs/components/Badge/Badge" },
  { name: "Carousel", href: "/docs/components/Carousel/Carousel" },
  { name: "Chip", href: "/docs/components/Chip/Chip" },
  { name: "CodeBlock", href: "/docs/components/CodeBlock/CodeBlock" },
  { name: "CodeBlockSpeed", href: "/docs/components/CodeBlockSpeed/CodeBlockSpeed" },
  { name: "CodeEditor", href: "/docs/components/CodeEditor/CodeEditor" },
  { name: "DataTable", href: "/docs/components/DataTable/DataTable" },
  { name: "Progress", href: "/docs/components/Progress/Progress" },
  { name: "Skeleton", href: "/docs/components/Skeleton/Skeleton" },
  { name: "Table", href: "/docs/components/Table/Table" },
  { name: "Tag", href: "/docs/components/Tag/Tag" },
  { name: "Timeline", href: "/docs/components/Timeline/Timeline" },
  { name: "Tooltip", href: "/docs/components/Tooltip/Tooltip" },
  { name: "Tree", href: "/docs/components/Tree/Tree" },

  // Form Components
  { category: "Form", name: "AutoComplete", href: "/docs/components/Form/AutoComplete" },
  { name: "Button", href: "/docs/components/Button/Button" },
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
  { name: "Listbox", href: "/docs/components/Form/Listbox" },
  { name: "NumberInput", href: "/docs/components/Form/NumberInput" },
  { name: "Radio", href: "/docs/components/Form/Radio" },
  { name: "RadioGroup", href: "/docs/components/Form/RadioGroup" },
  { name: "Rating", href: "/docs/components/Form/Rating" },
  { name: "Select", href: "/docs/components/Form/Select" },
  { name: "SelectGroup", href: "/docs/components/Form/SelectGroup" },
  { name: "Slider", href: "/docs/components/Form/Slider" },
  { name: "Switch", href: "/docs/components/Form/Switch" },
  { name: "Textarea", href: "/docs/components/Form/Textarea" },

  // Feedback Components
  { category: "Feedback", name: "Modal", href: "/docs/components/Modal/Modal" },
  { name: "Stepper", href: "/docs/components/Stepper/Stepper" },
  { name: "Toast", href: "/docs/components/Toast/Toast" },

  // Utility Components
  { category: "Utility", name: "Icon", href: "/docs/components/Icon/Icon" },
  { name: "LazyPanel", href: "/docs/components/Lazy/LazyPanel" },
  { name: "Masonry", href: "/docs/components/Masonry/Masonry" },
  { name: "ThemeToggle", href: "/docs/components/ThemeToggle/ThemeToggle" },
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
  
  <App appName="Twintrinsic Documentation" leftPanelWidth="14rem">
    <div slot="header">
      <AppHeader
        brand={{
          name: 'Twintrinsic',
          href: '/'
        }}
        {navItems}
        class="relative"
      >
        <div slot="logo" class="flex items-center gap-2">
          <button
            type="button"
            class="lg:hidden -ml-2 p-2 rounded-md text-muted hover:text-text focus:outline-none focus:ring-2 focus:ring-primary-500"
            onclick={() => leftSidebarExpanded = !leftSidebarExpanded}
            aria-label="Toggle navigation menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <TwintrinsicLogo size="2rem" class="text-primary-500" />
          <span class="font-semibold">Twintrinsic</span>
        </div>
        <div slot="actions">
          <ThemeToggle />
        </div>
      </AppHeader>
    </div>
  
    <div slot="leftPanel">
      <nav class="docs-nav">
        {#each componentLinks as link, i}
          {#if link.category && (i === 0 || componentLinks[i-1].category !== link.category)}
            <div class="docs-nav-category">{link.category}</div>
          {/if}
          <a
            href={link.href}
            class="docs-nav-link"
            class:active={$page.url.pathname === link.href}
          >
            {link.name}
          </a>
        {/each}
      </nav>
    </div>
  
    <slot />
  </App>
  
  <style lang="postcss">
    @reference '$lib/twintrinsic.css';
    .docs-nav {
      @apply flex flex-col gap-2 p-4;
    }
  
    .docs-nav-category {
      @apply text-xs font-semibold uppercase tracking-wider text-muted;
      @apply mt-4 mb-1 px-4;
    }
  
    .docs-nav-category:first-child {
      @apply mt-0;
    }
  
    .docs-nav-link {
      @apply px-4 py-2 rounded-md text-sm;
      @apply hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary-500;
    }
  
    .docs-nav-link.active {
      @apply bg-primary-500 text-white;
    }
  </style>