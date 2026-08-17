/**
 * Shared types for the self-describing component convention used by
 * `PropsTable` and `EventsTable`.
 *
 * A component can co-locate its own documentation metadata by exporting a
 * `propsMetadata` array from its `<script module>` block:
 *
 * ```svelte
 * <script module lang="ts">
 *   export const propsMetadata = [
 *     { name: "value", type: "string", description: "Current value" },
 *   ];
 * </script>
 * ```
 *
 * `PropsTable`/`EventsTable` read that export directly, or fall back to a
 * plain `data` hash passed as a prop.
 */

/** Describes a single prop for documentation tooling. */
export interface PropMetadata {
  /** Prop name (e.g. `value`, `onchange`). */
  name: string;
  /** Display type string (e.g. `string`, `(event: CustomEvent) => void`). */
  type: string;
  /** Human-readable description (typically from the prop's JSDoc). */
  description: string;
  /** Default value, as a string, when the prop has one. */
  default?: string;
  /** Whether the prop is optional. */
  optional?: boolean;
  /** For `on*` callbacks: the `CustomEvent` detail type, marking an event. */
  eventDetail?: string;
}

/** A prop descriptor without its `name` — the value shape in a `data` hash. */
export type PropDescriptor = Omit<PropMetadata, "name">;

/** Hash of prop name → descriptor, for `PropsTable`'s `data` prop. */
export type PropDataHash = Record<string, PropDescriptor>;

/** Hash of event name (without `on`) → descriptor, for `EventsTable`'s `data` prop. */
export type EventDataHash = Record<string, { type: string; description: string }>;
