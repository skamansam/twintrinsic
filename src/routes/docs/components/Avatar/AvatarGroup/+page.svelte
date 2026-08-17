<script lang="ts">
import Avatar from "$lib/components/Avatar/Avatar.svelte"
import AvatarGroup from "$lib/components/Avatar/AvatarGroup.svelte"
import * as AvatarGroupModule from "$lib/components/Avatar/AvatarGroup.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>AvatarGroup</h1>

  <p>
    The AvatarGroup component displays multiple avatars in a compact, overlapping
    stack. It supports a maximum visible count with an overflow counter, and it
    passes sizing and border styling down to its child avatars.
  </p>

  <h2>Usage</h2>

  <h3>Basic Group</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4" data-testid="avatargroup-basic">
    <AvatarGroup>
      <Avatar name="John Doe" />
      <Avatar name="Jane Smith" />
      <Avatar name="Bob Johnson" />
    </AvatarGroup>
  </div>

  <CodeBlock language="svelte">{`<AvatarGroup>
  <Avatar name="John Doe" />
  <Avatar name="Jane Smith" />
  <Avatar name="Bob Johnson" />
</AvatarGroup>`}</CodeBlock>

  <h3>With Overflow Count</h3>
  <div class="not-prose border border-border rounded-md p-4 mb-4" data-testid="avatargroup-overflow">
    <AvatarGroup max={3} total={10}>
      <Avatar name="John Doe" />
      <Avatar name="Jane Smith" />
      <Avatar name="Bob Johnson" />
    </AvatarGroup>
  </div>

  <CodeBlock language="svelte">{`<AvatarGroup max={3} total={10}>
  <Avatar name="John Doe" />
  <Avatar name="Jane Smith" />
  <Avatar name="Bob Johnson" />
</AvatarGroup>`}</CodeBlock>

  <h2>Props</h2>
  <PropsTable component={AvatarGroupModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Renders a <code>role="group"</code> container with an accessible name</li>
    <li>Each avatar keeps its own accessible name via <code>aria-label</code></li>
    <li>The overflow counter is exposed as text content for screen readers</li>
  </ul>
</Container>
