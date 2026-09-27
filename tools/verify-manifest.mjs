#!/usr/bin/env node
/**
 * Ensures every script listed in scripts/manifest.json exists on disk.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "scripts", "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

let failed = false;
for (const entry of manifest.executionOrder) {
  const filePath = join(root, "scripts", entry.file);
  if (!existsSync(filePath)) {
    console.error(`Missing script: ${entry.file} (id ${entry.id})`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log(`OK: ${manifest.executionOrder.length} scripts listed in manifest.`);
