// 15-component-colors.js - Component Colors collection (Light/Dark), aliases to Colors

const __COMPONENT_TOKEN_REGISTRY__ = null;

const COLLECTION_NAME = "Component Colors";

const existing = figma.variables.getLocalVariableCollections().find((c) => c.name === COLLECTION_NAME);
if (existing) {
  figma.notify(COLLECTION_NAME + " collection already exists - skipping.");
} else if (!__COMPONENT_TOKEN_REGISTRY__ || !__COMPONENT_TOKEN_REGISTRY__.colors) {
  figma.notify("ERROR: component color registry missing. Run npm run prepare:bootstrap.");
} else {
  const colorsGlobal = figma.variables.getLocalVariableCollections().find((c) => c.name === "Colors");
  if (!colorsGlobal) {
    figma.notify("ERROR: Colors collection not found. Run 02-variables-colors.js first.");
  } else {
    const registry = __COMPONENT_TOKEN_REGISTRY__.colors;
    const varByName = {};
    for (const v of figma.variables.getLocalVariables()) {
      if (v.variableCollectionId === colorsGlobal.id) {
        varByName[v.name] = v;
      }
    }

    const collection = figma.variables.createVariableCollection(COLLECTION_NAME);
    const lightModeId = collection.modes[0].modeId;
    collection.renameMode(lightModeId, "Light");
    const darkModeId = collection.addMode("Dark");

    let created = 0;
    for (const [component, templateKey] of Object.entries(registry.components)) {
      const roles = registry.roleTemplates[templateKey];
      if (!roles) continue;
      for (const role of roles) {
        const name = component + "/" + role.path;
        const lightTarget = varByName[role.light];
        const darkTarget = varByName[role.dark];
        if (!lightTarget || !darkTarget) {
          figma.notify("WARN: missing alias for " + name);
          continue;
        }
        const v = figma.variables.createVariable(name, collection, "COLOR");
        v.setValueForMode(lightModeId, figma.variables.createVariableAlias(lightTarget));
        v.setValueForMode(darkModeId, figma.variables.createVariableAlias(darkTarget));
        created++;
      }
    }

    figma.notify(COLLECTION_NAME + " created: " + created + " component color variables.");
  }
}
