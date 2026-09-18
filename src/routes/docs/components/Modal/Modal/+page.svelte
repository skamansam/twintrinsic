<!--
@component
Modal documentation page — standardized structure
-->
<script lang="ts">
import { writable } from "svelte/store"
import BrowserApiBadge from "$lib/components/BrowserApiBadge/BrowserApiBadge.svelte"
import Button from "$lib/components/Button/Button.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import Modal from "$lib/components/Modal/Modal.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ModalModule from "$lib/components/Modal/Modal.svelte"
import { m } from "$lib/paraglide/messages.js"

let showBasicModal = writable(false)
let showSizedModal = writable(false)
let showScrollableModal = writable(false)
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="flex flex-wrap items-center gap-3">
  <h1>{m.modal_heading()}</h1>
  <BrowserApiBadge component="Modal" />
</div>

  <p>
    <strong>{m.modal_heading()}</strong>{m.modal_lede_1()}<code>&lt;dialog&gt;</code>{m.modal_lede_2()}<code>closedby="any"</code>{m.modal_lede_3()}<code>@starting-style</code>{m.modal_lede_4()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.modal_what_1_1()}<code>&lt;dialog&gt;</code>{m.modal_what_1_2()}<code>closedby="any"</code>{m.modal_what_1_3()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.modal_when_1()}<code>&lt;Modal&gt;</code>{m.modal_when_2()}<code>&lt;Toast&gt;</code>{m.modal_when_3()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>Native <code>&lt;dialog&gt;</code></strong>{m.modal_why_dialog_1()}</li>
    <li><strong><code>closedby="any"</code></strong>{m.modal_why_closedby_1()}</li>
    <li><strong>Entry/exit animations</strong>{m.modal_why_anim_1()}<code>@starting-style</code>{m.modal_why_anim_2()}<code>transition-behavior: allow-discrete</code>{m.modal_why_anim_3()}</li>
    <li><strong>CSS <code>:has()</code></strong>{m.modal_why_has_1()}</li>
  </ul>

  <h3>{m.sec_sources()}</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/">WAI-ARIA APG — Dialog (Modal)</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog">MDN — &lt;dialog&gt; element</a></li>
    <li><a href="https://developer.chrome.com/docs/ui/developer-platform/dialogs">Chrome — Dialog element guide</a></li>
    <li><a href="https://primer.style/components/dialog">Primer — Dialog</a></li>
    <li><a href="https://m3.material.io/components/dialogs/overview">Material Design 3 — Dialogs</a></li>
  </ul>

  <h2>{m.sec_implementation()}</h2>
<ul>
    <li>{m.modal_impl_1()}</li>
    <li>{m.modal_impl_2()}</li>
    <li>{m.modal_impl_3()}</li>
    <li>{m.modal_impl_4()}</li>
    <li>{m.modal_impl_5()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
    <li>{m.modal_mistake_1()}</li>
    <li>{m.modal_mistake_2()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>{m.modal_related_1()}</p>  <h2>{m.sec_responsiveness()}</h2>
  <ul>
    <li>{m.modal_responsive_1_1()}<code>size="full"</code>{m.modal_responsive_1_2()}</li>
    <li>{m.modal_responsive_2_1()}<code>:has()</code>{m.modal_responsive_2_2()}</li>
    <li>{m.modal_responsive_3()}</li>
  </ul>

  <h2>{m.sec_customization()}</h2>
  <ul>
    <li>{m.modal_custom_1_1()}<code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>2xl</code>–<code>7xl</code>{m.modal_custom_1_2()}<code>full</code>{m.modal_custom_1_3()}</li>
    <li>{m.modal_custom_2()}</li>
    <li>{m.modal_custom_3_1()}<code>closeOnEscape</code>{m.modal_custom_3_2()}<code>closeOnOutsideClick</code>{m.modal_custom_3_3()}</li>
    <li>{m.modal_custom_4_1()}<code>ariaLabel</code>{m.modal_custom_4_2()}<code>ariaDescription</code>{m.modal_custom_4_3()}</li>
  </ul>

  <h2>{m.sec_examples()}</h2>

  <h3>{m.modal_ex_confirm()}</h3>
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

  <h3>{m.modal_ex_sizes()}</h3>
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

  <h3>{m.modal_ex_scrollable()}</h3>
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
        <h4 class="font-semibold">1. License Grant</h4>
        <p>Subject to the terms of this Agreement, Licensor grants You a non-exclusive, non-transferable, limited license to use the Software solely for Your internal business purposes. This license is limited to the number of seats or users specified in Your order form.</p>
        <h4 class="font-semibold">2. Restrictions</h4>
        <p>You may not reverse engineer, decompile, or disassemble the Software, except as permitted by law. You may not rent, lease, lend, sublicense, distribute, or otherwise transfer the Software or any copies thereof. You may not remove or alter any proprietary notices, labels, or marks on the Software or any copies thereof.</p>
        <h4 class="font-semibold">3. Intellectual Property</h4>
        <p>All rights, title, and interest in and to the Software (including all intellectual property rights therein) are and shall remain the exclusive property of Licensor. This Agreement does not convey any ownership rights in or to the Software.</p>
        <h4 class="font-semibold">4. Warranty Disclaimer</h4>
        <p>The Software is provided "as is" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. Licensor does not warrant that the Software will be uninterrupted or error-free.</p>
        <h4 class="font-semibold">5. Limitation of Liability</h4>
        <p>In no event shall Licensor be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption) however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence) arising in any way out of the use of this Software, even if advised of the possibility of such damage.</p>
        <h4 class="font-semibold">6. Termination</h4>
        <p>This Agreement is effective until terminated. Licensor may terminate this Agreement at any time if You fail to comply with any term of this Agreement. Upon termination, You shall destroy all copies of the Software in Your possession or control.</p>
        <h4 class="font-semibold">7. Governing Law</h4>
        <p>This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under this Agreement shall be resolved in the courts of San Francisco County, California.</p>
        <h4 class="font-semibold">8. Entire Agreement</h4>
        <p>This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof, and supersedes all prior or contemporaneous communications, representations, or agreements, whether written or oral. No amendment to this Agreement shall be effective unless in writing and signed by an authorized representative of each party.</p>
        <p class="text-muted text-sm mt-6">Last updated: January 1, 2026. Version 2.4.1.</p>
      </div>
      {#snippet footer()}
        <Button onclick={() => showScrollableModal.set(false)}>Close</Button>
      {/snippet}
    </Modal>
  </ExampleTabs>

  <h2>{m.sec_slots()}</h2>
  <table>
    <thead><tr><th>{m.sec_slot()}</th><th>{m.sec_description()}</th></tr></thead>
    <tbody>
      <tr><td><code>header</code></td><td>{m.modal_slots_header()}</td></tr>
      <tr><td><code>default</code></td><td>{m.modal_slots_default()}</td></tr>
      <tr><td><code>footer</code></td><td>{m.modal_slots_footer()}</td></tr>
    </tbody>
  </table>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={ModalModule} />

  <h2>{m.sec_events()}</h2>
  <EventsTable component={ModalModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.modal_a11y_1_1()}<code>&lt;dialog&gt;</code>{m.modal_a11y_1_2()}<code>role="dialog"</code>{m.modal_a11y_1_3()}<code>aria-modal</code>{m.modal_a11y_1_4()}</li>
    <li><code>closedby="any"</code>{m.modal_a11y_2_2()}</li>
    <li>{m.modal_a11y_3()}</li>
    <li>{m.modal_a11y_4_1()}<strong>inert</strong>{m.modal_a11y_4_2()}</li>
    <li>{m.modal_a11y_5_1()}<code>aria-label</code>{m.modal_a11y_5_2()}<code>aria-labelledby</code>{m.modal_a11y_5_3()}<code>aria-describedby</code>{m.modal_a11y_5_4()}</li>
    <li>{m.modal_a11y_6_1()}<code>:has()</code>{m.modal_a11y_6_2()}</li>
    <li>{m.modal_a11y_7_1()}<code>@starting-style</code>{m.modal_a11y_7_2()}<code>transition-behavior: allow-discrete</code>{m.modal_a11y_7_3()}</li>
  </ul>

  <h3>{m.modal_close_heading()}</h3>
  <p>
    {m.modal_close_1_1()}<code>closeOnEscape</code>{m.modal_close_1_2()}<code>closeOnOutsideClick</code>{m.modal_close_1_3()}<code>closedby</code>{m.modal_close_1_4()}<code>any</code>{m.modal_close_1_5()}<code>closerequest</code>{m.modal_close_1_6()}<code>none</code>{m.modal_close_1_7()}
  </p>

  <h2>{m.sec_keyboard()}</h2>
  <table>
    <thead><tr><th>{m.sec_key()}</th><th>{m.sec_function()}</th></tr></thead>
    <tbody>
      <tr><td><kbd>Escape</kbd></td><td>{m.modal_kb_escape_1()}<code>closedby</code>{m.modal_kb_escape_2()}<code>any</code>{m.modal_kb_escape_3()}<code>closerequest</code>{m.modal_kb_escape_4()}</td></tr>
      <tr><td><kbd>Tab</kbd></td><td>{m.modal_kb_tab()}</td></tr>
      <tr><td><kbd>Shift+Tab</kbd></td><td>{m.modal_kb_shift_tab()}</td></tr>
    </tbody>
  </table>
</Container>
