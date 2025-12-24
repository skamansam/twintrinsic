<!--
@component
Avatar documentation page
-->

<style>
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Avatar from "$lib/components/Avatar/Avatar.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Avatar</h1>
  
  <p>
    The Avatar component displays user profile images with intelligent fallback options.
    It provides consistent styling, accessibility features, and various display options
    including different sizes, shapes, and status indicators.
  </p>

  <h2>Usage</h2>

  <h3>Basic Avatar</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar 
      src="https://i.pravatar.cc/300?img=1" 
      alt="User Avatar" 
    />
  </div>

  <pre class="language-svelte"><code>{`<Avatar 
  src="https://i.pravatar.cc/300?img=1" 
  alt="User Avatar" 
/>`}</code></pre>

  <h3>Fallback with Initials</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar name="John Doe" />
  </div>

  <pre class="language-svelte"><code>{`<Avatar name="John Doe" />`}</code></pre>

  <h3>Custom Fallback</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar fallback="JD" bgColor="bg-primary-600" />
  </div>

  <pre class="language-svelte"><code>{`<Avatar fallback="JD" bgColor="bg-primary-600" />`}</code></pre>

  <h3>Sizes</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar size="xs" name="XS" />
    <Avatar size="sm" name="SM" />
    <Avatar size="md" name="MD" />
    <Avatar size="lg" name="LG" />
    <Avatar size="xl" name="XL" />
  </div>

  <pre class="language-svelte"><code>{`<Avatar size="xs" name="XS" />
<Avatar size="sm" name="SM" />
<Avatar size="md" name="MD" />
<Avatar size="lg" name="LG" />
<Avatar size="xl" name="XL" />`}</code></pre>

  <h3>Shapes</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar shape="circle" name="Circle" />
    <Avatar shape="square" name="Square" />
    <Avatar shape="rounded" name="Rounded" />
  </div>

  <pre class="language-svelte"><code>{`<Avatar shape="circle" name="Circle" />
<Avatar shape="square" name="Square" />
<Avatar shape="rounded" name="Rounded" />`}</code></pre>

  <h3>Status Indicators</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar name="Online" status="online" />
    <Avatar name="Offline" status="offline" />
    <Avatar name="Away" status="away" />
    <Avatar name="Busy" status="busy" />
  </div>

  <pre class="language-svelte"><code>{`<Avatar name="Online" status="online" />
<Avatar name="Offline" status="offline" />
<Avatar name="Away" status="away" />
<Avatar name="Busy" status="busy" />`}</code></pre>

  <h3>Styled Avatars</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar name="Bordered" bordered />
    <Avatar name="Shadowed" shadowed />
    <Avatar name="Both" bordered shadowed />
  </div>

  <pre class="language-svelte"><code>{`<Avatar name="Bordered" bordered />
<Avatar name="Shadowed" shadowed />
<Avatar name="Both" bordered shadowed />`}</code></pre>

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
        <td><code>src</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Image source URL</td>
      </tr>
      <tr>
        <td><code>alt</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Alt text for the image</td>
      </tr>
      <tr>
        <td><code>name</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>User name for generating initials</td>
      </tr>
      <tr>
        <td><code>fallback</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Fallback text when image fails to load or no src provided</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>"xs" | "sm" | "md" | "lg" | "xl"</code></td>
        <td><code>"md"</code></td>
        <td>Size of the avatar</td>
      </tr>
      <tr>
        <td><code>shape</code></td>
        <td><code>"circle" | "square" | "rounded"</code></td>
        <td><code>"circle"</code></td>
        <td>Shape of the avatar</td>
      </tr>
      <tr>
        <td><code>status</code></td>
        <td><code>"online" | "offline" | "away" | "busy"</code></td>
        <td><code>undefined</code></td>
        <td>Status indicator</td>
      </tr>
      <tr>
        <td><code>bgColor</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Background color for text avatars (CSS color value or Tailwind class)</td>
      </tr>
      <tr>
        <td><code>bordered</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show a border</td>
      </tr>
      <tr>
        <td><code>shadowed</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to add a shadow effect</td>
      </tr>
      <tr>
        <td><code>initialsGenerator</code></td>
        <td><code>Function</code></td>
        <td><code>undefined</code></td>
        <td>Custom function to generate initials</td>
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

  <h2>Accessibility</h2>
  <p>
    The Avatar component follows accessibility best practices:
  </p>
  <ul>
    <li>Includes proper <code>aria-label</code> for screen readers</li>
    <li>Status indicators have descriptive <code>aria-label</code> attributes</li>
    <li>Images have appropriate alt text</li>
    <li>Color contrast meets WCAG standards</li>
  </ul>

  <h2>Fallback Behavior</h2>
  <p>
    The Avatar component has intelligent fallback behavior:
  </p>
  <ol>
    <li>If an image URL is provided and loads successfully, the image is displayed</li>
    <li>If the image fails to load or no URL is provided, but a fallback is specified, the fallback text is shown</li>
    <li>If a name is provided but no fallback, initials are automatically generated from the name</li>
    <li>If no image, fallback, or name is provided, a generic user icon is displayed</li>
  </ol>
</Container>
