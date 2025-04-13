<!--
@component
Documentation site layout with left navigation, right theme sidebar, and header
-->
<script>
  import App from "$lib/components/App/App.svelte"
  import AppHeader from "$lib/components/AppHeader/AppHeader.svelte"
  import Sidebar from "$lib/components/Sidebar/Sidebar.svelte"
  import { page } from "$app/stores"
  import TwintrinsicLogo from "$lib/components/icons/TwintrinsicLogo.svelte"
  import ThemeToggle from "$lib/components/ThemeToggle/ThemeToggle.svelte"
  
  const navItems = [
    { label: "Getting Started", href: "/docs", current: $page.url.pathname === "/docs" },
    {
      label: "Components",
      href: "/docs/components",
      current: $page.url.pathname.startsWith("/docs/components"),
    },
    { label: "Theming", href: "/docs/theming", current: $page.url.pathname === "/docs/theming" },
  ]
  
  let leftSidebarExpanded = true
  let rightSidebarExpanded = true
  
  // Component links for the left sidebar
  const componentLinks = [
    // Core Components
    { category: "Core", name: "App", href: "/docs/components/app" },
    
    // Layout Components
    { category: "Layout", name: "Container", href: "/docs/components/container" },
    { name: "Panel", href: "/docs/components/panel" },
    { name: "Separator", href: "/docs/components/separator" },
    { name: "Sidebar", href: "/docs/components/sidebar" },
    
    // Navigation Components
    { category: "Navigation", name: "AppHeader", href: "/docs/components/appheader" },
    { name: "BottomBar", href: "/docs/components/bottombar" },
    { name: "Breadcrumb", href: "/docs/components/breadcrumb" },
    { name: "Menu", href: "/docs/components/menu" },
    { name: "MenuItem", href: "/docs/components/menuitem" },
    { name: "Tabs", href: "/docs/components/tabs" },
    
    // Data Display Components
    { category: "Data Display", name: "Avatar", href: "/docs/components/avatar" },
    { name: "Badge", href: "/docs/components/badge" },
    { name: "Carousel", href: "/docs/components/carousel" },
    { name: "Chip", href: "/docs/components/chip" },
    { name: "DataTable", href: "/docs/components/datatable" },
    { name: "Progress", href: "/docs/components/progress" },
    { name: "Skeleton", href: "/docs/components/skeleton" },
    { name: "Table", href: "/docs/components/table" },
    { name: "Tag", href: "/docs/components/tag" },
    { name: "Timeline", href: "/docs/components/timeline" },
    { name: "Tooltip", href: "/docs/components/tooltip" },
    { name: "Tree", href: "/docs/components/tree" },
    
    // Form Components
    { category: "Form", name: "Button", href: "/docs/components/button" },
    { name: "Checkbox", href: "/docs/components/checkbox" },
    { name: "Combobox", href: "/docs/components/combobox" },
    { name: "FileUpload", href: "/docs/components/fileupload" },
    { name: "Form", href: "/docs/components/form" },
    { name: "Input", href: "/docs/components/input" },
    { name: "RadioGroup", href: "/docs/components/radiogroup" },
    { name: "Rating", href: "/docs/components/rating" },
    { name: "Slider", href: "/docs/components/slider" },
    { name: "Switch", href: "/docs/components/switch" },
    { name: "Textarea", href: "/docs/components/textarea" },
    
    // Feedback Components
    { category: "Feedback", name: "Modal", href: "/docs/components/modal" },
    { name: "Stepper", href: "/docs/components/stepper" },
    { name: "Toast", href: "/docs/components/toast" },
    
    // Utility Components
    { category: "Utility", name: "Icon", href: "/docs/components/icon" },
    { name: "Masonry", href: "/docs/components/masonry" },
    { name: "ThemeToggle", href: "/docs/components/themetoggle" },
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
  
  <style>
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