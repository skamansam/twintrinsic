<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, within } from "storybook/test";
  import Avatar from "../src/lib/components/Avatar/Avatar.svelte";

  const { Story } = defineMeta({
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
  });
</script>

<!--
  Render-only stories become auto-render tests via the Vitest addon.
  We add small `play` functions to assert the DOM-level behavior
  (class names, attr presence) without depending on network image
  fetches, so the suite stays reliable in headless Chromium CI.
-->

<Story
  name="Basic Image"
  args={{ src: "https://i.pravatar.cc/300?img=1", alt: "User Avatar" }}
  play={async ({ canvas }) => {
    const avatar = await canvas.findByRole("img", { name: /user avatar/i });
    await expect(avatar).toBeInTheDocument();
    await expect(avatar.tagName).toBe("IMG");
    const src = avatar.getAttribute("src");
    await expect(src).toMatch(/^https?:\/\//);

    const wrapper = avatar.closest(".avatar");
    await expect(wrapper).not.toBeNull();
    await expect(wrapper).toHaveClass("w-10"); // default size = md
    await expect(wrapper).toHaveClass("rounded-full"); // default shape
  }}
/>

<Story
  name="With Initials"
  args={{ name: "John Doe" }}
  play={async ({ canvas }) => {
    const wrapper = (await canvas.findByLabelText("John Doe")).closest(".avatar");
    await expect(wrapper).not.toBeNull();
    const fallback = wrapper?.querySelector(".avatar-fallback");
    await expect(fallback).not.toBeNull();
    // Default initialsGenerator: first letter of first + last name.
    await expect(fallback?.textContent?.trim()).toBe("JD");
  }}
/>

<Story
  name="With Fallback"
  args={{ fallback: "JD", bgColor: "bg-primary-600" }}
  play={async ({ canvas }) => {
    const fallback = await canvas.findByText("JD");
    await expect(fallback).toBeInTheDocument();
    const wrapper = fallback.closest(".avatar");
    await expect(wrapper).toHaveClass("rounded-full");
    // bgColor is applied as a class on `.avatar-fallback` (Tailwind
    // class), not as an inline style on the `.avatar` wrapper.
    await expect(fallback).toHaveClass("bg-primary-600");
  }}
/>

<Story
  name="With Gravatar"
  args={{
    gravatarEmail: "skamansam@gmail.com",
    name: "Skaman Sam Tyler",
    alt: "Skaman Sam Tyler's Avatar",
  }}
  play={async ({ canvas }) => {
    // The avatar url is set asynchronously via $effect after the
    // crypto.subtle.digest resolves. findByRole on the img will wait.
    const img = await canvas.findByRole("img", {
      name: /skaman sam tyler/i,
    });
    const src = img.getAttribute("src");
    await expect(src).toMatch(
      /^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]+\?d=identicon$/,
    );
  }}
/>

<Story
  name="With Icon"
  args={{ icon: "user", size: "md" }}
  play={async ({ canvas }) => {
    const wrapper = (await canvas.findByLabelText("user")).closest(".avatar");
    await expect(wrapper).not.toBeNull();
    await expect(wrapper).toHaveClass("w-10"); // md = w-10 h-10
    // The icon host must be mounted. The inner <svg> is rendered by
    // @iconify/svelte and requires a network fetch of icon data, so we
    // assert the host (which is always present) rather than the svg.
    const iconHost = wrapper?.querySelector(".avatar-icon");
    await expect(iconHost).not.toBeNull();
  }}
/>

<!--
  The multi-avatar stories below compose several <Avatar>s in markup.
  Each renders with `aria-label` = its fallback `name` (or `icon`), so
  the play functions query by label to distinguish them.
-->

<Story
  name="Icon Variants"
  asChild
  play={async ({ canvas }) => {
    for (const name of ["user", "star", "heart", "settings", "bell"]) {
      const wrapper = (await canvas.findByLabelText(name)).closest(".avatar");
      await expect(wrapper, `wrapper for "${name}"`).not.toBeNull();
      await expect(wrapper?.querySelector(".avatar-icon")).not.toBeNull();
    }
    // xs => w-6; xl => w-16
    await expect(
      (await canvas.findByLabelText("user")).closest(".avatar"),
    ).toHaveClass("w-6");
    await expect(
      (await canvas.findByLabelText("bell")).closest(".avatar"),
    ).toHaveClass("w-16");
  }}
>
  <div class="flex items-center gap-4">
    <Avatar icon="user" size="xs" />
    <Avatar icon="star" size="sm" />
    <Avatar icon="heart" size="md" />
    <Avatar icon="settings" size="lg" />
    <Avatar icon="bell" size="xl" />
  </div>
</Story>

<Story
  name="Sizes"
  asChild
  play={async ({ canvas }) => {
    const scope = within(await canvas.findByTestId("avatar-sizes"));
    // Avatar sets `aria-label={name}` on the wrapper; the visible text
    // inside `.avatar-fallback` is initials ("X" not "XS"), so we query
    // by label rather than by text.
    const expected = [
      ["XS", "w-6"],
      ["SM", "w-8"],
      ["MD", "w-10"],
      ["LG", "w-12"],
      ["XL", "w-16"],
    ];
    for (const [name, cls] of expected) {
      const wrapper = (await scope.findByLabelText(name)).closest(".avatar");
      await expect(wrapper, `${name} wrapper`).toHaveClass(cls);
    }
  }}
>
  <div class="flex items-center gap-4" data-testid="avatar-sizes">
    <Avatar size="xs" name="XS" />
    <Avatar size="sm" name="SM" />
    <Avatar size="md" name="MD" />
    <Avatar size="lg" name="LG" />
    <Avatar size="xl" name="XL" />
  </div>
</Story>

<Story
  name="Shapes"
  asChild
  play={async ({ canvas }) => {
    const scope = within(await canvas.findByTestId("avatar-shapes"));
    await expect(
      (await scope.findByLabelText("Circle")).closest(".avatar"),
    ).toHaveClass("rounded-full");
    await expect(
      (await scope.findByLabelText("Square")).closest(".avatar"),
    ).toHaveClass("rounded-none");
    await expect(
      (await scope.findByLabelText("Rounded")).closest(".avatar"),
    ).toHaveClass("rounded-md");
  }}
>
  <div class="flex items-center gap-4" data-testid="avatar-shapes">
    <Avatar shape="circle" name="Circle" />
    <Avatar shape="square" name="Square" />
    <Avatar shape="rounded" name="Rounded" />
  </div>
</Story>

<Story
  name="Status Indicators"
  asChild
  play={async ({ canvas }) => {
    const scope = within(
      await canvas.findByTestId("avatar-status-indicators"),
    );
    const cases = [
      ["Online", /bg-success-500/],
      ["Offline", /bg-muted/],
      ["Away", /bg-warning-500/],
      ["Busy", /bg-error-500/],
    ];
    for (const [name, cls] of cases) {
      const status = await scope.findByLabelText(`Status: ${name.toLowerCase()}`);
      await expect(status).toHaveClass(cls);
    }
  }}
>
  <div class="flex items-center gap-4" data-testid="avatar-status-indicators">
    <Avatar name="Online" status="online" />
    <Avatar name="Offline" status="offline" />
    <Avatar name="Away" status="away" />
    <Avatar name="Busy" status="busy" />
  </div>
</Story>

<Story
  name="Custom Status Icons"
  asChild
  play={async ({ canvas }) => {
    // The custom status icons are rendered by @iconify/svelte which needs
    // a network fetch; assert the status host + aria-label only (the host
    // is always present regardless of icon data availability).
    for (const label of ["Status: online", "Status: busy", "Status: away"]) {
      await expect(await canvas.findByLabelText(label)).not.toBeNull();
    }
  }}
>
  <div class="flex items-center gap-4">
    <Avatar name="Verified" status="online" statusIcon="circle-check" />
    <Avatar name="Error" status="busy" statusIcon="circle-x" />
    <Avatar name="Warning" status="away" statusIcon="alert-triangle" />
  </div>
</Story>

<Story
  name="Styled"
  asChild
  play={async ({ canvas }) => {
    const scope = within(await canvas.findByTestId("avatar-styled"));
    await expect(
      (await scope.findByLabelText("Bordered")).closest(".avatar"),
    ).toHaveClass("avatar-bordered");
    await expect(
      (await scope.findByLabelText("Shadowed")).closest(".avatar"),
    ).toHaveClass("avatar-shadowed");
    const both = (await scope.findByLabelText("Both")).closest(".avatar");
    await expect(both).toHaveClass("avatar-bordered");
    await expect(both).toHaveClass("avatar-shadowed");
  }}
>
  <div class="flex items-center gap-4" data-testid="avatar-styled">
    <Avatar name="Bordered" bordered />
    <Avatar name="Shadowed" shadowed />
    <Avatar name="Both" bordered shadowed />
  </div>
</Story>

<Story
  name="With Status And Icon"
  args={{ icon: "user", size: "lg", status: "online", statusIcon: "check" }}
  play={async ({ canvas }) => {
    // Icon fallback becomes the avatar's aria-label.
    const wrapper = (await canvas.findByLabelText("user")).closest(".avatar");
    await expect(wrapper).toHaveClass("w-12"); // lg
    // Status indicator mounted with the right color and aria-label.
    const status = await canvas.findByLabelText("Status: online");
    await expect(status).toHaveClass(/bg-success-500/);
  }}
/>
