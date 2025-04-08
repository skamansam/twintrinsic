import type { StorybookConfig } from "@storybook/sveltekit"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|ts|svelte)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    "@storybook/addon-mdx-gfm",
  ],

  framework: {
    name: "@storybook/sveltekit",
    options: {},
  },

  docs: {
    autodocs: true,
  },
}
export default config
