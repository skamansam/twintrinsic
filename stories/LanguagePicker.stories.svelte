<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, fireEvent, waitFor, within } from "storybook/test"
// The REAL compiled runtime — imported here so the RuntimeAutodetection
// story can assert the picker auto-detected *these* locales/locale, rather
// than anything passed through props.
import * as paraglide from "$lib/paraglide/runtime.js"
import LanguagePicker from "$lib/components/LanguagePicker/LanguagePicker.svelte"

const { Story } = defineMeta({
  title: "Utility/LanguagePicker",
  component: LanguagePicker,
  tags: ["autodocs"],
  argTypes: {
    locales: { control: "object", description: "Locale codes to offer; defaults to the Paraglide runtime's locales" },
    ariaLabel: { control: "text" },
  },
  args: {},
})

/**
 * Wait until every menu item's circle-flags SVG has actually rendered.
 * Iconify injects each `<svg>` asynchronously after fetching icon data,
 * so a plain count immediately after opening the menu sees zero.
 */
async function expectFlags(menu) {
  await waitFor(() => {
    const flags = menu.querySelectorAll("svg[class*='_iconset-circle-flags']")
    expect(flags.length).toBe(menu.querySelectorAll(".language-picker-item").length)
  })
}
</script>

<Story
  name="Default"
  play={async ({ canvas }) => {
    // The picker renders once the Paraglide runtime resolves
    const trigger = await canvas.findByRole("button", { name: /change language/i })
    await expect(trigger).toBeInTheDocument()
    // The trigger shows the current language's flag (an SVG, not text)
    await waitFor(() => {
      expect(trigger.querySelector("svg")).not.toBeNull()
    })
  }}
/>

<Story
  name="OpenMenu"
  play={async ({ canvas }) => {
    const trigger = await canvas.findByRole("button", { name: /change language/i })
    await fireEvent.click(trigger)

    const menu = canvas.getByRole("menu")
    await expect(menu).toBeInTheDocument()
    await expect(canvas.getByRole("menuitemradio", { name: "English" })).toHaveAttribute("aria-checked", "true")
    await expect(canvas.getByRole("menuitemradio", { name: "Español" })).toHaveAttribute("aria-checked", "false")
    await expect(canvas.getByRole("menuitemradio", { name: "فارسی" })).toHaveAttribute("aria-checked", "false")

    // Every item renders a flag from the circle-flags iconset (async load)
    await expectFlags(menu)

    await fireEvent.click(canvas.getByRole("menuitemradio", { name: "English" }))
  }}
/>

<Story
  name="CustomLocales"
  args={{ locales: ["en", "fa"] }}
  play={async ({ canvas }) => {
    const trigger = await canvas.findByRole("button", { name: /change language/i })
    await fireEvent.click(trigger)

    await expect(canvas.getByRole("menuitemradio", { name: "English" })).toBeInTheDocument()
    await expect(canvas.getByRole("menuitemradio", { name: "فارسی" })).toBeInTheDocument()
    await expect(canvas.queryByRole("menuitemradio", { name: "Español" })).not.toBeInTheDocument()

    await fireEvent.click(canvas.getByRole("menuitemradio", { name: "English" }))
  }}
/>

<Story
  name="KeyboardNavigation"
  play={async ({ canvas }) => {
    const trigger = await canvas.findByRole("button", { name: /change language/i })
    await fireEvent.click(trigger)

    const first = canvas.getByRole("menuitemradio", { name: "English" })
    const second = canvas.getByRole("menuitemradio", { name: "Español" })
    const third = canvas.getByRole("menuitemradio", { name: "فارسی" })

    // WAI-ARIA APG: the checked item receives focus when the menu opens
    await waitFor(() => {
      expect(first).toHaveFocus()
    })

    // ArrowDown moves forward…
    await fireEvent.keyDown(first, { key: "ArrowDown" })
    await expect(second).toHaveFocus()
    // …wraps from the last item back to the first…
    await fireEvent.keyDown(second, { key: "ArrowDown" })
    await fireEvent.keyDown(third, { key: "ArrowDown" })
    await expect(first).toHaveFocus()
    // …and ArrowUp from the top wraps to the last item.
    await fireEvent.keyDown(first, { key: "ArrowUp" })
    await expect(third).toHaveFocus()

    // Home/End jump to the extremes.
    await fireEvent.keyDown(third, { key: "Home" })
    await expect(first).toHaveFocus()
    await fireEvent.keyDown(first, { key: "End" })
    await expect(third).toHaveFocus()

    // Escape closes the menu.
    await fireEvent.keyDown(third, { key: "Escape" })
    await waitFor(() => {
      expect(canvas.queryByRole("menu")).not.toBeInTheDocument()
    })
  }}
/>

<Story
  name="RuntimeAutodetection"
  play={async ({ canvas }) => {
    // Source of truth: the REAL compiled Paraglide runtime imported above.
    // These are exactly what the picker should autodetect.
    const expectedLocales = [...paraglide.locales]
    const expectedActive = paraglide.getLocale()

    // With no `locales` prop, the trigger appears only once the runtime has
    // been resolved through the component's `import.meta.glob` autodetection
    // — findByRole waits for that dynamic import to land. (The previous
    // `import(/* @vite-ignore */ …)` approach could never resolve under
    // Vite, so this story would hang here — it is the regression guard.)
    const trigger = await canvas.findByRole("button", { name: /change language/i })
    await expect(trigger).toHaveAttribute("aria-label", `Change language (${expectedActive})`)

    await fireEvent.click(trigger)
    const menu = canvas.getByRole("menu")

    // Every runtime locale is offered — matched via each item's `lang`
    // attribute so this stays valid as locales are added — and exactly the
    // runtime's active locale is checked.
    const items = menu.querySelectorAll('[role="menuitemradio"]')
    await expect(items.length).toBe(expectedLocales.length)
    for (const item of items) {
      expect(expectedLocales).toContain(item.getAttribute("lang"))
    }
    await expect(menu.querySelector('[role="menuitemradio"][aria-checked="true"]')).toHaveAttribute(
      "lang",
      expectedActive,
    )

    // Flags render asynchronously from the circle-flags iconset.
    await expectFlags(menu)

    // Close via Escape: focus returns to the trigger (WAI-ARIA APG). Note
    // the picker intentionally no-ops when the already-active locale is
    // clicked (switchLocale early-returns), so Escape is the deterministic
    // close path here.
    const activeItem = menu.querySelector(`[role="menuitemradio"][lang="${expectedActive}"]`)
    await fireEvent.keyDown(activeItem, { key: "Escape" })
    await waitFor(() => {
      expect(canvas.queryByRole("menu")).not.toBeInTheDocument()
    })
    await expect(trigger).toHaveFocus()
  }}
/>
