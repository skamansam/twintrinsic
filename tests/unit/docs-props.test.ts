import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { parse } from "svelte/compiler";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { extractProps } from "../../scripts/extract-props.mjs";

/**
 * These tests guard the docs' single source of truth for props metadata: each
 * component co-locates its documentation as `export const propsMetadata` in a
 * `<script module>` block (see `src/lib/helpers/propMetadata.ts`), which
 * `PropsTable`/`EventsTable` read directly. `extractProps`
 * (`scripts/extract-props.mjs`) derives the same data from the component's
 * `interface Props` / `$props()` + JSDoc, and the drift test below fails if
 * the two ever diverge. They also assert the docs pages keep a consistent
 * structure (an `<h1>` heading on every component page).
 */

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function readProps(componentPath: string) {
  return extractProps(readFileSync(componentPath, "utf8"));
}

/**
 * Read the hand-written `export const propsMetadata` array from a component's
 * `<script module>` block. The arrays are literal data (seeded once from
 * `extractProps`, then hand-maintained), so evaluating them is safe.
 */
function readAuthoredMetadata(source: string): Array<Record<string, unknown>> {
  const ast = parse(source, { modern: true });
  if (!ast.module) return [];
  const moduleSource = source.slice(ast.module.content.start, ast.module.content.end);
  const sf = ts.createSourceFile(
    "module.ts",
    moduleSource,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  let initializerText: string | undefined;
  function visit(node: ts.Node): void {
    if (initializerText !== undefined) return;
    if (ts.isVariableStatement(node)) {
      const declaration = node.declarationList.declarations.find(
        (d) => ts.isIdentifier(d.name) && d.name.text === "propsMetadata",
      );
      if (declaration?.initializer) {
        initializerText = declaration.initializer.getText(sf);
        return;
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  if (initializerText === undefined) return [];
  return new Function(`return (${initializerText});`)() as Array<Record<string, unknown>>;
}

describe("props extraction accuracy", () => {
  it("extracts an interface Props component (Input) with types and JSDoc", () => {
    const byName = Object.fromEntries(
      readProps("src/lib/components/Form/Input.svelte").map((p) => [p.name, p]),
    );

    expect(byName.label.type).toBe("string");
    expect(byName.label.description).toBe("Input label text");
    expect(byName.type.default).toBe('"text"');
    // events (callback props) are tagged with their CustomEvent detail type
    expect(byName.oninput.eventDetail).toBe("{ value: string }");
    expect(byName.onfocus.eventDetail).toBeUndefined();
  });

  it("extracts an inline `$props()` component (Button) with inferred types", () => {
    const byName = Object.fromEntries(
      readProps("src/lib/components/Button/Button.svelte").map((p) => [p.name, p]),
    );

    expect(byName.variant.type).toBe("string");
    expect(byName.variant.description).toBe(
      "Button variant (default, primary, secondary, outline, ghost, link)",
    );
    expect(byName.variant.default).toBe('"default"');
    expect(byName.loading.type).toBe("boolean");
    expect(byName.disabled.description).toBe("Whether the button is disabled");
  });

  it("extracts generic interface props (AutoComplete) and flags events", () => {
    const props = readProps("src/lib/components/Form/AutoComplete.svelte");
    const onselect = props.find((p) => p.name === "onselect");
    expect(onselect).toBeDefined();
    expect(onselect!.eventDetail).toContain("item");
  });

  it("extracts event details for a range of callback shapes", () => {
    const byName = Object.fromEntries(
      readProps("src/lib/components/Form/Calendar.svelte").map((p) => [p.name, p]),
    );
    expect(byName.onselect.eventDetail).toContain("date");
  });

  it("extracts nested-brace @type tags (Textarea oninput)", () => {
    const byName = Object.fromEntries(
      readProps("src/lib/components/Form/Textarea.svelte").map((p) => [p.name, p]),
    );
    expect(byName.oninput.type).toBe("(event: CustomEvent<{ value: string }>) => void");
    expect(byName.oninput.description).toBe("Input event handler");
    expect(byName.oninput.eventDetail).toBe("{ value: string }");
  });
});

describe("props documentation completeness", () => {
  it("every component prop has a JSDoc description", () => {
    const components = walk("src/lib/components").filter((f) => f.endsWith(".svelte"));
    const missing: string[] = [];
    for (const component of components) {
      for (const prop of extractProps(readFileSync(component, "utf8"))) {
        if (!prop.description || !prop.description.trim()) {
          missing.push(`${component}: ${prop.name}`);
        }
      }
    }
    expect(missing, `props missing descriptions:\n${missing.join("\n")}`).toEqual([]);
  });

  it("hand-written propsMetadata matches the extracted source of truth (no drift)", () => {
    const components = walk("src/lib/components").filter((f) => f.endsWith(".svelte"));
    const failures: string[] = [];

    for (const component of components) {
      const source = readFileSync(component, "utf8");
      const authored = readAuthoredMetadata(source);
      // Components without an authored array opt out (e.g. PropsTable/EventsTable,
      // whose docs pages pass a `data` hash instead).
      if (authored.length === 0) continue;

      const extracted = extractProps(source);
      const authoredByName = new Map(authored.map((entry) => [entry.name, entry]));
      const extractedByName = new Map(extracted.map((entry) => [entry.name, entry]));

      for (const extractedProp of extracted) {
        const authoredProp = authoredByName.get(extractedProp.name);
        if (!authoredProp) {
          failures.push(`${component}: authored metadata is missing prop ${extractedProp.name}`);
          continue;
        }
        for (const key of ["type", "description", "default", "optional", "eventDetail"] as const) {
          if (authoredProp[key] !== extractedProp[key]) {
            failures.push(
              `${component}: prop ${extractedProp.name} ${key} drift (authored: ` +
                `${JSON.stringify(authoredProp[key])}, extracted: ${JSON.stringify(extractedProp[key])})`,
            );
          }
        }
      }

      for (const authoredProp of authored) {
        if (!extractedByName.has(String(authoredProp.name))) {
          failures.push(
            `${component}: authored metadata lists unknown prop ${String(authoredProp.name)}`,
          );
        }
      }
    }

    expect(failures, `props metadata drift:\n${failures.join("\n")}`).toEqual([]);
  });
});

describe("docs page structure", () => {
  it("every component docs page has an <h1> heading", () => {
    const pages = walk("src/routes/docs/components").filter((f) => f.endsWith("+page.svelte"));
    expect(pages.length).toBeGreaterThan(80);

    for (const page of pages) {
      const source = readFileSync(page, "utf8");
      expect(source, `${page} should have an <h1>`).toMatch(/<h1[\s>]/);
    }
  });

  it("newly documented components have their own docs pages", () => {
    const expected = [
      "src/routes/docs/components/Footer/Footer/+page.svelte",
      "src/routes/docs/components/Section/Section/+page.svelte",
      "src/routes/docs/components/Lazy/Lazy/+page.svelte",
      "src/routes/docs/components/Panel/Hero/+page.svelte",
    ];
    for (const page of expected) {
      expect(() => readFileSync(page, "utf8")).not.toThrow();
    }
  });
});
