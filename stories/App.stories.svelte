<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import App from "$lib/components/App/App.svelte"

const { Story } = defineMeta({
  title: "App/App",
  component: App,
  tags: ["autodocs"],
  argTypes: {
    appName: { control: "text" },
    showSearch: { control: "boolean" },
    showNotifications: { control: "boolean" },
    themeToggleHidden: { control: "boolean" },
    leftSidebarHidden: { control: "boolean" },
    rightSidebarHidden: { control: "boolean" },
  },
  args: {
    appName: "Acme Suite",
    // Hidden so the Storybook theme picker stays authoritative — the
    // ThemeToggle manages `data-theme` itself and would override the
    // toolbar selection (it has its own dedicated story).
    themeToggleHidden: true,
    showSearch: false,
    showNotifications: false,
  },
})
</script>

<Story
  name="Default"
  args={{
    navItems: [
      { label: "Home", href: "/" },
      { label: "Docs", href: "/docs" },
    ],
  }}
  play={async ({ canvas }) => {
    // AppHeader renders the brand (appName) as a link, the nav items as
    // links, and App always renders a skip-to-content link for a11y.
    await expect(canvas.getByText("Acme Suite")).toBeInTheDocument()
    await expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/")
    await expect(canvas.getByText("Skip to main content")).toBeInTheDocument()
  }}
>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-2">Welcome back, Sarah</h1>
    <p class="text-muted mb-6">Here's what's happening across your projects today.</p>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="p-4 bg-surface rounded-lg border border-border">
        <p class="text-sm text-muted">Active projects</p>
        <p class="text-2xl font-semibold">12</p>
      </div>
      <div class="p-4 bg-surface rounded-lg border border-border">
        <p class="text-sm text-muted">Tasks due this week</p>
        <p class="text-2xl font-semibold">8</p>
      </div>
      <div class="p-4 bg-surface rounded-lg border border-border">
        <p class="text-sm text-muted">Team members</p>
        <p class="text-2xl font-semibold">24</p>
      </div>
    </div>
  </div>
</Story>

<Story
  name="With Sidebar Menu"
  args={{
    navItems: [{ label: "Home", href: "/" }],
    siteMenu: [
      { label: "Overview", href: "/overview" },
      { label: "Projects", href: "/projects" },
      { label: "Reports", href: "/reports" },
    ],
  }}
  play={async ({ canvas }) => {
    // The siteMenu prop renders a left sidebar; the main content still renders.
    await expect(canvas.getByText("Acme Suite")).toBeInTheDocument()
    await expect(canvas.getByText("Overview")).toBeInTheDocument()
  }}
>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Projects</h1>
    <div class="space-y-3">
      <div class="p-4 bg-surface rounded-lg border border-border">
        <p class="font-medium">Website Redesign</p>
        <p class="text-sm text-muted">Updated 2 hours ago</p>
      </div>
      <div class="p-4 bg-surface rounded-lg border border-border">
        <p class="font-medium">Mobile App Launch</p>
        <p class="text-sm text-muted">Updated yesterday</p>
      </div>
      <div class="p-4 bg-surface rounded-lg border border-border">
        <p class="font-medium">Q3 Marketing Campaign</p>
        <p class="text-sm text-muted">Updated 3 days ago</p>
      </div>
    </div>
  </div>
</Story>

<Story
  name="Header Actions"
  args={{
    navItems: [{ label: "Home", href: "/" }],
    showSearch: true,
    showNotifications: true,
  }}
  play={async ({ canvas }) => {
    // Search input and notifications button render when enabled.
    await expect(canvas.getByRole("searchbox", { name: "Search" })).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "View notifications" })).toBeInTheDocument()
  }}
>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Activity Feed</h1>
    <div class="space-y-3">
      <div class="p-4 bg-surface rounded-lg border border-border">
        <p class="font-medium">Sarah Chen commented on Website Redesign</p>
        <p class="text-sm text-muted">2 minutes ago</p>
      </div>
      <div class="p-4 bg-surface rounded-lg border border-border">
        <p class="font-medium">Marcus Webb pushed 4 commits to main</p>
        <p class="text-sm text-muted">1 hour ago</p>
      </div>
      <div class="p-4 bg-surface rounded-lg border border-border">
        <p class="font-medium">Priya Patel created Q3 budget report</p>
        <p class="text-sm text-muted">3 hours ago</p>
      </div>
    </div>
  </div>
</Story>

<Story
  name="Hidden Sidebars"
  args={{
    navItems: [{ label: "Home", href: "/" }],
    siteMenu: [{ label: "Overview", href: "/overview" }],
    leftSidebarHidden: true,
  }}
>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Reports</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="p-4 bg-surface rounded-lg border border-border">
        <p class="font-medium">Revenue by month</p>
        <p class="text-sm text-muted">Updated monthly</p>
      </div>
      <div class="p-4 bg-surface rounded-lg border border-border">
        <p class="font-medium">Active users</p>
        <p class="text-sm text-muted">Updated daily</p>
      </div>
    </div>
  </div>
</Story>
