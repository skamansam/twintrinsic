import { describe, expect, it, vi } from "vitest";
import { dispatchGroupRemove } from "../../src/lib/helpers/groupRemove.js";

describe("dispatchGroupRemove", () => {
  it("dispatches a dismiss event with the resolved item and index", () => {
    const handler = vi.fn();
    dispatchGroupRemove(["Red", "Green", "Blue"], 1, "dismiss", handler);

    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as CustomEvent<{ item: string; index: number }>;
    expect(event.type).toBe("dismiss");
    expect(event.detail).toEqual({ item: "Green", index: 1 });
  });

  it("dispatches a remove event with the resolved item and index", () => {
    const handler = vi.fn();
    dispatchGroupRemove(["Red", "Green", "Blue"], 2, "remove", handler);

    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as CustomEvent<{ item: string; index: number }>;
    expect(event.type).toBe("remove");
    expect(event.detail).toEqual({ item: "Blue", index: 2 });
  });

  it("passes object items through by reference", () => {
    const items = [{ id: 1 }, { id: 2 }];
    const handler = vi.fn();
    dispatchGroupRemove(items, 0, "remove", handler);

    const event = handler.mock.calls[0][0] as CustomEvent<{ item: { id: number }; index: number }>;
    expect(event.detail.item).toBe(items[0]);
    expect(event.detail.index).toBe(0);
  });

  it("does nothing when no handler is provided", () => {
    // Should resolve the item and build the event without throwing
    expect(() => dispatchGroupRemove(["Red"], 0, "dismiss", undefined)).not.toThrow();
  });
});
