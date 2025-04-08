<!--
@component
Separator documentation page
-->
<script>
import Container from "$lib/components/Container/Container.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Separator</h1>
  
  <p>
    The Separator component creates a visual divider that can be horizontal or
    vertical. It supports optional content like text or icons and comes with
    different color variants.
  </p>

  <h2>Examples</h2>

  <h3>Basic Separator</h3>
  <div class="not-prose mb-8">
    <p class="mb-4">Content above</p>
    <Separator />
    <p class="mt-4">Content below</p>
  </div>

  <pre class="language-svelte"><code>{`<Separator />`}</code></pre>

  <h3>With Text</h3>
  <div class="not-prose mb-8 max-w-sm">
    <Separator>or</Separator>
  </div>

  <pre class="language-svelte"><code>{`<Separator>or</Separator>`}</code></pre>

  <h3>With Icon and Text</h3>
  <div class="not-prose mb-8 max-w-sm">
    <Separator>
      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      Featured Content
    </Separator>
  </div>

  <h3>Vertical Separator</h3>
  <div class="not-prose mb-8 h-32 flex items-center">
    <span>Left content</span>
    <Separator vertical />
    <span>Right content</span>
  </div>

  <pre class="language-svelte"><code>{`<div class="h-32 flex items-center">
  <span>Left content</span>
  <Separator vertical />
  <span>Right content</span>
</div>`}</code></pre>

  <h3>Color Variants</h3>
  <div class="not-prose mb-8 space-y-4">
    <Separator color="default">Default</Separator>
    <Separator color="primary">Primary</Separator>
    <Separator color="success">Success</Separator>
    <Separator color="warning">Warning</Separator>
    <Separator color="error">Error</Separator>
  </div>

  <pre class="language-svelte"><code>{`<Separator color="primary">Primary</Separator>`}</code></pre>

  <h2>Props</h2>
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
        <td><code>vertical</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether the separator should be vertical</td>
      </tr>
      <tr>
        <td><code>color</code></td>
        <td><code>"default" | "primary" | "success" | "warning" | "error"</code></td>
        <td><code>"default"</code></td>
        <td>Color variant of the separator</td>
      </tr>
      <tr>
        <td><code>as</code></td>
        <td><code>"div" | "hr"</code></td>
        <td><code>hasContent ? "div" : "hr"</code></td>
        <td>HTML element to render</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>ARIA label</td>
      </tr>
    </tbody>
  </table>

  <h2>Slots</h2>
  <table>
    <thead>
      <tr>
        <th>Slot</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>default</td>
        <td>Optional content to display in the center of the separator</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <p>
    The Separator component follows accessibility best practices:
  </p>
  <ul>
    <li>Uses semantic <code>hr</code> element when no content is provided</li>
    <li>Includes proper <code>role="separator"</code> when rendered as a <code>div</code></li>
    <li>Sets correct <code>aria-orientation</code> based on the <code>vertical</code> prop</li>
    <li>Supports custom <code>ariaLabel</code> for better screen reader experience</li>
  </ul>

  <h2>CSS Variables</h2>
  <p>
    The separator uses Tailwind's color system through the theme configuration. The
    following color classes are used:
  </p>
  <ul>
    <li><code>border-border</code> - Default color</li>
    <li><code>border-primary-200</code> / <code>border-primary-800</code> - Primary variant</li>
    <li><code>border-success/30</code> - Success variant</li>
    <li><code>border-warning/30</code> - Warning variant</li>
    <li><code>border-error/30</code> - Error variant</li>
  </ul>
</Container>
