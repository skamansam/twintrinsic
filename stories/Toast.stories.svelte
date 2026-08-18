<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent, waitFor } from "storybook/test"
import Toast from "$lib/components/Toast/Toast.svelte"
import { toastStore } from "$lib/components/Toast/toastStore.js"

const { Story } = defineMeta({
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["top-right", "top-left", "bottom-right", "bottom-left", "top-center", "bottom-center"],
    },
    maxToasts: { control: { type: "number", min: 1, max: 10 } },
    dismissible: { control: "boolean" },
    pauseOnHover: { control: "boolean" },
  },
  args: { position: "bottom-right" },
})

function trigger() {
  toastStore.clear()
  toastStore.add({ message: "Profile saved successfully", variant: "success", duration: 60000 })
}
</script>

<Story
  name="Default"
  asChild
  play={async ({ canvas }) => {
    // Firing the store adds a toast to the container.
    await userEvent.click(canvas.getByRole("button", { name: "Show toast" }))
    await waitFor(() => {
      expect(canvas.getByText("Profile saved successfully")).toBeInTheDocument()
    })

    // The toast is dismissible by clicking it.
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss notification" }))
    await waitFor(() => {
      expect(canvas.queryByText("Profile saved successfully")).not.toBeInTheDocument()
    })
  }}
>
  <div class="p-8">
    <button type="button" onclick={trigger} class="px-4 py-2 bg-primary-500 text-white rounded">
      Show toast
    </button>
    <Toast />
  </div>
</Story>

<Story
  name="Variants"
  asChild
  play={async ({ canvas }) => {
    // Different variants render distinct icons + progress bars.
    toastStore.clear()
    toastStore.add({ message: "Payment processed", variant: "success", duration: 60000 })
    toastStore.add({ message: "Storage almost full — 90% used", variant: "warning", duration: 60000 })
    toastStore.add({ message: "Could not reach server. Check your connection.", variant: "error", duration: 60000 })
    await waitFor(() => {
      expect(canvas.getByText("Payment processed")).toBeInTheDocument()
      expect(canvas.getByText("Storage almost full — 90% used")).toBeInTheDocument()
      expect(canvas.getByText("Could not reach server. Check your connection.")).toBeInTheDocument()
    })
  }}
>
  <div class="p-8">
    <Toast position="top-right" />
  </div>
</Story>

<Story
  name="Not Dismissible"
  asChild
  play={async ({ canvas }) => {
    toastStore.clear()
    toastStore.add({ message: "Your account has been suspended. Contact support.", dismissible: false, duration: 60000 })
    await waitFor(() => {
      expect(canvas.getByText("Your account has been suspended. Contact support.")).toBeInTheDocument()
    })
    // Non-dismissible toasts render a static role="alert" (no close button).
    await expect(canvas.queryByRole("button", { name: "Dismiss notification" })).not.toBeInTheDocument()
  }}
>
  <div class="p-8">
    <Toast dismissible={false} />
  </div>
</Story>
