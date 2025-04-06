<!--
@component
A modern, dynamic logo for Twintrinsic that represents Tailwind's utility-first approach
and the intrinsic nature of web design.
-->
<script>
  const { class: className = '', size = '3rem' } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  class={className}
  width={size}
  height={size}
  fill="none"
  stroke="currentColor"
  aria-label="Twintrinsic Logo"
>
  <!-- Outer hexagon representing Tailwind's utility-first approach -->
  <path
    class="tw-logo-hex"
    d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z"
    stroke-width="4"
    stroke-linejoin="round"
  />
  
  <!-- Inner "tw" letters -->
  <g class="tw-logo-letters" stroke-width="3" stroke-linecap="round">
    <!-- 't' letter -->
    <path d="M35 35 L35 65" />
    <path d="M25 40 L45 40" />
    
    <!-- 'w' letter -->
    <path d="M55 40 L60 65 L65 50 L70 65 L75 40" />
  </g>
  
  <!-- Dynamic dots representing intrinsic responsiveness -->
  <g class="tw-logo-dots" fill="currentColor">
    <circle cx="50" cy="25" r="3" />
    <circle cx="75" cy="25" r="3" />
    <circle cx="25" cy="25" r="3" />
    <circle cx="50" cy="75" r="3" />
    <circle cx="75" cy="75" r="3" />
    <circle cx="25" cy="75" r="3" />
  </g>
  
  <!-- Animated wave pattern for web fluidity -->
  <path
    class="tw-logo-wave"
    d="M30 50 Q40 45, 50 50 T70 50"
    stroke-width="2"
    stroke-linecap="round"
    fill="none"
  />
</svg>

<style>
  @reference '../../twintrinsic.css';
  svg {
    @apply transition-colors duration-300;
  }

  .tw-logo-hex {
    @apply transition-all duration-500;
  }

  .tw-logo-letters {
    @apply transition-transform duration-300;
  }

  .tw-logo-dots {
    @apply transition-opacity duration-300;
  }

  .tw-logo-wave {
    @apply transition-all duration-500;
  }

  /* Optional: Add hover effects */
  svg:hover .tw-logo-hex {
    @apply stroke-primary-500;
  }

  svg:hover .tw-logo-letters {
    @apply stroke-primary-600;
  }

  svg:hover .tw-logo-dots {
    @apply fill-primary-400;
  }

  svg:hover .tw-logo-wave {
    @apply stroke-primary-300;
  }

  /* Dark mode support */
  :global(.dark) svg:hover .tw-logo-hex {
    @apply stroke-primary-400;
  }

  :global(.dark) svg:hover .tw-logo-letters {
    @apply stroke-primary-300;
  }

  :global(.dark) svg:hover .tw-logo-dots {
    @apply fill-primary-500;
  }

  :global(.dark) svg:hover .tw-logo-wave {
    @apply stroke-primary-600;
  }
</style>
