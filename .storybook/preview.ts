import type { Preview } from "@storybook/sveltekit"
import "../src/lib/twintrinsic.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ["autodocs"]
}

export default preview
