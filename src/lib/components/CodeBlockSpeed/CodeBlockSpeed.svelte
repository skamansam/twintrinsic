<script lang="ts">
	import { highlightElement } from '@speed-highlight/core';
	import { detectLanguage } from '@speed-highlight/core/detect';
	import { onDestroy, onMount } from 'svelte';

	const {
		/** @type {string} - Code content to render when not using snippets */
		code: codeProp = '',
		/** @type {string} - The language for syntax highlighting */
		language = '',
		/** @type {string} - Additional CSS classes */
		class: className = '',
		/** @type {boolean} - Whether to show rendering time */
		showRenderTime = false,
		children,
	} = $props();

	// className is used in the template below

	let code = $state('');
	let copied = $state(false);
	let copyTimeout = $state();
	let codeElement = $state();
	let renderTime = $state(0);

	onMount(() => {
		if (!codeElement) return;

		code = codeProp || codeElement.textContent || '';

		const detectedLang = language || detectLanguage(code);

		codeElement.className = `shj-lang-${detectedLang}`;

		if (showRenderTime) {
			const startTime = performance.now();
			highlightElement(codeElement, detectedLang);
			const endTime = performance.now();
			renderTime = Math.round((endTime - startTime) * 100) / 100;
		} else {
			highlightElement(codeElement, detectedLang);
		}
	});

	onDestroy(() => {
		if (copyTimeout) {
			clearTimeout(copyTimeout);
		}
	});

	/**
	 * Copy code to clipboard
	 */
	async function copyCode() {
		if (copied) return;

		try {
			await navigator.clipboard.writeText(code);
			copied = true;

			copyTimeout = setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (error) {
			console.error('Failed to copy code:', error);
		}
	}
</script>

<div class="code-block-speed {className}">
	<span class="shj-lang-http shj-oneline" aria-hidden="true" hidden>
		<span class="shj-syn-kwd"></span>
	</span>
	<div class="code-header">
		<div class="code-header-left">
			{#if language}
				<div class="code-language">{language}</div>
			{/if}
			{#if showRenderTime && renderTime > 0}
				<div class="code-render-time">{renderTime}ms</div>
			{/if}
		</div>
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

	<pre class="code-pre"><code bind:this={codeElement}>
		{#if codeProp}
			{codeProp}
		{:else}
			{@render children?.()}
		{/if}
	</code></pre>
</div>

<style lang="postcss">
	@import '@speed-highlight/core/themes/default.css';
	@reference '../../twintrinsic.css';
	
	.code-block-speed {
		@apply relative my-4 rounded-lg overflow-hidden;
		@apply bg-surface border border-border;
	}

	.code-header {
		@apply flex items-center justify-between px-4 py-2;
		@apply bg-surface border-b border-border;
	}

	.code-header-left {
		@apply flex items-center gap-3;
	}

	.code-language {
		@apply text-xs font-mono text-muted;
	}

	.code-render-time {
		@apply text-xs font-mono text-primary-600 dark:text-primary-400;
		@apply px-2 py-1 rounded bg-primary-50 dark:bg-primary-900;
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

	:global(.shj-lang-http.shj-oneline .shj-syn-kwd) {}
</style>
