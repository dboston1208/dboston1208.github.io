---
description: Build the Next.js static export on draft, then push it as the full contents of main
---

The site is now a Next.js app (source lives on `draft`). GitHub Pages still serves
`main`'s root directly with no build step, so `main` must contain only the built
static output from `next build` (`output: 'export'` in `next.config.ts`), not the
Next.js source.

`main` is checked out in a separate git worktree at
`../dboston1208.github.io-dist`, kept for exactly this purpose. The primary
working directory (on `draft`) never needs to switch branches.

Do the following, in order, using Bash:

1. In the primary working directory (`draft`): run `npm run build`. This must
   succeed and produce a fresh `out/` directory. If it fails, stop and report the
   error instead of continuing.

2. In the `main` worktree (`../dboston1208.github.io-dist`):
   ```sh
   cd ../dboston1208.github.io-dist
   git rm -rq --ignore-unmatch -- .
   find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
   cp -R ../dboston1208.github.io/out/. .
   git add -A
   git status --short   # eyeball the diff before committing
   ```
   If `git status --short` shows nothing staged, the export is identical to what's
   already live — stop and tell the user this deploy is a no-op, don't create an
   empty commit.

3. Still in the `main` worktree, commit and push:
   ```sh
   git commit -m "Deploy: static export from draft@$(git -C ../dboston1208.github.io rev-parse --short HEAD)"
   git push origin main
   ```

4. Confirm the primary working directory is still on `draft`
   (`git -C ../dboston1208.github.io branch --show-current`).

If any step fails, stop and report the problem instead of continuing.

Once all steps succeed, tell the user to check https://dboston1208.github.io (or
https://iamdavidboston.com) in a minute or two to confirm the changes are live.
