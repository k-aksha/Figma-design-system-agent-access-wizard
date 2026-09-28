# What the workflow produces

This document describes **everything that appears in your Figma file** after a successful bootstrap, and how that output depends on your setup choices.

The workflow does **not** ship finished UI components. It creates **design tokens (variables)**, **file structure**, **documentation frames**, and **placeholder templates** for you or your team to fill in.

---

## Summary by setup scope

| Output | `variables-only` | `documentation-and-examples` |
|--------|:----------------:|:----------------------------:|
| Global variable collections (5) | Yes | Yes |
| Component semantics (`15`-`16`) | Yes | Yes |
| Figma pages (~60 incl. separators) | No | Yes |
| Foundations documentation frames | No | Yes |
| Cover & Getting Started pages | No | Yes |
| Component / pattern / layout page templates | No | Yes |
| Themes guide scaffold | No | Yes |
| Agent Reference scaffold | No | Yes |

Scripts that run for each scope are listed in [`scripts/manifest.json`](../scripts/manifest.json) under `profiles`.

---

## Customization from the four questions

Your answers change **branding and tokens**, not the overall structure (when using the full scope).

| Question | Effect in Figma |
|----------|-----------------|
| **Design system name** | Cover title, Getting Started header, file-structure tree label |
| **Primary / accent palette** | Which primitive palettes feed `Semantic/Primary`, `Semantic/Accent`, `Surface/Ring`, and primary/accent swatches on the Foundations color doc |
| **Font family** | `Font/Sans` and `Font/Display` typography variables; documentation text uses your chosen font (must be available in Figma) |
| **Setup scope** | Which script groups run (see table above) |

---

## 1. Design tokens (Figma variables)

All token scripts are **idempotent**: if a collection already exists, that script skips.

### Colors (`02-variables-colors.js`)

**Collection name:** `Colors`  
**Modes:** `Light`, `Dark`

#### Primitive palettes (same hex in both modes; used as building blocks)

| Palette | Shades |
|---------|--------|
| **Blue** | 50-900 (10 steps) |
| **Green** | 50-900 |
| **Neutral** | 0, 50-900, 1000 (12 steps) |
| **Red** | 50-900 |
| **Amber** | 50-900 |
| **Violet** | 50-900 |

**Total primitive color variables:** 62

Naming pattern: `{Palette}/{shade}` (e.g. `Blue/600`, `Neutral/0`).

#### Semantic tokens (aliases; **Light and Dark can point to different primitives**)

| Token | Typical role |
|-------|----------------|
| `Semantic/Primary` | Main brand actions |
| `Semantic/Primary Hover` | Primary hover state |
| `Semantic/Accent` | Secondary brand emphasis (from your **accent** palette choice) |
| `Semantic/Secondary` | Subtle fills |
| `Semantic/Success` | Positive feedback |
| `Semantic/Warning` | Caution |
| `Semantic/Error` | Errors |
| `Semantic/Info` | Informational (follows **primary** palette) |

**Total semantic variables:** 8

#### Surface tokens (aliases; mode-aware)

| Token |
|-------|
| `Surface/Background` |
| `Surface/Foreground` |
| `Surface/Card` |
| `Surface/Card Foreground` |
| `Surface/Muted` |
| `Surface/Muted Foreground` |
| `Surface/Border` |
| `Surface/Input` |
| `Surface/Ring` (uses **primary** palette) |
| `Surface/Destructive` |
| `Surface/Destructive Foreground` |

**Total surface variables:** 11  

**Total in Colors collection:** 81 variables

---

### Spacing (`03-variables-spacing.js`)

**Collection:** `Spacing` · **Mode:** `Value` · **Type:** FLOAT (pixels)

| Variable | Value (px) |
|----------|------------|
| `Spacing/0` | 0 |
| `Spacing/1` | 4 |
| `Spacing/2` | 8 |
| `Spacing/3` | 12 |
| `Spacing/4` | 16 |
| `Spacing/5` | 20 |
| `Spacing/6` | 24 |
| `Spacing/8` | 32 |
| `Spacing/10` | 40 |
| `Spacing/12` | 48 |
| `Spacing/16` | 64 |
| `Spacing/20` | 80 |
| `Spacing/24` | 96 |

**Total:** 13 variables

---

### Radius (`04-variables-radius.js`)

**Collection:** `Radius` · **Mode:** `Value` · **Type:** FLOAT (pixels)

| Variable | Value (px) |
|----------|------------|
| `Radius/None` | 0 |
| `Radius/SM` | 4 |
| `Radius/MD` | 6 |
| `Radius/LG` | 8 |
| `Radius/XL` | 12 |
| `Radius/2XL` | 16 |
| `Radius/Full` | 9999 |

**Total:** 7 variables

---

### Typography (`05-variables-typography.js`)

**Collection:** `Typography` · **Mode:** `Value`

| Variable | Type | Value / notes |
|----------|------|----------------|
| `Font/Sans` | STRING | Your chosen **fontFamily** |
| `Font/Mono` | STRING | `JetBrains Mono` (default) |
| `Font/Display` | STRING | Same as **fontFamily** |
| `Size/XS` … `Size/4XL` | FLOAT | 12, 14, 16, 18, 20, 24, 30, 36 |
| `LineHeight/Tight` | FLOAT | 1.25 |
| `LineHeight/Normal` | FLOAT | 1.5 |
| `LineHeight/Relaxed` | FLOAT | 1.75 |
| `Weight/Regular` … `Weight/Bold` | FLOAT | 400, 500, 600, 700 |

**Total:** 18 variables (3 string + 15 float)

---

### Sizing (`06-variables-sizing.js`)

**Collection:** `Sizing` · **Mode:** `Value` · **Type:** FLOAT (pixels)

| Variable | Value (px) |
|----------|------------|
| `Touch Target/Min` | 44 |
| `Icon/sm` … `Icon/xl` | 16, 20, 24, 32 |
| `Component Height/sm` … `xl` | 32, 40, 48, 56 |
| `Avatar/sm` … `xl` | 32, 40, 48, 64 |
| `Container/Max Width` | 1280 |

**Total:** 14 variables

---

### Token totals (full variables run)

| Collection | Variables | Modes |
|------------|-----------|--------|
| Colors | 81 | Light, Dark |
| Spacing | 13 | Value |
| Radius | 7 | Value |
| Typography | 18 | Value |
| Sizing | 14 | Value |
| **Grand total** | **133** | |

---

### Component semantic tokens (`15`-`16`)

Runs after global tokens for **all 14 primitives**. Registry: [`config/component-tokens/`](../config/component-tokens/). Full spec: [`COMPONENT-TOKENS.md`](COMPONENT-TOKENS.md).

#### Component Colors (`15-component-colors.js`)

**Collection:** `Component Colors`  
**Modes:** `Light`, `Dark`  
**Naming:** `{Primitive}/{RolePath}` (e.g. `Button/Action/Primary/Background`)  
**Values:** aliases to `Colors` (inherits wizard **primary** / **accent** via global `Semantic/*`)

Idempotent: skips if the collection already exists.

#### Component dimensions (`16-component-dimensions.js`)

Adds **aliases** in existing collections (single `Value` mode):

| Collection | Name prefix | Example |
|------------|-------------|---------|
| Typography | `Component/{Primitive}/` | `Component/Button/Label/Size` |
| Spacing | `Component/{Primitive}/` | `Component/Input/Padding/X` |
| Radius | `Component/{Primitive}/` | `Component/Button/Corner` |
| Sizing | `Component/{Primitive}/` | `Component/Button/Height` |

Idempotent: creates only missing `Component/*` variables.

Run `node tools/count-component-tokens.mjs` for current counts from the registry.

---

## 2. File pages (`01-create-pages.js`)

**Only when scope is `documentation-and-examples`.**

Creates **60 pages** in the Figma sidebar, including **7 separator pages** (long dashed line names) that group sections visually.

### Content pages (53)

| Section | Count | Page names |
|---------|------|------------|
| **Intro** | 2 | `Cover`, `Getting Started` |
| **Foundations** | 1 | `Foundations` |
| **Primitives** | 14 | `Primitives / Button` … `Primitives / Spinner` |
| **Compound** | 15 | `Compound / Card` … `Compound / File Upload` |
| **Patterns** | 12 | `Patterns / Data Table` … `Patterns / Filter Panel` |
| **Layouts** | 7 | `Layouts / Dashboard` … `Layouts / Form Wizard` |
| **Meta** | 2 | `Themes`, `Agent Reference` |

Default empty `Page 1` is removed when new pages are created.

---

## 3. Foundations page (`07`-`11`)

**Page:** `Foundations`  
Each script adds one top-level frame (skipped if that frame name already exists).

| Frame name | Script | Contents |
|------------|--------|----------|
| **Color System** | `07` | Title; primitive swatches (Blue, Green, Neutral, Red, Amber, Violet) with shade + hex labels; semantic swatches (Primary, Accent, Success, Warning, Error, Info); surface swatches (Background, Card, Muted, Border, Ring, Destructive) |
| **Typography Scale** | `08` | Type size samples (XS-4XL); font weight samples; line-height examples |
| **Spacing Scale** | `09` | Horizontal bars labeled with spacing token names and pixel values |
| **Border Radius** | `10` | Rectangles demonstrating each radius token |
| **Elevation** | `11` | Four shadow cards: **SM**, **MD**, **LG**, **XL** with y-offset, blur, and description |

Documentation frames use **fixed fills** for clarity; production components should **bind** to variables from section 1.

---

## 4. Cover page (`12-cover-page.js`)

**Page:** `Cover`  
**Frame:** `Cover` (1440×900)

| Element | Content |
|---------|---------|
| Title | Your **design system name** (uppercase) |
| Subtitle | Theme-driven, AI-readable design system for enterprise clients |
| Badges | `v1.0`, `Active`, `April 2026` |
| Audience | Designers, AI agents, Developers (bullet list) |
| CTA | Pointer to open Getting Started |

---

## 5. Getting Started page (`13-getting-started.js`)

**Page:** `Getting Started`  
**Frame:** `Getting Started Guide`

| Section | Purpose |
|---------|---------|
| **Header** | Title, `{name} - Project Guide`, version line, audience |
| **WHAT THIS IS** | Why the system exists (designers, AI, devs) |
| **FILE STRUCTURE** | ASCII tree of the file (uses your design system name) |
| **VARIABLE COLLECTIONS OVERVIEW** | Table of collections and modes |
| **NAMING CONVENTIONS** | Components, variants, booleans, layers |
| **CONTRIBUTION CHECKLIST** | Quality bar for new components |
| **AI AGENT COMPATIBILITY** | What agents read from components |
| **RESPONSIVE BREAKPOINTS** | Mobile / tablet / desktop / wide grid notes |

---

## 6. Script `14-page-placeholders.js` (scaffolding detail)

Script **14** runs only when setup scope is **`documentation-and-examples`**. It requires the pages from script **01** to already exist.

### What script 14 creates (at a glance)

| Deliverable | Count | Figma page | Root frame name |
|-------------|------:|------------|-----------------|
| Component documentation scaffolds | **48** | One per primitive / compound / pattern / layout route | `Component Page` |
| Theme documentation scaffold | **1** | `Themes` | `Themes Guide` |
| AI behavior documentation scaffold | **1** | `Agent Reference` | `Agent Reference Guide` |

**Total top-level frames added:** 50 (48 + 1 + 1), each on its named page.

### Idempotency

| Target | Skip condition |
|--------|----------------|
| Each component route | Page already has a child named `Component Page` |
| Themes | Page already has `Themes Guide` |
| Agent Reference | Page already has `Agent Reference Guide` |

If a page from `01` is missing, that route is skipped silently (no error frame).

### Shared visual language (all dashed placeholders)

Placeholder sections use the same frame style:

- Auto-layout vertical, **960px** wide, centered content
- Padding **24px**, corner radius **6px**
- Fill: muted background at **50% opacity**
- Stroke: **1px** dashed (`8, 4` dash pattern)
- Section title: **14px Semi Bold**; helper text: **12px Regular**, center-aligned

`Component Page` master frames use **50px** padding, **32px** vertical gap between blocks, white background.

---

## 6.1 The 48 `Component Page` frames

One **`Component Page`** frame per row below. Header title is the **short name** (part after ` / `), uppercased (e.g. `BUTTON` on `Primitives / Button`).

### Primitives (14)

| Figma page | Header title | Description (subtitle) | Initial status |
|------------|--------------|------------------------|----------------|
| `Primitives / Button` | BUTTON | Primary interactive element. Triggers actions and submissions. | Not Started |
| `Primitives / Input` | INPUT | Text input field for forms. | Not Started |
| `Primitives / Textarea` | TEXTAREA | Multi-line text input. | Not Started |
| `Primitives / Select` | SELECT | Dropdown selection input. | Not Started |
| `Primitives / Checkbox` | CHECKBOX | Binary selection control for forms. | Not Started |
| `Primitives / Radio` | RADIO | Single selection from mutually exclusive options. | Not Started |
| `Primitives / Switch` | SWITCH | Boolean toggle control. | Not Started |
| `Primitives / Label` | LABEL | Text label paired with form inputs. | Not Started |
| `Primitives / Badge` | BADGE | Status indicator pill. | Not Started |
| `Primitives / Avatar` | AVATAR | User representation. | Not Started |
| `Primitives / Icon` | ICON | Iconographic element. | Not Started |
| `Primitives / Separator` | SEPARATOR | Visual divider. | Not Started |
| `Primitives / Skeleton` | SKELETON | Loading placeholder. | Not Started |
| `Primitives / Spinner` | SPINNER | Loading indicator. | Not Started |

### Compound (15)

| Figma page | Header title | Description | Initial status |
|------------|--------------|-------------|----------------|
| `Compound / Card` | CARD | Content container with header, body, and footer. | Not Started |
| `Compound / Dialog` | DIALOG | Modal overlay for focused tasks. | Not Started |
| `Compound / Dropdown Menu` | DROPDOWN MENU | Action and navigation menu. | Not Started |
| `Compound / Toast` | TOAST | Transient feedback notification. | Not Started |
| `Compound / Tooltip` | TOOLTIP | Supplementary hover information. | Not Started |
| `Compound / Popover` | POPOVER | Rich content overlay. | Not Started |
| `Compound / Tabs` | TABS | Section switching control. | Not Started |
| `Compound / Accordion` | ACCORDION | Progressive disclosure control. | Not Started |
| `Compound / Alert` | ALERT | Status message banner. | Not Started |
| `Compound / Breadcrumb` | BREADCRUMB | Navigation trail. | Not Started |
| `Compound / Pagination` | PAGINATION | List and table navigation. | Not Started |
| `Compound / Search Input` | SEARCH INPUT | Discovery and search input. | Not Started |
| `Compound / Command Palette` | COMMAND PALETTE | AI agent interaction interface. | Not Started |
| `Compound / Date Picker` | DATE PICKER | Date selection control. | Not Started |
| `Compound / File Upload` | FILE UPLOAD | File attachment control. | Not Started |

### Patterns (12)

| Figma page | Header title | Description | Initial status |
|------------|--------------|-------------|----------------|
| `Patterns / Data Table` | DATA TABLE | Tabular data display. | Not Started |
| `Patterns / Form` | FORM | Input collection layout. | Not Started |
| `Patterns / Navigation - Top` | NAVIGATION - TOP | Site-level horizontal navigation. | Not Started |
| `Patterns / Navigation - Side` | NAVIGATION - SIDE | App-level sidebar navigation. | Not Started |
| `Patterns / Page Header` | PAGE HEADER | Page title with actions. | Not Started |
| `Patterns / Empty State` | EMPTY STATE | No-data placeholder. | Not Started |
| `Patterns / Stats Card` | STATS CARD | Metrics display. | Not Started |
| `Patterns / Timeline` | TIMELINE | Chronological event display. | Not Started |
| `Patterns / Kanban Board` | KANBAN BOARD | Card-based board layout. | Not Started |
| `Patterns / Chat Interface` | CHAT INTERFACE | Conversational UI. | Not Started |
| `Patterns / Stepper` | STEPPER | Multi-step progress indicator. | Not Started |
| `Patterns / Filter Panel` | FILTER PANEL | Data filtering controls. | Not Started |

### Layouts (7)

| Figma page | Header title | Description | Initial status |
|------------|--------------|-------------|----------------|
| `Layouts / Dashboard` | DASHBOARD | Admin dashboard with sidebar, nav, and content grid. | Not Started |
| `Layouts / Auth` | AUTH | Authentication screens (login, register, forgot password). | Not Started |
| `Layouts / Settings` | SETTINGS | Settings page with section navigation. | Not Started |
| `Layouts / List-Detail` | LIST-DETAIL | Master list with detail panel. | Not Started |
| `Layouts / Marketing Landing` | MARKETING LANDING | Marketing landing page layout. | Not Started |
| `Layouts / Chat Agent` | CHAT AGENT | Chat agent interface with context sidebar. | Not Started |
| `Layouts / Form Wizard` | FORM WIZARD | Multi-step form wizard layout. | Not Started |

### Layer tree (every `Component Page`)

```text
Component Page                    ← vertical auto-layout, white fill, 50px padding
├── Header                        ← vertical auto-layout
│   ├── {NAME}                    ← 36px Bold (e.g. BUTTON)
│   ├── {description}             ← 16px Regular, muted
│   └── Status Badge              ← pill frame
│       └── STATUS: Not Started   ← 12px Semi Bold
├── Divider                       ← 960×1px line (repeated between sections)
├── ANATOMY                       ← dashed placeholder frame
├── Divider
├── VARIANTS
├── Divider
├── SIZES
├── Divider
├── STATES
├── Divider
├── RESPONSIVE BEHAVIOR
├── Divider
├── THEME PREVIEW
├── Divider
├── ACCESSIBILITY
├── Divider
├── AGENT REFERENCE
├── Divider
└── USAGE EXAMPLES
```

### Placeholder section copy (same on all 48 pages)

| Frame name | Placeholder description text |
|------------|------------------------------|
| **ANATOMY** | Exploded view: label each part + spacing tokens between elements |
| **VARIANTS** | All visual styles side by side |
| **SIZES** | SM, MD, LG shown side by side |
| **STATES** | Default → Hover → Focus → Active → Disabled → Loading → Error |
| **RESPONSIVE BEHAVIOR** | Mobile (375px) \| Tablet (768px) \| Desktop (1280px) |
| **THEME PREVIEW** | Enterprise Default \| Client Alpha \| Client Beta |
| **ACCESSIBILITY** | Keyboard, touch target, focus ring, contrast, screen reader notes |
| **AGENT REFERENCE** | Use when, Don't use when, Pairs with, Responsive rules, Composition limits |
| **USAGE EXAMPLES** | 3-5 real-world compositions: at least 1 mobile, 1 desktop, 1 themed |

**Not created on these pages:** Figma **components**, **component sets**, **instances**, or **variants**-only documentation frames to fill in later.

---

## 6.2 `Themes Guide` (page: `Themes`)

Single frame **`Themes Guide`** (vertical auto-layout, 50px padding, white fill, 32px item spacing).

```text
Themes Guide
├── THEMES                          ← 36px Bold page title
├── ENTERPRISE DEFAULT - LIGHT      ← dashed placeholder
├── ENTERPRISE DEFAULT - DARK       ← dashed placeholder
├── Divider
└── Client Theme Template           ← solid muted panel (not dashed)
    ├── HOW TO CREATE A NEW THEME   ← 18px Semi Bold
    └── numbered steps 1-7          ← 14px Regular, one text node per step
```

| Child | Type | Content |
|-------|------|---------|
| **ENTERPRISE DEFAULT - LIGHT** | Dashed section | “Color palette swatches, typography preview, and sample components with Light mode applied” |
| **ENTERPRISE DEFAULT - DARK** | Dashed section | “Same structure with Dark mode applied” |
| **Client Theme Template** | Filled frame | Step-by-step theme authoring instructions |

**Steps in “How to create a new theme”:**

1. Add a new mode to the Colors collection  
2. Override primitive palette with client brand colors  
3. Semantic + Surface tokens auto-inherit  
4. Override Typography if client has custom fonts  
5. Override Radius if client wants different corners  
6. Test with multiple components on this page  
7. Document here with swatches + sample components  

---

## 6.3 `Agent Reference Guide` (page: `Agent Reference`)

Single frame **`Agent Reference Guide`** (same padding/spacing as Themes).

```text
Agent Reference Guide
├── AGENT REFERENCE                 ← 36px Bold
├── Intro paragraph                 ← 16px Regular (AI behavior maps)
├── Divider
├── Component Behavior Map Template ← dashed, empty pattern
├── Divider
├── Button Example                  ← solid white, primary border (canonical example)
├── Divider
├── COMPOSITION RULES               ← dashed placeholder
└── RESPONSIVE BEHAVIOR MAP         ← dashed placeholder
```

### Intro copy

> This page helps AI agents understand how to use each component.  
> Fill in one entry per component as they are built.

### `Component Behavior Map Template` (empty pattern)

Text blocks inside the template frame:

- `COMPONENT BEHAVIOR MAP - TEMPLATE`
- `Component: [Name]`
- `USE WHEN:` + 3 bullet placeholders  
- `DON'T USE WHEN:` + 2 bullet placeholders  
- `RESPONSIVE:` Mobile / Tablet / Desktop placeholders  
- `PAIRS WITH:` + 2 relationship placeholders  
- `RULES:` + 2 constraint placeholders  

### `Button Example` (filled reference)

Same structure as the template, with real Button guidance:

| Block | Content summary |
|-------|-----------------|
| **USE WHEN** | Primary CTA, form submit, start flow, destructive actions |
| **DON'T USE WHEN** | Page nav → Link; toggle → Switch; pick list → Select |
| **RESPONSIVE** | Mobile full-width stack; tablet inline MD; desktop inline flexible |
| **PAIRS WITH** | Icon, Tooltip, Dialog; Card Footer, Form Actions, Toolbar |
| **RULES** | Max one primary per area; icon-only needs tooltip; loading shows spinner |

Visual distinction: **primary blue stroke** on the Button example frame (not on the empty template).

### Remaining placeholders

| Frame | Description text |
|-------|------------------|
| **COMPOSITION RULES** | Cards → primitives + Tabs + Accordion; Dialogs → Forms, Text, Buttons; Nav Side → Links, Icons, Badges; Data Table rows → Text, Badge, Avatar, Button, Checkbox; plus “[Add rules as components are built]” |
| **RESPONSIVE BEHAVIOR MAP** | “Grid showing each component's behavior at each breakpoint - to be filled per component” |

---

## 6.4 What script 14 does *not* create

- Entries on Agent Reference for components other than the Button example  
- Filled ANATOMY / VARIANTS / etc. on the 48 component pages (placeholders only)  
- Light/Dark preview art on the Themes page (dashed boxes only)  
- Updates to **status badges** when you finish a component (still `Not Started` until you edit manually or run a future script)

---

## What is *not* produced

| Item | Notes |
|------|--------|
| **Published UI components** | No Button, Input, etc. as component sets-only page templates |
| **Variable-bound documentation** | Foundation swatches are visual reference; binding is for future component work |
| **Figma styles library** | Elevation doc shows shadows; separate effect styles are not auto-created |
| **Code / Code Connect** | Out of scope for bootstrap |
| **Client theme modes** | Only Light/Dark on Colors; extra client modes are manual (Themes page explains how) |

---

## Script-to-output map

| Script | Primary output |
|--------|----------------|
| `01` | Page tree |
| `02` | `Colors` variables |
| `03` | `Spacing` variables |
| `04` | `Radius` variables |
| `05` | `Typography` variables |
| `06` | `Sizing` variables |
| `07` | `Color System` frame |
| `08` | `Typography Scale` frame |
| `09` | `Spacing Scale` frame |
| `10` | `Border Radius` frame |
| `11` | `Elevation` frame |
| `12` | `Cover` frame |
| `13` | `Getting Started Guide` frame |
| `14` | 48× `Component Page`, `Themes Guide`, `Agent Reference Guide` - see [§6](#6-script-14-page-placeholdersjs-scaffolding-detail) |

---

## Related docs

- [README](../README.md) - how to run setup  
- [workflow/SETUP.md](../workflow/SETUP.md) - questionnaire and order  
- [docs/WORKFLOW.md](WORKFLOW.md) - MCP execution  
