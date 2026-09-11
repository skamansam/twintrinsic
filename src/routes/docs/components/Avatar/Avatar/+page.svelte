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
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.avatar_heading()}</h1>

<p>{m.avatar_intro_1()}</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>{m.avatar_what_1()}</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.avatar_when_1()}<code>&lt;Avatar&gt;</code>{m.avatar_when_2()}<code>&lt;AvatarGroup&gt;</code>{m.avatar_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.avatar_why_sizing()}</strong>{m.avatar_why_sizing_desc()}</li>
  <li><strong>{m.avatar_why_fallback()}</strong>{m.avatar_why_fallback_desc()}</li>
  <li><strong>{m.avatar_why_gravatar()}</strong>{m.avatar_why_gravatar_desc()}</li>
  <li><strong>{m.avatar_why_status()}</strong>{m.avatar_why_status_desc()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://m3.material.io/components/avatars/overview">Material Design 3 — Avatars</a></li>
  <li><a href="https://primer.style/components/avatar">Primer — Avatar</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img">MDN — img element</a></li>
</ul>

<h2>{m.sec_implementation()}</h2>
<ul>
  <li><code>&lt;img&gt;</code>{m.avatar_impl_1()}<code>alt</code>{m.avatar_impl_1b()}</li>
  <li><code>aspect-ratio: 1</code>{m.avatar_impl_2()}</li>
  <li>{m.avatar_impl_3()}</li>
  <li>{m.avatar_impl_4()}</li>
  <li><code>&lt;picture&gt;</code>{m.avatar_impl_5()}<code>&lt;source&gt;</code>{m.avatar_impl_5b()}</li>
</ul>

<h2>{m.sec_mistakes()}</h2>
<ul>
  <li>{m.avatar_mistake_1_1()}<code>alt</code>{m.avatar_mistake_1_2()}<code>alt=""</code>{m.avatar_mistake_1_3()}</li>
  <li>{m.avatar_mistake_2_1()}<code>&lt;div&gt;</code>{m.avatar_mistake_2_2()}<code>&lt;img&gt;</code>{m.avatar_mistake_2_3()}</li>
</ul>

<h2>{m.sec_related()}</h2>
<p>Badge, Icon, Image</p>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.avatar_responsive_1_1()}<code>size</code>{m.avatar_responsive_1_2()}</li>
  <li>{m.avatar_responsive_2_1()}<code>&lt;AvatarGroup&gt;</code>{m.avatar_responsive_2_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li>{m.avatar_custom_1_1()}<code>circle</code>{m.avatar_custom_1_2()}<code>square</code>{m.avatar_custom_1_3()}<code>rounded</code>{m.avatar_custom_1_4()}</li>
  <li>{m.avatar_custom_2_1()}<code>online</code>{m.avatar_custom_2_2()}<code>offline</code>{m.avatar_custom_2_3()}<code>away</code>{m.avatar_custom_2_4()}<code>busy</code>{m.avatar_custom_2_5()}</li>
  <li>{m.avatar_custom_3()}</li>
  <li>{m.avatar_custom_4()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.avatar_ex_basic()}</h3>
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

<h3>{m.avatar_ex_initials()}</h3>
<ExampleTabs code={`<Avatar name="Marcus Webb" />`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="avatar-initials">
    <Avatar name="Marcus Webb" />
  </div>
</ExampleTabs>

<h3>{m.avatar_ex_fallback()}</h3>
<ExampleTabs code={`<Avatar fallback="MW" bgColor="bg-primary-600" />`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="avatar-fallback">
    <Avatar fallback="MW" bgColor="bg-primary-600" />
  </div>
</ExampleTabs>

<h3>{m.avatar_ex_gravatar()}</h3>
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

<h3>{m.avatar_ex_sizes()}</h3>
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

<h3>{m.avatar_ex_shapes()}</h3>
<ExampleTabs code={`<Avatar shape="circle" name="Circle" />
<Avatar shape="square" name="Square" />
<Avatar shape="rounded" name="Rounded" />`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="avatar-shapes">
    <div data-testid="avatar-shape-circle"><Avatar shape="circle" name="Circle" /></div>
    <div data-testid="avatar-shape-square"><Avatar shape="square" name="Square" /></div>
    <div data-testid="avatar-shape-rounded"><Avatar shape="rounded" name="Rounded" /></div>
  </div>
</ExampleTabs>

<h3>{m.avatar_ex_status()}</h3>
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

<h3>{m.avatar_ex_badges()}</h3>
<ExampleTabs code={`<Avatar name="New" badge="3" />
<Avatar name="Pro" badge="Pro" badgeVariant="success" />
<Avatar name="Alert" badge="!" badgeVariant="error" />`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md">
    <Avatar name="New" badge="3" />
    <Avatar name="Pro" badge="Pro" badgeVariant="success" />
    <Avatar name="Alert" badge="!" badgeVariant="error" />
  </div>
</ExampleTabs>

<h3>{m.avatar_ex_styled()}</h3>
<ExampleTabs code={`<Avatar name="Bordered" bordered />
<Avatar name="Shadowed" shadowed />
<Avatar name="Both" bordered shadowed />`}>
  <div class="flex items-center gap-4 p-4 bg-surface rounded-md" data-testid="avatar-styled">
    <div data-testid="avatar-bordered"><Avatar name="Bordered" bordered /></div>
    <div data-testid="avatar-shadowed"><Avatar name="Shadowed" shadowed /></div>
    <div data-testid="avatar-both"><Avatar name="Both" bordered shadowed /></div>
  </div>
</ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={AvatarModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.avatar_a11y_1_1()}<code>alt</code>{m.avatar_a11y_1_2()}</li>
  <li>{m.avatar_a11y_2_1()}<code>aria-label</code>{m.avatar_a11y_2_2()}</li>
  <li>{m.avatar_a11y_3()}</li>
  <li>{m.avatar_a11y_4()}</li>
</ul>

<h2>{m.avatar_fallback_heading()}</h2>
<p>{m.avatar_fallback_intro()}</p>
<ol>
  <li><code>src</code>{m.avatar_fallback_1()}</li>
  <li><code>gravatarEmail</code>{m.avatar_fallback_2()}</li>
  <li><code>fallback</code>{m.avatar_fallback_3()}</li>
  <li><code>name</code>{m.avatar_fallback_4()}</li>
  <li>{m.avatar_fallback_5()}</li>
</ol>
</Container>
