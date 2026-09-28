// Archetype builders for config/component-build.json (inlined after component-semantic-bindings).

function createLabelText(primitive, sampleText, fontFamily, colorRolePath) {
  const label = figma.createText();
  label.name = "Label";
  label.fontName = { family: fontFamily, style: "Regular" };
  label.characters = sampleText || primitive;
  bindSolidFill(label, componentColorVar(primitive, colorRolePath));
  bindLabelTypography(label, primitive);
  return label;
}

function buildInteractivePrimary(spec, fontFamily) {
  const primitive = spec.name;
  const container = figma.createFrame();
  container.name = "Container";
  container.layoutMode = "HORIZONTAL";
  container.primaryAxisAlignItems = "CENTER";
  container.counterAxisAlignItems = "CENTER";
  container.primaryAxisSizingMode = "AUTO";
  container.counterAxisSizingMode = "AUTO";
  container.fills = [];
  bindSolidFill(container, componentColorVar(primitive, "Action/Primary/Background"));
  bindControlPadding(container, primitive);
  bindControlCorner(container, primitive);
  bindControlHeight(container, primitive);
  const label = createLabelText(
    primitive,
    spec.sampleText,
    fontFamily,
    "Action/Primary/Foreground"
  );
  label.fontName = { family: fontFamily, style: "Semi Bold" };
  container.appendChild(label);
  return figma.createComponentFromNode(container);
}

function buildInteractiveField(spec, fontFamily) {
  const primitive = spec.name;
  const container = figma.createFrame();
  container.name = "Container";
  container.layoutMode = "HORIZONTAL";
  container.primaryAxisAlignItems = "CENTER";
  container.counterAxisSizingMode = "AUTO";
  container.primaryAxisSizingMode = "AUTO";
  container.fills = [];
  bindSolidFill(container, componentColorVar(primitive, "Field/Background"));
  bindSolidStroke(container, componentColorVar(primitive, "Field/Border"), 1);
  bindControlPadding(container, primitive);
  bindControlCorner(container, primitive);
  if (spec.multiline) {
    const minH = componentDimVar("Sizing", primitive, "MinHeight");
    if (minH) bindLayoutFloat(container, "minHeight", minH);
  } else {
    bindControlHeight(container, primitive);
  }
  const label = createLabelText(
    primitive,
    spec.sampleText,
    fontFamily,
    "Field/Placeholder"
  );
  container.appendChild(label);
  return figma.createComponentFromNode(container);
}

function buildChoice(spec, fontFamily) {
  const primitive = spec.name;
  const root = figma.createFrame();
  root.name = "Container";
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisAlignItems = "CENTER";
  root.counterAxisAlignItems = "CENTER";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "AUTO";
  root.fills = [];
  bindControlPadding(root, primitive);
  const gap = componentDimVar("Spacing", primitive, "Gap");
  if (gap) bindLayoutFloat(root, "itemSpacing", gap);

  const control = figma.createFrame();
  control.name = "Control";
  control.layoutMode = "HORIZONTAL";
  control.primaryAxisAlignItems = "CENTER";
  control.counterAxisAlignItems = "CENTER";
  control.primaryAxisSizingMode = "FIXED";
  control.counterAxisSizingMode = "FIXED";
  control.resize(16, 16);
  control.fills = [];
  bindSolidFill(control, componentColorVar(primitive, "Control/Background"));
  bindSolidStroke(control, componentColorVar(primitive, "Control/Border"), 1);
  if (spec.controlShape === "circle") {
    bindCornerRadius(control, componentDimVar("Radius", primitive, "Corner"));
  } else {
    bindControlCorner(control, primitive);
  }
  const h = componentDimVar("Sizing", primitive, "Height");
  if (h) {
    bindLayoutFloat(control, "minHeight", h);
    bindLayoutFloat(control, "minWidth", h);
  }

  const label = createLabelText(primitive, spec.sampleText, fontFamily, "Label/Foreground");
  root.appendChild(control);
  root.appendChild(label);
  return figma.createComponentFromNode(root);
}

function buildToggle(spec, fontFamily) {
  const primitive = spec.name;
  const track = figma.createFrame();
  track.name = "Track";
  track.layoutMode = "HORIZONTAL";
  track.primaryAxisAlignItems = "MAX";
  track.counterAxisAlignItems = "CENTER";
  track.primaryAxisSizingMode = "FIXED";
  track.counterAxisSizingMode = "FIXED";
  track.resize(44, 24);
  track.fills = [];
  bindSolidFill(track, componentColorVar(primitive, "Track/Off"));
  bindControlCorner(track, primitive);

  const thumb = figma.createEllipse();
  thumb.name = "Thumb";
  thumb.resize(18, 18);
  bindSolidFill(thumb, componentColorVar(primitive, "Thumb"));
  track.appendChild(thumb);

  const root = figma.createFrame();
  root.name = "Container";
  root.layoutMode = "HORIZONTAL";
  root.fills = [];
  root.appendChild(track);
  return figma.createComponentFromNode(root);
}

function buildDisplayLabel(spec, fontFamily) {
  const primitive = spec.name;
  const root = figma.createFrame();
  root.name = "Container";
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "AUTO";
  root.fills = [];
  bindControlPadding(root, primitive);
  const label = createLabelText(primitive, spec.sampleText, fontFamily, "Foreground");
  root.appendChild(label);
  return figma.createComponentFromNode(root);
}

function buildDisplayChip(spec, fontFamily) {
  const primitive = spec.name;
  const root = figma.createFrame();
  root.name = "Container";
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisAlignItems = "CENTER";
  root.counterAxisAlignItems = "CENTER";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "AUTO";
  root.fills = [];
  bindSolidFill(root, componentColorVar(primitive, "Background"));
  bindControlPadding(root, primitive);
  bindControlCorner(root, primitive);
  const label = createLabelText(primitive, spec.sampleText, fontFamily, "Foreground");
  root.appendChild(label);
  return figma.createComponentFromNode(root);
}

function buildAvatar(spec) {
  const primitive = spec.name;
  const root = figma.createFrame();
  root.name = "Container";
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisAlignItems = "CENTER";
  root.counterAxisAlignItems = "CENTER";
  root.fills = [];
  const size = componentDimVar("Sizing", primitive, "Size");
  if (size) {
    bindLayoutFloat(root, "minWidth", size);
    bindLayoutFloat(root, "minHeight", size);
  } else {
    root.resize(40, 40);
  }
  bindSolidFill(root, componentColorVar(primitive, "Background"));
  bindControlCorner(root, primitive);
  return figma.createComponentFromNode(root);
}

function buildIconChrome(spec) {
  const primitive = spec.name;
  const root = figma.createFrame();
  root.name = "Container";
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisAlignItems = "CENTER";
  root.counterAxisAlignItems = "CENTER";
  root.fills = [];
  const size = componentDimVar("Sizing", primitive, "Size");
  if (size) {
    bindLayoutFloat(root, "minWidth", size);
    bindLayoutFloat(root, "minHeight", size);
  } else {
    root.resize(24, 24);
  }
  bindControlCorner(root, primitive);
  const glyph = figma.createRectangle();
  glyph.name = "Glyph";
  glyph.resize(12, 12);
  bindSolidFill(glyph, componentColorVar(primitive, "Foreground"));
  root.appendChild(glyph);
  return figma.createComponentFromNode(root);
}

function buildSeparator(spec) {
  const primitive = spec.name;
  const root = figma.createFrame();
  root.name = "Container";
  root.layoutMode = "VERTICAL";
  root.primaryAxisAlignItems = "CENTER";
  root.counterAxisSizingMode = "FIXED";
  root.resize(240, 16);
  root.fills = [];
  const hit = componentDimVar("Sizing", primitive, "HitArea");
  if (hit) bindLayoutFloat(root, "minHeight", hit);
  const line = figma.createRectangle();
  line.name = "Line";
  line.resize(240, 1);
  const thickness = componentDimVar("Spacing", primitive, "Thickness");
  if (thickness) bindLayoutFloat(line, "height", thickness);
  bindSolidFill(line, componentColorVar(primitive, "Background"));
  root.appendChild(line);
  return figma.createComponentFromNode(root);
}

function buildSkeletonBlock(spec) {
  const primitive = spec.name;
  const root = figma.createFrame();
  root.name = "Container";
  root.layoutMode = "HORIZONTAL";
  root.resize(200, 40);
  root.fills = [];
  bindSolidFill(root, componentColorVar(primitive, "Background"));
  bindControlCorner(root, primitive);
  bindControlHeight(root, primitive);
  return figma.createComponentFromNode(root);
}

function buildSpinner(spec) {
  const primitive = spec.name;
  const root = figma.createFrame();
  root.name = "Container";
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisAlignItems = "CENTER";
  root.counterAxisAlignItems = "CENTER";
  root.fills = [];
  const size = componentDimVar("Sizing", primitive, "Size");
  if (size) {
    bindLayoutFloat(root, "minWidth", size);
    bindLayoutFloat(root, "minHeight", size);
  } else {
    root.resize(32, 32);
  }
  const ring = figma.createEllipse();
  ring.name = "Ring";
  ring.resize(24, 24);
  ring.fills = [];
  bindSolidStroke(ring, componentColorVar(primitive, "Foreground"), 2);
  root.appendChild(ring);
  return figma.createComponentFromNode(root);
}

function buildPrimitiveFromArchetype(spec, fontFamily) {
  switch (spec.archetype) {
    case "interactive-primary":
      return buildInteractivePrimary(spec, fontFamily);
    case "interactive-field":
      return buildInteractiveField(spec, fontFamily);
    case "choice":
      return buildChoice(spec, fontFamily);
    case "toggle":
      return buildToggle(spec, fontFamily);
    case "display-label":
      return buildDisplayLabel(spec, fontFamily);
    case "display-chip":
      return buildDisplayChip(spec, fontFamily);
    case "avatar":
      return buildAvatar(spec);
    case "icon-chrome":
      return buildIconChrome(spec);
    case "separator":
      return buildSeparator(spec);
    case "skeleton-block":
      return buildSkeletonBlock(spec);
    case "spinner":
      return buildSpinner(spec);
    default:
      return null;
  }
}
