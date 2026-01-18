import type { Meta, StoryObj } from "@storybook/sveltekit";

import Accordion from "../src/lib/components/Accordion/Accordion.svelte"
import AccordionItem from "../src/lib/components/Accordion/AccordionItem.svelte"

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    allowMultiple: { control: "boolean" },
    bordered: { control: "boolean" },
    defaultExpanded: { control: "number" },
  },
} satisfies Meta<Accordion>

export default meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    Component: Accordion,
    props: {
      defaultExpanded: 0,
    },
    children: `
      <AccordionItem title="What is Twintrinsic?">
        <p>Twintrinsic is a Tailwind-based Svelte 5 component library emphasizing accessibility, extensibility, and performance through semantic HTML and CSS-first approaches.</p>
      </AccordionItem>
      <AccordionItem title="How do I use it?">
        <p>Simply import the components you need and use them in your Svelte applications. All components are fully typed with TypeScript and support modern Svelte 5 runes.</p>
      </AccordionItem>
      <AccordionItem title="Is it accessible?">
        <p>Yes! All components are WCAG 2.1 compliant with proper ARIA labels, semantic HTML, and full keyboard navigation support.</p>
      </AccordionItem>
    `,
  }),
};

export const AllowMultiple: Story = {
  render: () => ({
    Component: Accordion,
    props: {
      allowMultiple: true,
    },
    children: `
      <AccordionItem title="Feature One">
        <p>You can expand multiple accordion items at the same time when allowMultiple is enabled.</p>
      </AccordionItem>
      <AccordionItem title="Feature Two">
        <p>This is useful when you want to compare information across different sections.</p>
      </AccordionItem>
      <AccordionItem title="Feature Three">
        <p>All sections can remain open simultaneously for easy reference.</p>
      </AccordionItem>
    `,
  }),
};

export const NoBorder: Story = {
  render: () => ({
    Component: Accordion,
    props: {
      bordered: false,
    },
    children: `
      <AccordionItem title="Borderless Style">
        <p>This accordion has no borders, giving it a cleaner, more minimal appearance.</p>
      </AccordionItem>
      <AccordionItem title="Subtle Design">
        <p>Perfect for integrating seamlessly into your page layout without visual separation.</p>
      </AccordionItem>
      <AccordionItem title="Modern Look">
        <p>The borderless style works great with modern, minimalist design systems.</p>
      </AccordionItem>
    `,
  }),
};

export const AllCollapsed: Story = {
  render: () => ({
    Component: Accordion,
    props: {
      defaultExpanded: null,
    },
    children: `
      <AccordionItem title="First Item">
        <p>All accordion items start in a collapsed state with this configuration.</p>
      </AccordionItem>
      <AccordionItem title="Second Item">
        <p>Users must click to expand any section they want to view.</p>
      </AccordionItem>
      <AccordionItem title="Third Item">
        <p>This is useful when you want users to explicitly choose what content to view.</p>
      </AccordionItem>
    `,
  }),
};
