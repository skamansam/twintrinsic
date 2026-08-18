import Card from "$lib/components/Panel/Card.svelte"

export default {
  title: "Basic/Card",
  component: Card,
  argTypes: {
    hoverable: { control: "boolean" },
    shadow: { control: "boolean" },
    shadowSize: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
    clickable: { control: "boolean" },
  },
}

const Template = (args) => ({
  Component: Card,
  props: args,
})

export const Default = Template.bind({})
Default.args = {
  header: () => "Product Details",
  children: () => `
    <div class="p-4">
      <p class="font-medium text-lg">Wireless Noise-Cancelling Headphones</p>
      <p class="text-muted mt-1">Up to 30 hours of battery life with active noise cancelling.</p>
      <p class="mt-3 text-lg font-semibold">$199.99</p>
    </div>
  `,
}

export const WithMedia = Template.bind({})
WithMedia.args = {
  hoverable: true,
  media: () => `
    <img
      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
      alt="Featured blog post cover"
      class="w-full h-48 object-cover"
    />
  `,
  header: () => "Announcing Twintrinsic 2.0",
  children: () => `
    <div class="p-4">
      <p class="text-muted">We're excited to share a faster, more accessible release with 20+ new components and a fully revamped theming system.</p>
      <p class="mt-3 text-sm text-primary-600 font-medium">Read more →</p>
    </div>
  `,
}

export const WithFooter = Template.bind({})
WithFooter.args = {
  header: () => "Monthly Report — August 2026",
  children: () => `
    <div class="p-4">
      <p class="text-muted">Revenue grew 18% month over month, driven by the new Pro tier and expanded enterprise deals.</p>
      <div class="mt-3 flex gap-4 text-sm">
        <span class="text-success-600">↑ $42,300 revenue</span>
        <span class="text-muted">1,204 active users</span>
      </div>
    </div>
  `,
  footer: () => `
    <div class="flex justify-end space-x-2">
      <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
        View report
      </button>
    </div>
  `,
}

export const Clickable = Template.bind({})
Clickable.args = {
  clickable: true,
  hoverable: true,
  header: () => "Open Project",
  children: () => `
    <div class="p-4">
      <p class="font-medium">Website Redesign</p>
      <p class="text-muted mt-1">Last updated 2 hours ago by Sarah Chen</p>
      <div class="mt-3 flex items-center gap-2">
        <span class="px-2 py-1 rounded-full bg-primary-100 text-primary-700 text-xs">In progress</span>
        <span class="text-xs text-muted">12 tasks remaining</span>
      </div>
    </div>
  `,
}
