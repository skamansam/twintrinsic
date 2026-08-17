<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Progress from "$lib/components/Progress/Progress.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as ProgressModule from "$lib/components/Progress/Progress.svelte"
</script>
<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>
<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>Progress</h1>
  
  <p>
    The Progress component displays progress bars and indicators. It provides consistent styling,
    accessibility features, and various display options for showing progress towards a goal.
  </p>

  <h2>Usage</h2>

  <h3>Basic Progress</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="progress-basic">
    <Progress value={75} />
  </div>

  <CodeBlock language="svelte">{`<Progress value={75} />`}</CodeBlock>

  <h3>Progress with Value Display</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="progress-with-value">
    <Progress value={42} showValue />
  </div>

  <CodeBlock language="svelte">{`<Progress value={42} showValue />`}</CodeBlock>

  <h3>Progress Variants</h3>
  <div class="p-4 bg-surface rounded-md mb-4 space-y-4" data-testid="progress-variants">
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
  <div class="p-4 bg-surface rounded-md mb-4 space-y-4" data-testid="progress-sizes">
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
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="progress-striped">
    <Progress value={65} striped />
  </div>

  <CodeBlock language="svelte">{`<Progress value={65} striped />`}</CodeBlock>

  <h3>Animated Progress</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="progress-animated">
    <Progress value={65} striped animated />
  </div>

  <CodeBlock language="svelte">{`<Progress value={65} striped animated />`}</CodeBlock>

  <h3>Indeterminate Progress</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="progress-indeterminate">
    <Progress indeterminate />
  </div>

  <CodeBlock language="svelte">{`<Progress indeterminate />`}</CodeBlock>

  <h3>Custom Format</h3>
  <div class="p-4 bg-surface rounded-md mb-4" data-testid="progress-custom-format">
    <Progress 
      value={0.8} 
      max={1} 
      showValue
      format={(v: number) => `${Math.round(v * 100)}%`}
    />
  </div>

  <CodeBlock language="svelte">{`<Progress 
  value={0.8} 
  max={1} 
  showValue
  format={(v) => \`\${Math.round(v * 100)}%\`}
/>`}</CodeBlock>

  <h2>Props</h2>
<PropsTable component={ProgressModule} />

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
