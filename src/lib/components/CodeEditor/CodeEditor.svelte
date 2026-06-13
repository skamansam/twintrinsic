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
	async function loadLanguageSupport(lang: string): Promise<any | null> {
		if (isSsr) return null;
		/** @type {Record<string, string>} */
		const languageMap = {
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
		};  const packageName = languageMap[lang.toLowerCase() as keyof typeof languageMap];
		if (!packageName) {
			console.warn(`Language support for ${lang} not available`);
			return null;
		}

		try {
			const url = getCdnUrl(packageName);
			const module = (await import(/* @vite-ignore */ url)) as Record<string, unknown>;
			// Find the language function - it's typically the first exported function
			const langFn = Object.values(module).find((val: unknown) => typeof val === 'function');
			if (!langFn || typeof langFn !== 'function') {
				console.warn(`Could not find language function in ${packageName}`);
				return null;
			}
			return (langFn as () => unknown)();
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
		// Extensions are loaded dynamically from CDN, so we cast through unknown
		const state = EditorState.create({
			doc: code,
			extensions: exts,
		});

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
