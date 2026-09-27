// 08-foundations-typography.js - Typography scale samples on Foundations page

const page = figma.root.children.find(p => p.name === "Foundations");
if (!page) { figma.notify("ERROR: Foundations page not found."); }
else {

await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Medium" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });

if (page.children.find(n => n.name === "Typography Scale")) {
  figma.notify("Typography Scale section already exists - skipping.");
} else {

function createText(content, size, style, color) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style: style };
  t.fontSize = size;
  t.characters = content;
  if (color) t.fills = [{ type: "SOLID", color: color }];
  return t;
}

const fg = { r: 0.06, g: 0.09, b: 0.16 };
const muted = { r: 0.39, g: 0.45, b: 0.55 };

const master = figma.createFrame();
master.name = "Typography Scale";
master.layoutMode = "VERTICAL";
master.primaryAxisSizingMode = "AUTO";
master.counterAxisSizingMode = "AUTO";
master.itemSpacing = 40;
master.paddingLeft = 50;
master.paddingRight = 50;
master.paddingTop = 50;
master.paddingBottom = 50;
master.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
master.x = 0;
master.y = 1600;

const title = createText("TYPOGRAPHY SCALE", 36, "Bold", fg);
master.appendChild(title);

const fontInfo = createText("Font Family: Inter (Sans) | JetBrains Mono (Mono)", 16, "Regular", muted);
master.appendChild(fontInfo);

// Size scale
const sizes = [
  ["4XL", 36], ["3XL", 30], ["2XL", 24], ["XL", 20],
  ["LG", 18], ["Base", 16], ["SM", 14], ["XS", 12]
];

const sizeSection = figma.createFrame();
sizeSection.name = "Size Scale";
sizeSection.layoutMode = "VERTICAL";
sizeSection.primaryAxisSizingMode = "AUTO";
sizeSection.counterAxisSizingMode = "AUTO";
sizeSection.itemSpacing = 16;
sizeSection.fills = [];

for (const [name, size] of sizes) {
  const row = figma.createFrame();
  row.name = name;
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisSizingMode = "AUTO";
  row.counterAxisSizingMode = "AUTO";
  row.itemSpacing = 16;
  row.counterAxisAlignItems = "CENTER";
  row.fills = [];

  const label = createText(`${name} (${size}px)`, 14, "Semi Bold", muted);
  label.resize(120, label.height);
  row.appendChild(label);

  const sample = createText("The quick brown fox jumps over the lazy dog", size, "Regular", fg);
  row.appendChild(sample);

  sizeSection.appendChild(row);
}
master.appendChild(sizeSection);

// Divider
const div1 = figma.createRectangle();
div1.name = "Divider";
div1.resize(960, 1);
div1.fills = [{ type: "SOLID", color: { r: 0.89, g: 0.91, b: 0.94 } }];
master.appendChild(div1);

// Font weights
const weightsTitle = createText("FONT WEIGHTS", 24, "Semi Bold", fg);
master.appendChild(weightsTitle);

const weights = [
  ["Regular (400)", "Regular"],
  ["Medium (500)", "Medium"],
  ["Semi Bold (600)", "Semi Bold"],
  ["Bold (700)", "Bold"]
];

const weightSection = figma.createFrame();
weightSection.name = "Weights";
weightSection.layoutMode = "VERTICAL";
weightSection.primaryAxisSizingMode = "AUTO";
weightSection.counterAxisSizingMode = "AUTO";
weightSection.itemSpacing = 12;
weightSection.fills = [];

for (const [label, style] of weights) {
  const row = figma.createFrame();
  row.name = label;
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisSizingMode = "AUTO";
  row.counterAxisSizingMode = "AUTO";
  row.itemSpacing = 16;
  row.counterAxisAlignItems = "CENTER";
  row.fills = [];

  const labelText = createText(label, 14, "Semi Bold", muted);
  labelText.resize(160, labelText.height);
  row.appendChild(labelText);

  const sample = createText("The quick brown fox jumps over the lazy dog", 16, style, fg);
  row.appendChild(sample);

  weightSection.appendChild(row);
}
master.appendChild(weightSection);

// Divider
const div2 = figma.createRectangle();
div2.name = "Divider";
div2.resize(960, 1);
div2.fills = [{ type: "SOLID", color: { r: 0.89, g: 0.91, b: 0.94 } }];
master.appendChild(div2);

// Line heights
const lhTitle = createText("LINE HEIGHTS", 24, "Semi Bold", fg);
master.appendChild(lhTitle);

const lineHeights = [
  ["Tight (1.25)", "Headings, labels"],
  ["Normal (1.5)", "Body text, paragraphs"],
  ["Relaxed (1.75)", "Long-form reading"]
];

const lhSection = figma.createFrame();
lhSection.name = "Line Heights";
lhSection.layoutMode = "VERTICAL";
lhSection.primaryAxisSizingMode = "AUTO";
lhSection.counterAxisSizingMode = "AUTO";
lhSection.itemSpacing = 12;
lhSection.fills = [];

for (const [name, usage] of lineHeights) {
  const row = figma.createFrame();
  row.name = name;
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisSizingMode = "AUTO";
  row.counterAxisSizingMode = "AUTO";
  row.itemSpacing = 16;
  row.counterAxisAlignItems = "CENTER";
  row.fills = [];

  const label = createText(name, 14, "Semi Bold", fg);
  label.resize(160, label.height);
  row.appendChild(label);

  const desc = createText("- " + usage, 14, "Regular", muted);
  row.appendChild(desc);

  lhSection.appendChild(row);
}
master.appendChild(lhSection);

page.appendChild(master);
figma.notify("Foundations: Typography Scale section created.");

}
}
