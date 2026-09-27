// 02-variables-colors.js - Colors collection with Light/Dark modes + all tokens

const __DS_CONFIG__ = {"designSystemName":"Universal Design System","primaryPalette":"Blue","accentPalette":"Amber","fontFamily":"Inter","fontMono":"JetBrains Mono","primaryHex600":"#2563eb","primaryHex500":"#3b82f6","accentHex600":"#d97706"};

// Idempotency: skip if Colors collection already exists
const existing = figma.variables.getLocalVariableCollections().find(c => c.name === "Colors");
if (existing) {
  figma.notify("Colors collection already exists - skipping.");
} else {

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16) / 255,
    g: parseInt(h.substring(2, 4), 16) / 255,
    b: parseInt(h.substring(4, 6), 16) / 255
  };
}

const collection = figma.variables.createVariableCollection("Colors");
// Rename default mode to Light
const lightModeId = collection.modes[0].modeId;
collection.renameMode(lightModeId, "Light");
// Add Dark mode
const darkModeId = collection.addMode("Dark");

// --- PRIMITIVE COLORS ---
const primitives = {
  "Blue": {
    "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa",
    "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a"
  },
  "Green": {
    "50": "#f0fdf4", "100": "#dcfce7", "200": "#bbf7d0", "300": "#86efac", "400": "#4ade80",
    "500": "#22c55e", "600": "#16a34a", "700": "#15803d", "800": "#166534", "900": "#14532d"
  },
  "Neutral": {
    "0": "#ffffff", "50": "#f8fafc", "100": "#f1f5f9", "200": "#e2e8f0", "300": "#cbd5e1",
    "400": "#94a3b8", "500": "#64748b", "600": "#475569", "700": "#334155", "800": "#1e293b",
    "900": "#0f172a", "1000": "#000000"
  },
  "Red": {
    "50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5", "400": "#f87171",
    "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c", "800": "#991b1b", "900": "#7f1d1d"
  },
  "Amber": {
    "50": "#fffbeb", "100": "#fef3c7", "200": "#fde68a", "300": "#fcd34d", "400": "#fbbf24",
    "500": "#f59e0b", "600": "#d97706", "700": "#b45309", "800": "#92400e", "900": "#78350f"
  },
  "Violet": {
    "50": "#f5f3ff", "100": "#ede9fe", "200": "#ddd6fe", "300": "#c4b5fd", "400": "#a78bfa",
    "500": "#8b5cf6", "600": "#7c3aed", "700": "#6d28d9", "800": "#5b21b6", "900": "#4c1d95"
  }
};

const P = __DS_CONFIG__.primaryPalette;
const A = __DS_CONFIG__.accentPalette;

const primVars = {};

for (const [group, shades] of Object.entries(primitives)) {
  for (const [shade, hex] of Object.entries(shades)) {
    const name = `${group}/${shade}`;
    const v = figma.variables.createVariable(name, collection, "COLOR");
    const rgb = hexToRgb(hex);
    v.setValueForMode(lightModeId, rgb);
    v.setValueForMode(darkModeId, rgb);
    primVars[name] = v;
  }
}

// --- SEMANTIC COLORS (aliases, different per mode) ---
const semanticDefs = [
  { name: "Semantic/Primary",       light: `${P}/600`,    dark: `${P}/500` },
  { name: "Semantic/Primary Hover", light: `${P}/700`,    dark: `${P}/600` },
  { name: "Semantic/Accent",          light: `${A}/600`,    dark: `${A}/500` },
  { name: "Semantic/Secondary",     light: "Neutral/100", dark: "Neutral/800" },
  { name: "Semantic/Success",       light: "Green/600",   dark: "Green/500" },
  { name: "Semantic/Warning",       light: "Amber/600",   dark: "Amber/500" },
  { name: "Semantic/Error",         light: "Red/600",     dark: "Red/500" },
  { name: "Semantic/Info",          light: `${P}/600`,    dark: `${P}/500` }
];

for (const def of semanticDefs) {
  const v = figma.variables.createVariable(def.name, collection, "COLOR");
  v.setValueForMode(lightModeId, figma.variables.createVariableAlias(primVars[def.light]));
  v.setValueForMode(darkModeId, figma.variables.createVariableAlias(primVars[def.dark]));
}

// --- SURFACE COLORS (aliases, different per mode) ---
const surfaceDefs = [
  { name: "Surface/Background",              light: "Neutral/0",   dark: "Neutral/900" },
  { name: "Surface/Foreground",              light: "Neutral/900", dark: "Neutral/50" },
  { name: "Surface/Card",                    light: "Neutral/0",   dark: "Neutral/800" },
  { name: "Surface/Card Foreground",         light: "Neutral/900", dark: "Neutral/50" },
  { name: "Surface/Muted",                   light: "Neutral/100", dark: "Neutral/800" },
  { name: "Surface/Muted Foreground",        light: "Neutral/500", dark: "Neutral/400" },
  { name: "Surface/Border",                  light: "Neutral/200", dark: "Neutral/700" },
  { name: "Surface/Input",                   light: "Neutral/200", dark: "Neutral/700" },
  { name: "Surface/Ring",                    light: `${P}/600`,    dark: `${P}/500` },
  { name: "Surface/Destructive",             light: "Red/600",     dark: "Red/500" },
  { name: "Surface/Destructive Foreground",  light: "Neutral/0",   dark: "Neutral/0" }
];

for (const def of surfaceDefs) {
  const v = figma.variables.createVariable(def.name, collection, "COLOR");
  v.setValueForMode(lightModeId, figma.variables.createVariableAlias(primVars[def.light]));
  v.setValueForMode(darkModeId, figma.variables.createVariableAlias(primVars[def.dark]));
}

figma.notify("Colors collection created: " + Object.keys(primVars).length + " primitives + 8 semantic + 11 surface tokens.");

}
