// 09-foundations-spacing.js — Spacing bar visualization on Foundations page

const page = figma.root.children.find(p => p.name === "Foundations");
if (!page) { figma.notify("ERROR: Foundations page not found."); }
else {

await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

if (page.children.find(n => n.name === "Spacing Scale")) {
  figma.notify("Spacing Scale section already exists — skipping.");
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
const primary = { r: 0.15, g: 0.39, b: 0.92 };

const master = figma.createFrame();
master.name = "Spacing Scale";
master.layoutMode = "VERTICAL";
master.primaryAxisSizingMode = "AUTO";
master.counterAxisSizingMode = "AUTO";
master.itemSpacing = 24;
master.paddingLeft = 50;
master.paddingRight = 50;
master.paddingTop = 50;
master.paddingBottom = 50;
master.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
master.x = 0;
master.y = 3200;

const title = createText("SPACING SCALE", 36, "Bold", fg);
master.appendChild(title);

const spacingValues = [
  ["0", 0], ["1", 4], ["2", 8], ["3", 12], ["4", 16], ["5", 20], ["6", 24],
  ["8", 32], ["10", 40], ["12", 48], ["16", 64], ["20", 80], ["24", 96]
];

for (const [name, px] of spacingValues) {
  const row = figma.createFrame();
  row.name = "Spacing " + name;
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisSizingMode = "AUTO";
  row.counterAxisSizingMode = "AUTO";
  row.itemSpacing = 16;
  row.counterAxisAlignItems = "CENTER";
  row.fills = [];

  const label = createText(name, 14, "Semi Bold", muted);
  label.resize(40, label.height);
  row.appendChild(label);

  if (px > 0) {
    const bar = figma.createRectangle();
    bar.name = "Bar";
    bar.resize(px * 4, 24);
    bar.cornerRadius = 4;
    bar.fills = [{ type: "SOLID", color: primary }];
    row.appendChild(bar);
  } else {
    const dash = createText("—", 14, "Regular", muted);
    row.appendChild(dash);
  }

  const pxLabel = createText(`(${px}px)`, 12, "Regular", muted);
  row.appendChild(pxLabel);

  master.appendChild(row);
}

page.appendChild(master);
figma.notify("Foundations: Spacing Scale section created.");

}
}
