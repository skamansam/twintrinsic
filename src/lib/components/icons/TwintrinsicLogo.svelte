<!--
@component
A modern, dynamic logo for Twintrinsic that represents Tailwind's utility-first approach
and the intrinsic nature of web design.
-->
<script lang="ts">
const { class: className = "", size = "3rem" } = $props()
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 180 180"
  class={className}
  width={size}
  height={size}
  fill="none"
  stroke="currentColor"
  aria-label="Twintrinsic Logo"
>
<rect
  style="opacity:0.995712;fill:none;stroke:#5b21b6;stroke-width:8;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
  class="tw-logo-window"
  width="172"
  height="172"
  x="4"
  y="4" />
<path
  style="fill:none;stroke:#5b21b6;stroke-width:6.15013;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
  d="M 0,45 H 180"
  class="tw-logo-separator" />
<text
  xml:space="preserve"
  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:105.833px;line-height:1.25;font-family:'OpenDyslexicMono Nerd Font';-inkscape-font-specification:'OpenDyslexicMono Nerd Font, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#5b21b6;fill-opacity:1;stroke:none;stroke-width:0.265;stroke-dasharray:none;stroke-opacity:1"
  x="9.6828251"
  y="145.79205"
  class="tw-logo-letters"><tspan
    style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:105.833px;font-family:'OpenDyslexicMono Nerd Font';-inkscape-font-specification:'OpenDyslexicMono Nerd Font, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#5b21b6;fill-opacity:1;stroke:none;stroke-width:0.265;stroke-dasharray:none;stroke-opacity:1"
    x="9.6828251"
    y="145.79205">Tw</tspan></text>
</svg>

<style lang="postcss">
  @reference '../../twintrinsic.css';
  svg {
    @apply transition-colors duration-300;
  }

  .tw-logo-window, .tw-logo-separator {
    @apply transition-all duration-500;
  }

  .tw-logo-letters {
    @apply transition-transform duration-300 ;
  }

  /* Optional: Add hover effects */
  svg:hover .tw-logo-window {
    @apply stroke-primary-500;
  }

  svg:hover .tw-logo-letters {
    @apply stroke-primary-600;
  }

  /* Dark mode support */
  :global(.dark) svg:hover .tw-logo-window {
    @apply stroke-primary-400;
  }

  :global(.dark) svg:hover .tw-logo-letters {
    @apply stroke-primary-300;
  }
</style>
