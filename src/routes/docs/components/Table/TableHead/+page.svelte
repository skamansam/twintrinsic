<!--
@component
TableHead documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TableHeadModule from "$lib/components/Table/TableHead.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>TableHead</h1>

  <p>
    <strong>TableHead</strong> is the <code>&lt;thead&gt;</code> sub-component of
    <code>&lt;Table&gt;</code>, used for column headers.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A semantic wrapper for table header rows. Renders as <code>&lt;thead&gt;</code> for correct table semantics.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use inside Table to contain header cells. Always use it within the appropriate Table parent component.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Semantic HTML</strong> — native <code>&lt;thead&gt;</code> element.</li>
    <li><strong>Consistent styling</strong> — unified look across all table cells/rows.</li>
    <li><strong>Accessible</strong> — proper table structure for screen readers.</li>
  </ul>

  <h2>Props</h2>
  <PropsTable component={TableHeadModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses native <code>&lt;thead&gt;</code> for correct table semantics.</li>
    <li>Maintains proper heading hierarchy.</li>
    <li>Supports keyboard navigation within the table.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    TableHead is a structural element. Navigation is handled by the parent Table and browser defaults.
  </p>
</Container>
