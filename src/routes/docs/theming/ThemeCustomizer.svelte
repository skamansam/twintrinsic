<!--
@component
Docs-only live theme customizer. Lets a visitor pick base colors, generates a
full 50-900 scale for each accent color, previews real Twintrinsic
components against the result (scoped to this section via inline CSS custom
properties), and prints a copy-pasteable `[data-theme="custom"]` CSS block.

Not part of the public library export — this is a documentation tool for
`/docs/theming`.
-->
<script lang="ts">
import { onMount } from "svelte"
import Badge from "$lib/components/Badge/Badge.svelte"
import Button from "$lib/components/Button/Button.svelte"
import Card from "$lib/components/Card/Card.svelte"
import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte"
import Checkbox from "$lib/components/Form/Checkbox.svelte"
import { generateScale } from "./colorScale.js"
import { THEME_FAMILIES, THEME_PRESETS, type ThemeColors } from "./themePresets.js"

interface ScaleColorField {
	key: "primary" | "secondary" | "success" | "warning" | "error" | "info"
	label: string
}

const scaleColorFields: ScaleColorField[] = [
	{ key: "primary", label: "Primary" },
	{ key: "secondary", label: "Secondary" },
	{ key: "success", label: "Success" },
	{ key: "warning", label: "Warning" },
	{ key: "error", label: "Error" },
	{ key: "info", label: "Info" },
]

interface NeutralColorField {
	key: "background" | "surface" | "border" | "text" | "muted"
	label: string
}

const neutralColorFields: NeutralColorField[] = [
	{ key: "background", label: "Background" },
	{ key: "surface", label: "Surface" },
	{ key: "border", label: "Border" },
	{ key: "text", label: "Text" },
	{ key: "muted", label: "Muted" },
]

type ColorKey = keyof ThemeColors

/** Selected preset family from {@link THEME_FAMILIES} (e.g. "default", "brand"). */
let selectedFamily = $state("default")

/**
 * Whether the site-wide theme (the `ThemeToggle` in the docs header) is
 * currently dark. Tracked via a `MutationObserver` on `<html>` so picking a
 * family here always previews the light/dark pairing that matches what a
 * visitor is actually looking at, and toggling dark mode live-updates the
 * customizer to the dark counterpart of the current family.
 */
let isGlobalDark = $state(false)

let colors = $state<Record<ColorKey, string>>({ ...THEME_PRESETS.default.light })

/** Loads the selected family's colors for the current light/dark mode. */
function applyPreset() {
	const preset = THEME_PRESETS[selectedFamily] ?? THEME_PRESETS.default
	colors = { ...(isGlobalDark ? preset.dark : preset.light) }
}

onMount(() => {
	const root = document.documentElement
	const readDarkMode = () => root.classList.contains("dark") || root.getAttribute("data-theme") === "dark"

	isGlobalDark = readDarkMode()
	applyPreset()

	// Re-apply the current family's colors whenever the site-wide theme
	// toggle flips light/dark, so the customizer follows along live.
	const observer = new MutationObserver(() => {
		isGlobalDark = readDarkMode()
		applyPreset()
	})
	observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] })

	return () => observer.disconnect()
})

/** Switches to a different theme family and loads its colors immediately. */
function selectFamily(family: string) {
	selectedFamily = family
	applyPreset()
}

/** Resets to the "Default" family for the current light/dark mode. */
function reset() {
	selectFamily("default")
}

function updateColor(key: ColorKey, value: string) {
	colors = { ...colors, [key]: value }
}

const cssVars = $derived.by(() => {
	const vars: Record<string, string> = {
		"--color-background": colors.background,
		"--color-surface": colors.surface,
		"--color-border": colors.border,
		"--color-text": colors.text,
		"--color-muted": colors.muted,
	}

	for (const { key } of scaleColorFields) {
		const scale = generateScale(colors[key])
		for (const shade of Object.keys(scale) as unknown as (keyof typeof scale)[]) {
			vars[`--color-${key}-${shade}`] = scale[shade]
		}
		vars[`--color-${key}`] = `var(--color-${key}-500)`
		vars[`--color-${key}-bg`] = `var(--color-${key}-50)`
		vars[`--color-${key}-hover`] = `var(--color-${key}-600)`
		vars[`--color-${key}-bold`] = `var(--color-${key}-700)`
		vars[`--color-${key}-text`] = key === "primary" || key === "secondary" ? "#ffffff" : `var(--color-${key}-800)`
	}

	return vars
})

const previewStyle = $derived(
	Object.entries(cssVars)
		.map(([name, value]) => `${name}: ${value}`)
		.join("; "),
)

const cssOutput = $derived(
	`[data-theme="custom"] {\n${Object.entries(cssVars)
		.map(([name, value]) => `  ${name}: ${value};`)
		.join("\n")}\n}`,
)
</script>

<div class="not-prose space-y-6">
	<div class="flex flex-wrap items-end justify-between gap-3">
		<label class="flex flex-col gap-1 text-sm">
			<span class="font-medium">Base theme</span>
			<select
				class="rounded border border-border bg-background px-2 py-1.5 text-sm"
				value={selectedFamily}
				onchange={(e) => selectFamily(e.currentTarget.value)}
			>
				{#each THEME_FAMILIES as family (family.id)}
					<option value={family.id}>{family.label}</option>
				{/each}
			</select>
		</label>
		<p class="text-xs text-muted max-w-xs">
			Following the site's <strong>{isGlobalDark ? "dark" : "light"}</strong> mode — toggle the
			theme switch in the header to preview the dark/light counterpart of the selected theme.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
		<fieldset class="border border-border rounded-md p-4">
			<legend class="px-1 font-medium text-sm">Accent colors</legend>
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
				{#each scaleColorFields as field (field.key)}
					<label class="flex flex-col gap-1 text-sm">
						<span>{field.label}</span>
						<span class="flex items-center gap-2">
							<input
								type="color"
								class="h-8 w-8 rounded border border-border p-0"
								value={colors[field.key]}
								onchange={(e) => updateColor(field.key, e.currentTarget.value)}
								aria-label="{field.label} color"
							/>
							<input
								type="text"
								autocomplete="off"
								class="w-full min-w-0 rounded border border-border bg-background px-2 py-1 text-xs font-mono"
								value={colors[field.key]}
								onchange={(e) => updateColor(field.key, e.currentTarget.value)}
								aria-label="{field.label} hex value"
							/>
						</span>
					</label>
				{/each}
			</div>
		</fieldset>

		<fieldset class="border border-border rounded-md p-4">
			<legend class="px-1 font-medium text-sm">Neutrals</legend>
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
				{#each neutralColorFields as field (field.key)}
					<label class="flex flex-col gap-1 text-sm">
						<span>{field.label}</span>
						<span class="flex items-center gap-2">
							<input
								type="color"
								class="h-8 w-8 rounded border border-border p-0"
								value={colors[field.key]}
								onchange={(e) => updateColor(field.key, e.currentTarget.value)}
								aria-label="{field.label} color"
							/>
							<input
								type="text"
								autocomplete="off"
								class="w-full min-w-0 rounded border border-border bg-background px-2 py-1 text-xs font-mono"
								value={colors[field.key]}
								onchange={(e) => updateColor(field.key, e.currentTarget.value)}
								aria-label="{field.label} hex value"
							/>
						</span>
					</label>
				{/each}
			</div>
		</fieldset>
	</div>

	<div class="flex justify-end">
		<button
			type="button"
			class="text-sm font-medium text-primary hover:underline"
			onclick={reset}
		>
			Reset to "Default" theme
		</button>
	</div>

	<div
		class="rounded-lg border border-border p-6 space-y-4"
		style="{previewStyle}; background-color: var(--color-background); color: var(--color-text);"
	>
		<div class="flex flex-wrap items-center gap-2">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Badge variant="success" inline={false}>Success</Badge>
			<Badge variant="warning" inline={false}>Warning</Badge>
			<Badge variant="error" inline={false}>Error</Badge>
			<Badge variant="info" inline={false}>Info</Badge>
		</div>

		<Card>
			{#snippet header()}Preview Card{/snippet}
			<p>Body text uses <code>--color-text</code> on <code>--color-background</code>.</p>
			<p class="text-muted mt-1">Muted text uses <code>--color-muted</code>.</p>
			<Checkbox label="Sample checkbox" checked />
		</Card>

		<div class="rounded-md border border-border p-4 bg-surface">
			<p class="font-medium">Surface panel</p>
			<p class="text-muted text-sm">
				This box uses <code>--color-surface</code> directly, so it's the one to watch when
				adjusting the Surface swatch above.
			</p>
		</div>
	</div>

	<div>
		<p class="text-sm text-muted mb-2">
			Copy this into your stylesheet and set <code>data-theme="custom"</code> on your root
			element to apply it (or merge the tokens into <code>:root</code> to make it the default).
		</p>
		<CodeBlock language="css">{cssOutput}</CodeBlock>
	</div>
</div>
