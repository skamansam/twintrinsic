/**
 * Color math helpers for the docs-only Theme Customizer.
 *
 * Not part of the public library API — these live under `src/routes` so the
 * generated color scales stay a documentation concern, not a shipped export.
 */

/** RGB channel values (0-255). */
export interface RGB {
	r: number
	g: number
	b: number
}

/** Hue (0-360), saturation and lightness (0-100). */
export interface HSL {
	h: number
	s: number
	l: number
}

/**
 * Parses a `#rgb` or `#rrggbb` hex string into RGB channels.
 * Falls back to black if the string can't be parsed.
 */
export function hexToRgb(hex: string): RGB {
	const normalized = hex.replace("#", "").trim()
	const full =
		normalized.length === 3
			? normalized
					.split("")
					.map((c) => c + c)
					.join("")
			: normalized.padEnd(6, "0").slice(0, 6)

	const value = Number.parseInt(full, 16)
	if (Number.isNaN(value)) return { r: 0, g: 0, b: 0 }

	return {
		r: (value >> 16) & 255,
		g: (value >> 8) & 255,
		b: value & 255,
	}
}

/** Formats RGB channels as a lowercase `#rrggbb` hex string. */
export function rgbToHex({ r, g, b }: RGB): string {
	const toHex = (channel: number) => Math.round(Math.min(255, Math.max(0, channel))).toString(16).padStart(2, "0")
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/** Converts RGB channels to HSL. */
export function rgbToHsl({ r, g, b }: RGB): HSL {
	const rn = r / 255
	const gn = g / 255
	const bn = b / 255

	const max = Math.max(rn, gn, bn)
	const min = Math.min(rn, gn, bn)
	const l = (max + min) / 2

	if (max === min) return { h: 0, s: 0, l: l * 100 }

	const d = max - min
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

	let h = 0
	switch (max) {
		case rn:
			h = (gn - bn) / d + (gn < bn ? 6 : 0)
			break
		case gn:
			h = (bn - rn) / d + 2
			break
		default:
			h = (rn - gn) / d + 4
			break
	}

	return { h: (h / 6) * 360, s: s * 100, l: l * 100 }
}

/** Converts HSL back to RGB channels. */
export function hslToRgb({ h, s, l }: HSL): RGB {
	const hn = h / 360
	const sn = s / 100
	const ln = l / 100

	if (sn === 0) {
		const gray = ln * 255
		return { r: gray, g: gray, b: gray }
	}

	const hue2rgb = (p: number, q: number, t: number): number => {
		let tt = t
		if (tt < 0) tt += 1
		if (tt > 1) tt -= 1
		if (tt < 1 / 6) return p + (q - p) * 6 * tt
		if (tt < 1 / 2) return q
		if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
		return p
	}

	const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn
	const p = 2 * ln - q

	return {
		r: hue2rgb(p, q, hn + 1 / 3) * 255,
		g: hue2rgb(p, q, hn) * 255,
		b: hue2rgb(p, q, hn - 1 / 3) * 255,
	}
}

/** Target lightness (0-100) for every shade other than the user-picked 500. */
const SHADE_LIGHTNESS: Record<number, number> = {
	50: 97,
	100: 93,
	200: 85,
	300: 74,
	400: 60,
	600: 44,
	700: 36,
	800: 29,
	900: 22,
}

const SHADE_ORDER = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

/**
 * Generates a Tailwind-style 50-900 color scale from a single base hex color
 * (used verbatim as the 500 shade), interpolating the rest via HSL lightness
 * so the ramp stays visually consistent regardless of the base hue.
 */
export function generateScale(baseHex: string): Record<(typeof SHADE_ORDER)[number], string> {
	const rgb = hexToRgb(baseHex)
	const hsl = rgbToHsl(rgb)

	const scale = {} as Record<(typeof SHADE_ORDER)[number], string>
	for (const shade of SHADE_ORDER) {
		if (shade === 500) {
			scale[shade] = rgbToHex(rgb)
			continue
		}
		const lightness = SHADE_LIGHTNESS[shade]
		// Pull saturation in slightly at the extremes so very light/dark tints
		// don't look artificially neon or muddy.
		const saturation = shade <= 100 ? hsl.s * 0.85 : shade >= 800 ? hsl.s * 0.9 : hsl.s
		scale[shade] = rgbToHex(hslToRgb({ h: hsl.h, s: saturation, l: lightness }))
	}
	return scale
}
