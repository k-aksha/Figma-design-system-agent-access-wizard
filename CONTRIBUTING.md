# Contributing

Thanks for helping improve **figma-ds-agent**.

## Ways to contribute

- Fix bugs in bootstrap scripts (idempotency, font loading, layout)
- Add primitive component scripts (`15+`) with variable bindings
- Improve docs, prompts, and verification snippets
- Share issues from real MCP client runs (Cursor, Claude Code, etc.)

## Development setup

1. Clone the repo.
2. Figma MCP auth in the IDE, then file link → four questions ([`prompts/setup-wizard.md`](prompts/setup-wizard.md)); or `npm run setup` then `npm run prepare:bootstrap`.
3. Configure Figma MCP ([`examples/mcp.json.example`](examples/mcp.json.example)).
4. Use a **personal test Figma file** - do not require contributors to use a shared production file.

## Script guidelines

- **One concern per file** - match existing `NN-topic.js` numbering.
- **Idempotent** - guard with `getLocalVariableCollections()` / frame name checks.
- **Notify** - `figma.notify()` with a clear success/skip message.
- **Fonts** - `await figma.loadFontAsync()` before any text mutation.
- **Pages** - `await figma.setCurrentPageAsync(page)` when switching pages.
- **MCP-safe** - avoid `loadAllPagesAsync`, `setPluginData`, `createImageAsync`.

Register new scripts in [`scripts/manifest.json`](scripts/manifest.json).

## Pull requests

1. Describe which scripts changed and how you verified. Never include Figma file keys or file URLs in PRs or issues.
2. Include before/after notes for Figma variables or pages affected.
3. Keep PRs focused; split large primitive libraries across multiple PRs.

## Code of conduct

Be respectful and constructive. We follow standard open-source collaboration norms.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
