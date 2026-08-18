import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers.js";

/**
 * Docs-site smoke for the Theme Preview page
 * (/docs/theming/preview). Verifies all 12 built-in themes render
 * side-by-side, each scoped by its own data-theme wrapper.
 */
test.describe("Theme preview page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs/theming/preview");
    await waitForHydration(page);
  });

  test("renders the Theme Preview heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Theme Preview", level: 1 })).toBeVisible();
  });

  test("renders all 12 themes as scoped data-theme panels", async ({ page }) => {
    const expectedThemes = [
      "light",
      "dark",
      "brand",
      "brand-dark",
      "high-contrast",
      "high-contrast-dark",
      "protanopia",
      "protanopia-dark",
      "deuteranopia",
      "deuteranopia-dark",
      "tritanopia",
      "tritanopia-dark",
    ];

    // Panels are the data-theme divs that carry one of the 12 theme values.
    // The docs <html> element also carries a data-theme attribute (set by
    // ThemeToggle), so filter to only the panel values.
    const panelValues = await page.$$eval("[data-theme]", (els) =>
      els
        .map((el) => el.getAttribute("data-theme"))
        .filter((v): v is string => !!v)
        .filter((v) =>
          [
            "light",
            "dark",
            "brand",
            "brand-dark",
            "high-contrast",
            "high-contrast-dark",
            "protanopia",
            "protanopia-dark",
            "deuteranopia",
            "deuteranopia-dark",
            "tritanopia",
            "tritanopia-dark",
          ].includes(v),
        ),
    );

    expect(panelValues.sort()).toEqual([...expectedThemes].sort());
  });

  test("each theme panel applies its own background color", async ({ page }) => {
    // The light and brand panels are light; the dark variants must be dark.
    // Compare computed backgrounds to ensure the scoping actually works.
    const backgrounds = await page.evaluate(() => {
      const pick = (theme: string) => {
        const el = document.querySelector(`[data-theme="${theme}"]`);
        if (!el) return null;
        return getComputedStyle(el).backgroundColor;
      };
      return {
        light: pick("light"),
        brand: pick("brand"),
        dark: pick("dark"),
        brandDark: pick("brand-dark"),
        highContrast: pick("high-contrast"),
        highContrastDark: pick("high-contrast-dark"),
      };
    });

    expect(backgrounds.dark).not.toBeNull();
    expect(backgrounds.light).not.toBeNull();

    // Dark variants must resolve to a dark background (rgb with low values).
    const isDark = (rgb: string | null) => {
      if (!rgb) return false;
      const [, r, g, b] = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/) || [];
      return Number(r) + Number(g) + Number(b) < 200;
    };

    expect(isDark(backgrounds.dark)).toBe(true);
    expect(isDark(backgrounds.brandDark)).toBe(true);
    expect(isDark(backgrounds.highContrastDark)).toBe(true);
    expect(isDark(backgrounds.light)).toBe(false);
    expect(isDark(backgrounds.brand)).toBe(false);
    expect(isDark(backgrounds.highContrast)).toBe(false);
  });
});
