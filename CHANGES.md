# Changes — draft task pass (2026-09-28)

All work is on `draft`. Nothing was pushed, merged to `main`, or deployed.
`draft` is 22 commits ahead of `origin/draft` (the 4 earlier `redesign`
commits, a baseline, the 9 tasks, this file, and the follow-up commits
listed at the end).

Everything below was checked in a real browser at 1440px and 390px, and
`tsc`, `eslint` (on every changed file) and `next build` all pass.

---

## Before the tasks

**`draft` was fast-forwarded to `redesign`.** `draft` pointed at the old
static-HTML site (same commit as `main`), with no Next.js app. All nine tasks
assume the Next.js code, which lived only on `redesign` plus uncommitted
work. `draft` was a direct ancestor, so this was a fast-forward: no history
rewritten, and you authorized the command.

**`304e30a` Baseline.** Commits the in-progress redesign that was sitting
uncommitted (the Tabfolio-style restyle, plus your revert of the floating nav),
so each task below is its own clean diff. One fix inside it:
`JSX.Element` → `React.JSX.Element` in the unused, vendored
`components/ui/floating-navbar.tsx`, which otherwise broke `next build`.

---

## The nine tasks

### 1 · `7cde4f9` Typography → Manrope
Manrope loads via `next/font`. `--font-sans` (and the `--font-serif` alias)
point at it, so every text style picks it up from the token.

### 2 · `7af61d1` Palette → navy + warm neutrals, sand as accent only
- New warm-neutral `--surface` (#F1EEE8). Retired `--sand-tint`, which was the
  background of every card, the case hero, image frames and table headers.
- `--hairline` (dividers) now derives from sand.
- shadcn's semantic tokens (`background`, `primary`, `muted`, `accent`,
  `border`, `ring`) now map to the palette instead of stock grays.
- Components only swapped `bg-sand-tint` → `bg-surface`; no colors are set per
  component.

### 3 · `4eb6c8a` Nav: logo, static, transparent
Logo mark left (aligned to the content column), Work / About / Resume right.
It sits in normal flow with no background, border or blur, and active/hover
states use a sand underline. The nav now also appears on case-study pages.
`pill-nav.tsx` was renamed to `site-nav.tsx`.

*Superseded by the floating nav in the follow-up log below.* The nav is now
fixed, not in normal flow, and becomes a navy pill on scroll.

### 4 · `f731a7a` Hero: −30% height, smaller byline, no orphans
- Page top to first card: **572 → 400px desktop (−30%)**, **509 → 360px
  mobile (−29%)**.
- Byline 17 → 15px. The role line fits one row on desktop, and
  `text-wrap: balance` splits it evenly on phones instead of orphaning
  "rely on every day".

### 5 · `9f100ec` Homepage: remove How I Work + timeline; testimonials split
- Removed "How I work" and the sticky-scroll experience timeline, including
  `sticky-scroll-reveal-demo.tsx`, which still held Aceternity's sample copy.
- Testimonials moved to `lib/testimonials.ts`. Susan renders on the homepage
  as a navy band with a sand emphasis phrase; LinkedIn recommendations render
  on the new `/resume` page.

### 6 · `fbcbb8c` Consistent case-study thumbnails
Each cover baked its screenshot onto a `#F7EFE1` canvas (the retired
sand-tint) at a different size and position, so no CSS crop could match them.
- `npm run thumbnails` (`scripts/make-thumbnails.mjs`) cuts each screenshot out
  of that canvas, keeping its drop shadow as real transparency.
- A shared `CaseThumbnail` frames every one the same way: 16:10, surface
  background, 16px radius, 7% padding, contained. It's used on homepage cards,
  the next-case card and the case hero.
- Measured on the page, all four frames are identical.

### 7 · `68698c5` Resume quick-view
`/resume` shows your summary line, a **Download PDF** button, a **LinkedIn**
button, and every company with location, overall dates and each role's dates.
Data is in `lib/experience.ts`, transcribed from `public/resume.pdf`.

### 8 · `6a2e340` Reusable five-slide case study (Document Viewer only)
- `CaseSlide` renders one of five fixed slides: Overview · Problem · Research
  & solutions · Results · Impact. Numbering and the sticky section nav both
  come from one `SLIDES` config.
- Each slide counts its own copy, captions included, against a word budget.
  Default is **180 words**: about 15 lines in the 680px column, which fits
  one 1440×900 screen with the slide header and an image.
- **Nothing was cut.** A before/after diff of every rendered copy block
  matches: 33 blocks, 1,181 words. The only move is "My Role", now inside
  Overview.
- Over-length slides get a labeled pill and a dashed outline under `next dev`
  only. The export has no visible marker.

| Slide | Words | vs 180 budget |
|---|---|---|
| 01 Overview | 149 | ok |
| 02 Problem | 194 | **over, 108%** |
| 03 Research & solutions | 624 | **over, 347%** |
| 04 Results | 111 | ok |
| 05 Impact | 103 | ok |

The other three case studies still use the old `CaseSection` layout, unchanged.

### 9 · `1e8d1df` About page bento grid
`/about` has nine named slots: Portrait, Bio, Now, Location, Approach,
Outside work, Contact, Background, Elsewhere. The grid is 4 columns on
desktop, 2 on tablet, and stacks on mobile.

*Updated in follow-up `5121a93`:* empty slots now collapse. They aren't
rendered in the build, and under `next dev` they move to a labeled strip
below the grid. Filled slots take tile shapes from how many are filled, in
page order, so the grid stays gap-free as it fills; every count from 1 to 9
was measured with zero empty cells on both grid widths.

---

## Judgment calls to review

1. **Susan's quote isn't in the repo.** Only her first name and Global
   Payments were there, so her testimonial doesn't render yet.
2. **The "other testimonials" were four "LinkedIn recommendation coming
   soon" cards,** not real quotes. The section moved to `/resume` but stays
   hidden until a real one is added.
3. **How empty content behaves.** Items 1, 2 and 9 follow one rule, so
   placeholder text never ships: under `next dev` you see a dashed, labeled
   slot saying what goes there; the static export renders nothing, for
   missing testimonials and empty bento slots alike.
4. **About is live-linked but empty.** Nav and footer point to `/about`,
   which exports only its heading until slots are filled. Fill at least a
   few slots before deploying. The legacy `about.html` is deleted, so there's
   no older page to point back to.
5. **The case-study section nav is still sticky.** "Static, not sticky"
   applied to the site nav, which was already static and is now also
   transparent. The per-page anchor pill (Overview / Problem / …) stays
   sticky as an in-page index. Easy to flip if you meant both.
6. **Hero avatar removed.** It was the same logo mark now in the nav, stacked
   60px apart. Removing it also accounts for part of the height cut.
7. **Real email and LinkedIn replaced the placeholders** in the footer and
   the hero's "Get in touch" button. `YOUR@EMAIL` and `YOURHANDLE` were
   rendering on the live footer. Values come from your resume header
   (`dboston1208@gmail.com`, `linkedin.com/in/david-boston-jr`), which the
   site already serves publicly. They live in `lib/experience.ts` if you'd
   rather not show the email.
8. **Gold stays as the text accent.** Sand fails contrast as text, so eyebrows
   and metrics use gold (#8A6D3B). Sand covers dividers, hover underlines, the
   quote rule and the subtle hero glow.
9. **The Research slide at 347% is structural, not wordy.** It holds
   Discovery, Process, Decisions, Solution and four images. You'll probably
   want to split the images out or trim there first.
10. **Slides don't force full-screen height.** Short slides would have been
    mostly blank. "Fits one slide" is enforced by the word budget instead.
    Adjust the default in `components/case-slides.tsx`.
11. **The thumbnail script uses the `sharp` bundled with Next** rather than an
    explicit dependency. It's a one-off tool whose outputs are committed.

## Needs your input
- **Susan:** quote, emphasis phrase, title, LinkedIn → `featuredTestimonial`
  in `lib/testimonials.ts`.
- **Recommendations:** quote, name, title, company → `resumeTestimonials` in
  the same file.
- **About:** content for the slots → `app/about/page.tsx`. Pass children to
  a `BentoSlot` and it joins the grid (and leaves the dev strip). The first
  filled slot gets the large tile, so order the slots by priority.
- **Document Viewer copy:** a cut-only trim is drafted in
  `drafts/document-viewer-trimmed.md` (see follow-up below); not yet applied.

## Pre-existing issues noticed, not changed
- **Legacy pages still ship with placeholders.** `public/*.html` (old
  static-site pages) still export at their old URLs, and
  `public/document-viewer.html` shows `YOUR@EMAIL` / `YOURHANDLE`.
- **The Document Viewer cover is cropped at the top in the source image**,
  so its thumbnail cuts off there too.
- **Dead components:** `hero-section`, `timeline-demo`,
  `resizable-navbar(-demo)`, `floating-navbar`, `ui/sticky-scroll-reveal`.
  (`project-card`, `site-navbar` and `topbar` were in this list too; all
  three have since been deleted — confirmed unimported, `tsc` and the
  build still pass.)
- **Lint errors:** 4, all in untouched `components/ui/*` files.
- **Not committed:** `reference/` (17MB of screenshots of a paid Framer
  template) is left untracked on purpose.

---

## Follow-up (after review)

Your decisions: keep the email/LinkedIn and the sticky section nav as they
are (no change needed); the rest below.

- **`8fb761d` Empty testimonials render nothing.** The homepage still
  shipped an invisible, empty animation wrapper where Susan's quote goes; it's
  gone. `/resume` already rendered nothing. Dev labels are unchanged.
- **`5121a93` Bento collapses and reflows.** See task 9 above.
- **`b4a21bc` Deleted `public/about.html`.** It exported to the same
  `out/about.html` as the new `/about`, and which won depended on copy
  order. Legacy pages that link to `about.html` now reach the new page.
  Recover the old copy with `git show 1e8d1df:public/about.html`.
- **`4d53434` Trimmed Document Viewer draft** in
  `drafts/document-viewer-trimmed.md`, not applied to the page. Cuts only,
  checked word by word against the live copy.
- **`6b8249a` CHANGES.md and draft images.** Updates this file. In the draft, images and captions
  now sit outside the word budget: the purple highlight is the main image
  with its full caption restored, the download-button spec and progress bar
  return as a two-up row with one-line captions (cut from the originals),
  and the matching toggle stays cut. Text counts: Overview 149, Problem 178,
  Research & solutions 172, Results 111, Impact 103.
  - The page's `CaseSlide` still counts captions toward its over-length
    marker, so it will disagree with the draft on Research until that rule
    changes too.

---

## Floating nav (`89fba68`, then corrected)

No screenshots came through with the request (`reference/` still holds
only the Tabfolio captures), so this is built from the written spec.

**Correction (this commit):** the pill no longer turns navy with white
text. It's glass now: a transparent background that only blurs what passes
behind it, with the logo, name and links keeping their top-state colors.
The description below reflects the corrected version.

**Behavior, measured in Chrome:**
- **Top of page:** fixed from first paint, transparent, no border, 60px
  tall, spanning the content column. A spacer holds that 60px in flow, so
  page layout is unchanged (first card still at 400px desktop, 360px mobile).
- **Past 60px of scroll:** a pill 12px from the top, 52px tall, fully
  rounded, with a transparent background, `backdrop-filter: blur(12px)`,
  and a 1px navy border at 12%. Logo, name and link colors are identical to
  the top state. Desktop: it spans the content column, with contents inset
  20px. Mobile: full width minus 16px margins.
- **Hide/reveal:** hides when scrolling down past the page's hero, returns
  on scroll up, and never hides while you're still inside the hero.
  Scroll moves under 8px are ignored, so trackpad jitter doesn't flicker it.
- **Motion:** everything eases over 300ms. With reduced motion on, the same
  states switch instantly.
- **Links:** Work, About, Resume, and Contact (jumps to the footer, now
  `id="contact"`). The current page gets the sand underline.

**Judgment calls to review:**
1. **Name hidden below 480px.** Logo, name and four links need about 401px;
   at 390px the pill has 326px. The mark stays; I didn't collapse the links
   into a menu, since you didn't ask for one.
2. **Name styling.** It uses your old wordmark treatment (DAVID light,
   BOSTON bold, wide tracking), which matches `logo-full.png`.
3. **Transparent logo.** The mark was an opaque PNG relying on
   `mix-blend-multiply`, which breaks under `backdrop-filter`. `npm run
   logos` (`scripts/make-logo-variants.mjs`) derives a transparent navy
   version from `logo-mark.png`. The D's white face is transparent too, so
   inside the pill it shows the blurred content behind it rather than a
   white patch.
4. **"Narrower" pill.** The top state already aligns to the content column,
   so the pill keeps that width and insets its contents. On mobile it's
   genuinely narrower: 16px margins instead of the 20px gutter.
5. **Case-study section nav.** It sits below the main pill (64px) and slides
   to the top while the main nav is hidden, so the two never overlap.
6. **Keyboard access.** Tabbing into a hidden nav brings it back.
7. **Border kept, recolored.** The spec's 1px low-opacity border was white,
   which is invisible on the light page, so it's now navy at 12%. Delete
   `border-color` in the pill rule for pure borderless glass.

`isRoute` moved from `site-nav.tsx` to `lib/routes.ts`. The nav is now a
client component, and the server-rendered footer can't call a function
exported from one.

---

## About page rebuilt on Aceternity's bento-grid-demo

`npx shadcn@latest add @aceternity/bento-grid-demo`, then restyled to site
tokens and re-plumbed into the existing empty-slot rules. The demo file
(`components/bento-grid-demo.tsx`, sample copy on gradient skeletons) was
deleted immediately, same as the floating-navbar demo earlier: nothing
imports it.

- **`components/ui/bento-grid.tsx`** (vendored): `bg-white` / `neutral-200`
  border / `hover:shadow-xl` / `dark:` variants → `bg-surface`,
  `border-hairline`, `rounded-[16px]`, no shadow. Title `font-medium
  text-navy`; description `text-[14px] text-ink-soft`. Kept the
  `group-hover/bento:translate-x-2` nudge — the site's global
  `prefers-reduced-motion` rule already turns off all transitions, so it
  needed no separate handling. `BentoGridItem` now spreads `...props`
  (matching the pattern in `ui/button.tsx` and `ui/resizable-navbar.tsx`),
  so `BentoSlot` can still tag each tile with `data-slot`.
- **`components/bento.tsx`** (our wrapper, same public API): `BentoSlot` now
  takes `title` / `description` / `header` / `icon` instead of `children`; a
  slot counts as filled when any of the first three is set. The 4-column
  layout table became a 3-column one (Aceternity's grid is `md:grid-cols-3
  md:auto-rows-[18rem]`), with one gap-free arrangement per filled count,
  1 through 9. Count 7 reuses Aceternity's own demo pattern (two
  `md:col-span-2` tiles). Verified zero empty cells for every count, at
  both the 3-column and mobile-stack widths.
- **`app/about/page.tsx`:** only the fill-instruction comment changed, to
  describe the new props.

One TypeScript snag: `React.HTMLAttributes` has its own `title?: string`
(the tooltip attribute), which collided with the component's `title?:
ReactNode` heading prop once `...props` was added. Fixed with `Omit<...,
"title">` on the HTML attributes.

**Still true, unchanged by this swap:** empty slots render nothing in the
build (verified: `/about` still exports only its `<h1>`, zero tiles, no
`bento-grid-demo` sample copy anywhere in `out/`), and show a labeled,
dev-only strip locally. Fill order still decides which slot gets the
largest tile.

---

## Search Assist: scroll reveal

**`components/scroll-reveal.tsx` + `.css`:** the React Bits ScrollReveal
(JavaScript + CSS variant), ported to TSX with the source logic unchanged.
Adds `gsap` ^3.15.0 as a dependency.

**Placement:** replaces the Problem-section pull quote on
`lib/case-studies/search-assist.tsx`. The copy is the same sentence, so no
new content was added. Props follow the usage example (`baseOpacity={0}`,
`blurStrength={2}`, `baseRotation={0}`).

**Overrides in `globals.css`:** `.case-prose p` and `.case-prose h2` outrank
the component's single-class rules, so scoped `.case-prose .scroll-reveal`
selectors set size, colour and margin. Two deliberate deviations from the
library defaults:
- Weight 300, not 600, to match the site's headings.
- Max size 2.6rem and line-height 1.3, not 3rem and 1.5, for the wider
  measure of this layout.

**Known limits:** the component renders `<p>` inside `<h2>`, which is
invalid HTML and puts this sentence into the heading outline. Its cleanup
also kills every ScrollTrigger on the page, which is fine while it is the
only one. It does not check `prefers-reduced-motion`; it is scroll-linked,
not autoplay.

Verified: `tsc --noEmit`, `eslint` on both changed files, and `next build`
all pass. Not checked in a browser.

---

## Document Viewer rebuilt on the Search Assist template (2026-10-15)

`lib/case-studies/document-viewer.tsx` was replaced wholesale. It now uses the
same shell as Search Assist: the local `Slide` helper (eyebrow + H2 inside
`.case-slide__body type-body ink-body`), `CaseMediaGroup` with the clay
`ground` and "Explored" labels, `CaseImage` (`shadow`, plus `wide` for the
download strip), the `type-lead` pull quote, and `MetricRow`. `typeSystem` is
on and the anchors are Problem / Discovery / Solution / Validation / Outcome.
The old five-slide `CaseSlide` markup is gone, which leaves
`components/case-slides.tsx` with no consumers.

`lib/projects.ts`: the Document Viewer card's `outcome` now carries the new
headline, "Getting contractors to the one page that decides a bid". Its
thumbnail is unchanged, since the hero art is still a placeholder. The
"What's next" card needed no edit; it already follows `nextProject()`.

### Placeholder art

None of the source exports named for this pass were in the repo, so every one
of the nine image slots is a placeholder. Each is an SVG drawn at the exact
ratio of the slot it sits in, under `public/assets/`:

| Slot | Placeholder | Needs |
| --- | --- | --- |
| Hero band | `dv-hero-matching.svg` (3.2:1) | `final_matching only.png` |
| Discovery pair | `dv-layout-static.svg`, `dv-layout-floating.svg` (16:10) | static and floating control layouts |
| Decision 1 pair | `dv-toggle-all.svg`, `dv-toggle-matching.svg` (16:10) | `final_all docs.png`, `final_matching only.png` |
| Decision 2 pair | `dv-highlight-yellow.svg`, `dv-highlight-purple.svg` (16:10) | yellow before, purple after |
| Decision 3 | `dv-single-view.svg` (16:10) | `Complete expanded All docs.png` |
| Validation (wide) | `dv-download-states.svg` (16:5) | `download.png` + `working.png` + `complete.png`, combined |

Swapping one in is a two-step change: drop the `.png` into `public/assets/`
under the same stem, then replace that slot's `ph("name")` call with the
`/assets/name.png` path. The `ph()` helper at the top of the case-study file
exists only to make the remaining placeholders easy to find.

The older `dv-*.png` files still in `public/assets/` (`dv-matching-toggle`,
`dv-highlight`, `dv-progress`, `dv-download-spec`) are not wired up. They are
multi-panel composites rather than tight crops, and two of them show a project
name and a test user name, which the crop rule for this pass rules out.

---

## Guided Onboarding rebuilt on the Search Assist template (2026-10-15)

`lib/case-studies/search-starter.tsx` was replaced wholesale. The route stays
`/work/search-starter`, so nothing that links here breaks, but the internal
name appears nowhere a reader can see it: the H1 and `subtitle` both say
"Guided Onboarding".

It now uses the same shell as Search Assist: the local `Slide` helper, the
`ScrollTable` + `DecisionTable` pair for the usability-test results,
`CaseMediaGroup` on the case's own ground, `CaseImage` (`shadow`, plus `wide`
for the saved-search strip), the `type-lead` pull quote, and `MetricRow`.
`typeSystem` is on and the anchors are Problem / Discovery / Solution /
Validation / Outcome. The old nine-section `CaseSection` markup is gone.

The hero band's ground is `#818d6e`, sampled from the top corner of this
case's card on the homepage, so the page opens on the colour the card left
off on. Search Assist does the same with its clay.

The homepage card needed no edit: its `outcome` already reads "Getting new
users to a useful search before they gave up", which is the new headline. The
"What's next" card follows `nextProject()` and shows that same string.

### Art

The source exports named for this pass were not in the repo, but the older
`ss-*.png` screenshots are the same screens, so five of the nine slots were
cropped from those rather than stubbed. Crops were taken with a small
Chrome-based script (`sips` crops relative to the centre, which makes
coordinates read off an image unusable), tight to the card so the text stays
readable:

| Slot | File | From |
| --- | --- | --- |
| Hero band | `go-hero-role.png` (3.2:1) | `ss-company-type.png`, both rows of role cards |
| Decision 1 | `go-summary-keywords.png` | `ss-keywords.png`, summary bar through the suggestions |
| Decision 2 | `go-my-profile-search.png` (wide strip) | `ss-confirmation.png`, the two saved-search rows |
| Decision 3, right | `go-confirm-contractor.png` | `ss-confirmation.png`, the whole confirmation |
| Validation, middle | `go-mobile-4.png` | `ss-mobile.png`, trimmed to the content |

Four slots are still placeholders, each an SVG at the ratio of its slot:
`go-role-matrix.svg`, `go-confirm-manufacturer.svg`, `go-mobile-1.svg` and
`go-mobile-7.svg`. The two mobile ones carry their label in the top third,
because `CaseMediaGroup`'s `fade` dissolves the bottom of a tall frame.

Swapping one in is the same two-step change as Document Viewer: drop the
`.png` into `public/assets/` under the same stem, then replace that slot's
`ph("name")` call with the `/assets/name.png` path.

The `ss-*.png` files are now unreferenced by any page, and are kept only as
the crop sources for the above.
