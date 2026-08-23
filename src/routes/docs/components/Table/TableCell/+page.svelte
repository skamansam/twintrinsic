<!--
@component
TableCell documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TableCellModule from "$lib/components/Table/TableCell.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>TableCell</h1>

  <p>
    <strong>TableCell</strong> is the <code>&lt;td&gt;</code> sub-component of
    <code>&lt;Table&gt;</code>, used for individual cells.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A styled table data cell. Renders as <code>&lt;td&gt;</code> for correct table semantics.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use inside TableRow for each column's data. Always use it within the appropriate Table parent component.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Semantic HTML</strong> — native <code>&lt;td&gt;</code> element.</li>
    <li><strong>Consistent styling</strong> — unified look across all table cells/rows.</li>
    <li><strong>Accessible</strong> — proper table structure for screen readers.</li>
  </ul>

  <h2>Props</h2>
  <PropsTable component={TableCellModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses native <code>&lt;td&gt;</code> for correct table semantics.</li>
    <li>Maintains proper heading hierarchy.</li>
    <li>Supports keyboard navigation within the table.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    TableCell is a structural element. Navigation is handled by the parent Table and browser defaults.
  </p>
</Container>
