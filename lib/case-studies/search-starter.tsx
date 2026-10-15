import type { ReactNode } from "react";
import {
  CaseImage,
  CaseMediaGroup,
  DecisionTable,
  MetricRow,
} from "@/components/case-study";
import type { CaseStudy, CaseStudyAnchor } from "./types";

// The olive this case study is grounded in: the hero band, and the frames
// behind the grouped screenshots. Read off the top corner of this case's
// card on the homepage, so the page opens where the card left off.
const ground = "#818d6e";

// Slots with no source export in the repo yet. Each placeholder is drawn at
// the ratio of the slot it sits in, so swapping in the real crop is a path
// change here and nothing else. See CHANGES.md for the list.
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
  // The route stays /work/search-starter so existing links hold. The
  // internal name is not used anywhere the reader can see it.
  slug: "search-starter",
  // `title` is the rendered H1 and carries both halves: the short name,
  // a colon, then the headline.
  title: "Guided Onboarding: Getting new users to a useful search before they gave up",
  subtitle: "Guided Onboarding",
  stampLabel: "Case study 01",
  stampValue: "Shipped June 2026",
  description: "Getting new users to a useful search before they gave up.",
  fields: [
    { label: "Role", value: "Sr. Product Designer, end to end" },
    { label: "Team", value: "Activation squad (PM, engineering), research partner" },
    { label: "Timeline", value: "2025–2026" },
    { label: "Status", value: "Shipped June 2026" },
  ],
  // No eyebrow: the short name is part of the H1 instead. Empty rather than
  // removed, so the stampValue fallback in app/work/[slug]/page.tsx does not
  // step in.
  eyebrow: "",
  summary:
    "Project Intelligence helps contractors find construction projects to bid on. Its search is powerful once it's set up, but new users couldn't set it up on their own. Many waited for a rep to do it for them, and some left first. I designed a guided setup that builds a user's first searches from a few plain questions.",
  heroImage: {
    src: "/assets/go-hero-role.png",
    alt: "The first step of guided setup, asking which company type is closest to the user's day-to-day work",
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

// Wraps a table so it scrolls sideways inside its own box on narrow screens.
function ScrollTable({ children }: { children: ReactNode }) {
  return <div className="table-scroll">{children}</div>;
}

function Body() {
  return (
    <>
      <Slide id="problem" num="01" label="THE PROBLEM" title="New users needed a rep to find their first project">
        <p className="mb-6">
          Project Intelligence only proves its value once someone runs a search that fits their business. Getting
          there meant understanding dozens of filters for trade, project stage, location, and category. New users
          didn&rsquo;t, so they leaned on a rep to set up their first saved searches, or they left before seeing
          what the product could do.
        </p>
        <p className="mb-6">
          Support tickets and user interviews pointed the same way. For the business, activation that depended on a
          person on a call couldn&rsquo;t scale.
        </p>
      </Slide>

      <Slide id="discovery" num="02" label="DISCOVERY" title="One flow, 42 different users">
        <p className="mb-6">
          The product&rsquo;s value shows up after a user&rsquo;s first good search, not before. That gave
          onboarding a single job.
        </p>
        <p className="type-lead ink-primary my-10 border-l-2 border-clay pl-6">
          Onboarding had one job: get people to their first good search.
        </p>
        <p className="mb-6">
          The hard part was who &ldquo;people&rdquo; meant. Seven company roles and six subscription tiers made 42
          combinations, each with a different landing page, email behavior, and search scope. A manufacturer
          tracking competitors needs a different first search than a plumber looking for bids. I mapped every
          combination before designing a screen, so the flow could ask the same simple questions and still land each
          user somewhere useful.
        </p>
        <CaseImage
          shadow
          src={ph("go-role-matrix")}
          alt="Matrix mapping seven company roles against six subscription tiers, with the landing page and search scope for each combination"
          caption="Seven roles and six tiers: one flow had to land 42 kinds of users in the right place."
        />
      </Slide>

      <Slide id="solution" num="03" label="THE SOLUTION" title="Three decisions that got people to value">
        <h3 className="type-h3 ink-primary mt-11 mb-3.5">Show the search as a sentence</h3>
        <p className="mb-6">
          Every screen builds a plain-English summary at the top: &ldquo;I&rsquo;m a trade contractor specializing
          in concrete, focused on bidding projects in Georgia.&rdquo; Users see exactly what each answer does to
          their search and can edit any part before it runs. On the last step, AI suggests keywords from those
          answers, capped at about 15 so they read as starting points, not homework. The tradeoff is screen space on
          every step. It was the most praised part of testing: 6 of 10 participants called it out unprompted,
          comparing it to a &ldquo;mad lib&rdquo; and a &ldquo;mission statement.&rdquo;
        </p>
        <CaseImage
          shadow
          src="/assets/go-summary-keywords.png"
          alt="The keyword step, with the running profile summary above it and six suggested keywords below the input"
          caption="The summary grows with every answer, and keyword suggestions stay short enough to scan."
        />

        <h3 className="type-h3 ink-primary mt-11 mb-3.5">Call it a profile, build a search</h3>
        <p className="mb-6">
          Testing exposed a split. Most participants understood they were setting up a saved search. A meaningful
          minority thought they were creating a company profile they&rsquo;d never have to fill out again.
          Rebuilding onboarding as a true profile would have been a big engineering lift. Instead, the flow updates
          the user&rsquo;s profile and creates a saved search named &ldquo;My Profile Search.&rdquo; Users get the
          mental model they expected, and the product keeps a search they can edit and reuse.
        </p>
        <CaseImage
          wide
          shadow
          src="/assets/go-my-profile-search.png"
          alt="The two saved searches the flow creates, the first named My Profile Search and the second My Keywords"
          caption="The confirmation names the first search &ldquo;My Profile Search,&rdquo; matching how users described what they&rsquo;d done."
        />

        <h3 className="type-h3 ink-primary mt-11 mb-3.5">Same questions, different destinations</h3>
        <p className="mb-6">
          Every user sees the same start and finish, but what happens in between depends on role and tier. Users who
          choose &ldquo;Other&rdquo; skip straight to the end instead of answering questions that don&rsquo;t apply.
          Lower tiers still get the keyword step and a working search, just narrower in scope, instead of a hidden
          step and a dead end. The tradeoff is more logic for engineering to maintain. The payoff is one flow
          instead of 42.
        </p>
        <CaseMediaGroup
          ground={ground}
          caption="A manufacturer gets competitor and product tracking. A trade contractor gets a profile search and keywords."
          items={[
            {
              src: ph("go-confirm-manufacturer"),
              alt: "Confirmation for a manufacturer, listing the competitor and product tracking searches the flow created",
            },
            {
              src: "/assets/go-confirm-contractor.png",
              alt: "Confirmation for a trade contractor, listing the profile search and the keyword search the flow created",
            },
          ]}
        />
      </Slide>

      <Slide id="validation" num="04" label="VALIDATION" title="What testing taught us">
        <p className="mb-6">
          We tested before build with 10 contractors, from 3 to 30+ years in the industry, across general
          contracting, plumbing, HVAC, and roofing. Each one set up a search as a plumbing contractor in Atlanta,
          thinking aloud. It was the team&rsquo;s first study on our new UserTesting license.
        </p>
        <ScrollTable>
          <DecisionTable
            headers={["Goal", "Target", "Result"]}
            rows={[
              ["Recalled the search steps", "60%", "100%"],
              ["Predicted results as the next step", "75%", "90%"],
              ["Felt confident running a search", "75%", "90%"],
              ["Understood how answers shaped results", "75%", "100%"],
            ]}
          />
        </ScrollTable>
        <p className="mb-6">
          Every participant finished, with an average ease rating of 4.6 out of 5 and no critical errors.
        </p>
        <ul className="mb-6 space-y-2 pl-6">
          <li>
            <strong className="font-medium ink-primary">Testing before build made fixes cheap.</strong> It caught a
            bug in the trade dropdown and one participant who misread the flow&rsquo;s purpose. Both were fixed
            before release, along with the profile-versus-search split above.
          </li>
        </ul>
        <CaseMediaGroup
          ground={ground}
          caption="The same flow on mobile, with the summary still at the top."
          items={[
            {
              src: ph("go-mobile-1"),
              alt: "The first step of the flow on a phone, asking for company type",
              fade: true,
            },
            {
              src: "/assets/go-mobile-4.png",
              alt: "A middle step of the flow on a phone, asking which project stages the user prefers, with the profile summary above it",
              fade: true,
            },
            {
              src: ph("go-mobile-7"),
              alt: "The final step of the flow on a phone, confirming the searches it is about to create",
              fade: true,
            },
          ]}
        />
        {/* The remaining two findings. The list is split rather than the
            figure floated, so the reading order stays finding, evidence,
            finding. */}
        <ul className="mb-6 space-y-2 pl-6">
          <li>
            <strong className="font-medium ink-primary">Single select forced a guess.</strong> 20% of participants
            wanted to pick more than one role. Single select made them choose a closest fit, which is a known gap
            worth revisiting.
          </li>
          <li>
            <strong className="font-medium ink-primary">We caught our own blind spot.</strong> General contractors
            were originally left out of the trade step. We caught it during build and fixed it before release.
          </li>
        </ul>
      </Slide>

      <Slide
        id="outcome"
        num="05"
        label="OUTCOME"
        title="Most new users finished, and a quarter found a match"
      >
        <MetricRow
          metrics={[
            { value: "85%", label: "Finished onboarding once they started" },
            { value: "26%", label: "Went on to view a curated project match" },
            { value: "12 min", label: "Median time to that first match" },
          ]}
        />
        <p className="mb-6">
          These are early numbers from the first two weeks after launch, across 286 users. The 26% matters most,
          because it measures value, not just a finished flow. 38% of those users got to a match within five
          minutes, in the same session.
        </p>

        <h3 className="type-h3 ink-primary mt-11 mb-3.5">What I&rsquo;d do differently</h3>
        <p className="mb-6">
          Instrument before you replace. When I looked for a baseline, the old onboarding page had never been
          tracked, so there was no &ldquo;before&rdquo; to compare against. The moment you know something is being
          replaced is the moment to make sure you can still measure it.
        </p>
      </Slide>
    </>
  );
}

const caseStudy: CaseStudy = { meta, Body };
export default caseStudy;
