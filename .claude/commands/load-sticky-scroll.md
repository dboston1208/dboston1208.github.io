---
description: Switch to the redesign-sticky-scroll branch (sticky-scroll case study section)
---

Switch the working directory to the `redesign-sticky-scroll` branch — the
page-level sticky-scroll case study rework, as opposed to the card-based
prototype on `redesign`.

1. Run `git status --short`. If there are uncommitted changes, stop and show
   them to the user — ask whether to commit or stash before switching, rather
   than doing either automatically. Do not proceed with the checkout until the
   working tree is clean or the user says how to handle it.
2. Run `git checkout redesign-sticky-scroll`.
3. Confirm the branch switched (`git branch --show-current`) and tell the user
   it's loaded. The dev server (if running via `/start`) will pick up the
   change on its own — no restart needed, just refresh the browser.
