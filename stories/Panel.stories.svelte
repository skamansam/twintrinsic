<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect } from "storybook/test"
import Panel from "$lib/components/Panel/Panel.svelte"

const { Story } = defineMeta({
  title: "Basic/Panel",
  component: Panel,
  tags: ["autodocs"],
  argTypes: {
    expanded: { control: "boolean", description: "Whether the panel is expanded", defaultValue: true },
    bordered: { control: "boolean", description: "Whether to show a border", defaultValue: true },
    disabled: { control: "boolean", description: "Whether to disable the panel controls", defaultValue: false },
    showIcon: { control: "boolean", description: "Whether to show the expand/collapse icon", defaultValue: true },
    class: { control: "text", description: "Additional CSS classes" },
    ariaLabel: { control: "text", description: "ARIA label for the header button" },
  },
})
</script>

<Story
  name="Default"
  args={{ expanded: true, class: "max-w-xl" }}
>
  {#snippet header()}Order Summary{/snippet}
  <div class="space-y-2">
    <div class="flex justify-between">
      <span class="text-muted">Subtotal</span><span>$149.00</span>
    </div>
    <div class="flex justify-between">
      <span class="text-muted">Shipping</span><span>Free</span>
    </div>
    <div class="flex justify-between font-medium border-t pt-2">
      <span>Total</span><span>$149.00</span>
    </div>
  </div>
</Story>

<Story name="Collapsed" args={{ expanded: false, class: "max-w-xl" }}>
  {#snippet header()}Order Summary{/snippet}
  <p class="text-muted">Expand to review your items and shipping details.</p>
</Story>

<Story name="Custom Header" args={{ class: "max-w-xl" }}>
  {#snippet header()}
    <svg class="w-5 h-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
    </svg>
    <span class="ml-2 font-medium">Settings</span>
  {/snippet}
  <div class="space-y-4">
    <p class="text-muted">Control how Acme Suite looks and behaves for your account.</p>
    <div class="flex items-center justify-between">
      <span>Dark mode</span>
      <button class="px-3 py-1 bg-primary-500 text-white rounded-md">Toggle</button>
    </div>
    <div class="flex items-center justify-between">
      <span>Email notifications</span>
      <button class="px-3 py-1 bg-primary-500 text-white rounded-md">Toggle</button>
    </div>
  </div>
</Story>

<Story name="Disabled" args={{ disabled: true, class: "max-w-xl" }}>
  {#snippet header()}Billing{/snippet}
  <p class="text-muted">Billing is managed by your administrator.</p>
</Story>

<Story name="Borderless" args={{ bordered: false, class: "max-w-xl" }}>
  {#snippet header()}Project Guidelines{/snippet}
  <ul class="text-muted list-disc pl-5 space-y-1">
    <li>Keep pull requests under 400 lines</li>
    <li>All new components need unit tests</li>
    <li>Update docs with every public API change</li>
  </ul>
</Story>
