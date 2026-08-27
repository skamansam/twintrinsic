<!--
@component
Modal documentation page — standardized structure
-->
<script lang="ts">
import { writable } from "svelte/store"
import Button from "$lib/components/Button/Button.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import Modal from "$lib/components/Modal/Modal.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ModalModule from "$lib/components/Modal/Modal.svelte"

let showBasicModal = writable(false)
let showSizedModal = writable(false)
let showScrollableModal = writable(false)
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Modal</h1>

  <p>
    <strong>Modal</strong> displays content in a native HTML <code>&lt;dialog&gt;</code> element that
    requires user attention. It uses <code>closedby="any"</code> for built-in light-dismiss
    (Escape, backdrop click, and platform close gestures), native focus management with an inert
    background, and <code>@starting-style</code> entry/exit animations — no manual focus trap,
    backdrop div, or Escape listener.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A dialog overlay built on the native <code>&lt;dialog&gt;</code> element. It renders in the
    top layer, manages focus automatically, and traps keyboard interaction within the dialog.
    The <code>closedby="any"</code> attribute gives native light-dismiss (Escape + backdrop click +
    platform close gestures like the mobile back button).
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Modal&gt;</code> for critical tasks that require the user's full attention:
    confirmations (delete, discard), forms that must be completed before continuing, or
    displaying detailed information that shouldn't be mixed with the page content. For
    non-blocking notifications, use <code>&lt;Toast&gt;</code>. For inline expandable content,
    use an Accordion.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Native <code>&lt;dialog&gt;</code></strong> — built-in focus management, inert background, and light-dismiss.</li>
    <li><strong><code>closedby="any"</code></strong> — native Escape, backdrop click, and platform close gestures with zero JS.</li>
    <li><strong>Entry/exit animations</strong> — <code>@starting-style</code> + <code>transition-behavior: allow-discrete</code> for smooth transitions.</li>
    <li><strong>CSS <code>:has()</code></strong> — prevents body scroll while open without body-class bookkeeping.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/">WAI-ARIA APG — Dialog (Modal)</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog">MDN — &lt;dialog&gt; element</a></li>
    <li><a href="https://developer.chrome.com/docs/ui/developer-platform/dialogs">Chrome — Dialog element guide</a></li>
    <li><a href="https://primer.style/components/dialog">Primer — Dialog</a></li>
    <li><a href="https://m3.material.io/components/dialogs/overview">Material Design 3 — Dialogs</a></li>
  </ul>

  
<h2>Twintrinsic Implementation</h2>
<ul>
    <li>Native `&lt;dialog closedby=&quot;any&quot;&gt;` for light-dismiss dialogs</li>
    <li>`@starting-style` + `transition-behavior: allow-discrete` for enter/exit animations</li>
    <li>`::backdrop` for dimming the background</li>
    <li>Focus trapping via native `&lt;dialog&gt;` behavior</li>
    <li>Escape to close (native)</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't use a `&lt;div&gt;` overlay — `&lt;dialog&gt;` provides inert background, focus trap, and Escape</li>
    <li>Don't forget `closedby=&quot;any&quot;` for light-dismiss behavior</li>
</ul>

<h2>Related Components</h2>
<p>Toast, Popover, Menu</p>

<h2>Responsiveness</h2>
  <ul>
    <li>Centered by default; use <code>size="full"</code> for mobile-friendly full-screen dialogs.</li>
    <li>Body scroll is locked via pure CSS <code>:has()</code> while the dialog is open.</li>
    <li>Touch targets meet 44×44 px minimum for close and action buttons.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Sizes: <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>2xl</code>–<code>7xl</code>, <code>full</code>.</li>
    <li>Header, body, and footer snippets for full content control.</li>
    <li>Configurable close behavior via <code>closeOnEscape</code> and <code>closeOnOutsideClick</code>.</li>
    <li>Custom ARIA labels via <code>ariaLabel</code> and <code>ariaDescription</code>.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Confirm Delete</h3>
  <ExampleTabs code={`<script>
  let open = false
<\/script>

<Button onclick={() => open = true}>Delete project</Button>

<Modal {open} onclose={() => open = false} ariaLabel="Delete project">
  {#snippet header()}
    Delete "Website Redesign"?
  {/snippet}
  <p>
    This will permanently delete the project and all of its 23 tasks,
    4 milestones, and attached files. This action cannot be undone.
  </p>
  {#snippet footer()}
    <Button variant="outline" onclick={() => open = false}>Cancel</Button>
    <Button variant="primary" onclick={() => open = false}>Delete project</Button>
  {/snippet}
</Modal>`}>
    <div data-testid="modal-basic">
      <Button onclick={() => showBasicModal.set(true)}>Delete project</Button>
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
        <Button variant="outline" onclick={() => showBasicModal.set(false)}>Cancel</Button>
        <Button variant="primary" onclick={() => showBasicModal.set(false)}>Delete project</Button>
      {/snippet}
    </Modal>
  </ExampleTabs>

  <h3>Modal Sizes</h3>
  <ExampleTabs code={`<Modal open={true} size="sm"><!-- Small modal --></Modal>
<Modal open={true} size="md"><!-- Medium modal (default) --></Modal>
<Modal open={true} size="lg"><!-- Large modal --></Modal>
<Modal open={true} size="xl"><!-- Extra large modal --></Modal>
<Modal open={true} size="full"><!-- Full screen modal --></Modal>`}>
    <div data-testid="modal-sizes">
      <Button onclick={() => showSizedModal.set(true)}>View order details</Button>
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
  </ExampleTabs>

  <h3>Scrollable Content</h3>
  <ExampleTabs code={`<Modal open={true}>
  {#snippet header()}
    Software License Agreement
  {/snippet}
  <!-- Long content will automatically scroll -->
  <p>Please read this agreement before using the software.</p>
  {#snippet footer()}
    <Button>Close</Button>
  {/snippet}
</Modal>`}>
    <div data-testid="modal-scrollable">
      <Button onclick={() => showScrollableModal.set(true)}>View license agreement</Button>
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
  </ExampleTabs>

  <h2>Slots</h2>
  <table>
    <thead><tr><th>Slot</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>header</code></td><td>Modal header content (title area)</td></tr>
      <tr><td><code>default</code></td><td>Main modal body content</td></tr>
      <tr><td><code>footer</code></td><td>Modal footer content (action buttons)</td></tr>
    </tbody>
  </table>

  <h2>Props</h2>
  <PropsTable component={ModalModule} />

  <h2>Events</h2>
  <EventsTable component={ModalModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Built on the native <code>&lt;dialog&gt;</code> element (implicit <code>role="dialog"</code> and <code>aria-modal</code>).</li>
    <li><code>closedby="any"</code> gives native light-dismiss: Escape, backdrop click, and platform close gestures.</li>
    <li>Native focus management — focus moves into the dialog on open and is restored on close.</li>
    <li>Content outside the dialog becomes <strong>inert</strong> while it is open.</li>
    <li>Includes proper ARIA labels and descriptions (<code>aria-label</code>, <code>aria-labelledby</code>, <code>aria-describedby</code>).</li>
    <li>Body scroll prevented via pure CSS <code>:has()</code> — no body-class bookkeeping.</li>
    <li>Entry/exit animations via <code>@starting-style</code> + <code>transition-behavior: allow-discrete</code>.</li>
  </ul>

  <h3>Close behavior</h3>
  <p>
    The <code>closeOnEscape</code> and <code>closeOnOutsideClick</code> props map onto the native
    <code>closedby</code> attribute: both enabled maps to <code>any</code>, Escape-only maps to
    <code>closerequest</code>, and outside-click-only (or neither) maps to <code>none</code> with
    the backdrop click handled manually.
  </p>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Escape</kbd></td><td>Close the dialog (when <code>closedby</code> is <code>any</code> or <code>closerequest</code>)</td></tr>
      <tr><td><kbd>Tab</kbd></td><td>Move focus within the dialog (focus is trapped)</td></tr>
      <tr><td><kbd>Shift+Tab</kbd></td><td>Move focus backwards within the dialog</td></tr>
    </tbody>
  </table>
</Container>
