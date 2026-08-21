<script lang="ts">
import { writable } from "svelte/store"
import Button from "$lib/components/Button/Button.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Modal from "$lib/components/Modal/Modal.svelte"

let showBasicModal = writable(false)
let showSizedModal = writable(false)
let showScrollableModal = writable(false)

import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ModalModule from "$lib/components/Modal/Modal.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Modal</h1>
  
  <p>
    The Modal component displays content in a native HTML <code>&lt;dialog&gt;</code> element that requires user
    attention. It uses <code>closedby="any"</code> for built-in light-dismiss (Escape, backdrop click, and platform
    close gestures), native focus management with an inert background, and <code>@starting-style</code> entry/exit
    animations — no manual focus trap, backdrop div, or Escape listener.
  </p>

  <h2>Usage</h2>

  <h3>Confirm Delete</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="modal-basic">
    <Button onclick={() => showBasicModal.set(true)}>
      Delete project
    </Button>
  </div>

  <Modal open={$showBasicModal} onclose={() => showBasicModal.set(false)} ariaLabel="Delete project">
    {#snippet header()}
      Delete "Website Redesign"?
    {/snippet}
    <p>
      This will permanently delete the project and all of its 23 tasks, 4 milestones, and
      attached files. This action cannot be undone.
    </p>
    {#snippet footer()}
      <Button variant="outline" onclick={() => showBasicModal.set(false)}>
        Cancel
      </Button>
      <Button variant="primary" onclick={() => showBasicModal.set(false)}>
        Delete project
      </Button>
    {/snippet}
  </Modal>

  <CodeBlock language="svelte">{`\u003Cscript>
  import Modal from "$lib/components/Modal/Modal.svelte"
  import Button from "$lib/components/Button/Button.svelte"
  
  let open = false
\u003C/script>

<Button onclick={() => open = true}>
  Open Modal
</Button>

<Modal {open} onclose={() => open = false}>
  {#snippet header()}
    Modal Title
  {/snippet}
  <p>Modal content goes here</p>
  {#snippet footer()}
    <Button onclick={() => open = false}>Cancel</Button>
    <Button variant="primary">Save</Button>
  {/snippet}
</Modal>`}</CodeBlock>

  <h3>Modal Sizes</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="modal-sizes">
    <Button onclick={() => showSizedModal.set(true)}>
      View order details
    </Button>
  </div>

  <Modal open={$showSizedModal} onclose={() => showSizedModal.set(false)} size="lg" ariaLabel="Order details">
    {#snippet header()}
      Order #10482
    {/snippet}
    <p>Your order qualifies for free shipping. Review the items in your cart before continuing.</p>
    {#snippet footer()}
      <Button onclick={() => showSizedModal.set(false)}>Close</Button>
    {/snippet}
  </Modal>

  <CodeBlock language="svelte">{`<Modal open={true} size="sm"><!-- Small modal --></Modal>
<Modal open={true} size="md"><!-- Medium modal (default) --></Modal>
<Modal open={true} size="lg"><!-- Large modal --></Modal>
<Modal open={true} size="xl"><!-- Extra large modal --></Modal>
<Modal open={true} size="full"><!-- Full screen modal --></Modal>`}</CodeBlock>

  <h3>Scrollable Modal</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="modal-scrollable">
    <Button onclick={() => showScrollableModal.set(true)}>
      View license agreement
    </Button>
  </div>

  <Modal open={$showScrollableModal} onclose={() => showScrollableModal.set(false)} ariaLabel="License agreement">
    {#snippet header()}
      Software License Agreement
    {/snippet}
    <div class="space-y-4">
      <p>Please read this agreement before using the software. This modal contains scrollable content when it exceeds the available height.</p>
      <p>You may use the software for evaluation purposes for 14 days. After the trial period, a paid subscription is required for continued use.</p>
      <p>You may not reverse engineer, decompile, or disassemble the software, except as permitted by law. All rights, title, and interest remain with the licensor.</p>
      <p>The software is provided "as is" without warranty of any kind, express or implied. The licensor shall not be liable for any damages arising from its use.</p>
    </div>
    {#snippet footer()}
      <Button onclick={() => showScrollableModal.set(false)}>Close</Button>
    {/snippet}
  </Modal>

  <CodeBlock language="svelte">{`<Modal open={true}>
  {#snippet header()}
    Modal Title
  {/snippet}
  <!-- Long content will automatically scroll -->
  <p>Content here...</p>
  {#snippet footer()}
    <Button>Action</Button>
  {/snippet}
</Modal>`}</CodeBlock>

  <h2>Props</h2>
<PropsTable component={ModalModule} />

  <h2>Events</h2>
<EventsTable component={ModalModule} />

  <h2>Slots</h2>
  <table>
    <thead>
      <tr>
        <th>Slot</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>header</code></td>
        <td>Modal header content (title area)</td>
      </tr>
      <tr>
        <td><code>default</code></td>
        <td>Main modal content</td>
      </tr>
      <tr>
        <td><code>footer</code></td>
        <td>Modal footer content (action buttons)</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <ul>
    <li>Built on the native <code>&lt;dialog&gt;</code> element (implicit <code>role="dialog"</code> and <code>aria-modal</code>)</li>
    <li><code>closedby="any"</code> gives native light-dismiss: Escape, backdrop click, and platform close gestures</li>
    <li>Native focus management — focus moves into the dialog on open and is restored on close</li>
    <li>Content outside the dialog becomes inert while it is open</li>
    <li>Includes proper ARIA labels and descriptions (<code>aria-label</code>, <code>aria-labelledby</code>, <code>aria-describedby</code>)</li>
    <li>Prevents body scroll while open via pure CSS <code>:has()</code> — no body-class bookkeeping</li>
    <li>Entry/exit animations via <code>@starting-style</code> + <code>transition-behavior: allow-discrete</code></li>
  </ul>

  <h3>Close behavior</h3>
  <p>
    The <code>closeOnEscape</code> and <code>closeOnOutsideClick</code> props map onto the native
    <code>closedby</code> attribute: both enabled maps to <code>any</code>, Escape-only maps to
    <code>closerequest</code>, and outside-click-only (or neither) maps to <code>none</code> with the
    backdrop click handled manually.
  </p>

  <h2>Best Practices</h2>
  <ul>
    <li>Always provide a clear title in the header slot</li>
    <li>Keep modal content concise and focused</li>
    <li>Use footer slot for action buttons (Cancel, Save, etc.)</li>
    <li>Provide meaningful ARIA labels for accessibility</li>
    <li>Consider using smaller sizes (sm, md) for confirmation dialogs</li>
    <li>Use larger sizes (lg, xl) for forms or detailed content</li>
    <li>Always provide a way to close the modal (close button, Cancel button)</li>
    <li>Add <code>autofocus</code> to the first control the user should interact with (e.g. a confirm button) — the browser moves focus there when the dialog opens</li>
    <li>Test keyboard navigation and screen reader compatibility</li>
  </ul>
</Container>
