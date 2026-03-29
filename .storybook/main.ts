import type { StorybookConfig } from "@storybook/sveltekit";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|ts|svelte|mdx)"],
  addons: ["@storybook/addon-svelte-csf", "@chromatic-com/storybook", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/sveltekit",
    options: {},
  },

  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import("vite");

    const merged = mergeConfig(config, {
      server: {
        fs: {
          allow: [...(config.server?.fs?.allow || []), path.resolve(__dirname, "../stories")],
        },
      },
    });

    if (configType === "PRODUCTION") {
      merged.base = "/storybook/";
    }

    return merged;
  },
};

export default config;
