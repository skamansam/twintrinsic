<script lang="ts">
import Avatar from "$lib/components/Avatar/Avatar.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AvatarModule from "$lib/components/Avatar/Avatar.svelte"
</script>
<!--
@component
Avatar documentation page
-->

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Avatar</h1>
  
  <p>
    The Avatar component displays user profile images with intelligent fallback options.
    It provides consistent styling, accessibility features, and various display options
    including different sizes, shapes, and status indicators.
  </p>

  <h2>Usage</h2>

  <h3>Basic Avatar</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4" data-testid="avatar-basic">
    <Avatar
      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces"
      alt="Sarah Chen"
    />
  </div>

  <CodeBlock language="svelte">{`<Avatar 
  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces" 
  alt="Sarah Chen" 
/>`}</CodeBlock>

  <h3>Fallback with Initials</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4" data-testid="avatar-initials">
    <Avatar name="Marcus Webb" />
  </div>

  <CodeBlock language="svelte">{`<Avatar name="Marcus Webb" />`}</CodeBlock>

  <h3>Custom Fallback</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4" data-testid="avatar-fallback">
    <Avatar fallback="MW" bgColor="bg-primary-600" />
  </div>

  <CodeBlock language="svelte">{`<Avatar fallback="MW" bgColor="bg-primary-600" />`}</CodeBlock>

  <h3>Gravatar Email</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4" data-testid="avatar-gravatar">
    <Avatar
      gravatarEmail="skamansam@gmail.com"
      name="Skaman Sam Tyler"
      alt="Skaman Sam Tyler's Avatar"
    />
  </div>

  <CodeBlock language="svelte">{`<Avatar 
      gravatarEmail="skamansam@gmail.com"
      name="Skaman Sam Tyler"
      alt="Skaman Sam Tyler's Avatar"
/>`}</CodeBlock>

  <h3>Sizes</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4" data-testid="avatar-sizes">
    <div data-testid="avatar-size-xs"><Avatar size="xs" name="XS" /></div>
    <div data-testid="avatar-size-sm"><Avatar size="sm" name="SM" /></div>
    <div data-testid="avatar-size-md"><Avatar size="md" name="MD" /></div>
    <div data-testid="avatar-size-lg"><Avatar size="lg" name="LG" /></div>
    <div data-testid="avatar-size-xl"><Avatar size="xl" name="XL" /></div>
  </div>

  <CodeBlock language="svelte">{`<Avatar size="xs" name="XS" />
<Avatar size="sm" name="SM" />
<Avatar size="md" name="MD" />
<Avatar size="lg" name="LG" />
<Avatar size="xl" name="XL" />`}</CodeBlock>

  <h3>Shapes</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4" data-testid="avatar-shapes">
    <div data-testid="avatar-shape-circle"><Avatar shape="circle" name="Circle" /></div>
    <div data-testid="avatar-shape-square"><Avatar shape="square" name="Square" /></div>
    <div data-testid="avatar-shape-rounded"><Avatar shape="rounded" name="Rounded" /></div>
  </div>

  <CodeBlock language="svelte">{`<Avatar shape="circle" name="Circle" />
<Avatar shape="square" name="Square" />
<Avatar shape="rounded" name="Rounded" />`}</CodeBlock>

  <h3>Icon Avatar</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar icon="user" size="xs" />
    <Avatar icon="star" size="sm" />
    <Avatar icon="heart" size="md" />
    <Avatar icon="settings" size="lg" />
    <Avatar icon="bell" size="xl" />
  </div>

  <CodeBlock language="svelte">{`<Avatar icon="user" size="xs" />
<Avatar icon="star" size="sm" />
<Avatar icon="heart" size="md" />
<Avatar icon="settings" size="lg" />
<Avatar icon="bell" size="xl" />`}</CodeBlock>

  <h3>Status Indicators</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4" data-testid="avatar-status-indicators">
    <div data-testid="avatar-status-online"><Avatar name="Online" status="online" /></div>
    <div data-testid="avatar-status-offline"><Avatar name="Offline" status="offline" /></div>
    <div data-testid="avatar-status-away"><Avatar name="Away" status="away" /></div>
    <div data-testid="avatar-status-busy"><Avatar name="Busy" status="busy" /></div>
  </div>

  <CodeBlock language="svelte">{`<Avatar name="Online" status="online" />
<Avatar name="Offline" status="offline" />
<Avatar name="Away" status="away" />
<Avatar name="Busy" status="busy" />`}</CodeBlock>

  <h3>Custom Status Icons</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar name="Verified" status="online" statusIcon="circle-check" />
    <Avatar name="Error" status="busy" statusIcon="circle-x" />
    <Avatar name="Warning" status="away" statusIcon="alert-triangle" />
  </div>

  <CodeBlock language="svelte">{`<Avatar name="Verified" status="online" statusIcon="circle-check" />
<Avatar name="Error" status="busy" statusIcon="circle-x" />
<Avatar name="Warning" status="away" statusIcon="alert-triangle" />`}</CodeBlock>

  <h3>Badges</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4">
    <Avatar name="New" badge="3" />
    <Avatar name="Pro" badge="Pro" badgeVariant="success" />
    <Avatar name="Alert" badge="!" badgeVariant="error" />
  </div>

  <CodeBlock language="svelte">{`<Avatar name="New" badge="3" />
<Avatar name="Pro" badge="Pro" badgeVariant="success" />
<Avatar name="Alert" badge="!" badgeVariant="error" />`}</CodeBlock>

  <h3>Styled Avatars</h3>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md mb-4" data-testid="avatar-styled">
    <div data-testid="avatar-bordered"><Avatar name="Bordered" bordered /></div>
    <div data-testid="avatar-shadowed"><Avatar name="Shadowed" shadowed /></div>
    <div data-testid="avatar-both"><Avatar name="Both" bordered shadowed /></div>
  </div>

  <CodeBlock language="svelte">{`<Avatar name="Bordered" bordered />
<Avatar name="Shadowed" shadowed />
<Avatar name="Both" bordered shadowed />`}</CodeBlock>

  <h2>Props</h2>
<PropsTable component={AvatarModule} />

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
