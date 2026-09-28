# Changes — draft task pass (2026-09-28)

All work is on `draft`. Nothing was pushed, merged to `main`, or deployed.
`draft` is 15 commits ahead of `origin/draft` (the 4 earlier `redesign`
commits, a baseline, the 9 tasks, and this file).

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
`/about` has nine named, empty slots: Portrait, Bio, Now, Location, Approach,
Outside work, Contact, Background, Elsewhere. On desktop they tile a gap-free
4-column grid; tablet uses 2 columns, and mobile stacks.

---

## Judgment calls to review

1. **Susan's quote isn't in the repo.** Only her first name and Global
   Payments were there, so her testimonial doesn't render yet.
2. **The "other testimonials" were four "LinkedIn recommendation coming
   soon" cards,** not real quotes. The section moved to `/resume` but stays
   hidden until a real one is added.
3. **How empty content behaves.** Items 1, 2 and 9 follow one rule, so
   placeholder text never ships: under `next dev` you see a dashed, labeled
   slot saying what goes there; the static export renders nothing for missing
   testimonials, and blank tiles for the bento.
4. **About is live-linked but empty.** Nav and footer now point to the new
   `/about`, which exports as nine blank tiles. Fill the slots before
   deploying, or point the link back at the legacy page.
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
- **About:** content for each of the nine slots → `app/about/page.tsx`. Pass
  children to a `BentoSlot` and its dev label disappears.
- **Document Viewer copy:** trim Problem and Research to budget.

## Pre-existing issues noticed, not changed
- **`public/about.html` is silently shadowed.** `/about` also exports to
  `out/about.html`, and the Next page currently wins. That depends on copy
  order, so delete or rename the legacy file once you've pulled its content.
- **Legacy pages still ship with placeholders.** `public/*.html` (old
  static-site pages) still export at their old URLs, and
  `public/document-viewer.html` shows `YOUR@EMAIL` / `YOURHANDLE`.
- **The Document Viewer cover is cropped at the top in the source image**,
  so its thumbnail cuts off there too.
- **Dead components:** `hero-section`, `project-card`, `site-navbar`,
  `topbar`, `timeline-demo`, `resizable-navbar(-demo)`, `floating-navbar`,
  `ui/sticky-scroll-reveal`.
- **Lint errors:** 4, all in untouched `components/ui/*` files.
- **Not committed:** `reference/` (17MB of screenshots of a paid Framer
  template) is left untracked on purpose.
