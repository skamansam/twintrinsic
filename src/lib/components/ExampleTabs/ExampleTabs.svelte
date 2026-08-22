<script lang="ts">
  import type { Snippet } from "svelte"
  import CodeBlock from "../CodeBlock/CodeBlock.svelte"

  interface Props {
    /** The live demo content */
    children?: Snippet
    /** The source code string to display */
    code?: string
    /** Programming language for syntax highlighting */
    language?: string
    /** Custom label for the example tab */
    exampleLabel?: string
    /** Custom label for the code tab */
    codeLabel?: string
  }

  let {
    children,
    code = "",
    language = "svelte",
    exampleLabel = "Example",
    codeLabel = "Code",
  }: Props = $props()

  let activeTab = $state<"example" | "code">("example")
</script>

<div class="not-prose mb-8 rounded-lg border border-border overflow-hidden">
  <div class="flex border-b border-border bg-surface">
    <button
      class="px-4 py-2 text-sm font-medium transition-colors {activeTab === 'example'
        ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 bg-white dark:bg-gray-900'
        : 'text-muted hover:text-default'}"
      onclick={() => (activeTab = "example")}
      role="tab"
      aria-selected={activeTab === "example"}
    >
      {exampleLabel}
    </button>
    <button
      class="px-4 py-2 text-sm font-medium transition-colors {activeTab === 'code'
        ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 bg-white dark:bg-gray-900'
        : 'text-muted hover:text-default'}"
      onclick={() => (activeTab = "code")}
      role="tab"
      aria-selected={activeTab === "code"}
    >
      {codeLabel}
    </button>
  </div>

  <div role="tabpanel">
    {#if activeTab === "example"}
      <div class="p-6">
        {@render children?.()}
      </div>
    {:else}
      <div class="p-4">
        {#if code}
          <CodeBlock language={language}>{code}</CodeBlock>
        {/if}
      </div>
    {/if}
  </div>
</div>
