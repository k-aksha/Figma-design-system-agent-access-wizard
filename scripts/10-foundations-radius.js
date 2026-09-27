// 10-foundations-radius.js — Radius rectangle examples on Foundations page

const page = figma.root.children.find(p => p.name === "Foundations");
if (!page) { figma.notify("ERROR: Foundations page not found."); }
else {

await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

if (page.children.find(n => n.name === "Border Radius")) {
  figma.notify("Border Radius section already exists — skipping.");
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
const border = { r: 0.89, g: 0.91, b: 0.94 };
const cardBg = { r: 0.97, g: 0.98, b: 0.99 };

const master = figma.createFrame();
master.name = "Border Radius";
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
master.y = 4400;

const title = createText("BORDER RADIUS", 36, "Bold", fg);
master.appendChild(title);

const radiusValues = [
  ["None", 0], ["SM", 4], ["MD", 6], ["LG", 8], ["XL", 12], ["2XL", 16], ["Full", 9999]
];

const row = figma.createFrame();
row.name = "Radius Examples";
row.layoutMode = "HORIZONTAL";
row.primaryAxisSizingMode = "AUTO";
row.counterAxisSizingMode = "AUTO";
row.itemSpacing = 24;
row.fills = [];

for (const [name, radius] of radiusValues) {
  const group = figma.createFrame();
  group.name = name;
  group.layoutMode = "VERTICAL";
  group.primaryAxisSizingMode = "AUTO";
  group.counterAxisSizingMode = "AUTO";
  group.primaryAxisAlignItems = "CENTER";
  group.counterAxisAlignItems = "CENTER";
  group.itemSpacing = 8;
  group.fills = [];

  const rect = figma.createRectangle();
  rect.name = "Shape";
  rect.resize(80, 80);
  rect.cornerRadius = Math.min(radius, 40);
  rect.fills = [{ type: "SOLID", color: cardBg }];
  rect.strokes = [{ type: "SOLID", color: border }];
  rect.strokeWeight = 1;
  group.appendChild(rect);

  const label = createText(name, 14, "Semi Bold", fg);
  group.appendChild(label);

  const pxLabel = createText(radius === 9999 ? "9999px" : `${radius}px`, 12, "Regular", muted);
  group.appendChild(pxLabel);

  row.appendChild(group);
}

master.appendChild(row);
page.appendChild(master);
figma.notify("Foundations: Border Radius section created.");

}
}
