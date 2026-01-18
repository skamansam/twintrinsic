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
  }),
};

export const AllowMultiple: Story = {
  render: () => ({
    Component: Accordion,
    props: {
      allowMultiple: true,
    },
  }),
};

export const NoBorder: Story = {
  render: () => ({
    Component: Accordion,
    props: {
      bordered: false,
    },
  }),
};

export const AllCollapsed: Story = {
  render: () => ({
    Component: Accordion,
    props: {
      defaultExpanded: null,
    },
  }),
};
