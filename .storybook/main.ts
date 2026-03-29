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
    console.log("CONFIG TYPE", configType);
    const merged = mergeConfig(config, {
      base: configType === "PRODUCTION" ? "/storybook/" : "/",
      server: {
        path: "/storybook/",
        fs: {
          allow: [...(config.server?.fs?.allow || []), path.resolve(__dirname, "../stories")],
        },
      },
    });

    console.log("ViteFinal: ", merged);
    return merged;
  },
};
console.log("CONFIG", config);

export default config;
