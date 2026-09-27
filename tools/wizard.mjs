#!/usr/bin/env node
/**
 * Interactive CLI: MCP preflight reminder → file link → four questions → configs → prepare-bootstrap
 */
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PALETTES = ["Blue", "Green", "Red", "Amber", "Violet"];
const FONTS = [
  "Inter",
  "Roboto",
  "Plus Jakarta Sans",
  "IBM Plex Sans",
  "Source Sans 3",
];

function extractFileKey(urlOrKey) {
  const trimmed = urlOrKey.trim();
  const designMatch = trimmed.match(/figma\.com\/design\/([0-9a-zA-Z]{22,128})/);
  if (designMatch) return designMatch[1];
  if (/^[0-9a-zA-Z]{22,128}$/.test(trimmed)) return trimmed;
  return null;
}

async function ask(rl, question, options, defaultIndex = 0) {
  console.log(`\n${question}`);
  options.forEach((opt, i) => {
    const mark = i === defaultIndex ? " (default)" : "";
    console.log(`  ${i + 1}. ${opt}${mark}`);
  });
  const answer = await rl.question("> ");
  const trimmed = answer.trim();
  if (!trimmed) return options[defaultIndex];
  const num = parseInt(trimmed, 10);
  if (!Number.isNaN(num) && num >= 1 && num <= options.length) {
    return options[num - 1];
  }
  if (options.includes(trimmed)) return trimmed;
  console.log("Using default.");
  return options[defaultIndex];
}

async function main() {
  const rl = createInterface({ input, output });
  console.log("Figma Design System Agent Access Wizard — setup\n");

  console.log(
    "Before bootstrap, complete Figma MCP auth in your IDE (mcp_auth on the Figma MCP server)."
  );
  console.log("See examples/mcp.json.example and prompts/setup-wizard.md Steps 0–1.\n");

  let fileKey = null;
  while (!fileKey) {
    const linkAnswer = await rl.question(
      "Paste your Figma Design file link (or file key): "
    );
    fileKey = extractFileKey(linkAnswer);
    if (!fileKey) {
      console.log("Could not parse file key. Use a /design/<fileKey>/... URL or paste the key directly.\n");
    }
  }

  const localConfigPath = join(root, "local.config.json");
  writeFileSync(
    localConfigPath,
    JSON.stringify({ fileKey }, null, 2),
    "utf8"
  );
  console.log(`\nSaved file key to ${localConfigPath} (gitignored).\n`);

  const nameAnswer = await rl.question(
    "1. Design system name [Universal Design System]: "
  );
  const designSystemName =
    nameAnswer.trim() || "Universal Design System";

  const scope = await ask(
    rl,
    "2. Setup scope",
    ["variables-only", "documentation-and-examples"],
    1
  );

  const primaryPalette = await ask(
    rl,
    "3a. Primary color palette",
    PALETTES,
    0
  );
  const accentPalette = await ask(
    rl,
    "3b. Accent color palette",
    PALETTES,
    3
  );

  const fontFamily = await ask(
    rl,
    "4. Primary typography (sans-serif)",
    FONTS,
    0
  );

  const config = {
    designSystemName,
    setupScope: scope,
    primaryPalette,
    accentPalette,
    fontFamily,
    fontMono: "JetBrains Mono",
  };

  const configPath = join(root, "design-system.config.json");
  writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
  console.log(`\nWrote ${configPath}`);

  rl.close();

  const prep = spawnSync("node", ["tools/prepare-bootstrap.mjs"], {
    cwd: root,
    stdio: "inherit",
  });
  if (prep.status !== 0) process.exit(prep.status ?? 1);

  console.log(
    "\nNext: in your agent, ensure mcp_auth is done, then run scripts from generated/run-plan.json via use_figma with the file key from local.config.json."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
