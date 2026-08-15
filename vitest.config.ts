import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";
import { searchForWorkspaceRoot } from "vite";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Two projects, each in its own pool:
//
//   - `unit`      — jsdom env, runs tests/unit/** (Vitest + @testing-library/svelte).
//   - `storybook` — browser env via Playwright, runs every story registered
//                   in `.storybook/main.ts` as a render test (stories with a
//                   `play` function become interaction tests).
//
// Top-level vite plugins (tailwindcss + sveltekit) are required for both
// projects: the unit project needs them to compile Svelte components with
// the proper SSR/client environment, and the storybook project inherits
// the same resolution setup so the addon's transformed test files can
// resolve `$lib/*`, `$app/*`, and tailwind classes.
//
// CLI:
//   pnpm test:unit      → vitest run --project=unit
//   pnpm test:storybook → vitest --project=storybook --run
export default defineConfig({
  // The vitest browser server runs in `middlewareMode` on the MAIN vite
  // server, so its `server.fs.allow` resolves from THIS root config — NOT
  // from the storybook project's `viteFinal` (which only reaches the
  // project config via the addon's merge). Without the pnpm workspace
  // root here, the browser client scripts under the hoisted `node_modules`
  // (`@fs/...` and `__vitest_browser__/*`) 404, the page never boots its
  // orchestrator, and the session times out. (Verified empirically: adding
  // the allow-list to `.storybook/main.ts` viteFinal had no effect.)
  server: {
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        path.resolve(__dirname, ".."),
        path.resolve(__dirname, "../stories"),
      ],
    },
  },
  plugins: [
    tailwindcss(),
    sveltekit({
      vitePlugin: {
        compilerOptions: {
          dev: true,
          css: "injected",
        },
        // Disable the Svelte dev inspector in tests: its runtime
        // (load-inspector.js) calls `mount()` at import time, which
        // resolves `svelte` to the server entry inside the optimized
        // browser bundle and throws `lifecycle_function_unavailable`.
        inspector: false,
      },
    }),
  ],
  // CRITICAL: do NOT force-prebundle @storybook/* packages. The aborted
  // `__vitest_browser__/*.js` requests (net::ERR_ABORTED) are dep-optimizer
  // output; forcing `@storybook/addon-vitest`/`@storybook/sveltekit` into
  // optimizeDeps.include makes rolldown prebundle modules that reference
  // `import.meta.env.__STORYBOOK_URL__` / `vitest/browser`, the optimizer
  // fails and restarts, and every in-flight request to optimizer output is
  // aborted — the browser page never signals ready. Excluding them (like
  // `@iconify/svelte`) serves them on-demand, which is proven to work.
  // NOTE: root-level `optimizeDeps` does NOT propagate into Vitest 4
  // project servers — it only affects the root/unit project. The browser
  // server's optimizer config is assembled by the addon itself.
  optimizeDeps: {
    // `storybook` also excluded: the plugin force-includes
    // `storybook/preview-api` (a separate package) which likewise trips the
    // rolldown optimizer. On-demand transform is proven safe.
    exclude: [
      "@iconify/svelte",
      "@storybook/addon-vitest",
      "@storybook/svelte",
      "@storybook/sveltekit",
      "storybook",
    ],
  },
  // NOTE: do NOT add `svelte` to `resolve.conditions` here. In Vite,
  // `resolve.conditions` *replaces* the default condition set (including
  // `browser`), which makes the `svelte` package itself resolve to its
  // server entry (`src/index-server.js`) — `mount()` then throws
  // `lifecycle_function_unavailable` and the browser page never signals
  // the test session ready. The regex alias below fixes `@iconify/svelte`
  // (whose exports map exposes only `svelte`/`types` for `.`, which the
  // addon's dep-scan conditions omit) without touching resolution of the
  // `svelte` package.
  resolve: {
    alias: [
      { find: "$lib", replacement: path.resolve(__dirname, "./src/lib") },
      {
        find: /^@iconify\/svelte$/,
        replacement: path.resolve(
          __dirname,
          "node_modules/@iconify/svelte/dist/Icon.svelte",
        ),
      },
    ],
  },
  define: {
    "process.env.BROWSER": "true",
  },
  test: {
    // Root-level browser options ARE what BrowserSessions.createSession
    // reads for the connect timeout (`project.vitest.config.browser` = the
    // Vitest instance's ROOT config, not the per-project browser config),
    // so `connectTimeout` must live HERE to take effect. `enabled` stays
    // default (false) so node projects are unaffected; the storybook
    // project enables the browser pool itself. Pinning `api.port` lets us
    // inspect the served test page while a run is in flight.
    browser: {
      connectTimeout: 180_000,
      api: { port: 5199, strictPort: true },
    },
    projects: [
      {
        plugins: [
          svelte({
            compilerOptions: {
              dev: true,
              css: "injected",
            },
            inspector: false,
          }),
        ],
        // Svelte 5.56's `exports` map for `.` exposes only `worker` /
        // `browser` / `default` conditions (no `import` or `svelte`
        // condition). Both Node's native ESM loader (used for externalized
        // deps) and Vite's SSR-style resolver (default conditions omit
        // `browser`) therefore resolve the bare `svelte` specifier to
        // `src/index-server.js`, where `mount()` throws
        // `lifecycle_function_unavailable` — breaking every
        // `@testing-library/svelte` render. Pin the bare specifier to the
        // client entry so components can be mounted in jsdom. The regex
        // anchor (`^svelte$`) keeps `svelte/internal/*` and other subpath
        // exports (which compiled components rely on) resolving through the
        // real package.
        resolve: {
          alias: [
            {
              find: /^svelte$/,
              replacement: path.resolve(
                __dirname,
                "node_modules/svelte/src/index-client.js",
              ),
            },
          ],
        },
        test: {
          name: "unit",
          globals: true,
          environment: "jsdom",
          include: ["tests/unit/**/*.test.{js,ts}"],
          setupFiles: ["./tests/vitest.setup.ts"],
          alias: {
            $lib: path.resolve(__dirname, "./src/lib"),
          },
          server: {
            deps: {
              // Inline the testing-library chain (not just `svelte`) so its
              // `import * as Svelte from 'svelte'` is resolved through Vite's
              // resolver — where the `^svelte$` alias above applies — instead
              // of Node's native ESM loader, which would still pick the
              // server entry.
              inline: [
                "svelte",
                "@testing-library/svelte",
                "@testing-library/svelte-core",
              ],
            },
          },
        },
      },
      {
        plugins: [
          // CRITICAL: the browser server resolves with NO svelte plugin when
          // only the top-level `sveltekit()` is configured — Vitest 4 projects
          // do not propagate the root plugins array into each project's server,
          // and @storybook/addon-vitest's config hook filters out the
          // framework's own vite-plugin-svelte (it expects the host config to
          // provide it). Without an explicit `svelte()` here, the addon's setup
          // files import @storybook/svelte's RAW .svelte renderer files
          // (PreviewRender.svelte, DecoratorHandler.svelte) and
          // @storybook/sveltekit/static/MockProvider.svelte, which reach
          // `vite:import-analysis` untransformed and fail every story with
          // 'invalid JS syntax'. Matching the unit project's plugin options
          // (dev + css: injected, no inspector).
          svelte({
            compilerOptions: {
              dev: true,
              css: "injected",
            },
            inspector: false,
          }),
          storybookTest({
            configDir: path.join(__dirname, ".storybook"),
            // No `storybookScript`: the addon only needs it to boot the
            // Storybook dev server for watch-mode debug links, and per the
            // addon docs it is not required for headless CI runs. Leaving it
            // unset avoids a stray `pnpm storybook` process competing with
            // the vitest browser server for port 6006.
          }),
        ],
        test: {
          name: "storybook",
          isolate: false,
          hookTimeout: 60_000,
          testTimeout: 120_000,
          browser: {
            enabled: true,
            headless: true,
            // NOTE: per-project `connectTimeout` is DEAD config — vitest's
            // session timeout reads the ROOT `test.browser.connectTimeout`.
            provider: playwright({
              launchOptions: { args: ["--no-sandbox"], dumpio: true },
            }),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
