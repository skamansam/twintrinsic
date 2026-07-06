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
    // Per the E2E → Storybook migration plan § 9.3, run axe-core
    // automatically against every story render. `@storybook/addon-a11y`
    // defaults to WCAG 2.1 A + AA; we re-assert color-contrast so a
    // regression in the rule shows up even when other rules are later
    // downgraded for component-specific reasons.
    a11y: {
      config: { rules: [{ id: "color-contrast", enabled: true }] },
      options: { restoreScroll: true },
    },
  },

  tags: ["autodocs"]
}

export default preview
