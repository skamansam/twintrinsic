<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import AppHeader from "../src/lib/components/AppHeader/AppHeader.svelte";

  const logo = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%234f46e5'/%3E%3Ctext x='16' y='21' font-family='Arial' font-size='16' font-weight='bold' text-anchor='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E`;

  const { Story } = defineMeta({
    title: "App/AppHeader",
    component: AppHeader,
    argTypes: {
      brand: {
        control: "object",
        description: "Brand information as string or object with name, logo, and href",
      },
      user: {
        control: "object",
        description: "User information with name, avatar, and href",
      },
      showSearch: {
        control: "boolean",
        description: "Whether to show the search input",
      },
      showNotifications: {
        control: "boolean",
        description: "Whether to show notifications",
      },
      navItems: {
        control: "array",
        description: "Navigation items array",
      },
      class: {
        control: "text",
        description: "Additional CSS classes",
      },
    },
    parameters: {
      layout: "fullscreen",
    },
  });
</script>

<Story
  name="Default"
  args={{
    brand: "Acme Suite",
    themeToggleHidden: true,
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "Projects", href: "/projects" },
      { label: "Reports", href: "/reports" },
    ],
  }}
  play={async ({ canvas }) => {
    await expect(canvas.getByText("Acme Suite")).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "Home" })).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "Projects" })).toBeInTheDocument();
  }}
/>

<Story
  name="WithLogo"
  args={{
    brand: {
      name: "Acme Suite",
      logo,
      href: "/",
    },
    themeToggleHidden: true,
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "Projects", href: "/projects" },
      { label: "Reports", href: "/reports" },
    ],
  }}
/>

<Story
  name="WithSearch"
  args={{
    brand: "Acme Suite",
    showSearch: true,
    themeToggleHidden: true,
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "Projects", href: "/projects" },
      { label: "Reports", href: "/reports" },
    ],
  }}
/>

<Story
  name="WithNotifications"
  args={{
    brand: "Acme Suite",
    showNotifications: true,
    themeToggleHidden: true,
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "Projects", href: "/projects" },
      { label: "Reports", href: "/reports" },
    ],
  }}
/>

<Story
  name="WithUser"
  args={{
    brand: "Acme Suite",
    user: {
      name: "Sarah Chen",
      avatar: logo,
    },
    themeToggleHidden: true,
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "Projects", href: "/projects" },
      { label: "Reports", href: "/reports" },
    ],
  }}
/>

<Story
  name="FullFeatured"
  args={{
    brand: {
      name: "Acme Suite",
      logo,
      href: "/",
    },
    user: {
      name: "Sarah Chen",
      avatar: logo,
    },
    showSearch: true,
    showNotifications: true,
    themeToggleHidden: true,
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Projects", href: "/projects" },
      { label: "Calendar", href: "/calendar" },
      { label: "Reports", href: "/reports" },
    ],
  }}
/>
