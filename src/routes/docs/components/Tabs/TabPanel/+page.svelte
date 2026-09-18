<!--
@component
TabPanel documentation page — redirects to parent Tabs component.
-->
<script lang="ts">
import Container from "$lib/components/Container/Container.svelte"
import { docsIcon } from "../../../componentIcons"
import Icon from "$lib/components/Icon/Icon.svelte"
import { m } from "$lib/paraglide/messages.js"
</script>

<style lang="postcss">
  @reference '$lib/twintrinsic.css';
</style>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <div class="not-prose mb-6 p-4 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg">
    <p class="text-sm text-primary-700 dark:text-primary-300 m-0">
      <strong>TabPanel</strong>{m.tabpanel_note_1()}
      <a href="/docs/components/Tabs/Tabs" class="underline font-medium">Tabs</a>{m.tabpanel_note_2()}
    </p>
  </div>

  <div class="flex flex-wrap items-center gap-3">
  <Icon name={docsIcon("TabPanel")} class="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />

    <h1>{m.tabpanel_heading()}</h1>

  </div>

  <p>
    <strong>{m.tabpanel_heading()}</strong>{m.tabpanel_intro_1()}<code>&lt;Tabs&gt;</code>{m.tabpanel_intro_2()}
  </p>
</Container>
