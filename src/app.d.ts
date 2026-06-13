// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  // biome-ignore lint/style/noNamespace: see the above url for why this namespace is needed
  namespace App {

    // Defines the common shape of expected and unexpected errors. Expected errors are thrown using the error function. Unexpected errors are handled by the handleError hooks which should return this shape.
    interface Error {}

    // The interface that defines event.locals, which can be accessed in server hooks (handle, and handleError), server-only load functions, and +server.js files.
    interface Locals {}

    // Defines the common shape of the page.data state and $page.data store - that is, the data that is shared between all pages. The Load and ServerLoad functions in ./$types will be narrowed accordingly. Use optional properties for data that is only present on specific pages. Do not add an index signature ([key: string]: any).
    interface PageData {}

    //The shape of the page.state object, which can be manipulated using the pushState and replaceState functions from $app/navigation.
    interface PageState {}

    // If your adapter provides platform-specific context via event.platform, you can specify it here.
    interface Platform {}
  }

  // Augment the global Window interface with custom properties used by the
  // Twintrinsic demo site. These are set by the layout/page scripts and read
  // by components like App, AppHeader, and the Map demo.
  // NOTE: demo-site-only. If Twintrinsic is consumed as a library, these
  // augmentations will leak into the consumer's Window type. Consider
  // moving to `src/routes/demo.d.ts` once the library is published.
  interface Window {
    /** Base URL for the demo site's API calls */
    baseUrl?: string
    /** Map tile URL template (e.g., "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png") */
    mapUrl?: string
    /** CDN URL for static assets */
    cdnUrl?: string
    /** CDN URL for map tiles */
    tilesCdnUrl?: string
    /** CDN URL for user-uploaded storage */
    storageCdnUrl?: string
    /** Current user object, or null if not signed in */
    user?: { name: string; avatar?: string; href?: string } | null
    /** Whether the current page is the code editor (disables certain features) */
    isEditor?: boolean
    // --- Genie Map demo (game-map route) ---
    /** Marker sprite positions and map data for the game-map demo */
    mapData?: unknown
    /** Special overlay data (highlighted regions, custom markers) */
    specialData?: unknown
    /** Whether the page is embedded in an iframe */
    isEmbedded?: boolean
    /** Whether the page is rendered in a mini/compact embed mode */
    isMini?: boolean
    /** Embed context type (e.g., "game", "tour", "preview") */
    embedType?: string
    /** Partner/affiliate identifier for the embed */
    partner?: string
    /** Whether the embed needs email verification before full access */
    needsVerification?: boolean
    /** Game metadata for the game-map demo (id, title, slug, etc.) */
    game?: { id: number; title: string; slug: string }
    /** Generic config object for demo scripts */
    config?: Record<string, unknown>
  }
}

export {}
