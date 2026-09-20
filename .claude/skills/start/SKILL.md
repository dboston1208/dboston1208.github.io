---
name: start
description: Start (or reuse) the Next.js dev server so the user can preview their work in a browser. Use whenever the user wants to see, check, or preview what they're working on, view a change live, or asks to "run it," "start it up," "show me," "spin up the site," or similar — for this Next.js portfolio site (source lives on the `draft` branch, `main` is build output only, see AGENTS.md).
---

# Start

Get the site running locally so the user can look at it in a browser.

## Steps

1. Check whether a dev server is already listening on port 3000:
   ```
   lsof -nP -iTCP:3000 -sTCP:LISTEN
   ```
   If something is already there, don't start a second one — just tell the user
   it's already up at http://localhost:3000. Starting a duplicate `next dev`
   process wastes a port and confuses which instance is serving the change.

2. If nothing is listening, start it from the project root, in the background:
   ```
   npm run dev
   ```
   Use `run_in_background` (or equivalent) — this process stays alive until the
   user is done, so don't run it in the foreground and block.

3. Wait for the "Ready" line in the output (or a few seconds), then tell the
   user the URL: **http://localhost:3000**. Don't open a browser automatically
   unless asked.

4. If the user mentions a specific page or component they changed, point them
   to the specific path (e.g. `/about`, `/case-studies/document-viewer`) rather
   than just the root.

## Notes

- This project builds via `next build` with `output: 'export'` — the dev
  server (`next dev`) is unrelated to that and never touches the `main`
  branch or the deploy worktree. Don't confuse this with the `/deploy` skill.
- If `npm run dev` fails (e.g. missing `node_modules`), run `npm install`
  first and retry rather than guessing at the error.
