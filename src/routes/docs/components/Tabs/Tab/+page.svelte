<!--
@component
Tab documentation page — redirects to parent Tabs component.
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="not-prose mb-6 p-4 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg">
    <p class="text-sm text-primary-700 dark:text-primary-300 m-0">
      <strong>Tab</strong>{m.tab_note_1()}
      <a href="/docs/components/Tabs/Tabs" class="underline font-medium">Tabs</a>{m.tab_note_2()}
    </p>
  </div>

  <h1>{m.tab_heading()}</h1>

  <p>
    <strong>{m.tab_heading()}</strong>{m.tab_intro_1()}<code>&lt;Tabs&gt;</code>{m.tab_intro_2()}<code>&lt;TabList&gt;</code>{m.tab_intro_3()}
  </p>
</Container>
