#!/usr/bin/env node
/**
 * build-research-data.mjs — publishes the component research (plan item
 * "Component Research Checklist") to the docs site.
 *
 * Parses `docs/plans/COMPONENT_RESEARCH_CHECKLIST.md` (the curated
 * What/When/Why research for every component) into a typed TS data module
 * consumed by the `/docs/research` page.
 *
 * The markdown file stays the source of truth: edit the checklist, run
 * `pnpm build:research`, commit both. The generated file is committed so
 * consumers/builds never need to re-derive it.
 *
 * Usage: node scripts/build-research-data.mjs [--check]
 *   --check  exit 1 if the generated file is stale (CI gate)
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();
const SOURCE = join(ROOT, "docs", "plans", "COMPONENT_RESEARCH_CHECKLIST.md");
const OUT = join(ROOT, "src", "routes", "docs", "research", "researchData.generated.ts");

const md = await readFile(SOURCE, "utf8");

/** @typedef {{ name: string, entries: ResearchEntry[] }} ResearchCategory */
/** @typedef {{ title: string, slug: string, what: string, when: string, why: string, sources: string[], implementation: string[], mistakes: string[], related: string[] }} ResearchEntry */

/** A checklist row: `| **What** | … |` — one row per field. */
const TABLE_ROW_RE = /^\| \*\*(What|When|Why)\*\* \| (.+) \|$/gm;

/**
 * Strip markdown emphasis + inline-code backticks and trim trailing
 * spaces — the checklist uses `**bold**`/backticks for readability; on
 * the page we render plain text inside semantic markup.
 * @param {string} s
 */
function clean(s) {
  return s.replaceAll("**", "").replaceAll("`", "").trim();
}

/**
 * Split a comma-separated citation list on commas at paren depth 0, so
 * `S2 (<main>, <header>, <nav>)` stays one entry.
 * @param {string} s
 * @returns {string[]}
 */
function splitCitations(s) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(" || ch === "[") depth++;
    else if (ch === ")" || ch === "]") depth--;
    else if (ch === "," && depth === 0) {
      out.push(s.slice(start, i));
      start = i + 1;
    }
  }
  out.push(s.slice(start));
  return out.map(clean).filter(Boolean);
}

/**
 * Parse one entry block's body into its fields.
 * @param {string} body
 * @param {string} title
 * @returns {ResearchEntry}
 */
function parseEntry(body, title) {
  const what = [];
  const when = [];
  const why = [];
  for (const [, field, value] of body.matchAll(TABLE_ROW_RE)) {
    const v = clean(value);
    if (field === "What") what.push(v);
    else if (field === "When") when.push(v);
    else why.push(v);
  }

  const sources = [];
  const sourcesMatch = body.match(/\*\*Sources:\*\* (.+)$/m);
  if (sourcesMatch) sources.push(...splitCitations(sourcesMatch[1]));

  /** Collect the bullets under a `**Heading:**` line until the next heading/blank-line-then-heading. */
  function bullets(heading) {
    const out = [];
    const re = new RegExp(`\\*\\*${heading}:\\*\\*\\n([\\s\\S]*?)(?=\\n\\n\\*\\*|\\n\\*\\*|$)`);
    const m = body.match(re);
    if (m) {
      for (const line of m[1].split("\n")) {
        const t = line.trim();
        if (t.startsWith("- ")) out.push(clean(t.slice(2)));
      }
    }
    return out;
  }

  const related = [];
  const relatedMatch = body.match(/\*\*Related:\*\* (.+)$/m);
  if (relatedMatch) related.push(...splitCitations(relatedMatch[1]));

  /** URL-safe slug from the entry title ("2.4 Select / SelectGroup" → "select-selectgroup"). */
  const slug = title
    .toLowerCase()
    .replace(/^\d+(\.\d+)?\s+/, "")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return {
    title: clean(title),
    slug,
    what: what.join(" "),
    when: when.join(" "),
    why: why.join(" "),
    sources,
    implementation: bullets("Twintrinsic Implementation"),
    mistakes: bullets("Common Mistakes"),
    related,
  };
}

/** @type {ResearchCategory[]} */
const categories = [];
let currentCategory = null;
/** @type {{ title: string, body: string } | null} */
let currentEntry = null;

/**
 * Flush the pending entry into the current category.
 */
function flushEntry() {
  if (!currentEntry || !currentCategory) return;
  currentCategory.entries.push(parseEntry(currentEntry.body, currentEntry.title));
  currentEntry = null;
}

for (const line of md.split("\n")) {
  const cat = line.match(/^## (?!Sources|Legend|Summary|Next)(.+)$/);
  if (cat) {
    flushEntry();
    currentCategory = { name: clean(cat[1]), entries: [] };
    categories.push(currentCategory);
    continue;
  }
  const entry = line.match(/^### (.+)$/);
  if (entry) {
    flushEntry();
    currentEntry = { title: entry[1], body: "" };
    continue;
  }
  if (currentEntry) currentEntry.body += line + "\n";
}
flushEntry();

const total = categories.reduce((n, c) => n + c.entries.length, 0);

// ── Sanity guards — fail loudly on structural drift in the checklist ──
const problems = [];
if (total === 0) problems.push("no entries parsed — heading format changed?");
for (const c of categories) {
  for (const e of c.entries) {
    if (!e.what) problems.push(`${e.title}: missing What`);
    if (!e.when) problems.push(`${e.title}: missing When`);
    if (!e.why) problems.push(`${e.title}: missing Why`);
    if (e.sources.length === 0) problems.push(`${e.title}: no sources`);
  }
}
if (problems.length > 0) {
  console.error(`✖ research data problems:\n  - ${problems.join("\n  - ")}`);
  process.exit(1);
}

const banner = `// Generated by scripts/build-research-data.mjs from
// docs/plans/COMPONENT_RESEARCH_CHECKLIST.md — do not edit by hand.
// Re-generate: pnpm build:research

/** One research entry for a component (or component family). */
export interface ResearchEntry {
	/** Entry title, e.g. "2.4 Select / SelectGroup" */
	title: string
	/** URL-safe slug for anchor links */
	slug: string
	/** What the component is */
	what: string
	/** When to use it */
	when: string
	/** Why — the design rationale */
	why: string
	/** Cited sources, e.g. ["S1 (Listbox)", "S2 (<select>)"] */
	sources: string[]
	/** Twintrinsic implementation notes */
	implementation: string[]
	/** Common mistakes to avoid */
	mistakes: string[]
	/** Related component names */
	related: string[]
}

/** A research category with its entries. */
export interface ResearchCategory {
	name: string
	entries: ResearchEntry[]
}

export const researchCategories: ResearchCategory[] = `;

const body =
  JSON.stringify(categories, null, 2)
    // Key quoting: JSON.stringify quotes keys; TS is fine with that, but
    // prefer unquoted identifiers for readability.
    .replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, "$1:") + "\n";

const footer = `
/** Total number of researched entries across all categories. */
export const researchEntryCount = ${total}

/** All sources referenced by the checklist, in citation order. */
export const researchSources = ${JSON.stringify(
  [
    ...new Set(
      categories.flatMap((c) => c.entries.flatMap((e) => e.sources.map((s) => s.split(" ")[0]))),
    ),
  ],
  null,
  2,
).replaceAll('"([a-zA-Z_][a-zA-Z0-9_]*)":', "$1:")}
`;

await writeFile(OUT, banner + body + footer);

console.log(`✔ ${total} entries across ${categories.length} categories → ${OUT}`);

if (process.argv.includes("--check")) {
  // Re-run in check mode: since output is deterministic, the file we just
  // wrote IS current. Staleness is detected by CI comparing git status.
  const { execFileSync } = await import("node:child_process");
  try {
    execFileSync("git", ["diff", "--exit-code", "--", OUT], { stdio: "pipe" });
    console.log("✔ generated data is up to date");
  } catch {
    console.error("✖ researchData.generated.ts is stale — run `pnpm build:research` and commit");
    process.exit(1);
  }
}
