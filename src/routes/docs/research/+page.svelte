<!--
@component
Component research page — publishes the What/When/Why design research from
docs/plans/COMPONENT_RESEARCH_CHECKLIST.md (plan: Component Research).

The data comes from the generated `researchData.generated.ts` module
(re-generate with `pnpm build:research`); this page renders it with
search, category grouping, and per-entry anchors.
-->
<script lang="ts">
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Container from "$lib/components/Container/Container.svelte"
import Panel from "$lib/components/Panel/Panel.svelte"
import Separator from "$lib/components/Separator/Separator.svelte"
import { m } from "$lib/paraglide/messages.js"
import { researchCategories, researchEntryCount, researchSources } from "./researchData.generated"

let query = $state("")

/** Normalized search text for an entry (title + fields + bullets). */
function searchable(entry: (typeof researchCategories)[number]["entries"][number]): string {
	return [entry.title, entry.what, entry.when, entry.why, entry.sources.join(" "), entry.implementation.join(" "), entry.mistakes.join(" "), entry.related.join(" ")]
		.join(" ")
		.toLowerCase()
}

const filtered = $derived.by(() => {
	const q = query.trim().toLowerCase()
	if (!q) return researchCategories
	return researchCategories
		.map((c) => ({ ...c, entries: c.entries.filter((e) => searchable(e).includes(q)) }))
		.filter((c) => c.entries.length > 0)
})

const shown = $derived(filtered.reduce((n, c) => n + c.entries.length, 0))
</script>

<Container as="article" class="prose dark:prose-invert max-w-none">
  <h1>{m.link_research()}</h1>

  <p>
    {m.research_intro()}
    <strong>{shown}</strong> {m.research_of()} <strong>{researchEntryCount}</strong> {m.research_entries()}.
  </p>

  <CodeBlock language="typescript">
{`// The research lives in the repo as markdown — the source of truth:
// docs/plans/COMPONENT_RESEARCH_CHECKLIST.md`}
  </CodeBlock>

  <label class="block my-4">
    <span class="sr-only">{m.research_search_label()}</span>
    <input
      type="search"
      bind:value={query}
      placeholder={m.research_search_placeholder()}
      class="w-full rounded-lg border border-border bg-surface px-4 py-2 text-text placeholder:text-muted focus:border-primary focus:outline-none"
    />
  </label>

  {#each filtered as category (category.name)}
    <h2>{category.name}</h2>
    {#each category.entries as entry (entry.slug)}
      <div id={entry.slug} data-testid={`research-entry-${entry.slug}`} class="scroll-mt-20">
        <Panel class="my-4">
        {#snippet header()}
          <a href="#{entry.slug}" class="no-underline">{entry.title}</a>
        {/snippet}

        <dl class="grid gap-2 not-prose">
          <div class="grid grid-cols-[5rem_1fr] gap-2">
            <dt class="font-semibold">{m.research_what()}</dt>
            <dd>{entry.what}</dd>
          </div>
          <div class="grid grid-cols-[5rem_1fr] gap-2">
            <dt class="font-semibold">{m.research_when()}</dt>
            <dd>{entry.when}</dd>
          </div>
          <div class="grid grid-cols-[5rem_1fr] gap-2">
            <dt class="font-semibold">{m.research_why()}</dt>
            <dd>{entry.why}</dd>
          </div>
        </dl>

        <h3 class="mt-4 mb-1">{m.research_sources()}</h3>
        <ul class="not-prose flex flex-wrap gap-2">
          {#each entry.sources as source (source)}
            <li class="rounded bg-muted/20 px-2 py-0.5 text-sm text-muted">{source}</li>
          {/each}
        </ul>

        {#if entry.implementation.length > 0}
          <h3 class="mt-4 mb-1">{m.research_implementation()}</h3>
          <ul>
            {#each entry.implementation as note (note)}
              <li>{note}</li>
            {/each}
          </ul>
        {/if}

        {#if entry.mistakes.length > 0}
          <h3 class="mt-4 mb-1">{m.research_mistakes()}</h3>
          <ul>
            {#each entry.mistakes as mistake (mistake)}
              <li>{mistake}</li>
            {/each}
          </ul>
        {/if}

        {#if entry.related.length > 0}
          <h3 class="mt-4 mb-1">{m.research_related()}</h3>
          <p class="not-prose flex flex-wrap gap-2">
            {#each entry.related as name (name)}
              <span class="rounded bg-muted/20 px-2 py-0.5 text-sm text-muted">{name}</span>
            {/each}
          </p>
        {/if}
        </Panel>
      </div>
    {/each}
    <Separator class="my-8" />
  {/each}

  <h2>{m.research_sources_legend()}</h2>
  <p>{m.research_sources_body()}</p>
  <ul>
    {#each researchSources as source (source)}
      <li><strong>{source}</strong> — {m.research_sources_reference()}</li>
    {/each}
  </ul>
</Container>
