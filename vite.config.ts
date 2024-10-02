/// <reference types="histoire" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { HstSvelte } from '@histoire/plugin-svelte';

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
	// histoire: { plugins: [HstSvelte()], setupFile: '/histoire-setup.ts' }
});
