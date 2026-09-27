// 03-variables-spacing.js - Spacing collection

const existing = figma.variables.getLocalVariableCollections().find(c => c.name === "Spacing");
if (existing) {
  figma.notify("Spacing collection already exists - skipping.");
} else {

const collection = figma.variables.createVariableCollection("Spacing");
const modeId = collection.modes[0].modeId;
collection.renameMode(modeId, "Value");

const spacingValues = [
  ["Spacing/0", 0],
  ["Spacing/1", 4],
  ["Spacing/2", 8],
  ["Spacing/3", 12],
  ["Spacing/4", 16],
  ["Spacing/5", 20],
  ["Spacing/6", 24],
  ["Spacing/8", 32],
  ["Spacing/10", 40],
  ["Spacing/12", 48],
  ["Spacing/16", 64],
  ["Spacing/20", 80],
  ["Spacing/24", 96]
];

for (const [name, value] of spacingValues) {
  const v = figma.variables.createVariable(name, collection, "FLOAT");
  v.setValueForMode(modeId, value);
}

figma.notify("Spacing collection created: 13 variables.");

}
