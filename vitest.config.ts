import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";
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
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: {
    // Per Storybook Issue #33067, browser-mode Vitest fails to find the
    // addon runner if these packages aren't pre-bundled by Vite. Listing
    // them at the top-level optimizeDeps.include (covers both projects)
    // is the documented fix path; the @storybook/sveltekit framework
    // package must also be present so the addon's iframe-helper
    // resolves at runtime.
    include: [
      "@storybook/addon-vitest",
      "@storybook/sveltekit",
    ],
    // @iconify/svelte's `exports."."` only resolves under "svelte" + "types"
    // conditions. Vite 8's dep-scan rejects the Storybook/Vitest conditions
    // ("storybook", "stories", "test", "browser", "development") and the
    // build fails before the browser runner can be served. Excluding it
    // lets Vite load the package as-is at runtime.
    exclude: ["@iconify/svelte"],
  },
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, "./src/lib"),
    },
  },
  define: {
    "process.env.BROWSER": "true",
  },
  test: {
    projects: [
      {
        plugins: [svelte()],
        test: {
          name: "unit",
          globals: true,
          environment: "jsdom",
          include: ["tests/unit/**/*.test.{js,ts}"],
          setupFiles: ["./tests/vitest.setup.ts"],
          alias: {
            $lib: path.resolve(__dirname, "./src/lib"),
          },
        },
      },
      {
        plugins: [
          // Transforms the stories from .storybook/main.ts into test files
          // and registers the addon's setup files for this project.
          storybookTest({
            configDir: path.join(__dirname, ".storybook"),
            // --ci flag is critical: without it, `pnpm storybook` may
            // emit buffered/interactive output that prevents the addon's
            // ready-signal detector from firing. Explicit `--port 6006`
            // keeps the iframe URL stable so browser-provider's
            // `openPage()` navigates to a real endpoint.
            storybookScript: "pnpm storybook --ci --no-open --port 6006",
          }),
        ],
        test: {
          name: "storybook",
          // Race-condition mitigators per web/docs research:
          // - `isolate: false` prevents per-file env-spawn race on first
          //   connect (Storybook addon runs in a single shared worker).
          // - `hookTimeout: 60_000` covers Storybook cold-compile
          //   (paraglide-js + manager/preview).
          // - `testTimeout: 120_000` gives the addon time to inject the
          //   `data-vitest="true"` iframe into the preview before the
          //   per-test timeout fires.
          isolate: false,
          hookTimeout: 60_000,
          testTimeout: 120_000,
          browser: {
            enabled: true,
            headless: true,
            // --no-sandbox for headless Chromium on Linux without a
            // user namespace; the Playwright Docker image sets this
            // automatically at the container layer.
            provider: playwright({
              launchOptions: { args: ["--no-sandbox"] },
            }),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
