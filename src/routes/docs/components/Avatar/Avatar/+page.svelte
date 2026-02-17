<!--
@component
Avatar documentation page
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Avatar from "$lib/components/Avatar/Avatar.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
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

  <CodeBlock language="svelte">{`<Avatar 
  src="https://i.pravatar.cc/300?img=1" 
  alt="User Avatar" 
/>`}</CodeBlock>

  <h3>Fallback with Initials</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar name="John Doe" />
  </div>

  <CodeBlock language="svelte">{`<Avatar name="John Doe" />`}</CodeBlock>

  <h3>Custom Fallback</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar fallback="JD" bgColor="bg-primary-600" />
  </div>

  <CodeBlock language="svelte">{`<Avatar fallback="JD" bgColor="bg-primary-600" />`}</CodeBlock>

  <h3>Gravatar Email</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar 
      gravatarEmail="user@example.com"
      name="John Doe"
      alt="John's Avatar"
    />
  </div>

  <CodeBlock language="svelte">{`<Avatar 
  gravatarEmail="user@example.com"
  name="John Doe"
  alt="John's Avatar"
/>`}</CodeBlock>

  <h3>Sizes</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar size="xs" name="XS" />
    <Avatar size="sm" name="SM" />
    <Avatar size="md" name="MD" />
    <Avatar size="lg" name="LG" />
    <Avatar size="xl" name="XL" />
  </div>

  <CodeBlock language="svelte">{`<Avatar size="xs" name="XS" />
<Avatar size="sm" name="SM" />
<Avatar size="md" name="MD" />
<Avatar size="lg" name="LG" />
<Avatar size="xl" name="XL" />`}</CodeBlock>

  <h3>Shapes</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar shape="circle" name="Circle" />
    <Avatar shape="square" name="Square" />
    <Avatar shape="rounded" name="Rounded" />
  </div>

  <CodeBlock language="svelte">{`<Avatar shape="circle" name="Circle" />
<Avatar shape="square" name="Square" />
<Avatar shape="rounded" name="Rounded" />`}</CodeBlock>

  <h3>Status Indicators</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar name="Online" status="online" />
    <Avatar name="Offline" status="offline" />
    <Avatar name="Away" status="away" />
    <Avatar name="Busy" status="busy" />
  </div>

  <CodeBlock language="svelte">{`<Avatar name="Online" status="online" />
<Avatar name="Offline" status="offline" />
<Avatar name="Away" status="away" />
<Avatar name="Busy" status="busy" />`}</CodeBlock>

  <h3>Styled Avatars</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar name="Bordered" bordered />
    <Avatar name="Shadowed" shadowed />
    <Avatar name="Both" bordered shadowed />
  </div>

  <CodeBlock language="svelte">{`<Avatar name="Bordered" bordered />
<Avatar name="Shadowed" shadowed />
<Avatar name="Both" bordered shadowed />`}</CodeBlock>

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
        <td><code>gravatarEmail</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Gravatar email address to generate avatar URL from. Uses SHA-256 hashing with identicon fallback</td>
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

  <h2>Gravatar Integration</h2>
  <p>
    The Avatar component supports Gravatar integration through the <code>gravatarEmail</code> prop.
    When provided, it automatically generates a Gravatar URL using SHA-256 hashing with an identicon fallback.
    The explicit <code>src</code> prop takes priority over the gravatar email if both are provided.
  </p>

  <h2>Fallback Behavior</h2>
  <p>
    The Avatar component has intelligent fallback behavior:
  </p>
  <ol>
    <li>If an explicit image URL is provided via <code>src</code> and loads successfully, the image is displayed</li>
    <li>If no explicit <code>src</code> but a <code>gravatarEmail</code> is provided, the Gravatar URL is used</li>
    <li>If the image fails to load or no URL is provided, but a fallback is specified, the fallback text is shown</li>
    <li>If a name is provided but no fallback, initials are automatically generated from the name</li>
    <li>If no image, gravatar email, fallback, or name is provided, a generic user icon is displayed</li>
  </ol>
</Container>
