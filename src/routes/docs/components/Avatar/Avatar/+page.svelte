<!--
@component
Avatar documentation page — standardized structure
-->
<script lang="ts">
import Avatar from "$lib/components/Avatar/Avatar.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AvatarModule from "$lib/components/Avatar/Avatar.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>Avatar</h1>

<p>
  Displays a user's profile image with intelligent fallback options — initials,
  Gravatar, or a generic icon. Supports sizes, shapes, status indicators, and
  notification badges.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  An image component that shows a user's profile picture, with automatic fallback
  to initials, Gravatar, or a placeholder icon when no image is available.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;Avatar&gt;</code> anywhere you need to represent a person or
  entity visually — user lists, comments, team pages, chat messages, navigation
  bars. For groups of avatars, use <code>&lt;AvatarGroup&gt;</code>.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Consistent sizing</strong> — predefined sizes (xs, sm, md, lg, xl) keep avatars uniform.</li>
  <li><strong>Graceful fallback</strong> — if the image fails to load, shows initials or a generic icon.</li>
  <li><strong>Gravatar integration</strong> — generates a Gravatar URL from an email address.</li>
  <li><strong>Status indicators</strong> — online/offline/away/busy dots with semantic colors.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://m3.material.io/components/avatars/overview">Material Design 3 — Avatars</a></li>
  <li><a href="https://primer.style/components/avatar">Primer — Avatar</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img">MDN — img element</a></li>
</ul>


<h2>Twintrinsic Implementation</h2>
<ul>
    <li>`&lt;img&gt;` with `alt` text for user avatars</li>
    <li>`aspect-ratio: 1` for consistent circular sizing</li>
    <li>Fallback to initials when no image is provided</li>
    <li>AvatarGroup with overlap using negative margin</li>
    <li>`&lt;picture&gt;` with `&lt;source&gt;` for AVIF/WebP responsive images</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
    <li>Don't forget `alt` text — even if decorative, use `alt=&quot;&quot;` (empty alt)</li>
    <li>Don't use `&lt;div&gt;` for the image — always `&lt;img&gt;` for semantics</li>
</ul>

<h2>Related Components</h2>
<p>Badge, Icon, Image</p>

<h2>Responsiveness</h2>
<ul>
  <li>Avatars are fixed-size by default; use <code>size</code> prop to control.</li>
  <li>In <code>&lt;AvatarGroup&gt;</code>, avatars overlap and adapt to container width.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li>Shapes: <code>circle</code>, <code>square</code>, <code>rounded</code>.</li>
  <li>Status indicators: <code>online</code>, <code>offline</code>, <code>away</code>, <code>busy</code>.</li>
  <li>Badge overlay for notification counts.</li>
  <li>Bordered and shadowed variants.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Image</h3>
<ExampleTabs code={`<Avatar
  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300"
  alt="Sarah Chen"
/>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="avatar-basic">
    <Avatar
      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces"
      alt="Sarah Chen"
    />
  </div>
</ExampleTabs>

<h3>Fallback with Initials</h3>
<ExampleTabs code={`<Avatar name="Marcus Webb" />`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="avatar-initials">
    <Avatar name="Marcus Webb" />
  </div>
</ExampleTabs>

<h3>Custom Fallback</h3>
<ExampleTabs code={`<Avatar fallback="MW" bgColor="bg-primary-600" />`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="avatar-fallback">
    <Avatar fallback="MW" bgColor="bg-primary-600" />
  </div>
</ExampleTabs>

<h3>Gravatar Email</h3>
<ExampleTabs code={`<Avatar
  gravatarEmail="skamansam@gmail.com"
  name="Skaman Sam Tyler"
  alt="Skaman Sam Tyler's Avatar"
/>`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="avatar-gravatar">
    <Avatar
      gravatarEmail="skamansam@gmail.com"
      name="Skaman Sam Tyler"
      alt="Skaman Sam Tyler's Avatar"
    />
  </div>
</ExampleTabs>

<h3>Sizes</h3>
<ExampleTabs code={`<Avatar size="xs" name="XS" />
<Avatar size="sm" name="SM" />
<Avatar size="md" name="MD" />
<Avatar size="lg" name="LG" />
<Avatar size="xl" name="XL" />`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="avatar-sizes">
    <div data-testid="avatar-size-xs"><Avatar size="xs" name="XS" /></div>
    <div data-testid="avatar-size-sm"><Avatar size="sm" name="SM" /></div>
    <div data-testid="avatar-size-md"><Avatar size="md" name="MD" /></div>
    <div data-testid="avatar-size-lg"><Avatar size="lg" name="LG" /></div>
    <div data-testid="avatar-size-xl"><Avatar size="xl" name="XL" /></div>
  </div>
</ExampleTabs>

<h3>Shapes</h3>
<ExampleTabs code={`<Avatar shape="circle" name="Circle" />
<Avatar shape="square" name="Square" />
<Avatar shape="rounded" name="Rounded" />`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="avatar-shapes">
    <div data-testid="avatar-shape-circle"><Avatar shape="circle" name="Circle" /></div>
    <div data-testid="avatar-shape-square"><Avatar shape="square" name="Square" /></div>
    <div data-testid="avatar-shape-rounded"><Avatar shape="rounded" name="Rounded" /></div>
  </div>
</ExampleTabs>

<h3>Status Indicators</h3>
<ExampleTabs code={`<Avatar name="Online" status="online" />
<Avatar name="Offline" status="offline" />
<Avatar name="Away" status="away" />
<Avatar name="Busy" status="busy" />`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="avatar-status-indicators">
    <div data-testid="avatar-status-online"><Avatar name="Online" status="online" /></div>
    <div data-testid="avatar-status-offline"><Avatar name="Offline" status="offline" /></div>
    <div data-testid="avatar-status-away"><Avatar name="Away" status="away" /></div>
    <div data-testid="avatar-status-busy"><Avatar name="Busy" status="busy" /></div>
  </div>
</ExampleTabs>

<h3>Badges</h3>
<ExampleTabs code={`<Avatar name="New" badge="3" />
<Avatar name="Pro" badge="Pro" badgeVariant="success" />
<Avatar name="Alert" badge="!" badgeVariant="error" />`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md">
    <Avatar name="New" badge="3" />
    <Avatar name="Pro" badge="Pro" badgeVariant="success" />
    <Avatar name="Alert" badge="!" badgeVariant="error" />
  </div>
</ExampleTabs>

<h3>Styled Avatars</h3>
<ExampleTabs code={`<Avatar name="Bordered" bordered />
<Avatar name="Shadowed" shadowed />
<Avatar name="Both" bordered shadowed />`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="avatar-styled">
    <div data-testid="avatar-bordered"><Avatar name="Bordered" bordered /></div>
    <div data-testid="avatar-shadowed"><Avatar name="Shadowed" shadowed /></div>
    <div data-testid="avatar-both"><Avatar name="Both" bordered shadowed /></div>
  </div>
</ExampleTabs>

<h2>Props</h2>
<PropsTable component={AvatarModule} />

<h2>Accessibility</h2>
<ul>
  <li>Images have proper <code>alt</code> text.</li>
  <li>Status indicators include <code>aria-label</code> for screen readers.</li>
  <li>Fallback text is exposed to assistive technology.</li>
  <li>Color contrast meets WCAG AA standards.</li>
</ul>

<h2>Fallback Behavior</h2>
<p>The Avatar has a priority chain:</p>
<ol>
  <li><code>src</code> — displays the image if it loads successfully.</li>
  <li><code>gravatarEmail</code> — generates a Gravatar URL (SHA-256 + identicon fallback).</li>
  <li><code>fallback</code> — displays the provided fallback text.</li>
  <li><code>name</code> — auto-generates initials from the name.</li>
  <li>Generic user icon — if nothing else is available.</li>
</ol>
</Container>
