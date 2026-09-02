<script lang="ts" module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
  import Button from "../src/lib/components/Button/Button.svelte";
  import Toast from "../src/lib/components/Toast/Toast.svelte";
  import { toastStore } from "../src/lib/components/Toast/toastStore.js";

  // Toast is a mount-once container driven by the toast store; it renders no
  // children, so stories provide the container plus trigger buttons inline.
  // No `component` in meta — the addon's auto-render would otherwise replace
  // story children. ArgTypes are declared manually instead.
  const { Story } = defineMeta({
    title: "Components/Toast",
    tags: ["autodocs"],
    argTypes: {
      position: {
        control: "select",
        options: [
          "top-right",
          "top-left",
          "top-center",
          "bottom-right",
          "bottom-left",
          "bottom-center",
          "middle-left",
          "middle-right",
        ],
      },
      maxToasts: { control: "number" },
      duration: { control: "number" },
      dismissible: { control: "boolean" },
    },
  });
</script>

<Story name="Default">
  <div>
    <Toast />
    <p class="text-sm">Mount the container, then call <code>toastStore.add()</code>.</p>
  </div>
</Story>

<Story name="Save Profile">
  <div>
    <Toast />
    <div class="flex flex-wrap gap-4">
      <Button onclick={() => toastStore.add({ message: "Profile saved successfully" })}>
        Save Profile
      </Button>
    </div>
  </div>
</Story>

<Story name="All Variants">
  <div>
    <Toast />
    <div class="flex flex-wrap gap-2">
      <Button onclick={() => toastStore.add({ message: "Saved successfully", variant: "success" })}>
        Success
      </Button>
      <Button onclick={() => toastStore.add({ message: "Something went wrong", variant: "error" })}>
        Danger
      </Button>
      <Button onclick={() => toastStore.add({ message: "Check your input", variant: "warning" })}>
        Warning
      </Button>
      <Button onclick={() => toastStore.add({ message: "New version available", variant: "info" })}>
        Info
      </Button>
    </div>
  </div>
</Story>

<Story name="Positions">
  <div>
    <Toast />
    <div class="flex flex-wrap gap-2">
      <Button size="sm" onclick={() => toastStore.add({ message: "Top Right" })}>
        Top Right
      </Button>
      <Button size="sm" onclick={() => toastStore.add({ message: "Bottom Left" })}>
        Bottom Left
      </Button>
      <Button size="sm" onclick={() => toastStore.add({ message: "Top Center" })}>
        Top Center
      </Button>
      <Button size="sm" onclick={() => toastStore.add({ message: "Middle Right" })}>
        Middle Right
      </Button>
    </div>
  </div>
</Story>

<Story name="Dismissible">
  <div>
    <Toast />
    <div class="flex flex-wrap gap-2">
      <Button
        onclick={() =>
          toastStore.add({
            message: "Click the toast body to dismiss me",
            duration: 0,
            dismissible: true,
          })}
      >
        Show Persistent Toast
      </Button>
    </div>
  </div>
</Story>

<Story
  name="Dismiss Interaction"
  play={async ({ canvas }) => {
    await canvas.getByRole("button", { name: "Trigger Toast" }).click();
    // Dismissible toasts render as buttons labelled "Dismiss notification"
    const toast = canvas.getByRole("button", { name: "Dismiss notification" });
    await expect(toast).toHaveTextContent("This toast can be dismissed");
    await userEvent.click(toast);
    await expect(toast).not.toBeInTheDocument();
  }}
>
  <div>
    <Toast />
    <div class="flex flex-wrap gap-2">
      <Button
        onclick={() =>
          toastStore.add({
            message: "This toast can be dismissed",
            duration: 0,
          })}
      >
        Trigger Toast
      </Button>
    </div>
  </div>
</Story>
