# Scripts

Figma Plugin API scripts for UDS bootstrap. **`scripts/manifest.json`** defines order, phases, profiles, and dependencies. **`generated/run-plan.json`** is the canonical list after `npm run prepare:bootstrap`.

## Execution order

| # | File | Phase |
|---|------|--------|
| 01 | `01-create-pages.js` | structure |
| 02 | `02-variables-colors.js` | tokens |
| 03 | `03-variables-spacing.js` | tokens |
| 04 | `04-variables-radius.js` | tokens |
| 05 | `05-variables-typography.js` | tokens |
| 06 | `06-variables-sizing.js` | tokens |
| 15 | `15-component-colors.js` | component-tokens |
| 16 | `16-component-dimensions.js` | component-tokens |
| 07 | `07-foundations-colors.js` | foundations |
| 08 | `08-foundations-typography.js` | foundations |
| 09 | `09-foundations-spacing.js` | foundations |
| 10 | `10-foundations-radius.js` | foundations |
| 11 | `11-foundations-elevation.js` | foundations |
| 12 | `12-cover-page.js` | docs |
| 13 | `13-getting-started.js` | docs |
| 14 | `14-page-placeholders.js` | scaffolding |
| 17 | `17-build-primitives.js` | components |

## Setup scopes (`manifest.json` → `profiles`)

| Scope | Script ids |
|-------|------------|
| `variables-only` | `02`–`06`, `15`, `16` |
| `documentation-and-examples` | `01`–`14`, `15`, `16`, `17` (order matches `executionOrder`) |

## Source conventions

Committed sources use placeholders; **`npm run prepare:bootstrap`** writes `generated/`:

| Placeholder | Used by |
|-------------|---------|
| `const __DS_CONFIG__ = null` | Scripts that read wizard config (replaced with JSON) |
| `const __COMPONENT_TOKEN_REGISTRY__ = null` | `15`, `16`, `17` |
| `const __PRIMITIVE_BUILD_REGISTRY__ = null` | `17` |
| `// __INCLUDE_COMPONENT_BINDINGS__` | `17` |
| `// __INCLUDE_COMPONENT_ARCHETYPES__` | `17` |

Scripts without `__DS_CONFIG__` in source get config prepended at prepare time.

## Notify messages

| Prefix | Meaning |
|--------|---------|
| `ERROR:` | Blocking; fix prerequisites and re-run |
| `WARN:` | Partial failure; check preceding messages |
| `… already exists - skipping.` | Idempotent skip |
| `… created:` / `… built:` | Success summary |

## Running via MCP

See [`../docs/WORKFLOW.md`](../docs/WORKFLOW.md). Always paste from **`generated/`**, not raw `scripts/`, for **15**–**17**.

## Component builds

See [`../docs/COMPONENT-BUILD.md`](../docs/COMPONENT-BUILD.md).
