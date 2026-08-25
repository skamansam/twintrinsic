<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Modal from "$lib/components/Modal/Modal.svelte"
import Button from "$lib/components/Button/Button.svelte"

let modalOpen = $state(false)
let modalSize = $state("md")

const { Story } = defineMeta({
  title: "Feedback/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg", "xl", "full"] },
    centered: { control: "boolean" },
    closeOnOutsideClick: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
    showCloseButton: { control: "boolean" },
  },
  args: { size: "md", centered: true, showCloseButton: true },
})
</script>

<Story
  name="Confirm Delete"
  play={async ({ canvas }) => {
    const triggers = canvas.getAllByText("Delete project");
    await expect(triggers[0]).toBeInTheDocument();
    await userEvent.click(triggers[0]);
  }}
>
  <button onclick={() => (modalOpen = true)} class="px-4 py-2 bg-error-500 text-white rounded">
    Delete project
  </button>
  <Modal open={modalOpen} onclose={() => (modalOpen = false)} ariaLabel="Delete project">
    {#snippet header()}Delete "Website Redesign"?{/snippet}
    <p>
      This will permanently delete the project and all of its 23 tasks, 4 milestones, and attached files.
      This action cannot be undone.
    </p>
    {#snippet footer()}
      <Button variant="outline" onclick={() => (modalOpen = false)}>Cancel</Button>
      <Button variant="outline" class="text-error-500" onclick={() => (modalOpen = false)}>Delete project</Button>
    {/snippet}
  </Modal>
</Story>

<Story name="Invite Team Member">
  <button onclick={() => (modalOpen = true)} class="px-4 py-2 bg-primary-500 text-white rounded">
    Invite teammate
  </button>
  <Modal open={modalOpen} onclose={() => (modalOpen = false)} ariaLabel="Invite team member" size="sm">
    {#snippet header()}Invite a teammate{/snippet}
    <form class="space-y-3" onsubmit={(e) => { e.preventDefault(); modalOpen = false }}>
      <label class="block">
        <span class="block text-sm font-medium mb-1">Email address</span>
        <input
          type="email"
          required
          placeholder="teammate@company.com"
          class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </label>
      <label class="block">
        <span class="block text-sm font-medium mb-1">Role</span>
        <select class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
          <option>Member</option>
          <option>Admin</option>
          <option>Viewer</option>
        </select>
      </label>
      <div class="flex justify-end gap-2 pt-2">
        <Button variant="outline" type="button" onclick={() => (modalOpen = false)}>Cancel</Button>
        <Button variant="primary" type="submit">Send invite</Button>
      </div>
    </form>
  </Modal>
</Story>

<Story name="Sizes">
  <div class="flex flex-wrap gap-2">
    {#each ["sm", "md", "lg", "xl"] as size}
      <button
        onclick={() => { modalSize = size; modalOpen = true }}
        class="px-4 py-2 bg-surface border border-border rounded"
      >
        Open {size}
      </button>
    {/each}
  </div>
  <Modal open={modalOpen} size={modalSize} onclose={() => (modalOpen = false)} ariaLabel="Checkout summary">
    {#snippet header()}Checkout summary ({modalSize}){/snippet}
    <p>Your order qualifies for free shipping. Review the items in your cart before continuing.</p>
    {#snippet footer()}
      <Button variant="primary" onclick={() => (modalOpen = false)}>Continue to checkout</Button>
    {/snippet}
  </Modal>
</Story>

<Story name="Without Close Button">
  <button onclick={() => (modalOpen = true)} class="px-4 py-2 bg-primary-500 text-white rounded">
    Review terms
  </button>
  <Modal
    open={modalOpen}
    showCloseButton={false}
    closeOnEscape={false}
    closeOnOutsideClick={false}
    onclose={() => (modalOpen = false)}
    ariaLabel="Accept the terms"
  >
    {#snippet header()}Accept the terms to continue{/snippet}
    <p>
      This modal has no close button and no light-dismiss — the only way out is the
      action area below, so the user must make an explicit choice.
    </p>
    {#snippet footer()}
      <Button variant="outline" onclick={() => (modalOpen = false)}>Decline</Button>
      <Button variant="primary" onclick={() => (modalOpen = false)}>I agree</Button>
    {/snippet}
  </Modal>
</Story>
