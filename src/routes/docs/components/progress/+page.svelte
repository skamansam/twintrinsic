<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import Progress from "$lib/components/Progress/Progress.svelte"
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Progress</h1>
  
  <p>
    The Progress component displays progress bars and indicators. It provides consistent styling,
    accessibility features, and various display options for showing progress towards a goal.
  </p>

  <h2>Usage</h2>

  <h3>Basic Progress</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Progress value={75} />
  </div>

  <CodeBlock language="svelte">{`<Progress value={75} />`}</CodeBlock>

  <h3>Progress with Value Display</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Progress value={42} showValue />
  </div>

  <CodeBlock language="svelte">{`<Progress value={42} showValue />`}</CodeBlock>

  <h3>Progress Variants</h3>
  <div class="p-4 bg-surface rounded-md mb-4 space-y-4">
    <div>
      <p class="text-sm font-medium mb-2">Primary</p>
      <Progress value={60} variant="primary" />
    </div>
    <div>
      <p class="text-sm font-medium mb-2">Success</p>
      <Progress value={80} variant="success" />
    </div>
    <div>
      <p class="text-sm font-medium mb-2">Warning</p>
      <Progress value={50} variant="warning" />
    </div>
    <div>
      <p class="text-sm font-medium mb-2">Error</p>
      <Progress value={30} variant="error" />
    </div>
  </div>

  <CodeBlock language="svelte">{`<Progress value={60} variant="primary" />
<Progress value={80} variant="success" />
<Progress value={50} variant="warning" />
<Progress value={30} variant="error" />`}</CodeBlock>

  <h3>Progress Sizes</h3>
  <div class="p-4 bg-surface rounded-md mb-4 space-y-4">
    <div>
      <p class="text-sm font-medium mb-2">Small</p>
      <Progress value={70} size="sm" />
    </div>
    <div>
      <p class="text-sm font-medium mb-2">Medium</p>
      <Progress value={70} size="md" />
    </div>
    <div>
      <p class="text-sm font-medium mb-2">Large</p>
      <Progress value={70} size="lg" />
    </div>
  </div>

  <CodeBlock language="svelte">{`<Progress value={70} size="sm" />
<Progress value={70} size="md" />
<Progress value={70} size="lg" />`}</CodeBlock>

  <h3>Striped Progress</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Progress value={65} striped />
  </div>

  <CodeBlock language="svelte">{`<Progress value={65} striped />`}</CodeBlock>

  <h3>Animated Progress</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Progress value={65} striped animated />
  </div>

  <CodeBlock language="svelte">{`<Progress value={65} striped animated />`}</CodeBlock>

  <h3>Indeterminate Progress</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Progress indeterminate />
  </div>

  <CodeBlock language="svelte">{`<Progress indeterminate />`}</CodeBlock>

  <h3>Custom Format</h3>
  <div class="p-4 bg-surface rounded-md mb-4">
    <Progress 
      value={0.8} 
      max={1} 
      showValue
      format={(v) => `${Math.round(v * 100)}%`}
    />
  </div>

  <CodeBlock language="svelte">{`<Progress 
  value={0.8} 
  max={1} 
  showValue
  format={(v) => \`\${Math.round(v * 100)}%\`}
/>`}</CodeBlock>

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
        <td><code>value</code></td>
        <td><code>number</code></td>
        <td><code>0</code></td>
        <td>Current progress value</td>
      </tr>
      <tr>
        <td><code>max</code></td>
        <td><code>number</code></td>
        <td><code>100</code></td>
        <td>Maximum progress value</td>
      </tr>
      <tr>
        <td><code>min</code></td>
        <td><code>number</code></td>
        <td><code>0</code></td>
        <td>Minimum progress value</td>
      </tr>
      <tr>
        <td><code>variant</code></td>
        <td><code>string</code></td>
        <td><code>"primary"</code></td>
        <td>Visual style variant (primary, secondary, success, warning, error, info)</td>
      </tr>
      <tr>
        <td><code>size</code></td>
        <td><code>string</code></td>
        <td><code>"md"</code></td>
        <td>Size of the progress bar (sm, md, lg)</td>
      </tr>
      <tr>
        <td><code>showValue</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to display the progress value as text</td>
      </tr>
      <tr>
        <td><code>valueInside</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show the value inside the progress bar</td>
      </tr>
      <tr>
        <td><code>striped</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show a striped pattern</td>
      </tr>
      <tr>
        <td><code>animated</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to animate the striped pattern</td>
      </tr>
      <tr>
        <td><code>indeterminate</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Whether to show an indeterminate loading animation</td>
      </tr>
      <tr>
        <td><code>format</code></td>
        <td><code>Function</code></td>
        <td>-</td>
        <td>Custom function to format the displayed value</td>
      </tr>
      <tr>
        <td><code>ariaLabel</code></td>
        <td><code>string</code></td>
        <td>-</td>
        <td>ARIA label for accessibility</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>""</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h2>Accessibility</h2>
  <ul>
    <li>Uses <code>role="progressbar"</code> for semantic meaning</li>
    <li>Supports <code>aria-valuenow</code>, <code>aria-valuemin</code>, and <code>aria-valuemax</code> attributes</li>
    <li>Includes <code>aria-label</code> for descriptive text</li>
    <li>Works with screen readers to announce progress</li>
  </ul>

  <h2>Best Practices</h2>
  <ul>
    <li>Use appropriate variants to indicate status (success, warning, error)</li>
    <li>Show the value for important progress indicators</li>
    <li>Use indeterminate mode when the duration is unknown</li>
    <li>Provide meaningful ARIA labels for accessibility</li>
    <li>Use animated striped progress for active operations</li>
  </ul>
</Container>
