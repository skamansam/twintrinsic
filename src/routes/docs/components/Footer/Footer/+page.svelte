<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Footer from "$lib/components/Footer/Footer.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as FooterModule from "$lib/components/Footer/Footer.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Footer</h1>

  <p>
    The Footer component provides a flexible footer with left, center, and right
    regions. Each region accepts a snippet, so you can drop in plain text, links,
    or arbitrary markup.
  </p>

  <h2>Usage</h2>

  <h3>Basic Footer</h3>
  <div class="not-prose" data-testid="footer-basic">
    <Footer>
      {#snippet left()}<p>© 2026 Twintrinsic</p>{/snippet}
      {#snippet center()}<p>Privacy Policy · Terms</p>{/snippet}
      {#snippet right()}<p>Contact Us</p>{/snippet}
    </Footer>
  </div>

  <CodeBlock language="svelte">{`<Footer>
  {#snippet left()}<p>© 2026 Twintrinsic</p>{/snippet}
  {#snippet center()}<p>Privacy Policy · Terms</p>{/snippet}
  {#snippet right()}<p>Contact Us</p>{/snippet}
</Footer>`}</CodeBlock>

  <h3>Center-Only Footer</h3>
  <div class="not-prose" data-testid="footer-center-only">
    <Footer>
      {#snippet center()}<p>Copyright © 2026 Twintrinsic</p>{/snippet}
    </Footer>
  </div>

  <CodeBlock language="svelte">{`<Footer>
  {#snippet center()}<p>Copyright © 2026 Twintrinsic</p>{/snippet}
</Footer>`}</CodeBlock>

  <h2>Props</h2>
  <PropsTable component={FooterModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses the native <code>&lt;footer&gt;</code> element for correct landmark semantics</li>
    <li>Stacks into a single centered column on small screens for readability</li>
    <li>Regions are optional, so empty areas render no stray content</li>
  </ul>
</Container>
