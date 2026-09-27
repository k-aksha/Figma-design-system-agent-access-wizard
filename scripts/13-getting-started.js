// 13-getting-started.js - Documentation page content

const __DS_CONFIG__ = {"designSystemName":"Universal Design System","primaryPalette":"Blue","accentPalette":"Amber","fontFamily":"Inter","fontMono":"JetBrains Mono","primaryHex600":"#2563eb","primaryHex500":"#3b82f6","accentHex600":"#d97706"};
const DS_NAME = __DS_CONFIG__.designSystemName;
const FONT = __DS_CONFIG__.fontFamily;

const page = figma.root.children.find(p => p.name === "Getting Started");
if (!page) { figma.notify("ERROR: Getting Started page not found."); }
else {

await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: FONT, style: "Regular" });
await figma.loadFontAsync({ family: FONT, style: "Medium" });
await figma.loadFontAsync({ family: FONT, style: "Semi Bold" });
await figma.loadFontAsync({ family: FONT, style: "Bold" });

if (page.children.find(n => n.name === "Getting Started Guide")) {
  figma.notify("Getting Started content already exists - skipping.");
} else {

const fg = { r: 0.06, g: 0.09, b: 0.16 };
const muted = { r: 0.39, g: 0.45, b: 0.55 };
const border = { r: 0.89, g: 0.91, b: 0.94 };
const codeBg = { r: 0.95, g: 0.96, b: 0.97 };

function createText(content, size, style, color) {
  const t = figma.createText();
  t.fontName = { family: FONT, style: style };
  t.fontSize = size;
  t.characters = content;
  if (color) t.fills = [{ type: "SOLID", color: color }];
  return t;
}

function createDivider() {
  const d = figma.createRectangle();
  d.name = "Divider";
  d.resize(960, 1);
  d.fills = [{ type: "SOLID", color: border }];
  return d;
}

function createSection(titleText, bodyLines) {
  const section = figma.createFrame();
  section.name = titleText;
  section.layoutMode = "VERTICAL";
  section.primaryAxisSizingMode = "AUTO";
  section.counterAxisSizingMode = "AUTO";
  section.itemSpacing = 16;
  section.fills = [];

  const title = createText(titleText, 24, "Semi Bold", fg);
  section.appendChild(title);

  for (const line of bodyLines) {
    const text = createText(line, 16, "Regular", fg);
    text.resize(960, text.height);
    text.textAutoResize = "HEIGHT";
    section.appendChild(text);
  }
  return section;
}

// Master frame
const master = figma.createFrame();
master.name = "Getting Started Guide";
master.layoutMode = "VERTICAL";
master.primaryAxisSizingMode = "AUTO";
master.counterAxisSizingMode = "AUTO";
master.itemSpacing = 48;
master.paddingLeft = 50;
master.paddingRight = 50;
master.paddingTop = 50;
master.paddingBottom = 50;
master.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

// Header
const header = figma.createFrame();
header.name = "Header";
header.layoutMode = "VERTICAL";
header.primaryAxisSizingMode = "AUTO";
header.counterAxisSizingMode = "AUTO";
header.itemSpacing = 8;
header.fills = [];

header.appendChild(createText("GETTING STARTED", 36, "Bold", fg));
header.appendChild(createText(DS_NAME + " - Project Guide", 18, "Regular", muted));
header.appendChild(createText("Version 1.0 | Status: Active | April 2026", 14, "Regular", muted));
header.appendChild(createText("Audience: Designers contributing components", 14, "Regular", muted));
master.appendChild(header);

master.appendChild(createDivider());

// WHAT THIS IS
master.appendChild(createSection("WHAT THIS IS", [
  "A universal, theme-driven design system built in Figma for enterprise clients. You design once - then it gets used everywhere:",
  "  •  Designers reuse via theme swapping",
  "  •  AI agents read structure to generate UI",
  "  •  Developers build 1:1 from your components"
]));

master.appendChild(createDivider());

// FILE STRUCTURE
const fileSection = figma.createFrame();
fileSection.name = "FILE STRUCTURE";
fileSection.layoutMode = "VERTICAL";
fileSection.primaryAxisSizingMode = "AUTO";
fileSection.counterAxisSizingMode = "AUTO";
fileSection.itemSpacing = 16;
fileSection.fills = [];

fileSection.appendChild(createText("FILE STRUCTURE", 24, "Semi Bold", fg));

const treeBlock = figma.createFrame();
treeBlock.name = "Tree";
treeBlock.layoutMode = "VERTICAL";
treeBlock.primaryAxisSizingMode = "AUTO";
treeBlock.counterAxisSizingMode = "AUTO";
treeBlock.paddingLeft = 24;
treeBlock.paddingRight = 24;
treeBlock.paddingTop = 24;
treeBlock.paddingBottom = 24;
treeBlock.cornerRadius = 6;
treeBlock.fills = [{ type: "SOLID", color: codeBg }];
treeBlock.itemSpacing = 4;

const treeLines = [
  DS_NAME,
  "├── Cover",
  "├── Getting Started",
  "├── Foundations",
  "│   Colors · Typography · Spacing · Elevation · Radius",
  "├── Primitives (14 components)",
  "│   Button · Input · Textarea · Select · Checkbox ·",
  "│   Radio · Switch · Label · Badge · Avatar ·",
  "│   Icon · Separator · Skeleton · Spinner",
  "├── Compound (15 components)",
  "│   Card · Dialog · Dropdown · Toast · Tooltip ·",
  "│   Popover · Tabs · Accordion · Alert · Breadcrumb ·",
  "│   Pagination · Search Input · Command Palette ·",
  "│   Date Picker · File Upload",
  "├── Patterns (12 compositions)",
  "│   Data Table · Form · Nav Top · Nav Side ·",
  "│   Page Header · Empty State · Stats Card ·",
  "│   Timeline · Kanban · Chat · Stepper · Filter Panel",
  "├── Layouts (7 templates)",
  "│   Dashboard · Auth · Settings · List-Detail ·",
  "│   Marketing · Chat/Agent · Form Wizard",
  "├── Themes",
  "└── Agent Reference"
];

for (const line of treeLines) {
  const t = createText(line, 14, "Regular", fg);
  treeBlock.appendChild(t);
}

fileSection.appendChild(treeBlock);
master.appendChild(fileSection);

master.appendChild(createDivider());

// VARIABLE COLLECTIONS
const varSection = figma.createFrame();
varSection.name = "VARIABLE COLLECTIONS";
varSection.layoutMode = "VERTICAL";
varSection.primaryAxisSizingMode = "AUTO";
varSection.counterAxisSizingMode = "AUTO";
varSection.itemSpacing = 16;
varSection.fills = [];

varSection.appendChild(createText("VARIABLE COLLECTIONS OVERVIEW", 24, "Semi Bold", fg));

const tableBlock = figma.createFrame();
tableBlock.name = "Table";
tableBlock.layoutMode = "VERTICAL";
tableBlock.primaryAxisSizingMode = "AUTO";
tableBlock.counterAxisSizingMode = "AUTO";
tableBlock.paddingLeft = 24;
tableBlock.paddingRight = 24;
tableBlock.paddingTop = 24;
tableBlock.paddingBottom = 24;
tableBlock.cornerRadius = 6;
tableBlock.fills = [{ type: "SOLID", color: codeBg }];
tableBlock.itemSpacing = 8;

const tableRows = [
  "Collection     | Purpose                | Modes",
  "───────────────┼────────────────────────┼─────────────",
  "Colors         | All color tokens       | Light, Dark",
  "Spacing        | Spacing scale 0-24    | Single",
  "Radius         | Border radius scale    | Single",
  "Typography     | Fonts, sizes, weights  | Single",
  "Sizing         | Heights, icons, etc    | Single",
  "Elevation      | Shadow values          | (Styles)"
];

for (const row of tableRows) {
  const t = createText(row, 14, "Regular", fg);
  tableBlock.appendChild(t);
}

varSection.appendChild(tableBlock);
master.appendChild(varSection);

master.appendChild(createDivider());

// NAMING CONVENTIONS
master.appendChild(createSection("NAMING CONVENTIONS (QUICK REFERENCE)", [
  "  •  Components: PascalCase (Button, DataTable)",
  "  •  Variants: Variant=Primary, Size=MD, State=Hover",
  "  •  Booleans: Show Icon Left, Full Width, Loading",
  "  •  Layers: Container, Label, Icon Left (not Frame42)"
]));

master.appendChild(createDivider());

// CONTRIBUTION CHECKLIST
master.appendChild(createSection("CONTRIBUTION CHECKLIST (SUMMARY)", [
  "  ☐  Auto Layout everywhere (no absolute positioning)",
  "  ☐  All values use Variables (zero hardcoded)",
  "  ☐  All variants: Variant + Size + State properties",
  "  ☐  Responsive frames: 375 / 768 / 1280 / 1440px",
  "  ☐  Works with Light + Dark + 1 client theme",
  "  ☐  44px touch targets, 4.5:1 contrast, focus rings",
  "  ☐  Agent Reference filled in",
  "  ☐  3+ usage examples"
]));

master.appendChild(createDivider());

// AI AGENT COMPATIBILITY
master.appendChild(createSection("AI AGENT COMPATIBILITY", [
  "Agents read your component's:",
  "  •  Variant names → what types exist",
  "  •  Size options → what scales available",
  "  •  State variants → interaction states",
  "  •  Responsive frames → mobile vs desktop behavior",
  "  •  Pattern compositions → what pairs with what",
  "Consistent naming = consistent AI output"
]));

master.appendChild(createDivider());

// RESPONSIVE BREAKPOINTS
master.appendChild(createSection("RESPONSIVE BREAKPOINTS", [
  "  Mobile  (375px)  - 4 col, 16px gutter, 16px margin",
  "  Tablet  (768px)  - 8 col, 24px gutter, 24px margin",
  "  Desktop (1280px) - 12 col, 32px gutter, 32px margin",
  "  Wide    (1440px) - 12 col, 32px gutter, auto margin"
]));

page.appendChild(master);
figma.notify("Getting Started page created.");

}
}
