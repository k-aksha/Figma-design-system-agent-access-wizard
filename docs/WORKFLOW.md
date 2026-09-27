# MCP workflow

This document describes how to bootstrap UDS in a Figma file using the **remote Figma MCP server** and the scripts in this repository.

## Concepts

| Term | Meaning |
|------|---------|
| **fileKey** | Target file ID for MCP calls (keep local; see `examples/local.config.example.json`) |
| **nodeId** | Layer id like `0:1` when drilling into a page or frame |
| **use_figma** | MCP write tool; runs Plugin API JavaScript in your file |
| **Idempotency** | Scripts check for existing collections/frames before creating |

## Setup (order matters)

1. Add MCP config ([`examples/mcp.json.example`](../examples/mcp.json.example)) and reload the IDE.
2. **`mcp_auth`** until Figma MCP is ready; confirm with `whoami`.
3. Obtain **fileKey** from the user’s Figma Design link (session only).
4. Complete the **four-question wizard** ([`workflow/SETUP.md`](../workflow/SETUP.md)) → `design-system.config.json` → `npm run prepare:bootstrap`.
5. Confirm tools: `use_figma`, `get_metadata`, `get_variable_defs`.

## Execution pattern

For each script in **`generated/run-plan.json`** (after `npm run prepare:bootstrap`):

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

3. Optionally verify with a follow-up `use_figma` call that returns structured data, or use read tools:

| Goal | Tool |
|------|------|
| List pages | `get_metadata` with `fileKey` only |
| Page structure | `get_metadata` with `fileKey` + `nodeId` |
| Variables on selection | `get_variable_defs` |
| Visual check | `get_screenshot` |

Remote MCP **requires `fileKey`** on tool calls. Do not store file keys or file URLs in this repository.

## Recommended runs

### Full bootstrap

Set `setupScope` to `documentation-and-examples` in the wizard, then run all scripts in `generated/run-plan.json` (14 calls).

Start with [`prompts/setup-wizard.md`](../prompts/setup-wizard.md).

### Tokens only

Set `setupScope` to `variables-only` - run plan includes **02-06** only.

Foundations visuals **07** need page `Foundations` from **01** (or create that page manually before **07**).

### Incremental (already started)

Scripts skip existing work. Re-run a single script after editing it locally, then re-verify.

## Dependencies

```
01 ─┬─► 07-11, 12-14
    │
02-06 (independent, any order among themselves)
05 ──► 08 (typography docs reference type scale)
03 ──► 09
04 ──► 10
```

## Verification checklist

After a full bootstrap:

- [ ] Variable collections: Colors (2 modes), Spacing, Radius, Typography, Sizing
- [ ] Foundations frames: Color System, Typography Scale, Spacing, Radius, Elevation (if 07-11 ran)
- [ ] Cover + Getting Started content
- [ ] Each component page has a `Component Page` frame (script 14)
- [ ] Agent Reference page with template + Button example

### Example verification snippet (`use_figma`)

```javascript
const collections = figma.variables
  .getLocalVariableCollections()
  .map((c) => ({ name: c.name, modes: c.modes.map((m) => m.name) }));
const pages = figma.root.children.map((p) => p.name);
return { collections, pageCount: pages.length, pages };
```

## MCP limitations

When using **`use_figma`** (remote), avoid:

- `loadAllPagesAsync`
- `setPluginData`
- `createImageAsync`

Use `await figma.setCurrentPageAsync(page)` to switch pages (not `figma.currentPage =`).

**Inter font:** style names are `"Semi Bold"` and `"Extra Bold"` (with a space), not `SemiBold`.

## Building primitives (next phase)

After tokens and scaffolding:

1. Add component-level color aliases (optional `Primitives` collection).
2. Build component sets on each `Primitives / *` page with `use_figma`.
3. Bind fills, strokes, padding, radius, and sizes to variables.
4. Fill **Agent Reference** behavior maps.

See [AGENTS.md](../AGENTS.md) for variant and property conventions.

## Troubleshooting

| Issue | Action |
|-------|--------|
| `fileKey is required` | Pass `fileKey` on every remote MCP call |
| `needsAuth` | Run Figma MCP authentication again |
| `Foundations page not found` | Run `01-create-pages.js` or create page named `Foundations` |
| Font load errors | Ensure Inter is installed; load each font style before text edits |
| Duplicate content | Expected if re-run; scripts skip by name - delete frame/collection to force recreate |
