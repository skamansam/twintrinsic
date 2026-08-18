<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
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
    The Toast component displays temporary notifications to users. It provides various variants for different message types,
    customizable positioning, and automatic dismissal with optional manual close buttons.
  </p>

  <h2>Usage</h2>

  <h3>Basic Toast</h3>
  <div class="flex flex-wrap gap-4 p-4 bg-surface rounded-md mb-4" data-testid="toast-basic">
    <Button onclick={() => toastStore.add({ message: "Profile saved successfully" })}>
      Save Profile
    </Button>
  </div>

  <CodeBlock language="svelte">{`\u003Cscript>
  import { toastStore } from "$lib/components/Toast/toastStore.js"
\u003C/script>

<button onclick={() => toastStore.add({ message: "Profile saved successfully" })}>
  Save Profile
</button>

<Toast />`}</CodeBlock>

  <h3>Toast Variants</h3>
  <div class="flex flex-wrap gap-4 p-4 bg-surface rounded-md mb-4" data-testid="toast-variants">
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

  <CodeBlock language="svelte">{`toastStore.add({ message: "Profile saved successfully", variant: "success" })
toastStore.add({ message: "Could not reach server", variant: "error" })
toastStore.add({ message: "Storage almost full — 90% used", variant: "warning" })
toastStore.add({ message: "A new version is available", variant: "info" })`}</CodeBlock>

  <h3>Toast with Title</h3>
  <div class="flex flex-wrap gap-4 p-4 bg-surface rounded-md mb-4" data-testid="toast-with-title">
    <Button onclick={() => toastStore.add({ title: "Payment processed", message: "Your invoice has been paid", variant: "success" })}>
      Payment Success
    </Button>
  </div>

  <CodeBlock language="svelte">{`toastStore.add({
  title: "Payment processed",
  message: "Your invoice has been paid",
  variant: "success"
})`}</CodeBlock>

  <h3>Toast Positions</h3>
  <div class="flex flex-wrap gap-4 p-4 bg-surface rounded-md mb-4">
    <Button onclick={() => toastStore.add({ message: "Top Right" })}>
      Top Right
    </Button>
    <Button onclick={() => toastStore.add({ message: "Top Left" })}>
      Top Left
    </Button>
    <Button onclick={() => toastStore.add({ message: "Bottom Right" })}>
      Bottom Right
    </Button>
    <Button onclick={() => toastStore.add({ message: "Bottom Left" })}>
      Bottom Left
    </Button>
  </div>

  <CodeBlock language="svelte">{`<Toast position="top-right" />
<Toast position="top-left" />
<Toast position="bottom-right" />
<Toast position="bottom-left" />`}</CodeBlock>

  <h2>Props</h2>
<PropsTable component={ToastModule} />

  <h2>Toast Store Methods</h2>
  <table>
    <thead>
      <tr>
        <th>Method</th>
        <th>Parameters</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>add()</code></td>
        <td><code>{`{ message, title?, variant?, duration?, icon?, progress? }`}</code></td>
        <td>Add a new toast notification</td>
      </tr>
      <tr>
        <td><code>remove()</code></td>
        <td><code>id: string</code></td>
        <td>Remove a specific toast by ID</td>
      </tr>
      <tr>
        <td><code>clear()</code></td>
        <td>None</td>
        <td>Clear all toasts</td>
      </tr>
      <tr>
        <td><code>pause()</code></td>
        <td><code>id: string</code></td>
        <td>Pause a toast's auto-dismiss timer</td>
      </tr>
      <tr>
        <td><code>resume()</code></td>
        <td><code>id: string</code></td>
        <td>Resume a toast's auto-dismiss timer</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Toast component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses <code>role="alert"</code> for error toasts to announce immediately</li>
    <li>Uses <code>aria-live="polite"</code> for other toast variants</li>
    <li>Includes close button with proper <code>aria-label</code></li>
    <li>Container uses <code>aria-atomic="true"</code> to announce complete toast content</li>
    <li>Supports keyboard navigation for close button</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Use <code>success</code> variant for positive confirmations</li>
    <li>Use <code>error</code> variant for critical messages that need immediate attention</li>
    <li>Use <code>warning</code> variant for cautionary messages</li>
    <li>Use <code>info</code> variant for informational messages</li>
    <li>Keep messages concise and actionable</li>
    <li>Use titles for longer or complex messages</li>
    <li>Avoid showing too many toasts at once (use maxToasts)</li>
  </ul>
</Container>

<Toast />
