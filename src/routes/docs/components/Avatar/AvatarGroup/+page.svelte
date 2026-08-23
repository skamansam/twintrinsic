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
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
<h1>AvatarGroup</h1>

<p>
  Displays multiple avatars in a compact, overlapping stack. Supports a maximum
  visible count with an overflow counter.
</p>

<h2>What, When &amp; Why</h2>

<h3>What is it?</h3>
<p>
  A layout container that renders child <code>&lt;Avatar&gt;</code> components in
  a horizontal stack with negative margins for overlap. When the number of
  children exceeds <code>max</code>, an overflow counter is shown.
</p>

<h3>When should I use it?</h3>
<p>
  Use <code>&lt;AvatarGroup&gt;</code> to show a list of users who are assigned
  to or participating in something — task assignees, comment authors, team
  members. For a single avatar, use <code>&lt;Avatar&gt;</code> directly.
</p>

<h3>Why does it exist?</h3>
<ul>
  <li><strong>Space efficiency</strong> — overlapping avatars take less horizontal space.</li>
  <li><strong>Overflow handling</strong> — the <code>max</code> prop truncates with a "+N" counter.</li>
  <li><strong>Semantic grouping</strong> — renders <code>role="group"</code> with an accessible name.</li>
</ul>

<h3>Sources</h3>
<ul>
  <li><a href="https://m3.material.io/components/avatars/overview">Material Design 3 — Avatars</a></li>
  <li><a href="https://primer.style/components/avatar">Primer — Avatar</a></li>
</ul>

<h2>Responsiveness</h2>
<ul>
  <li>Avatars overlap; the group width grows with the number of visible avatars.</li>
  <li>On narrow containers, the overflow counter handles remaining items.</li>
</ul>

<h2>Customization</h2>
<ul>
  <li><code>max</code> — maximum visible avatars before the overflow counter appears.</li>
  <li><code>total</code> — total count (used in the overflow counter text).</li>
  <li>Child avatars inherit sizing and border styling from the group.</li>
</ul>

<h2>Examples</h2>

<h3>Basic Group</h3>
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

<h3>With Overflow Count</h3>
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

<h2>Props</h2>
<PropsTable component={AvatarGroupModule} />

<h2>Accessibility</h2>
<ul>
  <li>Renders a <code>role="group"</code> container with an accessible name.</li>
  <li>Each avatar retains its own <code>aria-label</code>.</li>
  <li>The overflow counter text is exposed to screen readers.</li>
</ul>
</Container>
