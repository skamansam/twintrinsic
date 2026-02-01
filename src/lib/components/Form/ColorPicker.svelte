<!--
@component
ColorPicker - A form component for color selection with RGB, HSL, and hex input support.
Includes a color wheel, alpha slider, and format switching.

Usage:
```svelte
<ColorPicker
  value="#FF0000"
  onchange={handleChange}
/>

<ColorPicker
  value="rgba(255, 0, 0, 0.5)"
  format="rgba"
  showAlpha={true}
/>
```
-->
<script lang="ts">
import { getContext } from "svelte"
import { clickOutside } from "../../actions"
import Input from "./Input.svelte"

const {
  /** @type {string} - Color value in current format */
  value = "#000000",
  /** @type {'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla'} - Color format */
  format = "hex",
  /** @type {boolean} - Whether to show alpha channel */
  showAlpha = false,
  /** @type {string} - Input label */
  label = "Color",
  /** @type {boolean} - Whether the picker is disabled */
  disabled = false,
  /** @type {string} - Error message */
  error = "",
  /** @type {string} - Additional CSS classes */
  class: className = "",
  /** @type {(event: CustomEvent) => void} - Change event handler */
  onchange,
} = $props()

let showPicker = $state(false)
let hue = $state(0)
let saturation = $state(100)
let lightness = $state(50)
let alpha = $state(100)
let inputValue = $state("")
let pickerRef = $state()

// Initialize color from value
$effect(() => {
  if (value) {
    const color = parseColor(value)
    if (color) {
      ;({ hue, saturation, lightness, alpha } = color)
      updateInputValue()
    }
  }
})

// Parse color string to HSL(A) values
function parseColor(colorStr) {
  try {
    const div = document.createElement("div")
    div.style.color = colorStr
    document.body.appendChild(div)
    const computed = getComputedStyle(div).color
    document.body.removeChild(div)

    const match = computed.match(/\d+(\.\d+)?/g)
    if (!match) return null

    const [r, g, b, a = 1] = match.map(Number)
    const [h, s, l] = rgbToHsl(r, g, b)

    return {
      hue: h,
      saturation: s,
      lightness: l,
      alpha: a * 100,
    }
  } catch {
    return null
  }
}

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

// Convert HSL to RGB
function hslToRgb(h, s, l) {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

// Convert RGB to hex
function rgbToHex(r, g, b) {
  const toHex = (x) => {
    const hex = x.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  return "#" + toHex(r) + toHex(g) + toHex(b)
}

// Update color from HSL values
function updateColor(h, s, l, a) {
  hue = h
  saturation = s
  lightness = l
  alpha = a

  updateInputValue()
  onchange?.(new CustomEvent("change", { detail: { value: inputValue } }))
}

// Update input value based on current color
function updateInputValue() {
  const [r, g, b] = hslToRgb(hue, saturation, lightness)
  const a = alpha / 100

  switch (format) {
    case "hex":
      inputValue = rgbToHex(r, g, b)
      break
    case "rgb":
      inputValue = `rgb(${r}, ${g}, ${b})`
      break
    case "rgba":
      inputValue = `rgba(${r}, ${g}, ${b}, ${a})`
      break
    case "hsl":
      inputValue = `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`
      break
    case "hsla":
      inputValue = `hsla(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%, ${a})`
      break
  }
}

// Handle color wheel interaction
function handleColorWheel(event) {
  if (disabled) return

  const rect = pickerRef.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const radius = Math.min(centerX, centerY)

  const dx = x - centerX
  const dy = y - centerY
  const distance = Math.sqrt(dx * dx + dy * dy)

  if (distance <= radius) {
    const angle = Math.atan2(dy, dx)
    const newHue = ((angle * 180) / Math.PI + 360) % 360
    const newSaturation = (distance / radius) * 100

    updateColor(newHue, newSaturation, lightness, alpha)
  }
}

// Handle lightness slider
function handleLightness(event) {
  if (disabled) return
  const newLightness = Number(event.target.value)
  updateColor(hue, saturation, newLightness, alpha)
}

// Handle alpha slider
function handleAlpha(event) {
  if (disabled) return
  const newAlpha = Number(event.target.value)
  updateColor(hue, saturation, lightness, newAlpha)
}

// Handle input change
function handleInput(event) {
  const newValue = event.detail.value
  const color = parseColor(newValue)

  if (color) {
    updateColor(color.hue, color.saturation, color.lightness, color.alpha)
  }
}
</script>

<div
  class="color-picker {className}"
  use:clickOutside
  onclickOutside={() => showPicker = false}
>
  <Input
    {label}
    {disabled}
    {error}
    value={inputValue}
    oninput={handleInput}
    onclick={() => showPicker = !showPicker}
    rightIcon="palette"
    onrightIconClick={() => showPicker = !showPicker}
  />
  
  {#if showPicker}
    <div
      class="color-picker-popup"
      role="dialog"
      aria-label="Color picker"
      transition:slide={{ duration: 150 }}
    >
      <div
        class="color-wheel"
        bind:this={pickerRef}
        role="presentation"
        aria-hidden="true"
        onmousedown={handleColorWheel}
        onmousemove={event => {
          if (event.buttons === 1) handleColorWheel(event);
        }}
        style="
          --hue: {hue}deg;
          --saturation: {saturation}%;
          --lightness: {lightness}%;
        "
      >
        <div class="color-wheel-pointer"></div>
      </div>
      
      <div class="color-sliders">
        <label class="color-slider">
          <span>Lightness</span>
          <input
            type="range"
            min="0"
            max="100"
            value={lightness}
            disabled={disabled}
            oninput={handleLightness}
          />
        </label>
        
        {#if showAlpha}
          <label class="color-slider">
            <span>Alpha</span>
            <input
              type="range"
              min="0"
              max="100"
              value={alpha}
              disabled={disabled}
              oninput={handleAlpha}
            />
          </label>
        {/if}
      </div>
      
      <div class="color-preview">
        <div
          class="color-swatch"
          style="
            background-color: hsla({hue}, {saturation}%, {lightness}%, {alpha / 100});
          "
        ></div>
        <div class="color-value">{inputValue}</div>
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .color-picker {
    @apply relative inline-block w-full;
  }

  .color-picker-popup {
    @apply absolute z-50 mt-1 p-4;
    @apply bg-surface border border-border rounded-md shadow-lg;
    @apply min-w-[240px];
  }

  .color-wheel {
    @apply relative w-48 h-48 mb-4 rounded-full;
    @apply bg-[conic-gradient(from_var(--hue),red,yellow,lime,aqua,blue,magenta,red)];
    @apply cursor-crosshair;
    
    mask: radial-gradient(white, transparent);
    -webkit-mask: radial-gradient(white, transparent);
  }

  .color-wheel-pointer {
    @apply absolute w-4 h-4 -mt-2 -ml-2;
    @apply border-2 border-white rounded-full shadow-md;
    @apply pointer-events-none;
    
    left: calc(50% + (var(--saturation) * 0.24px) * cos(var(--hue)));
    top: calc(50% + (var(--saturation) * 0.24px) * sin(var(--hue)));
  }

  .color-sliders {
    @apply flex flex-col gap-4 mb-4;
  }

  .color-slider {
    @apply flex flex-col gap-1;
  }

  .color-slider span {
    @apply text-xs text-muted;
  }

  .color-slider input {
    @apply w-full;
  }

  .color-preview {
    @apply flex items-center gap-2;
  }

  .color-swatch {
    @apply w-8 h-8 rounded;
    @apply border border-border;
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%),
                    linear-gradient(-45deg, #808080 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #808080 75%),
                    linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 8px 8px;
    background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
  }

  .color-value {
    @apply text-sm font-mono;
  }
</style>
