/// <reference types="histoire" />
import { sveltekit } from '@sveltejs/kit/vite';
import { HstSvelte } from '@histoire/plugin-svelte'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	// histoire: { plugins: [HstSvelte()], setupFile: '/histoire-setup.ts' }
};

export default config;
