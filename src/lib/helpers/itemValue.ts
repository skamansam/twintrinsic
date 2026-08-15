/**
 * Derives a value for an item (used for comparing/submitting selected items).
 * Mirrors the no-guard semantics of the shared `getItemLabel`: primitives are
 * returned as-is and objects yield `item[valueField]`.
 *
 * Falsy primitives (`""`, `0`, `false`, `null`, `undefined`) intentionally pass
 * through unchanged rather than collapsing to `null`. Selection logic compares
 * values symmetrically (both sides run this same function), so this preserves
 * legitimate falsy values (e.g. a numeric `0` option) that the former
 * per-component `if (!option) return null` guards dropped.
 * @param item - The item to derive a value from
 * @param valueField - Field used to derive the value when `item` is an object
 */
export function getItemValue(item: unknown, valueField = "value"): unknown {
  if (typeof item === "object" && item !== null) {
    return (item as Record<string, unknown>)[valueField];
  }
  return item;
}
