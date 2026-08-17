<script module lang="ts">
export const propsMetadata = [
  { name: "darkMode", type: "boolean", description: "Whether dark mode is enabled", default: "false", optional: true },
  { name: "appName", type: "string", description: "Application name (used as the document title and default brand)", default: "\"Twintrinsic App\"", optional: true },
  { name: "brand", type: "Brand", description: "Brand display: a string or an object with name, logo, href, and tagline", default: "appName", optional: true },
  { name: "user", type: "User", description: "Current user object, or null when signed out", default: "null", optional: true },
  { name: "navItems", type: "NavItem[]", description: "Navigation items shown in the header", default: "[]", optional: true },
  { name: "siteLinks", type: "NavItem[]", description: "Site-level links (fall back to `navItems` when omitted)", optional: true },
  { name: "siteMenu", type: "MenuItem[]", description: "Menu items rendered in the left sidebar", optional: true },
  { name: "showSearch", type: "boolean", description: "Whether to show the search input in the header", default: "false", optional: true },
  { name: "showNotifications", type: "boolean", description: "Whether to show the notifications button in the header", default: "false", optional: true },
  { name: "leftSidebarHidden", type: "boolean", description: "Whether to hide the left sidebar", default: "false", optional: true },
  { name: "rightSidebarHidden", type: "boolean", description: "Whether to hide the right sidebar", default: "false", optional: true },
  { name: "leftSidebarWidth", type: "string", description: "CSS width of the left sidebar", default: "\"16rem\"", optional: true },
  { name: "rightSidebarWidth", type: "string", description: "CSS width of the right sidebar", default: "\"auto\"", optional: true },
  { name: "leftSidebarCollapsedWidth", type: "string", description: "CSS width of the left sidebar when collapsed", default: "\"4rem\"", optional: true },
  { name: "rightSidebarCollapsedWidth", type: "string", description: "CSS width of the right sidebar when collapsed", default: "\"4rem\"", optional: true },
  { name: "leftPanel", type: "Snippet | null", description: "Snippet rendered inside the left sidebar", optional: true },
  { name: "rightPanel", type: "Snippet | null", description: "Snippet rendered inside the right sidebar", optional: true },
  { name: "header", type: "Snippet | null", description: "Custom header snippet (overrides the default AppHeader)", optional: true },
  { name: "footer", type: "Snippet | null", description: "Footer snippet rendered below the main content", optional: true },
  { name: "themeToggleHidden", type: "boolean", description: "Whether to hide the theme toggle in the header", default: "false", optional: true },
  { name: "onsearch", type: "(payload: { query: string }) => void", description: "Callback fired when the user types in the header search input", optional: true },
  { name: "onsignout", type: "() => void", description: "Callback fired when the user signs out", optional: true },
  { name: "onleftSidebarToggle", type: "(payload: { expanded: boolean }) => void", description: "Callback fired when the left sidebar is toggled", optional: true },
  { name: "onrightSidebarToggle", type: "(payload: { expanded: boolean }) => void", description: "Callback fired when the right sidebar is toggled", optional: true },
];
</script>

<script lang="ts">
import type { Snippet } from "svelte"
import { setContext } from "svelte"
import AppHeader from "../AppHeader/AppHeader.svelte"
import Sidebar from "../Sidebar/Sidebar.svelte"
import type { MenuItem } from "../TreeMenu/TreeMenu.svelte"

type NavItem = { label: string; href?: string; current?: boolean }
type Brand = string | { name: string; logo?: string | Snippet; href?: string; tagline?: string }
type User = { name: string; avatar?: string; href?: string; role?: string; email?: string } | null

interface Props {
  /** Whether dark mode is enabled */
  darkMode?: boolean
  /** Application name (used as the document title and default brand) */
  appName?: string
  /** Brand display: a string or an object with name, logo, href, and tagline */
  brand?: Brand
  /** Current user object, or null when signed out */
  user?: User
  /** Navigation items shown in the header */
  navItems?: NavItem[]
  /** Site-level links (fall back to `navItems` when omitted) */
  siteLinks?: NavItem[]
  /** Menu items rendered in the left sidebar */
  siteMenu?: MenuItem[]
  /** Whether to show the search input in the header */
  showSearch?: boolean
  /** Whether to show the notifications button in the header */
  showNotifications?: boolean
  /** Whether to hide the left sidebar */
  leftSidebarHidden?: boolean
  /** Whether to hide the right sidebar */
  rightSidebarHidden?: boolean
  /** CSS width of the left sidebar */
  leftSidebarWidth?: string
  /** CSS width of the right sidebar */
  rightSidebarWidth?: string
  /** CSS width of the left sidebar when collapsed */
  leftSidebarCollapsedWidth?: string
  /** CSS width of the right sidebar when collapsed */
  rightSidebarCollapsedWidth?: string
  /** Snippet rendered inside the left sidebar */
  leftPanel?: Snippet | null
  /** Snippet rendered inside the right sidebar */
  rightPanel?: Snippet | null
  /** Custom header snippet (overrides the default AppHeader) */
  header?: Snippet | null
  /** Footer snippet rendered below the main content */
  footer?: Snippet | null
  /** Main content */
  children?: Snippet | null
  /** Whether to hide the theme toggle in the header */
  themeToggleHidden?: boolean
  /** Callback fired when the user types in the header search input */
  onsearch?: (payload: { query: string }) => void
  /** Callback fired when the user signs out */
  onsignout?: () => void
  /** Callback fired when the left sidebar is toggled */
  onleftSidebarToggle?: (payload: { expanded: boolean }) => void
  /** Callback fired when the right sidebar is toggled */
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
}: Props = $props()

/** @deprecated Use `Props` instead. Re-exported for backward compatibility. */
export type AppProps = Props

$effect(() => {
  const darkModeContext = {
    getDarkMode: (): boolean => darkMode,
  }
  setContext("appDarkMode", darkModeContext)
})
</script>

<svelte:head>
  <title>{appName}</title>
</svelte:head>

<div class='app bg-element-100 dark:bg-dark dark:text-light h-screen overflow-hidden grid gap-0 grid-rows-[var(--header-height,120px)_minmax(0,1fr)_var(--footer-height,60px)] grid-cols-[var(--leftbar-width,300px)_1fr_var(--rightbar-width,300px)]' style="--rightbar-width: {rightPanel ? rightSidebarWidth : 'auto'}; --leftbar-width: {(leftPanel || siteMenu) ? leftSidebarWidth : 'auto'}; --header-height: auto; --footer-height: auto;" data-theme>

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
      class="appHeader col-span-full overflow-x-hidden"
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
  <main id="main-content" class="appMain p-5 overflow-y-auto overflow-x-auto">
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
