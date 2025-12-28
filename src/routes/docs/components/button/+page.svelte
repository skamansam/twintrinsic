<!--
@component
Button documentation page
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Button from "$lib/components/Button/Button.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Button</h1>
  
  <p>
    The Button component is a versatile interactive element that provides consistent styling, 
    accessibility features, and various states. It can be rendered as either a button or a link
    while maintaining a consistent appearance.
  </p>

  <h2>Usage</h2>

  <h3>Basic Button</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Button>Default Button</Button>
  </div>

  <pre class="language-svelte"><code>{`<Button>Default Button</Button>`}</code></pre>

  <h3>Button Variants</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Button variant="default">Default</Button>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>

  <pre class="language-svelte"><code>{`<Button variant="default">Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}</code></pre>

  <h3>Button Sizes</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Button size="xs">Extra Small</Button>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="xl">Extra Large</Button>
  </div>

  <pre class="language-svelte"><code>{`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}</code></pre>

  <h3>Button with Icons</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Button 
      icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>'
    >
      Add Item
    </Button>
    <Button 
      variant="primary"
      icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>'
      iconPosition="right"
    >
      Confirm
    </Button>
    <Button 
      variant="outline"
      icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>'
    >
      Settings
    </Button>
  </div>

  <CodeBlock language="svelte">{`<Button 
  icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>'
>
  Add Item
</Button>

<Button 
  variant="primary"
  icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M5 13l4 4L19 7" />
  </svg>'
  iconPosition="right"
>
  Confirm
</Button>

<Button 
  variant="outline"
  icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>'
>
  Settings
</Button>`}</CodeBlock>

  <h3>Button States</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Button disabled>Disabled</Button>
    <Button loading>Loading</Button>
    <Button fullWidth>Full Width Button</Button>
  </div>

  <pre class="language-svelte"><code>{`<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
<Button fullWidth>Full Width Button</Button>`}</code></pre>

  <h3>Link Button</h3>
  <div class="flex flex-wrap items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Button href="/docs">Link Button</Button>
    <Button href="https://example.com" target="_blank" variant="primary">External Link</Button>
  </div>

  <pre class="language-svelte"><code>{`<Button href="/docs">Link Button</Button>
<Button href="https://example.com" target="_blank" variant="primary">External Link</Button>`}</code></pre>

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
        <td><code>type</code></td>
        <td><code>"button" | "submit" | "reset"</code></td>
        <td><code>"button"</code></td>
        <td>Button type (only applies when rendered as a button)</td>
      </tr>
      <tr>
        <td><code>variant</code></td>
        <td><code>"default" | "primary" | "secondary" | "outline" | "ghost" | "link"</code></td>
        <td><code>"default"</code></td>
        <td>Visual style variant</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>"xs" | "sm" | "md" | "lg" | "xl"</code></td>
        <td><code>"md"</code></td>
        <td>Button size</td>
      </tr>
      <tr>
        <td><code>disabled</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the button is disabled</td>
      </tr>
      <tr>
        <td><code>loading</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the button is in a loading state</td>
      </tr>
      <tr>
        <td><code>icon</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Icon to display (HTML or SVG string)</td>
      </tr>
      <tr>
        <td><code>iconPosition</code></td>
        <td><code>"left" | "right"</code></td>
        <td><code>"left"</code></td>
        <td>Icon position</td>
      </tr>
      <tr>
        <td><code>fullWidth</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the button should take up the full width of its container</td>
      </tr>
      <tr>
        <td><code>href</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Link URL (renders as <code>&lt;a&gt;</code> instead of <code>&lt;button&gt;</code>)</td>
      </tr>
      <tr>
        <td><code>target</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Link target (_blank, _self, etc.)</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>ARIA label for accessibility</td>
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
        <td><code>Event</code></td>
        <td>Fired when the button is clicked (not fired when disabled or loading)</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Button component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses native <code>&lt;button&gt;</code> element when not a link</li>
    <li>Uses <code>aria-disabled="true"</code> when disabled or loading</li>
    <li>Includes focus styles that work with both mouse and keyboard navigation</li>
    <li>Loading state includes a visually hidden "Loading" text for screen readers</li>
    <li>Icons are marked with <code>aria-hidden="true"</code> to prevent screen reader announcement</li>
    <li>Supports custom <code>aria-label</code> for buttons with icons only</li>
  </ul>

  <h2>Variants</h2>
  <p>
    The Button component provides several visual variants:
  </p>
  <ul>
    <li><strong>default</strong>: Standard button with border and subtle hover effect</li>
    <li><strong>primary</strong>: High-emphasis button with brand primary color</li>
    <li><strong>secondary</strong>: Alternative emphasis button with brand secondary color</li>
    <li><strong>outline</strong>: Button with transparent background and visible border</li>
    <li><strong>ghost</strong>: Button with transparent background and no border</li>
    <li><strong>link</strong>: Button that looks like a text link</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Use the <code>primary</code> variant for the main call-to-action on a page</li>
    <li>Use the <code>secondary</code> variant for alternative actions</li>
    <li>Use the <code>outline</code> or <code>ghost</code> variants for less prominent actions</li>
    <li>Include descriptive text that clearly indicates what the button does</li>
    <li>For icon-only buttons, always provide an <code>ariaLabel</code></li>
    <li>Use the <code>loading</code> state to indicate when an action is being processed</li>
  </ul>
</Container>
