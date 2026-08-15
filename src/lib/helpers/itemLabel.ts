/**
 * Derives a display label for an item (used by the default Tag/Chip fallbacks
 * and the Form Listbox/Combobox option labels). Primitives are stringified
 * as-is; objects yield `item[labelField]`, with null/undefined field values
 * collapsing to `""`.
 *
 * This is the shared home for the former per-component `?.toString() || ""`
 * label pattern (TagGroup, ChipGroup, AutoComplete, Form/Listbox,
 * Form/Combobox) — the `value == null ? "" : String(value)` semantics are
 * equivalent for all contract-valid inputs.
 * @param item - The item to label
 * @param labelField - Field used to derive the label when `item` is an object
 */
export function getItemLabel(item: unknown, labelField = "label"): string {
  if (typeof item === "object" && item !== null) {
    const value = (item as Record<string, unknown>)[labelField];
    return value == null ? "" : String(value);
  }
  return String(item);
}
