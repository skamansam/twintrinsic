<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import EventsTable from "$lib/components/EventsTable/EventsTable.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import Tag from "$lib/components/Tag/Tag.svelte"
import TagGroup from "$lib/components/Tag/TagGroup.svelte"
import * as TagGroupModule from "$lib/components/Tag/TagGroup.svelte"

const techTags = ["JavaScript", "TypeScript", "Svelte", "Tailwind CSS"]
let selectedSkills = $state(["React", "Vue"])
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>TagGroup</h1>

  <p>
    The TagGroup component is a container for managing multiple Tag components.
    It provides consistent spacing, layout options, and accessibility features
    like dismissible tags with proper ARIA labels.
  </p>

  <h2>Examples</h2>

  <h3>Basic Tag Group</h3>
  <div class="not-prose mb-8" data-testid="tag-group-basic">
    <TagGroup>
      <Tag>JavaScript</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Svelte</Tag>
      <Tag>Tailwind CSS</Tag>
    </TagGroup>
  </div>

  <CodeBlock language="svelte">{`<TagGroup>
  <Tag>JavaScript</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Svelte</Tag>
  <Tag>Tailwind CSS</Tag>
</TagGroup>`}</CodeBlock>

  <h3>Dismissible Tags from Items</h3>
  <p>
    Passing <code>items</code> renders the default fallback Tag per item.
    Adding <code>dismissible</code> wires each tag's dismiss button to the
    group's <code>ondismiss</code> event, which receives
    <code>&#123; item, index &#125;</code> in the detail.
  </p>
  <div class="not-prose mb-8" data-testid="tag-group-dismissible">
    <TagGroup
      items={techTags}
      dismissible
      ondismiss={(event) => {
        const { index } = event.detail
        selectedSkills = selectedSkills.filter((_, i) => i !== index)
      }}
    >
      {#snippet itemTemplate(item: string)}
        <Tag dismissible>{item}</Tag>
      {/snippet}
    </TagGroup>
  </div>

  <CodeBlock language="svelte">{`<TagGroup
  items={['JavaScript', 'TypeScript', 'Svelte', 'Tailwind CSS']}
  dismissible
  ondismiss={(e) => handleDismiss(e.detail)}
>
  {#snippet itemTemplate(item)}
    <Tag dismissible>{item}</Tag>
  {/snippet}
</TagGroup>`}</CodeBlock>

  <h3>Custom Styling</h3>
  <div class="not-prose mb-8" data-testid="tag-group-styled">
    <TagGroup variant="primary" size="lg" pill>
      <Tag>Primary</Tag>
      <Tag>Pill</Tag>
      <Tag>Large</Tag>
    </TagGroup>
  </div>

  <CodeBlock language="svelte">{`<TagGroup variant="primary" size="lg" pill>
  <Tag>Primary</Tag>
  <Tag>Pill</Tag>
  <Tag>Large</Tag>
</TagGroup>`}</CodeBlock>

  <h2>TagGroup Props</h2>
  <PropsTable component={TagGroupModule} />

  <h2>TagGroup Events</h2>
  <EventsTable component={TagGroupModule} />

  <h2>Accessibility</h2>
  <p>
    The TagGroup component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses <code>role="group"</code> with an <code>aria-label</code> for the group container</li>
    <li>Dismissible tags expose a button with an appropriate <code>aria-label</code> ("Dismiss")</li>
    <li>Semantic Tag elements keep readable contrast and focus states</li>
  </ul>
</Container>
