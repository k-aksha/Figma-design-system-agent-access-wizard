# Agent instructions

This repository is meant to be driven by AI agents through the **Figma MCP server**. Follow this guide when bootstrapping or extending UDS.

## Goals

1. Produce a consistent Figma file structure defined by [`scripts/manifest.json`](scripts/manifest.json).
2. Prefer **variables** over hardcoded design values.
3. Keep naming stable for downstream code generation and Agent Reference docs.

## Required tools

- **`mcp_auth`** - authenticate Figma MCP first when status is `needsAuth`
- **`whoami`** - optional confirmation after auth
- **`use_figma`** - create/edit variables, pages, frames, components
- **`get_metadata`** - inspect page tree (always pass `fileKey`)
- **`get_variable_defs`** - audit token usage
- **`get_screenshot`** - visual verification

Load **figma-use** guidance before `use_figma` when your client supports skills.

## Bootstrap procedure

Follow [`prompts/setup-wizard.md`](prompts/setup-wizard.md) **in order**:

1. **MCP config** - user has Figma MCP (`examples/mcp.json.example`) in the IDE.
2. **`mcp_auth`** - authenticate Figma MCP before anything else; confirm with `whoami` if needed.
3. **File link** - ask for the Figma Design URL; extract **fileKey** (session / gitignored `local.config.json` only).
4. **Four questions** - design system name, setup scope, primary/accent palettes, font → `design-system.config.json`.
5. **`npm run prepare:bootstrap`** - use scripts from **`generated/run-plan.json`**.
6. **`use_figma`** - run each generated script with the session `fileKey`.
7. After each phase, verify:
   - **tokens (02-06):** collection names and variable counts
   - **component semantics (15-16):** `Component Colors` plus `Component/*` aliases in Typography, Spacing, Radius, Sizing (see [`docs/COMPONENT-TOKENS.md`](docs/COMPONENT-TOKENS.md))
   - **foundations (07-11):** named frames on `Foundations`
   - **14:** `Component Page` on each component route

Do **not** skip `01` before foundation or placeholder scripts unless the user explicitly wants a minimal file and you create required pages manually.

## Script execution template

```
fileKey: <session only - not persisted in repo>
description: Run generated/NN-name.js - <summary from run-plan.json>
skillNames: figma-use
code: <exact contents of generated/NN-name.js>
```

If a script uses top-level `await`, the MCP runtime supports it (as in `07`-`14`).

## Idempotency rules

- If a collection or frame already exists, scripts **notify and skip**.
- To rebuild: user must delete the collection/frame in Figma, or you must write a new migration script with explicit update logic.
- Never assume an empty file; call verification first.

## Naming conventions (from UDS)

- **Pages:** `Primitives / Button`, `Compound / Card`, etc.
- **Components:** PascalCase (`Button`, `DataTable`)
- **Variants:** `Variant=Primary, Size=MD, State=Default` (comma-separated `Prop=Value`)
- **Layers:** semantic names (`Container`, `Label`, `Icon Left`)

## Component properties (Plugin API)

- Call `addComponentProperty` on each variant **before** `combineAsVariants`.
- Capture returned property keys; wire `componentPropertyReferences` on child nodes.
- Read `componentPropertyDefinitions` from the **component set**, not variant children.

## Token bindings

When building components:

| Property | Variable collection |
|----------|---------------------|
| Fill / stroke colors | `Component Colors` → `{Primitive}/{role}` (aliases global `Colors`) |
| Fallback / non-component | `Colors` → `Semantic/*` or `Surface/*` |
| Padding, gap | `Spacing/Component/{Primitive}/*` |
| Corner radius | `Radius/Component/{Primitive}/*` |
| Height, icon size | `Sizing/Component/{Primitive}/*` |
| Font size, weight, line height | `Typography/Component/{Primitive}/*` |

Font family STRING variables may not bind to all text fields; set `fontName` explicitly (Inter) and bind numeric typography vars where supported.

## Agent Reference page

After primitives exist, document each component using the template on the **Agent Reference** page:

- Use when / Don't use when
- Responsive behavior
- Pairs with
- Rules

The Button example on that page is the canonical format.

## What not to do

- Do not commit, log in issues, or echo Figma file keys or file URLs in repository content.
- Do not use blocked APIs in MCP (`loadAllPagesAsync`, `setPluginData`, `createImageAsync`).
- Do not create enormous variant grids without user approval; prefer booleans and instance swap for icons.

## Repository changes

When adding a new bootstrap script:

1. Add `scripts/NN-description.js` with idempotency checks.
2. Append an entry to `scripts/manifest.json`.
3. Update `README.md` script table if the phase changes.
