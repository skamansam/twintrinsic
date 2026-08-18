<script module lang="ts">
export const propsMetadata = [
  { name: "code", type: "string", description: "Initial code content", default: "''", optional: true },
  { name: "language", type: "string", description: "Language to use for syntax highlighting", default: "'javascript'", optional: true },
  { name: "theme", type: "string", description: "Theme name to apply", default: "'light'", optional: true },
  { name: "extensions", type: "string[]", description: "Array of extension URLs to load dynamically", default: "[]", optional: true },
  { name: "cdnSource", type: "'jsdelivr' | 'esm.sh' | 'unpkg'", description: "CDN source for loading extensions", default: "'esm.sh'", optional: true },
  { name: "onchange", type: "(event: CustomEvent<string>) => void", description: "Callback when code changes", optional: true, eventDetail: "string" },
  { name: "height", type: "string", description: "Height of the editor", default: "'400px'", optional: true },
];
</script>

<script lang="ts">
	import { EditorState, type Extension, type Transaction } from '@codemirror/state';
	import { EditorView, highlightActiveLineGutter, lineNumbers } from '@codemirror/view';
	import {basicSetup} from "codemirror";
	import { onMount } from 'svelte';

	interface Props {
		/** Initial code content */
		code?: string;
		/** Language to use for syntax highlighting */
		language?: string;
		/** Theme name to apply */
		theme?: string;
		/** Array of extension URLs to load dynamically */
		extensions?: string[];
		/** CDN source for loading extensions */
		cdnSource?: 'jsdelivr' | 'esm.sh' | 'unpkg';
		/** Callback when code changes */
		onchange?: (event: CustomEvent<string>) => void;
		/** Height of the editor */
		height?: string;
	}

	let {
		code = '',
		language = 'javascript',
		theme = 'light',
		extensions = [],
		cdnSource = 'esm.sh',
		onchange = undefined,
		height = '400px',
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
			const loader = languageLoaders[packageName];
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
	 * Loads theme dynamically
	 * @param {string} themeName - Theme name
	 * @returns {Promise<any|null>} Theme extension or null
	 */
	async function loadTheme(themeName: string): Promise<any | null> {
		if (isSsr) return null;
		/** @type {Record<string, string>} */
		const themeMap = {
			'one-dark': '@codemirror/theme-one-dark',
			'dracula': '@codemirror/theme-dracula',
			'material-dark': '@codemirror/theme-material-dark',
			'nord': '@codemirror/theme-nord',
			'solarized-light': '@codemirror/theme-solarized-light',
			'solarized-dark': '@codemirror/theme-solarized-dark',
			'sublime': '@codemirror/theme-sublime',
			'ayu-light': '@codemirror/theme-ayu-light',
			'ayu-dark': '@codemirror/theme-ayu-dark',
		};  const packageName = themeMap[themeName.toLowerCase() as keyof typeof themeMap];
		if (!packageName) {
			console.warn(`Theme ${themeName} not available`);
			return null;
		}		const nameParts = themeName.toLocaleLowerCase().split('-');
		if (nameParts.length > 1) {
			// camelCase the function name
			nameParts[1] = nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1);
		}
		const languageFunctionName: string = nameParts.join('');

		try {
			const url = getCdnUrl(packageName);
			const module = (await import(/* @vite-ignore */ url)) as Record<string, unknown>;
			const themeFn = (module[languageFunctionName] || module.default) as (() => unknown) | undefined;
			if (!themeFn) {
				console.warn(`Could not find theme function in ${packageName}`, module, languageFunctionName);
				return null;
			}
			return themeFn();
		} catch (error) {
			console.error(`Failed to load theme ${themeName}:`, error);
			return null;
		}
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

	async function initializeEditor(): Promise<void> {  const exts: Extension[] = [basicSetup];

		const langExt = await loadLanguageSupport(language);
		if (isExtension(langExt)) exts.push(langExt);

		if (theme !== 'light') {
			const themeExt = await loadTheme(theme);
			if (isExtension(themeExt)) exts.push(themeExt);
		}

		for (const extUrl of extensions) {
			const ext = await loadExtension(extUrl);
			if (isExtension(ext)) exts.push(ext);
		}

		// Extensions loaded dynamically from a CDN (themes, custom `extensions`
		// URLs, and languages without a local package) carry their own
		// `@codemirror/state` instance. Passing those into `EditorState.create`
		// throws "Unrecognized extension value ... multiple instances of
		// @codemirror/state are loaded". Fall back to `basicSetup` (which is
		// always local, hence compatible) instead of rejecting unhandled.
		let state: EditorState;
		try {
			state = EditorState.create({
				doc: code,
				extensions: exts,
			});
		} catch (error) {
			console.warn(
				'CodeEditor: dropping CDN-loaded extension(s) after an incompatible instance was detected:',
				error,
			);
			state = EditorState.create({
				doc: code,
				extensions: [basicSetup],
			});
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
			container.style.overflow = 'hidden';
			container.style.border = '1px solid var(--color-border, #e5e7eb)';
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
	bind:this={container}
	class="code-editor-wrapper"
	style={`height: ${height}; overflow: hidden; border: 1px solid var(--color-border, #e5e7eb);`}
></div>

<style lang="postcss">
	@reference "../../twintrinsic.css";

	.code-editor-wrapper {
		font-family: 'Fira Code', 'Courier New', monospace;
		font-size: 14px;
	}
</style>
