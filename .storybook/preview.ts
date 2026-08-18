import type { Preview } from "@storybook/sveltekit"
import { addons } from "storybook/internal/preview-api"
import { DOCS_RENDERED, GLOBALS_UPDATED, STORY_RENDERED } from "storybook/internal/core-events"
import "../src/lib/twintrinsic.css"
// Storybook-only demo themes (Brand, High Contrast, CVD + dark variants).
// These are NOT part of the shipped library CSS — see the header of
// themes.css for rationale. Also contains the `.sbdocs` overrides that
// make the autodocs page follow the selected theme.
import "./themes.css"

// Grouped light/dark theme picker.
//
// Instead of one flat 12-item dropdown, the toolbar exposes two dropdowns:
//   - Mode    (Light / Dark)
//   - Theme   (Default, Brand, High Contrast, Protanopia, Deuteranopia, Tritanopia)
// The decorator below composes both into the `data-theme` attribute (e.g.
// Dark + Brand → `data-theme="brand-dark"`). Storybook's core renders one
// toolbar dropdown per `globalTypes` entry that has a `toolbar` config, so no
// custom manager code is needed.
const THEMES: Record<string, Record<string, string>> = {
  light: {
    default: "light",
    brand: "brand",
    "high-contrast": "high-contrast",
    protanopia: "protanopia",
    deuteranopia: "deuteranopia",
    tritanopia: "tritanopia",
  },
  dark: {
    default: "dark",
    brand: "brand-dark",
    "high-contrast": "high-contrast-dark",
    protanopia: "protanopia-dark",
    deuteranopia: "deuteranopia-dark",
    tritanopia: "tritanopia-dark",
  },
}

const withThemePicker: Preview["decorators"][number] = (storyFn, context) => {
  const { themeMode = "light", themeVariant = "default" } = context.globals
  const theme = THEMES[themeMode]?.[themeVariant] ?? "light"
  document.documentElement.setAttribute("data-theme", theme)
  return storyFn()
}

// Storybook renders the Docs page (autodocs) WITHOUT running global
// decorators, and stories mounted in Docs canvases (e.g. the ThemeToggle
// inside App) can clobber the `data-theme` attribute on the shared
// documentElement. So on top of the decorator (which handles the story
// canvas), we subscribe to the preview channel and re-apply the composed
// theme whenever globals change or a story/docs render finishes. This
// keeps the theme picker authoritative in BOTH view modes.
let currentTheme = "light"

function applyTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme)
}

if (typeof window !== "undefined") {
  const channel = addons.getChannel()
  if (channel) {
    channel.on(GLOBALS_UPDATED, ({ globals }: { globals: Record<string, string> }) => {
      const { themeMode = "light", themeVariant = "default" } = globals
      currentTheme = THEMES[themeMode]?.[themeVariant] ?? "light"
      applyTheme()
    })

    // Re-apply after every render — docs pages don't run the decorator,
    // and mounted components (ThemeToggle) may have removed the attribute.
    channel.on(STORY_RENDERED, applyTheme)
    channel.on(DOCS_RENDERED, applyTheme)

    // Apply once at startup (the channel may already be connected).
    applyTheme()
  }
}

const preview: Preview = {
  decorators: [withThemePicker],

  // Two toolbar dropdowns: Mode (light/dark) + Theme (variant). The `dark:`
  // custom variant in twintrinsic.css matches any `data-theme` value ending
  // in `-dark`, so dark-mode utilities engage automatically for every dark
  // combination.
  globalTypes: {
    themeMode: {
      name: "Mode",
      description: "Light or dark mode",
      toolbar: {
        icon: "mirror",
        dynamicTitle: true,
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
      },
    },
    themeVariant: {
      name: "Theme",
      description: "Theme variant",
      toolbar: {
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "default", title: "Default" },
          { value: "brand", title: "Brand" },
          { value: "high-contrast", title: "High Contrast" },
          { value: "protanopia", title: "Protanopia" },
          { value: "deuteranopia", title: "Deuteranopia" },
          { value: "tritanopia", title: "Tritanopia" },
        ],
      },
    },
  },

  initialGlobals: {
    themeMode: "light",
    themeVariant: "default",
  },

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
