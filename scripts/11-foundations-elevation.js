// 11-foundations-elevation.js — Elevation shadow cards on Foundations page

const page = figma.root.children.find(p => p.name === "Foundations");
if (!page) { figma.notify("ERROR: Foundations page not found."); }
else {

await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

if (page.children.find(n => n.name === "Elevation")) {
  figma.notify("Elevation section already exists — skipping.");
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
master.name = "Elevation";
master.layoutMode = "VERTICAL";
master.primaryAxisSizingMode = "AUTO";
master.counterAxisSizingMode = "AUTO";
master.itemSpacing = 32;
master.paddingLeft = 50;
master.paddingRight = 50;
master.paddingTop = 50;
master.paddingBottom = 50;
master.fills = [{ type: "SOLID", color: { r: 0.97, g: 0.98, b: 0.99 } }];
master.x = 0;
master.y = 5200;

const title = createText("ELEVATION", 36, "Bold", fg);
master.appendChild(title);

const elevations = [
  { name: "SM", desc: "Subtle", y: 1, blur: 2, spread: 0, opacity: 0.05 },
  { name: "MD", desc: "Medium", y: 4, blur: 6, spread: -1, opacity: 0.10 },
  { name: "LG", desc: "Pronounced", y: 10, blur: 15, spread: -3, opacity: 0.10 },
  { name: "XL", desc: "Overlay", y: 20, blur: 25, spread: -5, opacity: 0.15 }
];

const row = figma.createFrame();
row.name = "Elevation Examples";
row.layoutMode = "HORIZONTAL";
row.primaryAxisSizingMode = "AUTO";
row.counterAxisSizingMode = "AUTO";
row.itemSpacing = 32;
row.fills = [];

for (const elev of elevations) {
  const group = figma.createFrame();
  group.name = elev.name;
  group.layoutMode = "VERTICAL";
  group.primaryAxisSizingMode = "AUTO";
  group.counterAxisSizingMode = "AUTO";
  group.primaryAxisAlignItems = "CENTER";
  group.counterAxisAlignItems = "CENTER";
  group.itemSpacing = 12;
  group.fills = [];

  const card = figma.createFrame();
  card.name = "Card";
  card.resize(160, 120);
  card.cornerRadius = 8;
  card.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  card.effects = [{
    type: "DROP_SHADOW",
    color: { r: 0, g: 0, b: 0, a: elev.opacity },
    offset: { x: 0, y: elev.y },
    radius: elev.blur,
    spread: elev.spread,
    visible: true,
    blendMode: "NORMAL"
  }];

  // Center text in card
  card.layoutMode = "VERTICAL";
  card.primaryAxisSizingMode = "FIXED";
  card.counterAxisSizingMode = "FIXED";
  card.primaryAxisAlignItems = "CENTER";
  card.counterAxisAlignItems = "CENTER";
  card.itemSpacing = 4;

  const nameText = createText(elev.name, 18, "Semi Bold", fg);
  card.appendChild(nameText);

  const descText = createText(elev.desc, 14, "Regular", muted);
  card.appendChild(descText);

  group.appendChild(card);

  const specs = createText(`y:${elev.y} blur:${elev.blur}`, 12, "Regular", muted);
  group.appendChild(specs);

  row.appendChild(group);
}

master.appendChild(row);
page.appendChild(master);
figma.notify("Foundations: Elevation section created.");

}
}
