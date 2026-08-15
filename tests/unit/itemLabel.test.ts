import { describe, expect, it } from "vitest";
import { getItemLabel } from "../../src/lib/helpers/itemLabel.js";

describe("getItemLabel", () => {
  it("returns string items unchanged", () => {
    expect(getItemLabel("Red")).toBe("Red");
    expect(getItemLabel("")).toBe("");
  });

  it("reads the default label field from object items", () => {
    expect(getItemLabel({ label: "Blue" })).toBe("Blue");
  });

  it("reads a custom label field from object items", () => {
    expect(getItemLabel({ name: "Green" }, "name")).toBe("Green");
    // Asking for a field the item does not have falls back to ""
    expect(getItemLabel({ label: "Blue" }, "name")).toBe("");
  });

  it("returns an empty string when the field value is null or undefined", () => {
    expect(getItemLabel({ label: null })).toBe("");
    expect(getItemLabel({ label: undefined })).toBe("");
    expect(getItemLabel({ name: null }, "name")).toBe("");
  });

  it("coerces non-string field values with String()", () => {
    expect(getItemLabel({ label: 42 })).toBe("42");
    expect(getItemLabel({ label: 0 })).toBe("0");
    expect(getItemLabel({ label: false })).toBe("false");
  });
});
