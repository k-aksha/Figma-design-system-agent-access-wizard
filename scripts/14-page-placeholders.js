// 14-page-placeholders.js - Template frames on all component pages + Themes + Agent Reference

await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });

const fg = { r: 0.06, g: 0.09, b: 0.16 };
const muted = { r: 0.39, g: 0.45, b: 0.55 };
const border = { r: 0.89, g: 0.91, b: 0.94 };
const mutedBg = { r: 0.95, g: 0.96, b: 0.97 };
const primary = { r: 0.15, g: 0.39, b: 0.92 };

function createText(content, size, style, color) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style: style };
  t.fontSize = size;
  t.characters = content;
  if (color) t.fills = [{ type: "SOLID", color: color }];
  return t;
}

function createDashedSection(name, description) {
  const section = figma.createFrame();
  section.name = name;
  section.layoutMode = "VERTICAL";
  section.primaryAxisSizingMode = "AUTO";
  section.counterAxisSizingMode = "FIXED";
  section.resize(960, section.height);
  section.primaryAxisAlignItems = "CENTER";
  section.counterAxisAlignItems = "CENTER";
  section.paddingTop = 24;
  section.paddingBottom = 24;
  section.paddingLeft = 24;
  section.paddingRight = 24;
  section.cornerRadius = 6;
  section.fills = [{ type: "SOLID", color: mutedBg, opacity: 0.5 }];
  section.strokes = [{ type: "SOLID", color: border }];
  section.strokeWeight = 1;
  section.dashPattern = [8, 4];
  section.itemSpacing = 8;

  const title = createText(name, 14, "Semi Bold", muted);
  section.appendChild(title);

  const desc = createText(description, 12, "Regular", muted);
  desc.textAlignHorizontal = "CENTER";
  section.appendChild(desc);

  return section;
}

function createDivider() {
  const d = figma.createRectangle();
  d.name = "Divider";
  d.resize(960, 1);
  d.fills = [{ type: "SOLID", color: border }];
  return d;
}

// Component descriptions
const componentInfo = {
  "Primitives / Button": { desc: "Primary interactive element. Triggers actions and submissions.", status: "Not Started" },
  "Primitives / Input": { desc: "Text input field for forms.", status: "Not Started" },
  "Primitives / Textarea": { desc: "Multi-line text input.", status: "Not Started" },
  "Primitives / Select": { desc: "Dropdown selection input.", status: "Not Started" },
  "Primitives / Checkbox": { desc: "Binary selection control for forms.", status: "Not Started" },
  "Primitives / Radio": { desc: "Single selection from mutually exclusive options.", status: "Not Started" },
  "Primitives / Switch": { desc: "Boolean toggle control.", status: "Not Started" },
  "Primitives / Label": { desc: "Text label paired with form inputs.", status: "Not Started" },
  "Primitives / Badge": { desc: "Status indicator pill.", status: "Not Started" },
  "Primitives / Avatar": { desc: "User representation.", status: "Not Started" },
  "Primitives / Icon": { desc: "Iconographic element.", status: "Not Started" },
  "Primitives / Separator": { desc: "Visual divider.", status: "Not Started" },
  "Primitives / Skeleton": { desc: "Loading placeholder.", status: "Not Started" },
  "Primitives / Spinner": { desc: "Loading indicator.", status: "Not Started" },
  "Compound / Card": { desc: "Content container with header, body, and footer.", status: "Not Started" },
  "Compound / Dialog": { desc: "Modal overlay for focused tasks.", status: "Not Started" },
  "Compound / Dropdown Menu": { desc: "Action and navigation menu.", status: "Not Started" },
  "Compound / Toast": { desc: "Transient feedback notification.", status: "Not Started" },
  "Compound / Tooltip": { desc: "Supplementary hover information.", status: "Not Started" },
  "Compound / Popover": { desc: "Rich content overlay.", status: "Not Started" },
  "Compound / Tabs": { desc: "Section switching control.", status: "Not Started" },
  "Compound / Accordion": { desc: "Progressive disclosure control.", status: "Not Started" },
  "Compound / Alert": { desc: "Status message banner.", status: "Not Started" },
  "Compound / Breadcrumb": { desc: "Navigation trail.", status: "Not Started" },
  "Compound / Pagination": { desc: "List and table navigation.", status: "Not Started" },
  "Compound / Search Input": { desc: "Discovery and search input.", status: "Not Started" },
  "Compound / Command Palette": { desc: "AI agent interaction interface.", status: "Not Started" },
  "Compound / Date Picker": { desc: "Date selection control.", status: "Not Started" },
  "Compound / File Upload": { desc: "File attachment control.", status: "Not Started" },
  "Patterns / Data Table": { desc: "Tabular data display.", status: "Not Started" },
  "Patterns / Form": { desc: "Input collection layout.", status: "Not Started" },
  "Patterns / Navigation - Top": { desc: "Site-level horizontal navigation.", status: "Not Started" },
  "Patterns / Navigation - Side": { desc: "App-level sidebar navigation.", status: "Not Started" },
  "Patterns / Page Header": { desc: "Page title with actions.", status: "Not Started" },
  "Patterns / Empty State": { desc: "No-data placeholder.", status: "Not Started" },
  "Patterns / Stats Card": { desc: "Metrics display.", status: "Not Started" },
  "Patterns / Timeline": { desc: "Chronological event display.", status: "Not Started" },
  "Patterns / Kanban Board": { desc: "Card-based board layout.", status: "Not Started" },
  "Patterns / Chat Interface": { desc: "Conversational UI.", status: "Not Started" },
  "Patterns / Stepper": { desc: "Multi-step progress indicator.", status: "Not Started" },
  "Patterns / Filter Panel": { desc: "Data filtering controls.", status: "Not Started" },
  "Layouts / Dashboard": { desc: "Admin dashboard with sidebar, nav, and content grid.", status: "Not Started" },
  "Layouts / Auth": { desc: "Authentication screens (login, register, forgot password).", status: "Not Started" },
  "Layouts / Settings": { desc: "Settings page with section navigation.", status: "Not Started" },
  "Layouts / List-Detail": { desc: "Master list with detail panel.", status: "Not Started" },
  "Layouts / Marketing Landing": { desc: "Marketing landing page layout.", status: "Not Started" },
  "Layouts / Chat Agent": { desc: "Chat agent interface with context sidebar.", status: "Not Started" },
  "Layouts / Form Wizard": { desc: "Multi-step form wizard layout.", status: "Not Started" }
};

const templateSections = [
  ["ANATOMY", "Exploded view: label each part + spacing tokens between elements"],
  ["VARIANTS", "All visual styles side by side"],
  ["SIZES", "SM, MD, LG shown side by side"],
  ["STATES", "Default → Hover → Focus → Active → Disabled → Loading → Error"],
  ["RESPONSIVE BEHAVIOR", "Mobile (375px) | Tablet (768px) | Desktop (1280px)"],
  ["THEME PREVIEW", "Enterprise Default | Client Alpha | Client Beta"],
  ["ACCESSIBILITY", "Keyboard, touch target, focus ring, contrast, screen reader notes"],
  ["AGENT REFERENCE", "Use when, Don't use when, Pairs with, Responsive rules, Composition limits"],
  ["USAGE EXAMPLES", "3-5 real-world compositions: at least 1 mobile, 1 desktop, 1 themed"]
];

let processedCount = 0;

for (const [pageName, info] of Object.entries(componentInfo)) {
  const targetPage = figma.root.children.find(p => p.name === pageName);
  if (!targetPage) continue;

  await figma.setCurrentPageAsync(targetPage);

  // Skip if already populated
  if (targetPage.children.find(n => n.name === "Component Page")) {
    processedCount++;
    continue;
  }

  const componentName = pageName.split(" / ")[1] || pageName;

  const master = figma.createFrame();
  master.name = "Component Page";
  master.layoutMode = "VERTICAL";
  master.primaryAxisSizingMode = "AUTO";
  master.counterAxisSizingMode = "AUTO";
  master.itemSpacing = 32;
  master.paddingLeft = 50;
  master.paddingRight = 50;
  master.paddingTop = 50;
  master.paddingBottom = 50;
  master.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

  // Header
  const headerFrame = figma.createFrame();
  headerFrame.name = "Header";
  headerFrame.layoutMode = "VERTICAL";
  headerFrame.primaryAxisSizingMode = "AUTO";
  headerFrame.counterAxisSizingMode = "AUTO";
  headerFrame.itemSpacing = 8;
  headerFrame.fills = [];

  headerFrame.appendChild(createText(componentName.toUpperCase(), 36, "Bold", fg));
  headerFrame.appendChild(createText(info.desc, 16, "Regular", muted));

  // Status badge
  const statusBadge = figma.createFrame();
  statusBadge.name = "Status Badge";
  statusBadge.layoutMode = "HORIZONTAL";
  statusBadge.primaryAxisSizingMode = "AUTO";
  statusBadge.counterAxisSizingMode = "AUTO";
  statusBadge.paddingLeft = 12;
  statusBadge.paddingRight = 12;
  statusBadge.paddingTop = 4;
  statusBadge.paddingBottom = 4;
  statusBadge.cornerRadius = 9999;
  statusBadge.fills = [{ type: "SOLID", color: mutedBg }];

  statusBadge.appendChild(createText("STATUS: " + info.status, 12, "Semi Bold", muted));
  headerFrame.appendChild(statusBadge);

  master.appendChild(headerFrame);

  // Template sections
  for (const [sectionName, description] of templateSections) {
    master.appendChild(createDivider());
    master.appendChild(createDashedSection(sectionName, description));
  }

  targetPage.appendChild(master);
  processedCount++;
}

// --- THEMES PAGE ---
const themesPage = figma.root.children.find(p => p.name === "Themes");
if (themesPage && !themesPage.children.find(n => n.name === "Themes Guide")) {
  await figma.setCurrentPageAsync(themesPage);

  const themesMaster = figma.createFrame();
  themesMaster.name = "Themes Guide";
  themesMaster.layoutMode = "VERTICAL";
  themesMaster.primaryAxisSizingMode = "AUTO";
  themesMaster.counterAxisSizingMode = "AUTO";
  themesMaster.itemSpacing = 32;
  themesMaster.paddingLeft = 50;
  themesMaster.paddingRight = 50;
  themesMaster.paddingTop = 50;
  themesMaster.paddingBottom = 50;
  themesMaster.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

  themesMaster.appendChild(createText("THEMES", 36, "Bold", fg));

  // Enterprise Default Light
  const lightSection = createDashedSection(
    "ENTERPRISE DEFAULT - LIGHT",
    "Color palette swatches, typography preview, and sample components with Light mode applied"
  );
  themesMaster.appendChild(lightSection);

  // Enterprise Default Dark
  const darkSection = createDashedSection(
    "ENTERPRISE DEFAULT - DARK",
    "Same structure with Dark mode applied"
  );
  themesMaster.appendChild(darkSection);

  themesMaster.appendChild(createDivider());

  // Client Theme Template
  const templateSection = figma.createFrame();
  templateSection.name = "Client Theme Template";
  templateSection.layoutMode = "VERTICAL";
  templateSection.primaryAxisSizingMode = "AUTO";
  templateSection.counterAxisSizingMode = "FIXED";
  templateSection.resize(960, templateSection.height);
  templateSection.paddingTop = 24;
  templateSection.paddingBottom = 24;
  templateSection.paddingLeft = 24;
  templateSection.paddingRight = 24;
  templateSection.cornerRadius = 6;
  templateSection.fills = [{ type: "SOLID", color: mutedBg }];
  templateSection.itemSpacing = 8;

  templateSection.appendChild(createText("HOW TO CREATE A NEW THEME", 18, "Semi Bold", fg));

  const steps = [
    "1. Add a new mode to the Colors collection",
    "2. Override primitive palette with client brand colors",
    "3. Semantic + Surface tokens auto-inherit",
    "4. Override Typography if client has custom fonts",
    "5. Override Radius if client wants different corners",
    "6. Test with multiple components on this page",
    "7. Document here with swatches + sample components"
  ];
  for (const step of steps) {
    templateSection.appendChild(createText(step, 14, "Regular", fg));
  }

  themesMaster.appendChild(templateSection);
  themesPage.appendChild(themesMaster);
}

// --- AGENT REFERENCE PAGE ---
const agentPage = figma.root.children.find(p => p.name === "Agent Reference");
if (agentPage && !agentPage.children.find(n => n.name === "Agent Reference Guide")) {
  await figma.setCurrentPageAsync(agentPage);

  const agentMaster = figma.createFrame();
  agentMaster.name = "Agent Reference Guide";
  agentMaster.layoutMode = "VERTICAL";
  agentMaster.primaryAxisSizingMode = "AUTO";
  agentMaster.counterAxisSizingMode = "AUTO";
  agentMaster.itemSpacing = 32;
  agentMaster.paddingLeft = 50;
  agentMaster.paddingRight = 50;
  agentMaster.paddingTop = 50;
  agentMaster.paddingBottom = 50;
  agentMaster.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

  agentMaster.appendChild(createText("AGENT REFERENCE", 36, "Bold", fg));
  agentMaster.appendChild(createText(
    "This page helps AI agents understand how to use each component.\nFill in one entry per component as they are built.",
    16, "Regular", muted
  ));

  agentMaster.appendChild(createDivider());

  // Template
  const templateFrame = figma.createFrame();
  templateFrame.name = "Component Behavior Map Template";
  templateFrame.layoutMode = "VERTICAL";
  templateFrame.primaryAxisSizingMode = "AUTO";
  templateFrame.counterAxisSizingMode = "FIXED";
  templateFrame.resize(960, templateFrame.height);
  templateFrame.paddingTop = 24;
  templateFrame.paddingBottom = 24;
  templateFrame.paddingLeft = 24;
  templateFrame.paddingRight = 24;
  templateFrame.cornerRadius = 6;
  templateFrame.fills = [{ type: "SOLID", color: mutedBg }];
  templateFrame.strokes = [{ type: "SOLID", color: border }];
  templateFrame.strokeWeight = 1;
  templateFrame.dashPattern = [8, 4];
  templateFrame.itemSpacing = 12;

  templateFrame.appendChild(createText("COMPONENT BEHAVIOR MAP - TEMPLATE", 16, "Semi Bold", fg));
  templateFrame.appendChild(createText("Component: [Name]", 14, "Regular", fg));
  templateFrame.appendChild(createText("USE WHEN:\n  • [Scenario 1]\n  • [Scenario 2]\n  • [Scenario 3]", 14, "Regular", fg));
  templateFrame.appendChild(createText("DON'T USE WHEN:\n  • [Anti-pattern 1]\n  • [Anti-pattern 2]", 14, "Regular", fg));
  templateFrame.appendChild(createText("RESPONSIVE:\n  • Mobile: [behavior]\n  • Tablet: [behavior]\n  • Desktop: [behavior]", 14, "Regular", fg));
  templateFrame.appendChild(createText("PAIRS WITH:\n  • [Component 1] ([relationship])\n  • [Component 2] ([relationship])", 14, "Regular", fg));
  templateFrame.appendChild(createText("RULES:\n  • [Constraint 1]\n  • [Constraint 2]", 14, "Regular", fg));

  agentMaster.appendChild(templateFrame);
  agentMaster.appendChild(createDivider());

  // Button example (filled in)
  const buttonExample = figma.createFrame();
  buttonExample.name = "Button Example";
  buttonExample.layoutMode = "VERTICAL";
  buttonExample.primaryAxisSizingMode = "AUTO";
  buttonExample.counterAxisSizingMode = "FIXED";
  buttonExample.resize(960, buttonExample.height);
  buttonExample.paddingTop = 24;
  buttonExample.paddingBottom = 24;
  buttonExample.paddingLeft = 24;
  buttonExample.paddingRight = 24;
  buttonExample.cornerRadius = 6;
  buttonExample.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  buttonExample.strokes = [{ type: "SOLID", color: primary }];
  buttonExample.strokeWeight = 1;
  buttonExample.itemSpacing = 12;

  buttonExample.appendChild(createText("BUTTON - EXAMPLE (filled in)", 16, "Semi Bold", primary));
  buttonExample.appendChild(createText("USE WHEN:\n  • Primary call-to-action on a page or card\n  • Form submission\n  • Starting a new flow\n  • Destructive action (delete, remove)", 14, "Regular", fg));
  buttonExample.appendChild(createText("DON'T USE WHEN:\n  • Navigating to a different page → use Link\n  • Toggling on/off → use Switch\n  • Selecting from options → use Select", 14, "Regular", fg));
  buttonExample.appendChild(createText("RESPONSIVE:\n  • Mobile: full-width, stacked vertically\n  • Tablet: inline, medium size\n  • Desktop: inline, flexible width", 14, "Regular", fg));
  buttonExample.appendChild(createText("PAIRS WITH:\n  • Icon (inside), Tooltip (wrapped), Dialog (trigger)\n  • Card Footer, Form Actions, Toolbar", 14, "Regular", fg));
  buttonExample.appendChild(createText("RULES:\n  • Max 1 primary button per visible area\n  • Icon-only buttons must have a tooltip\n  • Loading state replaces label with spinner", 14, "Regular", fg));

  agentMaster.appendChild(buttonExample);
  agentMaster.appendChild(createDivider());

  // Composition Rules placeholder
  const compRules = createDashedSection(
    "COMPOSITION RULES",
    "Cards can contain: any Primitive + Tabs + Accordion\nDialogs can contain: Forms, Text, Buttons\nNavigation Side contains: Links, Icons, Badges\nData Table rows can contain: Text, Badge, Avatar, Button, Checkbox\n[Add rules as components are built]"
  );
  agentMaster.appendChild(compRules);

  // Responsive Behavior Map placeholder
  const respMap = createDashedSection(
    "RESPONSIVE BEHAVIOR MAP",
    "Grid showing each component's behavior at each breakpoint - to be filled per component"
  );
  agentMaster.appendChild(respMap);

  agentPage.appendChild(agentMaster);
}

figma.notify(`Page placeholders created for ${processedCount} component pages + Themes + Agent Reference.`);
