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
  <p>Welcome to the dashboard</p>
</Story>

<Story
  name="With Sidebar Menu"
  args={{
    navItems: [{ label: "Home", href: "/" }],
    siteMenu: [{ label: "Overview", href: "/overview" }],
  }}
  play={async ({ canvas }) => {
    // The siteMenu prop renders a left sidebar; the main content still renders.
    await expect(canvas.getByText("Acme Suite")).toBeInTheDocument()
    await expect(canvas.getByText("Overview")).toBeInTheDocument()
  }}
>
  <p>Content with a sidebar</p>
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
  <p>Content</p>
</Story>

<Story
  name="Hidden Sidebars"
  args={{
    navItems: [{ label: "Home", href: "/" }],
    siteMenu: [{ label: "Overview", href: "/overview" }],
    leftSidebarHidden: true,
  }}
>
  <p>Content with hidden sidebar</p>
</Story>
