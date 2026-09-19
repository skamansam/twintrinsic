// Type surface for Vite-only import.meta properties (glob/env).
//
// tsconfig.lib.json sets `types: []`, so `import.meta.glob` is otherwise
// undeclared and a literal `import.meta.glob(...)` call fails `check:lib`.
// A triple-slash reference is not affected by the `types` option (it only
// gates automatic @types inclusion), so this reference re-enables the
// Vite client types WITHOUT shipping any runtime code — i18n components
// call `import.meta.glob` literally (the call MUST be literal: Vite's
// build-time transform keys on the call syntax; extracting it to a
// variable defeats the transform and returns undefined at runtime) and
// guard the call with try/catch for non-Vite hosts.
/// <reference types="vite/client" />
