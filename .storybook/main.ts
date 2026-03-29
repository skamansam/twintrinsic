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

  viteFinal: (config, { configType }) => {
    return {
      ...config,
      ...(configType === "PRODUCTION" && { base: "/storybook/" }),
      server: {
        ...config.server,
        fs: {
          allow: [...(config.server?.fs?.allow || []), path.resolve(__dirname, "../stories")],
        },
      },
    };
  },
};

export default config;
