import { expect } from "@storybook/test"
import AppHeader from "$lib/components/AppHeader/AppHeader.svelte"

export default {
  title: "Layout/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
  argTypes: {
    brand: {
      control: "object",
      description: "Brand information as string or object with name, logo, and href",
      defaultValue: "My App",
    },
    user: {
      control: "object",
      description: "User information with name, avatar, and href",
      defaultValue: null,
    },
    showSearch: {
      control: "boolean",
      description: "Whether to show the search input",
      defaultValue: false,
    },
    showNotifications: {
      control: "boolean",
      description: "Whether to show notifications",
      defaultValue: false,
    },
    navItems: {
      control: "array",
      description: "Navigation items array",
      defaultValue: [],
    },
    class: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
}

// Basic header
export const Default = {
  args: {
    brand: "My App",
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  play: async ({ canvasElement }) => {
    const header = canvasElement.querySelector('[role="banner"]')
    expect(header).toBeVisible()
    expect(header.querySelector(".app-header-brand-name")).toHaveTextContent("My App")
  },
}

// Header with logo
export const WithLogo = {
  args: {
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
  },
}

// Header with search
export const WithSearch = {
  args: {
    brand: "My App",
    showSearch: true,
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
}

// Header with notifications
export const WithNotifications = {
  args: {
    brand: "My App",
    showNotifications: true,
    navItems: [
      { label: "Home", href: "/", current: true },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
}

// Header with user
export const WithUser = {
  args: {
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
  },
}

// Full featured header
export const FullFeatured = {
  args: {
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
  },
  render: (args) => ({
    Component: AppHeader,
    props: args,
    on {
      search: (event) => console.log("Search:", event.detail.query),
      signout: () => console.log("Sign out clicked"),
    },
  }),
}
