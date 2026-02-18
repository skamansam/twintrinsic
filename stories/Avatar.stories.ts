import type { Meta, StoryObj } from "@storybook/svelte";
import Avatar from "$lib/components/Avatar/Avatar.svelte";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL",
    },
    alt: {
      control: "text",
      description: "Alt text for the image",
    },
    name: {
      control: "text",
      description: "User name for generating initials",
    },
    fallback: {
      control: "text",
      description: "Fallback text when image fails to load",
    },
    gravatarEmail: {
      control: "text",
      description: "Gravatar email address",
    },
    icon: {
      control: "text",
      description: "Icon name to display (e.g., 'user', 'star')",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the avatar",
    },
    shape: {
      control: "select",
      options: ["circle", "square", "rounded"],
      description: "Shape of the avatar",
    },
    status: {
      control: "select",
      options: [undefined, "online", "offline", "away", "busy"],
      description: "Status indicator",
    },
    statusIcon: {
      control: "text",
      description: "Icon name for status indicator",
    },
    bgColor: {
      control: "text",
      description: "Background color for text avatars",
    },
    bordered: {
      control: "boolean",
      description: "Whether to show a border",
    },
    shadowed: {
      control: "boolean",
      description: "Whether to add a shadow effect",
    },
  },
} satisfies Meta<Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicImage: Story = {
  args: {
    src: "https://i.pravatar.cc/300?img=1",
    alt: "User Avatar",
  },
};

export const WithInitials: Story = {
  args: {
    name: "John Doe",
  },
};

export const WithFallback: Story = {
  args: {
    fallback: "JD",
    bgColor: "bg-primary-600",
  },
};

export const WithGravatar: Story = {
  args: {
    gravatarEmail: "skamansam@gmail.com",
    name: "Skaman Sam Tyler",
    alt: "Skaman Sam Tyler's Avatar",
  },
};

export const WithIcon: Story = {
  args: {
    icon: "user",
    size: "md",
  },
};

export const IconVariants: Story = {
  render: () => ({
    Component: Avatar,
    props: {},
    template: `
      <div class="flex items-center gap-4">
        <Avatar icon="user" size="xs" />
        <Avatar icon="star" size="sm" />
        <Avatar icon="heart" size="md" />
        <Avatar icon="settings" size="lg" />
        <Avatar icon="bell" size="xl" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    Component: Avatar,
    props: {},
    template: `
      <div class="flex items-center gap-4">
        <Avatar size="xs" name="XS" />
        <Avatar size="sm" name="SM" />
        <Avatar size="md" name="MD" />
        <Avatar size="lg" name="LG" />
        <Avatar size="xl" name="XL" />
      </div>
    `,
  }),
};

export const Shapes: Story = {
  render: () => ({
    Component: Avatar,
    props: {},
    template: `
      <div class="flex items-center gap-4">
        <Avatar shape="circle" name="Circle" />
        <Avatar shape="square" name="Square" />
        <Avatar shape="rounded" name="Rounded" />
      </div>
    `,
  }),
};

export const StatusIndicators: Story = {
  render: () => ({
    Component: Avatar,
    props: {},
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Online" status="online" />
        <Avatar name="Offline" status="offline" />
        <Avatar name="Away" status="away" />
        <Avatar name="Busy" status="busy" />
      </div>
    `,
  }),
};

export const CustomStatusIcons: Story = {
  render: () => ({
    Component: Avatar,
    props: {},
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Verified" status="online" statusIcon="check-circle" />
        <Avatar name="Error" status="busy" statusIcon="x-circle" />
        <Avatar name="Warning" status="away" statusIcon="alert-triangle" />
      </div>
    `,
  }),
};

export const Styled: Story = {
  render: () => ({
    Component: Avatar,
    props: {},
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Bordered" bordered />
        <Avatar name="Shadowed" shadowed />
        <Avatar name="Both" bordered shadowed />
      </div>
    `,
  }),
};

export const WithStatusAndIcon: Story = {
  args: {
    icon: "user",
    size: "lg",
    status: "online",
    statusIcon: "check",
  },
};
