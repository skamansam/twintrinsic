<script lang="ts">
import type { Snippet } from "svelte"
import { setContext } from "svelte"
import AppHeader from "../AppHeader/AppHeader.svelte"
import Sidebar from "../Sidebar/Sidebar.svelte"
import type { MenuItem } from "../TreeMenu/TreeMenu.svelte"

type NavItem = { label: string; href?: string; current?: boolean }
type Brand = string | { name: string; logo?: string | Snippet; href?: string }
type User = { name: string; avatar?: string; href?: string } | null

interface AppProps {
  darkMode?: boolean
  appName?: string
  brand?: Brand
  user?: User
  navItems?: NavItem[]
  siteLinks?: NavItem[]
  siteMenu?: MenuItem[]
  showSearch?: boolean
  showNotifications?: boolean
  leftSidebarHidden?: boolean
  rightSidebarHidden?: boolean
  leftSidebarWidth?: string
  rightSidebarWidth?: string
  leftSidebarCollapsedWidth?: string
  rightSidebarCollapsedWidth?: string
  leftPanel?: Snippet | null
  rightPanel?: Snippet | null
  header?: Snippet | null
  footer?: Snippet | null
  children?: Snippet | null
  themeToggleHidden?: boolean
  onsearch?: (payload: { query: string }) => void
  onsignout?: () => void
  // onleftSidebarVisibilityChange?: (payload: { visible: boolean }) => void
  // onrightSidebarVisibilityChange?: (payload: { visible: boolean }) => void
  onleftSidebarToggle?: (payload: { expanded: boolean }) => void
  onrightSidebarToggle?: (payload: { expanded: boolean }) => void
}

let {
  darkMode = false,
  appName = "Twintrinsic App",
  brand = appName,
  user = null,
  navItems = [],
  siteLinks,
  siteMenu,
  showSearch = false,
  showNotifications = false,
  leftSidebarHidden = false,
  rightSidebarHidden = false,
  leftSidebarWidth = "16rem",
  rightSidebarWidth = "auto",
  leftSidebarCollapsedWidth = "4rem",
  rightSidebarCollapsedWidth = "4rem",
  leftPanel,
  rightPanel,
  header,
  footer,
  children,
  onsearch,
  onsignout,
  themeToggleHidden = false,
  // onleftSidebarVisibilityChange,
  // onrightSidebarVisibilityChange,
  onleftSidebarToggle,
  onrightSidebarToggle,
}: AppProps = $props();

$effect(() => {
  setContext("appDarkMode", {
    getDarkMode: () => darkMode,
  })
})
</script>

<svelte:head>
  <title>{appName}</title>
</svelte:head>

<div class='app bg-element-100 dark:bg-dark dark:text-light min-h-screen grid gap-0 grid-rows-[var(--header-height,120px)_1fr_var(--footer-height,60px)] grid-cols-[var(--leftbar-width,300px)_1fr_var(--rightbar-width,300px)]' style="--rightbar-width: {rightPanel ? rightSidebarWidth : 'auto'}; --leftbar-width: {(leftPanel || siteMenu) ? leftSidebarWidth : 'auto'}; --header-height: auto; --footer-height: auto;" data-theme>

<!-- Skip to main content link for accessibility -->
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface focus:text-text focus:outline-none focus:ring-2 focus:ring-primary-500"
>
  Skip to main content
</a>

  <!-- Header -->
  {#if header}
    {@render header()}
  {:else}
    <AppHeader
      {brand}
      {user}
      navItems={siteLinks || navItems}
      {showSearch}
      {showNotifications}
      {onsearch}
      {onsignout}
      {themeToggleHidden}
      class="appHeader col-span-full"
    />
  {/if}
  <!-- Left Sidebar -->
  {#if !leftSidebarHidden && (leftPanel || siteMenu)}
    <Sidebar
      visible={!leftSidebarHidden}
      position="left"
      width={leftSidebarWidth}
      collapsedWidth={leftSidebarCollapsedWidth}
      menu={siteMenu}
      ontoggle={onleftSidebarToggle}
      class="appLeftPanel shadow-lg p-1 pe-3"
    >
      {#if leftPanel}
        {@render leftPanel()}
      {/if}
    </Sidebar>
  {/if}

  <!-- Main Content -->
  <main id="main-content" class="appMain p-5">
    {@render children?.()}
  </main>

  <!-- Right Sidebar -->
  {#if !rightSidebarHidden && rightPanel}
    <Sidebar
      position="right"
      width={rightSidebarWidth}
      collapsedWidth={rightSidebarCollapsedWidth}
      ontoggle={onrightSidebarToggle}
      class="appRightPanel overflow-y-auto"
    >
      {@render rightPanel()}
    </Sidebar>
  {/if}

  <!-- Footer -->
  {#if footer}
    <footer class="appFooter col-span-full">
      {@render footer()}
    </footer>
  {/if}
</div>

<style lang="postcss">
  @reference '../../twintrinsic.css';
</style>
