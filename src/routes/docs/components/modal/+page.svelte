<style>
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Modal from "$lib/components/Modal/Modal.svelte"
import Button from "$lib/components/Button/Button.svelte"
import { writable } from "svelte/store"

let showBasicModal = writable(false)
let showSizedModal = writable(false)
let showScrollableModal = writable(false)
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Modal</h1>
  
  <p>
    The Modal component displays content in a dialog box that requires user attention. It provides accessible focus management, keyboard navigation, and backdrop interactions for creating dialogs, alerts, and confirmation windows.
  </p>

  <h2>Usage</h2>

  <h3>Basic Modal</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Button on:click={() => showBasicModal.set(true)}>
      Open Modal
    </Button>
  </div>

  <Modal open={$showBasicModal} on:close={() => showBasicModal.set(false)}>
    <svelte:fragment slot="header">
      Welcome to Modal
    </svelte:fragment>
    <p>This is a basic modal dialog. Click outside or press Escape to close it.</p>
    <svelte:fragment slot="footer">
      <Button variant="outline" on:click={() => showBasicModal.set(false)}>
        Cancel
      </Button>
      <Button variant="primary" on:click={() => showBasicModal.set(false)}>
        Confirm
      </Button>
    </svelte:fragment>
  </Modal>

  <pre class="language-svelte"><code>{`<script>
  import Modal from "$lib/components/Modal/Modal.svelte"
  import Button from "$lib/components/Button/Button.svelte"
  
  let open = false
</script>

<Button on:click={() => open = true}>
  Open Modal
</Button>

<Modal {open} on:close={() => open = false}>
  <svelte:fragment slot="header">
    Modal Title
  </svelte:fragment>
  <p>Modal content goes here</p>
  <svelte:fragment slot="footer">
    <Button on:click={() => open = false}>Cancel</Button>
    <Button variant="primary">Save</Button>
  </svelte:fragment>
</Modal>`}</code></pre>

  <h3>Modal Sizes</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Button on:click={() => showSizedModal.set(true)}>
      Open Sized Modal
    </Button>
  </div>

  <Modal open={$showSizedModal} on:close={() => showSizedModal.set(false)} size="lg">
    <svelte:fragment slot="header">
      Large Modal
    </svelte:fragment>
    <p>This is a large modal with more space for content.</p>
    <svelte:fragment slot="footer">
      <Button on:click={() => showSizedModal.set(false)}>Close</Button>
    </svelte:fragment>
  </Modal>

  <pre class="language-svelte"><code>{`<Modal open={true} size="sm"><!-- Small modal --></Modal>
<Modal open={true} size="md"><!-- Medium modal (default) --></Modal>
<Modal open={true} size="lg"><!-- Large modal --></Modal>
<Modal open={true} size="xl"><!-- Extra large modal --></Modal>
<Modal open={true} size="full"><!-- Full screen modal --></Modal>`}</code></pre>

  <h3>Scrollable Modal</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Button on:click={() => showScrollableModal.set(true)}>
      Open Scrollable Modal
    </Button>
  </div>

  <Modal open={$showScrollableModal} on:close={() => showScrollableModal.set(false)}>
    <svelte:fragment slot="header">
      Long Content Modal
    </svelte:fragment>
    <div class="space-y-4">
      <p>This modal contains scrollable content when it exceeds the available height.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    </div>
    <svelte:fragment slot="footer">
      <Button on:click={() => showScrollableModal.set(false)}>Close</Button>
    </svelte:fragment>
  </Modal>

  <CodeBlock language="svelte">{`<Modal open={true}>
  <svelte:fragment slot="header">
    Modal Title
  </svelte:fragment>
  <!-- Long content will automatically scroll -->
  <p>Content here...</p>
  <svelte:fragment slot="footer">
    <Button>Action</Button>
  </svelte:fragment>
</Modal>`}</CodeBlock>

  <h2>Props</h2>
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>open</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the modal is open</td>
      </tr>
      <tr>
        <td><code>closeOnOutsideClick</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to close when clicking outside the modal</td>
      </tr>
      <tr>
        <td><code>closeOnEscape</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to close when pressing Escape key</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>"sm" | "md" | "lg" | "xl" | "full"</code></td>
        <td><code>"md"</code></td>
        <td>Size of the modal</td>
      </tr>
      <tr>
        <td><code>centered</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to center the modal vertically</td>
      </tr>
      <tr>
        <td><code>showCloseButton</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to show a close button in the header</td>
      </tr>
      <tr>
        <td><code>closeButtonLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Close modal"</code></td>
        <td>ARIA label for the close button</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td>-</td>
        <td>ARIA label for the modal</td>
      </tr>
      <tr>
        <td><code>ariaDescription</code></td>
        <td><code>string</code></td>
        <td>-</td>
        <td>ARIA description for the modal</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
      <tr>
        <td><code>id</code></td>
        <td><code>string</code></td>
        <td>auto-generated</td>
        <td>HTML id for accessibility</td>
      </tr>
    </tbody>
  </table>

  <h2>Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>open</code></td>
        <td>-</td>
        <td>Fired when the modal opens</td>
      </tr>
      <tr>
        <td><code>close</code></td>
        <td>-</td>
        <td>Fired when the modal closes</td>
      </tr>
    </tbody>
  </table>

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
    <li>Uses <code>role="dialog"</code> for semantic meaning</li>
    <li>Manages focus automatically when opening and closing</li>
    <li>Supports keyboard navigation (Escape to close)</li>
    <li>Includes proper ARIA labels and descriptions</li>
    <li>Prevents body scroll when modal is open</li>
    <li>Restores focus to previously focused element when closed</li>
    <li>Supports <code>aria-modal="true"</code> attribute</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Always provide a clear title in the header slot</li>
    <li>Keep modal content concise and focused</li>
    <li>Use footer slot for action buttons (Cancel, Save, etc.)</li>
    <li>Provide meaningful ARIA labels for accessibility</li>
    <li>Consider using smaller sizes (sm, md) for confirmation dialogs</li>
    <li>Use larger sizes (lg, xl) for forms or detailed content</li>
    <li>Always provide a way to close the modal (close button, Cancel button)</li>
    <li>Test keyboard navigation and screen reader compatibility</li>
  </ul>
</Container>
