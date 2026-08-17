<script lang="ts">
import Button from "$lib/components/Button/Button.svelte"
import ButtonGroup from "$lib/components/Button/ButtonGroup.svelte"
import * as ButtonGroupModule from "$lib/components/Button/ButtonGroup.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>ButtonGroup</h1>

  <p>
    The ButtonGroup component groups related Button components together with
    consistent spacing, connected corners, and shared styling. Variant and size
    can be set once on the group and are inherited by every child button.
  </p>

  <h2>Examples</h2>

  <h3>Basic Button Group</h3>
  <div class="not-prose mb-8" data-testid="button-group-basic">
    <ButtonGroup ariaLabel="Text alignment">
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
  </div>

  <CodeBlock language="svelte">{`<ButtonGroup ariaLabel="Text alignment">
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>`}</CodeBlock>

  <h3>Shared Variant and Size</h3>
  <div class="not-prose mb-8" data-testid="button-group-variant">
    <ButtonGroup ariaLabel="Pagination" variant="outline" size="sm">
      <Button>Previous</Button>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>Next</Button>
    </ButtonGroup>
  </div>

  <CodeBlock language="svelte">{`<ButtonGroup ariaLabel="Pagination" variant="outline" size="sm">
  <Button>Previous</Button>
  <Button>1</Button>
  <Button>2</Button>
  <Button>3</Button>
  <Button>Next</Button>
</ButtonGroup>`}</CodeBlock>

  <h3>Vertical Button Group</h3>
  <div class="not-prose mb-8" data-testid="button-group-vertical">
    <ButtonGroup ariaLabel="File actions" vertical>
      <Button>Copy</Button>
      <Button>Move</Button>
      <Button>Delete</Button>
    </ButtonGroup>
  </div>

  <CodeBlock language="svelte">{`<ButtonGroup ariaLabel="File actions" vertical>
  <Button>Copy</Button>
  <Button>Move</Button>
  <Button>Delete</Button>
</ButtonGroup>`}</CodeBlock>

  <h3>Full Width</h3>
  <div class="not-prose mb-8" data-testid="button-group-fullwidth">
    <ButtonGroup ariaLabel="Sign in options" fullWidth>
      <Button variant="primary">Sign in</Button>
      <Button variant="outline">Create account</Button>
    </ButtonGroup>
  </div>

  <CodeBlock language="svelte">{`<ButtonGroup ariaLabel="Sign in options" fullWidth>
  <Button variant="primary">Sign in</Button>
  <Button variant="outline">Create account</Button>
</ButtonGroup>`}</CodeBlock>

  <h2>ButtonGroup Props</h2>
  <PropsTable component={ButtonGroupModule} />

  <h2>ButtonGroup Events</h2>
  <EventsTable component={ButtonGroupModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="group"</code> with an <code>aria-label</code> describing the group</li>
    <li>Child buttons remain individually focusable and keyboard operable</li>
    <li>Connected corners preserve a clean visual group without hiding focus</li>
  </ul>
</Container>
