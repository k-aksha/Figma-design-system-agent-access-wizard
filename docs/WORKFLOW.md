# MCP workflow

This document describes how to bootstrap UDS in a Figma file using the **remote Figma MCP server** and the scripts in this repository.

## Concepts

| Term | Meaning |
|------|---------|
| **fileKey** | Target file ID for MCP calls (keep local; see `examples/local.config.example.json`) |
| **nodeId** | Layer id like `0:1` when drilling into a page or frame |
| **use_figma** | MCP write tool; runs Plugin API JavaScript in your file |
| **Idempotency** | Scripts check for existing collections/frames before creating |
| **run-plan.json** | Canonical script list after `npm run prepare:bootstrap` |

## Setup (order matters)

1. Add MCP config ([`examples/mcp.json.example`](../examples/mcp.json.example)) and reload the IDE.
2. **`mcp_auth`** until Figma MCP is ready; confirm with `whoami`.
3. Obtain **fileKey** from the user’s Figma Design link (session only).
4. Complete the **four-question wizard** ([`workflow/SETUP.md`](../workflow/SETUP.md)) → `design-system.config.json` → `npm run prepare:bootstrap`.
5. Confirm tools: `use_figma`, `get_metadata`, `get_variable_defs`.

## Execution pattern

For each script in **`generated/run-plan.json`**:

1. Read the `.js` file from `generated/`.
2. Call **`use_figma`** with:

```json
{
  "fileKey": "<YOUR_FILE_KEY>",
  "description": "<short summary>",
  "skillNames": "figma-use",
  "code": "<paste entire script contents>"
}
```

3. Verify with read tools:

| Goal | Tool |
|------|------|
| List pages | `get_metadata` with `fileKey` only |
| Page structure | `get_metadata` with `fileKey` + `nodeId` |
| Variables on selection | `get_variable_defs` |
| Visual check | `get_screenshot` |

Remote MCP **requires `fileKey`** on tool calls. Do not store file keys or file URLs in this repository.

## Recommended runs

### Full bootstrap

Set `setupScope` to `documentation-and-examples`. Run every script in `generated/run-plan.json` (**17** scripts: structure, tokens, component semantics, foundations, docs, scaffolding, primitives).

Start with [`prompts/setup-wizard.md`](../prompts/setup-wizard.md).

### Tokens only

Set `setupScope` to `variables-only` — plan includes **02**–**06** and **15**–**16** (8 scripts).

Foundations visuals **07** need page `Foundations` from **01** if you add docs later.

### Incremental

Scripts skip existing work. Re-run a single generated script after local edits, then re-verify.

## Dependencies

```
01 ─┬─► 07-11, 12-14
    └─► 17 (with 14, 15, 16)

02 ──► 15
03,04,05,06 ──► 16
05 ──► 08
03 ──► 09
04 ──► 10

02-06 independent among themselves (before 15-16)
```

## Verification checklist

After a full bootstrap:

- [ ] Variable collections: Colors (2 modes), Spacing, Radius, Typography, Sizing, **Component Colors** (2 modes)
- [ ] Component semantic aliases from **15**–**16** (`Component/*` in dimension collections)
- [ ] Foundations frames (if **07**–**11** ran)
- [ ] Cover + Getting Started
- [ ] `Component Page` on each route (**14**)
- [ ] **14** primitive component sets with Light/Dark previews (**17**)
- [ ] Agent Reference template + Button example

### Example verification snippet (`use_figma`)

```javascript
const collections = figma.variables
  .getLocalVariableCollections()
  .map((c) => ({ name: c.name, modes: c.modes.map((m) => m.name) }));
const pages = figma.root.children.map((p) => p.name);
return { collections, pageCount: pages.length, pages };
```

## Building primitives

Script **17** builds all primitives from [`config/component-build.json`](../config/component-build.json) using semantic tokens only. See [`COMPONENT-BUILD.md`](COMPONENT-BUILD.md) and [AGENTS.md](../AGENTS.md).

## MCP limitations

When using **`use_figma`** (remote), avoid:

- `loadAllPagesAsync`
- `setPluginData`
- `createImageAsync`

Use `await figma.setCurrentPageAsync(page)` to switch pages.

**Font:** load each style before text edits; Inter uses `"Semi Bold"` (with a space).

## Troubleshooting

| Issue | Action |
|-------|--------|
| `fileKey is required` | Pass `fileKey` on every remote MCP call |
| `needsAuth` | Run Figma MCP authentication again |
| `Foundations page not found` | Run `01-create-pages.js` or create page named `Foundations` |
| Font load errors | Install wizard font in Figma before doc scripts |
| Registry missing | Run `npm run prepare:bootstrap`; use `generated/` scripts for **15**–**17** |
| Duplicate content | Expected on re-run; delete frame/collection to force recreate |
