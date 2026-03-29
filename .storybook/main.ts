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

    return mergeConfig(config, {
      ...(configType === "PRODUCTION" && { base: "/storybook/" }),
      server: {
        fs: {
          allow: [...(config.server?.fs?.allow || []), path.resolve(__dirname, "../stories")],
        },
      },
    });
  },
};

export default config;
