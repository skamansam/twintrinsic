<!--
@component
TableBody documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TableBodyModule from "$lib/components/Table/TableBody.svelte"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>TableBody</h1>

  <p>
    <strong>TableBody</strong> is the <code>&lt;tbody&gt;</code> sub-component of
    <code>&lt;Table&gt;</code>, used for grouping rows.
  </p>

  <h2>What, When &amp; Why</h2>

  <h3>What is it?</h3>
  <p>
    A semantic wrapper for table body rows. Renders as <code>&lt;tbody&gt;</code> for correct table semantics.
  </p>

  <h3>When should I use it?</h3>
  <p>
    Use inside Table to contain data rows. Always use it within the appropriate Table parent component.
  </p>

  <h3>Why does it exist?</h3>
  <ul>
    <li><strong>Semantic HTML</strong> — native <code>&lt;tbody&gt;</code> element.</li>
    <li><strong>Consistent styling</strong> — unified look across all table cells/rows.</li>
    <li><strong>Accessible</strong> — proper table structure for screen readers.</li>
  </ul>

  <h2>Props</h2>
  <PropsTable component={TableBodyModule} />

  <h2>Accessibility</h2>
  <ul>
    <li>Uses native <code>&lt;tbody&gt;</code> for correct table semantics.</li>
    <li>Maintains proper heading hierarchy.</li>
    <li>Supports keyboard navigation within the table.</li>
  </ul>

  <h2>Keyboard Support</h2>
  <p>
    TableBody is a structural element. Navigation is handled by the parent Table and browser defaults.
  </p>
</Container>
