<script lang="ts">
	import { EditorState } from '@codemirror/state';
	import { EditorView } from '@codemirror/view';
	import { onMount } from 'svelte';

	const {
		/** @type {string} - Initial code content */
		code = '',
		/** @type {string} - Language to use for syntax highlighting */
		language = 'javascript',
		/** @type {string} - Theme name to apply */
		theme = 'light',
		/** @type {string[]} - Array of extension URLs to load dynamically */
		extensions = [],
		/** @type {'jsdelivr' | 'esm.sh' | 'unpkg'} - CDN source for loading extensions */
		cdnSource = 'esm.sh',
		/** @type {(event: CustomEvent<string>) => void | undefined} - Callback when code changes */
		onchange = undefined,
		/** @type {string} - Height of the editor */
		height = '400px',
	} = $props();

	/** @type {HTMLDivElement | undefined} */
	let container;
	/** @type {any} */
	let view;

	/**
	 * Constructs the CDN URL for loading a package
	 * @param {string} packageName - Package name
	 * @param {string} version - Package version
	 * @returns {string} CDN URL
	 */
	function getCdnUrl(packageName, version = 'latest') {
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
	 * @returns {Promise<any|null>} Loaded extension or null
	 */
	async function loadExtension(extensionUrl) {
		try {
			const module = await import(/* @vite-ignore */ extensionUrl);
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
	async function loadLanguageSupport(lang) {
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
		};

		const packageName = languageMap[lang.toLowerCase()];
		if (!packageName) {
			console.warn(`Language support for ${lang} not available`);
			return null;
		}

		try {
			const url = getCdnUrl(packageName);
			const module = await import(/* @vite-ignore */ url);
			const langFn = module[lang.toLowerCase()] || module.default;
			return langFn?.() || null;
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
	async function loadTheme(themeName) {
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
		};

		const packageName = themeMap[themeName.toLowerCase()];
		if (!packageName) {
			console.warn(`Theme ${themeName} not available`);
			return null;
		}

		try {
			const url = getCdnUrl(packageName);
			const module = await import(/* @vite-ignore */ url);
			const themeFn = module[themeName.toLowerCase().replace(/-/g, '')] || module.default;
			return themeFn || null;
		} catch (error) {
			console.error(`Failed to load theme ${themeName}:`, error);
			return null;
		}
	}

	/**
	 * Initializes the editor with all extensions
	 */
	async function initializeEditor() {
		const exts = [];

		const langExt = await loadLanguageSupport(language);
		if (langExt) exts.push(langExt);

		if (theme !== 'light') {
			const themeExt = await loadTheme(theme);
			if (themeExt) exts.push(themeExt);
		}

		for (const extUrl of extensions) {
			const ext = await loadExtension(extUrl);
			if (ext) exts.push(ext);
		}

		exts.push(EditorView.lineNumbers());
		exts.push(EditorView.highlightActiveLineGutter());
		exts.push(EditorView.foldGutter());

		const state = EditorState.create({
			doc: code,
			extensions: exts,
		});

		view = new EditorView({
			state,
			parent: container,
			dispatch: (/** @type {any} */ tr) => {
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
	function setCode(newCode) {
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
		initializeEditor();

		return () => {
			if (view) {
				view.destroy();
			}
		};
	});
</script>

<div
	bind:this={container}
	class="code-editor-wrapper"
	style="height: {height}; overflow: hidden; border: 1px solid var(--color-border, #e5e7eb);"
></div>

<style lang="postcss">
	@reference "../../twintrinsic.css";

	.code-editor-wrapper {
		font-family: 'Fira Code', 'Courier New', monospace;
		font-size: 14px;
	}
</style>
