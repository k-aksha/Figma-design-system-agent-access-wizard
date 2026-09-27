// 04-variables-radius.js - Radius collection

const existing = figma.variables.getLocalVariableCollections().find(c => c.name === "Radius");
if (existing) {
  figma.notify("Radius collection already exists - skipping.");
} else {

const collection = figma.variables.createVariableCollection("Radius");
const modeId = collection.modes[0].modeId;
collection.renameMode(modeId, "Value");

const radiusValues = [
  ["Radius/None", 0],
  ["Radius/SM", 4],
  ["Radius/MD", 6],
  ["Radius/LG", 8],
  ["Radius/XL", 12],
  ["Radius/2XL", 16],
  ["Radius/Full", 9999]
];

for (const [name, value] of radiusValues) {
  const v = figma.variables.createVariable(name, collection, "FLOAT");
  v.setValueForMode(modeId, value);
}

figma.notify("Radius collection created: 7 variables.");

}
