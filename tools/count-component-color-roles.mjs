#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(
  readFileSync(join(root, "config", "component-color-roles.json"), "utf8")
);

let total = 0;
for (const [component, templateKey] of Object.entries(registry.components)) {
  const roles = registry.roleTemplates[templateKey];
  if (!roles) {
    console.error(`Missing template: ${templateKey} for ${component}`);
    process.exit(1);
  }
  total += roles.length;
}

console.log(`Component Colors variables (expected): ${total}`);
if (total !== 94) {
  console.error("Expected 94; update docs if registry changed.");
  process.exit(1);
}
