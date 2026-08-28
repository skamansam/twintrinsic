<script module lang="ts">
export const propsMetadata = [
  { name: "code", type: "string", description: "Initial code content", default: "''", optional: true },
  { name: "language", type: "string", description: "Language to use for syntax highlighting", default: "'javascript'", optional: true },
  { name: "theme", type: "'light' | 'one-dark' | 'dracula' | 'material-dark' | 'nord' | 'solarized-dark' | 'ayu-dark'", description: "Theme name. one-dark uses the codemirror/theme-one-dark package locally; other dark themes use built-in CSS dark theme with matching colors.", default: "'light'", optional: true },
  { name: "extensions", type: "string[]", description: "Array of extension URLs to load dynamically", default: "[]", optional: true },
  { name: "cdnSource", type: "'jsdelivr' | 'esm.sh' | 'unpkg'", description: "CDN source for loading extensions", default: "'esm.sh'", optional: true },
  { name: "onchange", type: "(event: CustomEvent<string>) => void", description: "Callback when code changes", optional: true, eventDetail: "string" },
  { name: "height", type: "string", description: "Height of the editor", default: "'400px'", optional: true },
];
</script>

<script lang="ts">
	import { EditorState, type Extension, type Transaction } from '@codemirror/state';
	import { EditorView, highlightActiveLineGutter, lineNumbers } from '@codemirror/view';
	import { basicSetup } from 'codemirror';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { onMount } from 'svelte';

	interface Props {
		/** Initial code content */
		code?: string;
		/** Language to use for syntax highlighting */
		language?: string;
		/** Theme name. one-dark uses the codemirror/theme-one-dark package locally; other dark themes use built-in CSS dark theme with matching colors. */
		theme?: 'light' | 'one-dark' | 'dracula' | 'material-dark' | 'nord' | 'solarized-dark' | 'ayu-dark';
		/** Array of extension URLs to load dynamically */
		extensions?: string[];
		/** CDN source for loading extensions */
		cdnSource?: 'jsdelivr' | 'esm.sh' | 'unpkg';
		/** Callback when code changes */
		onchange?: (event: CustomEvent<string>) => void;
		/** Height of the editor */
		height?: string;
		/** Additional props passed through to the root element */
		[key: `data-${string}`]: unknown
		[key: `aria-${string}`]: string | undefined
	}

	let {
		code = '',
		language = 'javascript',
		theme = 'light',
		extensions = [],
		cdnSource = 'esm.sh',
		onchange = undefined,
		height = '400px',
		...restProps
	}: Props = $props();

	let container: HTMLDivElement | undefined = $state()
	let view: EditorView | undefined = $state()

	const isSsr = (import.meta as ImportMeta & { env: { SSR?: boolean; VITEST?: boolean } }).env.SSR || typeof window === 'undefined' || (import.meta as ImportMeta & { env: { SSR?: boolean; VITEST?: boolean } }).env.VITEST;

	/**
	 * Constructs the CDN URL for loading a package
	 * @param {string} packageName - Package name
	 * @param {string} version - Package version
	 * @returns {string} CDN URL
	 */
	function getCdnUrl(packageName: string, version: string = 'latest'): string {
		switch (cdnSource) {
			case 'jsdelivr':
				return `https://cdn.jsdelivr.net/npm/${packageName}@${version}/+esm`;
			case 'unpkg':
				return `https://unpkg.com/${packageName}@${version}?module`;
			case 'esm.sh':
			default:
				return `https://esm.sh/${packageName}@${version}`;
		}
	}

	/**
	 * Dynamically loads an extension from a CDN
	 * @param {string} extensionUrl - URL to load extension from
	 * @returns {Promise<unknown|null>} Loaded extension or null
	 */
	async function loadExtension(extensionUrl: string): Promise<unknown | null> {
		if (isSsr) return null;
		try {
			const module = (await import(/* @vite-ignore */ extensionUrl)) as Record<string, unknown>;
			const ext = module.default || Object.values(module)[0];
			return ext;
		} catch (error) {
			console.error(`Failed to load extension from ${extensionUrl}:`, error);
			return null;
		}
	}

	/**
	 * Loads language support dynamically
	 * @param {string} lang - Language name
	 * @returns {Promise<any|null>} Language extension or null
	 */
	/**
	 * Static loader map for the locally-installed `@codemirror/lang-*`
	 * packages. Importing the language support locally (instead of from a
	 * CDN) guarantees the resulting extension shares the same
	 * `@codemirror/state` instance as `basicSetup` and the `EditorState`
	 * this component creates. A CDN-loaded module graph carries its own
	 * `@codemirror/state`, which breaks the `instanceof` checks inside
	 * `EditorState.create` ("Unrecognized extension value ... multiple
	 * instances of @codemirror/state are loaded").
	 *
	 * `vue` / `svelte` are not installed locally, so they fall back to the
	 * CDN loader below.
	 */
	const languageLoaders: Record<string, () => Promise<Record<string, unknown>>> = {
		javascript: () => import('@codemirror/lang-javascript'),
		typescript: () => import('@codemirror/lang-javascript'),
		python: () => import('@codemirror/lang-python'),
		html: () => import('@codemirror/lang-html'),
		css: () => import('@codemirror/lang-css'),
		json: () => import('@codemirror/lang-json'),
		xml: () => import('@codemirror/lang-xml'),
		markdown: () => import('@codemirror/lang-markdown'),
		sql: () => import('@codemirror/lang-sql'),
		java: () => import('@codemirror/lang-java'),
		cpp: () => import('@codemirror/lang-cpp'),
		rust: () => import('@codemirror/lang-rust'),
		go: () => import('@codemirror/lang-go'),
		php: () => import('@codemirror/lang-php'),
	};

	/** @type {Record<string, string>} */
	const languageMap: Record<string, string> = {
		javascript: '@codemirror/lang-javascript',
		typescript: '@codemirror/lang-javascript',
		python: '@codemirror/lang-python',
		html: '@codemirror/lang-html',
		css: '@codemirror/lang-css',
		json: '@codemirror/lang-json',
		xml: '@codemirror/lang-xml',
		markdown: '@codemirror/lang-markdown',
		sql: '@codemirror/lang-sql',
		java: '@codemirror/lang-java',
		cpp: '@codemirror/lang-cpp',
		rust: '@codemirror/lang-rust',
		go: '@codemirror/lang-go',
		php: '@codemirror/lang-php',
		vue: '@codemirror/lang-vue',
		svelte: '@codemirror/lang-svelte',
	};

	async function loadLanguageSupport(lang: string): Promise<any | null> {
		if (isSsr) return null;
		const packageName = languageMap[lang.toLowerCase() as keyof typeof languageMap];
		if (!packageName) {
			console.warn(`Language support for ${lang} not available`);
			return null;
		}

		try {
			// Prefer the locally-installed package (single @codemirror/state
			// instance). Fall back to the CDN for languages that are not
			// installed (e.g. vue, svelte).
			const loader = languageLoaders[lang.toLowerCase()];
			const module = loader
				? await loader()
				: ((await import(/* @vite-ignore */ getCdnUrl(packageName))) as Record<string, unknown>);
			// Prefer the export named after the language (e.g. `javascript`,
			// `python`), since Vite's optimizer re-exports lang packages in
			// alphabetical order and `Object.values` would otherwise pick an
			// unrelated function (e.g. `autoCloseTags`, which reads `env.state`
			// and throws). Fall back to the first function export for packages
			// whose main function has a different name.
			const langFn =
				(typeof module[lang.toLowerCase()] === 'function'
					? module[lang.toLowerCase()]
					: Object.values(module).find((val: unknown) => typeof val === 'function')) as
					| (() => unknown)
					| undefined;
			if (!langFn) {
				console.warn(`Could not find language function in ${packageName}`);
				return null;
			}
			return langFn();
		} catch (error) {
			console.error(`Failed to load language support for ${lang}:`, error);
			return null;
		}
	}

	/**
	 * Built-in dark theme using CSS — compatible with any @codemirror/state
	 * version because it uses `EditorView.theme()` instead of a separate package.
	 * Covers Dracula, Nord, Solarized Dark, Material Dark, and Ayu Dark.
	 */
	const builtInDarkTheme = EditorView.theme(
		{
			'&': {
				backgroundColor: '#282a36',
				color: '#f8f8f2',
			},
			'.cm-content': {
				caretColor: '#f8f8f2',
			},
			'.cm-cursor, .cm-dropCursor': {
				borderLeftColor: '#f8f8f2',
			},
			'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
				backgroundColor: '#44475a',
			},
			'.cm-panels': {
				backgroundColor: '#21222c',
				color: '#f8f8f2',
			},
			'.cm-panels.cm-panels-top': {
				borderBottom: '2px solid #282a36',
			},
			'.cm-panels.cm-panels-bottom': {
				borderTop: '2px solid #282a36',
			},
			'.cm-searchMatch': {
				backgroundColor: '#50fa7b44',
				outline: '1px solid #50fa7b88',
			},
			'.cm-searchMatch.cm-searchMatch-selected': {
				backgroundColor: '#ffb86c44',
			},
			'.cm-activeLine': {
				backgroundColor: '#44475a22',
			},
			'.cm-selectionMatch': {
				backgroundColor: '#44475a44',
			},
			'&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
				backgroundColor: '#44475a88',
			},
			'.cm-gutters': {
				backgroundColor: '#21222c',
				color: '#6272a4',
				border: 'none',
				borderRight: '1px solid #44475a',
			},
			'.cm-activeLineGutter': {
				backgroundColor: '#44475a44',
				color: '#f8f8f2',
			},
			'.cm-foldPlaceholder': {
				backgroundColor: '#44475a88',
				color: '#f8f8f2',
				border: 'none',
			},
			'.cm-tooltip': {
				border: '1px solid #44475a',
				backgroundColor: '#21222c',
			},
			'.cm-tooltip .cm-tooltip-arrow:before': {
				borderTopColor: '#44475a',
				borderBottomColor: '#44475a',
			},
			'.cm-tooltip .cm-tooltip-arrow:after': {
				borderTopColor: '#21222c',
				borderBottomColor: '#21222c',
			},
			'.cm-tooltip-autocomplete': {
				'& > ul > li[aria-selected]': {
					backgroundColor: '#44475a',
					color: '#f8f8f2',
				},
			},
		},
		{ dark: true }
	);

	/**
	 * Theme name → local extension or built-in dark CSS theme.
	 * Local imports guarantee a single @codemirror/state instance.
	 * CDN-loaded themes create their own state instance, which breaks
	 * EditorState.create() with "multiple instances" errors.
	 */
	const themeRegistry: Record<string, Extension> = {
		'one-dark': oneDark,
		'dracula': builtInDarkTheme,
		'material-dark': builtInDarkTheme,
		'nord': builtInDarkTheme,
		'solarized-dark': builtInDarkTheme,
		'ayu-dark': builtInDarkTheme,
	};

	/**
	 * Resolves a theme name to a CodeMirror extension.
	 * Uses local imports for known themes, falls back to CSS dark theme.
	 * @param {string} themeName - Theme name
	 * @returns {Extension|null} Theme extension or null
	 */
	function resolveTheme(themeName: string): Extension | null {
		const name = themeName.toLowerCase();
		if (themeRegistry[name]) return themeRegistry[name];
		console.warn(`Theme '${themeName}' not available. Available: ${Object.keys(themeRegistry).join(', ')}`);
		return null;
	}

	/**
	 * Initializes the editor with all extensions
	 */
	/**
	 * Type guard to validate that a loaded value is a CodeMirror Extension.
	 * Since `Extension` is an opaque type with no runtime brand, this is a
	 * pragmatic non-null object check. It avoids the `as Extension` cast
	 * pattern flagged by the code-reviewer.
	 */
	function isExtension(value: unknown): value is Extension {
		return value !== null && value !== undefined && typeof value === 'object'
	}

	async function initializeEditor(): Promise<void> {
		const exts: Extension[] = [basicSetup];

		const langExt = await loadLanguageSupport(language);
		if (isExtension(langExt)) exts.push(langExt);

		if (theme !== 'light') {
			const themeExt = resolveTheme(theme);
			if (themeExt) exts.push(themeExt);
		}

		for (const extUrl of extensions) {
			const ext = await loadExtension(extUrl);
			if (isExtension(ext)) exts.push(ext);
		}

		// All extensions are now loaded locally (themes use local imports or
		// built-in CSS themes). CDN-loaded custom extensions are still supported
		// but guarded by try/catch for state instance compatibility.
		let state: EditorState;
		try {
			state = EditorState.create({
				doc: code,
				extensions: exts,
			});
		} catch (error) {
			// CDN-loaded custom extensions may carry incompatible state.
			// Retry with only local extensions.
			const localExts: Extension[] = [basicSetup];
			if (isExtension(langExt)) localExts.push(langExt);
			const themeExt = resolveTheme(theme);
			if (themeExt) localExts.push(themeExt);
			try {
				state = EditorState.create({
					doc: code,
					extensions: localExts,
				});
			} catch (innerError) {
				console.warn('CodeEditor: falling back to basicSetup only:', innerError);
				state = EditorState.create({
					doc: code,
					extensions: [basicSetup],
				});
			}
		}

	view = new EditorView({
		state,
		parent: container,
		dispatch: (tr: Transaction) => {
			if (!view) return;
			view.update([tr]);
			if (tr.docChanged) {
				const newCode = tr.newDoc.toString();
				onchange?.(new CustomEvent('change', { detail: newCode }));
			}
		},
	});
	}

	/**
	 * Updates the code content
	 * @param {string} newCode - New code to set
	 */
	function setCode(newCode: string) {
		if (view) {
			const changes = {
				from: 0,
				to: view.state.doc.length,
				insert: newCode,
			};
			view.dispatch({ changes });
		}
	}

	/**
	 * Gets the current code content
	 * @returns {string} Current code
	 */
	function getCode() {
		return view?.state.doc.toString() || code;
	}

	onMount(() => {
		if (container) {
		container.style.height = height;
		container.style.minHeight = height;
		container.style.overflow = 'hidden';
		container.style.border = '1px solid var(--color-border, #e5e7eb)';
		container.style.display = 'flex';
		container.style.flexDirection = 'column';
		}

		initializeEditor();

		return () => {
			if (view) {
				view.destroy();
				view = undefined;
			}
		};
	});
</script>

<div
	{...restProps}
	bind:this={container}
	class="code-editor-wrapper"
	style={`height: ${height}; min-height: ${height}; overflow: hidden; border: 1px solid var(--color-border, #e5e7eb); display: flex; flex-direction: column;`}
></div>

<style lang="postcss">
	@reference "../../twintrinsic.css";

	.code-editor-wrapper {
		font-family: 'Fira Code', 'Courier New', monospace;
		font-size: 14px;
	}

	/* Ensure editor fills the wrapper */
	.code-editor-wrapper :global(.cm-editor) {
		flex: 1;
	}

	.code-editor-wrapper :global(.cm-scroller) {
		overflow: auto;
	}

	/* Dark mode: automatic dark theme when no explicit theme is set */
	:global(.dark) .code-editor-wrapper :global(.cm-editor) {
		background-color: #1e1e2e;
		color: #cdd6f4;
	}

	:global(.dark) .code-editor-wrapper :global(.cm-editor) .cm-content {
		caret-color: #f5e0dc;
	}

	:global(.dark) .code-editor-wrapper :global(.cm-editor) .cm-cursor,
	:global(.dark) .code-editor-wrapper :global(.cm-editor) .cm-dropCursor {
		border-left-color: #f5e0dc;
	}

	:global(.dark) .code-editor-wrapper :global(.cm-editor).cm-focused .cm-selectionBackground,
	:global(.dark) .code-editor-wrapper :global(.cm-editor) .cm-selectionBackground,
	:global(.dark) .code-editor-wrapper :global(.cm-editor) .cm-content ::selection {
		background-color: #45475a;
	}

	:global(.dark) .code-editor-wrapper :global(.cm-editor) .cm-gutters {
		background-color: #181825;
		color: #6c7086;
		border-right: 1px solid #313244;
	}

	:global(.dark) .code-editor-wrapper :global(.cm-editor) .cm-activeLineGutter {
		background-color: #313244;
		color: #cdd6f4;
	}

	:global(.dark) .code-editor-wrapper :global(.cm-editor) .cm-activeLine {
		background-color: #31324422;
	}

	:global(.dark) .code-editor-wrapper :global(.cm-editor).cm-focused .cm-matchingBracket,
	:global(.dark) .code-editor-wrapper :global(.cm-editor).cm-focused .cm-nonmatchingBracket {
		background-color: #45475a88;
	}

	:global(.dark) .code-editor-wrapper :global(.cm-editor) .cm-foldPlaceholder {
		background-color: #45475a88;
		color: #cdd6f4;
		border: none;
	}

	:global(.dark) .code-editor-wrapper :global(.cm-editor) .cm-tooltip {
		border: 1px solid #313244;
		background-color: #1e1e2e;
	}
</style>
