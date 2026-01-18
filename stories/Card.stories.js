import Card from "$lib/components/Panel/Card.svelte"

export default {
  title: "Components/Panel/Card",
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
  header: () => "Card Title",
  children: () => `
    <div class="p-4">
      <p>This is a basic card with a header and content.</p>
    </div>
  `,
}

export const WithMedia = Template.bind({})
WithMedia.args = {
  hoverable: true,
  media: () => `
    <img
      src="https://picsum.photos/600/300"
      alt="Sample image"
      class="w-full h-48 object-cover"
    />
  `,
  header: () => "Card with Media",
  children: () => `
    <div class="p-4">
      <p>This card includes a media section with an image.</p>
    </div>
  `,
}

export const WithFooter = Template.bind({})
WithFooter.args = {
  header: () => "Card with Footer",
  children: () => `
    <div class="p-4">
      <p>This card has a footer section.</p>
    </div>
  `,
  footer: () => `
    <div class="flex justify-end space-x-2">
      <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
        Action
      </button>
    </div>
  `,
}

export const Clickable = Template.bind({})
Clickable.args = {
  clickable: true,
  hoverable: true,
  header: () => "Clickable Card",
  children: () => `
    <div class="p-4">
      <p>Click or press Enter/Space to trigger the card's click event.</p>
    </div>
  `,
}
