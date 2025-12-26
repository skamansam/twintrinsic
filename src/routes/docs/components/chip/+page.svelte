<!--
@component
Chip documentation page
-->

<style>
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Chip from "$lib/components/Chip/Chip.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Chip</h1>
  
  <p>
    The Chip component is a compact element for representing an input, attribute, or action.
    It provides consistent styling, accessibility features, and interactive options like
    selection, removal, and click actions.
  </p>

  <h2>Usage</h2>

  <h3>Basic Chip</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Chip>Basic Chip</Chip>
  </div>

  <pre class="language-svelte"><code>{`<Chip>Basic Chip</Chip>`}</code></pre>

  <h3>Chip Variants</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Chip variant="default">Default</Chip>
    <Chip variant="primary">Primary</Chip>
    <Chip variant="secondary">Secondary</Chip>
    <Chip variant="success">Success</Chip>
    <Chip variant="warning">Warning</Chip>
    <Chip variant="error">Error</Chip>
    <Chip variant="info">Info</Chip>
  </div>

  <pre class="language-svelte"><code>{`<Chip variant="default">Default</Chip>
<Chip variant="primary">Primary</Chip>
<Chip variant="secondary">Secondary</Chip>
<Chip variant="success">Success</Chip>
<Chip variant="warning">Warning</Chip>
<Chip variant="error">Error</Chip>
<Chip variant="info">Info</Chip>`}</code></pre>

  <h3>Outline Chips</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Chip outline>Default</Chip>
    <Chip variant="primary" outline>Primary</Chip>
    <Chip variant="secondary" outline>Secondary</Chip>
    <Chip variant="success" outline>Success</Chip>
  </div>

  <pre class="language-svelte"><code>{`<Chip outline>Default</Chip>
<Chip variant="primary" outline>Primary</Chip>
<Chip variant="secondary" outline>Secondary</Chip>
<Chip variant="success" outline>Success</Chip>`}</code></pre>

  <h3>Chip Sizes</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Chip size="sm">Small</Chip>
    <Chip size="md">Medium</Chip>
    <Chip size="lg">Large</Chip>
  </div>

  <pre class="language-svelte"><code>{`<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>`}</code></pre>

  <h3>Removable Chips</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Chip removable>Removable</Chip>
    <Chip variant="primary" removable>Primary</Chip>
    <Chip variant="error" removable>Error</Chip>
  </div>

  <pre class="language-svelte"><code>{`<Chip removable onremove={() => handleRemove()}>Removable</Chip>
<Chip variant="primary" removable onremove={() => handleRemove()}>Primary</Chip>
<Chip variant="error" removable onremove={() => handleRemove()}>Error</Chip>`}</code></pre>

  <h3>Clickable Chips</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Chip clickable>Clickable</Chip>
    <Chip variant="primary" clickable>Primary</Chip>
    <Chip variant="success" clickable selected>Selected</Chip>
  </div>

  <pre class="language-svelte"><code>{`<Chip clickable onclick={() => handleClick()}>Clickable</Chip>
<Chip variant="primary" clickable onclick={() => handleClick()}>Primary</Chip>
<Chip variant="success" clickable selected onclick={() => handleClick()}>Selected</Chip>`}</code></pre>

  <h3>Chips with Icons</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Chip 
      icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>'
    >
      Success
    </Chip>
    <Chip 
      variant="warning"
      icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>'
    >
      Warning
    </Chip>
  </div>

  <pre class="language-svelte"><code>{`<Chip 
  icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M5 13l4 4L19 7" />
  </svg>'
>
  Success
</Chip>

<Chip 
  variant="warning"
  icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>'
>
  Warning
</Chip>`}</code></pre>

  <h3>Chips with Avatar</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Chip 
      avatar='<img src="https://i.pravatar.cc/100?img=1" alt="User Avatar">'
    >
      John Doe
    </Chip>
    <Chip 
      variant="primary"
      avatar='<div class="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">JD</div>'
      removable
    >
      Jane Doe
    </Chip>
  </div>

  <pre class="language-svelte"><code>{`<Chip 
  avatar='<img src="https://i.pravatar.cc/100?img=1" alt="User Avatar">'
>
  John Doe
</Chip>

<Chip 
  variant="primary"
  avatar='<div class="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">JD</div>'
  removable
>
  Jane Doe
</Chip>`}</code></pre>

  <h3>Disabled Chips</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Chip disabled>Disabled</Chip>
    <Chip variant="primary" disabled clickable>Disabled Clickable</Chip>
    <Chip variant="error" disabled removable>Disabled Removable</Chip>
  </div>

  <pre class="language-svelte"><code>{`<Chip disabled>Disabled</Chip>
<Chip variant="primary" disabled clickable>Disabled Clickable</Chip>
<Chip variant="error" disabled removable>Disabled Removable</Chip>`}</code></pre>

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
        <td><code>variant</code></td>
        <td><code>"default" | "primary" | "secondary" | "success" | "warning" | "error" | "info"</code></td>
        <td><code>"default"</code></td>
        <td>Visual style variant</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>"sm" | "md" | "lg"</code></td>
        <td><code>"md"</code></td>
        <td>Size of the chip</td>
      </tr>
      <tr>
        <td><code>icon</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Icon to display (HTML or SVG string)</td>
      </tr>
      <tr>
        <td><code>avatar</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Avatar to display (HTML or img tag)</td>
      </tr>
      <tr>
        <td><code>removable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the chip is removable</td>
      </tr>
      <tr>
        <td><code>clickable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the chip is clickable</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the chip is disabled</td>
      </tr>
      <tr>
        <td><code>selected</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the chip is selected</td>
      </tr>
      <tr>
        <td><code>outline</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show an outline style</td>
      </tr>
      <tr>
        <td><code>removeAriaLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Remove"</code></td>
        <td>ARIA label for the remove button</td>
      </tr>
      <tr>
        <td><code>removeIcon</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Custom remove icon (HTML or SVG string)</td>
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
        <td><code>crypto.randomUUID()</code></td>
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
        <td><code>click</code></td>
        <td><code>MouseEvent</code></td>
        <td>Fired when a clickable chip is clicked (not fired when disabled)</td>
      </tr>
      <tr>
        <td><code>remove</code></td>
        <td><code>void</code></td>
        <td>Fired when the remove button is clicked (not fired when disabled)</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Chip component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses appropriate <code>role="button"</code> when clickable</li>
    <li>Supports keyboard navigation with Enter and Space keys for clickable chips</li>
    <li>Includes <code>aria-disabled="true"</code> when disabled</li>
    <li>Remove button has an appropriate <code>aria-label</code> for screen readers</li>
    <li>Icons are marked with <code>aria-hidden="true"</code> to prevent screen reader announcement</li>
  </ul>

  <h2>Common Use Cases</h2>
  <p>
    Chips are commonly used for:
  </p>
  <ul>
    <li>Displaying selected filters or options</li>
    <li>Representing tags or categories</li>
    <li>Showing selected users or entities</li>
    <li>Input chips in form fields</li>
    <li>Compact action buttons</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Use chips for discrete pieces of information or actions</li>
    <li>Keep chip content concise and clear</li>
    <li>Make removable chips clearly interactive</li>
    <li>Use appropriate variants to convey meaning (e.g., success, error)</li>
    <li>Consider using avatars for user-related chips</li>
    <li>Ensure sufficient contrast between chip background and text</li>
  </ul>
</Container>
