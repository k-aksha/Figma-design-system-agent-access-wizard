// 16-component-dimensions.js - Component semantic aliases in Typography, Spacing, Radius, Sizing

const __DS_CONFIG__ = null;
const __COMPONENT_TOKEN_REGISTRY__ = null;

const MARKER = "Component/";

function createAliases(dimensionKey, resolvedType) {
  const block = __COMPONENT_TOKEN_REGISTRY__[dimensionKey];
  if (!block) return 0;

  const col = figma.variables.getLocalVariableCollections().find((c) => c.name === block.collection);
  if (!col) {
    figma.notify("ERROR: " + block.collection + " not found. Run global token scripts first.");
    return 0;
  }

  const modeId = col.modes[0].modeId;
  const varByName = {};
  for (const v of figma.variables.getLocalVariables()) {
    if (v.variableCollectionId === col.id) {
      varByName[v.name] = v;
    }
  }

  let created = 0;
  for (const [component, templateKey] of Object.entries(block.components)) {
    const roles = block.roles[templateKey];
    if (!roles) continue;
    for (const role of roles) {
      const name = MARKER + component + "/" + role.path;
      if (varByName[name]) continue;
      const target = varByName[role.alias];
      if (!target) {
        figma.notify("WARN: missing " + block.collection + " alias " + role.alias + " for " + name);
        continue;
      }
      const v = figma.variables.createVariable(name, col, resolvedType);
      v.setValueForMode(modeId, figma.variables.createVariableAlias(target));
      varByName[name] = v;
      created++;
    }
  }
  return created;
}

if (!__COMPONENT_TOKEN_REGISTRY__) {
  figma.notify("ERROR: component registry missing. Run npm run prepare:bootstrap.");
} else {
  const t = createAliases("typography", "FLOAT");
  const s = createAliases("spacing", "FLOAT");
  const r = createAliases("radius", "FLOAT");
  const z = createAliases("sizing", "FLOAT");
  if (t + s + r + z === 0) {
    figma.notify("Component dimension aliases already exist - skipping.");
  } else {
    figma.notify(
      "Component dimensions: Typography " + t + ", Spacing " + s + ", Radius " + r + ", Sizing " + z + "."
    );
  }
}
