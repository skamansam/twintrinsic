/**
 * Dispatches a group-level remove/dismiss event for the item at `index`.
 *
 * Shared by TagGroup ("dismiss") and ChipGroup ("remove"), which previously
 * duplicated this index-based removal logic. Resolves the removed item from
 * the items array and invokes the group's callback with a `CustomEvent`
 * whose detail carries `{ item, index }`.
 *
 * @param items - The group's items array
 * @param index - Index of the item being removed
 * @param eventName - The `CustomEvent` name to dispatch ("dismiss" or "remove")
 * @param handler - The group's remove/dismiss callback
 */
export function dispatchGroupRemove<TItem>(
  items: TItem[],
  index: number,
  eventName: "dismiss" | "remove",
  handler?: (event: CustomEvent<{ item: TItem; index: number }>) => void,
): void {
  const removedItem = items[index];
  handler?.(new CustomEvent(eventName, { detail: { item: removedItem, index } }));
}
