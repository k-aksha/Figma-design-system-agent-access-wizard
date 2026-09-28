#!/usr/bin/env node
/**
 * Count component semantic variables defined in config/component-tokens/.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "config", "component-tokens");

function load(name) {
  return JSON.parse(readFileSync(join(dir, name), "utf8"));
}

function countColorVars(colors) {
  let n = 0;
  for (const templateKey of Object.values(colors.components)) {
    const roles = colors.roleTemplates[templateKey];
    if (roles) n += roles.length;
  }
  return n;
}

function countDimensionVars(block) {
  let n = 0;
  for (const templateKey of Object.values(block.components)) {
    const roles = block.roles[templateKey];
    if (roles) n += roles.length;
  }
  return n;
}

const colors = load("colors.json");
const typography = load("typography.json");
const spacing = load("spacing.json");
const radius = load("radius.json");
const sizing = load("sizing.json");

const counts = {
  "Component Colors": countColorVars(colors),
  [`Typography (Component/*)`]: countDimensionVars(typography),
  [`Spacing (Component/*)`]: countDimensionVars(spacing),
  [`Radius (Component/*)`]: countDimensionVars(radius),
  [`Sizing (Component/*)`]: countDimensionVars(sizing),
};

let total = 0;
for (const [label, n] of Object.entries(counts)) {
  console.log(`${label}: ${n}`);
  total += n;
}
console.log(`Total component semantic: ${total}`);
