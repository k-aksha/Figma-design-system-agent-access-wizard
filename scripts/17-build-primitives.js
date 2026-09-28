// 17-build-primitives.js - All 14 primitives (semantic tokens, Light/Dark previews)
// phase: components
// requires: 01, 14, 15, 16
// inject: ds-config, component-registry, primitive-build-registry, component-bindings, component-archetypes
// __INCLUDE_COMPONENT_BINDINGS__
// __INCLUDE_COMPONENT_ARCHETYPES__

const __DS_CONFIG__ = null;
const __COMPONENT_TOKEN_REGISTRY__ = null;
const __PRIMITIVE_BUILD_REGISTRY__ = null;

const fontFamily = (__DS_CONFIG__ && __DS_CONFIG__.fontFamily) || "Inter";
await figma.loadFontAsync({ family: fontFamily, style: "Regular" });
await figma.loadFontAsync({ family: fontFamily, style: "Semi Bold" });

if (!__PRIMITIVE_BUILD_REGISTRY__ || !__PRIMITIVE_BUILD_REGISTRY__.primitives) {
  figma.notify("ERROR: primitive build registry missing. Run npm run prepare:bootstrap.");
} else if (!__COMPONENT_TOKEN_REGISTRY__ || !__COMPONENT_TOKEN_REGISTRY__.colors) {
  figma.notify("ERROR: component token registry missing. Run npm run prepare:bootstrap.");
} else {
  const colorRegistry = __COMPONENT_TOKEN_REGISTRY__.colors;
  let built = 0;
  let skipped = 0;
  let failed = 0;

  for (const spec of __PRIMITIVE_BUILD_REGISTRY__.primitives) {
    const page = figma.root.children.find((p) => p.name === spec.page);
    if (!page) {
      figma.notify("WARN: missing page " + spec.page + " for " + spec.name);
      failed++;
      continue;
    }
    if (!requireComponentTokens(spec.name, colorRegistry)) {
      failed++;
      continue;
    }
    if (primitiveComponentExists(page, spec.name)) {
      skipped++;
      continue;
    }

    await figma.setCurrentPageAsync(page);
    const component = buildPrimitiveFromArchetype(spec, fontFamily);
    if (!component) {
      figma.notify("WARN: unknown archetype " + spec.archetype + " for " + spec.name);
      failed++;
      continue;
    }
    component.name = spec.name;
    attachPrimitiveBuiltSection(page, component, spec.name, fontFamily);
    appendThemesPrimitiveSample(component, spec.name);
    built++;
  }

  if (built === 0 && skipped > 0 && failed === 0) {
    figma.notify("All primitives already exist - skipping.");
  } else {
    figma.notify(
      "Primitives: built " + built + ", skipped " + skipped + ", failed " + failed + "."
    );
  }
}
