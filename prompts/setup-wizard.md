# Agent setup wizard (start here)

Follow these steps **in order**. Do not call `use_figma` until **Steps 0-2** are complete and the four questions (Step 3) are answered.

---

## Step 0 - Figma MCP configured

Confirm the user has the remote Figma MCP server in their client (e.g. Cursor `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

See [`examples/mcp.json.example`](../examples/mcp.json.example). Reload the IDE after changing MCP settings.

## Step 1 - Authenticate (required)

1. Inspect the Figma MCP namespace (e.g. `user-figma`). If status is `needsAuth` or tools are unavailable, call **`mcp_auth`** with empty arguments.
2. Wait for the user to complete the browser/OAuth flow if prompted.
3. Confirm with **`whoami`** (optional but recommended).

Do **not** ask setup questions or run bootstrap until authentication succeeds.

## Step 2 - Target file link (fileKey)

Ask the user:

> Paste the link to your Figma **Design** file (e.g. `https://www.figma.com/design/...`).

1. Extract **fileKey** from the URL (segment after `/design/`).
2. Store it **only for this session** (or in gitignored `local.config.json` - never commit to the repo).
3. Optionally verify access: **`get_metadata`** with `fileKey` (and no `nodeId` to list pages).

Do **not** write the file key into `design-system.config.json`, README, issues, or commits.

## Step 3 - Four setup questions

Ask exactly these (offer defaults if the user wants to move quickly):

### 1. Design system name

> What should we call your design system?

Record as `designSystemName` (string).

### 2. Setup scope

> Do you want **variables only**, or **variables plus documentation and examples**?

| User choice | `setupScope` value |
|-------------|-------------------|
| Variables only (global + component semantic tokens) | `variables-only` |
| Full scaffold (pages, docs, templates, all 14 primitives with Light/Dark) | `documentation-and-examples` |

### 3. Primary & accent color

> Pick a **primary** and **accent** palette.

Allowed values for both: `Blue`, `Green`, `Red`, `Amber`, `Violet`.

Record as `primaryPalette` and `accentPalette`.

### 4. Primary typography

> Which sans-serif font should be the default?

Allowed: `Inter`, `Roboto`, `Plus Jakarta Sans`, `IBM Plex Sans`, `Source Sans 3`.

Record as `fontFamily`. Use `JetBrains Mono` for `fontMono`.

## Step 4 - Write config

Create or update `design-system.config.json` at the repo root:

```json
{
  "designSystemName": "<answer 1>",
  "setupScope": "<answer 2>",
  "primaryPalette": "<answer 3a>",
  "accentPalette": "<answer 3b>",
  "fontFamily": "<answer 4>",
  "fontMono": "JetBrains Mono"
}
```

See `config/design-system.config.example.json` for shape.

## Step 5 - Generate scripts

Run in the project root:

```bash
npm run prepare:bootstrap
```

Read `generated/run-plan.json` for the ordered script list.

## Step 6 - Execute in Figma

For each entry in `generated/run-plan.json`:

1. Read `generated/<file>`.
2. Call **`use_figma`** with `fileKey` from Step 2, `skillNames`: `figma-use`, `description`: summary from run plan, `code`: full file contents.
3. Wait for completion before the next script.

## Step 7 - Report

Summarize: design system name, scope, palettes, font, scripts run, skips/errors. **Do not** include the file key or file URL in the summary.

---

Human-readable reference: [`workflow/SETUP.md`](../workflow/SETUP.md).
