<!--
@component
CodeBlock - A component for displaying code snippets with syntax highlighting and copy functionality.

Features:
- Syntax highlighting with Prism.js
- Automatic language detection
- Dynamic language loading via Prism.js autoloader plugin
- Copy to clipboard functionality
- Support for multiple CDNs (unpkg, esm.sh, jsdelivr)

> NOTE: The slot needs to be outdented as far as possible so the child contents' first line isn't indented.

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

<CodeBlock language="python" cdn="jsdelivr">
  print('hello world')
</CodeBlock>

<CodeBlock cdn="esm.sh" languagesPath="https://custom.cdn/prismjs/components/">
  &lt;!-- Custom CDN and language path --&gt;
  const code = 'example';
</CodeBlock>
```
-->
<script lang="ts">
import Prism from "prismjs";
import { onDestroy, onMount } from "svelte";
import { detectLanguage } from "../../helpers/index.js";
// import "prism-svelte";
import "prismjs/plugins/autoloader/prism-autoloader";

const {
  /** @type {string} - The language for syntax highlighting */
  language = "",
  /** @type {string} - Additional CSS classes */
  class: className = "",
  /** @type { "unpkg" | "esm.sh" | "jsdelivr" | string } - CDN to use for autoloader, or custom path to prism components folder*/
  pluginSource = "unpkg",
  /** @type {string[]} - List of plugin names (e.g., "autoloader") or full paths to load */
  plugins = [],
  /** @type {import('svelte').Snippet} - The code to display */
  children
} = $props()

let code = $state("")
let copied = $state(false)
let copyTimeout = $state()
let codeElement = $state()


/**
 * Get CDN URL for a plugin
 * @param {string} plugin - Plugin name or full path
 * @param {string} pluginSource - CDN name
 * @returns {string} Full URL to plugin
 */
function getPluginUrl(plugin: string, pluginSource: string): string {
  // If it's a full path (contains :// or starts with /), return as-is
  if (plugin.includes("://") || plugin.startsWith("/")) {
    return plugin;
  }

  // Otherwise, it's a plugin name - construct URL based on CDN
  const pluginName = plugin.startsWith("prism-") ? plugin : `prism-${plugin}`;
  
  switch (pluginSource) {
    case "esm.sh":
      return `https://esm.sh/prismjs@1/plugins/${plugin}/${pluginName}.min.js`;
    case "jsdelivr":
      return `https://cdn.jsdelivr.net/npm/prismjs@1/plugins/${plugin}/${pluginName}.min.js`;
    case "unpkg":
    default:
      return `https://unpkg.com/prismjs@1/plugins/${plugin}/${pluginName}.min.js`;
  }
}

/**
 * Load plugins via script tags
 * @param {string[]} pluginList - List of plugin names or paths
 */
async function loadPlugins(pluginList: string[]): Promise<void> {
  for (const plugin of pluginList) {
    const url = getPluginUrl(plugin, pluginSource);
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load plugin: ${url}`));
      document.head.appendChild(script);
    });
  }
}

/**
 * Get languages path for autoloader
 * @param {string} pluginSource - CDN name or path to a custom cdn
 * @returns {string} Path to language grammars
 */
function getLanguagesPath(pluginSource: string): string {

  switch (pluginSource) {
    case "esm.sh":
      return "https://esm.sh/prismjs@1/components/"
    case "jsdelivr":
      return "https://cdn.jsdelivr.net/npm/prismjs@1/components/"
    case "unpkg":
      return "https://unpkg.com/prismjs@1/components/"
    default:
      return pluginSource;
  }
}

// Initialize plugins and highlight code
onMount(async () => {
  if (plugins.length > 0) {
    await loadPlugins(plugins);
  }
  highlightCode()
})

/**
 * determine the path to the language components based on the plugin source.
 * @param {string} language - The language to determine the path for
 * @returns {[string, boolean]} The path to the language components and whether to use minified files
 */
function determineComponentsDirectory(language: string): [string, boolean] {
  if(language === "svelte") {
    switch (pluginSource) {
      case "esm.sh":
        return ["https://esm.sh/prism-svelte", true]
      case "jsdelivr":
        return ["https://cdn.jsdelivr.net/npm/prism-svelte", true]
      case "unpkg":
        return ["https://unpkg.com/prism-svelte", true]
      default:
        return [getLanguagesPath(pluginSource), false];
    }
  }
  return [getLanguagesPath(pluginSource), false];
}

/**
 * Highlight code with language detection
 */
async function highlightCode(): Promise<void> {
  if (!codeElement) return

  code = codeElement.textContent || ""

  // Auto-detect language if not specified
  const detectedLang = language || detectLanguage(code);

  const [languagesPath, isFullPath] = determineComponentsDirectory(detectedLang);

  // If language not already loaded, load it
  if (detectedLang && !Prism.languages[detectedLang]) {
    if (isFullPath) {
      // For full paths (like prism-svelte), load the script directly
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = languagesPath;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${languagesPath}`));
        document.head.appendChild(script);
      });
    } else if (Prism.plugins?.autoloader) {
      // For standard paths, use autoloader with custom languages_path
      Prism.plugins.autoloader.languages_path = languagesPath;
      await new Promise<void>((resolve) => {
        Prism.plugins.autoloader.loadLanguages(detectedLang, () => {
          resolve()
        })
      })
    }
  }

  // Highlight code
  if (detectedLang) {
    const grammar = Prism.languages[detectedLang]
    if (grammar) {
      const highlighted = Prism.highlight(code, grammar, detectedLang)
      codeElement.innerHTML = highlighted
    }
  }
}

// Clean up copy timeout
onDestroy(() => {
  if (copyTimeout) {
    clearTimeout(copyTimeout)
  }
})

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
  
  <pre class="code-pre {plugins.join(' ')}"><code
  bind:this={codeElement}
  class="language-{language || 'javascript'}"
>{@render children?.()}</code></pre>
</div>

<style lang="postcss">
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
