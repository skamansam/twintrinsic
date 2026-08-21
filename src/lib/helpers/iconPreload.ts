/**
 * @module iconPreload
 *
 * Extended icon preloading utilities for Twintrinsic.
 *
 * The core `preloadIcons()` lives in `src/lib/stores/iconPreload.ts` and is
 * re-exported from the package root. This module adds:
 *
 * - **Manifest loading** — import a JSON manifest and register all icons
 * - **Link preload** — inject `<link rel="preload">` for critical icons
 * - **Icon name extraction** — scan source code for icon usage
 *
 * Usage:
 * ```ts
 * import { preloadManifest, addLinkPreloads, extractIconNames } from 'twintrinsic/helpers/iconPreload'
 *
 * // Load a build-time manifest
 * import manifest from '$lib/icon-manifest.json'
 * preloadManifest(manifest)
 *
 * // Preload critical icons via <link rel="preload">
 * addLinkPreloads(['tabler:menu-2', 'tabler:star-filled'])
 * ```
 */

import { preloadIcons as corePreloadIcons } from '../stores/iconPreload.js'

/** A build-time manifest: list of icon names to preload. */
export interface IconManifest {
  icons: string[]
  _count?: number
  _generated?: string
}

/**
 * Load a build-time icon manifest. Registers all icons in the manifest
 * with Iconify's cache for instant rendering.
 *
 * @param manifest - The icon manifest object (imported from JSON)
 */
export function preloadManifest(manifest: IconManifest): void {
  if (manifest.icons?.length) {
    corePreloadIcons(manifest.icons)
  }
}

/**
 * Inject `<link rel="preload" as="image">` tags into the document `<head>`
 * for critical icons. The browser will fetch these during HTML parsing,
 * so they're available before any JavaScript runs.
 *
 * Only works in the browser (no-op during SSR).
 *
 * @param icons - Array of `iconset:name` strings to preload
 * @param apiBase - Iconify API base URL (defaults to public API)
 */
export function addLinkPreloads(
  icons: string[],
  apiBase = 'https://api.iconify.design'
): void {
  if (typeof document === 'undefined') return

  for (const iconName of icons) {
    const url = `${apiBase}/${iconName}.svg`
    const existing = document.querySelector(`link[rel="preload"][href="${url}"]`)
    if (existing) continue

    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = url
    link.type = 'image/svg+xml'
    document.head.appendChild(link)
  }
}

/**
 * Remove all icon preload links from the document head.
 */
export function removeLinkPreloads(): void {
  if (typeof document === 'undefined') return
  document.querySelectorAll('link[rel="preload"][as="image"]').forEach(el => el.remove())
}

/**
 * Get all icon names used in a source code string.
 * Scans for patterns like `name="tabler:check"` or `icon="mdi:home"`.
 *
 * @param source - Source code string to scan
 * @returns Array of unique icon names found
 */
export function extractIconNames(source: string): string[] {
  const iconNames = new Set<string>()
  const patterns = [
    /\bname=["']([a-z][a-z0-9-]*:[a-z][a-z0-9-]*(?:-[a-z0-9]+)*)["']/gi,
    /\bicon=["']([a-z][a-z0-9-]*:[a-z][a-z0-9-]*(?:-[a-z0-9]+)*)["']/gi,
  ]
  for (const pattern of patterns) {
    let match
    while ((match = pattern.exec(source)) !== null) {
      iconNames.add(match[1])
    }
  }
  return [...iconNames].sort()
}
