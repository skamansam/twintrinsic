# Planning Documents

This folder contains planning files created by agents working on Twintrinsic. These documents track project scope, implementation strategies, migration progress, and other planning artifacts that help coordinate work across sessions.

## Purpose

Planning files help agents:

- Track progress on large-scale refactoring or migration efforts
- Document implementation strategies and decisions
- Coordinate work across multiple components or features
- Maintain context for multi-session projects

## Guidelines

- Keep planning files concise and focused on actionable items
- Update progress regularly as work completes
- Link to relevant code, PRs, or issues when applicable
- Archive or remove completed plans to keep the folder organized

## Active Plans

### [`E2E_TO_STORYBOOK_MIGRATION_PLAN.md`](./E2E_TO_STORYBOOK_MIGRATION_PLAN.md)

**Status:** Approved, Phase A in progress (Status moved from Draft → Decisions approved, ready for pilot, see §9).

**Owner:** TBD.

**Summary.** Move component-level behavior out of Playwright tests in `tests/e2e/` and into Storybook `play` functions, leaving only docs-site smoke tests in Playwright. The `data-testid="<component>-<variant>"` convention is ratified (§4.1) and applied across docs pages. Storybook tests already run through `@storybook/addon-vitest` under `pnpm test:storybook`.

#### File-by-file checklist (live task tracker)

- §5.1 — Per-component table mapping each `tests/e2e/*.test.js/.ts` file to its story + docs route + Playwright artifact status.
- §5.2 — Stories that need `play` functions added (priority order).
- §5.3 — Docs routes that need `data-testid` hooks.
- §10 — Rollout order (Scaffolding → Avatar pilot → Bulk → Docs coverage → CI → Cleanup).

#### Resolved Decisions (§ 9)

Each open question has been resolved with rationale and implementation steps. Linked anchors assume standard Markdown slugification (lowercased, hyphens for spaces, dropped punctuation):

- [§ 9.1 — `CodeBlockSpeed` story-id typo (`codeblockspeeed` → `codeblockspeed`)](./E2E_TO_STORYBOOK_MIGRATION_PLAN.md#91-story-id-typo-codeblockspeeed--codeblockspeed--fix-tests) — **Fix tests.** Do not rename the story; tests already need rewriting.
- [§ 9.2 — Two ThemeToggle Playwright files](./E2E_TO_STORYBOOK_MIGRATION_PLAN.md#92-two-themetoggle-playwright-files--keep-typed-file-delete-the-js) — **Keep typed file, rename to `ThemeToggle.test.ts`, fix URL casing, delete `.js`.** Component behavior moves into `stories/ThemeToggle.stories.js` `play` functions.
- [§ 9.3 — `@storybook/addon-a11y`](./E2E_TO_STORYBOOK_MIGRATION_PLAN.md#93-storybookaddon-a11y--yes-enable-it) — **Yes, enable it.** Add to `.storybook/main.ts` addons and gate per-story a11y violations in CI.
- [§ 9.4 — CI workflow strategy](./E2E_TO_STORYBOOK_MIGRATION_PLAN.md#94-ci-workflow-strategy--add-a-separate-githubworkflowstestyml-and-gate-publishyml-on-it) — **Add `.github/workflows/test.yml` and gate `publish.yml` on it.**
- [§ 9.5 — Map render stability + visual regression](./E2E_TO_STORYBOOK_MIGRATION_PLAN.md#95-other-resolved-decisions-the-original--9-questions-3-and-5) — Map becomes docs-smoke-only (no pixel assertions). Defer per-story `toHaveScreenshot()`; rely on Chromatic.

### Other plans (historical / scoped)

- [`METRICS_COMPONENTS_PLAN.md`](./METRICS_COMPONENTS_PLAN.md) — implementation summary for the metrics suite.
- [`METRICS_IMPLEMENTATION_SUMMARY.md`](./METRICS_IMPLEMENTATION_SUMMARY.md) — incremental log of metrics implementation.
- [`TYPE_ERRORS_PLAN.md`](./TYPE_ERRORS_PLAN.md), [`TYPE_CHECK_ERRORS_PLAN.md`](./TYPE_CHECK_ERRORS_PLAN.md), [`LIB_TYPE_ERRORS_PLAN.md`](./LIB_TYPE_ERRORS_PLAN.md), [`BUILD_WARNINGS_PLAN.md`](./BUILD_WARNINGS_PLAN.md) — historical remediation of TypeScript/build warnings. Superseded by ongoing `pnpm check` hygiene; consult for context only.
- [`HTML_SEMANTIC_REPLACEMENT_PLAN.md`](./HTML_SEMANTIC_REPLACEMENT_PLAN.md) — audit of custom HTML element replacements with semantic HTML5 equivalents.

## When you start a session

1. Read [`next-up.txt`](./next-up.txt) for the immediate task pointer.
2. If a plan's § 9 has resolved decisions, follow them — do not re-open them.
3. Update the relevant plan's checklist (§ 5) as you complete work, and refresh the active-plan note in `next-up.txt` if the active plan changes.
