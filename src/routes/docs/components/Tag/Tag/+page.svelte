<!--
@component
Tag documentation page
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Tag from "$lib/components/Tag/Tag.svelte"
import TagGroup from "$lib/components/Tag/TagGroup.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Tag</h1>
  
  <p>
    The Tag component is used for displaying labels, categories, or status indicators.
    It provides consistent styling, accessibility features, and various display options.
  </p>

  <h2>Examples</h2>

  <h3>Basic Tags</h3>
  <div class="not-prose mb-8 flex flex-wrap gap-2">
    <Tag>Default</Tag>
    <Tag variant="primary">Primary</Tag>
    <Tag variant="secondary">Secondary</Tag>
    <Tag variant="success">Success</Tag>
    <Tag variant="warning">Warning</Tag>
    <Tag variant="error">Error</Tag>
    <Tag variant="info">Info</Tag>
  </div>

  <pre class="language-svelte"><code>{`<Tag>Default</Tag>
<Tag variant="primary">Primary</Tag>
<Tag variant="secondary">Secondary</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="error">Error</Tag>
<Tag variant="info">Info</Tag>`}</code></pre>

  <h3>Sizes</h3>
  <div class="not-prose mb-8 flex flex-wrap items-center gap-2">
    <Tag size="sm">Small</Tag>
    <Tag size="md">Medium</Tag>
    <Tag size="lg">Large</Tag>
  </div>

  <pre class="language-svelte"><code>{`<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>`}</code></pre>

  <h3>Outline Tags</h3>
  <div class="not-prose mb-8 flex flex-wrap gap-2">
    <Tag outline>Default</Tag>
    <Tag variant="primary" outline>Primary</Tag>
    <Tag variant="success" outline>Success</Tag>
    <Tag variant="warning" outline>Warning</Tag>
  </div>

  <pre class="language-svelte"><code>{`<Tag outline>Default</Tag>
<Tag variant="primary" outline>Primary</Tag>
<Tag variant="success" outline>Success</Tag>
<Tag variant="warning" outline>Warning</Tag>`}</code></pre>

  <h3>Pill Tags</h3>
  <div class="not-prose mb-8 flex flex-wrap gap-2">
    <Tag pill>Default</Tag>
    <Tag variant="primary" pill>Primary</Tag>
    <Tag variant="success" pill>Success</Tag>
    <Tag variant="warning" pill>Warning</Tag>
  </div>

  <pre class="language-svelte"><code>{`<Tag pill>Default</Tag>
<Tag variant="primary" pill>Primary</Tag>
<Tag variant="success" pill>Success</Tag>
<Tag variant="warning" pill>Warning</Tag>`}</code></pre>

  <h3>With Icons</h3>
  <div class="not-prose mb-8 flex flex-wrap gap-2">
    <Tag variant="success" icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'>
      Completed
    </Tag>
    <Tag variant="warning" icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>'>
      Warning
    </Tag>
  </div>

  <pre class="language-svelte"><code>{`<Tag 
  variant="success" 
  icon='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
  </svg>'
>
  Completed
</Tag>`}</code></pre>

  <h3>Dismissible Tags</h3>
  <div class="not-prose mb-8 flex flex-wrap gap-2">
    <Tag dismissible>Dismissible</Tag>
    <Tag variant="primary" dismissible>Primary</Tag>
  </div>

  <pre class="language-svelte"><code>{`<Tag dismissible ondismiss={() => handleDismiss()}>Dismissible</Tag>
<Tag variant="primary" dismissible ondismiss={() => handleDismiss()}>Primary</Tag>`}</code></pre>

  <h3>Clickable Tags</h3>
  <div class="not-prose mb-8 flex flex-wrap gap-2">
    <Tag clickable>Clickable</Tag>
    <Tag variant="primary" clickable>Primary</Tag>
    <Tag href="https://example.com" target="_blank">Link</Tag>
  </div>

  <pre class="language-svelte"><code>{`<Tag clickable onclick={handleClick}>Clickable</Tag>
<Tag variant="primary" clickable onclick={handleClick}>Primary</Tag>
<Tag href="https://example.com" target="_blank">Link</Tag>`}</code></pre>

  <h3>Tag Group</h3>
  <div class="not-prose mb-8">
    <TagGroup>
      <Tag>JavaScript</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Svelte</Tag>
      <Tag>React</Tag>
    </TagGroup>
  </div>

  <pre class="language-svelte"><code>{`<TagGroup>
  <Tag>JavaScript</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Svelte</Tag>
  <Tag>React</Tag>
</TagGroup>`}</code></pre>

  <h3>Tag Group with Dynamic Items</h3>
  <div class="not-prose mb-8">
    <TagGroup 
      items={['JavaScript', 'TypeScript', 'Svelte', 'React']} 
      variant="primary"
      dismissible
      let:item
    >
      <Tag>{item}</Tag>
    </TagGroup>
  </div>

  <pre class="language-svelte"><code>{`<TagGroup 
  items={['JavaScript', 'TypeScript', 'Svelte', 'React']} 
  variant="primary"
  dismissible
  let:item
  ondismiss={(e) => handleDismiss(e.detail)}
>
  <Tag>{item}</Tag>
</TagGroup>`}</code></pre>

  <h2>Tag Props</h2>
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
        <td><code>variant</code></td>
        <td><code>string</code></td>
        <td><code>"default"</code></td>
        <td>Visual style variant (default, primary, secondary, success, warning, error, info)</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>string</code></td>
        <td><code>"md"</code></td>
        <td>Size of the tag (sm, md, lg)</td>
      </tr>
      <tr>
        <td><code>icon</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Icon to display (HTML or SVG string)</td>
      </tr>
      <tr>
        <td><code>dismissible</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the tag is dismissible</td>
      </tr>
      <tr>
        <td><code>outline</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show the tag as an outline</td>
      </tr>
      <tr>
        <td><code>pill</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show the tag as a pill</td>
      </tr>
      <tr>
        <td><code>clickable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the tag is clickable</td>
      </tr>
      <tr>
        <td><code>href</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>URL for the tag (makes it a link)</td>
      </tr>
      <tr>
        <td><code>target</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Link target (_blank, _self, etc.)</td>
      </tr>
      <tr>
        <td><code>dismissAriaLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Dismiss"</code></td>
        <td>ARIA label for the dismiss button</td>
      </tr>
      <tr>
        <td><code>dismissIcon</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Custom dismiss icon (HTML or SVG string)</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>TagGroup Props</h2>
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
        <td><code>variant</code></td>
        <td><code>string</code></td>
        <td><code>"default"</code></td>
        <td>Visual style variant passed to all tags</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>string</code></td>
        <td><code>"md"</code></td>
        <td>Size passed to all tags (sm, md, lg)</td>
      </tr>
      <tr>
        <td><code>dismissible</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether all tags are dismissible</td>
      </tr>
      <tr>
        <td><code>outline</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether all tags are outlines</td>
      </tr>
      <tr>
        <td><code>pill</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether all tags are pills</td>
      </tr>
      <tr>
        <td><code>clickable</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether all tags are clickable</td>
      </tr>
      <tr>
        <td><code>direction</code></td>
        <td><code>string</code></td>
        <td><code>"horizontal"</code></td>
        <td>Direction of the tag group (horizontal, vertical)</td>
      </tr>
      <tr>
        <td><code>items</code></td>
        <td><code>Array</code></td>
        <td><code>[]</code></td>
        <td>Items to render as tags</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>"Tag group"</code></td>
        <td>ARIA label for the tag group</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>Tag Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>dismiss</code></td>
        <td><code>void</code></td>
        <td>Fired when the dismiss button is clicked</td>
      </tr>
      <tr>
        <td><code>click</code></td>
        <td><code>MouseEvent</code></td>
        <td>Fired when a clickable tag is clicked</td>
      </tr>
    </tbody>
  </table>

  <h2>TagGroup Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Detail</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>dismiss</code></td>
        <td><code>{`{ item: any, index: number }`}</code></td>
        <td>Fired when a tag is dismissed, includes the item and its index</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Tag component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses appropriate semantic elements (<code>span</code> for static tags, <code>a</code> for links, and <code>button</code> for dismiss functionality)</li>
    <li>Provides proper ARIA labels for interactive elements</li>
    <li>Supports keyboard navigation for interactive tags</li>
    <li>Maintains sufficient color contrast for all variants</li>
    <li>TagGroup uses <code>role="group"</code> with an appropriate <code>aria-label</code></li>
  </ul>

  <h2>Keyboard Support</h2>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Function</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><kbd>Tab</kbd></td>
        <td>Moves focus to interactive tags</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
        <td>When focus is on a clickable tag, triggers the click event</td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
        <td>When focus is on a dismiss button, removes the tag</td>
      </tr>
    </tbody>
  </table>
</Container>
