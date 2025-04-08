import { expect, userEvent } from "@storybook/test"
import Panel from "$lib/components/Panel/Panel.svelte"

export default {
  title: "Layout/Panel",
  component: Panel,
  tags: ["autodocs"],
  argTypes: {
    expanded: {
      control: "boolean",
      description: "Whether the panel is expanded",
      defaultValue: true,
    },
    bordered: {
      control: "boolean",
      description: "Whether to show a border",
      defaultValue: true,
    },
    disabled: {
      control: "boolean",
      description: "Whether to disable the panel controls",
      defaultValue: false,
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show the expand/collapse icon",
      defaultValue: true,
    },
    class: {
      control: "text",
      description: "Additional CSS classes",
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for the header button",
    },
  },
}

// Basic panel
export const Default = {
  args: {
    expanded: true,
    class: "max-w-xl",
  },
  render: (args) => ({
    Component: Panel,
    props: args,
    template: `
      <Panel {...args}>
        <svelte:fragment slot="header">Panel Title</svelte:fragment>
        <p class="text-muted">This is the panel content. It can contain any elements.</p>
      </Panel>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")

    // Test initial expanded state
    expect(button).toHaveAttribute("aria-expanded", "true")

    // Test clicking
    await userEvent.click(button)
    expect(button).toHaveAttribute("aria-expanded", "false")

    // Test keyboard navigation
    await userEvent.tab()
    expect(button).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    expect(button).toHaveAttribute("aria-expanded", "true")
  },
}

// Collapsed panel
export const Collapsed = {
  args: {
    expanded: false,
    class: "max-w-xl",
  },
}

// Custom header with icon
export const CustomHeader = {
  args: {
    class: "max-w-xl",
  },
  render: (args) => ({
    Component: Panel,
    props: args,
    template: `
      <Panel {...args}>
        <svelte:fragment slot="header">
          <svg class="w-5 h-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
          <span class="ml-2 font-medium">Settings</span>
        </svelte:fragment>
        <div class="space-y-4">
          <p class="text-muted">Configure your preferences here.</p>
          <div class="flex items-center justify-between">
            <span>Dark Mode</span>
            <button class="px-3 py-1 bg-primary-500 text-white rounded-md">Toggle</button>
          </div>
        </div>
      </Panel>
    `,
  }),
}

// Disabled panel
export const Disabled = {
  args: {
    disabled: true,
    class: "max-w-xl",
  },
}

// Borderless panel
export const Borderless = {
  args: {
    bordered: false,
    class: "max-w-xl",
  },
}
