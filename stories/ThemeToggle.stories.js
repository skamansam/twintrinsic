import ThemeToggle from "../lib/components/ThemeToggle/ThemeToggle.svelte"

export default {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A toggle button for switching between light and dark themes.",
      },
    },
  },
}

export const Default = {
  render: (args) => ({
    Component: ThemeToggle,
    props: args,
    template: `
      <div class="p-4">
        <ThemeToggle {...args} />
      </div>
    `,
  }),
}

export const InHeader = {
  render: (args) => ({
    Component: ThemeToggle,
    props: args,
    template: `
      <div class="p-4 bg-background border border-border rounded-lg">
        <div class="flex items-center justify-end">
          <ThemeToggle {...args} />
        </div>
      </div>
    `,
  }),
}
