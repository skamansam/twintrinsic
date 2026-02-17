<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import { Button, CodeBlock, Container, Toast } from "$lib"
import { toastStore } from "$lib/components/Toast/toastStore"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Toast</h1>
  
  <p>
    The Toast component displays temporary notifications to users. It provides various variants for different message types,
    customizable positioning, and automatic dismissal with optional manual close buttons.
  </p>

  <h2>Usage</h2>

  <h3>Basic Toast</h3>
  <div class="flex flex-wrap gap-4 p-4 bg-surface rounded-md mb-4">
    <Button onclick={() => toastStore.add({ message: "This is a toast notification" })}>
      Show Toast
    </Button>
  </div>

  <CodeBlock language="svelte">{`<script>
  import { toastStore } from "$lib/components/Toast/toastStore"
</script>

<button onclick={() => toastStore.add({ message: "This is a toast" })}>
  Show Toast
</button>

<Toast />`}</CodeBlock>

  <h3>Toast Variants</h3>
  <div class="flex flex-wrap gap-4 p-4 bg-surface rounded-md mb-4">
    <Button onclick={() => toastStore.add({ message: "Success!", variant: "success" })}>
      Success
    </Button>
    <Button onclick={() => toastStore.add({ message: "Error occurred!", variant: "error" })}>
      Error
    </Button>
    <Button onclick={() => toastStore.add({ message: "Warning!", variant: "warning" })}>
      Warning
    </Button>
    <Button onclick={() => toastStore.add({ message: "Info message", variant: "info" })}>
      Info
    </Button>
  </div>

  <CodeBlock language="svelte">{`toastStore.add({ message: "Success!", variant: "success" })
toastStore.add({ message: "Error occurred!", variant: "error" })
toastStore.add({ message: "Warning!", variant: "warning" })
toastStore.add({ message: "Info message", variant: "info" })`}</CodeBlock>

  <h3>Toast with Title</h3>
  <div class="flex flex-wrap gap-4 p-4 bg-surface rounded-md mb-4">
    <Button onclick={() => toastStore.add({ title: "Success", message: "Your changes have been saved", variant: "success" })}>
      With Title
    </Button>
  </div>

  <CodeBlock language="svelte">{`toastStore.add({
  title: "Success",
  message: "Your changes have been saved",
  variant: "success"
})`}</CodeBlock>

  <h3>Toast Positions</h3>
  <div class="flex flex-wrap gap-4 p-4 bg-surface rounded-md mb-4">
    <Button on:click={() => toastStore.add({ message: "Top Right", position: "top-right" })}>
      Top Right
    </Button>
    <Button on:click={() => toastStore.add({ message: "Top Left", position: "top-left" })}>
      Top Left
    </Button>
    <Button on:click={() => toastStore.add({ message: "Bottom Right", position: "bottom-right" })}>
      Bottom Right
    </Button>
    <Button on:click={() => toastStore.add({ message: "Bottom Left", position: "bottom-left" })}>
      Bottom Left
    </Button>
  </div>

  <CodeBlock language="svelte">{`<Toast position="top-right" />
<Toast position="top-left" />
<Toast position="bottom-right" />
<Toast position="bottom-left" />`}</CodeBlock>

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
        <td><code>position</code></td>
        <td><code>"top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"</code></td>
        <td><code>"bottom-right"</code></td>
        <td>Position of the toast container</td>
      </tr>
      <tr>
        <td><code>maxToasts</code></td>
        <td><code>number</code></td>
        <td><code>5</code></td>
        <td>Maximum number of toasts to display at once</td>
      </tr>
      <tr>
        <td><code>duration</code></td>
        <td><code>number</code></td>
        <td><code>5000</code></td>
        <td>Default duration in milliseconds before auto-dismiss</td>
      </tr>
      <tr>
        <td><code>dismissible</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether toasts can be dismissed by clicking</td>
      </tr>
      <tr>
        <td><code>pauseOnHover</code></td>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>Whether to pause the auto-dismiss timer on hover</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

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
