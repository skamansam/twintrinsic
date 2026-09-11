<!--
@component
TableBody documentation page — standardized structure
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import PropsTable from "$lib/components/PropsTable/PropsTable.svelte"
import * as TableBodyModule from "$lib/components/Table/TableBody.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="not-prose mb-6 p-4 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg">
    <p class="text-sm text-primary-700 dark:text-primary-300 m-0">
      <strong>{m.tablebody_heading()}</strong>{m.table_sub_note_1()}
      <a href="/docs/components/Table/Table" class="underline font-medium">Table</a>{m.table_sub_note_2()}
    </p>
  </div>

  <h1>{m.tablebody_heading()}</h1>

  <p>
    <strong>{m.tablebody_heading()}</strong>{m.tablebody_intro_1()}<code>&lt;tbody&gt;</code>{m.tablebody_intro_2()}<code>&lt;Table&gt;</code>{m.tablebody_intro_3()}
  </p>

  <h2>{m.sec_what_when_why()}</h2>

  <h3>{m.sec_what()}</h3>
  <p>
    {m.tablebody_what_1()}<code>&lt;tbody&gt;</code>{m.table_sub_what_2()}
  </p>

  <h3>{m.sec_when()}</h3>
  <p>
    {m.table_sub_when_prefix()}<code>Table</code>{m.tablebody_when_tail()}
  </p>

  <h3>{m.sec_why()}</h3>
  <ul>
    <li><strong>{m.table_sub_why_semantic()}</strong>{m.table_sub_why_semantic_desc_1()}<code>&lt;tbody&gt;</code>{m.table_sub_why_semantic_desc_2()}</li>
    <li><strong>{m.table_sub_why_styling()}</strong>{m.table_sub_why_styling_desc()}</li>
    <li><strong>{m.table_sub_why_a11y()}</strong>{m.table_sub_why_a11y_desc()}</li>
  </ul>

  <h2>{m.sec_props()}</h2>
  <PropsTable component={TableBodyModule} />

  <h2>{m.sec_accessibility()}</h2>
  <ul>
    <li>{m.table_sub_a11y_1_0()}<code>&lt;tbody&gt;</code>{m.table_sub_a11y_1_1()}</li>
    <li>{m.table_sub_a11y_2()}</li>
    <li>{m.table_sub_a11y_3()}</li>
  </ul>

  <h2>{m.sec_keyboard()}</h2>
  <p>{m.tablebody_heading()}{m.table_sub_kb_note_1()}</p>
</Container>
