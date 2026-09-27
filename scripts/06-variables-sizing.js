// 06-variables-sizing.js - Sizing collection

const existing = figma.variables.getLocalVariableCollections().find(c => c.name === "Sizing");
if (existing) {
  figma.notify("Sizing collection already exists - skipping.");
} else {

const collection = figma.variables.createVariableCollection("Sizing");
const modeId = collection.modes[0].modeId;
collection.renameMode(modeId, "Value");

const sizingValues = [
  ["Touch Target/Min", 44],
  ["Icon/sm", 16],
  ["Icon/md", 20],
  ["Icon/lg", 24],
  ["Icon/xl", 32],
  ["Component Height/sm", 32],
  ["Component Height/md", 40],
  ["Component Height/lg", 48],
  ["Component Height/xl", 56],
  ["Avatar/sm", 32],
  ["Avatar/md", 40],
  ["Avatar/lg", 48],
  ["Avatar/xl", 64],
  ["Container/Max Width", 1280]
];

for (const [name, value] of sizingValues) {
  const v = figma.variables.createVariable(name, collection, "FLOAT");
  v.setValueForMode(modeId, value);
}

figma.notify("Sizing collection created: 14 variables.");

}
