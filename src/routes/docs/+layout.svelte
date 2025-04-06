<!--
@component
Documentation site layout with left navigation, right theme sidebar, and header
-->
<script>
  import AppHeader from '$lib/components/AppHeader/AppHeader.svelte';
  import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
  import { page } from '$app/stores';

  const navItems = [
    { label: 'Getting Started', href: '/docs', current: $page.url.pathname === '/docs' },
    { label: 'Components', href: '/docs/components', current: $page.url.pathname.startsWith('/docs/components') },
    { label: 'Theming', href: '/docs/theming', current: $page.url.pathname === '/docs/theming' },
  ];

  let leftSidebarExpanded = true;
  let rightSidebarExpanded = true;

  // Component links for the left sidebar
  const componentLinks = [
    { name: 'AppHeader', href: '/docs/components/appheader' },
    { name: 'BottomBar', href: '/docs/components/bottombar' },
    { name: 'ButtonDropdown', href: '/docs/components/buttondropdown' },
    { name: 'Container', href: '/docs/components/container' },
    { name: 'Panel', href: '/docs/components/panel' },
    { name: 'Separator', href: '/docs/components/separator' },
    { name: 'Sidebar', href: '/docs/components/sidebar' },
    { name: 'ViewerHeader', href: '/docs/components/viewerheader' },
  ];

  // Theme colors for the right sidebar
  const themeColors = [
    { name: 'Primary', value: 'rgb(var(--color-primary-500))' },
    { name: 'Secondary', value: 'rgb(var(--color-secondary-500))' },
    { name: 'Background', value: 'rgb(var(--color-background))' },
    { name: 'Surface', value: 'rgb(var(--color-surface))' },
    { name: 'Border', value: 'rgb(var(--color-border))' },
    { name: 'Text', value: 'rgb(var(--color-text))' },
    { name: 'Muted', value: 'rgb(var(--color-muted))' },
    { name: 'Error', value: 'rgb(var(--color-error-500))' },
  ];
</script>

<div class="docs-layout">
  <!-- Header -->
  <AppHeader
    brand={{
      name: 'Twintrinsic',
      logo: '/logo.svg',
      href: '/'
    }}
    {navItems}
  />

  <!-- Left Sidebar (Components) -->
  <Sidebar
    expanded={leftSidebarExpanded}
    toggle={({ detail }) => leftSidebarExpanded = detail.expanded}
  >
    <svelte:fragment slot="header">Components</svelte:fragment>
    <nav class="docs-nav">
      {#each componentLinks as link}
        <a
          href={link.href}
          class="docs-nav-link"
          class:active={$page.url.pathname === link.href}
        >
          {link.name}
        </a>
      {/each}
    </nav>
  </Sidebar>

  <!-- Main Content -->
  <main class="docs-main">
    <slot />
  </main>

  <!-- Right Sidebar (Theme) -->
  <Sidebar
    expanded={rightSidebarExpanded}
    position="right"
    toggle={({ detail }) => rightSidebarExpanded = detail.expanded}
  >
    <svelte:fragment slot="header">Theme Colors</svelte:fragment>
    <div class="docs-colors">
      {#each themeColors as color}
        <div class="docs-color-item">
          <div
            class="docs-color-preview"
            style:background-color={color.value}
          />
          <div class="docs-color-info">
            <div class="docs-color-name">{color.name}</div>
            <div class="docs-color-value">{color.value}</div>
          </div>
        </div>
      {/each}
    </div>
  </Sidebar>
</div>

<style>
  .docs-layout {
    @apply min-h-screen flex flex-col;
  }

  .docs-main {
    @apply flex-1 px-4 py-8 sm:px-6 lg:px-8;
    @apply ml-64 mr-64; /* Space for sidebars */
  }

  .docs-nav {
    @apply flex flex-col gap-2 p-4;
  }

  .docs-nav-link {
    @apply px-4 py-2 rounded-md text-sm;
    @apply hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary-500;
  }

  .docs-nav-link.active {
    @apply bg-primary-500 text-white;
  }

  .docs-colors {
    @apply flex flex-col gap-4 p-4;
  }

  .docs-color-item {
    @apply flex items-center gap-3;
  }

  .docs-color-preview {
    @apply w-10 h-10 rounded-md border border-border;
  }

  .docs-color-info {
    @apply flex flex-col;
  }

  .docs-color-name {
    @apply text-sm font-medium;
  }

  .docs-color-value {
    @apply text-xs text-muted;
  }
</style>
