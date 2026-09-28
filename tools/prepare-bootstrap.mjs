#!/usr/bin/env node
/**
 * Reads design-system.config.json and writes generated/ scripts + run-plan.json
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const configPath = join(root, "design-system.config.json");
const palettes = JSON.parse(
  readFileSync(join(root, "config", "palettes.json"), "utf8")
);
const manifest = JSON.parse(
  readFileSync(join(root, "scripts", "manifest.json"), "utf8")
);

const DEFAULTS = {
  designSystemName: "Universal Design System",
  setupScope: "documentation-and-examples",
  primaryPalette: "Blue",
  accentPalette: "Amber",
  fontFamily: "Inter",
  fontMono: "JetBrains Mono",
};

const BINDINGS_MARKER = "// __INCLUDE_COMPONENT_BINDINGS__";
const ARCHETYPES_MARKER = "// __INCLUDE_COMPONENT_ARCHETYPES__";
const bindingsPath = join(root, "scripts", "shared", "component-semantic-bindings.js");
const archetypesPath = join(root, "scripts", "shared", "component-build-archetypes.js");

const DS_CONFIG_RE = /const __DS_CONFIG__ = (?:\{[\s\S]*?\}|null);/;

function loadConfig() {
  if (!existsSync(configPath)) {
    console.warn("No design-system.config.json - using defaults.");
    return { ...DEFAULTS };
  }
  const raw = JSON.parse(readFileSync(configPath, "utf8"));
  return { ...DEFAULTS, ...raw };
}

function buildDsConfigBlock(cfg) {
  const primary = palettes[cfg.primaryPalette];
  const accent = palettes[cfg.accentPalette];
  if (!primary || !accent) {
    throw new Error("Invalid primaryPalette or accentPalette in config.");
  }
  const ds = {
    designSystemName: cfg.designSystemName,
    primaryPalette: cfg.primaryPalette,
    accentPalette: cfg.accentPalette,
    fontFamily: cfg.fontFamily,
    fontMono: cfg.fontMono || "JetBrains Mono",
    primaryHex600: primary["600"],
    primaryHex500: primary["500"],
    accentHex600: accent["600"],
  };
  return `const __DS_CONFIG__ = ${JSON.stringify(ds)};`;
}

function applyFontFamily(source, fontFamily) {
  if (fontFamily === "Inter") return source;
  return source
    .replaceAll('family: "Inter"', `family: "${fontFamily}"`)
    .replaceAll('family: "Inter", style', `family: "${fontFamily}", style`)
    .replaceAll('loadFontAsync({ family: "Inter"', `loadFontAsync({ family: "${fontFamily}"`);
}

function loadComponentTokenRegistry() {
  const dir = join(root, "config", "component-tokens");
  return {
    colors: JSON.parse(
      readFileSync(join(root, "config", "component-color-roles.json"), "utf8")
    ),
    typography: JSON.parse(readFileSync(join(dir, "typography.json"), "utf8")),
    spacing: JSON.parse(readFileSync(join(dir, "spacing.json"), "utf8")),
    radius: JSON.parse(readFileSync(join(dir, "radius.json"), "utf8")),
    sizing: JSON.parse(readFileSync(join(dir, "sizing.json"), "utf8")),
  };
}

function loadPrimitiveBuildRegistry() {
  return JSON.parse(
    readFileSync(join(root, "config", "component-build.json"), "utf8")
  );
}

const componentRegistryBlock = `const __COMPONENT_TOKEN_REGISTRY__ = ${JSON.stringify(loadComponentTokenRegistry())};`;
const primitiveBuildBlock = `const __PRIMITIVE_BUILD_REGISTRY__ = ${JSON.stringify(loadPrimitiveBuildRegistry())};`;

function inlineShared(code, marker, filePath) {
  if (!code.includes(marker)) return code;
  const shared = readFileSync(filePath, "utf8");
  return code.replace(marker, shared);
}

function prepareScript(fileName, cfg, dsBlock) {
  const srcPath = join(root, "scripts", fileName);
  let code = readFileSync(srcPath, "utf8");

  code = inlineShared(code, BINDINGS_MARKER, bindingsPath);
  code = inlineShared(code, ARCHETYPES_MARKER, archetypesPath);

  if (code.includes("__DS_CONFIG__")) {
    if (DS_CONFIG_RE.test(code)) {
      code = code.replace(DS_CONFIG_RE, dsBlock);
    } else {
      code = `${dsBlock}\n${code}`;
    }
  } else {
    code = `${dsBlock}\n${code}`;
  }

  if (code.includes("__COMPONENT_TOKEN_REGISTRY__")) {
    code = code.replace(
      /const __COMPONENT_TOKEN_REGISTRY__ = null;/,
      componentRegistryBlock
    );
  }

  if (code.includes("__PRIMITIVE_BUILD_REGISTRY__")) {
    code = code.replace(
      /const __PRIMITIVE_BUILD_REGISTRY__ = null;/,
      primitiveBuildBlock
    );
  }

  code = applyFontFamily(code, cfg.fontFamily);
  return code;
}

function main() {
  const cfg = loadConfig();
  const scope = cfg.setupScope;
  const ids = manifest.profiles[scope];
  if (!ids) {
    console.error(`Unknown setupScope: ${scope}`);
    process.exit(1);
  }

  const dsBlock = buildDsConfigBlock(cfg);
  const generatedDir = join(root, "generated");
  mkdirSync(generatedDir, { recursive: true });

  const runPlan = [];
  for (const id of ids) {
    const entry = manifest.executionOrder.find((e) => e.id === id);
    if (!entry) {
      console.error(`Profile references unknown script id: ${id}`);
      process.exit(1);
    }
    const outName = entry.file;
    const code = prepareScript(outName, cfg, dsBlock);
    writeFileSync(join(generatedDir, outName), code, "utf8");
    runPlan.push({
      id: entry.id,
      file: outName,
      summary: entry.summary,
      phase: entry.phase,
    });
  }

  writeFileSync(
    join(generatedDir, "run-plan.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        config: {
          designSystemName: cfg.designSystemName,
          setupScope: cfg.setupScope,
          primaryPalette: cfg.primaryPalette,
          accentPalette: cfg.accentPalette,
          fontFamily: cfg.fontFamily,
        },
        scripts: runPlan,
      },
      null,
      2
    ),
    "utf8"
  );

  console.log(`Prepared ${runPlan.length} script(s) for scope: ${scope}`);
  console.log(`Output: generated/run-plan.json`);
}

main();
