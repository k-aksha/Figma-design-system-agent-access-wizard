# Building Figma components (semantic tokens + themes)

Primitive components in this design system must be built **only** from outputs of scripts **15** and **16**. They must **resolve correctly in both Light and Dark** via Figma variable modes (no duplicate components per theme).

## Single build script (17)

All **14 primitives** are defined in [`config/component-build.json`](../config/component-build.json) and built by **`17-build-primitives.js`** in one MCP run after tokens and scaffolding.

| Concern | Location |
|---------|----------|
| Which primitives, pages, archetypes | `config/component-build.json` |
| Color roles per primitive | `config/component-color-roles.json` |
| Dimension aliases | `config/component-tokens/*.json` |
| Variable binding helpers | `scripts/shared/component-semantic-bindings.js` |
| Layer graphs per archetype | `scripts/shared/component-build-archetypes.js` |

`npm run prepare:bootstrap` inlines shared helpers and registries into `generated/17-build-primitives.js`. **Do not** run committed `scripts/` copies directly for **15**–**17** without preparing.

## Allowed bindings

| Property | Source | Example |
|----------|--------|---------|
| Fill, stroke, text color | **`Component Colors`** | `Button/Action/Primary/Background` |
| Padding, gap | **`Spacing`** | `Component/Button/Padding/X` |
| Corner radius | **`Radius`** | `Component/Button/Corner` |
| Height, icon size | **`Sizing`** | `Component/Button/Height` |
| Font size, weight, line height | **`Typography`** | `Component/Button/Label/Size` |

Font **family** comes from wizard `fontFamily` (script 05). Do not hardcode hex fills on component layers.

## Forbidden on primitive layers

- Raw hex or RGB fills on component structure (Container, Label, Icon, Track, etc.)
- Direct binds to global **`Colors`** primitives (`Blue/600`, `Neutral/0`, …)
- Direct binds to global **`Semantic/*`** or **`Surface/*`** on components (use **`Component Colors`** aliases instead)
- Separate Light and Dark component sets (use **one** set + variable modes)

Documentation frames (`Component Page`, `Themes Guide`, Agent Reference) may use static neutrals for labels and dividers; **published components may not**.

## Archetypes

| Archetype | Primitives |
|-----------|------------|
| `interactive-primary` | Button |
| `interactive-field` | Input, Textarea, Select |
| `choice` | Checkbox, Radio |
| `toggle` | Switch |
| `display-label` | Label |
| `display-chip` | Badge |
| `avatar` | Avatar |
| `icon-chrome` | Icon |
| `separator` | Separator |
| `skeleton-block` | Skeleton |
| `spinner` | Spinner |

Add a primitive by extending registries, adding a `component-build.json` entry, and (if needed) a new archetype in `component-build-archetypes.js`.

## Light and Dark

1. Script **02** defines **Light** and **Dark** on global **`Colors`**.
2. Script **15** defines matching modes on **`Component Colors`**.
3. Script **17** places each component on its page with **Light** and **Dark** preview frames and adds samples to the **Themes** page (`Primitive samples` row).

Preview frames call `setThemeModeOnNode` on **`Component Colors`** and **`Colors`**.

## Bootstrap order

| Step | Scripts |
|------|---------|
| Pages + scaffolding | `01`, `14` |
| Global + component tokens | `02`–`06`, `15`, `16` |
| All primitives | `17` |

## Verification checklist (agents)

1. **`get_variable_defs`** on each component set: colors on semantic layers reference **`Component Colors`** only.
2. Screenshot previews in **Light** and **Dark** on the primitive page and Themes page.
3. Update **Agent Reference** and component page status when refining variants beyond the v1 archetype.

## Related

- [`COMPONENT-TOKENS.md`](COMPONENT-TOKENS.md)
- [`COMPONENT-COLOR-TOKENS.md`](COMPONENT-COLOR-TOKENS.md)
- [`AGENTS.md`](../AGENTS.md)
