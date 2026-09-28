// 12-cover-page.js - Branded cover page content

const __DS_CONFIG__ = null;
const DS_TITLE = __DS_CONFIG__.designSystemName.toUpperCase();
const FONT = __DS_CONFIG__.fontFamily;

const page = figma.root.children.find(p => p.name === "Cover");
if (!page) { figma.notify("ERROR: Cover page not found."); }
else {

await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: FONT, style: "Regular" });
await figma.loadFontAsync({ family: FONT, style: "Bold" });
await figma.loadFontAsync({ family: FONT, style: "Semi Bold" });

if (page.children.find(n => n.name === "Cover")) {
  figma.notify("Cover content already exists - skipping.");
} else {

function createText(content, size, style, color) {
  const t = figma.createText();
  t.fontName = { family: FONT, style: style };
  t.fontSize = size;
  t.characters = content;
  if (color) t.fills = [{ type: "SOLID", color: color }];
  return t;
}

const fg = { r: 0.06, g: 0.09, b: 0.16 };
const muted = { r: 0.39, g: 0.45, b: 0.55 };
const primary = { r: 0.15, g: 0.39, b: 0.92 };
const mutedBg = { r: 0.95, g: 0.96, b: 0.97 };

// Main cover frame
const cover = figma.createFrame();
cover.name = "Cover";
cover.resize(1440, 900);
cover.layoutMode = "VERTICAL";
cover.primaryAxisSizingMode = "FIXED";
cover.counterAxisSizingMode = "FIXED";
cover.primaryAxisAlignItems = "CENTER";
cover.counterAxisAlignItems = "CENTER";
cover.itemSpacing = 32;
cover.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

// Content container
const content = figma.createFrame();
content.name = "Content";
content.layoutMode = "VERTICAL";
content.primaryAxisSizingMode = "AUTO";
content.counterAxisSizingMode = "AUTO";
content.primaryAxisAlignItems = "CENTER";
content.counterAxisAlignItems = "CENTER";
content.itemSpacing = 24;
content.fills = [];

// Title
const title = createText(DS_TITLE, 36, "Bold", fg);
content.appendChild(title);

// Decorative line
const line = figma.createRectangle();
line.name = "Decorative Line";
line.resize(300, 3);
line.fills = [{ type: "SOLID", color: primary }];
line.cornerRadius = 2;
content.appendChild(line);

// Subtitle
const subtitle = createText("A theme-driven, AI-readable design system\nfor enterprise clients", 18, "Regular", muted);
subtitle.textAlignHorizontal = "CENTER";
content.appendChild(subtitle);

// Badges row
const badgeRow = figma.createFrame();
badgeRow.name = "Badges";
badgeRow.layoutMode = "HORIZONTAL";
badgeRow.primaryAxisSizingMode = "AUTO";
badgeRow.counterAxisSizingMode = "AUTO";
badgeRow.itemSpacing = 12;
badgeRow.fills = [];

const badges = ["v1.0", "Active", "April 2026"];
for (const text of badges) {
  const badge = figma.createFrame();
  badge.name = text;
  badge.layoutMode = "HORIZONTAL";
  badge.primaryAxisSizingMode = "AUTO";
  badge.counterAxisSizingMode = "AUTO";
  badge.paddingLeft = 16;
  badge.paddingRight = 16;
  badge.paddingTop = 8;
  badge.paddingBottom = 8;
  badge.cornerRadius = 9999;
  badge.fills = [{ type: "SOLID", color: mutedBg }];

  const label = createText(text, 14, "Semi Bold", fg);
  badge.appendChild(label);
  badgeRow.appendChild(badge);
}
content.appendChild(badgeRow);

// Audience section
const audienceFrame = figma.createFrame();
audienceFrame.name = "Audience";
audienceFrame.layoutMode = "VERTICAL";
audienceFrame.primaryAxisSizingMode = "AUTO";
audienceFrame.counterAxisSizingMode = "AUTO";
audienceFrame.itemSpacing = 8;
audienceFrame.fills = [];

const audienceTitle = createText("Designed for:", 16, "Semi Bold", fg);
audienceFrame.appendChild(audienceTitle);

const audiences = [
  "Designers - reuse via theme swapping",
  "AI Agents - Claude & CopilotKit read this",
  "Developers - build 1:1 from components"
];
for (const a of audiences) {
  const bullet = createText("  •  " + a, 16, "Regular", muted);
  audienceFrame.appendChild(bullet);
}
content.appendChild(audienceFrame);

// CTA
const cta = createText("→ Open \"Getting Started\" to begin", 16, "Semi Bold", primary);
content.appendChild(cta);

cover.appendChild(content);
page.appendChild(cover);
figma.notify("Cover page created.");

}
}
