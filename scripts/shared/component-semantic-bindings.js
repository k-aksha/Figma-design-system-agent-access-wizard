// Shared helpers for primitive component scripts (inlined by prepare:bootstrap).
// Bind only to script 15/16 outputs — never to raw primitives or global Semantic/* on components.

const COLORS_COLLECTION = "Component Colors";
const DIM_PREFIX = "Component/";

function getCollection(name) {
  return figma.variables.getLocalVariableCollections().find((c) => c.name === name);
}

function getVarInCollection(collectionName, variableName) {
  const col = getCollection(collectionName);
  if (!col) return null;
  return figma.variables.getLocalVariables().find(
    (v) => v.variableCollectionId === col.id && v.name === variableName
  );
}

function componentColorVar(primitive, rolePath) {
  return getVarInCollection(COLORS_COLLECTION, primitive + "/" + rolePath);
}

function componentDimVar(dimensionCollection, primitive, rolePath) {
  return getVarInCollection(
    dimensionCollection,
    DIM_PREFIX + primitive + "/" + rolePath
  );
}

function bindSolidFill(node, variable) {
  if (!variable) return false;
  node.fills = [
    figma.variables.setBoundVariableForPaint(
      { type: "SOLID", color: { r: 1, g: 1, b: 1 } },
      "color",
      variable
    ),
  ];
  return true;
}

function bindSolidStroke(node, variable, weight) {
  if (!variable) return false;
  node.strokes = [
    figma.variables.setBoundVariableForPaint(
      { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
      "color",
      variable
    ),
  ];
  node.strokeWeight = weight === undefined ? 1 : weight;
  return true;
}

function bindLayoutFloat(node, field, variable) {
  if (!variable) return false;
  node.setBoundVariable(field, variable);
  return true;
}

function bindCornerRadius(frame, variable) {
  if (!variable) return false;
  for (const field of [
    "topLeftRadius",
    "topRightRadius",
    "bottomLeftRadius",
    "bottomRightRadius",
  ]) {
    frame.setBoundVariable(field, variable);
  }
  return true;
}

function bindLabelTypography(text, primitive) {
  const size = componentDimVar("Typography", primitive, "Label/Size");
  const lh = componentDimVar("Typography", primitive, "Label/LineHeight");
  const weight = componentDimVar("Typography", primitive, "Label/Weight");
  if (size) text.setBoundVariable("fontSize", size);
  if (lh) text.setBoundVariable("lineHeight", lh);
  if (weight) text.setBoundVariable("fontWeight", weight);
}

function bindControlPadding(frame, primitive) {
  const px = componentDimVar("Spacing", primitive, "Padding/X");
  const py = componentDimVar("Spacing", primitive, "Padding/Y");
  const gap = componentDimVar("Spacing", primitive, "Gap");
  if (px) {
    bindLayoutFloat(frame, "paddingLeft", px);
    bindLayoutFloat(frame, "paddingRight", px);
  }
  if (py) {
    bindLayoutFloat(frame, "paddingTop", py);
    bindLayoutFloat(frame, "paddingBottom", py);
  }
  if (gap) bindLayoutFloat(frame, "itemSpacing", gap);
}

function bindControlHeight(frame, primitive) {
  const h = componentDimVar("Sizing", primitive, "Height");
  if (h) bindLayoutFloat(frame, "minHeight", h);
}

function bindControlCorner(frame, primitive) {
  const r = componentDimVar("Radius", primitive, "Corner");
  return bindCornerRadius(frame, r);
}

function setThemeModeOnNode(node, modeName) {
  for (const collectionName of [COLORS_COLLECTION, "Colors"]) {
    const col = getCollection(collectionName);
    if (!col) continue;
    const mode = col.modes.find((m) => m.name === modeName);
    if (mode) node.setExplicitVariableModeForCollection(col, mode.modeId);
  }
}

function createThemedPreviewFrame(modeName) {
  const frame = figma.createFrame();
  frame.name = "Theme Preview - " + modeName;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "AUTO";
  frame.paddingLeft = 24;
  frame.paddingRight = 24;
  frame.paddingTop = 24;
  frame.paddingBottom = 24;
  frame.itemSpacing = 16;
  frame.fills = [];
  setThemeModeOnNode(frame, modeName);
  return frame;
}

function requireComponentTokens(primitive, colorRegistry) {
  if (!colorRegistry || !colorRegistry.components) {
    figma.notify("ERROR: component color registry missing. Run npm run prepare:bootstrap.");
    return false;
  }
  const templateKey = colorRegistry.components[primitive];
  const roles = colorRegistry.roleTemplates[templateKey];
  if (!roles || !roles.length) {
    figma.notify("ERROR: no color roles for " + primitive + ".");
    return false;
  }
  const probePath = roles[0].path;
  const sample = componentColorVar(primitive, probePath);
  if (!sample) {
    figma.notify(
      "ERROR: Component Colors missing for " + primitive + ". Run scripts 15-16 first."
    );
    return false;
  }
  return true;
}

function primitiveComponentExists(page, name) {
  return page.findAll((n) => n.type === "COMPONENT" && n.name === name).length > 0;
}

function attachPrimitiveBuiltSection(page, component, primitive, fontFamily) {
  const sectionName = "Built Component - " + primitive;
  if (page.findOne((n) => n.name === sectionName)) return;

  const builtSection = figma.createFrame();
  builtSection.name = sectionName;
  builtSection.layoutMode = "VERTICAL";
  builtSection.primaryAxisSizingMode = "AUTO";
  builtSection.counterAxisSizingMode = "AUTO";
  builtSection.itemSpacing = 16;
  builtSection.fills = [];
  builtSection.x = 1200;
  builtSection.y = 80 + page.children.length * 40;

  const previewRow = figma.createFrame();
  previewRow.name = "Light and Dark previews";
  previewRow.layoutMode = "HORIZONTAL";
  previewRow.primaryAxisSizingMode = "AUTO";
  previewRow.counterAxisSizingMode = "AUTO";
  previewRow.itemSpacing = 24;
  previewRow.fills = [];

  for (const mode of ["Light", "Dark"]) {
    const wrap = createThemedPreviewFrame(mode);
    wrap.appendChild(component.createInstance());
    previewRow.appendChild(wrap);
  }

  builtSection.appendChild(previewRow);
  page.appendChild(builtSection);
}

function appendThemesPrimitiveSample(component, primitive) {
  const themesPage = figma.root.children.find((p) => p.name === "Themes");
  if (!themesPage) return;
  const guide = themesPage.findOne((n) => n.name === "Themes Guide");
  if (!guide) return;

  for (const mode of ["Light", "Dark"]) {
    const sectionName =
      mode === "Light" ? "ENTERPRISE DEFAULT - LIGHT" : "ENTERPRISE DEFAULT - DARK";
    const section = guide.findOne((n) => n.name === sectionName);
    if (!section) continue;
    let row = section.findOne((n) => n.name === "Primitive samples");
    if (!row) {
      row = figma.createFrame();
      row.name = "Primitive samples";
      row.layoutMode = "HORIZONTAL";
      row.primaryAxisSizingMode = "AUTO";
      row.counterAxisSizingMode = "AUTO";
      row.itemSpacing = 12;
      row.fills = [];
      row.layoutWrap = "WRAP";
      row.resize(900, row.height);
      section.appendChild(row);
    }
    const marker = "Sample - " + primitive;
    if (row.findOne((n) => n.name === marker)) continue;
    const wrap = createThemedPreviewFrame(mode);
    wrap.name = marker;
    wrap.paddingLeft = 8;
    wrap.paddingRight = 8;
    wrap.paddingTop = 8;
    wrap.paddingBottom = 8;
    wrap.appendChild(component.createInstance());
    row.appendChild(wrap);
  }
}
