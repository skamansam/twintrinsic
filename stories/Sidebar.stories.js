import { expect } from "@storybook/test"
import Sidebar from "$lib/components/Sidebar/Sidebar.svelte"

export default {
  title: "Layout/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  argTypes: {
    expanded: {
      control: "boolean",
      description: "Whether the sidebar is expanded",
      defaultValue: true,
    },
    position: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the sidebar",
      defaultValue: "left",
    },
    width: {
      control: "text",
      description: "Width of the sidebar when expanded",
      defaultValue: "16rem",
    },
    disabled: {
      control: "boolean",
      description: "Whether to disable the sidebar controls",
      defaultValue: false,
    },
    showBackdrop: {
      control: "boolean",
      description: "Whether to show a backdrop when expanded on mobile",
      defaultValue: true,
    },
    floatOnMobile: {
      control: "boolean",
      description: "Whether to float over content on mobile",
      defaultValue: true,
    },
    class: {
      control: "text",
      description: "Additional CSS classes",
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
}

// Basic sidebar
export const Default = {
  args: {
    expanded: true,
    class: "h-[400px]",
  },
  render: (args) => ({
    Component: Sidebar,
    props: args,
    template: `
      <div class="h-[400px] bg-surface relative">
        <Sidebar {...args}>
          <svelte:fragment slot="header">Navigation</svelte:fragment>
          <nav class="space-y-2">
            <a href="#" class="block p-2 rounded hover:bg-hover">Home</a>
            <a href="#" class="block p-2 rounded hover:bg-hover">About</a>
            <a href="#" class="block p-2 rounded hover:bg-hover">Settings</a>
            <a href="#" class="block p-2 rounded hover:bg-hover">Help</a>
          </nav>
        </Sidebar>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const sidebar = canvasElement.querySelector('[role="complementary"]')
    expect(sidebar).toBeVisible()
    expect(sidebar.querySelector('[role="region"]')).toBeVisible()
  },
}

// Right-positioned sidebar
export const RightSidebar = {
  args: {
    position: "right",
    expanded: true,
    class: "h-[400px]",
  },
}

// Collapsed sidebar
export const Collapsed = {
  args: {
    expanded: false,
    class: "h-[400px]",
  },
}

// Custom width
export const CustomWidth = {
  args: {
    width: "24rem",
    class: "h-[400px]",
  },
}

// With custom content
export const WithCustomContent = {
  args: {
    class: "h-[400px]",
  },
  render: (args) => ({
    Component: Sidebar,
    props: args,
    template: `
      <div class="h-[400px] bg-surface relative">
        <Sidebar {...args}>
          <svelte:fragment slot="header">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
              Settings
            </div>
          </svelte:fragment>
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium">Theme</label>
              <select class="w-full rounded-md border-border bg-background">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Language</label>
              <select class="w-full rounded-md border-border bg-background">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </Sidebar>
      </div>
    `,
  }),
}
