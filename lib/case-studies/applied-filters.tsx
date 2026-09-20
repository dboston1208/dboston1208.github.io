import { CaseSection, DecisionTable } from "@/components/case-study";
import type { CaseStudy } from "./types";

const meta: CaseStudy["meta"] = {
  slug: "applied-filters",
  title: "Applied Filters",
  subtitle: "Checking what shipped against what was designed",
  stampLabel: "Case study 04",
  stampValue: "Audit complete, in triage",
  description: "A systematic audit of a shipped filter component against its Figma spec, and the triage that followed.",
  fields: [
    { label: "Role", value: "Spec authorship, audit, triage" },
    { label: "Screen sizes", value: "1440 / 768 / 600 / 375" },
    { label: "Gaps found", value: "8" },
    { label: "Functional", value: "3 of 8" },
  ],
};

function Body() {
  return (
    <>
      <CaseSection num="01" label="Overview">
        <p>
          Design debt rarely announces itself. It accumulates quietly: a pill background that&rsquo;s close but not
          quite right, a filter button using text where the spec calls for an icon, a mobile drawer behavior that was
          never implemented. Individually minor. Together, they erode the credibility of the design system.
        </p>
        <p>
          This was a systematic check of the live search results experience against updated Figma specs, across
          desktop, tablet, and mobile, to document exactly where the shipped product diverged from what was
          designed.
        </p>
        <blockquote>
          When a feature ships, does what users experience match what the design specified? If not, what&rsquo;s
          different, and does it matter?
        </blockquote>
      </CaseSection>

      <CaseSection num="02" label="My Role">
        <p>
          I authored the updated Figma specs for the applied filters component across all screen sizes, ran the
          comparison against the live product, severity-rated every gap, and triaged the findings with the product
          manager to separate deliberate decisions from implementation misses. The output is a structured issue list
          engineering can prioritize directly.
        </p>
      </CaseSection>

      <CaseSection num="03" label="Approach">
        <h2>Exact values, not impressions</h2>
        <p>
          &ldquo;That gray looks a little off&rdquo; is not an actionable bug report. Instead of comparing by eye, I
          pulled the actual color, spacing, and sizing values the live product was rendering and set them beside the
          spec values. That turns a matter of opinion into a matter of fact: either the numbers match or they
          don&rsquo;t, and the conversation with engineering gets much shorter.
        </p>
        <p>
          Coverage ran across four screen sizes: 1440px desktop (default and sidebar states), 768px and 600px tablet
          (layout row structure), and 375px mobile (filter panel behavior).
        </p>
      </CaseSection>

      <CaseSection num="04" label="What the Audit Found">
        <p>Eight gaps, severity-rated. The full set:</p>
        <DecisionTable
          headers={["Severity", "Gap"]}
          rows={[
            ["Critical", "Mobile filter panel opens as the desktop sidebar instead of the specced 300px drawer overlay"],
            ["Critical", "Sidebar doesn't auto-collapse at smaller viewports, covering pills, search bar, and results on load"],
            ["Critical", "Pills keep the full category label at 375px instead of the specced short form"],
            ["Incorrect", "Filter button is a text button instead of the specced funnel icon with counter badge. A different component, not a styling miss"],
            ["Incorrect", "Clear All missing from its inline position in the pills row; only reachable inside the sidebar"],
            ["Minor", <>Pill background <code>rgb(244,244,244)</code> vs specced <code>#e7e6e5</code>, all screen sizes</>],
            ["Minor", "Tablet rows stack separately instead of consolidating into one row per spec"],
            ["Minor", "Section headers (Company / Project Filters) omitted, pending confirmation whether intentional"],
          ]}
        />

        <h2>The one that matters most</h2>
        <p>
          The mobile drawer is the headline finding. The spec defines a right-edge drawer at 375px: 300px wide, with
          a header, close button, active filter count, Clear All, section headers, and a sticky Apply button. The
          live implementation opens the full desktop sidebar at every viewport width. Combined with the auto-collapse
          failure, applied filters are effectively invisible to a mobile user on load.
        </p>
        <p>
          That&rsquo;s the distinction worth drawing. Three of these eight are cosmetic and can wait. Three change
          whether a mobile user can see what they&rsquo;ve filtered by. Sorting the list that way is the actual work;
          finding the gaps is the easy part.
        </p>
      </CaseSection>

      <CaseSection num="05" label="Triage">
        <p>
          Not every gap is a bug. Some reflect deliberate decisions made during build that were never backported to
          the spec. Triage with the product manager sorts findings into three buckets: ship-blocking, backlog, and
          deliberate deviations where the spec is what needs updating.
        </p>
        <p>
          That third bucket is the underrated one. A spec that silently drifts from the product stops being a source
          of truth, and every future audit inherits the noise. Triage is in progress; the ship-blocking mobile
          issues are the ones being argued for first.
        </p>
      </CaseSection>

      <CaseSection num="06" label="Why This Is Design Work">
        <p>
          Most portfolios show the work that goes into making something. This is the work that keeps it made.
          Checking the live build against the spec at every screen size, then driving the gaps to resolution with
          engineering and product, is what separates a designer who hands off Figma files from one who owns the
          outcome. The component isn&rsquo;t done when the spec is approved. It&rsquo;s done when what users see
          matches what was designed.
        </p>
        <p>
          It also surfaced something true about design at scale: a spec is only as useful as the process for
          enforcing it. Finding these gaps was valuable. Having a repeatable method for finding them is more
          valuable.
        </p>
      </CaseSection>

      <CaseSection num="07" label="Reflection">
        <p>
          <strong>What worked:</strong> Pulling exact values instead of comparing by eye took the subjectivity out of
          it. When you can put <code>rgb(244,244,244)</code> next to <code>#e7e6e5</code>, nobody has to debate
          whether it looks different.
        </p>
        <p>
          <strong>What I&rsquo;d do differently:</strong> Run the check before the feature ships, not after. Every
          gap here was cheaper to fix during the build than it is now, and the mobile drawer never being implemented
          is something a shared breakpoint checklist between design and engineering would have caught in the first
          sprint.
        </p>
        <p>
          <strong>What this points at:</strong> The value isn&rsquo;t the eight issues. It&rsquo;s that the method is
          repeatable, and that a spec nobody checks against is just a picture.
        </p>
      </CaseSection>
    </>
  );
}

const caseStudy: CaseStudy = { meta, Body };
export default caseStudy;
