import type { ReactNode } from "react";
import { CaseImage, CaseMediaGroup, MetricRow } from "@/components/case-study";
import type { CaseStudy, CaseStudyAnchor } from "./types";

// The clay this case study is grounded in: the hero band, and the frames
// behind the grouped screenshots. Same value as Search Assist, so the two
// pages read as one system.
const ground = "#c88268";

// Placeholder art still stands in for every slot: the source exports named
// in the brief aren't in the repo. Each file under /assets/dv-*.svg is drawn
// at the ratio of the slot it sits in, so swapping in the real crop is a
// path change here and nothing else. See CHANGES.md for the list.
const ph = (name: string) => `/assets/${name}.svg`;

// Section anchors double as the case-study nav, matching Search Assist.
const anchors: CaseStudyAnchor[] = [
  { id: "problem", label: "Problem" },
  { id: "discovery", label: "Discovery" },
  { id: "solution", label: "Solution" },
  { id: "validation", label: "Validation" },
  { id: "outcome", label: "Outcome" },
];

const meta: CaseStudy["meta"] = {
  slug: "document-viewer",
  // `title` is the rendered H1 and carries both halves: the short name,
  // a colon, then the headline.
  title: "Document Viewer: Getting contractors to the one page that decides a bid",
  subtitle: "Document Viewer",
  stampLabel: "Case study 02",
  stampValue: "Shipped October 2024",
  description:
    "Rebuilding the document viewer contractors use to decide whether a project is worth bidding.",
  fields: [
    { label: "Role", value: "Sr. UI Designer, interaction and visual design" },
    { label: "Team", value: "UX partner (discovery), me (UI and interaction)" },
    { label: "Timeline", value: "2024" },
    { label: "Status", value: "Shipped October 2024" },
  ],
  // No eyebrow: the short name is part of the H1 instead. Empty rather than
  // removed, so the stampValue fallback in app/work/[slug]/page.tsx does not
  // step in.
  eyebrow: "",
  summary:
    "Project Intelligence gives contractors the plans and specs they need to decide whether a project is worth bidding. The old document viewer was so slow and clunky that people downloaded everything and opened it somewhere else. I designed the interaction and visual layer of its replacement: faster loading, search inside documents, and flexible downloads.",
  heroImage: {
    src: ph("dv-hero-matching"),
    alt: "The shipped viewer filtered to matching documents only, with a match count on each document in the tree",
    ground,
  },
  anchors,
  typeSystem: true,
};

function Slide({
  id,
  num,
  label,
  title,
  children,
}: {
  id: string;
  num: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="case-slide">
      {/* Body copy inherits .type-body/.ink-body from here, so paragraphs
          and lists only carry spacing. The shared .case-prose and
          .case-slide__header rules are left off on purpose: both outrank
          utility classes on the same elements. */}
      <div className="case-slide__body type-body ink-body">
        <header className="mb-7">
          <p className="type-eyebrow ink-accent">
            {num} · {label}
          </p>
          <h2 className="type-h2 ink-primary mt-2.5">{title}</h2>
        </header>
        {children}
      </div>
    </section>
  );
}

function Body() {
  return (
    <>
      <Slide
        id="problem"
        num="01"
        label="THE PROBLEM"
        title="People had stopped trusting the viewer, so they worked around it"
      >
        <p className="mb-6">
          Large documents could take minutes to load. Scrolling and zooming were clunky. There was no way to export
          a multi-page PDF, and the document tree was so shallow that finding one spec meant downloading an entire
          section.
        </p>
        <p className="mb-6">
          So users built workarounds. Some downloaded files just to re-upload them into Bluebeam to mark them up.
          Others downloaded to a phone and moved files to SharePoint. In interviews, several people independently
          called the experience &ldquo;chaotic.&rdquo;
        </p>
        <p className="mb-6">
          One complaint was older than the project itself: keyword matches were highlighted in yellow, which is
          nearly unreadable on the white pages most construction documents use.
        </p>
      </Slide>

      <Slide
        id="discovery"
        num="02"
        label="DISCOVERY"
        title="Once people search, everything that doesn't match is noise"
      >
        <p className="mb-6">
          Our discovery interviews ran to 20 against a goal of 10, across trade contractors, general contractors,
          and building product manufacturers. People weren&rsquo;t browsing documents. They were hunting for the few
          pages that decided whether to bid.
        </p>
        <p className="mb-6">
          That changed what search needed to do. Showing matching and non-matching documents together, which seemed
          helpful on paper, confused people. Once you&rsquo;ve searched for a keyword, there&rsquo;s no reason to
          keep showing documents that don&rsquo;t contain it.
        </p>
        <p className="type-lead ink-primary my-10 border-l-2 border-clay pl-6">
          Search isn&rsquo;t a filter on the tree. It&rsquo;s a different way of reading the documents.
        </p>
        <p className="mb-6">
          We tested three directions for the viewer shell: static controls, floating controls, and a tab layout. The
          tab layout won because it let users open a spec and a plan page side by side, which is how estimators
          actually work.
        </p>
        <CaseMediaGroup
          ground={ground}
          caption="Two directions that lost, one on contrast and one on controls covering the page."
          items={[
            {
              label: "Explored",
              src: ph("dv-layout-static"),
              alt: "Viewer concept with static controls pinned above the document, holding a fixed strip of the page",
            },
            {
              label: "Explored",
              src: ph("dv-layout-floating"),
              alt: "Viewer concept with floating controls that hover over the document and cover the page beneath them",
            },
          ]}
        />
      </Slide>

      <Slide id="solution" num="03" label="THE SOLUTION" title="Three decisions that made it usable">
        <h3 className="type-h3 ink-primary mt-11 mb-3.5">A toggle, not a split view</h3>
        <p className="mb-6">
          Search went through four design rounds: a dual view, a toggle with text snippets, a resizable split panel,
          and finally a simple toggle between All Documents and Matching Only, with an accurate match count per
          document. The tradeoff is that you can&rsquo;t see both at once. But side by side confused users twice, in
          discovery and again in design testing.
        </p>
        <CaseMediaGroup
          ground={ground}
          caption="The final toggle shows only matching documents, with a match count on each, so users jump straight to the pages that matter."
          items={[
            {
              src: ph("dv-toggle-all"),
              alt: "The viewer set to All Documents, listing every document in the project tree whether or not it contains the keyword",
            },
            {
              src: ph("dv-toggle-matching"),
              alt: "The same tree set to Matching Only, showing just the documents that contain the keyword with a match count on each",
            },
          ]}
        />

        <h3 className="type-h3 ink-primary mt-11 mb-3.5">Treat the &ldquo;small&rdquo; fix as real research</h3>
        <p className="mb-6">
          Yellow highlighting had been a complaint for years, and it was easy to dismiss as a color-blindness edge
          case. It wasn&rsquo;t. Yellow on white is hard for almost everyone to read. I tested several accessible
          color combinations with people with typical color vision and people with color vision deficiencies. Purple
          won clearly and shipped before launch.
        </p>
        <CaseMediaGroup
          ground={ground}
          caption="Before and after: purple highlights stay readable on white spec pages where yellow disappeared."
          items={[
            {
              src: ph("dv-highlight-yellow"),
              alt: "Before: keyword matches highlighted in yellow on a white spec page, where the highlight nearly disappears",
            },
            {
              src: ph("dv-highlight-purple"),
              alt: "After: the same keyword matches highlighted in purple, clearly readable against the white page",
            },
          ]}
        />

        <h3 className="type-h3 ink-primary mt-11 mb-3.5">Ship one view, sequence the rest</h3>
        <p className="mb-6">
          A tab layout that let users open a spec and a plan page side by side won testing against two other
          directions. It was too big a lift for the build timeline, so we shipped a single-document view with
          everything else testing validated. A faster viewer that shipped beat a better one that slipped. Twenty
          user goals were mapped up front and none were dropped, only sequenced into later phases.
        </p>
        <CaseImage
          shadow
          src={ph("dv-single-view")}
          alt="The shipped single-document view, with a deep document tree on the left and one document open beside it"
          caption="The shipped viewer: one document at a time, with a deeper document tree so users can find a single spec without downloading a whole section."
        />
      </Slide>

      <Slide id="validation" num="04" label="VALIDATION" title="What testing taught us">
        <p className="mb-6">
          We tested in three rounds, each tied to one design question: the document tree, how search matches should
          appear, and the overall layout plus downloads.
        </p>
        <ul className="mb-6 space-y-2 pl-6">
          <li>
            <strong className="font-medium ink-primary">Less on screen beat more context.</strong> Text snippets
            under each match seemed useful, but users called them clutter in two separate rounds. We cut them and
            kept the match count.
          </li>
        </ul>
        <CaseImage
          wide
          shadow
          src={ph("dv-download-states")}
          alt="The download control across three states: ready to download, working with progress, and complete"
          caption="Downloads say what's happening at every step."
        />
        {/* The remaining two findings. The list is split rather than the
            figure floated, so the reading order stays finding, evidence,
            finding. */}
        <ul className="mb-6 space-y-2 pl-6">
          <li>
            <strong className="font-medium ink-primary">Clarity and simplicity don&rsquo;t have to compete.</strong>{" "}
            For download formats, users understood explicit labels better but preferred the feel of a simple PDF/ZIP
            toggle. We shipped the toggle and added hover tooltips and clear progress states to recover the clarity.
          </li>
          <li>
            <strong className="font-medium ink-primary">The smallest change got the biggest reaction.</strong> The
            purple highlight drew more positive response, internally and from customers, than anything else we
            shipped. I didn&rsquo;t expect it to be a big deal.
          </li>
        </ul>
      </Slide>

      <Slide id="outcome" num="05" label="OUTCOME" title="Faster on every metric we set">
        <p className="mb-6">The first release hit all three targets we set before launch.</p>
        <MetricRow
          metrics={[
            { value: "25%", label: "Smaller downloads" },
            { value: "10%+", label: "Faster performance" },
            { value: "<3s", label: "To first document view" },
          ]}
        />
        <p className="mb-6">
          The viewer also became the foundation for later work, including an AI panel that lets users ask questions
          about a project&rsquo;s documents.
        </p>

        <h3 className="type-h3 ink-primary mt-11 mb-3.5">What I&rsquo;d do differently</h3>
        <p className="mb-6">
          The tab layout won testing and then quietly became &ldquo;later.&rdquo; Next time I&rsquo;d push for a
          committed fast-follow with a date, not an open-ended backlog item. Research that wins should come with a
          plan to ship it.
        </p>
      </Slide>
    </>
  );
}

const caseStudy: CaseStudy = { meta, Body };
export default caseStudy;
