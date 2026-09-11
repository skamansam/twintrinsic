<!--
@component
AvatarGroup documentation page — standardized structure
-->
<script lang="ts">
import Avatar from "$lib/components/Avatar/Avatar.svelte"
import AvatarGroup from "$lib/components/Avatar/AvatarGroup.svelte"
import Container from "$lib/components/Container/Container.svelte"
import ExampleTabs from "$lib/components/ExampleTabs/ExampleTabs.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as AvatarGroupModule from "$lib/components/Avatar/AvatarGroup.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>{m.avatargroup_heading()}</h1>

<p>{m.avatargroup_intro_1()}</p>

<h2>{m.sec_what_when_why()}</h2>

<h3>{m.sec_what()}</h3>
<p>
  {m.avatargroup_what_1()}<code>&lt;Avatar&gt;</code>{m.avatargroup_what_2()}<code>max</code>{m.avatargroup_what_3()}
</p>

<h3>{m.sec_when()}</h3>
<p>
  {m.avatargroup_when_1()}<code>&lt;AvatarGroup&gt;</code>{m.avatargroup_when_2()}<code>&lt;Avatar&gt;</code>{m.avatargroup_when_3()}
</p>

<h3>{m.sec_why()}</h3>
<ul>
  <li><strong>{m.avatargroup_why_space()}</strong>{m.avatargroup_why_space_desc()}</li>
  <li><strong>{m.avatargroup_why_overflow()}</strong>{m.avatargroup_why_overflow_desc_1()}<code>max</code>{m.avatargroup_why_overflow_desc_2()}</li>
  <li><strong>{m.avatargroup_why_group()}</strong>{m.avatargroup_why_group_desc_1()}<code>role="group"</code>{m.avatargroup_why_group_desc_2()}</li>
</ul>

<h3>{m.sec_sources()}</h3>
<ul>
  <li><a href="https://m3.material.io/components/avatars/overview">Material Design 3 — Avatars</a></li>
  <li><a href="https://primer.style/components/avatar">Primer — Avatar</a></li>
</ul>

<h2>{m.sec_responsiveness()}</h2>
<ul>
  <li>{m.avatargroup_responsive_1()}</li>
  <li>{m.avatargroup_responsive_2()}</li>
</ul>

<h2>{m.sec_customization()}</h2>
<ul>
  <li><code>max</code>{m.avatargroup_custom_1_1()}</li>
  <li><code>total</code>{m.avatargroup_custom_2_1()}</li>
  <li>{m.avatargroup_custom_3()}</li>
</ul>

<h2>{m.sec_examples()}</h2>

<h3>{m.avatargroup_ex_basic()}</h3>
<ExampleTabs code={`<AvatarGroup>
  <Avatar name="Sarah Chen" />
  <Avatar name="Priya Patel" />
  <Avatar name="Emma Lindqvist" />
</AvatarGroup>`}>
  <div class="not-prose border border-border rounded-md p-4" data-testid="avatargroup-basic">
    <AvatarGroup>
      <Avatar name="Sarah Chen" />
      <Avatar name="Priya Patel" />
      <Avatar name="Emma Lindqvist" />
    </AvatarGroup>
  </div>
</ExampleTabs>

<h3>{m.avatargroup_ex_overflow()}</h3>
<ExampleTabs code={`<AvatarGroup max={3} total={10}>
  <Avatar name="Sarah Chen" />
  <Avatar name="Priya Patel" />
  <Avatar name="Emma Lindqvist" />
</AvatarGroup>`}>
  <div class="not-prose border border-border rounded-md p-4" data-testid="avatargroup-overflow">
    <AvatarGroup max={3} total={10}>
      <Avatar name="Sarah Chen" />
      <Avatar name="Priya Patel" />
      <Avatar name="Emma Lindqvist" />
    </AvatarGroup>
  </div>
</ExampleTabs>

<h2>{m.sec_props()}</h2>
<PropsTable component={AvatarGroupModule} />

<h2>{m.sec_accessibility()}</h2>
<ul>
  <li>{m.avatargroup_a11y_1_0()}<code>role="group"</code>{m.avatargroup_a11y_1_1()}</li>
  <li>{m.avatargroup_a11y_2_1()}<code>aria-label</code>{m.avatargroup_a11y_2_2()}</li>
  <li>{m.avatargroup_a11y_3()}</li>
</ul>
</Container>
