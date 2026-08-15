// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from "@storybook/sveltekit";
import { defineMain } from "@storybook/sveltekit/node";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import type { UserConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineMain({
  framework: "@storybook/sveltekit",
  stories: [
    // "../src/**/*.(stories|story).@(js|ts|svelte|mdx)",
    "../stories/**/*.(stories|story).@(js|ts|svelte|mdx)",
  ],
  addons: [
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-mcp",
    "@storybook/addon-vitest",
  ],
  async viteFinal(config, { configType }) {
    const { mergeConfig, searchForWorkspaceRoot } = await import("vite");
    const thisConfig: UserConfig = {
      resolve: {
        alias: [
          // `$lib` is normally provided by the SvelteKit vite plugin
          // (`sveltekit()`), which is NOT present in the vitest browser
          // server — the addon runs this viteFinal against a bare `{ root }`
          // config and the top-level `sveltekit()` in vitest.config.ts does
          // not propagate into the project server. Without this alias every
          // story's `$lib/components/...` import fails resolution.
          {
            find: "$lib",
            replacement: path.resolve(__dirname, "../src/lib"),
          },
          // `@iconify/svelte` exports only the `svelte`/`types` conditions
          // for its `"."` specifier. The addon's dep-scan conditions omit
          // `svelte`, so the bare import fails to resolve in the browser
          // server. Point it at the raw .svelte entry (compiled by
          // vite-plugin-svelte).
          {
            find: /^@iconify\/svelte$/,
            replacement: path.resolve(
              __dirname,
              "../node_modules/@iconify/svelte/dist/Icon.svelte",
            ),
          },
        ],
      },
      server: {
        fs: {
          // Vite's default allow is searchForWorkspaceRoot(root) — for this
          // pnpm workspace that resolves to the workspace root and thereby
          // permits the hoisted `node_modules` (outside the project root).
          // @storybook/addon-vitest runs this viteFinal hook with a bare
          // `{ root }` config, so `config.server.fs.allow` is empty here and
          // without re-adding the workspace root the allow list collapses to
          // only `stories` — the vitest browser client scripts under
          // `node_modules/@vitest/browser/dist/client/` then 404 and the
          // page never boots its orchestrator (session times out).
          allow: [
            searchForWorkspaceRoot(process.cwd()),
            path.resolve(__dirname, ".."),
            ...(config.server?.fs?.allow || []),
            path.resolve(__dirname, "../stories"),
          ],
        },
      },
      // `@iconify/svelte` exports only the `svelte`/`types` conditions for
      // its `"."` specifier. The Storybook addon's dep-scan conditions
      // (["storybook","stories","test","module","browser","development",
      // "import"]) omit `svelte`, so the bare import fails to resolve and
      // the storybook core server (booted by `storybookTest`) crashes on a
      // cold Vite cache. IMPORTANT: do NOT re-add `svelte` via
      // `resolve.conditions` — that *replaces* the default conditions
      // (including `browser`) and makes the `svelte` package resolve to its
      // server entry (`src/index-server.js`), which throws
      // `lifecycle_function_unavailable` and breaks the whole preview.
      // Excluding it from pre-bundling is the safe native fix.
      optimizeDeps: {
        exclude: ["@iconify/svelte"],
      },
    };
    // The `/storybook/` base must apply ONLY to production builds (the
    // static output served under `/storybook/` on the docs site).
    // @storybook/addon-vitest runs this viteFinal hook in DEVELOPMENT mode
    // for the vitest browser server; applying the base there breaks
    // vitest's own browser client serving — every `__vitest_browser__/*`
    // and `@fs/*` script 404s ("The server is configured with a public base
    // URL of /storybook/...") and the session never connects.
    if (configType === "PRODUCTION") {
      thisConfig.base = "/storybook/";
    }
    return mergeConfig(config, thisConfig);
  },
});
