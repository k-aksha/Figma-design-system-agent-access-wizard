// 07-foundations-colors.js — Color palette swatches on Foundations page

const __DS_CONFIG__ = {"designSystemName":"Universal Design System","primaryPalette":"Blue","accentPalette":"Amber","fontFamily":"Inter","fontMono":"JetBrains Mono","primaryHex600":"#2563eb","primaryHex500":"#3b82f6","accentHex600":"#d97706"};

const page = figma.root.children.find(p => p.name === "Foundations");
if (!page) { figma.notify("ERROR: Foundations page not found."); }
else {

await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

// Check idempotency
if (page.children.find(n => n.name === "Color System")) {
  figma.notify("Color System section already exists — skipping.");
} else {

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16) / 255,
    g: parseInt(h.substring(2, 4), 16) / 255,
    b: parseInt(h.substring(4, 6), 16) / 255
  };
}

function createText(content, size, style, color) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style: style };
  t.fontSize = size;
  t.characters = content;
  if (color) t.fills = [{ type: "SOLID", color: color }];
  return t;
}

// Main container
const master = figma.createFrame();
master.name = "Color System";
master.layoutMode = "VERTICAL";
master.primaryAxisSizingMode = "AUTO";
master.counterAxisSizingMode = "AUTO";
master.itemSpacing = 48;
master.paddingLeft = 50;
master.paddingRight = 50;
master.paddingTop = 50;
master.paddingBottom = 50;
master.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

// Title
const title = createText("COLOR SYSTEM", 36, "Bold", { r: 0.06, g: 0.09, b: 0.16 });
master.appendChild(title);

// Subtitle
const subtitle = createText("PRIMITIVE PALETTE", 24, "Semi Bold", { r: 0.06, g: 0.09, b: 0.16 });
master.appendChild(subtitle);

const palettes = {
  "Blue": [
    ["50", "#eff6ff"], ["100", "#dbeafe"], ["200", "#bfdbfe"], ["300", "#93c5fd"], ["400", "#60a5fa"],
    ["500", "#3b82f6"], ["600", "#2563eb"], ["700", "#1d4ed8"], ["800", "#1e40af"], ["900", "#1e3a8a"]
  ],
  "Green": [
    ["50", "#f0fdf4"], ["100", "#dcfce7"], ["200", "#bbf7d0"], ["300", "#86efac"], ["400", "#4ade80"],
    ["500", "#22c55e"], ["600", "#16a34a"], ["700", "#15803d"], ["800", "#166534"], ["900", "#14532d"]
  ],
  "Neutral": [
    ["0", "#ffffff"], ["50", "#f8fafc"], ["100", "#f1f5f9"], ["200", "#e2e8f0"], ["300", "#cbd5e1"],
    ["400", "#94a3b8"], ["500", "#64748b"], ["600", "#475569"], ["700", "#334155"], ["800", "#1e293b"],
    ["900", "#0f172a"], ["1000", "#000000"]
  ],
  "Red": [
    ["50", "#fef2f2"], ["100", "#fee2e2"], ["200", "#fecaca"], ["300", "#fca5a5"], ["400", "#f87171"],
    ["500", "#ef4444"], ["600", "#dc2626"], ["700", "#b91c1c"], ["800", "#991b1b"], ["900", "#7f1d1d"]
  ],
  "Amber": [
    ["50", "#fffbeb"], ["100", "#fef3c7"], ["200", "#fde68a"], ["300", "#fcd34d"], ["400", "#fbbf24"],
    ["500", "#f59e0b"], ["600", "#d97706"], ["700", "#b45309"], ["800", "#92400e"], ["900", "#78350f"]
  ],
  "Violet": [
    ["50", "#f5f3ff"], ["100", "#ede9fe"], ["200", "#ddd6fe"], ["300", "#c4b5fd"], ["400", "#a78bfa"],
    ["500", "#8b5cf6"], ["600", "#7c3aed"], ["700", "#6d28d9"], ["800", "#5b21b6"], ["900", "#4c1d95"]
  ]
};

for (const [groupName, shades] of Object.entries(palettes)) {
  // Group container
  const groupFrame = figma.createFrame();
  groupFrame.name = groupName;
  groupFrame.layoutMode = "VERTICAL";
  groupFrame.primaryAxisSizingMode = "AUTO";
  groupFrame.counterAxisSizingMode = "AUTO";
  groupFrame.itemSpacing = 8;
  groupFrame.fills = [];

  const groupLabel = createText(groupName, 18, "Semi Bold", { r: 0.06, g: 0.09, b: 0.16 });
  groupFrame.appendChild(groupLabel);

  // Swatch row
  const row = figma.createFrame();
  row.name = groupName + " Swatches";
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisSizingMode = "AUTO";
  row.counterAxisSizingMode = "AUTO";
  row.itemSpacing = 8;
  row.fills = [];

  for (const [shade, hex] of shades) {
    const swatchGroup = figma.createFrame();
    swatchGroup.name = shade;
    swatchGroup.layoutMode = "VERTICAL";
    swatchGroup.primaryAxisSizingMode = "AUTO";
    swatchGroup.counterAxisSizingMode = "AUTO";
    swatchGroup.itemSpacing = 4;
    swatchGroup.fills = [];

    const rect = figma.createRectangle();
    rect.name = "Swatch";
    rect.resize(80, 80);
    rect.cornerRadius = 8;
    rect.fills = [{ type: "SOLID", color: hexToRgb(hex) }];
    if (hex === "#ffffff" || hex === "#f8fafc" || hex === "#f1f5f9") {
      rect.strokes = [{ type: "SOLID", color: { r: 0.89, g: 0.91, b: 0.94 } }];
      rect.strokeWeight = 1;
    }
    swatchGroup.appendChild(rect);

    const label = createText(shade, 12, "Regular", { r: 0.39, g: 0.45, b: 0.55 });
    swatchGroup.appendChild(label);

    const hexLabel = createText(hex, 10, "Regular", { r: 0.39, g: 0.45, b: 0.55 });
    swatchGroup.appendChild(hexLabel);

    row.appendChild(swatchGroup);
  }

  groupFrame.appendChild(row);
  master.appendChild(groupFrame);
}

// Divider
const divider1 = figma.createRectangle();
divider1.name = "Divider";
divider1.resize(960, 1);
divider1.fills = [{ type: "SOLID", color: { r: 0.89, g: 0.91, b: 0.94 } }];
master.appendChild(divider1);

// SEMANTIC TOKENS
const semTitle = createText("SEMANTIC TOKENS", 24, "Semi Bold", { r: 0.06, g: 0.09, b: 0.16 });
master.appendChild(semTitle);

const semanticRow = figma.createFrame();
semanticRow.name = "Semantic Tokens";
semanticRow.layoutMode = "HORIZONTAL";
semanticRow.primaryAxisSizingMode = "AUTO";
semanticRow.counterAxisSizingMode = "AUTO";
semanticRow.itemSpacing = 16;
semanticRow.fills = [];

const semanticTokens = [
  ["Primary", __DS_CONFIG__.primaryHex600],
  ["Accent", __DS_CONFIG__.accentHex600],
  ["Success", "#16a34a"],
  ["Warning", "#d97706"],
  ["Error", "#dc2626"],
  ["Info", __DS_CONFIG__.primaryHex600]
];

for (const [name, hex] of semanticTokens) {
  const tokenGroup = figma.createFrame();
  tokenGroup.name = name;
  tokenGroup.layoutMode = "VERTICAL";
  tokenGroup.primaryAxisSizingMode = "AUTO";
  tokenGroup.counterAxisSizingMode = "AUTO";
  tokenGroup.itemSpacing = 4;
  tokenGroup.fills = [];

  const rect = figma.createRectangle();
  rect.name = "Swatch";
  rect.resize(120, 80);
  rect.cornerRadius = 8;
  rect.fills = [{ type: "SOLID", color: hexToRgb(hex) }];
  tokenGroup.appendChild(rect);

  const label = createText(name, 14, "Semi Bold", { r: 0.06, g: 0.09, b: 0.16 });
  tokenGroup.appendChild(label);

  semanticRow.appendChild(tokenGroup);
}
master.appendChild(semanticRow);

// Divider
const divider2 = figma.createRectangle();
divider2.name = "Divider";
divider2.resize(960, 1);
divider2.fills = [{ type: "SOLID", color: { r: 0.89, g: 0.91, b: 0.94 } }];
master.appendChild(divider2);

// SURFACE TOKENS
const surfTitle = createText("SURFACE TOKENS", 24, "Semi Bold", { r: 0.06, g: 0.09, b: 0.16 });
master.appendChild(surfTitle);

const surfaceTokens = [
  [["Background", "#ffffff"], ["Card", "#ffffff"], ["Muted", "#f1f5f9"]],
  [["Border", "#e2e8f0"], ["Ring", __DS_CONFIG__.primaryHex600], ["Destructive", "#dc2626"]]
];

for (const rowTokens of surfaceTokens) {
  const surfRow = figma.createFrame();
  surfRow.name = "Surface Row";
  surfRow.layoutMode = "HORIZONTAL";
  surfRow.primaryAxisSizingMode = "AUTO";
  surfRow.counterAxisSizingMode = "AUTO";
  surfRow.itemSpacing = 16;
  surfRow.fills = [];

  for (const [name, hex] of rowTokens) {
    const tokenGroup = figma.createFrame();
    tokenGroup.name = name;
    tokenGroup.layoutMode = "VERTICAL";
    tokenGroup.primaryAxisSizingMode = "AUTO";
    tokenGroup.counterAxisSizingMode = "AUTO";
    tokenGroup.itemSpacing = 4;
    tokenGroup.fills = [];

    const rect = figma.createRectangle();
    rect.name = "Swatch";
    rect.resize(160, 80);
    rect.cornerRadius = 8;
    rect.fills = [{ type: "SOLID", color: hexToRgb(hex) }];
    if (hex === "#ffffff") {
      rect.strokes = [{ type: "SOLID", color: { r: 0.89, g: 0.91, b: 0.94 } }];
      rect.strokeWeight = 1;
    }
    tokenGroup.appendChild(rect);

    const label = createText(name, 14, "Semi Bold", { r: 0.06, g: 0.09, b: 0.16 });
    tokenGroup.appendChild(label);

    surfRow.appendChild(tokenGroup);
  }
  master.appendChild(surfRow);
}

page.appendChild(master);
figma.notify("Foundations: Color System section created.");

}
}
