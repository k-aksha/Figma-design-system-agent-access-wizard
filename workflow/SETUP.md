# Setup wizard

Every bootstrap run follows a **fixed order**:

1. **Figma MCP** configured in the IDE  
2. **`mcp_auth`** - OAuth / access granted  
3. **Figma file link** → extract **fileKey** (session only)  
4. **Four questions** → `design-system.config.json`  
5. **`npm run prepare:bootstrap`** → `generated/run-plan.json`  
6. **`use_figma`** for each generated script  

**Non-technical users:** [`../prompts/start-here.md`](../prompts/start-here.md) - copy-paste prompt; no terminal required.

Agents must use [`../prompts/setup-wizard.md`](../prompts/setup-wizard.md) step-by-step (or honor the user prompt from `start-here.md`).

## Preflight (before any questions)

### A. MCP configuration

Copy [`examples/mcp.json.example`](../examples/mcp.json.example) into the client MCP settings and reload the IDE.

### B. MCP authentication

The coding agent should call **`mcp_auth`** on the Figma MCP server when tools show `needsAuth`. Confirm with **`whoami`** if needed.

**Do not** proceed to the questionnaire until auth works.

### C. File link

Ask the user for a Figma **Design** file URL. Parse **fileKey** from:

`https://www.figma.com/design/<fileKey>/<file-name>?...`

- Keep the key in the chat session or gitignored `local.config.json`.
- Never commit file keys or URLs to this repository.

Optional smoke test: `get_metadata` with `fileKey` to list pages.

---

## Four questions (after preflight)

### 1. Design system name

**Ask:** What should we call your design system?

- **Examples:** `Acme Design System`, `Product UI`, `Brand DS`
- **Used on:** Cover page, Getting Started header, doc subtitles
- **Field:** `designSystemName`

### 2. Setup scope

**Ask:** What should we set up in Figma?

| Option | Value | What runs |
|--------|--------|-----------|
| **Variables only** | `variables-only` | Scripts `02`-`06` (Colors, Spacing, Radius, Typography, Sizing) |
| **Variables + documentation & examples** | `documentation-and-examples` | Scripts `01`-`14` (pages, tokens, foundation visuals, Cover, Getting Started, component page templates, Agent Reference) |

- **Field:** `setupScope`

### 3. Primary & accent color

**Ask:** Choose a **primary** brand color and an **accent** color.

Each must be one of: **Blue**, **Green**, **Red**, **Amber**, **Violet** (primitive palettes in the Colors collection).

- Primary drives `Semantic/Primary`, focus ring (`Surface/Ring`), and primary swatches in docs.
- Accent drives `Semantic/Accent` for highlights and secondary emphasis.

- **Fields:** `primaryPalette`, `accentPalette`

### 4. Primary typography

**Ask:** Which **sans-serif** font should be the default for UI and documentation?

Supported (install in Figma before running doc scripts):

- **Inter** (default)
- **Roboto**
- **Plus Jakarta Sans**
- **IBM Plex Sans**
- **Source Sans 3**

Mono code font stays **JetBrains Mono** unless you extend the config later.

- **Field:** `fontFamily`

## After the questionnaire

1. Write `design-system.config.json` at the repo root (see `config/design-system.config.example.json`).
2. Run `npm run prepare:bootstrap`.
3. Execute each file in `generated/run-plan.json` via `use_figma` using the **fileKey** from preflight.

**What will appear in Figma?** See [docs/WHAT-THE-WORKFLOW-PRODUCES.md](../docs/WHAT-THE-WORKFLOW-PRODUCES.md).

### CLI alternative (`npm run setup`)

The terminal wizard asks for the **file link first**, then the four questions. It saves `fileKey` to gitignored `local.config.json` and answers to `design-system.config.json`. **MCP auth still happens in the IDE** before an agent runs `use_figma`.

## Defaults (if user skips customization)

| Field | Default |
|--------|---------|
| `designSystemName` | Universal Design System |
| `setupScope` | documentation-and-examples |
| `primaryPalette` | Blue |
| `accentPalette` | Amber |
| `fontFamily` | Inter |
