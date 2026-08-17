/**
 * Props extraction utility — the single source of truth for the props
 * documentation metadata that components co-locate as `export const
 * propsMetadata` in their `<script module>` block.
 *
 * Svelte 5 compiles props away at build time, so there is no runtime way to
 * introspect a component's props. This script parses each component's
 * `<script>` (via `svelte/compiler` + the TypeScript compiler API) and
 * returns the extracted props; the drift guard in `tests/unit/docs-props.test.ts`
 * compares that output against the hand-maintained `propsMetadata` arrays so
 * the two can't silently diverge.
 *
 * It understands the prop conventions used across the library:
 *   1. `interface Props { /** doc *\/ prop?: type }`
 *   2. `interface XxxProps { ... }` / `type XxxProps = { ... }`
 *   3. inline `const { /** @type {type} - doc *\/ prop = default } = $props()`
 *   4. inline `const { prop = default } = $props()` (no JSDoc — type inferred)
 *
 * Defaults are merged from the `$props()` destructuring; `on*` callbacks that
 * dispatch a `CustomEvent<D>` are tagged with their event detail type.
 */
import { parse } from "svelte/compiler";
import ts from "typescript";

/** Return the raw `<script>`/`<script module>` bodies for a component. */
function getScripts(ast, source) {
  const scripts = [];
  for (const key of ["module", "instance"]) {
    const s = ast[key];
    if (s) scripts.push(source.slice(s.content.start, s.content.end));
  }
  return scripts;
}

function makeSourceFile(scripts) {
  return ts.createSourceFile(
    "component.ts",
    scripts.join("\n"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
}

/** Find an interface/type-alias whose name mentions "props" (case-insensitive). */
function findPropsDecl(sf) {
  const candidates = [];
  function visit(node) {
    if (
      (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
      node.name.text.toLowerCase().includes("props")
    ) {
      candidates.push(node);
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  // Prefer an interface/type named exactly "Props" over helper types such as
  // `ChildProps` or `SelectProps`; otherwise fall back to the first match.
  return candidates.find((n) => n.name.text === "Props") ?? candidates[0] ?? null;
}

/** Find the `$props()` destructuring (e.g. `let { ... }: Props = $props()`). */
function findPropsDestructure(sf) {
  let found = null;
  function visit(node) {
    if (found) return;
    if (
      ts.isVariableStatement(node) &&
      node.declarationList.declarations.some((d) => {
        return (
          ts.isObjectBindingPattern(d.name) &&
          d.initializer &&
          ts.isCallExpression(d.initializer) &&
          d.initializer.expression.getText(sf) === "$props"
        );
      })
    ) {
      const d = node.declarationList.declarations.find((x) => ts.isObjectBindingPattern(x.name));
      if (d) found = d;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  return found;
}

/** Normalize a JSDoc comment block into a one-line description. */
function cleanDescription(raw) {
  return raw
    .replace(/\/\*\*?/g, "")
    .replace(/\*\//g, "")
    .split("\n")
    .map((l) => l.replace(/^\s*\*\s?/, "").trim())
    .filter(Boolean)
    .join(" ")
    .replace(/^\s*-\s*/, "")
    .trim();
}

/**
 * Extract the type from an `@type {T}` JSDoc tag, balancing nested braces so
 * types like `(event: CustomEvent<{ value: string }>) => void` parse correctly.
 */
function extractBalancedType(comment) {
  const m = comment.match(/@type\s*\{/);
  if (!m) return undefined;
  let depth = 0;
  const openIdx = m.index + m[0].length - 1; // position of the opening `{`
  for (let i = openIdx; i < comment.length; i++) {
    if (comment[i] === "{") depth++;
    else if (comment[i] === "}") {
      depth--;
      if (depth === 0) return comment.slice(openIdx + 1, i).trim();
    }
  }
  return undefined;
}

/**
 * Description text of the JSDoc block on an interface/type member.
 * Handles both a plain comment and a `@type {T} - desc` tag (where the prose
 * lives in the `@type` tag's trailing comment).
 */
function getMemberDescription(member, sf) {
  const docs = ts.getJSDocCommentsAndTags(member);
  const parts = [];
  for (const j of docs) {
    if (j.comment) parts.push(String(j.comment));
    if (j.tags) {
      for (const t of j.tags) {
        if (ts.isJSDocTypeTag(t) && t.comment) parts.push(String(t.comment));
      }
    }
  }
  return parts
    .join(" ")
    .replace(/\n\s*\*\s?/g, " ")
    .replace(/^\s*-\s*/, "")
    .trim();
}

/**
 * Extract `/** @type {T} - desc *\/` inline JSDoc (pattern 3). The JSDoc on a
 * binding element is leading trivia not surfaced by getJSDocCommentsAndTags, so
 * slice the binding element's raw text and regex the comment block.
 */
function parseInlineJsDoc(el, sf) {
  const raw = sf.text.slice(el.pos, el.end);
  const block = raw.match(/\/\*\*?([\s\S]*?)\*\//);
  if (!block) return {};
  const comment = `/**${block[1]}*/`;
  const type = extractBalancedType(comment);
  let description = comment;
  if (type !== undefined) {
    // Drop the `@type {T}` tag (balanced) so only the trailing prose remains.
    const m = comment.match(/@type\s*\{/);
    const endIdx = m.index + m[0].length + type.length + 1; // +1 for closing `}`
    description = comment.slice(endIdx);
  }
  return {
    type,
    description: cleanDescription(description),
  };
}

/** Infer a display type string from an initializer expression. */
function inferType(initializer, sf) {
  if (!initializer) return "unknown";
  if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer))
    return "string";
  if (ts.isNumericLiteral(initializer)) return "number";
  if (
    initializer.kind === ts.SyntaxKind.TrueKeyword ||
    initializer.kind === ts.SyntaxKind.FalseKeyword
  )
    return "boolean";
  if (ts.isObjectLiteralExpression(initializer)) return "object";
  if (ts.isArrayLiteralExpression(initializer)) return "Array";
  if (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)) return "function";
  if (ts.isCallExpression(initializer)) {
    const name = initializer.expression.getText(sf);
    if (name.startsWith("crypto.randomUUID")) return "string";
    return "unknown";
  }
  return initializer.getText(sf);
}

/**
 * Extract the event detail type from a callback prop's type, if it dispatches
 * a CustomEvent. Only `CustomEvent`-based callbacks are component "events";
 * raw DOM event passthroughs (`onfocus: (e: FocusEvent) => void`, etc.) are
 * treated as plain callback props and excluded from the events table.
 */
function extractEventDetail(typeText) {
  if (!typeText.includes("CustomEvent")) return undefined;
  const generic = typeText.match(/CustomEvent\s*<\s*([^>]*?)\s*>/);
  if (generic) return generic[1].trim();
  return "unknown";
}

/** Normalize a type string for display (strip outer whitespace/newlines). */
function normalizeType(t) {
  return (t || "unknown").replace(/\s+/g, " ").trim();
}

/**
 * Drop explicit `= undefined` initializers: they mean "no default" and
 * would otherwise surface as a literal `undefined` default in the tables.
 */
function cleanDefault(value) {
  return value === undefined || value === "undefined" ? undefined : value;
}

/**
 * Extract props metadata from a component source string.
 * @returns {Array<{ name, type, description, default?, optional, eventDetail? }>}
 */
export function extractProps(source) {
  const ast = parse(source, { modern: true });
  const scripts = getScripts(ast, source);
  if (!scripts.length) return [];
  const sf = makeSourceFile(scripts);

  const decl = findPropsDecl(sf);
  const destructure = findPropsDestructure(sf);

  // Defaults come from the `$props()` destructuring.
  const defaults = new Map();
  if (destructure) {
    for (const el of destructure.name.elements) {
      if (!ts.isBindingElement(el)) continue;
      const propName = el.propertyName ? el.propertyName.getText(sf) : el.name.getText(sf);
      if (el.initializer) defaults.set(propName, el.initializer.getText(sf));
    }
  }

  const props = [];

  if (decl) {
    // Patterns 1 & 2: interface/type with JSDoc members.
    const members = ts.isInterfaceDeclaration(decl)
      ? decl.members
      : ts.isTypeLiteralNode(decl.type)
        ? decl.type.members
        : [];
    for (const m of members) {
      if (!ts.isPropertySignature(m)) continue;
      const name = m.name.text;
      const optional = !!m.questionToken;
      const type = normalizeType(m.type ? m.type.getText(sf) : "unknown");
      const description = getMemberDescription(m, sf);
      props.push({
        name,
        type,
        description,
        default: cleanDefault(defaults.get(name)),
        optional,
      });
    }
  } else if (destructure) {
    // Patterns 3 & 4: inline `$props()` destructuring.
    for (const el of destructure.name.elements) {
      if (!ts.isBindingElement(el)) continue;
      if (el.dotDotDotToken) continue; // skip rest props
      const name = el.propertyName ? el.propertyName.getText(sf) : el.name.getText(sf);
      const inline = parseInlineJsDoc(el, sf);
      const type = inline.type
        ? normalizeType(inline.type)
        : normalizeType(inferType(el.initializer, sf));
      const description = inline.description || "";
      const hasDefault = !!el.initializer;
      props.push({
        name,
        type,
        description,
        default: hasDefault ? cleanDefault(el.initializer.getText(sf)) : undefined,
        optional: hasDefault,
      });
    }
  }

  // Tag event callbacks (Svelte 5 `on*` callback props that dispatch events).
  for (const p of props) {
    if (/^on/.test(p.name) && p.type.includes("CustomEvent")) {
      const detail = extractEventDetail(p.type);
      if (detail !== undefined) p.eventDetail = detail;
    }
  }

  // Skip `children`/snippet plumbing from the props table (documented separately).
  return props.filter(
    (p) => p.name !== "children" && p.name !== "restProps" && p.name !== "elementProps",
  );
}
