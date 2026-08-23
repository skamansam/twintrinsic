<!--
@component
Toast documentation page — standardized structure
-->
<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import Toast from "$lib/components/Toast/Toast.svelte"
import { toastStore } from "$lib/components/Toast/toastStore.js"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ToastModule from "$lib/components/Toast/Toast.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Toast</h1>

  <p>
    <strong>Toast</strong> displays temporary, non-blocking notifications. Entry/exit animations
    use pure CSS (<code>@starting-style</code> + <code>transition-behavior: allow-discrete</code>)
    with no JavaScript animation logic. The container uses <code>content-visibility: auto</code>
    for rendering performance.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A lightweight notification component that appears temporarily to inform users of an
    action's result. Toasts auto-dismiss after a configurable duration and can be paused
    on hover. They are managed via a global store, so any component can trigger them.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use <code>&lt;Toast&gt;</code> for feedback that doesn't require user action:
    "Profile saved", "File uploaded", "Connection restored". For critical messages that
    block the workflow until acknowledged, use <code>&lt;Modal&gt;</code>.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Non-blocking</strong> — doesn't interrupt the user's current task.</li>
    <li><strong>Global store</strong> — any component can trigger a toast without prop drilling.</li>
    <li><strong>CSS-native animations</strong> — <code>@starting-style</code> and <code>allow-discrete</code> for smooth entry/exit with zero JS.</li>
    <li><strong>Rendering performance</strong> — <code>content-visibility: auto</code> skips off-screen containers.</li>
  </ul>

  <h3>Sources</h3>
  <ul>
    <li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/alert/">WAI-ARIA APG — Alert</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role">MDN — alert role</a></li>
    <li><a href="https://m3.material.io/components/snackbar/overview">Material Design 3 — Snackbar</a></li>
    <li><a href="https://primer.style/components/toast">Primer — Toast</a></li>
    <li><a href="https://ant.design/components/message">Ant Design — Message</a></li>
  </ul>

  <h2>Responsiveness</h2>
  <ul>
    <li>Max width <code>max-w-sm</code> (384px); collapses on small screens.</li>
    <li>Positioned in corners or centered; doesn't overlap the viewport edge.</li>
    <li>Touch targets meet 44×44 px minimum for close button.</li>
  </ul>

  <h2>Customization</h2>
  <ul>
    <li>Variants: <code>default</code>, <code>primary</code>, <code>success</code>, <code>warning</code>, <code>error</code>, <code>info</code>.</li>
    <li>Positions: <code>top-right</code>, <code>top-left</code>, <code>bottom-right</code>, <code>bottom-left</code>, <code>top-center</code>, <code>bottom-center</code>.</li>
    <li>Configurable duration, max toasts, dismissible, and pause-on-hover.</li>
    <li>Custom icons and progress bar per toast.</li>
  </ul>

  <h2>Examples</h2>

  <h3>Basic Toast</h3>
  <ExampleTabs code={`<script>
  import { toastStore } from "$lib/components/Toast/toastStore.js"
<\/script>

<button onclick={() => toastStore.add({ message: "Profile saved successfully" })}>
  Save Profile
</button>

<Toast />`}>
    <div class="flex flex-wrap gap-4" data-testid="toast-basic">
      <Button onclick={() => toastStore.add({ message: "Profile saved successfully" })}>
        Save Profile
      </Button>
    </div>
  </ExampleTabs>

  <h3>Toast Variants</h3>
  <ExampleTabs code={`toastStore.add({ message: "Profile saved successfully", variant: "success" })
toastStore.add({ message: "Could not reach server", variant: "error" })
toastStore.add({ message: "Storage almost full — 90% used", variant: "warning" })
toastStore.add({ message: "A new version is available", variant: "info" })`}>
    <div class="flex flex-wrap gap-4" data-testid="toast-variants">
      <Button onclick={() => toastStore.add({ message: "Profile saved successfully", variant: "success" })}>
        Success
      </Button>
      <Button onclick={() => toastStore.add({ message: "Could not reach server", variant: "error" })}>
        Error
      </Button>
      <Button onclick={() => toastStore.add({ message: "Storage almost full — 90% used", variant: "warning" })}>
        Warning
      </Button>
      <Button onclick={() => toastStore.add({ message: "A new version is available", variant: "info" })}>
        Info
      </Button>
    </div>
  </ExampleTabs>

  <h3>Toast with Title</h3>
  <ExampleTabs code={`toastStore.add({
  title: "Payment processed",
  message: "Your invoice has been paid",
  variant: "success"
})`}>
    <div class="flex flex-wrap gap-4" data-testid="toast-with-title">
      <Button onclick={() => toastStore.add({ title: "Payment processed", message: "Your invoice has been paid", variant: "success" })}>
        Payment Success
      </Button>
    </div>
  </ExampleTabs>

  <h3>Toast Positions</h3>
  <ExampleTabs code={`<Toast position="top-right" />
<Toast position="top-left" />
<Toast position="bottom-right" />
<Toast position="bottom-left" />`}>
    <div class="flex flex-wrap gap-4" data-testid="toast-positions">
      <Button onclick={() => toastStore.add({ message: "Top Right" })}>Top Right</Button>
      <Button onclick={() => toastStore.add({ message: "Top Left" })}>Top Left</Button>
      <Button onclick={() => toastStore.add({ message: "Bottom Right" })}>Bottom Right</Button>
      <Button onclick={() => toastStore.add({ message: "Bottom Left" })}>Bottom Left</Button>
    </div>
  </ExampleTabs>

  <h2>Props</h2>
  <PropsTable component={ToastModule} />

  <h2>Store Methods</h2>
  <table>
    <thead><tr><th>Method</th><th>Parameters</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>add()</code></td><td><code>{'{ message, title?, variant?, duration?, icon?, progress? }'}</code></td><td>Add a new toast notification</td></tr>
      <tr><td><code>remove()</code></td><td><code>id: string</code></td><td>Remove a specific toast by ID</td></tr>
      <tr><td><code>clear()</code></td><td>None</td><td>Clear all toasts</td></tr>
      <tr><td><code>pause()</code></td><td><code>id: string</code></td><td>Pause a toast's auto-dismiss timer</td></tr>
      <tr><td><code>resume()</code></td><td><code>id: string</code></td><td>Resume a toast's auto-dismiss timer</td></tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <ul>
    <li>Error toasts use <code>role="alert"</code> for immediate announcement.</li>
    <li>Other variants use <code>aria-live="polite"</code>.</li>
    <li>Container uses <code>aria-atomic="true"</code> to announce complete toast content.</li>
    <li>Close button includes proper <code>aria-label</code>.</li>
    <li>Keyboard navigation for close button.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead><tr><th>Key</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td><kbd>Tab</kbd></td><td>Move focus to the toast close button</td></tr>
      <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Dismiss the focused toast</td></tr>
      <tr><td><kbd>Escape</kbd></td><td>Dismiss the focused toast</td></tr>
    </tbody>
  </table>

  <h2>Modern CSS APIs</h2>
  <ul>
    <li><code>@starting-style</code> — CSS-native entry animation (no JavaScript).</li>
    <li><code>transition-behavior: allow-discrete</code> — animates <code>display</code> property on exit.</li>
    <li><code>content-visibility: auto</code> — skips rendering of off-screen toast containers.</li>
  </ul>
</Container>

<Toast />
