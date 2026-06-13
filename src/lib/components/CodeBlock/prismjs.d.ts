/**
 * Ambient module declarations for `prismjs` and its plugins.
 *
 * `prismjs` ships without a `.d.ts` file, so we declare just the surface area
 * that Twintrinsic's `CodeBlock.svelte` consumes. If you need more of the
 * API (e.g. tokenizers, hook callbacks), extend the `Prism` interface below.
 *
 * Affected imports:
 *  - `import Prism from "prismjs"`                       (default export)
 *  - `import "prismjs/plugins/autoloader/prism-autoloader"` (side-effect)
 */

declare module "prismjs" {
  /** A Prism language grammar (token → regex map). Opaque to consumers. */
  // biome-ignore lint/suspicious/noExplicitAny: grammar shape is intentionally loose
  type Grammar = any;

  /** The Prism instance with the surface we use. */
  const Prism: {
    /** Map of loaded language name → grammar. */
    languages: Record<string, Grammar | undefined>;
    /** Map of loaded plugin name → plugin instance. */
    plugins: {
      autoloader?: {
        /** Base path used by the autoloader to fetch grammars on demand. */
        languages_path: string;
        /**
         * Eagerly load one or more languages. Calls `callback()` once all
         * requested languages are available (or immediately if cached).
         */
        loadLanguages: (
          languages: string | string[],
          callback?: () => void,
        ) => void;
      };
      // biome-ignore lint/suspicious/noExplicitAny: other plugins are opaque
      [key: string]: any;
    };
    /**
     * Highlight `text` using `grammar`. Returns the highlighted HTML string.
     */
    highlight: (text: string, grammar: Grammar, language: string) => string;
  };

  export default Prism;
}

/**
 * The autoloader plugin is imported for its side effects (it registers
 * itself on `Prism.plugins.autoloader`). Declare the module with no exports.
 */
declare module "prismjs/plugins/autoloader/prism-autoloader";
