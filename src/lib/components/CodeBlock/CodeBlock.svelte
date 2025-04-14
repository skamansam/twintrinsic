<!--
@component
CodeBlock - A component for displaying code snippets with syntax highlighting and copy functionality.

Usage:
```svelte
<CodeBlock language="javascript">
  const hello = 'world';
  console.log(hello);
</CodeBlock>

<CodeBlock>
  &lt;!-- Auto-detects language --&gt;
  const hello = 'world';
</CodeBlock>
```
-->
<script>
import { onMount, onDestroy } from "svelte"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-scss"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-json"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-markdown"
import "prism-svelte"

const {
  /** @type {string} - The language for syntax highlighting */
  language = "",
  /** @type {string} - Additional CSS classes */
  class: className = "",
} = $props()

let code = $state("")
let copied = $state(false)
let copyTimeout
let codeElement

// Get code from slot content
onMount(() => {
  if (!codeElement) return

  code = codeElement.textContent || ""

  // Auto-detect language if not specified
  const detectedLang = language || detectLanguage(code)

  // Highlight code
  if (detectedLang) {
    const grammar = Prism.languages[detectedLang]
    if (grammar) {
      const highlighted = Prism.highlight(code, grammar, detectedLang)
      codeElement.innerHTML = highlighted
    }
  }
})

// Clean up copy timeout
onDestroy(() => {
  if (copyTimeout) {
    clearTimeout(copyTimeout)
  }
})

/**
 * Detect code language based on content
 * @param {string} content - Code content
 * @returns {string} Detected language
 */
function detectLanguage(content) {
  const trimmed = content.trim()

  // HTML/SVG
  if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
    if (trimmed.includes("</svg>")) return "markup"
    if (trimmed.includes("/>") || trimmed.includes("</")) return "markup"
  }

  // CSS
  if (trimmed.includes("{") && trimmed.includes("}") && trimmed.includes(":")) {
    if (trimmed.includes("@import") || trimmed.includes("@media")) return "css"
    if (trimmed.includes("$") || trimmed.includes("@mixin")) return "scss"
  }

  // JavaScript/TypeScript
  if (trimmed.includes("function") || trimmed.includes("=>")) {
    if (trimmed.includes(":") && trimmed.includes("interface")) return "typescript"
    if (trimmed.includes("React.") || trimmed.includes("jsx")) return "jsx"
    if (trimmed.includes("<") && trimmed.includes("/>")) return "jsx"
    return "javascript"
  }

  // JSON
  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    try {
      JSON.parse(trimmed)
      return "json"
    } catch {}
  }

  // YAML
  if (trimmed.includes(":") && !trimmed.includes("{")) {
    return "yaml"
  }

  // Markdown
  if (trimmed.includes("#") || trimmed.includes("```")) {
    return "markdown"
  }

  // Svelte
  if (trimmed.includes("<script>") || trimmed.includes("$:")) {
    return "svelte"
  }

  // Shell
  if (trimmed.startsWith("$") || trimmed.startsWith("#!")) {
    return "bash"
  }

  return "javascript"
}

/**
 * Copy code to clipboard
 */
async function copyCode() {
  if (copied) return

  try {
    await navigator.clipboard.writeText(code)
    copied = true

    copyTimeout = setTimeout(() => {
      copied = false
    }, 2000)
  } catch (error) {
    console.error("Failed to copy code:", error)
  }
}
</script>

<div class="code-block {className}">
  <div class="code-header">
    {#if language}
      <div class="code-language">{language}</div>
    {/if}
    <button
      type="button"
      class="code-copy"
      onclick={copyCode}
      aria-label={copied ? 'Copied!' : 'Copy code'}
    >
      {#if copied}
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
          />
        </svg>
        <span>Copied!</span>
      {:else}
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
          />
        </svg>
        <span>Copy</span>
      {/if}
    </button>
  </div>
  
  <pre class="code-pre">
    <code
      bind:this={codeElement}
      class="language-{language || 'javascript'}"
    ><slot /></code>
  </pre>
</div>

<style>
  @reference '../../twintrinsic.css';

  .code-block {
    @apply relative my-4 rounded-lg overflow-hidden;
    @apply bg-surface border border-border;
  }

  .code-header {
    @apply flex items-center justify-between px-4 py-2;
    @apply bg-surface border-b border-border;
  }

  .code-language {
    @apply text-xs font-mono text-muted;
  }

  .code-copy {
    @apply flex items-center gap-2 px-2 py-1;
    @apply text-xs font-medium text-muted;
    @apply rounded hover:bg-hover;
    @apply transition-colors duration-150;
    @apply focus:outline-none focus:ring-2 focus:ring-primary/50;
  }

  .code-pre {
    @apply m-0 p-4 overflow-x-auto;
    @apply font-mono text-sm;
    @apply bg-surface dark:bg-surface;
  }

  :global(.code-pre .token.comment),
  :global(.code-pre .token.prolog),
  :global(.code-pre .token.doctype),
  :global(.code-pre .token.cdata) {
    @apply text-muted dark:text-muted;
  }

  :global(.code-pre .token.punctuation) {
    @apply text-primary-600 dark:text-primary-400;
  }

  :global(.code-pre .token.property),
  :global(.code-pre .token.tag),
  :global(.code-pre .token.boolean),
  :global(.code-pre .token.number),
  :global(.code-pre .token.constant),
  :global(.code-pre .token.symbol) {
    @apply text-primary-700 dark:text-primary-300;
  }

  :global(.code-pre .token.selector),
  :global(.code-pre .token.attr-name),
  :global(.code-pre .token.string),
  :global(.code-pre .token.char),
  :global(.code-pre .token.builtin) {
    @apply text-success;
  }

  :global(.code-pre .token.operator),
  :global(.code-pre .token.entity),
  :global(.code-pre .token.url),
  :global(.code-pre .language-css .token.string),
  :global(.code-pre .style .token.string) {
    @apply text-warning;
  }

  :global(.code-pre .token.atrule),
  :global(.code-pre .token.attr-value),
  :global(.code-pre .token.keyword) {
    @apply text-info;
  }

  :global(.code-pre .token.function),
  :global(.code-pre .token.class-name) {
    @apply text-error;
  }

  :global(.code-pre .token.regex),
  :global(.code-pre .token.important) {
    @apply text-warning;
  }

  :global(.code-pre .token.important),
  :global(.code-pre .token.bold) {
    @apply font-bold;
  }

  :global(.code-pre .token.italic) {
    @apply italic;
  }

  :global(.code-pre .token.entity) {
    @apply cursor-help;
  }
</style>
