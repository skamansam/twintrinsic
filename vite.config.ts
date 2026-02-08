/// <reference types="histoire" />
/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

const config = {
	plugins: [sveltekit(), tailwindcss()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
	// histoire: { plugins: [HstSvelte()], setupFile: '/histoire-setup.ts' }
};

export default config;
