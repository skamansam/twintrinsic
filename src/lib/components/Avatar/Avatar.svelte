<!--
@component
Avatar - A component for displaying user profile images with fallback options.
Provides consistent styling, accessibility features, and various display options.

Usage:
```svelte
<Avatar 
  src="/path/to/image.jpg" 
  alt="User Name" 
/>

<Avatar 
  name="John Doe" 
  size="lg" 
  shape="square" 
/>

<Avatar 
  gravatarEmail="user@example.com"
  name="John Doe"
  status="online" 
/>

<Avatar 
  src="/path/to/image.jpg" 
  fallback="JD" 
  status="online" 
/>

<Avatar 
  icon="user"
  size="md"
/>
```
-->
<script module lang="ts">
export const propsMetadata = [
  { name: "class", type: "string", description: "Additional CSS classes", default: "\"\"", optional: true },
  { name: "id", type: "string", description: "HTML id for accessibility", default: "crypto.randomUUID()", optional: true },
  { name: "src", type: "string", description: "Image source URL", optional: true },
  { name: "alt", type: "string", description: "Alt text for the image", optional: true },
  { name: "name", type: "string", description: "User name for generating initials", optional: true },
  { name: "fallback", type: "string", description: "Fallback text when image fails to load or no src provided", optional: true },
  { name: "gravatarEmail", type: "string", description: "Gravatar email address", optional: true },
  { name: "icon", type: "string", description: "Icon name to display (e.g., \"user\", \"star\")", optional: true },
  { name: "size", type: "string", description: "Size of the avatar (xs, sm, md, lg, xl)", default: "\"md\"", optional: true },
  { name: "shape", type: "string", description: "Shape of the avatar (circle, square, rounded)", default: "\"circle\"", optional: true },
  { name: "status", type: "\"online\" | \"offline\" | \"away\" | \"busy\" | undefined", description: "Status indicator (online, offline, away, busy)", optional: true },
  { name: "statusIcon", type: "string", description: "Icon name for status indicator (e.g., \"check\", \"x\", \"clock\")", optional: true },
  { name: "bgColor", type: "string", description: "Background color for text avatars (CSS color value)", optional: true },
  { name: "badge", type: "string", description: "Badge text to display in top-right corner", optional: true },
  { name: "badgeVariant", type: "\"default\" | \"primary\" | \"secondary\" | \"success\" | \"warning\" | \"error\" | \"info\"", description: "Badge variant", default: "\"primary\"", optional: true },
  { name: "bordered", type: "boolean", description: "Whether to show a border", default: "false", optional: true },
  { name: "shadowed", type: "boolean", description: "Whether to add a shadow effect", default: "false", optional: true },
  { name: "initialsGenerator", type: "Function", description: "Custom function to generate initials", optional: true },
];
</script>

<script lang="ts">
import { onMount } from "svelte"
import Badge from "../Badge/Badge.svelte"
import Icon from "../Icon/Icon.svelte"

const {
  /** @type {string} - Additional CSS classes */
  class: className = "",

  /** @type {string} - HTML id for accessibility */
  id = crypto.randomUUID(),

  /** @type {string} - Image source URL */
  src = undefined,

  /** @type {string} - Alt text for the image */
  alt = undefined,

  /** @type {string} - User name for generating initials */
  name = undefined,

  /** @type {string} - Fallback text when image fails to load or no src provided */
  fallback = undefined,

  /** @type {string} - Gravatar email address */
  gravatarEmail = undefined,

  /** @type {string} - Icon name to display (e.g., "user", "star") */
  icon = undefined,

  /** @type {string} - Size of the avatar (xs, sm, md, lg, xl) */
  size = "md",

  /** @type {string} - Shape of the avatar (circle, square, rounded) */
  shape = "circle",

  /** @type {"online" | "offline" | "away" | "busy" | undefined} - Status indicator (online, offline, away, busy) */
  status = undefined,

  /** @type {string} - Icon name for status indicator (e.g., "check", "x", "clock") */
  statusIcon = undefined,

  /** @type {string} - Background color for text avatars (CSS color value) */
  bgColor = undefined,

  /** @type {string} - Badge text to display in top-right corner */
  badge = undefined,

  /** @type {"default" | "primary" | "secondary" | "success" | "warning" | "error" | "info"} - Badge variant */
  badgeVariant = "primary",

  /** @type {boolean} - Whether to show a border */
  bordered = false,

  /** @type {boolean} - Whether to add a shadow effect */
  shadowed = false,

  /** @type {Function} - Custom function to generate initials */
  initialsGenerator = undefined,
} = $props()

// Component state
let imageLoaded = $state(false)
let imageError = $state(false)
let avatarElement
let gravatarUrl = $state("")

// Generate gravatar URL if email is provided
$effect(() => {
  if (gravatarEmail) {
    generateGravatarUrl(gravatarEmail).then(url => {
      gravatarUrl = url
    })
  }
})

/**
 * Generates a Gravatar URL from an email address using MD5 hash
 * @param {string} email - Email address
 * @returns {Promise<string>} - Gravatar URL
 */
async function generateGravatarUrl(email: string): Promise<string> {
  if (!email) return ""
  
  const trimmedEmail = email.trim().toLowerCase()
  const msgBuffer = new TextEncoder().encode(trimmedEmail)
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  
  return `https://www.gravatar.com/avatar/${hashHex}?d=identicon`
}

/**
 * Generates initials from a name
 * @param {string} name - Full name
 * @returns {string} - Initials (1-2 characters)
 */
function generateInitials(name: string): string {
  if (!name) return ""

  if (initialsGenerator) {
    return initialsGenerator(name)
  }

  // Default implementation: first letter of first and last name
  const parts = name.trim().split(/\s+/)

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/**
 * Handles image load event
 */
function handleImageLoad() {
  imageLoaded = true
  imageError = false
}

/**
 * Handles image error event
 */
function handleImageError() {
  imageLoaded = false
  imageError = true
}

// Determine what to display as fallback
const displayFallback = $derived(fallback || (name ? generateInitials(name) : ""))

// Determine the image source (prefer explicit src over gravatar)
const imageSrc = $derived(src || gravatarUrl)

// Determine if we should show the image
const showImage = $derived(imageSrc && !imageError)

// Determine if we should show the fallback
const showFallback = $derived(!showImage && !!displayFallback)

// Determine if we should show the icon
const showIcon = $derived(icon && !showImage && !showFallback)

// Determine icon size based on avatar size
const iconSize = $derived(
  {
    xs: "12px",
    sm: "16px",
    md: "20px",
    lg: "24px",
    xl: "32px",
  }[size] || "20px"
)

// Determine status icon based on status
const statusIconName = $derived.by(() => {
  if (statusIcon) return statusIcon
  if (status === "online") return "check"
  if (status === "offline") return "x"
  if (status === "away") return "clock"
  if (status === "busy") return "alert-circle"
  return ""
})

// Determine size classes
const sizeClasses = $derived(
  {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  }[size] || "w-10 h-10 text-base"
)

// Determine shape classes
const shapeClasses = $derived(
  {
    circle: "rounded-full",
    square: "rounded-none",
    rounded: "rounded-md",
  }[shape] || "rounded-full"
)

// Determine status classes
const statusClasses = $derived.by(() => {
  if (status === "online") return "bg-success-500"
  if (status === "offline") return "bg-muted"
  if (status === "away") return "bg-warning-500"
  if (status === "busy") return "bg-error-500"
  return "bg-muted"
})

// Generate a random color based on the name or fallback
const randomBgColor = $derived(generateRandomColor())

// Function to generate a random color based on the name or fallback
function generateRandomColor() {
  if (bgColor) return bgColor

  const seed = name || fallback || id
  const colors = [
    "bg-primary-500",
    "bg-secondary-500",
    "bg-success-500",
    "bg-warning-500",
    "bg-error-500",
    "bg-info-500",
  ]

  // Simple hash function to get consistent color
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash = hash & hash // Convert to 32bit integer
  }

  const index = Math.abs(hash) % colors.length
  return colors[index]
}
</script>

<div
  {id}
  class="
    avatar
    {sizeClasses}
    {shapeClasses}
    {bordered ? 'avatar-bordered' : ''}
    {shadowed ? 'avatar-shadowed' : ''}
    {className}
  "
  aria-label={alt || name || icon || 'Avatar'}
  bind:this={avatarElement}
>
  {#if showImage}
    <img
      src={imageSrc}
      alt={alt || name || 'Avatar'}
      class="avatar-image {shapeClasses}"
      onload={handleImageLoad}
      onerror={handleImageError}
    />
  {:else if showFallback}
    <div 
      class="avatar-fallback {randomBgColor} {shapeClasses}"
      style={bgColor ? `background-color: ${bgColor}` : ''}
    >
      {displayFallback}
    </div>
  {:else if showIcon}
    <div class="avatar-icon {randomBgColor} {shapeClasses}">
      <Icon name={icon} width={iconSize} height={iconSize} />
    </div>
  {:else}
    <div class="avatar-placeholder {shapeClasses}">
      <svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0-2a3 3 0 100-6 3 3 0 000 6zm9 11a1 1 0 01-1 1H4a1 1 0 01-1-1v-1c0-3.87 3.13-7 7-7h4c3.87 0 7 3.13 7 7v1z"/>
      </svg>
    </div>
  {/if}
  
  {#if status}
    <span 
      class="avatar-status {statusClasses}" 
      aria-label={`Status: ${status}`}
    >
      {#if statusIconName}
        <Icon name={statusIconName}/>
      {/if}
    </span>
  {/if}

  {#if badge}
    <Badge 
      overlay 
      position="top-right"
      variant={badgeVariant}
      pill
    >{badge}</Badge>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";
  
  .avatar {
    @apply relative inline-flex items-center justify-center flex-shrink-0;
    @apply bg-surface dark:bg-surface text-text dark:text-text;
    /* CSS aspect-ratio ensures consistent sizing without JS measurement */
    aspect-ratio: 1;
  }
  
  .avatar-bordered {
    @apply border-2 border-background dark:border-background;
  }
  
  .avatar-shadowed {
    @apply shadow-md dark:shadow-lg;
  }
  
  .avatar-image {
    @apply w-full h-full object-cover;
  }
  
  .avatar-fallback {
    @apply w-full h-full flex items-center justify-center;
    @apply text-white dark:text-white font-medium;
  }

  .avatar-icon {
    @apply w-full h-full flex items-center justify-center;
    @apply text-white dark:text-white;
  }
  
  .avatar-placeholder {
    @apply w-full h-full flex items-center justify-center;
    @apply bg-muted/20 dark:bg-muted/20 text-muted dark:text-muted;
  }
  
  .avatar-status {
    @apply absolute bottom-0 right-0;
    @apply w-1/2 h-1/2 min-w-1.5 min-h-1.5 max-w-3 max-h-3;
    @apply rounded-full font-bold stroke-3;
  }
</style>
