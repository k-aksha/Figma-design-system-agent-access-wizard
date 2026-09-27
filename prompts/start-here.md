# Start here (no terminal required)

If you are **not comfortable with the command line**, you do not need to run `npm` yourself. Open this project in **Cursor** (or another AI coding tool with Figma MCP), then **copy the prompt below** into a new chat.

The assistant will connect to Figma, ask you a few questions in plain English, and run the technical steps for you.

---

## Before you paste the prompt

1. Have a **Figma account** and a **Design file** ready (new or existing).
2. If your tool asks you to install or enable **Figma MCP**, say yes - or ask the assistant to help you add it (see [`examples/mcp.json.example`](../examples/mcp.json.example)).

---

## Copy everything inside the box below

```
I want to set up a design system in my Figma file using the figma-ds-agent project in this workspace.

Please guide me step by step in simple language. I am not technical - do not ask me to use the terminal unless I say I want to. You should run any npm or script steps for me.

Follow the official flow in prompts/setup-wizard.md and AGENTS.md, in this order:

1) FIGMA CONNECTION
   - Check that Figma MCP is available. If it needs sign-in, start authentication (mcp_auth) and tell me clearly what to click or approve in the browser.
   - Do not continue until Figma is connected.

2) MY FIGMA FILE
   - Ask me to paste the link to my Figma Design file (from the browser address bar).
   - Use that link only in this chat - never save it to the git repo or commit it.

3) FOUR SHORT QUESTIONS (ask one at a time, with examples)
   a) What should the design system be called? (e.g. "Acme Design System")
   b) Do I want only color/spacing/type variables, or the full package with documentation pages and component templates?
      - "Variables only" = tokens only
      - "Full package" = pages, foundation docs, and example placeholders
   c) Pick a primary brand color and an accent color. Offer me: Blue, Green, Red, Amber, or Violet (I can say "you choose" for a sensible default).
   d) Pick a main font: Inter, Roboto, Plus Jakarta Sans, IBM Plex Sans, or Source Sans 3 (default Inter is fine).

4) BUILD IN FIGMA
   - Save my answers to design-system.config.json, run prepare:bootstrap for me, then run each script from generated/run-plan.json using use_figma and my file.
   - Tell me what you are doing in plain language as you go (e.g. "Adding your color styles…", "Creating documentation pages…").
   - If something already exists in my file, explain that it was skipped and continue.

5) WHEN FINISHED
   - Tell me to open Figma and where to look (Variables panel, Foundations page, etc.).
   - Summarize what was created. Do not repeat my file link in the summary.

Start with step 1 now.
```

---

## What you will be asked (preview)

| Step | What happens |
|------|----------------|
| Sign in to Figma | One-time approval in the browser |
| Paste file link | Copy from Figma’s URL bar |
| Name | Your design system title |
| Scope | Tokens only vs full docs + examples |
| Colors | Two palette choices (primary + accent) |
| Font | Main UI font |

That’s it - the assistant handles the rest.

---

**What you get in Figma (full detail):** [docs/WHAT-THE-WORKFLOW-PRODUCES.md](../docs/WHAT-THE-WORKFLOW-PRODUCES.md)

**For developers / agents:** technical checklist is [`setup-wizard.md`](setup-wizard.md).  
**Terminal wizard:** `npm run setup` (optional).
