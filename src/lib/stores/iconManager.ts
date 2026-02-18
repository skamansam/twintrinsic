import { writable } from 'svelte/store'

/**
 * Icon configuration for managing global iconset settings
 */
export interface IconConfig {
  /** Default iconset to use (e.g., "mdi", "mdi-light", "fa") */
  defaultIconset: string
  /** Default color for icons */
  color?: string
  /** Default size for icons */
  size?: string | number
}

/**
 * Global icon configuration store
 * Allows setting a default iconset that all Icon components will use
 */
export const iconConfig = writable<IconConfig>({
  defaultIconset: 'tabler',
})

/**
 * Set the default iconset globally
 * @param iconset - The iconset name (e.g., "mdi-light", "fa", "heroicons")
 */
export function setIconset(iconset: string): void {
  iconConfig.update(config => ({ ...config, defaultIconset: iconset }))
}

/**
 * Set the default color for all icons
 * @param color - CSS color value
 */
export function setIconColor(color: string): void {
  iconConfig.update(config => ({ ...config, color }))
}

/**
 * Set the default size for all icons
 * @param size - Size as string (e.g., "24px") or number
 */
export function setIconSize(size: string | number): void {
  iconConfig.update(config => ({ ...config, size }))
}

/**
 * Update the entire icon configuration
 * @param config - Partial icon configuration to merge
 */
export function updateIconConfig(config: Partial<IconConfig>): void {
  iconConfig.update(current => ({ ...current, ...config }))
}
