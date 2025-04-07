<!--
@component
Documentation site layout with left navigation, right theme sidebar, and header
-->
<script>
  import App from '$lib/components/App/App.svelte';
  import AppHeader from '$lib/components/AppHeader/AppHeader.svelte';
  import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
  import { page } from '$app/stores';
  import TwintrinsicLogo from '$lib/components/icons/TwintrinsicLogo.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle/ThemeToggle.svelte';

  const navItems = [
    { label: 'Getting Started', href: '/docs', current: $page.url.pathname === '/docs' },
    { label: 'Components', href: '/docs/components', current: $page.url.pathname.startsWith('/docs/components') },
    { label: 'Theming', href: '/docs/theming', current: $page.url.pathname === '/docs/theming' },
  ];

  let leftSidebarExpanded = true;
  let rightSidebarExpanded = true;

  // Component links for the left sidebar
  const componentLinks = [
    { name: 'ThemeToggle', href: '/docs/components/themetoggle' },
    { name: 'AppHeader', href: '/docs/components/appheader' },
    { name: 'BottomBar', href: '/docs/components/bottombar' },
    { name: 'ButtonDropdown', href: '/docs/components/buttondropdown' },
    { name: 'Container', href: '/docs/components/container' },
    { name: 'Panel', href: '/docs/components/panel' },
    { name: 'Separator', href: '/docs/components/separator' },
    { name: 'Sidebar', href: '/docs/components/sidebar' },
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
    { name: 'Error', value: 'rgb(var(--color-error-bold))' },
  ];
</script>

<App appName="Twintrinsic Documentation" leftPanelWidth="16rem">
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
  </div>

  <slot />
</App>

<style>
  @reference '$lib/twintrinsic.css';
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
</style>
