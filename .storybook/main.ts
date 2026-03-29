import type { StorybookConfig } from "@storybook/sveltekit";
import { defineMain } from "@storybook/sveltekit/node";
import path from "path";
import { fileURLToPath } from "url";

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
    "@storybook/addon-mcp",
  ],
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import("vite");
    console.log("CONFIG TYPE", configType);
    const thisConfig: StorybookConfig = {
      server: {
        fs: {
          allow: [...(config.server?.fs?.allow || []), path.resolve(__dirname, "../stories")],
        },
      },
    };
    if (configType === "DEVELOPMENT") {
      // Your development configuration goes here
    }
    if (configType === "PRODUCTION") {
      // Your production configuration goes here.
      thisConfig.base = "/storybook/";
    }
    return mergeConfig(config, thisConfig);
  },
});
