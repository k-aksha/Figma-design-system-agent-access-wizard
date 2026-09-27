// 05-variables-typography.js — Typography collection

const __DS_CONFIG__ = {"designSystemName":"Universal Design System","primaryPalette":"Blue","accentPalette":"Amber","fontFamily":"Inter","fontMono":"JetBrains Mono","primaryHex600":"#2563eb","primaryHex500":"#3b82f6","accentHex600":"#d97706"};

const existing = figma.variables.getLocalVariableCollections().find(c => c.name === "Typography");
if (existing) {
  figma.notify("Typography collection already exists — skipping.");
} else {

const collection = figma.variables.createVariableCollection("Typography");
const modeId = collection.modes[0].modeId;
collection.renameMode(modeId, "Value");

// Font family names (STRING type)
const stringVars = [
  ["Font/Sans", __DS_CONFIG__.fontFamily],
  ["Font/Mono", __DS_CONFIG__.fontMono],
  ["Font/Display", __DS_CONFIG__.fontFamily]
];

for (const [name, value] of stringVars) {
  const v = figma.variables.createVariable(name, collection, "STRING");
  v.setValueForMode(modeId, value);
}

// Numeric values (FLOAT type)
const floatVars = [
  ["Size/XS", 12],
  ["Size/SM", 14],
  ["Size/Base", 16],
  ["Size/LG", 18],
  ["Size/XL", 20],
  ["Size/2XL", 24],
  ["Size/3XL", 30],
  ["Size/4XL", 36],
  ["LineHeight/Tight", 1.25],
  ["LineHeight/Normal", 1.5],
  ["LineHeight/Relaxed", 1.75],
  ["Weight/Regular", 400],
  ["Weight/Medium", 500],
  ["Weight/SemiBold", 600],
  ["Weight/Bold", 700]
];

for (const [name, value] of floatVars) {
  const v = figma.variables.createVariable(name, collection, "FLOAT");
  v.setValueForMode(modeId, value);
}

figma.notify("Typography collection created: 3 string + 15 float variables.");

}
