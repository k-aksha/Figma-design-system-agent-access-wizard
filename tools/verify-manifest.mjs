#!/usr/bin/env node
/**
 * Ensures manifest, profiles, and script files stay aligned.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "scripts", "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

let failed = false;

const executionIds = new Set(manifest.executionOrder.map((e) => e.id));

for (const entry of manifest.executionOrder) {
  const filePath = join(root, "scripts", entry.file);
  if (!existsSync(filePath)) {
    console.error(`Missing script: ${entry.file} (id ${entry.id})`);
    failed = true;
  }
}

for (const [profileName, ids] of Object.entries(manifest.profiles)) {
  for (const id of ids) {
    if (!executionIds.has(id)) {
      console.error(`Profile "${profileName}" references unknown id: ${id}`);
      failed = true;
    }
  }
}

for (const entry of manifest.executionOrder) {
  for (const req of entry.requires || []) {
    if (!executionIds.has(req)) {
      console.error(`Script ${entry.id} requires unknown id: ${req}`);
      failed = true;
    }
  }
}

const buildRegistryPath = join(root, "config", "component-build.json");
if (existsSync(buildRegistryPath)) {
  const build = JSON.parse(readFileSync(buildRegistryPath, "utf8"));
  const colorRegistry = JSON.parse(
    readFileSync(join(root, "config", "component-color-roles.json"), "utf8")
  );
  const colorNames = new Set(Object.keys(colorRegistry.components));
  for (const spec of build.primitives || []) {
    if (!colorNames.has(spec.name)) {
      console.error(`component-build.json primitive not in color registry: ${spec.name}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log(
  `OK: ${manifest.executionOrder.length} scripts, ${Object.keys(manifest.profiles).length} profiles.`
);
