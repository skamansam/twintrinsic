<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import AppHeader from "../src/lib/components/AppHeader/AppHeader.svelte";

  const { Story } = defineMeta({
    title: "Layout/AppHeader",
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
    brand: "My App",
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  }}
/>

<Story
  name="WithLogo"
  args={{
    brand: {
      name: "My App",
      logo: "https://via.placeholder.com/32",
      href: "/",
    },
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  }}
/>

<Story
  name="WithSearch"
  args={{
    brand: "My App",
    showSearch: true,
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  }}
/>

<Story
  name="WithNotifications"
  args={{
    brand: "My App",
    showNotifications: true,
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  }}
/>

<Story
  name="WithUser"
  args={{
    brand: "My App",
    user: {
      name: "John Doe",
      avatar: "https://via.placeholder.com/32",
    },
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  }}
/>

<Story
  name="FullFeatured"
  args={{
    brand: {
      name: "My App",
      logo: "https://via.placeholder.com/32",
      href: "/",
    },
    user: {
      name: "John Doe",
      avatar: "https://via.placeholder.com/32",
    },
    showSearch: true,
    showNotifications: true,
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Projects", href: "/projects" },
      { label: "Calendar", href: "/calendar" },
      { label: "Reports", href: "/reports" },
    ],
  }}
/>
