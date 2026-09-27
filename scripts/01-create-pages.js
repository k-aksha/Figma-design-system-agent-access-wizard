// 01-create-pages.js — Create all 60 pages including separators

const PAGE_NAMES = [
  "Cover",
  "Getting Started",
  "─────────────────────────────────",
  "Foundations",
  "───────────────────────────────── ",
  "Primitives / Button",
  "Primitives / Input",
  "Primitives / Textarea",
  "Primitives / Select",
  "Primitives / Checkbox",
  "Primitives / Radio",
  "Primitives / Switch",
  "Primitives / Label",
  "Primitives / Badge",
  "Primitives / Avatar",
  "Primitives / Icon",
  "Primitives / Separator",
  "Primitives / Skeleton",
  "Primitives / Spinner",
  "─────────────────────────────────  ",
  "Compound / Card",
  "Compound / Dialog",
  "Compound / Dropdown Menu",
  "Compound / Toast",
  "Compound / Tooltip",
  "Compound / Popover",
  "Compound / Tabs",
  "Compound / Accordion",
  "Compound / Alert",
  "Compound / Breadcrumb",
  "Compound / Pagination",
  "Compound / Search Input",
  "Compound / Command Palette",
  "Compound / Date Picker",
  "Compound / File Upload",
  "─────────────────────────────────   ",
  "Patterns / Data Table",
  "Patterns / Form",
  "Patterns / Navigation — Top",
  "Patterns / Navigation — Side",
  "Patterns / Page Header",
  "Patterns / Empty State",
  "Patterns / Stats Card",
  "Patterns / Timeline",
  "Patterns / Kanban Board",
  "Patterns / Chat Interface",
  "Patterns / Stepper",
  "Patterns / Filter Panel",
  "─────────────────────────────────    ",
  "Layouts / Dashboard",
  "Layouts / Auth",
  "Layouts / Settings",
  "Layouts / List-Detail",
  "Layouts / Marketing Landing",
  "Layouts / Chat Agent",
  "Layouts / Form Wizard",
  "─────────────────────────────────     ",
  "Themes",
  "─────────────────────────────────      ",
  "Agent Reference"
];

const existingNames = new Set(figma.root.children.map(p => p.name));

let created = 0;
let skipped = 0;

for (const name of PAGE_NAMES) {
  if (existingNames.has(name)) {
    skipped++;
    continue;
  }
  const page = figma.createPage();
  page.name = name;
  created++;
}

// Remove the default empty "Page 1" if it exists and we created new pages
if (created > 0) {
  const page1 = figma.root.children.find(p => p.name === "Page 1");
  if (page1 && figma.root.children.length > 1) {
    page1.remove();
  }
}

figma.notify(`Created ${created} pages, skipped ${skipped} existing.`);
