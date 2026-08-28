/**
 * Starting-point color presets for the docs-only Theme Customizer.
 *
 * Mirrors the shipped default light/dark pair (`src/lib/twintrinsic.css`)
 * plus the demo-only theme families from `.storybook/themes.css` (brand,
 * high-contrast, and the color-vision-deficiency themes), flattened to a
 * single 500-shade-plus-neutrals record per light/dark pairing so the
 * customizer can seed its color pickers and hand them to `generateScale`.
 *
 * Not part of the public library export.
 */

export interface ThemeColors {
	primary: string
	secondary: string
	success: string
	warning: string
	error: string
	info: string
	background: string
	surface: string
	border: string
	text: string
	muted: string
}

export interface ThemeFamily {
	/** Stable id used as the `<select>` value and preset key prefix. */
	id: string
	/** Human-readable label for the dropdown. */
	label: string
}

export const THEME_FAMILIES: ThemeFamily[] = [
	{ id: "default", label: "Default (Purple / Indigo)" },
	{ id: "brand", label: "Brand (Teal / Cyan)" },
	{ id: "high-contrast", label: "High Contrast" },
	{ id: "protanopia", label: "Protanopia (red-blind safe)" },
	{ id: "deuteranopia", label: "Deuteranopia (green-blind safe)" },
	{ id: "tritanopia", label: "Tritanopia (blue/yellow-blind safe)" },
]

const BASE_LIGHT: ThemeColors = {
	primary: "#8b5cf6",
	secondary: "#6366f1",
	success: "#22c55e",
	warning: "#f59e0b",
	error: "#ef4444",
	info: "#3b82f6",
	background: "#ffffff",
	surface: "#f8fafc",
	border: "#e2e8f0",
	text: "#1e293b",
	muted: "#64748b",
}

const BASE_DARK: ThemeColors = {
	primary: "#8b5cf6",
	secondary: "#6366f1",
	success: "#059669",
	warning: "#d97706",
	error: "#dc2626",
	info: "#2563eb",
	background: "#0f172a",
	surface: "#1e293b",
	border: "#334155",
	text: "#f1f5f9",
	muted: "#94a3b8",
}

/** `{ light, dark }` color set for every theme family in {@link THEME_FAMILIES}. */
export const THEME_PRESETS: Record<string, { light: ThemeColors; dark: ThemeColors }> = {
	default: { light: BASE_LIGHT, dark: BASE_DARK },

	brand: {
		light: {
			...BASE_LIGHT,
			primary: "#14b8a6",
			secondary: "#06b6d4",
			background: "#f4fbfa",
			surface: "#e9f6f3",
			border: "#c9e5df",
			text: "#0f2e2a",
			muted: "#5c7a75",
		},
		dark: {
			...BASE_DARK,
			primary: "#14b8a6",
			secondary: "#06b6d4",
			background: "#071a17",
			surface: "#0f2e29",
			border: "#1d4942",
			text: "#e6fffa",
			muted: "#7ea9a0",
		},
	},

	"high-contrast": {
		light: {
			...BASE_LIGHT,
			primary: "#6d28d9",
			secondary: "#4338ca",
			success: "#15803d",
			warning: "#b45309",
			error: "#b91c1c",
			info: "#1d4ed8",
			background: "#ffffff",
			surface: "#ffffff",
			border: "#000000",
			text: "#000000",
			muted: "#444444",
		},
		dark: {
			...BASE_DARK,
			primary: "#7c3aed",
			secondary: "#4338ca",
			success: "#15803d",
			warning: "#b45309",
			error: "#b91c1c",
			info: "#1d4ed8",
			background: "#000000",
			surface: "#000000",
			border: "#ffffff",
			text: "#ffffff",
			muted: "#e5e5e5",
		},
	},

	protanopia: {
		light: { ...BASE_LIGHT, success: "#14b8a6", error: "#f97316" },
		dark: { ...BASE_DARK, success: "#14b8a6", error: "#f97316" },
	},

	deuteranopia: {
		light: { ...BASE_LIGHT, success: "#06b6d4" },
		dark: { ...BASE_DARK, success: "#06b6d4" },
	},

	tritanopia: {
		light: {
			...BASE_LIGHT,
			primary: "#d946ef",
			secondary: "#a855f7",
			warning: "#f97316",
			info: "#14b8a6",
		},
		dark: {
			...BASE_DARK,
			primary: "#d946ef",
			secondary: "#a855f7",
			warning: "#f97316",
			info: "#14b8a6",
		},
	},
}
