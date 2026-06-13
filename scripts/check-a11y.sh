#!/usr/bin/env bash
#
# check-a11y.sh — CI budget guard for accessibility warnings.
#
# Runs `pnpm build` and fails (exit 1) if any `a11y_` warnings are emitted
# by Svelte's compile-time a11y lint. Use as a pre-merge / pre-deploy gate
# to keep the component library WCAG-clean and free of silent a11y
# regressions.
#
# Usage:
#   pnpm check:a11y
#
# Exits:
#   0 — no a11y warnings
#   1 — one or more a11y warnings (prints the full list)
#   2 — the build itself failed
#
set -euo pipefail

BUILD_LOG=$(mktemp)
trap "rm -f $BUILD_LOG" EXIT

echo "→ Running pnpm build…"
if ! pnpm build >"$BUILD_LOG" 2>&1; then
  echo "✗ pnpm build failed. Full log:"
  cat "$BUILD_LOG"
  exit 2
fi

COUNT=$(grep -cE 'a11y_' "$BUILD_LOG" || true)

if [ "$COUNT" -eq 0 ]; then
  echo "✓ 0 a11y warnings — budget OK."
  exit 0
fi

echo "✗ $COUNT a11y warning(s) found. Per-file breakdown:"
grep -B0 'a11y_' "$BUILD_LOG" \
  | grep -oE 'src/[^ :]+\.svelte' \
  | sort | uniq -c | sort -rn
echo
echo "Per-category breakdown:"
grep -oE 'a11y_[a-z_]+' "$BUILD_LOG" \
  | sort | uniq -c | sort -rn
echo
echo "Full log retained at: $BUILD_LOG"
exit 1
