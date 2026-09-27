# Scripts

Figma Plugin API scripts for UDS bootstrap. Run in numeric order unless you only need a subset (see [`manifest.json`](manifest.json)).

## Order

| # | File | Phase |
|---|------|--------|
| 01 | `01-create-pages.js` | structure |
| 02 | `02-variables-colors.js` | tokens |
| 03 | `03-variables-spacing.js` | tokens |
| 04 | `04-variables-radius.js` | tokens |
| 05 | `05-variables-typography.js` | tokens |
| 06 | `06-variables-sizing.js` | tokens |
| 07 | `07-foundations-colors.js` | foundations |
| 08 | `08-foundations-typography.js` | foundations |
| 09 | `09-foundations-spacing.js` | foundations |
| 10 | `10-foundations-radius.js` | foundations |
| 11 | `11-foundations-elevation.js` | foundations |
| 12 | `12-cover-page.js` | docs |
| 13 | `13-getting-started.js` | docs |
| 14 | `14-page-placeholders.js` | scaffolding |

## Running via MCP

See [`../docs/WORKFLOW.md`](../docs/WORKFLOW.md).

## Running via plugin

Wrap execution in `figma.closePlugin()` when done. Each script is self-contained; paste into your plugin `code.ts` / runner as needed.
